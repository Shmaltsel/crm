import { test, expect } from "@playwright/test";

test.describe("Сторінка шкіл", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/cities/);
    await page.goto("/schools");
  });

  test("відображає список шкіл", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Школи");
    await expect(
      page.locator("[data-testid='school-row']").first(),
    ).toBeVisible();
  });

  test("пошук фільтрує школи", async ({ page }) => {
    await page.fill('input[placeholder*="Пошук"]', "Школа №1");
    await expect(page.locator("text=Школа №1")).toBeVisible();
  });
});
