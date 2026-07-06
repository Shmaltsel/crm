import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsGuard } from './metrics.guard';

@Controller('metrics')
@UseGuards(MetricsGuard)
export class MetricsController {
  constructor(private metrics: MetricsService) {}

  @Get()
  @Header('Content-Type', 'text/plain')
  async getMetrics() {
    return this.metrics.getMetrics();
  }
}
