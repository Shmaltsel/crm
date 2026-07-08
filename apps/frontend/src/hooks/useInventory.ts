import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string | null;
  unit: string;
  minStock: number;
  currentStock: number;
}

export function useInventory() {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: () => api.get<InventoryItem[]>("/inventory").then(r => r.data),
    staleTime: 30 * 1000,
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
