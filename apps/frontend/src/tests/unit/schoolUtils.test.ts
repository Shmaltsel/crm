import { describe, it, expect } from "vitest";
import {
  classifySchool,
  classifySize,
} from "../../components/schools/schoolUtils";

describe("classifySchool", () => {
  it("повертає 'new' якщо categories містить new", () => {
    expect(classifySchool({ events: [] })).toBe("new");
    expect(classifySchool({})).toBe("new");
  });

  it("повертає 'planned' якщо categories містить planned", () => {
    expect(
      classifySchool({
        events: [],
        categories: ["planned"],
      } as Parameters<typeof classifySchool>[0]),
    ).toBe("planned");
  });

  it("повертає 'inProgress' якщо categories містить inProgress", () => {
    expect(
      classifySchool({
        events: [{ status: "IN_PROGRESS" }],
        categories: ["inProgress"],
      } as Parameters<typeof classifySchool>[0]),
    ).toBe("inProgress");
  });

  it("повертає 'done' якщо categories містить done", () => {
    expect(
      classifySchool({
        events: [{ status: "RE_SALE", report: {} }],
        categories: ["done", "inProgress"],
      } as Parameters<typeof classifySchool>[0]),
    ).toBe("done");
  });

  it("fallback: done якщо є RE_SALE з звітом", () => {
    expect(
      classifySchool({
        events: [{ status: "RE_SALE", report: {} }],
      }),
    ).toBe("done");
  });

  it("fallback: inProgress якщо є активна подія", () => {
    expect(
      classifySchool({
        events: [{ status: "FIRST_CONTACT" }],
      }),
    ).toBe("inProgress");
  });

  it("done має пріоритет над inProgress", () => {
    expect(
      classifySchool({
        events: [],
        categories: ["inProgress", "done"],
      } as Parameters<typeof classifySchool>[0]),
    ).toBe("done");
  });
});

describe("classifySize для школи", () => {
  it("малі < 500", () => {
    expect(classifySize({ childrenCount: 300 }, "Школа")).toBe("small");
  });

  it("середні 500-900", () => {
    expect(classifySize({ childrenCount: 700 }, "Школа")).toBe("medium");
  });

  it("великі 900+", () => {
    expect(classifySize({ childrenCount: 1000 }, "Школа")).toBe("large");
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
