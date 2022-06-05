import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { FallbackFilter } from './filters/fallback.filter';
import { ErrorFilter } from './filters/error.filter';
import { HealthFilter } from './filters/health.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning();
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalFilters(
    new FallbackFilter(),
    new ErrorFilter(),
    new HealthFilter(),
  );
  const config = new DocumentBuilder()
    .setTitle('Project Factory Microservice')
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
