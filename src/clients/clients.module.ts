import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('TIMEOUT_CLIENTS'),
        timeoutErrorMessage: 'Tiempo superado en el microservicio Clients',
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS_CLIENTS'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
