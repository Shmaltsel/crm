import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { EventReport } from "../types";

export function useReport(eventId: string | undefined) {
  return useQuery({
    queryKey: ["report", eventId],
    queryFn: () =>
      api
        .get<EventReport>(`/reports/event/${eventId}`)
        .then((r) => r.data),
    enabled: !!eventId,
    staleTime: 30 * 1000,
  });
}

export function useSubmittedReports() {
  return useQuery({
    queryKey: ["reports", "submitted"],
    queryFn: () =>
      api
        .get<{ items: EventReport[]; total: number; page: number; pageCount: number }>(
          "/reports/submitted",
        )
        .then((r) => r.data.items),
    staleTime: 30 * 1000,
  });
}

export function useCreateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: {
      eventId: string;
      announcementDone?: boolean;
      materialShown?: boolean;
      childrenCount?: number;
      classesCount?: number;
      privilegedCount?: number;
      showingsCount?: number;
      totalSum?: number;
      schoolSum?: number;
      remainderSum?: number;
      rating?: number;
      directorSatisfied?: boolean;
      teachersSatisfied?: boolean;
      hadIssues?: boolean;
      comment?: string;
    }) => api.post<EventReport>("/reports", dto).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
    },
  });
}

export function useUpdateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...dto
    }: {
      id: string;
      announcementDone?: boolean;
      materialShown?: boolean;
      childrenCount?: number;
      classesCount?: number;
      privilegedCount?: number;
      showingsCount?: number;
      totalSum?: number;
      schoolSum?: number;
      remainderSum?: number;
      rating?: number;
      directorSatisfied?: boolean;
      teachersSatisfied?: boolean;
      hadIssues?: boolean;
      comment?: string;
    }) => api.patch<EventReport>(`/reports/${id}`, dto).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
    },
  });
}

export function useSubmitReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.post<EventReport>(`/reports/${id}/submit`).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}

export interface ApproveReportInput {
  id: string;
  salaries: { id: string; amount: number }[];
}

export function useApproveReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, salaries }: ApproveReportInput) =>
      api
        .post<EventReport>(`/reports/${id}/approve`, { salaries })
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
      qc.invalidateQueries({ queryKey: ["salary"] });
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["calendarEvents"] });
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
    },
  });
}

export function useRequestRevision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      api
        .post<EventReport>(`/reports/${id}/request-revision`, { comment })
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}

export function useRejectReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      api
        .post<EventReport>(`/reports/${id}/reject`, { comment })
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}
