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

    this.parserService
      .parseSchoolData(data.name, sourceUrl, data.type)
      this.enrichSchoolFromParser(newSchool, data.name, sourceUrl, data.type);

    return newSchool;
  }

  private async enrichSchoolFromParser(
    school: { id: string; address: string | null; director: string | null; childrenCount: number | null },
    name: string,
    sourceUrl?: string,
    type?: string,
  ) {
    try {
      const parsed = await this.parserService.parseSchoolData(name, sourceUrl, type);
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
      this.logger.error(`Помилка оновлення даних школи: ${(error as Error).message}`);
    }
  }

  private createMany(
    schools: { name: string; type: string; cityId: string; director?: string; phone?: string }[],
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
