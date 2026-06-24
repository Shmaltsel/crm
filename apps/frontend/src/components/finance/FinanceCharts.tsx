import React, { useMemo, memo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const PALETTE = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];
const PIE_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f59e0b",
  "#10b981",
  "#0ea5e9",
];

// Виносимо fmt поза компонент — це чиста функція, не потребує useMemo
const fmt = (n: number) =>
  new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));

// ─── Допоміжні компоненти — всі в memo ──────────────────────────────────────

const KpiCard = memo(function KpiCard({
  title,
  value,
  color,
  bg,
  icon,
  subtitle,
}: any) {
  return (
    <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-tight pr-2">
          {title}
        </p>
        <div
          className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center text-xl shadow-sm ${bg}`}
        >
          {icon}
        </div>
      </div>
      <div>
        <p
          className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${color}`}
        >
          {fmt(value)}{" "}
          <span className="text-sm font-bold text-slate-400 opacity-60">
            грн
          </span>
        </p>
        {subtitle && (
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
});

const EmptyState = memo(function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-slate-400">
      <span className="text-3xl mb-3 opacity-50">📂</span>
      <span className="text-sm font-medium">Немає даних за цей період</span>
    </div>
  );
});

const EventTable = memo(function EventTable({
  events,
  positive,
}: {
  events: any[];
  positive: boolean;
}) {
  if (!events || !events.length) return <EmptyState />;
  return (
    <table className="w-full text-sm min-w-[300px]">
      <thead>
        <tr className="text-slate-400 text-xs uppercase border-b border-slate-50">
          <th className="text-left pb-3 font-semibold tracking-wider">Дата</th>
          <th className="text-left pb-3 font-semibold tracking-wider">
            Заклад
          </th>
          <th className="text-right pb-3 font-semibold tracking-wider">
            Прибуток
          </th>
        </tr>
      </thead>
      <tbody>
        {events.map((e: any, i: number) => (
          <tr
            key={i}
            className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
          >
            <td className="py-3 text-slate-500 whitespace-nowrap">
              {new Date(e.date).toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
              })}
            </td>
            <td className="py-3 font-medium text-slate-700 truncate max-w-[120px] sm:max-w-[200px] pr-2">
              {e.school}
            </td>
            <td
              className={`py-3 text-right font-bold whitespace-nowrap ${
                positive ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              {fmt(e.profit)} грн
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

const CustomTooltip = memo(function CustomTooltip({
  active,
  payload,
  label,
}: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-xl text-sm min-w-[160px]">
      <p className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
        {label}
      </p>
      {payload.map((entry: any, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 mb-1.5 last:mb-0"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-500">{entry.name}:</span>
          </div>
          <span className="font-bold text-slate-800">
            {fmt(entry.value)} грн
          </span>
        </div>
      ))}
    </div>
  );
});

// ─── Підкомпоненти графіків — кожен в memo ───────────────────────────────────

const RevenueChart = memo(function RevenueChart({
  monthly,
}: {
  monthly: any[];
}) {
  if (!monthly?.length) return <EmptyState />;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={monthly}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f1f5f9"
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={false}
          tickLine={false}
          dy={10}
          minTickGap={20}
        />
        <YAxis
          tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)}
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "4 4" }}
        />
        <Area
          type="monotone"
          name="Виручка"
          dataKey="revenue"
          stroke="#3b82f6"
          strokeWidth={3}
          fill="url(#colorRevenue)"
          activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
        />
        <Area
          type="monotone"
          name="Прибуток"
          dataKey="profit"
          stroke="#10b981"
          strokeWidth={3}
          fill="url(#colorProfit)"
          activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});

const ProjectPieChart = memo(function ProjectPieChart({
  byProject,
  projectTotals,
}: {
  byProject: any[];
  projectTotals: { total: number; percents: number[] };
}) {
  if (!byProject?.length) return <EmptyState />;
  return (
    <>
      <div className="h-[200px] md:h-[220px] w-full relative mb-6 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={byProject}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              stroke="none"
            >
              {byProject.map((_: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {byProject.map((item: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
              />
              <span className="text-slate-600 truncate font-medium">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-400 font-medium w-8 text-right">
                {projectTotals.percents[idx]}%
              </span>
              <span className="font-bold text-slate-800 w-20 text-right">
                {fmt(item.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

const ExpenseChart = memo(function ExpenseChart({
  byExpenseCategory,
}: {
  byExpenseCategory: any[];
}) {
  if (!byExpenseCategory?.length) return <EmptyState />;
  return (
    <div className="h-[280px] w-full min-w-[300px] -ml-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={byExpenseCategory}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 30, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }}
            width={120}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
          <Bar
            dataKey="value"
            name="Сума"
            fill="#f43f5e"
            radius={[0, 8, 8, 0]}
            barSize={20}
          >
            {byExpenseCategory.map((_: any, idx: number) => (
              <Cell key={`cell-${idx}`} fill={PALETTE[idx % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

const TopSchools = memo(function TopSchools({
  topSchools,
}: {
  topSchools: any[];
}) {
  if (!topSchools?.length) return <EmptyState />;
  const maxRev = topSchools[0].revenue;
  return (
    <div className="space-y-5">
      {topSchools.map((school: any, idx: number) => {
        const percent = Math.max((school.revenue / maxRev) * 100, 2);
        return (
          <div key={idx} className="relative">
            <div className="flex justify-between items-end mb-2 text-sm">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <span className="font-bold text-slate-400 w-4">{idx + 1}.</span>
                <span className="font-bold text-slate-700 truncate">
                  {school.name}
                </span>
              </div>
              <span className="font-bold text-emerald-600 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md">
                {fmt(school.revenue)} грн
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});

// ─── Пропси FinanceCharts ────────────────────────────────────────────────────

interface Props {
  data: any;
  period: string;
  setPeriod: (v: string) => void;
  projectFilter: string;
  setProjectFilter: (v: string) => void;
  selectedCity: any;
}

// ─── Головний компонент ──────────────────────────────────────────────────────

export default memo(function FinanceCharts({
  data,
  period,
  setPeriod,
  projectFilter,
  setProjectFilter,
  selectedCity,
}: Props) {
  const {
    kpi,
    monthly,
    byProject,
    byExpenseCategory,
    topSchools,
    topEvents,
    worstEvents,
    expectedRevenue,
    filters,
  } = data;

  // useMemo — відсотки для pie chart, щоб не рахувати total в кожній ітерації рендеру
  const projectTotals = useMemo(() => {
    const total =
      byProject?.reduce((sum: number, p: any) => sum + p.value, 0) ?? 0;
    const percents = (byProject ?? []).map((item: any) =>
      total > 0 ? Math.round((item.value / total) * 100) : 0,
    );
    return { total, percents };
  }, [byProject]);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      {/* Шапка та фільтри */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            Фінанси
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Аналітика доходів та витрат{" "}
            {selectedCity.id ? (
              <span className="font-medium text-blue-600">
                {selectedCity.name}
              </span>
            ) : (
              "по всіх містах"
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
          >
            <option value="all">За весь час</option>
            <option value="year">Цей рік</option>
            <option value="quarter">Цей квартал</option>
            <option value="month">Цей місяць</option>
          </select>

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
          >
            <option value="">Всі проєкти</option>
            {filters?.projects?.map((p: string) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Картки */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
        <KpiCard
          title="Загальна виручка"
          value={kpi.totalRevenue}
          color="text-blue-600"
          bg="bg-blue-50"
          icon="💰"
        />
        <KpiCard
          title="Чистий прибуток"
          value={kpi.totalProfit}
          color="text-emerald-600"
          bg="bg-emerald-50"
          icon="📈"
        />
        <KpiCard
          title="Витрати"
          value={kpi.totalExpenses}
          color="text-rose-600"
          bg="bg-rose-50"
          icon="📉"
        />
        <KpiCard
          title="Очікувана виручка"
          value={expectedRevenue}
          color="text-amber-500"
          bg="bg-amber-50"
          icon="⏳"
          subtitle="Із запланованих подій"
        />
      </div>

      {/* Верхній ряд графіків */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 xl:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              📊
            </span>
            Динаміка виручки та прибутку
          </h3>
          <div className="h-[280px] md:h-[320px] w-full -ml-4 sm:ml-0">
            <RevenueChart monthly={monthly} />
          </div>
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              🎯
            </span>
            Доходи за проєктами
          </h3>
          <ProjectPieChart
            byProject={byProject}
            projectTotals={projectTotals}
          />
        </div>
      </div>

      {/* Нижній ряд */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              💳
            </span>
            Статті витрат
          </h3>
          <ExpenseChart byExpenseCategory={byExpenseCategory} />
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              🏫
            </span>
            Топ-5 найприбутковіших закладів
          </h3>
          <TopSchools topSchools={topSchools} />
        </div>
      </div>

      {/* Найкращі і найгірші події */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              🏆
            </span>
            Найприбутковіші події
          </h3>
          <EventTable events={topEvents} positive={true} />
        </div>
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              ⚠️
            </span>
            Найменш прибуткові події
          </h3>
          <EventTable events={worstEvents} positive={false} />
        </div>
      </div>
    </div>
  );
});
