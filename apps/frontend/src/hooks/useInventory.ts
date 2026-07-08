import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { InventoryItem, CreateInventoryPayload, UpdateInventoryPayload } from "../types";

export function useInventory(filters?: { category?: string; cityId?: string; lowStock?: string; search?: string }) {
  const params = new URLSearchParams();
  if (filters?.category) params.set("category", filters.category);
  if (filters?.cityId) params.set("cityId", filters.cityId);
  if (filters?.lowStock) params.set("lowStock", filters.lowStock);
  if (filters?.search) params.set("search", filters.search);
  const qs = params.toString();

  return useQuery({
    queryKey: ["inventory", filters],
    queryFn: () => api.get<InventoryItem[]>(`/inventory${qs ? `?${qs}` : ""}`).then(r => r.data),
    staleTime: 30 * 1000,
  });
}

export function useLowStockItems() {
  return useQuery({
    queryKey: ["inventory", "low-stock"],
    queryFn: () => api.get<InventoryItem[]>("/inventory/low-stock").then(r => r.data),
    staleTime: 30 * 1000,
  });
}

export function useCreateInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInventoryPayload) =>
      api.post<InventoryItem>("/inventory", data).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useUpdateInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UpdateInventoryPayload) =>
      api.patch<InventoryItem>(`/inventory/${id}`, data).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useDeleteInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/inventory/${id}`).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useAddStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      api.post(`/inventory/${id}/add-stock`, { quantity }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}
