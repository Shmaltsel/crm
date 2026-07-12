import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { RedisHealthIndicator } from './indicators/redis.health';

describe('Smoke: HealthController', () => {
  let controller: HealthController;

  const mockHealthCheck = {
    check: jest.fn(async (checks: Array<() => Promise<any>>) => {
      const results = await Promise.all(checks.map((c) => c()));
      return { status: 'ok', info: results, details: results };
    }),
  };
  const mockPrismaIndicator = {
    pingCheck: jest.fn().mockResolvedValue({ status: 'up' }),
  };
  const mockRedisIndicator = {
    isHealthy: jest.fn().mockResolvedValue({ status: 'up' }),
  };
  const mockPrisma = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: mockHealthCheck },
        { provide: PrismaHealthIndicator, useValue: mockPrismaIndicator },
        { provide: RedisHealthIndicator, useValue: mockRedisIndicator },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    controller = module.get(HealthController);
  });

  it('повертає healthy статус при доступних БД і Redis', async () => {
    const result = await controller.check();
    expect(mockPrismaIndicator.pingCheck).toHaveBeenCalledWith(
      'database',
      mockPrisma,
    );
    expect(mockRedisIndicator.isHealthy).toHaveBeenCalledWith('redis');
    expect(result.status).toBe('ok');
  });
});
