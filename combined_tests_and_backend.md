# Зібрані файли тестів, моків та сервісів бекенду

### `apps/frontend/test-results/.last-run.json`

```json
{
  "status": "failed",
  "failedTests": [
    "41d3fd2474a19feb00a1-d2a9a4f206101e6c4c0c",
    "41d3fd2474a19feb00a1-1f46830a6ef98ae18d4e",
    "c555568493a9c86ffa20-e31912ef5a07512e5abb",
    "c555568493a9c86ffa20-7053992357e48779ddcd"
  ]
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
    // Логін
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/cities/);

    // Логаут через кнопку в Layout
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

### `apps/frontend/e2e/schools.spec.ts`

```typescript
import { test, expect, Page } from "@playwright/test";

// Хелпер логіну
async function login(page: Page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', "admin@crm.com");
  await page.fill('input[type="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/cities/, { timeout: 8000 });
}

test.describe("Сторінка шкіл", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/schools");
    await page.waitForLoadState("networkidle");
  });

  test("відображає заголовок Школи", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Школи");
  });

  test("відображає список шкіл", async ({ page }) => {
    const rows = page.locator("table tbody tr, .school-row-enter");
    await expect(rows.first()).toBeVisible({ timeout: 8000 });
  });

  test("пошук фільтрує школи", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Пошук"]');
    await expect(searchInput).toBeVisible();

    // Отримуємо першу назву школи
    const firstSchool = page.locator("table tbody tr").first();
    const schoolName = await firstSchool.locator("td").first().textContent();
    const searchTerm = schoolName?.slice(0, 5) ?? "Школа";

    await searchInput.fill(searchTerm);
    await page.waitForTimeout(300); // debounce

    const results = page.locator("table tbody tr");
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test("очищення пошуку повертає всі результати", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Пошук"]');
    await searchInput.fill("Школа №1");
    await page.waitForTimeout(300);
    const filtered = await page.locator("table tbody tr").count();

    await searchInput.fill("");
    await page.waitForTimeout(300);
    const all = await page.locator("table tbody tr").count();

    expect(all).toBeGreaterThanOrEqual(filtered);
  });

  test("фільтр по статусу працює", async ({ page }) => {
    const newFilter = page.locator("button", { hasText: "Нові" });
    if (await newFilter.isVisible()) {
      await newFilter.click();
      await page.waitForTimeout(200);
      const counter = page.locator("text=/шкіл/i");
      await expect(counter).toBeVisible();
    }
  });

  test("клік на школу переходить на профіль", async ({ page }) => {
    const firstRow = page.locator("table tbody tr").first();
    await firstRow.click();
    await expect(page).toHaveURL(/\/schools\/.+/, { timeout: 5000 });
  });

  test("відображає StatsBar з лічильниками", async ({ page }) => {
    await expect(page.locator("text=Нові")).toBeVisible();
    await expect(page.locator("text=Заплановані")).toBeVisible();
    await expect(page.locator("text=В роботі")).toBeVisible();
  });
});

test.describe("Додавання школи", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/schools");
    await page.waitForLoadState("networkidle");
  });

  test("кнопка Додати відкриває модалку", async ({ page }) => {
    const addBtn = page.locator("button", { hasText: /\+ Додати/i });
    await expect(addBtn).toBeVisible();
    await addBtn.click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
  });

  test("модалка закривається по кнопці Скасувати", async ({ page }) => {
    await page.locator("button", { hasText: /\+ Додати/i }).click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
    await page.locator("button", { hasText: "Скасувати" }).click();
    await expect(page.locator("text=Нова школа")).not.toBeVisible();
  });

  test("форма не відправляється без назви школи", async ({ page }) => {
    await page.locator("button", { hasText: /\+ Додати/i }).click();
    await page.locator("button", { hasText: "Створити" }).click();
    // Модалка залишається відкритою
    await expect(page.locator("text=Нова школа")).toBeVisible();
  });
});

```

---

### `apps/frontend/playwright.config.ts`

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: 1,
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});

```

---

### `apps/frontend/src/tests/mocks/handlers.ts`

```typescript
import { http, HttpResponse } from "msw";

const BASE = "";

export const handlers = [
  // Cities
  http.get(`${BASE}/cities`, () =>
    HttpResponse.json([
      { id: "city-1", name: "Львів", plannedEvents: 3, completedEvents: 10, schoolsCount: 50 },
      { id: "city-2", name: "Київ", plannedEvents: 1, completedEvents: 5, schoolsCount: 30 },
    ])
  ),

  // Schools
  http.get(`${BASE}/schools`, () =>
    HttpResponse.json([
      { id: "school-1", name: "Школа №1", type: "Школа", cityId: "city-1", childrenCount: 300, events: [] },
      { id: "school-2", name: "Школа №5", type: "Школа", cityId: "city-1", childrenCount: 100, events: [] },
    ])
  ),

  http.get(`${BASE}/schools/:id`, ({ params }) =>
    HttpResponse.json({
      id: params.id,
      name: "Школа №1",
      type: "Школа",
      cityId: "city-1",
      city: { id: "city-1", name: "Львів" },
      director: "Іван Петренко",
      phone: "0671234567",
      address: "вул. Тестова 1",
      childrenCount: 300,
    })
  ),

  // Events
  http.get(`${BASE}/events/school/:schoolId`, () =>
    HttpResponse.json([
      {
        id: "event-1",
        project: "Голограма для школи",
        date: "2026-07-01T10:00:00Z",
        time: "10:00",
        status: "BASE",
        price: 5000,
        childrenPlanned: 100,
        address: "вул. Тестова 1",
        contactPerson: "Іван",
        contactPhone: "0671234567",
      },
    ])
  ),

  // Users
  http.get(`${BASE}/users`, () =>
    HttpResponse.json([
      { id: "user-1", name: "Адміністратор", email: "admin@crm.com", role: "SUPERADMIN" },
    ])
  ),

  // Dashboard
  http.get(`${BASE}/dashboard/summary`, () =>
    HttpResponse.json({
      todayEvents: [],
      upcomingEvents: [],
      funnel: { BASE: 10, FIRST_CONTACT: 5 },
      totalSchools: 50,
      monthlyKpi: { revenue: 50000, profit: 20000, children: 500, count: 10 },
      staleSchools: [],
      activityFeed: [],
      citiesStats: [],
    })
  ),

  // Auth
  http.post(`${BASE}/auth/login`, () =>
    HttpResponse.json({ access_token: "test-token" })
  ),
];
```

---

### `apps/frontend/src/tests/mocks/server.ts`

```typescript
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

---

### `apps/frontend/src/tests/component/EventsTable.test.tsx`

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("axios", () => ({
  default: { delete: vi.fn().mockResolvedValue({}) },
}));

import EventsTable from "../../components/school-profile/EventsTable";

const mockEvents = [
  {
    id: "ev-1",
    project: "Голограма",
    date: "2026-07-01T10:00:00Z",
    price: 5000,
    status: "BASE",
  },
  {
    id: "ev-2",
    project: "Малювайко",
    date: "2026-08-01T10:00:00Z",
    price: 3000,
    status: "FIRST_CONTACT",
  },
];

describe("EventsTable", () => {
  const onEventSelect = vi.fn();
  const onDeleteSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
  });

  it("відображає всі події", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    expect(screen.getAllByText("Голограма")).toHaveLength(1);
    expect(screen.getAllByText("Малювайко")).toHaveLength(1);
  });

  it("показує кількість подій у заголовку", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Всі події (2)")).toBeInTheDocument();
  });

  it("не рендериться якщо events порожній", () => {
    const { container } = render(
      <MemoryRouter>
        <EventsTable
          events={[]}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it("викликає onEventSelect при кліку на подію", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getAllByText("Голограма")[0]);
    expect(onEventSelect).toHaveBeenCalledWith("ev-1");
  });

  it("показує підтвердження перед видаленням", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    const deleteButtons = screen.getAllByText("🗑");
    fireEvent.click(deleteButtons[0]);
    expect(window.confirm).toHaveBeenCalledWith("Видалити цю подію?");
  });

  it("не видаляє якщо confirm повернув false", async () => {
    window.confirm = vi.fn(() => false);
    const axios = await import("axios");
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    const deleteButtons = screen.getAllByText("🗑");
    fireEvent.click(deleteButtons[0]);
    expect(axios.default.delete).not.toHaveBeenCalled();
  });

  it("виділяє вибрану подію", () => {
    const { container } = render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId="ev-1"
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
        />
      </MemoryRouter>,
    );
    const selected = container.querySelector(".bg-blue-50\\/50");
    expect(selected).toBeInTheDocument();
  });
});

```

---

### `apps/backend/src/events/events.service.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';
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

  // Список подій для сторінки "Події".
  // Водій/ведучий бачить тільки події, де він призначений в екіпаж.
  // Решта ролей (менеджер, адмін тощо) бачать усі події.
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

  // Оновлюємо метод create
  async create(data: CreateEventDto, user: JwtUser) {
    return this.prisma.event.create({
      data: {
        ...data,
        status: 'BASE' as never,
        date: new Date(data.date),
        history: {
          create: {
            action: 'Створено подію. Етап: База',
            userId: user.sub, // Беремо ID з токена
            userName: user.name, // Беремо ім'я з токена
            role: user.role, // Беремо роль з токена
          },
        },
      },
      include: { history: true },
    });
  }

  // Оновлюємо метод updateStatus
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
            userId: user.sub, // Більше ніяких 'superadmin-123'!
            userName: user.name,
            role: user.role,
          },
        },
      },
      include: { crew: true, history: { orderBy: { createdAt: 'desc' } } },
    });
  }

  // Оновлюємо статус підготовки
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

  // --- ВСТАВЛЯЙ ОНОВЛЕНИЙ МЕТОД ТУТ ---
  async assignCrewToEvent(
    eventId: string,
    crewId: string, // ЗМІНЕНО: Тепер приймаємо тільки ID існуючого екіпажу
  ) {
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

    // Якщо користувач натиснув /start, telegramChatId буде заповнено
    if (user.telegramChatId) return user.telegramChatId;

    // Якщо в telegramId вбито числовий ID вручну, можна спробувати його
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

  // ОНОВЛЕНО: Тепер метод видалення безпечно видаляє зв'язані дані
  async remove(id: string) {
    // 1. Видаляємо історію події
    await this.prisma.eventHistory.deleteMany({
      where: { eventId: id },
    });

    // 2. Видаляємо підготовку події (якщо вона існує)
    await this.prisma.eventPreparation.deleteMany({
      where: { eventId: id },
    });

    // 3. Тепер спокійно видаляємо саму подію
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async submitReport(
    eventId: string,
    reportData: SubmitReportDto,
    user: JwtUser,
  ) {
    // 1. Зберігаємо звіт у базу (без JSON полів)
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

    // Видаляємо старі записи витрат і зарплат
    await this.prisma.expenseItem.deleteMany({ where: { reportId: eventId } });
    await this.prisma.salaryItem.deleteMany({ where: { reportId: eventId } });

    // Створюємо нові записи витрат
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

    // Створюємо нові записи зарплат + нарахування балансу
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

    // 2. Оновлюємо статус події
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
    return this.prisma.event.findUnique({
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

### `apps/backend/src/events/events.service.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';

const mockPrisma = {
  event: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  eventHistory: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  eventPreparation: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  eventReport: { upsert: jest.fn() },
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

const mockTelegram = { sendMessage: jest.fn() };

const mockUser = { sub: 'user-1', name: 'Менеджер', role: 'MANAGER' };

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: TelegramService, useValue: mockTelegram },
      ],
    }).compile();
    service = module.get<EventsService>(EventsService);
  });

  describe('updateStatus', () => {
    it('змінює статус і створює запис в історії', async () => {
      const updatedEvent = {
        id: 'ev-1',
        status: 'FIRST_CONTACT',
        crew: null,
        history: [{ id: 'h-1', action: 'Знайомство', userId: 'user-1' }],
      };
      mockPrisma.event.update.mockResolvedValueOnce(updatedEvent);

      const result = await service.updateStatus('ev-1', 'FIRST_CONTACT', 'Знайомство', 'коментар', mockUser);

      expect(mockPrisma.event.update).toHaveBeenCalledWith({
        where: { id: 'ev-1' },
        data: {
          status: 'FIRST_CONTACT',
          history: {
            create: {
              action: 'Знайомство',
              comment: 'коментар',
              userId: 'user-1',
              userName: 'Менеджер',
              role: 'MANAGER',
            },
          },
        },
        include: expect.any(Object),
      });
      expect(result.status).toBe('FIRST_CONTACT');
    });

    it('зберігає null comment якщо коментар порожній', async () => {
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'FIRST_CONTACT', crew: null, history: [] });

      await service.updateStatus('ev-1', 'FIRST_CONTACT', 'Дія', undefined, mockUser);

      const callData = mockPrisma.event.update.mock.calls[0][0];
      expect(callData.data.history.create.comment).toBeNull();
    });

    it('записує правильного userId з токена', async () => {
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'BASE', crew: null, history: [] });

      await service.updateStatus('ev-1', 'BASE', 'Дія', undefined, { sub: 'driver-99', name: 'Водій', role: 'DRIVER' });

      const callData = mockPrisma.event.update.mock.calls[0][0];
      expect(callData.data.history.create.userId).toBe('driver-99');
      expect(callData.data.history.create.role).toBe('DRIVER');
    });
  });

  describe('addHistoryComment', () => {
    it('створює коментар і повертає подію з оновленою історією', async () => {
      mockPrisma.eventHistory.create.mockResolvedValueOnce({ id: 'h-new' });
      mockPrisma.event.findUnique.mockResolvedValueOnce({
        id: 'ev-1',
        history: [{ id: 'h-new', action: 'Коментар', comment: 'тест' }],
      });

      const result = await service.addHistoryComment('ev-1', 'тест', mockUser);

      expect(mockPrisma.eventHistory.create).toHaveBeenCalledWith({
        data: {
          eventId: 'ev-1',
          action: 'Коментар',
          comment: 'тест',
          userId: 'user-1',
          userName: 'Менеджер',
          role: 'MANAGER',
        },
      });
      expect(result?.history).toHaveLength(1);
    });
  });

  describe('submitReport', () => {
    const reportData = {
      announcementDone: true,
      materialShown: true,
      childrenCount: 100,
      classesCount: 4,
      privilegedCount: 5,
      showingsCount: 2,
      totalSum: 10000,
      schoolSum: 2000,
      remainderSum: 8000,
      rating: 9,
      expenses: [],
      salaries: [
        { userId: 'host-1', amount: 1500 },
        { userId: 'driver-1', amount: 1000 },
      ],
    };

    it('зберігає звіт через upsert', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({ eventId: 'ev-1' });
      mockPrisma.user.update.mockResolvedValue({ id: 'host-1', balance: 1500 });
      mockPrisma.event.update.mockResolvedValueOnce({
        id: 'ev-1', status: 'REPORT', report: {}, history: [],
      });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.eventReport.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { eventId: 'ev-1' },
          update: expect.objectContaining({ totalSum: 10000, remainderSum: 8000 }),
          create: expect.objectContaining({ totalSum: 10000, remainderSum: 8000 }),
        })
      );
    });

    it('нараховує зарплату користувачам', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });

      await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.user.update).toHaveBeenCalledTimes(2);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'host-1' },
        data: { balance: { increment: 1500 } },
      });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'driver-1' },
        data: { balance: { increment: 1000 } },
      });
    });

    it('не нараховує зарплату якщо amount = 0', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });

      await service.submitReport('ev-1', {
        ...reportData,
        salaries: [{ userId: 'host-1', amount: 0 }],
      }, mockUser);

      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });

    it('змінює статус на REPORT після збереження звіту', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });

      const result = await service.submitReport('ev-1', reportData, mockUser);

      expect(mockPrisma.event.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'ev-1' },
          data: expect.objectContaining({ status: 'REPORT' }),
        })
      );
      expect(result.status).toBe('REPORT');
    });

    it('не нараховує зарплату якщо salaries порожній', async () => {
      mockPrisma.eventReport.upsert.mockResolvedValueOnce({});
      mockPrisma.event.update.mockResolvedValueOnce({ id: 'ev-1', status: 'REPORT', report: {}, history: [] });

      await service.submitReport('ev-1', { ...reportData, salaries: [] }, mockUser);

      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });
  });

  describe('findBySchool', () => {
    it('minimal=true — використовує select без history/preparation', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findBySchool('school-1', true);
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.select).toBeDefined();
      expect(call.include).toBeUndefined();
    });

    it('minimal=false — використовує include з history та preparation', async () => {
      mockPrisma.event.findMany.mockResolvedValueOnce([]);
      await service.findBySchool('school-1', false);
      const call = mockPrisma.event.findMany.mock.calls[0][0];
      expect(call.include).toBeDefined();
      expect(call.select).toBeUndefined();
    });
  });
});
```

---

### `apps/backend/src/events/dto/submit-report.dto.ts`

```typescript
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ExpenseItemDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;
}

export class SalaryItemDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @IsOptional()
  @IsString()
  role?: string;
}

export class SubmitReportDto {
  @IsBoolean()
  announcementDone: boolean;

  @IsBoolean()
  materialShown: boolean;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  childrenCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  classesCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  privilegedCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  showingsCount: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalSum: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  schoolSum: number;

  @IsNumber()
  @Type(() => Number)
  remainderSum: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExpenseItemDto)
  expenses: ExpenseItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalaryItemDto)
  salaries: SalaryItemDto[];
}

```

---

### `apps\frontend\test-results\login-Авторизація-невірний-пароль-—-показує-помилку\error-context.md`

```markdown
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Авторизація >> невірний пароль — показує помилку
- Location: e2e\login.spec.ts:12:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\shmal\AppData\Local\ms-playwright\chromium_headless_shell-1228\chrome-headless-shell-win64\chrome-headless-shell.exe
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```
```

---

### `apps\frontend\test-results\login-Авторизація-невірний-пароль-—-показує-помилку-retry1\error-context.md`

```markdown
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Авторизація >> невірний пароль — показує помилку
- Location: e2e\login.spec.ts:12:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\shmal\AppData\Local\ms-playwright\chromium_headless_shell-1228\chrome-headless-shell-win64\chrome-headless-shell.exe
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```
```

---

