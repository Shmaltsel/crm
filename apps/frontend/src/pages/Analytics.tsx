import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCities } from "../hooks/useCities";
import {
  useRevenueByCityMonth,
  useEventsByCity,
  useSalaryFund,
  useRoi,
} from "../hooks/useAnalytics";
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  staggerContainer,
  staggerItem,
  useCountUp,
  TRANSITION,
} from "../lib/motion";
import { EmptyState } from "../components/ui/EmptyState";
import { BarChart3 } from "lucide-react";

const UA_MONTHS = [
  "Січ", "Лют", "Бер", "Кві", "Трав", "Чер",
  "Лип", "Сер", "Вер", "Жов", "Лис", "Гру",
];

const CITY_COLORS = [
  "#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
  "#06b6d4", "#ec4899", "#84cc16",
];

function fmtMoney(n: unknown): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);
}

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => currentYear - i);

function SkeletonCard() {
  return (
    <div className="mobile-card animate-pulse">
      <div className="h-3 bg-neutral-100 rounded-full w-1/3 mb-2.5" />
      <div className="h-7 bg-neutral-100 rounded w-2/3 mb-1.5" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="mobile-card animate-pulse">
      <div className="h-4 bg-neutral-100 rounded w-1/4 mb-5" />
      <div className="h-[280px] bg-surface-muted rounded-xl" />
    </div>
  );
}

function ChartEmptyState({ text }: { text: string }) {
  return (
    <div className="h-[280px] flex flex-col items-center justify-center text-content-muted">
      <BarChart3 className="w-10 h-10 text-content-muted/40 mb-2" />
      <span className="text-sm text-content-muted">{text}</span>
    </div>
  );
}

export default function Analytics() {
  const { user } = useAuth();
  const isSuper = user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const [year, setYear] = useState(currentYear);

  const { data: cities } = useCities();
  const { data: rawCityMonthData, isLoading: revenueLoading } = useRevenueByCityMonth({
    year,
  });
  const { data: eventsByCity, isLoading: eventsLoading } = useEventsByCity({ year });
  const { data: salaryFund } = useSalaryFund({ year });
  const { data: roi } = useRoi({ year });

  const cityNames = useMemo(() => {
    if (!cities) return [];
    return cities.map((c) => c.name).filter(Boolean);
  }, [cities]);

  const projectNames = useMemo(() => {
    if (!rawCityMonthData) return [];
    return [...new Set(rawCityMonthData.map((r) => r.project))].filter(Boolean);
  }, [rawCityMonthData]);

  const [activeProjects, setActiveProjects] = useState<Set<string>>(new Set());
  const [activeCities, setActiveCities] = useState<Set<string>>(new Set());

  const toggleProject = (name: string) => {
    setActiveProjects((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const toggleCity = (name: string) => {
    setActiveCities((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const filteredData = useMemo(() => {
    if (!rawCityMonthData) return [];
    if (activeProjects.size === 0) return rawCityMonthData;
    return rawCityMonthData.filter((r) => activeProjects.has(r.project));
  }, [rawCityMonthData, activeProjects]);

  const chartData = useMemo(() => {
    const byMonth = new Map<number, Record<string, number>>();
    for (const row of filteredData) {
      const m = Number(row.month);
      if (!byMonth.has(m)) byMonth.set(m, {});
      const entry = byMonth.get(m)!;
      if (activeCities.has(row.cityName)) {
        const key = `${row.project}_${row.cityName}`;
        entry[`revenue_${key}`] = (entry[`revenue_${key}`] ?? 0) + row.revenue;
        entry[`profit_${key}`] = (entry[`profit_${key}`] ?? 0) + row.profit;
      }
    }
    return Array.from({ length: 12 }, (_, i) => {
      const m = i + 1;
      const entry = byMonth.get(m) ?? {};
      return { month: m.toString().padStart(2, '0'), label: UA_MONTHS[i], ...entry };
    });
  }, [filteredData, activeCities]);

  const activeLines = useMemo(() => {
    const lines: { key: string; label: string; color: string }[] = [];
    let idx = 0;
    for (const project of activeProjects) {
      for (const city of activeCities) {
        lines.push({
          key: `${project}_${city}`,
          label: `${project} · ${city}`,
          color: CITY_COLORS[idx % CITY_COLORS.length],
        });
        idx++;
      }
    }
    return lines;
  }, [activeProjects, activeCities]);

  const totalRevenue = useMemo(() => {
    let sum = 0;
    for (const row of filteredData) {
      if (activeCities.has(row.cityName)) sum += row.revenue;
    }
    return sum;
  }, [filteredData, activeCities]);

  const totalProfit = useMemo(() => {
    let sum = 0;
    for (const row of filteredData) {
      if (activeCities.has(row.cityName)) sum += row.profit;
    }
    return sum;
  }, [filteredData, activeCities]);

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-content-primary">Аналітика</h1>
        <p className="text-2xs text-content-muted mt-1">
          {new Date().toLocaleDateString("uk-UA", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="px-3 py-2.5 bg-surface border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand min-h-[44px]"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {revenueLoading && !rawCityMonthData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <motion.div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5 transition-opacity ${revenueLoading ? 'opacity-60' : ''}`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <KPICard label="Загальний дохід" value={fmtMoney(totalRevenue)} color="text-brand" numericValue={totalRevenue} />
          <KPICard label="Прибуток" value={fmtMoney(totalProfit)} color="text-success" numericValue={totalProfit} />
          <KPICard label="ROI" value={roi ? `${roi.roi}%` : "—"} color="text-purple-600" numericValue={roi?.roi ? Number(roi.roi) : undefined} />
          <KPICard label="Витрати на ЗП" value={fmtMoney(salaryFund?.total ?? 0)} color="text-danger" numericValue={salaryFund?.total ?? 0} />
        </motion.div>
      )}

      {revenueLoading && !rawCityMonthData ? (
        <ChartSkeleton />
      ) : (
        <div className={`mobile-card mb-5 transition-opacity ${revenueLoading ? 'opacity-60' : ''}`}>
          <h3 className="font-bold text-content-primary mb-3 text-sm">Дохід по місяцях</h3>
          {chartData.length === 0 ? (
            <ChartEmptyState text="Немає даних за цей період" />
          ) : (
            <div className="flex gap-3">
                <div className="flex flex-col gap-3 shrink-0 pt-1">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wide text-content-muted font-medium px-2">Проєкти</span>
                  {projectNames.map((name, pi) => {
                    const active = activeProjects.has(name);
                    const color = CITY_COLORS[pi % CITY_COLORS.length];
                    return (
                      <button
                        key={name}
                        onClick={() => toggleProject(name)}
                        className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs text-left transition border ${
                          active
                            ? 'border-border-strong bg-surface'
                            : 'border-transparent bg-transparent text-content-muted'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-sm shrink-0 border"
                          style={{ backgroundColor: active ? color : 'transparent', borderColor: color }}
                        />
                        <span className="truncate max-w-[100px]">{name}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="border-t border-border" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wide text-content-muted font-medium px-2">Міста</span>
                  {cityNames.map((name) => {
                    const active = activeCities.has(name);
                    return (
                      <button
                        key={name}
                        onClick={() => toggleCity(name)}
                        className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs text-left transition border ${
                          active
                            ? 'border-border-strong bg-surface'
                            : 'border-transparent bg-transparent text-content-muted'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-sm shrink-0 border border-content-muted"
                          style={{ backgroundColor: active ? '#64748b' : 'transparent' }}
                        />
                        <span className="truncate max-w-[100px]">{name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex-1 min-w-0 swiper-no-swiping" style={{ touchAction: "pan-y" }}>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={50} tickFormatter={(v: number) => v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`} />
                    <Tooltip
                      formatter={(v: number, key: string) => {
                        const isProfit = key.startsWith("profit_");
                        const label = key.replace(/^(revenue|profit)_/, "").replace("_", " · ");
                        return [fmtMoney(v), `${isProfit ? "Прибуток" : "Дохід"} ${label}`];
                      }}
                      contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                      allowEscapeViewBox={{ x: true, y: true }}
                    />
                    {activeLines.map((line) => [
                      <Line key={`r_${line.key}`} type="monotone" dataKey={`revenue_${line.key}`} stroke={line.color} strokeWidth={2} dot={{ r: 3, fill: line.color }} name={`Дохід ${line.label}`} isAnimationActive={true} animationDuration={1000} animationEasing="ease-out" />,
                      <Line key={`p_${line.key}`} type="monotone" dataKey={`profit_${line.key}`} stroke={line.color} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: line.color, strokeDasharray: "" }} name={`Прибуток ${line.label}`} isAnimationActive={true} animationDuration={1000} animationEasing="ease-out" />,
                    ])}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {isSuper && (
        eventsLoading && !eventsByCity ? (
          <ChartSkeleton />
        ) : (
          <div className={`mobile-card transition-opacity ${eventsLoading ? 'opacity-60' : ''}`}>
            <h3 className="font-bold text-content-primary mb-3 text-sm">Події по містах</h3>
            {!eventsByCity || eventsByCity.length === 0 ? (
              <ChartEmptyState text="Немає подій за цей рік" />
            ) : (
              <div className="swiper-no-swiping" style={{ touchAction: "pan-y" }}>
                <ResponsiveContainer width="100%" height={280}>
                <BarChart data={eventsByCity} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="cityName" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={30} allowDecimals={false} />
                  <Tooltip
                    formatter={(v: number) => [v, "Подій"]}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                    allowEscapeViewBox={{ x: true, y: true }}
                  />
                  <Bar dataKey="events" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={48} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            )}
          </div>
        )
      )}
      {isSuper && (
        <div className="mt-5">
          <h3 className="font-bold text-content-primary mb-3 text-sm">KPI — Топ 10</h3>
          <KpiTables />
        </div>
      )}
    </div>
  );
}

interface KpiManager {
  userId: string;
  name: string;
  approvedReports: number;
}

interface KpiHost {
  userId: string;
  name: string;
  avgRating: number;
  reportsCount: number;
}

interface KpiProject {
  project: string;
  eventsCount: number;
  childrenTotal: number;
  profit: number;
}

function KpiTables() {
  const { data: managers } = useQuery<KpiManager[]>({
    queryKey: ["analytics", "kpi", "managers"],
    queryFn: () => api.get("/analytics/kpi/managers").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
  const { data: hosts } = useQuery<KpiHost[]>({
    queryKey: ["analytics", "kpi", "hosts"],
    queryFn: () => api.get("/analytics/kpi/hosts").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
  const { data: projects } = useQuery<KpiProject[]>({
    queryKey: ["analytics", "kpi", "projects"],
    queryFn: () => api.get("/analytics/kpi/projects").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-3"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <KpiTable
        title="Менеджери"
        headers={["#", "Ім'я", "Затверджено"]}
        rows={
          managers?.map((m, i) => [
            String(i + 1),
            m.name,
            String(m.approvedReports),
          ]) ?? []
        }
      />
      <KpiTable
        title="Ведучі"
        headers={["#", "Ім'я", "Рейтинг", "Звітів"]}
        rows={
          hosts?.map((h, i) => [
            String(i + 1),
            h.name,
            String(h.avgRating),
            String(h.reportsCount),
          ]) ?? []
        }
      />
      <KpiTable
        title="Проєкти"
        headers={["#", "Назва", "Подій", "Прибуток"]}
        rows={
          projects?.map((p, i) => [
            String(i + 1),
            p.project,
            String(p.eventsCount),
            fmtMoney(p.profit),
          ]) ?? []
        }
      />
    </motion.div>
  );
}

function KpiTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <motion.div className="mobile-card" variants={staggerItem}>
      <h4 className="font-semibold text-content-secondary mb-2 text-sm">{title}</h4>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-content-muted border-b border-border">
            {headers.map((h) => (
              <th key={h} className="text-left pb-1.5 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-5 text-content-muted">
                Немає даних
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className={`py-1.5 ${j === 0 ? "text-content-muted w-6" : "text-content-primary"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
}

function KPICard({ label, value, color, numericValue }: { label: string; value: string; color: string; numericValue?: number }) {
  const display = useCountUp(numericValue ?? 0, { duration: 0.9, enabled: numericValue !== undefined });
  const formatted = numericValue !== undefined
    ? fmtMoney(display)
    : value;
  return (
    <motion.div className="mobile-card" variants={staggerItem} whileTap={{ scale: 0.97 }} transition={TRANSITION.tap}>
      <p className={`text-2xs font-medium ${color} mb-1.5`}>{label}</p>
      <p className={`text-2xl font-bold leading-none ${color}`}>{formatted}</p>
    </motion.div>
  );
}
