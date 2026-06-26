import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users", { headers: h() }).then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => api.get("/projects", { headers: h() }).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: any) =>
      api.post("/users", form, { headers: h() }).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["users"], (old: any) =>
        Array.isArray(old) ? [...old, data] : [data],
      );
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, form }: { id: string; form: any }) =>
      api.patch(`/users/${id}`, form, { headers: h() }).then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["users"], (old: any) =>
        Array.isArray(old)
          ? old.map((u: any) => (u.id === vars.id ? { ...u, ...data } : u))
          : old,
      );
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/users/${id}`, { headers: h() }).then((r) => r.data),
    onSuccess: (_data, id) => {
      qc.setQueryData(["users"], (old: any) =>
        Array.isArray(old) ? old.filter((u: any) => u.id !== id) : old,
      );
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: { name: string; color: string }) =>
      api.post("/projects", form, { headers: h() }).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["projects"], (old: any) =>
        Array.isArray(old) ? [...old, data] : [data],
      );
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/projects/${id}`, { headers: h() }).then((r) => r.data),
    onSuccess: (_data, id) => {
      qc.setQueryData(["projects"], (old: any) =>
        Array.isArray(old) ? old.filter((p: any) => p.id !== id) : old,
      );
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/projects/${id}`, { headers: h() }).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}
