import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { User, Project } from "../types";

const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export interface UserFormData {
  fullName: string;
  phone: string;
  email: string;
  cityId: string;
  role: string;
  password: string;
  telegramId: string;
  car: string;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      api.get<User[]>("/users", { headers: h() }).then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      api.get<Project[]>("/projects", { headers: h() }).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: UserFormData) =>
      api.post<User>("/users", form, { headers: h() }).then((r) => r.data),
    onMutate: async (form) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      const optimistic = {
        id: `temp-${Date.now()}`,
        name: form.fullName,
        ...form,
      };
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old) ? [...old, optimistic] : [optimistic],
      );
      return { prev };
    },
    onSuccess: (data) => {
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) => (u.id?.startsWith("temp-") ? data : u))
          : [data],
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, form }: { id: string; form: Partial<UserFormData> }) =>
      api
        .patch<User>(`/users/${id}`, form, { headers: h() })
        .then((r) => r.data),
    onMutate: async ({ id, form }) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) =>
              u.id === id
                ? { ...u, name: form.fullName ?? u.name, ...form }
                : u,
            )
          : old,
      );
      return { prev };
    },
    onSuccess: (data, vars) => {
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) => (u.id === vars.id ? { ...u, ...data } : u))
          : old,
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/users/${id}`, { headers: h() }).then((r) => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old) ? old.filter((u) => u.id !== id) : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: {
      name: string;
      color: string;
      pricePerChild?: number;
    }) =>
      api
        .post<Project>("/projects", form, { headers: h() })
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old) ? [...old, data] : [data],
      );
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      form,
    }: {
      id: string;
      form: { name?: string; color?: string; pricePerChild?: number };
    }) =>
      api
        .patch<Project>(`/projects/${id}`, form, { headers: h() })
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old)
          ? old.map((p) => (p.id === vars.id ? { ...p, ...data } : p))
          : old,
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
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old) ? old.filter((p) => p.id !== id) : old,
      );
    },
  });
}
