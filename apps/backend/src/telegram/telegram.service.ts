import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
  forwardRef,
} from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import Redis from 'ioredis';
import { randomUUID } from 'crypto';
import { UsersService } from '../users/users.service';

const LOCK_KEY = 'telegram:bot:leader';
const LOCK_TTL_MS = 15_000;
const RETRY_MS = 5_000;

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);
  private readonly instanceId = randomUUID();
  private readonly redis = new Redis(
    process.env.REDIS_URL ?? 'redis://localhost:6379',
  );
  private lockTimer?: NodeJS.Timeout;
  private retryTimer?: NodeJS.Timeout;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  onModuleInit() {
    this.redis.on('error', (err: Error) =>
      this.logger.warn(`Redis lock connection error: ${err.message}`),
    );

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || process.env.NODE_ENV === 'test') {
      this.logger.warn(
        'TELEGRAM_BOT_TOKEN не задано або тестове середовище — бот вимкнено',
      );
      return;
    }
    void this.tryBecomeLeader(token);
  }

  async onModuleDestroy() {
    clearTimeout(this.retryTimer);
    clearInterval(this.lockTimer);
    if (this.bot) await this.bot.stopPolling();
    const current = await this.redis.get(LOCK_KEY);
    if (current === this.instanceId) await this.redis.del(LOCK_KEY);
    this.redis.disconnect();
  }

  private async tryBecomeLeader(token: string) {
    let acquired: string | null;
    try {
      acquired = await this.redis.set(
        LOCK_KEY,
        this.instanceId,
        'PX',
        LOCK_TTL_MS,
        'NX',
      );
    } catch (e) {
      this.logger.warn(
        `Не вдалося отримати lock, повторю пізніше: ${(e as Error).message}`,
      );
      this.retryTimer = setTimeout(() => this.tryBecomeLeader(token), RETRY_MS);
      return;
    }
    if (!acquired) {
      this.retryTimer = setTimeout(() => this.tryBecomeLeader(token), RETRY_MS);
      return;
    }

    this.bot = new TelegramBot(token, { polling: true });
    this.logger.log(`Telegram бот ініціалізовано (leader=${this.instanceId})`);
    this.lockTimer = setInterval(() => {
      this.redis
        .set(LOCK_KEY, this.instanceId, 'PX', LOCK_TTL_MS, 'XX')
        .catch((e: Error) =>
          this.logger.warn(`Не вдалося продовжити lock: ${e.message}`),
        );
    }, LOCK_TTL_MS / 3);

    this.bot.onText(/\/start/, (msg) => {
      void this.handleStartCommand(msg);
    });
  }

  private async handleStartCommand(msg: TelegramBot.Message): Promise<void> {
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
