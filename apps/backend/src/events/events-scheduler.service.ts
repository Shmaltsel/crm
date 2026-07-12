import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EventsSchedulerService implements OnModuleInit {
  private readonly logger = new Logger(EventsSchedulerService.name);

  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
    private notificationsService: NotificationsService,
  ) {}

  onModuleInit() {
    this.scheduleDailyCheck();
    this.scheduleDailySummary();
  }

  private scheduleDailyCheck() {
    const check = async () => {
      this.logger.log('Автоматична перевірка подій на завтра...');
      await this.checkEventsForTomorrow();
    };

    check().catch((err) =>
      this.logger.error('Помилка першої перевірки подій:', err),
    );

    setInterval(
      () => {
        check().catch((err) =>
          this.logger.error('Помилка перевірки подій:', err),
        );
      },
      24 * 60 * 60 * 1000,
    );
  }

  private scheduleDailySummary() {
    const run = async () => {
      const now = new Date();
      if (now.getHours() !== 8 || now.getMinutes() > 5) return;
      this.logger.log('Відправка щоденного підсумку...');
      await this.sendDailySummary();
    };

    setInterval(run, 60 * 60 * 1000);
  }

  async checkEventsForTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

    const events = await this.prisma.event.findMany({
      where: {
        date: { gte: startOfTomorrow, lte: endOfTomorrow },
        status: { not: 'RE_SALE' },
      },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true,
      },
    });

    for (const event of events) {
      if (event.crew) {
        await this.sendReminder(event, event.crew.host, 'ведучий');
        await this.sendReminder(event, event.crew.driver, 'водій');
      }
    }
  }

  private async sendDailySummary() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

    const [tomorrowEvents, pendingReports, pendingDaysOff] = await Promise.all([
      this.prisma.event.count({
        where: {
          date: { gte: startOfTomorrow, lte: endOfTomorrow },
          status: { not: 'RE_SALE' },
        },
      }),
      this.prisma.eventReport.count({ where: { status: 'SUBMITTED' } }),
      this.prisma.dayOff.count({}),
    ]);

    const lines = [`📊 <b>Щоденний підсумок</b>`, ``];
    lines.push(`📅 Подій на завтра: <b>${tomorrowEvents}</b>`);
    lines.push(`📋 Незатверджених звітів: <b>${pendingReports}</b>`);
    lines.push(`🌴 Очікують вихідних: <b>${pendingDaysOff}</b>`);
    const text = lines.join('\n');

    const managers = await this.prisma.user.findMany({
      where: { role: { in: ['SUPERADMIN', 'OWNER', 'MANAGER'] } },
      select: { telegramChatId: true },
    });

    for (const m of managers) {
      if (m.telegramChatId) {
        this.telegramService.sendMessage(m.telegramChatId, text).catch(() => {});
      }
    }
  }

  private async sendReminder(event: any, user: any, roleLabel: string) {
    if (!user || (!user.telegramChatId && !user.telegramId)) return;

    const chatId = user.telegramChatId || user.telegramId;
    const message =
      `🔔 <b>Нагадування про подію!</b>\n\n` +
      `👤 <b>Роль:</b> ${roleLabel}\n` +
      `📅 <b>Дата:</b> завтра\n` +
      `🏫 <b>Заклад:</b> ${event.school?.name || '—'}\n` +
      `🎪 <b>Проєкт:</b> ${event.project}\n` +
      `📞 <b>Контакт:</b> ${event.contactPhone || '—'}`;

    try {
      await this.telegramService.sendMessage(chatId, message);
    } catch (e) {
      this.logger.error(`Помилка відправки: ${e}`);
    }

    this.notificationsService
      .create(user.id, 'EVENT_REMINDER', {
        eventId: event.id,
        project: event.project,
        schoolName: event.school?.name,
        role: roleLabel,
      })
      .catch(() => {});
  }
}
