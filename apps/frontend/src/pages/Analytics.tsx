import { useState, useMemo, useCallback, useRef, useEffect } from "react";
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

const UA_MONTHS_FULL = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
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

interface ChartEntry {
  key: string;
  year: number;
  month: number;
  label: string;
  [k: string]: string | number;
}

function buildChartEntry(year: number, month: number): ChartEntry {
  return {
    key: `${year}-${String(month).padStart(2, "0")}`,
    year,
    month,
    label: "",
  };
}

function formatAxisLabel(entry: ChartEntry, span: number): string {
  if (span > 18) return String(entry.year);
  if (span > 6) return `${UA_MONTHS[entry.month - 1]} ${String(entry.year).slice(2)}`;
  return UA_MONTHS_FULL[entry.month - 1];
}

export default function Analytics() {
  const { user } = useAuth();
  const isSuper = user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const [period, setPeriod] = useState<string>("year");

  const yearParam = useMemo(() => {
    if (period === "all") return undefined;
    return Number(period) || currentYear;
  }, [period]);

  const { data: cities } = useCities();
  const { data: rawCityMonthData, isLoading: revenueLoading } = useRevenueByCityMonth({
    year: yearParam,
  });
  const { data: eventsByCity, isLoading: eventsLoading } = useEventsByCity({ year: yearParam });
  const { data: salaryFund } = useSalaryFund({ year: yearParam });
  const { data: roi } = useRoi({ year: yearParam });

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

  const { chartData, totalSpan } = useMemo(() => {
    const byKey = new Map<string, ChartEntry>();
    const sorted = [...filteredData].sort(
      (a, b) => a.year * 12 + a.month - (b.year * 12 + b.month),
    );

    for (const row of sorted) {
      const y = Number(row.year);
      const m = Number(row.month);
      const k = `${y}-${String(m).padStart(2, "0")}`;
      if (!byKey.has(k)) byKey.set(k, buildChartEntry(y, m));
      const entry = byKey.get(k)!;
      if (activeCities.has(row.cityName)) {
        const lineKey = `${row.project}_${row.cityName}`;
        entry[`profit_${lineKey}`] =
          ((entry[`profit_${lineKey}`] as number) ?? 0) + row.profit;
      }
    }

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayKey = `${todayYear}-${String(todayMonth).padStart(2, "0")}`;
    if (!byKey.has(todayKey)) {
      byKey.set(todayKey, buildChartEntry(todayYear, todayMonth));
    }

    const entries = Array.from(byKey.values()).sort(
      (a, b) => a.year * 12 + a.month - (b.year * 12 + b.month),
    );

    for (const e of entries) {
      e.label = formatAxisLabel(e, entries.length);
    }

    return { chartData: entries, totalSpan: entries.length };
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

  const maxIdx = chartData.length - 1;
  const [zoomRange, setZoomRange] = useState<[number, number]>([0, 11]);
  const chartRef = useRef<HTMLDivElement>(null);
  const pinchRef = useRef<{ dist: number; range: [number, number] } | null>(null);

  useEffect(() => {
    setZoomRange([Math.max(0, chartData.length - 12), chartData.length - 1]);
  }, [chartData.length]);

  const clampRange = useCallback(
    (start: number, end: number): [number, number] => {
      const max = chartData.length - 1;
      const MIN_SPAN = 1;
      let s = Math.max(0, Math.min(max, Math.round(start)));
      let e = Math.max(0, Math.min(max, Math.round(end)));
      if (e - s < MIN_SPAN) {
        if (s === 0) e = Math.min(max, s + MIN_SPAN);
        else s = Math.max(0, e - MIN_SPAN);
      }
      return [s, e];
    },
    [chartData.length],
  );

  const handleWheel = useCallback(
    (ev: WheelEvent) => {
      ev.preventDefault();
      setZoomRange(([s, e2]) => {
        const span = e2 - s;
        const shrink = ev.deltaY < 0;
        const step = Math.max(1, Math.floor(span / 4));
        if (shrink) return clampRange(s + step, e2 - step);
        return clampRange(s - step, e2 + step);
      });
    },
    [clampRange],
  );

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchRef.current = { dist: Math.hypot(dx, dy), range: zoomRange };
      }
    },
    [zoomRange],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && pinchRef.current) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const ratio = dist / pinchRef.current.dist;
        const [origS, origE] = pinchRef.current.range;
        const center = (origS + origE) / 2;
        const origSpan = origE - origS;
        const newSpan = Math.round(origSpan / ratio);
        setZoomRange(clampRange(center - newSpan / 2, center + newSpan / 2));
      }
    },
    [clampRange],
  );

  const handleTouchEnd = useCallback(() => {
    pinchRef.current = null;
  }, []);

  const zoomedChartData = useMemo(() => {
    return chartData.slice(zoomRange[0], zoomRange[1] + 1);
  }, [chartData, zoomRange]);

  const zoomSpan = zoomedChartData.length;
  const isZoomed = zoomRange[0] !== 0 || zoomRange[1] !== maxIdx;

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
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-2.5 bg-surface border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand min-h-[44px]"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
          <option value="all">Весь час</option>
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
          <KPICard label="Загальний дохід" value={fmtMoney(0)} color="text-brand" numericValue={0} />
          <KPICard label="Прибуток" value={fmtMoney(totalProfit)} color="text-success" numericValue={totalProfit} />
          <KPICard label="ROI" value={roi ? `${roi.roi}%` : "—"} color="text-purple-600" numericValue={roi?.roi ? Number(roi.roi) : undefined} />
          <KPICard label="Витрати на ЗП" value={fmtMoney(salaryFund?.total ?? 0)} color="text-danger" numericValue={salaryFund?.total ?? 0} />
        </motion.div>
      )}

      {revenueLoading && !rawCityMonthData ? (
        <ChartSkeleton />
      ) : (
        <div className={`mobile-card mb-5 transition-opacity ${revenueLoading ? 'opacity-60' : ''}`}>
          <h3 className="font-bold text-content-primary mb-3 text-sm">Прибуток по місяцях</h3>
          {zoomedChartData.length === 0 ? (
            <ChartEmptyState text="Немає даних за цей період" />
          ) : (
            <>
              <div className="flex md:flex-row flex-col gap-3">
                <div className="flex md:flex-col flex-row flex-wrap gap-1 shrink-0 pt-1 md:max-w-none max-w-[260px]">
                  <span className="text-[10px] uppercase tracking-wide text-content-muted font-medium px-2 hidden md:block">Проєкти</span>
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
                  <div className="hidden md:block border-t border-border w-full my-0.5" />
                  <span className="text-[10px] uppercase tracking-wide text-content-muted font-medium px-2 hidden md:block">Міста</span>
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
                <div className="flex-1 min-w-0 swiper-no-swiping" style={{ touchAction: "pan-y" }}>
                  <div
                    ref={chartRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="touch-none"
                  >
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={zoomedChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="#f1f5f9" />
                        <XAxis
                          dataKey="label"
                          tick={{ fontSize: 11, fill: "#64748b" }}
                          axisLine={{ stroke: "#e2e8f0" }}
                          tickLine={false}
                          interval={zoomSpan > 24 ? Math.floor(zoomSpan / 8) : zoomSpan > 12 ? 1 : 0}
                        />
                        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={50} tickFormatter={(v: number) => v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`} />
                        <Tooltip
                          formatter={(v: number, key: string) => {
                            const label = key.replace(/^profit_/, "").replace("_", " · ");
                            return [fmtMoney(v), label];
                          }}
                          labelFormatter={(label: string) => label}
                          contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                          allowEscapeViewBox={{ x: true, y: true }}
                        />
                        {activeLines.map((line) => (
                          <Line key={`p_${line.key}`} type="monotone" dataKey={`profit_${line.key}`} stroke={line.color} strokeWidth={2} dot={zoomSpan <= 12 ? { r: 3, fill: line.color } : false} name={line.label} isAnimationActive={true} animationDuration={1000} animationEasing="ease-out" />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  {isZoomed && (
                    <button
                      onClick={() => setZoomRange([Math.max(0, chartData.length - 12), chartData.length - 1])}
                      className="mt-1.5 text-[10px] text-content-muted hover:text-content-secondary transition px-1"
                    >
                      ← Повний діапазон
                    </button>
                  )}
                </div>
              </div>
            </>
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
