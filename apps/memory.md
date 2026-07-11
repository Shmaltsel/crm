# MEMORY.md — CRM «Світло Знань»

> Цей файл — довготривала пам'ять агента. Він НЕ статичний: агент зобов'язаний
> дописувати сюди нові факти щоразу, коли:
> - користувач його виправляє ("ні, не так, роби так")
> - виявляється нова конвенція, якої не було в AGENTS.md/skills
> - знайдено граблі/баг-паттерн, на які варто зважати наступного разу
> - користувач явно каже "запам'ятай"
>
> Формат запису: `- [YYYY-MM-DD] короткий факт, чому це важливо, який файл/модуль стосується`
> Старі записи не видаляються без прямої вказівки користувача. Дублікати — згортати в один.
> Якщо запис застарів (суперечить новому) — не видаляти, а позначити `[SUPERSEDED by запис нижче]`.

---

## Профіль користувача
- Розробник рівня strong middle, працює переважно через AI-агента (Cursor/Claude Code), а не пише код руками.
- Формат відповіді агента: `1.Проблема 2.Причина 3.Рішення 4.Результат` (для чату з людиною),
  `4.Diff` замість `4.Результат` — коли говориш з Claude в чаті (не агентом-виконавцем).
- Українською, imperative commit messages без префіксів `feat:`/`fix:`.
- Не любить пояснювальні коментарі в коді, не любить рерайт цілих файлів без потреби.

## Відомі баг-паттерни (щоб не наступати повторно)
- **Decimal serialization**: `Prisma.Decimal` через `ClassSerializerInterceptor` без explicit DTO
  серіалізується в `decimal.js`-об'єкт → на фронті `NaN` → показує "0 грн". Завжди явно
  конвертувати `Number(...)` перед відправкою або мати DTO з `@Transform`.
- **Порожній `salaryRecords`/`crew` на фронті** — код, що рендерить умовно `(arr ?? []).length > 0`,
  часто "тихо" ховає цілий блок UI замість показу порожнього стану — перевіряти, чи є fallback UI,
  а не просто немає крашу.
- **Дубльована/мертва гілка коду**: у проєкті вже траплялося, що новий рефакторинг (напр.
  `features/calendar/*`) писався і тестувався, але не підключався в роутинг
  (`lazyTabPages.ts`/`App.tsx`) — після будь-якого великого рефакторингу ОБОВ'ЯЗКОВО перевіряти,
  чи він реально імпортується з продакшн-коду, не тільки з тестів.
- **Пагінація за замовчуванням**: `PageOptionsDto` має дефолти `page=1, take=10` через
  `LocalizedValidationPipe({transform:true})` — навіть якщо фронт не передав жодного query-параметра,
  ендпоінт піде в paginated-гілку з `take=10`. Перевіряти це при кожному новому списковому ендпоінті,
  який мав повертати "все" або "по діапазону дат".

## Архітектурні рішення (не пропонувати змінити без явного запиту)
- Backend: NestJS + Prisma + PostgreSQL (Neon) + Redis, деплой на Railway.
- Frontend: React + Vite + TS + React Query + Tailwind (семантичні токени: `surface`, `brand`,
  `content-*`, `rounded-card`, `rounded-pill` — НЕ хардкодити `slate-`/`blue-` напряму).
- `no-explicit-any: error` на фронті — жодних `any` без коментаря-пояснення.
- Cookie-based JWT + CSRF double-submit, `OwnershipGuard`+`@CheckOwnership` на кожному
  ресурс-специфічному ендпоінті.
- Гроші — завжди `Decimal(12,2)` в Prisma, ніколи `Float`.

## UI/UX SchoolProfile (відомі проблеми)
- [2026-07-12] **Z-index конфлікти модалок**: CompletedEventModal (`z-50`), RescheduleModal (`z-modal`),
  більшість інших (`z-[60]`). CompletedEventModal може з'являтись під FloatingMobileNav.
  SchoolProfile, `modals/*`.
- [2026-07-12] **Scroll-to-top перекриває FloatingMobileNav**: scroll-to-top на `bottom: calc(56px+48px)`,
  FloatingMobileNav верхня межа на `56+44=100px` — кнопка «нагору» частково зливається з панеллю-якорем.
  `FloatingMobileNav.tsx`.
- [2026-07-12] **RescheduleModal без захисту від барів**: немає `createPortal` та `useMobileModalOffsets`,
  на мобільній перекривається MobileTopNav/BottomNav. `modals/RescheduleModal.tsx`.
- [2026-07-12] **ReportModal хардкод `bg-slate-*`**: використовує `bg-slate-900/40` замість `bg-backdrop`
  (design token), на відміну від інших модалок. `modals/ReportModal.tsx`.
- [2026-07-12] **QuickActionsBar кнопки без onClick**: три статистичні кнопки мають `whileTap`
  анімацію, але жодного обробника кліку — користувач може очікувати інтеракції.
  `school-profile/QuickActionsBar.tsx`.
- [2026-07-12] **CommentModal конфлікт фокусу**: `closeRef.current?.focus()` на open конфліктує
  з `autoFocus` на textarea. Також подвійна обробка Escape (document listener + onKeyDown на бекдропі).
  `modals/CommentModal.tsx`.
- [2026-07-12] **Мертвий код після рефакторингу SchoolProfile**: `ProfileTabs.tsx` та
  `TabContentSwitcher.tsx` визначені, але не імпортуються/не рендеряться — сторінка використовує
  послідовний рендер секцій. `school-profile/ProfileTabs.tsx`, `TabContentSwitcher.tsx`.

## Мобільна архітектура SchoolProfile
- [2026-07-12] **Всі секції одночасно**: на мобільній версії (xl:hidden) секції Events/Notes/Details
  рендеряться послідовно в одному скролі, а не перемикаються свайпом. Якорі через IntersectionObserver.
  `pages/SchoolProfile.tsx`.
- [2026-07-12] **Модалки з порталом**: EventModal та CrewModal використовують `createPortal` +
  `useMobileModalOffsets` для коректного позиціонування між барами. `modals/useMobileModalOffsets.ts`.
- [2026-07-12] **FAB позиція**: `z-60`, `right: 1.25rem`, `bottom: calc(56px + safe-area + 16px)`.
  CSS клас `.fab` в `index.css`.

## Тестування
- [2026-07-12] **MSW `onUnhandledRequest: "bypass"`** — невідповідні запити ігноруються, не фейлять тест.
  `src/tests/setup.tsx`.
- [2026-07-12] **Pre-commit hook** запускає `pnpm test:affected` (turbo affected vs `origin/main`),
  а НЕ повний `test:unit`. `.husky/pre-commit`.
- [2026-07-12] **`test:unit` НЕ має `--kill-others-on-fail`** — лише `test` (без :unit) має.
  `package.json` scripts.
- [2026-07-12] **TypeScript strictness**: frontend має `verbatimModuleSyntax: true`,
  `noUnusedLocals: true`, `noUnusedParameters: true`; backend — `noImplicitAny: false`.
  Різниця критична при написанні коду для кожного з workspace.

## Активні відкриті питання / рішення в процесі
- [2026-07-12] Розділити "затвердити звіт" і "виплатити ЗП" (approve() зараз одразу робить
  payout(), минаючи PENDING) — рішення ще не прийняте, обговорити з користувачем перед зміною.
- [2026-07-12] Доля `features/calendar/*` — доінтегрувати в роутинг чи видалити як мертвий код —
  чекає рішення користувача.

---

## Як агент має користуватись цим файлом
1. На старті сесії — прочитати повністю, застосовувати мовчки (не переказувати вголос).
2. Під час сесії — якщо користувач щось виправляє або пояснює вподобання/факт про проєкт,
   одразу дописати рядок у відповідну секцію (не чекати кінця сесії).
3. Не записувати сюди тимчасові деталі поточної задачі (для цього — сама задача/коміт),
   тільки те, що буде корисним і за тиждень, і за місяць.
