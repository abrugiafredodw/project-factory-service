import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { FallbackFilter } from './filters/fallback.filter';
import { ErrorFilter } from './filters/error.filter';
import { HealthFilter } from './filters/health.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ValidationError, ValidationPipe} from "@nestjs/common";
import {ValidationsException} from "./exceptions/validations.exception";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning();
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errores: ValidationError[]) => {
      const erroresCustomizados = errores.map((error) => {
        const map1 = new Map(Object.entries(error.constraints));
        let errorText=[];
        for (let text of map1.values()){
          errorText.push(text);
        }
         return `El campo ${error.property} tienen los siguientes errores: [${errorText.join(", ")}]`;
      });
      return new ValidationsException(erroresCustomizados);
    },
  }));
  app.useGlobalFilters(
    new FallbackFilter(),
    new ErrorFilter(),
    new HealthFilter(),
  );
  const config = new DocumentBuilder()
    .setTitle('Project Factory Service')
    .setDescription('Servicio de administracion de projecto')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app
    .listen(AppModule.PORT)
    .then(() =>
      app.get(Logger).log(`Server escuchando en puerto ${AppModule.PORT}`),
    );
}
bootstrap();
