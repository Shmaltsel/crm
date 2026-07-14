import { useQuery } from "@tanstack/react-query";
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

export interface Roi {
  totalRevenue: number;
  totalExpenses: number;
  salaryExpenses: number;
  profit: number;
  roi: number;
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

export function useRevenueByCityMonth(params?: { projectId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "revenue-by-city-month", params],
    queryFn: () => api.get<RevenueByCityMonthRow[]>("/analytics/revenue-by-city-month", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
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

export function useRoi(params?: { cityId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "roi", params],
    queryFn: () => api.get<Roi>("/analytics/roi", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}
