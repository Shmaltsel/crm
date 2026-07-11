import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { api } from "../../../config/api";
import { useSelectedCity } from "../../../context/CityContext";
import type { FinanceDashboardData } from "../../../types";

const ExpenseChart = lazy(() =>
  import("../../../components/finance/FinanceCharts").then((m) => ({ default: m.ExpenseChart }))
);

function Skeleton() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-xl w-48" />
      <div className="h-24 bg-white rounded-2xl border border-slate-100" />
      <div className="h-64 bg-white rounded-2xl border border-slate-100" />
    </div>
  );
}

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

export default function Expenses() {
  const { selectedCity } = useSelectedCity();
  const [period, setPeriod] = useState("year");

  const { data, isLoading } = useQuery({
    queryKey: ["finance", selectedCity.id, period],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (period) params.set("period", period);
      if (selectedCity?.id) params.set("cityId", selectedCity.id);
      const res = await api.get(`/finance/dashboard?${params}`);
      return res.data as FinanceDashboardData;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !data) return <Skeleton />;

  const totalExpenses = data.kpi?.totalExpenses ?? 0;
  const categories = [...(data.byExpenseCategory ?? [])].sort((a, b) => Number(b.amount) - Number(a.amount));

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-800">Витрати</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white"
        >
          <option value="year">Цей рік</option>
          <option value="quarter">Цей квартал</option>
          <option value="month">Цей місяць</option>
          <option value="all">За весь час</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <p className="text-sm text-slate-400 mb-1">Загальні витрати</p>
        <p className="text-3xl font-bold text-slate-800">{fmt(totalExpenses)} <span className="text-lg text-slate-400">грн</span></p>
      </div>

      {categories.length > 0 && (
        <Suspense fallback={<div className="h-64 bg-white rounded-2xl animate-pulse" />}>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Витрати по категоріях</h3>
            <ExpenseChart byExpenseCategory={categories} />
          </div>
        </Suspense>
      )}

      {categories.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Деталізація</h3>
          <div className="space-y-2">
            {categories.map((cat) => {
              const pct = totalExpenses > 0 ? Math.round((Number(cat.amount) / Number(totalExpenses)) * 100) : 0;
              return (
                <div key={cat.name} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-700">{cat.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{pct}%</span>
                    <span className="text-sm font-semibold text-slate-800">{fmt(cat.amount)} грн</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
