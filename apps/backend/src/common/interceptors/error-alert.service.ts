import { Injectable, Logger } from '@nestjs/common';
import { TelegramService } from '../../telegram/telegram.service';
import { getTelegramTemplate } from '../../notifications/templates';

const WINDOW_MS = 5 * 60 * 1000;
const THRESHOLD = 10;
const COOLDOWN_MS = 30 * 60 * 1000;

@Injectable()
export class ErrorAlertService {
  private readonly logger = new Logger(ErrorAlertService.name);
  private errors: number[] = [];
  private lastAlertAt = 0;

  constructor(private readonly telegram: TelegramService) {}

  recordError(status: number): void {
    if (status < 500) return;
    const now = Date.now();
    this.errors.push(now);
    this.errors = this.errors.filter((t) => now - t < WINDOW_MS);

    if (
      this.errors.length >= THRESHOLD &&
      now - this.lastAlertAt > COOLDOWN_MS
    ) {
      this.lastAlertAt = now;
      this.sendAlert(this.errors.length).catch(() => {});
    }
  }

  private async sendAlert(count: number): Promise<void> {
    const chatId = process.env.ALERT_CHAT_ID;
    if (!chatId) return;

    const template = getTelegramTemplate('ERROR_ALERT_5XX');
    const text = template ? template({ count }) : '';

    try {
      await this.telegram.sendMessage(chatId, text);
      this.logger.warn(`Алерт надіслано: ${count} помилок 5xx`);
    } catch (e) {
      this.logger.error(`Не вдалося надіслати алерт: ${(e as Error).message}`);
    }
  }
}
