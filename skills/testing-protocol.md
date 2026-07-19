# SKILL: Testing Protocol (Unit, Component & E2E тестування)

**Коли використовувати**: завдання включає написання або оновлення тестів для існуючого коду.

## Кроки та правила

1. **Frontend Component Tests (Vitest + Testing Library)**
   - Завжди використовувати MSW (`src/tests/mocks/handlers.ts`) для моку API-запитів. Жодних `jest.mock('axios')`.
   - Обгортати компоненти в тестовий провайдер (QueryClient + MemoryRouter).
   - Тестувати поведінку користувача (`userEvent.click`), а не внутрішній стан компонента.

2. **Backend Unit Tests (Jest)**
   - НІКОЛИ не піднімати реальну PostgreSQL для юніт-тестів (`*.spec.ts`).
   - Використовувати `prisma.mock.ts` для імітації відповідей БД.
   - Обов'язкові тест-кейси для Сервісів: успішне виконання, помилка валідації/NotFound, перевірка прав доступу (якщо є `managedCities`).

3. **Backend E2E Tests (`*.e2e-spec.ts`)**
   - Тут ДОЗВОЛЕНО використовувати реальну тестову БД.
   - Кожен тест має очищати за собою дані або використовувати транзакції з відкатом.
   - Тестувати весь ланцюг: Request -> Guard/Interceptor -> Controller -> Service -> DB -> Response.

4. **Оновлення моків**
   - Якщо змінилося API або DTO, обов'язково оновити відповідний handler у `handlers.ts` (Frontend) та mock-об'єкти у бекенд-тестах.