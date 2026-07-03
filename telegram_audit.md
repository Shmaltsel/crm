# Аудит: Telegram Bot та Запуск

### `apps/backend/src/telegram/telegram.module.ts`

```typescript
import { Module, forwardRef } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, forwardRef(() => UsersModule)],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}

```

---

### `apps/backend/src/telegram/telegram.service.ts`

```typescript
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

```

---

### `apps/backend/src/main.ts`

```typescript
import './instrument';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.use(cookieParser());

  const allowedOrigins = (process.env.FRONTEND_URL ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(app.get(AllExceptionsFilter));

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('CRM «Світло Знань» API')
      .setDescription(
        'Система управління освітніми заходами у школах та садочках',
      )
      .setVersion('1.0')
      .addCookieAuth('access_token')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.getHttpAdapter().get('/docs-json', (req, res) => res.json(document));
    app.getHttpAdapter().get('/docs/redoc', (req, res) => {
      res.type('html').send(`<!DOCTYPE html>
<html><head><title>CRM API Docs</title>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>body{margin:0;padding:0}</style></head>
<body><redoc spec-url="/docs-json"></redoc>
<script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
</body></html>`);
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

```

---

### `apps/backend/package.json`

```json
{
  "name": "backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "seed:demo": "node prisma/seed-demo.js"
  },
  "dependencies": {
    "@nest-lab/throttler-storage-redis": "^1.0.0",
    "@nestjs/cache-manager": "^3.1.3",
    "@nestjs/common": "^11.0.1",
    "@nestjs/config": "^4.0.0",
    "@nestjs/core": "^11.0.1",
    "@nestjs/jwt": "^11.0.2",
    "@nestjs/passport": "^11.0.5",
    "@nestjs/platform-express": "^11.0.1",
    "@nestjs/swagger": "^11.4.5",
    "@nestjs/terminus": "^11.1.1",
    "@nestjs/throttler": "^6.5.0",
    "@prisma/client": "6.19.0",
    "@sentry/nestjs": "^9.47.1",
    "@sentry/profiling-node": "^9.47.1",
    "axios": "^1.18.0",
    "bcrypt": "^6.0.0",
    "cache-manager": "^7.2.9",
    "cache-manager-redis-yet": "^5.1.5",
    "cheerio": "^1.2.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.15.1",
    "cookie-parser": "^1.4.7",
    "dotenv": "^17.4.2",
    "helmet": "^8.2.0",
    "ioredis": "^5.4.1",
    "joi": "^18.2.3",
    "nestjs-pino": "^4.6.1",
    "node-telegram-bot-api": "0.64.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "pino-http": "^11.0.0",
    "prom-client": "^15.1.3",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.2.0",
    "@eslint/js": "^9.18.0",
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.1",
    "@types/bcrypt": "^6.0.0",
    "@types/cookie-parser": "^1.4.10",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.0.0",
    "@types/node": "^24.0.0",
    "@types/node-telegram-bot-api": "^0.64.15",
    "@types/passport-jwt": "^4.0.1",
    "@types/supertest": "^7.0.0",
    "eslint": "^9.18.0",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.2",
    "globals": "^17.0.0",
    "jest": "^29.0.0",
    "jest-mock-extended": "^3.0.0",
    "pino-pretty": "^13.0.0",
    "prettier": "^3.4.2",
    "prisma": "6.19.0",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.3",
    "typescript-eslint": "^8.20.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "moduleNameMapper": {
      "^src/(.*)$": "<rootDir>/$1"
    }
  },
  "prisma": {
    "schema": "prisma/schema.prisma"
  }
}

```

---

### `package.json`

```json
{
  "name": "CRM",
  "private": true,
  "scripts": {
    "dev": "concurrently \"pnpm --filter backend start:dev\" \"pnpm --filter frontend dev\"",
    "test": "concurrently --kill-others-on-fail \"pnpm --filter backend test\" \"pnpm --filter frontend test:run\"",
    "test:unit": "concurrently \"pnpm --filter backend test\" \"pnpm --filter frontend test:run\"",
    "test:e2e:backend": "pnpm --filter backend test:e2e",
    "test:e2e:frontend": "pnpm --filter frontend test:e2e",
    "test:e2e": "concurrently --kill-others-on-fail \"pnpm test:e2e:backend\" \"pnpm test:e2e:frontend\"",
    "test:all": "pnpm test:unit && pnpm test:e2e",
    "test:coverage": "concurrently \"pnpm --filter backend test:cov\" \"pnpm --filter frontend test:coverage\"",
    "seed:demo": "pnpm --filter backend seed:demo"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  },
  "prisma": {
    "schema": "apps/backend/prisma/schema.prisma"
  }
}

```

---

