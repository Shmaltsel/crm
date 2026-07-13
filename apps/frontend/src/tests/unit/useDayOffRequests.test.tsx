import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  useDayOffRequests,
  useCreateDayOffRequest,
  useApproveDayOffRequest,
  useRejectDayOffRequest,
} from "../../hooks/useDayOffRequests";

const { apiMock } = vi.hoisted(() => ({
  apiMock: {
    get: vi.fn(),
    post: vi.fn(),
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

describe("useDayOffRequests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useDayOffRequests повертає запити з API", async () => {
    const mockData = [
      {
        id: "req-1",
        userId: "user-1",
        date: "2026-07-15",
        status: "PENDING",
        user: { id: "user-1", name: "Host", role: "HOST", cityId: "city-1" },
      },
    ];
    apiMock.get.mockResolvedValueOnce({ data: mockData });

    const client = createTestClient();
    const { result } = renderHook(() => useDayOffRequests("2026-07-01", "2026-07-31"), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(apiMock.get).toHaveBeenCalledWith(
      expect.stringContaining("/day-off-requests?from=2026-07-01&to=2026-07-31"),
    );
  });

  it("useDayOffRequests з cityId додає параметр", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });

    const client = createTestClient();
    const { result } = renderHook(
      () => useDayOffRequests("2026-07-01", "2026-07-31", "city-1"),
      { wrapper: createWrapper(client) },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(apiMock.get).toHaveBeenCalledWith(
      expect.stringContaining("cityId=city-1"),
    );
  });

  it("useCreateDayOffRequest викликає POST та invalide dayOffRequests", async () => {
    const mockRequest = {
      id: "req-2",
      userId: "user-1",
      date: "2026-07-20",
      status: "PENDING",
      user: { id: "user-1", name: "Host", role: "HOST", cityId: "city-1" },
    };
    apiMock.post.mockResolvedValueOnce({ data: mockRequest });

    const client = createTestClient();
    const { result } = renderHook(() => useCreateDayOffRequest(), {
      wrapper: createWrapper(client),
    });

    let returned: unknown;
    await act(async () => {
      returned = await result.current.mutateAsync({
        date: "2026-07-20",
        reason: "Відпочинок",
      });
    });

    expect(apiMock.post).toHaveBeenCalledWith("/day-off-requests", {
      date: "2026-07-20",
      reason: "Відпочинок",
    });
    expect(returned).toEqual(mockRequest);
  });

  it("useApproveDayOffRequest викликає POST /approve та invalide дні", async () => {
    const mockApproved = {
      id: "req-1",
      status: "APPROVED",
      user: { id: "user-1", name: "Host", role: "HOST", cityId: "city-1" },
    };
    apiMock.post.mockResolvedValueOnce({ data: mockApproved });
    apiMock.get.mockResolvedValueOnce({ data: [] });

    const client = createTestClient();
    const { result } = renderHook(() => useApproveDayOffRequest(), {
      wrapper: createWrapper(client),
    });

    await act(async () => {
      await result.current.mutateAsync({
        id: "req-1",
        managerNote: "Ок",
      });
    });

    expect(apiMock.post).toHaveBeenCalledWith("/day-off-requests/req-1/approve", {
      managerNote: "Ок",
    });
  });

  it("useRejectDayOffRequest викликає POST /reject та invalide запити", async () => {
    const mockRejected = {
      id: "req-1",
      status: "REJECTED",
      user: { id: "user-1", name: "Host", role: "HOST", cityId: "city-1" },
    };
    apiMock.post.mockResolvedValueOnce({ data: mockRejected });
    apiMock.get.mockResolvedValueOnce({ data: [] });

    const client = createTestClient();
    const { result } = renderHook(() => useRejectDayOffRequest(), {
      wrapper: createWrapper(client),
    });

    await act(async () => {
      await result.current.mutateAsync({
        id: "req-1",
        managerNote: "Забагато вихідних",
      });
    });

    expect(apiMock.post).toHaveBeenCalledWith("/day-off-requests/req-1/reject", {
      managerNote: "Забагато вихідних",
    });
  });
});
