import { test, expect } from "@playwright/test";

test.describe("Авторизація", () => {
  test("успішний логін", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "admin123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/cities/);
  });

  test("невірний пароль — показує помилку", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "admin@crm.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');
    await expect(page.locator("text=Невірний")).toBeVisible();
  });
});
