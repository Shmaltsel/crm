import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";
import { useSchoolsList } from "../../../hooks/useSchools";

const wrapper = ({ children }: { children: React.ReactNode }) =>
  createElement(QueryClientProvider, {
    client: new QueryClient({ defaultOptions: { queries: { retry: false } } }),
    children,
  });

describe("useSchoolsList", () => {
  it("повертає список шкіл", async () => {
    const { result } = renderHook(() => useSchoolsList(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].name).toBe("Школа №1");
  });

  it("isLoading на початку", () => {
    const { result } = renderHook(() => useSchoolsList(), { wrapper });
    expect(result.current.isLoading).toBe(true);
  });
});
