# SKILL: Нова frontend-фіча (React + React Query)

**Коли використовувати**: потрібно додати новий UI-функціонал, який ходить у backend API
(за зразком `SalaryEntryForm` + `useCreateSalary` + `ReportsReviewPage`).

## Кроки

1. **Перевірити, чи бекенд уже готовий**
   - Перед тим як писати UI — знайти відповідний controller/service. Дуже часто ендпоінт і
     хук `use*` уже існують, але ніде не викликаються (перевір `grep -rn "useXxx" apps/frontend/src`
     на кількість використань — якщо `1`, значить хук визначений, але не підключений).

2. **Типи** — `apps/frontend/src/types/index.ts`
   - Додати/оновити інтерфейс, якщо бекенд повертає нову форму даних.
   - Не використовувати `any` — це `error` в ESLint (`@typescript-eslint/no-explicit-any`).

3. **Хук** — `apps/frontend/src/hooks/use<Domain>.ts`
   - `useQuery` для читання: стабільний `queryKey` (масив, включно з фільтрами), `staleTime`.
   - `useMutation` для запису: `onSuccess: () => qc.invalidateQueries({queryKey: [...]})`.
   - Не дублювати логіку інвалідації в компоненті — вона має жити в хуку.

4. **Компонент**
   - Дизайн-токени тільки семантичні: `bg-surface`, `text-content-primary`, `bg-brand`,
     `rounded-card`, `rounded-pill`, `bg-danger`/`bg-success` — НЕ хардкодити `slate-`/`blue-`/`rose-`.
   - Порожній стан — `components/ui/EmptyState`, лоадер — `components/ui/Skeleton`.
   - Повідомлення користувачу — `useToast()` (`success`/`error`/`info`), не `alert()`.
   - Форми з кількома полями — `Input` з `components/ui/Input`, не голий `<input>`.

5. **Підключення до сторінки/вкладки**
   - Якщо це нова вкладка Dashboard — додати в `constants/navTabs.ts` (`DASHBOARD_TABS`) +
     `TAB_COMPONENTS` у `Dashboard.tsx`.
   - Якщо це нова сторінка верхнього рівня — додати в `pages/lazyTabPages.ts`
     (`rawImportFactories` + `TAB_PAGE_COMPONENTS`) і в роутинг `App.tsx`.
   - **Обов'язково перевірити після**: чи компонент реально імпортується з продакшн-коду
     (`grep -rn "from.*<NewComponent>"` — якщо збіг лише в тестах, щось не підключено).

6. **Тести**
   - `tests/component/<Component>.test.tsx` — рендер + основний user-flow (клік → мутація →
     toast/UI-оновлення), MSW handler у `tests/mocks/handlers.ts` для нового ендпоінту.

7. **Верифікація перед комітом**
   - Виконати `skills/pre-push-verification.md`.

## Типові помилки, яких уникати
- Написати хук/компонент, але забути підключити його до роутингу/вкладки (мертвий код).
- Хардкодити Tailwind-кольори замість семантичних токенів (ламає візуальну консистентність).
- Забути `invalidateQueries` після мутації → UI показує застарілі дані до перезавантаження.
- Умовний рендер `{arr.length > 0 && ...}` без гілки для порожнього масиву — ховає ціль
  функціональність замість показу порожнього стану.
