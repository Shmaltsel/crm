import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCities } from "../hooks/useCities";
import {
  type RevenueByCityMonthRow,
  useRevenueByCityMonth,
  useEventsByCity,
  useSalaryFund,
  useRoi,
  useAnalyticsTargets,
} from "../hooks/useAnalytics";
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  ReferenceLine,
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
  "hsl(217, 72%, 53%)",
  "hsl(155, 68%, 42%)",
  "hsl(32, 72%, 50%)",
  "hsl(348, 68%, 52%)",
  "hsl(262, 72%, 55%)",
  "hsl(183, 68%, 42%)",
  "hsl(330, 62%, 55%)",
  "hsl(82, 62%, 45%)",
];

function fmtMoney(n: unknown): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);
}

function calculateSMA(values: number[], window: number): (number | null)[] {
  const result: (number | null)[] = [];
  for (let i = 0; i < values.length; i++) {
    if (i < window - 1) {
      result.push(null);
    } else {
      let sum = 0;
      for (let j = i - window + 1; j <= i; j++) sum += values[j];
      result.push(sum / window);
    }
  }
  return result;
}

function detectAnomalies(values: number[]): Set<number> {
  const sorted = [...values].filter((v) => v !== 0).sort((a, b) => a - b);
  if (sorted.length < 4) return new Set();
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const lo = q1 - 1.5 * iqr;
  const hi = q3 + 1.5 * iqr;
  const anomalies = new Set<number>();
  for (let i = 0; i < values.length; i++) {
    if (values[i] < lo || values[i] > hi) anomalies.add(i);
  }
  return anomalies;
}

interface ForecastPoint {
  year: number;
  month: number;
  value: number;
}

function linearRegressionForecast(
  points: ForecastPoint[],
  horizonMonths: number,
): ForecastPoint[] {
  const n = points.length;
  if (n < 2) return [];
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  for (let i = 0; i < n; i++) {
    const x = i;
    const y = points[i].value;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  }
  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return [];
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  const result: ForecastPoint[] = [];
  const lastPoint = points[n - 1];
  for (let h = 1; h <= horizonMonths; h++) {
    const x = n - 1 + h;
    let m = lastPoint.month + h;
    let y = lastPoint.year;
    while (m > 12) { m -= 12; y++; }
    result.push({ year: y, month: m, value: Math.max(0, Math.round(slope * x + intercept)) });
  }
  return result;
}

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => currentYear - i);

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

interface ActiveDotProps {
  cx?: number;
  cy?: number;
  color?: string;
  [k: string]: unknown;
}

function CustomActiveDot({ cx, cy, color }: ActiveDotProps) {
  if (cx == null || cy == null || !color) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={4} fill={color} />
      <circle cx={cx} cy={cy} r={4} fill={color} opacity={0.4}>
        <animate attributeName="r" from="4" to="12" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.4" to="0" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

interface CursorProps {
  x?: number;
  y?: number;
  height?: number;
  [k: string]: unknown;
}

function CustomCursor({ x, y, height }: CursorProps) {
  if (x == null || y == null || height == null) return null;
  return (
    <line x1={x} y1={y} x2={x} y2={y + height} stroke="url(#cursorGradient)" strokeWidth={1} />
  );
}

interface StatDotProps {
  cx?: number;
  cy?: number;
  color?: string;
  payload?: ChartEntry;
  lineKey?: string;
  isMax?: boolean;
  isMin?: boolean;
  isAnomaly?: boolean;
}

function StatDot({ cx, cy, color, payload, lineKey, isMax, isMin, isAnomaly }: StatDotProps) {
  if (cx == null || cy == null || !color || !payload || !lineKey) return null;
  const v = (payload[`profit_${lineKey}`] as number) ?? 0;
  if (v === 0) return null;
  const label = isMax ? "MAX" : isMin ? "MIN" : null;
  if (isAnomaly && !label) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={4} fill="#ef4444" />
        <circle cx={cx} cy={cy} r={7} fill="none" stroke="#ef4444" strokeWidth={1.5} opacity={0.35} />
        <text x={cx} y={cy - 12} textAnchor="middle" fontSize={8} fontWeight={600} fill="#ef4444">
          ⚠
        </text>
      </g>
    );
  }
  if (!label) return <circle cx={cx} cy={cy} r={2.5} fill={color} strokeWidth={0} />;
  return (
    <g>
      <circle cx={cx} cy={cy} r={4} fill={color} />
      <circle cx={cx} cy={cy} r={7} fill="none" stroke={color} strokeWidth={1.5} opacity={0.4} />
      <text
        x={cx}
        y={isMax ? cy - 12 : cy + 16}
        textAnchor="middle"
        fontSize={9}
        fontWeight={600}
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}

function SkeletonCard() {
  return (
    <div className="mobile-card skeleton-shimmer">
      <div className="h-3 rounded-full w-1/3 mb-2.5" />
      <div className="h-7 rounded w-2/3 mb-1.5" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="mobile-card skeleton-shimmer">
      <div className="h-4 rounded w-1/4 mb-5" />
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

interface TooltipDataRef {
  rawData: RevenueByCityMonthRow[] | undefined;
  activeCities: Set<string>;
  aggregateByCity: boolean;
  showAnomalies: boolean;
  anomalyMap: Map<string, Set<number>>;
  zoomedChartEntryKeys: string[];
}

interface RechartsTooltipProps {
  active?: boolean;
  payload?: Array<{
    value?: number;
    name?: string;
    color?: string;
    dataKey?: string;
    payload?: ChartEntry;
  }>;
  label?: string;
}

export default function Analytics() {
  const { user } = useAuth();
  const isSuper = user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const [period, setPeriod] = useState<string>("year");

  const yearParam = useMemo(() => {
    if (period === "all") return undefined;
    return Number(period) || currentYear;
  }, [period]);

  const [activeProjects, setActiveProjects] = useState<Set<string>>(new Set());
  const [activeCities, setActiveCities] = useState<Set<string>>(new Set());
  const [aggregateByCity, setAggregateByCity] = useState(false);
  const [showTrend, setShowTrend] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showYoY, setShowYoY] = useState(false);
  const [showAnomalies, setShowAnomalies] = useState(false);
  const [showTarget, setShowTarget] = useState(false);

  const { data: cities } = useCities();
  const { data: rawCityMonthData, isLoading: revenueLoading } = useRevenueByCityMonth({
    year: yearParam,
  });
  const { data: prevYearData } = useRevenueByCityMonth({
    year: yearParam - 1,
    enabled: period !== "all" && showYoY,
  });
  const { data: eventsByCity, isLoading: eventsLoading } = useEventsByCity({ year: yearParam });
  const { data: salaryFund } = useSalaryFund({ year: yearParam });
  const { data: roi } = useRoi({ year: yearParam });
  const { data: targets } = useAnalyticsTargets({ year: yearParam });

  const cityNames = useMemo(() => {
    if (!cities) return [];
    return cities.map((c) => c.name).filter(Boolean);
  }, [cities]);

  const projectNames = useMemo(() => {
    if (!rawCityMonthData) return [];
    return [...new Set(rawCityMonthData.map((r) => r.project))].filter(Boolean);
  }, [rawCityMonthData]);

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

  const { chartData } = useMemo(() => {
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
        if (aggregateByCity) {
          const lk = `profit_${row.cityName}`;
          entry[lk] = ((entry[lk] as number) ?? 0) + row.profit;
        } else {
          const lk = `profit_${row.project}_${row.cityName}`;
          entry[lk] = ((entry[lk] as number) ?? 0) + row.profit;
        }
      }
    }

    const entries = Array.from(byKey.values()).sort(
      (a, b) => a.year * 12 + a.month - (b.year * 12 + b.month),
    );

    for (const e of entries) {
      e.label = formatAxisLabel(e, entries.length);
    }

    return { chartData: entries };
  }, [filteredData, activeCities, aggregateByCity]);

  const yoyChartData = useMemo(() => {
    if (!showYoY || !prevYearData || activeLines.length === 0) return chartData;
    const prevByMonth = new Map<number, typeof prevYearData>();
    for (const row of prevYearData) {
      const m = Number(row.month);
      if (!prevByMonth.has(m)) prevByMonth.set(m, []);
      prevByMonth.get(m)!.push(row);
    }
    return chartData.map((entry) => {
      const e = { ...entry };
      const rows = prevByMonth.get(Number(entry.month));
      if (!rows) return e;
      for (const row of rows) {
        const lk = aggregateByCity
          ? `prevYear_${row.cityName}`
          : `prevYear_${row.project}_${row.cityName}`;
        if (activeCities.has(row.cityName)) {
          e[lk] = ((e[lk] as number) ?? 0) + row.profit;
        }
      }
      return e;
    });
  }, [chartData, prevYearData, showYoY, activeLines, activeCities, aggregateByCity]);

  const activeLines = useMemo(() => {
    const lines: { key: string; label: string; color: string }[] = [];
    let idx = 0;
    if (aggregateByCity) {
      for (const city of activeCities) {
        lines.push({ key: city, label: city, color: CITY_COLORS[idx % CITY_COLORS.length] });
        idx++;
      }
    } else {
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
    }
    return lines;
  }, [activeProjects, activeCities, aggregateByCity]);

  const prevYearLines = useMemo(() => {
    if (!showYoY || period === "all") return [];
    return activeLines.map((l) => ({
      ...l,
      key: `prevYear_${l.key}`,
      label: `${l.label} (${yearParam - 1})`,
      color: l.color,
    }));
  }, [activeLines, showYoY, period, yearParam]);

  const smaData = useMemo(() => {
    if (!showTrend || activeLines.length === 0) return yoyChartData;
    const smaMaps = new Map<string, (number | null)[]>();
    for (const line of activeLines) {
      const values = yoyChartData.map((e) => (e[`profit_${line.key}`] as number) ?? 0);
      smaMaps.set(line.key, calculateSMA(values, 3));
    }
    return yoyChartData.map((entry, i) => {
      const enriched: ChartEntry = { ...entry };
      for (const line of activeLines) {
        enriched[`sma_${line.key}`] = smaMaps.get(line.key)![i];
      }
      return enriched;
    });
  }, [yoyChartData, activeLines, showTrend]);

  const canForecast = period !== "all" && chartData.length >= 4;

  const forecastData = useMemo(() => {
    if (!showForecast || !canForecast || activeLines.length === 0) return { entries: smaData, forecastStartIndex: -1 };
    const lastRealIndex = smaData.length - 1;
    const allEntries = smaData.map((e) => ({ ...e }));
    for (const line of activeLines) {
      const points: ForecastPoint[] = [];
      for (const e of chartData) {
        const v = (e[`profit_${line.key}`] as number) ?? 0;
        if (v !== 0) points.push({ year: e.year, month: e.month, value: v });
      }
      if (points.length < 4) continue;
      const forecast = linearRegressionForecast(points, 3);
      for (const f of forecast) {
        const k = `${f.year}-${String(f.month).padStart(2, "0")}`;
        let entry = allEntries.find((e) => e.key === k);
        if (!entry) {
          entry = buildChartEntry(f.year, f.month);
          entry.label = formatAxisLabel(entry, allEntries.length + forecast.length);
          allEntries.push(entry);
        }
        entry[`forecast_${line.key}`] = f.value;
      }
    }
    allEntries.sort((a, b) => a.year * 12 + a.month - (b.year * 12 + b.month));
    return { entries: allEntries, forecastStartIndex: lastRealIndex };
  }, [smaData, chartData, activeLines, showForecast, canForecast]);

  const maxIdx = chartData.length - 1;
  const [zoomRange, setZoomRange] = useState<[number, number]>(() => [
    Math.max(0, chartData.length - 12),
    chartData.length - 1,
  ]);
  const [prevDataLength, setPrevDataLength] = useState(chartData.length);
  const [zoomAnimating, setZoomAnimating] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const pinchRef = useRef<{ dist: number; range: [number, number] } | null>(null);
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout>>();

  if (chartData.length !== prevDataLength) {
    setPrevDataLength(chartData.length);
    setZoomRange([Math.max(0, chartData.length - 12), chartData.length - 1]);
  }

  useEffect(() => {
    return () => {
      if (zoomTimerRef.current != null) clearTimeout(zoomTimerRef.current);
    };
  }, []);

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
      setZoomAnimating(true);
      if (zoomTimerRef.current != null) clearTimeout(zoomTimerRef.current);
      setZoomRange(([s, e2]) => {
        const span = e2 - s;
        const shrink = ev.deltaY < 0;
        const step = Math.max(1, Math.floor(span / 4));
        if (shrink) return clampRange(s + step, e2 - step);
        return clampRange(s - step, e2 + step);
      });
      zoomTimerRef.current = setTimeout(() => {
        setZoomAnimating(false);
      }, 200);
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
        setZoomAnimating(true);
        if (zoomTimerRef.current != null) clearTimeout(zoomTimerRef.current);
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const ratio = dist / pinchRef.current.dist;
        const [origS, origE] = pinchRef.current.range;
        const center = (origS + origE) / 2;
        const origSpan = origE - origS;
        const newSpan = Math.round(origSpan / ratio);
        setZoomRange(clampRange(center - newSpan / 2, center + newSpan / 2));
        zoomTimerRef.current = setTimeout(() => {
          setZoomAnimating(false);
        }, 200);
      }
    },
    [clampRange],
  );

  const handleTouchEnd = useCallback(() => {
    pinchRef.current = null;
    if (zoomTimerRef.current != null) clearTimeout(zoomTimerRef.current);
    zoomTimerRef.current = setTimeout(() => {
      setZoomAnimating(false);
    }, 50);
  }, []);

  const zoomedChartData = useMemo(() => {
    return forecastData.entries.slice(zoomRange[0], zoomRange[1] + 1);
  }, [forecastData.entries, zoomRange]);

  const zoomSpan = zoomedChartData.length;
  const isZoomed = zoomRange[0] !== 0 || zoomRange[1] !== maxIdx;

  const lineStats = useMemo(() => {
    if (!showStats || activeLines.length === 0) return new Map<string, { avg: number; max: number; min: number; maxIdx: number; minIdx: number }>();
    const map = new Map<string, { avg: number; max: number; min: number; maxIdx: number; minIdx: number }>();
    for (const line of activeLines) {
      let sum = 0;
      let count = 0;
      let max = -Infinity;
      let min = Infinity;
      let maxI = 0;
      let minI = 0;
      for (let i = 0; i < zoomedChartData.length; i++) {
        const v = (zoomedChartData[i][`profit_${line.key}`] as number) ?? 0;
        sum += v;
        count++;
        if (v > max) { max = v; maxI = i; }
        if (v < min) { min = v; minI = i; }
      }
      map.set(line.key, {
        avg: count > 0 ? sum / count : 0,
        max: max === -Infinity ? 0 : max,
        min: min === Infinity ? 0 : min,
        maxIdx: maxI,
        minIdx: minI,
      });
    }
    return map;
  }, [zoomedChartData, activeLines, showStats]);

  const anomalyMap = useMemo(() => {
    if (!showAnomalies || activeLines.length === 0) return new Map<string, Set<number>>();
    const map = new Map<string, Set<number>>();
    for (const line of activeLines) {
      const values = zoomedChartData.map((e) => (e[`profit_${line.key}`] as number) ?? 0);
      map.set(line.key, detectAnomalies(values));
    }
    return map;
  }, [zoomedChartData, activeLines, showAnomalies]);

  const targetChartData = useMemo(() => {
    if (!showTarget || !targets || targets.length === 0) return null;
    return zoomedChartData.map((e) => {
      const t = targets.find((tt) => tt.month === e.month);
      return { ...e, target: t?.target ?? undefined };
    });
  }, [zoomedChartData, targets, showTarget]);

  const totalProfit = useMemo(() => {
    let sum = 0;
    for (const row of filteredData) {
      if (activeCities.has(row.cityName)) sum += row.profit;
    }
    return sum;
  }, [filteredData, activeCities]);

  const tooltipDataRef = useRef<TooltipDataRef>({
    rawData: undefined,
    activeCities: new Set(),
    aggregateByCity: false,
    showAnomalies: false,
    anomalyMap: new Map(),
    zoomedChartEntryKeys: [],
  });
  useEffect(() => {
    tooltipDataRef.current = { rawData: rawCityMonthData, activeCities, aggregateByCity, showAnomalies, anomalyMap, zoomedChartEntryKeys: zoomedChartData.map((e) => e.key) };
  });

  const renderTooltip = useCallback((props: RechartsTooltipProps) => {
    const { active, payload, label } = props;
    const data = tooltipDataRef.current;
    if (!active || !payload?.length) return null;

    const entry = payload[0]?.payload;
    if (!entry) return null;

    if (data.aggregateByCity) {
      const cityData = payload
        .filter((p) => (p.value ?? 0) !== 0)
        .map((p) => {
          const cityName = (p.dataKey ?? "").replace(/^profit_/, "");
          const breakdown = (data.rawData ?? [])
            .filter((r) => r.year === entry.year && r.month === entry.month && r.cityName === cityName)
            .sort((a, b) => b.profit - a.profit);
          return { cityName, total: p.value as number, color: p.color ?? "", breakdown };
        })
        .sort((a, b) => b.total - a.total);

      return (
        <div className="backdrop-blur-xl bg-white/75 border border-white/40 rounded-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] px-3 py-2.5 text-xs max-w-[240px]">
          <p className="font-medium text-content-primary mb-1.5 text-sm">{label}</p>
          {cityData.map((cd, i) => (
            <div key={i} className={i > 0 ? "mt-1.5 pt-1.5 border-t border-black/5" : ""}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cd.color }} />
                <span className="font-medium text-content-primary truncate">{cd.cityName}</span>
                <span className="ml-auto font-medium text-content-primary">{fmtMoney(cd.total)}</span>
              </div>
              {cd.breakdown.length > 1 && cd.breakdown.map((b, j) => (
                <div key={j} className="flex items-center gap-2 pl-4 py-0.5 text-content-secondary">
                  <span className="truncate">{b.project}</span>
                  <span className="ml-auto">{fmtMoney(b.profit)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="backdrop-blur-xl bg-white/75 border border-white/40 rounded-xl shadow-[0_8px_-4px_rgba(0,0,0,0.12)] px-3 py-2.5 text-xs">
        <p className="font-medium text-content-primary mb-1.5 text-sm">{label}</p>
        {payload
          .filter((p) => (p.value ?? 0) !== 0 && !String(p.dataKey).startsWith("sma_") && !String(p.dataKey).startsWith("prevYear_") && !String(p.dataKey).startsWith("forecast_"))
          .sort((a, b) => (b.value as number) - (a.value as number))
          .map((p, i) => {
            const dk = String(p.dataKey);
            const pyKey = `prevYear_${dk.replace(/^profit_/, "")}`;
            const pyVal = (payload.find((pp) => pp.dataKey === pyKey)?.value as number) ?? 0;
            const current = (p.value as number) ?? 0;
            const delta = showYoY && pyVal !== 0 ? current - pyVal : null;
            const entryKey = entry?.key;
            const entryIdx = data.zoomedChartEntryKeys.indexOf(entryKey);
            const lineKey = dk.replace(/^profit_/, "");
            const isAnomaly = data.showAnomalies && entryIdx >= 0 && data.anomalyMap.get(lineKey)?.has(entryIdx) === true;
            return (
            <div key={i} className="flex items-center gap-2 py-0.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
              <span className="text-content-secondary truncate">{p.name}</span>
              {isAnomaly && <span className="text-[9px] text-danger font-medium">⚠</span>}
              <span className="ml-auto font-medium text-content-primary">{fmtMoney(current)}</span>
              {delta !== null && (
                <span className={`ml-1 text-[10px] font-medium ${delta >= 0 ? 'text-status-success' : 'text-status-error'}`}>
                  {delta >= 0 ? "+" : ""}{fmtMoney(delta)}
                </span>
              )}
            </div>
          );
          })}
      </div>
    );
  }, [showYoY]);

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-content-primary">Аналітика</h1>
        <p className="text-2xs text-content-muted mt-1">
          {new Date().toLocaleDateString("uk-UA", { month: "long", year: "numeric" })}
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-content-primary text-sm">Прибуток по місяцях</h3>
            <div className="flex items-center gap-1.5">
              {canForecast && (
                <button
                  onClick={() => setShowForecast((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showForecast
                      ? 'border-border-strong bg-surface shadow-sm text-content-primary'
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showForecast ? 'bg-warning' : 'bg-content-muted'}`} />
                  Прогноз
                </button>
              )}
              {activeLines.length > 0 && (
                <button
                  onClick={() => setShowTrend((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showTrend
                      ? 'border-border-strong bg-surface shadow-sm text-content-primary'
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showTrend ? 'bg-brand' : 'bg-content-muted'}`} />
                  Тренд
                </button>
              )}
              {activeLines.length > 0 && (
                <button
                  onClick={() => setShowStats((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showStats
                      ? 'border-border-strong bg-surface shadow-sm text-content-primary'
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showStats ? 'bg-danger' : 'bg-content-muted'}`} />
                  Статистика
                </button>
              )}
              {activeLines.length > 0 && period !== "all" && (
                <button
                  onClick={() => setShowYoY((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showYoY
                      ? 'border-border-strong bg-surface shadow-sm text-content-primary'
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showYoY ? 'bg-brand' : 'bg-content-muted'}`} />
                  Рік/рік
                </button>
              )}
              {activeLines.length > 0 && (
                <button
                  onClick={() => setShowAnomalies((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showAnomalies
                      ? 'border-border-strong bg-surface shadow-sm text-content-primary'
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showAnomalies ? 'bg-danger' : 'bg-content-muted'}`} />
                  Аномалії
                </button>
              )}
              {targets && targets.length > 0 && (
                <button
                  onClick={() => setShowTarget((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showTarget
                      ? 'border-border-strong bg-surface shadow-sm text-content-primary'
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showTarget ? 'bg-[#f59e0b]' : 'bg-content-muted'}`} />
                  Ціль
                </button>
              )}
              <button
                onClick={() => setAggregateByCity((v) => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border border-border-strong bg-surface text-content-secondary transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: aggregateByCity ? "hsl(155, 68%, 42%)" : "hsl(217, 72%, 53%)" }}
                />
                {aggregateByCity ? "По містах" : "По проєктах"}
              </button>
            </div>
          </div>
          {zoomedChartData.length === 0 ? (
            <ChartEmptyState text="Немає даних за цей період" />
          ) : (
            <>
              <div className="flex md:flex-row flex-col gap-3">
                <div className="flex md:flex-col flex-row flex-wrap gap-1 shrink-0 pt-1 md:max-w-none max-w-[260px]">
                  {!aggregateByCity && (
                    <>
                      <span className="text-[10px] uppercase tracking-wide text-content-muted font-medium px-2 hidden md:block">Проєкти</span>
                      {projectNames.map((name, pi) => {
                        const active = activeProjects.has(name);
                        const color = CITY_COLORS[pi % CITY_COLORS.length];
                        return (
                          <button
                            key={name}
                            onClick={() => toggleProject(name)}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs text-left border transition-[background-color,box-shadow,border-color,transform] duration-200 ease-out ${
                              active
                                ? 'border-border-strong bg-surface shadow-sm'
                                : 'border-transparent bg-transparent text-content-muted hover:bg-surface-subtle'
                            }`}
                          >
                            <span
                              className="w-3 h-3 rounded-full shrink-0 border"
                              style={{ backgroundColor: active ? color : 'transparent', borderColor: color }}
                            />
                            <span className="truncate max-w-[100px]">{name}</span>
                          </button>
                        );
                      })}
                      <div className="hidden md:block border-t border-border w-full my-0.5" />
                    </>
                  )}
                  <span className="text-[10px] uppercase tracking-wide text-content-muted font-medium px-2 hidden md:block">Міста</span>
                  {cityNames.map((name, ci) => {
                    const active = activeCities.has(name);
                    const cityColor = aggregateByCity ? CITY_COLORS[ci % CITY_COLORS.length] : '#64748b';
                    return (
                      <button
                        key={name}
                        onClick={() => toggleCity(name)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs text-left border transition-[background-color,box-shadow,border-color,transform] duration-200 ease-out ${
                          active
                            ? 'border-border-strong bg-surface shadow-sm'
                            : 'border-transparent bg-transparent text-content-muted hover:bg-surface-subtle'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shrink-0 border"
                          style={{
                            backgroundColor: active ? cityColor : 'transparent',
                            borderColor: cityColor,
                          }}
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
                      <AreaChart data={zoomedChartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <defs>
                          {activeLines.map((line) => (
                            <linearGradient key={line.key} id={`grad-${line.key}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={line.color} stopOpacity={0.25} />
                              <stop offset="100%" stopColor={line.color} stopOpacity={0} />
                            </linearGradient>
                          ))}
                          <linearGradient id="cursorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#64748b" stopOpacity={0.6} />
                            <stop offset="100%" stopColor="#64748b" stopOpacity={0.05} />
                          </linearGradient>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2.5" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#f1f5f9" />
                        <XAxis
                          dataKey="label"
                          tick={{ fontSize: 11, fill: "#64748b" }}
                          axisLine={{ stroke: "#e2e8f0" }}
                          tickLine={false}
                          interval={zoomSpan > 24 ? Math.floor(zoomSpan / 8) : zoomSpan > 12 ? 1 : 0}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#64748b" }}
                          axisLine={false}
                          tickLine={false}
                          width={50}
                          tickFormatter={(v: number) => v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`}
                        />
                        <Tooltip
                          content={renderTooltip}
                          cursor={<CustomCursor />}
                          allowEscapeViewBox={{ x: true, y: true }}
                        />
                        {activeLines.map((line) => {
                          const stats = lineStats.get(line.key);
                          return (
                          <Area
                            key={`p_${line.key}`}
                            type="monotone"
                            dataKey={`profit_${line.key}`}
                            stroke={line.color}
                            fill={`url(#grad-${line.key})`}
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            connectNulls={true}
                            dot={showStats && stats ? (props: Record<string, unknown>) => {
                              const anomalies = anomalyMap.get(line.key);
                              return (
                              <StatDot
                                key={`dot_${props.index}`}
                                cx={props.cx as number}
                                cy={props.cy as number}
                                color={line.color}
                                payload={props.payload as ChartEntry}
                                lineKey={line.key}
                                isMax={props.index === stats.maxIdx}
                                isMin={props.index === stats.minIdx}
                                isAnomaly={showAnomalies && anomalies?.has(props.index as number) === true}
                              />
                              );
                            } : showAnomalies ? (props: Record<string, unknown>) => {
                              const anomalies = anomalyMap.get(line.key);
                              return anomalies?.has(props.index as number) ? (
                                <StatDot
                                  key={`dot_${props.index}`}
                                  cx={props.cx as number}
                                  cy={props.cy as number}
                                  color={line.color}
                                  payload={props.payload as ChartEntry}
                                  lineKey={line.key}
                                  isAnomaly
                                />
                              ) : (zoomSpan <= 12 ? <circle cx={props.cx as number} cy={props.cy as number} r={2.5} fill={line.color} strokeWidth={0} /> : null);
                            } : zoomSpan <= 12 ? { r: 2.5, fill: line.color, strokeWidth: 0 } : false}
                            activeDot={<CustomActiveDot color={line.color} />}
                            name={line.label}
                            isAnimationActive={!zoomAnimating}
                            animationDuration={1000}
                            animationEasing="ease-out"
                            style={zoomSpan <= 24 ? { filter: "url(#glow)" } : undefined}
                          />
                          );
                        })}
                        {showStats && activeLines.map((line) => {
                          const stats = lineStats.get(line.key);
                          if (!stats) return null;
                          return (
                            <ReferenceLine
                              key={`avg_${line.key}`}
                              y={stats.avg}
                              stroke={line.color}
                              strokeDasharray="3 3"
                              opacity={0.5}
                              label={{ value: "avg", position: "right", fontSize: 9, fill: line.color }}
                            />
                          );
                        })}
                        {showTrend && activeLines.map((line) => (
                          <Line
                            key={`sma_${line.key}`}
                            type="monotone"
                            dataKey={`sma_${line.key}`}
                            stroke={line.color}
                            strokeWidth={1.5}
                            strokeDasharray="4 4"
                            dot={false}
                            connectNulls
                            opacity={0.6}
                            isAnimationActive={false}
                            name={`${line.label} (SMA)`}
                          />
                        ))}
                        {showForecast && canForecast && forecastData.forecastStartIndex >= 0 && (
                          <ReferenceLine
                            x={zoomedChartData[Math.min(forecastData.forecastStartIndex, zoomedChartData.length - 1)]?.label}
                            stroke="#94a3b8"
                            strokeDasharray="3 3"
                            label={{ value: "Прогноз →", position: "insideTopRight", fontSize: 10, fill: "#94a3b8" }}
                          />
                        )}
                        {showForecast && activeLines.map((line) => (
                          <Line
                            key={`forecast_${line.key}`}
                            type="monotone"
                            dataKey={`forecast_${line.key}`}
                            stroke={line.color}
                            strokeWidth={1.5}
                            strokeDasharray="2 6"
                            dot={false}
                            connectNulls
                            opacity={0.4}
                            isAnimationActive={false}
                            name={`${line.label} (прогноз)`}
                          />
                        ))}
                        {showTarget && targetChartData && (
                          <Line
                            key="target_line"
                            type="monotone"
                            dataKey="target"
                            data={targetChartData}
                            stroke="#f59e0b"
                            strokeWidth={2}
                            strokeDasharray="6 3"
                            dot={false}
                            connectNulls
                            opacity={0.7}
                            isAnimationActive={false}
                            name="Ціль"
                          />
                        )}
                        {showYoY && prevYearLines.map((line) => (
                          <Line
                            key={`py_${line.key}`}
                            type="monotone"
                            dataKey={line.key}
                            stroke={line.color}
                            strokeWidth={1.5}
                            strokeDasharray="6 3"
                            dot={false}
                            connectNulls
                            opacity={0.35}
                            isAnimationActive={false}
                            name={line.label}
                          />
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  {isZoomed && (
                    <button
                      onClick={() => {
                        const totalLen = forecastData.entries.length;
                        setZoomRange([Math.max(0, totalLen - 12), totalLen - 1]);
                      }}
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
                    <Bar dataKey="events" fill="hsl(217, 72%, 53%)" radius={[8, 8, 0, 0]} maxBarSize={48} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
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
        rows={managers?.map((m, i) => [String(i + 1), m.name, String(m.approvedReports)]) ?? []}
      />
      <KpiTable
        title="Ведучі"
        headers={["#", "Ім'я", "Рейтинг", "Звітів"]}
        rows={hosts?.map((h, i) => [String(i + 1), h.name, String(h.avgRating), String(h.reportsCount)]) ?? []}
      />
      <KpiTable
        title="Проєкти"
        headers={["#", "Назва", "Подій", "Прибуток"]}
        rows={projects?.map((p, i) => [String(i + 1), p.project, String(p.eventsCount), fmtMoney(p.profit)]) ?? []}
      />
    </motion.div>
  );
}

function KpiTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
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
              <td colSpan={headers.length} className="text-center py-5 text-content-muted">Немає даних</td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className={`py-1.5 ${j === 0 ? "text-content-muted w-6" : "text-content-primary"}`}>{cell}</td>
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
  const formatted = numericValue !== undefined ? fmtMoney(display) : value;
  return (
    <motion.div className="mobile-card" variants={staggerItem} whileTap={{ scale: 0.97 }} transition={TRANSITION.tap}>
      <p className={`text-2xs font-medium ${color} mb-1.5`}>{label}</p>
      <p className={`text-2xl font-bold leading-none ${color}`}>{formatted}</p>
    </motion.div>
  );
}
