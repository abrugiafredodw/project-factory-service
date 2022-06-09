import { Module } from '@nestjs/common';
import { TalentsService } from './talents.service';
import { TalentsController } from './talents.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('TIMEOUT_TALENTS'),
        timeoutErrorMessage: 'Tiempo superado en el microservicio Talents',
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS_TALENTS'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TalentsController],
  providers: [TalentsService],
})
export class TalentsModule {}
