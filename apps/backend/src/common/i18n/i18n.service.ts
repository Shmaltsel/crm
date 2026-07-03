import { Injectable } from '@nestjs/common';
import { MESSAGES, MessageKey } from './messages';

export type Lang = 'uk' | 'en';

@Injectable()
export class I18nService {
  translate(key: MessageKey, lang: Lang = 'uk'): string {
    return MESSAGES[key]?.[lang] ?? MESSAGES[key]?.uk ?? key;
  }

  detectLang(acceptLanguage?: string): Lang {
    if (acceptLanguage?.toLowerCase().startsWith('en')) return 'en';
    return 'uk';
  }
}
