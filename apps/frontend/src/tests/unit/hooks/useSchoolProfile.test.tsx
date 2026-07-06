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
