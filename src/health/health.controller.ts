import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('health')
@ApiExcludeController()
export class HealthController {
  constructor(
    private readonly configService: ConfigService,
    private health: HealthCheckService,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.memoryHealthIndicator.checkHeap('memoryHeap', 1024 * 1024 * 1024), // memoria usada no tiene que superar 1 GB
      () =>
        this.memoryHealthIndicator.checkRSS('memoryRSS', 1024 * 1024 * 1024), // la memoria asignada no debe superar a 1 GB
      () =>
        this.diskHealthIndicator.checkStorage('storage', {
          thresholdPercent: 0.7,
          path: __dirname,
        }), //el porcentaje del disco no debe exceder del 70%
    ]);
  }
}
