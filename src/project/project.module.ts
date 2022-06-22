import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsService } from '../clients/clients.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('TIMEOUT_PROJECT'),
        timeoutErrorMessage: 'Tiempo superado en el microservicio Project',
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS_PROJECT'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ClientsService],
})
export class ProjectModule {}
