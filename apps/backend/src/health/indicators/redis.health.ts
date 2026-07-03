import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import Redis from 'ioredis';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  private client = new Redis(
    process.env.REDIS_URL ?? 'redis://localhost:6379',
    {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    },
  );

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      if (this.client.status !== 'ready') await this.client.connect();
      await this.client.ping();
      return this.getStatus(key, true);
    } catch (e) {
      throw new HealthCheckError(
        'Redis check failed',
        this.getStatus(key, false, { message: e.message }),
      );
    }
  }
}
