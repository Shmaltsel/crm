import { describe, it, expect } from "vitest";
import { shadeHex, getDayColor } from "../../../features/calendar/utils/color";
import { PROJECT_HEX } from "../../../features/calendar/constants";

describe("shadeHex", () => {
  it("освітлює колір (позитивний percent)", () => {
    const result = shadeHex("#3b82f6", 50);
    expect(result).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
    expect(result).toBe("rgb(109, 180, 255)");
  });

  it("затіняє колір (негативний percent)", () => {
    const result = shadeHex("#3b82f6", -50);
    expect(result).toBe("rgb(9, 80, 196)");
  });

  it("повертає rgb рядок", () => {
    const result = shadeHex("#10b981", 0);
    expect(result).toBe("rgb(16, 185, 129)");
  });
});

describe("getDayColor", () => {
  it("повертає undefined для порожнього масиву подій", () => {
    const hexMap = new Map<string, string>([["Проєкт A", "#3b82f6"]]);
    const result = getDayColor([], hexMap);
    expect(result).toBeUndefined();
  });

  it("повертає градієнт для однієї події", () => {
    const hexMap = new Map<string, string>([["Проєкт A", "#3b82f6"]]);
    const events = [{ project: "Проєкт A" }];
    const result = getDayColor(events, hexMap);
    expect(result).toContain("linear-gradient(to bottom");
    expect(result).toContain("rgb");
  });

  it("повертає градієнт для кількох подій одного проєкту", () => {
    const hexMap = new Map<string, string>([["Проєкт A", "#10b981"]]);
    const events = [{ project: "Проєкт A" }, { project: "Проєкт A" }];
    const result = getDayColor(events, hexMap);
    expect(result).toContain("linear-gradient(to bottom");
  });

  it("повертає багатоколірний градієнт для різних проєктів", () => {
    const hexMap = new Map<string, string>([
      ["Проєкт A", "#3b82f6"],
      ["Проєкт B", "#ef4444"],
    ]);
    const events = [{ project: "Проєкт A" }, { project: "Проєкт B" }];
    const result = getDayColor(events, hexMap);
    expect(result).toContain("linear-gradient(to bottom");
    expect(result).toContain("rgb");
  });

  it("використовує PROJECT_HEX.blue як fallback при відсутньому проєкті", () => {
    const hexMap = new Map<string, string>();
    const events = [{ project: "Невідомий" }];
    const result = getDayColor(events, hexMap);
    expect(result).toContain(shadeHex(PROJECT_HEX.blue, 35).split(",")[0]);
  });
});
