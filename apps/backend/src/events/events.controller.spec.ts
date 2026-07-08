import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsReportService } from './events-report.service';
import { EventsSchedulingService } from './events-scheduling.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

const mockEventsService = {
  findAllForUser: jest.fn(),
  findBySchool: jest.fn(),
  findCompletedBySchool: jest.fn(),
  findOne: jest.fn(),
  addHistoryComment: jest.fn(),
  updateHistoryComment: jest.fn(),
};

const mockEventsReportService = {
  submitReport: jest.fn(),
};

const mockEventsSchedulingService = {
  rescheduleEvent: jest.fn(),
};

const mockGuard = { canActivate: jest.fn() };

const mockJwtService = { verifyAsync: jest.fn() };

describe('EventsController (HTTP)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        { provide: EventsService, useValue: mockEventsService },
        { provide: EventsReportService, useValue: mockEventsReportService },
        {
          provide: EventsSchedulingService,
          useValue: mockEventsSchedulingService,
        },
        { provide: JwtService, useValue: mockJwtService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .overrideGuard(OwnershipGuard)
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

  describe('GET /events/school/:schoolId — findBySchool', () => {
    it('OWNERSHIP: MANAGER іншого міста отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до ресурсу іншого міста',
        ),
      );
      await request(app.getHttpServer()).get('/events/school/s-1').expect(403);
    });

    it('OWNERSHIP: HOST отримує 403 (resourceType=school не дозволено для HOST)', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до цього типу ресурсу',
        ),
      );
      await request(app.getHttpServer()).get('/events/school/s-1').expect(403);
    });

    it('SUPERADMIN отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockEventsService.findBySchool.mockResolvedValueOnce([]);
      const res = await request(app.getHttpServer())
        .get('/events/school/s-1')
        .expect(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /events/school/:schoolId/completed — findCompletedBySchool', () => {
    it('OWNERSHIP: MANAGER свого міста отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockEventsService.findCompletedBySchool.mockResolvedValueOnce([
        { id: 'ev-1' },
      ]);
      const res = await request(app.getHttpServer())
        .get('/events/school/s-1/completed')
        .expect(200);
      expect(res.body).toHaveLength(1);
    });

    it('MANAGER без cityId отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          "Менеджер не прив'язаний до міста",
        ),
      );
      await request(app.getHttpServer())
        .get('/events/school/s-1/completed')
        .expect(403);
    });
  });

  describe('GET /events/:id — findOne', () => {
    it('OWNERSHIP: HOST без призначення отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до цієї події',
        ),
      );
      const res = await request(app.getHttpServer())
        .get('/events/ev-1')
        .expect(403);
      expect(res.body.message).toBe('Немає доступу до цієї події');
    });

    it('SUPERADMIN отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockEventsService.findOne.mockResolvedValueOnce({ id: 'ev-1' });
      const res = await request(app.getHttpServer())
        .get('/events/ev-1')
        .expect(200);
      expect(res.body.id).toBe('ev-1');
    });
  });

  describe('POST /events/:id/history — addHistoryComment', () => {
    it('OWNERSHIP: MANAGER іншого міста отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до ресурсу іншого міста',
        ),
      );
      const res = await request(app.getHttpServer())
        .post('/events/ev-1/history')
        .send({ comment: 'test' })
        .expect(403);
      expect(res.body.message).toBe('Немає доступу до ресурсу іншого міста');
    });

    it('HOST призначений на подію отримує 201', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockEventsService.addHistoryComment.mockResolvedValueOnce({
        id: 'ev-1',
        history: [],
      });
      const res = await request(app.getHttpServer())
        .post('/events/ev-1/history')
        .send({ comment: 'коментар' })
        .expect(201);
    });
  });

  describe('PATCH /events/history/:historyId — updateHistoryComment', () => {
    it('OWNERSHIP: історія не знайдена — 404', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').NotFoundException)(
          'Запис історії не знайдено',
        ),
      );
      const res = await request(app.getHttpServer())
        .patch('/events/history/missing')
        .send({ comment: 'test' })
        .expect(404);
      expect(res.body.message).toBe('Запис історії не знайдено');
    });

    it('MANAGER свого міста отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockEventsService.updateHistoryComment.mockResolvedValueOnce({
        id: 'h-1',
      });
      await request(app.getHttpServer())
        .patch('/events/history/h-1')
        .send({ comment: 'оновлено' })
        .expect(200);
    });
  });
});
