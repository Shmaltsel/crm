# FILE: apps/backend/src/issues/issues.service.spec.ts

```
import { IssuesService } from './issues.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';

const mockPrisma = {
  issueReport: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  event: { findUnique: jest.fn() },
  city: { findUnique: jest.fn() },
  user: { findUnique: jest.fn() },
};

const mockTelegram = { sendMessage: jest.fn() };
const mockNotifications = { create: jest.fn().mockResolvedValue(undefined) };

const makeService = () =>
  new IssuesService(
    mockPrisma as unknown as PrismaService,
    mockTelegram as unknown as TelegramService,
    mockNotifications as unknown as NotificationsService,
  );

const baseData = {
  eventId: 'ev-1',
  schoolName: 'Школа №1',
  eventName: 'Голограма',
  message: 'Проблема з обладнанням',
  cityId: 'city-1',
};

beforeEach(() => {
  jest.clearAllMocks();
  mockPrisma.issueReport.create.mockResolvedValue({
    id: 'issue-1',
    ...baseData,
  });
  mockPrisma.event.findUnique.mockResolvedValue({ id: 'ev-1', crew: null });
  mockPrisma.city.findUnique.mockResolvedValue({ id: 'city-1', users: [] });
});

describe('IssuesService — create', () => {
  it('створює IssueReport у БД з коректними полями', async () => {
    const service = makeService();
    await service.create(baseData);

    expect(mockPrisma.issueReport.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        eventId: 'ev-1',
        schoolName: 'Школа №1',
        eventName: 'Голограма',
        message: 'Проблема з обладнанням',
        cityId: 'city-1',
        deadline: null,
        assignedUserId: null,
        assignedUserName: null,
      }),
    });
  });

  it('конвертує deadline рядок у Date', async () => {
    const service = makeService();
    await service.create({ ...baseData, deadline: '2025-12-31' });

    const { deadline } = mockPrisma.issueReport.create.mock.calls[0][0].data;
    expect(deadline).toBeInstanceOf(Date);
    expect(deadline.getFullYear()).toBe(2025);
  });

  it('надсилає Telegram менеджеру міста якщо є chatId', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-chat-123', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    expect(mockTelegram.sendMessage).toHaveBeenCalledWith(
      'mgr-chat-123',
      expect.stringContaining('Школа №1'),
    );
  });

  it('не надсилає менеджеру якщо у нього немає chatId', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: null, telegramId: '@handle' }],
    });

    const service = makeService();
    await service.create(baseData);

    expect(mockTelegram.sendMessage).not.toHaveBeenCalled();
  });

  it('надсилає відповідальному якщо assignedUserId є і chatId відрізняється', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });
    mockPrisma.user.findUnique.mockResolvedValueOnce({
      telegramChatId: 'assignee-222',
      telegramId: null,
    });

    const service = makeService();
    await service.create({
      ...baseData,
      assignedUserId: 'user-2',
      assignedUserName: 'Василь',
    });

    expect(mockTelegram.sendMessage).toHaveBeenCalledTimes(2);
    const chatIds = mockTelegram.sendMessage.mock.calls.map(
      ([chatId]: [string]) => chatId,
    );
    expect(chatIds).toContain('mgr-111');
    expect(chatIds).toContain('assignee-222');
  });

  it('не надсилає дублю якщо менеджер і відповідальний — одна людина', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'same-chat', telegramId: null }],
    });
    mockPrisma.user.findUnique.mockResolvedValueOnce({
      telegramChatId: 'same-chat',
      telegramId: null,
    });

    const service = makeService();
    await service.create({
      ...baseData,
      assignedUserId: 'user-same',
      assignedUserName: 'Один',
    });

    expect(mockTelegram.sendMessage).toHaveBeenCalledTimes(1);
  });

  it('повідомлення містить інформацію про дедлайн якщо він є', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });

    const service = makeService();
    await service.create({ ...baseData, deadline: '2025-06-30' });

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('Дедлайн');
  });

  it('включає відповідального у повідомлення', async () => {
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });

    const service = makeService();
    await service.create({ ...baseData, assignedUserName: 'Марія Шевченко' });

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('Марія Шевченко');
  });

  it('включає учасників екіпажу у повідомлення', async () => {
    mockPrisma.event.findUnique.mockResolvedValueOnce({
      id: 'ev-1',
      crew: {
        host: { name: 'Ведучий Іван', telegramId: null },
        driver: { name: 'Водій Петро', telegramId: '123456' },
      },
    });
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-111', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('Ведучий Іван');
    expect(msg).toContain('Водій Петро');
  });

  it("formatMember: числовий telegramId → лише ім'я (не @mention)", async () => {
    mockPrisma.event.findUnique.mockResolvedValueOnce({
      id: 'ev-1',
      crew: {
        host: { name: 'Ведучий', telegramId: '987654321' },
        driver: null,
      },
    });
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-1', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    // числовий id — не повинно бути @
    expect(msg).not.toMatch(/@\d/);
    expect(msg).toContain('Ведучий');
  });

  it('formatMember: @username telegramId → @mention', async () => {
    mockPrisma.event.findUnique.mockResolvedValueOnce({
      id: 'ev-1',
      crew: {
        host: { name: 'Ведучий', telegramId: '@ivanko' },
        driver: null,
      },
    });
    mockPrisma.city.findUnique.mockResolvedValueOnce({
      id: 'city-1',
      users: [{ telegramChatId: 'mgr-1', telegramId: null }],
    });

    const service = makeService();
    await service.create(baseData);

    const msg = mockTelegram.sendMessage.mock.calls[0][1] as string;
    expect(msg).toContain('@ivanko');
  });

  it('повертає створений issue', async () => {
    const service = makeService();
    const result = await service.create(baseData);

    expect(result).toMatchObject({ id: 'issue-1' });
  });
});

describe('IssuesService — findByCityId', () => {
  it('повертає активні проблеми для міста (виключає Виконано)', async () => {
    const issues = [{ id: 'i-1' }, { id: 'i-2' }];
    mockPrisma.issueReport.findMany.mockResolvedValueOnce(issues);

    const service = makeService();
    const result = await service.findByCityId('city-1');

    expect(mockPrisma.issueReport.findMany).toHaveBeenCalledWith({
      where: { cityId: 'city-1', status: { not: 'Виконано' } },
      orderBy: { createdAt: 'desc' },
    });
    expect(result).toHaveLength(2);
  });

  it('повертає порожній масив якщо активних проблем немає', async () => {
    mockPrisma.issueReport.findMany.mockResolvedValueOnce([]);

    const service = makeService();
    const result = await service.findByCityId('city-empty');

    expect(result).toEqual([]);
  });
});

describe('IssuesService — updateStatus', () => {
  it('оновлює статус проблеми', async () => {
    mockPrisma.issueReport.update.mockResolvedValueOnce({
      id: 'i-1',
      status: 'Виконано',
    });

    const service = makeService();
    const result = await service.updateStatus('i-1', 'Виконано');

    expect(mockPrisma.issueReport.update).toHaveBeenCalledWith({
      where: { id: 'i-1' },
      data: { status: 'Виконано' },
    });
    expect(result).toMatchObject({ status: 'Виконано' });
  });

  it('може встановити довільний статус рядком', async () => {
    mockPrisma.issueReport.update.mockResolvedValueOnce({
      id: 'i-2',
      status: 'В процесі',
    });

    const service = makeService();
    await service.updateStatus('i-2', 'В процесі');

    const callData = mockPrisma.issueReport.update.mock.calls[0][0];
    expect(callData.data.status).toBe('В процесі');
  });
});

```

# FILE: apps/backend/src/issues/issues.service.ts

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class IssuesService {
  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
    private notificationsService: NotificationsService,
  ) {}

  async create(data: {
    eventId: string;
    schoolName: string;
    eventName: string;
    message: string;
    cityId: string;
    deadline?: string;
    assignedUserId?: string;
    assignedUserName?: string;
  }) {
    const issue = await this.prisma.issueReport.create({
      data: {
        eventId: data.eventId,
        schoolName: data.schoolName,
        eventName: data.eventName,
        message: data.message,
        cityId: data.cityId,
        deadline: data.deadline ? new Date(data.deadline) : null,
        assignedUserId: data.assignedUserId || null,
        assignedUserName: data.assignedUserName || null,
      },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: data.eventId },
      include: {
        crew: {
          include: {
            host: { select: { name: true, telegramId: true } },
            driver: { select: { name: true, telegramId: true } },
          },
        },
      },
    });

    const formatMember = (user: {
      name: string;
      telegramId: string | null;
    }) => {
      if (!user.telegramId) return user.name;
      const clean = user.telegramId.replace(/^@/, '');
      return /^\d+$/.test(clean) ? user.name : `@${clean} (${user.name})`;
    };

    const crewMembers: string[] = [];
    if (event?.crew?.host)
      crewMembers.push(`🎙️ Ведучий: ${formatMember(event.crew.host)}`);
    if (event?.crew?.driver)
      crewMembers.push(`🚗 Водій: ${formatMember(event.crew.driver)}`);

    const city = await this.prisma.city.findUnique({
      where: { id: data.cityId },
      include: { users: { where: { role: 'MANAGER' }, take: 1 } },
    });

    let assigneeChatId: string | null = null;
    if (data.assignedUserId) {
      const assignee = await this.prisma.user.findUnique({
        where: { id: data.assignedUserId },
        select: { telegramChatId: true, telegramId: true },
      });
      assigneeChatId =
        assignee?.telegramChatId ||
        (assignee?.telegramId && /^\d+$/.test(assignee.telegramId)
          ? assignee.telegramId
          : null);
    }

    const deadlineStr = data.deadline
      ? `\n⏰ <b>Дедлайн:</b> ${new Date(data.deadline).toLocaleDateString('uk-UA')}`
      : '';

    const assigneeStr = data.assignedUserName
      ? `\n👤 <b>Відповідальний:</b> ${data.assignedUserName}`
      : '';

    const manager = city?.users?.[0];
    const managerChatId =
      manager?.telegramChatId ||
      (manager?.telegramId && /^\d+$/.test(manager.telegramId)
        ? manager.telegramId
        : null);

    const text =
      `🚨 <b>Нова проблема!</b>\n\n` +
      `🏫 <b>Заклад:</b> ${data.schoolName}\n` +
      `📅 <b>Подія:</b> ${data.eventName}\n\n` +
      `💬 <b>Повідомлення:</b>\n${data.message}` +
      deadlineStr +
      assigneeStr +
      (crewMembers.length > 0
        ? `\n\n👥 <b>Екіпаж:</b>\n${crewMembers.join('\n')}`
        : '') +
      `\n\n<i>Деталі у CRM: <a href="https://app.svitlo-znan.app">Посилання</a></i>`;

    if (managerChatId)
      await this.telegramService.sendMessage(managerChatId, text);

    if (assigneeChatId && assigneeChatId !== managerChatId) {
      await this.telegramService.sendMessage(assigneeChatId, text);
    }

    const notificationPayload = {
      issueId: issue.id,
      schoolName: data.schoolName,
      eventName: data.eventName,
      message: data.message,
    };
    if (manager?.id) {
      this.notificationsService
        .create(manager.id, 'ISSUE_CREATED', notificationPayload)
        .catch(() => {});
    }
    if (data.assignedUserId) {
      this.notificationsService
        .create(data.assignedUserId, 'ISSUE_CREATED', notificationPayload)
        .catch(() => {});
    }

    return issue;
  }

  async findByCityId(cityId: string) {
    return this.prisma.issueReport.findMany({
      where: {
        cityId,
        status: { not: 'Виконано' },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.issueReport.update({
      where: { id },
      data: { status },
    });
  }
}

```

# FILE: apps/backend/src/metrics/metrics.controller.spec.ts

```
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

```

# FILE: apps/backend/src/metrics/metrics.controller.ts

```
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

```

# FILE: apps/backend/src/metrics/metrics.guard.spec.ts

```
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { MetricsGuard } from './metrics.guard';

describe('MetricsGuard', () => {
  let guard: MetricsGuard;

  const createContext = (
    headers: Record<string, string> = {},
  ): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ headers }),
      }),
    }) as any;

  beforeEach(() => {
    guard = new MetricsGuard();
  });

  afterEach(() => {
    delete process.env.METRICS_TOKEN;
  });

  it('без METRICS_TOKEN в env пропускає всі запити', () => {
    const ok = guard.canActivate(createContext({}));
    expect(ok).toBe(true);
  });

  it('з METRICS_TOKEN і правильним X-Metrics-Token пропускає', () => {
    process.env.METRICS_TOKEN = 'secret123';
    const ok = guard.canActivate(
      createContext({ 'x-metrics-token': 'secret123' }),
    );
    expect(ok).toBe(true);
  });

  it('з METRICS_TOKEN і неправильним X-Metrics-Token кидає Forbidden', () => {
    process.env.METRICS_TOKEN = 'secret123';
    expect(() =>
      guard.canActivate(createContext({ 'x-metrics-token': 'wrong' })),
    ).toThrow(ForbiddenException);
  });

  it('з METRICS_TOKEN і без заголовка кидає Forbidden', () => {
    process.env.METRICS_TOKEN = 'secret123';
    expect(() => guard.canActivate(createContext({}))).toThrow(
      ForbiddenException,
    );
  });
});

```

# FILE: apps/backend/src/metrics/metrics.guard.ts

```
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class MetricsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const token = process.env.METRICS_TOKEN;
    if (!token) return true;

    const req = context.switchToHttp().getRequest();
    const headerToken = req.headers['x-metrics-token'];

    if (headerToken !== token) {
      throw new ForbiddenException('Invalid metrics token');
    }
    return true;
  }
}

```

# FILE: apps/backend/src/metrics/metrics.interceptor.ts

```
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { httpRequestDuration } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const start = process.hrtime.bigint();

    return next.handle().pipe(
      tap(() => {
        const durationSec = Number(process.hrtime.bigint() - start) / 1e9;
        const route = req.route?.path ?? req.url;
        httpRequestDuration.observe(
          { method: req.method, route, status_code: res.statusCode },
          durationSec,
        );
      }),
    );
  }
}

```

# FILE: apps/backend/src/metrics/metrics.module.ts

```
import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { MetricsInterceptor } from './metrics.interceptor';

@Global()
@Module({
  controllers: [MetricsController],
  providers: [
    MetricsService,
    { provide: APP_INTERCEPTOR, useClass: MetricsInterceptor },
  ],
  exports: [MetricsService],
})
export class MetricsModule {}

```

# FILE: apps/backend/src/metrics/metrics.service.ts

```
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

```

# FILE: apps/backend/src/notifications/notifications.controller.ts

```
import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  findAll(@CurrentUser() user: JwtUser, @Query('page') page?: number) {
    return this.service.findAll(user.sub, page ?? 1);
  }

  @Get('unread-count')
  unreadCount(@CurrentUser() user: JwtUser) {
    return this.service.unreadCount(user.sub).then((c) => ({ count: c }));
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.service.markRead(id, user.sub);
  }

  @Patch('read-all')
  markAllRead(@CurrentUser() user: JwtUser) {
    return this.service.markAllRead(user.sub);
  }
}

```

# FILE: apps/backend/src/notifications/notifications.module.ts

```
import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}

```

# FILE: apps/backend/src/notifications/notifications.service.ts

```
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, type: string, payload: Record<string, unknown>) {
    return this.prisma.notification.create({
      data: { userId, type, payload: payload as Prisma.InputJsonValue },
    });
  }

  async findAll(userId: string, page = 1, take = 20) {
    const where = { userId };
    const [items, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * take,
        take,
      }),
      this.prisma.notification.count({ where }),
    ]);
    return { items, total, page, pageCount: Math.ceil(total / take) };
  }

  async unreadCount(userId: string) {
    return this.prisma.notification.count({
      where: { userId, readAt: null },
    });
  }

  async markRead(id: string, userId: string) {
    return this.prisma.notification.updateMany({
      where: { id, userId },
      data: { readAt: new Date() },
    });
  }

  async markAllRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
  }
}

```

# FILE: apps/backend/src/prisma/prisma.mock.ts

```
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from './prisma.service';
export type MockPrismaService = DeepMockProxy<PrismaService>;

export const createPrismaMock = (): MockPrismaService => {
  return mockDeep<PrismaService>();
};

```

# FILE: apps/backend/src/prisma/prisma.module.ts

```
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

@Global()
@Module({
  providers: [PrismaService, OwnershipGuard],
  exports: [PrismaService, OwnershipGuard],
})
export class PrismaModule {}

```

# FILE: apps/backend/src/prisma/prisma.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

```

# FILE: apps/backend/src/prisma/prisma.service.ts

```
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { dbQueryDuration } from '../metrics/metrics.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    return this.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            const start = process.hrtime.bigint();
            const result = await query(args);
            const durationSec = Number(process.hrtime.bigint() - start) / 1e9;
            dbQueryDuration.observe(
              { model: model ?? 'unknown', action: operation },
              durationSec,
            );
            return result;
          },
        },
      },
    }) as unknown as PrismaService;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

```

# FILE: apps/backend/src/projects/dto/create-project.dto.ts

```
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  pricePerChild?: number;
}

```

# FILE: apps/backend/src/projects/dto/update-project.dto.ts

```
import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

```

# FILE: apps/backend/src/projects/projects.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCookieAuth,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IsOptional, IsString } from 'class-validator';

class ProjectStatsQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cityId?: string;
}

@ApiTags('Projects')
@ApiCookieAuth('access_token')
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({ summary: 'Список проєктів (типів шоу)' })
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Отримати проєкт за ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @ApiOperation({ summary: 'Статистика проєкту' })
  @Get(':id/stats')
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  async getStats(
    @Param('id') id: string,
    @Query() query: ProjectStatsQueryDto,
    @CurrentUser() user: JwtUser,
  ) {
    let effectiveCityId: string | undefined = query.cityId;
    if (user.role === 'MANAGER') {
      const me = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { cityId: true },
      });
      effectiveCityId = me?.cityId ?? undefined;
    }
    return this.projectsService.getStats(id, effectiveCityId);
  }

  @ApiOperation({ summary: 'Створити проєкт' })
  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }

  @ApiOperation({ summary: 'Оновити проєкт' })
  @Patch(':id')
  @Roles('SUPERADMIN')
  update(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectsService.update(id, body);
  }

  @ApiOperation({ summary: 'Видалити проєкт' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}

```

# FILE: apps/backend/src/projects/projects.module.ts

```
import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}

```

# FILE: apps/backend/src/projects/projects.service.ts

```
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'asc' } });
  }

  create(data: { name: string; color?: string; pricePerChild?: number }) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        color: data.color ?? '#3b82f6',
        pricePerChild: data.pricePerChild ?? 0,
      },
    });
  }

  update(
    id: string,
    data: { name?: string; color?: string; pricePerChild?: number },
  ) {
    return this.prisma.project.update({ where: { id }, data });
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }

  async getStats(projectId: string, cityId?: string) {
    const where: Record<string, unknown> = { project: projectId };
    if (cityId) where.cityId = cityId;

    const events = await this.prisma.event.findMany({
      where,
      include: {
        report: {
          select: {
            totalSum: true,
            schoolSum: true,
            remainderSum: true,
            rating: true,
          },
        },
      },
    });

    const totalEvents = events.length;
    const completedEvents = events.filter(
      (e) => e.status === 'REPORT' || e.status === 'DONE',
    ).length;
    const totalRevenue = events.reduce(
      (sum, e) => sum + Number(e.report?.totalSum ?? 0),
      0,
    );
    const totalProfit = events.reduce(
      (sum, e) => sum + Number(e.report?.remainderSum ?? 0),
      0,
    );
    const totalSchoolSum = events.reduce(
      (sum, e) => sum + Number(e.report?.schoolSum ?? 0),
      0,
    );
    const rated = events.filter((e) => e.report?.rating);
    const avgRating = rated.length
      ? rated.reduce((sum, e) => sum + Number(e.report!.rating!), 0) /
        rated.length
      : 0;

    return {
      totalEvents,
      completedEvents,
      totalRevenue,
      totalProfit,
      totalSchoolSum,
      avgRating: Math.round(avgRating * 10) / 10,
    };
  }
}

```

# FILE: apps/backend/src/reports/dto/create-report.dto.ts

```
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class ExpenseItemDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;
}

class SalaryRecordDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @IsOptional()
  @IsString()
  role?: string;
}

export class CreateReportDto {
  @IsString()
  eventId: string;

  @IsOptional()
  @IsBoolean()
  announcementDone?: boolean;

  @IsOptional()
  @IsBoolean()
  materialShown?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  childrenCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  classesCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  privilegedCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  showingsCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalSum?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  schoolSum?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  remainderSum?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;

  @IsOptional()
  @IsBoolean()
  directorSatisfied?: boolean;

  @IsOptional()
  @IsBoolean()
  teachersSatisfied?: boolean;

  @IsOptional()
  @IsBoolean()
  hadIssues?: boolean;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExpenseItemDto)
  expenses?: ExpenseItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalaryRecordDto)
  salaries?: SalaryRecordDto[];
}

```

# FILE: apps/backend/src/reports/dto/revision.dto.ts

```
import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RevisionDto {
  @ApiProperty({
    description: 'Коментар при поверненні на доопрацювання або відхиленні',
  })
  @IsString()
  @MinLength(1)
  comment: string;
}

```

# FILE: apps/backend/src/reports/dto/update-report.dto.ts

```
import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}

```

# FILE: apps/backend/src/reports/reports.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RevisionDto } from './dto/revision.dto';

@ApiTags('Reports')
@ApiCookieAuth('access_token')
@Controller('reports')
@UseGuards(AuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({ summary: 'Створити чернетку звіту (Draft)' })
  @Post()
  create(@Body() dto: CreateReportDto, @CurrentUser() user: JwtUser) {
    return this.reportsService.create(dto, user);
  }

  @ApiOperation({
    summary: 'Оновити поля звіту (лише DRAFT або NEEDS_REVISION)',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateReportDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.reportsService.update(id, dto, user);
  }

  @ApiOperation({ summary: 'Подати звіт (DRAFT/NEEDS_REVISION → SUBMITTED)' })
  @Post(':id/submit')
  submit(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.reportsService.submit(id, user);
  }

  @ApiOperation({
    summary:
      'Затвердити звіт (SUBMITTED → APPROVED, лише MANAGER/SUPERADMIN/OWNER)',
  })
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  @Post(':id/approve')
  approve(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.reportsService.approve(id, user);
  }

  @ApiOperation({
    summary: 'Повернути звіт на доопрацювання (SUBMITTED → NEEDS_REVISION)',
  })
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  @Post(':id/request-revision')
  requestRevision(
    @Param('id') id: string,
    @Body() dto: RevisionDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.reportsService.requestRevision(id, dto, user);
  }

  @ApiOperation({ summary: 'Відхилити звіт (SUBMITTED → REJECTED)' })
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  @Post(':id/reject')
  reject(
    @Param('id') id: string,
    @Body() dto: RevisionDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.reportsService.reject(id, dto, user);
  }

  @ApiOperation({ summary: 'Отримати звіт за подією' })
  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string) {
    return this.reportsService.findByEvent(eventId);
  }

  @ApiOperation({ summary: 'Список поданих звітів (для MANAGER)' })
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  @Get('submitted')
  findSubmitted(@Query('page') page?: string, @Query('take') take?: string) {
    return this.reportsService.findSubmitted(
      page ? Number(page) : 1,
      take ? Number(take) : 20,
    );
  }
}

```

# FILE: apps/backend/src/reports/reports.module.ts

```
import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [NotificationsModule, TelegramModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}

```

# FILE: apps/backend/src/reports/reports.service.ts

```
import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { NotificationsService } from '../notifications/notifications.service';
import { TelegramService } from '../telegram/telegram.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RevisionDto } from './dto/revision.dto';
import { ReportStatus } from '@prisma/client';
import { Prisma } from '@prisma/client';

const ALLOWED_TRANSITIONS: Record<ReportStatus, ReportStatus[]> = {
  DRAFT: ['SUBMITTED'],
  SUBMITTED: ['APPROVED', 'NEEDS_REVISION', 'REJECTED'],
  NEEDS_REVISION: ['SUBMITTED'],
  APPROVED: [],
  REJECTED: ['CLOSED'],
  CLOSED: [],
};

@Injectable()
export class ReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly telegramService: TelegramService,
  ) {}

  private async assertCrewMember(
    eventId: string,
    userId: string,
  ): Promise<void> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { crew: true },
    });
    if (!event) throw new NotFoundException('events.notFound');
    if (!event.crew) throw new ForbiddenException('report.noCrew');
    if (event.crew.hostId !== userId && event.crew.driverId !== userId) {
      throw new ForbiddenException('report.notCrewMember');
    }
  }

  private async assertReportOwner(
    reportId: string,
    userId: string,
    eventId: string,
  ) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { crew: true },
    });
    if (!event?.crew) throw new ForbiddenException('report.notAuthor');
    if (event.crew.hostId !== userId && event.crew.driverId !== userId) {
      throw new ForbiddenException('report.notAuthor');
    }
  }

  private assertTransition(from: ReportStatus, to: ReportStatus) {
    const allowed = ALLOWED_TRANSITIONS[from];
    if (!allowed?.includes(to)) {
      throw new BadRequestException('report.invalidTransition');
    }
  }

  async create(dto: CreateReportDto, user: JwtUser) {
    await this.assertCrewMember(dto.eventId, user.sub);

    const data: Prisma.EventReportCreateInput = {
      event: { connect: { id: dto.eventId } },
      status: 'DRAFT',
    };

    if (dto.announcementDone !== undefined)
      data.announcementDone = dto.announcementDone;
    if (dto.materialShown !== undefined) data.materialShown = dto.materialShown;
    if (dto.childrenCount !== undefined) data.childrenCount = dto.childrenCount;
    if (dto.classesCount !== undefined) data.classesCount = dto.classesCount;
    if (dto.privilegedCount !== undefined)
      data.privilegedCount = dto.privilegedCount;
    if (dto.showingsCount !== undefined) data.showingsCount = dto.showingsCount;
    if (dto.totalSum !== undefined)
      data.totalSum = new Prisma.Decimal(dto.totalSum);
    if (dto.schoolSum !== undefined)
      data.schoolSum = new Prisma.Decimal(dto.schoolSum);
    if (dto.remainderSum !== undefined)
      data.remainderSum = new Prisma.Decimal(dto.remainderSum);
    if (dto.rating !== undefined) data.rating = dto.rating;
    if (dto.directorSatisfied !== undefined)
      data.directorSatisfied = dto.directorSatisfied;
    if (dto.teachersSatisfied !== undefined)
      data.teachersSatisfied = dto.teachersSatisfied;
    if (dto.hadIssues !== undefined) data.hadIssues = dto.hadIssues;
    if (dto.comment !== undefined) data.comment = dto.comment;

    return this.prisma.eventReport.create({ data });
  }

  async update(id: string, dto: UpdateReportDto, user: JwtUser) {
    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: { event: { include: { crew: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    if (report.status !== 'DRAFT' && report.status !== 'NEEDS_REVISION') {
      throw new BadRequestException('report.notEditable');
    }
    await this.assertReportOwner(id, user.sub, report.eventId);

    const data: Prisma.EventReportUpdateInput = {};

    if (dto.announcementDone !== undefined)
      data.announcementDone = dto.announcementDone;
    if (dto.materialShown !== undefined) data.materialShown = dto.materialShown;
    if (dto.childrenCount !== undefined) data.childrenCount = dto.childrenCount;
    if (dto.classesCount !== undefined) data.classesCount = dto.classesCount;
    if (dto.privilegedCount !== undefined)
      data.privilegedCount = dto.privilegedCount;
    if (dto.showingsCount !== undefined) data.showingsCount = dto.showingsCount;
    if (dto.totalSum !== undefined)
      data.totalSum = new Prisma.Decimal(dto.totalSum);
    if (dto.schoolSum !== undefined)
      data.schoolSum = new Prisma.Decimal(dto.schoolSum);
    if (dto.remainderSum !== undefined)
      data.remainderSum = new Prisma.Decimal(dto.remainderSum);
    if (dto.rating !== undefined) data.rating = dto.rating;
    if (dto.directorSatisfied !== undefined)
      data.directorSatisfied = dto.directorSatisfied;
    if (dto.teachersSatisfied !== undefined)
      data.teachersSatisfied = dto.teachersSatisfied;
    if (dto.hadIssues !== undefined) data.hadIssues = dto.hadIssues;
    if (dto.comment !== undefined) data.comment = dto.comment;

    return this.prisma.eventReport.update({ where: { id }, data });
  }

  async submit(id: string, user: JwtUser) {
    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: {
        event: {
          include: {
            crew: true,
            school: { select: { name: true } },
            city: {
              include: {
                manager: { select: { telegramChatId: true, telegramId: true } },
              },
            },
          },
        },
      },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'SUBMITTED');
    await this.assertReportOwner(id, user.sub, report.eventId);

    const updated = await this.prisma.eventReport.update({
      where: { id },
      data: { status: 'SUBMITTED', submittedAt: new Date() },
    });

    const manager = report.event.city.manager;
    const chatId =
      manager?.telegramChatId ||
      (manager?.telegramId && /^\d+$/.test(manager.telegramId)
        ? manager.telegramId
        : null);
    if (chatId) {
      const schoolName = report.event.school?.name || 'Невідома школа';
      this.telegramService
        .sendMessage(
          chatId,
          `🚨 Новий звіт потребує затвердження: ${schoolName}`,
        )
        .catch(() => {});
    }

    const notifyUserId =
      report.event.responsibleId || report.event.city.managerId;
    if (notifyUserId) {
      this.notificationsService
        .create(notifyUserId, 'REPORT_SUBMITTED', {
          eventId: report.eventId,
          schoolName: report.event.school?.name,
          title: 'Звіт надіслано на затвердження',
        })
        .catch(() => {});
    }

    return updated;
  }

  async approve(id: string, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('report.notApprover');
    }

    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: { event: { include: { crew: true, school: true, city: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'APPROVED');

    const [approved] = await this.prisma.$transaction([
      this.prisma.eventReport.update({
        where: { id },
        data: {
          status: 'APPROVED',
          approvedAt: new Date(),
          approvedBy: user.sub,
        },
      }),
      this.prisma.event.update({
        where: { id: report.eventId },
        data: { status: 'RE_SALE' },
      }),
    ]);

    const notifyUserId =
      report.event.responsibleId || report.event.city.managerId;
    if (notifyUserId) {
      this.notificationsService
        .create(notifyUserId, 'REPORT_APPROVED', {
          eventId: report.eventId,
          schoolName: report.event.school?.name,
          title: 'Звіт підтверджено',
        })
        .catch(() => {});
    }

    return approved;
  }

  async requestRevision(id: string, dto: RevisionDto, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('report.notApprover');
    }

    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: { event: { include: { crew: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'NEEDS_REVISION');

    return this.prisma.eventReport.update({
      where: { id },
      data: { status: 'NEEDS_REVISION', revisionComment: dto.comment },
    });
  }

  async reject(id: string, dto: RevisionDto, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('report.notApprover');
    }

    const report = await this.prisma.eventReport.findUnique({
      where: { id },
      include: { event: { include: { crew: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    this.assertTransition(report.status, 'REJECTED');

    return this.prisma.eventReport.update({
      where: { id },
      data: { status: 'REJECTED', revisionComment: dto.comment },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.eventReport.findUnique({
      where: { eventId },
      include: {
        expenseItems: true,
        salaryRecords: true,
        photos: true,
      },
    });
  }

  async findSubmitted(page = 1, take = 20) {
    const skip = (page - 1) * take;
    const [items, total] = await Promise.all([
      this.prisma.eventReport.findMany({
        where: { status: 'SUBMITTED' },
        include: {
          expenseItems: true,
          salaryRecords: true,
          event: {
            include: {
              school: { select: { name: true, type: true, phone: true, director: true } },
              city: { select: { name: true } },
              crew: {
                include: {
                  host: { select: { id: true, name: true } },
                  driver: { select: { id: true, name: true } },
                },
              },
            },
          },
        },
        orderBy: { submittedAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.eventReport.count({ where: { status: 'SUBMITTED' } }),
    ]);
    return { items, total, page, pageCount: Math.ceil(total / take) };
  }
}

```

# FILE: apps/backend/src/salary/dto/create-salary.dto.ts

```
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  Min,
  Max,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalaryItemDto {
  @ApiProperty({ description: 'ID працівника' })
  @IsString()
  employeeId: string;

  @ApiProperty({ description: 'Сума нарахування' })
  @IsNumber()
  @Min(1)
  @Max(99999)
  @Type(() => Number)
  amount: number;

  @ApiProperty({ description: 'Коментар', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class CreateSalaryDto {
  @ApiProperty({ description: 'ID звіту (Approved)' })
  @IsString()
  reportId: string;

  @ApiProperty({ type: [CreateSalaryItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalaryItemDto)
  items: CreateSalaryItemDto[];
}

```

# FILE: apps/backend/src/salary/dto/mark-paid.dto.ts

```
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkPaidDto {
  @ApiProperty({ description: 'Коментар при виплаті', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}

```

# FILE: apps/backend/src/salary/salary.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';

@ApiTags('salary')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard, RolesGuard)
@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post()
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Створити записи нарахувань за звітом' })
  create(@Body() dto: CreateSalaryDto, @CurrentUser() user: JwtUser) {
    return this.salaryService.create(dto, user);
  }

  @Get('mine')
  @ApiOperation({ summary: 'Мої нарахування' })
  findMine(@CurrentUser() user: JwtUser, @Query('cityId') cityId?: string) {
    return this.salaryService.findMine(user, cityId);
  }

  @Get()
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Всі нарахування (менеджер/адмін)' })
  findAll(@CurrentUser() user: JwtUser, @Query('cityId') cityId?: string) {
    return this.salaryService.findAll(user, cityId);
  }

  @Patch(':id/mark-paid')
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Позначити нарахування як виплачене' })
  markPaid(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.salaryService.markPaid(id, user);
  }
}

```

# FILE: apps/backend/src/salary/salary.module.ts

```
import { Module } from '@nestjs/common';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SalaryController],
  providers: [SalaryService],
  exports: [SalaryService],
})
export class SalaryModule {}

```

# FILE: apps/backend/src/salary/salary.service.ts

```
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SalaryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSalaryDto, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('salary.notManager');
    }

    const report = await this.prisma.eventReport.findUnique({
      where: { id: dto.reportId },
      include: { event: { select: { id: true, cityId: true } } },
    });
    if (!report) throw new NotFoundException('report.notFound');
    if (report.status !== 'APPROVED')
      throw new BadRequestException('salary.reportNotApproved');

    if (user.role === 'MANAGER') {
      const cityIds = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { managedCities: { select: { id: true } } },
      });
      const managedIds = cityIds?.managedCities.map((c) => c.id) ?? [];
      if (!managedIds.includes(report.event.cityId)) {
        throw new ForbiddenException('salary.notCityManager');
      }
    }

    const hasLargeAmounts = dto.items.some((item) => item.amount >= 100000);
    if (hasLargeAmounts && user.role !== 'SUPERADMIN') {
      throw new BadRequestException('salary.amountTooLarge');
    }

    return this.prisma.$transaction(async (tx) => {
      const records = await tx.salaryRecord.createManyAndReturn({
        data: dto.items.map((item) => ({
          employeeId: item.employeeId,
          eventId: report.eventId,
          reportId: dto.reportId,
          amount: new Prisma.Decimal(item.amount),
          comment: item.comment,
          status: 'PENDING' as const,
          createdBy: user.sub,
        })),
      });
      return records;
    });
  }

  async findMine(user: JwtUser, cityId?: string) {
    const where: Record<string, unknown> = { employeeId: user.sub };
    if (cityId) {
      where.event = { cityId };
    }
    return this.prisma.salaryRecord.findMany({
      where,
      include: {
        event: { select: { date: true, project: true, cityId: true } },
        report: { select: { status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(user: JwtUser, cityId?: string) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('salary.notAllowed');
    }

    const where: Record<string, unknown> = {};
    if (cityId) {
      where.event = { cityId };
    } else if (user.role === 'MANAGER') {
      const cityIds = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { managedCities: { select: { id: true } } },
      });
      const managedIds = cityIds?.managedCities.map((c) => c.id) ?? [];
      where.event = { cityId: { in: managedIds } };
    }

    return this.prisma.salaryRecord.findMany({
      where,
      include: {
        employee: { select: { id: true, name: true, role: true } },
        event: {
          select: { id: true, date: true, project: true, cityId: true },
        },
        report: { select: { status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markPaid(id: string, user: JwtUser) {
    if (
      user.role !== 'MANAGER' &&
      user.role !== 'SUPERADMIN' &&
      user.role !== 'OWNER'
    ) {
      throw new ForbiddenException('salary.notAllowed');
    }

    const record = await this.prisma.salaryRecord.findUnique({
      where: { id },
      include: { event: { select: { cityId: true } } },
    });
    if (!record) throw new NotFoundException('salary.notFound');
    if (record.status !== 'PENDING')
      throw new BadRequestException('salary.notPending');

    if (user.role === 'MANAGER') {
      const cityIds = await this.prisma.user.findUnique({
        where: { id: user.sub },
        select: { managedCities: { select: { id: true } } },
      });
      const managedIds = cityIds?.managedCities.map((c) => c.id) ?? [];
      if (!managedIds.includes(record.event?.cityId ?? '')) {
        throw new ForbiddenException('salary.notCityManager');
      }
    }

    return this.prisma.salaryRecord.update({
      where: { id },
      data: { status: 'PAID', paidAt: new Date(), paidBy: user.sub },
    });
  }
}

```

# FILE: apps/backend/src/school-comments/school-comments.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SchoolCommentsService } from './school-comments.service';
import type { CommentType } from '@prisma/client';

@ApiTags('school-comments')
@ApiCookieAuth('access_token')
@UseGuards(AuthGuard, RolesGuard)
@Controller('schools/:schoolId/comments')
export class SchoolCommentsController {
  constructor(private readonly service: SchoolCommentsService) {}

  @Post()
  @Roles('MANAGER', 'SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Додати коментар до школи' })
  create(
    @Param('schoolId') schoolId: string,
    @Body() body: { type: CommentType; text: string },
    @CurrentUser() user: JwtUser,
  ) {
    return this.service.create(schoolId, body.type, body.text, user);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати коментарі школи' })
  findAll(
    @Param('schoolId') schoolId: string,
    @Query('type') type?: CommentType,
    @Query('page') page?: number,
    @Query('take') take?: number,
  ) {
    return this.service.findAll(schoolId, type, page ?? 1, take ?? 20);
  }

  @Delete(':id')
  @Roles('SUPERADMIN', 'OWNER')
  @ApiOperation({ summary: 'Мʼяко видалити коментар' })
  softDelete(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.service.softDelete(id, user);
  }
}

```

# FILE: apps/backend/src/school-comments/school-comments.module.ts

```
import { Module } from '@nestjs/common';
import { SchoolCommentsController } from './school-comments.controller';
import { SchoolCommentsService } from './school-comments.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SchoolCommentsController],
  providers: [SchoolCommentsService],
  exports: [SchoolCommentsService],
})
export class SchoolCommentsModule {}

```

# FILE: apps/backend/src/school-comments/school-comments.service.ts

```
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import type { CommentType } from '@prisma/client';

@Injectable()
export class SchoolCommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    schoolId: string,
    type: CommentType,
    text: string,
    user: JwtUser,
  ) {
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
    });
    if (!school) throw new NotFoundException('school.notFound');

    return this.prisma.schoolComment.create({
      data: { schoolId, authorId: user.sub, type, text },
      include: { author: { select: { id: true, name: true, role: true } } },
    });
  }

  async findAll(schoolId: string, type?: CommentType, page = 1, take = 20) {
    const where: Record<string, unknown> = { schoolId, deletedAt: null };
    if (type) where.type = type;

    const [items, total] = await Promise.all([
      this.prisma.schoolComment.findMany({
        where,
        include: { author: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * take,
        take,
      }),
      this.prisma.schoolComment.count({ where }),
    ]);

    return { items, total, page, take, pageCount: Math.ceil(total / take) };
  }

  async softDelete(id: string, user: JwtUser) {
    if (user.role !== 'SUPERADMIN' && user.role !== 'OWNER') {
      throw new ForbiddenException('comments.notAllowed');
    }
    const comment = await this.prisma.schoolComment.findUnique({
      where: { id },
    });
    if (!comment) throw new NotFoundException('comment.notFound');

    return this.prisma.schoolComment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

```

# FILE: apps/backend/src/schools/dto/bulk-import.dto.ts

```
import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BulkImportDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiPropertyOptional({ example: 'Школа', enum: ['Школа', 'Садочок'] })
  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';
}

```

# FILE: apps/backend/src/schools/dto/create-school.dto.ts

```
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Ліцей №5' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'school', enum: ['school', 'kindergarten'] })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiPropertyOptional({ example: 'https://example.com/school-page' })
  @IsOptional()
  @IsString()
  sourceUrl?: string;

  @ApiPropertyOptional({ example: 'Іваненко Іван Іванович' })
  @IsOptional()
  @IsString()
  director?: string;

  @ApiPropertyOptional({ example: '+380501234567' })
  @IsOptional()
  @IsString()
  phone?: string;
}

```

# FILE: apps/backend/src/schools/dto/find-contacts-query.dto.ts

```
import { IsOptional, IsString, MinLength } from 'class-validator';

export class FindContactsQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  q?: string;

  @IsOptional()
  @IsString()
  city?: string;
}

```

# FILE: apps/backend/src/schools/dto/find-schools-query.dto.ts

```
import { IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class FindSchoolsQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  q?: string;

  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';
}

```

# FILE: apps/backend/src/schools/dto/school-query.dto.ts

```
import { IsOptional, IsIn, IsString } from 'class-validator';
import { PageOptionsDto } from '../../common/dto/page-options.dto';

export class SchoolQueryDto extends PageOptionsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';

  @IsOptional()
  @IsIn(['new', 'planned', 'inProgress', 'notConfirmed', 'done'])
  stage?: 'new' | 'planned' | 'inProgress' | 'notConfirmed' | 'done';

  @IsOptional()
  @IsIn(['small', 'medium', 'large'])
  size?: 'small' | 'medium' | 'large';
}

```

# FILE: apps/backend/src/schools/dto/update-school.dto.ts

```
import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsEmail,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class UpdateSchoolDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  childrenCount?: number;

  @IsOptional()
  @IsBoolean()
  isHotClient?: boolean;
}

```

# FILE: apps/backend/src/schools/parser.service.spec.ts

```
import { ParserService } from './parser.service';
import axios from 'axios';
import * as cheerio from 'cheerio';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Хелпер: генерує HTML-таблицю зі списком шкіл
const buildTableHtml = (rows: { name: string; href: string }[]): string => {
  const trs = rows
    .map((r) => `<tr><td>1</td><td><a href="${r.href}">${r.name}</a></td></tr>`)
    .join('');
  return `<table class="zebra-stripe list">${trs}</table>`;
};

// Хелпер: генерує HTML-профіль школи
const buildProfileHtml = (fields: Record<string, string>): string => {
  const rows = Object.entries(fields)
    .map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`)
    .join('');
  return `<table>${rows}</table>`;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ParserService — parseSchoolData', () => {
  it('повертає address, director, childrenCount за прямим URL', async () => {
    const profileHtml = buildProfileHtml({
      'Поштова адреса': 'вул. Шевченка 1',
      Директор: 'Іваненко Іван',
      'Кількість учнів': '1023',
    });
    mockedAxios.get.mockResolvedValueOnce({ data: profileHtml });

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Школа №1',
      'https://lv.isuo.org/schools/123',
    );

    expect(result).toEqual({
      address: 'вул. Шевченка 1',
      director: 'Іваненко Іван',
      childrenCount: 1023,
    });
  });

  it('розпізнає альтернативні лейбли (Завідувач, Кількість дітей)', async () => {
    const profileHtml = buildProfileHtml({
      Адреса: 'вул. Лесі 10',
      Завідувач: 'Петренко Оксана',
      'Кількість дітей': '456 дітей',
    });
    mockedAxios.get.mockResolvedValueOnce({ data: profileHtml });

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Садочок №2',
      'https://lv.isuo.org/k/1',
    );

    expect(result?.director).toBe('Петренко Оксана');
    expect(result?.childrenCount).toBe(456);
  });

  it('повертає 0 для childrenCount якщо число не розпізнано', async () => {
    const profileHtml = buildProfileHtml({
      Директор: 'Без дітей',
    });
    mockedAxios.get.mockResolvedValueOnce({ data: profileHtml });

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Тест',
      'https://lv.isuo.org/x/1',
    );

    expect(result?.childrenCount).toBe(0);
  });

  it('повертає null при мережевій помилці', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const service = new ParserService();
    const result = await service.parseSchoolData(
      'Школа',
      'https://lv.isuo.org/x/1',
    );

    expect(result).toBeNull();
  });

  it('шукає школу у списку якщо URL не вказано', async () => {
    const listHtml = buildTableHtml([
      { name: 'Загальноосвітня школа №42', href: '/schools/42' },
    ]);
    const profileHtml = buildProfileHtml({ Директор: 'Тест' });

    mockedAxios.get
      .mockResolvedValueOnce({ data: listHtml }) // список
      .mockResolvedValueOnce({ data: profileHtml }); // профіль

    const service = new ParserService();
    const result = await service.parseSchoolData('школа №42');

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(result?.director).toBe('Тест');
  });

  it('повертає null якщо школу не знайдено у списку', async () => {
    const listHtml = buildTableHtml([
      { name: 'Інша школа', href: '/schools/99' },
    ]);
    mockedAxios.get
      .mockResolvedValueOnce({ data: listHtml })
      .mockResolvedValueOnce({ data: listHtml }); // page 2

    const service = new ParserService();
    const result = await service.parseSchoolData('Неіснуюча школа');

    expect(result).toBeNull();
  });
});

describe('ParserService — searchSchools', () => {
  it('повертає список шкіл що відповідають запиту', async () => {
    const html = buildTableHtml([
      { name: 'Гімназія №3', href: '/schools/3' },
      { name: 'Ліцей №10', href: '/schools/10' },
    ]);
    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: html }); // page 2

    const service = new ParserService();
    const results = await service.searchSchools('гімназія');

    expect(results).toHaveLength(2); // до 10, cheerio знаходить обидва по "гімназія"
  });

  it('числовий запит — шукає за номером школи точно (regex з word boundary)', async () => {
    const html = buildTableHtml([
      { name: 'Школа №5', href: '/schools/5' },
      { name: 'Школа №15', href: '/schools/15' },
      { name: 'Школа №50', href: '/schools/50' },
    ]);
    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: '<table></table>' });

    const service = new ParserService();
    const results = await service.searchSchools('5');

    // Має знайти тільки "Школа №5", не "15" чи "50"
    const names = results.map((r) => r.name);
    expect(names).toContain('Школа №5');
    expect(names).not.toContain('Школа №15');
    expect(names).not.toContain('Школа №50');
  });

  it('повертає не більше 10 результатів', async () => {
    const manyRows = Array.from({ length: 20 }, (_, i) => ({
      name: `Тестова школа №${i + 1}`,
      href: `/schools/${i + 1}`,
    }));
    const html = buildTableHtml(manyRows);
    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: '<table></table>' });

    const service = new ParserService();
    const results = await service.searchSchools('тестова');

    expect(results.length).toBeLessThanOrEqual(10);
  });

  it('повертає порожній масив при мережевій помилці', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const service = new ParserService();
    const results = await service.searchSchools('щось');

    expect(results).toEqual([]);
  });

  it('для type="Садочок" — використовує URL дошкільних закладів', async () => {
    mockedAxios.get.mockResolvedValue({ data: '<table></table>' });

    const service = new ParserService();
    await service.searchSchools('садок', 'Садочок');

    const url = mockedAxios.get.mock.calls[0][0];
    expect(url).toContain('preschools');
  });
});

describe('ParserService — getAllSchoolsForCity', () => {
  it('повертає заклади для підтримуваного міста', async () => {
    const page1 = buildTableHtml([
      { name: 'Школа №1', href: '/schools/1' },
      { name: 'Школа №2', href: '/schools/2' },
    ]);
    const emptyPage = '<table class="zebra-stripe list"></table>';

    mockedAxios.get
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: emptyPage });

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Львів', 'Школа');

    expect(results).toHaveLength(2);
    expect(results[0].name).toBe('Школа №1');
    expect(results[0].url).toContain('lv.isuo.org');
  });

  it('повертає порожній масив для непідтримуваного міста', async () => {
    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Атлантида');

    expect(results).toEqual([]);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('зупиняється якщо сторінка не містить результатів', async () => {
    const page1 = buildTableHtml([{ name: 'Школа №1', href: '/schools/1' }]);
    const emptyPage = '<table class="zebra-stripe list"></table>';

    mockedAxios.get
      .mockResolvedValueOnce({ data: page1 })
      .mockResolvedValueOnce({ data: emptyPage });

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Київ');

    expect(results).toHaveLength(1);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });

  it('дедуплікує однакові заклади (за нормалізованою назвою)', async () => {
    const html = buildTableHtml([
      { name: 'Школа  №1', href: '/schools/1' },
      { name: 'Школа №1', href: '/schools/1b' },
    ]);
    const emptyPage = '<table class="zebra-stripe list"></table>';

    mockedAxios.get
      .mockResolvedValueOnce({ data: html })
      .mockResolvedValueOnce({ data: emptyPage });

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Харків');

    expect(results).toHaveLength(1);
  });

  it('зупиняється при мережевій помилці на конкретній сторінці', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('timeout'));

    const service = new ParserService();
    const results = await service.getAllSchoolsForCity('Одеса');

    expect(results).toEqual([]);
  });

  it('для type="Садочок" — використовує URL kindergartens', async () => {
    mockedAxios.get.mockResolvedValue({
      data: '<table class="zebra-stripe list"></table>',
    });

    const service = new ParserService();
    await service.getAllSchoolsForCity('Тернопіль', 'Садочок');

    const url = mockedAxios.get.mock.calls[0][0];
    expect(url).toContain('preschools');
  });
});

describe('ParserService — getSupportedCities', () => {
  it('повертає масив підтримуваних міст', () => {
    const service = new ParserService();
    const cities = service.getSupportedCities();

    expect(cities).toBeInstanceOf(Array);
    expect(cities.length).toBeGreaterThan(0);
    expect(cities).toContain('Львів');
    expect(cities).toContain('Київ');
  });
});

```

# FILE: apps/backend/src/schools/parser.service.ts

```
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

const CITY_CONFIG: Record<
  string,
  { schools: string; kindergartens: string; domain: string }
> = {
  Львів: {
    domain: 'https://lv.isuo.org',
    schools: 'https://lv.isuo.org/authorities/schools-list/id/681',
    kindergartens: 'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
  },
  'Івано-Франківськ': {
    domain: 'https://if.isuo.org',
    schools: 'https://if.isuo.org/koatuu/schools-list/id/2610100000',
    kindergartens: 'https://if.isuo.org/koatuu/preschools-list/id/2610100000',
  },
  Чернівці: {
    domain: 'https://cv.isuo.org',
    schools: 'https://cv.isuo.org/koatuu/schools-list/id/7310100000',
    kindergartens: 'https://cv.isuo.org/koatuu/preschools-list/id/7310100000',
  },
  Тернопіль: {
    domain: 'https://te.isuo.org',
    schools: 'https://te.isuo.org/koatuu/schools-list/id/6110100000',
    kindergartens: 'https://te.isuo.org/koatuu/preschools-list/id/6110100000',
  },
  Ужгород: {
    domain: 'https://zk.isuo.org',
    schools: 'https://zk.isuo.org/koatuu/schools-list/id/2110100000',
    kindergartens: 'https://zk.isuo.org/koatuu/preschools-list/id/2110100000',
  },
  Київ: {
    domain: 'https://kv.isuo.org',
    schools: 'https://kv.isuo.org/koatuu/schools-list/id/8000000000',
    kindergartens: 'https://kv.isuo.org/koatuu/preschools-list/id/8000000000',
  },
  Харків: {
    domain: 'https://kh.isuo.org',
    schools: 'https://kh.isuo.org/koatuu/schools-list/id/6310100000',
    kindergartens: 'https://kh.isuo.org/koatuu/preschools-list/id/6310100000',
  },
  Одеса: {
    domain: 'https://od.isuo.org',
    schools: 'https://od.isuo.org/koatuu/schools-list/id/5110100000',
    kindergartens: 'https://od.isuo.org/koatuu/preschools-list/id/5110100000',
  },
  Дніпро: {
    domain: 'https://dp.isuo.org',
    schools: 'https://dp.isuo.org/koatuu/schools-list/id/1210100000',
    kindergartens: 'https://dp.isuo.org/koatuu/preschools-list/id/1210100000',
  },
  Запоріжжя: {
    domain: 'https://zp.isuo.org',
    schools: 'https://zp.isuo.org/koatuu/schools-list/id/2310100000',
    kindergartens: 'https://zp.isuo.org/koatuu/preschools-list/id/2310100000',
  },
  Миколаїв: {
    domain: 'https://mk.isuo.org',
    schools: 'https://mk.isuo.org/koatuu/schools-list/id/4810100000',
    kindergartens: 'https://mk.isuo.org/koatuu/preschools-list/id/4810100000',
  },
  Вінниця: {
    domain: 'https://vn.isuo.org',
    schools: 'https://vn.isuo.org/koatuu/schools-list/id/0510100000',
    kindergartens: 'https://vn.isuo.org/koatuu/preschools-list/id/0510100000',
  },
  Херсон: {
    domain: 'https://ks.isuo.org',
    schools: 'https://ks.isuo.org/koatuu/schools-list/id/6510100000',
    kindergartens: 'https://ks.isuo.org/koatuu/preschools-list/id/6510100000',
  },
  Полтава: {
    domain: 'https://pl.isuo.org',
    schools: 'https://pl.isuo.org/koatuu/schools-list/id/5310100000',
    kindergartens: 'https://pl.isuo.org/koatuu/preschools-list/id/5310100000',
  },
  Чернігів: {
    domain: 'https://cg.isuo.org',
    schools: 'https://cg.isuo.org/koatuu/schools-list/id/7410100000',
    kindergartens: 'https://cg.isuo.org/koatuu/preschools-list/id/7410100000',
  },
  Черкаси: {
    domain: 'https://ck.isuo.org',
    schools: 'https://ck.isuo.org/koatuu/schools-list/id/7110100000',
    kindergartens: 'https://ck.isuo.org/koatuu/preschools-list/id/7110100000',
  },
  Суми: {
    domain: 'https://su.isuo.org',
    schools: 'https://su.isuo.org/koatuu/schools-list/id/5910100000',
    kindergartens: 'https://su.isuo.org/koatuu/preschools-list/id/5910100000',
  },
  Житомир: {
    domain: 'https://zt.isuo.org',
    schools: 'https://zt.isuo.org/koatuu/schools-list/id/1810100000',
    kindergartens: 'https://zt.isuo.org/koatuu/preschools-list/id/1810100000',
  },
  Хмельницький: {
    domain: 'https://km.isuo.org',
    schools: 'https://km.isuo.org/koatuu/schools-list/id/6810100000',
    kindergartens: 'https://km.isuo.org/koatuu/preschools-list/id/6810100000',
  },
  Рівне: {
    domain: 'https://rv.isuo.org',
    schools: 'https://rv.isuo.org/koatuu/schools-list/id/5610100000',
    kindergartens: 'https://rv.isuo.org/koatuu/preschools-list/id/5610100000',
  },
  Кропивницький: {
    domain: 'https://kr.isuo.org',
    schools: 'https://kr.isuo.org/koatuu/schools-list/id/3510100000',
    kindergartens: 'https://kr.isuo.org/koatuu/preschools-list/id/3510100000',
  },
  Луцьк: {
    domain: 'https://vl.isuo.org',
    schools: 'https://vl.isuo.org/koatuu/schools-list/id/0710100000',
    kindergartens: 'https://vl.isuo.org/koatuu/preschools-list/id/0710100000',
  },
};

@Injectable()
export class ParserService {
  async parseSchoolData(schoolName: string, schoolUrl?: string, type?: string) {
    try {
      let url = schoolUrl;
      if (!url) {
        const urls =
          type === 'Садочок'
            ? [
                'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
                'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2',
              ]
            : [
                'https://lv.isuo.org/authorities/schools-list/id/681',
                'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
              ];
        const normalizedSearch = schoolName
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim();
        for (const searchUrl of urls) {
          const listResponse = await axios.get(searchUrl);
          const $list = cheerio.load(listResponse.data);
          $list('table.zebra-stripe.list tr').each((_, row) => {
            const name = $list(row)
              .find('td:nth-child(2) a')
              .text()
              .replace(/\s+/g, ' ')
              .trim()
              .toLowerCase();
            if (name.includes(normalizedSearch)) {
              const href = $list(row).find('td:nth-child(2) a').attr('href');
              if (href) {
                url = `https://lv.isuo.org${href}`;
                return false;
              }
            }
          });
          if (url) break;
        }
      }
      if (!url) {
        console.log(`Заклад не знайдено: ${schoolName}`);
        return null;
      }
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const getField = (labels: string[]): string => {
        let result = '';
        for (const label of labels) {
          const th = $('th')
            .filter((_, el) => $(el).text().trim().includes(label))
            .first();
          if (th.length) {
            result = th.next('td').text().trim();
            break;
          }
        }
        return result;
      };
      const address = getField(['Поштова адреса', 'Адреса']);
      const director = getField(['Директор', 'Завідувач', 'Керівник']);
      const studentsRaw = getField([
        'Кількість учнів',
        'Кількість дітей',
        'Кількість вихованців',
      ]);
      const childrenCount =
        parseInt(studentsRaw.replace(/[^\d]/g, ''), 10) || 0;
      return { address, director, childrenCount };
    } catch (error) {
      console.error('Помилка парсингу закладу:', error);
      return null;
    }
  }

  async searchSchools(
    query: string,
    type?: string,
  ): Promise<{ name: string; url: string }[]> {
    try {
      const urls =
        type === 'Садочок'
          ? [
              'https://lv.isuo.org/koatuu/preschools-list/id/4610100000',
              'https://lv.isuo.org/koatuu/preschools-list/id/4610100000/page/2',
            ]
          : [
              'https://lv.isuo.org/authorities/schools-list/id/681',
              'https://lv.isuo.org/authorities/schools-list/id/681/page/2',
            ];
      const results: { name: string; url: string }[] = [];
      const normalizedQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();
      const isNumericQuery = /^\d+$/.test(normalizedQuery);
      const numericRegex = isNumericQuery
        ? new RegExp(`(?<!\\d)${normalizedQuery}(?!\\d)`)
        : null;
      for (const url of urls) {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        $('table.zebra-stripe.list tr').each((_, row) => {
          const rawName = $(row).find('td:nth-child(2) a').text();
          const name = rawName.replace(/\s+/g, ' ').trim();
          const href = $(row).find('td:nth-child(2) a').attr('href');
          if (name && href) {
            const lowerName = name.toLowerCase();
            let matches = false;
            if (isNumericQuery && numericRegex) {
              matches = numericRegex.test(lowerName);
            } else {
              matches = lowerName.includes(normalizedQuery);
            }
            if (matches)
              results.push({ name, url: `https://lv.isuo.org${href}` });
          }
        });
      }
      return results.slice(0, 10);
    } catch (error) {
      console.error('Помилка пошуку закладів:', error);
      return [];
    }
  }

  async getAllSchoolsForCity(
    cityName: string,
    type: 'Школа' | 'Садочок' = 'Школа',
  ): Promise<{ name: string; url: string }[]> {
    const config = CITY_CONFIG[cityName];
    if (!config) {
      console.log(`Місто "${cityName}" не підтримується для імпорту`);
      return [];
    }

    const baseUrl = type === 'Садочок' ? config.kindergartens : config.schools;
    const domain = config.domain;

    const resultsMap = new Map<string, { name: string; url: string }>();

    for (let page = 1; page <= 20; page++) {
      const url = page === 1 ? baseUrl : `${baseUrl}/page/${page}`;
      try {
        const response = await axios.get(url, { timeout: 15000 });
        const $ = cheerio.load(response.data);
        let foundOnPage = 0;

        $('table.zebra-stripe.list tr').each((_, row) => {
          const name = $(row)
            .find('td:nth-child(2) a')
            .text()
            .replace(/\s+/g, ' ')
            .trim();
          const href = $(row).find('td:nth-child(2) a').attr('href');

          if (name && href && name !== 'Fullname') {
            const normalizedKey = name.toLowerCase().replace(/\s+/g, '');

            if (!resultsMap.has(normalizedKey)) {
              resultsMap.set(normalizedKey, { name, url: `${domain}${href}` });
              foundOnPage++;
            }
          }
        });

        if (foundOnPage === 0) break;
      } catch {
        break;
      }
    }

    return Array.from(resultsMap.values());
  }
  getSupportedCities(): string[] {
    return Object.keys(CITY_CONFIG);
  }
}

```

# FILE: apps/backend/src/schools/school-contacts.seed.ts

```
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const contacts = [
  {
    schoolNumber: '1',
    contactName: 'Надія Михайлівна',
    phone: '0975695519',
    role: 'Завуч',
  },
  {
    schoolNumber: '2',
    contactName: 'Наталя',
    phone: '0974064095',
    role: 'Завуч',
  },
  {
    schoolNumber: '5',
    contactName: 'Лариса',
    phone: '0673622534',
    role: 'Директор',
  },
  {
    schoolNumber: '9',
    contactName: 'Віра Ярославівна',
    phone: '0674935124',
    role: 'Директор',
  },
  {
    schoolNumber: '9',
    contactName: 'Леся',
    phone: '0673380894',
    role: 'Завуч',
  },
  {
    schoolNumber: '13',
    contactName: 'Марта Романівна',
    phone: '0675839806',
    role: 'Директор',
  },
  {
    schoolNumber: '15',
    contactName: 'Ірина Андріївна',
    phone: '0679062500',
    role: 'Завуч',
  },
  {
    schoolNumber: '17',
    contactName: 'Ельвіра',
    phone: '0678578514',
    role: 'Педорг',
  },
  {
    schoolNumber: '18',
    contactName: 'Роман',
    phone: '0972587179',
    role: 'Завуч',
  },
  {
    schoolNumber: '20',
    contactName: 'Наталя Іванівна',
    phone: '0506747111',
    role: 'Завуч',
  },
  {
    schoolNumber: '23',
    contactName: 'Микола Шостак',
    phone: '0632232178',
    role: 'Педорг',
  },
  {
    schoolNumber: '27',
    contactName: 'Романа Михайлівна',
    phone: '0973113778',
    role: 'Завуч',
  },
  {
    schoolNumber: '27',
    contactName: 'Наталя Куліш',
    phone: '0677552743',
    role: 'Завуч',
  },
  {
    schoolNumber: '28',
    contactName: 'Олена Олегівна',
    phone: '0679243130',
    role: 'Завуч',
  },
  {
    schoolNumber: '30',
    contactName: 'Світлана Михальвіна',
    phone: '0974436542',
    role: 'Завуч',
  },
  {
    schoolNumber: '30',
    contactName: 'Ольга Володимирівна',
    phone: '0679596199',
    role: 'Завуч',
  },
  {
    schoolNumber: '31',
    contactName: 'Христина Ярославівна',
    phone: '0983804403',
    role: 'Директор',
  },
  {
    schoolNumber: '31',
    contactName: 'Леся Оресівна',
    phone: '0673567679',
    role: 'Завуч',
  },
  {
    schoolNumber: '34',
    contactName: 'Мирон',
    phone: '0938668520',
    role: 'Педорг',
  },
  {
    schoolNumber: '36',
    contactName: 'Тетяна',
    phone: '0990407941',
    role: 'Завуч',
  },
  {
    schoolNumber: '40',
    contactName: 'Юлія',
    phone: '0976015839',
    role: 'Педорг',
  },
  {
    schoolNumber: '40',
    contactName: 'Ірина',
    phone: '0673021531',
    role: 'Педорг',
  },
  {
    schoolNumber: '44',
    contactName: 'Стефанович Людмила Олександрівна',
    phone: '0677838274',
    role: 'Директор',
  },
  {
    schoolNumber: '45',
    contactName: 'Наталія Аркадіївна',
    phone: '0677123961',
    role: 'Завуч',
  },
  {
    schoolNumber: '46',
    contactName: 'Ірина Іларіонівна',
    phone: '0676969337',
    role: 'Завуч',
  },
  {
    schoolNumber: '46',
    contactName: 'Юля',
    phone: '0961791595',
    role: 'Педорг',
  },
  {
    schoolNumber: '48',
    contactName: 'Роман Васильович',
    phone: '0982310957',
    role: 'Директор',
  },
  {
    schoolNumber: '49',
    contactName: 'Уляна',
    phone: '0681371457',
    role: 'Педорг',
  },
  {
    schoolNumber: '50',
    contactName: "Мар'яна Іванівна",
    phone: '0674901746',
    role: 'Завуч',
  },
  {
    schoolNumber: '51',
    contactName: 'Ірина Миколаївна',
    phone: '0972595956',
    role: 'Завуч',
  },
  {
    schoolNumber: '52',
    contactName: 'Світлана',
    phone: '0677070497',
    role: 'Директор',
  },
  {
    schoolNumber: '54',
    contactName: 'Любов Іванівна',
    phone: '0677715647',
    role: 'Завуч',
  },
  {
    schoolNumber: '60',
    contactName: 'Людмила',
    phone: '0973888255',
    role: 'Директор',
  },
  {
    schoolNumber: '63',
    contactName: 'Іванець Ольга Євгенівна',
    phone: '0977345920',
    role: 'Завуч',
  },
  {
    schoolNumber: '65',
    contactName: 'Марія',
    phone: '0975391164',
    role: 'Педорг',
  },
  {
    schoolNumber: '66',
    contactName: 'Мирослава',
    phone: '0977711381',
    role: 'Завуч',
  },
  {
    schoolNumber: '66',
    contactName: 'Назар Оксана',
    phone: '0679686514',
    role: 'Завуч',
  },
  {
    schoolNumber: '67',
    contactName: 'Оксана Володимирівна',
    phone: '0673705262',
    role: 'Завуч',
  },
  {
    schoolNumber: '68',
    contactName: 'Уляна',
    phone: '0973004954',
    role: 'Педорг',
  },
  {
    schoolNumber: '69',
    contactName: 'Тетяна Володимирівна',
    phone: '0673041659',
    role: 'Завуч',
  },
  {
    schoolNumber: '70',
    contactName: 'Марта',
    phone: '0676726984',
    role: 'Директор',
  },
  {
    schoolNumber: '70',
    contactName: 'Марія',
    phone: '0966063264',
    role: 'Завуч',
  },
  {
    schoolNumber: '71',
    contactName: 'Марія',
    phone: '0676644983',
    role: 'Педорг',
  },
  {
    schoolNumber: '71',
    contactName: 'Роман',
    phone: '0677514127',
    role: 'Директор',
  },
  {
    schoolNumber: '72',
    contactName: 'Олена Михайлівна',
    phone: '0677948577',
    role: 'Завуч',
  },
  {
    schoolNumber: '73',
    contactName: 'Світлана Богданівна',
    phone: '0971844043',
    role: 'Директор',
  },
  {
    schoolNumber: '73',
    contactName: 'Інна Євгенівна',
    phone: '0678829581',
    role: 'Завуч',
  },
  {
    schoolNumber: '80',
    contactName: 'Наталя',
    phone: '0967331419',
    role: 'Завуч',
  },
  {
    schoolNumber: '81',
    contactName: 'Галина Антонівна',
    phone: '0673662853',
    role: 'Завуч',
  },
  {
    schoolNumber: '81',
    contactName: 'Андріана',
    phone: '0502867516',
    role: 'Завуч',
  },
  {
    schoolNumber: '84',
    contactName: 'Тетяна Іванівна',
    phone: '0974437171',
    role: 'Завуч',
  },
  {
    schoolNumber: '86',
    contactName: 'Руслана Василівна',
    phone: '0964066413',
    role: 'Директор',
  },
  {
    schoolNumber: '86',
    contactName: 'Анна',
    phone: '0638694484',
    role: 'Педорг',
  },
  {
    schoolNumber: '90',
    contactName: 'Ірина Іванівна',
    phone: '0974392839',
    role: 'Завуч',
  },
  {
    schoolNumber: '90',
    contactName: 'Людмила',
    phone: '0676092693',
    role: 'Завуч',
  },
  {
    schoolNumber: '93',
    contactName: 'Ірина Петрівна',
    phone: '0966591509',
    role: 'Директор',
  },
  {
    schoolNumber: '95',
    contactName: 'Марія Орестівна',
    phone: '0979515318',
    role: 'Завуч',
  },
  {
    schoolNumber: '95',
    contactName: 'Ірина',
    phone: '0972392191',
    role: 'Педорг',
  },
  {
    schoolNumber: '96',
    contactName: 'Любов',
    phone: '0689529174',
    role: 'Педорг',
  },
  {
    schoolNumber: '97',
    contactName: 'Наталя Любомирівна',
    phone: '0961390913',
    role: 'Завуч',
  },
  {
    schoolNumber: '123',
    contactName: 'Марія Андріївна',
    phone: '0679334856',
    role: 'Директор',
  },

  {
    schoolNumber: 'Арніка',
    contactName: 'Світлана Михайлівна',
    phone: '0979325399',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Гроно',
    contactName: 'Оксана Теодорівна',
    phone: '0971147211',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Джерельце',
    contactName: 'Світлана Петрівна',
    phone: '0673140267',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Дивосвіт',
    contactName: 'Наталя Миколаївна',
    phone: '0932196651',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Європейський ліцей',
    contactName: 'Галина Богданівна',
    phone: '0974829920',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Лідер',
    contactName: 'Вадим',
    phone: '0687584626',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Лідер',
    contactName: 'Іванка',
    phone: '0965150436',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Ліцей Львів',
    contactName: 'Мирослава Іванівна',
    phone: '0673536774',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Ліцей Пулюя',
    contactName: 'Наталя',
    phone: '0671794604',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Ліцей Стуса',
    contactName: 'Тетяна',
    phone: '0984989494',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Оріяна',
    contactName: 'Ірина Богданівна',
    phone: '0673702402',
    role: 'Директор',
  },
  {
    schoolNumber: 'Оріяна',
    contactName: 'Юрій',
    phone: '0974751935',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Первоцвіт',
    contactName: 'Христина Іванівна',
    phone: '0677573109',
    role: 'Директор',
  },
  {
    schoolNumber: 'Провесінь',
    contactName: 'Сергій',
    phone: '0506020447',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Провесінь',
    contactName: 'Анджела',
    phone: '0676606897',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Світанок',
    contactName: 'Лідія Миколаївна',
    phone: '0679269319',
    role: 'Директор',
  },
  {
    schoolNumber: 'Світанок',
    contactName: 'Ореста Шот',
    phone: '0677018705',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Світанок',
    contactName: 'Ірина',
    phone: '0674398980',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Симоненка',
    contactName: 'Уляна',
    phone: '0969135903',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Сихівський ліцей',
    contactName: 'Надія',
    phone: '0964667179',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Початкова Школа Радості',
    contactName: 'Тетяна',
    phone: '0967320197',
    role: 'Завуч',
  },
  {
    schoolNumber: 'Початкова Школа Радості',
    contactName: 'Наталя',
    phone: '0674244920',
    role: 'Педорг',
  },
  {
    schoolNumber: 'Альфа',
    contactName: 'Ірина',
    phone: '0935122623',
    role: 'Завуч',
  },

  {
    schoolNumber: '52',
    contactName: 'Олена Віталіївна Добранюк',
    phone: '0964692943',
    role: 'Завідувачка',
  },
  {
    schoolNumber: 'Веселка',
    contactName: 'Андриц Людмила Федорівна',
    phone: '0632836453',
    role: 'Завідувачка',
  },
  {
    schoolNumber: '149',
    contactName: 'Василина Тарасівна',
    phone: '0987615106',
    role: 'Завідувачка',
  },
  {
    schoolNumber: '132',
    contactName: 'Наталя',
    phone: '0971620805',
    role: 'Методист',
  },
  {
    schoolNumber: 'Перші кроки',
    contactName: 'Мирослава Ярославівна',
    phone: '0963493423',
    role: 'Завідувач',
  },
  {
    schoolNumber: '130',
    contactName: 'Ольга',
    phone: '0638694484',
    role: 'Методистка',
  },
  {
    schoolNumber: '40',
    contactName: 'Світлана',
    phone: '0983365931',
    role: 'Заступник',
  },
  {
    schoolNumber: '144',
    contactName: 'Наталя',
    phone: '0677670485',
    role: 'Методист',
  },
  {
    schoolNumber: 'Барвінок',
    contactName: 'Наталя Витрикуш',
    phone: '0676809966',
    role: 'Завідувачка',
  },
  {
    schoolNumber: '45',
    contactName: 'Наталя Шергіна',
    phone: '0675814381',
    role: 'Директор',
  },
  {
    schoolNumber: '67',
    contactName: 'Тетяна Юріївна',
    phone: '0966063398',
    role: 'Директор',
  },
  {
    schoolNumber: '118',
    contactName: 'Наталя Дмитрівна',
    phone: '0969847495',
    role: 'Директор',
  },
  {
    schoolNumber: '118',
    contactName: 'Оксана Ярославівна',
    phone: '0677881629',
    role: 'Методист',
  },
  {
    schoolNumber: '169',
    contactName: 'Галина Василівна',
    phone: '0962817175',
    role: null,
  },
  {
    schoolNumber: '175',
    contactName: 'Богдана',
    phone: '0687096641',
    role: 'Директор',
  },
  {
    schoolNumber: '170',
    contactName: 'Ірина',
    phone: '0986373627',
    role: null,
  },
  {
    schoolNumber: '167',
    contactName: 'Юлія',
    phone: '0687096641',
    role: 'Директор',
  },
  {
    schoolNumber: '42',
    contactName: 'Наталя Йосипівна',
    phone: '0677453052',
    role: null,
  },
  {
    schoolNumber: '33',
    contactName: 'Олександра Мирославівна',
    phone: '0505049049',
    role: null,
  },
  { schoolNumber: '134', contactName: 'Леся', phone: '0969740462', role: null },
  {
    schoolNumber: '165',
    contactName: 'Марта Андріївна',
    phone: '0639377896',
    role: null,
  },
  {
    schoolNumber: '159',
    contactName: 'Ірина Олександрівна',
    phone: '0972430286',
    role: null,
  },
  {
    schoolNumber: '163',
    contactName: 'Оксана Ярославівна Сновидович',
    phone: '0963943974',
    role: null,
  },
  {
    schoolNumber: '153',
    contactName: 'Юля',
    phone: '0939907888',
    role: 'Методист',
  },
  {
    schoolNumber: '39',
    contactName: 'Оксана Антонівна',
    phone: '0676820705',
    role: null,
  },
  {
    schoolNumber: '73',
    contactName: 'Ярослава',
    phone: '0679767575',
    role: null,
  },
  {
    schoolNumber: '134',
    contactName: 'Ольга',
    phone: '0679495251',
    role: 'Заступник',
  },
  {
    schoolNumber: '69',
    contactName: 'Уляна',
    phone: '0673392742',
    role: 'Директор',
  },
  {
    schoolNumber: '130',
    contactName: 'Зоряна',
    phone: '0677014722',
    role: null,
  },
  {
    schoolNumber: '52',
    contactName: 'Софія',
    phone: '0935428770',
    role: 'Діловод',
  },
  {
    schoolNumber: '181',
    contactName: 'Марія Корпан',
    phone: '0673142095',
    role: 'Директор',
  },
  {
    schoolNumber: '17',
    contactName: 'Світлана',
    phone: '0973047285',
    role: 'Директор',
  },
  {
    schoolNumber: '44',
    contactName: 'Надія',
    phone: '0932342106',
    role: 'Методист',
  },
  {
    schoolNumber: '170',
    contactName: 'Ірина',
    phone: '0986373627',
    role: 'Методист',
  },
  {
    schoolNumber: '3',
    contactName: 'Наталя Ігорівна',
    phone: '0973436380',
    role: null,
  },
  {
    schoolNumber: '176',
    contactName: 'Юлія Андріївна',
    phone: '0665244245',
    role: 'Директор',
  },
  {
    schoolNumber: '179',
    contactName: 'Віра Володимирівна',
    phone: '0672590052',
    role: 'Директор',
  },
  {
    schoolNumber: 'Вільні',
    contactName: 'Іванна Михайлівна',
    phone: '0974788019',
    role: 'Директор',
  },
  {
    schoolNumber: '105',
    contactName: 'Лідія Василівна',
    phone: '0679592370',
    role: 'Директор',
  },
  {
    schoolNumber: '7',
    contactName: 'Уляна Богданівна',
    phone: '0674256644',
    role: 'Директор',
  },
  {
    schoolNumber: '168',
    contactName: 'Ядельська Оксана Богданівна',
    phone: '0969105724',
    role: 'Директор',
  },
  {
    schoolNumber: '139',
    contactName: 'Ірина',
    phone: '0970488672',
    role: 'Директор',
  },
  {
    schoolNumber: '167',
    contactName: 'Зоряна Ярославівна',
    phone: '0672684699',
    role: 'Директор',
  },
  {
    schoolNumber: '38',
    contactName: 'Ірина Олегівна',
    phone: '0679475122',
    role: null,
  },
  {
    schoolNumber: '132',
    contactName: 'Надія Леонівна',
    phone: '0974429599',
    role: 'Директор',
  },
  {
    schoolNumber: '92',
    contactName: 'Ольга',
    phone: '0679492252',
    role: 'Директор',
  },
  {
    schoolNumber: '33',
    contactName: 'Леся Породько',
    phone: '0505049049',
    role: 'Директор',
  },
  {
    schoolNumber: '155',
    contactName: 'Ірина Михайлівна',
    phone: '0677301582',
    role: 'Директор',
  },
  {
    schoolNumber: '183',
    contactName: 'Володимир Михайлович',
    phone: '0970256488',
    role: 'Директор',
  },
  {
    schoolNumber: '70',
    contactName: 'Ольга Петрівна',
    phone: '0936992997',
    role: 'Директор',
  },
  {
    schoolNumber: '18',
    contactName: 'Наталя Бондаренко',
    phone: '0505938826',
    role: 'Директор',
  },
  {
    schoolNumber: '131',
    contactName: 'Любомира',
    phone: '0673657490',
    role: 'Директор',
  },
  {
    schoolNumber: '9',
    contactName: 'Зоряна Семенівна',
    phone: '0677628687',
    role: 'Директор',
  },
  {
    schoolNumber: '26',
    contactName: 'Ольга Іванівна',
    phone: '0977476237',
    role: 'Директор',
  },
  {
    schoolNumber: '23',
    contactName: 'Соломія Ігорівна',
    phone: '0975616807',
    role: 'Директор',
  },
  {
    schoolNumber: '1',
    contactName: 'Оксана',
    phone: '0675937156',
    role: 'Директор',
  },
  {
    schoolNumber: '109',
    contactName: 'Катерина Петрівна',
    phone: '0975173313',
    role: 'Директор',
  },
  {
    schoolNumber: '30',
    contactName: 'Олена Йосифівна',
    phone: '0974649258',
    role: 'Директор',
  },
  {
    schoolNumber: '51',
    contactName: 'Вікторія Романівна',
    phone: '0974207708',
    role: 'Директор',
  },
  {
    schoolNumber: '21',
    contactName: 'Анастасія Віталіївна',
    phone: '0671727948',
    role: 'Директор',
  },
  {
    schoolNumber: '75',
    contactName: 'Наталія Володимирівна',
    phone: '0972431888',
    role: 'Директор',
  },
  {
    schoolNumber: '166',
    contactName: "Мар'яна Михайлівна",
    phone: '0975300502',
    role: 'Директор',
  },
  {
    schoolNumber: '127',
    contactName: 'Галина Йосифівна',
    phone: '0963460339',
    role: 'Директор',
  },
  {
    schoolNumber: '86',
    contactName: 'Стефанія Миколаївна',
    phone: '0674936394',
    role: 'Директор',
  },
  {
    schoolNumber: '114',
    contactName: 'Ольга Володимирівна',
    phone: '0983673279',
    role: 'Директор',
  },
  {
    schoolNumber: '128',
    contactName: 'Лідія Михайлівна',
    phone: '0979790881',
    role: 'Директор',
  },
  {
    schoolNumber: 'Золотий ключик',
    contactName: 'Галина',
    phone: '0663914517',
    role: 'Методист',
  },
  {
    schoolNumber: 'Казка',
    contactName: 'Ірина Михайлівна',
    phone: '0677322435',
    role: 'Директор',
  },
  {
    schoolNumber: 'Львівський 2 сад',
    contactName: 'Олена Юріївна',
    phone: '0677270402',
    role: 'Директор',
  },
  {
    schoolNumber: '160',
    contactName: 'Віра Каролівна',
    phone: '0968009925',
    role: 'Директор',
  },
  {
    schoolNumber: '129',
    contactName: 'Оксана Зенонівна',
    phone: '0678112120',
    role: 'Директор',
  },
  {
    schoolNumber: '93',
    contactName: 'Марія Ярославівна',
    phone: '0676950870',
    role: 'Директор',
  },
  {
    schoolNumber: '48',
    contactName: 'Наталія Остапівна',
    phone: '0974428307',
    role: 'Директор',
  },
  {
    schoolNumber: '135',
    contactName: 'Галина Ярославівна',
    phone: '0673994741',
    role: 'Директор',
  },
  {
    schoolNumber: '188',
    contactName: 'Ірина Вікторівна',
    phone: '0933054378',
    role: 'Директор',
  },
  {
    schoolNumber: '25',
    contactName: 'Лілія Богданівна',
    phone: '0680215346',
    role: 'Директор',
  },
  {
    schoolNumber: '32',
    contactName: 'Наталія Василівна',
    phone: '0678119933',
    role: 'Директор',
  },
  {
    schoolNumber: '171',
    contactName: 'Ірина Корніївна',
    phone: '0972576026',
    role: 'Директор',
  },
  {
    schoolNumber: '96',
    contactName: 'Світлана Петрівна',
    phone: '0676739477',
    role: 'Директор',
  },
  {
    schoolNumber: '94',
    contactName: 'Оксана Ярославівна',
    phone: '0671447681',
    role: 'Директор',
  },
  {
    schoolNumber: '156/162',
    contactName: 'Оксана Ісламівна',
    phone: '0985835819',
    role: 'Директор',
  },
  {
    schoolNumber: '71',
    contactName: 'Валентина Гермогенівна',
    phone: '0976781981',
    role: 'Директор',
  },
  {
    schoolNumber: '187',
    contactName: 'Ольга Олексіївна',
    phone: '0674599119',
    role: 'Директор',
  },
  {
    schoolNumber: '14',
    contactName: 'Оксана Любомирівна',
    phone: '0677247619',
    role: 'Директор',
  },
  {
    schoolNumber: 'Любисток',
    contactName: 'Марія',
    phone: '0685227373',
    role: 'Методист',
  },
  {
    schoolNumber: '106',
    contactName: 'Галина Володимирівна',
    phone: '0675839839',
    role: 'Директор',
  },
  {
    schoolNumber: '104',
    contactName: 'Тетяна Ярославівна',
    phone: '0678034951',
    role: 'Директор',
  },
  {
    schoolNumber: '116',
    contactName: 'Ірина Іванівна',
    phone: '0968145853',
    role: 'Директор',
  },
  {
    schoolNumber: '57',
    contactName: 'Руслана Володимирівна',
    phone: '0966507883',
    role: 'Директор',
  },
  {
    schoolNumber: '184',
    contactName: 'Марія Іванівна',
    phone: '2546872',
    role: 'Директор',
  },
  {
    schoolNumber: '43',
    contactName: 'Віра',
    phone: '0984284448',
    role: 'Методист',
  },
  {
    schoolNumber: '29',
    contactName: 'Вікторія Олександрівна',
    phone: '0673041528',
    role: 'Директор',
  },
];

async function main() {
  console.log('Seeding school contacts...');

  await prisma.schoolContact.deleteMany({});

  for (const c of contacts) {
    await prisma.schoolContact.create({
      data: { city: 'Львів', ...c },
    });
  }

  console.log(`Done: ${contacts.length} contacts inserted`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

```

# FILE: apps/backend/src/schools/schools.controller.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';

const mockGuard = { canActivate: jest.fn() };

const mockSchoolsService = {
  findOne: jest.fn(),
  findAll: jest.fn(),
};

const mockParserService = {};

describe('SchoolsController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [
        { provide: SchoolsService, useValue: mockSchoolsService },
        { provide: ParserService, useValue: mockParserService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
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

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('GET /schools/:id — findOne', () => {
    it('OWNERSHIP: MANAGER іншого міста отримує 403', async () => {
      mockGuard.canActivate.mockRejectedValueOnce(
        new (require('@nestjs/common').ForbiddenException)(
          'Немає доступу до ресурсу іншого міста',
        ),
      );
      await request(app.getHttpServer()).get('/schools/s-1').expect(403);
    });

    it('SUPERADMIN отримує 200', async () => {
      mockGuard.canActivate.mockResolvedValue(true);
      mockSchoolsService.findOne.mockResolvedValueOnce({ id: 's-1' });
      const res = await request(app.getHttpServer())
        .get('/schools/s-1')
        .expect(200);
      expect(res.body.id).toBe('s-1');
    });
  });
});

```

# FILE: apps/backend/src/schools/schools.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';
import { Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { CheckOwnership } from '../auth/decorators/check-ownership.decorator';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { BulkImportDto } from './dto/bulk-import.dto';
import { SchoolQueryDto } from './dto/school-query.dto';
import { FindSchoolsQueryDto } from './dto/find-schools-query.dto';
import { FindContactsQueryDto } from './dto/find-contacts-query.dto';
@ApiTags('Schools')
@ApiCookieAuth('access_token')
@Controller('schools')
@UseGuards(AuthGuard, RolesGuard)
export class SchoolsController {
  constructor(
    private readonly schoolsService: SchoolsService,
    private readonly parserService: ParserService,
  ) {}

  @ApiOperation({
    summary: 'Масовий імпорт шкіл/садочків із зовнішнього джерела',
  })
  @Post('bulk-import')
  @Throttle({ default: { ttl: 300000, limit: 2 } })
  @Roles('SUPERADMIN', 'MANAGER')
  bulkImport(@Body() body: BulkImportDto) {
    return this.schoolsService.bulkImport(body.cityId, body.type || 'Школа');
  }

  @ApiOperation({ summary: 'Список міст, підтримуваних парсером' })
  @Get('supported-cities')
  getSupportedCities() {
    return this.parserService.getSupportedCities();
  }

  @ApiOperation({ summary: 'Створити школу/садочок' })
  @Post()
  @Roles('SUPERADMIN', 'MANAGER')
  create(@Body() body: CreateSchoolDto) {
    return this.schoolsService.create(body);
  }

  @ApiOperation({ summary: 'Список закладів з фільтрами та пагінацією' })
  @Get()
  findAll(@Query() query: SchoolQueryDto) {
    return this.schoolsService.findAll(query);
  }

  @ApiOperation({ summary: 'Статистика закладів за стадією та розміром' })
  @Get('stats')
  getStats(
    @Query('cityId') cityId?: string,
    @Query('type') type?: 'Школа' | 'Садочок',
    @Query('stage') stage?: 'new' | 'planned' | 'inProgress' | 'done',
  ) {
    return this.schoolsService.getStats({ cityId, type, stage });
  }

  @ApiOperation({ summary: 'Пошук закладів у зовнішньому джерелі' })
  @Get('search')
  search(@Query() query: FindSchoolsQueryDto) {
    return this.parserService.searchSchools(query.q ?? '', query.type);
  }

  @ApiOperation({ summary: 'Отримати заклад за ID' })
  @Get(':id')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('school')
  findOne(@Param('id') id: string) {
    return this.schoolsService.findOne(id);
  }

  @ApiOperation({ summary: 'Оновити заклад' })
  @Patch(':id')
  @UseGuards(OwnershipGuard)
  @CheckOwnership('school')
  update(@Param('id') id: string, @Body() body: UpdateSchoolDto) {
    return this.schoolsService.update(id, body);
  }

  @ApiOperation({ summary: 'Видалити заклад' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.schoolsService.remove(id);
  }

  @ApiOperation({ summary: 'Пошук контактів закладу' })
  @Get('contacts/search')
  searchContacts(@Query() query: FindContactsQueryDto) {
    return this.schoolsService.searchContacts(query.q ?? '', query.city);
  }
}

```

# FILE: apps/backend/src/schools/schools.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { EventsModule } from '../events/events.module';
import { ParserService } from './parser.service';

@Module({
  imports: [forwardRef(() => EventsModule)],
  controllers: [SchoolsController],
  providers: [SchoolsService, ParserService],
  exports: [SchoolsService, ParserService],
})
export class SchoolsModule {}

```

# FILE: apps/backend/src/schools/schools.service.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsService } from './schools.service';
import { PrismaService } from '../prisma/prisma.service';
import { ParserService } from './parser.service';
import { EventsService } from '../events/events.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus } from '@nestjs/common';

const mockPrisma = {
  school: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
  event: { findMany: jest.fn() },
  schoolContact: { findMany: jest.fn() },
  city: { findUnique: jest.fn() },
  $queryRaw: jest.fn(),
};

const mockParser = {
  parseSchoolData: jest.fn(),
  getAllSchoolsForCity: jest.fn(),
};

const mockEventsService = { remove: jest.fn() };

const mockCache = {
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
};

const makeModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      SchoolsService,
      { provide: PrismaService, useValue: mockPrisma },
      { provide: ParserService, useValue: mockParser },
      { provide: EventsService, useValue: mockEventsService },
      { provide: CACHE_MANAGER, useValue: mockCache },
    ],
  }).compile();

  return module.get<SchoolsService>(SchoolsService);
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('SchoolsService — create', () => {
  it('створює школу у БД та повертає її', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue(null);

    const service = await makeModule();
    const result = await service.create({
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    });

    expect(mockPrisma.school.create).toHaveBeenCalledWith({
      data: { name: 'Школа №1', type: 'Школа', cityId: 'city-1' },
    });
    expect(result.id).toBe('school-1');
  });

  it('sourceUrl не потрапляє до БД, але передається в parser', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue({
      address: 'вул.1',
      director: 'Тест',
      childrenCount: 100,
    });
    mockPrisma.school.update.mockResolvedValueOnce(newSchool);

    const service = await makeModule();
    await service.create({
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
      sourceUrl: 'https://example.com/123',
    });

    const createCall = mockPrisma.school.create.mock.calls[0][0].data;
    expect(createCall.sourceUrl).toBeUndefined();

    // Чекаємо на асинхронний парсинг
    await new Promise((r) => setTimeout(r, 10));
    expect(mockParser.parseSchoolData).toHaveBeenCalledWith(
      'Школа №1',
      'https://example.com/123',
      'Школа',
    );
  });

  it('не оновлює БД якщо parser повертає null', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue(null);

    const service = await makeModule();
    await service.create({ name: 'Школа №1', type: 'Школа', cityId: 'city-1' });

    await new Promise((r) => setTimeout(r, 10));
    expect(mockPrisma.school.update).not.toHaveBeenCalled();
  });

  it('не перезаписує вже заповнені поля результатом парсингу', async () => {
    const newSchool = {
      id: 'school-1',
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
      address: 'вже вказана адреса',
      director: 'вже вказаний директор',
      childrenCount: 999,
    };
    mockPrisma.school.create.mockResolvedValueOnce(newSchool);
    mockParser.parseSchoolData.mockResolvedValue({
      address: 'Парсер-адреса',
      director: 'Парсер-директор',
      childrenCount: 100,
    });

    const service = await makeModule();
    await service.create({
      name: 'Школа №1',
      type: 'Школа',
      cityId: 'city-1',
      address: 'вже вказана адреса',
      director: 'вже вказаний директор',
      childrenCount: 999,
    });

    await new Promise((r) => setTimeout(r, 10));
    // update має не викликатись, бо всі поля вже заповнені
    expect(mockPrisma.school.update).not.toHaveBeenCalled();
  });
});

describe('SchoolsService — findOne', () => {
  it('повертає школу якщо знайдено', async () => {
    const school = {
      id: 'school-1',
      name: 'Школа №1',
      city: { name: 'Львів' },
    };
    mockPrisma.school.findUnique.mockResolvedValueOnce(school);

    const service = await makeModule();
    const result = await service.findOne('school-1');

    expect(result).toMatchObject({ id: 'school-1' });
  });

  it('кешує результат при першому запиті', async () => {
    const school = { id: 'school-1', name: 'Школа №1', city: {} };
    mockPrisma.school.findUnique.mockResolvedValueOnce(school);

    const service = await makeModule();
    await service.findOne('school-1');

    expect(mockCache.set).toHaveBeenCalledWith(
      'school:school-1',
      school,
      15_000,
    );
  });

  it('повертає кешований результат без запиту до БД', async () => {
    const cached = { id: 'school-1', name: 'Кешована школа', city: {} };
    mockCache.get.mockResolvedValueOnce(cached);

    const service = await makeModule();
    const result = await service.findOne('school-1');

    expect(result).toBe(cached);
    expect(mockPrisma.school.findUnique).not.toHaveBeenCalled();
  });

  it('кидає AppException SCHOOL_NOT_FOUND якщо школи не існує', async () => {
    mockPrisma.school.findUnique.mockResolvedValueOnce(null);

    const service = await makeModule();
    await expect(service.findOne('ghost')).rejects.toMatchObject({
      message: 'SCHOOL_NOT_FOUND',
      status: HttpStatus.NOT_FOUND,
    });
  });
});

describe('SchoolsService — update', () => {
  it('оновлює школу та видаляє кеш', async () => {
    const updated = { id: 'school-1', name: 'Нова назва' };
    mockPrisma.school.update.mockResolvedValueOnce(updated);

    const service = await makeModule();
    const result = await service.update('school-1', {
      name: 'Нова назва',
    });

    expect(mockPrisma.school.update).toHaveBeenCalledWith({
      where: { id: 'school-1' },
      data: { name: 'Нова назва' },
    });
    expect(mockCache.del).toHaveBeenCalledWith('school:school-1');
    expect(result.name).toBe('Нова назва');
  });

  it('не передає системні поля (city, id, createdAt, updatedAt) у data', async () => {
    mockPrisma.school.update.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.update('school-1', {
      name: 'Тест',
      city: { id: 'c-1', name: 'Львів' } as any,
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
    } as any);

    const updateData = mockPrisma.school.update.mock.calls[0][0].data;
    expect(updateData.city).toBeUndefined();
    expect(updateData.createdAt).toBeUndefined();
    expect(updateData.updatedAt).toBeUndefined();
    expect(updateData.id).toBeUndefined();
  });
});

describe('SchoolsService — remove', () => {
  it('видаляє всі події школи перед видаленням самої школи', async () => {
    mockPrisma.event.findMany.mockResolvedValueOnce([
      { id: 'ev-1' },
      { id: 'ev-2' },
    ]);
    mockEventsService.remove.mockResolvedValue({});
    mockPrisma.school.delete.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.remove('school-1');

    expect(mockEventsService.remove).toHaveBeenCalledTimes(2);
    expect(mockEventsService.remove).toHaveBeenCalledWith('ev-1');
    expect(mockEventsService.remove).toHaveBeenCalledWith('ev-2');
    expect(mockPrisma.school.delete).toHaveBeenCalledWith({
      where: { id: 'school-1' },
    });
  });

  it('видаляє школу навіть без подій', async () => {
    mockPrisma.event.findMany.mockResolvedValueOnce([]);
    mockPrisma.school.delete.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.remove('school-1');

    expect(mockEventsService.remove).not.toHaveBeenCalled();
    expect(mockPrisma.school.delete).toHaveBeenCalled();
  });

  it('видаляє кеш після видалення школи', async () => {
    mockPrisma.event.findMany.mockResolvedValueOnce([]);
    mockPrisma.school.delete.mockResolvedValueOnce({ id: 'school-1' });

    const service = await makeModule();
    await service.remove('school-1');

    expect(mockCache.del).toHaveBeenCalledWith('school:school-1');
  });
});

describe('SchoolsService — getStats', () => {
  it('повертає notConfirmed у statusStats', async () => {
    mockPrisma.$queryRaw
      .mockResolvedValueOnce([{ new: 5, planned: 3, inProgress: 2, notConfirmed: 1, done: 4 }])
      .mockResolvedValueOnce([]);

    const service = await makeModule();
    const result = await service.getStats({});

    expect(result.statusStats.notConfirmed).toBe(1);
    expect(result.statusStats.new).toBe(5);
    expect(result.statusStats.inProgress).toBe(2);
    expect(result.statusStats.done).toBe(4);
  });
});

describe('SchoolsService — searchContacts', () => {
  it('повертає порожній масив якщо query порожній', async () => {
    const service = await makeModule();
    const result = await service.searchContacts('');
    expect(result).toEqual([]);
    expect(mockPrisma.schoolContact.findMany).not.toHaveBeenCalled();
  });

  it('знаходить контакти за номером школи', async () => {
    mockPrisma.schoolContact.findMany.mockResolvedValueOnce([
      {
        schoolNumber: '42',
        contactName: 'Директор Тест',
        phone: '',
        role: 'Директор',
        city: 'Львів',
      },
    ]);

    const service = await makeModule();
    const results = await service.searchContacts('42');

    expect(results).toHaveLength(1);
    expect(results[0].schoolNumber).toBe('42');
  });

  it("знаходить контакти за ім'ям (часткове співпадіння)", async () => {
    mockPrisma.schoolContact.findMany.mockResolvedValueOnce([
      {
        schoolNumber: '1',
        contactName: 'Марія Іваненко',
        phone: '',
        role: 'Директор',
        city: 'Львів',
      },
      {
        schoolNumber: '2',
        contactName: 'Петро Коваль',
        phone: '',
        role: 'Директор',
        city: 'Львів',
      },
    ]);

    const service = await makeModule();
    const results = await service.searchContacts('марія');

    expect(results).toHaveLength(1);
    expect(results[0].contactName).toBe('Марія Іваненко');
  });

  it('повертає не більше 10 результатів', async () => {
    const contacts = Array.from({ length: 20 }, (_, i) => ({
      schoolNumber: String(i + 1),
      contactName: `Тест ${i + 1}`,
      phone: '',
      role: 'Директор',
      city: 'Київ',
    }));
    mockPrisma.schoolContact.findMany.mockResolvedValueOnce(contacts);

    const service = await makeModule();
    // Пошук за словом, що є у всіх
    const results = await service.searchContacts('Тест');

    expect(results.length).toBeLessThanOrEqual(10);
  });
});

```

# FILE: apps/backend/src/schools/schools.service.ts

```
import {
  Injectable,
  Logger,
  HttpStatus,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AppException } from '../common/exceptions/app.exception';
import { Prisma } from '@prisma/client';
import { EventsService } from '../events/events.service';
import { ParserService } from './parser.service';
import { PrismaService } from '../prisma/prisma.service';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { SchoolQueryDto } from './dto/school-query.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

const PLANNED_STAGES = ['BASE', 'FIRST_CONTACT', 'DATE_CONFIRMED'];
const IN_PROGRESS_STAGES = ['PREPARATION', 'IN_PROGRESS', 'DONE'];
const NOT_CONFIRMED_STAGES = ['REPORT'];

function concurrencyLimit(n: number) {
  let active = 0;
  const queue: (() => void)[] = [];
  const next = () => {
    active--;
    if (queue.length > 0) queue.shift()!();
  };
  return <T>(fn: () => Promise<T>): Promise<T> =>
    new Promise<T>((resolve, reject) => {
      const run = () => {
        active++;
        fn().then(resolve, reject).finally(next);
      };
      if (active >= n) {
        queue.push(run);
      } else {
        run();
      }
    });
}

@Injectable()
export class SchoolsService {
  private readonly logger = new Logger(SchoolsService.name);

  constructor(
    @Inject(forwardRef(() => EventsService))
    private readonly eventsService: EventsService,
    private readonly parserService: ParserService,
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(data: {
    name: string;
    type: string;
    cityId: string;
    sourceUrl?: string;
    director?: string;
    phone?: string;
    address?: string;
    childrenCount?: number;
  }) {
    const { sourceUrl, ...schoolData } = data;

    const newSchool = await this.prisma.school.create({
      data: schoolData,
    });

    this.parserService.parseSchoolData(data.name, sourceUrl, data.type);
    this.enrichSchoolFromParser(newSchool, data.name, sourceUrl, data.type);

    return newSchool;
  }

  private async enrichSchoolFromParser(
    school: {
      id: string;
      address: string | null;
      director: string | null;
      childrenCount: number | null;
    },
    name: string,
    sourceUrl?: string,
    type?: string,
  ) {
    try {
      const parsed = await this.parserService.parseSchoolData(
        name,
        sourceUrl,
        type,
      );
      if (!parsed) {
        this.logger.warn(`Не вдалося знайти дані для закладу: ${name}`);
        return;
      }

      const updateData: Record<string, unknown> = {};

      if (!school.address && parsed.address) {
        updateData.address = parsed.address;
      }
      if (!school.director && parsed.director) {
        updateData.director = parsed.director;
      }
      if (!school.childrenCount && parsed.childrenCount) {
        updateData.childrenCount = parsed.childrenCount;
      }

      if (Object.keys(updateData).length === 0) {
        this.logger.log(
          `Дані школи "${name}" вже заповнені користувачем — пропускаємо оновлення з парсингу`,
        );
        return;
      }

      await this.prisma.school.update({
        where: { id: school.id },
        data: updateData,
      });

      this.logger.log(`Дані школи "${name}" успішно оновлені`);
    } catch (error) {
      this.logger.error(
        `Помилка оновлення даних школи: ${(error as Error).message}`,
      );
    }
  }

  private createMany(
    schools: {
      name: string;
      type: string;
      cityId: string;
      director?: string;
      phone?: string;
    }[],
  ) {
    return this.prisma.school.createMany({
      data: schools,
      skipDuplicates: true,
    });
  }

  private buildFilters(
    query: Pick<
      SchoolQueryDto,
      'search' | 'cityId' | 'type' | 'stage' | 'size'
    >,
  ): Prisma.Sql[] {
    const { search, cityId, type, stage, size } = query;
    const conditions: Prisma.Sql[] = [];

    if (search) {
      const trimmed = search.trim();
      const isNumeric = /^\d+$/.test(trimmed);

      if (isNumeric) {
        const numberBoundary = `%№${trimmed}%`;
        const numberWord = `% ${trimmed}%`;
        conditions.push(
          Prisma.sql`(s.name ILIKE ${numberBoundary} OR s.name ILIKE ${numberWord} OR s.name ILIKE ${trimmed + '%'})`,
        );
      } else {
        conditions.push(Prisma.sql`s.name ILIKE ${`%${trimmed}%`}`);
      }
    }
    if (cityId) {
      conditions.push(Prisma.sql`s."cityId" = ${cityId}`);
    }
    if (type) {
      conditions.push(Prisma.sql`s.type = ${type}`);
    }
    if (stage) {
      conditions.push(this.stageCondition(stage));
    }
    if (size) {
      conditions.push(this.sizeCondition(size));
    }

    return conditions;
  }

  private sizeCaseSql(): Prisma.Sql {
    return Prisma.sql`
      CASE
        WHEN s.type = 'Садочок' AND COALESCE(s."childrenCount", 0) < 50 THEN 'small'
        WHEN s.type = 'Садочок' AND COALESCE(s."childrenCount", 0) < 100 THEN 'medium'
        WHEN s.type = 'Садочок' THEN 'large'
        WHEN COALESCE(s."childrenCount", 0) < 500 THEN 'small'
        WHEN COALESCE(s."childrenCount", 0) < 900 THEN 'medium'
        ELSE 'large'
      END
    `;
  }

  private stageCondition(stage: string): Prisma.Sql {
    switch (stage) {
      case 'planned':
        return Prisma.sql`EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(PLANNED_STAGES)})
        )`;
      case 'inProgress':
        return Prisma.sql`EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})
        )`;
      case 'notConfirmed':
        return Prisma.sql`EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(NOT_CONFIRMED_STAGES)})
        )`;
      case 'done':
        return Prisma.sql`EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text = 'RE_SALE'
        )`;
      default:
        return Prisma.sql`NOT EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text NOT IN ('INTERESTED','PRE_APPROVAL')
        )`;
    }
  }

  private sizeCondition(size: string): Prisma.Sql {
    return Prisma.sql`(${this.sizeCaseSql()}) = ${size}`;
  }

  private latestEventJoin(): Prisma.Sql {
    return Prisma.sql`
      LEFT JOIN LATERAL (
        SELECT e.status FROM "Event" e
        WHERE e."schoolId" = s.id
        ORDER BY e.date DESC
        LIMIT 1
      ) latest ON true
    `;
  }

  private mapRow(row: {
    city_id: string | null;
    city_name: string | null;
    latestStatus: string | null;
    isPlanned: boolean;
    isInProgress: boolean;
    isDone: boolean;
    isNotConfirmed: boolean;
    [key: string]: unknown;
  }) {
    const {
      city_id,
      city_name,
      latestStatus,
      isPlanned,
      isInProgress,
      isDone,
      isNotConfirmed,
      ...school
    } = row;
    const categories: ('planned' | 'inProgress' | 'notConfirmed' | 'done')[] = [];
    if (isPlanned) categories.push('planned');
    if (isInProgress) categories.push('inProgress');
    if (isNotConfirmed) categories.push('notConfirmed');
    if (isDone) categories.push('done');
    return {
      ...school,
      city: city_id ? { id: city_id, name: city_name } : null,
      events: latestStatus ? [{ status: latestStatus }] : [],
      categories,
    };
  }

  async findAll(query: SchoolQueryDto) {
    const { skip, take, page } = query;
    const conditions = this.buildFilters(query);
    const whereClause = conditions.length
      ? Prisma.sql`WHERE ${Prisma.join(conditions, ' AND ')}`
      : Prisma.empty;

    const baseFrom = Prisma.sql`
      FROM "School" s
      LEFT JOIN "City" c ON c.id = s."cityId"
      ${this.latestEventJoin()}
    `;

    const rows = await this.prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT s.*, c.id as city_id, c.name as city_name, latest.status as "latestStatus",
        COALESCE(ef."isPlanned", false) as "isPlanned",
        COALESCE(ef."isInProgress", false) as "isInProgress",
        COALESCE(ef."isDone", false) as "isDone",
        COALESCE(ef."isNotConfirmed", false) as "isNotConfirmed"
      ${baseFrom}
      LEFT JOIN LATERAL (
        SELECT
          bool_or(e.status::text IN (${Prisma.join(PLANNED_STAGES)})) as "isPlanned",
          bool_or(e.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})) as "isInProgress",
          bool_or(e.status::text = 'RE_SALE') as "isDone",
          bool_or(e.status::text IN (${Prisma.join(NOT_CONFIRMED_STAGES)})) as "isNotConfirmed"
        FROM "Event" e
        WHERE e."schoolId" = s.id
      ) ef ON true
      ${whereClause}
      ORDER BY s."createdAt" DESC
      OFFSET ${skip} LIMIT ${take}
    `);

    const countRows = await this.prisma.$queryRaw<
      { count: bigint }[]
    >(Prisma.sql`
      SELECT COUNT(*)::bigint as count
      ${baseFrom}
      ${whereClause}
    `);

    const totalItems = Number(countRows[0].count);

    return {
      data: rows.map((r) => this.mapRow(r)),
      meta: new PageMetaDto(totalItems, page, take),
    };
  }

  async getStats(query: Pick<SchoolQueryDto, 'cityId' | 'type' | 'stage'>) {
    const baseConditions = this.buildFilters({
      cityId: query.cityId,
      type: query.type,
    });
    const baseWhere = baseConditions.length
      ? Prisma.sql`WHERE ${Prisma.join(baseConditions, ' AND ')}`
      : Prisma.empty;

    const sizeConditions = this.buildFilters({
      cityId: query.cityId,
      type: query.type,
      stage: query.stage,
    });
    const sizeWhere = sizeConditions.length
      ? Prisma.sql`WHERE ${Prisma.join(sizeConditions, ' AND ')}`
      : Prisma.empty;

    const baseFrom = Prisma.sql`
      FROM "School" s
      ${this.latestEventJoin()}
    `;

    const [statusRows, sizeRows] = await Promise.all([
      this.prisma.$queryRaw<
        { new: bigint; planned: bigint; inProgress: bigint; notConfirmed: bigint; done: bigint }[]
      >(Prisma.sql`
        SELECT
          COUNT(*) FILTER (WHERE NOT COALESCE(ef."isPlanned", false) AND NOT COALESCE(ef."isInProgress", false) AND NOT COALESCE(ef."isDone", false) AND NOT COALESCE(ef."isNotConfirmed", false))::bigint as new,
          COUNT(*) FILTER (WHERE COALESCE(ef."isPlanned", false))::bigint as planned,
          COUNT(*) FILTER (WHERE COALESCE(ef."isInProgress", false))::bigint as "inProgress",
          COUNT(*) FILTER (WHERE COALESCE(ef."isNotConfirmed", false))::bigint as "notConfirmed",
          COUNT(*) FILTER (WHERE COALESCE(ef."isDone", false))::bigint as done
        FROM "School" s
        LEFT JOIN LATERAL (
          SELECT
            bool_or(e.status::text IN (${Prisma.join(PLANNED_STAGES)})) as "isPlanned",
            bool_or(e.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})) as "isInProgress",
            bool_or(e.status::text = 'RE_SALE') as "isDone",
            bool_or(e.status::text IN (${Prisma.join(NOT_CONFIRMED_STAGES)})) as "isNotConfirmed"
          FROM "Event" e
          WHERE e."schoolId" = s.id
        ) ef ON true
        ${baseWhere}
      `),
      this.prisma.$queryRaw<{ size: string; count: bigint }[]>(Prisma.sql`
        SELECT
          ${this.sizeCaseSql()} as size,
          COUNT(*)::bigint as count
        ${baseFrom}
        ${sizeWhere}
        GROUP BY size
      `),
    ]);

    const statusStats = statusRows[0]
      ? {
          new: Number(statusRows[0].new),
          planned: Number(statusRows[0].planned),
          inProgress: Number(statusRows[0].inProgress),
          notConfirmed: Number(statusRows[0].notConfirmed),
          done: Number(statusRows[0].done),
        }
      : { new: 0, planned: 0, inProgress: 0, notConfirmed: 0, done: 0 };

    const sizeStats = { small: 0, medium: 0, large: 0 };
    for (const row of sizeRows) sizeStats[row.size] = Number(row.count);

    return { statusStats, sizeStats };
  }

  async findOne(id: string) {
    const key = `school:${id}`;
    const cached = await this.cacheManager.get(key);
    if (cached) return cached;

    const school = await this.prisma.school.findUnique({
      where: {
        id,
      },
      include: {
        city: true,
      },
    });
    if (!school) {
      throw new AppException('SCHOOL_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.cacheManager.set(key, school, 15_000);
    return school;
  }

  async update(id: string, data: UpdateSchoolDto) {
    const {
      city,
      id: _id,
      createdAt,
      updatedAt,
      ...updateData
    } = data as UpdateSchoolDto & Record<string, unknown>;

    const updated = await this.prisma.school.update({
      where: {
        id,
      },
      data: updateData,
    });
    await this.cacheManager.del(`school:${id}`);
    return updated;
  }

  async remove(id: string) {
    const events = await this.prisma.event.findMany({
      where: {
        schoolId: id,
      },
    });

    await Promise.all(
      events.map((event) => this.eventsService.remove(event.id)),
    );

    const deleted = await this.prisma.school.delete({
      where: {
        id,
      },
    });
    await this.cacheManager.del(`school:${id}`);
    return deleted;
  }

  async searchContacts(q: string, city?: string) {
    if (!q || q.trim().length < 1) return [];

    const cityName = city || 'Львів';
    const normalizedQuery = q.toLowerCase().trim();

    const allContacts = await this.prisma.schoolContact.findMany({
      where: { city: cityName },
      orderBy: [{ schoolNumber: 'asc' }, { role: 'asc' }],
    });

    const STOP_WORDS = new Set([
      'школа',
      'школи',
      'садочок',
      'садок',
      'дитсадок',
      'днз',
      'ліцей',
      'гімназія',
      'зош',
      'центр',
      'розвитку',
      'комунальний',
      'заклад',
      'освіти',
      'імені',
      'ім',
    ]);

    const tokens = normalizedQuery
      .replace(/№/g, ' ')
      .split(/\s+/)
      .map((t) => t.replace(/[^\wа-яіїєґ0-9]/gi, ''))
      .filter((t) => t.length > 0 && !STOP_WORDS.has(t));

    const matches = allContacts.filter((c) => {
      const num = c.schoolNumber.toLowerCase();

      if (num === normalizedQuery) return true;

      const isNumeric = /^\d+$/.test(num);

      if (isNumeric) {
        if (tokens.includes(num)) return true;
      } else {
        if (num.includes(normalizedQuery) || normalizedQuery.includes(num))
          return true;
        if (tokens.some((t) => t.length >= 3 && num.includes(t))) return true;
      }

      if (c.contactName.toLowerCase().includes(normalizedQuery)) return true;

      return false;
    });

    return matches.slice(0, 10);
  }
  async bulkImport(cityId: string, type: 'Школа' | 'Садочок' = 'Школа') {
    const city = await this.prisma.city.findUnique({ where: { id: cityId } });
    if (!city) throw new AppException('CITY_NOT_FOUND', HttpStatus.NOT_FOUND);

    const allFromParser = await this.parserService.getAllSchoolsForCity(
      city.name,
      type,
    );

    const existingSchools = await this.prisma.school.findMany({
      where: { cityId, type },
      select: { name: true },
    });

    const normalize = (name: string) =>
      name
        .toLowerCase()
        .replace(/№/g, '')
        .replace(/["'«»]/g, '')
        .replace(/\s+/g, '')
        .trim();

    const existingNames = new Set(
      existingSchools.map((s) => normalize(s.name)),
    );

    const toCreate = allFromParser.filter(
      (s) => !existingNames.has(normalize(s.name)),
    );

    if (toCreate.length === 0) {
      return {
        city: city.name,
        total: allFromParser.length,
        created: 0,
        skipped: allFromParser.length,
      };
    }

    const contacts = await this.prisma.schoolContact.findMany({
      where: { city: city.name },
    });

    const schoolInputs = toCreate.map((school) => {
      const numMatch = school.name.match(/№?\s*(\d+)/);
      const num = numMatch?.[1];
      const matchedContacts = num
        ? contacts.filter((c) => c.schoolNumber === num)
        : contacts.filter((c) => {
            const normSchool = normalize(school.name);
            const normContact = normalize(c.schoolNumber);
            return (
              normSchool.includes(normContact) ||
              normContact.includes(normSchool)
            );
          });

      const director =
        matchedContacts.find(
          (c) => c.role?.includes('Директор') || c.role?.includes('Завідувач'),
        ) || matchedContacts[0];

      return {
        name: school.name,
        type,
        cityId,
        director: director?.contactName || '',
        phone: director?.phone || '',
      };
    });

    await this.createMany(schoolInputs);

    const createdSchools = await this.prisma.school.findMany({
      where: { cityId, type, name: { in: schoolInputs.map((s) => s.name) } },
    });

    const limit = concurrencyLimit(5);
    await Promise.allSettled(
      createdSchools.map((school) => {
        const input = allFromParser.find((si) => si.name === school.name);
        return limit(() =>
          this.enrichSchoolFromParser(school, school.name, input?.url, type),
        );
      }),
    );

    return {
      city: city.name,
      total: allFromParser.length,
      created: schoolInputs.length,
      skipped: allFromParser.length - schoolInputs.length,
    };
  }
}

```

# FILE: apps/backend/src/telegram/telegram.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule)],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}

```

# FILE: apps/backend/src/telegram/telegram.service.spec.ts

```
import { TelegramService } from './telegram.service';
import { UsersService } from '../users/users.service';

// Мокуємо зовнішні залежності, які не потрібні у тестах
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    set: jest.fn().mockResolvedValue(null),
    get: jest.fn().mockResolvedValue(null),
    del: jest.fn().mockResolvedValue(1),
    disconnect: jest.fn(),
  }));
});

jest.mock('node-telegram-bot-api', () => {
  return jest.fn().mockImplementation(() => ({
    sendMessage: jest.fn().mockResolvedValue({}),
    stopPolling: jest.fn().mockResolvedValue(undefined),
    onText: jest.fn(),
  }));
});

const mockUsersService = {
  updateTelegramChatId: jest.fn(),
};

const makeService = () => {
  const service = new TelegramService(
    mockUsersService as unknown as UsersService,
  );
  return service;
};

beforeEach(() => {
  jest.clearAllMocks();
  // Тестове середовище: NODE_ENV=test — бот не ініціалізується
  process.env.NODE_ENV = 'test';
  delete process.env.TELEGRAM_BOT_TOKEN;
});

describe('TelegramService — onModuleInit', () => {
  it('у тестовому середовищі (NODE_ENV=test) не ініціалізує бот', () => {
    process.env.NODE_ENV = 'test';
    const service = makeService();
    service.onModuleInit();

    // this.bot залишається undefined
    expect((service as any).bot).toBeUndefined();
  });

  it('без TELEGRAM_BOT_TOKEN не ініціалізує бот', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.TELEGRAM_BOT_TOKEN;
    const service = makeService();
    service.onModuleInit();

    expect((service as any).bot).toBeUndefined();
  });
});

describe('TelegramService — sendMessage', () => {
  it('не кидає помилку якщо bot не ініціалізований (відразу повертає)', async () => {
    const service = makeService();
    // bot = undefined (тестове середовище)
    await expect(service.sendMessage('123', 'Привіт')).resolves.toBeUndefined();
  });

  it('надсилає повідомлення через bot.sendMessage якщо bot ініціалізований', async () => {
    const service = makeService();
    const mockBot = { sendMessage: jest.fn().mockResolvedValue({}) };
    (service as any).bot = mockBot;

    await service.sendMessage('chat-123', '<b>Тест</b>');

    expect(mockBot.sendMessage).toHaveBeenCalledWith(
      'chat-123',
      '<b>Тест</b>',
      { parse_mode: 'HTML' },
    );
  });

  it('не кидає помилку якщо bot.sendMessage падає (помилка логується)', async () => {
    const service = makeService();
    const apiError = new Error('Bad Request: chat not found');
    (apiError as any).response = {
      statusCode: 400,
      body: { description: 'chat not found' },
    };
    const mockBot = {
      sendMessage: jest.fn().mockRejectedValue(apiError),
    };
    (service as any).bot = mockBot;

    await expect(
      service.sendMessage('chat-123', 'Тест'),
    ).resolves.toBeUndefined();
  });
});

describe('TelegramService — sendWelcome', () => {
  it('надсилає повідомлення зі логіном та паролем', async () => {
    const service = makeService();
    const sendSpy = jest
      .spyOn(service, 'sendMessage')
      .mockResolvedValue(undefined);

    await service.sendWelcome('chat-1', 'Іван', 'ivan@crm.com', 'secret123');

    expect(sendSpy).toHaveBeenCalledTimes(1);
    const [chatId, text] = sendSpy.mock.calls[0];
    expect(chatId).toBe('chat-1');
    expect(text).toContain('ivan@crm.com');
    expect(text).toContain('secret123');
  });

  it('повідомлення містить HTML теги (не plain text)', async () => {
    const service = makeService();
    const sendSpy = jest
      .spyOn(service, 'sendMessage')
      .mockResolvedValue(undefined);

    await service.sendWelcome('chat-1', 'Тест', 'test@crm.com', 'pass');

    const text = sendSpy.mock.calls[0][1];
    expect(text).toContain('<b>');
    expect(text).toContain('<code>');
  });
});

describe('TelegramService — retry логіка sendMessage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('при мережевій помилці (ECONNRESET) робить retry і досягає успіху', async () => {
    const service = makeService();
    const mockBot = {
      sendMessage: jest
        .fn()
        .mockRejectedValueOnce(
          Object.assign(new Error('connection reset'), { code: 'ECONNRESET' }),
        )
        .mockResolvedValueOnce({}),
    };
    (service as any).bot = mockBot;

    const promise = service.sendMessage('chat-1', 'test');
    await jest.advanceTimersByTimeAsync(2000);

    await expect(promise).resolves.toBeUndefined();
    expect(mockBot.sendMessage).toHaveBeenCalledTimes(2);
  });

  it('після 3 невдалих мережевих спроб помилка логується (далі не кидається)', async () => {
    const service = makeService();
    const mockBot = {
      sendMessage: jest
        .fn()
        .mockRejectedValue(
          Object.assign(new Error('ECONNREFUSED'), { code: 'ECONNREFUSED' }),
        ),
    };
    (service as any).bot = mockBot;

    const promise = service.sendMessage('chat-1', 'test');
    await jest.advanceTimersByTimeAsync(5000);

    await expect(promise).resolves.toBeUndefined();
    expect(mockBot.sendMessage).toHaveBeenCalledTimes(3);
  });

  it('при 4xx помилці (не мережева) retry НЕ відбувається', async () => {
    const service = makeService();
    const apiError = new Error('Bad Request: chat not found');
    (apiError as any).response = {
      statusCode: 400,
      body: { description: 'chat not found' },
    };
    const mockBot = {
      sendMessage: jest.fn().mockRejectedValue(apiError),
    };
    (service as any).bot = mockBot;

    await service.sendMessage('chat-1', 'test');

    expect(mockBot.sendMessage).toHaveBeenCalledTimes(1);
  });

  it('при успішному першому виклику retry не відбувається', async () => {
    const service = makeService();
    const mockBot = {
      sendMessage: jest.fn().mockResolvedValue({}),
    };
    (service as any).bot = mockBot;

    await service.sendMessage('chat-1', 'test');

    expect(mockBot.sendMessage).toHaveBeenCalledTimes(1);
  });
});

describe('TelegramService — onModuleDestroy', () => {
  it('зупиняє polling бота якщо bot ініціалізований', async () => {
    const service = makeService();
    const mockBot = {
      stopPolling: jest.fn().mockResolvedValue(undefined),
    };
    (service as any).bot = mockBot;

    // Мокуємо redis.get щоб не відкликати lock
    const redis = (service as any).redis;
    redis.get = jest.fn().mockResolvedValue('other-instance');

    await service.onModuleDestroy();

    expect(mockBot.stopPolling).toHaveBeenCalled();
  });

  it('не кидає помилку якщо bot не ініціалізований', async () => {
    const service = makeService();
    const redis = (service as any).redis;
    redis.get = jest.fn().mockResolvedValue(null);

    await expect(service.onModuleDestroy()).resolves.not.toThrow();
  });

  it('видаляє Redis lock якщо instance є leader', async () => {
    const service = makeService();
    const instanceId = (service as any).instanceId;

    const redis = (service as any).redis;
    redis.get = jest.fn().mockResolvedValue(instanceId);
    redis.del = jest.fn().mockResolvedValue(1);

    await service.onModuleDestroy();

    expect(redis.del).toHaveBeenCalledWith('telegram:bot:leader');
  });
});

```

# FILE: apps/backend/src/telegram/telegram.service.ts

```
import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
  forwardRef,
} from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import Redis from 'ioredis';
import { randomUUID } from 'crypto';
import { UsersService } from '../users/users.service';

const LOCK_KEY = 'telegram:bot:leader';
const LOCK_TTL_MS = 15_000;
const RETRY_MS = 5_000;
const SEND_TIMEOUT_MS = 5_000;
const SEND_MAX_RETRIES = 3;

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);
  private readonly instanceId = randomUUID();
  private readonly redis = new Redis(
    process.env.REDIS_URL ?? 'redis://localhost:6379',
  );
  private lockTimer?: NodeJS.Timeout;
  private retryTimer?: NodeJS.Timeout;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  onModuleInit() {
    this.redis.on('error', (err: Error) =>
      this.logger.warn(`Redis lock connection error: ${err.message}`),
    );

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || process.env.NODE_ENV === 'test') {
      this.logger.warn(
        'TELEGRAM_BOT_TOKEN не задано або тестове середовище — бот вимкнено',
      );
      return;
    }
    void this.tryBecomeLeader(token);
  }

  async onModuleDestroy() {
    clearTimeout(this.retryTimer);
    clearInterval(this.lockTimer);
    if (this.bot) await this.bot.stopPolling();
    const current = await this.redis.get(LOCK_KEY);
    if (current === this.instanceId) await this.redis.del(LOCK_KEY);
    this.redis.disconnect();
  }

  private async tryBecomeLeader(token: string) {
    let acquired: string | null;
    try {
      acquired = await this.redis.set(
        LOCK_KEY,
        this.instanceId,
        'PX',
        LOCK_TTL_MS,
        'NX',
      );
    } catch (e) {
      this.logger.warn(
        `Не вдалося отримати lock, повторю пізніше: ${(e as Error).message}`,
      );
      this.retryTimer = setTimeout(() => this.tryBecomeLeader(token), RETRY_MS);
      return;
    }
    if (!acquired) {
      this.retryTimer = setTimeout(() => this.tryBecomeLeader(token), RETRY_MS);
      return;
    }

    this.bot = new TelegramBot(token, { polling: true });
    this.logger.log(`Telegram бот ініціалізовано (leader=${this.instanceId})`);
    this.lockTimer = setInterval(() => {
      this.redis
        .set(LOCK_KEY, this.instanceId, 'PX', LOCK_TTL_MS, 'XX')
        .catch((e: Error) =>
          this.logger.warn(`Не вдалося продовжити lock: ${e.message}`),
        );
    }, LOCK_TTL_MS / 3);

    this.bot.onText(/\/start/, (msg) => {
      void this.handleStartCommand(msg);
    });
  }

  private async handleStartCommand(msg: TelegramBot.Message): Promise<void> {
    const chatId = String(msg.chat.id);
    const username = msg.from?.username;

    if (!username) {
      await this.bot.sendMessage(
        chatId,
        "⚠️ У вашому профілі Telegram не вказано username. Будь ласка, додайте його в налаштуваннях Telegram, щоб ми могли підв'язати акаунт.",
      );
      return;
    }

    const normalizedUsername = username.toLowerCase();

    const result = await this.usersService.updateTelegramChatId(
      normalizedUsername,
      chatId,
    );

    if (result.count > 0) {
      this.logger.log(
        `[/start] chatId=${chatId} username=${normalizedUsername} — успішно підв'язано`,
      );
      await this.bot.sendMessage(
        chatId,
        `✅ Вітаємо! Ваш акаунт успішно підключено до <b>Світло Знань CRM</b>.`,
        { parse_mode: 'HTML' },
      );
    } else {
      this.logger.warn(
        `[/start] Користувача з username "${normalizedUsername}" не знайдено в CRM.`,
      );
      await this.bot.sendMessage(
        chatId,
        `❌ Акаунт не знайдено. Переконайтеся, що в CRM у вашому профілі вказано нікнейм <b>${normalizedUsername}</b> без помилок.`,
        { parse_mode: 'HTML' },
      );
    }
  }

  private isNetworkError(e: any): boolean {
    if (e.code === 'TIMEOUT') return true;
    if (
      e.code === 'ECONNRESET' ||
      e.code === 'ETIMEDOUT' ||
      e.code === 'ECONNREFUSED' ||
      e.code === 'ENOTFOUND'
    )
      return true;
    if (e.response?.statusCode && e.response.statusCode < 500) return false;
    return !e.response;
  }

  private async sendWithRetry(
    chatId: string,
    text: string,
    attempt = 1,
  ): Promise<void> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, SEND_TIMEOUT_MS);

    try {
      const promise = this.bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
      });
      await Promise.race([
        promise,
        new Promise<never>((_, reject) => {
          controller.signal.addEventListener('abort', () => {
            reject(
              Object.assign(new Error('Request timeout'), { code: 'TIMEOUT' }),
            );
          });
        }),
      ]);
      clearTimeout(timeoutId);
    } catch (e: any) {
      clearTimeout(timeoutId);
      if (this.isNetworkError(e) && attempt < SEND_MAX_RETRIES) {
        const delay = Math.pow(2, attempt - 1) * 1000;
        this.logger.warn(
          `[sendMessage] мережева помилка (спроба ${attempt}/${SEND_MAX_RETRIES}), повтор через ${delay}ms: ${e.message}`,
        );
        await new Promise((r) => setTimeout(r, delay));
        return this.sendWithRetry(chatId, text, attempt + 1);
      }
      this.logger.error(
        `Не вдалося надіслати повідомлення ${chatId}: ${e.message}`,
      );
    }
  }

  async sendMessage(chatId: string, text: string): Promise<void> {
    if (!this.bot) return;
    await this.sendWithRetry(chatId, text);
  }

  async sendWelcome(
    chatId: string,
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    const text =
      `👋 <b>Вітаємо у Світло Знань CRM!</b>\n\n` +
      `Ваш акаунт створено.\n\n` +
      `📧 <b>Логін:</b> <code>${email}</code>\n` +
      `🔑 <b>Пароль:</b> <code>${password}</code>\n\n` +
      `Увійдіть за посиланням: <a href="https://crm-frontend-psi-sable.vercel.app">crm-frontend-psi-sable.vercel.app</a>\n\n` +
      `<i>Змініть пароль після першого входу.</i>`;

    await this.sendMessage(chatId, text);
  }
}

```

# FILE: apps/backend/src/users/dto/create-user.dto.ts

```
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsEnum,
  Matches,
} from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Олег Ведучий' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'oleg@svitlo-znan.app' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'Пароль має містити хоча б одну літеру та одну цифру',
  })
  password: string;

  @ApiPropertyOptional({ example: '+380671112233' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.HOST })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: 'a1b2c3d4-...' })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({ example: '@oleg_host' })
  @IsOptional()
  @IsString()
  telegramId?: string;

  @ApiPropertyOptional({ example: 'Volkswagen Transporter' })
  @IsOptional()
  @IsString()
  car?: string;
}

```

# FILE: apps/backend/src/users/dto/update-user.dto.ts

```
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsEnum,
  Matches,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'Пароль має містити хоча б одну літеру та одну цифру',
  })
  password?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  telegramId?: string;

  @IsOptional()
  @IsString()
  car?: string;
}

```

# FILE: apps/backend/src/users/users.controller.spec.ts

```
import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('UsersController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: {} }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    expect(module.get(UsersController)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/users/users.controller.ts

```
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiCookieAuth('access_token')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Список усіх користувачів' })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Створити користувача' })
  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @ApiOperation({ summary: 'Оновити користувача' })
  @Patch(':id')
  @Roles('SUPERADMIN')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @ApiOperation({ summary: 'Видалити користувача' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}

```

# FILE: apps/backend/src/users/users.module.ts

```
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TelegramModule } from '../telegram/telegram.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [forwardRef(() => TelegramModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

```

# FILE: apps/backend/src/users/users.service.spec.ts

```
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

describe('UsersService', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: { user: { findMany: jest.fn() } } },
        { provide: TelegramService, useValue: { sendMessage: jest.fn() } },
      ],
    }).compile();
    expect(module.get(UsersService)).toBeDefined();
  });
});

```

# FILE: apps/backend/src/users/users.service.ts

```
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TelegramService } from '../telegram/telegram.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => TelegramService))
    private telegramService: TelegramService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    if (!email) return null;
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async findByEmailWithCity(email: string) {
    if (!email) return null;
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { city: true },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: {
        city: true,
      },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: data.role,
        cityId: data.cityId || null,
        telegramId: data.telegramId || null,
        car: data.car || null,
      },
    });

    if (data.password) {
      const chatId = user.telegramChatId || null;

      if (chatId) {
        await this.telegramService.sendWelcome(
          chatId,
          data.fullName,
          data.email,
          data.password,
        );
      }
    }

    this.prisma.notification
      .create({
        data: {
          userId: user.id,
          type: 'WELCOME',
          payload: { name: data.fullName },
        },
      })
      .catch(() => {});

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const updateData: Prisma.UserUpdateInput = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      city: data.cityId
        ? { connect: { id: data.cityId } }
        : { disconnect: true },
      telegramId: data.telegramId || null,
      car: data.car || null,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({ where: { id }, data: updateData });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateTelegramChatId(username: string, chatId: string) {
    return this.prisma.user.updateMany({
      where: {
        telegramId: {
          equals: username,
          mode: 'insensitive',
        },
      },
      data: { telegramChatId: chatId },
    });
  }
}

```

# FILE: apps/backend/test/app.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});

```

# FILE: apps/backend/test/auth.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('Auth API (contract)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => await app.close());

  describe('POST /auth/login', () => {
    it('повертає токен при правильних даних', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' })
        .expect(200);

      expect(res.body).toHaveProperty('access_token');
      expect(typeof res.body.access_token).toBe('string');
      expect(res.body.access_token.length).toBeGreaterThan(10);
    });

    it('повертає 401 при невірному паролі', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'wrongpassword' })
        .expect(401);
    });

    it('повертає 401 при невірному email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nobody@crm.com', password: 'admin123' })
        .expect(401);
    });

    it('повертає 400 без email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ password: 'admin123' })
        .expect(400);
    });

    it('структура відповіді відповідає контракту', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' })
        .expect(200);

      expect(res.body).toMatchObject({
        access_token: expect.any(String),
      });
    });
  });
});

```

# FILE: apps/backend/test/dashboard.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Dashboard API (contract)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;
  });

  afterAll(async () => await app.close());

  describe('GET /dashboard/summary', () => {
    it('повертає summary з токеном', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('todayEvents');
      expect(res.body).toHaveProperty('upcomingEvents');
      expect(res.body).toHaveProperty('funnel');
      expect(res.body).toHaveProperty('monthlyKpi');
      expect(res.body).toHaveProperty('staleSchools');
      expect(res.body).toHaveProperty('activityFeed');
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/dashboard/summary').expect(401);
    });

    it('funnel містить всі етапи пайплайну', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const stages = [
        'BASE',
        'FIRST_CONTACT',
        'DATE_CONFIRMED',
        'PREPARATION',
        'IN_PROGRESS',
        'DONE',
        'REPORT',
        'RE_SALE',
      ];
      for (const stage of stages) {
        expect(res.body.funnel).toHaveProperty(stage);
      }
    });

    it('monthlyKpi має числові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const kpi = res.body.monthlyKpi;
      expect(typeof kpi.revenue).toBe('number');
      expect(typeof kpi.profit).toBe('number');
      expect(typeof kpi.children).toBe('number');
      expect(typeof kpi.count).toBe('number');
    });

    it('фільтр по cityId повертає коректний результат', async () => {
      const citiesRes = await request(app.getHttpServer())
        .get('/cities')
        .set('Authorization', `Bearer ${token}`);

      const cityId = citiesRes.body[0]?.id;
      if (!cityId) return;

      const res = await request(app.getHttpServer())
        .get(`/dashboard/summary?cityId=${cityId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('funnel');
      expect(res.body).toHaveProperty('todayEvents');
    });

    it('todayEvents і upcomingEvents — масиви', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.todayEvents)).toBe(true);
      expect(Array.isArray(res.body.upcomingEvents)).toBe(true);
      expect(Array.isArray(res.body.staleSchools)).toBe(true);
      expect(Array.isArray(res.body.activityFeed)).toBe(true);
    });
  });
});

```

# FILE: apps/backend/test/events.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Events API (contract)', () => {
  let app: INestApplication;
  let token: string;
  let createdEventId: string;
  let schoolId: string;
  let cityId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;

    const citiesRes = await request(app.getHttpServer())
      .get('/cities')
      .set('Authorization', `Bearer ${token}`);
    cityId = citiesRes.body[0]?.id;

    if (cityId) {
      const schoolsRes = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`);
      schoolId = schoolsRes.body[0]?.id;
    }
  });

  afterAll(async () => {
    if (createdEventId) {
      await request(app.getHttpServer())
        .delete(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${token}`);
    }
    await app.close();
  });

  describe('GET /events', () => {
    it('повертає список подій з токеном', async () => {
      const res = await request(app.getHttpServer())
        .get('/events')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/events').expect(401);
    });

    it('кожна подія має обовязкові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/events')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      if (res.body.length > 0) {
        const event = res.body[0];
        expect(event).toHaveProperty('id');
        expect(event).toHaveProperty('project');
        expect(event).toHaveProperty('date');
        expect(event).toHaveProperty('status');
      }
    });
  });

  describe('POST /events', () => {
    it('створює нову подію', async () => {
      if (!schoolId || !cityId) return;

      const res = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Тестова подія E2E',
          date: '2027-01-15',
          time: '10:00',
          schoolId,
          cityId,
          childrenPlanned: 100,
          price: 5000,
          address: 'вул. Тестова 1',
          contactPerson: 'Тест',
          contactPhone: '0671234567',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.project).toBe('Тестова подія E2E');
      expect(res.body.status).toBe('BASE');
      createdEventId = res.body.id;
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer())
        .post('/events')
        .send({ project: 'Test' })
        .expect(401);
    });
  });

  describe('GET /events/:id', () => {
    it('повертає подію по id', async () => {
      if (!createdEventId) return;

      const res = await request(app.getHttpServer())
        .get(`/events/${createdEventId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.id).toBe(createdEventId);
    });

    it('повертає 404 для неіснуючої події', async () => {
      await request(app.getHttpServer())
        .get('/events/nonexistent-id-12345')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PATCH /events/:id/status', () => {
    it('змінює статус події', async () => {
      if (!createdEventId) return;

      const res = await request(app.getHttpServer())
        .patch(`/events/${createdEventId}/status`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'FIRST_CONTACT',
          actionName: 'Знайомство',
          comment: 'Тестовий коментар',
        })
        .expect(200);

      expect(res.body.status).toBe('FIRST_CONTACT');
      expect(res.body.history).toBeDefined();
      expect(res.body.history.length).toBeGreaterThan(0);
    });
  });

  describe('GET /events/school/:schoolId', () => {
    it('повертає події школи', async () => {
      if (!schoolId) return;

      const res = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
    });

    it('minimal=true повертає менше полів', async () => {
      if (!schoolId) return;

      const fullRes = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}`)
        .set('Authorization', `Bearer ${token}`);

      const minRes = await request(app.getHttpServer())
        .get(`/events/school/${schoolId}?minimal=true`)
        .set('Authorization', `Bearer ${token}`);

      if (fullRes.body.length > 0 && minRes.body.length > 0) {
        expect(minRes.body[0]).not.toHaveProperty('history');
        expect(minRes.body[0]).not.toHaveProperty('preparation');
      }
    });
  });

  describe('DELETE /events/:id', () => {
    it('видаляє подію', async () => {
      if (!schoolId || !cityId) return;

      const createRes = await request(app.getHttpServer())
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          project: 'Подія для видалення',
          date: '2027-02-01',
          time: '11:00',
          schoolId,
          cityId,
          childrenPlanned: 50,
          price: 2000,
          address: 'вул. Тест 2',
          contactPerson: 'Тест',
          contactPhone: '0671234568',
        });

      const deleteId = createRes.body.id;
      if (!deleteId) return;

      await request(app.getHttpServer())
        .delete(`/events/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/events/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});

```

# FILE: apps/backend/test/jest-e2e.json

```
{
  "reporters": ["default", ["@testomatio/reporter/jest", { "apiKey": "process.env.TESTOMATIO" }]],
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  
  "testTimeout": 30000,
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/../src/$1"
  }
  
}

```

# FILE: apps/backend/test/schools.e2e-spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Schools API (contract)', () => {
  let app: INestApplication;
  let token: string;
  let createdSchoolId: string;
  let cityId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;

    const citiesRes = await request(app.getHttpServer())
      .get('/cities')
      .set('Authorization', `Bearer ${token}`);
    cityId = citiesRes.body[0]?.id;
  });

  afterAll(async () => {
    if (createdSchoolId) {
      await request(app.getHttpServer())
        .delete(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`);
    }
    await app.close();
  });

  describe('GET /schools', () => {
    it('повертає список шкіл', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('minimal=true — немає include полів', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools?minimal=true')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/schools').expect(401);
    });

    it('кожна школа має обовязкові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/schools')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      if (res.body.length > 0) {
        const school = res.body[0];
        expect(school).toHaveProperty('id');
        expect(school).toHaveProperty('name');
        expect(school).toHaveProperty('type');
        expect(school).toHaveProperty('cityId');
      }
    });
  });

  describe('POST /schools', () => {
    it('створює нову школу', async () => {
      if (!cityId) return;

      const res = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'E2E Тестова школа',
          type: 'Школа',
          cityId,
          director: 'Тест Тестович',
          phone: '0671234567',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('E2E Тестова школа');
      createdSchoolId = res.body.id;
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer())
        .post('/schools')
        .send({ name: 'Test', type: 'Школа', cityId: 'city-1' })
        .expect(401);
    });
  });

  describe('GET /schools/:id', () => {
    it('повертає школу по id', async () => {
      if (!createdSchoolId) return;

      const res = await request(app.getHttpServer())
        .get(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.id).toBe(createdSchoolId);
      expect(res.body).toHaveProperty('city');
    });

    it('повертає 404 для неіснуючої школи', async () => {
      await request(app.getHttpServer())
        .get('/schools/nonexistent-id-99999')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PATCH /schools/:id', () => {
    it('оновлює дані школи', async () => {
      if (!createdSchoolId) return;

      const res = await request(app.getHttpServer())
        .patch(`/schools/${createdSchoolId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ director: 'Новий Директор' })
        .expect(200);

      expect(res.body.director).toBe('Новий Директор');
    });
  });

  describe('IDOR — OwnershipGuard для MANAGER', () => {
    let prisma: PrismaService;
    let adminToken: string;
    let otherCityId: string;
    let otherCitySchoolId: string;

    beforeAll(async () => {
      prisma = app.get(PrismaService);

      const loginRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin@crm.com', password: 'admin123' });
      adminToken = loginRes.body.access_token;
    });

    it('MANAGER отримує 403 при спробі доступу до школи іншого міста', async () => {
      if (!cityId) return;

      // Admin створює інше місто
      const cityBRes = await request(app.getHttpServer())
        .post('/cities')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: `E2E IDOR City ${Date.now()}` })
        .expect(201);
      otherCityId = cityBRes.body.id;

      // Admin створює школу в іншому місті
      const schoolRes = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: `E2E IDOR School ${Date.now()}`,
          type: 'Школа',
          cityId: otherCityId,
          director: 'Test',
          phone: '0671111111',
        })
        .expect(201);
      otherCitySchoolId = schoolRes.body.id;

      // Створюємо MANAGER користувача з cityId = cityA (перше місто)
      const hashedPassword = await bcrypt.hash('manager123', 10);
      const manager = await prisma.user.create({
        data: {
          email: `e2e-manager-${Date.now()}@crm.com`,
          password: hashedPassword,
          name: 'E2E Manager IDOR',
          role: 'MANAGER',
          cityId,
        },
      });

      // Логін як MANAGER
      const managerLogin = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: manager.email, password: 'manager123' })
        .expect(201);
      const managerToken = managerLogin.body.access_token;

      // MANAGER намагається отримати школу з іншого міста → 403
      await request(app.getHttpServer())
        .get(`/schools/${otherCitySchoolId}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .expect(403);
    });

    afterAll(async () => {
      if (otherCitySchoolId) {
        await request(app.getHttpServer())
          .delete(`/schools/${otherCitySchoolId}`)
          .set('Authorization', `Bearer ${adminToken}`);
      }
      if (otherCityId) {
        await request(app.getHttpServer())
          .delete(`/cities/${otherCityId}`)
          .set('Authorization', `Bearer ${adminToken}`);
      }
    });
  });

  describe('DELETE /schools/:id', () => {
    it('видаляє школу разом з подіями', async () => {
      if (!cityId) return;

      const createRes = await request(app.getHttpServer())
        .post('/schools')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Школа для видалення E2E', type: 'Школа', cityId });

      const deleteId = createRes.body.id;
      if (!deleteId) return;

      await request(app.getHttpServer())
        .delete(`/schools/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/schools/${deleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});

```

# FILE: apps/backend/tsconfig.build.json

```
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}

```

# FILE: apps/backend/tsconfig.json

```
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "types": ["jest", "node"],
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2023",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "noFallthroughCasesInSwitch": false
  }
}

```

# FILE: apps/docker-compose.yml

```
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: crm
      POSTGRES_PASSWORD: crm
      POSTGRES_DB: crm
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: pg_isready -U crm -d crm
      interval: 5s
      timeout: 3s
      retries: 5
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: redis-cli ping
      interval: 5s
      timeout: 3s
      retries: 5
    restart: unless-stopped

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - apps/backend/.env
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: wget --no-verbose --tries=1 --spider http://localhost:3000/.well-known/health || exit 1
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 15s
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

# FILE: apps/frontend/e2e/dashboard-swipe.spec.ts

```
import { test, expect, Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', "admin@crm.com");
  await page.fill('input[type="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/cities/, { timeout: 8000 });
}

async function navigateToDashboard(page: Page) {
  await page.goto("/dashboard");
  await page.waitForLoadState("networkidle");
}

async function swipeLeft(page: Page) {
  const dashboard = page.locator('[data-no-swipe]');
  const box = await dashboard.boundingBox();
  if (!box) throw new Error("Dashboard not found");
  const startX = box.x + box.width * 0.8;
  const endX = box.x + box.width * 0.2;
  const y = box.y + box.height * 0.4;
  await page.mouse.move(startX, y);
  await page.mouse.down();
  await page.mouse.move(endX, y, { steps: 10 });
  await page.mouse.up();
}

async function swipeRight(page: Page) {
  const dashboard = page.locator('[data-no-swipe]');
  const box = await dashboard.boundingBox();
  if (!box) throw new Error("Dashboard not found");
  const startX = box.x + box.width * 0.2;
  const endX = box.x + box.width * 0.8;
  const y = box.y + box.height * 0.4;
  await page.mouse.move(startX, y);
  await page.mouse.down();
  await page.mouse.move(endX, y, { steps: 10 });
  await page.mouse.up();
}

test.describe("Dashboard swipe-навігація", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToDashboard(page);
  });

  test("свайп вліво перемикає на Reports", async ({ page }) => {
    await expect(page).toHaveURL(/tab=overview/);
    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=reports/, { timeout: 3000 });
  });

  test("свайп вліво двічі перемикає на Leaderboard", async ({ page }) => {
    await swipeLeft(page);
    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=leaderboard/, { timeout: 3000 });
  });

  test("свайп вправо повертає назад", async ({ page }) => {
    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=reports/, { timeout: 3000 });
    await swipeRight(page);
    await expect(page).toHaveURL(/tab=overview/, { timeout: 3000 });
  });
});

```

# FILE: apps/frontend/e2e/login.spec.ts

```
import { test, expect } from "@playwright/test";

test.describe("Авторизація", () => {
  test("успішний логін перенаправляє на /cities", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/cities/, { timeout: 8000 });
  });

  test("невірний пароль — залишається на /login", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/login/);
  });

  test("невірний пароль — показує повідомлення про помилку", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(
      page.locator("text=/невірний|помилка|неправильний/i"),
    ).toBeVisible({ timeout: 5000 });
  });

  test("порожній email — кнопка не відправляє форму", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/login/);
  });

  test("після логіну встановлюється httpOnly cookie access_token", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/cities/);
    const cookies = await page.context().cookies();
    const authCookie = cookies.find((c) => c.name === "access_token");
    expect(authCookie).toBeTruthy();
    expect(authCookie?.httpOnly).toBe(true);
  });

  test("після логауту cookie access_token видаляється", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/cities/);

    const logoutBtn = page.locator("button", { hasText: /вийти|logout/i });
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      const cookies = await page.context().cookies();
      const authCookie = cookies.find((c) => c.name === "access_token");
      expect(authCookie).toBeFalsy();
    }
  });

 test("захищений маршрут без cookie перенаправляє на /login", async ({
    page,
  }) => {
    await page.goto("/schools");
    await page.context().clearCookies();
    await page.goto("/schools");
    await expect(page).toHaveURL(/login/);
  });
});

```

# FILE: apps/frontend/e2e/schools.spec.ts

```
import { test, expect, Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', "admin@crm.com");
  await page.fill('input[type="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/cities/, { timeout: 8000 });
}

test.describe("Сторінка шкіл", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/schools");
    await page.waitForLoadState("networkidle");
  });

  test("відображає заголовок Школи", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Школи");
  });

  test("відображає список шкіл", async ({ page }) => {
    const rows = page.locator("table tbody tr, .school-row-enter");
    await expect(rows.first()).toBeVisible({ timeout: 8000 });
  });

  test("пошук фільтрує школи", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Пошук"]');
    await expect(searchInput).toBeVisible();

    const firstSchool = page.locator("table tbody tr").first();
    const schoolName = await firstSchool.locator("td").first().textContent();
    const searchTerm = schoolName?.slice(0, 5) ?? "Школа";

    await searchInput.fill(searchTerm);
    await page.waitForTimeout(300);

    const results = page.locator("table tbody tr");
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test("очищення пошуку повертає всі результати", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Пошук"]');
    await searchInput.fill("Школа №1");
    await page.waitForTimeout(300);
    const filtered = await page.locator("table tbody tr").count();

    await searchInput.fill("");
    await page.waitForTimeout(300);
    const all = await page.locator("table tbody tr").count();

    expect(all).toBeGreaterThanOrEqual(filtered);
  });

  test("фільтр по статусу працює", async ({ page }) => {
    const newFilter = page.locator("button", { hasText: "Нові" });
    if (await newFilter.isVisible()) {
      await newFilter.click();
      await page.waitForTimeout(200);
      const counter = page.locator("text=/шкіл/i");
      await expect(counter).toBeVisible();
    }
  });

  test("клік на школу переходить на профіль", async ({ page }) => {
    const firstRow = page.locator("table tbody tr").first();
    await firstRow.click();
    await expect(page).toHaveURL(/\/schools\/.+/, { timeout: 5000 });
  });

  test("відображає StatsBar з лічильниками", async ({ page }) => {
    await expect(page.locator("text=Нові")).toBeVisible();
    await expect(page.locator("text=Заплановані")).toBeVisible();
    await expect(page.locator("text=В роботі")).toBeVisible();
  });
});

test.describe("Додавання школи", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/schools");
    await page.waitForLoadState("networkidle");
  });

  test("кнопка Додати відкриває модалку", async ({ page }) => {
    const addBtn = page.locator("button", { hasText: /\+ Додати/i });
    await expect(addBtn).toBeVisible();
    await addBtn.click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
  });

  test("модалка закривається по кнопці Скасувати", async ({ page }) => {
    await page.locator("button", { hasText: /\+ Додати/i }).click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
    await page.locator("button", { hasText: "Скасувати" }).click();
    await expect(page.locator("text=Нова школа")).not.toBeVisible();
  });

  test("форма не відправляється без назви школи", async ({ page }) => {
    await page.locator("button", { hasText: /\+ Додати/i }).click();
    await page.locator("button", { hasText: "Створити" }).click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
  });
});

```

# FILE: apps/frontend/eslint.config.js

```


import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
])



```

# FILE: apps/frontend/package.json
# КРИТИЧНО ВАЖЛИВИЙ ФАЙЛ

```
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "pretest:e2e": "playwright install --with-deps chromium",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.4.0",
    "@sentry/react": "^10.63.0",
    "@tanstack/react-query": "^5.101.0",
    "@tanstack/react-virtual": "^3.14.3",
    "axios": "^1.18.0",
    "formik": "^2.4.9",
    "framer-motion": "^12.41.0",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^1.20.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-hook-form": "^7.79.0",
    "react-router-dom": "^7.18.0",
    "recharts": "^3.8.1",
    "swiper": "^14.0.2",
    "yup": "^1.7.1",
    "zod": "^4.4.3",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@lhci/cli": "^0.15.1",
    "@percy/cli": "^1.32.3",
    "@percy/playwright": "^1.1.0",
    "@playwright/test": "^1.61.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "@vitest/coverage-v8": "^4.1.9",
    "@vitest/ui": "^4.1.9",
    "autoprefixer": "^10.5.0",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "husky": "^9.1.7",
    "jsdom": "^29.1.1",
    "msw": "^2.14.6",
    "postcss": "^8.5.15",
    "tailwindcss": "^3.4.19",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12",
    "vite-plugin-image-optimizer": "^2.0.3",
    "vitest": "^4.1.9"
  }
}

```

# FILE: apps/frontend/playwright.config.ts

```
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: 1,
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});

```

# FILE: apps/frontend/postcss.config.js

```


export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}



```

# FILE: apps/frontend/README.md
# КРИТИЧНО ВАЖЛИВИЙ ФАЙЛ

```
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```

# FILE: apps/frontend/src/main.tsx
# КРИТИЧНО ВАЖЛИВИЙ ФАЙЛ

```
import "./instrument";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import "./index.css";
import App from "./App";
import { ToastProvider } from "./components/ui/Toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </QueryClientProvider>
    </MotionConfig>
  </StrictMode>,
);

```

# FILE: apps/frontend/src/App.tsx
# КРИТИЧНО ВАЖЛИВИЙ ФАЙЛ

```
import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import { CityProvider } from "./context/CityContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { lazyWithRetry, TAB_PAGE_COMPONENTS } from "./pages/lazyTabPages";

import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { SkeletonCard } from "./components/ui/Skeleton";

const Login = lazyWithRetry(() => import("./pages/Login"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const CityProfile = lazyWithRetry(() => import("./pages/CityProfile"));
const EventReport = lazyWithRetry(() => import("./pages/EventReport"));

const Cities = lazyWithRetry(() => import("./pages/Cities"));
const SchoolProfile = lazyWithRetry(() => import("./pages/SchoolProfile"));
const ProjectProfile = lazyWithRetry(() => import("./pages/ProjectProfile"));
const ReportsReview = lazyWithRetry(() => import("./features/reports/pages/ReportsReviewPage"));
const Inventory = lazyWithRetry(() => import("./pages/Inventory"));
const CityLeaderboard = lazyWithRetry(() => import("./pages/CityLeaderboard"));

const Dashboard = TAB_PAGE_COMPONENTS["/dashboard"];
const Schools = TAB_PAGE_COMPONENTS["/schools"];
const Finance = TAB_PAGE_COMPONENTS["/finance"];
const CalendarView = TAB_PAGE_COMPONENTS["/calendar"];
const Employees = TAB_PAGE_COMPONENTS["/employees"];
const Analytics = TAB_PAGE_COMPONENTS["/analytics"];

const PageLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
);

function AppRoutes() {
  const { user, loading, setUser } = useAuth();
  const isAuthenticated = !!user;

  const handleLogin = (loggedInUser: any) => {
    setUser(loggedInUser);
  };

  if (loading) return <PageLoader />;

  return (
    <CityProvider>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Захищені маршрути (Layout відображає бокове меню) */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />

          
          <Route
            path="cities"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER", "OWNER"]}>
                <Suspense fallback={<PageLoader />}>
                  <Cities />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="schools"
            element={
              <Suspense fallback={<PageLoader />}>
                <Schools />
              </Suspense>
            }
          />

          <Route
            path="schools/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <SchoolProfile />
              </Suspense>
            }
          />

          <Route
            path="employees"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <Suspense fallback={<PageLoader />}>
                  <Employees />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="finance"
            element={
              <Suspense fallback={<PageLoader />}>
                <Finance />
              </Suspense>
            }
          />

          <Route
            path="calendar"
            element={
              <Suspense fallback={<PageLoader />}>
                <CalendarView />
              </Suspense>
            }
          />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER", "OWNER"]}>
                  <Suspense fallback={<PageLoader />}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="analytics"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER"]}>
                  <Suspense fallback={<PageLoader />}>
                    <Analytics />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="city-leaderboard"
              element={
                <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                  <Suspense fallback={<PageLoader />}>
                    <CityLeaderboard />
                  </Suspense>
                </ProtectedRoute>
              }
            />

          <Route
            path="kindergartens"
            element={
              <Suspense fallback={<PageLoader />}>
                <Schools />
              </Suspense>
            }
          />

          <Route
            path="cities/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <CityProfile />
              </Suspense>
            }
          />

          <Route
            path="projects/:id"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                <Suspense fallback={<PageLoader />}>
                  <ProjectProfile />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="events/:id/report"
            element={
              <Suspense fallback={<PageLoader />}>
                <EventReport />
              </Suspense>
            }
          />

          <Route
            path="reports/review"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                <Suspense fallback={<PageLoader />}>
                  <ReportsReview />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="inventory"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "OWNER", "MANAGER"]}>
                <Suspense fallback={<PageLoader />}>
                  <Inventory />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </CityProvider>
  );
}
export default function App() {
  useEffect(() => {
    window.Telegram?.WebApp?.expand();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

```

# FILE: apps/frontend/src/animations/employees.ts

```
import type { Variants } from "framer-motion";
import {
  DUR,
  EASE,
  SPRING,
  backdropVariants,
  modalContentVariants,
  shakeVariants,
  checkmarkVariants,
  staggerContainer,
  staggerItem,
} from "../lib/motion";

export {
  backdropVariants,
  modalContentVariants,
  shakeVariants,
  checkmarkVariants,
  staggerContainer,
  staggerItem,
};

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...SPRING.gentle },
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: { duration: DUR.normal },
  },
};

export const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DUR.slow, ease: EASE.decelerate },
  },
};

export const formVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.moderate, ease: EASE.outExpo } },
};

```

# FILE: apps/frontend/src/components/AddressLink.tsx

```
interface AddressLinkProps {
  address?: string | null;
  className?: string;
}

export default function AddressLink({ address, className }: AddressLinkProps) {
  if (!address) return <span className="text-slate-400">—</span>;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title="Відкрити в Google Maps"
      className={`group inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors active:scale-95 ${
        className ?? ""
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
      <span className="underline decoration-transparent group-hover:decoration-blue-300 decoration-1 underline-offset-2 transition-all">
        {address}
      </span>
    </a>
  );
}

```

# FILE: apps/frontend/src/components/BottomNavigationBar.tsx

```
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { SPRING, DUR } from "../lib/motion";
import { useAuth } from "../context/AuthContext";
import { NAV_TABS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";
import type { NavTab } from "../constants/navTabs";
import MoreSheet from "./MoreSheet";

export function useFilteredTabs(): NavTab[] {
  const { user } = useAuth();
  return useMemo(() => NAV_TABS.filter((t) => hasRole(user?.role, t.roles)), [user]);
}

export function useBottomTabs(): NavTab[] {
  const { user } = useAuth();
  return useMemo(() => {
    const role = user?.role;
    const allTabs = NAV_TABS.filter((t) => hasRole(role, t.roles));
    if (role === "DRIVER" || role === "HOST") {
      const keys = ["/schools", "/calendar", "/finance"];
      return allTabs.filter((t) => keys.includes(t.to));
    }
    const keys = ["/dashboard", "/schools", "/calendar"];
    return allTabs.filter((t) => keys.includes(t.to));
  }, [user]);
}

function TabItem({ tab, isActive }: { tab: NavTab; isActive: boolean }) {
  const Icon = tab.icon;
  return (
    <Link
      to={tab.to}
      role="tab"
      aria-selected={isActive}
      aria-label={tab.label}
      className="relative flex items-center justify-center min-w-[44px] min-h-[44px] flex-1"
    >
      {isActive && (
        <motion.div
          layoutId="bottomnav-active-pill"
          className="absolute inset-x-1 inset-y-1 bg-brand/10 rounded-control"
          transition={SPRING.snappy}
        />
      )}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center gap-0.5"
        whileTap={{ scale: 0.85 }}
        transition={{ duration: DUR.micro }}
      >
        <motion.div
          animate={isActive ? { y: -1 } : { y: 0 }}
          transition={SPRING.gentle}
        >
          <Icon className={`w-5 h-5 transition-colors duration-fast ${isActive ? "text-brand" : "text-content-muted"}`} />
        </motion.div>
        <span className={`text-2xs font-medium transition-colors duration-fast ${isActive ? "text-brand" : "text-content-muted"}`}>
          {tab.label}
        </span>
      </motion.div>
    </Link>
  );
}

export default function BottomNavigationBar() {
  const location = useLocation();
  const tabs = useBottomTabs();
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeIndex = useMemo(
    () => tabs.findIndex((t) => location.pathname.startsWith(t.to)),
    [tabs, location.pathname],
  );

  const isMoreActive = activeIndex === -1;

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border flex items-center justify-around px-1 h-14 overflow-visible"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        role="tablist"
        aria-label="Основна навігація"
      >
        {tabs.map((tab, i) => (
          <TabItem key={tab.to} tab={tab} isActive={i === activeIndex} />
        ))}

        <button
          onClick={() => setSheetOpen(true)}
          className="relative flex items-center justify-center min-w-[44px] min-h-[44px] flex-1"
          aria-label="Більше розділів"
          role="tab"
          aria-selected={isMoreActive}
        >
          {isMoreActive && (
            <motion.div
              layoutId="bottomnav-active-pill"
              className="absolute inset-x-1 inset-y-1 bg-brand/10 rounded-control"
              transition={SPRING.snappy}
            />
          )}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center gap-0.5"
            whileTap={{ scale: 0.85 }}
            transition={{ duration: DUR.micro }}
          >
            <motion.div
              animate={isMoreActive ? { rotate: 90, y: -1 } : { rotate: 0, y: 0 }}
              transition={SPRING.gentle}
            >
              <MoreHorizontal className={`w-5 h-5 transition-colors duration-fast ${isMoreActive ? "text-brand" : "text-content-muted"}`} />
            </motion.div>
            <span className={`text-2xs font-medium transition-colors duration-fast ${isMoreActive ? "text-brand" : "text-content-muted"}`}>
              Більше
            </span>
          </motion.div>
        </button>
      </nav>

      <AnimatePresence>
        {sheetOpen && <MoreSheet onClose={() => setSheetOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

```

# FILE: apps/frontend/src/components/calendar/DayOffModal.tsx

```
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, modalContentVariants } from "../../lib/motion";
import type { DayOff } from "../../hooks/useDaysOff";

interface StaffUser {
  id: string;
  name: string;
  role: string;
}

interface DayOffModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  staff: StaffUser[];
  dayOffs: DayOff[];
  onToggle: (userId: string, existingId?: string) => void;
}

const ROLE_ICON: Record<string, string> = {
  HOST: "🎙️",
  DRIVER: "🚗",
};

export default function DayOffModal({
  isOpen,
  onClose,
  date,
  staff,
  dayOffs,
  onToggle,
}: DayOffModalProps) {
  const headingId = 'dayoff-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const dateStr = date?.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }) ?? "";

  return createPortal(
    <AnimatePresence>
      {isOpen && date && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden select-none no-select-ios"
          >
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 id={headingId} className="text-lg font-bold text-slate-800">
                  Вихідний на {dateStr}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Оберіть співробітника
                </p>
              </div>
              <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors active:scale-90 transition-transform duration-fast">
                ✕
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {staff.length === 0 ? (
                <p className="text-center text-slate-400 py-6 text-sm">
                  Немає співробітників у цьому місті
                </p>
              ) : (
                <div className="space-y-2">
                  {staff.map((s) => {
                    const existing = dayOffs.find((d) => d.userId === s.id);
                    const isOff = !!existing;
                    return (
                      <button
                        key={s.id}
                        onClick={() => onToggle(s.id, existing?.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left no-select-ios active:scale-[0.98] ${
                          isOff
                            ? "border-rose-200 bg-rose-50"
                            : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
                        }`}
                      >
                        <span className="flex items-center gap-2 font-medium text-slate-800">
                          <span>{ROLE_ICON[s.role] || "👤"}</span>
                          {s.name}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            isOff
                              ? "bg-rose-100 text-rose-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isOff ? "Вихідний ✕" : "Призначити"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

```

# FILE: apps/frontend/src/components/cities/CityDesktopGrid.tsx

```
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { City } from "../../types";
import OptimizedImage from "../ui/OptimizedImage";

const CITY_PHOTOS: Record<string, string> = {
  Львів:
    "https://static4.depositphotos.com/1027798/376/i/450/depositphotos_3763579-stock-photo-lviv-lvov-ukraine.jpg",

  Київ: "https://st.depositphotos.com/58719516/51188/i/450/depositphotos_511888226-stock-photo-kyiv-central-square-buildings-landscape.jpg",

  Харків:
    "https://st.depositphotos.com/67336120/56801/i/950/depositphotos_568018044-stock-photo-kharkiv-ukraine-spring-2021-panoramic.jpg",

  Одеса:
    "https://st3.depositphotos.com/3644443/16721/i/450/depositphotos_167218870-stock-photo-aerial-view-opera-and-ballet.jpg",

  Дніпро:
    "https://st4.depositphotos.com/1005991/20622/i/450/depositphotos_206223052-stock-photo-dnepropetrovsk-beautiful-city-landscape-dnepr.jpg",

  Запоріжжя:
    "https://st4.depositphotos.com/2955305/41468/i/950/depositphotos_414689920-stock-photo-zaporozhye-ukraine-2020-theater-square.jpg",

  "Івано-Франківськ":
    "https://st3.depositphotos.com/7149852/15888/i/450/depositphotos_158883576-stock-photo-the-center-of-historic-european.jpg",

  Чернівці:
    "https://st3.depositphotos.com/6179956/16823/i/450/depositphotos_168238240-stock-photo-chernivtsi-ukraine-april-2017-residence.jpg",

  Тернопіль:
    "https://st.depositphotos.com/3651191/51255/i/450/depositphotos_512553730-stock-photo-colorful-autumn-view-flying-drone.jpg",

  Ужгород:
    "https://st2.depositphotos.com/2954445/42446/i/950/depositphotos_424466430-stock-photo-view-city-mountain-uzhhorod-castle.jpg",

  Миколаїв:
    "https://korabelov.info/wp-content/uploads/2023/02/752638-780x470.jpg.webp",

  Вінниця:
    "https://st5.depositphotos.com/10859846/83141/i/950/depositphotos_831410524-stock-photo-aerial-view-cremona-italy-highlighting.jpg",

  Херсон:
    "https://st2.depositphotos.com/28888872/48293/i/450/depositphotos_482930928-stock-photo-aerial-view-of-the-kherson.jpg",

  Полтава:
    "https://st4.depositphotos.com/8109164/38951/i/450/depositphotos_389510792-stock-photo-aerial-view-on-holy-dormition.jpg",

  Чернігів:
    "https://st2.depositphotos.com/1642129/6819/i/450/depositphotos_68194491-stock-photo-chernihivs-railway-station-is-looking.jpg",

  Черкаси:
    "https://st4.depositphotos.com/6259690/24892/i/450/depositphotos_248928436-stock-photo-scenic-cityscape-of-cherkasy-ukraine.jpg",

  Суми: "https://st3.depositphotos.com/29384342/33416/i/450/depositphotos_334165806-stock-photo-scenic-view-christmas-decorations.jpg",

  Житомир:
    "https://st4.depositphotos.com/1315434/22548/i/950/depositphotos_225486326-stock-photo-aerial-view-zhytomyr-city-ukraine.jpg",

  Хмельницький:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMF4ElBw0lBXcW--rvqPYk5ZTM7PXi-A6qxxw9UAwhmg&s=10",

  Рівне:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVEqOaKt-xPQssGp6LtVdqPkKmNMeK1BkDf9HwkF0_qw&s=10",

  Кропивницький:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTY417WfgkTzzu3LZ2o_3MOpWeP4D2ueot6GV80VQPA&s=10",

  Луцьк:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWzzd6fMVMUDsaUHZITW7-U8MS-FpM70v2DjBnoYRoQ&s=10",
};
const DEFAULT_PHOTO =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format";

function CityCard({
  city,
  index,
  isSelected,
  onSelect,
}: {
  city: City;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    img.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = "scale(1) translate(0, 0)";
  }, []);

  return (
    <div
      style={{
        animationDelay: `${index * 60}ms`,
        animationFillMode: "both",
      }}
      className={`
        city-card-enter
        bg-white rounded-2xl shadow-sm border overflow-hidden group
        transition-[transform,box-shadow] duration-300 ease-out
        hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl
        ${
          isSelected
            ? "border-blue-500 ring-4 ring-blue-500/20 shadow-md"
            : "border-slate-100 hover:border-blue-200"
        }
      `}
    >
      {/* Фото з паралаксом і градієнтом Netflix-стилю */}
      <div
        className="h-44 overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={CITY_PHOTOS[city.name] || DEFAULT_PHOTO}
          alt={city.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_PHOTO;
          }}
        />

        {/* Темний градієнт знизу — назва міста чітко читається */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Назва міста поверх градієнта */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-white text-xl font-bold drop-shadow-sm leading-tight">
            {city.name}
          </h2>
        </div>

        {/* Чекмарк якщо місто обрано */}
        {isSelected && (
          <div className="check-enter absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Контент картки */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
            Активне
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
            {city.manager?.name?.charAt(0) ?? "?"}
          </div>
          <span>
            Менеджер:{" "}
            <span className="font-medium">{city.manager?.name ?? "—"}</span>
          </span>
        </div>

        <div className="space-y-2 text-sm border-t border-slate-50 pt-3">
          <div className="flex justify-between text-slate-500">
            <span>Заплановано подій:</span>
            <span className="font-semibold text-slate-800">
              {city.plannedEvents ?? 0}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
          <button
            onClick={onSelect}
            className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all duration-200 ${
              isSelected
                ? "bg-blue-50 text-blue-700 border border-blue-200 scale-[0.98]"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 transition-all duration-200">
              {isSelected ? "✓ Обрано" : "Вибрати"}
            </span>
          </button>
          <button
            onClick={() => navigate(`/cities/${city.id}`)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm rounded-lg transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

interface CityDesktopGridProps {
  cities: City[];
  selectedCity: City | null;
  onSelectCity: (city: { id: string; name: string }) => void;
}

export default function CityDesktopGrid({
  cities,
  selectedCity,
  onSelectCity,
}: CityDesktopGridProps) {
  return (
    <>
      {}
      <style>{`
        @keyframes cityCardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .city-card-enter {
          animation: cityCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes checkIn {
          from { opacity: 0; transform: scale(0.4) rotate(-20deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .check-enter {
          animation: checkIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city: City, index: number) => (
          <CityCard
            key={city.id}
            city={city}
            index={index}
            isSelected={selectedCity?.id === city.id}
            onSelect={() => onSelectCity({ id: city.id, name: city.name })}
          />
        ))}
      </div>
    </>
  );
}

```

# FILE: apps/frontend/src/components/cities/CityMobileHeader.tsx

```
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import type { City, IssueReport } from "../../types";
import { CITY_ICONS, DEFAULT_CITY_ICON } from "../../constants/cityIcons";

interface Props {
  selectedCity: City | null;
  cities: City[];
}

const STATUSES = ["Планується", "Виконується", "Виконано"];

const STATUS_STYLES: Record<string, string> = {
  Планується: "bg-amber-50 text-amber-700 border-amber-200",
  Виконується: "bg-blue-50 text-blue-700 border-blue-200",
  Виконано: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function getNextStatus(current: string) {
  const idx = STATUSES.indexOf(current);
  return STATUSES[(idx + 1) % STATUSES.length];
}

export default function CityMobileHeader({ selectedCity, cities }: Props) {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<IssueReport[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListExiting, setIsListExiting] = useState(false);
  const [exitingIssueId, setExitingIssueId] = useState<string | null>(null);
  const [issuesVisible, setIssuesVisible] = useState(false);
  const [issuesExiting, setIssuesExiting] = useState(false);

  useEffect(() => {
    if (!selectedCity?.id) {
      setIssues([]);
      return;
    }
    api
      .get(`/issues?cityId=${selectedCity.id}`)
      .then((res) => {
        const filtered = res.data.filter((i: IssueReport) => i.status !== "Виконано");
        setIssues(filtered);
        if (filtered.length > 0) {
          setIssuesExiting(false);
          setIssuesVisible(true);
        } else {
          setIssuesExiting(true);
          setTimeout(() => {
            setIssuesVisible(false);
            setIssuesExiting(false);
          }, 300);
        }
      })
      .catch(console.error);
  }, [selectedCity?.id]);

  const handleStatusToggle = async (issue: IssueReport) => {
    const nextStatus = getNextStatus(issue.status);

    if (nextStatus === "Виконано") {
      setExitingIssueId(issue.id);
      setTimeout(() => {
        setIssues((prev) => {
          const next = prev.filter((i) => i.id !== issue.id);
          if (next.length === 0) {
            setIsExpanded(false);
            setIssuesExiting(true);
            setTimeout(() => {
              setIssuesVisible(false);
              setIssuesExiting(false);
            }, 300);
          }
          return next;
        });
        setExitingIssueId(null);
      }, 400);
    } else {
      setIssues((prev) =>
        prev.map((i) => (i.id === issue.id ? { ...i, status: nextStatus } : i)),
      );
    }

    api
      .patch(`/issues/${issue.id}/status`, { status: nextStatus })
      .catch((e) => {
        console.error(e);
        setIssues((prev) =>
          prev.map((i) =>
            i.id === issue.id ? { ...i, status: issue.status } : i,
          ),
        );
      });
  };

  const currentCityData = cities?.find((c: City) => c.id === selectedCity?.id);
  const totalEvents =
    (currentCityData?.plannedEvents || 0) +
    (currentCityData?.completedEvents || 0);
  const schoolsCount = currentCityData?.schoolsCount || 0;

  return (
    <div className="md:hidden flex flex-col gap-4 mb-4">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); max-height: 200px; }
          to { opacity: 0; transform: translateY(-8px); max-height: 0; }
        }
        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cityNameChange {
          0% { opacity: 1; transform: translateY(0); }
          40% { opacity: 0; transform: translateY(-6px); }
          60% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .city-name-change {
          animation: cityNameChange 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .issues-enter {
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .issues-exit {
          animation: slideUp 0.3s ease-in forwards;
          overflow: hidden;
        }
        .expand-enter {
          animation: expandDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @keyframes collapseUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-8px); }
        }
        .expand-exit {
          animation: collapseUp 0.22s ease-in forwards;
        }
        @keyframes statusFlash {
          0% { transform: scale(1); }
          40% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .status-flash {
          animation: statusFlash 0.2s ease-out;
        }
      `}</style>

      {/* Сповіщення про проблему з розгортанням */}
      {issuesVisible && (
        <div
          className={`bg-danger-subtle border border-red-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm ${issuesExiting ? "issues-exit" : "issues-enter"}`}
        >
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              if (isExpanded) {
                setIsListExiting(true);
                setTimeout(() => {
                  setIsExpanded(false);
                  setIsListExiting(false);
                }, 250);
              } else {
                setIsExpanded(true);
              }
            }}
          >
            <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 text-xl shadow-sm">
              🔔
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm">
                {issues.length} активн
                {issues.length === 1
                  ? "а проблема"
                  : issues.length < 5
                    ? "і проблеми"
                    : "их проблем"}
              </p>
              {!isExpanded && (
                <p className="text-xs text-slate-600 truncate mt-0.5">
                  {issues[0]?.schoolName}
                </p>
              )}
            </div>
            <button
              className="text-slate-400 hover:text-slate-600 text-2xl font-light transition-transform duration-300"
              style={{
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              ›
            </button>
          </div>

          {/* Розгорнутий список проблем */}
          {isExpanded && (
            <div
              className={`flex flex-col gap-3 mt-2 pt-3 border-t border-red-100/50 ${isListExiting ? "expand-exit" : "expand-enter"}`}
            >
              {issues.map((issue) => {
                const isExiting = exitingIssueId === issue.id;
                return (
                  <div
                    key={issue.id}
                    className={`bg-white rounded-2xl p-4 border border-red-100 shadow-sm relative transition-all duration-400 ease-in-out transform origin-top ${
                      isExiting
                        ? "opacity-0 scale-95 h-0 overflow-hidden !p-0 border-0"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <p className="text-[11px] text-slate-400 mb-1">
                      {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="font-bold text-slate-800 text-sm">
                      {issue.schoolName}
                    </p>
                    <p className="text-[11px] text-slate-500 mb-3">
                      {issue.eventName}
                    </p>

                    <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed border border-slate-100 mb-3">
                      "{issue.message}"
                    </p>

                    <button
                      onClick={() => handleStatusToggle(issue)}
                      key={issue.status}
                      className={`status-flash w-full text-xs font-bold px-3 py-2.5 rounded-lg border transition-colors text-left flex items-center gap-1.5 ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
                    >
                      <span className="text-[10px]">●</span> {issue.status}{" "}
                      <span className="font-normal opacity-70">
                        → натисни щоб змінити
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Поточне місто */}
      {selectedCity?.id && (
        <div className="bg-white border border-blue-50 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              Поточне місто
            </span>
            <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
              ✓ Активне місто
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full text-lg city-name-change">
              {CITY_ICONS[selectedCity.name] || DEFAULT_CITY_ICON}
            </div>
            <h2
              key={selectedCity.id}
              className="text-2xl font-bold text-slate-800 city-name-change"
            >
              {selectedCity.name}
            </h2>
          </div>

          <div className="flex items-center justify-between text-xs font-medium gap-2">
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">📅</span> {totalEvents}{" "}
              подій
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">🏫</span> {schoolsCount}{" "}
              шкіл
            </div>
            <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-2 rounded-xl">
              <span className="text-sm">⚠️</span> {issues.length} проблем
            </div>
            {/* <button 
              onClick={() => navigate(`/cities/${selectedCity.id}`)} 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm shrink-0"
            >
              →
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/components/cities/CityMobileList.tsx

```
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { City } from "../../types";
import { CITY_ICONS, DEFAULT_CITY_ICON } from "../../constants/cityIcons";

const ICON_COLORS = [
  "bg-purple-50",
  "bg-amber-50",
  "bg-teal-50",
  "bg-rose-50",
  "bg-sky-50",
];

interface CityMobileListProps {
  cities: City[];
  selectedCity: City | null;
  onSelectCity: (city: { id: string; name: string }) => void;
}

const TABS = [
  { key: "ACTIVE" as const, label: "Активні" },
  { key: "ALL" as const, label: "Усі" },
  { key: "ARCHIVED" as const, label: "Архівні" },
];

export default function CityMobileList({
  cities,
  selectedCity,
  onSelectCity,
}: CityMobileListProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "ALL" | "ARCHIVED">("ACTIVE");

  const filteredCities = useMemo(() => {
    return cities.filter((c: City) => {
      const hasEvents = (c.plannedEvents || 0) + (c.completedEvents || 0) > 0;
      if (activeTab === "ACTIVE") return hasEvents;
      if (activeTab === "ARCHIVED") return !hasEvents;
      return true;
    });
  }, [cities, activeTab]);

  return (
    <div className="md:hidden flex flex-col gap-3 mb-24 mt-1">
      <div className="flex bg-surface-muted rounded-control p-0.5">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 text-sm font-medium rounded-control transition-all duration-fast active:scale-95 ${
              activeTab === tab.key
                ? "bg-surface shadow-soft text-content-primary"
                : "text-content-muted hover:text-content-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
        {filteredCities.map((city: City, index: number) => {
          const totalEvents = (city.plannedEvents || 0) + (city.completedEvents || 0);
          const isSelected = selectedCity?.id === city.id;

          return (
            <div
              key={city.id}
              className={`flex items-center p-3 border-b border-border transition-colors duration-fast active:bg-surface-muted active:scale-[0.98] transition-transform ${
                isSelected ? "bg-brand-50/30" : ""
              }`}
              onClick={() => onSelectCity({ id: city.id, name: city.name })}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 text-lg shrink-0 ${ICON_COLORS[index % ICON_COLORS.length]}`}
              >
                {CITY_ICONS[city.name] || DEFAULT_CITY_ICON}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-content-primary text-sm">
                  {city.name}
                </p>
                <p className="text-2xs text-content-muted mt-0.5">
                  {totalEvents} подій · {city.schoolsCount || 0} шкіл
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/cities/${city.id}`);
                }}
                className="p-2.5 text-content-muted hover:text-brand text-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-90"
              >
                ›
              </button>
            </div>
          );
        })}

        {filteredCities.length === 0 && (
          <div className="p-8 text-center text-content-muted font-medium text-sm">
            Міст не знайдено
          </div>
        )}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/city-profile/CityAnalytics.tsx

```
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';

interface CityAnalyticsProps {
  events: any[];
}

const PALETTE = ['#2563eb', '#10b981', '#06b6d4', '#f59e0b', '#8b5cf6', '#f43f5e', '#84cc16', '#6366f1', '#0ea5e9', '#ec4899', '#14b8a6', '#a855f7'];

const UA_MONTHS = ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'];
const DATE_FMT = new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });

function toMonthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(key: string) {
  const [y, m] = key.split('-').map(Number);
  return `${UA_MONTHS[m - 1]} ${String(y).slice(-2)}`;
}

function fmt(n: unknown) {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));
}

function toInputDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function CityAnalytics({ events }: CityAnalyticsProps) {
  const today = useMemo(() => new Date(), []);

  const [from, setFrom] = useState(() => toInputDate(new Date(today.getFullYear(), today.getMonth() - 5, 1)));
  const [to, setTo] = useState(() => toInputDate(today));
  const [isOpen, setIsOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState(from);
  const [draftTo, setDraftTo] = useState(to);

  const applyPreset = (months: number | null, mode?: 'year' | 'all') => {
    const t = new Date();
    let f: Date;
    if (mode === 'year') f = new Date(t.getFullYear(), 0, 1);
    else if (mode === 'all') f = new Date(2000, 0, 1);
    else f = new Date(t.getFullYear(), t.getMonth() - (months! - 1), 1);
    setDraftFrom(toInputDate(f));
    setDraftTo(toInputDate(t));
  };

  const applyRange = () => {
    setFrom(draftFrom);
    setTo(draftTo);
    setIsOpen(false);
  };

  const filtered = useMemo(() => {
    const fromD = new Date(from);
    const toD = new Date(to);
    toD.setHours(23, 59, 59, 999);
    return (events || []).filter(ev => {
      const d = new Date(ev.date);
      return d >= fromD && d <= toD;
    });
  }, [events, from, to]);

  const monthly = useMemo(() => {
    const map = new Map<string, { revenue: number; profit: number; children: number; count: number }>();
    const fromD = new Date(from);
    const toD = new Date(to);
    const cursor = new Date(fromD.getFullYear(), fromD.getMonth(), 1);
    const last = new Date(toD.getFullYear(), toD.getMonth(), 1);
    let guard = 0;
    while (cursor <= last && guard < 240) {
      map.set(toMonthKey(cursor), { revenue: 0, profit: 0, children: 0, count: 0 });
      cursor.setMonth(cursor.getMonth() + 1);
      guard += 1;
    }
    filtered.forEach(ev => {
      const key = toMonthKey(new Date(ev.date));
      const bucket = map.get(key) || { revenue: 0, profit: 0, children: 0, count: 0 };
      bucket.revenue += Number(ev.report?.totalSum || ev.price || 0);
      bucket.profit += Number(ev.report?.remainderSum || 0);
      bucket.children += Number(ev.report?.childrenCount || ev.childrenPlanned || 0);
      bucket.count += 1;
      map.set(key, bucket);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, v]) => ({ key, label: monthLabel(key), ...v }));
  }, [filtered, from, to]);

  const totalRevenue = filtered.reduce((s, ev) => s + Number(ev.report?.totalSum || ev.price || 0), 0);
  const totalProfit = filtered.reduce((s, ev) => s + Number(ev.report?.remainderSum || 0), 0);
  const totalChildren = filtered.reduce((s, ev) => s + Number(ev.report?.childrenCount || ev.childrenPlanned || 0), 0);
  const totalCount = filtered.length;

  const pieData = monthly.filter(m => m.count > 0);
  const pieTotal = pieData.reduce((s, m) => s + m.count, 0);
  const hasRevenue = monthly.some(m => m.revenue > 0);

  const exportCsv = () => {
    const header = 'Місяць;Виручка;Прибуток;Подій;Дітей\n';
    const rows = monthly.map(m => `${m.label};${m.revenue};${m.profit};${m.count};${m.children}`).join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${from}_${to}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const rangeLabel = `${DATE_FMT.format(new Date(from))} – ${DATE_FMT.format(new Date(to))}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Контроли */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-bold text-content-primary text-lg">Аналітика по місяцях</h3>
          <p className="text-sm text-content-muted mt-0.5">На основі завершених подій закладу</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <button
              onClick={() => { setDraftFrom(from); setDraftTo(to); setIsOpen(v => !v); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-surface border border-border-strong rounded-control text-xs sm:text-sm font-medium text-content-secondary hover:bg-surface-muted transition-colors"
            >
              📅 <span className="truncate">{rangeLabel}</span> <span className="text-content-muted">⌄</span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 z-20 bg-surface rounded-xl shadow-lg border border-border p-4 w-72"
                  >
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={() => applyPreset(3)} className="px-3 py-1.5 rounded-pill text-xs bg-surface-muted hover:bg-neutral-200 font-medium transition-colors">3 міс.</button>
                    <button onClick={() => applyPreset(6)} className="px-3 py-1.5 rounded-pill text-xs bg-surface-muted hover:bg-neutral-200 font-medium transition-colors">6 міс.</button>
                    <button onClick={() => applyPreset(12)} className="px-3 py-1.5 rounded-pill text-xs bg-surface-muted hover:bg-neutral-200 font-medium transition-colors">12 міс.</button>
                    <button onClick={() => applyPreset(null, 'year')} className="px-3 py-1.5 rounded-pill text-xs bg-surface-muted hover:bg-neutral-200 font-medium transition-colors">Цей рік</button>
                    <button onClick={() => applyPreset(null, 'all')} className="px-3 py-1.5 rounded-pill text-xs bg-surface-muted hover:bg-neutral-200 font-medium transition-colors">Весь час</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-xs text-content-muted mb-1">Від</label>
                      <input type="date" value={draftFrom} onChange={e => setDraftFrom(e.target.value)} className="w-full p-2 border border-border-strong rounded-control text-base focus:outline-none focus:border-brand-300" />
                    </div>
                    <div>
                      <label className="block text-xs text-content-muted mb-1">До</label>
                      <input type="date" value={draftTo} onChange={e => setDraftTo(e.target.value)} className="w-full p-2 border border-border-strong rounded-control text-base focus:outline-none focus:border-brand-300" />
                    </div>
                  </div>
                  <button onClick={applyRange} className="w-full bg-brand text-white py-2.5 rounded-control text-sm font-medium hover:bg-brand-hover transition-colors">
                    Застосувати
                  </button>
                </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={exportCsv}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-brand-50 text-brand rounded-control text-xs sm:text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            ⬇ <span className="hidden sm:inline">Експорт</span>
          </button>
        </div>
      </div>

      {/* Загальна інформація */}
      <div className="bg-surface rounded-card shadow-card border border-border p-5 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
          <Stat label="Загальна виручка" value={`${fmt(totalRevenue)} грн`} />
          <Stat label="Загальний прибуток" value={`${fmt(totalProfit)} грн`} />
          <Stat label="Проведено подій" value={totalCount} />
          <Stat label="Охоплено дітей" value={fmt(totalChildren)} />
        </div>
      </div>

      {/* Графіки */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Виручка по місяцях */}
        <div className="bg-surface rounded-card shadow-card border border-border p-5 sm:p-6">
          <h4 className="font-bold text-content-primary mb-4">Виручка по місяцях</h4>
          {!hasRevenue ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthly} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} interval={monthly.length > 8 ? 1 : 0} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  width={46}
                  tickFormatter={(v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`)}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  formatter={(v: number) => [`${fmt(v)} грн`, 'Виручка']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                />
                <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Проведено подій по місяцях */}
        <div className="bg-surface rounded-card shadow-card border border-border p-5 sm:p-6">
          <h4 className="font-bold text-content-primary mb-4">Проведено подій по місяцях</h4>
          {pieData.length === 0 ? (
            <EmptyChart />
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-44 h-44 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="count" nameKey="label" innerRadius={52} outerRadius={78} paddingAngle={2} strokeWidth={0}>
                      {pieData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number, n: string) => [`${v} подій`, n]} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-content-muted">Всього</span>
                  <span className="text-xl font-bold text-content-primary">{pieTotal}</span>
                </div>
              </div>
              <ul className="flex-1 flex flex-col gap-2 text-sm w-full min-w-0">
                {pieData.map((m, i) => (
                  <li key={m.key} className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-pill shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
                    <span className="text-content-secondary truncate flex-1">{m.label}</span>
                    <span className="font-medium text-content-primary shrink-0">{m.count} ({Math.round((m.count / pieTotal) * 100)}%)</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-content-muted font-medium mb-1.5 truncate">{label}</p>
      <p className="text-lg sm:text-2xl font-bold text-content-primary truncate">{value}</p>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="h-[280px] flex flex-col items-center justify-center text-slate-300">
      <span className="text-3xl mb-2">📊</span>
      <span className="text-sm text-content-muted">Немає даних за цей період</span>
    </div>
  );
}
```

# FILE: apps/frontend/src/components/dashboard/ActivityFeed.tsx

```
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, emptyStateVariants } from '../../lib/motion';

const ROLE_INITIALS: Record<string, string> = {
  MANAGER:    'М',
  SUPERADMIN: 'А',
  DRIVER:     'В',
  HOST:       'В',
};

const ROLE_COLORS: Record<string, string> = {
  MANAGER:    'bg-brand-50 text-brand-700',
  SUPERADMIN: 'bg-purple-50 text-purple-700',
  DRIVER:     'bg-success-50 text-success-700',
  HOST:       'bg-violet-50 text-violet-700',
};

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'сьогодні';
  if (d.toDateString() === yesterday.toDateString()) return 'вчора';
  return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
}

interface ActivityItem {
  id:         string;
  userName:   string;
  role:       string;
  action:     string;
  comment:    string | null;
  createdAt:  string;
  schoolId:   string | null;
  schoolName: string | null;
  eventId:    string | null;
}

interface Group {
  key:       string;
  userName:  string;
  role:      string;
  schoolId:  string | null;
  schoolName: string | null;
  actions:   { id: string; action: string; comment: string | null; createdAt: string }[];
}

function groupItems(items: ActivityItem[]): Group[] {
  const groups: Group[] = [];

  for (const item of items) {
    const last = groups[groups.length - 1];
    const sameUser   = last?.userName  === item.userName;
    const sameSchool = last?.schoolId  === item.schoolId; 

    if (last && sameUser && sameSchool) {
      last.actions.push({ id: item.id, action: item.action, comment: item.comment, createdAt: item.createdAt });
    } else {
      groups.push({
        key:        item.id,
        userName:   item.userName,
        role:       item.role,
        schoolId:   item.schoolId,
        schoolName: item.schoolName,
        actions:    [{ id: item.id, action: item.action, comment: item.comment, createdAt: item.createdAt }],
      });
    }
  }

  return groups;
}

const COLLAPSED_COUNT = 2;

interface Props {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: Props) {
  const navigate  = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const groups   = groupItems(items);
  const visible  = expanded ? groups : groups.slice(0, COLLAPSED_COUNT);
  const hasMore  = groups.length > COLLAPSED_COUNT;

  return (
    <div className="mobile-card flex flex-col">

      <div className="flex justify-between items-center mb-2.5">
        <p className="text-sm font-semibold text-content-primary">Активність команди</p>
        <span className="text-2xs text-content-muted">{formatDate(items[0]?.createdAt ?? new Date().toISOString())}</span>
      </div>

      {items.length === 0 ? (
        <motion.div variants={emptyStateVariants} initial="hidden" animate="visible" className="py-5 text-center text-content-muted text-sm">
          Сьогодні активності ще немає
        </motion.div>
      ) : (
        <>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-0.5">
            {visible.map((group) => {
              const avatarColor = ROLE_COLORS[group.role] ?? 'bg-neutral-100 text-neutral-600';
              const shownActions = group.actions.slice(-3);
              const hiddenCount  = group.actions.length - shownActions.length;
              const lastTime     = formatTime(group.actions[group.actions.length - 1].createdAt);

              return (
                <motion.div key={group.key} variants={staggerItem} className="flex items-start gap-2.5 py-2 px-2 -mx-1 rounded-control hover:bg-surface-muted/60 transition-colors">

                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-2xs font-semibold shrink-0 mt-0.5 ${avatarColor}`}>
                    {getInitials(group.userName)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-content-primary leading-tight">
                      {group.userName}
                      {group.schoolName && (
                        <>
                          {' · '}
                          <button
                            onClick={() => group.schoolId && navigate(`/schools/${group.schoolId}`)}
                            className="text-brand hover:underline font-medium active:scale-[0.97] transition-transform duration-fast"
                          >
                            {group.schoolName}
                          </button>
                        </>
                      )}
                    </p>

                    <div className="mt-0.5 flex flex-col gap-0.5">
                      {hiddenCount > 0 && (
                        <p className="text-2xs text-content-muted italic">+{hiddenCount} раніше</p>
                      )}
                      {shownActions.map((a) => (
                        <p key={a.id} className="text-2xs text-content-secondary leading-snug">
                          — {a.action.replace(/\.$/, '')}
                          {a.comment && (
                            <span className="text-content-muted italic"> «{a.comment}»</span>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>

                  <span className="text-2xs text-content-muted shrink-0 pt-0.5">{lastTime}</span>

                </motion.div>
              );
            })}
          </motion.div>

          {hasMore && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="mt-2.5 pt-2.5 border-t border-border text-2xs text-brand hover:underline text-center w-full active:scale-[0.97] transition-transform duration-fast"
            >
              {expanded
                ? '↑ Згорнути'
                : `↓ Показати ще ${groups.length - COLLAPSED_COUNT}`}
            </button>
          )}
        </>
      )}

    </div>
  );
}

```

# FILE: apps/frontend/src/components/dashboard/CitiesTable.tsx

```
import { useNavigate } from 'react-router-dom';

function fmt(n: unknown): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));
}

function plural(n: number, one: string, few: string, many: string): string {
  const mod10  = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

interface CityRow {
  cityId:       string;
  cityName:     string;
  schoolsCount: number;
  activeEvents: number;
  monthRevenue: number;
}

interface Props {
  rows: CityRow[];
}

export default function CitiesTable({ rows }: Props) {
  const navigate = useNavigate();

  const totals = rows.reduce(
    (acc, r) => {
      acc.schools  += r.schoolsCount;
      acc.events   += r.activeEvents;
      acc.revenue  += r.monthRevenue;
      return acc;
    },
    { schools: 0, events: 0, revenue: 0 },
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-purple-50 flex items-center justify-center">
            <span className="text-xs">🗺️</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">Стан по містах</p>
        </div>
        <button
          onClick={() => navigate('/cities')}
          className="text-xs text-blue-600 hover:underline active:scale-[0.97] transition-transform duration-fast"
        >
          Переглянути всі
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-left border-collapse min-w-[380px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-2 text-xs font-medium text-slate-400 pr-3">Місто</th>
              <th className="pb-2 text-xs font-medium text-slate-400 text-right pr-3">Шкіл</th>
              <th className="pb-2 text-xs font-medium text-slate-400 text-right pr-3">Активних подій</th>
              <th className="pb-2 text-xs font-medium text-slate-400 text-right">Виручка місяця</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.cityId}
                onClick={() => navigate(`/cities/${row.cityId}`)}
                className="border-b border-slate-50 cursor-pointer hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-2.5 pr-3">
                  <span className="text-sm font-medium text-slate-800">
                    {row.cityName}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-right">
                  <span className="text-sm text-slate-600">{row.schoolsCount}</span>
                </td>
                <td className="py-2.5 pr-3 text-right">
                  {row.activeEvents > 0 ? (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {row.activeEvents}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-300">—</span>
                  )}
                </td>
                <td className="py-2.5 text-right">
                  {row.monthRevenue > 0 ? (
                    <span className="text-sm font-semibold text-slate-800">
                      {fmt(row.monthRevenue)} грн
                    </span>
                  ) : (
                    <span className="text-sm text-slate-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          {/* Підсумок */}
          <tfoot>
            <tr className="border-t border-slate-200">
              <td className="pt-2.5 text-xs font-semibold text-slate-500">
                Усього
              </td>
              <td className="pt-2.5 text-right text-xs font-semibold text-slate-600">
                {totals.schools}
              </td>
              <td className="pt-2.5 text-right text-xs font-semibold text-slate-600">
                {totals.events}
              </td>
              <td className="pt-2.5 text-right text-xs font-semibold text-blue-700">
                {fmt(totals.revenue)} грн
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
        {rows.length} {plural(rows.length, 'місто', 'міста', 'міст')} · виручка за поточний місяць
      </p>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/dashboard/DashboardTopNav.tsx

```
import { motion } from "framer-motion";
import type { DashboardTab } from "../../constants/navTabs";
import { SPRING } from "../../lib/motion";

interface Props {
  tabs: DashboardTab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function DashboardTopNav({ tabs, activeTab, onChange }: Props) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="relative">
        <nav
          className="flex overflow-x-auto no-scrollbar gap-0.5 px-4 md:px-8"
          role="tablist"
          aria-label="Вкладки дашборду"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                role="tab"
                aria-selected={isActive}
                className={`relative flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors shrink-0 active:scale-90 ${
                  isActive
                    ? "text-brand"
                    : "text-content-muted hover:text-content-secondary"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="dashboard-active-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-pill"
                    transition={SPRING.stiff}
                  />
                )}
              </button>
            );
          })}
        </nav>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/dashboard/FunnelBar.tsx

```
import { useNavigate } from 'react-router-dom';

const PIPELINE_STAGES = [
  { key: 'BASE',           name: 'База',             icon: '🏫', color: 'text-slate-600',   bg: 'bg-slate-100',   bar: 'bg-slate-400'   },
  { key: 'FIRST_CONTACT',  name: 'Перший контакт',   icon: '📞', color: 'text-blue-700',    bg: 'bg-blue-50',     bar: 'bg-blue-500'    },
  { key: 'INTERESTED',     name: 'Зацікавлені',      icon: '⭐', color: 'text-amber-700',   bg: 'bg-amber-50',    bar: 'bg-amber-400'   },
  { key: 'DATE_CONFIRMED', name: 'Підтверджено дату',icon: '📅', color: 'text-purple-700',  bg: 'bg-purple-50',   bar: 'bg-purple-500'  },
  { key: 'PREPARATION',    name: 'Підготовка',       icon: '⚙️', color: 'text-orange-700',  bg: 'bg-orange-50',   bar: 'bg-orange-400'  },
  { key: 'DONE',           name: 'Проведено',        icon: '✅', color: 'text-emerald-700', bg: 'bg-emerald-50',  bar: 'bg-emerald-500' },
];

interface Props {
  funnel: Record<string, number>;
}

export default function FunnelBar({ funnel }: Props) {
  const navigate = useNavigate();

  const base  = funnel['BASE'] ?? 0;
  const done  = funnel['DONE'] ?? 0;
  const progress = base > 0 ? Math.round((done / base) * 100) : 0;

  const counts = PIPELINE_STAGES.map(s => funnel[s.key] ?? 0);
  const maxCount = Math.max(...counts, 1);

  return (
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
        Воронка роботи зі школами
      </p>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">

        {/* Прогрес по місту */}
        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-xs text-slate-500">Прогрес по місту</span>
            <span className="text-sm font-bold text-slate-800">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {done} з {base} шкіл дійшли до проведення події
          </p>
        </div>

        {/* Стадії */}
        <div className="flex flex-col gap-2">
          {PIPELINE_STAGES.map((stage) => {
            const count    = funnel[stage.key] ?? 0;
            const barWidth = Math.round((count / maxCount) * 100);

            return (
              <button
                key={stage.key}
                onClick={() => navigate('/schools')}
                className="flex items-center gap-3 group w-full text-left active:scale-[0.97] transition-transform duration-fast"
              >
                {/* Іконка */}
                <div className={`w-6 h-6 rounded-md ${stage.bg} flex items-center justify-center text-xs shrink-0`}>
                  {stage.icon}
                </div>

                {/* Назва */}
                <span className="text-xs text-slate-600 w-36 shrink-0 truncate group-hover:text-slate-900 transition-colors">
                  {stage.name}
                </span>

                {/* Бар */}
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${stage.bar}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                {/* Кількість */}
                <span className={`text-xs font-bold w-6 text-right shrink-0 ${stage.color}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
```

# FILE: apps/frontend/src/components/dashboard/MonthlyKpi.tsx

```
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cardHoverVariants, staggerContainer, staggerItem } from '../../lib/motion';

function fmt(n: unknown): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));
}

interface MonthlyKpi {
  revenue:  number;
  profit:   number;
  children: number;
  count:    number;
}

interface Props {
  kpi: MonthlyKpi;
}

const UA_MONTHS = [
  'січень','лютий','березень','квітень','травень','червень',
  'липень','серпень','вересень','жовтень','листопад','грудень',
];

export default function MonthlyKpi({ kpi }: Props) {
  const navigate = useNavigate();
  const now = new Date();
  const monthLabel = UA_MONTHS[now.getMonth()];
  const yearLabel  = now.getFullYear();

  const margin = kpi.revenue > 0
    ? Math.round((kpi.profit / kpi.revenue) * 100)
    : 0;

  const tiles = [
    {
      label: 'Виручка',
      value: `${fmt(kpi.revenue)} грн`,
      sub:   kpi.count > 0 ? `${kpi.count} ${kpi.count === 1 ? 'подія' : kpi.count < 5 ? 'події' : 'подій'}` : 'Подій ще немає',
      icon:  '💰',
      color: 'text-blue-700',
      bg:    'bg-blue-50',
    },
    {
      label: 'Прибуток',
      value: `${fmt(kpi.profit)} грн`,
      sub:   `Маржа ${margin}%`,
      icon:  '📈',
      color: 'text-emerald-700',
      bg:    'bg-emerald-50',
    },
    {
      label: 'Дітей охоплено',
      value: fmt(kpi.children),
      sub:   kpi.count > 0 && kpi.children > 0
        ? `~${Math.round(kpi.children / kpi.count)} на подію`
        : '—',
      icon:  '👦',
      color: 'text-purple-700',
      bg:    'bg-purple-50',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-slate-800">
          Фінанси —{' '}
          <span className="font-normal text-slate-500 capitalize">
            {monthLabel} {yearLabel}
          </span>
        </p>
        <button
          onClick={() => navigate('/finance')}
          className="text-xs text-blue-600 hover:underline shrink-0 active:scale-[0.97] transition-transform duration-fast"
        >
          Детальніше
        </button>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-3 gap-3">
        {tiles.map((tile) => (
          <motion.div
            key={tile.label}
            variants={staggerItem}
            whileHover="hover"
            initial="rest"
            className={`rounded-xl p-3 ${tile.bg}`}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-base">{tile.icon}</span>
              <span className={`text-xs font-medium ${tile.color}`}>
                {tile.label}
              </span>
            </div>
            <p className={`text-lg font-bold leading-none ${tile.color}`}>
              {tile.value}
            </p>
            <p className="text-xs text-slate-400 mt-1">{tile.sub}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/dashboard/StaleSchools.tsx

```
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, emptyStateVariants } from "../../lib/motion";

const STAGE_LABELS: Record<string, string> = {
  BASE: "База",
  FIRST_CONTACT: "Перший контакт",
  INTERESTED: "Зацікавлені",
  PRE_APPROVAL: "Попереднє погодження",
  DATE_CONFIRMED: "Підтвердження дати",
  PREPARATION: "Підготовка",
  IN_PROGRESS: "Подія в роботі",
};

interface Tier {
  label: string;
  emoji: string;
  min: number;
  max: number;
  dot: string;
  badge: string;
  bar: string;
  row: string;
}

const TIERS: Tier[] = [
  {
    label: "Критично",
    emoji: "🔴",
    min: 21,
    max: Infinity,
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700 border border-red-200",
    bar: "bg-red-500",
    row: "hover:bg-red-50/40",
  },
  {
    label: "Небезпечно",
    emoji: "🟠",
    min: 14,
    max: 20,
    dot: "bg-orange-400",
    badge: "bg-orange-100 text-orange-700 border border-orange-200",
    bar: "bg-orange-400",
    row: "hover:bg-orange-50/40",
  },
  {
    label: "Увага",
    emoji: "🟡",
    min: 7,
    max: 13,
    dot: "bg-amber-400",
    badge: "bg-amber-100 text-amber-700 border border-amber-200",
    bar: "bg-amber-400",
    row: "hover:bg-amber-50/30",
  },
];

function getTier(days: number): Tier {
  return TIERS.find((t) => days >= t.min && days <= t.max) ?? TIERS[2];
}

function barWidth(days: number): number {
  return Math.min(100, Math.round((days / 30) * 100));
}

interface StaleSchool {
  id: string;
  name: string;
  status: string | null;
  daysStale: number | null;
}

interface Props {
  schools: StaleSchool[];
}

export default function StaleSchools({ schools }: Props) {
  const navigate = useNavigate();

  const sorted = [...schools].sort(
    (a, b) => (b.daysStale ?? 0) - (a.daysStale ?? 0),
  );

  const criticalCount = schools.filter((s) => (s.daysStale ?? 0) >= 21).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
      {/* Хедер */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center">
            <span className="text-xs">⚠️</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            Потребують уваги
          </p>
          {criticalCount > 0 && (
            <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white leading-none">
              {criticalCount}
            </span>
          )}
        </div>
        <button
          onClick={() => navigate("/schools")}
          className="text-xs text-blue-600 hover:underline shrink-0 active:scale-[0.97] transition-transform duration-fast"
        >
          Переглянути всі
        </button>
      </div>

      {schools.length === 0 ? (
        <motion.div variants={emptyStateVariants} initial="hidden" animate="visible" className="py-6 text-center">
          <p className="text-2xl mb-1">✅</p>
          <p className="text-sm text-slate-400">Усі школи активні</p>
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-1">
          {sorted.map((school) => {
            const days = school.daysStale ?? 0;
            const tier = getTier(days);
            const stageLabel = school.status
              ? (STAGE_LABELS[school.status] ?? school.status)
              : "—";
            const width = barWidth(days);

            return (
              <motion.div
                key={school.id}
                variants={staggerItem}
                onClick={() => navigate(`/schools/${school.id}`)}
                className={`group relative flex items-center gap-3 py-2.5 px-2 -mx-1 rounded-xl cursor-pointer transition-colors ${tier.row}`}
              >
                {/* Кольорова крапка-індикатор */}
                <div className={`w-2 h-2 rounded-full shrink-0 ${tier.dot}`} />

                {/* Назва + стадія + прогрес-бар */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 truncate leading-tight">
                    {school.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 mb-1.5">
                    {stageLabel}
                  </p>

                  {/* Heat bar */}
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${tier.bar}`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>

                {/* Badge з днями */}
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${tier.badge}`}
                >
                  {days} дн
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Футер — легенда тирів */}
      {schools.length > 0 && (
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-50">
          {TIERS.map((t) => {
            const count = schools.filter(
              (s) => (s.daysStale ?? 0) >= t.min && (s.daysStale ?? 0) <= t.max,
            ).length;
            if (count === 0) return null;
            return (
              <span
                key={t.label}
                className="flex items-center gap-1 text-xs text-slate-400"
              >
                {t.emoji}{" "}
                <span className="font-medium text-slate-600">{count}</span>{" "}
                {t.label.toLowerCase()}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/components/dashboard/TabErrorBoundary.tsx

```
import { Component, type ReactNode } from "react";
import * as Sentry from "@sentry/react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
}

interface State {
  hasError: boolean;
}

export default class TabErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromProps(nextProps: Props, prevState: State): State | null {
    if (prevState.hasError) {
      return { hasError: false };
    }
    return null;
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    Sentry.captureException(error, {
      extra: { componentStack: info.componentStack, tab: this.props.label },
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <span className="text-3xl mb-3 opacity-50">⚠️</span>
            <p className="text-sm font-medium">
              Не вдалося завантажити вкладку{this.props.label ? ` «${this.props.label}»` : ""}
            </p>
            <p className="text-xs mt-1">Спробуйте оновити сторінку</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

```

# FILE: apps/frontend/src/components/dashboard/TodayEvents.tsx

```
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, emptyStateVariants } from "../../lib/motion";

interface CrewMember {
  id: string;
  name: string;
}

interface Crew {
  id: string;
  name?: string;
  host?: CrewMember | null;
  driver?: CrewMember | null;
}

interface School {
  id: string;
  name: string;
}

interface TodayEvent {
  id: string;
  time?: string | null;
  project: string;
  school?: School | null;
  crew?: Crew | null;
}

interface Props {
  events: TodayEvent[];
}

function plural(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return "подія";
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
    return "події";
  return "подій";
}

export default function TodayEvents({ events }: Props) {
  const navigate = useNavigate();

  const dateLabel = new Date().toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  return (
    <div className="mobile-card flex flex-col">
      <div className="flex justify-between items-start mb-2.5">
        <div>
          <p className="text-sm font-semibold text-content-primary">
            Сьогоднішні події
          </p>
          <p className="text-2xs text-content-muted mt-0.5 capitalize">
            {dateLabel}
          </p>
        </div>
        <button
          onClick={() => navigate("/calendar")}
          className="text-2xs text-brand hover:underline shrink-0 active:scale-[0.97] transition-transform duration-fast"
        >
          Календар
        </button>
      </div>

      {events.length === 0 ? (
        <motion.div variants={emptyStateVariants} initial="hidden" animate="visible" className="py-5 text-center text-content-muted text-sm">
          Сьогодні подій немає
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-1.5">
          {events.map((ev) => {
            const hasCrew = !!ev.crew;
            const crewLabel = ev.crew?.name ?? ev.crew?.host?.name ?? null;

            return (
              <motion.div
                key={ev.id}
                variants={staggerItem}
                className={`rounded-control border p-3 flex flex-col gap-2 ${
                  hasCrew
                    ? "border-border bg-surface"
                    : "border-warning/30 bg-warning-subtle"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-content-primary tabular-nums shrink-0">
                    {ev.time ?? "—:——"}
                  </span>
                  <span className="text-2xs text-content-muted truncate">
                    {ev.project}
                  </span>
                </div>

                <p className="text-sm font-semibold text-content-primary leading-snug line-clamp-2">
                  {ev.school?.name ?? "—"}
                </p>

                <div className="flex items-center justify-between gap-2">
                  {hasCrew ? (
                    <span className="badge-success text-2xs px-2 py-0.5 rounded-pill font-medium shrink-0">
                      {crewLabel ?? "Екіпаж призначено"}
                    </span>
                  ) : (
                    <span className="badge-warning text-2xs px-2 py-0.5 rounded-pill font-medium shrink-0">
                      Немає екіпажу
                    </span>
                  )}

                  <button
                    onClick={() =>
                      ev.school && navigate(`/schools/${ev.school.id}`)
                    }
                    className={`text-2xs font-semibold px-2.5 py-1 rounded-control transition-colors shrink-0 active:scale-95 ${
                      hasCrew
                        ? "bg-surface-muted text-content-secondary hover:bg-border-strong"
                        : "bg-surface border border-warning text-warning-600 hover:bg-warning-subtle"
                    }`}
                  >
                    {hasCrew ? "Відкрити →" : "Призначити →"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      <p className="text-2xs text-content-muted mt-2.5 pt-2.5 border-t border-border">
        Усього на сьогодні: {events.length} {plural(events.length)}
      </p>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/dashboard/UpcomingEvents.tsx

```
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, emptyStateVariants } from '../../lib/motion';

const UA_WEEKDAYS = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const UA_MONTHS_SHORT = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = UA_MONTHS_SHORT[d.getMonth()];
  const weekday = UA_WEEKDAYS[d.getDay()];
  return `${day} ${month}, ${weekday}`;
}

interface Crew {
  id: string;
  name?: string;
  host?: { id: string; name: string } | null;
}

interface UpcomingEvent {
  id: string;
  date: string;
  time?: string | null;
  project: string;
  school?: { id: string; name: string } | null;
  city?: { id: string; name: string } | null;
  crew?: Crew | null;
}

interface Props {
  events: UpcomingEvent[];
}

export default function UpcomingEvents({ events }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-slate-800">Найближчі події (5 днів)</p>
        <button
          onClick={() => navigate('/calendar')}
          className="text-xs text-blue-600 hover:underline shrink-0 active:scale-[0.97] transition-transform duration-fast"
        >
          Перейти до календаря
        </button>
      </div>

      {events.length === 0 ? (
        <motion.div variants={emptyStateVariants} initial="hidden" animate="visible" className="py-6 text-center text-slate-400 text-sm">
          Найближчими днями подій немає
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col divide-y divide-slate-50">
          {events.map((ev) => {
            const crewName = ev.crew?.name ?? (ev.crew?.host?.name ?? null);

            return (
              <motion.div
                key={ev.id}
                variants={staggerItem}
                onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
                className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-slate-50/60 rounded-lg px-1 -mx-1 transition-colors active:scale-[0.97]"
              >
                <div className="shrink-0 text-right w-24">
                  <p className="text-xs font-medium text-slate-600">
                    {formatDate(ev.date)}
                  </p>
                  <p className="text-xs text-slate-400">{ev.time ?? '—:——'}</p>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {ev.school?.name ?? '—'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{ev.project}</p>
                </div>

                {crewName && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
                    {crewName}
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/components/employees/EmployeeCard.tsx

```
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Eye, Edit3, UserX } from "lucide-react";
import { Badge } from "../ui/Badge";
import { cardVariants } from "../../animations/employees";

type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";

interface City {
  id: string;
  name: string;
}
interface EmployeeCardUser {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  cityId: string | null;
  city?: City;
  role: Role;
  telegramId?: string | null;
  car?: string | null;
}

const ROLE_BADGE: Record<string, string> = {
  MANAGER: "bg-brand-50 text-brand-700 border-brand-200",
  DRIVER: "bg-success-50 text-success-700 border-success-200",
  HOST: "bg-purple-50 text-purple-700 border-purple-200",
};

const ROLE_GRADIENT: Record<string, string> = {
  MANAGER: "from-brand to-brand-700",
  DRIVER: "from-success to-success-700",
  HOST: "from-purple-500 to-purple-700",
};

const ROLE_LABELS: Record<string, string> = {
  MANAGER: "Менеджер",
  DRIVER: "Водій",
  HOST: "Ведучий",
  SUPERADMIN: "Суперадмін",
};

interface Props {
  user: EmployeeCardUser;
  role: Role;
  isSuperAdmin: boolean;
  onEdit: (user: EmployeeCardUser) => void;
  onDelete: (id: string, name: string) => void;
}

export default function EmployeeCard({
  user,
  role,
  isSuperAdmin,
  onEdit,
  onDelete,
}: Props) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      layoutId={`user-${user.id}`}
      role="article"
      aria-label={`${user.name}, ${ROLE_LABELS[role] ?? role}`}
      className="group relative bg-surface rounded-card shadow-card border border-border p-5 transition-shadow duration-200 hover:shadow-card-hover"
    >
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br ${ROLE_GRADIENT[role] ?? "from-neutral-500 to-neutral-600"}`}
          >
            {user.name.charAt(0)}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-surface" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-content-primary truncate text-sm">
              {user.name}
            </h3>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${ROLE_BADGE[role] ?? "bg-neutral-100 text-neutral-600 border-neutral-200"}`}>
              {ROLE_LABELS[role] ?? role}
            </span>
          </div>

          <p className="text-xs text-content-muted truncate">{user.email}</p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-xs text-content-secondary flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {user.phone || "—"}
            </span>
            <span className="text-xs text-content-secondary flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {user.city?.name || "Всі міста"}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-3 text-2xs text-content-muted">
            {user.car && <span>🚗 {user.car}</span>}
          </div>
        </div>

        {isSuperAdmin && (
          <div className="flex items-center gap-0.5 shrink-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(user)}
              className="p-1.5 rounded-control text-content-muted hover:text-brand hover:bg-brand-50 transition-colors"
              aria-label={`Редагувати ${user.name}`}
            >
              <Edit3 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(user.id, user.name)}
              className="p-1.5 rounded-control text-content-muted hover:text-danger hover:bg-danger-50 transition-colors"
              aria-label={`Видалити ${user.name}`}
            >
              <UserX className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/components/employees/EmployeesHeader.tsx

```
import { Search, List, LayoutGrid, Download, Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/Button";

type ViewMode = "cards" | "table";

interface EmployeesHeaderProps {
  isSuperAdmin: boolean;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddUser: () => void;
  onToggleFilter: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExport?: () => void;
}

export function EmployeesHeader({
  isSuperAdmin,
  viewMode,
  onViewModeChange,
  onAddUser,
  onToggleFilter,
  searchQuery,
  onSearchChange,
  onExport,
}: EmployeesHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-content-primary">Працівники</h1>
          <p className="text-sm text-content-muted mt-0.5">
            Керування доступами, ролями та проєктами
          </p>
        </div>
        {isSuperAdmin && (
          <Button onClick={onAddUser} size="md">
            <Plus className="w-4 h-4 mr-1.5" />
            Створити користувача
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted pointer-events-none" />
          <input
            type="search"
            inputMode="search"
            enterKeyHint="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Пошук за ім'ям, email, телефоном..."
            aria-label="Пошук працівників"
            className="w-full pl-9 pr-3 py-2.5 md:py-2 rounded-control border border-border-strong bg-surface
              text-base text-content-primary placeholder:text-content-muted
              focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand"
          />
        </div>

        <button
          onClick={onToggleFilter}
          className="lg:hidden p-2 rounded-control text-content-muted hover:text-content-primary hover:bg-neutral-100 transition-colors"
          aria-label="Фільтри"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>

        <div role="tablist" aria-label="Режим перегляду" className="flex items-center border border-border-strong rounded-control overflow-hidden">
          <button
            role="tab"
            aria-selected={viewMode === "cards"}
            onClick={() => onViewModeChange("cards")}
            className={`p-2 transition-colors ${viewMode === "cards" ? "bg-brand text-white" : "text-content-muted hover:bg-neutral-100"}`}
            aria-label="Картки"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            role="tab"
            aria-selected={viewMode === "table"}
            onClick={() => onViewModeChange("table")}
            className={`p-2 transition-colors ${viewMode === "table" ? "bg-brand text-white" : "text-content-muted hover:bg-neutral-100"}`}
            aria-label="Таблиця"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onExport}
          className="p-2 rounded-control text-content-muted hover:text-content-primary hover:bg-neutral-100 transition-colors"
          aria-label="Експорт CSV"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/employees/EmployeesTable.tsx

```
import { useRef, useMemo, useState, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronUp, ChevronDown, ChevronsUpDown, Eye } from "lucide-react";
import { Badge } from "../ui/Badge";
import type { User } from "../../types";

type SortField = "name" | "role" | "city" | "email";
type SortDir = "asc" | "desc";

interface EmployeesTableProps {
  users: User[];
  onSelect?: (user: User) => void;
}

const ROLE_LABELS: Record<string, string> = {
  MANAGER: "Менеджер",
  DRIVER: "Водій",
  HOST: "Ведучий",
  SUPERADMIN: "Суперадмін",
};

const ROLE_STATUS: Record<string, "info" | "success" | "warning" | "default"> = {
  MANAGER: "info",
  DRIVER: "success",
  HOST: "warning",
  SUPERADMIN: "default",
};

export default function EmployeesTable({ users, onSelect }: EmployeesTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const parentRef = useRef<HTMLDivElement>(null);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "role": cmp = (ROLE_LABELS[a.role] ?? a.role).localeCompare(ROLE_LABELS[b.role] ?? b.role); break;
        case "city": cmp = (a.city?.name ?? "").localeCompare(b.city?.name ?? ""); break;
        case "email": cmp = a.email.localeCompare(b.email); break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [users, sortField, sortDir]);

  const rowVirtualizer = useVirtualizer({
    count: sortedUsers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  const allSelected = sortedUsers.length > 0 && selectedIds.size === sortedUsers.length;

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedUsers.map((u) => u.id)));
    }
  }, [allSelected, sortedUsers]);

  const toggleOne = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronsUpDown className="w-3.5 h-3.5 text-neutral-300" />;
    return sortDir === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />;
  };

  const colWidths = "grid-cols-[40px_minmax(180px,2fr)_100px_minmax(140px,1.5fr)_minmax(120px,1fr)_48px]";

  return (
    <div>
      {selectedIds.size > 0 && (
        <div role="toolbar" aria-label="Масові дії" className="mb-3 flex items-center gap-2 px-4 py-2.5 bg-brand-50 border border-brand-200 rounded-control">
          <span className="text-sm font-medium text-brand-700">
            Обрано {selectedIds.size}
          </span>
          <div className="ml-auto flex gap-2">
            <button className="text-xs font-semibold px-3 py-1.5 rounded-control bg-white border border-brand-200 text-brand-700 hover:bg-brand-100 focus-visible:ring-2 focus-visible:ring-brand/50 transition-colors">
              Архівувати
            </button>
            <button className="text-xs font-semibold px-3 py-1.5 rounded-control bg-white border border-brand-200 text-brand-700 hover:bg-brand-100 focus-visible:ring-2 focus-visible:ring-brand/50 transition-colors">
              Змінити роль
            </button>
            <button className="text-xs font-semibold px-3 py-1.5 rounded-control bg-white border border-brand-200 text-brand-700 hover:bg-brand-100 focus-visible:ring-2 focus-visible:ring-brand/50 transition-colors">
              Призначити проєкт
            </button>
          </div>
        </div>
      )}

      <div role="region" aria-label="Таблиця працівників" className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <div role="row" className={`${colWidths} items-center px-4 py-3 bg-neutral-50 border-b border-border text-xs font-semibold text-content-muted uppercase tracking-wider`}>
          <div className="flex items-center" role="columnheader">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              aria-label={allSelected ? "Зняти виділення всіх" : "Виділити всіх"}
              className="w-4 h-4 rounded border-neutral-300 text-brand focus-visible:ring-2 focus-visible:ring-brand/50"
            />
          </div>
          <button role="columnheader" aria-sort={sortField === "name" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-content-primary transition-colors focus-visible:ring-2 focus-visible:ring-brand/50 rounded">
            Ім'я <SortIcon field="name" />
          </button>
          <button role="columnheader" aria-sort={sortField === "role" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} onClick={() => toggleSort("role")} className="flex items-center gap-1 hover:text-content-primary transition-colors focus-visible:ring-2 focus-visible:ring-brand/50 rounded">
            Роль <SortIcon field="role" />
          </button>
          <button role="columnheader" aria-sort={sortField === "city" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} onClick={() => toggleSort("city")} className="flex items-center gap-1 hover:text-content-primary transition-colors focus-visible:ring-2 focus-visible:ring-brand/50 rounded">
            Місто <SortIcon field="city" />
          </button>
          <button role="columnheader" aria-sort={sortField === "email" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} onClick={() => toggleSort("email")} className="flex items-center gap-1 hover:text-content-primary transition-colors focus-visible:ring-2 focus-visible:ring-brand/50 rounded">
            Контакт <SortIcon field="email" />
          </button>
          <div />
        </div>

        <div ref={parentRef} className="overflow-auto" style={{ maxHeight: "calc(100vh - 320px)" }}>
          <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: "relative" }}>
            {virtualItems.map((virtualRow) => {
              const user = sortedUsers[virtualRow.index];
              const isSelected = selectedIds.has(user.id);
              return (
                <div
                  key={user.id}
                  role="row"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(user); } }}
                  className={`${colWidths} items-center px-4 py-0 border-b border-border text-sm cursor-pointer transition-colors
                    ${virtualRow.index % 2 === 1 ? "bg-neutral-50/50" : "bg-white"}
                    ${isSelected ? "bg-brand-50/40" : "hover:bg-neutral-50 focus-visible:bg-neutral-50"}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onClick={() => onSelect?.(user)}
                >
                  <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(user.id)}
                      aria-label={`Обрати ${user.name}`}
                      className="w-4 h-4 rounded border-neutral-300 text-brand focus-visible:ring-2 focus-visible:ring-brand/50"
                    />
                  </div>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br
                      ${user.role === "MANAGER" ? "from-brand to-brand-700" : ""}
                      ${user.role === "DRIVER" ? "from-success to-success-700" : ""}
                      ${user.role === "HOST" ? "from-purple-500 to-purple-700" : ""}
                      ${!["MANAGER", "DRIVER", "HOST"].includes(user.role) ? "from-neutral-500 to-neutral-600" : ""}`}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-content-primary truncate">{user.name}</span>
                  </div>
                  <div>
                    <Badge variant={ROLE_STATUS[user.role] ?? "default"} size="sm">
                      {ROLE_LABELS[user.role] ?? user.role}
                    </Badge>
                  </div>
                  <div className="text-content-secondary truncate text-xs">
                    {user.city?.name || "—"}
                  </div>
                  <div className="text-content-secondary truncate text-xs">
                    {user.email}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelect?.(user); }}
                      className="p-1.5 rounded-control text-content-muted hover:text-brand hover:bg-brand-50 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label={`Переглянути ${user.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/employees/FilterPanel.tsx

```
import { motion, AnimatePresence } from "framer-motion";
import { fadeVariants, SPRING } from "../../lib/motion";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const ROLE_OPTIONS = [
  { value: "MANAGER", label: "Менеджер" },
  { value: "DRIVER", label: "Водій" },
  { value: "HOST", label: "Ведучий" },
  { value: "SUPERADMIN", label: "Суперадмін" },
];

interface FilterPanelProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  selectedRoles: string[];
  onRolesChange: (roles: string[]) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  cityOptions: { value: string; label: string }[];
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function FilterPanel({
  isMobileOpen,
  onMobileClose,
  selectedRoles,
  onRolesChange,
  selectedCity,
  onCityChange,
  cityOptions,
  onReset,
  hasActiveFilters,
}: FilterPanelProps) {
  const toggleRole = (role: string) => {
    onRolesChange(
      selectedRoles.includes(role)
        ? selectedRoles.filter((r) => r !== role)
        : [...selectedRoles, role],
    );
  };

  const content = (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xs font-semibold text-content-muted uppercase tracking-wider mb-3">
          Роль
        </h3>
        <div className="flex flex-col gap-1.5">
          {ROLE_OPTIONS.map((role) => (
            <button
              key={role.value}
              role="checkbox"
              aria-checked={selectedRoles.includes(role.value)}
              onClick={() => toggleRole(role.value)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-control text-sm font-medium transition-colors text-left
                ${selectedRoles.includes(role.value) ? "bg-brand-50 text-brand-700" : "text-content-secondary hover:bg-neutral-50"}`}
            >
              <span
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                  ${selectedRoles.includes(role.value) ? "bg-brand border-brand" : "border-neutral-300"}`}
              >
                {selectedRoles.includes(role.value) && (
                  <span className="w-2 h-2 rounded-sm bg-white" />
                )}
              </span>
              {role.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-content-muted uppercase tracking-wider mb-3">
          Місто
        </h3>
        <div className="flex flex-col gap-1.5">
          {cityOptions.map((city) => (
            <button
              key={city.value}
              role="radio"
              aria-checked={selectedCity === city.value}
              onClick={() => onCityChange(city.value)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-control text-sm font-medium transition-colors text-left
                ${selectedCity === city.value ? "bg-brand-50 text-brand-700" : "text-content-secondary hover:bg-neutral-50"}`}
            >
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                  ${selectedCity === city.value ? "border-brand" : "border-neutral-300"}`}
              >
                {selectedCity === city.value && (
                  <span className="w-2 h-2 rounded-full bg-brand" />
                )}
              </span>
              {city.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-content-muted uppercase tracking-wider mb-3">
          Статус
        </h3>
        <div className="flex gap-2">
          <Badge variant="success">Активний</Badge>
          <Badge variant="danger">Неактивний</Badge>
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          Скинути фільтри
        </Button>
      )}
    </div>
  );

  return (
    <>
      <div role="region" aria-label="Фільтри" className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-4">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-4 h-4 text-content-muted" />
            <span className="text-sm font-semibold text-content-primary">Фільтри</span>
          </div>
          {content}
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
            onClick={onMobileClose}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Фільтри"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ...SPRING.gentle }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-72 bg-surface shadow-modal p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-content-muted" />
                  <span className="text-sm font-semibold text-content-primary">Фільтри</span>
                </div>
                <button onClick={onMobileClose} className="p-1 -mr-1 text-content-muted hover:text-content-primary active:scale-90 transition-transform duration-fast">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

```

# FILE: apps/frontend/src/components/employees/ProjectModal.tsx

```
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  backdropVariants,
  modalContentVariants,
  formVariants,
  fieldVariants,
} from "../../animations/employees";

const PROJECT_COLORS: Record<string, string> = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
};

interface ProjectForm {
  name: string;
  color: string;
  pricePerChild: string;
}

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  form: ProjectForm;
  setForm: (form: ProjectForm) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ProjectModal({
  isOpen,
  isEditing,
  form,
  setForm,
  onClose,
  onSubmit,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">
                {isEditing ? "Редагувати вид події" : "Новий вид події"}
              </h3>
              <button
                onClick={onClose}
                className="text-slate-400 text-xl leading-none p-2 -mr-2 active:scale-90 transition-transform duration-fast"
              >
                ✕
              </button>
            </div>
            <motion.form
              onSubmit={onSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="p-6"
            >
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Назва
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
                  required
                  placeholder="Наприклад: Шоу мильних бульбашок"
                />
              </motion.div>
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Ціна за дитину, грн
                </label>
                <input
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={form.pricePerChild}
                  onChange={(e) =>
                    setForm({ ...form, pricePerChild: e.target.value })
                  }
                  placeholder="Наприклад: 150"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
                />
              </motion.div>
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Колір для календаря
                </label>
                <div className="flex gap-4 mb-8">
                  {Object.keys(PROJECT_COLORS).map((c) => (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className={`w-8 h-8 rounded-full ${PROJECT_COLORS[c]} transition-all ${form.color === c ? "ring-4 ring-offset-2 ring-blue-200 scale-110" : "hover:scale-110"}`}
                    />
                  ))}
                </div>
              </motion.div>
              <motion.div variants={fieldVariants} className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-slate-100 py-3 rounded-xl font-medium active:scale-[0.97] transition-transform duration-fast"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium active:scale-[0.97] transition-transform duration-fast"
                >
                  Зберегти
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/employees/UserModal.tsx

```
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  backdropVariants,
  modalContentVariants,
  formVariants,
  shakeVariants,
  checkmarkVariants,
} from "../../animations/employees";

type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";
interface City { id: string; name: string }

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  initialValues: {
    fullName: string; phone: string; email: string; cityId: string;
    role: Role; password: string; telegramId: string; car: string;
  };
  cities: City[];
  formError: string;
  isSubmitting: boolean;
  showSuccess: boolean;
  onClose: () => void;
  onSave: (values: Record<string, string>) => void;
}

const PHONE_REGEX = /^(\+?380\d{9}|0\d{9}|\d{10,13})$/;

const validationSchema = Yup.object({
  fullName: Yup.string().required("ПІБ обов'язкове"),
  email: Yup.string().email("Невірний формат email").required("Email обов'язковий"),
  phone: Yup.string().matches(PHONE_REGEX, "Невірний формат телефону (+380...)"),
  password: Yup.string().min(6, "Мінімум 6 символів"),
  telegramId: Yup.string(),
  car: Yup.string(),
  cityId: Yup.string(),
  role: Yup.string().required(),
});

export default function UserModal({
  isOpen,
  isEditing,
  initialValues,
  cities,
  formError,
  isSubmitting,
  showSuccess,
  onClose,
  onSave,
}: Props) {
  const formik = useFormik({
    initialValues: {
      fullName: initialValues.fullName,
      phone: initialValues.phone ?? "",
      email: initialValues.email,
      cityId: initialValues.cityId ?? "",
      role: initialValues.role as string,
      password: initialValues.password ?? "",
      telegramId: initialValues.telegramId ?? "",
      car: initialValues.car ?? "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-xl w-full sm:max-w-lg overflow-hidden flex flex-col"
          >
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center gap-3"
                >
                  <motion.div
                    variants={checkmarkVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white text-3xl"
                  >
                    ✓
                  </motion.div>
                  <p className="text-slate-600 font-medium">Збережено</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold">
                {isEditing ? "Редагувати" : "Новий користувач"}
              </h3>
              <button onClick={onClose} className="text-slate-400 text-xl p-2 -mr-2 active:scale-90 transition-transform duration-fast">
                ✕
              </button>
            </div>

            <motion.form
              onSubmit={formik.handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]"
            >
              <AnimatePresence>
                {formError && (
                  <motion.div
                    key={formError}
                    variants={shakeVariants}
                    animate="shake"
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-red-50 text-red-600 text-sm rounded-lg"
                  >
                    {formError}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="ПІБ"
                  className="w-full p-2.5 border rounded-lg text-base"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{formik.errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Пошта"
                    className="w-full p-2.5 border rounded-lg text-base"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Пароль"
                    className="w-full p-2.5 border rounded-lg text-base"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Телефон (+380...)"
                    className="w-full p-2.5 border rounded-lg text-base"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.phone}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="telegramId"
                    value={formik.values.telegramId}
                    onChange={formik.handleChange}
                    placeholder="Telegram ID або @username"
                    className="w-full p-2.5 border rounded-lg text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    className="w-full p-2.5 border rounded-lg text-base"
                  >
                    <option value="MANAGER">Менеджер</option>
                    <option value="DRIVER">Водій</option>
                    <option value="HOST">Ведучий</option>
                    <option value="SUPERADMIN">Суперадмін</option>
                  </select>
                </div>
                <div>
                  <select
                    name="cityId"
                    value={formik.values.cityId}
                    onChange={formik.handleChange}
                    className="w-full p-2.5 border rounded-lg text-base"
                  >
                    <option value="">Всі міста</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formik.values.role === "DRIVER" && (
                <div>
                  <input
                    type="text"
                    name="car"
                    value={formik.values.car ?? ""}
                    onChange={formik.handleChange}
                    placeholder="Автомобіль (напр. Renault Trafic)"
                    className="w-full p-2.5 border rounded-lg text-base"
                  />
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 bg-slate-100 py-3 rounded-xl font-medium disabled:opacity-50 active:scale-[0.97] transition-transform duration-fast"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium disabled:opacity-60 active:scale-[0.97] transition-transform duration-fast"
                >
                  {isSubmitting ? "Збереження..." : "Зберегти"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

