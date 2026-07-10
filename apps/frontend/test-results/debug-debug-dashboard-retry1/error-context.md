# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: debug.spec.ts >> debug dashboard
- Location: tests\e2e\debug.spec.ts:24:1

# Error details

```
Error: page.goto: net::ERR_INSUFFICIENT_RESOURCES at http://localhost:5173/dashboard
Call log:
  - navigating to "http://localhost:5173/dashboard", waiting until "networkidle"

```

# Test source

```ts
  1  | import { test, type Page } from "@playwright/test";
  2  | import { setupApiMocking } from "./mocks/api";
  3  | 
  4  | async function dump(page: Page, path: string): Promise<void> {
  5  |   const errors: string[] = [];
  6  |   page.on("console", (m) => { if (m.type() === "error") errors.push("CONSOLE: " + m.text()); });
  7  |   page.on("pageerror", (e) => errors.push("PAGEERROR: " + (e.stack ?? e.message)));
  8  | 
  9  |   await setupApiMocking(page, "MANAGER");
> 10 |   await page.goto(path, { waitUntil: "networkidle" });
     |              ^ Error: page.goto: net::ERR_INSUFFICIENT_RESOURCES at http://localhost:5173/dashboard
  11 |   await page.waitForTimeout(1500);
  12 | 
  13 |   const url = page.url();
  14 |   const navCount = await page.getByRole("tablist", { name: "Основна навігація" }).count();
  15 |   const bodyText = (await page.locator("body").innerText()).slice(0, 300);
  16 | 
  17 |   console.log(`\n=== ${path} ===`);
  18 |   console.log("URL:", url);
  19 |   console.log("tablist count:", navCount);
  20 |   console.log("BODY:", JSON.stringify(bodyText));
  21 |   console.log("ERRORS:", errors.length ? errors.join("\n") : "none");
  22 | }
  23 | 
  24 | test("debug dashboard", async ({ page }) => {
  25 |   await dump(page, "/dashboard");
  26 | });
  27 | 
  28 | test("debug schools", async ({ page }) => {
  29 |   await dump(page, "/schools");
  30 | });
  31 | 
```