# Файли конфігурації, Main, AppModule та Seeder

### `apps/backend/src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const allowedOrigins = (process.env.FRONTEND_URL ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

```

---

### `apps/backend/src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { CitiesModule } from './cities/cities.module';
import { SchoolsModule } from './schools/schools.module';
import { FinanceModule } from './finance/finance.module';
import { TelegramModule } from './telegram/telegram.module';
import { IssuesModule } from './issues/issues.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProjectsModule } from './projects/projects.module';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    UsersModule,
    AuthModule,
    EventsModule,
    CitiesModule,
    SchoolsModule,
    FinanceModule,
    FinanceModule,
    TelegramModule,
    IssuesModule,
    DashboardModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

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
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/core": "^11.0.1",
    "@nestjs/jwt": "^11.0.2",
    "@nestjs/passport": "^11.0.5",
    "@nestjs/platform-express": "^11.0.1",
    "@nestjs/throttler": "^6.5.0",
    "@prisma/client": "6.19.0",
    "axios": "^1.18.0",
    "bcrypt": "^6.0.0",
    "cheerio": "^1.2.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.15.1",
    "cookie-parser": "^1.4.7",
    "dotenv": "^17.4.2",
    "node-telegram-bot-api": "0.64.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
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

### `apps/backend/prisma/seed-admin.js`

```javascript
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      'Помилка: SEED_ADMIN_EMAIL та SEED_ADMIN_PASSWORD мають бути задані в .env',
    );
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log('Починаю створення адміна...');

  const admin = await prisma.user.upsert({
    where: { email: email },
    update: { password: hashedPassword },
    create: {
      name: 'Адміністратор',
      email: email,
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  });

  console.log('Адмін успішно створений або оновлений:', admin.email);
}

main()
  .catch((e) => {
    console.error('Помилка під час сідування:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

```

---

### `apps/backend/src/auth/csrf.guard.ts`

```typescript
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return true;

    const cookieToken = req.cookies?.csrf_token;
    const headerToken = req.headers['x-csrf-token'];
    if (!cookieToken || cookieToken !== headerToken) {
      throw new ForbiddenException('CSRF token invalid');
    }
    return true;
  }
}

```

---

### `apps/backend/.env`

```bash
# Environment variables declared in this file are NOT automatically loaded by Prisma.
# Please add `import "dotenv/config";` to your `prisma.config.ts` file, or use the Prisma CLI with Bun
# to load environment variables from .env files: https://pris.ly/prisma-config-env-vars.

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

VITE_API_URL=***
DATABASE_URL=***
DIRECT_URL=***
TELEGRAM_BOT_TOKEN=***
SEED_ADMIN_EMAIL=***
SEED_ADMIN_PASSWORD=***
```

---

