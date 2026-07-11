import { useState, lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";
import { useSelectedCity } from "../../../context/CityContext";
import type { FinanceDashboardData } from "../../../types";

const FinanceCharts = lazy(() => import("../../../components/finance/FinanceCharts"));

function FinanceSkeleton() {
  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-surface-muted rounded-control w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-surface rounded-card border border-border" />
        ))}
      </div>
      <div className="h-64 bg-surface rounded-card border border-border" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-48 bg-surface rounded-card border border-border" />
        <div className="h-48 bg-surface rounded-card border border-border" />
      </div>
    </div>
  );
}

export default function Company() {
  const { selectedCity } = useSelectedCity();
  const [period, setPeriod] = useState("year");
  const [projectFilter, setProjectFilter] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["finance", selectedCity.id, period, projectFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (period) params.set("period", period);
      if (selectedCity?.id) params.set("cityId", selectedCity.id);
      if (projectFilter) params.set("project", projectFilter);
      const res = await api.get(`/finance/dashboard?${params}`);
      return res.data as FinanceDashboardData;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !data) return <FinanceSkeleton />;

  return (
    <Suspense fallback={<FinanceSkeleton />}>
      <FinanceCharts
        data={data}
        period={period}
        setPeriod={setPeriod}
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        selectedCity={selectedCity}
      />
    </Suspense>
  );
}
