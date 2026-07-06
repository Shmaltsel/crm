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
