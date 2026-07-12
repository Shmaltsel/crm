import { test, expect, Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.fill('input[type="email"]', "admin@crm.com");
  await page.fill('input[type="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForURL(/cities/, { timeout: 8000 });
}

async function navigateToDashboard(page: Page) {
  await page.goto("/dashboard");
  await page.waitForLoadState("networkidle");
}

async function swipeLeft(page: Page, fromCenter = false) {
  const dashboard = page.locator('[data-testid="dashboard-swiper"]');
  const box = await dashboard.boundingBox();
  if (!box) throw new Error("Dashboard not found");
  const startX = fromCenter ? box.x + box.width * 0.5 : box.x + box.width * 0.8;
  const endX = fromCenter ? box.x + box.width * 0.1 : box.x + box.width * 0.2;
  const y = box.y + box.height * 0.4;
  await page.mouse.move(startX, y);
  await page.mouse.down();
  await page.mouse.move(endX, y, { steps: 10 });
  await page.mouse.up();
}

async function swipeRight(page: Page) {
  const dashboard = page.locator('[data-testid="dashboard-swiper"]');
  const box = await dashboard.boundingBox();
  if (!box) throw new Error("Dashboard not found");
  const startX = box.x + box.width * 0.2;
  const endX = box.x + box.width * 0.8;
  const y = box.y + box.height * 0.4;
  await page.mouse.move(startX, y);
  await page.mouse.down();
  await page.mouse.move(endX, y, { steps: 10 });
  await page.mouse.up();
}

test.describe("Dashboard swipe-навігація", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await navigateToDashboard(page);
  });

  test("свайп вліво перемикає на Reports", async ({ page }) => {
    await expect(page).toHaveURL(/tab=overview/);
    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=reports/, { timeout: 3000 });
  });

  test("свайп вліво двічі перемикає на Leaderboard", async ({ page }) => {
    await swipeLeft(page);
    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=leaderboard/, { timeout: 3000 });
  });

  test("свайп вправо повертає назад", async ({ page }) => {
    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=reports/, { timeout: 3000 });
    await swipeRight(page);
    await expect(page).toHaveURL(/tab=overview/, { timeout: 3000 });
  });

  test("свайп через усі вкладки в обидва боки", async ({ page }) => {
    await expect(page).toHaveURL(/tab=overview/);

    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=reports/, { timeout: 3000 });

    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=leaderboard/, { timeout: 3000 });

    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=issues/, { timeout: 3000 });

    await swipeLeft(page);
    await expect(page).toHaveURL(/tab=analytics/, { timeout: 3000 });

    await swipeRight(page);
    await expect(page).toHaveURL(/tab=issues/, { timeout: 3000 });

    await swipeRight(page);
    await expect(page).toHaveURL(/tab=leaderboard/, { timeout: 3000 });

    await swipeRight(page);
    await expect(page).toHaveURL(/tab=reports/, { timeout: 3000 });

    await swipeRight(page);
    await expect(page).toHaveURL(/tab=overview/, { timeout: 3000 });
  });

  test("свайп вліво з Аналітики (остання вкладка) працює", async ({ page }) => {
    await page.goto("/dashboard?tab=analytics");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/tab=analytics/);

    await swipeLeft(page, true);
    await expect(page).toHaveURL(/tab=issues/, { timeout: 3000 });
  });
});
