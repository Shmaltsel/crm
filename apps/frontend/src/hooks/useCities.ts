import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { City, CityProfile } from "../types";

export function useCities() {
  return useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => api.get<City[]>("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCity(id: string | undefined) {
  return useQuery<CityProfile>({
    queryKey: ["city", id],
    queryFn: () => api.get<CityProfile>(`/cities/${id}`).then((r) => r.data),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api.post("/cities", { name }).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData<City[]>(["cities"], (old) =>
        Array.isArray(old) ? [data, ...old] : [data],
      );
    },
  });
}

export function useCreateCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: { name: string; hostId: string; driverId: string }) =>
      api.post(`/cities/${cityId}/crews`, form).then((r) => r.data),
    onMutate: async (form) => {
      await qc.cancelQueries({ queryKey: ["city", cityId] });
      const prev = qc.getQueryData<CityProfile>(["city", cityId]);
      const optimistic: Crew = { id: `temp-${Date.now()}`, ...form, name: form.name, cityId: cityId! };
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old ? { ...old, crews: [...(old.crews || []), optimistic] } : old,
      );
      return { prev };
    },
    onSuccess: (data) => {
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old
          ? {
              ...old,
              crews: old.crews?.map((c: Crew) =>
                c.id?.startsWith("temp-") ? data : c,
              ),
            }
          : old,
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<CityProfile>(["city", cityId], ctx.prev);
    },
  });
}

export function useDeleteCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (crewId: string) =>
      api.delete(`/cities/crews/${crewId}`).then((r) => r.data),
    onMutate: async (crewId) => {
      await qc.cancelQueries({ queryKey: ["city", cityId] });
      const prev = qc.getQueryData<CityProfile>(["city", cityId]);
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old
          ? { ...old, crews: old.crews?.filter((c: Crew) => c.id !== crewId) }
          : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<CityProfile>(["city", cityId], ctx.prev);
    },
  });
}
