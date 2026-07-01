import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { City, School } from "../types";

const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: () =>
      api.get<City[]>("/cities", { headers: auth() }).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api
        .post<City>("/cities", { name }, { headers: auth() })
        .then((r) => r.data),
    onSuccess: (newCity) => {
      qc.setQueryData(["cities"], (old: City[] = []) => [newCity, ...old]);
    },
  });
}

export function useSchools() {
  return useQuery({
    queryKey: ["schools"],
    queryFn: () =>
      api
        .get<School[]>("/schools?minimal=true", { headers: auth() })
        .then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<School>) =>
      api
        .post<School>("/schools", data, { headers: auth() })
        .then((r) => r.data),
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
      qc.setQueryData(["schools"], (old: School[] = []) =>
        old.filter((s) => s.id !== schoolId),
      );
    },
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => api.get("/events", { headers: auth() }).then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function usePrefetchSchool() {
  const qc = useQueryClient();
  return (schoolId: string) => {
    qc.prefetchQuery({
      queryKey: ["school", schoolId],
      queryFn: () =>
        api
          .get<School>(`/schools/${schoolId}`, { headers: auth() })
          .then((r) => r.data),
      staleTime: 2 * 60 * 1000,
    });
  };
}
