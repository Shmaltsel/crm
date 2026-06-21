import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class IssuesService {
  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
  ) {}

  async create(data: {
    eventId: string;
    schoolName: string;
    eventName: string;
    message: string;
    cityId: string;
  }) {
    // 1. Зберігаємо проблему
    const issue = await this.prisma.issueReport.create({ data });

    // 2. Знаходимо менеджера міста
    const city = await this.prisma.city.findUnique({
      where: { id: data.cityId },
      include: {
        users: {
          where: { role: 'MANAGER' },
          take: 1,
        },
      },
    });

    const manager = city?.users?.[0];
    const chatId = manager?.telegramChatId ||
      (manager?.telegramId && /^\d+$/.test(manager.telegramId)
        ? manager.telegramId
        : null);

    // 3. Надсилаємо Telegram
    if (chatId) {
      const text =
        `🚨 <b>Нова проблема!</b>\n\n` +
        `🏫 <b>Заклад:</b> ${data.schoolName}\n` +
        `📅 <b>Подія:</b> ${data.eventName}\n\n` +
        `💬 <b>Повідомлення:</b>\n${data.message}\n\n` +
        `<i>Деталі у CRM: <a href="https://crm-tau-nine.vercel.app">crm-tau-nine.vercel.app</a></i>`;
      await this.telegramService.sendMessage(chatId, text);
    }

    return issue;
  }

  async findByCityId(cityId: string) {
    return this.prisma.issueReport.findMany({
      where: { cityId },
      include: {
        event: {
          include: { school: { select: { name: true } } },
        },
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
