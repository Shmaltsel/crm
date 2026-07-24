# Модульна інвентаризація CRM-проєкту

> **Дата**: 2026-07-21 | **Статус**: РОЗВІДКА (жодних змін у коді)
> **Стек**: NestJS + Prisma + PostgreSQL + Redis | React 19 + Vite + TanStack Query + Tailwind

---

## Зміст

1. [Backend модулі](#1-backend-модулі)
2. [Frontend модулі](#2-frontend-модулі)
3. [Інфраструктурні модулі](#3-інфраструктурні-модулі)
4. [Наскрізні аспекти (cross-cutting)](#4-насмізькі-аспекти-cross-cutting)
5. [Дублювання та потенційний copy-paste](#5-дублювання-та-потенційний-copy-paste)
6. [Мертвий/невикористовуваний код](#6-мертвийневикористовуваний-код)
7. [Порядок перевірки](#7-порядок-перевірки)

---

## 1. Backend модулі

### 1.1 Prisma (Database Layer)

| | |
|---|---|
| **Призначення** | Одиничний модуль-обгортка для Prisma Client з синглтон-життєвим циклом та моком для тестів |
| **Файли** | `prisma.module.ts` (9), `prisma.service.ts` (50), `prisma.mock.ts` (6), `prisma.service.spec.ts` (60) · `prisma/schema.prisma` (564) · 29 міграцій · 7 seed/імпорт скриптів |
| **Залежності від** | — (жодних feature-залежностей) |
| **Залежні від нього** | **ВСІ** feature-модулі |
| **Точки входу** | `PrismaService` (injectable), `prisma.mock.ts` (для тестів) |
| **Тести** | ✅ `prisma.service.spec.ts` (60 рядків) |
| **Складність** | Н (низька) — мінімальна логіка, чиста обгортка |
| **Пріоритет** | 1 — база всього, але проста |

### 1.2 Auth (Аутентифікація та авторизація)

| | |
|---|---|
| **Призначення** | JWT cookie-аутентифікація, CSRF-захист, RBAC (ролі), ownership-перевірка, місто-обмеження доступу |
| **Файли** | `auth.module.ts` (24), `auth.service.ts` (121), `auth.controller.ts` (133), `auth.guard.ts` (29), `csrf.guard.ts` (35), `guards/roles.guard.ts` (28), `guards/ownership.guard.ts` (112), `services/city-access.service.ts` (20), `interfaces/jwt-user.interface.ts` (8), 4 декоратори (20), `dto/login.dto.ts` (12) · **+8 spec файлів** (864 рядки) |
| **Залежності від** | Prisma (User, RefreshToken), CityAccess |
| **Залежні від нього** | Всі модулі з `@UseGuards(AuthGuard)`, `@Roles()`, `@CheckOwnership()` |
| **Точки входу** | `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh`, `GET /auth/me` · Глобальний `CsrfGuard` (APP_GUARD) |
| **Тести** | ✅ Розгорнуті: service (202), guard (57), csrf (79), ownership (221), roles (50), controller (16) |
| **Складність** | В (висока) — 4 гварди, RBAC, ownership, city-access, cookie+CSRF |
| **Пріоритет** | 2 — критична для безпеки, добре протестована |

### 1.3 Events (Управління подіями)

| | |
|---|---|
| **Призначення** | Повний життєвий цикл освітніх подій: створення, планування, проведення, звітування, перенесення |
| **Файли** | `events.module.ts` (29), `events.service.ts` (602), `events.controller.ts` (161), `events-report.service.ts` (250), `events-scheduling.service.ts` (129), `events-scheduler.service.ts` (97), 8 DTO (251), **+7 spec файлів** (1563 рядки) |
| **Залежності від** | Prisma, Auth, Schools, Notifications, Telegram |
| **Залежні від нього** | Reports, Finance, Salary, Dashboard, Analytics, Frontend (SchoolProfile) |
| **Точки входу** | `GET/POST/PATCH /events/*` (161 рядків контролера) · `events-scheduler.service.ts` — cron через `@Cron()` |
| **Тести** | ✅ Найбільше покриття: service (443+148 smoke), controller (176), report (364), scheduling (139), scheduler (199), DTO (94) |
| **Складність** | В (висока) — 602 рядки сервісу, 4 підсервіси, складний стейт-машина |
| **Пріоритет** | 3 — ядро бізнесу, складна логіка |

### 1.4 Schools (Управління школами)

| | |
|---|---|
| **Призначення** | CRUD шкіл/садочків, контактів, імпорт даних, HTML-парсинг сторінок шкіл |
| **Файли** | `schools.module.ts` (12), `schools.service.ts` (540), `schools.controller.ts` (100), `parser.service.ts` (284), `school-contacts.seed.ts` (1068), 6 DTO (123), **+3 spec** (613) |
| **Залежності від** | Prisma, Auth (ownership), Categories |
| **Залежні від нього** | Events, SchoolComments, Reports, Finance, Frontend (SchoolProfile, Schools page) |
| **Точки входу** | `GET/POST/PATCH/DELETE /schools/*`, `GET /schools/:id/contacts` |
| **Тести** | ✅ Service (317), controller (65), parser (231) |
| **Складність** | В (висока) — 540 сервіс + 284 парсер + 1068 seed |
| **Пріоритет** | 4 — великий модуль, складний парсинг |

### 1.5 Reports (Звіти по подіях)

| | |
|---|---|
| **Призначення** | Подання, перегляд, затвердження/відхилення звітів по завершених подіях |
| **Файли** | `reports.module.ts` (20), `reports.service.ts` (499), `reports.controller.ts` (98), 4 DTO (137), **+1 spec** (211) |
| **Залежності від** | Prisma, Auth, Events, Finance |
| **Залежні від нього** | Salary (розрахунок зарплати зі звітів), Dashboard, Analytics, Frontend (ReportsReviewPage) |
| **Точки входу** | `GET/POST/PATCH /reports/*`, `POST /reports/:id/approve`, `POST /reports/:id/revision` |
| **Тести** | ✅ Service (211) |
| **Складність** | С (середня) — 499 сервіс, стандартний CRUD + approval flow |
| **Пріоритет** | 5 — залежить від Events, сам залежний для Salary |

### 1.6 Finance (Фінанси та витрати)

| | |
|---|---|
| **Призначення** | Управління витратами звітів, ручні витрати, компанійський баланс, фінансові зведення |
| **Файли** | `finance.module.ts` (10), `finance.service.ts` (697), `finance.controller.ts` (142), 4 DTO (91), **+2 spec** (450) |
| **Залежності від** | Prisma, Auth, Reports |
| **Залежні від нього** | Salary, Dashboard, Analytics, Frontend (Finance page, FinanceCharts) |
| **Точки входу** | `GET/POST/PATCH/DELETE /finance/*` (142 рядки контролера) |
| **Тести** | ✅ Service (370+80 smoke) |
| **Складність** | В (висока) — найбільший сервіс (697), балансові операції, Decimal-арифметика |
| **Пріоритет** | 6 — фінанси = критичний модуль |

### 1.7 Salary (Зарплатня)

| | |
|---|---|
| **Призначення** | Нарахування та виплата зарплатні працівникам на основі звітів |
| **Файли** | `salary.module.ts` (15), `salary.service.ts` (215), `salary.controller.ts` (53), `salary-payout.service.ts` (36), 2 DTO (45), **+1 spec** (110) |
| **Залежності від** | Prisma, Auth, Reports, Finance |
| **Залежні від нього** | Dashboard (загальна сума виплат), Frontend (salary feature) |
| **Точки входу** | `GET/POST/PATCH /salary/*`, `POST /salary/:id/mark-paid` |
| **Тести** | ✅ Service (110) |
| **Складність** | С (середня) — 215 сервіс, простий approval flow |
| **Пріоритет** | 7 |

### 1.8 Dashboard (Панель керування)

| | |
|---|---|
| **Призначення** | Агрегована статистика для головної сторінки: KPI, воронка, активність, прострочені школи |
| **Файли** | `dashboard.module.ts` (12), `dashboard.service.ts` (406), `dashboard.controller.ts` (50), **+1 spec** (297) |
| **Залежності від** | Prisma, Events, Schools, Reports, Finance |
| **Залежні від нього** | Frontend (Dashboard page, dashboard components) |
| **Точки входу** | `GET /dashboard/summary`, `GET /dashboard/cities`, `GET /dashboard/events` |
| **Тести** | ✅ Service (297) |
| **Складність** | С (середня) — агрегація запитів, читання |
| **Пріоритет** | 8 |

### 1.9 Analytics (Аналітика)

| | |
|---|---|
| **Призначення** | Детальна аналітика: по містах, працівниках, фінансах з графіками та анотаціями |
| **Файли** | `analytics.module.ts` (11), `analytics.service.ts` (612), `analytics.controller.ts` (318) |
| **Залежності від** | Prisma, Events, Reports, Finance, Schools |
| **Залежні від нього** | Frontend (Analytics page — 2361 рядок!) |
| **Точки входу** | `GET /analytics/*` (контролер 318 рядків — багато ендпоїнтів) |
| **Тести** | ❌ **НЕМАЄ** жодного spec-файлу |
| **Складність** | В (висока) — 612 сервіс + 318 контролер, складні запити, аналітичні цілі |
| **Пріоритет** | ⭐ **ВИСОКИЙ** — великий модуль без жодних тестів |

### 1.10 Users (Управління користувачами)

| | |
|---|---|
| **Призначення** | CRUD користувачів (менеджери, ведучі, водії) |
| **Файли** | `users.module.ts` (12), `users.service.ts` (192), `users.controller.ts` (59), 2 DTO (86), **+2 spec** (35 — мінімальні стаби) |
| **Залежності від** | Prisma, Auth |
| **Залежні від нього** | Auth (пошук користувача при логіні), Events, Frontend (Employees page) |
| **Точки входу** | `GET/POST/PATCH/DELETE /users/*` |
| **Тести** | ⚠️ Мінімальні: service (16), controller (19) — фактично стаби |
| **Складність** | С (середня) — CRUD з роллями |
| **Пріоритет** | ⭐ **ВИСОКИЙ** — майже немає тестів |

### 1.11 Cities (Міста)

| | |
|---|---|
| **Призначення** | Управління містами та екіпажами (водій+ведучий) |
| **Файли** | `cities.module.ts` (8), `cities.service.ts` (165), `cities.controller.ts` (70), 2 DTO (24), **+2 spec** (40 — стаби) |
| **Залежності від** | Prisma, Auth |
| **Залежні від нього** | Events, Auth (city-access), Dashboard, Frontend (Cities, CityProfile) |
| **Точки входу** | `GET/POST/PATCH/DELETE /cities/*`, `POST /cities/:id/crews` |
| **Тести** | ⚠️ Мінімальні: service (14), controller (26) — стаби |
| **Складність** | Н (низька) — простий CRUD |
| **Пріоритет** | ⭐ **СЕРЕДНІЙ** — мало тестів, але простий |

### 1.12 Projects (Проєкти)

| | |
|---|---|
| **Призначення** | Управління освітніми проєктами (програми) |
| **Файли** | `projects.module.ts` (8), `projects.service.ts` (76), `projects.controller.ts` (89), 2 DTO (24) |
| **Залежності від** | Prisma, Auth |
| **Залежні від нього** | Frontend (ProjectProfile page) |
| **Точки входу** | `GET/POST/PATCH/DELETE /projects/*` |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | Н (низька) — 76 сервіс, CRUD |
| **Пріоритет** | ⭐ **СЕРЕДНІЙ** — без тестів, але простий |

### 1.13 Inventory (Інвентар)

| | |
|---|---|
| **Призначення** | Облік обладнання/інвентарю, використання при подіях |
| **Файли** | `inventory.module.ts` (13), `inventory.service.ts` (173), `inventory.controller.ts` (117) |
| **Залежності від** | Prisma, Auth, Categories |
| **Залежні від нього** | Frontend (Inventory page) |
| **Точки входу** | `GET/POST/PATCH/DELETE /inventory/*` |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | С (середня) — 173 сервіс + 117 контролер |
| **Пріоритет** | ⭐ **ВИСОКИЙ** — середнього розміру модуль без тестів |

### 1.14 Issues (Звіти про проблеми)

| | |
|---|---|
| **Призначення** | Повідомлення та відстеження проблем/бракувань |
| **Файли** | `issues.module.ts` (11), `issues.service.ts` (134), `issues.controller.ts` (42), 2 DTO (51), **+1 spec** (248) |
| **Залежності від** | Prisma, Auth, Events |
| **Залежні від нього** | Frontend (IssueCarousel) |
| **Точки входу** | `GET/POST/PATCH /issues/*` |
| **Тести** | ✅ Service (248) |
| **Складність** | Н (низька) — 134 сервіс |
| **Пріоритет** | 9 |

### 1.15 Days-Off (Підтверджені вихідні)

| | |
|---|---|
| **Призначення** | Зберігає підтверджені дні відпочинку працівників |
| **Файли** | `days-off.module.ts` (12), `days-off.service.ts` (160), `days-off.controller.ts` (44), 1 DTO (14), **+1 spec** (426) |
| **Залежності від** | Prisma, Auth |
| **Залежні від нього** | Calendar (frontend), DayOffRequests |
| **Точки входу** | `GET/POST/DELETE /days-off/*` |
| **Тести** | ✅ Service (426) — добре протестовано |
| **Складність** | Н (низька) |
| **Пріоритет** | 10 |

### 1.16 Day-Off-Requests (Запити на вихідні)

| | |
|---|---|
| **Призначення** | Схема запиту/затвердження/відхилення днів відпочинку |
| **Файли** | `day-off-requests.module.ts` (12), `day-off-requests.service.ts` (237), `day-off-requests.controller.ts` (65), 2 DTO (26), **+1 spec** (395) |
| **Залежності від** | Prisma, Auth, Days-Off, Notifications |
| **Залежні від нього** | Frontend (ReportsReviewPage → DayOffRequestsPanel) |
| **Точки входу** | `GET/POST/PATCH /day-off-requests/*`, `POST /day-off-requests/:id/approve` |
| **Тести** | ✅ Service (395) |
| **Складність** | С (середня) — approval flow з нотифікаціями |
| **Пріоритет** | 11 |

### 1.17 Notifications (Нотифікації)

| | |
|---|---|
| **Призначення** | Створення та доставка сповіщень користувачам |
| **Файли** | `notifications.module.ts` (12), `notifications.service.ts` (128), `notifications.controller.ts` (36), `templates.ts` (386) |
| **Залежності від** | Prisma, Auth |
| **Залежні від нього** | Events, DayOffRequests, Frontend (NotificationBell) |
| **Точки входу** | `GET /notifications/*`, `PATCH /notifications/:id/read` |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | Н (низька) — 128 сервіс, але шаблони (386) |
| **Пріоритет** | ⭐ **СЕРЕДНІЙ** — без тестів, але логіка проста |

### 1.18 School-Comments (Коментарі до шкіл)

| | |
|---|---|
| **Призначення** | Коментарі/нотатки до шкіл (дзвінки, проблеми, перенесення) |
| **Файли** | `school-comments.module.ts` (11), `school-comments.service.ts` (64), `school-comments.controller.ts` (58) |
| **Залежності від** | Prisma, Auth, Schools |
| **Залежні від нього** | Frontend (SchoolProfile → CommentsTimeline) |
| **Точки входу** | `GET/POST/DELETE /school-comments/*` |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | Н (низька) — мінімальний CRUD |
| **Пріоритет** | 12 — малий, без тестів |

### 1.19 Telegram (Telegram-інтеграція)

| | |
|---|---|
| **Призначення** | Відправка повідомлень через Telegram Bot API (помилки, алерти) |
| **Файли** | `telegram.module.ts` (10), `telegram.service.ts` (282), **+1 spec** (198) |
| **Залежності від** | Config (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) |
| **Залежні від нього** | ErrorAlertInterceptor ( глобальний), Events |
| **Точки входу** | Internal service — викликається через DI |
| **Тести** | ✅ Service (198) |
| **Складність** | С (середня) — HTTP-клієнт, розмітка повідомлень |
| **Пріоритет** | 13 |

### 1.20 Categories (Категорії)

| | |
|---|---|
| **Призначення** | Категорії для інвентарю та витрат |
| **Файли** | `categories.module.ts` (9), `categories.service.ts` (55), `categories.controller.ts` (46), 1 DTO (12) |
| **Залежності від** | Prisma, Auth |
| **Залежні від нього** | Inventory, Finance, Schools |
| **Точки входу** | `GET/POST/DELETE /categories/*` |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | Н (низька) — мінімальний CRUD |
| **Пріоритет** | 14 |

### 1.21 Metrics (Prometheus метрики)

| | |
|---|---|
| **Призначення** | Експорт метрик для Prometheus, перехоплення запитів для лічильників |
| **Файли** | `metrics.module.ts` (15), `metrics.service.ts` (27), `metrics.controller.ts` (13), `metrics.interceptor.ts` (26), `metrics.guard.ts` (19), **+2 spec** (93) |
| **Залежності від** | — (самодостатній) |
| **Залежні від нього** | infra/alloy-agent (скрапить /metrics) |
| **Точки входу** | `GET /metrics` |
| **Тести** | ✅ Guard (42), controller (51) |
| **Складність** | Н (низька) |
| **Пріоритет** | 15 |

### 1.22 Health (Health checks)

| | |
|---|---|
| **Призначення** | Перевірка здоров'я сервісів (PostgreSQL, Redis) |
| **Файли** | `health.module.ts` (11), `health.controller.ts` (25), `indicators/redis.health.ts` (29), **+1 spec** (42) |
| **Залежності від** | Prisma, Redis |
| **Залежні від нього** | Docker Compose healthcheck |
| **Точки входу** | `GET /.well-known/health` |
| **Тести** | ✅ Smoke (42) |
| **Складність** | Н (низька) |
| **Пріоритет** | 16 |

---

## 2. Frontend модулі

### 2.1 Auth (Аутентифікація)

| | |
|---|---|
| **Призначення** | Контекст сесії, захист маршрутів, логін/логаут |
| **Файли** | `context/AuthContext.tsx` (67), `components/ProtectedRoute.tsx` (17), `pages/Login.tsx` (219), `config/api.ts` (61 — CSRF, auto-refresh) |
| **Залежності від** | Backend API (/auth/*), axios |
| **Залежні від нього** | Всі сторінки (через ProtectedRoute + AuthContext) |
| **Тести** | ✅ `component/Login.test.tsx` (57+42 smoke), `component/ProtectedRoute.test.tsx` (42), `unit/apiRefresh.test.ts` (262), `unit/api.test.ts` (33) |
| **Складність** | С (середня) |
| **Пріоритет** | 1 — критичний, має непогане покриття |

### 2.2 Dashboard (Панель керування)

| | |
|---|---|
| **Призначення** | Головна сторінка з віджетами: KPI, воронка, активність, прострочені школи |
| **Файли** | `pages/Dashboard.tsx` (127), `pages/OverviewTab.tsx` (171), `components/dashboard/` (11 файлів, ~1122 рядки: StaleSchools, EventsWidget, ActivityFeed, TodayEvents, CitiesTable, EventRow, UpcomingEvents, MonthlyKpi, FunnelBar, CollapsibleSection, DashboardTopNav, TabErrorBoundary) |
| **Залежності від** | `useDashboardSummary`, `useDashboardData`, Backend `/dashboard/*` |
| **Тести** | ✅ `component/Dashboard.test.tsx` (50), `component/Dashboard.smoke.test.tsx` (62) |
| **Складність** | С (середня) — 12 файлів, багато віджетів |
| **Пріоритет** | 2 |

### 2.3 Schools (Школи)

| | |
|---|---|
| **Призначення** | Список шкіл, профіль школи з 7+ вкладками, модальні вікна, таймлайни |
| **Файли** | `pages/Schools.tsx` (777), `pages/Kindergartens.tsx` (636), `components/schools/` (5 файлів, 565), `components/school-profile/` (15 файлів, ~1766), `components/school-profile/modals/` (10 файлів, ~1809) · **Разом: ~5500+ рядків, 30+ файлів** |
| **Залежності від** | `useSchoolProfile`, `useSchoolComments`, Backend `/schools/*`, `/school-comments/*` |
| **Тести** | ✅ `component/Schools.test.tsx` (56), `component/SchoolCard.test.tsx` (115), `component/SchoolCreate.smoke.test.tsx` (53), `component/EventsTable.test.tsx` (140), `component/CompletedEventModal.test.tsx` (55), `component/Pipeline.test.tsx` (48), `unit/hooks/useSchoolProfile.test.tsx` (78), `unit/schoolUtils.test.ts` (79), `component/ReportModal.test.tsx` (116) |
| **Складність** | **ВВ** (дуже висока) — найбільший frontend-модуль, 30+ компонентів, 10 модалок |
| **Пріоритет** | 3 — величезний, потребує розбиття на підмодулі для перевірки |

### 2.4 Events (Події)

| | |
|---|---|
| **Призначення** | Список подій, звіт по події, модалки створення/редагування |
| **Файли** | `pages/Events.tsx` (292), `pages/EventReport.tsx` (120), `components/school-profile/modals/EventModal.tsx` (276), `components/school-profile/modals/RescheduleModal.tsx` (128), `components/school-profile/EventDetails.tsx` (121), `components/school-profile/EventPreparation.tsx` (119) |
| **Залежності від** | `useSchoolProfile`, Backend `/events/*` |
| **Тести** | ✅ `component/EventReport.test.tsx` (148) |
| **Складність** | С (середня) — частково розпорошений по school-profile |
| **Пріоритет** | 4 |

### 2.5 Calendar (Календар)

| | |
|---|---|
| **Призначення** | Місячний календар з візуалізацією подій, днями відпочинку |
| **Файли** | `pages/CalendarView.tsx` (140), `features/calendar/` (11 файлів, ~1079: DesktopCalendarGrid, MobileCalendarGrid, MobileDayDetailsPanel, CalendarHeader, EventTooltip, хуки, утиліти, константи), `components/calendar/DayOffModal.tsx` (126) |
| **Залежності від** | `useCalendar`, `useDaysOff`, Backend `/days-off/*`, `/events/*` |
| **Тести** | ✅ `component/calendar/CalendarComponents.test.tsx` (73), `component/Calendar.smoke.test.tsx` (38), `unit/calendar/date.test.ts` (60), `unit/calendar/color.test.ts` (54) |
| **Складність** | С (середня) — добре організований feature-фолдер |
| **Пріоритет** | 5 |

### 2.6 Finance (Фінанси)

| | |
|---|---|
| **Призначення** | Фінансова аналітика з графіками, ручні витрати |
| **Файли** | `pages/Finance.tsx` (81), `components/finance/FinanceCharts.tsx` (653!), `components/finance/ManualExpenseModal.tsx` (237), `components/finance/ExpenseDetailModal.tsx` (74) |
| **Залежності від** | `useManualExpenses`, `useSalary`, Backend `/finance/*` |
| **Тести** | ❌ **НЕМАЄ** для FinanceCharts (653 рядки!) |
| **Складність** | В (висока) — FinanceCharts = 653 рядки, складні графіки |
| **Пріоритет** | ⭐ **ВИСОКИЙ** — великий компонент без тестів |

### 2.7 Reports (Звіти)

| | |
|---|---|
| **Призначення** | Сторінка перевірки звітів, форма подання, панель запитів на вихідні |
| **Файли** | `features/reports/pages/ReportsReviewPage.tsx` (372), `features/reports/components/ReportForm.tsx` (544), `features/reports/components/DayOffRequestsPanel.tsx` (159), `features/reports/components/ReportStatusBadge.tsx` (32) |
| **Залежності від** | `useReports`, `useDayOffRequests`, Backend `/reports/*`, `/day-off-requests/*` |
| **Тести** | ✅ `component/ReportsReviewPage.test.tsx` (100), `component/EventReport.test.tsx` (148) |
| **Складність** | С (середня) — ReportForm 544 рядки |
| **Пріоритет** | 6 |

### 2.8 Analytics (Аналітика)

| | |
|---|---|
| **Призначення** | Детальна аналітика з графіками, фільтрами, цілями та анотаціями |
| **Файли** | `pages/Analytics.tsx` (**2361 рядок!** — найбільший файл у проєкті) |
| **Залежності від** | `useAnalytics`, Backend `/analytics/*` |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | **ВВ** (дуже висока) — 2361 рядок в одному файлі |
| **Пріоритет** | ⭐ **КРИТИЧНИЙ** — найбільший файл без жодних тестів |

### 2.9 Employees (Працівники)

| | |
|---|---|
| **Призначення** | Управління працівниками, фільтрація, CRUD |
| **Файли** | `pages/Employees.tsx` (575), `components/employees/` (6 файлів, ~1060: UserModal, EmployeeCard, EmployeesTable, FilterPanel, ProjectModal, EmployeesHeader) |
| **Залежності від** | `useEmployees`, Backend `/users/*` |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | С (середня) — 12 файлів |
| **Пріоритет** | ⭐ **ВИСОКИЙ** — жодних тестів |

### 2.10 Cities (Міста)

| | |
|---|---|
| **Призначення** | Список міст, профіль міста з аналітикою, рейтинг |
| **Файли** | `pages/Cities.tsx` (183), `pages/CityProfile.tsx` (779), `pages/CityLeaderboard.tsx` (277), `components/cities/` (3, ~650), `components/city-profile/CityAnalytics.tsx` (258) |
| **Залежності від** | `useCities`, Backend `/cities/*`, `/analytics/*` |
| **Тести** | ❌ **НЕМАЄ** для CityProfile (779 рядків) |
| **Складність** | С (середня) |
| **Пріоритет** | ⭐ **ВИСОКИЙ** — CityProfile без тестів |

### 2.11 Salary (Зарплатня)

| | |
|---|---|
| **Призначення** | Сторінки зарплатні: витрати, команда, моя зарплата, компанія |
| **Файли** | `features/salary/pages/Expenses.tsx` (227), `features/salary/pages/Company.tsx` (113), `features/salary/pages/TeamSalaries.tsx` (94), `features/salary/pages/MySalary.tsx` (78), `features/salary/components/SalaryEntryForm.tsx` (87), `features/salary/components/SalaryStatusBadge.tsx` (14) |
| **Залежності від** | `useSalary`, `useManualExpenses`, Backend `/salary/*`, `/finance/*` |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | Н (низька) — прості сторінки |
| **Пріоритет** | 7 |

### 2.12 Inventory (Інвентар)

| | |
|---|---|
| **Призначення** | Облік обладнання |
| **Файли** | `pages/Inventory.tsx` (324), `components/inventory/InventoryItemModal.tsx` (158) |
| **Залежності від** | `useInventory`, `useCategories`, Backend `/inventory/*` |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | Н (низька) |
| **Пріоритет** | 8 |

### 2.13 Issues (Проблеми)

| | |
|---|---|
| **Призначення** | Карусель проблем/бракувань |
| **Файли** | `pages/IssuesTab.tsx` (8), `components/IssueCarousel.tsx` (145) |
| **Залежності від** | Backend `/issues/*` |
| **Тести** | ✅ `component/IssueCarousel.test.tsx` (76) |
| **Складність** | Н (низька) |
| **Пріоритет** | 9 |

### 2.14 Notifications (Нотифікації)

| | |
|---|---|
| **Призначення** | Дзвіночок з кількістю непрочитаних |
| **Файли** | `components/NotificationBell.tsx` (152) |
| **Залежності від** | `useNotifications`, Backend `/notifications/*` |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | Н (низька) |
| **Пріоритет** | 10 |

### 2.15 UI Primitives (Базові компоненти)

| | |
|---|---|
| **Призначення** | Універсальні UI-елементи: кнопка, модалка, тост, підтвердження, скелетон тощо |
| **Файли** | `components/ui/` (13 файлів, ~614 рядків: Toast, Modal, ConfirmDialog, Skeleton, Button, Badge, Input, Card, EmptyState, LoadingBar, OptimizedImage, SuccessCheck, ErrorShake) |
| **Залежності від** | — (тільки React, Tailwind, framer-motion) |
| **Залежні від нього** | **Всі** компоненти |
| **Тести** | ✅ `component/ConfirmDialog.test.tsx` (154), `component/LoadingBar.test.tsx` (18) — частково |
| **Складність** | Н (низька) |
| **Пріоритет** | 11 — частково протестовано |

### 2.16 Layout (Навігація та макет)

| | |
|---|---|
| **Призначення** | Sidebar, мобільна навігація, верхня панель, BottomNav, анімації переходів |
| **Файли** | `components/Layout.tsx` (185), `components/MobileTopNav.tsx` (64), `components/BottomNavigationBar.tsx` (102), `components/ScrollToTop.tsx` (9), `lib/motion.ts` (275), `lib/viewTransition.ts` (23), `animations/employees.ts` (59) |
| **Залежності від** | `constants/navTabs`, AuthContext |
| **Тести** | ✅ `component/MobileTopNav.test.tsx` (38) |
| **Складність** | С (середня) — складні анімації, свайп |
| **Пріоритет** | 12 |

### 2.17 Onboarding

| | |
|---|---|
| **Призначення** | Туторіал для нових користувачів |
| **Файли** | `components/OnboardingTour.tsx` (358) |
| **Залежності від** | AuthContext |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | С (середня) — 358 рядків |
| **Пріоритет** | 13 |

### 2.18 Config (Конфігурація)

| | |
|---|---|
| **Призначення** | Axios-інстанс з CSRF та auto-refresh, TanStack Query клієнт |
| **Файли** | `config/api.ts` (61), `config/queryClient.ts` (10) |
| **Залежності від** | — |
| **Тести** | ✅ `unit/apiRefresh.test.ts` (262), `unit/api.test.ts` (33) |
| **Складність** | Н (низька) |
| **Пріоритет** | 14 |

### 2.19 Types (Типи)

| | |
|---|---|
| **Призначення** | Спільні TypeScript-інтерфейси для всього фронтенду |
| **Файли** | `types/index.ts` (342), `types/telegram.d.ts` (13) |
| **Залежності від** | — (чисті типи) |
| **Тести** | ❌ Немає (але типи перевіряються компілятором) |
| **Складність** | Н (низька) |
| **Пріоритет** | 15 |

### 2.20 Utils (Утиліти)

| | |
|---|---|
| **Призначення** | Допоміжні функції: даунсемплінг, LOD, CSV-експорт, форматування |
| **Файли** | `utils/downsample.ts` (78), `utils/lod.ts` (51), `utils/exportCsv.ts` (27), `utils/preparationStatus.ts` (17), `utils/financeCalculations.ts` (18), `utils/formatCurrency.ts` (7), `utils/roles.ts` (3) |
| **Тести** | ✅ `unit/exportCsv.test.ts` (102), `unit/lod.test.ts` (93), `unit/formatCurrency.test.ts` (29), `unit/roles.test.ts` (20) |
| **Складність** | Н (низька) |
| **Пріоритет** | 16 |

### 2.21 Lib (Бібліотеки)

| | |
|---|---|
| **Призначення** | framer-motion варіанти, view transitions, haptic feedback |
| **Файли** | `lib/motion.ts` (275), `lib/viewTransition.ts` (23), `lib/haptics.ts` (15) |
| **Тести** | ❌ **НЕМАЄ** |
| **Складність** | Н (низька) |
| **Пріоритет** | 17 |

---

## 3. Інфраструктурні модулі

### 3.1 Human Bridge (MCP + Telegram)

| | |
|---|---|
| **Призначення** | Міст між Telegram-ботом та AI-агентами через MCP (Model Context Protocol) |
| **Розташування** | `tools/human-bridge/` |
| **Технології** | grammy (Telegram), @modelcontextprotocol/sdk, SSE transport |
| **Тести** | ❌ Невідомо |
| **Пріоритет** | 18 — інструмент розробки, не продакшн-код |

### 3.2 Queue Tools

| | |
|---|---|
| **Призначення** | Pre-commit guards: charset-guard, lint-queue, build-index, telegram-notify |
| **Розташування** | `tools/queue-tools/` |
| **Тести** | ❌ Невідомо |
| **Пріоритет** | 19 |

### 3.3 CI/CD

| | |
|---|---|
| **Призначення** | GitHub Actions: lint, typecheck, test, e2e, coverage, secrets scan |
| **Розташування** | `.github/workflows/ci.yml` (299), `.github/workflows/secrets-scan.yml` (24) |
| **Пріоритет** | 20 |

### 3.4 Docker & Deploy

| | |
|---|---|
| **Призначення** | Multi-stage збірка backend, docker-compose (postgres+redis+backend), Vercel SPA |
| **Розташування** | `apps/Dockerfile`, `apps/docker-compose.yml`, `apps/frontend/vercel.json` |
| **Пріоритет** | 21 |

### 3.5 Observability (Grafana Alloy)

| | |
|---|---|
| **Призначення** | Метрики: scrapes /metrics, remote-writes до Grafana Cloud |
| **Розташування** | `infra/alloy-agent/Dockerfile`, `infra/alloy-agent/config.alloy` |
| **Пріоритет** | 22 |

### 3.6 Backup & Restore

| | |
|---|---|
| **Призначення** | pg_dump/pg_restore скрипти з автоочищенням старих бекапів |
| **Розташування** | `scripts/backup.sh`, `scripts/restore.sh` |
| **Пріоритет** | 23 |

### 3.7 Load Tests

| | |
|---|---|
| **Призначення** | k6/Artillery тести навантаження |
| **Розташування** | `load-tests/dashboard.js`, `load-tests/school-profile.js` |
| **Пріоритет** | 24 |

### 3.8 Agent Coordination

| | |
|---|---|
| **Призначення** | Черга завдань для AI-агентів (11 задач, пропозиції, рішення) |
| **Розташування** | `.agents/` |
| **Пріоритет** | 25 — допоміжний |

### 3.9 Skills (Протоколи)

| | |
|---|---|
| **Призначення** | 8 документів-протоколів для AI-агентів |
| **Розташування** | `skills/` |
| **Пріоритет** | 26 |

---

## 4. Наскрізні аспекти (cross-cutting)

Ці речі НЕ є окремими модулями, але пронизують всю систему. Їх варто перевіряти **окремим проходом**, а не в кожному модулі.

### 4.1 Auth Guards & Decorators (Backend)

- `AuthGuard` (JWT cookie), `CsrfGuard` (CSRF token), `RolesGuard`, `OwnershipGuard`, `UserThrottlerGuard`
- Декоратори: `@CurrentUser()`, `@Roles()`, `@CheckOwnership()`, `@SkipCsrf()`
- Глобально зареєстровані як `APP_GUARD`
- **Пріоритет перевірки**: ВИСОКИЙ (першим, до модулів)

### 4.2 Interceptors (Backend)

- `SanitizeInterceptor` (глобальний) — санація вводу
- `ErrorAlertInterceptor` (глобальний) — відправка помилок у Telegram
- `AuditLogInterceptor` (per-route) — логування мутацій
- `MetricsInterceptor` (per-route) — метрики Prometheus
- **Пріоритет**: ВИСОКИЙ

### 4.3 Error Handling & Validation (Backend)

- `AllExceptionsFilter` (глобальний) — обробка всіх винятків
- `LocalizedValidationPipe` (глобальний, request-scoped) — валідація з i18n
- `AppException` — бізнес-винятки з ключами
- **Пріоритет**: ВИСОКИЙ

### 4.4 Cache (Backend)

- `RedisCacheModule` з `CacheVersionService` для інвалідації
- **Пріоритет**: СЕРЕДНІЙ

### 4.5 Logging (Backend + Frontend)

- Backend: Pino через `LoggerModule`
- Frontend: Sentry (`instrument.ts`)
- **Пріоритет**: СЕРЕДНІЙ

### 4.6 I18n (Backend)

- `I18nModule` з українськими повідомленнями (`messages.ts`)
- Помилки повертаються українською, `Accept-Language: en` → англійською
- **Пріоритет**: НИЗЬКИЙ

### 4.7 Feature Flags (Backend)

- `FeatureFlagsModule` — простий сервіс (29 рядків)
- **Пріоритет**: НИЗЬКИЙ

### 4.8 Rate Limiting (Backend)

- `ThrottlerModule` (Redis-backed, 100 req/60s) + `UserThrottlerGuard`
- **Пріоритет**: СЕРЕДНІЙ

### 4.9 Cookie Auth + CSRF (Fullstack)

- Backend: cookie `access_token`, `refresh_token`, `csrf_token`
- Frontend: axios interceptor додає `X-CSRF-Token` header
- Auto-refresh on 401 → `auth:expired` event
- **Пріоритет**: ВИСОКИЙ

### 4.10 Sentry (Fullstack)

- Backend: `instrument.ts` з PII redaction
- Frontend: `instrument.ts` (10 рядків)
- **Пріоритет**: НИЗЬКИЙ

---

## 5. Дублювання та потенційний copy-paste

| # | Що | Де | Опис |
|---|---|---|---|
| 1 | **Days-Off + Day-Off-Requests** | Backend: два окремі модулі | `days-off` зберігає підтверджені дні, `day-off-requests` — approval flow. Логічно пов'язані, але розділені. Перевіряти разом. |
| 2 | **Schools + SchoolComments** | Backend: два модулі | SchoolComments — підмодуль Schools. Перевіряти разом. |
| 3 | **Events + Reports + Finance** | Backend: три модуля | Events має `events-report.service.ts` (250), Reports має `reports.service.ts` (499), Finance залежить від обох. Потенційне дублювання логіки звітів. |
| 4 | **Schools page + Kindergartens page** | Frontend: `pages/Schools.tsx` (777) + `pages/Kindergartens.tsx` (636) | Дуже схожі компоненти (різний заголовок?). Можливо, варто об'єднати або перевірити на дублювання. |
| 5 | **Users/Cities тести-стаби** | Backend: `users.service.spec.ts` (16), `cities.service.spec.ts` (14) | Фактично порожні тести, що створюють хибне враження покриття. |

---

## 6. Мертвий/невикористовуваний код

| # | Що | Докази | Ризик |
|---|---|---|---|
| 1 | `packages/` директорія | Оголошена в `pnwm-workspace.yaml`, але не існує | Низький (технічний борг) |
| 2 | `scripts/` (кореневий) | Існує, але порожня або з невідомим вмістом | Низький |
| 3 | `school-contacts.seed.ts` (1068) | Seed-файл, використовується одноразово | Низький |
| 4 | 7 seed/import скриптів | `seed-admin.js`, `seed-demo.js`, `seed-categories.js`, `cleanup-db.js`, `import-*.js`, `export-schools.js` | Низький (інфраструктурні) |
| 5 | `experience/`, `knowledge/`, `doc/`, `docs/`, `import/`, `patches/`, `backups/` | Директорії невідомого призначення | Можливо мертвий код |
| 6 | `IssuesTab.tsx` (8 рядків) | Фактично re-export або стаб | Низький |

---

## 7. Порядок перевірки

**Обґрунтування**: Спочатку перевіряємо фундамент (Prisma, Auth, cross-cutting), потім модулі без тестів (найвищий ризик), далі за графіком залежностей від листя до кореня.

### Етап 1: Фундамент та cross-cutting (~2-3 год)

| # | Модуль | Пріоритет | Причина |
|---|---|---|---|
| 1.1 | **Prisma** | Фундамент | Простий, але залежить від нього все |
| 1.2 | **Auth guards & decorators** | Критичний | Безпека, впливає на всі модулі |
| 1.3 | **Interceptors & Filters** | Критичний | Глобальна обробка помилок |
| 1.4 | **Cache + Rate Limiting** | Високий | Redis — єдина точка відмови |
| 1.5 | **Cookie Auth + CSRF (fullstack)** | Високий | Синхронізація бек- і фронтенду |

### Етап 2: Модулі БЕЗ тестів (~3-4 год)

| # | Модуль | Складність | Причина |
|---|---|---|---|
| 2.1 | ⭐ **Analytics** (backend + frontend) | ВВ | 612+318 бекенд, 2361 фронтенд, жодного тесту |
| 2.2 | ⭐ **Finance Charts** (frontend) | В | 653 рядки без тестів |
| 2.3 | ⭐ **Employees** (frontend) | С | 12 файлів, 0 тестів |
| 2.4 | ⭐ **Inventory** (backend + frontend) | С | 173+158, жодного тесту |
| 2.5 | ⭐ **Users** (backend) | С | Тести-стаби (16 рядків) |
| 2.6 | ⭐ **Cities** (backend) | Н | Тести-стаби (14 рядків) |
| 2.7 | ⭐ **Notifications** (backend) | Н | 128 сервіс + 386 шаблонів, 0 тестів |
| 2.8 | Projects (backend) | Н | 76 сервіс, 0 тестів |
| 2.9 | Categories (backend) | Н | 55 сервіс, 0 тестів |
| 2.10 | SchoolComments (backend) | Н | 64 сервіс, 0 тестів |
| 2.11 | CityProfile (frontend) | С | 779 рядків, 0 тестів |
| 2.12 | Onboarding (frontend) | С | 358 рядків, 0 тестів |
| 2.13 | Salary pages (frontend) | Н | 4 прості сторінки, 0 тестів |

### Етап 3: Ядро бізнесу (~4-6 год)

| # | Модуль | Складність | Тести |
|---|---|---|---|
| 3.1 | **Events** (backend) | В | ✅ Добре (1563 рядки spec) |
| 3.2 | **Schools** (backend) | В | ✅ Непогано (613 spec) |
| 3.3 | **Schools** (frontend) | ВВ | ✅ Частково (9 тестів) |
| 3.4 | **Reports** (backend) | С | ✅ Service (211) |
| 3.5 | **Finance** (backend) | В | ✅ Service (450) |
| 3.6 | **Salary** (backend) | С | ✅ Service (110) |

### Етап 4: Залежні модулі (~2-3 год)

| # | Модуль | Складність | Тести |
|---|---|---|---|
| 4.1 | Dashboard (backend + frontend) | С | ✅ Backend (297), ✅ Frontend (112) |
| 4.2 | Calendar (frontend) | С | ✅ (225) |
| 4.3 | Reports (frontend) | С | ✅ (248) |
| 4.4 | Days-Off + DayOffRequests | С+С | ✅ (426+395) |
| 4.5 | Issues (backend) | Н | ✅ (248) |
| 4.6 | Telegram (backend) | С | ✅ (198) |

### Етап 5: Малі модулі та інфра (~1-2 год)

| # | Модуль | Складність |
|---|---|---|
| 5.1 | Metrics (backend) | Н |
| 5.2 | Health (backend) | Н |
| 5.3 | UI Primitives (frontend) | Н |
| 5.4 | Layout (frontend) | С |
| 5.5 | Config, Types, Utils, Lib (frontend) | Н |
| 5.6 | Human Bridge, Queue Tools | Н |
| 5.7 | CI/CD, Docker, Scripts | Н |

---

## Зведена таблиця

| № | Модуль | Backend / Frontend | Файли (шт) | Рядків (≈) | Залежності (від / до) | Тести | Складн. | Пріоритет | Причина пріоритету |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Prisma | B | 4+29міг+7скр | 564+600 | — / все | ✅ | Н | Фундамент | База даних |
| 2 | Auth | B | 20 | 860+864 | Prisma / все | ✅✅ | В | Етап 1 | Безпека, глобальний |
| 3 | Events | B | 22 | 1811+1563 | Prisma,Auth,Schools / Reports,Finance | ✅✅ | В | Етап 3 | Ядро бізнесу |
| 4 | Schools | B | 17 | 2254+613 | Prisma,Auth,Categories / Events,Comments | ✅ | В | Етап 3 | Великий модуль |
| 5 | Reports | B | 8 | 764+211 | Prisma,Auth,Events,Finance / Salary | ✅ | С | Етап 3 | |
| 6 | Finance | B | 9 | 960+450 | Prisma,Auth,Reports / Salary,Dashboard | ✅ | В | Етап 3 | Найбільший сервіс |
| 7 | Salary | B | 7 | 369+110 | Prisma,Auth,Reports,Finance / Dashboard | ✅ | С | Етап 3 | |
| 8 | Dashboard | B+F | 2+12 | 468+1249 | Prisma,Events,Schools,Reports,Finance | ✅ | С | Етап 4 | |
| 9 | ⭐ Analytics | B+F | 3+1 | 941+2361 | Prisma,Events,Reports,Schools | ❌ | ВВ | **Етап 2** | **Найбільший без тестів** |
| 10 | Users | B+F | 5+7 | 278+1060 | Prisma,Auth / — | ⚠️ стаби | С | **Етап 2** | **Майже без тестів** |
| 11 | Cities | B+F | 6+5 | 287+1888 | Prisma,Auth / — | ⚠️ стаби | С+ | **Етап 2** | **Майже без тестів** |
| 12 | Inventory | B+F | 3+2 | 303+482 | Prisma,Auth,Categories | ❌ | С | **Етап 2** | **Без тестів** |
| 13 | Projects | B | 4 | 197 | Prisma,Auth | ❌ | Н | **Етап 2** | **Без тестів** |
| 14 | Notifications | B+F | 4+1 | 562+152 | Prisma,Auth | ❌ | Н | **Етап 2** | **Без тестів** |
| 15 | Categories | B | 4 | 122 | Prisma,Auth | ❌ | Н | **Етап 2** | **Без тестів** |
| 16 | SchoolComments | B | 3 | 133 | Prisma,Auth,Schools | ❌ | Н | **Етап 2** | **Без тестів** |
| 17 | Days-Off | B | 5 | 662 | Prisma,Auth | ✅ | Н | Етап 4 | |
| 18 | DayOffRequests | B | 6 | 743 | Prisma,Auth,DaysOff,Notifications | ✅ | С | Етап 4 | |
| 19 | Issues | B+F | 5+2 | 258+153 | Prisma,Auth,Events | ✅ | Н | Етап 4 | |
| 20 | Telegram | B | 3 | 490 | Config | ✅ | С | Етап 4 | |
| 21 | Metrics | B | 6 | 207 | — | ✅ | Н | Етап 5 | |
| 22 | Health | B | 4 | 107 | Prisma,Redis | ✅ | Н | Етап 5 | |
| 23 | Employees | F | 7 | 1635 | useEmployees, /users/* | ❌ | С | **Етап 2** | **Без тестів** |
| 24 | Finance (FE) | F | 4 | 1045 | useManualExpenses, /finance/* | ❌ | В | **Етап 2** | **653 рядки без тестів** |
| 25 | Salary (FE) | F | 6 | 613 | useSalary, /salary/* | ❌ | Н | **Етап 2** | **Без тестів** |
| 26 | CityProfile | F | 6 | 2342 | useCities, /cities/* | ❌ | С | **Етап 2** | **779 рядків без тестів** |
| 27 | Calendar | F | 12 | 1345 | useCalendar,useDaysOff | ✅ | С | Етап 4 | |
| 28 | Reports (FE) | F | 4 | 1107 | useReports,useDayOffRequests | ✅ | С | Етап 4 | |
| 29 | Schools (FE) | F | 30+ | 5500+ | useSchoolProfile | ✅ част. | ВВ | Етап 3 | Найбільший FE |
| 30 | Events (FE) | F | 6 | ~1056 | useSchoolProfile | ✅ | С | Етап 3 | |
| 31 | Onboarding | F | 1 | 358 | AuthContext | ❌ | С | **Етап 2** | **Без тестів** |
| 32 | Notifications (FE) | F | 1 | 152 | useNotifications | ❌ | Н | Етап 2 | |
| 33 | UI Primitives | F | 13 | 614 | — | ⚠️ част. | Н | Етап 5 | |
| 34 | Layout | F | 7 | 717 | navTabs, Auth | ✅ | С | Етап 5 | |
| 35 | Config | F | 2 | 71 | — | ✅ | Н | Етап 5 | |
| 36 | Types | F | 2 | 355 | — | — | Н | Етап 5 | |
| 37 | Utils | F | 7 | 201 | — | ✅ | Н | Етап 5 | |
| 38 | Lib | F | 3 | 313 | — | ❌ | Н | Етап 5 | |

**Легенда**: B = backend, F = frontend, ✅✅ = розгорнуті тести, ⚠️ = стаби/мінімальні, ❌ = немає

---

## Підсумок

| Метрика | Значення |
|---|---|
| **Backend feature-модулів** | 23 |
| **Frontend логічних модулів** | ~16 |
| **Модулів БЕЗ тестів (backend)** | 6 (Analytics, Inventory, Notifications, Projects, Categories, SchoolComments) |
| **Модулів з мінімальними тестами (backend)** | 2 (Users, Cities) |
| **Модулів БЕЗ тестів (frontend)** | 9 (Analytics, Finance Charts, Employees, Salary, CityProfile, Inventory, Onboarding, Notifications, Projects/Categories) |
| **Найбільший файл** | `Analytics.tsx` — 2361 рядок |
| **Найбільший сервіс** | `finance.service.ts` — 697 рядків |
| **Загальна кількість spec-файлів (backend)** | 35 unit + 11 e2e |
| **Загальна кількість тестів (frontend)** | 42 (unit + component) |
| **Орієнтовний час перевірки** | 15-20 годин (5 етапів) |
