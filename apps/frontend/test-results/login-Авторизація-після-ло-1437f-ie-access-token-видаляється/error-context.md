# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Авторизація >> після логауту cookie access_token видаляється
- Location: e2e\login.spec.ts:53:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - heading "Вхід у CRM" [level=1] [ref=e5]
  - generic [ref=e6]: Невірний email або пароль
  - generic [ref=e7]:
    - generic [ref=e8]:
      - generic [ref=e9]: Email
      - textbox [ref=e10]: admin@crm.com
    - generic [ref=e11]:
      - generic [ref=e12]: Пароль
      - textbox [ref=e13]: admin123
    - button "Увійти" [ref=e14] [cursor=pointer]:
      - generic [ref=e15]: Увійти
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Авторизація", () => {
  4  |   test("успішний логін перенаправляє на /cities", async ({ page }) => {
  5  |     await page.goto("/login");
  6  |     await page.fill('input[type="email"]', "admin@crm.com");
  7  |     await page.fill('input[type="password"]', "admin123");
  8  |     await page.click('button[type="submit"]');
  9  |     await expect(page).toHaveURL(/cities/, { timeout: 8000 });
  10 |   });
  11 | 
  12 |   test("невірний пароль — залишається на /login", async ({ page }) => {
  13 |     await page.goto("/login");
  14 |     await page.fill('input[type="email"]', "admin@crm.com");
  15 |     await page.fill('input[type="password"]', "wrongpassword");
  16 |     await page.click('button[type="submit"]');
  17 |     await expect(page).toHaveURL(/login/);
  18 |   });
  19 | 
  20 |   test("невірний пароль — показує повідомлення про помилку", async ({
  21 |     page,
  22 |   }) => {
  23 |     await page.goto("/login");
  24 |     await page.fill('input[type="email"]', "admin@crm.com");
  25 |     await page.fill('input[type="password"]', "wrongpassword");
  26 |     await page.click('button[type="submit"]');
  27 |     await expect(
  28 |       page.locator("text=/невірний|помилка|неправильний/i"),
  29 |     ).toBeVisible({ timeout: 5000 });
  30 |   });
  31 | 
  32 |   test("порожній email — кнопка не відправляє форму", async ({ page }) => {
  33 |     await page.goto("/login");
  34 |     await page.fill('input[type="password"]', "admin123");
  35 |     await page.click('button[type="submit"]');
  36 |     await expect(page).toHaveURL(/login/);
  37 |   });
  38 | 
  39 |   test("після логіну встановлюється httpOnly cookie access_token", async ({
  40 |     page,
  41 |   }) => {
  42 |     await page.goto("/login");
  43 |     await page.fill('input[type="email"]', "admin@crm.com");
  44 |     await page.fill('input[type="password"]', "admin123");
  45 |     await page.click('button[type="submit"]');
  46 |     await page.waitForURL(/cities/);
  47 |     const cookies = await page.context().cookies();
  48 |     const authCookie = cookies.find((c) => c.name === "access_token");
  49 |     expect(authCookie).toBeTruthy();
  50 |     expect(authCookie?.httpOnly).toBe(true);
  51 |   });
  52 | 
  53 |   test("після логауту cookie access_token видаляється", async ({ page }) => {
  54 |     await page.goto("/login");
  55 |     await page.fill('input[type="email"]', "admin@crm.com");
  56 |     await page.fill('input[type="password"]', "admin123");
  57 |     await page.click('button[type="submit"]');
> 58 |     await page.waitForURL(/cities/);
     |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  59 | 
  60 |     const logoutBtn = page.locator("button", { hasText: /вийти|logout/i });
  61 |     if (await logoutBtn.isVisible()) {
  62 |       await logoutBtn.click();
  63 |       const cookies = await page.context().cookies();
  64 |       const authCookie = cookies.find((c) => c.name === "access_token");
  65 |       expect(authCookie).toBeFalsy();
  66 |     }
  67 |   });
  68 | 
  69 |  test("захищений маршрут без cookie перенаправляє на /login", async ({
  70 |     page,
  71 |   }) => {
  72 |     await page.goto("/schools");
  73 |     await page.context().clearCookies();
  74 |     await page.goto("/schools");
  75 |     await expect(page).toHaveURL(/login/);
  76 |   });
  77 | });
  78 | 
```