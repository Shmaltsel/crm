import { describe, it, expect } from "vitest";
import { NAV_TABS, ADMIN_TABS } from "../../constants/navTabs";

describe("NAV_TABS", () => {
  it("має правильну кількість вкладок", () => {
    expect(NAV_TABS.length).toBe(8);
  });

  it("всі вкладки мають to, icon, label", () => {
    for (const tab of NAV_TABS) {
      expect(tab.to).toBeTruthy();
      expect(tab.icon).toBeTruthy();
      expect(tab.label).toBeTruthy();
    }
  });

  it("/employees доступний лише для SUPERADMIN", () => {
    const emp = NAV_TABS.find((t) => t.to === "/employees");
    expect(emp?.roles).toEqual(["SUPERADMIN"]);
  });

  it("/dashboard та /reports/review доступні для керівників", () => {
    const dash = NAV_TABS.find((t) => t.to === "/dashboard");
    expect(dash?.roles).toEqual(["SUPERADMIN", "MANAGER", "OWNER"]);
    const review = NAV_TABS.find((t) => t.to === "/reports/review");
    expect(review?.roles).toEqual(["SUPERADMIN", "OWNER", "MANAGER"]);
  });

  it("вкладки без roles доступні всім", () => {
    const publicTabs = NAV_TABS.filter((t) => !t.roles);
    expect(publicTabs.length).toBeGreaterThanOrEqual(3);
    for (const t of publicTabs) {
      expect(t.roles).toBeUndefined();
    }
  });

  it("/schools, /kindergartens, /finance, /calendar не мають обмежень", () => {
    for (const path of ["/schools", "/kindergartens", "/finance", "/calendar"]) {
      const tab = NAV_TABS.find((t) => t.to === path);
      expect(tab?.roles).toBeUndefined();
    }
  });
});

describe("ADMIN_TABS", () => {
  it("має лише /cities для SUPERADMIN", () => {
    expect(ADMIN_TABS.length).toBe(1);
    expect(ADMIN_TABS[0].to).toBe("/cities");
    expect(ADMIN_TABS[0].roles).toEqual(["SUPERADMIN"]);
  });
});
