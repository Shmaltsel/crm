# Copilot instructions for CRM monorepo

## Правила відповідей для Copilot у цьому репозиторії

1. Відповідай українською мовою.
2. Формат кожної відповіді: `1.Проблема 2.Причина 3.Рішення 4.Діф (Код до / Код після)`.
3. Не додавай пояснювальні коментарі в код.
4. Мінімізуй токени; повні файли надавай лише якщо зміни >50%, створено новий файл, або є прямий запит на повний файл.

## Build, test, and lint commands

Run all commands from the repository root (`C:\CRM`) with `pnpm`.

| Task | Command |
| --- | --- |
| Install dependencies | `pnpm install` |
| Run backend + frontend in dev mode | `pnpm dev` |
| Build backend | `pnpm --filter backend build` |
| Build frontend | `pnpm --filter frontend build` |
| Run backend lint | `pnpm --filter backend lint` |
| Run frontend lint | `pnpm --filter frontend lint` |
| Run all unit tests (backend + frontend) | `pnpm test:unit` |
| Run all e2e tests | `pnpm test:e2e` |
| Run coverage (backend + frontend) | `pnpm test:coverage` |

### Run a single test file

| Test scope | Command |
| --- | --- |
| Backend unit test file (Jest) | `pnpm --filter backend test -- src\events\events.service.spec.ts` |
| Backend e2e test file (Jest e2e config) | `pnpm --filter backend test:e2e -- test\auth.e2e-spec.ts` |
| Frontend unit test file (Vitest) | `pnpm --filter frontend test:run -- src\tests\unit\formatCurrency.test.ts` |
| Frontend Playwright spec | `pnpm --filter frontend test:e2e -- e2e\login.spec.ts` |

### Database and seed commands used in local setup

- Apply Prisma migrations: `pnpm --filter backend exec prisma migrate deploy`
- Seed admin user: `pnpm --filter backend exec node prisma\seed-admin.js`
- Seed demo data: `pnpm seed:demo`

## High-level architecture

This is a PNPM workspace monorepo with two main apps:

- `apps\backend`: NestJS API with Prisma/PostgreSQL, Redis-backed throttling/cache, JWT cookie auth, audit logging, metrics, health checks, and Sentry.
- `apps\frontend`: React + Vite SPA with React Router, React Query, axios, role-based routing, and Playwright/Vitest tests.

### Backend request pipeline and cross-cutting behavior

Global behavior is centralized in `apps\backend\src\app.module.ts` and `apps\backend\src\main.ts`:

- Global pipe: `LocalizedValidationPipe` (`transform`, `whitelist`, `forbidNonWhitelisted`) with localized validation messages.
- Global guards: `UserThrottlerGuard` (Redis-backed throttling, user-based tracker from cookie JWT), then `CsrfGuard`.
- Global interceptors: `SanitizeInterceptor` (string/control-char cleanup on request body), `AuditLogInterceptor` (writes mutating actions to `AuditLog` table).
- Global exception filter: `AllExceptionsFilter` maps `AppException` message keys through i18n and reports 5xx to Sentry.
- `main.ts` enables cookie parsing, CORS with credentials, helmet, and Swagger only outside production.

### Domain model shape (Prisma)

`apps\backend\prisma\schema.prisma` is event-centric:

- Core flow: `City` → `School` → `Event` (+ optional `Crew`, `EventPreparation`, `EventReport`, `EventHistory`, `IssueReport`).
- Financial records hang off reports: `ExpenseItem`, `SalaryItem`; user payouts increment `User.balance`.
- Auth/session persistence uses `RefreshToken`.
- Mutation auditing is stored in `AuditLog`.
- Lifecycle states are explicit enums (`EventStatus`, `PreparationStatus`, `UserRole`) and are used throughout backend + frontend role/status logic.

### Frontend composition

- `src\main.tsx` creates a shared `QueryClient` and wraps the app in `QueryClientProvider`.
- `src\App.tsx` defines route tree, lazy-loaded pages, auth gating, and role checks via `ProtectedRoute`.
- `AuthProvider` boots session state from `GET /auth/me`; UI relies on cookie-based server session validation.
- `api` client (`src\config\api.ts`) sends `withCredentials: true` and injects `X-CSRF-Token` from `csrf_token` cookie on non-GET requests.

## Key conventions specific to this repo

1. **Cookie-first auth + CSRF pairing**  
   Backend sets `access_token`, `refresh_token`, and `csrf_token` cookies in `AuthController`; frontend does not own JWT storage and must send CSRF header for mutating calls.

2. **Localized API error surface (UK by default)**  
   Language is inferred from `Accept-Language`; default is Ukrainian, `en` enables English responses. Domain/business errors should use `AppException(messageKey, status)` rather than hardcoded strings.

3. **History/audit expectations for event mutations**  
   Event status/progress changes are expected to append `EventHistory` records with actor metadata, and global audit interceptor writes non-auth mutating requests into `AuditLog`.

4. **React Query + cache invalidation patterns**  
   Frontend hooks in `src\hooks` use stable query keys and explicit invalidation on successful mutations. Backend also uses short-lived caching for selected endpoints (for example, school events with `events:school:<id>:minimal|full` keys).

5. **Testing style**  
   Backend unit tests mock infrastructure dependencies (`PrismaService`, cache manager, Telegram) directly in Nest testing modules. Frontend tests run under Vitest + Testing Library with MSW server lifecycle managed in `src\tests\setup.ts`.
