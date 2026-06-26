import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: () => api.get("/cities", { headers: h() }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCity(id: string | undefined) {
  return useQuery({
    queryKey: ["city", id],
    queryFn: () => api.get(`/cities/${id}`).then(r => r.data),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => api.post("/cities", { name }).then(r => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["cities"], (old: any) =>
        Array.isArray(old) ? [data, ...old] : [data]
      );
    },
  });
}

export function useCreateCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: { name: string; hostId: string; driverId: string }) =>
      api.post(`/cities/${cityId}/crews`, form).then(r => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["city", cityId], (old: any) =>
        old ? { ...old, crews: [...(old.crews || []), data] } : old
      );
    },
  });
}

export function useDeleteCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (crewId: string) =>
      api.delete(`/cities/crews/${crewId}`).then(r => r.data),
    onSuccess: (_data, crewId) => {
      qc.setQueryData(["city", cityId], (old: any) =>
        old ? { ...old, crews: old.crews?.filter((c: any) => c.id !== crewId) } : old
      );
    },
  });
}