# Файли Auth, Security та Prisma Schema

### `apps/backend/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id             String       @id @default(uuid())
  name           String
  email          String       @unique
  phone          String?
  password       String
  role           UserRole     @default(MANAGER)
  cityId         String?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  telegramId     String?
  telegramChatId String?
  car            String?
  balance        Decimal      @default(0) @db.Decimal(12, 2)
  managedCities  City[]       @relation("CityManager")
  crewAsDriver   Crew[]       @relation("DriverCrew")
  crewAsHost     Crew[]       @relation("HostCrew")
  city           City?        @relation(fields: [cityId], references: [id])
  salaryItems    SalaryItem[]

  @@index([role])
  @@index([cityId])
}

model City {
  id        String        @id @default(uuid())
  name      String
  managerId String?
  createdAt DateTime      @default(now())
  manager   User?         @relation("CityManager", fields: [managerId], references: [id])
  crews     Crew[]
  events    Event[]
  issues    IssueReport[]
  schools   School[]
  users     User[]
}

model School {
  id            String   @id @default(uuid())
  name          String
  type          String
  cityId        String
  address       String?
  director      String?
  phone         String?
  email         String?
  notes         String?
  childrenCount Int?
  isHotClient   Boolean  @default(false)
  rating        Float?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  events        Event[]
  city          City     @relation(fields: [cityId], references: [id])

  @@index([cityId])
  @@index([updatedAt, cityId])
}

model Crew {
  id        String   @id @default(uuid())
  name      String
  cityId    String
  hostId    String?
  driverId  String?
  car       String?
  carPlate  String?
  phone     String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  city      City     @relation(fields: [cityId], references: [id])
  driver    User?    @relation("DriverCrew", fields: [driverId], references: [id])
  host      User?    @relation("HostCrew", fields: [hostId], references: [id])
  events    Event[]
}

model Event {
  id              String            @id @default(uuid())
  cityId          String
  schoolId        String
  crewId          String?
  project         String
  date            DateTime
  time            String?
  status          EventStatus       @default(BASE)
  childrenPlanned Int?
  childrenActual  Int?
  price           Float?
  received        Float?
  paymentMethod   String?
  address         String?
  contactPerson   String?
  contactPhone    String?
  equipment       String?
  nextContact     DateTime?
  nextProject     String?
  responsibleId   String?
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  city            City              @relation(fields: [cityId], references: [id])
  crew            Crew?             @relation(fields: [crewId], references: [id])
  school          School            @relation(fields: [schoolId], references: [id])
  history         EventHistory[]
  preparation     EventPreparation?
  report          EventReport?
  files           File[]
  issues          IssueReport[]

  @@index([cityId])
  @@index([status])
  @@index([schoolId])
  @@index([date, status, cityId])
}

model EventReport {
  id                String        @id @default(uuid())
  eventId           String        @unique
  directorSatisfied Boolean?
  teachersSatisfied Boolean?
  hadIssues         Boolean       @default(false)
  comment           String?
  rating            Float?
  createdAt         DateTime      @default(now())
  announcementDone  Boolean       @default(false)
  materialShown     Boolean       @default(false)
  childrenCount     Int           @default(0)
  classesCount      Int           @default(0)
  privilegedCount   Int           @default(0)
  showingsCount     Int           @default(0)
  totalSum          Float         @default(0)
  schoolSum         Float         @default(0)
  remainderSum      Float         @default(0)
  event             Event         @relation(fields: [eventId], references: [id], onDelete: Cascade)
  photos            File[]
  expenseItems      ExpenseItem[]
  salaryItems       SalaryItem[]
}

model File {
  id        String       @id @default(uuid())
  name      String
  url       String
  size      Int
  eventId   String?
  reportId  String?
  createdAt DateTime     @default(now())
  event     Event?       @relation(fields: [eventId], references: [id])
  report    EventReport? @relation(fields: [reportId], references: [id])
}

model EventHistory {
  id        String   @id @default(uuid())
  eventId   String
  action    String
  comment   String?
  userId    String
  userName  String
  role      String
  createdAt DateTime @default(now())
  event     Event    @relation(fields: [eventId], references: [id])

  @@index([eventId, createdAt])
}

model EventPreparation {
  id               String            @id @default(uuid())
  eventId          String            @unique
  assignCrew       PreparationStatus @default(PLANNED)
  bookEquipment    PreparationStatus @default(PLANNED)
  prepareDocs      PreparationStatus @default(PLANNED)
  prepareMaterials PreparationStatus @default(PLANNED)
  remindSchool     PreparationStatus @default(PLANNED)
  event            Event             @relation(fields: [eventId], references: [id])
}

model IssueReport {
  id               String    @id @default(uuid())
  eventId          String
  schoolName       String
  eventName        String
  message          String
  cityId           String
  status           String    @default("Планується")
  createdAt        DateTime  @default(now())
  deadline         DateTime?
  assignedUserId   String?
  assignedUserName String?
  city             City      @relation(fields: [cityId], references: [id])
  event            Event     @relation(fields: [eventId], references: [id], onDelete: Cascade)

  @@index([cityId])
  @@index([eventId])
}

model SchoolContact {
  id           String   @id @default(uuid())
  city         String   @default("Львів")
  schoolNumber String
  contactName  String
  phone        String
  role         String?
  createdAt    DateTime @default(now())
}

model Project {
  id        String   @id @default(uuid())
  name      String   @unique
  color     String   @default("blue")
  createdAt DateTime @default(now())
}

model ExpenseItem {
  id        String   @id @default(uuid())
  reportId  String
  category  String 
  name      String?
  amount    Decimal  @db.Decimal(12, 2)
  createdAt DateTime @default(now())

  report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)

  @@index([reportId])
}

model SalaryItem {
  id        String   @id @default(uuid())
  reportId  String
  userId    String?
  userName  String
  amount    Decimal  @db.Decimal(12, 2)
  role      String? 
  createdAt DateTime @default(now())

  report EventReport @relation(fields: [reportId], references: [id], onDelete: Cascade)
  user   User?       @relation(fields: [userId], references: [id])

  @@index([reportId])
  @@index([userId])
}

enum UserRole {
  SUPERADMIN
  MANAGER
  HOST
  DRIVER
}

enum PreparationStatus {
  PLANNED
  IN_PROGRESS
  DONE
}

enum EventStatus {
  BASE
  FIRST_CONTACT
  INTERESTED
  PRE_APPROVAL
  DATE_CONFIRMED
  PREPARATION
  IN_PROGRESS
  DONE
  REPORT
  RE_SALE
}

```

---

### `apps/backend/src/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'super-secret-key-for-dev',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

```

---

### `apps/backend/src/auth/auth.service.ts`

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Невірний email або пароль');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Невірний email або пароль');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}

```

---

### `apps/backend/src/auth/auth.controller.ts`

```typescript
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

const isProd = process.env.NODE_ENV === 'production';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() signInDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.authService.login(
      signInDto.email,
      signInDto.password,
    );
    const csrfToken = randomBytes(32).toString('hex');

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie('csrf_token', csrfToken, {
      httpOnly: false, // фронтенд має прочитати
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { user };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    const payload = req['user'] as {
      sub: string;
      email: string;
      role: string;
      name: string;
    };
    return {
      user: {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      },
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('csrf_token');
    return { message: 'ok' };
  }
}

```

---

### `apps/backend/src/auth/auth.guard.ts`

```typescript
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Токен не знайдено');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'super-secret-key-for-dev',
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Недійсний токен');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    if (request.cookies?.access_token) return request.cookies.access_token;
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined; // тимчасовий fallback на перехідний період
  }
}

```

---

### `apps/backend/src/auth/interfaces/jwt-user.interface.ts`

```typescript
import { UserRole } from '@prisma/client';

export interface JwtUser {
  sub: string;
  name: string;
  role: UserRole;
}

```

---

### `apps/backend/src/auth/dto/login.dto.ts`

```typescript
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

```

---

### `apps/backend/src/main.ts`

```typescript
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

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
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllExceptionsFilter());

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
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './common/logger/logger.module';
import { RedisCacheModule } from './common/cache/redis-cache.module';
import { envValidationSchema } from './config/env.validation';
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
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    LoggerModule,
    RedisCacheModule,
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
    "@nestjs/cache-manager": "^3.1.3",
    "@nestjs/common": "^11.0.1",
    "@nestjs/config": "^4.0.0",
    "@nestjs/core": "^11.0.1",
    "@nestjs/jwt": "^11.0.2",
    "@nestjs/passport": "^11.0.5",
    "@nestjs/platform-express": "^11.0.1",
    "@nestjs/throttler": "^6.5.0",
    "@prisma/client": "6.19.0",
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
    "joi": "^18.2.3",
    "nestjs-pino": "^4.6.1",
    "node-telegram-bot-api": "0.64.0",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "pino-http": "^11.0.0",
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

