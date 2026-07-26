import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { MileageReport } from "../types";

export function useMileageReportsMine() {
  return useQuery({
    queryKey: ["mileageReports", "mine"],
    queryFn: () =>
      api.get<MileageReport[]>("/mileage-reports/mine").then((r) => r.data),
    staleTime: 30_000,
  });
}

export function useMileageReportsAll() {
  return useQuery({
    queryKey: ["mileageReports", "all"],
    queryFn: () =>
      api.get<MileageReport[]>("/mileage-reports").then((r) => r.data),
    staleTime: 30_000,
  });
}

export function useCreateMileageReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      date: string;
      km: number;
      fuel: number;
      depreciation: number;
      totalAmount: number;
    }) =>
      api
        .post<MileageReport>("/mileage-reports", payload)
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mileageReports"] });
    },
  });
}

export function useApproveMileageReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      managerNote,
    }: {
      id: string;
      managerNote?: string;
    }) =>
      api
        .post<MileageReport>(`/mileage-reports/${id}/approve`, { managerNote })
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mileageReports"] });
      qc.invalidateQueries({ queryKey: ["salary"] });
    },
  });
}

export function useRejectMileageReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      managerNote,
    }: {
      id: string;
      managerNote?: string;
    }) =>
      api
        .post<MileageReport>(`/mileage-reports/${id}/reject`, { managerNote })
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mileageReports"] });
    },
  });
}
