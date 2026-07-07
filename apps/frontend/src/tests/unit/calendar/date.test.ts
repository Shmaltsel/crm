import { describe, it, expect } from "vitest";
import {
  toISODate,
  getDaysInMonth,
  getFirstDayOfMonth,
  isPastDay,
  buildMonthDays,
} from "../../../features/calendar/utils/date";

describe("toISODate", () => {
  it("форматує дату в ISO без часу", () => {
    expect(toISODate(new Date(2026, 6, 10))).toBe("2026-07-10");
  });
});

describe("getDaysInMonth", () => {
  it("повертає 31 для січня", () => {
    expect(getDaysInMonth(2026, 0)).toBe(31);
  });

  it("повертає 28 для лютого невисокосного року", () => {
    expect(getDaysInMonth(2026, 1)).toBe(28);
  });

  it("повертає 29 для лютого високосного року", () => {
    expect(getDaysInMonth(2024, 1)).toBe(29);
  });

  it("повертає 30 для квітня", () => {
    expect(getDaysInMonth(2026, 3)).toBe(30);
  });
});

describe("getFirstDayOfMonth", () => {
  it("понеділок (0) для 2026-06-01 (перший день місяця)", () => {
    expect(getFirstDayOfMonth(2026, 5)).toBe(0);
  });

  it("правильний день для 2026-07-01 (середа = 2)", () => {
    expect(getFirstDayOfMonth(2026, 6)).toBe(2);
  });
});

describe("isPastDay", () => {
  it("минулий день повертає true", () => {
    expect(isPastDay(new Date(2020, 0, 1))).toBe(true);
  });

  it("сьогодні повертає false", () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    expect(isPastDay(today)).toBe(false);
  });
});

describe("buildMonthDays", () => {
  it("повертає масив з 33 елементів для липня 2026 (31 день, початок з середи)", () => {
    const days = buildMonthDays(2026, 6);
    expect(days.length).toBe(33);
    expect(days[0]).toBeNull();
    expect(days[1]).toBeNull();
    expect(days[2]?.getDate()).toBe(1);
  });

  it("перші null елементи відповідають зміщенню", () => {
    const days = buildMonthDays(2026, 6);
    const firstDay = getFirstDayOfMonth(2026, 6);
    const nulls = days.filter((d) => d === null).length;
    expect(nulls).toBe(firstDay);
  });
});
