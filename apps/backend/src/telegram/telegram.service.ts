import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      this.logger.warn('TELEGRAM_BOT_TOKEN не задано — бот вимкнено');
      return;
    }
    this.bot = new TelegramBot(token, { polling: false });
    this.logger.log('Telegram бот ініціалізовано');
  }

  async sendMessage(telegramId: string, text: string): Promise<void> {
    if (!this.bot) return;
    try {
      await this.bot.sendMessage(telegramId, text, { parse_mode: 'HTML' });
    } catch (e: any) {
      this.logger.error(`Не вдалося надіслати повідомлення ${telegramId}: ${e.message}`);
    }
  }

  async sendWelcome(telegramId: string, name: string, email: string, password: string): Promise<void> {
    const text =
      `👋 <b>Вітаємо у Світло Знань CRM!</b>\n\n` +
      `Ваш акаунт створено.\n\n` +
      `📧 <b>Логін:</b> <code>${email}</code>\n` +
      `🔑 <b>Пароль:</b> <code>${password}</code>\n\n` +
      `Увійдіть за посиланням: <a href="https://crm-tau-nine.vercel.app">crm-tau-nine.vercel.app</a>\n\n` +
      `<i>Змініть пароль після першого входу.</i>`;

    await this.sendMessage(telegramId, text);
  }
}
