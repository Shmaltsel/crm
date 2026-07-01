import {
  Injectable,
  Logger,
  OnModuleInit,
  Inject,
  forwardRef,
} from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { UsersService } from '../users/users.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || process.env.NODE_ENV === 'test') {
      this.logger.warn(
        'TELEGRAM_BOT_TOKEN не задано або тестове середовище — бот вимкнено',
      );
      return;
    }
    this.bot = new TelegramBot(token, { polling: true });
    this.logger.log('Telegram бот ініціалізовано');

    this.bot.onText(/\/start/, async (msg) => {
      const chatId = String(msg.chat.id);
      const username = msg.from?.username;

      if (!username) {
        await this.bot.sendMessage(
          chatId,
          "⚠️ У вашому профілі Telegram не вказано username. Будь ласка, додайте його в налаштуваннях Telegram, щоб ми могли підв'язати акаунт.",
        );
        return;
      }

      const normalizedUsername = username.toLowerCase();

      const result = await this.usersService.updateTelegramChatId(
        normalizedUsername,
        chatId,
      );

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
      `Увійдіть за посиланням: <a href="https://crm-frontend-psi-sable.vercel.app">crm-frontend-psi-sable.vercel.app</a>\n\n` +
      `<i>Змініть пароль після першого входу.</i>`;

    await this.sendMessage(chatId, text);
  }
}
