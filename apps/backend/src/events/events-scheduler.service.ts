import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EventsSchedulerService {
  private readonly logger = new Logger(EventsSchedulerService.name);

  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  @Cron('0 20 * * *', { timeZone: 'Europe/Kyiv' })
  async handleEventsForTomorrow() {
    this.logger.log('Автоматична перевірка подій на завтра...');
    await this.checkEventsForTomorrow();
  }

  @Cron('0 8 * * *', { timeZone: 'Europe/Kyiv' })
  async handleDailySummary() {
    this.logger.log('Відправка щоденного підсумку...');
    await this.sendDailySummary();
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

    const managers = await this.prisma.user.findMany({
      where: { role: { in: ['SUPERADMIN', 'OWNER', 'MANAGER'] } },
      select: { id: true },
    });

    this.notificationsService
      .sendTelegramToUsers(
        managers.map((m) => m.id),
        'DAILY_DIGEST',
        { tomorrowEvents, pendingReports, pendingDaysOff },
      )
      .catch(() => {});
  }

  private async sendReminder(event: any, user: any, roleLabel: string) {
    if (!user) return;

    this.notificationsService
      .sendTelegramNotification(user.id, 'EVENT_REMINDER', {
        eventId: event.id,
        role: roleLabel,
        schoolName: event.school?.name,
        project: event.project,
        contactPhone: event.contactPhone,
      })
      .catch(() => {});

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
