import { describe, it, expect } from "vitest";
import {
  classifySchool,
  classifySize,
} from "../../components/schools/schoolUtils";

describe("classifySchool", () => {
  it("повертає 'new' якщо немає подій", () => {
    expect(classifySchool({ events: [] })).toBe("new");
    expect(classifySchool({})).toBe("new");
  });

  it("повертає 'planned' якщо остання подія FIRST_CONTACT або DATE_CONFIRMED", () => {
    expect(classifySchool({ events: [{ status: "FIRST_CONTACT" }] })).toBe(
      "planned",
    );
    expect(classifySchool({ events: [{ status: "DATE_CONFIRMED" }] })).toBe(
      "planned",
    );
  });

  it("повертає 'inProgress' якщо подія в процесі", () => {
    expect(classifySchool({ events: [{ status: "IN_PROGRESS" }] })).toBe(
      "inProgress",
    );
    expect(classifySchool({ events: [{ status: "PREPARATION" }] })).toBe(
      "inProgress",
    );
  });

  it("повертає 'done' якщо подія завершена", () => {
    expect(classifySchool({ events: [{ status: "RE_SALE" }] })).toBe("done");
  });
});

describe("classifySize для школи", () => {
  it("малі < 150", () => {
    expect(classifySize({ childrenCount: 100 }, "Школа")).toBe("small");
  });

  it("середні 150-500", () => {
    expect(classifySize({ childrenCount: 300 }, "Школа")).toBe("medium");
  });

  it("великі 500+", () => {
    expect(classifySize({ childrenCount: 600 }, "Школа")).toBe("large");
  });
});

describe("classifySize для садочку", () => {
  it("малі < 50", () => {
    expect(classifySize({ childrenCount: 30 }, "Садочок")).toBe("small");
  });

  it("середні 50-100", () => {
    expect(classifySize({ childrenCount: 75 }, "Садочок")).toBe("medium");
  });

  it("великі 100+", () => {
    expect(classifySize({ childrenCount: 120 }, "Садочок")).toBe("large");
  });
});
