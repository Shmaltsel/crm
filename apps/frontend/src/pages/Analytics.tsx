import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCities } from "../hooks/useCities";
import {
  type RevenueByCityMonthRow,
  useRevenueByCityMonth,
  useEventsByCity,
  useSalaryFund,
  useAnalyticsTargets,
  useAnalyticsAnnotations,
  useRevenueByDay,
} from "../hooks/useAnalytics";
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  ReferenceLine,
  ReferenceDot,
  Label,
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

function heatColor(value: number, maxAbs: number): string {
  if (maxAbs === 0) return "hsl(0,0%,95%)";
  const ratio = Math.max(-1, Math.min(1, value / maxAbs));
  if (ratio >= 0) {
    const h = 140;
    const s = 40 + ratio * 30;
    const l = 92 - ratio * 45;
    return `hsl(${h},${s}%,${l}%)`;
  }
  const h = 0;
  const s = 50 + Math.abs(ratio) * 30;
  const l = 92 - Math.abs(ratio) * 45;
  return `hsl(${h},${s}%,${l}%)`;
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
  if (entry.day) return entry.label;
  if (span > 18) return String(entry.year);
  if (span > 6) return `${UA_MONTHS[entry.month - 1]} '${String(entry.year).slice(2)}`;
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
  lineIndex?: number;
  collisionGroup?: number;
  isMobile?: boolean;
}

function StatDot({ cx, cy, color, payload, lineKey, isMax, isMin, isAnomaly, lineIndex = 0, collisionGroup = 1, isMobile = false }: StatDotProps) {
  if (cx == null || cy == null || !color || !payload || !lineKey) return null;
  const v = (payload[`profit_${lineKey}`] as number) ?? 0;
  if (v === 0) return null;
  const label = isMax ? "MAX" : isMin ? "MIN" : null;
  const offset = collisionGroup > 1 ? (lineIndex - (collisionGroup - 1) / 2) * (isMobile ? 10 : 14) : 0;
  if (isAnomaly && !label) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={4} fill="#ef4444" />
        <circle cx={cx} cy={cy} r={7} fill="none" stroke="#ef4444" strokeWidth={1.5} opacity={0.35} />
        <text x={cx} y={cy - 12 + offset} textAnchor="middle" fontSize={8} fontWeight={600} fill="#ef4444">
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
        y={isMax ? cy - 12 + offset : cy + 16 + offset}
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
  chartMode: 'profit' | 'composite';
  chartWidth: number;
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
  coordinate?: { x: number; y: number };
}

export default function Analytics() {
  const { user } = useAuth();
  const isSuper = user?.role === "SUPERADMIN" || user?.role === "OWNER";

  // Часовий проміжок за замовчуванням — весь час. Селектор прибрано, буде реалізовано інакше.
  const period: string = "all";

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
  const [showRevenue, setShowRevenue] = useState(false);
  const [chartMode, setChartMode] = useState<'profit' | 'composite'>('profit');
  const [granularity, setGranularity] = useState<'month' | 'day'>('month');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedEntryKey, setSelectedEntryKey] = useState<string | null>(null);

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
  void salaryFund;
  const { data: targets } = useAnalyticsTargets({ year: yearParam });
  const { data: annotations } = useAnalyticsAnnotations({ year: yearParam });
  const { data: rawDayData } = useRevenueByDay({
    year: yearParam,
    enabled: granularity === 'day',
  });

  const cityNames = useMemo(() => {
    if (!cities) return [];
    return cities.map((c) => c.name).filter(Boolean);
  }, [cities]);

  const projectNames = useMemo(() => {
    if (!rawCityMonthData) return [];
    return [...new Set(rawCityMonthData.map((r) => r.project))].filter(Boolean);
  }, [rawCityMonthData]);

  // Авто-селект: при першому отриманні даних обираємо всі міста
  useEffect(() => {
    if (cityNames.length > 0 && activeCities.size === 0) {
      setActiveCities(new Set(cityNames));
    }
  }, [cityNames]); // eslint-disable-line react-hooks/exhaustive-deps

  // Авто-селект: при першому отриманні даних обираємо всі проєкти
  useEffect(() => {
    if (projectNames.length > 0 && activeProjects.size === 0) {
      setActiveProjects(new Set(projectNames));
    }
  }, [projectNames]); // eslint-disable-line react-hooks/exhaustive-deps

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
          const rv = `revenue_${row.cityName}`;
          entry[rv] = ((entry[rv] as number) ?? 0) + row.revenue;
        } else {
          const lk = `profit_${row.project}_${row.cityName}`;
          entry[lk] = ((entry[lk] as number) ?? 0) + row.profit;
          const rv = `revenue_${row.project}_${row.cityName}`;
          entry[rv] = ((entry[rv] as number) ?? 0) + row.revenue;
        }
      }
    }

    const entries = Array.from(byKey.values()).sort(
      (a, b) => a.year * 12 + a.month - (b.year * 12 + b.month),
    );

    if (!aggregateByCity) {
      for (const entry of entries) {
        for (const project of activeProjects) {
          for (const city of activeCities) {
            const lk = `profit_${project}_${city}`;
            const rv = `revenue_${project}_${city}`;
            if (!(lk in entry)) entry[lk] = 0;
            if (!(rv in entry)) entry[rv] = 0;
          }
        }
      }
    }

    for (const e of entries) {
      e.label = formatAxisLabel(e, entries.length);
    }

    return { chartData: entries };
  }, [filteredData, activeCities, activeProjects, aggregateByCity]);


  const dayChartData = useMemo(() => {
    if (granularity !== 'day') return chartData;
    if (!rawDayData) return [];
    const byKey = new Map<string, ChartEntry>();
    for (const row of rawDayData) {
      const d = new Date(row.date);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const day = d.getDate();
      const k = row.date;
      if (!byKey.has(k)) {
        const entry: ChartEntry = {
          key: k,
          year: y,
          month: m,
          day: day,
          label: '',
        };
        byKey.set(k, entry);
      }
      const entry = byKey.get(k)!;
      if (activeCities.has(row.cityName)) {
        if (aggregateByCity) {
          const lk = `profit_${row.cityName}`;
          entry[lk] = ((entry[lk] as number) ?? 0) + row.profit;
          const rv = `revenue_${row.cityName}`;
          entry[rv] = ((entry[rv] as number) ?? 0) + row.revenue;
        } else {
          const lk = `profit_${row.project}_${row.cityName}`;
          entry[lk] = ((entry[lk] as number) ?? 0) + row.profit;
          const rv = `revenue_${row.project}_${row.cityName}`;
          entry[rv] = ((entry[rv] as number) ?? 0) + row.revenue;
        }
      }
    }
    const entries = Array.from(byKey.values()).sort(
      (a, b) => a.key.localeCompare(b.key)
    );
    // Ініціалізуємо всі active project×city ключі з нулями
    // щоб Recharts малював лінії навіть якщо rawDayData не містить дані для деяких комбінацій
    if (!aggregateByCity) {
      for (const entry of entries) {
        for (const project of activeProjects) {
          for (const city of activeCities) {
            const lk = `profit_${project}_${city}`;
            const rv = `revenue_${project}_${city}`;
            if (!(lk in entry)) entry[lk] = 0;
            if (!(rv in entry)) entry[rv] = 0;
          }
        }
      }
    }
    const span = entries.length;
    for (const e of entries) {
      const d = new Date(e.key);
      if (span > 60) e.label = `${d.getDate()}.${d.getMonth()+1}`;
      else if (span > 30) e.label = `${d.getDate()} ${UA_MONTHS[d.getMonth()]}`;
      else e.label = `${d.getDate()} ${UA_MONTHS_FULL[d.getMonth()]}`;
    }
    return entries;
  }, [rawDayData, granularity, chartData, activeCities, activeProjects, aggregateByCity]);
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

  const canForecast = period !== 'all' && chartData.length >= 4 && granularity !== 'day';

  const forecastData = useMemo(() => {
    if (!showForecast || !canForecast || activeLines.length === 0) return { entries: smaData, forecastStartIndex: -1, insufficientLines: new Set<string>() };
    const lastRealIndex = smaData.length - 1;
    const allEntries = smaData.map((e) => ({ ...e }));
    const insufficientLines = new Set<string>();
    for (const line of activeLines) {
      const points: ForecastPoint[] = [];
      for (const e of chartData) {
        const v = (e[`profit_${line.key}`] as number) ?? 0;
        if (v !== 0) points.push({ year: e.year, month: e.month, value: v });
      }
      if (points.length < 4) {
        console.warn(`[Forecast] "${line.label}" пропущено: ${points.length} ненульових точок (<4)`);
        insufficientLines.add(line.key);
        continue;
      }
      const forecast = linearRegressionForecast(points, 3);
      if (forecast.length > 0 && lastRealIndex >= 0) {
        const lastReal = smaData[lastRealIndex];
        const lastK = `${lastReal.year}-${String(lastReal.month).padStart(2, "0")}`;
        const lastEntry = allEntries.find((e) => e.key === lastK);
        if (lastEntry) {
          const lastVal = (lastEntry[`profit_${line.key}`] as number) ?? 0;
          if (lastVal !== 0) {
            lastEntry[`forecast_${line.key}`] = lastVal;
          }
        }
      }
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
    return { entries: allEntries, forecastStartIndex: lastRealIndex, insufficientLines };
  }, [smaData, chartData, activeLines, showForecast, canForecast]);


  // ── Zoom state: зберігаємо як діапазон дат (key), а індекси обчислюємо похідно ──
  const lastMonth = chartData[chartData.length - 1];
  const firstMonth = chartData[0];
  const [zoomKeys, setZoomKeys] = useState<[string, string]>(() => [
    firstMonth?.key ?? "",
    lastMonth?.key ?? "",
  ]);

  // Bail-out helper: не записувати ідентичні ключі (унеможливлює цикл)
  const setZoomKeysSafe = useCallback((next: [string, string]) => {
    setZoomKeys((prev) => {
      if (prev[0] === next[0] && prev[1] === next[1]) return prev;
      return next;
    });
  }, []);

  const [prevDataLength, setPrevDataLength] = useState(chartData.length);

  // Синхронізуємо при зміні даних (render-phase adjust-during-render патерн)
  if (chartData.length !== prevDataLength) {
    setPrevDataLength(chartData.length);
    const last = chartData[chartData.length - 1];
    if (last) {
      const nextStart = chartData[Math.max(0, chartData.length - 12)].key;
      const nextEnd = last.key;
      setZoomKeys((prev) => {
        if (prev[0] === nextStart && prev[1] === nextEnd) return prev;
        return [nextStart, nextEnd];
      });
    }
  }

  // ── Хелпери: конвертація key ↔ index для активного масиву ──
  const keyToIndex = useCallback((key: string, source: ChartEntry[]): number => {
    return source.findIndex((e) => e.key === key);
  }, []);

  const visibleRange = useMemo((): [number, number] => {
    const source = granularity === 'day' ? dayChartData : forecastData.entries;
    if (source.length < 2) return [0, Math.max(0, source.length - 1)];
    const s = keyToIndex(zoomKeys[0], source);
    const e = keyToIndex(zoomKeys[1], source);
    if (s === -1 && e === -1) {
      const fallbackEnd = source.length - 1;
      const nextStart = source[0].key;
      const nextEnd = source[fallbackEnd].key;
      setZoomKeys((prev) => {
        if (prev[0] === nextStart && prev[1] === nextEnd) return prev;
        return [nextStart, nextEnd];
      });
      return [0, fallbackEnd];
    }
    if (s === -1) return [0, e];
    if (e === -1) return [s, source.length - 1];
    return [Math.min(s, e), Math.max(s, e)];
  }, [zoomKeys, granularity, dayChartData, forecastData.entries, keyToIndex]);

  const visibleRangeRef = useRef(visibleRange);
  useEffect(() => {
    visibleRangeRef.current = visibleRange;
  });

  const [zoomAnimating, setZoomAnimating] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const pinchRef = useRef<{ dist: number; keys: [string, string] } | null>(null);
  const zoomTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const CHIP_COLORS: Record<string, { active: string; dot: string }> = {
    forecast: { active: 'border-[hsl(38,92%,50%)]/40 bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,30%)]', dot: 'bg-warning' },
    trend: { active: 'border-brand/40 bg-brand/10 text-[hsl(217,72%,30%)]', dot: 'bg-brand' },
    stats: { active: 'border-danger/40 bg-danger/10 text-[hsl(348,68%,30%)]', dot: 'bg-danger' },
    yoy: { active: 'border-brand/40 bg-brand/10 text-[hsl(217,72%,30%)]', dot: 'bg-brand' },
    anomalies: { active: 'border-danger/40 bg-danger/10 text-[hsl(348,68%,30%)]', dot: 'bg-danger' },
    target: { active: 'border-[#f59e0b]/40 bg-[#f59e0b]/10 text-[hsl(38,92%,30%)]', dot: 'bg-[#f59e0b]' },
    revenue: { active: 'border-[#8b5cf6]/40 bg-[#8b5cf6]/10 text-[hsl(262,72%,35%)]', dot: 'bg-[#8b5cf6]' },
  };

  useEffect(() => {
    return () => {
      if (zoomTimerRef.current != null) clearTimeout(zoomTimerRef.current);
    };
  }, []);

  useEffect(() => {
    // При зміні forecast toggle — розширюємо зум вправо якщо був на кінці
    // Використовуємо functional update щоб уникнути циклу (немає zoomKeys в deps)
    setZoomKeys((prev) => {
      const lastChartKey = chartData[chartData.length - 1]?.key;
      const lastForecastKey = forecastData.entries[forecastData.entries.length - 1]?.key;

      if (!lastChartKey || !lastForecastKey) return prev;

      // Гард: якщо forecast вимкнений або forecast tail відсутній — нічого не робити
      if (showForecast && canForecast && prev[1] === lastChartKey) {
        const next: [string, string] = [prev[0], lastForecastKey];
        return prev[0] === next[0] && prev[1] === next[1] ? prev : next;
      }
      if (!showForecast && prev[1] === lastForecastKey) {
        const next: [string, string] = [prev[0], lastChartKey];
        return prev[0] === next[0] && prev[1] === next[1] ? prev : next;
      }

      return prev;
    });
  }, [showForecast, canForecast, forecastData.entries, chartData]);

  const handleGranularityToggle = useCallback(() => {
    const newGranularity = granularity === 'month' ? 'day' : 'month';
    if (newGranularity === 'day' && period === 'all') return;
    setGranularity(newGranularity);
    const source = newGranularity === 'day' ? dayChartData : forecastData.entries;
    if (source.length > 0) {
      setZoomKeysSafe([source[0].key, source[source.length - 1].key]);
    }
  }, [granularity, period, dayChartData, forecastData.entries, setZoomKeysSafe]);

  const clampRange = useCallback(
    (start: number, end: number, sourceLen: number): [number, number] => {
      const max = sourceLen - 1;
      if (max < 2) return [0, max];
      const MIN_SPAN = granularity === 'day' ? 29 : 1;
      let s = Math.max(0, Math.min(max, Math.round(start)));
      let e = Math.max(0, Math.min(max, Math.round(end)));
      if (e - s < MIN_SPAN) {
        if (s === 0) e = Math.min(max, s + MIN_SPAN);
        else if (e === max) s = Math.max(0, e - MIN_SPAN);
        else { s = Math.max(0, Math.round((s + e) / 2 - MIN_SPAN / 2)); e = Math.min(max, s + MIN_SPAN); }
      }
      return [s, e];
    },
    [granularity],
  );

  // Геометрія plot-area AreaChart: YAxis width=50 + margin.left=0 зліва, margin.right=28 справа.
  const PLOT_LEFT = 50;
  const PLOT_RIGHT = 28;

  // Абсолютний (дробовий) індекс у source під заданою clientX з урахуванням поточного вікна [curS, curE].
  const clientXToAnchor = useCallback(
    (clientX: number, curS: number, curE: number): number => {
      const el = chartRef.current;
      if (!el) return (curS + curE) / 2;
      const rect = el.getBoundingClientRect();
      const plotWidth = rect.width - PLOT_LEFT - PLOT_RIGHT;
      if (plotWidth <= 0) return (curS + curE) / 2;
      const frac = Math.max(0, Math.min(1, (clientX - rect.left - PLOT_LEFT) / plotWidth));
      return curS + frac * (curE - curS);
    },
    [],
  );

  const handleWheel = useCallback(
    (ev: WheelEvent) => {
      ev.preventDefault();
      setZoomAnimating(true);
      if (zoomTimerRef.current != null) clearTimeout(zoomTimerRef.current);

      const shrink = ev.deltaY < 0;
      const source = granularity === 'day' ? dayChartData : forecastData.entries;
      const sourceLen = source.length;

      const [curS, curE] = visibleRangeRef.current;
      const span = curE - curS;
      const step = Math.max(1, Math.floor(span / 4));
      const newSpan = shrink ? span - 2 * step : span + 2 * step;

      // Точка під курсором лишається на своїй екранній позиції.
      const anchor = clientXToAnchor(ev.clientX, curS, curE);
      const leftRatio = span > 0 ? (anchor - curS) / span : 0.5;
      const [ns, ne] = clampRange(
        anchor - leftRatio * newSpan,
        anchor + (1 - leftRatio) * newSpan,
        sourceLen,
      );

      if (source[ns] && source[ne]) {
        setZoomKeysSafe([source[ns].key, source[ne].key]);
      }

      const actualSpan = ne - ns;
      if (granularity === 'month' && period !== 'all' && actualSpan <= 6 && actualSpan >= 0) {
        setGranularity('day');
      } else if (granularity === 'day' && actualSpan > 8) {
        setGranularity('month');
      }

      zoomTimerRef.current = setTimeout(() => {
        setZoomAnimating(false);
      }, 200);
    },
    [clampRange, granularity, period, dayChartData, forecastData.entries, setZoomKeysSafe, clientXToAnchor],
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
        pinchRef.current = { dist: Math.hypot(dx, dy), keys: [...zoomKeys] };
      }
    },
    [zoomKeys],
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
        const [origKeyS, origKeyE] = pinchRef.current.keys;

        const source = granularity === 'day' ? dayChartData : forecastData.entries;
        const sourceLen = source.length;
        const origS = keyToIndex(origKeyS, source);
        const origE = keyToIndex(origKeyE, source);
        if (origS === -1 || origE === -1) return;
        const origSpan = origE - origS;
        const newSpan = Math.round(origSpan / ratio);

        // Центр зуму — середина між двома пальцями, а не середина вікна.
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const anchor = clientXToAnchor(midX, origS, origE);
        const leftRatio = origSpan > 0 ? (anchor - origS) / origSpan : 0.5;
        const [ns, ne] = clampRange(
          anchor - leftRatio * newSpan,
          anchor + (1 - leftRatio) * newSpan,
          sourceLen,
        );

        if (source[ns] && source[ne]) {
          setZoomKeysSafe([source[ns].key, source[ne].key]);
        }

        const touchSpan = ne - ns;
        if (granularity === 'month' && period !== 'all' && touchSpan <= 6 && touchSpan >= 0) {
          setGranularity('day');
        } else if (granularity === 'day' && touchSpan > 8) {
          setGranularity('month');
        }

        zoomTimerRef.current = setTimeout(() => {
          setZoomAnimating(false);
        }, 200);
      }
    },
    [clampRange, granularity, period, dayChartData, forecastData.entries, keyToIndex, setZoomKeysSafe, clientXToAnchor],
  );

  const handleTouchEnd = useCallback(() => {
    pinchRef.current = null;
    if (zoomTimerRef.current != null) clearTimeout(zoomTimerRef.current);
    zoomTimerRef.current = setTimeout(() => {
      setZoomAnimating(false);
    }, 50);
  }, []);

  const handleChartClick = useCallback((data: { activePayload?: Array<{ payload: ChartEntry }> } | null) => {
    if (!data?.activePayload?.length) return;
    const entry = data.activePayload[0].payload;
    setSelectedEntryKey((prev) => prev === entry.key ? null : entry.key);
  }, []);

  const zoomedChartData = useMemo(() => {
    const source = granularity === 'day' ? dayChartData : forecastData.entries;
    if (source.length === 0) return [];
    const [s, e] = visibleRange;
    if (s <= 0 && e >= source.length - 1) return source;

    const startIdx = Math.max(0, s);
    const endIdx = Math.min(source.length - 1, e);
    const visibleSource = source.slice(startIdx, endIdx + 1);

    if (visibleSource.length <= 1) return visibleSource;

    const MIN_INTERPOLATED = 8;
    if (visibleSource.length >= MIN_INTERPOLATED) return visibleSource;

    const POINTS_BETWEEN = Math.max(1, Math.ceil((MIN_INTERPOLATED - visibleSource.length) / Math.max(1, visibleSource.length - 1)));
    const result: ChartEntry[] = [];

    for (let i = 0; i < visibleSource.length; i++) {
      const src = visibleSource[i];
      result.push({ ...src });

      if (i < visibleSource.length - 1) {
        const next = visibleSource[i + 1];
        for (let j = 1; j <= POINTS_BETWEEN; j++) {
          const t = j / (POINTS_BETWEEN + 1);
          const interp: ChartEntry = {
            key: `${src.key}__${next.key}__${j}`,
            year: src.year,
            month: src.month,
            day: src.day,
            label: `${src.label}~${next.label}`,
          };
          for (const k of Object.keys(src)) {
            if (['key', 'label', 'year', 'month', 'day'].includes(k)) continue;
            const a = Number(src[k]) || 0;
            const b = Number(next[k]) || 0;
            interp[k] = a + (b - a) * t;
          }
          result.push(interp);
        }
      }
    }

    return result;
  }, [dayChartData, forecastData.entries, visibleRange, granularity, activeLines, chartData.length]);

  const [subRange, setSubRange] = useState<[number, number] | null>(null);
  const [prevZoomedLength, setPrevZoomedLength] = useState(zoomedChartData.length);

  if (zoomedChartData.length !== prevZoomedLength) {
    setPrevZoomedLength(zoomedChartData.length);
    setSubRange(null);
  }

  const kpiRangeData = useMemo(() => {
    if (!subRange) return zoomedChartData;
    const [a, b] = subRange;
    return zoomedChartData.slice(a, b + 1);
  }, [zoomedChartData, subRange]);

  const subRangeKPIs = useMemo(() => {
    if (!subRange) return null;
    const keys = new Set(kpiRangeData.map((e) => e.key));
    let profit = 0;
    let revenue = 0;
    if (granularity === 'day' && rawDayData) {
      for (const row of rawDayData) {
        if (keys.has(row.date) && activeCities.has(row.cityName)) {
          profit += row.profit;
          revenue += row.revenue;
        }
      }
    } else {
      for (const row of filteredData) {
        const key = `${row.year}-${String(row.month).padStart(2, "0")}`;
        if (keys.has(key) && activeCities.has(row.cityName)) {
          profit += row.profit;
          revenue += row.revenue;
        }
      }
    }
    return { profit, revenue, expenses: Math.max(0, revenue - profit) };
  }, [subRange, kpiRangeData, granularity, rawDayData, filteredData, activeCities]);

  const compositeChartData = useMemo(() => {
    if (chartMode !== 'composite') return zoomedChartData;
    return zoomedChartData.map(entry => {
      const enriched = { ...entry };
      for (const line of activeLines) {
        const rv = (entry[`revenue_${line.key}`] as number) ?? 0;
        const pf = (entry[`profit_${line.key}`] as number) ?? 0;
        enriched[`expenses_${line.key}`] = Math.max(0, rv - pf);
      }
      return enriched;
    });
  }, [zoomedChartData, chartMode, activeLines]);

  const chartDataForRender = useMemo(() => {
    const base = chartMode === 'composite' ? compositeChartData : zoomedChartData;
    return base.map((entry) => ({
      ...entry,
      label: entry.day
        ? entry.label
        : formatAxisLabel(entry, base.length),
    }));
  }, [chartMode, compositeChartData, zoomedChartData]);

  const zoomSpan = chartDataForRender.length;
  const currentSource = granularity === 'day' ? dayChartData : forecastData.entries;
  const isZoomed = currentSource.length > 0 && (zoomKeys[0] !== currentSource[0]?.key || zoomKeys[1] !== currentSource[currentSource.length - 1]?.key);

  const lineStats = useMemo(() => {
    if (!showStats || activeLines.length === 0) return { stats: new Map<string, { avg: number; max: number; min: number; maxIdx: number; minIdx: number; maxLineIndex: number; maxCollisionGroup: number; minLineIndex: number; minCollisionGroup: number }>(), maxCollisions: new Map<number, number[]>(), minCollisions: new Map<number, number[]>() };
    const statsMap = new Map<string, { avg: number; max: number; min: number; maxIdx: number; minIdx: number; maxLineIndex: number; maxCollisionGroup: number; minLineIndex: number; minCollisionGroup: number }>();
    const maxGroups = new Map<number, number[]>();
    const minGroups = new Map<number, number[]>();
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
      if (!maxGroups.has(maxI)) maxGroups.set(maxI, []);
      maxGroups.get(maxI)!.push(line.key);
      if (!minGroups.has(minI)) minGroups.set(minI, []);
      minGroups.get(minI)!.push(line.key);
      statsMap.set(line.key, {
        avg: count > 0 ? sum / count : 0,
        max: max === -Infinity ? 0 : max,
        min: min === Infinity ? 0 : min,
        maxIdx: maxI,
        minIdx: minI,
        maxLineIndex: 0,
        maxCollisionGroup: 1,
        minLineIndex: 0,
        minCollisionGroup: 1,
      });
    }
    for (const [idx, keys] of maxGroups) {
      if (keys.length > 1) {
        for (let i = 0; i < keys.length; i++) {
          const s = statsMap.get(keys[i]);
          if (s) { s.maxLineIndex = i; s.maxCollisionGroup = keys.length; }
        }
      }
    }
    for (const [idx, keys] of minGroups) {
      if (keys.length > 1) {
        for (let i = 0; i < keys.length; i++) {
          const s = statsMap.get(keys[i]);
          if (s) { s.minLineIndex = i; s.minCollisionGroup = keys.length; }
        }
      }
    }
    return { stats: statsMap, maxCollisions: maxGroups, minCollisions: minGroups };
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

  const heatmapData = useMemo(() => {
    if (!rawCityMonthData || rawCityMonthData.length === 0) return null;
    const map = new Map<string, number>();
    const years = new Set<number>();
    for (const row of rawCityMonthData) {
      const y = Number(row.year);
      const m = Number(row.month);
      if (!activeCities.has(row.cityName)) continue;
      years.add(y);
      const k = `${y}-${m}`;
      map.set(k, (map.get(k) ?? 0) + row.profit);
    }
    if (years.size < 1) return null;
    const sortedYears = [...years].sort((a, b) => a - b);
    let maxAbs = 0;
    for (const v of map.values()) {
      const a = Math.abs(v);
      if (a > maxAbs) maxAbs = a;
    }
    const cells: { year: number; month: number; value: number; color: string }[] = [];
    for (const y of sortedYears) {
      for (let m = 1; m <= 12; m++) {
        const v = map.get(`${y}-${m}`) ?? 0;
        cells.push({ year: y, month: m, value: v, color: heatColor(v, maxAbs) });
      }
    }
    return { years: sortedYears, cells, maxAbs };
  }, [rawCityMonthData, activeCities]);

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

  const totalRevenue = useMemo(() => {
    let sum = 0;
    for (const row of filteredData) {
      if (activeCities.has(row.cityName)) sum += row.revenue;
    }
    return sum;
  }, [filteredData, activeCities]);

  const totalExpenses = useMemo(() => {
    let sum = 0;
    for (const row of filteredData) {
      if (activeCities.has(row.cityName)) sum += Math.max(0, row.revenue - row.profit);
    }
    return sum;
  }, [filteredData, activeCities]);

  const zoomedKPIs = useMemo(() => {
    if (!isZoomed) return null;
    const zoomedKeys = new Set(zoomedChartData.map((e) => e.key));
    let profit = 0;
    let revenue = 0;
    if (granularity === 'day' && rawDayData) {
      for (const row of rawDayData) {
        if (zoomedKeys.has(row.date) && activeCities.has(row.cityName)) {
          profit += row.profit;
          revenue += row.revenue;
        }
      }
    } else {
      for (const row of filteredData) {
        const key = `${row.year}-${String(row.month).padStart(2, "0")}`;
        if (zoomedKeys.has(key) && activeCities.has(row.cityName)) {
          profit += row.profit;
          revenue += row.revenue;
        }
      }
    }
    return { profit, revenue, expenses: Math.max(0, revenue - profit) };
  }, [isZoomed, zoomedChartData, granularity, rawDayData, filteredData, activeCities]);

  const selectedKPIs = useMemo(() => {
    if (!selectedEntryKey) return null;
    const source = granularity === 'day' ? rawDayData : filteredData;
    if (!source) return null;

    let profit = 0;
    let revenue = 0;

    if (granularity === 'day') {
      for (const row of source) {
        if (row.date === selectedEntryKey && activeCities.has(row.cityName)) {
          profit += row.profit;
          revenue += row.revenue;
        }
      }
    } else {
      for (const row of source) {
        const rowKey = `${row.year}-${String(row.month).padStart(2, "0")}`;
        if (rowKey === selectedEntryKey && activeCities.has(row.cityName)) {
          profit += row.profit;
          revenue += row.revenue;
        }
      }
    }

    return {
      profit,
      revenue,
      expenses: Math.max(0, revenue - profit),
    };
  }, [selectedEntryKey, granularity, rawDayData, filteredData, activeCities]);

  const tooltipDataRef = useRef<TooltipDataRef>({
    rawData: undefined,
    activeCities: new Set(),
    aggregateByCity: false,
    showAnomalies: false,
    anomalyMap: new Map(),
    zoomedChartEntryKeys: [],
    chartMode: 'profit',
    chartWidth: 0,
  });
  useEffect(() => {
    const cw = chartRef.current?.getBoundingClientRect().width ?? 0;
    tooltipDataRef.current = { rawData: rawCityMonthData, activeCities, aggregateByCity, showAnomalies, anomalyMap, zoomedChartEntryKeys: zoomedChartData.map((e) => e.key), chartMode, chartWidth: cw };
  });

  const TOOLTIP_WIDTH_ESTIMATE = 260;
  const TOOLTIP_MARGIN = 20;

  const renderTooltip = useCallback((props: RechartsTooltipProps) => {
    const { active, payload, label, coordinate } = props;
    const data = tooltipDataRef.current;
    if (!active || !payload?.length) return null;

    const entry = payload[0]?.payload;
    if (!entry) return null;

    const cx = coordinate?.x ?? 0;
    const cw = data.chartWidth;
    const flipLeft = cw > 0 && cx > cw - TOOLTIP_WIDTH_ESTIMATE - TOOLTIP_MARGIN;
    const flipStyle: React.CSSProperties = flipLeft
      ? { transform: "translateX(calc(-100% - 16px))" }
      : {};

    if (data.chartMode === 'composite') {
      const items = payload
        .filter((p) => (p.value ?? 0) !== 0)
        .reduce<Array<{ key: string; label: string; revenue: number; expenses: number; color: string }>>((acc, p) => {
          const dk = String(p.dataKey ?? '');
          const isRevenue = dk.startsWith('revenue_');
          const isExpenses = dk.startsWith('expenses_');
          if (!isRevenue && !isExpenses) return acc;
          const lineKey = dk.replace(/^revenue_/, '').replace(/^expenses_/, '');
          const existing = acc.find((a) => a.key === lineKey);
          if (existing) {
            if (isRevenue) existing.revenue = p.value as number;
            else existing.expenses = p.value as number;
          } else {
            acc.push({
              key: lineKey,
              label: (p.name as string) ?? lineKey,
              revenue: isRevenue ? (p.value as number) : 0,
              expenses: isExpenses ? (p.value as number) : 0,
              color: p.color ?? '',
            });
          }
          return acc;
        }, [])
        .sort((a, b) => b.revenue - a.revenue);

      return (
        <div className="backdrop-blur-xl bg-white/75 border border-white/40 rounded-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] px-3 py-2.5 text-xs max-w-[240px]" style={flipStyle}>
          <p className="font-medium text-content-primary mb-1.5 text-sm">{label}</p>
          {items.map((item, i) => (
            <div key={i} className={i > 0 ? "mt-1.5 pt-1.5 border-t border-black/5" : ""}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-content-primary truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 pl-4 py-0.5 text-content-secondary">
                <span>Дохід</span>
                <span className="ml-auto font-medium text-content-primary">{fmtMoney(item.revenue)}</span>
              </div>
              <div className="flex items-center gap-2 pl-4 py-0.5 text-content-secondary">
                <span>Витрати</span>
                <span className="ml-auto font-medium text-danger">{fmtMoney(item.expenses)}</span>
              </div>
              <div className="flex items-center gap-2 pl-4 py-0.5 text-content-secondary">
                <span>Прибуток</span>
                <span className={`ml-auto font-medium ${item.revenue - item.expenses >= 0 ? 'text-success' : 'text-danger'}`}>
                  {fmtMoney(item.revenue - item.expenses)}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

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
        <div className="backdrop-blur-xl bg-white/75 border border-white/40 rounded-xl shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] px-3 py-2.5 text-xs max-w-[240px]" style={flipStyle}>
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
      <div className="backdrop-blur-xl bg-white/75 border border-white/40 rounded-xl shadow-[0_8px_-4px_rgba(0,0,0,0.12)] px-3 py-2.5 text-xs" style={flipStyle}>
        <p className="font-medium text-content-primary mb-1.5 text-sm">{label}</p>
        {payload
          .filter((p) => (p.value ?? 0) !== 0 && !String(p.dataKey).startsWith("sma_") && !String(p.dataKey).startsWith("prevYear_") && !String(p.dataKey).startsWith("forecast_") && !String(p.dataKey).startsWith("revenue_"))
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


      {revenueLoading && !rawCityMonthData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <motion.div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5 transition-opacity ${revenueLoading ? 'opacity-60' : ''} ${isMobile ? 'stagger-container' : ''}`}
          variants={isMobile ? undefined : staggerContainer}
          initial={isMobile ? undefined : "hidden"}
          animate={isMobile ? undefined : "visible"}
        >
          <KPICard label={selectedKPIs ? "Дохід за період" : zoomedKPIs ? "Дохід за період" : "Загальний дохід"} value={fmtMoney(selectedKPIs?.revenue ?? subRangeKPIs?.revenue ?? zoomedKPIs?.revenue ?? totalRevenue)} color="text-brand" numericValue={selectedKPIs?.revenue ?? subRangeKPIs?.revenue ?? zoomedKPIs?.revenue ?? totalRevenue} />
          <KPICard label={selectedKPIs ? "Прибуток за період" : zoomedKPIs ? "Прибуток за період" : "Прибуток"} value={fmtMoney(selectedKPIs?.profit ?? subRangeKPIs?.profit ?? zoomedKPIs?.profit ?? totalProfit)} color="text-success" numericValue={selectedKPIs?.profit ?? subRangeKPIs?.profit ?? zoomedKPIs?.profit ?? totalProfit} />
          <KPICard label={selectedKPIs ? "Витрати за період" : zoomedKPIs ? "Витрати за період" : "Витрати"} value={selectedKPIs ? fmtMoney(selectedKPIs.expenses) : subRangeKPIs ? fmtMoney(subRangeKPIs.expenses) : zoomedKPIs ? fmtMoney(zoomedKPIs.expenses) : fmtMoney(totalExpenses)} color="text-danger" numericValue={selectedKPIs?.expenses ?? subRangeKPIs?.expenses ?? zoomedKPIs?.expenses ?? totalExpenses} />
        </motion.div>
      )}

      {revenueLoading && !rawCityMonthData ? (
        <ChartSkeleton />
      ) : (
        <div className={`mobile-card mb-5 transition-opacity ${revenueLoading ? 'opacity-60' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-content-primary text-sm">{chartMode === 'composite' ? 'Дохід vs Витрати' : 'Прибуток по місяцях'}</h3>
            <div className="hidden md:flex items-center gap-1.5">
              {chartMode === 'profit' && canForecast && (
                <button
                  onClick={() => setShowForecast((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showForecast
                      ? CHIP_COLORS.forecast.active
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showForecast ? CHIP_COLORS.forecast.dot : 'bg-content-muted'}`} />
                  Прогноз
                </button>
              )}
              {chartMode === 'profit' && activeLines.length > 0 && (
                <button
                  onClick={() => setShowTrend((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showTrend
                      ? CHIP_COLORS.trend.active
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showTrend ? CHIP_COLORS.trend.dot : 'bg-content-muted'}`} />
                  Тренд
                </button>
              )}
              {chartMode === 'profit' && activeLines.length > 0 && (
                <button
                  onClick={() => setShowStats((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showStats
                      ? CHIP_COLORS.stats.active
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showStats ? CHIP_COLORS.stats.dot : 'bg-content-muted'}`} />
                  Статистика
                </button>
              )}
              {chartMode === 'profit' && activeLines.length > 0 && period !== "all" && (
                <button
                  onClick={() => setShowYoY((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showYoY
                      ? CHIP_COLORS.yoy.active
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showYoY ? CHIP_COLORS.yoy.dot : 'bg-content-muted'}`} />
                  Рік/рік
                </button>
              )}
              {chartMode === 'profit' && activeLines.length > 0 && (
                <button
                  onClick={() => setShowAnomalies((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showAnomalies
                      ? CHIP_COLORS.anomalies.active
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showAnomalies ? CHIP_COLORS.anomalies.dot : 'bg-content-muted'}`} />
                  Аномалії
                </button>
              )}
              {chartMode === 'profit' && targets && targets.length > 0 && (
                <button
                  onClick={() => setShowTarget((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showTarget
                      ? CHIP_COLORS.target.active
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showTarget ? CHIP_COLORS.target.dot : 'bg-content-muted'}`} />
                  Ціль
                </button>
              )}
              {chartMode === 'profit' && activeLines.length > 0 && (
                <button
                  onClick={() => setShowRevenue((v) => !v)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border transition-[background-color,box-shadow,border-color] duration-200 ease-out hover:shadow-sm ${
                    showRevenue
                      ? CHIP_COLORS.revenue.active
                      : 'border-border-strong bg-surface text-content-secondary'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${showRevenue ? CHIP_COLORS.revenue.dot : 'bg-content-muted'}`} />
                  Дохід
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
              <div className="border-l border-border-strong/20 pl-1.5 ml-0.5">
                <div className="flex rounded-full border border-border-strong overflow-hidden text-[10px]">
                  <button
                    onClick={() => setChartMode('profit')}
                    className={`px-2.5 py-1 transition-[background-color,color] duration-200 ${
                      chartMode === 'profit' ? 'bg-surface shadow-sm text-content-primary' : 'text-content-secondary'
                    }`}
                  >
                    Прибуток
                  </button>
                  <button
                    onClick={() => setChartMode('composite')}
                    className={`px-2.5 py-1 transition-[background-color,color] duration-200 ${
                      chartMode === 'composite' ? 'bg-surface shadow-sm text-content-primary' : 'text-content-secondary'
                    }`}
                  >
                    Дохід vs Витрати
                  </button>
                </div>
              </div>
              {period !== 'all' && (
                <div className="border-l border-border-strong/20 pl-1.5 ml-0.5">
                  <div className="flex rounded-full border border-border-strong overflow-hidden text-[10px]">
                    <button
                      onClick={handleGranularityToggle}
                      className={`px-2.5 py-1 transition-[background-color,color] duration-200 ${
                        granularity === 'month' ? 'bg-surface shadow-sm text-content-primary' : 'text-content-secondary'
                      }`}
                    >
                      По місяцях
                    </button>
                    <button
                      onClick={handleGranularityToggle}
                      className={`px-2.5 py-1 transition-[background-color,color] duration-200 ${
                        granularity === 'day' ? 'bg-surface shadow-sm text-content-primary' : 'text-content-secondary'
                      }`}
                    >
                      По днях
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowMobileFilters((v) => !v)}
              className={`md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${
                showMobileFilters
                  ? 'border-brand/40 bg-brand/10 text-brand'
                  : 'border-border-strong bg-surface text-content-secondary'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Фільтри
              {[showForecast, showTrend, showStats, showYoY, showAnomalies, showTarget, showRevenue, aggregateByCity].filter(Boolean).length > 0 && (
                <span className="w-4 h-4 rounded-full bg-brand text-white text-[9px] font-bold flex items-center justify-center leading-none">
                  {[showForecast, showTrend, showStats, showYoY, showAnomalies, showTarget, showRevenue, aggregateByCity].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="md:hidden overflow-hidden mb-3"
              >
                <div className="bg-surface-subtle rounded-2xl border border-border p-4 space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-content-muted font-medium mb-2">Режим</p>
                    <div className="flex rounded-xl border border-border-strong overflow-hidden text-xs">
                      <button
                        onClick={() => setChartMode('profit')}
                        className={`flex-1 px-3 py-2 transition-[background-color,color] duration-200 ${
                          chartMode === 'profit' ? 'bg-surface shadow-sm text-content-primary font-medium' : 'text-content-secondary'
                        }`}
                      >
                        Прибуток
                      </button>
                      <button
                        onClick={() => setChartMode('composite')}
                        className={`flex-1 px-3 py-2 transition-[background-color,color] duration-200 ${
                          chartMode === 'composite' ? 'bg-surface shadow-sm text-content-primary font-medium' : 'text-content-secondary'
                        }`}
                      >
                        Дохід vs Витрати
                      </button>
                    </div>
                  </div>
                  {period !== 'all' && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-content-muted font-medium mb-2">Гранулярність</p>
                      <div className="flex rounded-xl border border-border-strong overflow-hidden text-xs">
                        <button
                          onClick={handleGranularityToggle}
                          className={`flex-1 px-3 py-2 transition-[background-color,color] duration-200 ${
                            granularity === 'month' ? 'bg-surface shadow-sm text-content-primary font-medium' : 'text-content-secondary'
                          }`}
                        >
                          По місяцях
                        </button>
                        <button
                          onClick={handleGranularityToggle}
                          className={`flex-1 px-3 py-2 transition-[background-color,color] duration-200 ${
                            granularity === 'day' ? 'bg-surface shadow-sm text-content-primary font-medium' : 'text-content-secondary'
                          }`}
                        >
                          По днях
                        </button>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-content-muted font-medium mb-2">Показати</p>
                    <div className="flex flex-wrap gap-2">
                      {chartMode === 'profit' && canForecast && (
                        <button onClick={() => setShowForecast((v) => !v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${showForecast ? CHIP_COLORS.forecast.active : 'border-border-strong bg-surface text-content-secondary'}`}>
                          <span className={`w-2 h-2 rounded-full ${showForecast ? CHIP_COLORS.forecast.dot : 'bg-content-muted'}`} />
                          Прогноз
                        </button>
                      )}
                      {chartMode === 'profit' && activeLines.length > 0 && (
                        <>
                          <button onClick={() => setShowTrend((v) => !v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${showTrend ? CHIP_COLORS.trend.active : 'border-border-strong bg-surface text-content-secondary'}`}>
                            <span className={`w-2 h-2 rounded-full ${showTrend ? CHIP_COLORS.trend.dot : 'bg-content-muted'}`} />
                            Тренд
                          </button>
                          <button onClick={() => setShowStats((v) => !v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${showStats ? CHIP_COLORS.stats.active : 'border-border-strong bg-surface text-content-secondary'}`}>
                            <span className={`w-2 h-2 rounded-full ${showStats ? CHIP_COLORS.stats.dot : 'bg-content-muted'}`} />
                            Статистика
                          </button>
                          <button onClick={() => setShowAnomalies((v) => !v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${showAnomalies ? CHIP_COLORS.anomalies.active : 'border-border-strong bg-surface text-content-secondary'}`}>
                            <span className={`w-2 h-2 rounded-full ${showAnomalies ? CHIP_COLORS.anomalies.dot : 'bg-content-muted'}`} />
                            Аномалії
                          </button>
                          <button onClick={() => setShowRevenue((v) => !v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${showRevenue ? CHIP_COLORS.revenue.active : 'border-border-strong bg-surface text-content-secondary'}`}>
                            <span className={`w-2 h-2 rounded-full ${showRevenue ? CHIP_COLORS.revenue.dot : 'bg-content-muted'}`} />
                            Дохід
                          </button>
                        </>
                      )}
                      {chartMode === 'profit' && activeLines.length > 0 && period !== "all" && (
                        <button onClick={() => setShowYoY((v) => !v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${showYoY ? CHIP_COLORS.yoy.active : 'border-border-strong bg-surface text-content-secondary'}`}>
                          <span className={`w-2 h-2 rounded-full ${showYoY ? CHIP_COLORS.yoy.dot : 'bg-content-muted'}`} />
                          Рік/рік
                        </button>
                      )}
                      {chartMode === 'profit' && targets && targets.length > 0 && (
                        <button onClick={() => setShowTarget((v) => !v)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${showTarget ? CHIP_COLORS.target.active : 'border-border-strong bg-surface text-content-secondary'}`}>
                          <span className={`w-2 h-2 rounded-full ${showTarget ? CHIP_COLORS.target.dot : 'bg-content-muted'}`} />
                          Ціль
                        </button>
                      )}
                      <button onClick={() => setAggregateByCity((v) => !v)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-border-strong bg-surface text-content-secondary transition-all duration-200">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: aggregateByCity ? "hsl(155, 68%, 42%)" : "hsl(217, 72%, 53%)" }} />
                        {aggregateByCity ? "По містах" : "По проєктах"}
                      </button>
                    </div>
                  </div>
                  {!aggregateByCity && projectNames.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-content-muted font-medium mb-2">Проєкти</p>
                      <div className="flex flex-wrap gap-2">
                        {projectNames.map((name, pi) => {
                          const active = activeProjects.has(name);
                          const color = CITY_COLORS[pi % CITY_COLORS.length];
                          return (
                            <button key={name} onClick={() => toggleProject(name)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${active ? 'border-border-strong bg-surface shadow-sm' : 'border-transparent bg-transparent text-content-muted'}`}>
                              <span className="w-2.5 h-2.5 rounded-full shrink-0 border" style={{ backgroundColor: active ? color : 'transparent', borderColor: color }} />
                              <span className="truncate max-w-[120px]">{name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {cityNames.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-content-muted font-medium mb-2">Міста</p>
                      <div className="flex flex-wrap gap-2">
                        {cityNames.map((name, ci) => {
                          const active = activeCities.has(name);
                          const cityColor = aggregateByCity ? CITY_COLORS[ci % CITY_COLORS.length] : '#64748b';
                          return (
                            <button key={name} onClick={() => toggleCity(name)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all duration-200 ${active ? 'border-border-strong bg-surface shadow-sm' : 'border-transparent bg-transparent text-content-muted'}`}>
                              <span className="w-2.5 h-2.5 rounded-full shrink-0 border" style={{ backgroundColor: active ? cityColor : 'transparent', borderColor: cityColor }} />
                              <span className="truncate max-w-[120px]">{name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {zoomedChartData.length === 0 ? (
            <ChartEmptyState text="Немає даних за цей період" />
          ) : (
            <>
              <div className="flex md:flex-row gap-3">
                <div className="hidden md:flex md:flex-col flex-wrap gap-1 shrink-0 pt-1">
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
                    className="touch-none overflow-visible"
                  >
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={chartDataForRender} margin={{ top: 8, right: 28, left: 0, bottom: 0 }} onClick={handleChartClick}>
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
                          {chartMode === 'composite' && activeLines.map((line) => (
                            <linearGradient key={`grad-rev-${line.key}`} id={`grad-rev-${line.key}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={line.color} stopOpacity={0.3} />
                              <stop offset="100%" stopColor={line.color} stopOpacity={0.05} />
                            </linearGradient>
                          ))}
                          {chartMode === 'composite' && activeLines.map((line) => (
                            <linearGradient key={`grad-exp-${line.key}`} id={`grad-exp-${line.key}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.25} />
                              <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
                            </linearGradient>
                          ))}
                        </defs>
                        <CartesianGrid vertical={false} stroke="#f1f5f9" />
                        <XAxis
                          type="category"
                          dataKey="label"
                          tick={{ fontSize: 11, fill: "#64748b" }}
                          axisLine={{ stroke: "#e2e8f0" }}
                          tickLine={false}
                          interval={granularity === 'day'
                            ? (zoomSpan > 90 ? 28 : zoomSpan > 60 ? 14 : zoomSpan > 30 ? 7 : zoomSpan > 14 ? 3 : 0)
                            : (zoomSpan > 36 ? 5 : zoomSpan > 24 ? 3 : zoomSpan > 12 ? 1 : 0)}
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
                          wrapperStyle={{ zIndex: 50 }}
                        />
                        {chartMode === 'profit' ? activeLines.map((line) => {
                          const stats = lineStats.stats.get(line.key);
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
                                lineIndex={props.index === stats.maxIdx ? stats.maxLineIndex : stats.minLineIndex}
                                collisionGroup={props.index === stats.maxIdx ? stats.maxCollisionGroup : stats.minCollisionGroup}
                                isMobile={isMobile}
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
                                  isMobile={isMobile}
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
                        }) : (
                          <>
                            {activeLines.map((line) => (
                              <Area
                                key={`rv_${line.key}`}
                                type="monotone"
                                dataKey={`revenue_${line.key}`}
                                stroke={line.color}
                                fill={`url(#grad-rev-${line.key})`}
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                connectNulls={true}
                                dot={zoomSpan <= 12 ? { r: 2.5, fill: line.color, strokeWidth: 0 } : false}
                                activeDot={<CustomActiveDot color={line.color} />}
                                name={`${line.label} (дохід)`}
                                isAnimationActive={!zoomAnimating}
                                animationDuration={1000}
                                animationEasing="ease-out"
                              />
                            ))}
                            {activeLines.map((line) => (
                              <Area
                                key={`exp_${line.key}`}
                                type="monotone"
                                dataKey={`expenses_${line.key}`}
                                stroke="#ef4444"
                                fill={`url(#grad-exp-${line.key})`}
                                strokeWidth={1.5}
                                strokeDasharray="4 2"
                                strokeLinecap="round"
                                connectNulls={true}
                                dot={zoomSpan <= 12 ? { r: 2.5, fill: "#ef4444", strokeWidth: 0 } : false}
                                activeDot={<CustomActiveDot color="#ef4444" />}
                                name={`${line.label} (витрати)`}
                                isAnimationActive={!zoomAnimating}
                                animationDuration={1000}
                                animationEasing="ease-out"
                              />
                            ))}
                          </>
                        )}
                        {showRevenue && activeLines.map((line) => (
                          <Bar
                            key={`rv_${line.key}`}
                            dataKey={`revenue_${line.key}`}
                            fill={line.color}
                            opacity={0.15}
                            radius={[2, 2, 0, 0]}
                            isAnimationActive={!zoomAnimating}
                            name={`${line.label} (дохід)`}
                          />
                        ))}
                        {showStats && activeLines.map((line) => {
                          const stats = lineStats.stats.get(line.key);
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
                            x={chartDataForRender[Math.min(forecastData.forecastStartIndex, chartDataForRender.length - 1)]?.label}
                            stroke="#94a3b8"
                            strokeDasharray="3 3"
                            label={{ value: "Прогноз →", position: "insideTopRight", fontSize: 10, fill: "#94a3b8" }}
                          />
                        )}
                        {showForecast && activeLines.map((line) => {
                          const insufficient = forecastData.insufficientLines.has(line.key);
                          return (
                          <Line
                            key={`forecast_${line.key}`}
                            type="monotone"
                            dataKey={`forecast_${line.key}`}
                            stroke={line.color}
                            strokeWidth={2}
                            strokeDasharray="2 6"
                            dot={false}
                            connectNulls
                            opacity={insufficient ? 0.2 : 0.65}
                            isAnimationActive={false}
                            name={insufficient ? `${line.label} (недостатньо даних)` : `${line.label} (прогноз)`}
                          />
                          );
                        })}
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
                        {annotations?.map((a) => {
                          const entry = chartDataForRender.find((e) => e.month === a.month);
                          if (!entry) return null;
                          return (
                            <ReferenceDot
                              key={`ann_${a.month}`}
                              x={entry.label}
                              y={0}
                              r={5}
                              fill={a.color}
                              stroke="white"
                              strokeWidth={2}
                            >
                              <Label
                                value={a.text}
                                position="bottom"
                                offset={10}
                                fontSize={9}
                                fill={a.color}
                                fontWeight={600}
                              />
                            </ReferenceDot>
                          );
                        })}
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
                  {zoomedChartData.length > 2 && (
                    <div className="pt-2">
                      <div className="relative h-8 select-none" style={{ marginLeft: 50, marginRight: 28 }}>
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full h-[3px] rounded-full bg-border-strong" />
                          <div
                            className="absolute h-[3px] rounded-full bg-brand"
                            style={{
                              left: `${((subRange ? subRange[0] : 0) / (zoomedChartData.length - 1)) * 100}%`,
                              width: `${(((subRange ? subRange[1] : zoomedChartData.length - 1) - (subRange ? subRange[0] : 0)) / (zoomedChartData.length - 1)) * 100}%`,
                            }}
                          />
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={zoomedChartData.length - 1}
                          step={1}
                          value={subRange ? subRange[0] : 0}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            const end = subRange ? subRange[1] : zoomedChartData.length - 1;
                            setSubRange(v <= end ? [v, end] : [v, v]);
                          }}
                          aria-label="Початок діапазону"
                          className="subrange-input"
                        />
                        <input
                          type="range"
                          min={0}
                          max={zoomedChartData.length - 1}
                          step={1}
                          value={subRange ? subRange[1] : zoomedChartData.length - 1}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            const start = subRange ? subRange[0] : 0;
                            setSubRange(v >= start ? [start, v] : [v, v]);
                          }}
                          aria-label="Кінець діапазону"
                          className="subrange-input"
                        />
                      </div>
                      <div className="flex justify-between" style={{ marginLeft: 50, marginRight: 28 }}>
                        <span className="text-[9px] text-content-muted truncate max-w-[45%]">
                          {zoomedChartData[subRange ? subRange[0] : 0]?.label}
                        </span>
                        <span className="text-[9px] text-content-muted truncate max-w-[45%] text-right">
                          {zoomedChartData[subRange ? subRange[1] : zoomedChartData.length - 1]?.label}
                        </span>
                      </div>
                      {subRange !== null && (
                        <div className="flex justify-end mt-1">
                          <button
                            onClick={() => setSubRange(null)}
                            className="text-[10px] text-content-muted hover:text-content-secondary transition px-1"
                          >
                            Скинути
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {(isZoomed || selectedEntryKey) && (
                    <button
                      onClick={() => {
                        const entries = granularity === 'day' ? dayChartData : forecastData.entries;
                        if (entries.length > 0) {
                          setZoomKeysSafe([entries[0].key, entries[entries.length - 1].key]);
                        }
                        setSelectedEntryKey(null);
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

      {heatmapData && heatmapData.years.length >= 2 && (
        <div className="mobile-card mb-5">
          <h3 className="font-bold text-content-primary mb-3 text-sm">Сезонність</h3>
          <div className="overflow-x-auto -mx-1 px-1">
            <div
              className="grid gap-[3px] min-w-[480px]"
              style={{ gridTemplateColumns: `48px repeat(12, 1fr)` }}
            >
              <div />
              {UA_MONTHS.map((m) => (
                <div key={m} className="text-[9px] text-content-muted font-medium text-center leading-none pb-1">
                  {m}
                </div>
              ))}
              {heatmapData.years.slice().reverse().map((year) =>
                UA_MONTHS.map((_, mi) => {
                  const cell = heatmapData.cells.find((c) => c.year === year && c.month === mi + 1);
                  if (!cell) return <div key={`${year}-${mi}`} className="h-8 rounded" />;
                  return (
                    <div
                      key={`${year}-${mi}`}
                      className="h-8 rounded flex items-center justify-center text-[9px] font-medium leading-none cursor-default transition-transform duration-150 hover:scale-110 hover:z-10"
                      style={{ backgroundColor: cell.color }}
                      title={`${UA_MONTHS_FULL[mi]} ${year}: ${fmtMoney(cell.value)}`}
                    >
                      {cell.value !== 0 && (
                        <span className={Math.abs(cell.value) > heatmapData.maxAbs * 0.5 ? "text-white/90" : "text-content-secondary"}>
                          {cell.value >= 0 ? "+" : ""}{cell.value >= 10000 || cell.value <= -10000 ? `${Math.round(cell.value / 1000)}k` : Math.round(cell.value)}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-2.5">
            <span className="text-[9px] text-content-muted">Мін</span>
            <div className="flex h-2 rounded-full overflow-hidden w-24">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: heatColor(((i - 5) / 5) * heatmapData.maxAbs, heatmapData.maxAbs) }} />
              ))}
            </div>
            <span className="text-[9px] text-content-muted">Макс</span>
          </div>
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

function KPICard({ label, value, color, numericValue, format = 'money' }: { label: string; value: string; color: string; numericValue?: number; format?: 'money' | 'percent' }) {
  const display = useCountUp(numericValue ?? 0, { duration: 0.9, enabled: numericValue !== undefined });
  const formatted = numericValue !== undefined ? (format === 'percent' ? `${Math.round(display)}%` : fmtMoney(display)) : value;
  return (
    <motion.div className="mobile-card" variants={staggerItem} whileTap={{ scale: 0.97 }} transition={TRANSITION.tap}>
      <p className={`text-2xs font-medium ${color} mb-1.5`}>{label}</p>
      <p className={`text-2xl font-bold leading-none ${color}`}>{formatted}</p>
    </motion.div>
  );
}
