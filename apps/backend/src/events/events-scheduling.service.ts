import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

@Injectable()
export class EventsSchedulingService {
  private readonly logger = new Logger(EventsSchedulingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private telegramService: TelegramService,
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
    const msg =
      `📅 <b>Подію перенесено!</b>\n\n` +
      `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
      `🎪 <b>Проєкт:</b> ${event.project}\n` +
      `📅 <b>Нова дата:</b> ${dateStr} о ${newTime}\n` +
      `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
      (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
      `\n<i>Деталі у CRM: <a href="-https://app.svitlo-znan.app">Посилання</a></i>`;

    const sendTo = async (userId: string | null | undefined) => {
      if (!userId) return;
      const u = await this.prisma.user.findUnique({ where: { id: userId } });
      const chatId =
        u?.telegramChatId ||
        (u?.telegramId && /^\d+$/.test(u.telegramId) ? u.telegramId : null);
      if (chatId) await this.telegramService.sendMessage(chatId, msg);
    };

    await sendTo(event.crew?.hostId);
    await sendTo(event.crew?.driverId);

    await this.invalidateSchoolEventsCache(event.schoolId);
    return this.serializeEvent(event);
  }
}
