import React, { useMemo, memo } from "react";
import { motion } from "framer-motion";
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
import type {
  FinanceDashboardData,
  MonthlyFinance,
  FinanceByProject,
  FinanceByCategory,
  FinanceTopSchool,
  FinanceEventItem,
} from "../../types";
import { fmtAmount as fmt, calcProjectTotals, calcBarPercent } from "../../utils/financeCalculations";
import { staggerContainer, staggerItem, useCountUp, TRANSITION } from "../../lib/motion";

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

interface KpiCardProps {
  title: string;
  value: number;
  color: string;
  bg: string;
  icon: React.ReactNode;
  subtitle?: string;
}

const KpiCard = memo(function KpiCard({
  title,
  value,
  color,
  bg,
  icon,
  subtitle,
}: KpiCardProps) {
  const display = useCountUp(value, { duration: 0.9 });
  return (
    <motion.div
      className="bg-white rounded-[24px] p-5 border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
      variants={staggerItem}
      whileTap={{ scale: 0.97 }}
      transition={TRANSITION.tap}
    >
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs sm:text-sm font-semibold text-content-muted leading-tight pr-2">
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
          {fmt(display)}{" "}
          <span className="text-sm font-bold text-content-muted opacity-60">
            грн
          </span>
        </p>
        {subtitle && (
          <p className="text-[11px] sm:text-xs text-content-muted mt-1.5 font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
});

const EmptyState = memo(function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-content-muted">
      <span className="text-3xl mb-3 opacity-50">📂</span>
      <span className="text-sm font-medium">Немає даних за цей період</span>
    </div>
  );
});

const EventTable = memo(function EventTable({
  events,
  positive,
}: {
  events: FinanceEventItem[];
  positive: boolean;
}) {
  if (!events || !events.length) return <EmptyState />;
  return (
    <table className="w-full text-sm min-w-[300px]">
      <thead>
        <tr className="text-content-muted text-xs uppercase border-b border-border">
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
        {events.map((e: FinanceEventItem, i: number) => (
          <tr
            key={i}
            className="border-b border-border hover:bg-surface-muted/50 transition-colors"
          >
            <td className="py-3 text-content-muted whitespace-nowrap">
              {new Date(e.date).toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
              })}
            </td>
            <td className="py-3 font-medium text-content-secondary truncate max-w-[120px] sm:max-w-[200px] pr-2">
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

interface TooltipPayload {
  name?: string;
  value?: number;
  color?: string;
}

const CustomTooltip = memo(function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/90 md:backdrop-blur-md border border-border p-4 rounded-2xl shadow-xl text-sm min-w-[160px]">
      <p className="font-bold text-content-primary mb-3 border-b border-border pb-2">
        {label}
      </p>
      {payload.map((entry: TooltipPayload, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 mb-1.5 last:mb-0"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-content-muted">{entry.name}:</span>
          </div>
          <span className="font-bold text-content-primary">
            {fmt(entry.value)} грн
          </span>
        </div>
      ))}
    </div>
  );
});


const RevenueChart = memo(function RevenueChart({
  monthly,
}: {
  monthly: MonthlyFinance[];
}) {
  if (!monthly?.length) return <EmptyState />;
  const data = monthly.slice(-12);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
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
          allowEscapeViewBox={{ x: true, y: true }}
        />
        <Area
          type="monotone"
          name="Виручка"
          dataKey="revenue"
          stroke="#3b82f6"
          strokeWidth={3}
          fill="url(#colorRevenue)"
          activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-out"
        />
        <Area
          type="monotone"
          name="Прибуток"
          dataKey="profit"
          stroke="#10b981"
          strokeWidth={3}
          fill="url(#colorProfit)"
          activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});

const ProjectPieChart = memo(function ProjectPieChart({
  byProject,
  projectTotals,
}: {
  byProject: FinanceByProject[];
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
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {byProject.map((_: FinanceByProject, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} allowEscapeViewBox={{ x: true, y: true }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {byProject.map((item: FinanceByProject, idx: number) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
              />
              <span className="text-content-secondary truncate font-medium">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-content-muted font-medium w-8 text-right">
                {projectTotals.percents[idx]}%
              </span>
              <span className="font-bold text-content-primary w-20 text-right">
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
  byExpenseCategory: FinanceByCategory[];
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} allowEscapeViewBox={{ x: true, y: true }} />
          <Bar
            dataKey="value"
            name="Сума"
            fill="#f43f5e"
            radius={[0, 8, 8, 0]}
            barSize={20}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {byExpenseCategory.map((_: FinanceByCategory, idx: number) => (
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
  topSchools: FinanceTopSchool[];
}) {
  if (!topSchools?.length) return <EmptyState />;
  const maxRev = topSchools[0].revenue;
  return (
    <div className="space-y-5">
      {topSchools.map((school: FinanceTopSchool, idx: number) => {
        const percent = calcBarPercent(school.revenue, maxRev);
        return (
          <div key={idx} className="relative">
            <div className="flex justify-between items-end mb-2 text-sm">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <span className="font-bold text-content-muted w-4">{idx + 1}.</span>
                <span className="font-bold text-content-secondary truncate">
                  {school.name}
                </span>
              </div>
              <span className="font-bold text-emerald-600 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md">
                {fmt(school.revenue)} грн
              </span>
            </div>
            <div className="w-full bg-surface-muted h-2 rounded-full overflow-hidden">
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


interface Props {
  data: FinanceDashboardData;
  period: string;
  setPeriod: (v: string) => void;
  projectFilter: string;
  setProjectFilter: (v: string) => void;
  selectedCity: { id: string; name: string };
}


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

  const projectTotals = useMemo(() => calcProjectTotals(byProject ?? []), [byProject]);

  return (
    <div className="p-4 md:p-8 bg-surface-muted min-h-screen font-sans overflow-x-hidden">
      {/* Шапка та фільтри */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-content-primary tracking-tight">
            Фінанси
          </h1>
          <p className="text-content-muted text-sm mt-1">
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
            className="bg-white border border-border-strong text-content-secondary text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
          >
            <option value="all">За весь час</option>
            <option value="year">Цей рік</option>
            <option value="quarter">Цей квартал</option>
            <option value="month">Цей місяць</option>
          </select>

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="bg-white border border-border-strong text-content-secondary text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
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
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
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
      </motion.div>

      {/* Верхній ряд графіків */}
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white rounded-[24px] shadow-sm border border-border p-5 md:p-7 xl:col-span-2">
          <h3 className="text-lg font-bold text-content-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-surface-muted flex items-center justify-center text-lg">
              📊
            </span>
            Динаміка виручки та прибутку
          </h3>
          <div className="h-[280px] md:h-[320px] w-full -ml-4 sm:ml-0">
            <RevenueChart monthly={monthly} />
          </div>
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-border p-5 md:p-7 flex flex-col">
          <h3 className="text-lg font-bold text-content-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-surface-muted flex items-center justify-center text-lg">
              🎯
            </span>
            Доходи за проєктами
          </h3>
          <ProjectPieChart
            byProject={byProject}
            projectTotals={projectTotals}
          />
        </div>
      </motion.div>

      {/* Нижній ряд */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white rounded-[24px] shadow-sm border border-border p-5 md:p-7 overflow-x-auto">
          <h3 className="text-lg font-bold text-content-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-surface-muted flex items-center justify-center text-lg">
              💳
            </span>
            Статті витрат
          </h3>
          <ExpenseChart byExpenseCategory={byExpenseCategory} />
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-border p-5 md:p-7">
          <h3 className="text-lg font-bold text-content-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-surface-muted flex items-center justify-center text-lg">
              🏫
            </span>
            Топ-5 найприбутковіших закладів
          </h3>
          <TopSchools topSchools={topSchools} />
        </div>
      </motion.div>

      {/* Найкращі і найгірші події */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white rounded-[24px] shadow-sm border border-border p-5 md:p-7 overflow-x-auto">
          <h3 className="text-lg font-bold text-content-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-surface-muted flex items-center justify-center text-lg">
              🏆
            </span>
            Найприбутковіші події
          </h3>
          <EventTable events={topEvents} positive={true} />
        </div>
        <div className="bg-white rounded-[24px] shadow-sm border border-border p-5 md:p-7 overflow-x-auto">
          <h3 className="text-lg font-bold text-content-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-surface-muted flex items-center justify-center text-lg">
              ⚠️
            </span>
            Найменш прибуткові події
          </h3>
          <EventTable events={worstEvents} positive={false} />
        </div>
      </motion.div>
    </div>
  );
});

export { ExpenseChart };
