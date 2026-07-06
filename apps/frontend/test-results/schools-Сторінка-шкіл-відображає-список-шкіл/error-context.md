# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: schools.spec.ts >> Сторінка шкіл >> відображає список шкіл
- Location: e2e\schools.spec.ts:22:3

# Error details

```
TimeoutError: page.waitForURL: Timeout 8000ms exceeded.
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
  1   | import { test, expect, Page } from "@playwright/test";
  2   | 
  3   | async function login(page: Page) {
  4   |   await page.goto("/login");
  5   |   await page.fill('input[type="email"]', "admin@crm.com");
  6   |   await page.fill('input[type="password"]', "admin123");
  7   |   await page.click('button[type="submit"]');
> 8   |   await page.waitForURL(/cities/, { timeout: 8000 });
      |              ^ TimeoutError: page.waitForURL: Timeout 8000ms exceeded.
  9   | }
  10  | 
  11  | test.describe("Сторінка шкіл", () => {
  12  |   test.beforeEach(async ({ page }) => {
  13  |     await login(page);
  14  |     await page.goto("/schools");
  15  |     await page.waitForLoadState("networkidle");
  16  |   });
  17  | 
  18  |   test("відображає заголовок Школи", async ({ page }) => {
  19  |     await expect(page.locator("h1")).toContainText("Школи");
  20  |   });
  21  | 
  22  |   test("відображає список шкіл", async ({ page }) => {
  23  |     const rows = page.locator("table tbody tr, .school-row-enter");
  24  |     await expect(rows.first()).toBeVisible({ timeout: 8000 });
  25  |   });
  26  | 
  27  |   test("пошук фільтрує школи", async ({ page }) => {
  28  |     const searchInput = page.locator('input[placeholder*="Пошук"]');
  29  |     await expect(searchInput).toBeVisible();
  30  | 
  31  |     const firstSchool = page.locator("table tbody tr").first();
  32  |     const schoolName = await firstSchool.locator("td").first().textContent();
  33  |     const searchTerm = schoolName?.slice(0, 5) ?? "Школа";
  34  | 
  35  |     await searchInput.fill(searchTerm);
  36  |     await page.waitForTimeout(300);
  37  | 
  38  |     const results = page.locator("table tbody tr");
  39  |     const count = await results.count();
  40  |     expect(count).toBeGreaterThan(0);
  41  |   });
  42  | 
  43  |   test("очищення пошуку повертає всі результати", async ({ page }) => {
  44  |     const searchInput = page.locator('input[placeholder*="Пошук"]');
  45  |     await searchInput.fill("Школа №1");
  46  |     await page.waitForTimeout(300);
  47  |     const filtered = await page.locator("table tbody tr").count();
  48  | 
  49  |     await searchInput.fill("");
  50  |     await page.waitForTimeout(300);
  51  |     const all = await page.locator("table tbody tr").count();
  52  | 
  53  |     expect(all).toBeGreaterThanOrEqual(filtered);
  54  |   });
  55  | 
  56  |   test("фільтр по статусу працює", async ({ page }) => {
  57  |     const newFilter = page.locator("button", { hasText: "Нові" });
  58  |     if (await newFilter.isVisible()) {
  59  |       await newFilter.click();
  60  |       await page.waitForTimeout(200);
  61  |       const counter = page.locator("text=/шкіл/i");
  62  |       await expect(counter).toBeVisible();
  63  |     }
  64  |   });
  65  | 
  66  |   test("клік на школу переходить на профіль", async ({ page }) => {
  67  |     const firstRow = page.locator("table tbody tr").first();
  68  |     await firstRow.click();
  69  |     await expect(page).toHaveURL(/\/schools\/.+/, { timeout: 5000 });
  70  |   });
  71  | 
  72  |   test("відображає StatsBar з лічильниками", async ({ page }) => {
  73  |     await expect(page.locator("text=Нові")).toBeVisible();
  74  |     await expect(page.locator("text=Заплановані")).toBeVisible();
  75  |     await expect(page.locator("text=В роботі")).toBeVisible();
  76  |   });
  77  | });
  78  | 
  79  | test.describe("Додавання школи", () => {
  80  |   test.beforeEach(async ({ page }) => {
  81  |     await login(page);
  82  |     await page.goto("/schools");
  83  |     await page.waitForLoadState("networkidle");
  84  |   });
  85  | 
  86  |   test("кнопка Додати відкриває модалку", async ({ page }) => {
  87  |     const addBtn = page.locator("button", { hasText: /\+ Додати/i });
  88  |     await expect(addBtn).toBeVisible();
  89  |     await addBtn.click();
  90  |     await expect(page.locator("text=Нова школа")).toBeVisible();
  91  |   });
  92  | 
  93  |   test("модалка закривається по кнопці Скасувати", async ({ page }) => {
  94  |     await page.locator("button", { hasText: /\+ Додати/i }).click();
  95  |     await expect(page.locator("text=Нова школа")).toBeVisible();
  96  |     await page.locator("button", { hasText: "Скасувати" }).click();
  97  |     await expect(page.locator("text=Нова школа")).not.toBeVisible();
  98  |   });
  99  | 
  100 |   test("форма не відправляється без назви школи", async ({ page }) => {
  101 |     await page.locator("button", { hasText: /\+ Додати/i }).click();
  102 |     await page.locator("button", { hasText: "Створити" }).click();
  103 |     await expect(page.locator("text=Нова школа")).toBeVisible();
  104 |   });
  105 | });
  106 | 
```