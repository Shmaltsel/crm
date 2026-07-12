# AGENTS.md — CRM monorepo

Відповідай українською
- Формат відповіді: 1.Проблема 2.Причина 3.Рішення 4.Результат
- Не додавай пояснювальні коментарі в код
- У фінальній відповіді — лише 1 речення що зроблено, без diff/коду
- Перед задачею сформулюй план одним реченням; однозначні задачі виконуй одразу без підтвердження
- Великі задачі розбивай на логічні кроки (кожен = окремий коміт)
- після кожного виконаного завадння роби пуш
- **[UI/UX ПРАВИЛО]: Складні візуальні запити (2+ правок) виконувати СУВОРО по одній зміні за раз, щоб уникнути деградації коду.**
- **[QA ПРАВИЛО]: Після написання мобільного UI просити користувача зробити "Visual QA" (візуально перевірити результат на вузькому екрані) з описом того о було змінено і на що звернути увагу..**
- перел складнимим візуальними змінами обов'язково затверджувати їх, описувати етстуально, як це виглядатиме
## Commands (root, `C:\CRM`)
| Дія | Команда |
|---|---|
| Dev (обидва) | `pnpm dev` |
| Build | `pnpm --filter <workspace> build` |
| TypeScript | `pnpm --filter <workspace> exec tsc --noEmit` |
| Lint | `pnpm --filter <workspace> lint` |
| Один тестовий файл | `pnpm --filter frontend test:run -- src/tests/path/to/File.test.tsx` |
| Один backend тест | `pnpm --filter backend test -- src/module/file.service.spec.ts` |
| Всі unit-тести | `pnpm test:unit` (backend + frontend паралельно) |
| Покриття | `pnpm test:coverage` |
| E2E frontend | `pnpm --filter frontend test:e2e` (Playwright) |
| E2E backend | `pnpm --filter backend test:e2e` (потребує PostgreSQL + Redis) |
| Prisma generate | `pnpm --filter backend exec prisma generate` |
| Prisma migrate | `pnpm --filter backend exec prisma migrate deploy` |
| Seed admin | `pnpm --filter backend exec node prisma/seed-admin.js` |
| Seed demo | `pnpm seed:demo` |
| Встановити | `pnpm install` (без `--frozen-lockfile`) |
| Git | `git add -A && git commit -m "<опис укр., imperative, без feat/fix:>" && git push origin <branch>` |

## Architecture
- **PNPM workspace**: `apps/backend` (NestJS) + `apps/frontend` (React+Vite)
- **Backend**: NestJS, Prisma+PostgreSQL, JWT cookie auth, Redis (throttle/cache), Swagger (`/docs`), Prometheus (`/metrics`), health (`/.well-known/health`)
- **Frontend**: React 19, Router v7, TanStack Query 5, axios, framer-motion, Tailwind, Recharts, zustand
- **Тести backend**: Jest (`*.spec.ts` in `src/`, e2e: `test/*.e2e-spec.ts` via `test/jest-e2e.json`); coverage thresholds 70/50/60/70
- **Тести frontend**: Vitest + Testing Library + MSW (listen in `src/tests/setup.ts`, handlers in `src/tests/mocks/`); coverage thresholds 70/50/60/70

## Key conventions
1. **Cookie auth + CSRF**: backend sets `access_token`, `refresh_token`, `csrf_token` cookies; frontend sends `X-CSRF-Token` header on mutating requests (via `src/config/api.ts` axios interceptor)
2. **Auto‑refresh on 401**: axios interceptor calls `/auth/refresh`, on failure dispatches `auth:expired` event
3. **Localised errors**: API returns Ukrainian by default; `Accept-Language: en` → English; business errors via `AppException(key, status)`
4. **AuditLog**: global interceptor logs mutating requests (except auth) to `AuditLog` table
5. **React Query**: hooks in `src/hooks/` use stable `queryKey` + explicit `invalidateQueries` after mutations
6. **ProtectedRoute**: role-gating via `allowedRoles` prop, used in `App.tsx`
7. **MSW in tests**: `onUnhandledRequest: "bypass"` — unhandled requests are silently ignored; localStorage mocked as `mock-token`
8. **Frontend ESLint**: `@typescript-eslint/no-explicit-any: error` — never use `any` without a comment
9. **Pre-commit hook** (`.husky/pre-commit`): runs `pnpm test:affected` (turbo affected tests vs `origin/main`)

## TypeScript strictness
- **Frontend** (`tsconfig.app.json`): `verbatimModuleSyntax: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noEmit: true`, `jsx: "react-jsx"`
- **Backend** (`tsconfig.json`): `noImplicitAny: false`, `strictNullChecks: true`, `emitDecoratorMetadata: true`, `experimentalDecorators: true`

## Frontend structure (key entrypoints)
- `src/main.tsx` — QueryClient + root render
- `src/App.tsx` — routes + lazy loading + ProtectedRoute + dead imports cause build to fail
- `src/components/Layout.tsx` — sidebar (md+), MobileTopNav (static header), BottomNavigationBar, swipe + AnimatePresence
- `src/constants/navTabs.ts` — single source of truth for all tab menus
- `src/context/AuthContext.tsx` — session from `GET /auth/me`, logout
- `src/config/api.ts` — axios instance with CSRF + auto‑refresh interceptor
- `src/pages/` — pages; `src/features/` — feature folders (calendar, reports, salary)
- `tests/` — mirrors `src/` structure; no `.env` needed (`VITE_API_URL` defaults to `/api`)

## Available Skills (в `skills/` директорії)
Агент повинен застосовувати відповідну навичку залежно від типу завдання:
- `skills/new-backend-module.md`: Створення контролерів, сервісів та DTO у NestJS.
- `skills/new-frontend-feature.md`: Створення UI-компонентів, хуків React Query.
- `skills/ui-ux-refactoring.md`: Mobile-first редизайн, використання framer-motion та Tailwind токенів.
- `skills/db-migration.md`: Внесення змін до `schema.prisma` та міграція БД.
- `skills/pre-push-verification.md`: ПРОТОКОЛ БЕЗПЕКИ.
- `skills/bug-fixing-protocol.md`: Локалізація та точкове виправлення багів (запобігання сліпому рефакторингу).
- `skills/testing-protocol.md`: Правила написання тестів (MSW для фронтенду, prisma.mock.ts для бекенду).
- `skills/fullstack-api-sync.md`: Синхронізація DTO, TypeScript-інтерфейсів та React Query між бекендом і фронтендом.

## Memory Protocol (`apps/memory.md`)
Агент ЗОБОВ'ЯЗАНИЙ:
1. Прочитувати `apps/memory.md` на старті кожної сесії.
2. Додавати нові записи (баг-паттерни, домовленості, нові архітектурні рішення) у форматі `[YYYY-MM-DD] факт`.
3. Перевіряти описані граблі перед виконанням завдання.

## Verification protocol (mandatory after every task)
1. **Static check** (only changed workspace): `pnpm --filter <w> exec tsc --noEmit && pnpm --filter <w> lint` — fix any error before proceeding
2. **Build**: `pnpm --filter <w> build` — failure = hard stop
3. **Tests**: run relevant tests (point to changed files); full `pnpm test:unit` only for cross‑cutting changes; write minimal test for new non‑trivial logic; E2E only when covering task flow
4. **Review**: `git status -sb && git diff --stat` — ensure only expected files changed (no `dist/`, `.env`, `node_modules`, console.log)
5. **Commit**: `git add -A && git commit -m "<короткий опис укр., imperative>"` — one commit per logical step
6. **Push**: `git pull --rebase origin <branch>` if needed (re‑run steps 1–3 after rebase), then `git push origin <branch>`

**Hard stop** (no push): red tsc/lint/build, failing related tests, unexpected changes in diff, unresolvable rebase conflict.
