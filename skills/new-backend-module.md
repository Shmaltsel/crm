# SKILL: Новий backend-модуль (NestJS)

**Коли використовувати**: користувач просить додати нову бізнес-сутність/фічу на бекенді
(за зразком `reports/`, `salary/`, `issues/`, `school-comments/`).

## Кроки

1. **Prisma-модель** (якщо потрібна нова таблиця)
   - Додати `model X { ... }` у `apps/backend/prisma/schema.prisma`.
   - Гроші — тільки `Decimal @db.Decimal(12,2)`, ніколи `Float`.
   - Додати індекси на поля, за якими будуть `WHERE`/`ORDER BY` (`@@index([...])`).
   - `pnpm --filter backend exec prisma migrate dev --name <опис_англ_snake_case>`
   - Перевірити згенерований SQL у `prisma/migrations/<...>/migration.sql` перед комітом.

2. **Структура модуля** — `apps/backend/src/<module>/`
   ```
   dto/create-<x>.dto.ts      # class-validator декоратори, @ApiProperty
   dto/update-<x>.dto.ts
   <module>.controller.ts     # @Controller, @UseGuards(AuthGuard, RolesGuard)
   <module>.service.ts        # бізнес-логіка, PrismaService
   <module>.service.spec.ts   # юніт-тести з prisma.mock.ts
   <module>.module.ts
   ```

3. **DTO**
   - `class-validator` декоратори на кожному полі (`@IsString`, `@IsNumber`, `@Min`, `@Max`).
   - `@Type(() => Number)` на числових полях — без нього `transform:true` не конвертує рядок у число.
   - Не покладатись на "хтось передасть правильний тип" — `forbidNonWhitelisted: true` вже
     глобально ввімкнений, зайві поля кинуть 400 автоматично, це ОК і очікувано.

4. **Controller**
   - `@ApiCookieAuth('access_token')`, `@UseGuards(AuthGuard, RolesGuard)` на рівні класу.
   - `@Roles(...)` на кожному ендпоінті, де є обмеження ролей.
   - Якщо ендпоінт працює з конкретним ресурсом (не списком) — `@UseGuards(OwnershipGuard)` +
     `@CheckOwnership('<resource>')`.
   - Списки з пагінацією — DTO `extends PageOptionsDto`, **обов'язково** додати явні
     date-range/фільтр-поля, якщо ендпоінт буде використовуватись для "всіх даних за період"
     (див. memory.md → баг-паттерн з пагінацією за замовчуванням).

5. **Service**
   - Перевірка ролі/приналежності до міста — за зразком `salary.service.ts`
     (`managedCities` lookup для MANAGER).
   - Мутації з кількома залежними записами — обов'язково `prisma.$transaction`.
   - Кешовані читання (dashboard/finance-подібні) — `CacheVersionService` + `cacheManager`,
     ключ формату `<domain>:v${version}:<фільтри>`.

6. **Module + підключення**
   - Зареєструвати в `imports` відповідного `*.module.ts` і в `apps/backend/src/app.module.ts`.

7. **Тести**
   - Мінімум: happy path + 1 forbidden-кейс (не той роль/не те місто) + 1 not-found-кейс.
   - `prisma.mock.ts` — не піднімати реальну БД для юніт-тестів.

8. **Верифікація перед комітом**
   - Виконати `skills/pre-push-verification.md`.

## Типові помилки, яких уникати
- Забути `@Type(() => Number)` на числових query/body полях → валідація мовчки пропускає рядок.
- Забути `@@index` на полі, за яким буде масовий `WHERE` (продуктивність під навантаженням).
- Дати ендпоінту повертати "все без ліміту" замість пагінації/фільтра за замовчуванням.
