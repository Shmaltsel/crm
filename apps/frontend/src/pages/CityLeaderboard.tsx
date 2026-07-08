import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../config/api";

interface CityLeaderboardEntry {
  cityId: string;
  cityName: string;
  events: number;
  revenue: number;
  profit: number;
  children: number;
  schools: number;
}

const METRICS: { key: string; label: string }[] = [
  { key: "events", label: "Події" },
  { key: "revenue", label: "Дохід" },
  { key: "profit", label: "Прибуток" },
  { key: "children", label: "Діти" },
  { key: "schools", label: "Школи" },
];

function fmt(n: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(n));
}

function fmtMoney(n: number): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

const BAR_COLORS = [
  "bg-blue-600",
  "bg-blue-500",
  "bg-blue-400",
  "bg-blue-300",
  "bg-blue-200",
];

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => currentYear - i);

function SkeletonBar() {
  return (
    <div className="flex items-center gap-3 mb-3 animate-pulse">
      <div className="w-24 h-4 bg-slate-100 rounded-full shrink-0" />
      <div className="h-8 bg-slate-100 rounded-full flex-1" />
      <div className="w-16 h-4 bg-slate-100 rounded-full shrink-0" />
    </div>
  );
}

export default function CityLeaderboard() {
  const [metric, setMetric] = useState("events");
  const [year, setYear] = useState(currentYear);

  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "city-leaderboard", metric, year],
    queryFn: () =>
      api
        .get<CityLeaderboardEntry[]>("/analytics/city-leaderboard", {
          params: { metric, year },
        })
        .then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const maxValue = data
    ? Math.max(...data.map((d) => d[metric as keyof CityLeaderboardEntry] as number), 1)
    : 1;

  const formatValue = metric === "revenue" || metric === "profit" ? fmtMoney : fmt;

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Рейтинг міст</h1>
        <p className="text-xs text-slate-400 mt-1">Порівняння міст за обраною метрикою</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {METRICS.map((m) => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              metric === m.key
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
            }`}
          >
            {m.label}
          </button>
        ))}

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="ml-auto px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonBar key={i} />)}
        </div>
      ) : !data || data.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="h-[200px] flex flex-col items-center justify-center text-slate-300">
            <span className="text-3xl mb-2">🏆</span>
            <span className="text-sm text-slate-400">Немає даних за {year} рік</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={metric}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {data.map((entry, i) => {
                const value = entry[metric as keyof CityLeaderboardEntry] as number;
                const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;
                const colorIndex = Math.min(i, BAR_COLORS.length - 1);

                return (
                  <div key={entry.cityId} className="flex items-center gap-3 mb-3">
                    <span className="w-24 text-xs text-slate-500 truncate shrink-0 text-right">
                      {entry.cityName}
                    </span>
                    <div className="flex-1 h-8 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${BAR_COLORS[colorIndex]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <span className="w-20 text-xs font-semibold text-slate-700 text-right shrink-0">
                      {formatValue(value)}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
