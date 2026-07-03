import { Injectable } from '@nestjs/common';
import { Registry, Histogram, collectDefaultMetrics } from 'prom-client';

export const registry = new Registry();
collectDefaultMetrics({ register: registry });

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [registry],
});

export const dbQueryDuration = new Histogram({
  name: 'db_query_duration_seconds',
  help: 'Prisma query duration',
  labelNames: ['model', 'action'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2],
  registers: [registry],
});

@Injectable()
export class MetricsService {
  getMetrics() {
    return registry.metrics();
  }
  getContentType() {
    return registry.contentType;
  }
}
