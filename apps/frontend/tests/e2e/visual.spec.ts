import { test, expect, type Page } from "@playwright/test";
import { percySnapshot } from "@percy/playwright";
import { setupApiMocking, type MockRole } from "./mocks/api";

interface Device {
  name: string;
  width: number;
  height: number;
}

const DEVICES: Device[] = [
  { name: "iPhone 12", width: 390, height: 844 },
  { name: "Pixel 5", width: 393, height: 851 },
  { name: "iPhone SE", width: 375, height: 667 },
];

interface RouteSpec {
  path: string;
  label: string;
}

const ROUTES_BY_ROLE: Record<MockRole, RouteSpec[]> = {
  MANAGER: [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/schools", label: "Schools" },
    { path: "/kindergartens", label: "Kindergartens" },
    { path: "/finance", label: "Finance" },
    { path: "/calendar", label: "Calendar" },
    { path: "/cities", label: "Cities" },
    { path: "/reports/review", label: "Reports Review" },
    { path: "/inventory", label: "Inventory" },
    { path: "/city-leaderboard", label: "City Leaderboard" },
    { path: "/schools/sch-1", label: "School Profile" },
    { path: "/cities/city-1", label: "City Profile" },
  ],
  SUPERADMIN: [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/schools", label: "Schools" },
    { path: "/kindergartens", label: "Kindergartens" },
    { path: "/finance", label: "Finance" },
    { path: "/calendar", label: "Calendar" },
    { path: "/cities", label: "Cities" },
    { path: "/reports/review", label: "Reports Review" },
    { path: "/inventory", label: "Inventory" },
    { path: "/analytics", label: "Analytics" },
    { path: "/employees", label: "Employees" },
    { path: "/city-leaderboard", label: "City Leaderboard" },
    { path: "/schools/sch-1", label: "School Profile" },
    { path: "/cities/city-1", label: "City Profile" },
  ],
};

const ROLES: MockRole[] = ["MANAGER", "SUPERADMIN"];

async function snapshotRoute(page: Page, role: MockRole, device: Device, spec: RouteSpec): Promise<void> {
  await page.goto(spec.path, { waitUntil: "networkidle" });
  const nav = page.getByRole("tablist", { name: "Основна навігація" });
  await expect(nav).toBeVisible();
  await page.waitForTimeout(600);
  await percySnapshot(page, `${role} · ${device.name} · ${spec.label}`);
}

async function captureMoreSheet(page: Page, role: MockRole, device: Device): Promise<void> {
  const more = page.getByLabel("Більше розділів");
  await more.click();
  await page.waitForTimeout(500);
  await percySnapshot(page, `${role} · ${device.name} · More Sheet`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
}

async function captureNotifications(page: Page, role: MockRole, device: Device): Promise<void> {
  const bell = page.getByRole("button", { name: "Сповіщення" });
  await bell.click();
  await page.waitForTimeout(500);
  await percySnapshot(page, `${role} · ${device.name} · Notifications`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
}

for (const device of DEVICES) {
  test.describe(`Mobile visual · ${device.name}`, () => {
    test.use({ viewport: { width: device.width, height: device.height } });

    for (const role of ROLES) {
      test(`collect screenshots — ${role}`, async ({ page }) => {
        await setupApiMocking(page, role);

        for (const spec of ROUTES_BY_ROLE[role]) {
          await snapshotRoute(page, role, device, spec);
        }

        await page.goto("/dashboard", { waitUntil: "networkidle" });
        await expect(page.getByRole("tablist", { name: "Основна навігація" })).toBeVisible();
        await page.waitForTimeout(400);

        await captureMoreSheet(page, role, device);
        await captureNotifications(page, role, device);
      });
    }

    test("collect screenshots — logged out (login)", async ({ page }) => {
      await setupApiMocking(page, null);
      await page.goto("/login", { waitUntil: "networkidle" });
      await expect(page.getByRole("heading", { name: "Вхід у CRM" })).toBeVisible();
      await page.waitForTimeout(400);
      await percySnapshot(page, `Logged out · ${device.name} · Login`);
    });

    test("collect screenshots — 404", async ({ page }) => {
      await setupApiMocking(page, "MANAGER");
      await page.goto("/tsi-y-shche-yakyy-shlyah", { waitUntil: "networkidle" });
      await expect(page.getByText("Сторінку не знайдено")).toBeVisible();
      await page.waitForTimeout(300);
      await percySnapshot(page, `MANAGER · ${device.name} · 404`);
    });
  });
}
