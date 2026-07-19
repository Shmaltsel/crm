import {
  Injectable,
  Logger,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { AppException } from '../common/exceptions/app.exception';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';
import { CacheVersionService } from '../common/cache/cache-version.service';
import { Prisma, PreparationStatus } from '@prisma/client';

import { CreateEventDto } from './dto/create-event.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

const FIELD_ROLES = ['DRIVER', 'HOST'];

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  private readonly pendingSchoolEvents = new Map<string, Promise<unknown>>();

  constructor(
    private readonly prisma: PrismaService,
    private telegramService: TelegramService,
    private notificationsService: NotificationsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cacheVersion: CacheVersionService,
  ) {}

  private toOptionalNumber(value: unknown): number | null {
    return value != null ? Number(value) : null;
  }

  private toNumber(value: unknown): number {
    return Number(value ?? 0);
  }

  private serializeEvent<T extends Record<string, unknown>>(ev: T): T {
    return {
      ...ev,
      price: this.toOptionalNumber(ev.price),
      received: this.toOptionalNumber(ev.received),
      report: ev.report
        ? {
            ...(ev.report as Record<string, unknown>),
            totalSum: this.toNumber(
              (ev.report as Record<string, unknown>).totalSum,
            ),
            schoolSum: this.toNumber(
              (ev.report as Record<string, unknown>).schoolSum,
            ),
            remainderSum: this.toNumber(
              (ev.report as Record<string, unknown>).remainderSum,
            ),
          }
        : ev.report,
    };
  }

  async findAllForUser(user: JwtUser, query?: EventQueryDto) {
    const isFieldStaff = FIELD_ROLES.includes(user.role);
    const where: Record<string, unknown> = isFieldStaff
      ? { crew: { OR: [{ hostId: user.sub }, { driverId: user.sub }] } }
      : {};

    if (query?.dateFrom || query?.dateTo) {
      where.date = {};
      if (query.dateFrom)
        (where.date as Record<string, Date>).gte = new Date(query.dateFrom + "T00:00:00.000Z");
      if (query.dateTo) {
        const endOfDay = new Date(query.dateTo + "T23:59:59.999Z");
        (where.date as Record<string, Date>).lte = endOfDay;
      }
    }

    const include = {
      school: { select: { id: true, name: true, type: true } },
      city: { select: { id: true, name: true } },
      crew: {
        include: {
          host: { select: { id: true, name: true } },
          driver: { select: { id: true, name: true } },
        },
      },
      report: { select: { status: true } },
    };

    if (query?.dateFrom || query?.dateTo) {
      const events = await this.prisma.event.findMany({
        where,
        include,
        orderBy: { date: 'asc' },
      });
      return events.map((e) => this.serializeEvent(e));
    }

    if (!query?.page) {
      const events = await this.prisma.event.findMany({
        where,
        include,
        orderBy: { date: 'asc' },
      });
      return events.map((e) => this.serializeEvent(e));
    }

    const take = query.take ?? 20;
    const skip = (query.page - 1) * take;

    const [data, totalItems] = await Promise.all([
      this.prisma.event.findMany({
        where,
        include,
        orderBy: { date: 'asc' },
        skip,
        take,
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      data: data.map((e) => this.serializeEvent(e)),
      meta: new PageMetaDto(totalItems, query.page, take),
    };
  }

  async create(data: CreateEventDto, user: JwtUser) {
    const event = await this.prisma.event.create({
      data: {
        ...data,
        status: 'BASE' as never,
        date: new Date(data.date),
        history: {
          create: {
            action: 'Створено подію. Етап: База',
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { history: true, city: { select: { managerId: true } } },
    });

    const pendingComments = await this.prisma.schoolComment.findMany({
      where: { schoolId: data.schoolId, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });

    if (pendingComments.length > 0) {
      const authorIds = [...new Set(pendingComments.map((c) => c.authorId))];
      const authors = await this.prisma.user.findMany({
        where: { id: { in: authorIds } },
        select: { id: true, name: true },
      });
      const authorMap = new Map(authors.map((a) => [a.id, a.name]));

      await this.prisma.eventHistory.createMany({
        data: pendingComments.map((c) => ({
          eventId: event.id,
          action: `Коментар до події`,
          comment: c.text,
          userId: c.authorId,
          userName: authorMap.get(c.authorId) ?? user.name,
          role: user.role,
        })),
      });

      await this.prisma.schoolComment.updateMany({
        where: { schoolId: data.schoolId, deletedAt: null },
        data: { deletedAt: new Date() },
      });
    }

    await this.invalidateSchoolEventsCache(event.schoolId);

    this.notifyManagerEventCreated(event.id, data);

    return this.serializeEvent(event);
  }

  private async invalidateSchoolEventsCache(schoolId: string) {
    await Promise.all([
      this.cacheManager.del(`events:school:${schoolId}:minimal`),
      this.cacheManager.del(`events:school:${schoolId}:full`),
    ]);
  }

  async updateStatus(
    eventId: string,
    newStatus: string,
    actionName: string,
    comment: string | undefined,
    user: JwtUser,
  ) {
    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: newStatus as never,
        history: {
          create: {
            action: actionName,
            comment: comment || null,
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { crew: true, history: { orderBy: { createdAt: 'desc' } } },
    });
    await this.invalidateSchoolEventsCache(event.schoolId);
    await Promise.all([
      this.cacheVersion.bumpVersion('finance'),
      this.cacheVersion.bumpVersion('dashboard'),
      this.cacheVersion.bumpVersion('analytics'),
    ]);
    return this.serializeEvent(event);
  }

  async updatePreparationStatus(
    eventId: string,
    field: keyof Omit<
      Prisma.EventPreparationUncheckedCreateInput,
      'id' | 'eventId'
    >,
    status: PreparationStatus,
  ) {
    const result = await this.prisma.eventPreparation.upsert({
      where: { eventId },
      update: { [field]: status },
      create: { eventId, [field]: status },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { schoolId: true },
    });
    if (event) await this.invalidateSchoolEventsCache(event.schoolId);
    return result;
  }

  async assignCrewToEvent(eventId: string, crewId: string) {
    const targetEvent = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, date: true, crewId: true },
    });
    if (!targetEvent)
      throw new AppException('EVENT_NOT_FOUND', HttpStatus.NOT_FOUND);

    if (targetEvent.crewId === crewId) {
      const existing = await this.prisma.event.update({
        where: { id: eventId },
        data: { crewId },
        include: {
          crew: { include: { host: true, driver: true } },
          school: true,
          city: true,
          preparation: true,
          history: { orderBy: { createdAt: 'desc' } },
        },
      });
      return this.serializeEvent(existing);
    }

    const eventDate = new Date(targetEvent.date);
    const sameDayStart = new Date(eventDate);
    sameDayStart.setHours(0, 0, 0, 0);
    const sameDayEnd = new Date(eventDate);
    sameDayEnd.setHours(23, 59, 59, 999);

    const conflictingEvent = await this.prisma.event.findFirst({
      where: {
        id: { not: eventId },
        crewId,
        date: { gte: sameDayStart, lte: sameDayEnd },
      },
      select: { id: true, project: true, time: true },
    });

    if (conflictingEvent) {
      const label = conflictingEvent.time
        ? `${conflictingEvent.project} (${conflictingEvent.time})`
        : conflictingEvent.project;
      throw new HttpException(
        `Екіпаж вже призначено на іншу подію цього дня: ${label}`,
        HttpStatus.CONFLICT,
      );
    }

    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: { crewId: crewId },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true,
        preparation: true,
        history: { orderBy: { createdAt: 'desc' } },
      },
    });

    const hostId = event.crew?.hostId;
    const driverId = event.crew?.driverId;

    const dateStr = new Date(event.date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const timeStr = event.time ? `, ${event.time}` : '';

    const crewPayload = {
      eventId: event.id,
      eventDate: `${dateStr}${timeStr}`,
      schoolName: event.school?.name,
      cityName: event.city?.name,
      project: event.project,
      address: event.address,
      contactPerson: event.contactPerson,
      contactPhone: event.contactPhone,
    };

    if (hostId) {
      this.notificationsService
        .sendTelegramNotification(hostId, 'CREW_ASSIGNED', {
          ...crewPayload,
          role: 'ведучий',
        })
        .catch(() => {});
      this.notificationsService
        .create(hostId, 'CREW_ASSIGNED', {
          ...crewPayload,
          role: 'ведучий',
        })
        .catch(() => {});
    }
    if (driverId) {
      this.notificationsService
        .sendTelegramNotification(driverId, 'CREW_ASSIGNED', {
          ...crewPayload,
          role: 'водій',
        })
        .catch(() => {});
      this.notificationsService
        .create(driverId, 'CREW_ASSIGNED', {
          ...crewPayload,
          role: 'водій',
        })
        .catch(() => {});
    }

    await this.invalidateSchoolEventsCache(event.schoolId);
    return this.serializeEvent(event);
  }

  async getChatIdForUser(userId: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    if (user.telegramChatId) return user.telegramChatId;

    if (user.telegramId && /^\d+$/.test(user.telegramId))
      return user.telegramId;

    return null;
  }

  async findBySchool(schoolId: string, minimal = false) {
    const key = `events:school:${schoolId}:${minimal ? 'minimal' : 'full'}`;
    const cached = await this.cacheManager.get(key);
    if (cached)
      return (Array.isArray(cached) ? cached : []).map(
        (e: Record<string, unknown>) => this.serializeEvent(e),
      );

    const existing = this.pendingSchoolEvents.get(key);
    if (existing) {
      const result = await existing;
      return Array.isArray(result)
        ? result.map((e: Record<string, unknown>) => this.serializeEvent(e))
        : result;
    }

    const compute = this.computeBySchool(key, schoolId, minimal).then(
      (result) =>
        Array.isArray(result)
          ? result.map((e: Record<string, unknown>) => this.serializeEvent(e))
          : result,
    );
    this.pendingSchoolEvents.set(key, compute);
    try {
      return await compute;
    } finally {
      this.pendingSchoolEvents.delete(key);
    }
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        school: true,
        city: true,
        crew: { include: { host: true, driver: true } },
        preparation: true,
        history: { orderBy: { createdAt: 'desc' } },
        report: {
          include: {
            expenseItems: true,
            salaryRecords: true,
            inventoryUsages: true,
          },
        },
      },
    });
    if (!event) throw new AppException('EVENT_NOT_FOUND', HttpStatus.NOT_FOUND);
    return this.serializeEvent(event);
  }

  private async computeBySchool(
    key: string,
    schoolId: string,
    minimal: boolean,
  ) {
    let result;
    if (minimal) {
      result = await this.prisma.event.findMany({
        where: { schoolId },
        select: {
          id: true,
          project: true,
          date: true,
          time: true,
          status: true,
          price: true,
          childrenPlanned: true,
          address: true,
          contactPerson: true,
          contactPhone: true,
          crewId: true,
          crew: {
            select: { id: true, name: true, hostId: true, driverId: true },
          },
        },
        orderBy: { date: 'desc' },
      });
    } else {
      result = await this.prisma.event.findMany({
        where: { schoolId },
        include: {
          crew: { include: { host: true, driver: true } },
          history: { orderBy: { createdAt: 'desc' } },
          preparation: true,
        },
        orderBy: { date: 'desc' },
      });
    }

    await this.cacheManager.set(key, result, 15_000);
    return result;
  }

  async updateHistoryComment(historyId: string, comment: string) {
    const history = await this.prisma.eventHistory.update({
      where: { id: historyId },
      data: { comment: comment || null },
      include: { event: { select: { schoolId: true } } },
    });
    await this.invalidateSchoolEventsCache(history.event.schoolId);
    return history;
  }

  async addHistoryComment(eventId: string, comment: string, user: JwtUser) {
    await this.prisma.eventHistory.create({
      data: {
        eventId,
        action: 'Коментар',
        comment,
        userId: user.sub,
        userName: user.name,
        role: user.role,
      },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        history: { orderBy: { createdAt: 'desc' } },
      },
    });
    if (!event) return null;
    await this.invalidateSchoolEventsCache(event.schoolId);
    return this.serializeEvent(event);
  }

  async remove(id: string) {
    const exists = await this.prisma.event.findUnique({
      where: { id },
      include: {
        crew: { select: { hostId: true, driverId: true } },
        city: { select: { managerId: true } },
        school: { select: { name: true } },
      },
    });
    if (!exists)
      throw new AppException('EVENT_NOT_FOUND', HttpStatus.NOT_FOUND);

    await this.prisma.salaryRecord.deleteMany({
      where: { eventId: id },
    });

    await this.prisma.eventHistory.deleteMany({
      where: { eventId: id },
    });

    await this.prisma.eventPreparation.deleteMany({
      where: { eventId: id },
    });

    const deleted = await this.prisma.event.delete({
      where: { id },
    });
    await this.invalidateSchoolEventsCache(exists.schoolId);
    this.cacheVersion.bumpVersion('analytics').catch(() => {});

    this.notifyEventCancelled(exists);

    return this.serializeEvent(deleted as any);
  }

  async findCompletedBySchool(schoolId: string) {
    const events = await this.prisma.event.findMany({
      where: { schoolId, status: 'RE_SALE' },
      select: {
        id: true,
        project: true,
        date: true,
        status: true,
        price: true,
        childrenPlanned: true,
        report: {
          select: {
            childrenCount: true,
            classesCount: true,
            privilegedCount: true,
            showingsCount: true,
            totalSum: true,
            schoolSum: true,
            remainderSum: true,
            rating: true,
            expenseItems: {
              select: { category: true, name: true, amount: true },
            },
            salaryRecords: {
              select: { employeeId: true, amount: true, status: true },
            },
          },
        },
        history: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { date: 'desc' },
    });
    return events.map((e) => this.serializeEvent(e as any));
  }

  private async notifyManagerEventCreated(
    eventId: string,
    data: CreateEventDto,
  ) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id: eventId },
        select: {
          date: true,
          project: true,
          schoolId: true,
          city: { select: { managerId: true } },
          school: { select: { name: true } },
        },
      });
      const managerId = event?.city?.managerId;
      if (!managerId || !event) return;

      const dateStr = new Date(event.date).toLocaleDateString('uk-UA');
      this.notificationsService
        .create(managerId, 'EVENT_CREATED', {
          eventId,
          title: `Нова подія: ${event.school?.name ?? ''} (${dateStr})`,
        })
        .catch(() => {});

      this.notificationsService
        .sendTelegramNotification(managerId, 'EVENT_CREATED', {
          eventId,
          schoolName: event.school?.name,
          eventDate: event.date,
          project: event.project,
          schoolId: event.schoolId,
        })
        .catch(() => {});
    } catch {
      /* non-critical */
    }
  }

  private async notifyEventCancelled(event: {
    id: string;
    crew: { hostId: string | null; driverId: string | null } | null;
    city: { managerId: string | null } | null;
    school?: { name: string } | null;
    project?: string | null;
    date?: Date | string | null;
  }) {
    const title = 'Подію скасовано';
    const payload = {
      eventId: event.id,
      title,
      schoolName: event.school?.name,
      eventDate: event.date,
      project: event.project,
    };

    if (event.city?.managerId) {
      this.notificationsService
        .create(event.city.managerId, 'EVENT_CANCELLED', {
          eventId: event.id,
          title,
        })
        .catch(() => {});
      this.notificationsService
        .sendTelegramNotification(
          event.city.managerId,
          'EVENT_CANCELLED',
          payload,
        )
        .catch(() => {});
    }

    const crewIds = [event.crew?.hostId, event.crew?.driverId].filter(
      Boolean,
    ) as string[];
    for (const crewId of crewIds) {
      this.notificationsService
        .create(crewId, 'EVENT_CANCELLED', {
          eventId: event.id,
          title,
        })
        .catch(() => {});
      this.notificationsService
        .sendTelegramNotification(crewId, 'EVENT_CANCELLED', payload)
        .catch(() => {});
    }
  }
}
