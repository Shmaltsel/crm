# SKILL: Pre-push verification (обов'язково після КОЖНОЇ задачі)

**Коли використовувати**: перед будь-яким `git push`, без винятків, навіть для "маленької" зміни.

## Кроки (в порядку, зупинятись на першій помилці)

0. **Lint черги задач** (якщо змінено `.agents/tasks/`)
   ```
   node tools/queue-tools/lint-queue.js
   ```
   Помилка лайнтингу = hard stop. Виправити TASK-файли перед продовженням.
   WARNING (size guardrail) = зафіксувати у decisions/, не блокує.

0.5. **Charset-guard** (перевірка битої кирилиці)
   ```
   node tools/queue-tools/charset-guard.js
   ```
   Помилка = hard stop. Виправити `\uXXXX` escapes, `?`-послідовності, U+FFFD перед продовженням.

1. **Перевірка scope creep**
   - `git diff --stat` — чи є файли поза заявленим scope?
   - Якщо так → окремий коміт з міткою `розширення scope: <причина>` або нова TASK.

2. **Static check** (тільки для зміненого workspace)
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

7. **Звіт у Telegram** (одразу після push)
   Надіслати звіт через bash:
   ```
   node tools/queue-tools/telegram-notify.js "<текст звіту>"
   ```
   Або через MCP tool `notify()` якщо human-bridge доступний.
   Формат звіту:
   ```
   ✅ <коміт-хеш короткий> <опис>

   Що змінено:
   - <зміна 1>
   - <зміна 2>

   💬 Opencode:
   - <що відповів/запропонував opencode при консультації>
   - <чи були перетини/баги, які він вказав>

   🔍 Що перевірити:
   - <функціонал 1>: <що саме перевірити>
   - <функціонал 2>: <що саме перевірити>
   ```
   Формат: 1-2 речення що зроблено, список 2-5 пунктів для ручної перевірки.
   Не дублювати diff — тільки те, що потребує візуальної/функціональної перевірки.

## Hard stop (НЕ пушити)
- Червоний tsc/lint/build.
- Падаючі тести, пов'язані зі зміною.
- Неочікувані файли в diff.
- Нерозв'язаний конфлікт після rebase.

У разі hard stop — повідомити користувачу, ЩО саме червоне, а не тихо пушити з відомою помилкою.
