import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCities } from "../hooks/useCities";
import {
  useRevenueByMonth,
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

const UA_MONTHS = [
  "Січ", "Лют", "Бер", "Кві", "Трав", "Чер",
  "Лип", "Сер", "Вер", "Жов", "Лис", "Гру",
];

function fmtMoney(n: number): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
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

function EmptyState({ text }: { text: string }) {
  return (
    <div className="h-[280px] flex flex-col items-center justify-center text-content-muted">
      <span className="text-2xl mb-2">📊</span>
      <span className="text-sm text-content-muted">{text}</span>
    </div>
  );
}

export default function Analytics() {
  const { user } = useAuth();
  const isSuper = user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const [year, setYear] = useState(currentYear);
  const [cityId, setCityId] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  const { data: cities } = useCities();
  const { data: revenueData, isLoading: revenueLoading } = useRevenueByMonth({
    cityId: cityId || undefined,
    projectId: projectId || undefined,
    year,
  });
  const { data: eventsByCity, isLoading: eventsLoading } = useEventsByCity({ year });
  const { data: salaryFund } = useSalaryFund({ year, cityId: cityId || undefined });
  const { data: roi } = useRoi({ cityId: cityId || undefined, year });

  const totalRevenue = revenueData?.reduce((s, m) => s + m.revenue, 0) ?? 0;
  const totalProfit = revenueData?.reduce((s, m) => s + m.profit, 0) ?? 0;

  const chartData = (revenueData ?? []).map((m) => ({
    ...m,
    label: UA_MONTHS[Number(m.month) - 1] || m.month,
  }));

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

        {isSuper && (
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="px-3 py-2.5 bg-surface border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand min-h-[44px]"
          >
            <option value="">Всі міста</option>
            {cities?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Проєкт (фільтр)"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="px-3 py-2.5 bg-surface border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand w-48 min-h-[44px]"
        />
      </div>

      {revenueLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <KPICard label="Загальний дохід" value={fmtMoney(totalRevenue)} color="text-brand" />
          <KPICard label="Прибуток" value={fmtMoney(totalProfit)} color="text-success" />
          <KPICard label="ROI" value={roi ? `${roi.roi}%` : "—"} color="text-purple-600" />
          <KPICard label="Витрати на ЗП" value={fmtMoney(salaryFund?.total ?? 0)} color="text-danger" />
        </div>
      )}

      {revenueLoading ? (
        <ChartSkeleton />
      ) : (
        <div className="mobile-card mb-5">
          <h3 className="font-bold text-content-primary mb-3 text-sm">Дохід по місяцях</h3>
          {chartData.length === 0 ? (
            <EmptyState text="Немає даних за цей період" />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={50} tickFormatter={(v: number) => v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`} />
                <Tooltip
                  formatter={(v: number) => [fmtMoney(v), ""]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ r: 3, fill: "#2563eb" }} name="Дохід" />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: "#10b981" }} name="Прибуток" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {isSuper && (
        eventsLoading ? (
          <ChartSkeleton />
        ) : (
          <div className="mobile-card">
            <h3 className="font-bold text-content-primary mb-3 text-sm">Події по містах</h3>
            {!eventsByCity || eventsByCity.length === 0 ? (
              <EmptyState text="Немає подій за цей рік" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={eventsByCity} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="cityName" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={30} allowDecimals={false} />
                  <Tooltip
                    formatter={(v: number) => [v, "Подій"]}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                  />
                  <Bar dataKey="events" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={48} />
                </BarChart>
              </ResponsiveContainer>
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
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
    </div>
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
    <div className="mobile-card">
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
    </div>
  );
}

function KPICard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="mobile-card">
      <p className={`text-2xs font-medium ${color} mb-1.5`}>{label}</p>
      <p className={`text-2xl font-bold leading-none ${color}`}>{value}</p>
    </div>
  );
}
