import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { SalaryRecord } from "../types";

export interface SalarySummary {
  balance: number;
  totalAllocated: number;
  totalPaid: number;
  pending: number;
}

export function useMySalary(cityId?: string) {
  return useQuery({
    queryKey: ["salary", "mine", cityId],
    queryFn: () =>
      api
        .get<SalaryRecord[]>("/salary/mine", { params: { cityId } })
        .then((r) => r.data),
    staleTime: 30 * 1000,
  });
}

export function useMySalarySummary() {
  return useQuery<SalarySummary>({
    queryKey: ["salary", "summary"],
    queryFn: () => api.get<SalarySummary>("/salary/summary").then((r) => r.data),
    staleTime: 60 * 1000,
  });
}

export function useAllSalary(cityId?: string) {
  return useQuery({
    queryKey: ["salary", "all", cityId],
    queryFn: () =>
      api
        .get<SalaryRecord[]>("/salary", { params: { cityId } })
        .then((r) => r.data),
    staleTime: 30 * 1000,
  });
}

export function useCreateSalary() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: {
      reportId: string;
      items: { employeeId: string; amount: number; comment?: string }[];
    }) => api.post("/salary", dto).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["salary"] });
    },
  });
}

export function useMarkPaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/salary/${id}/mark-paid`).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["salary"] });
    },
  });
}
