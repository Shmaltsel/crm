import { useState, lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";
import { useSelectedCity } from "../../../context/CityContext";
import { exportCsv } from "../../../utils/exportCsv";
import { Download } from "lucide-react";
import type { FinanceDashboardData, CompanyBalance } from "../../../types";

const FinanceCharts = lazy(() => import("../../../components/finance/FinanceCharts"));

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

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

  const { data: balance } = useQuery<CompanyBalance>({
    queryKey: ["company-balance", selectedCity.id, period, projectFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (period) params.set("period", period);
      if (selectedCity?.id) params.set("cityId", selectedCity.id);
      if (projectFilter) params.set("project", projectFilter);
      const res = await api.get(`/finance/company-balance?${params}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !data) return <FinanceSkeleton />;

  const handleExport = () => {
    const rows = data.monthly.map((m) => ({
      Місяць: m.month,
      "Дохід": String(m.revenue),
      "Прибуток": String(m.profit),
    }));
    exportCsv(rows, `finance-${selectedCity.id || "all"}.csv`);
  };

  return (
    <Suspense fallback={<FinanceSkeleton />}>
      {balance && (
        <div className="px-4 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="bg-surface rounded-card border border-border p-3">
              <p className="text-2xs text-content-muted uppercase tracking-wide">Дохід</p>
              <p className="text-lg font-bold text-content-primary">{fmt(balance.totalRevenue)} грн</p>
            </div>
            <div className="bg-surface rounded-card border border-border p-3">
              <p className="text-2xs text-content-muted uppercase tracking-wide">Витрати</p>
              <p className="text-lg font-bold text-danger-600">{fmt(balance.totalExpenses)} грн</p>
            </div>
            <div className="bg-surface rounded-card border border-border p-3">
              <p className="text-2xs text-content-muted uppercase tracking-wide">Зарплата (випл.)</p>
              <p className="text-lg font-bold text-success">{fmt(balance.totalPaidSalaries)} грн</p>
            </div>
            <div className="bg-surface rounded-card border border-border p-3">
              <p className="text-2xs text-content-muted uppercase tracking-wide">Зарплата (очік.)</p>
              <p className="text-lg font-bold text-amber-600">{fmt(balance.totalPendingSalaries)} грн</p>
            </div>
            <div className="bg-surface rounded-card border-2 border-brand/30 p-3 col-span-2 md:col-span-3 lg:col-span-1">
              <p className="text-2xs text-content-muted uppercase tracking-wide">Баланс компанії</p>
              <p className={`text-xl font-bold ${balance.companyBalance >= 0 ? "text-success" : "text-danger-600"}`}>
                {fmt(balance.companyBalance)} грн
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end px-4 pt-3">
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-content-secondary bg-surface-muted rounded-lg hover:bg-surface border border-border transition"
        >
          <Download size={14} />
          Експорт CSV
        </button>
      </div>
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
