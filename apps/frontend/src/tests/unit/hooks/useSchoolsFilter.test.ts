import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";

// Мокаємо хук
vi.mock("../../../hooks/useSchools", () => ({
  useSchoolsList: vi.fn(() => ({
    data: [
      {
        id: "s-1",
        name: "Школа №1",
        type: "Школа",
        cityId: "city-1",
        childrenCount: 300,
        events: [],
      },
      {
        id: "s-2",
        name: "Школа №5",
        type: "Школа",
        cityId: "city-1",
        childrenCount: 100,
        events: [{ status: "FIRST_CONTACT" }],
      },
      {
        id: "s-3",
        name: "Садочок №1",
        type: "Садочок",
        cityId: "city-1",
        childrenCount: 60,
        events: [],
      },
      {
        id: "s-4",
        name: "Школа №10",
        type: "Школа",
        cityId: "city-2",
        childrenCount: 800,
        events: [{ status: "IN_PROGRESS" }],
      },
    ],
    isLoading: false,
    isSuccess: true,
  })),
}));

vi.mock("../../../components/schools/schoolUtils", () => ({
  classifySchool: (s: any) => {
    if (!s.events?.length) return "new";
    const status = s.events[0].status;
    if (["FIRST_CONTACT", "DATE_CONFIRMED"].includes(status)) return "planned";
    if (["IN_PROGRESS", "PREPARATION"].includes(status)) return "inProgress";
    return "new";
  },
  classifySize: (s: any, type: string) => {
    const count = s.childrenCount ?? 0;
    if (type === "Садочок") {
      if (count < 50) return "small";
      if (count < 100) return "medium";
      return "large";
    }
    if (count < 500) return "small";
    if (count < 900) return "medium";
    return "large";
  },
}));

import { useSchoolsList } from "../../../hooks/useSchools";
import {
  classifySchool,
  classifySize,
} from "../../../components/schools/schoolUtils";

// Хелпер — фільтрація як в Schools.tsx
function filterSchools(
  schools: any[],
  {
    cityId,
    type,
    activeFilter,
    sizeFilter,
    search,
  }: {
    cityId?: string;
    type?: string;
    activeFilter?: string | null;
    sizeFilter?: string | null;
    search?: string;
  },
) {
  return schools.filter((s) => {
    if (cityId && s.cityId !== cityId) return false;
    if (type && s.type !== type) return false;
    if (activeFilter && classifySchool(s) !== activeFilter) return false;
    if (sizeFilter && classifySize(s, s.type) !== sizeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return s.name?.toLowerCase().includes(q);
    }
    return true;
  });
}

describe("Фільтрація шкіл", () => {
  it("без фільтрів повертає всі школи", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {});
    expect(filtered).toHaveLength(4);
  });

  it("фільтр по cityId", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, { cityId: "city-1" });
    expect(filtered).toHaveLength(3);
    expect(filtered.every((s) => s.cityId === "city-1")).toBe(true);
  });

  it("фільтр по type=Школа", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, { type: "Школа" });
    expect(filtered).toHaveLength(3);
    expect(filtered.every((s) => s.type === "Школа")).toBe(true);
  });

  it("фільтр activeFilter=new — тільки нові", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      activeFilter: "new",
    });
    expect(filtered).toHaveLength(2); // s-1 і s-3
  });

  it("фільтр activeFilter=planned", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      activeFilter: "planned",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("s-2");
  });

  it("фільтр activeFilter=inProgress", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      activeFilter: "inProgress",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("s-4");
  });

  it("фільтр sizeFilter=small для шкіл (< 500)", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      type: "Школа",
      sizeFilter: "small",
    });
    expect(filtered.every((s) => s.childrenCount < 500)).toBe(true);
  });

  it("фільтр sizeFilter=medium для шкіл (500-900)", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      type: "Школа",
      sizeFilter: "medium",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("s-4"); // childrenCount=800
  });

  it("пошук по назві", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      search: "Школа №1",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("s-1");
  });

  it("пошук нечутливий до регістру", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      search: "школа №5",
    });
    expect(filtered).toHaveLength(1);
  });

  it("комбінований фільтр: city + type + activeFilter", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      cityId: "city-1",
      type: "Школа",
      activeFilter: "planned",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("s-2");
  });

  it("пошук без результатів повертає порожній масив", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      search: "xyznonsense",
    });
    expect(filtered).toHaveLength(0);
  });
});
