import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class EventsSchedulerService implements OnModuleInit {
  private readonly logger = new Logger(EventsSchedulerService.name);

  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
  ) {}

  onModuleInit() {
    this.scheduleDailyCheck();
  }

  private scheduleDailyCheck() {
    const check = async () => {
      this.logger.log('Автоматична перевірка подій на завтра...');
      await this.checkEventsForTomorrow();
    };

    check();

    setInterval(check, 24 * 60 * 60 * 1000);
  }

  async checkEventsForTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

    const events = await this.prisma.event.findMany({
      where: {
        date: { gte: startOfTomorrow, lte: endOfTomorrow },
        status: { not: 'RE_SALE' }
      },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true
      }
    });

    for (const event of events) {
      if (event.crew) {
        await this.sendReminder(event, event.crew.host, 'ведучий');
        await this.sendReminder(event, event.crew.driver, 'водій');
      }
    }
  }

  private async sendReminder(event: any, user: any, roleLabel: string) {
    if (!user || (!user.telegramChatId && !user.telegramId)) return;

    const chatId = user.telegramChatId || user.telegramId;
    const message = `🔔 <b>Нагадування про подію!</b>\n\n` +
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
  }
}
