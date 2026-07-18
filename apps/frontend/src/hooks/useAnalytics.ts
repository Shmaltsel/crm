import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  profit: number;
  events: number;
}

export interface CityEvents {
  cityId: string;
  cityName: string;
  events: number;
}

export interface CityProfit {
  cityId: string;
  cityName: string;
  revenue: number;
  profit: number;
  expenses: number;
  count: number;
}

export interface SalaryFund {
  total: number;
  month: number;
  year: number;
  byCity?: Record<string, number>;
}

export function useRevenueByMonth(params?: { cityId?: string; projectId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "revenue-by-month", params],
    queryFn: () => api.get<MonthlyRevenue[]>("/analytics/revenue-by-month", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export interface RevenueByCityMonthRow {
  year: number;
  month: number;
  cityName: string;
  project: string;
  revenue: number;
  profit: number;
}

export function useRevenueByCityMonth(params?: { projectId?: string; year?: number; enabled?: boolean }) {
  return useQuery({
    queryKey: ["analytics", "revenue-by-city-month", { projectId: params?.projectId, year: params?.year }],
    queryFn: () => api.get<RevenueByCityMonthRow[]>("/analytics/revenue-by-city-month", { params: { projectId: params?.projectId, year: params?.year } }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
    enabled: params?.enabled !== false,
  });
}

export function useEventsByCity(params?: { year?: number }) {
  return useQuery({
    queryKey: ["analytics", "events-by-city", params],
    queryFn: () => api.get<CityEvents[]>("/analytics/events-by-city", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProfitByCity(params?: { cityId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "profit-by-city", params],
    queryFn: () => api.get<CityProfit[]>("/analytics/profit-by-city", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSalaryFund(params?: { month?: number; year?: number; cityId?: string }) {
  return useQuery({
    queryKey: ["analytics", "salary-fund", params],
    queryFn: () => api.get<SalaryFund>("/analytics/salary-fund", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export interface AnalyticsTarget {
  id: string;
  year: number;
  month: number;
  target: number;
}

export function useAnalyticsTargets(params?: { year?: number }) {
  return useQuery({
    queryKey: ["analytics", "targets", params],
    queryFn: () => api.get<AnalyticsTarget[]>("/analytics/targets", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSetAnalyticsTarget() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { year: number; month: number; target: number }) =>
      api.put("/analytics/targets", data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["analytics", "targets"] });
    },
  });
}

export interface AnalyticsAnnotation {
  id: string;
  year: number;
  month: number;
  text: string;
  color: string;
}

export function useAnalyticsAnnotations(params?: { year?: number }) {
  return useQuery({
    queryKey: ["analytics", "annotations", params],
    queryFn: () => api.get<AnalyticsAnnotation[]>("/analytics/annotations", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSetAnalyticsAnnotation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { year: number; month: number; text: string; color?: string }) =>
      api.put("/analytics/annotations", data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["analytics", "annotations"] });
    },
  });


}
export interface RevenueByDayRow {
  date: string;
  cityName: string;
  project: string;
  revenue: number;
  profit: number;
}

export function useRevenueByDay(params?: { year?: number; month?: number; cityId?: string; project?: string; enabled?: boolean }) {
  return useQuery({
    queryKey: ["analytics", "revenue-by-day", params],
    queryFn: () => api.get<RevenueByDayRow[]>("/analytics/revenue-by-day", { params: { year: params?.year, month: params?.month, cityId: params?.cityId, project: params?.project } }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
    enabled: params?.enabled !== false,
  });
}
