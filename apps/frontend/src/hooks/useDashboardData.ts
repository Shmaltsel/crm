import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import type { FinanceDashboardData } from "../types";
import { useSelectedCity } from "../context/CityContext";

export function useFinanceDashboard(period = "month") {
  const { selectedCity } = useSelectedCity();

  return useQuery<FinanceDashboardData>({
    queryKey: ["finance", "dashboard", period, selectedCity.id],
    queryFn: () =>
      api
        .get<FinanceDashboardData>("/finance/dashboard", {
          params: {
            period,
            cityId: selectedCity.id || undefined,
          },
        })
        .then((r) => r.data),
    staleTime: 60 * 1000,
  });
}
