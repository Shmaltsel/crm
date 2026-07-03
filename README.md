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
pnpm test:unit          # unit-тести backend + frontend
pnpm test:e2e            # e2e-тести
pnpm test:coverage       # покриття коду
```

### Структура монорепо

```
CRM/
├── apps/
│   ├── backend/     # NestJS API
│   └── frontend/    # React SPA
├── scripts/         # backup/restore скрипти
└── pnpm-workspace.yaml
```
