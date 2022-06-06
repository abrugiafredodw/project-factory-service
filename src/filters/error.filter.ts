import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import {ClientsException} from "../clients/exception/clients.exception";
import {ErrorApi} from "../model/error.api";
import {AppModule} from "../app.module";
import {ApiExceptions} from "../exceptions/api.exceptions";

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const res = context.getResponse();
    const statusCode = exception.getStatus();
    const apiCodeError=(exception instanceof ClientsException)? exception.apiErrorCode : undefined;
    const apiMessage=(exception instanceof ClientsException || ApiExceptions)? exception.apiMessage : undefined;
    const errorApi:ErrorApi={
      code:apiCodeError??statusCode,
      message: apiMessage??exception.message,
      trace:AppModule.ENV!=='prod'?exception.stack:undefined,
    }
    return res.status(statusCode).json(errorApi);
  }
}
