import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { ManualExpense } from "../types";

export interface ManualExpenseListResponse {
  items: ManualExpense[];
  total: number;
  page: number;
  take: number;
  totalPages: number;
}

export function useManualExpenses(filters: {
  period?: string;
  cityId?: string;
  page?: number;
  take?: number;
}) {
  return useQuery({
    queryKey: ["manual-expenses", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.period) params.set("period", filters.period);
      if (filters.cityId) params.set("cityId", filters.cityId);
      if (filters.page) params.set("page", String(filters.page));
      if (filters.take) params.set("take", String(filters.take));
      const res = await api.get<ManualExpenseListResponse>(`/finance/manual-expenses?${params}`);
      return res.data;
    },
    staleTime: 30_000,
  });
}

export function useCreateManualExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: {
      category: string;
      name?: string;
      description?: string;
      amount: number;
      date: string;
      cityId?: string;
      photoUrl?: string;
    }) => api.post<ManualExpense>("/finance/manual-expenses", dto).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["manual-expenses"] });
      qc.invalidateQueries({ queryKey: ["finance"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useUpdateManualExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...dto }: { id: string; category?: string; name?: string; description?: string; amount?: number; date?: string; cityId?: string; photoUrl?: string }) =>
      api.patch<ManualExpense>(`/finance/manual-expenses/${id}`, dto).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["manual-expenses"] });
      qc.invalidateQueries({ queryKey: ["finance"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

export function useDeleteManualExpense() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/finance/manual-expenses/${id}`).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["manual-expenses"] });
      qc.invalidateQueries({ queryKey: ["finance"] });
      qc.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}
