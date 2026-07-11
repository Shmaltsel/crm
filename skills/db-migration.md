# SKILL: Prisma-міграція

**Коли використовувати**: будь-яка зміна `schema.prisma` (нова таблиця, поле, індекс, enum).

## Кроки

1. Внести зміну в `apps/backend/prisma/schema.prisma`.
2. Локально: `pnpm --filter backend exec prisma migrate dev --name <short_english_snake_case>`
   - Назва — англійською, знизу_підкреслення, що описує ЩО змінилось (`add_day_off`,
     `balance_to_decimal`), не "fix" чи "update".
3. Переглянути згенерований `migration.sql` вручну:
   - Чи є `NOT NULL` на новій колонці без `DEFAULT` — на існуючих рядках впаде.
   - Чи потрібен `@@index` на нове поле, якщо воно буде у `WHERE`/`JOIN`.
   - Грошові поля — `DECIMAL(12,2)`, ніколи `FLOAT`/`REAL`.
4. `pnpm --filter backend exec prisma generate` — оновити Prisma Client типи.
5. Якщо змінюється поле, яке серіалізується на фронт (особливо `Decimal`) — перевірити
   `ClassSerializerInterceptor`/DTO на явну конвертацію в `Number` (див. memory.md → баг-паттерн
   Decimal serialization).
6. Оновити відповідні `types/index.ts` на фронті, якщо змінилась форма API-відповіді.
7. Прод-деплой: міграція застосовується через `prisma migrate deploy` (вже в CI/пайплайні,
   НЕ `migrate dev` на проді).

## Типові помилки, яких уникати
- `migrate dev` на проді (створює shadow DB, не для прод-середовища).
- Забути перегенерувати Prisma Client (`prisma generate`) — TS-помилки типів "з нізвідки".
- Додати нове поле без дефолту на таблицю з існуючими рядками — міграція впаде.
- Забути індекс на полі фільтрації — тиха деградація продуктивності, яка виявляється лише
  на реальному обсязі даних.
