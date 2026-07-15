import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type {
  Event,
  EventHistory,
  SchoolProfileData,
  CreateEventPayload,
} from "../types";
import type { ReportData } from "../components/school-profile/modals/ReportModal";

export function useSchool(id: string | undefined) {
  return useQuery({
    queryKey: ["school", id],
    queryFn: async () => {
      const res = await api.get(`/schools/${id}`);
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
      const res = await api.get<Event[]>(
        `/events/school/${schoolId}/completed`,
      );
      return res.data;
    },
    enabled: !!schoolId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSchoolEvents(schoolId: string | undefined, full = false) {
  return useQuery({
    queryKey: ["schoolEvents", schoolId, full],
    queryFn: async () => {
      const url = full
        ? `/events/school/${schoolId}`
        : `/events/school/${schoolId}?minimal=true`;
      const res = await api.get<Event[]>(url, undefined);
      return res.data.filter((ev) => ev.status !== "RE_SALE" && ev.status !== "REPORT");
    },
    enabled: !!schoolId,
    staleTime: 60 * 1000,
  });
}

export function useEventFull(eventId: string | undefined) {
  return useQuery({
    queryKey: ["eventFull", eventId],
    queryFn: async () => {
      const res = await api.get<Event>(`/events/${eventId}`);
      return res.data;
    },
    enabled: !!eventId,
    staleTime: 30 * 1000,
  });
}

export { useUsers } from "./useEmployees";

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
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], data);
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old)
            ? old
                .map((ev) =>
                  ev.id === vars.eventId
                    ? { ...ev, status: vars.status, ...data }
                    : ev,
                )
                .filter((ev) => ev.status !== "RE_SALE" && ev.status !== "REPORT")
            : old,
      );
      qc.invalidateQueries({ queryKey: ["calendarEvents"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
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
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
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
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], data);
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old)
            ? old.map((ev) =>
                ev.id === vars.eventId
                  ? { ...ev, crewId: vars.crewId, crew: data.crew }
                  : ev,
              )
            : old,
      );
      qc.invalidateQueries({ queryKey: ["calendarEvents"] });
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
      reportData: ReportData;
    }) =>
      api
        .post(`/events/${eventId}/report`, reportData)
        .then((r) => r.data)
        .catch((err) => {
          console.error("submitReport failed:", err.response?.data ?? err);
          throw err;
        }),
    onSuccess: (_data, vars) => {
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old) ? old.filter((ev) => ev.id !== vars.eventId) : old,
      );
      qc.removeQueries({ queryKey: ["eventFull", vars.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
      qc.invalidateQueries({ queryKey: ["calendarEvents"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
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
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old ? { ...old, history: data.history } : old,
      );
    },
  });
}

export const useUpdateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & Omit<SchoolProfileData, "id" | "city">) => {
      const res = await api.patch(`/schools/${id}`, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["school", variables.id] });
    },
  });
};

export function useDeleteEvent(schoolId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: string) => {
      await api.delete(`/events/${eventId}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["school", schoolId] });
      qc.invalidateQueries({ queryKey: ["schoolCompletedEvents", schoolId] });
      qc.invalidateQueries({ queryKey: ["calendarEvents"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const res = await api.post<Event>("/events", payload);
      return res.data;
    },
    onSuccess: (_newEvent, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["schoolEvents", variables.schoolId],
      });
      queryClient.invalidateQueries({ queryKey: ["calendarEvents"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
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
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old
          ? {
              ...old,
              history: old.history?.map((h: EventHistory) =>
                h.id === vars.historyId ? { ...h, comment: vars.comment } : h,
              ),
            }
          : old,
      );
    },
  });
}

export function useSchoolComments(schoolId: string) {
  return useQuery({
    queryKey: ["schoolComments", schoolId],
    queryFn: () =>
      api
        .get(`/schools/${schoolId}/comments`)
        .then((r) => r.data.items as import("../types").SchoolComment[]),
    enabled: !!schoolId,
  });
}

export function useAddSchoolComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      schoolId,
      type,
      text,
    }: {
      schoolId: string;
      type: string;
      text: string;
    }) =>
      api
        .post(`/schools/${schoolId}/comments`, { type, text })
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["schoolComments", vars.schoolId] });
    },
  });
}
