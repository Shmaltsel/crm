import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { DayOffRequest } from "../types";

export function useDayOffRequests(from?: string, to?: string, cityId?: string) {
  return useQuery({
    queryKey: ["dayOffRequests", from, to, cityId],
    queryFn: () => {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (cityId) params.set("cityId", cityId);
      return api
        .get<DayOffRequest[]>(`/day-off-requests?${params}`)
        .then((r) => r.data);
    },
    staleTime: 30 * 1000,
  });
}

export function useCreateDayOffRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { date: string; userId?: string; reason?: string }) =>
      api
        .post<DayOffRequest>("/day-off-requests", payload)
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dayOffRequests"] });
    },
  });
}

export function useApproveDayOffRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      managerNote,
    }: {
      id: string;
      managerNote?: string;
    }) =>
      api
        .post<DayOffRequest>(`/day-off-requests/${id}/approve`, {
          managerNote,
        })
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dayOffRequests"] });
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}

export function useRejectDayOffRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      managerNote,
    }: {
      id: string;
      managerNote?: string;
    }) =>
      api
        .post<DayOffRequest>(`/day-off-requests/${id}/reject`, {
          managerNote,
        })
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["dayOffRequests"] });
    },
  });
}
