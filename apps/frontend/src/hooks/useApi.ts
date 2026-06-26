import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ─── Cities ──────────────────────────────────────────────────────────────────

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: () => api.get("/cities", { headers: auth() }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api.post("/cities", { name }, { headers: auth() }).then(r => r.data),
    onSuccess: (newCity) => {
      qc.setQueryData(["cities"], (old: any[] = []) => [newCity, ...old]);
    },
  });
}

// ─── Schools ─────────────────────────────────────────────────────────────────

export function useSchools() {
  return useQuery({
    queryKey: ["schools"],
    queryFn: () =>
      api.get("/schools?minimal=true", { headers: auth() }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      api.post("/schools", data, { headers: auth() }).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
    },
  });
}

export function useDeleteSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (schoolId: string) =>
      api.delete(`/schools/${schoolId}`, { headers: auth() }),
    onSuccess: (_data, schoolId) => {
      qc.setQueryData(["schools"], (old: any[] = []) =>
        old.filter(s => s.id !== schoolId),
      );
    },
  });
}

// ─── Events ──────────────────────────────────────────────────────────────────

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => api.get("/events", { headers: auth() }).then(r => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

// ─── Prefetch школи при hover ─────────────────────────────────────────────────

export function usePrefetchSchool() {
  const qc = useQueryClient();
  return (schoolId: string) => {
    qc.prefetchQuery({
      queryKey: ["school", schoolId],
      queryFn: () =>
        api.get(`/schools/${schoolId}`, { headers: auth() }).then(r => r.data),
      staleTime: 2 * 60 * 1000,
    });
  };
}