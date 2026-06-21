import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      this.logger.warn('TELEGRAM_BOT_TOKEN не задано — бот вимкнено');
      return;
    }
    this.bot = new TelegramBot(token, { polling: true });
    this.logger.log('Telegram бот ініціалізовано');

    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      const username = msg.from?.username;

      await this.prisma.user.updateMany({
        where: { telegramId: username ? `@${username}` : String(chatId) },
        data: { telegramChatId: String(chatId) },
      });

      await this.bot.sendMessage(
        chatId,
        `👋 Вітаємо у <b>Світло Знань CRM</b>!\n\nВаш акаунт підключено до сповіщень.`,
        { parse_mode: 'HTML' },
      );
    });
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
      `Увійдіть за посиланням: <a href="https://crm-tau-nine.vercel.app">crm-tau-nine.vercel.app</a>\n\n` +
      `<i>Змініть пароль після першого входу.</i>`;

    await this.sendMessage(chatId, text);
  }
}
