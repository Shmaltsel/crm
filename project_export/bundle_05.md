# FILE: apps/frontend/src/tests/unit/formatCurrency.test.ts

```
import { describe, it, expect } from "vitest";
import { formatCurrency } from "../../utils/formatCurrency";

describe("formatCurrency", () => {
  it("форматує ціле число з розділювачем тисяч (uk-UA)", () => {
    expect(formatCurrency(10000)).toBe("10\u00A0000");
  });

  it("округлює дробові суми вгору/вниз коректно", () => {
    expect(formatCurrency(9999.6)).toBe("10\u00A0000");
    expect(formatCurrency(9999.4)).toBe("9\u00A0999");
  });

  it("повертає 0 для undefined", () => {
    expect(formatCurrency(undefined)).toBe("0");
  });

  it("повертає 0 для null", () => {
    expect(formatCurrency(null)).toBe("0");
  });

  it("повертає 0 для NaN", () => {
    expect(formatCurrency(NaN)).toBe("0");
  });

  it("коректно форматує 0", () => {
    expect(formatCurrency(0)).toBe("0");
  });

  it("не ламається на дуже великих сумах", () => {
    expect(formatCurrency(12345678)).toBe("12\u00A0345\u00A0678");
  });

  it("від'ємні суми форматуються з мінусом", () => {
    expect(formatCurrency(-500)).toBe("-500");
  });
});

```

# FILE: apps/frontend/src/tests/unit/hooks/useCities.test.tsx

```
import { renderHook, waitFor } from "@testing-library/react";
import { useCities } from "../../../hooks/useCities";
import { useAddCity } from "../../../hooks/useApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCities", () => {
  it("fetches cities successfully", async () => {
    const { result } = renderHook(() => useCities(), { wrapper: createWrapper() });
    
    await waitFor(() => {
      if (result.current.isError) throw result.current.error;
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.length).toBeGreaterThan(0);
    expect(result.current.data?.[0].name).toBe("Львів");
  });
});

describe("useAddCity", () => {
  it("mutates and updates query cache with new city", async () => {
    let addedCity: any;
    server.use(
      http.post("http://localhost:3000/api/cities", async ({ request }) => {
        const body = await request.json();
        addedCity = { id: "new-city-1", name: (body as any).name };
        return HttpResponse.json(addedCity);
      })
    );

    const { result } = renderHook(() => useAddCity(), { wrapper: createWrapper() });
    
    result.current.mutate("Тернопіль");
    
    await waitFor(() => {
      if (result.current.isError) throw result.current.error;
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual({ id: "new-city-1", name: "Тернопіль" });
  });
});

```

# FILE: apps/frontend/src/tests/unit/hooks/useSchoolProfile.test.tsx

```
import { renderHook, waitFor } from "@testing-library/react";
import { useSchool, useSchoolEvents, useCreateEvent, useUpdateEventStatus } from "../../../hooks/useSchoolProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useSchoolProfile hooks", () => {
  describe("useSchool", () => {
    it("fetches school details successfully", async () => {
      const { result } = renderHook(() => useSchool("school-1"), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.name).toBe("Школа №1");
      expect(result.current.data?.childrenCount).toBe(300);
    });

    it("does not fetch if id is undefined", () => {
      const { result } = renderHook(() => useSchool(undefined), { wrapper: createWrapper() });
      expect(result.current.isFetching).toBe(false);
    });
  });

  describe("useSchoolEvents", () => {
    it("fetches school events successfully", async () => {
      const { result } = renderHook(() => useSchoolEvents("school-1"), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.length).toBeGreaterThan(0);
      expect(result.current.data?.[0].project).toBe("Голограма для школи");
    });
  });

  describe("useCreateEvent", () => {
    it("mutates and invalidates schoolEvents query", async () => {
      let createdEvent: any;
      server.use(
        http.post("http://localhost:3000/api/events", async ({ request }) => {
          const body = await request.json();
          createdEvent = { id: "new-event", ...(body as any) };
          return HttpResponse.json(createdEvent);
        })
      );

      const { result } = renderHook(() => useCreateEvent(), { wrapper: createWrapper() });
      
      result.current.mutate({
        schoolId: "school-1",
        project: "New Project",
        date: "2026-08-01",
      } as any);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(createdEvent);
    });
  });

  describe("useUpdateEventStatus", () => {
    it("updates status and applies optimistic updates", async () => {
      let patchedStatus: string | undefined;
      server.use(
        http.patch("http://localhost:3000/api/events/:eventId/status", async ({ request }) => {
          const body = await request.json() as any;
          patchedStatus = body.status;
          return HttpResponse.json({ id: "event-1", status: body.status });
        })
      );

      const { result } = renderHook(() => useUpdateEventStatus(), { wrapper: createWrapper() });
      
      result.current.mutate({
        eventId: "event-1",
        status: "DONE",
        actionName: "Завершено",
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(patchedStatus).toBe("DONE");
    });
  });
});

```

# FILE: apps/frontend/src/tests/unit/navTabs.test.ts

```
import { describe, it, expect } from "vitest";
import { NAV_TABS, ADMIN_TABS } from "../../constants/navTabs";

describe("NAV_TABS", () => {
  it("має правильну кількість вкладок", () => {
    expect(NAV_TABS.length).toBe(11);
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

  it("/cities доступний для SUPERADMIN, MANAGER, OWNER", () => {
    const cities = NAV_TABS.find((t) => t.to === "/cities");
    expect(cities?.roles).toEqual(["SUPERADMIN", "MANAGER", "OWNER"]);
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
```

# FILE: apps/frontend/src/tests/unit/reactImports.test.ts

```
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const HOOKS = [
  "useState", "useEffect", "useCallback", "useMemo", "useRef",
  "useContext", "useReducer", "useLayoutEffect", "useImperativeHandle",
  "useDebugValue", "useTransition", "useDeferredValue", "useId",
  "useSyncExternalStore", "useInsertionEffect",
];

const pagesDir = path.resolve(__dirname, "../../pages");

function getAllImportedFromReact(content: string): Set<string> {
  const imported = new Set<string>();

  // Normalize multi-line imports: join lines from `import` to `;`
  const normalized = content.replace(/import\s+[\s\S]*?;/g, (match) =>
    match.replace(/\n\s*/g, " "),
  );

  for (const line of normalized.split("\n")) {
    if (!/from\s+["']react["']/.test(line)) continue;

    // default import: import React from "react" or import React, { ... }
    const defaultMatch = line.match(/^import\s+(\w+)/);
    if (defaultMatch) imported.add(defaultMatch[1]);

    // named imports: { useState, useEffect }
    const namedMatch = line.match(/\{([^}]+)\}/);
    if (namedMatch) {
      const raw = namedMatch[1].replace(/\s+/g, " ");
      for (const name of raw.split(",")) {
        const trimmed = name.trim();
        if (trimmed) imported.add(trimmed);
      }
    }
  }

  return imported;
}

function getUsedHooks(content: string): string[] {
  const used: string[] = [];
  for (const hook of HOOKS) {
    const regex = new RegExp(`\\b${hook}\\b`, "g");
    if (regex.test(content)) {
      used.push(hook);
    }
  }
  return used;
}

describe("React hooks imports in page files", () => {
  const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".tsx"));

  for (const file of files) {
    it(`${file} має всі необхідні імпорти React-хуків`, () => {
      const content = fs.readFileSync(path.join(pagesDir, file), "utf-8");
      const imported = getAllImportedFromReact(content);
      const usedHooks = getUsedHooks(content);
      const missingHooks = usedHooks.filter((hook) => !imported.has(hook));

      expect(
        missingHooks,
        `${file}: використовує ${missingHooks.join(", ")}, але не імпортує з "react"`,
      ).toEqual([]);
    });
  }
});

```

# FILE: apps/frontend/src/tests/unit/roles.test.ts

```
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

```

# FILE: apps/frontend/src/tests/unit/schoolUtils.test.ts

```
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

  it("повертає 'notConfirmed' якщо звіт подано на затвердження", () => {
    expect(classifySchool({ events: [{ status: "REPORT" }] })).toBe(
      "notConfirmed",
    );
  });

  it("повертає 'done' якщо подія завершена", () => {
    expect(classifySchool({ events: [{ status: "RE_SALE" }] })).toBe("done");
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

```

# FILE: apps/frontend/src/tests/unit/useDaysOff.test.tsx

```
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  useDaysOff,
  useCreateDayOff,
  useDeleteDayOff,
} from "../../hooks/useDaysOff";

const { apiMock } = vi.hoisted(() => ({
  apiMock: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("../../config/api", () => ({
  api: apiMock,
}));

function createTestClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function createWrapper(client: QueryClient) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

describe("useDaysOff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("формує queryKey з from/to/cityId і staleTime=30000", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    const client = createTestClient();

    const { result } = renderHook(
      () => useDaysOff("2026-07-01", "2026-07-31", "city-1"),
      { wrapper: createWrapper(client) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiMock.get).toHaveBeenCalledWith(
      "/days-off?from=2026-07-01&to=2026-07-31&cityId=city-1",
    );

    const query = client
      .getQueryCache()
      .find({ queryKey: ["daysOff", "2026-07-01", "2026-07-31", "city-1"] });
    expect(query?.options.staleTime).toBe(30 * 1000);
  });

  it("без фільтрів викликає /days-off?", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    const client = createTestClient();

    const { result } = renderHook(() => useDaysOff(), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiMock.get).toHaveBeenCalledWith("/days-off?");
  });

  it("лише from додає from-параметр", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    const client = createTestClient();

    const { result } = renderHook(() => useDaysOff("2026-07-01"), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiMock.get).toHaveBeenCalledWith("/days-off?from=2026-07-01");
  });

  it("лише to додає to-параметр", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    const client = createTestClient();

    const { result } = renderHook(
      () => useDaysOff(undefined, "2026-07-31"),
      { wrapper: createWrapper(client) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiMock.get).toHaveBeenCalledWith("/days-off?to=2026-07-31");
  });

  it("лише cityId додає cityId-параметр", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    const client = createTestClient();

    const { result } = renderHook(() => useDaysOff(undefined, undefined, "city-1"), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiMock.get).toHaveBeenCalledWith("/days-off?cityId=city-1");
  });

  it("пробрасыває помилку API у query state", async () => {
    apiMock.get.mockRejectedValueOnce(new Error("days-off failed"));
    const client = createTestClient();

    const { result } = renderHook(() => useDaysOff(), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});

describe("useCreateDayOff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("POST /days-off з payload {date} і invalidateQueries на success", async () => {
    apiMock.post.mockResolvedValueOnce({ data: { id: "d1" } });
    const client = createTestClient();
    const invalidateSpy = vi.spyOn(client, "invalidateQueries");
    const setQueryDataSpy = vi.spyOn(client, "setQueryData");

    const { result } = renderHook(() => useCreateDayOff(), {
      wrapper: createWrapper(client),
    });

    await act(async () => {
      await result.current.mutateAsync({ date: "2026-07-10" });
    });

    expect(apiMock.post).toHaveBeenCalledWith("/days-off", { date: "2026-07-10" });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["daysOff"] });
    expect(setQueryDataSpy).not.toHaveBeenCalled();
  });

  it("POST /days-off з payload {date,userId}", async () => {
    apiMock.post.mockResolvedValueOnce({ data: { id: "d2" } });
    const client = createTestClient();

    const { result } = renderHook(() => useCreateDayOff(), {
      wrapper: createWrapper(client),
    });

    await act(async () => {
      await result.current.mutateAsync({ date: "2026-07-10", userId: "user-1" });
    });

    expect(apiMock.post).toHaveBeenCalledWith("/days-off", {
      date: "2026-07-10",
      userId: "user-1",
    });
  });

  it("на error не викликає invalidateQueries", async () => {
    apiMock.post.mockRejectedValueOnce(new Error("create failed"));
    const client = createTestClient();
    const invalidateSpy = vi.spyOn(client, "invalidateQueries");

    const { result } = renderHook(() => useCreateDayOff(), {
      wrapper: createWrapper(client),
    });

    await expect(
      act(async () => {
        await result.current.mutateAsync({ date: "2026-07-10" });
      }),
    ).rejects.toThrow("create failed");

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});

describe("useDeleteDayOff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("DELETE /days-off/:id і invalidateQueries на success", async () => {
    apiMock.delete.mockResolvedValueOnce({ data: { success: true } });
    const client = createTestClient();
    const invalidateSpy = vi.spyOn(client, "invalidateQueries");
    const setQueryDataSpy = vi.spyOn(client, "setQueryData");

    const { result } = renderHook(() => useDeleteDayOff(), {
      wrapper: createWrapper(client),
    });

    await act(async () => {
      await result.current.mutateAsync("dayoff-1");
    });

    expect(apiMock.delete).toHaveBeenCalledWith("/days-off/dayoff-1");
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["daysOff"] });
    expect(setQueryDataSpy).not.toHaveBeenCalled();
  });

  it("на error не викликає invalidateQueries", async () => {
    apiMock.delete.mockRejectedValueOnce(new Error("delete failed"));
    const client = createTestClient();
    const invalidateSpy = vi.spyOn(client, "invalidateQueries");

    const { result } = renderHook(() => useDeleteDayOff(), {
      wrapper: createWrapper(client),
    });

    await expect(
      act(async () => {
        await result.current.mutateAsync("dayoff-1");
      }),
    ).rejects.toThrow("delete failed");

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});

```

# FILE: apps/frontend/src/tests/unit/useDebounce.test.ts

```
import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../../hooks/useDebounce";

describe("useDebounce", () => {
  it("повертає початкове значення одразу", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));
    expect(result.current).toBe("hello");
  });

  it("оновлює debouncedValue після затримки", async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "a" } },
    );

    expect(result.current).toBe("a");

    rerender({ value: "b" });
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe("b");

    vi.useRealTimers();
  });

  it("скидає таймер при повторному виклику до завершення затримки", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "b" });
    act(() => vi.advanceTimersByTime(300));
    rerender({ value: "c" });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe("c");

    vi.useRealTimers();
  });

  it("працює з числовими значеннями", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 0 } },
    );

    rerender({ value: 42 });
    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe(42);

    vi.useRealTimers();
  });

  it("працює з delay=0", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 0),
      { initialProps: { value: "x" } },
    );

    rerender({ value: "y" });
    act(() => vi.advanceTimersByTime(0));
    expect(result.current).toBe("y");

    vi.useRealTimers();
  });
});

```

# FILE: apps/frontend/src/types/index.ts

```
export interface City {
  id: string;
  name: string;
  manager?: { id: string; name: string; phone: string } | null;
  plannedEvents?: number;
  completedEvents?: number;
  schoolsCount?: number;
}

export interface School {
  id: string;
  name: string;
  type: string;
  cityId: string;
  address?: string;
  director?: string;
  phone?: string;
  email?: string;
  childrenCount?: number;
  notes?: string;
  isHotClient?: boolean;
  city?: { id: string; name: string };
  events?: Event[];
}

export interface SchoolProfileData {
  id: string;
  cityId: string;
  name: string;
  type: string;
  city: string;
  address: string;
  director: string;
  phone: string;
  email: string;
  childrenCount: number;
  notes: string;
}

export interface SchoolContact {
  contactName: string;
  phone: string;
  role?: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface EventFormData {
  project: string;
  date: string;
  time: string;
  childrenPlanned: string;
  price: string;
  address: string;
  contactPerson: string;
  contactPhone: string;
}

export interface CreateEventPayload {
  project: string;
  date: string;
  time: string;
  childrenPlanned: number;
  price: number;
  address: string;
  contactPerson: string;
  contactPhone: string;
  schoolId: string;
  cityId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  cityId?: string;
  city?: { id: string; name: string };
}

export interface EventHistory {
  id: string;
  action: string;
  comment?: string;
  userName: string;
  role: string;
  createdAt: string;
}

export interface ExpenseItem {
  category?: string;
  name?: string;
  amount: number;
}

export type SalaryStatus = "PENDING" | "PAID" | "CANCELLED";

export interface SalaryRecord {
  id: string;
  employeeId: string;
  eventId?: string;
  reportId?: string;
  amount: number;
  comment?: string;
  status: SalaryStatus;
  paidAt?: string;
  paidBy?: string;
  createdBy: string;
  createdAt: string;
  employee?: { id: string; name: string; role: string };
  event?: { id: string; date: string; project: string; cityId: string };
  report?: { status: string };
}

export type ReportStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "NEEDS_REVISION"
  | "APPROVED"
  | "REJECTED"
  | "CLOSED";

export interface EventReport {
  id: string;
  eventId: string;
  status: ReportStatus;
  announcementDone: boolean;
  materialShown: boolean;
  childrenCount: number;
  classesCount: number;
  privilegedCount: number;
  showingsCount: number;
  totalSum: number;
  schoolSum: number;
  remainderSum: number;
  rating: number;
  directorSatisfied?: boolean;
  teachersSatisfied?: boolean;
  hadIssues?: boolean;
  comment?: string;
  revisionComment?: string;
  submittedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
  expenseItems: ExpenseItem[];
  salaryRecords: SalaryRecord[];
}

export interface Event {
  id: string;
  schoolId: string;
  cityId: string;
  project: string;
  date: string;
  time?: string;
  status: string;
  childrenPlanned?: number;
  price?: number;
  paymentMethod?: string;
  address?: string;
  contactPerson?: string;
  contactPhone?: string;
  crew?: Crew;
  report?: EventReport;
  history?: EventHistory[];
  preparation?: EventPreparation;
  school?: { id: string; name: string; type: string };
  city?: { id: string; name: string };
}

export interface Crew {
  id: string;
  name: string;
  cityId: string;
  hostId?: string;
  driverId?: string;
  host?: { id: string; name: string };
  driver?: { id: string; name: string };
  car?: string;
  phone?: string;
}

import type { PreparationStatus } from '../utils/preparationStatus';

export interface EventPreparation {
  assignCrew: PreparationStatus;
  bookEquipment: PreparationStatus;
  prepareDocs: PreparationStatus;
  prepareMaterials: PreparationStatus;
  remindSchool: PreparationStatus;
}

export interface CityProfile extends City {
  events: Event[];
  crews: Crew[];
  schools?: School[];
}

export interface PipelineStage {
  key: string;
  name: string;
}

export interface DayOff {
  id: string;
  userId: string;
  date: string;
  user: { id: string; name: string; role: string; cityId: string | null };
}

export interface IssueReport {
  id: string;
  eventId: string;
  schoolName: string;
  eventName: string;
  message: string;
  cityId: string;
  status: string;
  createdAt: string;
}

export interface FinanceKpi {
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  totalEvents: number;
}

export interface MonthlyFinance {
  month: string;
  revenue: number;
  profit: number;
}

export interface FinanceByProject {
  name: string;
  value: number;
}

export interface FinanceByCategory {
  name: string;
  value: number;
}

export interface FinanceTopSchool {
  name: string;
  count: number;
  revenue: number;
}

export interface FinanceEventItem {
  id: string;
  date: string;
  school: string;
  profit: number;
  revenue: number;
}

export interface FinanceFilterOptions {
  projects: string[];
  cities: { id: string; name: string }[];
}

export interface FinanceDashboardData {
  kpi: FinanceKpi;
  monthly: MonthlyFinance[];
  expectedRevenue: number;
  filters: FinanceFilterOptions;
  byProject?: FinanceByProject[];
  byExpenseCategory?: FinanceByCategory[];
  topSchools?: FinanceTopSchool[];
  topEvents?: FinanceEventItem[];
  worstEvents?: FinanceEventItem[];
}

export type CommentType = "NOTE" | "CALL" | "RESCHEDULE" | "CONFIRMATION" | "PROBLEM";

export type UserRole = "SUPERADMIN" | "OWNER" | "MANAGER" | "HOST" | "DRIVER";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string | null;
  category: string;
  unit: string;
  project: string | null;
  minStock: number;
  currentStock: number;
  notes: string | null;
  cityId: string | null;
  schoolId: string | null;
  createdAt: string;
  updatedAt: string;
  city?: { id: string; name: string } | null;
  school?: { id: string; name: string } | null;
}

export interface CreateInventoryPayload {
  name: string;
  sku?: string;
  category?: string;
  unit?: string;
  project?: string;
  minStock?: number;
  currentStock?: number;
  notes?: string;
  cityId?: string;
  schoolId?: string;
}

export interface UpdateInventoryPayload extends Partial<CreateInventoryPayload> {
  id: string;
}

```

# FILE: apps/frontend/src/types/telegram.d.ts

```
interface TelegramWebApp {
  expand: () => void;
  close: () => void;
  ready: () => void;
  colorScheme: string;
  themeParams: Record<string, string>;
}

interface TelegramWindow {
  WebApp?: TelegramWebApp;
}

declare interface Window {
  Telegram?: TelegramWindow;
}

```

# FILE: apps/frontend/src/utils/exportCsv.ts

```
type Row = Record<string, string>;

export function exportCsv(data: Row[], filename = "export.csv") {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => {
        const val = row[h] ?? "";
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","),
    ),
  ];

  const bom = "\uFEFF";
  const blob = new Blob([bom + csvRows.join("\n")], { type: "text/csv;charset=utf-8;bom=true" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

```

# FILE: apps/frontend/src/utils/financeCalculations.ts

```
import type { FinanceByProject } from "../types";

export function fmtAmount(value: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(value || 0));
}

export function calcProjectTotals(byProject: FinanceByProject[]): {
  total: number;
  percents: number[];
} {
  const total = byProject.reduce((s, p) => s + p.value, 0);
  const percents = byProject.map((p) =>
    total > 0 ? Math.round((p.value / total) * 100) : 0
  );
  return { total, percents };
}

export function calcBarPercent(value: number, max: number): number {
  if (!max) return 0;
  return Math.min((value / max) * 100, 100);
}

```

# FILE: apps/frontend/src/utils/formatCurrency.ts

```
/**
 * Форматує суму у форматі uk-UA (для відображення в грн).
 * Захищає від NaN/undefined/null — завжди повертає валідний рядок.
 */
export function formatCurrency(amount: unknown): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(amount) || 0));
}
```

# FILE: apps/frontend/src/utils/preparationStatus.ts

```
export type PreparationStatus = "PLANNED" | "IN_PROGRESS" | "DONE";

export const PREPARATION_STATUS_ORDER: PreparationStatus[] = [
  "PLANNED",
  "IN_PROGRESS",
  "DONE",
];

export const PREPARATION_STATUS_LABELS: Record<PreparationStatus, string> = {
  PLANNED: "Заплановано",
  IN_PROGRESS: "В процесі",
  DONE: "Виконано",
};

export function getNextPreparationStatus(
  current: PreparationStatus,
): PreparationStatus {
  const idx = PREPARATION_STATUS_ORDER.indexOf(current || "PLANNED");
  return PREPARATION_STATUS_ORDER[(idx + 1) % PREPARATION_STATUS_ORDER.length];
}

```

# FILE: apps/frontend/src/utils/roles.ts

```
export function hasRole(userRole: string | undefined, allowedRoles?: string[]): boolean {
  return !allowedRoles || (!!userRole && allowedRoles.includes(userRole));
}

```

# FILE: apps/frontend/tailwind.config.js

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f8fafc",
          muted: "#f1f5f9",
        },
        border: {
          DEFAULT: "#f1f5f9",
          strong: "#e2e8f0",
        },
        content: {
          primary: "#1e293b",
          secondary: "#475569",
          muted: "#94a3b8",
        },
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          DEFAULT: "#2563eb",
          600: "#1d4ed8",
          hover: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554",
        },
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          DEFAULT: "#10b981",
          600: "#059669",
          700: "#047857",
          subtle: "#ecfdf5",
        },
        danger: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          DEFAULT: "#e11d48",
          600: "#be123c",
          700: "#9f1239",
          subtle: "#fff1f2",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          DEFAULT: "#f59e0b",
          600: "#d97706",
          subtle: "#fffbeb",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        role: {
          admin: { bg: "#eef2ff", text: "#4338ca" },
          manager: { bg: "#eff6ff", text: "#2563eb" },
          host: { bg: "#f5f3ff", text: "#7c3aed" },
          driver: { bg: "#ecfdf5", text: "#059669" },
        },
        nav: "#0B1527",
        backdrop: "rgba(15, 23, 42, 0.4)",
      },
      borderRadius: {
        card: "1rem",
        "card-lg": "1.5rem",
        modal: "1.5rem",
        control: "0.875rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        "card-hover": "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)",
        modal: "0 25px 50px -12px rgb(0 0 0 / 0.15)",
        dropdown: "0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
        popover: "0 12px 28px -4px rgb(0 0 0 / 0.12), 0 4px 8px -4px rgb(0 0 0 / 0.06)",
        lift: "0 4px 12px rgb(0 0 0 / 0.08)",
        soft: "0 2px 8px -2px rgb(0 0 0 / 0.06)",
      },
      backgroundImage: {
        "gradient-subtle": "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)",
        "gradient-card": "linear-gradient(145deg, #ffffff, #f8fafc)",
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "14px" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },
      zIndex: {
        nav: "50",
        sheet: "55",
        modal: "60",
        toast: "100",
      },
      animation: {
        shimmer: "shimmer 1.4s linear infinite",
        "fade-in": "fadeIn 0.2s ease-out forwards",
        "modal-scale": "modalScale 0.3s ease-out forwards",
        "pop-in": "popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        modalScale: {
          from: { opacity: "0", transform: "scale(0.95) translateY(15px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        popIn: {
          "0%": { transform: "scale(0.7)", opacity: "0" },
          "60%": { transform: "scale(1.15)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

```

# FILE: apps/frontend/tests/e2e/debug.spec.ts

```
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

```

# FILE: apps/frontend/tests/e2e/mocks/api.ts

```
import type { Page, Route } from "@playwright/test";

export type MockRole = "MANAGER" | "SUPERADMIN";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: MockRole;
  cityId: string;
  cityName: string;
}

const USERS: Record<MockRole, MockUser> = {
  MANAGER: {
    id: "user-manager",
    name: "Марія Демчук",
    email: "demo.manager@svitlo-znan.app",
    role: "MANAGER",
    cityId: "city-1",
    cityName: "Демо Місто",
  },
  SUPERADMIN: {
    id: "user-admin",
    name: "Адміністратор",
    email: "admin@example.com",
    role: "SUPERADMIN",
    cityId: "city-1",
    cityName: "Демо Місто",
  },
};

const CITY_ID = "city-1";

const events = [
  {
    id: "ev-1",
    schoolId: "sch-1",
    cityId: CITY_ID,
    project: "Голографічне шоу «Космос»",
    date: "2026-07-20",
    time: "10:00",
    status: "PREPARATION",
    childrenPlanned: 120,
    price: 12000,
    contactPerson: "Наталія Іванівна",
    contactPhone: "+380321234567",
    crew: {
      id: "crew-1",
      name: "Екіпаж №1",
      host: { id: "h1", name: "Олег Ведучий" },
      driver: { id: "d1", name: "Ігор Водій" },
    },
    school: { id: "sch-1", name: "Ліцей №5", type: "Школа" },
    city: { id: CITY_ID, name: "Демо Місто" },
  },
  {
    id: "ev-2",
    schoolId: "sch-2",
    cityId: CITY_ID,
    project: "Голографічне шоу «Космос»",
    date: "2026-07-15",
    time: "12:30",
    status: "DATE_CONFIRMED",
    childrenPlanned: 60,
    price: 8000,
    contactPerson: "Оксана Петрівна",
    contactPhone: "+380321234568",
    crew: {
      id: "crew-1",
      name: "Екіпаж №1",
      host: { id: "h1", name: "Олег Ведучий" },
      driver: { id: "d1", name: "Ігор Водій" },
    },
    school: { id: "sch-2", name: "Дитячий садок «Сонечко»", type: "Садочок" },
    city: { id: CITY_ID, name: "Демо Місто" },
  },
];

const cities = [
  {
    id: CITY_ID,
    name: "Демо Місто",
    plannedEvents: 14,
    completedEvents: 9,
    schoolsCount: 3,
    manager: { id: "user-manager", name: "Марія Демчук", phone: "+380671112233" },
  },
  {
    id: "city-2",
    name: "Київ",
    plannedEvents: 22,
    completedEvents: 18,
    schoolsCount: 7,
    manager: { id: "m2", name: "Олена Київ", phone: "+380671112200" },
  },
  {
    id: "city-3",
    name: "Одеса",
    plannedEvents: 8,
    completedEvents: 5,
    schoolsCount: 4,
    manager: null,
  },
];

const cityProfile = {
  ...cities[0],
  events,
  crews: [
    {
      id: "crew-1",
      name: "Екіпаж №1",
      cityId: CITY_ID,
      host: { id: "h1", name: "Олег Ведучий" },
      driver: { id: "d1", name: "Ігор Водій" },
      car: "Volkswagen Transporter",
      phone: "+380671112235",
    },
  ],
  schools: [
    {
      id: "sch-1",
      name: "Ліцей №5",
      type: "Школа",
      cityId: CITY_ID,
      address: "вул. Шевченка, 10",
      director: "Наталія Іванівна",
      phone: "+380321234567",
      childrenCount: 320,
      isHotClient: true,
    },
  ],
};

const schoolsData = {
  data: [
    {
      id: "sch-1",
      name: "Ліцей №5",
      type: "Школа",
      cityId: CITY_ID,
      address: "вул. Шевченка, 10",
      director: "Наталія Іванівна",
      phone: "+380321234567",
      email: "lyceum5@example.com",
      childrenCount: 320,
      isHotClient: true,
      city: { id: CITY_ID, name: "Демо Місто" },
    },
    {
      id: "sch-2",
      name: "Дитячий садок «Сонечко»",
      type: "Садочок",
      cityId: CITY_ID,
      address: "вул. Франка, 22",
      director: "Оксана Петрівна",
      phone: "+380321234568",
      email: "sun@example.com",
      childrenCount: 90,
      isHotClient: false,
      city: { id: CITY_ID, name: "Демо Місто" },
    },
    {
      id: "sch-3",
      name: "Гімназія «Львів'янка»",
      type: "Школа",
      cityId: CITY_ID,
      address: "вул. Городоцька, 5",
      director: "Андрій Богданович",
      phone: "+380321234569",
      email: "gimn@example.com",
      childrenCount: 210,
      isHotClient: false,
      city: { id: CITY_ID, name: "Демо Місто" },
    },
  ],
  meta: { totalItems: 3, page: 1, take: 30, pageCount: 1, hasNextPage: false },
};

const schoolProfileData = {
  id: "sch-1",
  cityId: CITY_ID,
  name: "Ліцей №5",
  type: "Школа",
  city: "Демо Місто",
  address: "вул. Шевченка, 10",
  director: "Наталія Іванівна",
  phone: "+380321234567",
  email: "lyceum5@example.com",
  childrenCount: 320,
  notes: "",
};

const inventory = [
  {
    id: "inv-1",
    name: "Голограма проєктор",
    sku: "PRJ-001",
    category: "Обладнання",
    unit: "шт",
    project: "Голографічне шоу «Космос»",
    minStock: 2,
    currentStock: 5,
    notes: null,
    cityId: CITY_ID,
    schoolId: null,
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-06-01T10:00:00Z",
    city: { id: CITY_ID, name: "Демо Місто" },
    school: null,
  },
  {
    id: "inv-2",
    name: "Матеріали для майстер-класу",
    sku: null,
    category: "Витратні",
    unit: "набір",
    project: null,
    minStock: 10,
    currentStock: 3,
    notes: "Потрібно докупити",
    cityId: CITY_ID,
    schoolId: null,
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-06-10T10:00:00Z",
    city: { id: CITY_ID, name: "Демо Місто" },
    school: null,
  },
];

const projects = [
  { id: "p-1", name: "Голографічне шоу «Космос»", color: "blue" },
  { id: "p-2", name: "Наукове шоу", color: "green" },
];

const financeDashboard = {
  kpi: { totalRevenue: 480000, totalExpenses: 210000, totalProfit: 270000, totalEvents: 42 },
  monthly: Array.from({ length: 12 }, (_, i) => ({
    month: String(i + 1),
    revenue: 30000 + i * 1500,
    profit: 16000 + i * 900,
  })),
  expectedRevenue: 520000,
  filters: {
    projects: ["Голографічне шоу «Космос»", "Наукове шоу"],
    cities: [
      { id: CITY_ID, name: "Демо Місто" },
      { id: "city-2", name: "Київ" },
    ],
  },
  byProject: [
    { name: "Голографічне шоу «Космос»", value: 300000 },
    { name: "Наукове шоу", value: 180000 },
  ],
  byExpenseCategory: [
    { name: "Зарплата", value: 120000 },
    { name: "Пальне", value: 60000 },
    { name: "Матеріали", value: 30000 },
  ],
  topSchools: [
    { name: "Ліцей №5", count: 8, revenue: 96000 },
    { name: "Гімназія «Львів'янка»", count: 5, revenue: 60000 },
  ],
  topEvents: [
    { id: "ev-1", date: "2026-07-20", school: "Ліцей №5", profit: 5000, revenue: 12000 },
  ],
  worstEvents: [
    { id: "ev-2", date: "2026-06-15", school: "Гімназія", profit: -500, revenue: 8000 },
  ],
};

const dashboardSummary = {
  todayEvents: [
    {
      id: "ev-1",
      time: "10:00",
      project: "Голографічне шоу «Космос»",
      school: { id: "sch-1", name: "Ліцей №5" },
      crew: {
        id: "crew-1",
        name: "Екіпаж №1",
        host: { id: "h1", name: "Олег Ведучий" },
        driver: { id: "d1", name: "Ігор Водій" },
      },
    },
  ],
  upcomingEvents: [
    {
      id: "ev-3",
      date: "2026-07-22",
      time: "09:30",
      project: "Наукове шоу",
      school: { id: "sch-3", name: "Гімназія «Львів'янка»" },
      crew: null,
    },
    {
      id: "ev-4",
      date: "2026-07-25",
      time: "11:00",
      project: "Голографічне шоу «Космос»",
      school: { id: "sch-2", name: "Дитячий садок «Сонечко»" },
      crew: null,
    },
  ],
  funnel: { FIRST_CONTACT: 5, DATE_CONFIRMED: 3, PREPARATION: 2, REPORT: 1, CLOSED: 8 },
  totalSchools: 3,
  monthlyKpi: { revenue: 48000, profit: 26000, children: 320, count: 4 },
  staleSchools: [
    {
      id: "sch-3",
      name: "Гімназія «Львів'янка»",
      status: "FIRST_CONTACT",
      lastActivity: "2026-05-01T10:00:00Z",
      daysStale: 40,
    },
  ],
  activityFeed: [
    {
      id: "a1",
      userName: "Марія Демчук",
      role: "MANAGER",
      action: "Створено подію",
      comment: null,
      createdAt: "2026-07-10T10:00:00Z",
      schoolId: "sch-1",
      schoolName: "Ліцей №5",
      eventId: "ev-1",
    },
  ],
  citiesStats: [
    { cityId: CITY_ID, cityName: "Демо Місто", schoolsCount: 3, activeEvents: 5, monthRevenue: 48000 },
  ],
};

const notifications = [
  {
    id: "n1",
    userId: "user-manager",
    type: "EVENT_RESCHEDULED",
    payload: { title: "Подію «Ліцей №5» перенесено", entityType: "events", entityId: "ev-1" },
    readAt: null,
    createdAt: "2026-07-10T09:00:00Z",
  },
  {
    id: "n2",
    userId: "user-manager",
    type: "REPORT_APPROVED",
    payload: { title: "Звіт схвалено", entityType: "reports", entityId: "rep-1" },
    readAt: null,
    createdAt: "2026-07-10T08:00:00Z",
  },
  {
    id: "n3",
    userId: "user-manager",
    type: "ISSUE_CREATED",
    payload: { title: "Створено зауваження", entityType: "events", entityId: "ev-2" },
    readAt: "2026-07-09T12:00:00Z",
    createdAt: "2026-07-09T12:00:00Z",
  },
];

const analyticsLeaderboard = [
  { cityId: CITY_ID, cityName: "Демо Місто", events: 14, revenue: 480000, profit: 270000, children: 1200, schools: 3 },
  { cityId: "city-2", cityName: "Київ", events: 22, revenue: 720000, profit: 410000, children: 2100, schools: 7 },
  { cityId: "city-3", cityName: "Одеса", events: 8, revenue: 210000, profit: 110000, children: 640, schools: 4 },
];

const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
  month: String(i + 1),
  revenue: 30000 + i * 1500,
  profit: 16000 + i * 900,
  events: 2 + (i % 5),
}));

const eventsByCity = [
  { cityId: CITY_ID, cityName: "Демо Місто", events: 14 },
  { cityId: "city-2", cityName: "Київ", events: 22 },
  { cityId: "city-3", cityName: "Одеса", events: 8 },
];

const salaryFund = { total: 120000, month: 7, year: 2026, byCity: { [CITY_ID]: 80000 } };
const roi = { totalRevenue: 480000, totalExpenses: 210000, salaryExpenses: 120000, profit: 270000, roi: 56 };

const kpiManagers = [{ userId: "user-manager", name: "Марія Демчук", approvedReports: 12 }];
const kpiHosts = [{ userId: "h1", name: "Олег Ведучий", avgRating: 4.8, reportsCount: 9 }];
const kpiProjects = [
  { project: "Голографічне шоу «Космос»", eventsCount: 20, childrenTotal: 2400, profit: 150000 },
];

const submittedReports = [
  {
    id: "rep-1",
    eventId: "ev-1",
    status: "SUBMITTED",
    announcementDone: true,
    materialShown: true,
    childrenCount: 98,
    classesCount: 5,
    privilegedCount: 10,
    showingsCount: 1,
    totalSum: 12000,
    schoolSum: 12000,
    remainderSum: 0,
    rating: 5,
    directorSatisfied: true,
    teachersSatisfied: true,
    hadIssues: false,
    comment: "Чудовий захід!",
    revisionComment: null,
    submittedAt: "2026-07-05T10:00:00Z",
    approvedAt: null,
    approvedBy: null,
    createdAt: "2026-07-05T09:00:00Z",
    updatedAt: "2026-07-05T10:00:00Z",
    expenseItems: [{ category: "Пальне", name: "Заправка авто", amount: 800 }],
    salaryRecords: [
      { id: "sr-1", employeeId: "h1", amount: 2500, status: "PAID", createdBy: "user-manager", createdAt: "2026-07-05T09:30:00Z", employee: { id: "h1", name: "Олег Ведучий", role: "HOST" } },
    ],
  },
];

const users = [
  { id: "user-manager", name: "Марія Демчук", email: "demo.manager@svitlo-znan.app", phone: "+380671112233", role: "MANAGER", cityId: CITY_ID, city: { id: CITY_ID, name: "Демо Місто" } },
  { id: "h1", name: "Олег Ведучий", email: "demo.host@svitlo-znan.app", phone: "+380671112234", role: "HOST", cityId: CITY_ID, city: { id: CITY_ID, name: "Демо Місто" } },
  { id: "d1", name: "Ігор Водій", email: "demo.driver@svitlo-znan.app", phone: "+380671112235", role: "DRIVER", cityId: CITY_ID, city: { id: CITY_ID, name: "Демо Місто" } },
  { id: "user-admin", name: "Адміністратор", email: "admin@example.com", phone: null, role: "SUPERADMIN", cityId: null, city: null },
];

interface MockResult {
  status: number;
  body: unknown;
}

function resolve(apiPath: string, method: string, role: MockRole | null): MockResult | null {
  if (apiPath === "/auth/me") {
    if (role === null) return { status: 401, body: { message: "Не авторизовано" } };
    return { status: 200, body: { user: USERS[role] } };
  }
  if (apiPath === "/auth/login") {
    if (role === null) return { status: 401, body: { message: "Невірний email або пароль" } };
    return { status: 200, body: { user: USERS[role] } };
  }
  if (apiPath === "/auth/logout") return { status: 204, body: "" };
  if (apiPath === "/auth/refresh") return { status: 200, body: {} };

  if (apiPath === "/notifications/unread-count") return { status: 200, body: { count: 3 } };
  if (apiPath === "/notifications") {
    return { status: 200, body: { items: notifications, total: notifications.length, page: 1, pageCount: 1 } };
  }

  if (apiPath === "/dashboard/summary") return { status: 200, body: dashboardSummary };

  if (apiPath === "/cities/leaderboard" || apiPath === "/analytics/city-leaderboard") {
    return { status: 200, body: analyticsLeaderboard };
  }
  if (apiPath === "/analytics/revenue-by-month") return { status: 200, body: monthlyRevenue };
  if (apiPath === "/analytics/events-by-city") return { status: 200, body: eventsByCity };
  if (apiPath === "/analytics/salary-fund") return { status: 200, body: salaryFund };
  if (apiPath === "/analytics/roi") return { status: 200, body: roi };
  if (apiPath === "/analytics/kpi/managers") return { status: 200, body: kpiManagers };
  if (apiPath === "/analytics/kpi/hosts") return { status: 200, body: kpiHosts };
  if (apiPath === "/analytics/kpi/projects") return { status: 200, body: kpiProjects };

  if (apiPath === "/cities") return { status: 200, body: cities };
  if (apiPath.startsWith("/cities/") && apiPath.split("/")[2] !== "leaderboard") {
    return { status: 200, body: cityProfile };
  }

  if (apiPath === "/schools/stats") {
    return { status: 200, body: { total: 3, byType: { Школа: 2, Садочок: 1 }, byStage: { new: 1, planned: 1, inProgress: 1, done: 0 } } };
  }
  if (apiPath === "/schools/supported-cities") return { status: 200, body: ["Демо Місто", "Київ", "Одеса", "Львів"] };
  if (apiPath.startsWith("/schools/")) return { status: 200, body: schoolProfileData };
  if (apiPath === "/schools") return { status: 200, body: schoolsData };

  if (apiPath === "/events") return { status: 200, body: { data: events } };
  if (apiPath === "/projects") return { status: 200, body: { data: projects } };
  if (apiPath === "/users") return { status: 200, body: users };

  if (apiPath === "/inventory/low-stock") return { status: 200, body: inventory.filter((i) => i.currentStock <= i.minStock) };
  if (apiPath.startsWith("/inventory/by-project")) return { status: 200, body: inventory };
  if (apiPath === "/inventory") return { status: 200, body: inventory };

  if (apiPath === "/finance/dashboard") return { status: 200, body: financeDashboard };
  if (apiPath === "/reports/submitted") return { status: 200, body: submittedReports };

  if (method === "GET") return { status: 200, body: [] };
  return { status: 200, body: {} };
}

function handleRoute(route: Route, role: MockRole | null): void {
  const request = route.request();
  const url = new URL(request.url());
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments[0] !== "api") {
    void route.continue();
    return;
  }

  const apiPath = "/" + segments.slice(1).join("/");
  const result = resolve(apiPath, request.method(), role);

  if (!result) {
    void route.continue();
    return;
  }

  if (result.status === 204) {
    void route.fulfill({ status: 204, body: "" });
    return;
  }

  void route.fulfill({
    status: result.status,
    contentType: "application/json",
    body: JSON.stringify(result.body),
  });
}

export function setupApiMocking(page: Page, role: MockRole | null): void {
  void page.route("**/api/**", (route) => handleRoute(route, role));
}

```

# FILE: apps/frontend/tests/e2e/visual.spec.ts

```
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

```

# FILE: apps/frontend/tsconfig.app.json

```


{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}



```

# FILE: apps/frontend/tsconfig.json

```


{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}



```

# FILE: apps/frontend/tsconfig.node.json

```


{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}



```

# FILE: apps/frontend/vercel.json

```


{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.svitlo-znan.app/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}


```

# FILE: apps/frontend/vite.config.ts

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("recharts")) return "recharts";
          if (id.includes("@tanstack/react-virtual")) return "tanstack";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("node_modules/react")) return "vendor";
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "html"],
      exclude: ["src/tests/**", "src/main.tsx"],
      thresholds: {
        statements: 70,
        branches: 50,
        functions: 60,
        lines: 70,
      },
    },
  },
});

```

# FILE: .github/copilot-instructions.md
# КРИТИЧНО ВАЖЛИВИЙ ФАЙЛ

```
# Copilot instructions for CRM monorepo

## Правила відповідей для Copilot у цьому репозиторії

1. Відповідай українською мовою.
2. Формат кожної відповіді: `1.Проблема 2.Причина 3.Рішення 4.Діф (Код до / Код після)`.
3. Не додавай пояснювальні коментарі в код.
4. Мінімізуй токени; повні файли надавай лише якщо зміни >50%, створено новий файл, або є прямий запит на повний файл.

## Build, test, and lint commands

Run all commands from the repository root (`C:\CRM`) with `pnpm`.

| Task | Command |
| --- | --- |
| Install dependencies | `pnpm install` |
| Run backend + frontend in dev mode | `pnpm dev` |
| Build backend | `pnpm --filter backend build` |
| Build frontend | `pnpm --filter frontend build` |
| Run backend lint | `pnpm --filter backend lint` |
| Run frontend lint | `pnpm --filter frontend lint` |
| Run all unit tests (backend + frontend) | `pnpm test:unit` |
| Run all e2e tests | `pnpm test:e2e` |
| Run coverage (backend + frontend) | `pnpm test:coverage` |

### Run a single test file

| Test scope | Command |
| --- | --- |
| Backend unit test file (Jest) | `pnpm --filter backend test -- src\events\events.service.spec.ts` |
| Backend e2e test file (Jest e2e config) | `pnpm --filter backend test:e2e -- test\auth.e2e-spec.ts` |
| Frontend unit test file (Vitest) | `pnpm --filter frontend test:run -- src\tests\unit\formatCurrency.test.ts` |
| Frontend Playwright spec | `pnpm --filter frontend test:e2e -- e2e\login.spec.ts` |

### Database and seed commands used in local setup

- Apply Prisma migrations: `pnpm --filter backend exec prisma migrate deploy`
- Seed admin user: `pnpm --filter backend exec node prisma\seed-admin.js`
- Seed demo data: `pnpm seed:demo`

## High-level architecture

This is a PNPM workspace monorepo with two main apps:

- `apps\backend`: NestJS API with Prisma/PostgreSQL, Redis-backed throttling/cache, JWT cookie auth, audit logging, metrics, health checks, and Sentry.
- `apps\frontend`: React + Vite SPA with React Router, React Query, axios, role-based routing, and Playwright/Vitest tests.

### Backend request pipeline and cross-cutting behavior

Global behavior is centralized in `apps\backend\src\app.module.ts` and `apps\backend\src\main.ts`:

- Global pipe: `LocalizedValidationPipe` (`transform`, `whitelist`, `forbidNonWhitelisted`) with localized validation messages.
- Global guards: `UserThrottlerGuard` (Redis-backed throttling, user-based tracker from cookie JWT), then `CsrfGuard`.
- Global interceptors: `SanitizeInterceptor` (string/control-char cleanup on request body), `AuditLogInterceptor` (writes mutating actions to `AuditLog` table).
- Global exception filter: `AllExceptionsFilter` maps `AppException` message keys through i18n and reports 5xx to Sentry.
- `main.ts` enables cookie parsing, CORS with credentials, helmet, and Swagger only outside production.

### Domain model shape (Prisma)

`apps\backend\prisma\schema.prisma` is event-centric:

- Core flow: `City` → `School` → `Event` (+ optional `Crew`, `EventPreparation`, `EventReport`, `EventHistory`, `IssueReport`).
- Financial records hang off reports: `ExpenseItem`, `SalaryItem`; user payouts increment `User.balance`.
- Auth/session persistence uses `RefreshToken`.
- Mutation auditing is stored in `AuditLog`.
- Lifecycle states are explicit enums (`EventStatus`, `PreparationStatus`, `UserRole`) and are used throughout backend + frontend role/status logic.

### Frontend composition

- `src\main.tsx` creates a shared `QueryClient` and wraps the app in `QueryClientProvider`.
- `src\App.tsx` defines route tree, lazy-loaded pages, auth gating, and role checks via `ProtectedRoute`.
- `AuthProvider` boots session state from `GET /auth/me`; UI relies on cookie-based server session validation.
- `api` client (`src\config\api.ts`) sends `withCredentials: true` and injects `X-CSRF-Token` from `csrf_token` cookie on non-GET requests.

## Key conventions specific to this repo

1. **Cookie-first auth + CSRF pairing**  
   Backend sets `access_token`, `refresh_token`, and `csrf_token` cookies in `AuthController`; frontend does not own JWT storage and must send CSRF header for mutating calls.

2. **Localized API error surface (UK by default)**  
   Language is inferred from `Accept-Language`; default is Ukrainian, `en` enables English responses. Domain/business errors should use `AppException(messageKey, status)` rather than hardcoded strings.

3. **History/audit expectations for event mutations**  
   Event status/progress changes are expected to append `EventHistory` records with actor metadata, and global audit interceptor writes non-auth mutating requests into `AuditLog`.

4. **React Query + cache invalidation patterns**  
   Frontend hooks in `src\hooks` use stable query keys and explicit invalidation on successful mutations. Backend also uses short-lived caching for selected endpoints (for example, school events with `events:school:<id>:minimal|full` keys).

5. **Testing style**  
   Backend unit tests mock infrastructure dependencies (`PrismaService`, cache manager, Telegram) directly in Nest testing modules. Frontend tests run under Vitest + Testing Library with MSW server lifecycle managed in `src\tests\setup.ts`.

```

# FILE: .github/workflows/ci.yml

```
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

env:
  PNPM_VERSION: '10'
  NODE_VERSION: '22'

jobs:
  checks:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: crm
          POSTGRES_PASSWORD: crm
          POSTGRES_DB: crm_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 5s
          --health-timeout 3s
          --health-retries 5

      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 5s
          --health-timeout 3s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Встановлення залежностей
        run: pnpm install --frozen-lockfile

      - name: Генерація Prisma клієнта
        run: pnpm --filter backend exec prisma generate

      - name: Лінт — backend
        run: pnpm --filter backend lint

      - name: Лінт — frontend
        run: pnpm --filter frontend lint

      - name: TypeScript — backend
        run: pnpm --filter backend exec tsc --noEmit

      - name: TypeScript — frontend
        run: pnpm --filter frontend exec tsc --noEmit

      - name: Білд — backend
        run: pnpm --filter backend build

      - name: Білд — frontend
        run: pnpm --filter frontend build

      - name: Unit-тести + покриття — backend
        run: pnpm --filter backend test:cov

      - name: Unit-тести + покриття — frontend
        run: pnpm --filter frontend test:run -- --coverage

      - name: Міграція БД для e2e
        run: pnpm --filter backend exec prisma migrate deploy
        env:
          DATABASE_URL: postgresql://crm:crm@localhost:5432/crm_test

      - name: E2E-тести — backend
        run: pnpm --filter backend test:e2e
        env:
          DATABASE_URL: postgresql://crm:crm@localhost:5432/crm_test
          DIRECT_URL: postgresql://crm:crm@localhost:5432/crm_test
          REDIS_URL: redis://localhost:6379
          JWT_SECRET: test-only-secret-do-not-use-elsewhere-12345
          FRONTEND_URL: http://localhost:5173
          TELEGRAM_BOT_TOKEN: test-telegram-token
          NODE_ENV: test

      - name: Збір звіту покриття
        if: always()
        run: |
          mkdir -p coverage-report
          cp -r apps/backend/coverage coverage-report/backend 2>/dev/null || true
          cp -r apps/frontend/coverage coverage-report/frontend 2>/dev/null || true

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage-report-${{ github.sha }}
          path: coverage-report

```

# FILE: .github/workflows/secrets-scan.yml

```
name: Secrets Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  trufflehog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: TruffleHog OSS
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
          extra_args: --only-verified

```

