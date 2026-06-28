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
      const chatId = String(msg.chat.id);
      const username = msg.from?.username; // це те, що користувач має в налаштуваннях Telegram (без @)

      if (!username) {
        await this.bot.sendMessage(
          chatId,
          "⚠️ У вашому профілі Telegram не вказано username. Будь ласка, додайте його в налаштуваннях Telegram, щоб ми могли підв'язати акаунт.",
        );
        return;
      }

      // Нормалізуємо username: видаляємо всі "@" на випадок, якщо хтось ввів їх у CRM
      const normalizedUsername = username.toLowerCase();

      // Шукаємо користувача, де telegramId співпадає з username
      // Ми використовуємо updateMany, щоб покрити всі можливі записи
      const result = await this.prisma.user.updateMany({
        where: {
          telegramId: {
            equals: normalizedUsername,
            mode: 'insensitive', // пошук без урахування регістру (Svitlo != svitlo)
          },
        },
        data: { telegramChatId: chatId },
      });

      if (result.count > 0) {
        this.logger.log(
          `[/start] chatId=${chatId} username=${normalizedUsername} — успішно підв'язано`,
        );
        await this.bot.sendMessage(
          chatId,
          `✅ Вітаємо! Ваш акаунт успішно підключено до <b>Світло Знань CRM</b>.`,
          { parse_mode: 'HTML' },
        );
      } else {
        this.logger.warn(
          `[/start] Користувача з username "${normalizedUsername}" не знайдено в CRM.`,
        );
        await this.bot.sendMessage(
          chatId,
          `❌ Акаунт не знайдено. Переконайтеся, що в CRM у вашому профілі вказано нікнейм <b>${normalizedUsername}</b> без помилок.`,
          { parse_mode: 'HTML' },
        );
      }
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
