import { test, expect, Page } from "@playwright/test";

// Хелпер логіну
async function login(page: Page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', "admin@crm.com");
  await page.fill('input[type="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/cities/, { timeout: 8000 });
}

test.describe("Сторінка шкіл", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/schools");
    await page.waitForLoadState("networkidle");
  });

  test("відображає заголовок Школи", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Школи");
  });

  test("відображає список шкіл", async ({ page }) => {
    const rows = page.locator("table tbody tr, .school-row-enter");
    await expect(rows.first()).toBeVisible({ timeout: 8000 });
  });

  test("пошук фільтрує школи", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Пошук"]');
    await expect(searchInput).toBeVisible();

    // Отримуємо першу назву школи
    const firstSchool = page.locator("table tbody tr").first();
    const schoolName = await firstSchool.locator("td").first().textContent();
    const searchTerm = schoolName?.slice(0, 5) ?? "Школа";

    await searchInput.fill(searchTerm);
    await page.waitForTimeout(300); // debounce

    const results = page.locator("table tbody tr");
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
  });

  test("очищення пошуку повертає всі результати", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Пошук"]');
    await searchInput.fill("Школа №1");
    await page.waitForTimeout(300);
    const filtered = await page.locator("table tbody tr").count();

    await searchInput.fill("");
    await page.waitForTimeout(300);
    const all = await page.locator("table tbody tr").count();

    expect(all).toBeGreaterThanOrEqual(filtered);
  });

  test("фільтр по статусу працює", async ({ page }) => {
    const newFilter = page.locator("button", { hasText: "Нові" });
    if (await newFilter.isVisible()) {
      await newFilter.click();
      await page.waitForTimeout(200);
      const counter = page.locator("text=/шкіл/i");
      await expect(counter).toBeVisible();
    }
  });

  test("клік на школу переходить на профіль", async ({ page }) => {
    const firstRow = page.locator("table tbody tr").first();
    await firstRow.click();
    await expect(page).toHaveURL(/\/schools\/.+/, { timeout: 5000 });
  });

  test("відображає StatsBar з лічильниками", async ({ page }) => {
    await expect(page.locator("text=Нові")).toBeVisible();
    await expect(page.locator("text=Заплановані")).toBeVisible();
    await expect(page.locator("text=В роботі")).toBeVisible();
  });
});

test.describe("Додавання школи", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/schools");
    await page.waitForLoadState("networkidle");
  });

  test("кнопка Додати відкриває модалку", async ({ page }) => {
    const addBtn = page.locator("button", { hasText: /\+ Додати/i });
    await expect(addBtn).toBeVisible();
    await addBtn.click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
  });

  test("модалка закривається по кнопці Скасувати", async ({ page }) => {
    await page.locator("button", { hasText: /\+ Додати/i }).click();
    await expect(page.locator("text=Нова школа")).toBeVisible();
    await page.locator("button", { hasText: "Скасувати" }).click();
    await expect(page.locator("text=Нова школа")).not.toBeVisible();
  });

  test("форма не відправляється без назви школи", async ({ page }) => {
    await page.locator("button", { hasText: /\+ Додати/i }).click();
    await page.locator("button", { hasText: "Створити" }).click();
    // Модалка залишається відкритою
    await expect(page.locator("text=Нова школа")).toBeVisible();
  });
});
