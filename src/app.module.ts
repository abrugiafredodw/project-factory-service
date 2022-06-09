import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { ClientsModule } from './clients/clients.module';
import { TalentsModule } from './talents/talents.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";

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
            transport: { target: config.get('LOG_TRANSPORT') },
            useLevelLabels: true,
          },
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'image'),
      serveRoot: '/image/',
    }),
    ClientsModule,
    TalentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public static PORT: number;
  public static ENV: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.PORT = parseInt(this.configService.get('PORT'));
    AppModule.ENV = this.configService.get('ENV');
  }
}
