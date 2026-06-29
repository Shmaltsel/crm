import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ─── Мінімальні дані школи (назва, адреса, місто) ───────────────────────────
export function useSchool(id: string | undefined) {
  return useQuery({
    queryKey: ["school", id],
    queryFn: async () => {
      const res = await api.get(`/schools/${id}`, { headers: authHeader() });
      return res.data;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSchoolCompletedEvents(schoolId: string | undefined) {
  return useQuery({
    queryKey: ["schoolCompletedEvents", schoolId],
    queryFn: async () => {
      const res = await api.get(`/events/school/${schoolId}/completed`, {
        headers: authHeader(),
      });
      return res.data;
    },
    enabled: !!schoolId,
    staleTime: 2 * 60 * 1000,
  });
}

// ─── Мінімальний список подій (без history/preparation) ──────────────────────
export function useSchoolEvents(schoolId: string | undefined, full = false) {
  return useQuery({
    queryKey: ["schoolEvents", schoolId, full],
    queryFn: async () => {
      const url = full
        ? `/events/school/${schoolId}`
        : `/events/school/${schoolId}?minimal=true`;
      const res = await api.get(url, { headers: authHeader() });
      return res.data.filter((ev: any) => ev.status !== "RE_SALE");
    },
    enabled: !!schoolId,
    staleTime: 60 * 1000,
  });
}

// ─── Повні дані однієї події (lazy, при кліку) ────────────────────────────────
export function useEventFull(eventId: string | undefined) {
  return useQuery({
    queryKey: ["eventFull", eventId],
    queryFn: async () => {
      const res = await api.get(`/events/${eventId}`, {
        headers: authHeader(),
      });
      return res.data;
    },
    enabled: !!eventId,
    staleTime: 30 * 1000,
  });
}

// ─── Список користувачів ────────────────────────────────────────────────────
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users", { headers: authHeader() });
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Мутації ────────────────────────────────────────────────────────────────
export function useUpdateEventStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      status,
      actionName,
      comment,
    }: {
      eventId: string;
      status: string;
      actionName: string;
      comment?: string;
    }) =>
      api
        .patch(
          `/events/${eventId}/status`,
          { status, actionName, comment },
          { headers: authHeader() },
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      // Оновлюємо повну подію
      qc.setQueryData(["eventFull", vars.eventId], data);
      // Оновлюємо статус в мінімальному списку без рефетчу
      qc.setQueriesData({ queryKey: ["schoolEvents"] }, (old: any) =>
        Array.isArray(old)
          ? old
              .map((ev: any) =>
                ev.id === vars.eventId
                  ? { ...ev, status: vars.status, ...data }
                  : ev,
              )
              .filter((ev: any) => ev.status !== "RE_SALE")
          : old,
      );
    },
  });
}

export function useUpdatePreparation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      field,
      status,
    }: {
      eventId: string;
      field: string;
      status: string;
    }) =>
      api
        .patch(
          `/events/${eventId}/preparation`,
          { field, status },
          { headers: authHeader() },
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: any) =>
        old
          ? {
              ...old,
              preparation: {
                ...(old.preparation || {}),
                [vars.field]: vars.status,
              },
            }
          : old,
      );
    },
  });
}

export function useAssignCrew() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, crewId }: { eventId: string; crewId: string }) =>
      api
        .post(
          `/events/${eventId}/assign-crew`,
          { crewId },
          { headers: authHeader() },
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], data);
      // Оновлюємо crewId в мінімальному списку
      qc.setQueriesData({ queryKey: ["schoolEvents"] }, (old: any) =>
        Array.isArray(old)
          ? old.map((ev: any) =>
              ev.id === vars.eventId
                ? { ...ev, crewId: vars.crewId, crew: data.crew }
                : ev,
            )
          : old,
      );
    },
  });
}

export function useSubmitReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      reportData,
    }: {
      eventId: string;
      reportData: any;
    }) =>
      api
        .post(`/events/${eventId}/report`, reportData, {
          headers: authHeader(),
        })
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      // Видаляємо подію зі списку (вона стане RE_SALE після статус-мутації)
      qc.setQueriesData({ queryKey: ["schoolEvents"] }, (old: any) =>
        Array.isArray(old)
          ? old.filter((ev: any) => ev.id !== vars.eventId)
          : old,
      );
      qc.removeQueries({ queryKey: ["eventFull", vars.eventId] });
    },
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, comment }: { eventId: string; comment: string }) =>
      api
        .post(
          `/events/${eventId}/history`,
          { comment },
          { headers: authHeader() },
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: any) =>
        old ? { ...old, history: data.history } : old,
      );
    },
  });
}

// === НОВА МУТАЦІЯ: Оновлення школи ===
export const useUpdateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.patch(`/schools/${data.id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["school", variables.id] });
    },
  });
};

// === НОВА МУТАЦІЯ: Створення події ===
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await api.post("/events", payload);
      return res.data;
    },
    onSuccess: (newEvent, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["schoolEvents", variables.schoolId],
      });
    },
  });
};

export function useUpdateHistoryComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      historyId,
      comment,
      eventId,
    }: {
      historyId: string;
      comment: string;
      eventId: string;
    }) =>
      api
        .patch(
          `/events/history/${historyId}`,
          { comment },
          { headers: authHeader() },
        )
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: any) =>
        old
          ? {
              ...old,
              history: old.history?.map((h: any) =>
                h.id === vars.historyId ? { ...h, comment: vars.comment } : h,
              ),
            }
          : old,
      );
    },
  });
}
