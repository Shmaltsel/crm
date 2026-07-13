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
import { CRM_LINK } from '../notifications/templates';

const LOCK_KEY = 'telegram:bot:leader';
const LOCK_TTL_MS = 15_000;
const RETRY_MS = 5_000;
const SEND_TIMEOUT_MS = 5_000;
const SEND_MAX_RETRIES = 3;

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

  private isNetworkError(e: any): boolean {
    if (e.code === 'TIMEOUT') return true;
    if (
      e.code === 'ECONNRESET' ||
      e.code === 'ETIMEDOUT' ||
      e.code === 'ECONNREFUSED' ||
      e.code === 'ENOTFOUND'
    )
      return true;
    if (e.response?.statusCode && e.response.statusCode < 500) return false;
    return !e.response;
  }

  private async sendWithRetry(
    chatId: string,
    text: string,
    attempt = 1,
  ): Promise<void> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, SEND_TIMEOUT_MS);

    try {
      const promise = this.bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
      });
      await Promise.race([
        promise,
        new Promise<never>((_, reject) => {
          controller.signal.addEventListener('abort', () => {
            reject(
              Object.assign(new Error('Request timeout'), { code: 'TIMEOUT' }),
            );
          });
        }),
      ]);
      clearTimeout(timeoutId);
      this.logger.log(`Повідомлення надіслано ${chatId}`);
    } catch (e: any) {
      clearTimeout(timeoutId);
      if (this.isNetworkError(e) && attempt < SEND_MAX_RETRIES) {
        const delay = Math.pow(2, attempt - 1) * 1000;
        this.logger.warn(
          `[sendMessage] мережева помилка (спроба ${attempt}/${SEND_MAX_RETRIES}), повтор через ${delay}ms: ${e.message}`,
        );
        await new Promise((r) => setTimeout(r, delay));
        return this.sendWithRetry(chatId, text, attempt + 1);
      }
      this.logger.error(
        `Не вдалося надіслати повідомлення ${chatId}: ${e.message}`,
      );
    }
  }

  async sendMessage(chatId: string, text: string): Promise<void> {
    if (!this.bot) {
      this.logger.warn(
        `sendMessage(${chatId}) пропущено — бот не ініціалізований на цьому інстансі (не лідер або TELEGRAM_BOT_TOKEN не задано)`,
      );
      return;
    }
    await this.sendWithRetry(chatId, text);
  }

  async sendWithInlineKeyboard(
    chatId: string,
    text: string,
    buttons: { text: string; callbackData: string }[][],
  ): Promise<number | null> {
    if (!this.bot) return null;
    try {
      const msg = await this.bot.sendMessage(chatId, text, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: buttons.map((row) =>
            row.map((b) => ({ text: b.text, callback_data: b.callbackData })),
          ),
        },
      });
      return msg.message_id;
    } catch (e: unknown) {
      const err = e as { message?: string };
      this.logger.error(
        `Не вдалося надіслати повідомлення з клавіатурою ${chatId}: ${err.message}`,
      );
      return null;
    }
  }

  async editMessageText(
    chatId: string,
    messageId: number,
    text: string,
  ): Promise<void> {
    if (!this.bot) return;
    try {
      await this.bot.editMessageText(text, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
      });
    } catch (e: unknown) {
      const err = e as { message?: string };
      this.logger.warn(
        `Не вдалося редагувати повідомлення ${chatId}:${messageId}: ${err.message}`,
      );
    }
  }

  async answerCallbackQuery(
    callbackQueryId: string,
    text?: string,
  ): Promise<void> {
    if (!this.bot) return;
    try {
      await this.bot.answerCallbackQuery(callbackQueryId, { text });
    } catch (e: unknown) {
      const err = e as { message?: string };
      this.logger.warn(`Не вдалося відповісти на callback: ${err.message}`);
    }
  }

  onCallbackQuery(handler: (query: TelegramBot.CallbackQuery) => void): void {
    if (!this.bot) return;
    this.bot.on('callback_query', handler);
  }

  async sendWelcome(
    chatId: string,
    name: string,
    email: string,
    _password: string,
  ): Promise<void> {
    const text =
      `👋 <b>Вітаємо у Світло Знань CRM!</b>\n\n` +
      `Ваш акаунт створено.\n\n` +
      `📧 <b>Логін:</b> <code>${email}</code>\n\n` +
      `Увійдіть за посиланням: <a href="${CRM_LINK}">${CRM_LINK}</a>\n\n` +
      `<i>Пароль було надіслано окремо. Змініть його після першого входу.</i>`;

    await this.sendMessage(chatId, text);
  }
}
