import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface DayOff {
  id: string;
  userId: string;
  date: string;
  user: { id: string; name: string; role: string; cityId: string | null };
}

export function useDaysOff(from?: string, to?: string, cityId?: string) {
  return useQuery({
    queryKey: ["daysOff", from, to, cityId],
    queryFn: () => {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (cityId) params.set("cityId", cityId);
      return api.get<DayOff[]>(`/days-off?${params}`).then((r) => r.data);
    },
    enabled: !!from || !!to,
    staleTime: 30 * 1000,
  });
}

export function useCreateDayOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { date: string; userId?: string }) =>
      api.post<DayOff>("/days-off", payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}

export function useDeleteDayOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/days-off/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}
