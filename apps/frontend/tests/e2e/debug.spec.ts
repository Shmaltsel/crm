import { test, type Page } from "@playwright/test";
import { setupApiMocking } from "./mocks/api";

async function dump(page: Page, path: string): Promise<void> {
  const errors: string[] = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push("CONSOLE: " + m.text()); });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + (e.stack ?? e.message)));

  await setupApiMocking(page, "MANAGER");
  await page.goto(path, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const url = page.url();
  const navCount = await page.getByRole("tablist", { name: "Основна навігація" }).count();
  const bodyText = (await page.locator("body").innerText()).slice(0, 300);

  console.log(`\n=== ${path} ===`);
  console.log("URL:", url);
  console.log("tablist count:", navCount);
  console.log("BODY:", JSON.stringify(bodyText));
  console.log("ERRORS:", errors.length ? errors.join("\n") : "none");
}

test("debug dashboard", async ({ page }) => {
  await dump(page, "/dashboard");
});

test("debug schools", async ({ page }) => {
  await dump(page, "/schools");
});
