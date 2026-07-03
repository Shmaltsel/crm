import {
  Inject,
  Injectable,
  Scope,
  BadRequestException,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { I18nService, Lang } from '../i18n/i18n.service';

const CONSTRAINT_LABELS: Record<string, { uk: string; en: string }> = {
  isNotEmpty: { uk: "Поле обов'язкове", en: 'This field is required' },
  isString: { uk: 'Має бути текстом', en: 'Must be a string' },
  isNumber: { uk: 'Має бути числом', en: 'Must be a number' },
  isEmail: { uk: 'Некоректний email', en: 'Invalid email' },
  isBoolean: { uk: 'Має бути true/false', en: 'Must be true/false' },
  isDateString: { uk: 'Некоректна дата', en: 'Invalid date' },
  min: { uk: 'Значення занадто мале', en: 'Value is too small' },
  max: { uk: 'Значення занадто велике', en: 'Value is too large' },
  minLength: { uk: 'Занадто короткий текст', en: 'Text is too short' },
  maxLength: { uk: 'Занадто довгий текст', en: 'Text is too long' },
  whitelistValidation: {
    uk: 'Зайве поле у запиті',
    en: 'Unexpected field in request',
  },
};

@Injectable({ scope: Scope.REQUEST })
export class LocalizedValidationPipe extends ValidationPipe {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly i18n: I18nService,
  ) {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const lang: Lang = this.i18n.detectLang(
          this.request?.headers?.['accept-language'],
        );
        const message = errors.flatMap((err) => this.formatError(err, lang));
        return new BadRequestException({
          statusCode: 400,
          error: lang === 'en' ? 'Validation failed' : 'Помилка валідації',
          message,
        });
      },
    });
  }

  private formatError(error: ValidationError, lang: Lang): string[] {
    const messages: string[] = [];
    if (error.constraints) {
      for (const key of Object.keys(error.constraints)) {
        const label = CONSTRAINT_LABELS[key];
        const text = label ? label[lang] : error.constraints[key];
        messages.push(`${error.property}: ${text}`);
      }
    }
    if (error.children?.length) {
      for (const child of error.children) {
        messages.push(...this.formatError(child, lang));
      }
    }
    return messages;
  }
}
