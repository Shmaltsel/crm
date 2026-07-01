import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";

vi.mock("../../../config/api", () => ({
  api: {
    get: vi.fn().mockResolvedValue({
      data: [
        {
          id: "school-1",
          name: "Школа №1",
          type: "Школа",
          cityId: "city-1",
          childrenCount: 300,
          events: [],
        },
        {
          id: "school-2",
          name: "Школа №5",
          type: "Школа",
          cityId: "city-1",
          childrenCount: 100,
          events: [],
        },
      ],
    }),
  },
}));

import { useSchoolsList } from "../../../hooks/useSchools";

const makeWrapper = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: qc, children });
};

describe("useSchoolsList", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", { getItem: vi.fn() });
  });

  it("повертає список шкіл", async () => {
    const { result } = renderHook(() => useSchoolsList(), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].name).toBe("Школа №1");
  });

  it("isLoading на початку", () => {
    const { result } = renderHook(() => useSchoolsList(), {
      wrapper: makeWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });
});
