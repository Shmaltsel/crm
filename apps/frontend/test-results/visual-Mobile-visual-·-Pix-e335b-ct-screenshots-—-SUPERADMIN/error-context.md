# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> Mobile visual · Pixel 5 >> collect screenshots — SUPERADMIN
- Location: tests\e2e\visual.spec.ts:86:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByRole('tablist', { name: 'Основна навігація' })
Expected: visible
Received: undefined

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('tablist', { name: 'Основна навігація' })

```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | import { percySnapshot } from "@percy/playwright";
  3   | import { setupApiMocking, type MockRole } from "./mocks/api";
  4   | 
  5   | interface Device {
  6   |   name: string;
  7   |   width: number;
  8   |   height: number;
  9   | }
  10  | 
  11  | const DEVICES: Device[] = [
  12  |   { name: "iPhone 12", width: 390, height: 844 },
  13  |   { name: "Pixel 5", width: 393, height: 851 },
  14  |   { name: "iPhone SE", width: 375, height: 667 },
  15  | ];
  16  | 
  17  | interface RouteSpec {
  18  |   path: string;
  19  |   label: string;
  20  | }
  21  | 
  22  | const ROUTES_BY_ROLE: Record<MockRole, RouteSpec[]> = {
  23  |   MANAGER: [
  24  |     { path: "/dashboard", label: "Dashboard" },
  25  |     { path: "/schools", label: "Schools" },
  26  |     { path: "/kindergartens", label: "Kindergartens" },
  27  |     { path: "/finance", label: "Finance" },
  28  |     { path: "/calendar", label: "Calendar" },
  29  |     { path: "/cities", label: "Cities" },
  30  |     { path: "/reports/review", label: "Reports Review" },
  31  |     { path: "/inventory", label: "Inventory" },
  32  |     { path: "/city-leaderboard", label: "City Leaderboard" },
  33  |     { path: "/schools/sch-1", label: "School Profile" },
  34  |     { path: "/cities/city-1", label: "City Profile" },
  35  |   ],
  36  |   SUPERADMIN: [
  37  |     { path: "/dashboard", label: "Dashboard" },
  38  |     { path: "/schools", label: "Schools" },
  39  |     { path: "/kindergartens", label: "Kindergartens" },
  40  |     { path: "/finance", label: "Finance" },
  41  |     { path: "/calendar", label: "Calendar" },
  42  |     { path: "/cities", label: "Cities" },
  43  |     { path: "/reports/review", label: "Reports Review" },
  44  |     { path: "/inventory", label: "Inventory" },
  45  |     { path: "/analytics", label: "Analytics" },
  46  |     { path: "/employees", label: "Employees" },
  47  |     { path: "/city-leaderboard", label: "City Leaderboard" },
  48  |     { path: "/schools/sch-1", label: "School Profile" },
  49  |     { path: "/cities/city-1", label: "City Profile" },
  50  |   ],
  51  | };
  52  | 
  53  | const ROLES: MockRole[] = ["MANAGER", "SUPERADMIN"];
  54  | 
  55  | async function snapshotRoute(page: Page, role: MockRole, device: Device, spec: RouteSpec): Promise<void> {
  56  |   await page.goto(spec.path, { waitUntil: "networkidle" });
  57  |   const nav = page.getByRole("tablist", { name: "Основна навігація" });
> 58  |   await expect(nav).toBeVisible();
      |                     ^ Error: expect(locator).toBeVisible() failed
  59  |   await page.waitForTimeout(600);
  60  |   await percySnapshot(page, `${role} · ${device.name} · ${spec.label}`);
  61  | }
  62  | 
  63  | async function captureMoreSheet(page: Page, role: MockRole, device: Device): Promise<void> {
  64  |   const more = page.getByLabel("Більше розділів");
  65  |   await more.click();
  66  |   await page.waitForTimeout(500);
  67  |   await percySnapshot(page, `${role} · ${device.name} · More Sheet`);
  68  |   await page.keyboard.press("Escape");
  69  |   await page.waitForTimeout(300);
  70  | }
  71  | 
  72  | async function captureNotifications(page: Page, role: MockRole, device: Device): Promise<void> {
  73  |   const bell = page.getByRole("button", { name: "Сповіщення" });
  74  |   await bell.click();
  75  |   await page.waitForTimeout(500);
  76  |   await percySnapshot(page, `${role} · ${device.name} · Notifications`);
  77  |   await page.keyboard.press("Escape");
  78  |   await page.waitForTimeout(300);
  79  | }
  80  | 
  81  | for (const device of DEVICES) {
  82  |   test.describe(`Mobile visual · ${device.name}`, () => {
  83  |     test.use({ viewport: { width: device.width, height: device.height } });
  84  | 
  85  |     for (const role of ROLES) {
  86  |       test(`collect screenshots — ${role}`, async ({ page }) => {
  87  |         await setupApiMocking(page, role);
  88  | 
  89  |         for (const spec of ROUTES_BY_ROLE[role]) {
  90  |           await snapshotRoute(page, role, device, spec);
  91  |         }
  92  | 
  93  |         await page.goto("/dashboard", { waitUntil: "networkidle" });
  94  |         await expect(page.getByRole("tablist", { name: "Основна навігація" })).toBeVisible();
  95  |         await page.waitForTimeout(400);
  96  | 
  97  |         await captureMoreSheet(page, role, device);
  98  |         await captureNotifications(page, role, device);
  99  |       });
  100 |     }
  101 | 
  102 |     test("collect screenshots — logged out (login)", async ({ page }) => {
  103 |       await setupApiMocking(page, null);
  104 |       await page.goto("/login", { waitUntil: "networkidle" });
  105 |       await expect(page.getByRole("heading", { name: "Вхід у CRM" })).toBeVisible();
  106 |       await page.waitForTimeout(400);
  107 |       await percySnapshot(page, `Logged out · ${device.name} · Login`);
  108 |     });
  109 | 
  110 |     test("collect screenshots — 404", async ({ page }) => {
  111 |       await setupApiMocking(page, "MANAGER");
  112 |       await page.goto("/tsi-y-shche-yakyy-shlyah", { waitUntil: "networkidle" });
  113 |       await expect(page.getByText("Сторінку не знайдено")).toBeVisible();
  114 |       await page.waitForTimeout(300);
  115 |       await percySnapshot(page, `MANAGER · ${device.name} · 404`);
  116 |     });
  117 |   });
  118 | }
  119 | 
```