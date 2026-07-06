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
const IN_PROGRESS_STAGES = ['PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT'];

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
    [key: string]: unknown;
  }) {
    const {
      city_id,
      city_name,
      latestStatus,
      isPlanned,
      isInProgress,
      isDone,
      ...school
    } = row;
    const categories: ('planned' | 'inProgress' | 'done')[] = [];
    if (isPlanned) categories.push('planned');
    if (isInProgress) categories.push('inProgress');
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
        EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(PLANNED_STAGES)})
        ) as "isPlanned",
        EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})
        ) as "isInProgress",
        EXISTS (
          SELECT 1 FROM "Event" e
          WHERE e."schoolId" = s.id AND e.status::text = 'RE_SALE'
        ) as "isDone"
      ${baseFrom}
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
        { new: bigint; planned: bigint; inProgress: bigint; done: bigint }[]
      >(Prisma.sql`
        SELECT
          COUNT(*) FILTER (
            WHERE NOT EXISTS (
              SELECT 1 FROM "Event" e
              WHERE e."schoolId" = s.id AND e.status::text NOT IN ('INTERESTED','PRE_APPROVAL')
            )
          )::bigint as new,
          COUNT(*) FILTER (
            WHERE EXISTS (
              SELECT 1 FROM "Event" e
              WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(PLANNED_STAGES)})
            )
          )::bigint as planned,
          COUNT(*) FILTER (
            WHERE EXISTS (
              SELECT 1 FROM "Event" e
              WHERE e."schoolId" = s.id AND e.status::text IN (${Prisma.join(IN_PROGRESS_STAGES)})
            )
          )::bigint as "inProgress",
          COUNT(*) FILTER (
            WHERE EXISTS (
              SELECT 1 FROM "Event" e
              WHERE e."schoolId" = s.id AND e.status::text = 'RE_SALE'
            )
          )::bigint as done
        FROM "School" s
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
          done: Number(statusRows[0].done),
        }
      : { new: 0, planned: 0, inProgress: 0, done: 0 };

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
    const mockBot = {
      sendMessage: jest.fn().mockRejectedValue(new Error('Telegram API error')),
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

  async sendMessage(chatId: string, text: string): Promise<void> {
    if (!this.bot) return;
    try {
      await this.bot.sendMessage(chatId, text, { parse_mode: 'HTML' });
    } catch (e: any) {
      this.logger.error(
        `Не вдалося надіслати повідомлення ${chatId}: ${e.message}`,
      );
    }
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
import { AppModule } from '../src/app.module';

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
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    env_file:
      - apps/backend/.env
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  redis_data:
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

# FILE: apps/frontend/index.html

```


<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="CRM система для управління подіями, школами та фінансами">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>CRM</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>


```

# FILE: apps/frontend/lighthouserc.cjs

```
module.exports = {
  ci: {
    collect: {
      url: [
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/cities",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/schools",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/events",
        "https://crm-frontend-cfwr3tsoi-shmaltsels-projects.vercel.app/finance",
      ],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        formFactor: "desktop",
        throttlingMethod: "devtools",     
        screenEmulation: { disabled: true },
        chromeFlags: "--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage",
      },
      skipAudits: ["redirects-http"],
    },

    upload: {
      target: "temporary-public-storage",
    },

    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["error", { minScore: 0.70 }],
        "categories:accessibility": ["warn", { minScore: 0.85 }],
        "categories:seo": ["warn", { minScore: 0.80 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 3500 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.25 }],
        "total-blocking-time": ["warn", { maxNumericValue: 600 }],
        "speed-index": ["warn", { maxNumericValue: 3500 }],
      }
    },

    options: {
      output: ["html", "json"],
      onlyCategories: ["performance", "accessibility", "seo", "best-practices"],
    }
  }
};
```

# FILE: apps/frontend/package.json

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
    "@tanstack/react-query": "^5.101.0",
    "@tanstack/react-virtual": "^3.14.3",
    "axios": "^1.18.0",
    "framer-motion": "^12.41.0",
    "jwt-decode": "^4.0.0",
    "lucide-react": "^1.20.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-hook-form": "^7.79.0",
    "react-router-dom": "^7.18.0",
    "recharts": "^3.8.1",
    "zod": "^4.4.3",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@lhci/cli": "^0.15.1",
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

