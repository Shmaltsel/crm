### `apps/frontend/src/components/schools/VirtualDesktopTable.tsx`

```typescript
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SchoolRow } from "./SchoolDesktopTable";
import type { School, PipelineStage } from "../../types";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  onEndReached?: () => void;
}

export default function VirtualDesktopTable({
  schools,
  searchQuery,
  onDelete,
  stages,
  onEndReached,
}: Props) {
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: schools.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 57,
    overscan: 8,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!onEndReached || !lastItem) return;
    if (lastItem.index >= schools.length - 5) {
      onEndReached();
    }
  }, [lastItem?.index, schools.length, onEndReached]);

  return (
    <div ref={parentRef} className="overflow-y-auto flex-1 h-full">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 z-10 bg-slate-50">
          <tr className="border-b border-slate-100">
            <th className="p-4 font-medium text-slate-600">Назва школи</th>
            <th className="p-4 font-medium text-slate-600">Місто</th>
            <th className="p-4 font-medium text-slate-600">Статус</th>
            <th className="p-4 font-medium text-slate-600">Поточний етап</th>
            <th className="p-4 font-medium text-slate-600 text-center">Дія</th>
          </tr>
        </thead>
        <tbody>
          {virtualItems.map((virtualRow) => (
            <tr
              style={{
                height: `${rowVirtualizer.getTotalSize() - virtualItems.reduce((s, r) => s + r.size, 0)}px`,
              }}
            >
              <SchoolRow
                school={schools[virtualRow.index]}
                onDelete={onDelete}
                stages={stages}
                navigate={navigate}
              />
            </tr>
          ))}
          <tr
            style={{
              height: `${rowVirtualizer.getTotalSize() - rowVirtualizer.getVirtualItems().reduce((s, r) => s + r.size, 0)}px`,
            }}
          >
            <td colSpan={5} />
          </tr>
        </tbody>
      </table>

      {schools.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm font-medium">
          {searchQuery
            ? `Нічого не знайдено за «${searchQuery}»`
            : "Шкіл ще немає"}
        </div>
      )}
    </div>
  );
}

```

---

### `apps/backend/src/events/dto/create-event.dto.ts`

```typescript
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'ID міста',
  })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiProperty({
    example: 'f9e8d7c6-b5a4-3210-fedc-ba9876543210',
    description: 'ID школи',
  })
  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @ApiProperty({ example: 'Голографічне шоу «Космос»' })
  @IsString()
  @IsNotEmpty()
  project: string;

  @ApiProperty({
    example: '2026-09-15',
    description: 'Дата у форматі YYYY-MM-DD',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiPropertyOptional({ example: '14:30' })
  @IsOptional()
  @IsString()
  time?: string;

  @ApiPropertyOptional({ example: 120, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  childrenPlanned?: number;

  @ApiPropertyOptional({ example: 15000, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional({ example: 'card', enum: ['cash', 'card', 'invoice'] })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional({ example: 'м. Львів, вул. Шевченка 10' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Олена Ковальчук' })
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @ApiPropertyOptional({ example: '+380671234567' })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiPropertyOptional({ example: 'Проєктор, генератор туману' })
  @IsOptional()
  @IsString()
  equipment?: string;

  @ApiPropertyOptional({ example: 'Голографічне шоу «Динозаври»' })
  @IsOptional()
  @IsString()
  nextProject?: string;

  @ApiPropertyOptional({
    example: 'a1b2c3d4-...',
    description: 'ID відповідального менеджера',
  })
  @IsOptional()
  @IsString()
  responsibleId?: string;
}

```

---

### `apps/backend/src/telegram/telegram.service.ts`

```typescript
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

---

### `apps/frontend/src/components/school-profile/modals/CrewModal.tsx`

```typescript
import { useState, useMemo } from "react";
import { api } from "../../../config/api";
import type { City, Crew } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { useDaysOff } from "../../../hooks/useDaysOff";
interface CrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  city?: string;
  eventDate?: string;
  onSave: (crewId: string) => void;
}

export default function CrewModal({
  isOpen,
  onClose,
  city,
  eventDate,
  onSave,
}: CrewModalProps) {
  const { data: allCities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: () => api.get("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const currentCity = allCities.find((c: City) => c.name === city);
  const { data: crews = [], isLoading } = useQuery({
    queryKey: ["cityCrews", currentCity?.id],
    queryFn: () =>
      api.get<Crew[]>(`/cities/${currentCity!.id}/crews`).then((r) => r.data),
    enabled: !!currentCity?.id && isOpen,
    staleTime: 60 * 1000,
  });
  const dayOnly = eventDate ? eventDate.slice(0, 10) : undefined;
  const { data: dayOffs = [] } = useDaysOff(dayOnly, dayOnly);
  const dayOffUserIds = useMemo(
    () => new Set(dayOffs.map((d) => d.userId)),
    [dayOffs],
  );
  const [selectedCrewId, setSelectedCrewId] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">
            Призначити екіпаж
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <p className="text-slate-500 text-center py-4">Завантаження...</p>
          ) : crews.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-slate-500">
                У цьому місті ще немає сформованих екіпажів.
              </p>
              <p className="text-sm mt-2 text-blue-600">
                Створіть екіпаж у вкладці міста!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Оберіть готовий екіпаж
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {crews.map((crew) => {
                  const hostOnDayOff =
                    crew.hostId && dayOffUserIds.has(crew.hostId);
                  const driverOnDayOff =
                    crew.driverId && dayOffUserIds.has(crew.driverId);
                  const isUnavailable = hostOnDayOff || driverOnDayOff;
                  return (
                    <label
                      key={crew.id}
                      className={`flex items-start p-3 rounded-xl border transition-all ${
                        isUnavailable
                          ? "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed"
                          : selectedCrewId === crew.id
                            ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 cursor-pointer"
                            : "border-slate-200 hover:border-blue-300 cursor-pointer"
                      }`}
                    >
                      <input
                        type="radio"
                        name="crew"
                        value={crew.id}
                        checked={selectedCrewId === crew.id}
                        disabled={!!isUnavailable}
                        onChange={() => setSelectedCrewId(crew.id)}
                        className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="font-bold text-slate-800">{crew.name}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          🎙️ {crew.host?.name || "—"} | 🚗{" "}
                          {crew.driver?.name || "—"}
                        </p>
                        {crew.car && (
                          <p className="text-xs text-emerald-600 mt-0.5">
                            Авто: {crew.car}
                          </p>
                        )}
                        {isUnavailable && (
                          <p className="text-xs text-rose-500 font-medium mt-1">
                            🌴 {hostOnDayOff ? "Ведучий" : "Водій"} у вихідному
                            цього дня
                          </p>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200"
            >
              Скасувати
            </button>
            <button
              onClick={() => onSave(selectedCrewId)}
              disabled={!selectedCrewId}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-opacity"
            >
              Призначити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

```

---

### `apps/backend/src/schools/schools.service.ts`

```typescript
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

    this.parserService
      .parseSchoolData(data.name, sourceUrl, data.type)
      .then(async (parsed) => {
        if (!parsed) {
          this.logger.warn(`Не вдалося знайти дані для закладу: ${data.name}`);
          return;
        }

        const updateData: Record<string, unknown> = {};

        if (!schoolData.address && parsed.address) {
          updateData.address = parsed.address;
        }
        if (!schoolData.director && parsed.director) {
          updateData.director = parsed.director;
        }
        if (!schoolData.childrenCount && parsed.childrenCount) {
          updateData.childrenCount = parsed.childrenCount;
        }

        if (Object.keys(updateData).length === 0) {
          this.logger.log(
            `Дані школи "${data.name}" вже заповнені користувачем — пропускаємо оновлення з парсингу`,
          );
          return;
        }

        await this.prisma.school.update({
          where: {
            id: newSchool.id,
          },
          data: updateData,
        });

        this.logger.log(`Дані школи "${data.name}" успішно оновлені`);
      })
      .catch((error: Error) => {
        this.logger.error(`Помилка оновлення даних школи: ${error.message}`);
      });

    return newSchool;
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
    [key: string]: unknown;
  }) {
    const { city_id, city_name, latestStatus, ...school } = row;
    return {
      ...school,
      city: city_id ? { id: city_id, name: city_name } : null,
      events: latestStatus ? [{ status: latestStatus }] : [],
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
      SELECT s.*, c.id as city_id, c.name as city_name, latest.status as "latestStatus"
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
      this.prisma.$queryRaw
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
        total: allFromParser.length,
        created: 0,
        skipped: allFromParser.length,
      };
    }

    const contacts = await this.prisma.schoolContact.findMany({
      where: { city: city.name },
    });

    let created = 0;
    for (const school of toCreate) {
      if (existingNames.has(normalize(school.name))) continue;

      existingNames.add(normalize(school.name));

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

      try {
        await this.create({
          name: school.name,
          type,
          cityId,
          sourceUrl: school.url,
          director: director?.contactName || '',
          phone: director?.phone || '',
        });
        created++;
      } catch (e) {
        this.logger.error(
          `Помилка створення ${school.name}: ${(e as Error).message}`,
        );
      }
    }

    return {
      city: city.name,
      total: allFromParser.length,
      created,
      skipped: allFromParser.length - created,
    };
  }
}

```

---

### `apps/frontend/src/pages/CalendarView.tsx`

```typescript
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCalendarEvents, useCalendarProjects } from "../hooks/useCalendar";
import { useUsers } from "../hooks/useEmployees";
import { useCities } from "../hooks/useCities";
import {
  useDaysOff,
  useCreateDayOff,
  useDeleteDayOff,
} from "../hooks/useDaysOff";
import { useState, useMemo, useCallback } from "react";
import DayOffModal from "../components/calendar/DayOffModal";

const STAFF_ROLES = ["HOST", "DRIVER"];
const MANAGER_ROLES = ["SUPERADMIN", "MANAGER"];

const toISODate = (d: Date) => d.toLocaleDateString("en-CA");

export default function CalendarView() {
  const { data: events = [], isLoading: eventsLoading } = useCalendarEvents();
  const { data: projects = [] } = useCalendarProjects();
  const { data: cities = [] } = useCities();
  const { data: allUsers = [] } = useUsers();
  const [currentDate, setCurrentDate] = useState(new Date());
  const isLoading = eventsLoading;
  const [selectedMobileDate, setSelectedMobileDate] = useState<Date>(
    new Date(),
  );
  const [dayOffModalDate, setDayOffModalDate] = useState<Date | null>(null);

  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();
  const navigate = useNavigate();

  const userRole = user?.role || "GUEST";
  const isStaff = STAFF_ROLES.includes(userRole);
  const isManagerOrAdmin = MANAGER_ROLES.includes(userRole);

  const [filterCityId, setFilterCityId] = useState<string>(() =>
    userRole === "MANAGER" && user?.cityId ? user.cityId : "ALL",
  );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  const today = () => {
    setCurrentDate(new Date());
    setSelectedMobileDate(new Date());
  };

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

  const monthFrom = toISODate(new Date(year, month, 1));
  const monthTo = toISODate(new Date(year, month + 1, 0));

  const dayOffCityId = isManagerOrAdmin
    ? filterCityId !== "ALL"
      ? filterCityId
      : undefined
    : undefined;

  const { data: dayOffs = [] } = useDaysOff(monthFrom, monthTo, dayOffCityId);
  const createDayOff = useCreateDayOff();
  const deleteDayOff = useDeleteDayOff();

  const dayOffsByDate = useMemo(() => {
    const map = new Map<string, typeof dayOffs>();
    for (const d of dayOffs) {
      const key = d.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    }
    return map;
  }, [dayOffs]);

  const staffForModal = useMemo(() => {
    const cityScope =
      userRole === "MANAGER"
        ? user?.cityId
        : filterCityId !== "ALL"
          ? filterCityId
          : null;
    return allUsers.filter(
      (u: any) =>
        STAFF_ROLES.includes(u.role) && (!cityScope || u.cityId === cityScope),
    );
  }, [allUsers, userRole, user?.cityId, filterCityId]);

  const filteredEvents = events.filter((ev: any) => {
    if (ev.status === "RE_SALE") return false;
    if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) return false;
    return true;
  });

  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter((ev: any) => {
      const evDate = new Date(ev.date);
      return (
        evDate.getFullYear() === date.getFullYear() &&
        evDate.getMonth() === date.getMonth() &&
        evDate.getDate() === date.getDate()
      );
    });
  };

  const isPastDay = (date: Date) => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return date < startOfToday;
  };

  const handleDayOffClick = useCallback(
    (e: React.MouseEvent, date: Date) => {
      e.stopPropagation();
      if (isPastDay(date)) return;

      if (isStaff && user) {
        const key = toISODate(date);
        const existing = dayOffsByDate
          .get(key)
          ?.find((d) => d.userId === user.id);
        if (existing) {
          deleteDayOff.mutate(existing.id);
        } else {
          createDayOff.mutate({ date: key });
        }
        return;
      }

      if (isManagerOrAdmin) {
        setDayOffModalDate(date);
      }
    },
    [
      isStaff,
      isManagerOrAdmin,
      user,
      dayOffsByDate,
      createDayOff,
      deleteDayOff,
    ],
  );

  const handleToggleStaffDayOff = useCallback(
    (targetUserId: string, existingId?: string) => {
      if (existingId) {
        deleteDayOff.mutate(existingId);
      } else if (dayOffModalDate) {
        createDayOff.mutate({
          date: toISODate(dayOffModalDate),
          userId: targetUserId,
        });
      }
    },
    [dayOffModalDate, createDayOff, deleteDayOff],
  );

  const monthNames = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  const getProjectColor = (projectName: string) => {
    const proj = projects.find((p: any) => p.name === projectName);
    const color = proj ? proj.color : "blue";

    switch (color) {
      case "emerald":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300";
      case "rose":
        return "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 hover:border-rose-300";
      case "red":
        return "bg-red-100 text-red-700 border-red-300 hover:bg-red-200 hover:border-red-400";
      case "amber":
        return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 hover:border-amber-300";
      case "purple":
        return "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:border-purple-300";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300";
    }
  };

  if (isLoading)
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="h-8 w-52 bg-slate-200 rounded-xl mb-2" />
            <div className="h-4 w-72 bg-slate-200 rounded-lg mb-4" />
            <div className="flex gap-3 mt-4">
              {[80, 100, 90].map((w, i) => (
                <div
                  key={i}
                  className="h-4 bg-slate-200 rounded-full"
                  style={{ width: w }}
                />
              ))}
            </div>
          </div>
          <div className="h-10 w-48 bg-slate-200 rounded-xl" />
        </div>

        <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100">
            <div className="h-8 w-36 bg-slate-200 rounded-xl" />
            <div className="h-10 w-44 bg-slate-200 rounded-2xl" />
          </div>

          <div className="grid grid-cols-7 bg-slate-50/50">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
              <div key={d} className="py-3 flex justify-center">
                <div className="h-3 w-6 bg-slate-200 rounded" />
              </div>
            ))}

            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-2"
              >
                <div className="flex justify-end mb-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200" />
                </div>
                {i % 4 === 0 && (
                  <div className="h-5 bg-slate-100 rounded-md mb-1.5 mx-0.5" />
                )}
                {i % 7 === 2 && (
                  <div className="h-5 bg-slate-100 rounded-md mx-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <div className="h-6 w-40 bg-slate-200 rounded-lg mb-3" />
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border-l-4 border-l-slate-200 shadow-sm"
              >
                <div className="flex justify-between mb-2">
                  <div className="h-5 w-20 bg-slate-200 rounded" />
                  <div className="h-5 w-28 bg-slate-200 rounded" />
                </div>
                <div className="h-5 w-48 bg-slate-200 rounded mb-1" />
                <div className="h-4 w-36 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  const selectedDayEvents = getEventsForDay(selectedMobileDate);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24">
      <style>{`
        @keyframes dayOffPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .dayoff-cell-enter {
          animation: dayOffPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* Шапка календаря */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Календар подій
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Графік запланованих та активних заходів
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {projects.map((p: any) => {
              const badgeColor =
                {
                  blue: "bg-blue-400",
                  emerald: "bg-emerald-400",
                  rose: "bg-rose-400",
                  red: "bg-red-500",
                  amber: "bg-amber-400",
                  purple: "bg-purple-400",
                }[p.color] || "bg-blue-400";

              return (
                <span
                  key={p.id}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
                >
                  <span className={`w-3 h-3 rounded-full ${badgeColor}`}></span>{" "}
                  {p.name}
                </span>
              );
            })}
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>{" "}
              Вихідний
            </span>
          </div>
        </div>

        {userRole === "SUPERADMIN" && (
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 shrink-0">
            <span className="text-sm text-slate-500 font-medium">Місто:</span>
            <select
              value={filterCityId}
              onChange={(e) => setFilterCityId(e.target.value)}
              className="text-sm font-semibold text-slate-800 outline-none cursor-pointer bg-transparent"
            >
              <option value="ALL">🌍 Всі міста</option>
              {cities.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="flex flex-col sm:flex-row items-center justify-between p-5 md:p-6 border-b border-slate-100 gap-4 bg-white">
          <h2 className="text-2xl font-bold text-slate-800 capitalize tracking-tight">
            {monthNames[month]}{" "}
            <span className="text-slate-400 font-medium">{year}</span>
          </h2>
          <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <button
              onClick={prevMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
            >
              ◀
            </button>
            <button
              onClick={today}
              className="px-4 md:px-6 py-2 bg-white rounded-xl shadow-sm text-slate-800 font-bold transition-all hover:bg-slate-50"
            >
              Сьогодні
            </button>
            <button
              onClick={nextMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 bg-slate-50/50">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
            <div
              key={dayName}
              className="py-3 text-center text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase border-b border-slate-100"
            >
              {dayName}
            </div>
          ))}

          {days.map((day, idx) => {
            const isToday =
              day && day.toDateString() === new Date().toDateString();
            const isSelected =
              day && day.toDateString() === selectedMobileDate.toDateString();
            const dayEvents = day ? getEventsForDay(day) : [];
            const dayKey = day ? toISODate(day) : "";
            const dayOffEntries = day ? (dayOffsByDate.get(dayKey) ?? []) : [];

            const myDayOff = isStaff
              ? dayOffEntries.find((d) => d.userId === user?.id)
              : undefined;
            const hasAnyDayOff = isStaff
              ? !!myDayOff
              : dayOffEntries.length > 0;

            const showCross =
              day && !isPastDay(day) && (isStaff || isManagerOrAdmin);

            return (
              <div
                key={idx}
                onClick={() => day && setSelectedMobileDate(day)}
                className={`min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-1 md:p-2 transition-colors relative group
                  ${day ? "bg-white hover:bg-slate-50 cursor-pointer" : "bg-slate-50/30"}
                  ${isSelected ? "ring-2 ring-inset ring-blue-500/20 bg-blue-50/10" : ""}
                  ${hasAnyDayOff ? "dayoff-cell-enter bg-rose-50/70" : ""}
                `}
              >
                {day && (
                  <>
                    {showCross && (
                      <button
                        onClick={(e) => handleDayOffClick(e, day)}
                        title={
                          hasAnyDayOff
                            ? "Скасувати вихідний"
                            : "Призначити вихідний"
                        }
                        className={`absolute top-1 left-1 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold z-10 transition-all
                          ${
                            hasAnyDayOff
                              ? "bg-rose-500 text-white shadow-sm hover:bg-rose-600"
                              : "bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-rose-100 hover:text-rose-500"
                          }`}
                      >
                        ✕
                      </button>
                    )}

                    <div className="flex justify-center md:justify-end mb-1.5">
                      <span
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold transition-colors
                        ${isToday ? "bg-blue-600 text-white shadow-md" : "text-slate-500 md:group-hover:text-blue-600"}
                      `}
                      >
                        {day.getDate()}
                      </span>
                    </div>

                    {hasAnyDayOff && !isStaff && dayOffEntries.length > 0 && (
                      <p className="text-[9px] md:text-[10px] text-rose-600 font-semibold text-center mb-1 truncate px-1">
                        🌴 {dayOffEntries.length}{" "}
                        {dayOffEntries.length === 1 ? "вихідний" : "вихідних"}
                      </p>
                    )}

                    <div className="space-y-1.5 max-h-[80px] md:max-h-[100px] overflow-y-auto custom-scrollbar pr-0.5">
                      {dayEvents.map((ev: any) => (
                        <div
                          key={ev.id}
                          className="relative group/event z-0 hover:z-50"
                        >
                          <button
                            className={`w-full px-1.5 py-1 text-center md:text-left rounded-md border text-[10px] md:text-xs font-bold transition-all shadow-sm ${getProjectColor(ev.project)}`}
                          >
                            {ev.time || "—"}
                          </button>

                          <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white p-3 rounded-xl shadow-2xl opacity-0 invisible group-hover/event:opacity-100 group-hover/event:visible transition-all duration-200 pointer-events-none">
                            <p className="font-bold text-sm mb-1 truncate">
                              {ev.school?.name || "Невідомий заклад"}
                            </p>
                            <div className="space-y-1 text-xs text-slate-300">
                              <p>
                                <span className="text-slate-400">Проєкт:</span>{" "}
                                {ev.project}
                              </p>
                              <p>
                                <span className="text-slate-400">Екіпаж:</span>{" "}
                                {ev.crew?.name || "Не призначено"}
                              </p>
                              <p>
                                <span className="text-slate-400">Час:</span>{" "}
                                <span className="font-bold text-white">
                                  {ev.time || "—"}
                                </span>
                              </p>
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-800"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 md:hidden">
        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
          📅 Події на{" "}
          {selectedMobileDate.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "long",
          })}
        </h3>

        {selectedDayEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400">
            На цей день подій не заплановано
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDayEvents.map((ev: any) => (
              <div
                key={ev.id}
                onClick={() =>
                  ev.school && navigate(`/schools/${ev.school.id}`)
                }
                className={`bg-white p-4 rounded-2xl border-l-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer
                  ${
                    ev.project.toLowerCase().includes("голограм")
                      ? "border-l-emerald-500"
                      : ev.project.toLowerCase().includes("малювайк")
                        ? "border-l-rose-500"
                        : ev.project.toLowerCase().includes("360")
                          ? "border-l-red-500"
                          : "border-l-blue-500"
                  }
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                    🕒 {ev.time || "Не вказано"}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {ev.project}
                  </span>
                </div>
                <p className="font-bold text-slate-800">{ev.school?.name}</p>
                <p className="text-sm text-slate-500 mt-1">
                  🚐 Екіпаж: {ev.crew?.name || "Не призначено"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <DayOffModal
        isOpen={!!dayOffModalDate}
        onClose={() => setDayOffModalDate(null)}
        date={dayOffModalDate}
        staff={staffForModal}
        dayOffs={
          dayOffModalDate
            ? (dayOffsByDate.get(toISODate(dayOffModalDate)) ?? [])
            : []
        }
        onToggle={handleToggleStaffDayOff}
      />
    </div>
  );
}

```

---

### `apps/frontend/src/components/calendar/DayOffModal.tsx`

```typescript
import { createPortal } from "react-dom";
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
  if (!isOpen || !date) return null;

  const dateStr = date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return createPortal(
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
      style={{ animation: "fadeIn 0.2s ease-out forwards" }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalScale {
          from { opacity: 0; transform: scale(0.95) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
        style={{ animation: "modalScale 0.3s ease-out forwards" }}
      >
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Вихідний на {dateStr}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Оберіть співробітника
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
          >
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
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
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
      </div>
    </div>,
    document.body,
  );
}

```

---

### `apps/frontend/src/pages/Kindergartens.tsx`

```typescript
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import {
  useSchools,
  useSchoolStats,
  useDeleteSchool,
  usePrefetchSchool,
  useCities,
  useSupportedCities,
} from "../hooks/useApi";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import VirtualSchoolList from "../components/VirtualSchoolList";
import { SchoolCard } from "../components/schools/SchoolMobileList";
import type { SchoolContact } from "../types";
import { useAuth } from "../context/AuthContext";

interface NewSchoolPayload {
  name: string;
  cityId: string;
  sourceUrl: string;
  director: string;
  phone: string;
  type: string;
}

const StatsBar = lazy(() => import("../components/schools/StatsBar"));
const VirtualDesktopTable = lazy(
  () => import("../components/schools/VirtualDesktopTable"),
);

const PIPELINE_STAGES = [
  { key: "BASE", name: "Новий заклад" },
  { key: "FIRST_CONTACT", name: "Знайомство" },
  { key: "DATE_CONFIRMED", name: "Підтвердження дати" },
  { key: "PREPARATION", name: "Оголошення" },
  { key: "IN_PROGRESS", name: "Підготовка" },
  { key: "DONE", name: "Проведення заходу" },
  { key: "REPORT", name: "Звіт" },
];

export default function Kindergartens() {
  const { selectedCity } = useSelectedCity();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const userRole = user?.role ?? null;
  const qc = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    cityId: "",
    sourceUrl: "",
    director: "",
    phone: "",
  });
  const [matchedContacts, setMatchedContacts] = useState<SchoolContact[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; url: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dotCount, setDotCount] = useState(3);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addSchoolMutation = useMutation({
    mutationFn: (newSchool: NewSchoolPayload) =>
      api.post("/schools", newSchool, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      setIsModalOpen(false);
    },
    onError: () => alert("Не вдалося створити садочок"),
  });

  const bulkImportMutation = useMutation({
    mutationFn: (cityId: string) =>
      api.post(
        "/schools/bulk-import",
        { cityId, type: "Садочок" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          timeout: 120000,
        },
      ),
    onSuccess: (res) => {
      alert(
        `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
      );
      qc.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: () => alert("Помилка імпорту."),
  });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const schoolFilters = useMemo(
    () => ({
      search: debouncedQuery || undefined,
      cityId: selectedCity.id || undefined,
      type: "Садочок" as const,
      stage: (activeFilter as any) || undefined,
      size: (sizeFilter as any) || undefined,
    }),
    [debouncedQuery, selectedCity.id, activeFilter, sizeFilter],
  );

  const {
    data: schoolsPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSchools(schoolFilters);
  const { data: stats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: "Садочок",
    stage: (activeFilter as any) || undefined,
  });
  const { data: cities = [] } = useCities();
  const { data: supportedCities = [] } = useSupportedCities();
  const deleteSchool = useDeleteSchool();
  const prefetchSchool = usePrefetchSchool();

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const filteredSchools = useMemo(
    () => schoolsPages?.pages.flatMap((p) => p.data) ?? [],
    [schoolsPages],
  );
  const totalItems = schoolsPages?.pages[0]?.meta.totalItems ?? 0;

  const handleOpenModal = useCallback(() => {
    setForm({
      name: "",
      cityId: selectedCity.id || cities[0]?.id || "",
      sourceUrl: "",
      director: "",
      phone: "",
    });
    setMatchedContacts([]);
    setIsModalOpen(true);
  }, [selectedCity.id, cities]);

  const fetchContacts = async (schoolName: string) => {
    if (!schoolName || schoolName.trim().length < 1)
      return setMatchedContacts([]);
    const currentCityName =
      selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
    if (currentCityName.toLowerCase() !== "львів")
      return setMatchedContacts([]);
    try {
      const data = await qc.fetchQuery<SchoolContact[]>({
        queryKey: ["schoolContacts", schoolName, currentCityName],
        queryFn: async () => {
          const res = await api.get<SchoolContact[]>(
            `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Садочок`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
          return res.data;
        },
        staleTime: 1000 * 60 * 5,
      });

      setMatchedContacts(data);
      if (data.length > 0) {
        const director =
          data.find(
            (c: SchoolContact) =>
              c.role?.includes("Директор") || c.role?.includes("Завідувач"),
          ) || data[0];
        setForm((f) => ({
          ...f,
          director: director.contactName,
          phone: director.phone,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNameChange = (value: string) => {
    setForm({ ...form, name: value });
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (value.length < 2) {
      setShowSuggestions(false);
      setIsSearching(false);
      setMatchedContacts([]);
      return;
    }
    setIsSearching(true);
    setShowSuggestions(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const [externalData] = await Promise.all([
          qc.fetchQuery({
            queryKey: ["schoolSearchExternal", value],
            queryFn: async () => {
              const res = await api.get(
                `/schools/search?q=${encodeURIComponent(value)}&type=Садочок`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                },
              );
              return res.data;
            },
            staleTime: 1000 * 60 * 5,
          }),
          fetchContacts(value),
        ]);
        setSuggestions(externalData);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  const handleSelectSuggestion = (name: string, url: string) => {
    setForm({ ...form, name, sourceUrl: url });
    setShowSuggestions(false);
    fetchContacts(name);
  };

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.cityId) return;
    addSchoolMutation.mutate({ ...form, type: "Садочок" });
  };

  const handleDeleteSchool = useCallback(
    async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
      e.stopPropagation();
      if (userRole !== "SUPERADMIN") return;
      if (
        !window.confirm(
          `Видалити садочок "${schoolName}"? Це видалить також усі його події.`,
        )
      )
        return;
      await deleteSchool.mutateAsync(schoolId);
    },
    [deleteSchool, userRole],
  );

  return (
    <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-800 leading-tight">
            Садочки
            {selectedCity.id && (
              <span className="ml-2 text-sm font-normal text-blue-500">
                · {selectedCity.name}
              </span>
            )}
          </h1>
        </div>
        <div className="flex gap-2 shrink-0">
          {(userRole === "SUPERADMIN" || userRole === "MANAGER") && (
            <button
              onClick={() => {
                if (!selectedCity.id) return alert("Спочатку оберіть місто");
                if (!supportedCities.includes(selectedCity.name))
                  return alert(
                    `Місто "${selectedCity.name}" не підтримується для імпорту.`,
                  );
                if (
                  !window.confirm(
                    `Імпортувати всі садочки з isuo.org для міста ${selectedCity.name}?`,
                  )
                )
                  return;

                setDotCount(3);
                const dotInterval = setInterval(() => {
                  setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
                }, 500);

                bulkImportMutation.mutate(selectedCity.id, {
                  onSettled: () => clearInterval(dotInterval),
                });
              }}
              disabled={bulkImportMutation.isPending}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-70 transition-all"
            >
              {bulkImportMutation.isPending ? (
                <span className="font-medium">
                  Імпортую{"·".repeat(dotCount)}
                </span>
              ) : (
                <>📥 Імпорт з isuo</>
              )}
            </button>
          )}
          <button
            onClick={handleOpenModal}
            className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Додати
          </button>
        </div>
      </div>

      <div className="shrink-0">
        <Suspense
          fallback={
            <div className="h-[72px] bg-white rounded-2xl animate-pulse mb-4" />
          }
        >
          <StatsBar
            statusStats={
              stats?.statusStats ?? {
                new: 0,
                planned: 0,
                inProgress: 0,
                done: 0,
              }
            }
            sizeStats={stats?.sizeStats ?? { small: 0, medium: 0, large: 0 }}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sizeFilter={sizeFilter}
            onSizeFilterChange={setSizeFilter}
            schoolType="Садочок"
          />
        </Suspense>
      </div>

      <div className="relative shrink-0 mb-4 mt-2">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук за назвою садочка..."
          className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border-none sm:border sm:border-slate-200 rounded-2xl sm:rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <p className="text-xs font-semibold text-slate-400 mb-4 shrink-0 uppercase tracking-wide px-1">
        {`${filteredSchools.length} з ${totalItems} садочків`}
        {(activeFilter || sizeFilter) && (
          <button
            onClick={() => {
              setActiveFilter(null);
              setSizeFilter(null);
            }}
            className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
          >
            скинути фільтри
          </button>
        )}
      </p>

      {isLoading ? (
        <div className="flex flex-col gap-2.5 flex-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-3.5 animate-pulse"
              style={{ opacity: 1 - i * 0.1 }}
            >
              <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
                <div className="h-3 bg-slate-100 rounded-lg w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="md:hidden flex-1 w-full overflow-hidden">
            <VirtualSchoolList
              schools={filteredSchools}
              itemHeight={110}
              onEndReached={handleLoadMore}
              animationKey={`${activeFilter}-${sizeFilter}`}
              renderItem={(school, index) => (
                <div
                  className="pb-2.5"
                  onMouseEnter={() => prefetchSchool(school.id)}
                >
                  <SchoolCard
                    school={school}
                    index={index}
                    onDelete={handleDeleteSchool}
                    stages={PIPELINE_STAGES}
                  />
                </div>
              )}
            />
          </div>

          <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0">
            <Suspense
              fallback={<div className="flex-1 animate-pulse bg-slate-50" />}
            >
              <VirtualDesktopTable
                schools={filteredSchools}
                searchQuery={searchQuery}
                onDelete={handleDeleteSchool}
                stages={PIPELINE_STAGES}
                onEndReached={handleLoadMore}
              />
            </Suspense>
          </div>
        </>
      )}

      <button
        onClick={handleOpenModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
      >
        +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold text-slate-800">
                Новий садочок
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 -mr-2 leading-none text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleAddSchool}
              className="p-6 flex flex-col gap-4 overflow-y-auto"
            >
              <div className="relative">
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Назва садочка
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  placeholder="Наприклад: Садочок №1"
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {showSuggestions && (
                  <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
                    {isSearching ? (
                      <li className="px-4 py-3 text-sm text-slate-400 italic">
                        Пошук...
                      </li>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((s, i) => (
                        <li
                          key={i}
                          onMouseDown={() =>
                            handleSelectSuggestion(s.name, s.url)
                          }
                          className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer font-medium border-b border-slate-50 last:border-0"
                        >
                          {s.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-slate-400 italic">
                        Нічого не знайдено
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {!selectedCity.id && (
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Місто
                  </label>
                  <select
                    value={form.cityId}
                    onChange={(e) =>
                      setForm({ ...form, cityId: e.target.value })
                    }
                    required
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">— Оберіть місто —</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Контакт{" "}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    (автозаповнення)
                  </span>
                </label>
                {matchedContacts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {matchedContacts.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            director: c.contactName,
                            phone: c.phone,
                          }))
                        }
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                      >
                        {c.role ? `${c.role}: ` : ""}
                        {c.contactName}
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={form.director}
                  onChange={(e) =>
                    setForm({ ...form, director: e.target.value })
                  }
                  placeholder="Микола Петренко"
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Телефон
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0671234567"
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-5 py-3.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={addSchoolMutation.isPending}
                  className="flex-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

```

---

