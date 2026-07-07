import { describe, it, expect } from "vitest";
import { hasRole } from "../../utils/roles";

describe("hasRole", () => {
  it("повертає true, якщо allowedRoles не задано", () => {
    expect(hasRole("SUPERADMIN")).toBe(true);
    expect(hasRole("HOST")).toBe(true);
    expect(hasRole(undefined)).toBe(true);
  });

  it("повертає true, якщо роль користувача в списку", () => {
    expect(hasRole("SUPERADMIN", ["SUPERADMIN"])).toBe(true);
    expect(hasRole("MANAGER", ["SUPERADMIN", "MANAGER"])).toBe(true);
  });

  it("повертає false, якщо роль користувача не в списку", () => {
    expect(hasRole("HOST", ["SUPERADMIN"])).toBe(false);
    expect(hasRole("DRIVER", ["SUPERADMIN", "MANAGER"])).toBe(false);
  });

  it("повертає false, якщо userRole undefined, а allowedRoles задано", () => {
    expect(hasRole(undefined, ["SUPERADMIN"])).toBe(false);
  });
});
