import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorApi } from '../model/error.api';
import { AppModule } from '../app.module';
import { ENVIROMENT } from '../utils/utils';

@Catch()
export class FallbackFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const res = context.getResponse();
    const apiError: ErrorApi = {
      code: 500,
      message: exception.message || 'Error en el servidor',
      errores: [],
      trace: AppModule.ENV !== ENVIROMENT.PROD ? exception.stack : undefined,
    };
    return res.status(500).json(apiError);
  }
}
