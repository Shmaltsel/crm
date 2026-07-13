import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { FeatureFlagsService } from '../common/feature-flags/feature-flags.service';
import {
  getTelegramTemplate,
  type TelegramTemplateType,
} from './templates';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
    private featureFlags: FeatureFlagsService,
  ) {}

  async create(userId: string, type: string, payload: Record<string, unknown>) {
    return this.prisma.notification.create({
      data: { userId, type, payload: payload as Prisma.InputJsonValue },
    });
  }

  async findAll(userId: string, page = 1, take = 20) {
    const where = { userId };
    const [items, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * take,
        take,
      }),
      this.prisma.notification.count({ where }),
    ]);
    return { items, total, page, pageCount: Math.ceil(total / take) };
  }

  async unreadCount(userId: string) {
    return this.prisma.notification.count({
      where: { userId, readAt: null },
    });
  }

  async markRead(id: string, userId: string) {
    return this.prisma.notification.updateMany({
      where: { id, userId },
      data: { readAt: new Date() },
    });
  }

  async markAllRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, readAt: null },
      data: { readAt: new Date() },
    });
  }

  /**
   * Надіслати Telegram-повідомлення конкретному користувачу за шаблоном.
   * Не кидає винятків — помилки логуються.
   */
  async sendTelegramNotification(
    userId: string,
    type: TelegramTemplateType,
    payload: Record<string, unknown>,
  ): Promise<void> {
    if (!this.featureFlags.isEnabled('TELEGRAM_NOTIFICATIONS')) return;

    const template = getTelegramTemplate(type);
    if (!template) {
      this.logger.warn(`No Telegram template for type: ${type}`);
      return;
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { telegramChatId: true, telegramId: true, name: true },
      });
      if (!user) return;

      const chatId =
        user.telegramChatId ||
        (user.telegramId && /^\d+$/.test(user.telegramId)
          ? user.telegramId
          : null);
      if (!chatId) return;

      await this.telegramService.sendMessage(chatId, template(payload));
    } catch (err) {
      this.logger.warn(
        `Telegram send failed for user=${userId} type=${type}: ${err}`,
      );
    }
  }

  /**
   * Масова розсилка Telegram-повідомлень за шаблоном.
   * Не кидає винятків — помилки логуються.
   */
  async sendTelegramToUsers(
    userIds: string[],
    type: TelegramTemplateType,
    payload: Record<string, unknown>,
  ): Promise<void> {
    if (!this.featureFlags.isEnabled('TELEGRAM_NOTIFICATIONS')) return;

    const template = getTelegramTemplate(type);
    if (!template) {
      this.logger.warn(`No Telegram template for type: ${type}`);
      return;
    }

    const text = template(payload);

    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, telegramChatId: true, telegramId: true },
    });

    for (const user of users) {
      const chatId =
        user.telegramChatId ||
        (user.telegramId && /^\d+$/.test(user.telegramId)
          ? user.telegramId
          : null);
      if (!chatId) continue;

      this.telegramService.sendMessage(chatId, text).catch((err) => {
        this.logger.warn(
          `Telegram send failed for user=${user.id} type=${type}: ${err}`,
        );
      });
    }
  }

  /**
   * Знайти ID всіх OWNER + SUPERADMIN.
   */
  async getAdminIds(): Promise<string[]> {
    const admins = await this.prisma.user.findMany({
      where: { role: { in: ['OWNER', 'SUPERADMIN'] } },
      select: { id: true },
    });
    return admins.map((a) => a.id);
  }
}
