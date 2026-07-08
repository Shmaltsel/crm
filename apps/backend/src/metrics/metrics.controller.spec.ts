import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { MetricsGuard } from './metrics.guard';

const mockGuard = { canActivate: jest.fn() };
const mockMetricsService = {
  getMetrics: jest.fn(),
  getContentType: jest.fn(),
};

describe('MetricsController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [{ provide: MetricsService, useValue: mockMetricsService }],
    })
      .overrideGuard(MetricsGuard)
      .useValue(mockGuard)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockGuard.canActivate.mockResolvedValue(true);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /metrics', () => {
    it('без токена — 403 якщо METRICS_TOKEN встановлено', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Invalid metrics token',
        ),
      );
      await request(app.getHttpServer()).get('/metrics').expect(403);
    });

    it('з правильним токеном — 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockMetricsService.getMetrics.mockResolvedValueOnce('metrics data');
      const res = await request(app.getHttpServer())
        .get('/metrics')
        .expect(200);
      expect(res.text).toBe('metrics data');
    });
  });
});
