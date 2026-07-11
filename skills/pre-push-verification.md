# SKILL: Pre-push verification (обов'язково після КОЖНОЇ задачі)

**Коли використовувати**: перед будь-яким `git push`, без винятків, навіть для "маленької" зміни.

## Кроки (в порядку, зупинятись на першій помилці)

1. **Static check** (тільки для зміненого workspace)
   ```
   pnpm --filter <backend|frontend> exec tsc --noEmit
   pnpm --filter <backend|frontend> lint
   ```
   Виправити ВСЕ до продовження — не комітити з `// @ts-ignore`/`eslint-disable` без причини.

2. **Build**
   ```
   pnpm --filter <backend|frontend> build
   ```
   Помилка білда = hard stop, далі не йти.

3. **Тести**
   - Точкові тести на змінені файли (`pnpm --filter frontend test:run -- <path>` /
     `pnpm --filter backend test -- <path>`).
   - `pnpm test:unit` (весь workspace) — тільки для cross-cutting змін (нова guard, зміна DTO,
     що використовується в кількох модулях).
   - Нова нетривіальна логіка без тесту — написати мінімальний тест перед комітом.
   - E2E — тільки якщо задача покриває конкретний user-flow (напр. approve → salary payout).

4. **Review diff**
   ```
   git status -sb && git diff --stat
   ```
   Перевірити: жодних `dist/`, `.env`, `node_modules`, залишкових `console.log`, невикористаних
   імпортів, файлів поза очікуваним скоупом задачі.

5. **Commit**
   ```
   git add -A && git commit -m "<короткий опис укр., imperative, без feat:/fix:>"
   ```
   Один коміт на один логічний крок (не змішувати непов'язані зміни).

6. **Push**
   ```
   git pull --rebase origin <branch>   # якщо потрібно — і повторити кроки 1–3 після rebase
   git push origin <branch>
   ```

## Hard stop (НЕ пушити)
- Червоний tsc/lint/build.
- Падаючі тести, пов'язані зі зміною.
- Неочікувані файли в diff.
- Нерозв'язаний конфлікт після rebase.

У разі hard stop — повідомити користувачу, ЩО саме червоне, а не тихо пушити з відомою помилкою.
