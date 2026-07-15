# Event CRM

> **CRM-система для управління освітніми подіями у школах та дитсадках**
>
> **Статус: активна розробка та тестування.** Проєкт перебуває на стадії бета-тестування — можливі зміни API та структури БД.

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11.8-orange)](https://pnpm.io/)

---

## Зміст

- [Огляд](#огляд)
- [Ключові можливості](#ключові-можливості)
- [Техстек](#техстек)
- [Архітектура](#архітектура)
- [Запуск](#запуск)
- [Розробка](#розробка)
- [Тестування](#тестування)
- [Деплой](#деплой)
- [API документація](#api-документація)
- [Безпека](#безпека)
- [Ліцензія](#ліцензія)

---

## Огляд

**Event CRM** — CRM-система для автоматизації повного циклу управління освітніми розважальними заходами у школах та дитсадках.

### Що робить

- **Управління лідами**: відстеження шкіл/дитсадків від першого контакту до повторних продажів
- **Планування подій**: розклад, призначення бригад, логістика
- **Фінансовий облік**: доходи, витрати, звітність по подіях/містах
- **Координація команди**: ведучі, водії, управління відпустками, завантаженість
- **Аналітика**: дашборди, прогнозування доходів, метрики ефективності

### Для кого

CRM-система для компанії, що організовує освітні заходи у школах та дитсадках. Призначена для команд, які працюють з кількома містами та бригадами одночасно.

---

## Ключові можливості

### CRM-воронка

```
База → Перший контакт → Зацікавлений → Попередній дозвіл → Дата підтверджена
→ Підготовка → Виконується → Завершено → Звіт → Повторний продаж
```

### Управління подіями

- Прив'язка до школи, міста, дати, часу, кількості учасників
- Призначення бригади: ведучий + водій з перевіркою доступності
- Чекліст підготовки: обладнання, матеріали, документи, підтвердження
- Управління відпустками: запобігання конфліктам у бригадах

### База навчальних закладів

- Школи та дитсадки з автозаповненням з відкритих даних
- Контакти: відповідальні особи, телефони, нотатки
- Історія взаємодій: кожен дзвінок, зустріч, подія
- Відстеження повторних продажів

### Фінансовий модуль

- Облік доходів: по подіях, містах, типах проєктів
- Управління витратами: зарплати, транспорт, матеріали
- Автоматичний розрахунок маржі
- Звіти: подання, перевірка, затвердження з PDF-експортом

### Аналітика в реальному часі

- KPI-дашборд: загальний дохід, кількість подій, середній прибуток
- Графіки доходів: помісячна динаміка, порівняння міст
- Прогнозування: на основі підтверджених подій
- Метрики ефективності: найкращі/найгірші події, продуктивність бригад

### RBAC (Role-Based Access Control)

| Роль | Можливості |
|------|-----------|
| **SUPERADMIN** | Повний доступ до системи, управління користувачами |
| **OWNER** | Управління містами, аналітика, затвердження звітів |
| **MANAGER** | Управління подіями та бригадами в місті, звіти |
| **HOST** | Перегляд призначених подій, подання звітів |
| **DRIVER** | Перегляд призначених подій, навігація |

---

## Техстек

### Backend

| Технологія | Призначення | Версія |
|-----------|------------|--------|
| **NestJS** | API фреймворк | 11.x |
| **TypeScript** | Типізація | 5.7 |
| **Prisma** | ORM + міграції | 6.x |
| **PostgreSQL** | Основна БД | 16+ |
| **Redis** | Кеш + rate limiting | 7+ |
| **JWT** | Аутентифікація | - |
| **Bcrypt** | Хешування паролів | - |
| **Swagger** | Документація API | 8.x |
| **Sentry** | Моніторинг помилок | 8.x |
| **Prometheus** | Метрики | - |

### Frontend

| Технологія | Призначення | Версія |
|-----------|------------|--------|
| **React** | UI-бібліотека | 19.x |
| **TypeScript** | Типізація | 5.7 |
| **Vite** | Збірка | 8.x |
| **React Router** | Маршрутизація | 7.x |
| **TanStack Query** | Серверний стан | 5.x |
| **Zustand** | Клієнтський стан | 5.x |
| **Tailwind CSS** | Стилі | 3.x |
| **Framer Motion** | Анімації | 12.x |
| **Recharts** | Візуалізація даних | 3.x |
| **React Hook Form** | Форми | 7.x |
| **Zod** | Валідація | 4.x |

### Інфраструктура

- **Деплой**: Railway (backend), Vercel (frontend)
- **БД**: Neon Serverless Postgres
- **Моніторинг**: Sentry, Prometheus + Grafana
- **CI/CD**: GitHub Actions
- **Менеджер пакетів**: pnpm 11.8

---

## Архітектура

### Системна діаграма

```
┌─────────────────────────────────────────────────────────────┐
│                     Клієнтські пристрої                       │
│  (Desktop, Мобільний браузер, Планшет)                       │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                        │
│  - React SPA (статичні ресурси)                              │
│  - Глобальний CDN                                            │
│  - Автоматичний HTTPS                                        │
└────────────────┬────────────────────────────────────────────┘
                 │ API-запити
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      Railway Platform                         │
│  ┌────────────────────────────────────────────────────┐      │
│  │              NestJS Backend                        │      │
│  │  - REST API (JWT аутентифікація)                   │      │
│  │  - Бізнес-логіка                                   │      │
│  │  - Swagger Docs (/docs)                            │      │
│  │  - Health Checks (/.well-known/health)             │      │
│  │  - Prometheus Metrics (/metrics)                   │      │
│  └────────┬──────────────────────┬────────────────────┘      │
│           │                      │                            │
│           ▼                      ▼                            │
│  ┌────────────────┐    ┌────────────────┐                    │
│  │  Redis Cache   │    │ Neon Postgres  │                    │
│  │  - Rate limit  │    │  - Pooled conn │                    │
│  │  - Кешування   │    │  - Direct conn │                    │
│  └────────────────┘    │  - Авто-бекап  │                    │
│                        └────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                   Зовнішні сервіси                            │
│  - Sentry (відстеження помилок)                              │
│  - Telegram Bot (сповіщення)                                │
│  - Open Data API (автозаповнення даних про школи)            │
└─────────────────────────────────────────────────────────────┘
```

### Структура монорепо

```
CRM/
├── apps/
│   ├── backend/          # NestJS API
│   │   ├── src/
│   │   │   ├── auth/            # Аутентифікація та авторизація
│   │   │   ├── users/           # Управління користувачами
│   │   │   ├── events/          # CRUD подій + воронка
│   │   │   ├── schools/         # База шкіл та дитсадків
│   │   │   ├── cities/          # Управління містами
│   │   │   ├── finance/         # Доходи/витрати
│   │   │   ├── reports/         # Звіти по подіях
│   │   │   ├── dashboard/       # Агрегація аналітики
│   │   │   ├── days-off/        # Доступність бригад
│   │   │   ├── notifications/   # Telegram-інтеграція
│   │   │   ├── analytics/       # Аналітичні запити
│   │   │   ├── projects/        # Управління проєктами
│   │   │   ├── salary/          # Облік зарплат
│   │   │   ├── inventory/       # Облік обладнання
│   │   │   ├── issues/          # Звіти про проблеми
│   │   │   ├── telegram/        # Telegram Bot API
│   │   │   ├── health/          # Health check endpoints
│   │   │   ├── metrics/         # Prometheus метрики
│   │   │   ├── common/          # Guard'и, інтерсептори, фільтри, кеш
│   │   │   └── config/          # Валідація env, конфігурація
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Схема БД
│   │   │   ├── migrations/      # Версіоновані зміни БД
│   │   │   └── seed-*.js        # Скрипти наповнення БД
│   │   └── test/                # E2E-тести
│   │
│   └── frontend/         # React SPA
│       ├── src/
│       │   ├── pages/           # Компоненти маршрутів
│       │   ├── components/      # Повторно використовувані UI
│       │   ├── features/        # Модулі за функціональністю
│       │   ├── hooks/           # React Query + кастомні хуки
│       │   ├── context/         # React Context-провайдери
│       │   ├── config/          # API-клієнт, константи
│       │   ├── types/           # TypeScript-інтерфейси
│       │   ├── utils/           # Допоміжні функції
│       │   └── tests/           # Unit + інтеграційні тести
│       └── e2e/                 # Playwright E2E-тести
│
├── .github/              # CI/CD-воркфлоу
│   └── workflows/
│       ├── ci.yml              # Перевірки PR
│       └── deploy.yml          # Продакшн-деплой
│
├── package.json          # Кореневі скрипти
├── pnpm-workspace.yaml   # Конфігурація монорепо
└── README.md             # Цей файл
```

### Флоу аутентифікації

```
┌──────────┐                                    ┌──────────┐
│  Клієнт  │                                    │  Сервер  │
└─────┬────┘                                    └────┬─────┘
      │                                              │
      │  POST /auth/login                            │
      │  { email, password }                         │
      ├─────────────────────────────────────────────>│
      │                                              │
      │  Перевірка облікових даних                   │
      │  Генерація JWT (access + refresh)            │
      │                                              │
      │  Set-Cookie: access_token (15хв)             │
      │  Set-Cookie: refresh_token (7дн)             │
      │  Set-Cookie: csrf_token                      │
      │<─────────────────────────────────────────────┤
      │                                              │
      │  Наступні API-запити                         │
      │  Cookie: access_token                        │
      │  X-CSRF-Token: <token>                       │
      ├─────────────────────────────────────────────>│
      │                                              │
      │  Перевірка JWT + CSRF                        │
      │  Обробка запиту                              │
      │                                              │
      │  200 OK + дані                               │
      │<─────────────────────────────────────────────┤
```

---

## Запуск

### Передумови

- **Node.js**: 22.0.0 або вище ([Завантажити](https://nodejs.org/))
- **pnpm**: 11.8.0 або вище
  ```bash
  npm install -g pnpm@11.8.0
  ```
- **PostgreSQL**: 16+ (або Neon serverless)
- **Redis**: 7+ (опціонально для локальної розробки, обов'язково для продакшну)

### Встановлення

#### 1. Клонування репозиторію

```bash
git clone https://github.com/Shmaltsel/crm.git
cd crm
```

#### 2. Встановлення залежностей

```bash
pnpm install
```

#### 3. Налаштування змінних оточення

**Backend** (`apps/backend/.env`):

```bash
cp apps/backend/.env.example apps/backend/.env
```

Відредагуйте `apps/backend/.env`:

```env
# Середовище
NODE_ENV=development
PORT=3000

# БД (Neon Postgres)
DATABASE_URL=postgresql://user:password@host/db?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://user:password@host/db

# URL фронтенду (CORS)
FRONTEND_URL=http://localhost:5173

# Redis
REDIS_URL=redis://localhost:6379

# JWT-секрети (згенерувати: openssl rand -base64 32)
JWT_ACCESS_SECRET=your-access-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here

# Адмін-аккаунт для початкового налаштування
SEED_ADMIN_EMAIL=admin@example.com
# !!! ОБОВ'ЯЗКОВО замініть на власний надійний пароль перед деплоєм !!!
SEED_ADMIN_PASSWORD=<generate-your-own-strong-password>

# Флаги функціональності
FEATURE_TELEGRAM_NOTIFICATIONS=false
FEATURE_AUTO_SCHOOL_IMPORT=true
FEATURE_FINANCE_MODULE=true

# Опціонально: Sentry
SENTRY_DSN=

# Опціонально: Telegram Bot
TELEGRAM_BOT_TOKEN=
```

**Frontend** (`apps/frontend/.env`):

```bash
cp apps/frontend/.env.example apps/frontend/.env
```

Відредагуйте `apps/frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

#### 4. Налаштування бази даних

```bash
# Згенерувати Prisma-клієнт
pnpm --filter backend exec prisma generate

# Запустити міграції
pnpm --filter backend exec prisma migrate deploy

# Наповнити БД admin-користувачем
pnpm --filter backend exec node prisma/seed-admin.js

# (Опціонально) Наповнити демо-даними
pnpm seed:demo
```

#### 5. Запуск серверів розробки

```bash
# Запуск backend та frontend одночасно
pnpm dev
```

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173
- **API Docs**: http://localhost:3000/docs

#### 6. Вхід

Відкрийте http://localhost:5173 та увійдіть з вашими обліковими даними, вказаними у `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`.

---

## Розробка

### Структура бекенду

```
apps/backend/src/
├── auth/               # Аутентифікація та авторизація
├── users/              # CRUD користувачів + ролі
├── events/             # Управління подіями + воронка
├── schools/            # Школи та дитсадки
├── cities/             # Міста та бригади
├── finance/            # Доходи та витрати
├── reports/            # Звіти по подіях
├── dashboard/          # Агрегація аналітики
├── days-off/           # Доступність бригад
├── notifications/      # Telegram-інтеграція
├── analytics/          # Аналітичні запити
├── projects/           # Управління проєктами
├── salary/             # Облік зарплат
├── inventory/          # Обладнання
├── issues/             # Звіти про проблеми
├── telegram/           # Telegram Bot API
├── health/             # Health check endpoints
├── metrics/            # Prometheus метрики
├── common/             # Guard'и, інтерсептори, фільтри, кеш
├── config/             # Валідація env, конфігурація
└── main.ts             # Точка входу

apps/frontend/src/
├── pages/              # Компоненти маршрутів
├── components/         # Повторно використовувані UI
├── features/           # Модулі за функціональністю
├── hooks/              # React Query + кастомні хуки
├── context/            # React Context-провайдери
├── config/             # Axios-клієнт, константи
├── types/              # TypeScript-інтерфейси
├── utils/              # Допоміжні функції
└── main.tsx            # Точка входу
```

### Основні команди

```bash
# Розробка
pnpm dev                              # Запуск backend + frontend
pnpm --filter backend start:dev       # Тільки backend
pnpm --filter frontend dev            # Тільки frontend

# Перевірка типів
pnpm --filter backend exec tsc --noEmit
pnpm --filter frontend exec tsc --noEmit

# Лінтер
pnpm --filter backend lint
pnpm --filter frontend lint

# Збірка
pnpm --filter backend build
pnpm --filter frontend build

# База даних
pnpm --filter backend exec prisma studio        # Візуальний редактор БД
pnpm --filter backend exec prisma migrate dev   # Створити + застосувати міграцію
pnpm --filter backend exec prisma db push       # Синхронізувати схему без міграції
```

### Додавання нового модуля (backend)

```bash
cd apps/backend
nest g module feature-name
nest g controller feature-name
nest g service feature-name
```

Дотримуйтесь патернів існуючих модулів:
- DTO у папці `dto/` (використовувати `class-validator`)
- Інтерфейси в корені модуля
- Тести поруч із сурсами (`*.spec.ts`)

### Додавання нового компонента (frontend)

```tsx
// apps/frontend/src/components/FeatureName.tsx
import { useQuery } from '@tanstack/react-query';
import { api } from '../config/api';

export default function FeatureName() {
  const { data, isLoading } = useQuery({
    queryKey: ['featureName'],
    queryFn: () => api.get('/feature-name').then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <div>Завантаження...</div>;

  return (
    <div className="p-4">
      {/* Ваш компонент */}
    </div>
  );
}
```

### Міграції БД

```bash
# 1. Оновити schema.prisma
# 2. Створити міграцію
pnpm --filter backend exec prisma migrate dev --name add_new_field

# 3. Застосувати в продакшні
pnpm --filter backend exec prisma migrate deploy
```

---

## Тестування

### Структура тестів

```
apps/backend/
├── src/                      # Unit-тести поруч із сурсами
│   └── users/
│       ├── users.service.ts
│       └── users.service.spec.ts
└── test/                     # E2E-тести
    └── events.e2e-spec.ts

apps/frontend/
├── src/
│   └── tests/
│       ├── setup.ts          # Конфігурація тестів
│       ├── mocks/            # MSW-хендлери
│       ├── unit/             # Тести логіки
│       ├── component/        # Тести компонентів
│       └── integration/      # Тести функціональності
└── e2e/                      # Playwright E2E-тести
```

### Запуск тестів

```bash
# Unit-тести
pnpm test:unit                    # Усі (backend + frontend)
pnpm --filter backend test        # Тільки backend
pnpm --filter frontend test:run   # Тільки frontend

# Конкретний файл
pnpm --filter backend test -- src/users/users.service.spec.ts
pnpm --filter frontend test:run -- src/tests/unit/utils.test.ts

# Покриття
pnpm test:coverage                # З порогами (70/50/60/70)

# E2E-тести
pnpm test:e2e:backend             # Backend E2E (потребує БД + Redis)
pnpm test:e2e:frontend            # Playwright E2E
pnpm test:e2e                     # Обидва

# Змінені тести
pnpm test:affected
```

### Пороги покриття

```json
{
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 50,
      "lines": 60,
      "statements": 70
    }
  }
}
```

---

## Деплой

### Продакшн

**Backend** (Railway):

1. Підключити GitHub-репозиторій до Railway
2. Налаштувати змінні оточення в дашборді Railway
3. Деплой: `pnpm --filter backend exec prisma migrate deploy && pnpm --filter backend build && pnpm --filter backend start:prod`
4. Health check: `/.well-known/health`

**Frontend** (Vercel):

1. Підключити GitHub-репозиторій до Vercel
2. Встановити `VITE_API_URL` на URL backend'у в Railway
3. Збірка: `pnpm --filter frontend build`
4. Директорія виводу: `apps/frontend/dist`

### Довідник змінних оточення

| Змінна | Обов'язкова | Опис | Приклад |
|--------|------------|------|---------|
| `DATABASE_URL` | ✅ | Пулений Postgres-з'єднання | `postgresql://...?pgbouncer=true` |
| `DIRECT_URL` | ✅ | Пряме Postgres-з'єднання (міграції) | `postgresql://...` |
| `REDIS_URL` | ✅ | Рядок з'єднання Redis | `redis://localhost:6379` |
| `JWT_ACCESS_SECRET` | ✅ | Секрет JWT access-токена | `<random-32-chars>` |
| `JWT_REFRESH_SECRET` | ✅ | Секрет JWT refresh-токена | `<random-32-chars>` |
| `FRONTEND_URL` | ✅ | URL фронтенду для CORS | `https://your-domain.com` |
| `SENTRY_DSN` | ⚠️ | Відстеження помилок Sentry | `https://...@sentry.io/...` |
| `TELEGRAM_BOT_TOKEN` | ⚠️ | Telegram-сповіщення | `123456:ABC-DEF...` |
| `SEED_ADMIN_EMAIL` | ⚠️ | Email admin-користувача | `admin@your-domain.com` |
| `SEED_ADMIN_PASSWORD` | ⚠️ | Пароль admin-користувача | **Замініть на власний!** |

---

## API документація

Інтерактивна документація API доступна за адресами:

- **Swagger UI**: http://localhost:3000/docs
- **ReDoc**: http://localhost:3000/docs/redoc
- **OpenAPI JSON**: http://localhost:3000/docs-json

---

## Безпека

### Практики

- ✅ **JWT + CSRF**: Подвійна система токенів з перевіркою CSRF
- ✅ **HTTP-only Cookies**: Токени недоступні через JavaScript
- ✅ **bcrypt**: Хешування паролів, 10 раундів
- ✅ **Rate Limiting**: Redis-based throttling на чутливих ендпоінтах
- ✅ **RBAC**: Гранулярні дозволи по ролях
- ✅ **Аудит-лог**: Усі мутації трекаються з користувачем + часом
- ✅ **Захист від SQL-ін'єкцій**: Параметризовані запити Prisma
- ✅ **Захист від XSS**: Авто-екранування React + CSP-заголовки

---

## Ліцензія

Цей проєкт ліцензовано за **MIT License** — див. файл [LICENSE](LICENSE).

---

<div align="center">
  <strong>Event CRM</strong>
  <br />
  <sub>Управління освітніми подіями без зайвих клопотів</sub>
</div>
