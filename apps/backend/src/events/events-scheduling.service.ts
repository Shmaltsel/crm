import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

@Injectable()
export class EventsSchedulingService {
  private readonly logger = new Logger(EventsSchedulingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private notificationsService: NotificationsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  private async invalidateSchoolEventsCache(schoolId: string) {
    await Promise.all([
      this.cacheManager.del(`events:school:${schoolId}:minimal`),
      this.cacheManager.del(`events:school:${schoolId}:full`),
    ]);
  }

  async rescheduleEvent(
    eventId: string,
    newDate: string,
    newTime: string,
    user: JwtUser,
  ) {
    const event = await this.prisma.$transaction(async (tx) => {
      const ev = await tx.event.update({
        where: { id: eventId },
        data: {
          date: new Date(newDate),
          time: newTime,
          history: {
            create: {
              action: `Подію перенесено на ${new Date(newDate).toLocaleDateString('uk-UA')} о ${newTime}`,
              userId: user.sub,
              userName: user.name,
              role: user.role,
            },
          },
        },
        include: {
          crew: { include: { host: true, driver: true } },
          school: true,
          city: true,
          history: { orderBy: { createdAt: 'desc' } },
        },
      });

      await tx.schoolComment.create({
        data: {
          schoolId: ev.schoolId,
          authorId: user.sub,
          type: 'RESCHEDULE',
          text: `Подію "${ev.project}" перенесено на ${new Date(newDate).toLocaleDateString('uk-UA')} о ${newTime}`,
        },
      });

      return ev;
    });

    const dateStr = new Date(newDate).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const crewIds = [event.crew?.hostId, event.crew?.driverId].filter(
      Boolean,
    ) as string[];
    if (crewIds.length > 0) {
      this.notificationsService.sendTelegramToUsers(crewIds, 'EVENT_RESCHEDULED', {
        eventId: event.id,
        project: event.project,
        schoolName: event.school?.name,
        newDate: dateStr,
        newTime,
        cityName: event.city?.name,
        address: event.address,
      });
    }

    const payload = {
      eventId: event.id,
      project: event.project,
      schoolName: event.school?.name,
      newDate: dateStr,
      newTime,
    };
    if (event.crew?.hostId) {
      this.notificationsService
        .create(event.crew.hostId, 'EVENT_RESCHEDULED', payload)
        .catch(() => {});
    }
    if (event.crew?.driverId) {
      this.notificationsService
        .create(event.crew.driverId, 'EVENT_RESCHEDULED', payload)
        .catch(() => {});
    }

    await this.invalidateSchoolEventsCache(event.schoolId);
    return this.serializeEvent(event);
  }
}
