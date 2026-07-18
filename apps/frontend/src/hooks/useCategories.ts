import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface Category {
  id: string;
  name: string;
  type: "INVENTORY" | "EXPENSE";
}

export function useCategories(type?: "INVENTORY" | "EXPENSE") {
  return useQuery<Category[]>({
    queryKey: ["categories", type],
    queryFn: async () => {
      const params = type ? `?type=${type}` : "";
      const res = await api.get<Category[]>(`/categories${params}`);
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: { name: string; type: "INVENTORY" | "EXPENSE" }) =>
      api.post<Category>("/categories", dto).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/categories/${id}`).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
