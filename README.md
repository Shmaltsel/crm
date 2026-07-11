# Event CRM

Спеціалізована CRM-система для управління освітньо-розважальними заходами у школах та дитячих садках.

Система автоматизує повний цикл роботи організації: від пошуку навчальних закладів та першого контакту до проведення заходу, фінансової звітності та аналітики.

---

## Основні можливості

### Управління подіями

- Створення та редагування заходів
- Планування дат проведення
- Прив'язка до міста, школи або дитячого садка
- Призначення екіпажів
- Ведення контактної інформації
- Контроль кількості учасників
- Відстеження статусів проведення

### CRM Pipeline

Система підтримує повноцінну воронку роботи із закладами:

- Base
- First Contact
- Interested
- Pre Approval
- Date Confirmed
- Preparation
- In Progress
- Done
- Report
- Re Sale

### Управління навчальними закладами

- База шкіл
- База дитячих садків
- Пошук та фільтрація
- Детальні профілі закладів
- Контактна інформація
- Історія взаємодії

### Автоматичне наповнення даних

Інтеграція з відкритими джерелами для автоматичного отримання:

- адрес
- інформації про керівництво
- статистичних даних закладів

### Управління екіпажами

- Призначення ведучих
- Призначення водіїв
- Управління транспортом
- Контроль завантаження екіпажів

### Підготовка заходів

Чеклісти підготовки:

- бронювання обладнання
- підготовка матеріалів
- контроль документів
- підтвердження із закладом
- готовність екіпажу

### Історія змін

Для кожного заходу зберігається:

- хто виконав зміну
- дата та час зміни
- опис змін
- коментарі

### Фінансовий модуль

- Облік доходів
- Облік витрат
- Розрахунок прибутку
- Звіти по заходах

### Аналітика та Dashboard

Система надає бізнес-аналітику в реальному часі:

- KPI
- Динаміка доходів
- Прибутковість заходів
- Статистика по містах
- Статистика по закладах
- Аналіз проєктів
- Найкращі та найгірші заходи
- Прогнозування виручки

---

## Ролі користувачів

- Super Admin
- Admin
- Manager
- Host
- Driver
- Accountant

---

## Технологічний стек

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt

### Frontend

- React
- TypeScript
- React Router
- React Query
- Zustand
- React Hook Form
- Zod
- Tailwind CSS
- Recharts

---

## Архітектура

Backend побудований на модульній архітектурі NestJS.

Основні модулі:

- Authentication
- Users
- Events
- Schools
- Kindergartens
- Cities
- Finance
- Reports
- Dashboard
- Search

---

## Основні бізнес-процеси

1. Додавання навчального закладу
2. Встановлення контакту
3. Робота через CRM-воронку
4. Планування заходу
5. Призначення екіпажу
6. Підготовка та проведення
7. Формування звіту
8. Аналіз фінансових показників
9. Повторний продаж

---

## Мета проєкту

Створення єдиного середовища для управління мережею освітніх заходів, автоматизації операційної діяльності та отримання актуальної бізнес-аналітики.

---

## Технічна документація

### Вимоги

- Node.js 22+
- pnpm 9+
- PostgreSQL 16+ (проєкт використовує Neon serverless Postgres)
- Redis (для кешування та rate-limiting)

### Встановлення

```bash
git clone <repo-url>
cd CRM
pnpm install
```

### Змінні середовища

Створіть `apps/backend/.env` за зразком `apps/backend/.env.example`:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@host/db?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://user:pass@host/db
FRONTEND_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
TELEGRAM_BOT_TOKEN=your_bot_token
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=SecurePassword123!
ALLOW_PROD_SEED=false
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

`DATABASE_URL` — pooled-з'єднання (для рантайму), `DIRECT_URL` — пряме (для міграцій і бекапів).

### Локальний запуск

```bash
# Застосувати міграції бази даних
pnpm --filter backend exec prisma migrate deploy

# Створити адміна
pnpm --filter backend exec node prisma/seed-admin.js

# (опційно) Наповнити demo-даними
pnpm seed:demo

# Запустити backend + frontend одночасно
pnpm dev
```

Backend підніметься на `http://localhost:3000`, frontend — на `http://localhost:5173`.

### API документація

- Swagger UI: `http://localhost:3000/docs`
- Redoc: `http://localhost:3000/docs/redoc`
- OpenAPI JSON (для імпорту в Postman): `http://localhost:3000/docs-json`

Swagger доступний лише поза продакшн-середовищем (`NODE_ENV !== 'production'`).

### Спостережуваність (Observability)

- **Health check:** `GET /.well-known/health` — повертає `200`, якщо база даних і Redis доступні, `503` з деталями — якщо ні
- **Метрики (Prometheus):** `GET /metrics`
- **Помилки:** інтегровано Sentry, конфігурується через `SENTRY_DSN`

### Backup / Restore

```bash
# Створити бекап
DIRECT_URL="<connection-string>" ./scripts/backup.sh

# Відновити з бекапу
DIRECT_URL="<connection-string>" ./scripts/restore.sh backups/backup_YYYYMMDD_HHMMSS.dump
```

Бекапи автоматично зберігаються 14 днів, старіші видаляються.

### Feature Flags

Керуються через env-змінні у форматі `FEATURE_<NAME>=true|false`:

```env
FEATURE_TELEGRAM_NOTIFICATIONS=true
FEATURE_AUTO_SCHOOL_IMPORT=true
FEATURE_FINANCE_MODULE=true
FEATURE_DASHBOARD_FORECASTING=false
```

### Локалізація

API повертає повідомлення про помилки українською за замовчуванням. Для отримання англійською — додайте заголовок `Accept-Language: en` до запиту.

### Деплой

**Backend** — Railway (автоматичний деплой з `main` гілки через Nixpacks, Dockerfile не використовується).

Обов'язкові env-змінні на Railway: усі перелічені вище, плюс `REDIS_URL` (внутрішній Railway Redis-адон).

**Frontend** — Vercel (автоматичний деплой з `main` гілки).

Обов'язкові env-змінні на Vercel:

```env
VITE_API_URL=https://your-backend.up.railway.app
```

**Міграції бази даних** застосовуються вручну перед деплоєм або через build-хук:

```bash
pnpm --filter backend exec prisma migrate deploy
```

### Тестування

```bash
pnpm test:unit          # unit-тести backend + frontend (повний прогін, fallback)
pnpm test:e2e            # e2e-тести (backend jest + frontend Playwright)
pnpm test:coverage       # покриття коду з гейтом 70/50/60/70
pnpm test:smoke          # швидкий димовий набір (*.smoke.*)
pnpm test:affected       # лише тести, зачеплені змінами (Turbo + --changed)
```

#### Testing Strategy (affected-first)

Замість послідовної бісекції (Smoke → Module → File → Unit) використовується
affected-first підхід: реальний граф залежностей від самих раннерів (Vitest/Jest) +
кешування Turbo на рівні пакетів. Це швидше (немає латентності між рівнями) і коректніше
(не забуває спільні файли на кшталт `src/config/api.ts`, `common/` — на відміну від ручного regex-мапінгу).

Рівні перевірки:

| Рівень | Тригер | Команда | Coverage | Шардування |
|---|---|---|---|---|
| **smoke** | кожен PR (паралельно з affected, `fail-fast`) | `pnpm test:smoke` | ні | — |
| **affected** | кожен PR (паралельно з smoke, `fail-fast`) | `turbo run test:affected --filter=...[origin/main]` | ні | — |
| **full-tests** | лише `main` / `workflow_dispatch` | `pnpm test:coverage` | **так** (гейт 70/50/60/70) | — |
| **e2e (backend)** | кожен PR | `pnpm --filter backend test:e2e` | ні | — |
| **e2e (frontend)** | кожен PR, 4 шарди паралельно | `pnpm --filter frontend test:e2e -- --shard=N/4` | ні | так |

- **Smoke** — окрема конвенція файлів `*.smoke.test.tsx` (frontend) та `*.smoke.spec.ts`
  (backend), без grep за назвами. Покриває ключові flow: Login, Dashboard, Calendar month
  switch, School create, Day-off (frontend) і health-check, `EventsService`, `FinanceService`
  (backend).
- **Affected** — Turbo обирає пакети (`apps/backend`, `apps/frontend`), реально змінені
  відносно `origin/main`; усередині пакета Vitest (`--changed=origin/main`) та Jest
  (`--changedSince=origin/main`) запускають лише тести файлів, що транзитивно залежать
  від зміненого — **включно зі спільними модулями**. Результат кешується за хешем вхідних
  файлів: якщо нічого не змінилось — `FULL TURBO` (прогін пропускається).
- **Coverage** — лише на повному прогоні (`main` / manual), бо affected-набір неповний і
  відсоток був би хибним.
- **Playwright e2e** — фронтенд-суїт шардиться на 4 паралельні шарди просто в PR (сигнал
  одразу, а не постфактум). `visual.spec.ts` (Percy) виключено з шардованого прогону —
  потребує `PERCY_TOKEN`.

Локально: `husky` pre-commit запускає `pnpm test:affected` (тільки зачеплені тести, без
coverage/smoke). Якщо змінені лише non-код файли — крок миттєво пропускається через Turbo-кеш.

Ризик-орієнтований порядок і позначка `flaky` через `@testomatio/reporter` (вже в
`devDependencies` backend) — наступна ітерація (пріоритет 5).

### Структура монорепо

```
CRM/
├── apps/
│   ├── backend/     # NestJS API
│   └── frontend/    # React SPA
├── scripts/         # backup/restore скрипти
└── pnpm-workspace.yaml
```
