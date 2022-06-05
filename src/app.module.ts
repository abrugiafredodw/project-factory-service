import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            name: config.get('LOG_NAME'),
            level: config.get('LOG_LEVEL'),
            transport:
              config.get('ENV') === 'prod'
                ? { target: config.get('LOG_TRANSPORT') }
                : undefined,
            useLevelLabels: true,
          },
        };
      },
    }),
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public static PORT: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.PORT = parseInt(this.configService.get('PORT'));
  }
}
