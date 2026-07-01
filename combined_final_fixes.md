# Фінальні файли для виправлення E2E тестів

### `apps/backend/src/events/events.service.ts`

```typescript
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { Prisma } from '@prisma/client';

import { CreateEventDto } from './dto/create-event.dto';
import {
  SubmitReportDto,
  ExpenseItemDto,
  SalaryItemDto,
} from './dto/submit-report.dto';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const FIELD_ROLES = ['DRIVER', 'HOST'];

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private telegramService: TelegramService,
  ) {}

  async findAllForUser(user: JwtUser) {
    const isFieldStaff = FIELD_ROLES.includes(user.role);

    return this.prisma.event.findMany({
      where: isFieldStaff
        ? {
            crew: {
              OR: [{ hostId: user.sub }, { driverId: user.sub }],
            },
          }
        : {},
      include: {
        school: { select: { id: true, name: true, type: true } },
        city: { select: { id: true, name: true } },
        crew: {
          include: {
            host: { select: { id: true, name: true } },
            driver: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async create(data: CreateEventDto, user: JwtUser) {
    return this.prisma.event.create({
      data: {
        ...data,
        status: 'BASE' as never,
        date: new Date(data.date),
        history: {
          create: {
            action: 'Створено подію. Етап: База',
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { history: true },
    });
  }

  async updateStatus(
    eventId: string,
    newStatus: string,
    actionName: string,
    comment: string | undefined,
    user: JwtUser,
  ) {
    return this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: newStatus as never,
        history: {
          create: {
            action: actionName,
            comment: comment || null,
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { crew: true, history: { orderBy: { createdAt: 'desc' } } },
    });
  }

  async updatePreparationStatus(
    eventId: string,
    field: string,
    status: string,
  ) {
    const existing = await this.prisma.eventPreparation.findUnique({
      where: { eventId },
    });

    if (existing) {
      return this.prisma.eventPreparation.update({
        where: { eventId },
        data: { [field]: status },
      });
    } else {
      return this.prisma.eventPreparation.create({
        data: { eventId, [field]: status },
      });
    }
  }

  async assignCrewToEvent(eventId: string, crewId: string) {
    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: { crewId: crewId },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true,
        preparation: true,
        history: { orderBy: { createdAt: 'desc' } },
      },
    });

    const hostId = event.crew?.hostId;
    const driverId = event.crew?.driverId;

    const dateStr = new Date(event.date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const timeStr = event.time ? `, ${event.time}` : '';

    const buildMessage = (role: 'ведучий' | 'водій') =>
      `🎯 <b>Вас призначено на подію!</b>\n\n` +
      `👤 <b>Роль:</b> ${role === 'ведучий' ? '🎙️ Ведучий' : '🚗 Водій'}\n` +
      `📅 <b>Дата:</b> ${dateStr}${timeStr}\n` +
      `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
      `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
      `🎪 <b>Проєкт:</b> ${event.project}\n` +
      (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
      (event.contactPerson
        ? `👤 <b>Контакт:</b> ${event.contactPerson}\n`
        : '') +
      (event.contactPhone ? `📞 <b>Телефон:</b> ${event.contactPhone}\n` : '') +
      `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;

    if (hostId) {
      const hostChatId = await this.getChatIdForUser(hostId);
      this.logger.log(`[assignCrew] hostChatId resolved=${hostChatId}`);

      if (hostChatId) {
        await this.telegramService.sendMessage(
          hostChatId,
          buildMessage('ведучий'),
        );
      } else {
        this.logger.warn(
          `[assignCrew] Не вдалося надіслати повідомлення ведучому ${hostId}: chatId не знайдено (користувач не натиснув /start?)`,
        );
      }
    }

    if (driverId) {
      const driverChatId = await this.getChatIdForUser(driverId);
      this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);

      if (driverChatId) {
        await this.telegramService.sendMessage(
          driverChatId,
          buildMessage('водій'),
        );
      } else {
        this.logger.warn(
          `[assignCrew] Не вдалося надіслати повідомлення водію ${driverId}: chatId не знайдено`,
        );
      }
    }

    if (driverId) {
      const driver = await this.prisma.user.findUnique({
        where: { id: driverId },
      });
      this.logger.log(
        `[assignCrew] driver=${JSON.stringify({ name: driver?.name, telegramId: driver?.telegramId, telegramChatId: driver?.telegramChatId })}`,
      );
      const driverChatId =
        driver?.telegramChatId ||
        (driver?.telegramId && /^\d+$/.test(driver.telegramId)
          ? driver.telegramId
          : null);
      this.logger.log(`[assignCrew] driverChatId resolved=${driverChatId}`);
      if (driverChatId) {
        await this.telegramService.sendMessage(
          driverChatId,
          buildMessage('водій'),
        );
      }
    }

    return event;
  }

  async rescheduleEvent(
    eventId: string,
    newDate: string,
    newTime: string,
    user: JwtUser,
  ) {
    const event = await this.prisma.event.update({
      where: { id: eventId },
      data: {
        date: new Date(newDate),
        time: newTime,
        history: {
          create: {
            action: `Подію перенесено на ${new Date(newDate).toLocaleDateString('uk-UA')} о ${newTime}`,
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: {
        crew: { include: { host: true, driver: true } },
        school: true,
        city: true,
        history: { orderBy: { createdAt: 'desc' } },
      },
    });

    const dateStr = new Date(newDate).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const msg =
      `📅 <b>Подію перенесено!</b>\n\n` +
      `🏫 <b>Заклад:</b> ${event.school?.name ?? '—'}\n` +
      `🎪 <b>Проєкт:</b> ${event.project}\n` +
      `📅 <b>Нова дата:</b> ${dateStr} о ${newTime}\n` +
      `📍 <b>Місто:</b> ${event.city?.name ?? '—'}\n` +
      (event.address ? `🗺 <b>Адреса:</b> ${event.address}\n` : '') +
      `\n<i>Деталі у CRM: <a href="https://crm-frontend-59hvkjtym-shmaltsels-projects.vercel.app/login">Посилання</a></i>`;

    const sendTo = async (userId: string | null | undefined) => {
      if (!userId) return;
      const u = await this.prisma.user.findUnique({ where: { id: userId } });
      const chatId =
        u?.telegramChatId ||
        (u?.telegramId && /^\d+$/.test(u.telegramId) ? u.telegramId : null);
      if (chatId) await this.telegramService.sendMessage(chatId, msg);
    };

    await sendTo(event.crew?.hostId);
    await sendTo(event.crew?.driverId);

    return event;
  }

  async getChatIdForUser(userId: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    if (user.telegramChatId) return user.telegramChatId;

    if (user.telegramId && /^\d+$/.test(user.telegramId))
      return user.telegramId;

    return null;
  }

  async findBySchool(schoolId: string, minimal = false) {
    if (minimal) {
      return this.prisma.event.findMany({
        where: { schoolId },
        select: {
          id: true,
          project: true,
          date: true,
          time: true,
          status: true,
          price: true,
          childrenPlanned: true,
          address: true,
          contactPerson: true,
          contactPhone: true,
          crewId: true,
          crew: {
            select: { id: true, name: true, hostId: true, driverId: true },
          },
        },
        orderBy: { date: 'desc' },
      });
    }
    return this.prisma.event.findMany({
      where: { schoolId },
      include: {
        crew: { include: { host: true, driver: true } },
        history: { orderBy: { createdAt: 'desc' } },
        preparation: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  async updateHistoryComment(historyId: string, comment: string) {
    return this.prisma.eventHistory.update({
      where: { id: historyId },
      data: { comment: comment || null },
    });
  }

  async addHistoryComment(eventId: string, comment: string, user: JwtUser) {
    await this.prisma.eventHistory.create({
      data: {
        eventId,
        action: 'Коментар',
        comment,
        userId: user.sub,
        userName: user.name,
        role: user.role,
      },
    });

    return this.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        history: { orderBy: { createdAt: 'desc' } },
      },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.event.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Подію не знайдено');

    await this.prisma.eventHistory.deleteMany({
      where: { eventId: id },
    });

    await this.prisma.eventPreparation.deleteMany({
      where: { eventId: id },
    });

    return this.prisma.event.delete({
      where: { id },
    });
  }

  async submitReport(
    eventId: string,
    reportData: SubmitReportDto,
    user: JwtUser,
  ) {
    await this.prisma.eventReport.upsert({
      where: { eventId },
      update: {
        announcementDone: reportData.announcementDone,
        materialShown: reportData.materialShown,
        childrenCount: reportData.childrenCount,
        classesCount: reportData.classesCount,
        privilegedCount: reportData.privilegedCount,
        showingsCount: reportData.showingsCount,
        totalSum: reportData.totalSum,
        schoolSum: reportData.schoolSum,
        remainderSum: reportData.remainderSum,
        rating: reportData.rating,
      },
      create: {
        eventId,
        announcementDone: reportData.announcementDone,
        materialShown: reportData.materialShown,
        childrenCount: reportData.childrenCount,
        classesCount: reportData.classesCount,
        privilegedCount: reportData.privilegedCount,
        showingsCount: reportData.showingsCount,
        totalSum: reportData.totalSum,
        schoolSum: reportData.schoolSum,
        remainderSum: reportData.remainderSum,
        rating: reportData.rating,
      },
    });

    await this.prisma.expenseItem.deleteMany({ where: { reportId: eventId } });
    await this.prisma.salaryItem.deleteMany({ where: { reportId: eventId } });

    if (reportData.expenses?.length) {
      await this.prisma.expenseItem.createMany({
        data: reportData.expenses.map((exp: ExpenseItemDto) => ({
          reportId: eventId,
          category: exp.category || 'Інше',
          name: exp.name,
          amount: new Prisma.Decimal(exp.amount || 0),
        })),
      });
    }

    if (reportData.salaries?.length) {
      await this.prisma.salaryItem.createMany({
        data: reportData.salaries.map((s: SalaryItemDto) => ({
          reportId: eventId,
          userId: s.userId,
          userName: s.name,
          amount: new Prisma.Decimal(s.amount || 0),
          role: s.role,
        })),
      });

      await Promise.all(
        reportData.salaries
          .filter((s) => s.userId && s.amount > 0)
          .map((s) =>
            this.prisma.user.update({
              where: { id: s.userId },
              data: { balance: { increment: s.amount } },
            }),
          ),
      );
    }

    return this.prisma.event.update({
      where: { id: eventId },
      data: {
        status: 'REPORT' as never,
        history: {
          create: {
            action: 'Сформовано звіт. Етап: Звіт',
            userId: user.sub,
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { report: true, history: { orderBy: { createdAt: 'desc' } } },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        school: true,
        city: true,
        crew: {
          include: {
            host: { select: { id: true, name: true } },
            driver: { select: { id: true, name: true } },
          },
        },
        report: true,
      },
    });
    if (!event) throw new NotFoundException('Подію не знайдено');
    return event;
  }

  async findCompletedBySchool(schoolId: string) {
    return this.prisma.event.findMany({
      where: { schoolId, status: 'RE_SALE' },
      select: {
        id: true,
        project: true,
        date: true,
        status: true,
        price: true,
        childrenPlanned: true,
        report: {
          select: {
            childrenCount: true,
            classesCount: true,
            privilegedCount: true,
            showingsCount: true,
            totalSum: true,
            schoolSum: true,
            remainderSum: true,
            rating: true,
            expenseItems: {
              select: { category: true, name: true, amount: true },
            },
          },
        },
        history: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { date: 'desc' },
    });
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

VITE_API_URL="https://crm-57qd.onrender.com"
DATABASE_URL="postgresql://***:***@ep-raspy-wind-asvmcdtw-pooler.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
TELEGRAM_BOT_TOKEN="***
```

---

### `apps/backend/test/dashboard.e2e-spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Dashboard API (contract)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@crm.com', password: 'admin123' });
    token = loginRes.body.access_token;
  });

  afterAll(async () => await app.close());

  describe('GET /dashboard/summary', () => {
    it('повертає summary з токеном', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('todayEvents');
      expect(res.body).toHaveProperty('upcomingEvents');
      expect(res.body).toHaveProperty('funnel');
      expect(res.body).toHaveProperty('monthlyKpi');
      expect(res.body).toHaveProperty('staleSchools');
      expect(res.body).toHaveProperty('activityFeed');
    });

    it('повертає 401 без токена', async () => {
      await request(app.getHttpServer()).get('/dashboard/summary').expect(401);
    });

    it('funnel містить всі етапи пайплайну', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const stages = [
        'BASE',
        'FIRST_CONTACT',
        'DATE_CONFIRMED',
        'PREPARATION',
        'IN_PROGRESS',
        'DONE',
        'REPORT',
        'RE_SALE',
      ];
      for (const stage of stages) {
        expect(res.body.funnel).toHaveProperty(stage);
      }
    });

    it('monthlyKpi має числові поля', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const kpi = res.body.monthlyKpi;
      expect(typeof kpi.revenue).toBe('number');
      expect(typeof kpi.profit).toBe('number');
      expect(typeof kpi.children).toBe('number');
      expect(typeof kpi.count).toBe('number');
    });

    it('фільтр по cityId повертає коректний результат', async () => {
      const citiesRes = await request(app.getHttpServer())
        .get('/cities')
        .set('Authorization', `Bearer ${token}`);

      const cityId = citiesRes.body[0]?.id;
      if (!cityId) return;

      const res = await request(app.getHttpServer())
        .get(`/dashboard/summary?cityId=${cityId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveProperty('funnel');
      expect(res.body).toHaveProperty('todayEvents');
    });

    it('todayEvents і upcomingEvents — масиви', async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/summary')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(res.body.todayEvents)).toBe(true);
      expect(Array.isArray(res.body.upcomingEvents)).toBe(true);
      expect(Array.isArray(res.body.staleSchools)).toBe(true);
      expect(Array.isArray(res.body.activityFeed)).toBe(true);
    });
  });
});

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
      `Увійдіть за посиланням: <a href="https://crm-tau-nine.vercel.app">crm-tau-nine.vercel.app</a>\n\n` +
      `<i>Змініть пароль після першого входу.</i>`;

    await this.sendMessage(chatId, text);
  }
}

```

---

### `apps/frontend/e2e/login.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test.describe("Авторизація", () => {
  test("успішний логін перенаправляє на /cities", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/cities/, { timeout: 8000 });
  });

  test("невірний пароль — залишається на /login", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/login/);
  });

  test("невірний пароль — показує повідомлення про помилку", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(
      page.locator("text=/невірний|помилка|неправильний/i"),
    ).toBeVisible({ timeout: 5000 });
  });

  test("порожній email — кнопка не відправляє форму", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/login/);
  });

  test("після логіну токен зберігається в localStorage", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/cities/);
    const token = await page.evaluate(() => localStorage.getItem("token"));
    expect(token).toBeTruthy();
  });

  test("після логауту токен видаляється", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/cities/);

    const logoutBtn = page.locator("button", { hasText: /вийти|logout/i });
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      const token = await page.evaluate(() => localStorage.getItem("token"));
      expect(token).toBeNull();
    }
  });

  test("захищений маршрут без токена перенаправляє на /login", async ({
    page,
  }) => {
    await page.evaluate(() => localStorage.removeItem("token"));
    await page.goto("/schools");
    await expect(page).toHaveURL(/login/);
  });
});

```

---

### `apps/frontend/src/pages/Login.tsx`

```typescript
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config/api";

interface LoginProps {
  onLogin?: (token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("admin@crm.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      if (onLogin) {
        onLogin(response.data.access_token);
      } else {
        navigate("/cities");
      }
    } catch {
      setError("Невірний email або пароль");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Вхід у CRM
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}

```

---

