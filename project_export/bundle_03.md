# FILE: apps/frontend/src/components/ErrorBoundary.tsx

```
import React from "react";
import * as Sentry from "@sentry/react";
import { motion } from "framer-motion";
import { scaleVariants, shakeVariants, TRANSITION } from "../lib/motion";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <motion.div
            variants={scaleVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md w-full bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 text-center"
          >
            <motion.div
              variants={shakeVariants}
              animate="shake"
              className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4 text-3xl"
            >
              ⚠️
            </motion.div>
            <h1 className="text-xl font-bold text-slate-800 mb-2">
              Щось пішло не так
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              Сталася неочікувана помилка. Спробуйте оновити сторінку — якщо
              проблема повториться, зверніться до адміністратора.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={TRANSITION.hover}
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              На головну
            </motion.button>
          </motion.div>
        </div>
      );
    }
    return this.props.children;
  }
}

```

# FILE: apps/frontend/src/components/establishments/EstablishmentsTopNav.tsx

```
import { motion } from "framer-motion";
import { School, Baby } from "lucide-react";
import { SPRING } from "../../lib/motion";

interface Props {
  activeTab: string;
  onChange: (id: string) => void;
}

const ESTABLISHMENT_TABS = [
  { id: "school", icon: School, label: "Школи" },
  { id: "kindergarten", icon: Baby, label: "Садочки" },
];

export default function EstablishmentsTopNav({ activeTab, onChange }: Props) {
  return (
    <div className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border">
      <nav
        className="flex px-4 md:px-8"
        role="tablist"
        aria-label="Вкладки закладів"
      >
        {ESTABLISHMENT_TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              className={`relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors ${
                isActive
                  ? "text-brand"
                  : "text-content-muted hover:text-content-secondary"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="establishment-active-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full"
                  transition={SPRING.stiff}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/finance/FinanceCharts.tsx

```
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
      className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
      variants={staggerItem}
      whileTap={{ scale: 0.97 }}
      transition={TRANSITION.tap}
    >
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
          {fmt(display)}{" "}
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
    </motion.div>
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
  events: FinanceEventItem[];
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
        {events.map((e: FinanceEventItem, i: number) => (
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
    <div className="bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-xl text-sm min-w-[160px]">
      <p className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
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
            <Tooltip content={<CustomTooltip />} />
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
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
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
      </motion.div>

      {/* Нижній ряд */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
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
      </motion.div>

      {/* Найкращі і найгірші події */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
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
      </motion.div>
    </div>
  );
});

export { ExpenseChart };

```

# FILE: apps/frontend/src/components/inventory/InventoryItemModal.tsx

```
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../ui/Modal";
import type { InventoryItem } from "../../types";
import { useProjects } from "../../hooks/useEmployees";

const schema = z.object({
  name: z.string().min(1, "Введіть назву товару"),
  category: z.string().min(1, "Введіть категорію"),
  project: z.string().optional().default(""),
  minStock: z.coerce.number().min(0, "Мінімум не може бути від'ємним"),
  currentStock: z.coerce.number().min(0, "Кількість не може бути від'ємною"),
  notes: z.string().optional().default(""),
});

type FormValues = z.infer<typeof schema>;

interface InventoryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormValues) => Promise<void>;
  item?: InventoryItem | null;
}

export function InventoryItemModal({ isOpen, onClose, onSave, item }: InventoryItemModalProps) {
  const { data: projects } = useProjects();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category: "Інше",
      project: "",
      minStock: 5,
      currentStock: 0,
      notes: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: item?.name ?? "",
        category: item?.category ?? "Інше",
        project: item?.project ?? "",
        minStock: item?.minStock ?? 5,
        currentStock: item?.currentStock ?? 0,
        notes: item?.notes ?? "",
      });
    }
  }, [isOpen, item, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item ? "Редагувати товар" : "Новий товар"}>
      <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1 text-slate-600">Назва *</label>
          <input {...register("name")} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-slate-600">Категорія *</label>
            <input {...register("category")} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-600">Проєкт</label>
            <select {...register("project")} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
              <option value="">— Без проєкту —</option>
              {projects?.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-slate-600">Мінімум</label>
            <input type="number" {...register("minStock")} inputMode="numeric" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            {errors.minStock && <p className="text-xs text-red-500 mt-1">{errors.minStock.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-600">На складі</label>
            <input type="number" {...register("currentStock")} inputMode="numeric" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            {errors.currentStock && <p className="text-xs text-red-500 mt-1">{errors.currentStock.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1 text-slate-600">Нотатки</label>
          <textarea {...register("notes")} rows={3} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
        </div>
        <div className="flex gap-3 mt-2 pt-4 border-t border-slate-100">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm hover:bg-slate-200 transition-colors">
            Скасувати
          </button>
          <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50">
            {isSubmitting ? "..." : item ? "Зберегти" : "Створити"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
```

# FILE: apps/frontend/src/components/IssueCarousel.tsx

```
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import type { IssueReport } from "../types";

const STATUSES = ["Планується", "Виконується", "Виконано"];

const STATUS_STYLES: Record<string, string> = {
  Планується: "bg-amber-50 text-amber-700 border-amber-200",
  Виконується: "bg-blue-50 text-blue-700 border-blue-200",
  Виконано: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function getNextStatus(current: string) {
  const idx = STATUSES.indexOf(current);
  return STATUSES[(idx + 1) % STATUSES.length];
}

export default function IssueCarousel() {
  const { selectedCity } = useSelectedCity();
  const qc = useQueryClient();
  const [exitingIssueId, setExitingIssueId] = useState<string | null>(null);

  const { data: issues = [] } = useQuery({
    queryKey: ["issues", selectedCity?.id],
    queryFn: async () => {
      if (!selectedCity?.id) return [];
      const res = await api.get(`/issues?cityId=${selectedCity.id}`);
      return res.data.filter((i: IssueReport) => i.status !== "Виконано");
    },
    enabled: !!selectedCity?.id,
    refetchOnWindowFocus: true,
    staleTime: 30_000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      api.patch(`/issues/${data.id}/status`, { status: data.status }),
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: ["issues", selectedCity?.id] });
      const prev = qc.getQueryData(["issues", selectedCity?.id]);
      qc.setQueryData(["issues", selectedCity?.id], (old: IssueReport[] | undefined) =>
        Array.isArray(old)
          ? old
              .map((i) =>
                i.id === vars.id ? { ...i, status: vars.status } : i,
              )
              .filter((i) => i.status !== "Виконано")
          : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["issues", selectedCity?.id], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["issues", selectedCity?.id] });
    },
  });

  const handleStatusToggle = (issue: IssueReport) => {
    const nextStatus = getNextStatus(issue.status);

    if (nextStatus === "Виконано") {
      setExitingIssueId(issue.id);
      setTimeout(() => {
        updateStatusMutation.mutate({ id: issue.id, status: nextStatus });
        setExitingIssueId(null);
      }, 500);
    } else {
      updateStatusMutation.mutate({ id: issue.id, status: nextStatus });
    }
  };

  if (issues.length === 0) return null;

  return (
    <div className="mb-6 animate-[slideDown_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
        🚨 <span>Активні проблеми</span>
        <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
          {issues.length}
        </span>
      </h2>

      {}
      <div
        className="flex overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar swiper-no-swiping"
        style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" as const }}
      >
        {issues.map((issue) => {
          const isExiting = exitingIssueId === issue.id;

          return (
            <div
              key={issue.id}
              className={`transition-all duration-500 ease-in-out overflow-hidden transform origin-left ${
                isExiting
                  ? "w-0 min-w-0 mr-0 opacity-0 pointer-events-none"
                  : "w-[300px] min-w-[300px] mr-4 opacity-100 shrink-0"
              }`}
            >
              {/* Внутрішній контейнер має фіксовану ширину, щоб текст не ламався */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-500 p-5 flex flex-col gap-3 w-[300px]">
                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="font-bold text-slate-800 text-sm">
                    {issue.schoolName}
                  </p>
                  <p className="text-xs text-slate-500">{issue.eventName}</p>
                </div>

                <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed">
                  "{issue.message}"
                </p>

                <button
                  onClick={() => handleStatusToggle(issue)}
                  className={`text-xs font-bold px-3 py-2 rounded-lg border transition-colors text-left ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
                >
                  ● {issue.status} → натисни щоб змінити
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/Layout.tsx

```
import { Link, useOutlet, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pageVariants, TRANSITION, SPRING, DUR, EASE } from "../lib/motion";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  MapPin,
  School,
  Baby,
  Wallet,
  Calendar,
  Users,
  GraduationCap,
  LogOut,
} from "lucide-react";
import BottomNavigationBar from "./BottomNavigationBar";
import MobileTopNav from "./MobileTopNav";
import NotificationBell from "./NotificationBell";
import { hasRole } from "../utils/roles";

function NavLink({
  to,
  icon: Icon,
  label,
  onClick,
  currentPath,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  currentPath: string;
}) {
  const active = currentPath.startsWith(to);
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors group"
    >
      {active && (
        <motion.div
          layoutId="sidebar-active-indicator"
          className="absolute inset-0 bg-blue-600 rounded-lg"
          transition={SPRING.snappy}
          style={{ zIndex: 0 }}
        />
      )}
      {!active && (
        <div className="absolute inset-0 rounded-lg bg-transparent group-hover:bg-slate-800/60 transition-colors duration-fast" />
      )}
      <motion.div
        className="relative z-10 flex items-center gap-3 w-full"
        whileHover={!active ? { x: 2 } : undefined}
        transition={TRANSITION.tap}
      >
        <Icon className={`w-4 h-4 shrink-0 transition-transform duration-fast ${active ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`} />
        <span className={`transition-colors duration-fast ${active ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
          {label}
        </span>
      </motion.div>
    </Link>
  );
}

export default function Layout() {
  const outlet = useOutlet();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );

  const { user, logout } = useAuth();
  const { selectedCity } = useSelectedCity();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex h-dvh bg-surface-subtle font-sans overflow-hidden">
      <MobileTopNav />

      <aside className="hidden md:flex md:relative w-64 flex-col bg-nav text-white shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, ease: EASE.outExpo }}
          className="p-6 flex flex-col items-center border-b border-slate-700/50"
        >
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
          <p className="text-xs text-blue-300 mt-1 tracking-wide flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {selectedCity.name}
          </p>
        </motion.div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {hasRole(user?.role, ["SUPERADMIN", "MANAGER"]) && (
            <NavLink to="/dashboard" icon={Home} label="Дашборд" currentPath={location.pathname} />
          )}
          {hasRole(user?.role, ["SUPERADMIN", "MANAGER", "OWNER"]) && (
            <NavLink to="/cities" icon={MapPin} label="Міста" currentPath={location.pathname} />
          )}
          <NavLink to="/schools" icon={School} label="Школи" currentPath={location.pathname} />
          <NavLink to="/kindergartens" icon={Baby} label="Садочки" currentPath={location.pathname} />
          <NavLink to="/finance" icon={Wallet} label="Фінанси" currentPath={location.pathname} />
          <NavLink to="/calendar" icon={Calendar} label="Календар" currentPath={location.pathname} />
          {hasRole(user?.role, ["SUPERADMIN"]) && (
            <NavLink to="/employees" icon={Users} label="Працівники" currentPath={location.pathname} />
          )}
        </nav>

        <div className="p-4 border-t border-slate-700/50 pb-8 md:pb-4">
          <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
            <div className="flex items-center min-w-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={TRANSITION.hover}
                className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold shrink-0"
              >
                {user?.name?.charAt(0) ?? "?"}
              </motion.div>
              <div className="text-sm truncate min-w-0">
                <p className="font-medium text-white truncate">{user?.name ?? "Користувач"}</p>
                <p className="text-xs text-slate-400 truncate">{user?.role ?? ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <NotificationBell />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(239,68,68,0.1)" }}
                whileTap={{ scale: 0.95 }}
                transition={TRANSITION.tap}
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-colors text-xs font-medium shrink-0 px-2.5 py-2 rounded-lg"
                title="Вийти"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </aside>

      <main
        className="flex-1 relative w-full min-w-0 md:pb-0 overflow-y-auto"
        style={{
          marginTop: isMobile ? "calc(3.5rem + env(safe-area-inset-top, 0px))" : undefined,
          paddingBottom: isMobile ? "calc(3.5rem + env(safe-area-inset-bottom, 0px))" : undefined,
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={TRANSITION.layout}
            style={{ willChange: "opacity" }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNavigationBar />
    </div>
  );
}
```

# FILE: apps/frontend/src/components/MobileTopNav.tsx

```
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Дашборд",
  "/schools": "Школи",
  "/kindergartens": "Садочки",
  "/finance": "Фінанси",
  "/calendar": "Календар",
  "/cities": "Міста",
  "/employees": "Працівники",
  "/analytics": "Аналітика",
  "/inventory": "Склад",
  "/reports/review": "Звіти",
  "/city-leaderboard": "Рейтинг",
};

export default function MobileTopNav() {
  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();
  const location = useLocation();

  const pageTitle =
    PAGE_TITLES[location.pathname] ??
    Object.entries(PAGE_TITLES).find(([path]) => location.pathname.startsWith(path))?.[1] ??
    "Світло Знань";

  return (
    <div
      className="md:hidden fixed top-0 left-0 right-0 bg-nav text-white flex items-center justify-between px-4 z-50"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)", height: "calc(3.5rem + env(safe-area-inset-top, 0px))" }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <motion.div
          whileHover={{ rotate: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <GraduationCap className="w-5 h-5 text-blue-300 shrink-0" />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.span
            key={location.pathname}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold tracking-wider text-sm leading-tight truncate"
          >
            {pageTitle}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2">
        <NotificationBell />
        {(user?.role === "SUPERADMIN" || user?.role === "MANAGER" || user?.role === "OWNER") && (
          <Link to="/cities" className="text-xs text-blue-300/80 whitespace-nowrap hover:text-blue-200 transition-colors active:scale-95">
            {selectedCity.name}
          </Link>
        )}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/MoreSheet.tsx

```
import { useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useDragControls } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { NAV_TABS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";
import {
  fadeVariants,
  SPRING,
  staggerContainer,
  staggerItem,
  DUR,
  EASE,
  TRANSITION,
} from "../lib/motion";

interface Props {
  onClose: () => void;
}

const SECTIONS = [
  { label: "Основне", routes: ["/dashboard", "/calendar", "/reports/review"] },
  { label: "Управління", routes: ["/schools", "/kindergartens", "/cities", "/employees", "/inventory"] },
  { label: "Бізнес", routes: ["/finance", "/analytics", "/city-leaderboard"] },
];

export default function MoreSheet({ onClose }: Props) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const dragControls = useDragControls();

  const handleLogout = useCallback(async () => {
    await logout();
    onClose();
  }, [logout, onClose]);

  const allowedTabs = useMemo(
    () => NAV_TABS.filter((t) => hasRole(user?.role, t.roles)),
    [user],
  );

  const allowedRoutes = new Set(allowedTabs.map((t) => t.to));

  return (
    <motion.div
      className="fixed inset-0 z-modal flex flex-col justify-end"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <motion.div
        className="relative bg-white rounded-t-2xl shadow-xl pb-safe pb-4"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={SPRING.snappy}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => { if (info.offset.y > 100) onClose(); }}
        dragListener={false}
        dragControls={dragControls}
      >
        <div
          className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <motion.div
            className="w-9 h-1 rounded-full bg-slate-300"
            initial={{ scaleX: 0.6, opacity: 0.4 }}
            animate={{ scaleX: [0.6, 1, 0.85, 1], opacity: [0.4, 1, 0.7, 1] }}
            transition={{ duration: 0.6, ease: EASE.outExpo }}
          />
        </div>

        <div className="overflow-y-auto max-h-[70vh]">
          <div className="flex items-center justify-between px-5 pt-2 pb-2">
            <h2 className="text-sm font-bold text-content-primary uppercase tracking-wider">
              Розділи
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-content-muted hover:text-content-primary rounded-control transition-colors active:scale-90"
              aria-label="Закрити"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <motion.div
            className="px-3 pb-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {SECTIONS.map((section, sIdx) => {
              const items = section.routes
                .filter((r) => allowedRoutes.has(r))
                .map((r) => allowedTabs.find((t) => t.to === r)!)
                .filter(Boolean);

              if (items.length === 0) return null;

              return (
                <div key={section.label} className={sIdx > 0 ? "mt-3" : ""}>
                  <motion.div className="px-3 py-1.5" variants={staggerItem}>
                    <span className="text-2xs font-bold text-content-muted uppercase tracking-wider">
                      {section.label}
                    </span>
                  </motion.div>
                  <div className="space-y-0.5">
                    {items.map((tab) => {
                      const isActive = location.pathname.startsWith(tab.to);
                      const Icon = tab.icon;
                      return (
                        <motion.div key={tab.to} variants={staggerItem}>
                          <Link
                            to={tab.to}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-control text-sm font-medium transition-colors active:scale-[0.97] ${
                              isActive
                                ? "bg-brand/10 text-brand"
                                : "text-content-secondary hover:bg-surface-muted"
                            }`}
                            whileHover={{ scale: 1.015, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            transition={TRANSITION.hover}
                          >
                            <Icon className="w-5 h-5 shrink-0" />
                            {tab.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <motion.div className="mt-3" variants={staggerItem}>
              <motion.div
                className="px-3 py-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: DUR.normal, ease: EASE.decelerate }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="h-px flex-1 bg-slate-200"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: DUR.slow, ease: EASE.outExpo }}
                  />
                  <span className="text-2xs font-bold text-content-muted uppercase tracking-wider">
                    Акаунт
                  </span>
                  <motion.div
                    className="h-px flex-1 bg-slate-200"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: DUR.slow, ease: EASE.outExpo }}
                  />
                </div>
              </motion.div>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {user?.name?.charAt(0) ?? "?"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-content-primary truncate">{user?.name ?? "Користувач"}</p>
                  <p className="text-xs text-content-muted truncate">{user?.role ?? ""}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-control text-sm font-medium text-content-secondary hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors active:scale-[0.97]"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={TRANSITION.hover}
              >
                <LogOut className="w-5 h-5 shrink-0" />
                Вийти
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/components/NotificationBell.tsx

```
import { useState, useRef } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useNotifications, useUnreadCount, useMarkRead, useMarkAllRead } from "../hooks/useNotifications";
import { tooltipVariants, bellRingVariants, staggerContainer, staggerItem, SPRING, DUR, EASE } from "../lib/motion";

const TYPE_ICONS: Record<string, string> = {
  EVENT_RESCHEDULED: "📅",
  CREW_ASSIGNED: "🎯",
  EVENT_REMINDER: "🔔",
  ISSUE_CREATED: "🚨",
  DAY_OFF_CREATED: "🌴",
  DAY_OFF_REMOVED: "❌",
  REPORT_APPROVED: "✅",
  WELCOME: "👋",
};

function getIcon(type: string) {
  return TYPE_ICONS[type] || "🔔";
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "щойно";
  if (mins < 60) return `${mins}хв тому`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}год тому`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}д тому`;
  return new Date(dateStr).toLocaleDateString("uk-UA");
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { data: unreadData } = useUnreadCount();
  const { data: notifData } = useNotifications();
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();

  const unread = unreadData?.count ?? 0;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors active:scale-90"
        title="Сповіщення"
      >
        <motion.div
          animate={unread > 0 ? "ring" : undefined}
          variants={bellRingVariants}
        >
          <Bell className="w-5 h-5" />
        </motion.div>
        <AnimatePresence>
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={SPRING.bouncy}
              className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1"
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {unread > 99 ? "99+" : unread}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-sheet" onClick={() => setOpen(false)} />
            <motion.div
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 top-full mt-2 w-80 bg-nav border border-slate-700/50 rounded-xl shadow-2xl z-sheet max-h-[70vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 shrink-0">
                <h3 className="text-sm font-semibold text-white">Сповіщення</h3>
                {unread > 0 && (
                  <button
                    onClick={() => markAllRead.mutate()}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Позначити всі прочитаними
                  </button>
                )}
              </div>

              <div className="overflow-y-auto flex-1">
                {(!notifData?.items || notifData.items.length === 0) ? (
                  <div className="px-4 py-8 text-center text-content-muted text-sm">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-content-muted/50" />
                    <p className="font-medium">Немає сповіщень</p>
                  </div>
                ) : (
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    {notifData.items.map((n) => (
                      <motion.button
                        key={n.id}
                        variants={staggerItem}
                        whileHover={{ backgroundColor: "rgba(30,41,59,0.5)", y: -1 }}
                        transition={{ duration: DUR.fast, ease: EASE.standard }}
                        onClick={() => {
                          if (!n.readAt) markRead.mutate(n.id);
                          setOpen(false);
                          const payload = n.payload as Record<string, unknown>;
                          const entityType = payload?.entityType as string | undefined;
                          const entityId = payload?.entityId as string | undefined;
                          if (entityType && entityId) {
                            navigate(`/${entityType}/${entityId}`);
                          }
                        }}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors active:scale-[0.98] border-b border-slate-800/30 last:border-0 ${!n.readAt ? "bg-blue-900/10" : ""}`}
                      >
                        <span className="text-lg shrink-0 mt-0.5">{getIcon(n.type)}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-white truncate">
                            {(n.payload as Record<string, unknown>)?.title as string || n.type}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {timeAgo(n.createdAt)}
                          </p>
                        </div>
                        {!n.readAt && (
                          <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2"
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/PhoneLink.tsx

```
interface PhoneLinkProps {
  phone?: string | null;
  className?: string;
}

export default function PhoneLink({ phone, className }: PhoneLinkProps) {
  if (!phone) return <span className="text-slate-400">—</span>;

  const cleaned = phone.replace(/[^\d+]/g, "");

  return (
    <a
      href={`tel:${cleaned}`}
      onClick={(e) => e.stopPropagation()}
      title="Зателефонувати"
      className={`group inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors active:scale-95 ${
        className ?? ""
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.077-1.439l-3.808-1.142a1.5 1.5 0 00-1.55.43l-1.05 1.05a11.25 11.25 0 01-5.516-5.516l1.05-1.05a1.5 1.5 0 00.43-1.55L8.36 3.327A1.5 1.5 0 006.92 2.25H5.55A2.25 2.25 0 003.3 4.5v.75"
        />
      </svg>
      <span className="underline decoration-transparent group-hover:decoration-blue-300 decoration-1 underline-offset-2 transition-all">
        {phone}
      </span>
    </a>
  );
}
```

# FILE: apps/frontend/src/components/ProtectedRoute.tsx

```
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/schools" replace />;
  }
  return <>{children}</>;
}

```

# FILE: apps/frontend/src/components/school-profile/AssignedCrew.tsx

```
import { memo } from 'react';
import PhoneLink from '../PhoneLink';
import { motion } from "framer-motion";
import { cardHoverVariants } from "../../lib/motion";
import type { Event, User } from '../../types';

interface AssignedCrewProps {
  currentEvent: Event | null;
  employees: User[];
}

export default memo(function AssignedCrew({ currentEvent, employees }: AssignedCrewProps) {
  const crew = currentEvent?.crew;

  if (!crew) {
    return (
<motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="bg-surface p-6 rounded-card shadow-card border border-border flex flex-col justify-center items-center h-full text-content-muted min-h-[250px]"
    >        <span className="text-4xl mb-3 opacity-50">🚐</span>
        <p className="font-medium">Екіпаж ще не призначено</p>
        <p className="text-xs mt-1">Виконайте пункт "Призначити екіпаж" зліва</p>
      </motion.div>
    );
  }

  const host = (employees ?? []).find(e => e.id === crew.hostId);
  const driver = (employees ?? []).find(e => e.id === crew.driverId);

  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="bg-surface p-6 rounded-card shadow-card border border-border h-full flex flex-col"
    >
      <h3 className="font-bold text-content-primary mb-4 border-b pb-3 border-border">Призначений екіпаж</h3>
      <div className="space-y-4 text-sm flex-1">
        <div className="flex justify-between items-center">
          <span className="text-content-muted">Назва:</span>
          <span className="font-bold text-content-primary bg-surface-muted px-3 py-1 rounded-control">{crew.name || 'Екіпаж'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-content-muted">Ведучий:</span>
          <span className="font-medium text-brand flex items-center gap-2">
            <span className="bg-brand-50 text-brand w-6 h-6 flex items-center justify-center rounded-full text-xs">🎙️</span>
            {host?.name || '—'} 
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-content-muted">Водій:</span>
          <span className="font-medium text-success-600 flex items-center gap-2">
            <span className="bg-success-subtle text-success-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">🚗</span>
            {driver?.name || '—'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-content-muted">Авто:</span>
          <span className="font-medium text-content-primary">{crew.car || '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-content-muted">Телефон:</span>
          <span className="font-medium text-content-primary"><PhoneLink phone={crew.phone} /></span>
        </div>
      </div>
    </motion.div>
  );
});

```

# FILE: apps/frontend/src/components/school-profile/CommentsTimeline.tsx

```
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  useSchoolComments,
  useCreateSchoolComment,
  useDeleteSchoolComment,
} from "../../hooks/useSchoolComments";
import { cardHoverVariants, DUR, EASE } from "../../lib/motion";
import type { CommentType, UserRole } from "../../types";

const COMMENT_TYPES: { key: CommentType; label: string; icon: string }[] = [
  { key: "NOTE", label: "Нотатка", icon: "📝" },
  { key: "CALL", label: "Дзвінок", icon: "📞" },
  { key: "RESCHEDULE", label: "Перенесення", icon: "📅" },
  { key: "CONFIRMATION", label: "Підтвердження", icon: "✅" },
  { key: "PROBLEM", label: "Проблема", icon: "⚠️" },
];

const TYPE_ICONS: Record<CommentType, string> = {
  NOTE: "📝",
  CALL: "📞",
  RESCHEDULE: "📅",
  CONFIRMATION: "✅",
  PROBLEM: "⚠️",
};

export default function CommentsTimeline({ schoolId }: { schoolId: string }) {
  const { user } = useAuth();
  const [filter, setFilter] = useState<CommentType | undefined>(undefined);
  const [newType, setNewType] = useState<CommentType>("NOTE");
  const [newText, setNewText] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSchoolComments(schoolId, filter, page);
  const createMutation = useCreateSchoolComment();
  const deleteMutation = useDeleteSchoolComment();

  const userRole = user?.role as UserRole | undefined;
  const canWrite =
    userRole === "MANAGER" || userRole === "SUPERADMIN" || userRole === "OWNER";
  const canDelete = userRole === "SUPERADMIN" || userRole === "OWNER";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    createMutation.mutate(
      { schoolId, type: newType, text: newText.trim() },
      { onSuccess: () => { setNewText(""); setPage(1); } },
    );
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("uk-UA", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="bg-surface p-6 rounded-card shadow-card border border-border flex flex-col"
    >
      <h3 className="font-bold text-content-primary mb-5 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-warning-subtle text-warning-600 flex items-center justify-center">
          🕐
        </span>
        Хронологія роботи
      </h3>

      {canWrite && (
        <form
          onSubmit={handleSubmit}
          className="mb-5 p-4 bg-surface-muted rounded-card border border-border space-y-3"
        >
          <div className="flex gap-2">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as CommentType)}
              className="text-base border border-border-strong rounded-control px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand-300"
            >
              {COMMENT_TYPES.map((ct) => (
                <option key={ct.key} value={ct.key}>
                  {ct.icon} {ct.label}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Текст коментаря..."
            rows={2}
            className="w-full text-base border border-border-strong rounded-control px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand-300 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newText.trim() || createMutation.isPending}
              className="text-xs font-bold text-white bg-brand hover:bg-brand-hover disabled:bg-neutral-300 px-4 py-2.5 rounded-control transition-colors shadow-sm"
            >
              {createMutation.isPending ? "..." : "Додати"}
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => { setFilter(undefined); setPage(1); }}
          className={`text-xs font-medium px-3 py-1.5 rounded-pill transition-colors ${
            !filter
              ? "bg-brand text-white shadow-sm"
              : "bg-surface-muted text-content-secondary hover:bg-neutral-200"
          }`}
        >
          Всі
        </button>
        {COMMENT_TYPES.map((ct) => (
          <button
            key={ct.key}
            onClick={() => { setFilter(ct.key); setPage(1); }}
            className={`text-xs font-medium px-3 py-1.5 rounded-pill transition-colors ${
              filter === ct.key
                ? "bg-brand text-white shadow-sm"
                : "bg-surface-muted text-content-secondary hover:bg-neutral-200"
            }`}
          >
            {ct.icon} {ct.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-16 bg-surface-muted rounded-card" />
          ))}
        </div>
      ) : !data || data.items.length === 0 ? (
        <p className="text-sm text-content-muted text-center py-6">
          Ще немає коментарів.
        </p>
      ) : (
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-border">
          <AnimatePresence initial={false}>
            {data.items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: DUR.normal, ease: EASE.outExpo, delay: i * 0.04 }}
                className="relative pl-8 pr-3 py-2 text-sm hover:bg-surface-muted rounded-card transition-colors group border border-transparent hover:border-border"
              >
                <div className="absolute left-1.5 w-3 h-3 rounded-full top-3.5 bg-warning ring-4 ring-warning-subtle flex items-center justify-center text-[7px]">
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-content-primary flex items-center gap-1.5">
                    <span>{TYPE_ICONS[item.type]}</span>
                    <span>{item.author.name}</span>
                    <span className="text-2xs text-content-muted font-normal">
                      ({item.author.role})
                    </span>
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-content-muted font-medium">
                      {formatDate(item.createdAt)}
                    </span>
                    {canDelete && (
                      <button
                        onClick={() =>
                          deleteMutation.mutate({
                            schoolId,
                            commentId: item.id,
                          })
                        }
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-danger-600 hover:text-danger text-xs p-2.5"
                        title="Видалити"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-content-secondary mt-1.5 bg-surface p-3 rounded-card border border-border shadow-sm">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {data && data.pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="text-xs font-medium px-3 py-2.5 rounded-control bg-surface-muted text-content-secondary hover:bg-neutral-200 disabled:opacity-40 active:scale-90 transition-transform duration-fast"
          >
            ←
          </button>
          <span className="text-xs text-content-muted self-center">
            {data.page} / {data.pageCount}
          </span>
          <button
            disabled={page >= data.pageCount}
            onClick={() => setPage((p) => p + 1)}
            className="text-xs font-medium px-3 py-2.5 rounded-control bg-surface-muted text-content-secondary hover:bg-neutral-200 disabled:opacity-40 active:scale-90 transition-transform duration-fast"
          >
            →
          </button>
        </div>
      )}
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/CompletedEventModal.tsx

```
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, modalContentVariants } from "../../lib/motion";
import type { Event, ExpenseItem, SalaryRecord } from "../../types";

interface CompletedEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

const CompletedEventModal: React.FC<CompletedEventModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const headingId = 'completed-event-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const report = event.report;
  const fmt = (n: unknown) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

  return (
    <AnimatePresence>
      {isOpen && event && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-surface rounded-t-modal sm:rounded-modal shadow-modal w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col pb-safe"
          >
        <div className="p-5 sm:p-6 border-b border-border flex justify-between bg-surface-muted shrink-0">
          <div>
            <h3 id={headingId} className="text-xl font-bold text-content-primary">
              Звіт: {event.project}
            </h3>
            <p className="text-sm text-content-muted mt-1">
              {new Date(event.date).toLocaleDateString("uk-UA")}
            </p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-content-muted hover:text-content-secondary p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg active:scale-90 transition-transform duration-fast">
            ✕
          </button>
        </div>

        <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-surface-subtle">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-surface p-5 rounded-card border border-border shadow-card">
              <h4 className="font-bold text-content-primary mb-4">📊 Результати</h4>
              <div className="space-y-3 text-sm">
                {[
                  ["Дітей (факт)", report?.childrenCount || 0],
                  ["Класів", report?.classesCount || 0],
                  ["Пільговиків", report?.privilegedCount || 0],
                  ["Сеансів", report?.showingsCount || 0],
                ].map(([label, val]) => (
                  <div
                    key={label as string}
                    className="flex justify-between border-b border-surface-muted pb-2"
                  >
                    <span className="text-content-muted">{label}:</span>
                    <span className="font-medium text-content-primary">{val}</span>
                  </div>
                ))}
                <div className="flex justify-between pb-1">
                  <span className="text-content-muted">Оцінка:</span>
                  <span className="font-bold text-warning-600">
                    ⭐ {report?.rating || 0}/10
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface p-5 rounded-card border border-border shadow-card">
              <h4 className="font-bold text-content-primary mb-4">💰 Фінанси</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-surface-muted pb-2">
                  <span className="text-content-muted">Загальна виручка:</span>
                  <span className="font-bold text-content-primary">{fmt(report?.totalSum)} грн</span>
                </div>
                <div className="flex justify-between border-b border-surface-muted pb-2">
                  <span className="text-content-muted">На заклад:</span>
                  <span className="font-medium text-danger-600">
                    − {fmt(report?.schoolSum)} грн
                  </span>
                </div>

                {Array.isArray(report?.expenseItems) &&
                  report.expenseItems.map((exp: ExpenseItem, i: number) => (
                    <div key={i} className="flex justify-between text-xs pl-2">
                      <span className="text-content-muted">
                        — {exp.name || exp.category || "Інше"}
                      </span>
                      <span className="text-danger-600 font-medium">
                        − {fmt(exp.amount)} грн
                      </span>
                    </div>
                  ))}

                <div className="flex justify-between pt-1 border-t border-border">
                  <span className="font-bold text-content-primary">
                    Чистий прибуток:
                  </span>
                  <span className="font-bold text-success-600 text-base">
                    {fmt(report?.remainderSum)} грн
                  </span>
                </div>
              </div>
            </div>
          </div>

          {Array.isArray(report?.salaryRecords) && report.salaryRecords.length > 0 && (
            <div className="bg-surface p-5 rounded-card border border-border shadow-card mt-4">
              <h4 className="font-bold text-content-primary mb-4">👥 Зарплати</h4>
              <div className="space-y-2">
                {report.salaryRecords.map((s: SalaryRecord, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                      <span className="text-content-secondary">
                        {s.employee?.name ?? "—"}
                      </span>
                    <span className="font-medium text-brand">
                      {fmt(s.amount)} грн
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-surface p-5 sm:p-6 rounded-card border border-border shadow-card mt-4">
            <h4 className="font-bold text-content-primary mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-50 text-brand flex items-center justify-center">
                ⏳
              </span>
              Історія пайплайну
            </h4>
            {!event.history || event.history.length === 0 ? (
              <p className="text-sm text-content-muted text-center py-4">
                Історія порожня.
              </p>
            ) : (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-border">
                {[...event.history]
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  )
                  .map((item) => (
                    <div key={item.id} className="relative pl-8 text-sm">
                      <div className="absolute left-1.5 w-3 h-3 rounded-full top-1 bg-brand ring-4 ring-surface"></div>
                      <p className="font-semibold text-content-primary">
                        {item.action}
                      </p>
                      <p className="text-xs text-content-muted mt-0.5">
                        {new Date(item.createdAt).toLocaleString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · 👤 {item.userName}
                      </p>
                      {item.comment && (
                        <div className="mt-2 p-3 bg-surface-muted rounded-card text-content-secondary italic border border-border">
                          {item.comment}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompletedEventModal;

```

# FILE: apps/frontend/src/components/school-profile/EventDetails.tsx

```
import { useState } from 'react';
import { motion } from 'framer-motion';
import AddressLink from "../AddressLink";
import PhoneLink from "../PhoneLink";
import IssueModal from "./modals/IssueModal";
import RescheduleModal from "./modals/RescheduleModal";
import { fadeVariants, cardHoverVariants } from "../../lib/motion";
import type { Event, User } from '../../types';

interface EventDetailsProps {
  currentEvent: Event | null;
  schoolName?: string;
  cityId?: string;
  onEventUpdated?: () => void;
  employees?: User[];
}

export default function EventDetails({ currentEvent, schoolName, cityId, onEventUpdated, employees }: EventDetailsProps) {
  const [issueOpen, setIssueOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);

  if (!currentEvent) {
    return (
      <motion.div
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        className="bg-surface p-6 rounded-card shadow-card border border-border flex items-center justify-center h-32 text-content-muted"
      >
        У цього закладу ще немає запланованих подій.
      </motion.div>
    );
  }

  const formattedDate = new Date(currentEvent.date).toLocaleDateString('uk-UA');

  return (
    <>
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover="hover"
        className="bg-surface rounded-card shadow-card border border-border md:border-l-4 md:border-l-brand relative"
      >
        <div className="p-5 sm:p-6 pl-6 sm:pl-6">
          <div className="flex justify-between items-center mb-2 md:mb-5 md:border-b border-border md:pb-4">
            <h3 className="font-bold text-content-primary text-lg">Деталі події</h3>
            <span className="md:hidden text-sm font-bold text-brand bg-brand-50 px-2 py-1 rounded-control">
              {formattedDate}
            </span>
          </div>

          <div className="md:hidden grid grid-cols-2 gap-3 mb-5 border-b border-border pb-5 mt-3">
            <button
              onClick={() => setRescheduleOpen(true)}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-warning-subtle text-warning-600 rounded-card font-bold border border-warning-100/50 active:bg-warning-100 transition-colors shadow-sm"
            >
              <span className="text-2xl">📅</span>
              <span className="text-xs uppercase tracking-wider">Перенести</span>
            </button>
            <button
              onClick={() => setIssueOpen(true)}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-danger-subtle text-danger-600 rounded-card font-bold border border-danger-100/50 active:bg-danger-100 transition-colors shadow-sm"
            >
              <span className="text-2xl">🚨</span>
              <span className="text-xs uppercase tracking-wider">Проблема</span>
            </button>
          </div>

          <div className="hidden md:flex items-center justify-end gap-3 absolute top-5 right-6">
            <span className="text-sm font-medium text-brand mr-2">{formattedDate}</span>
            <button
              onClick={() => setRescheduleOpen(true)}
              className="px-3 py-1.5 bg-warning hover:bg-warning-600 text-white text-xs font-bold rounded-control transition-colors shadow-sm"
            >
              📅 Перенести
            </button>
            <button
              onClick={() => setIssueOpen(true)}
              className="px-3 py-1.5 bg-danger hover:bg-danger-600 text-white text-xs font-bold rounded-control transition-colors shadow-sm"
            >
              🚨 Проблема
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2 md:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium">Проєкт:</span>
              <span className="font-bold text-content-primary">{currentEvent.project}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium">Час початку:</span>
              <span className="font-bold text-content-primary">{currentEvent.time}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium">Кількість дітей:</span>
              <span className="font-bold text-content-primary">{currentEvent.childrenPlanned}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium">Вартість:</span>
              <span className="font-bold text-content-primary">{currentEvent.price} грн</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-surface-muted pt-3 md:border-0 md:pt-0 md:mt-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium mt-1">Адреса:</span>
              <span className="font-bold text-content-primary flex items-start gap-1.5 leading-snug">
                 <span className="text-content-muted mt-0.5 shrink-0">📍</span>
                 <AddressLink address={currentEvent.address} />
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-surface-muted pt-3 md:border-0 md:pt-0 md:mt-0">
              <span className="w-full sm:w-1/3 text-content-muted font-medium mt-1">Контакт:</span>
              <span className="font-bold text-content-primary flex flex-col gap-1 leading-snug">
                <span>{currentEvent.contactPerson}</span>
                <span className="w-6 border-b-2 border-border-strong my-0.5"></span>
                <PhoneLink phone={currentEvent.contactPhone} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <IssueModal
        isOpen={issueOpen}
        onClose={() => setIssueOpen(false)}
        schoolName={schoolName || currentEvent.school?.name || ''}
        eventName={`${currentEvent.project} — ${formattedDate}`}
        eventId={currentEvent.id}
        cityId={cityId || currentEvent.cityId || ''}
        employees={employees}
      />
      <RescheduleModal
        isOpen={rescheduleOpen}
        onClose={() => setRescheduleOpen(false)}
        eventId={currentEvent.id}
        currentDate={currentEvent.date}
        currentTime={currentEvent.time || ''}
        onSuccess={() => onEventUpdated?.()}
      />
    </>
  );
}
```

# FILE: apps/frontend/src/components/school-profile/EventPreparation.tsx

```
import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventPreparation as EventPreparationData } from "../../types";
import {
  PREPARATION_STATUS_LABELS,
  getNextPreparationStatus,
  type PreparationStatus,
} from "../../utils/preparationStatus";
import { useInventoryByProject } from "../../hooks/useInventory";
import { cardHoverVariants, TRANSITION, scaleVariants, DUR } from "../../lib/motion";

interface PreparationProps {
  data: Partial<EventPreparationData>;
  onUpdate: (field: string, status: PreparationStatus) => void;
  onOpenCrewModal: () => void;
  project?: string;
}

export default memo(function EventPreparation({
  data,
  onUpdate,
  onOpenCrewModal,
  project,
}: PreparationProps) {
  const [optimistic, setOptimistic] = useState<Record<string, string>>({});
  const { data: projectItems } = useInventoryByProject(project);

  const tasks = [
    { key: "assignCrew", label: "Призначити екіпаж" },
    { key: "bookEquipment", label: "Забронювати обладнання" },
    { key: "prepareDocs", label: "Підготувати документи" },
    { key: "prepareMaterials", label: "Підготувати матеріали" },
    { key: "remindSchool", label: "Нагадати школі про подію" },
  ];

  const getStatusColor = (status: PreparationStatus) => {
    switch (status) {
      case "DONE":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "IN_PROGRESS":
        return "bg-orange-50 text-orange-600 border border-orange-200";
      default:
        return "bg-blue-50 text-blue-600 border border-blue-200";
    }
  };

  const handleTaskClick = (key: string) => {
    if (key === "assignCrew") {
      onOpenCrewModal();
    } else {
      const current = (optimistic[key] ??
        data[key as keyof EventPreparationData] ??
        "PLANNED") as PreparationStatus;
      const next = getNextPreparationStatus(current);
      setOptimistic((prev) => ({ ...prev, [key]: next }));
      onUpdate(key, next).catch(() => {
        setOptimistic((prev) => ({ ...prev, [key]: data[key] }));
      });
    }
  };

  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="bg-surface p-6 rounded-card shadow-card border border-border"
    >
      <h3 className="font-bold text-content-primary mb-4 border-b pb-3 border-border">
        Підготовка до події
      </h3>
      <div className="space-y-3 text-sm">
        {tasks.map((task) => {
          const currentStatus = (optimistic[task.key] ??
            data[task.key as keyof EventPreparationData] ??
            "PLANNED") as PreparationStatus;
          return (
            <motion.div
              key={task.key}
              whileTap={{ scale: 0.98 }}
              transition={TRANSITION.tap}
              className="flex justify-between items-center cursor-pointer group hover:bg-surface-muted p-2 -mx-2 rounded-control transition-colors"
              onClick={() => handleTaskClick(task.key)}
            >
              <span className="text-content-secondary font-medium select-none">
                {task.label}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentStatus}
                  variants={scaleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: DUR.fast }}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold select-none ${getStatusColor(currentStatus)}`}
                >
                  {PREPARATION_STATUS_LABELS[currentStatus]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {project && projectItems && projectItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-content-secondary mb-2">
            Предмети для проєкту «{project}»
          </h4>
          <div className="space-y-1.5">
            {projectItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm py-1">
                <span className="text-content-secondary">{item.name}</span>
                <span className="text-xs text-content-muted">
                  {item.currentStock} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
});

```

# FILE: apps/frontend/src/components/school-profile/EventsTable.tsx

```

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerItem, fadeVariants } from '../../lib/motion';
import type { Event } from '../../types';
import { useDeleteEvent } from '../../hooks/useSchoolProfile';
import { ConfirmDialog } from '../ui/ConfirmDialog';

interface EventsTableProps {
  events: Event[];
  selectedEventId: string | null;
  onEventSelect: (id: string) => void;
  onDeleteSuccess: () => void;
  schoolId: string;
}

export default function EventsTable({ events, selectedEventId, onEventSelect, onDeleteSuccess, schoolId }: EventsTableProps) {
  const deleteMutation = useDeleteEvent(schoolId);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, id: string, project: string) => {
    e.stopPropagation();
    setDeleteTarget({ id, name: project });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      onDeleteSuccess();
    } catch (error) {
      console.error('Помилка видалення:', error);
    } finally {
      setDeleteTarget(null);
    }
  };

  if (events.length === 0) return null;

  return (
    <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden mt-2 w-full">
      <div className="p-4 sm:p-6 border-b border-border bg-surface-muted flex justify-between items-center">
        <h3 className="font-bold text-content-primary">Всі події ({events.length})</h3>
      </div>

      <div className="md:hidden divide-y divide-border">
        <AnimatePresence initial={false}>
        {events.map((ev, i) => (
          <motion.div
            key={ev.id}
            variants={staggerItem}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onEventSelect(ev.id)}
            className={`flex items-center justify-between gap-3 p-4 transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-brand-50/50' : 'active:bg-surface-muted'}`}
          >
            <div className="min-w-0">
              <p className="font-medium text-content-primary">{ev.project}</p>
              <p className="text-xs text-content-muted mt-0.5">{new Date(ev.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-medium text-sm text-content-secondary">{ev.price} грн</span>
              <button
                onClick={(e) => handleDeleteClick(e, ev.id, ev.project)}
                className="text-danger-600 active:text-danger p-2.5 rounded-control active:scale-90 transition-transform duration-fast"
              >
                🗑
              </button>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-surface border-b border-border text-content-muted">
              <th className="p-4">Дата</th>
              <th className="p-4">Проєкт</th>
              <th className="p-4">Вартість</th>
              <th className="p-4 text-center">Дія</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
            {events.map((ev, i) => (
              <motion.tr
                key={ev.id}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: i * 0.03 }}
                onClick={() => onEventSelect(ev.id)}
                className={`border-b transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-brand-50/50' : 'hover:bg-surface-muted'}`}
              >
                <td className="p-4 font-medium">{new Date(ev.date).toLocaleDateString()}</td>
                <td className="p-4">{ev.project}</td>
                <td className="p-4">{ev.price} грн</td>
                <td className="p-4 text-center">
                  <button
                    onClick={(e) => handleDeleteClick(e, ev.id, ev.project)}
                    className="text-danger-600 hover:text-danger p-2.5 active:scale-90 transition-transform duration-fast"
                  >
                    🗑
                  </button>
                </td>
              </motion.tr>
            ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Видалити подію?"
        message={`Подію «${deleteTarget?.name ?? ''}» буде видалено назавжди.`}
        confirmLabel="Видалити"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}



```

# FILE: apps/frontend/src/components/school-profile/HistoryTimeline.tsx

```
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cardHoverVariants, DUR, EASE } from "../../lib/motion";
import type { Event, EventHistory } from "../../types";
interface HistoryTimelineProps {
  currentEvent: Event | null;
  onHistoryClick: (item: EventHistory) => void;
  onAddCommentClick: () => void;
}

export default memo(function HistoryTimeline({ currentEvent, onHistoryClick, onAddCommentClick }: HistoryTimelineProps) {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="bg-surface p-6 rounded-card shadow-card border border-border flex flex-col"
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-content-primary">Історія взаємодії</h3>
        <button 
          onClick={onAddCommentClick}
          className="text-xs font-bold text-brand bg-brand-50 hover:bg-brand-100 px-3 py-2.5 rounded-control transition-colors flex items-center gap-1 shadow-sm"
        >
          <span>+</span> Коментар
        </button>
      </div>
      
      {!currentEvent || !currentEvent.history || currentEvent.history.length === 0 ? (
        <p className="text-sm text-content-muted">Історія порожня.</p>
      ) : (
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-border">
          <AnimatePresence initial={false}>
          {currentEvent.history.map((item: EventHistory, i: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: DUR.normal, ease: EASE.outExpo, delay: i * 0.04 }}
              onClick={() => onHistoryClick(item)}
              className="relative pl-8 pr-3 py-2 text-sm hover:bg-surface-muted rounded-card cursor-pointer transition-colors group border border-transparent hover:border-border"
            >
              <div className={`absolute left-1.5 w-3 h-3 rounded-full top-3.5 ${i === 0 ? 'bg-brand ring-4 ring-brand-50' : 'bg-neutral-300'}`}></div>
              <p className="font-semibold text-content-primary">{item.action}</p>
              {item.comment && (
                <p className="text-content-secondary mt-1.5 bg-surface p-3 rounded-card border border-border shadow-sm text-sm italic">
                  "{item.comment}"
                </p>
              )}
              <p className="text-xs text-content-muted mt-2 flex justify-between items-center font-medium">
                <span>
                  👤 {item.userName} <span className="mx-1">•</span> 
                  {new Date(item.createdAt).toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand">✏️ Редагувати</span>
              </p>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
});

```

# FILE: apps/frontend/src/components/school-profile/modals/CommentModal.tsx

```
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { backdropVariants, modalContentVariants } from '../../../lib/motion';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  text: string;
  setText: (text: string) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function CommentModal({ isOpen, onClose, mode, text, setText, onSave }: CommentModalProps) {
  const headingId = 'comment-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden max-h-[90vh] flex flex-col pb-safe"
          >
            <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
            <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
              <h3 id={headingId} className="text-xl font-bold text-slate-800">
                {mode === 'pipeline' ? 'Завершення етапу' : mode === 'add_comment' ? 'Новий коментар' : 'Редагувати'}
              </h3>
              <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 p-2 -mr-2 active:scale-90 transition-transform duration-fast">✕</button>
            </div>
            <form onSubmit={onSave} className="p-5 sm:p-6 flex-1 flex flex-col">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {mode === 'add_comment' ? 'Коментар' : 'Коментар (необов\'язково)'}
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Результати дзвінка, домовленості, примітки..."
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none h-32 flex-1 min-h-[120px]"
                autoFocus
                required={mode === 'add_comment'}
              />
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pb-1 sm:pb-0">
                <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors">
                  Скасувати
                </button>
                <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  {mode === 'pipeline' ? 'Завершити' : 'Зберегти'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/CrewModal.tsx

```
import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../config/api";
import type { City, Crew } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { useDaysOff } from "../../../hooks/useDaysOff";
import { backdropVariants, modalContentVariants } from "../../../lib/motion";
interface CrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  city?: string;
  eventDate?: string;
  onSave: (crewId: string) => void;
}

export default function CrewModal({
  isOpen,
  onClose,
  city,
  eventDate,
  onSave,
}: CrewModalProps) {
  const headingId = 'crew-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  const navigate = useNavigate();
  const { data: allCities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: () => api.get("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const currentCity = allCities.find((c: City) => c.name === city);
  const { data: crews = [], isLoading } = useQuery({
    queryKey: ["cityCrews", currentCity?.id],
    queryFn: () => {
      if (!currentCity) return Promise.resolve([]);
      return api.get<Crew[]>(`/cities/${currentCity.id}/crews`).then((r) => r.data);
    },
    enabled: !!currentCity?.id && isOpen,
    staleTime: 60 * 1000,
  });
  const dayOnly = eventDate ? eventDate.slice(0, 10) : undefined;
  const { data: dayOffs = [] } = useDaysOff(dayOnly, dayOnly);
  const dayOffUserIds = useMemo(
    () => new Set(dayOffs.map((d) => d.userId)),
    [dayOffs],
  );
  const [selectedCrewId, setSelectedCrewId] = useState("");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 id={headingId} className="text-xl font-bold text-slate-800">
            Призначити екіпаж
          </h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 active:scale-90 transition-transform duration-fast">
            ✕
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <p className="text-slate-500 text-center py-4">Завантаження...</p>
          ) : crews.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-slate-500">
                У цьому місті ще немає сформованих екіпажів.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (currentCity?.id) navigate(`/cities/${currentCity.id}`);
                }}
                className="text-sm mt-2 text-blue-600 hover:text-blue-800 underline underline-offset-2 active:scale-[0.97] transition-transform duration-fast"
              >
                Створіть екіпаж у вкладці міста!
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Оберіть готовий екіпаж
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {crews.map((crew) => {
                  const hostOnDayOff =
                    crew.hostId && dayOffUserIds.has(crew.hostId);
                  const driverOnDayOff =
                    crew.driverId && dayOffUserIds.has(crew.driverId);
                  const isUnavailable = hostOnDayOff || driverOnDayOff;
                  return (
                    <label
                      key={crew.id}
                      className={`flex items-start p-3 rounded-xl border transition-all ${
                        isUnavailable
                          ? "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed"
                          : selectedCrewId === crew.id
                            ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 cursor-pointer"
                            : "border-slate-200 hover:border-blue-300 cursor-pointer"
                      }`}
                    >
                      <input
                        type="radio"
                        name="crew"
                        value={crew.id}
                        checked={selectedCrewId === crew.id}
                        disabled={!!isUnavailable}
                        onChange={() => setSelectedCrewId(crew.id)}
                        className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="font-bold text-slate-800">{crew.name}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          🎙️ {crew.host?.name || "—"} | 🚗{" "}
                          {crew.driver?.name || "—"}
                        </p>
                        {crew.car && (
                          <p className="text-xs text-emerald-600 mt-0.5">
                            Авто: {crew.car}
                          </p>
                        )}
                        {isUnavailable && (
                          <p className="text-xs text-rose-500 font-medium mt-1">
                            🌴 {hostOnDayOff ? "Ведучий" : "Водій"} у вихідному
                            цього дня
                          </p>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 active:scale-[0.97] transition-transform duration-fast"
            >
              Скасувати
            </button>
            <button
              onClick={() => onSave(selectedCrewId)}
              disabled={!selectedCrewId}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-opacity active:scale-[0.97] transition-transform duration-fast"
            >
              Призначити
            </button>
          </div>
          </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/EditSchoolModal.tsx

```
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  schoolEditSchema,
  type SchoolEditFormValues,
} from "./SchoolEditSchema";
import { backdropVariants, modalContentVariants } from "../../../lib/motion";

interface EditSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: SchoolEditFormValues;
  onSave: (data: SchoolEditFormValues) => void;
}

export default function EditSchoolModal({
  isOpen,
  onClose,
  defaultValues,
  onSave,
}: EditSchoolModalProps) {
  const headingId = 'edit-school-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchoolEditFormValues>({
    resolver: zodResolver(schoolEditSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl overflow-hidden max-h-[92vh] flex flex-col pb-safe"
          >
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />

        {/* Шапка не зжимається (shrink-0) */}
        <div className="p-5 sm:p-6 border-b flex justify-between items-center bg-slate-50 shrink-0">
          <h3 id={headingId} className="text-xl font-bold">Редагування</h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 p-2 -mr-2 active:scale-90 transition-transform duration-fast">
            ✕
          </button>
        </div>

        {/* Форма скролиться (overflow-y-auto) */}
        <form
          onSubmit={handleSubmit(onSave)}
          className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Тип</label>
              <select
                {...register("type")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Школа</option>
                <option>Садочок</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1">Адреса</label>
              <input
                type="text"
                {...register("address")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Контакт</label>
              <input
                type="text"
                {...register("director")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Телефон</label>
              <input
                type="text"
                {...register("phone")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Дітей</label>
              <input
                type="number"
                {...register("childrenCount")}
                inputMode="numeric"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.childrenCount && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.childrenCount.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pt-4 border-t border-slate-100 pb-1 sm:pb-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 font-medium rounded-xl transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Зберегти
            </button>
          </div>
        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/EventModal.tsx

```
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../config/api";
import type { Project } from "../../../types";
import { eventSchema, type EventFormValues } from "./EventSchema";
import { backdropVariants, modalContentVariants } from "../../../lib/motion";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<EventFormValues>;
  onSave: (data: EventFormValues) => void;
}

export default function EventModal({
  isOpen,
  onClose,
  defaultValues,
  onSave,
}: EventModalProps) {
  const headingId = 'event-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [priceTouched, setPriceTouched] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      project: "",
      date: "",
      time: "",
      childrenPlanned: "",
      price: "",
      address: "",
      contactPerson: "",
      contactPhone: "",
      ...defaultValues,
    },
  });

  const currentProject = watch("project");
  const currentChildrenPlanned = watch("childrenPlanned");

  useEffect(() => {
    if (isOpen) {
      setPriceTouched(!!defaultValues?.price);
      reset({
        project: "",
        date: "",
        time: "",
        childrenPlanned: "",
        price: "",
        address: "",
        contactPerson: "",
        contactPhone: "",
        ...defaultValues,
      });
      setProjects([]);
      api.get<Project[]>("/projects")
        .then((res) => {
          setProjects(res.data);
          if (!defaultValues?.project && res.data.length > 0) {
            setValue("project", res.data[0].name);
          }
        })
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (priceTouched) return;
    const selected = projects.find((p) => p.name === currentProject) as
      | (Project & { pricePerChild?: number })
      | undefined;
    if (!selected?.pricePerChild) return;
    const count = Number(currentChildrenPlanned) || 0;
    setValue("price", String(count * selected.pricePerChild));
  }, [
    currentProject,
    currentChildrenPlanned,
    projects,
    priceTouched,
    setValue,
  ]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col"
          >
        <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
          <h3 id={headingId} className="text-xl font-bold text-slate-800">Нова подія</h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 p-2 -mr-2 text-xl leading-none active:scale-90 transition-transform duration-fast">
            ✕
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSave)}
          className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1 text-slate-600">
                Проєкт (Вид події)
              </label>
              <select
                {...register("project")}
                disabled={projects.length === 0}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="" disabled>
                  {projects.length === 0
                    ? "Завантаження видів подій..."
                    : "Оберіть вид події"}
                </option>
                {projects.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.project.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">Дата</label>
              <input
                type="date"
                {...register("date")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.date && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">Час</label>
              <input
                type="time"
                {...register("time")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.time && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.time.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Дітей (план)
              </label>
              <input
                type="number"
                {...register("childrenPlanned")}
                inputMode="numeric"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.childrenPlanned && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.childrenPlanned.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Вартість
              </label>
              <input
                type="number"
                {...register("price")}
                inputMode="decimal"
                onInput={() => setPriceTouched(true)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-400 mt-1">
                Розраховується автоматично: діти × ціна за дитину. Можна
                змінити вручну.
              </p>
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1 text-slate-600">
                Адреса
              </label>
              <input
                type="text"
                {...register("address")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Контактна особа
              </label>
              <input
                type="text"
                {...register("contactPerson")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Телефон
              </label>
              <input
                type="text"
                {...register("contactPhone")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4 shrink-0 pt-4 border-t border-slate-100 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium rounded-xl transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Створити
            </button>
          </div>
        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/EventSchema.ts

```
import { z } from "zod";

export const eventSchema = z.object({
  project: z.string().min(1, "Оберіть вид події"),
  date: z.string().min(1, "Вкажіть дату"),
  time: z.string().min(1, "Вкажіть час"),
  childrenPlanned: z
    .string()
    .min(1, "Вкажіть кількість дітей")
    .refine((v) => Number(v) > 0, "Має бути більше нуля"),
  price: z
    .string()
    .min(1, "Вкажіть вартість")
    .refine((v) => Number(v) >= 0, "Некоректна вартість"),
  address: z.string().optional().default(""),
  contactPerson: z.string().optional().default(""),
  contactPhone: z.string().optional().default(""),
});

export type EventFormValues = z.infer<typeof eventSchema>;

```

# FILE: apps/frontend/src/components/school-profile/modals/IssueModal.tsx

```
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../config/api";
import { backdropVariants, modalContentVariants } from "../../../lib/motion";

interface Employee {
  id: string;
  name: string;
  role: string;
}

interface IssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolName: string;
  eventName: string;
  eventId: string;
  cityId: string;
  employees?: Employee[];
}

export default function IssueModal({
  isOpen,
  onClose,
  schoolName,
  eventName,
  eventId,
  cityId,
  employees = [],
}: IssueModalProps) {
  const [message, setMessage] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [sent, setSent] = useState(false);
  const headingId = 'issue-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const assignedUser = employees.find((e) => e.id === assignedUserId);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage("");
      setDeadline("");
      setAssignedUserId("");
      onClose();
    }, 600);
    api
      .post("/issues", {
        eventId,
        schoolName,
        eventName,
        message,
        cityId,
        deadline: deadline || undefined,
        assignedUserId: assignedUserId || undefined,
        assignedUserName: assignedUser?.name || undefined,
      })
      .catch((e) => console.error(e));
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-modal flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col"
          >
        <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50 shrink-0">
          <div>
            <h3 id={headingId} className="text-xl font-bold text-slate-800">🚨 Запит</h3>
            <p className="text-sm text-red-500 mt-0.5 font-medium">
              {schoolName}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{eventName}</p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors">
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 overflow-y-auto">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Опишіть проблему або запит..."
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none resize-none h-32 text-base"
            autoFocus
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              ⏰ Дедлайн{" "}
              <span className="text-slate-400 font-normal">
                (необов'язково)
              </span>
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-base"
            />
          </div>

          {employees.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                👤 Відповідальний{" "}
                <span className="text-slate-400 font-normal">
                  (необов'язково)
                </span>
              </label>
              <select
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-base bg-white"
              >
                <option value="">— Оберіть працівника —</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.role})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={sent || !message.trim()}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {sent ? "✓ Надіслано!" : "Відправити"}
            </button>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/ReportModal.tsx

```
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, modalContentVariants } from "../../../lib/motion";

interface Expense {
  name: string;
  amount: number;
}
interface CrewMember {
  id: string;
  name: string;
  role: "host" | "driver";
}
export interface ReportData {
  announcementDone: boolean;
  materialShown: boolean;
  childrenCount: number;
  classesCount: number;
  privilegedCount: number;
  showingsCount: number;
  totalSum: number;
  schoolSum: number;
  remainderSum: number;
  rating: number;
  expenses: { name: string; amount: number }[];
  salaries: { userId: string; name: string; amount: number; role: string }[];
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ReportData) => void;
  schoolName: string;
  eventType?: string;
  eventDate?: string;
  eventIndex?: number;
  crew?: {
    host?: { id: string; name: string } | null;
    driver?: { id: string; name: string } | null;
  };
}

const WEEKDAY_FMT = new Intl.DateTimeFormat("uk-UA", { weekday: "long" });
const DATE_FMT = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "—";
  return `${DATE_FMT.format(d)} ${WEEKDAY_FMT.format(d)}`;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("uk-UA").format(Math.round(value || 0));
}

const Icon = {
  Check: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  Users: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Wallet: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
      <path d="M16 12h6v4h-6a2 2 0 1 1 0-4z" />
    </svg>
  ),
  Star: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

function IconBadge({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${color}`}
    >
      {children}
    </span>
  );
}

function CardHeader({
  icon,
  color,
  title,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <IconBadge color={color}>{icon}</IconBadge>
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="text-sm font-medium text-slate-800">{children}</div>
    </div>
  );
}

function TogglePill({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-1.5">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
      >
        Так
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${!value ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
      >
        Ні
      </button>
    </div>
  );
}

function NumberField({
  value,
  onChange,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <input
        type="number"
        min={0}
        inputMode="decimal"
        value={value || ""}
        onChange={(e) => onChange(+e.target.value)}
        className="w-16 text-right bg-transparent outline-none font-medium text-base text-slate-800 focus:bg-blue-50 rounded px-1 -mr-1"
        placeholder="0"
      />
      {suffix && <span className="text-slate-400 text-xs">{suffix}</span>}
    </span>
  );
}

export default function ReportModal({
  isOpen,
  onClose,
  onSave,
  schoolName,
  eventType,
  eventDate,
  eventIndex,
  crew,
}: ReportModalProps) {
  const headingId = 'report-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  const [form, setForm] = useState({
    announcementDone: true,
    materialShown: true,
    childrenCount: 0,
    classesCount: 0,
    privilegedCount: 0,
    showingsCount: 0,
    totalSum: 0,
    schoolPercentage: 20,
    rating: 5,
  });

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExp, setNewExp] = useState({ name: "", amount: "" });
  const [salaries, setSalaries] = useState<Record<string, number>>({});

  const schoolSum = (form.totalSum * form.schoolPercentage) / 100;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const remainder = form.totalSum - schoolSum - totalExpenses;

  const addExpense = () => {
    const amount = Number(newExp.amount);
    if (!newExp.name.trim() || !amount) return;
    setExpenses((prev) => [...prev, { name: newExp.name.trim(), amount }]);
    setNewExp({ name: "", amount: "" });
  };

  const removeExpense = (index: number) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  const crewMembers = [
    ...(crew?.host
      ? [
          {
            id: crew.host.id,
            name: crew.host.name,
            role: "Ведучий",
          },
        ]
      : []),
    ...(crew?.driver
      ? [
          {
            id: crew.driver.id,
            name: crew.driver.name,
            role: "Водій",
          },
        ]
      : []),
  ];

  const handleSave = () => {
    const salariesArr = crewMembers
      .map((m) => ({
        userId: m.id,
        name: m.name,
        amount: salaries[m.id] || 0,
        role: m.role,
      }))
      .filter((s) => s.amount > 0);

    const { schoolPercentage, ...formRest } = form;
    void schoolPercentage;

    onSave({
      ...formRest,
      expenses,
      schoolSum,
      remainderSum: remainder,
      salaries: salariesArr,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden pb-safe"
            style={{ willChange: "transform" }}
          >
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />

        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between shrink-0">
          <div className="min-w-0">
            <h3 id={headingId} className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
              Звіт по події
            </h3>
            <p className="text-sm text-slate-500 mt-0.5 truncate">
              {schoolName}
            </p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 text-lg leading-none p-2 -mr-2 shrink-0 active:scale-90 transition-transform duration-fast">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Охоплення */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
              <CardHeader
                icon={<Icon.Users />}
                color="bg-violet-50 text-violet-600"
                title="Охоплення та Проведення"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <Row label="Кількість дітей">
                  <NumberField
                    value={form.childrenCount}
                    onChange={(v) => setForm({ ...form, childrenCount: v })}
                    suffix="дітей"
                  />
                </Row>
                <Row label="Класів">
                  <NumberField
                    value={form.classesCount}
                    onChange={(v) => setForm({ ...form, classesCount: v })}
                    suffix="кл."
                  />
                </Row>
                <Row label="Пільгових дітей">
                  <NumberField
                    value={form.privilegedCount}
                    onChange={(v) => setForm({ ...form, privilegedCount: v })}
                  />
                </Row>
                <Row label="Кількість показів">
                  <NumberField
                    value={form.showingsCount}
                    onChange={(v) => setForm({ ...form, showingsCount: v })}
                  />
                </Row>
              </div>
            </div>

            {/* Фінансовий результат */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
              <CardHeader
                icon={<Icon.Wallet />}
                color="bg-amber-50 text-amber-600"
                title="Фінансовий результат"
              />
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500 font-medium">
                  Загальна виручка
                </span>
                <span className="inline-flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    inputMode="decimal"
                    value={form.totalSum || ""}
                    onChange={(e) =>
                      setForm({ ...form, totalSum: +e.target.value })
                    }
                    className="w-28 text-right bg-transparent outline-none font-bold text-lg text-base text-slate-800 focus:bg-blue-50 rounded px-1"
                    placeholder="0"
                  />
                  <span className="text-slate-400 text-sm">грн</span>
                </span>
              </div>

              {/* НОВЕ: Змінний відсоток для закладу */}
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Відсоток закладу</span>
                <NumberField
                  value={form.schoolPercentage}
                  onChange={(v) => setForm({ ...form, schoolPercentage: v })}
                  suffix="%"
                />
              </div>

              <Row label={`Сума закладу (${form.schoolPercentage}%)`}>
                <span>{formatMoney(schoolSum)} грн</span>
              </Row>

              <div className="py-3 border-b border-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">
                    Додаткові витрати
                  </span>
                  <span className="text-sm font-medium text-rose-500">
                    −{formatMoney(totalExpenses)} грн
                  </span>
                </div>
                {expenses.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {expenses.map((exp, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full pl-3 pr-1.5 py-1 text-xs"
                      >
                        <span className="text-slate-600">{exp.name}</span>
                        <span className="font-semibold text-slate-700">
                          {formatMoney(exp.amount)} грн
                        </span>
                        <button
                          onClick={() => removeExpense(i)}
                          className="text-slate-400 hover:text-rose-500 w-4 h-4 rounded-full flex items-center justify-center hover:bg-white"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  <input
                    placeholder="Назва витрати"
                    value={newExp.name}
                    onChange={(e) =>
                      setNewExp({ ...newExp, name: e.target.value })
                    }
                    className="flex-1 min-w-0 p-2 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    min={0}
                    inputMode="decimal"
                    placeholder="грн"
                    value={newExp.amount}
                    onChange={(e) =>
                      setNewExp({ ...newExp, amount: e.target.value })
                    }
                    className="w-20 sm:w-24 p-2 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    onClick={addExpense}
                    type="button"
                    className="px-3 shrink-0 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
                <span className="text-sm font-semibold text-emerald-700">
                  Залишок ({100 - form.schoolPercentage}%)
                </span>
                <span className="text-lg font-bold text-emerald-700">
                  {formatMoney(remainder)} грн
                </span>
              </div>
            </div>
            {crewMembers.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                <CardHeader
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  }
                  color="bg-blue-50 text-blue-600"
                  title="Заробітня плата"
                />
                <div className="space-y-1">
                  {crewMembers.map((m) => (
                    <Row key={m.id} label={`${m.name} (${m.role})`}>
                      <span className="inline-flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          inputMode="decimal"
                          value={salaries[m.id] || ""}
                          onChange={(e) =>
                            setSalaries((prev) => ({
                              ...prev,
                              [m.id]: +e.target.value,
                            }))
                          }
                          className="w-24 text-right bg-transparent outline-none font-medium text-base text-slate-800 focus:bg-blue-50 rounded px-1"
                          placeholder="0"
                        />
                        <span className="text-slate-400 text-xs">грн</span>
                      </span>
                    </Row>
                  ))}
                </div>
                {crewMembers.some((m) => salaries[m.id] > 0) && (
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                    <span className="text-sm font-semibold text-slate-500">
                      Разом ЗП
                    </span>
                    <span className="font-bold text-blue-600">
                      {formatMoney(
                        crewMembers.reduce(
                          (s, m) => s + (salaries[m.id] || 0),
                          0,
                        ),
                      )}{" "}
                      грн
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-4 sm:px-6 py-4 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] sm:pb-4 border-t border-slate-100 bg-white shrink-0">
          <button
            onClick={onClose}
            className="flex-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium py-3 active:scale-[0.97] transition-transform duration-fast"
          >
            Скасувати
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 py-3 active:scale-[0.97] transition-transform duration-fast"
          >
            Зберегти звіт
          </button>
        </div>
      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/RescheduleModal.tsx

```
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../config/api";
import { backdropVariants, modalContentVariants } from "../../../lib/motion";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  currentDate: string;
  currentTime: string;
  onSuccess: () => void;
}

export default function RescheduleModal({
  isOpen,
  onClose,
  eventId,
  currentDate,
  currentTime,
  onSuccess,
}: RescheduleModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const headingId = 'reschedule-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && currentDate) {
      setDate(currentDate.slice(0, 10));
      setTime(currentTime || "");
    }
  }, [isOpen, currentDate, currentTime]);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.patch(`/events/${eventId}/reschedule`, { date, time });
      onClose();
      onSuccess();
    } catch (e) {
      console.error("Помилка перенесення:", e);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-modal flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 id={headingId} className="text-xl font-bold text-slate-800">
            📅 Перенести подію
          </h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors">
            ✕
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Нова дата
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Новий час
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
            />
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/SchoolEditSchema.ts

```
import { z } from "zod";

export const schoolEditSchema = z.object({
  type: z.enum(["Школа", "Садочок"]),
  address: z.string().optional().default(""),
  director: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  email: z
    .union([z.literal(""), z.string().email("Некоректний email")])
    .optional(),
  childrenCount: z
    .string()
    .optional()
    .default("")
    .refine((v) => v === "" || Number(v) >= 0, "Некоректна кількість"),
});

export type SchoolEditFormValues = z.infer<typeof schoolEditSchema>;

```

# FILE: apps/frontend/src/components/school-profile/Pipeline.tsx

```
import { memo } from "react";
import { motion } from "framer-motion";
import { cardHoverVariants, DUR } from "../../lib/motion";
import type { Event } from "../../types";
interface PipelineProps {
  currentStageIndex: number;
  currentEvent: Event | null;
  onPipelineClick: (stepId: number) => void;
  stages: Array<{ id: number; key: string; name: string }>;
}

export default memo(function Pipeline({ currentStageIndex, currentEvent, onPipelineClick, stages }: PipelineProps) {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="bg-surface p-4 md:p-6 rounded-card shadow-card border border-border w-full"
    >
      <h3 className="font-bold text-content-primary mb-4 md:hidden">Етап події</h3>
      <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        <div className="flex items-start min-w-[600px] justify-between relative">
          <div className="absolute top-4 left-0 w-full h-[2px] bg-border -z-10"></div>
          {stages.map((step, index) => {
            const isCompleted = index < currentStageIndex;
            const isActive = index === currentStageIndex;
            const isNext = index === currentStageIndex + 1;
            const isClickable = !!currentEvent && isNext;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1 z-10 px-1">
                <motion.button
                  onClick={() => isClickable && onPipelineClick(step.id)}
                  whileHover={isClickable ? { scale: 1.15 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                  transition={{ duration: DUR.fast }}
                  className={`w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full text-xs font-bold border-2 mb-2 transition-colors
                    ${isCompleted
                      ? 'border-brand text-brand bg-surface'
                      : isActive
                      ? 'border-brand bg-brand text-white shadow-md'
                      : isNext
                      ? 'border-brand-300 bg-surface text-brand-300 cursor-pointer'
                      : 'border-border-strong text-content-muted bg-surface cursor-not-allowed opacity-50'
                    }`}
                >
                  {isCompleted ? '✓' : step.id}
                </motion.button>
                <span className={`text-2xs md:text-xs leading-tight font-medium text-center break-words max-w-[70px]
                  ${isActive ? 'text-brand font-bold' : isNext ? 'text-brand-300' : 'text-content-muted'}`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
});

```

# FILE: apps/frontend/src/components/school-profile/SchoolInfoCard.tsx

```
import { memo } from "react";
import AddressLink from "../AddressLink";
import PhoneLink from "../PhoneLink";
import { motion } from "framer-motion";
import { cardHoverVariants, DUR } from "../../lib/motion";
import type { SchoolProfileData } from "../../types";

export default memo(function SchoolInfoCard({
  schoolData,
}: {
  schoolData: SchoolProfileData;
}) {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="bg-surface p-6 rounded-card shadow-card border border-border"
    >
      <ul className="space-y-4 text-sm">
        {[
          { icon: "🏛", label: "Тип", value: schoolData.type || "—" },
          { icon: "📍", label: "Місто", value: schoolData.city || "—" },
          {
            icon: "🗺",
            label: "Адреса",
            value: <AddressLink address={schoolData.address} />,
          },
          { icon: "👤", label: "Контакт", value: schoolData.director || "—" },
          {
            icon: "📞",
            label: "Телефон",
            value: <PhoneLink phone={schoolData.phone} />,
          },
          { icon: "👥", label: "Дітей", value: schoolData.childrenCount || 0 },
        ].map(({ icon, label, value }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: DUR.normal, delay: i * 0.05 }}
            className="flex gap-3"
          >
            <span className="text-content-muted">{icon}</span>
            <div>
              <span className="text-content-muted">{label}:</span>{" "}
              <span className="font-medium text-content-primary">{value}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
});

```

# FILE: apps/frontend/src/components/school-profile/SchoolProfileHeader.tsx

```
import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PhoneLink from "../PhoneLink";
import { scaleVariants, DUR, EASE } from "../../lib/motion";
import type { SchoolProfileData } from "../../types";

interface Props {
  schoolData: SchoolProfileData;
  onEdit: () => void;
  onAddEvent: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" },
});

export default memo(function SchoolProfileHeader({ schoolData, onEdit, onAddEvent }: Props) {
  return (
    <div className="mb-6">
      <motion.div {...fadeUp(0)} className="text-xs md:text-sm text-content-muted mb-5 truncate">
        <Link to="/schools" className="hover:text-brand transition-colors">
          Школи / Садочки
        </Link>
        <span className="mx-2">›</span>
        <span className="text-content-primary font-medium">
          {schoolData.type} "{schoolData.name}"
        </span>
      </motion.div>

      <motion.div
        {...fadeUp(0.05)}
        className="relative bg-surface rounded-card shadow-card border border-border overflow-hidden mb-2"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-brand to-brand-700" />

        <div className="p-5 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <motion.div
              variants={scaleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: DUR.slow, delay: 0.1, ease: EASE.decelerate }}
              className="w-14 h-14 md:w-16 md:h-16 rounded-card bg-brand-50 flex items-center justify-center text-3xl shrink-0"
            >
              🏫
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.h1
                {...fadeUp(0.12)}
                className="text-2xl md:text-3xl font-bold text-content-primary leading-tight"
              >
                {schoolData.type} «{schoolData.name}»
              </motion.h1>
              <motion.div {...fadeUp(0.18)} className="flex flex-wrap items-center gap-3 mt-2">
                {schoolData.city && (
                  <span className="text-sm text-content-muted flex items-center gap-1">
                    📍 {schoolData.city}
                  </span>
                )}
                {schoolData.director && (
                  <span className="text-sm text-content-muted flex items-center gap-1">
                    👤 {schoolData.director}
                  </span>
                )}
                {schoolData.phone && (
                  <span className="text-sm text-content-muted">
                    <PhoneLink phone={schoolData.phone} />
                  </span>
                )}
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.2)} className="hidden md:flex gap-2 shrink-0">
              <button
                onClick={onAddEvent}
                className="flex flex-col items-center gap-1 px-5 py-3 bg-brand text-white rounded-control hover:bg-brand-hover active:scale-95 transition-all shadow-sm text-xs font-semibold"
              >
                <span className="text-lg leading-none">＋</span>
                Подія
              </button>
              <button
                onClick={onEdit}
                className="flex flex-col items-center gap-1 px-5 py-3 bg-surface border border-border-strong text-content-secondary rounded-control hover:bg-surface-muted hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all text-xs font-semibold"
              >
                <span className="text-lg leading-none">✏️</span>
                Редагувати
              </button>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="md:hidden flex gap-2">
              <button
                onClick={onEdit}
                className="w-11 h-11 bg-surface border border-border-strong text-content-secondary rounded-control flex items-center justify-center shadow-sm active:bg-surface-muted active:scale-95 transition-all"
              >
                ✏️
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
```

# FILE: apps/frontend/src/components/schools/SchoolDesktopTable.tsx

```
import React from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeVariants, staggerContainer, staggerItem, TRANSITION } from "../../lib/motion";
import type { School, PipelineStage } from "../../types";
import { CATEGORY_BADGES } from "../../constants/categoryBadges";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
}

interface SchoolRowProps {
  school: School;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  navigate: NavigateFunction;
}

export const SchoolRow = React.memo(
  ({ school, onDelete, stages, navigate }: SchoolRowProps) => {
    const latestEvent = school.events?.[0];
    const stage = latestEvent
      ? stages.find((s) => s.key === latestEvent.status)
      : null;
    const categories = (school as any).categories as string[] | undefined;

    return (
      <motion.tr
        variants={staggerItem}
        onClick={() => navigate(`/schools/${school.id}`)}
        className="border-b border-slate-50 transition-colors cursor-pointer"
        whileHover={{ backgroundColor: "rgba(239, 246, 255, 0.5)" }}
        transition={TRANSITION.hover}
      >
        <td className="p-4 font-bold text-slate-800 overflow-hidden">
          <span className="block truncate" title={school.name}>
            {school.name}
          </span>
        </td>
        <td className="p-4 font-medium text-slate-600">{school.city?.name}</td>
        <td className="p-4">
          <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
            Активна
          </span>
        </td>
        <td className="p-4">
          {categories && categories.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${CATEGORY_BADGES[cat]?.className ?? "bg-slate-50 text-slate-500 border-slate-100"}`}
                >
                  {CATEGORY_BADGES[cat]?.label ?? cat}
                </span>
              ))}
            </div>
          ) : stage ? (
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
              {stage.name}
            </span>
          ) : (
            <span className="text-slate-400 text-xs italic">—</span>
          )}
        </td>
        <td className="p-4 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e, school.id, school.name);
            }}
            className="p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all text-lg"
          >
            🗑
          </button>
        </td>
      </motion.tr>
    );
  },
);

SchoolRow.displayName = "SchoolRow";

export default function SchoolDesktopTable({
  schools,
  searchQuery,
  onDelete,
  stages,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0 min-w-0 custom-scrollbar">
      <div className="overflow-y-auto flex-1 min-w-0">
        <table className="w-full text-left border-collapse table-fixed">
          <colgroup>
            <col style={{ width: "42%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr className="border-b border-slate-100">
              <th className="p-4 font-medium text-slate-600">Назва школи</th>
              <th className="p-4 font-medium text-slate-600">Місто</th>
              <th className="p-4 font-medium text-slate-600">Статус</th>
              <th className="p-4 font-medium text-slate-600">Поточний етап</th>
              <th className="p-4 font-medium text-slate-600 text-center">
                Дія
              </th>
            </tr>
          </thead>
          <motion.tbody
            className="divide-y divide-slate-50"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {schools.map((school) => (
                <SchoolRow
                  key={school.id}
                  school={school}
                  onDelete={onDelete}
                  stages={stages}
                  navigate={navigate}
                />
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
        {schools.length === 0 && (
          <motion.div
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            className="text-center py-16 text-slate-400 text-sm font-medium"
          >
            {searchQuery
              ? `Нічого не знайдено за «${searchQuery}»`
              : "Шкіл ще немає"}
          </motion.div>
        )}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/schools/SchoolMobileList.tsx

```
import React from "react";
import { useNavigate } from "react-router-dom";
import type { School, PipelineStage } from "../../types";
import { CATEGORY_BADGES } from "../../constants/categoryBadges";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
}

interface SchoolCardProps {
  school: School;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  index?: number;
}

export const SchoolCard = React.memo(
  ({ school, onDelete, stages, index = 0 }: SchoolCardProps) => {
    const navigate = useNavigate();
    const latestEvent = school.events?.[0];
    const stage = latestEvent
      ? stages.find((s) => s.key === latestEvent.status)
      : null;
    const categories = (school as any).categories as string[] | undefined;

    return (
      <div
        className="bg-surface rounded-card border border-border p-4 shadow-card transition-all hover:shadow-card-hover hover:border-brand-200 cursor-pointer active:scale-[0.99]"
        onClick={() => navigate(`/schools/${school.id}`)}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-content-primary leading-snug text-sm line-clamp-2 flex-1">
            {school.name}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e, school.id, school.name);
            }}
            className="text-neutral-300 hover:text-danger hover:bg-danger-subtle transition-all p-2.5 rounded-control"
          >
            🗑
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          {school.phone ? (
            <a
              href={`tel:${school.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-brand font-medium truncate"
            >
              📞 {school.director || school.phone}
            </a>
          ) : (
            <span className="text-xs text-content-muted truncate">
              👤 {school.director || "Контакт не вказано"}
            </span>
          )}
          {categories && categories.length > 0 ? (
            <div className="flex flex-wrap gap-1 justify-end">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`text-2xs px-2 py-0.5 rounded-pill font-medium border ${CATEGORY_BADGES[cat]?.className ?? "bg-surface-muted text-content-muted border-border"}`}
                >
                  {CATEGORY_BADGES[cat]?.label ?? cat}
                </span>
              ))}
            </div>
          ) : (
            stage && (
              <span className="text-2xs px-2 py-0.5 bg-brand-50 text-brand rounded-pill font-medium border border-brand-100">
                {stage.name}
              </span>
            )
          )}
        </div>
      </div>
    );
  },
);

SchoolCard.displayName = "SchoolCard";

export default function SchoolMobileList({
  schools,
  searchQuery,
  onDelete,
  stages,
}: Props) {
  return (
    <>
      <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-3 pb-24 px-1 custom-scrollbar">
        {schools.map((school, index) => (
          <SchoolCard
            key={school.id}
            school={school}
            index={index}
            onDelete={onDelete}
            stages={stages}
          />
        ))}

        {schools.length === 0 && (
          <div className="text-center py-10 text-content-muted">
            <p>
              {searchQuery
                ? `Нічого не знайдено за «${searchQuery}»`
                : "Шкіл ще немає"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

```

# FILE: apps/frontend/src/components/schools/schoolUtils.ts

```
import type { School } from "../../types";

const PLANNED_STAGES = ["BASE", "FIRST_CONTACT", "DATE_CONFIRMED"];
const IN_PROGRESS_STAGES = ["PREPARATION", "IN_PROGRESS", "DONE"];
const NOT_CONFIRMED_STAGES = ["REPORT"];

export function classifySchool(
  school: School,
): "new" | "planned" | "inProgress" | "notConfirmed" | "done" {
  const events = (school.events || []).filter(
    (e) => e.status !== "RE_SALE",
  );
  if (events.length === 0) {
    return (school.events || []).some((e) => e.status === "RE_SALE")
      ? "done"
      : "new";
  }
  const latest = events[events.length - 1];
  if (PLANNED_STAGES.includes(latest.status)) return "planned";
  if (NOT_CONFIRMED_STAGES.includes(latest.status)) return "notConfirmed";
  if (IN_PROGRESS_STAGES.includes(latest.status)) return "inProgress";
  if (latest.status === "RE_SALE") return "done";
  return "new";
}

export function classifySize(
  school: School,
  schoolType: "Школа" | "Садочок" = "Школа",
): "small" | "medium" | "large" {
  const count = school.childrenCount ?? 0;
  if (schoolType === "Садочок") {
    if (count < 50) return "small";
    if (count < 100) return "medium";
    return "large";
  }
  if (count < 500) return "small";
  if (count < 900) return "medium";
  return "large";
}

```

# FILE: apps/frontend/src/components/schools/StatsBar.tsx

```
import React from "react";
export { classifySchool, classifySize } from "./schoolUtils";

interface StatsBarProps {
  statusStats: Record<string, number>;
  sizeStats: Record<string, number>;
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  sizeFilter: string | null;
  onSizeFilterChange: (filter: string | null) => void;
  schoolType?: "Школа" | "Садочок";
}


const STATUS_ITEMS = [
  {
    key: "new",
    label: "Нові",
    dot: "bg-slate-400",
    active: "bg-slate-800 text-white",
    inactive: "text-slate-600",
  },
  {
    key: "planned",
    label: "Заплановані",
    dot: "bg-amber-400",
    active: "bg-amber-500 text-white",
    inactive: "text-amber-600",
  },
  {
    key: "inProgress",
    label: "В роботі",
    dot: "bg-blue-500",
    active: "bg-blue-600 text-white",
    inactive: "text-blue-600",
  },
  {
    key: "notConfirmed",
    label: "Не підтв.",
    dot: "bg-rose-400",
    active: "bg-rose-600 text-white",
    inactive: "text-rose-600",
  },
  {
    key: "done",
    label: "Проведені",
    dot: "bg-emerald-500",
    active: "bg-emerald-600 text-white",
    inactive: "text-emerald-600",
  },
];

const SIZE_ITEMS_SCHOOL = [
  {
    key: "small",
    label: "Малі",
    sublabel: "< 150",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "medium",
    label: "Середні",
    sublabel: "150–500",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "large",
    label: "Великі",
    sublabel: "500+",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
];

const SIZE_ITEMS_KINDER = [
  {
    key: "small",
    label: "Малі",
    sublabel: "< 50",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "medium",
    label: "Середні",
    sublabel: "50–100",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "large",
    label: "Великі",
    sublabel: "100+",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
];

export default function StatsBar({
  statusStats,
  activeFilter,
  onFilterChange,
  sizeStats,
  sizeFilter,
  onSizeFilterChange,
  schoolType = "Школа",
}: StatsBarProps) {
  const sizeItems =
    schoolType === "Садочок" ? SIZE_ITEMS_KINDER : SIZE_ITEMS_SCHOOL;

  return (
    <div className="flex flex-col gap-2 mb-4">
      {/* Рядок 1: статус */}
      <div className="flex items-center bg-surface rounded-card shadow-card border border-border overflow-hidden">
        {STATUS_ITEMS.map((item, i) => {
          const isActive = activeFilter === item.key;
          return (
            <React.Fragment key={item.key}>
              {i > 0 && <div className="w-px h-8 bg-border shrink-0" />}
              <button
                onClick={() => onFilterChange(isActive ? null : item.key)}
                className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
                  isActive
                    ? item.active
                    : `bg-surface ${item.inactive} hover:bg-surface-muted`
                }`}
              >
                <span className="text-base font-bold tabular-nums leading-none">
                  {statusStats[item.key] ?? 0}
                </span>
                <span className="text-2xs mt-1 leading-none opacity-80 truncate w-full text-center">
                  {item.label}
                </span>
              </button>
            </React.Fragment>
          );
        })}
        {activeFilter && (
          <button
            onClick={() => onFilterChange(null)}
            className="px-3 text-content-muted hover:text-content-secondary text-lg shrink-0 border-l border-border self-stretch flex items-center"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center bg-surface rounded-card shadow-card border border-border overflow-hidden">
        {sizeItems.map((item, i) => {
          const isActive = sizeFilter === item.key;
          return (
            <React.Fragment key={item.key}>
              {i > 0 && <div className="w-px h-8 bg-border shrink-0" />}
              <button
                onClick={() => onSizeFilterChange(isActive ? null : item.key)}
                className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
                  isActive
                    ? item.active
                    : `bg-surface ${item.inactive} hover:bg-surface-muted`
                }`}
              >
                <span className="text-base font-bold tabular-nums leading-none">
                  {sizeStats[item.key] ?? 0}
                </span>
                <span className="text-2xs mt-1 leading-none opacity-80 truncate w-full text-center">
                  {item.label}
                  <span className="opacity-60 ml-0.5">{item.sublabel}</span>
                </span>
              </button>
            </React.Fragment>
          );
        })}
        {sizeFilter && (
          <button
            onClick={() => onSizeFilterChange(null)}
            className="px-3 text-content-muted hover:text-content-secondary text-lg shrink-0 border-l border-border self-stretch flex items-center"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/schools/VirtualDesktopTable.tsx

```
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SchoolRow } from "./SchoolDesktopTable";
import type { School, PipelineStage } from "../../types";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  onEndReached?: () => void;
}

export default function VirtualDesktopTable({
  schools,
  searchQuery,
  onDelete,
  stages,
  onEndReached,
}: Props) {
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: schools.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 57,
    overscan: 8,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!onEndReached || !lastItem) return;
    if (lastItem.index >= schools.length - 5) {
      onEndReached();
    }
  }, [lastItem?.index, schools.length, onEndReached]);

  return (
    <div ref={parentRef} className="overflow-y-auto flex-1 h-full min-w-0">
      <table className="w-full text-left border-collapse table-fixed">
        <colgroup>
          <col style={{ width: "42%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead className="sticky top-0 z-10 bg-slate-50">
          <tr className="border-b border-slate-100">
            <th className="p-4 font-medium text-slate-600">Назва школи</th>
            <th className="p-4 font-medium text-slate-600">Місто</th>
            <th className="p-4 font-medium text-slate-600">Статус</th>
            <th className="p-4 font-medium text-slate-600">Поточний етап</th>
            <th className="p-4 font-medium text-slate-600 text-center">Дія</th>
          </tr>
        </thead>
        <tbody>
          {virtualItems.length > 0 && (
            <tr>
              <td
                colSpan={5}
                style={{ height: `${virtualItems[0].start}px`, padding: 0, border: "none" }}
              />
            </tr>
          )}
          {virtualItems.map((virtualRow) => (
            <SchoolRow
              key={schools[virtualRow.index].id}
              school={schools[virtualRow.index]}
              onDelete={onDelete}
              stages={stages}
              navigate={navigate}
            />
          ))}
          {virtualItems.length > 0 && (
            <tr>
              <td
                colSpan={5}
                style={{
                  height: `${rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end}px`,
                  padding: 0,
                  border: "none",
                }}
              />
            </tr>
          )}
        </tbody>
      </table>

      {schools.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm font-medium">
          {searchQuery
            ? `Нічого не знайдено за «${searchQuery}»`
            : "Шкіл ще немає"}
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/components/ui/Badge.tsx

```
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SPRING } from "../../lib/motion";

type BadgeVariant = "default" | "success" | "danger" | "warning" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-700 border-neutral-200",
  success: "bg-success-50 text-success-700 border-success-200",
  danger: "bg-danger-50 text-danger-600 border-danger-200",
  warning: "bg-warning-50 text-warning-600 border-warning-100",
  info: "bg-brand-50 text-brand-700 border-brand-200",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-2xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({ children, variant = "default", size = "md", className = "" }: BadgeProps) {
  return (
    <motion.span
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={SPRING.snappy}
      className={`inline-flex items-center font-semibold rounded-pill border
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </motion.span>
  );
}

```

# FILE: apps/frontend/src/components/ui/Button.tsx

```
import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { TRANSITION } from "../../lib/motion";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed",
  secondary: "bg-surface-muted text-content-secondary hover:bg-border-strong disabled:opacity-50 disabled:cursor-not-allowed",
  danger: "bg-danger text-white hover:bg-danger/90 disabled:opacity-50 disabled:cursor-not-allowed",
  ghost: "bg-transparent text-content-secondary hover:bg-surface-muted disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

interface Props extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", isLoading, className = "", children, disabled, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={TRANSITION.tap}
      disabled={disabled || isLoading}
      className={`rounded-control font-medium transition-all duration-fast
        hover:shadow-lift active:shadow-none
        focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? "…" : children}
    </motion.button>
  )
);

```

# FILE: apps/frontend/src/components/ui/Card.tsx

```
import type { ReactNode, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cardHoverVariants, TRANSITION } from "../../lib/motion";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-3",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({ children, padding = "md", className = "", ...props }: Props) {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      transition={TRANSITION.position}
      className={`bg-surface rounded-card shadow-card border border-border active:scale-[0.98] transition-transform duration-fast
        ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/components/ui/ConfirmDialog.tsx

```
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";
import { backdropVariants, modalContentVariants, SPRING, TRANSITION } from "../../lib/motion";

type Variant = "danger" | "warning";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: Variant;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantStyles: Record<Variant, { icon: string; button: string }> = {
  danger: {
    icon: "bg-red-100 text-red-600",
    button: "bg-red-600 hover:bg-red-700 text-white",
  },
  warning: {
    icon: "bg-amber-100 text-amber-600",
    button: "bg-amber-600 hover:bg-amber-700 text-white",
  },
};

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Підтвердити",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => confirmRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") { e.preventDefault(); onConfirm(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onCancel, onConfirm]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onCancel}
          whileTap={{ backgroundColor: "rgba(15, 23, 42, 0.55)" }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
          >
            <div className="flex items-start gap-4">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${variantStyles[variant].icon}`}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ ...SPRING.bouncy, delay: 0.15 }}
              >
                {variant === "danger" ? <Trash2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 id="confirm-dialog-title" className="text-lg font-bold text-content-primary">{title}</h3>
                <p className="text-sm text-content-secondary mt-1">{message}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <motion.button
                onClick={onCancel}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-neutral-100 text-content-secondary hover:bg-neutral-200 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={TRANSITION.hover}
              >
                Скасувати
              </motion.button>
              <motion.button
                ref={confirmRef}
                onClick={onConfirm}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${variantStyles[variant].button}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={TRANSITION.hover}
              >
                {confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/ui/EmptyState.tsx

```
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { emptyStateVariants, TRANSITION } from "../../lib/motion";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      {Icon && (
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4"
        >
          <Icon className="w-6 h-6 text-neutral-400" />
        </motion.div>
      )}
      <h3 className="text-base font-semibold text-content-primary mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-content-muted max-w-xs mb-4">{description}</p>
      )}
      {action && (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={TRANSITION.hover}>
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/components/ui/ErrorShake.tsx

```
import { motion } from "framer-motion";
import { shakeVariants, useReducedMotion } from "../../lib/motion";

interface ErrorShakeProps {
  children: React.ReactNode;
  className?: string;
  shake?: boolean;
}

export function ErrorShake({ children, className = "", shake = false }: ErrorShakeProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      animate={shake && !reduced ? "shake" : undefined}
      variants={shakeVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/components/ui/Input.tsx

```
import { forwardRef, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-content-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`rounded-control border px-3.5 py-2.5 text-base text-content-primary bg-surface
            placeholder:text-content-muted transition-colors duration-fast
            ${error ? "border-danger" : "border-border-strong hover:border-content-muted"}
            focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

```

# FILE: apps/frontend/src/components/ui/LoadingBar.tsx

```
import { motion, AnimatePresence } from "framer-motion";
import { DUR, EASE } from "../../lib/motion";

interface LoadingBarProps {
  isLoading: boolean;
}

export function LoadingBar({ isLoading }: LoadingBarProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: DUR.slow, ease: EASE.outExpo }}
          className="fixed top-0 left-0 right-0 z-modal h-0.5 bg-brand origin-left"
        >
          <motion.div
            className="absolute inset-0 bg-brand-300"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/ui/Modal.tsx

```
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useId, type ReactNode } from "react";
import { X } from "lucide-react";
import { backdropVariants, modalContentVariants } from "../../lib/motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }: ModalProps) {
  const generatedId = useId();
  const headingId = `modal-${generatedId}`;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`bg-surface rounded-t-3xl sm:rounded-modal shadow-modal w-full sm:${maxWidth} overflow-hidden max-h-[90vh] flex flex-col pb-safe`}
            style={{ willChange: "transform" }}
          >
            <div className="sm:hidden w-10 h-1.5 bg-border-strong rounded-pill mx-auto mt-3" />
            <div className="p-5 sm:p-6 border-b border-border flex justify-between items-center bg-surface-subtle shrink-0">
              <h3 id={headingId} className="text-lg font-bold text-content-primary">{title}</h3>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Закрити"
                className="p-2 -mr-2 text-content-muted hover:text-content-primary rounded-control transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/ui/OptimizedImage.tsx

```
import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  width?: number | string;
  height?: number | string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  ...props
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`object-cover ${className}`}
      {...props}
    />
  );
}

```

# FILE: apps/frontend/src/components/ui/Skeleton.tsx

```
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-neutral-200 rounded-control motion-reduce:animate-none animate-pulse ${className}`}
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className = "" }: SkeletonTextProps) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-neutral-200 rounded-control motion-reduce:animate-none animate-pulse h-4 ${
            i === lines - 1 ? "w-3/4" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

interface SkeletonCircleProps {
  size?: number;
  className?: string;
}

export function SkeletonCircle({ size = 40, className = "" }: SkeletonCircleProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`bg-neutral-200 rounded-full motion-reduce:animate-none animate-pulse ${className}`}
    />
  );
}

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div className={`bg-surface rounded-card shadow-card border border-border overflow-hidden ${className}`}>
      <div className="relative overflow-hidden bg-neutral-100 h-44">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent motion-reduce:animate-none animate-shimmer" />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/ui/SuccessCheck.tsx

```
import { motion } from "framer-motion";
import { checkmarkVariants } from "../../lib/motion";
import { useReducedMotion } from "../../lib/motion";
import { Check } from "lucide-react";

interface SuccessCheckProps {
  size?: number;
  className?: string;
}

export function SuccessCheck({ size = 48, className = "" }: SuccessCheckProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : "hidden"}
      animate="visible"
      variants={checkmarkVariants}
      className={`inline-flex items-center justify-center rounded-full bg-success/10 ${className}`}
      style={{ width: size, height: size }}
    >
      <Check className="text-success" style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={3} />
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/components/ui/Toast.tsx

```
import { createContext, useCallback, useContext, useState, useRef, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { DUR, EASE, SPRING } from "../../lib/motion";
import { X } from "lucide-react";

type ToastKind = "success" | "error" | "info";

interface ToastItem {
  id: number;
  msg: string;
  kind: ToastKind;
  duration: number;
}

const TOAST_DURATION = 4000;

const kindStyles: Record<ToastKind, string> = {
  success: "bg-success",
  error: "bg-danger",
  info: "bg-slate-800",
};

const ToastContext = createContext<(msg: string, kind?: ToastKind) => void>(() => {});

export const useToast = () => useContext(ToastContext);

function ToastItemView({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: number) => void }) {
  const progress = useMotionValue(1);
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = useCallback(() => {
    progress.set(1);
    animate(progress, 0, { duration: toast.duration / 1000, ease: "linear" });
    timerRef.current = setTimeout(() => onDismiss(toast.id), toast.duration);
  }, [progress, toast.id, toast.duration, onDismiss]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    progress.stop();
  }, [progress]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [startTimer]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95, transition: { duration: DUR.fast, ease: EASE.accelerate } }}
      transition={SPRING.gentle}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      className="pointer-events-auto relative overflow-hidden px-4 py-3 rounded-control shadow-modal text-sm font-medium text-white pr-9"
    >
      <span className={`absolute inset-0 ${kindStyles[toast.kind]}`} />
      <span className="relative z-10 flex items-center gap-2">
        <span>{toast.msg}</span>
      </span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="absolute top-2.5 right-2.5 z-20 p-0.5 rounded-full text-white/70 hover:text-white transition-colors"
        aria-label="Закрити"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-white/40"
        style={{ width }}
      />
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback((msg: string, kind: ToastKind = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, kind, duration: TOAST_DURATION }]);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed right-4 z-[100] flex flex-col gap-2 pointer-events-none" style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }} role="alert" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItemView key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

```

# FILE: apps/frontend/src/components/VirtualSchoolList.tsx

```
import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { School } from "../types";

interface VirtualSchoolListProps {
  schools: School[];
  renderItem: (school: School, index: number) => JSX.Element;
  itemHeight?: number;
  onEndReached?: () => void;
  animationKey?: string | number;
}

export default function VirtualSchoolList({
  schools,
  renderItem,
  itemHeight = 120,
  onEndReached,
  animationKey,
}: VirtualSchoolListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: schools.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!onEndReached || !lastItem) return;
    if (lastItem.index >= schools.length - 5) {
      onEndReached();
    }
  }, [lastItem?.index, schools.length, onEndReached]);

  return (
    <div ref={parentRef} className="h-[calc(100vh-200px)] overflow-auto w-full">
      <div
        key={animationKey}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div
              className="school-row-enter transition-colors hover:bg-blue-50/50"
              style={{
                animationDelay: `${Math.min(virtualRow.index * 40, 400)}ms`,
              }}
            >
              {renderItem(schools[virtualRow.index], virtualRow.index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/config/api.ts

```
import axios, { AxiosError } from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

api.interceptors.request.use((config) => {
  if (config.method && config.method !== "get") {
    const csrfToken = getCookie("csrf_token");
    if (csrfToken) config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

let refreshPromise: Promise<void> | null = null;

function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/auth/refresh")
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as (typeof error.config & { _retry?: boolean }) | undefined;

    const isAuthEndpoint = original?.url?.includes("/auth/login") || original?.url?.includes("/auth/refresh") || original?.url?.includes("/auth/me");

    if (error.response?.status === 401 && original && !original._retry && !isAuthEndpoint) {
      original._retry = true;
      try {
        await refreshSession();
        return api(original);
      } catch {
        window.dispatchEvent(new Event("auth:expired"));
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

```

# FILE: apps/frontend/src/constants/categoryBadges.ts

```
export const CATEGORY_BADGES: Record<string, { label: string; className: string }> = {
  planned: {
    label: "Заплановано",
    className: "bg-blue-50 text-blue-600 border-blue-100",
  },
  inProgress: {
    label: "У процесі",
    className: "bg-amber-50 text-amber-600 border-amber-100",
  },
  notConfirmed: {
    label: "Не Підтверджені",
    className: "bg-rose-50 text-rose-600 border-rose-100",
  },
  done: {
    label: "Проведено",
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
};

```

# FILE: apps/frontend/src/constants/cityIcons.ts

```
export const CITY_ICONS: Record<string, string> = {
  Львів: "🦁",
  Київ: "🏰",
  Харків: "⚙️",
  Одеса: "⚓",
  Дніпро: "🌊",
  Запоріжжя: "⚡",
  "Івано-Франківськ": "⛰️",
  Чернівці: "🏛️",
  Тернопіль: "⛵",
  Ужгород: "🌸",
  Миколаїв: "🚢",
  Вінниця: "⛲",
  Херсон: "🍉",
  Полтава: "🥟",
  Чернігів: "⛪",
  Черкаси: "🌳",
  Суми: "🎪",
  Житомир: "🚀",
  Хмельницький: "🛍️",
  Рівне: "💎",
  Кропивницький: "🎭",
  Луцьк: "🏰",
};

export const DEFAULT_CITY_ICON = "🏙️";

```

# FILE: apps/frontend/src/constants/navTabs.ts

```
import type { ComponentType } from "react";
import {
  Home,
  School,
  Baby,
  Wallet,
  Calendar,
  Users,
  MapPin,
  BarChart3,
  ClipboardCheck,
  Package,
  Trophy,
  LayoutDashboard,
  AlertTriangle,
} from "lucide-react";

export interface NavTab {
  to: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  roles?: string[];
}

export interface DashboardTab {
  id: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  roles?: string[];
}

export const NAV_TABS: NavTab[] = [
  { to: "/dashboard", icon: Home, label: "Дашборд", roles: ["SUPERADMIN", "MANAGER", "OWNER"] },
  { to: "/reports/review", icon: ClipboardCheck, label: "Звіти", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { to: "/inventory", icon: Package, label: "Склад", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { to: "/schools", icon: School, label: "Школи" },
  { to: "/kindergartens", icon: Baby, label: "Садочки" },
  { to: "/finance", icon: Wallet, label: "Фінанси" },
  { to: "/calendar", icon: Calendar, label: "Календар" },
  { to: "/cities", icon: MapPin, label: "Міста", roles: ["SUPERADMIN", "MANAGER", "OWNER"] },
  { to: "/employees", icon: Users, label: "Працівники", roles: ["SUPERADMIN"] },
  { to: "/analytics", icon: BarChart3, label: "Аналітика", roles: ["SUPERADMIN", "OWNER"] },
  { to: "/city-leaderboard", icon: Trophy, label: "Рейтинг", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
];

export const ADMIN_TABS: NavTab[] = [
  { to: "/cities", icon: MapPin, label: "Міста", roles: ["SUPERADMIN"] },
];

export const DASHBOARD_TABS: DashboardTab[] = [
  { id: "overview", icon: LayoutDashboard, label: "Огляд", roles: ["SUPERADMIN", "MANAGER", "OWNER"] },
  { id: "reports", icon: ClipboardCheck, label: "Звіти", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { id: "leaderboard", icon: Trophy, label: "Рейтинг", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { id: "issues", icon: AlertTriangle, label: "Проблеми", roles: ["SUPERADMIN", "OWNER", "MANAGER"] },
  { id: "analytics", icon: BarChart3, label: "Аналітика", roles: ["SUPERADMIN", "OWNER"] },
];
```

# FILE: apps/frontend/src/constants/pipelineStages.ts

```
export const PIPELINE_STAGES = [
  { key: "BASE", name: "Новий заклад" },
  { key: "FIRST_CONTACT", name: "Знайомство" },
  { key: "DATE_CONFIRMED", name: "Підтвердження дати" },
  { key: "PREPARATION", name: "Оголошення" },
  { key: "IN_PROGRESS", name: "Підготовка" },
  { key: "DONE", name: "Проведення заходу" },
  { key: "REPORT", name: "Звіт" },
];

```

# FILE: apps/frontend/src/context/AuthContext.tsx

```
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api } from "../config/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  cityId?: string | null;
  cityName?: string | null;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleExpired = () => {
      setUser(null);
      window.location.href = "/login";
    };
    window.addEventListener("auth:expired", handleExpired);
    return () => window.removeEventListener("auth:expired", handleExpired);
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error("Logout error", e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

```

# FILE: apps/frontend/src/context/CityContext.tsx

```
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

interface SelectedCity {
  id: string;
  name: string;
}

interface CityContextType {
  selectedCity: SelectedCity;
  setSelectedCity: (city: SelectedCity) => void;
  isCityLocked: boolean;
}

const DEFAULT_CITY: SelectedCity = { id: "", name: "Львів" };

const CityContext = createContext<CityContextType>({
  selectedCity: DEFAULT_CITY,
  setSelectedCity: () => {},
  isCityLocked: false,
});

export function CityProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const isCityLocked = user?.role === "MANAGER" && !!user.cityId;

  const [selectedCity, setSelectedCityState] = useState<SelectedCity>(() => {
    try {
      const raw = localStorage.getItem("selectedCity");
      return raw ? JSON.parse(raw) : DEFAULT_CITY;
    } catch {
      return DEFAULT_CITY;
    }
  });

  useEffect(() => {
    if (isCityLocked && user?.cityId) {
      setSelectedCityState({ id: user.cityId, name: user.cityName || "" });
    }
  }, [isCityLocked, user?.cityId, user?.cityName]);

  const setSelectedCity = (city: SelectedCity) => {
    if (isCityLocked) return;
    setSelectedCityState(city);
    localStorage.setItem("selectedCity", JSON.stringify(city));
  };

  return (
    <CityContext.Provider
      value={{ selectedCity, setSelectedCity, isCityLocked }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useSelectedCity() {
  return useContext(CityContext);
}

```

# FILE: apps/frontend/src/features/calendar/components/CalendarHeader.tsx

```
import { motion } from "framer-motion";
import type { Project, City } from "../../../types";
import { staggerContainer, staggerItem } from "../../../lib/motion";

interface CalendarHeaderProps {
  projects: Project[];
  filterCityId: string;
  setFilterCityId: (value: string) => void;
  cities: City[];
  userRole: string;
}

const BADGE_COLORS: Record<string, string> = {
  blue: "bg-blue-400",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
  red: "bg-red-500",
  amber: "bg-amber-400",
  purple: "bg-purple-400",
};

export default function CalendarHeader({
  projects,
  filterCityId,
  setFilterCityId,
  cities,
  userRole,
}: CalendarHeaderProps) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Календар подій
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Графік запланованих та активних заходів
        </p>

        <div className="hidden md:flex flex-wrap items-center gap-3 mt-4">
          {projects.map((p: Project) => {
            const badgeColor = BADGE_COLORS[p.color] || "bg-blue-400";
            return (
              <span
                key={p.id}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
              >
                <span className={`w-3 h-3 rounded-full ${badgeColor}`}></span>{" "}
                {p.name}
              </span>
            );
          })}
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>{" "}
            Вихідний
          </span>
        </div>
      </motion.div>

      {userRole === "SUPERADMIN" && (
        <motion.div variants={staggerItem} className="hidden md:flex bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 items-center gap-3 shrink-0">
          <span className="text-sm text-slate-500 font-medium">Місто:</span>
          <select
            value={filterCityId}
            onChange={(e) => setFilterCityId(e.target.value)}
            className="text-sm font-semibold text-slate-800 outline-none cursor-pointer bg-transparent"
          >
            <option value="ALL">🌍 Всі міста</option>
            {cities.map((c: City) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </motion.div>
      )}
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/features/calendar/components/CalendarSkeleton.tsx

```
export default function CalendarSkeleton() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="h-8 w-52 bg-slate-200 rounded-xl mb-2" />
          <div className="h-4 w-72 bg-slate-200 rounded-lg mb-4" />
          <div className="flex gap-3 mt-4">
            {[80, 100, 90].map((w, i) => (
              <div
                key={i}
                className="h-4 bg-slate-200 rounded-full"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>
        <div className="h-10 w-48 bg-slate-200 rounded-xl" />
      </div>

      <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100">
          <div className="h-8 w-36 bg-slate-200 rounded-xl" />
          <div className="h-10 w-44 bg-slate-200 rounded-2xl" />
        </div>

        <div className="grid grid-cols-7 bg-slate-50/50">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
            <div key={d} className="py-3 flex justify-center">
              <div className="h-3 w-6 bg-slate-200 rounded" />
            </div>
          ))}

          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-2"
            >
              <div className="flex justify-end mb-2">
                <div className="w-7 h-7 rounded-full bg-slate-200" />
              </div>
              {i % 4 === 0 && (
                <div className="h-5 bg-slate-100 rounded-md mb-1.5 mx-0.5" />
              )}
              {i % 7 === 2 && (
                <div className="h-5 bg-slate-100 rounded-md mx-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 md:hidden">
        <div className="h-6 w-40 bg-slate-200 rounded-lg mb-3" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl border-l-4 border-l-slate-200 shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <div className="h-5 w-20 bg-slate-200 rounded" />
                <div className="h-5 w-28 bg-slate-200 rounded" />
              </div>
              <div className="h-5 w-48 bg-slate-200 rounded mb-1" />
              <div className="h-4 w-36 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/features/calendar/components/DesktopCalendarGrid.tsx

```
import { toISODate, isPastDay } from "../utils/date";
import { MONTH_NAMES, ROLE_ICON_MAP } from "../constants";
import { getDayColor } from "../utils/color";
import EventTooltip from "./EventTooltip";
import type { Event as CalendarEvent, DayOff, User } from "../../../types";

interface DesktopCalendarGridProps {
  days: (Date | null)[];
  year: number;
  month: number;
  selectedMobileDate: Date;
  setSelectedMobileDate: (date: Date) => void;
  eventsByDate: Map<string, CalendarEvent[]>;
  dayOffsByDate: Map<string, DayOff[]>;
  projectColorMap: Map<string, string>;
  projectHexMap: Map<string, string>;
  isStaff: boolean;
  isManagerOrAdmin: boolean;
  user: { id: string } | null;
  allUsers: User[];
  handleDayOffClick: (e: React.MouseEvent, date: Date) => void;
  prevMonth: () => void;
  nextMonth: () => void;
}

export default function DesktopCalendarGrid({
  days,
  year,
  month,
  selectedMobileDate,
  setSelectedMobileDate,
  eventsByDate,
  dayOffsByDate,
  projectColorMap,
  projectHexMap,
  isStaff,
  isManagerOrAdmin,
  user,
  allUsers,
  handleDayOffClick,
  prevMonth,
  nextMonth,
}: DesktopCalendarGridProps) {
  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="flex items-center justify-center p-5 md:p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <button
              onClick={prevMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
            >
              ◀
            </button>
            <span className="px-4 md:px-6 py-2 text-slate-800 font-bold capitalize tracking-tight">
              {MONTH_NAMES[month]}{" "}
              <span className="text-slate-400 font-medium">{year}</span>
            </span>
            <button
              onClick={nextMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 bg-slate-50/50">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
            <div
              key={dayName}
              className="py-3 text-center text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase border-b border-slate-100"
            >
              {dayName}
            </div>
          ))}

          {days.map((day, idx) => {
            const isToday =
              day && day.toDateString() === new Date().toDateString();
            const isSelected =
              day && day.toDateString() === selectedMobileDate.toDateString();
            const dayKey = day ? toISODate(day) : "";
            const dayEvents = day ? (eventsByDate.get(dayKey) ?? []) : [];
            const dayOffEntries = day ? (dayOffsByDate.get(dayKey) ?? []) : [];

            const dayColor = day
              ? getDayColor(dayEvents, projectHexMap)
              : undefined;

            const myDayOff = isStaff
              ? dayOffEntries.find((d) => d.userId === user?.id)
              : undefined;
            const hasAnyDayOff = isStaff
              ? !!myDayOff
              : dayOffEntries.length > 0;

            const showCross =
              day && !isPastDay(day) && (isStaff || isManagerOrAdmin);

            return (
              <div
                key={idx}
                onClick={() => day && setSelectedMobileDate(day)}
                className={`min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-1 md:p-2 transition-colors relative group select-none no-select-ios
                  ${day ? "bg-white hover:bg-slate-50 cursor-pointer" : "bg-slate-50/30"}
                  ${isSelected ? "ring-2 ring-inset ring-blue-500/20 bg-blue-50/10" : ""}
                  ${hasAnyDayOff ? "dayoff-cell-enter bg-rose-50/70" : ""}
                `}
              >
                {day && (
                  <>
                    {showCross && (
                      <div className="absolute top-1 left-1 z-10 group/dayoff">
                        <button
                          onClick={(e) => handleDayOffClick(e, day)}
                          title={
                            hasAnyDayOff
                              ? "Скасувати вихідний"
                              : "Призначити вихідний"
                          }
                          className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all
                            ${
                              hasAnyDayOff
                                ? "bg-rose-500 text-white shadow-sm hover:bg-rose-600"
                                : "bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-rose-100 hover:text-rose-500"
                            }`}
                        >
                          ✕
                        </button>

                        {isManagerOrAdmin && dayOffEntries.length > 0 && (
                          <div className="hidden md:block absolute top-full left-0 mt-2 w-48 bg-slate-800 text-white p-2.5 rounded-xl shadow-2xl opacity-0 invisible group-hover/dayoff:opacity-100 group-hover/dayoff:visible transition-all duration-200 pointer-events-none">
                            <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-1.5">
                              Вихідний ({dayOffEntries.length})
                            </p>
                            <div className="space-y-1">
                              {dayOffEntries.map((d: DayOff) => {
                                const u = allUsers.find(
                                  (au: User) => au.id === d.userId,
                                );
                                return (
                                  <p
                                    key={d.id}
                                    className="text-xs font-medium truncate"
                                  >
                                    {u
                                      ? `${ROLE_ICON_MAP[u.role] || "👤"} ${u.name}`
                                      : "Невідомий"}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-center md:justify-end mb-1.5">
                      <span
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold transition-colors
                        ${isToday && !dayColor ? "bg-blue-600 text-white shadow-md" : !dayColor ? "text-slate-500 md:group-hover:text-blue-600" : "text-white"}
                      `}
                        style={{
                          background: dayColor || undefined,
                          textShadow: dayColor ? "0 1px 2px rgba(0,0,0,0.35)" : "none",
                        }}
                      >
                        {day.getDate()}
                      </span>
                    </div>

                    {hasAnyDayOff && !isStaff && dayOffEntries.length > 0 && (
                      <p className="text-[9px] md:text-[10px] text-rose-600 font-semibold text-center mb-1 truncate px-1">
                        🌴 {dayOffEntries.length}{" "}
                        {dayOffEntries.length === 1 ? "вихідний" : "вихідних"}
                      </p>
                    )}

                    <div className="space-y-1.5">
                      {dayEvents.slice(0, 3).map((ev: CalendarEvent) => (
                        <div
                          key={ev.id}
                          className="relative group/event z-0 hover:z-50"
                        >
                          <button
                            className={`w-full px-1.5 py-1 text-center md:text-left rounded-md border text-[10px] md:text-xs font-bold transition-all shadow-sm ${projectColorMap.get(ev.project) ?? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300"}`}
                          >
                            {ev.time || "—"}
                          </button>

                          <EventTooltip event={ev} />
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 text-center">
                          +{dayEvents.length - 3} ще
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
  );
}

```

# FILE: apps/frontend/src/features/calendar/components/EventTooltip.tsx

```
import type { Event as CalendarEvent } from "../../../types";

interface EventTooltipProps {
  event: CalendarEvent;
}

export default function EventTooltip({ event: ev }: EventTooltipProps) {
  return (
    <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white p-3 rounded-xl shadow-2xl opacity-0 invisible group-hover/event:opacity-100 group-hover/event:visible transition-all duration-200 pointer-events-none">
      <p className="font-bold text-sm mb-1 truncate">
        {ev.school?.name || "Невідомий заклад"}
      </p>
      <div className="space-y-1 text-xs text-slate-300">
        <p>
          <span className="text-slate-400">Проєкт:</span>{" "}
          {ev.project}
        </p>
        <p>
          <span className="text-slate-400">Екіпаж:</span>{" "}
          {ev.crew?.name || "Не призначено"}
        </p>
        <p>
          <span className="text-slate-400">Час:</span>{" "}
          <span className="font-bold text-white">
            {ev.time || "—"}
          </span>
        </p>
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-800"></div>
    </div>
  );
}

```

# FILE: apps/frontend/src/features/calendar/components/MobileCalendarGrid.tsx

```
import { motion, AnimatePresence } from "framer-motion";
import { getDayColor } from "../utils/color";
import { toISODate } from "../utils/date";
import { MONTH_NAMES, PROJECT_HEX } from "../constants";
import type { Event as CalendarEvent, Project, City, DayOff } from "../../../types";

interface MobileCalendarGridProps {
  days: (Date | null)[];
  year: number;
  month: number;
  selectedMobileDate: Date;
  eventsByDate: Map<string, CalendarEvent[]>;
  dayOffsByDate: Map<string, DayOff[]>;
  projectHexMap: Map<string, string>;
  projects: Project[];
  filterCityId: string;
  setFilterCityId: (value: string) => void;
  cities: City[];
  userRole: string;
  handleMobileDayTap: (day: Date) => void;
  startLongPress: (day: Date) => void;
  cancelLongPress: () => void;
  pressingDay: Date | null;
  triggeredDay: Date | null;
  prevMonth: () => void;
  nextMonth: () => void;
}

export default function MobileCalendarGrid({
  days,
  year,
  month,
  selectedMobileDate,
  eventsByDate,
  dayOffsByDate,
  projectHexMap,
  projects,
  filterCityId,
  setFilterCityId,
  cities,
  userRole,
  handleMobileDayTap,
  startLongPress,
  cancelLongPress,
  pressingDay,
  triggeredDay,
  prevMonth,
  nextMonth,
}: MobileCalendarGridProps) {
  return (
    <>
      <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-border" data-no-swipe>
          <button
            onClick={prevMonth}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-control text-content-muted active:bg-surface-muted transition-colors"
          >
            ‹
          </button>
          <AnimatePresence mode="wait">
            <motion.span
              key={`${month}-${year}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-bold text-content-primary capitalize"
            >
              {MONTH_NAMES[month]}{" "}
              <span className="text-content-muted font-medium">{year}</span>
            </motion.span>
          </AnimatePresence>
          <button
            onClick={nextMonth}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-control text-content-muted active:bg-surface-muted transition-colors"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 px-2 pt-2">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
            <div
              key={dayName}
              className="text-center text-2xs font-bold tracking-wide text-content-muted uppercase pb-1"
            >
              {dayName}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1.5 px-2 pb-2.5" data-no-swipe>
          {days.map((day, idx) => {
            const isToday = day && day.toDateString() === new Date().toDateString();
            const isSelected = day && day.toDateString() === selectedMobileDate.toDateString();
            const dayKey = day ? toISODate(day) : "";
            const dayEvents = day ? (eventsByDate.get(dayKey) ?? []) : [];
            const dayOffEntries = day ? (dayOffsByDate.get(dayKey) ?? []) : [];
            const dayColor = day ? getDayColor(dayEvents, projectHexMap) : undefined;

            return (
              <div key={idx} className="flex items-center justify-center py-0.5">
                {day && (
                  <button
                    onTouchStart={(e) => {
                      const t = e.touches[0];
                      startLongPress(day, t.clientX, t.clientY);
                    }}
                    onTouchEnd={() => cancelLongPress()}
                    onTouchMove={(e) => {
                      const t = e.touches[0];
                      cancelLongPress(t.clientX, t.clientY);
                    }}
                    onTouchCancel={() => cancelLongPress()}
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => handleMobileDayTap(day)}
                    className={`relative min-w-[38px] min-h-[38px] w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold select-none no-select-ios touch-manipulation active:scale-90
                      ${isSelected ? "ring-2 ring-brand ring-offset-2" : ""}
                      ${isToday && !isSelected ? "ring-2 ring-brand/20" : ""}
                      ${triggeredDay === day ? "dayoff-cell-enter" : ""}
                    `}
                    style={{
                      background: dayColor || "#f1f5f9",
                      color: dayColor ? "#fff" : "#64748b",
                      textShadow: dayColor ? "0 1px 2px rgba(0,0,0,0.35)" : "none",
                      transform: pressingDay === day ? "scale(0.9)" : "",
                      transition: pressingDay === day ? "transform 550ms ease-out" : "transform 150ms ease-out",
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                      <circle
                        cx="18" cy="18" r="16" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        strokeDasharray="100.53"
                        strokeDashoffset={pressingDay === day ? 0 : 100.53}
                        style={{
                          transition: pressingDay === day ? "stroke-dashoffset 550ms linear" : "stroke-dashoffset 150ms ease-out",
                        }}
                        className="text-brand opacity-70"
                      />
                    </svg>
                    {day.getDate()}
                    {dayOffEntries.length > 0 && (
                      <span className="pointer-events-none absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-danger border-2 border-white flex items-center justify-center">
                        <span className="text-white text-[6px] font-bold leading-none">✕</span>
                      </span>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mt-2.5 px-1">
        {projects.map((p: Project) => (
          <span
            key={p.id}
            className="inline-flex items-center gap-1 text-2xs font-medium text-content-secondary bg-surface-muted border border-border px-2 py-0.5 rounded-pill"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: PROJECT_HEX[p.color] || PROJECT_HEX.blue }}
            />
            {p.name}
          </span>
        ))}
        <span className="inline-flex items-center gap-1 text-2xs font-medium text-danger-600 bg-danger-50 border border-danger-100 px-2 py-0.5 rounded-pill">
          <span className="w-2 h-2 rounded-full bg-danger shrink-0" />
          Вихідний
        </span>

        {userRole === "SUPERADMIN" && (
          <select
            value={filterCityId}
            onChange={(e) => setFilterCityId(e.target.value)}
            className="ml-auto text-2xs font-semibold text-content-secondary outline-none bg-surface-muted border border-border rounded-control px-2.5 py-1.5 min-h-[32px]"
          >
            <option value="ALL">Всі міста</option>
            {cities.map((c: City) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}

```

# FILE: apps/frontend/src/features/calendar/components/MobileDayDetailsPanel.tsx

```
import { motion, AnimatePresence } from "framer-motion";
import { toISODate } from "../utils/date";
import { PROJECT_HEX } from "../constants";
import type { Event as CalendarEvent, DayOff, User } from "../../../types";
import { staggerContainer, staggerItem } from "../../../lib/motion";

interface MobileDayDetailsPanelProps {
  selectedMobileDate: Date;
  selectedDayEvents: CalendarEvent[];
  dayOffsByDate: Map<string, DayOff[]>;
  allUsers: User[];
  projectHexMap: Map<string, string>;
  navigate: (path: string) => void;
}

export default function MobileDayDetailsPanel({
  selectedMobileDate,
  selectedDayEvents,
  dayOffsByDate,
  allUsers,
  projectHexMap,
  navigate,
}: MobileDayDetailsPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={toISODate(selectedMobileDate)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="mt-3 select-none"
      >
        <h3 className="text-sm font-bold text-content-primary mb-2">
          {selectedMobileDate.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "long",
            weekday: "long",
          })}
        </h3>

        {(() => {
          const key = toISODate(selectedMobileDate);
          const dayOffEntries = dayOffsByDate.get(key) ?? [];
          if (dayOffEntries.length === 0) return null;
          return (
            <motion.div
              className="mb-2.5 flex flex-wrap gap-1"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {dayOffEntries.map((d: DayOff) => {
                const u = allUsers.find((au: User) => au.id === d.userId);
                return (
                  <motion.span
                    key={d.id}
                    className="text-2xs font-semibold text-danger-600 bg-danger-50 border border-danger-100 px-2 py-0.5 rounded-pill"
                    variants={staggerItem}
                  >
                    🌴 {u?.name || "Вихідний"}
                  </motion.span>
                );
              })}
            </motion.div>
          );
        })()}

        {selectedDayEvents.length === 0 ? (
          <div className="bg-surface rounded-card border border-border p-6 text-center text-content-muted text-sm">
            На цей день подій не заплановано
          </div>
        ) : (
          <motion.div
            className="flex flex-col gap-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {selectedDayEvents.map((ev: CalendarEvent) => (
              <motion.div
                key={ev.id}
                onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
                className="bg-surface p-3 rounded-card border-l-4 shadow-soft active:scale-[0.98] transition-transform cursor-pointer"
                style={{ borderLeftColor: projectHexMap.get(ev.project) ?? PROJECT_HEX.blue }}
                variants={staggerItem}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-2xs font-bold px-2 py-0.5 rounded-control bg-surface-muted text-content-secondary">
                    🕒 {ev.time || "Не вказано"}
                  </span>
                  <span className="text-2xs font-medium text-content-muted">
                    {ev.project}
                  </span>
                </div>
                <p className="text-sm font-semibold text-content-primary">
                  {ev.school?.name}
                </p>
                <p className="text-2xs text-content-secondary mt-1">
                  🚐 Екіпаж: {ev.crew?.name || "Не призначено"}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/features/calendar/constants.ts

```
export const STAFF_ROLES = ["HOST", "DRIVER"];
export const MANAGER_ROLES = ["SUPERADMIN", "MANAGER"];

export const PROJECT_HEX: Record<string, string> = {
  blue: "#3b82f6",
  emerald: "#10b981",
  rose: "#f43f5e",
  red: "#ef4444",
  amber: "#f59e0b",
  purple: "#a855f7",
};

export const ROLE_ICON_MAP: Record<string, string> = {
  HOST: "🎙️",
  DRIVER: "🚗",
};

export const MONTH_NAMES = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export const WEEKDAY_HEADERS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

export const PROJECT_BADGE_COLORS: Record<string, string> = {
  blue: "bg-blue-400",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
  red: "bg-red-500",
  amber: "bg-amber-400",
  purple: "bg-purple-400",
};

```

# FILE: apps/frontend/src/features/calendar/hooks/useCalendarData.ts

```
import { useMemo } from "react";
import { useCalendarEvents, useCalendarProjects } from "../../../hooks/useCalendar";
import { useUsers } from "../../../hooks/useEmployees";
import { useCities } from "../../../hooks/useCities";
import { PROJECT_HEX } from "../constants";
import type { Event as CalendarEvent } from "../../../types";

export function useCalendarData(filterCityId: string) {
  const { data: events = [], isLoading: eventsLoading } = useCalendarEvents();
  const { data: projects = [] } = useCalendarProjects();
  const { data: cities = [] } = useCities();
  const { data: allUsers = [] } = useUsers();

  const filteredEvents = useMemo(() => {
    return events.filter((ev: CalendarEvent) => {
      if (ev.status === "RE_SALE") return false;
      if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) return false;
      return true;
    });
  }, [events, filterCityId]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of filteredEvents) {
      const key = ev.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
    return map;
  }, [filteredEvents]);

  const projectColorMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) {
      switch (p.color) {
        case "emerald":
          map.set(p.name, "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300"); break;
        case "rose":
          map.set(p.name, "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 hover:border-rose-300"); break;
        case "red":
          map.set(p.name, "bg-red-100 text-red-700 border-red-300 hover:bg-red-200 hover:border-red-400"); break;
        case "amber":
          map.set(p.name, "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 hover:border-amber-300"); break;
        case "purple":
          map.set(p.name, "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:border-purple-300"); break;
        default:
          map.set(p.name, "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300");
      }
    }
    return map;
  }, [projects]);

  const projectHexMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) {
      map.set(p.name, PROJECT_HEX[p.color] || PROJECT_HEX.blue);
    }
    return map;
  }, [projects]);

  return {
    events,
    eventsLoading,
    projects,
    cities,
    allUsers,
    filteredEvents,
    eventsByDate,
    projectColorMap,
    projectHexMap,
  };
}

```

# FILE: apps/frontend/src/features/calendar/hooks/useCalendarMonth.ts

```
import { useState, useMemo } from "react";
import { buildMonthDays, toISODate } from "../utils/date";

export function useCalendarMonth() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMobileDate, setSelectedMobileDate] = useState<Date>(
    new Date(),
  );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  const today = () => {
    setCurrentDate(new Date());
    setSelectedMobileDate(new Date());
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => buildMonthDays(year, month), [year, month]);

  const monthFrom = toISODate(new Date(year, month, 1));
  const monthTo = toISODate(new Date(year, month + 1, 0));

  return {
    currentDate,
    setCurrentDate,
    selectedMobileDate,
    setSelectedMobileDate,
    nextMonth,
    prevMonth,
    today,
    year,
    month,
    days,
    monthFrom,
    monthTo,
  };
}

```

# FILE: apps/frontend/src/features/calendar/hooks/useDayOffActions.ts

```
import { useState, useMemo, useCallback } from "react";
import {
  useDaysOff,
  useCreateDayOff,
  useDeleteDayOff,
} from "../../../hooks/useDaysOff";
import { STAFF_ROLES } from "../constants";
import { toISODate, isPastDay } from "../utils/date";
import type { User } from "../../../types";

export function useDayOffActions(
  monthFrom: string,
  monthTo: string,
  dayOffCityId: string | undefined,
  isStaff: boolean,
  isManagerOrAdmin: boolean,
  user: { id: string } | null,
  allUsers: User[],
  filterCityId: string,
  userRole: string,
  userCityId: string | null | undefined,
) {
  const [dayOffModalDate, setDayOffModalDate] = useState<Date | null>(null);

  const { data: dayOffs = [] } = useDaysOff(monthFrom, monthTo, dayOffCityId);
  const createDayOff = useCreateDayOff();
  const deleteDayOff = useDeleteDayOff();

  const dayOffsByDate = useMemo(() => {
    const map = new Map<string, typeof dayOffs>();
    for (const d of dayOffs) {
      const key = d.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    }
    return map;
  }, [dayOffs]);

  const staffForModal = useMemo(() => {
    const cityScope =
      userRole === "MANAGER"
        ? userCityId
        : filterCityId !== "ALL"
          ? filterCityId
          : null;
    return allUsers.filter(
      (u: User) =>
        STAFF_ROLES.includes(u.role) && (!cityScope || u.cityId === cityScope),
    );
  }, [allUsers, userRole, userCityId, filterCityId]);

  const handleDayOffClick = useCallback(
    (e: React.MouseEvent, date: Date) => {
      e.stopPropagation();
      if (isPastDay(date)) return;

      if (isStaff && user) {
        const key = toISODate(date);
        const existing = dayOffsByDate
          .get(key)
          ?.find((d: { userId: string }) => d.userId === user.id);
        if (existing) {
          deleteDayOff.mutate(existing.id);
        } else {
          createDayOff.mutate({ date: key });
        }
        return;
      }

      if (isManagerOrAdmin) {
        setDayOffModalDate(date);
      }
    },
    [isStaff, isManagerOrAdmin, user, dayOffsByDate, createDayOff, deleteDayOff],
  );

  const handleToggleStaffDayOff = useCallback(
    (targetUserId: string, existingId?: string) => {
      if (existingId) {
        deleteDayOff.mutate(existingId);
      } else if (dayOffModalDate) {
        createDayOff.mutate({
          date: toISODate(dayOffModalDate),
          userId: targetUserId,
        });
      }
    },
    [dayOffModalDate, createDayOff, deleteDayOff],
  );

  const handleLongPressDayOff = useCallback(
    (day: Date) => {
      if (isPastDay(day)) return;
      if (isStaff && user) {
        const key = toISODate(day);
        const existing = dayOffsByDate
          .get(key)
          ?.find((d: { userId: string }) => d.userId === user.id);
        if (existing) deleteDayOff.mutate(existing.id);
        else createDayOff.mutate({ date: key });
      } else if (isManagerOrAdmin) {
        setDayOffModalDate(day);
      }
    },
    [isStaff, isManagerOrAdmin, user, dayOffsByDate, createDayOff, deleteDayOff],
  );

  return {
    dayOffsByDate,
    staffForModal,
    dayOffModalDate,
    setDayOffModalDate,
    handleDayOffClick,
    handleToggleStaffDayOff,
    handleLongPressDayOff,
  };
}

```

# FILE: apps/frontend/src/features/calendar/hooks/useLongPress.ts

```
import { useRef, useCallback, useState } from "react";

const MOVE_THRESHOLD = 10;

export function useLongPress(onTrigger: (day: Date) => void, delay = 550) {
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const [pressingDay, setPressingDay] = useState<Date | null>(null);
  const [triggeredDay, setTriggeredDay] = useState<Date | null>(null);

  const startLongPress = useCallback(
    (day: Date, clientX?: number, clientY?: number) => {
      touchStartPos.current = clientX != null && clientY != null ? { x: clientX, y: clientY } : null;
      longPressFired.current = false;
      setPressingDay(day);
      pressTimer.current = setTimeout(() => {
        longPressFired.current = true;
        setPressingDay(null);
        setTriggeredDay(day);
        setTimeout(() => setTriggeredDay(null), 350);
        if ("vibrate" in navigator) navigator.vibrate(15);
        onTrigger(day);
      }, delay);
    },
    [onTrigger, delay],
  );

  const cancelLongPress = useCallback(
    (clientX?: number, clientY?: number) => {
      if (clientX != null && clientY != null && touchStartPos.current) {
        const dx = clientX - touchStartPos.current.x;
        const dy = clientY - touchStartPos.current.y;
        if (Math.hypot(dx, dy) <= MOVE_THRESHOLD) return;
      }
      if (pressTimer.current) clearTimeout(pressTimer.current);
      touchStartPos.current = null;
      longPressFired.current = false;
      setPressingDay(null);
    },
    [],
  );

  const wasLongPress = useCallback(() => {
    if (longPressFired.current) {
      longPressFired.current = false;
      return true;
    }
    return false;
  }, []);

  return { startLongPress, cancelLongPress, wasLongPress, pressingDay, triggeredDay };
}

```

# FILE: apps/frontend/src/features/calendar/utils/color.ts

```
import { PROJECT_HEX } from "../constants";

export const shadeHex = (hex: string, percent: number) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + percent));
  const b = Math.min(255, Math.max(0, (n & 0xff) + percent));
  return `rgb(${r}, ${g}, ${b})`;
};

export const getDayColor = (
  dayEvents: { project: string }[],
  projectHexMap: Map<string, string>,
): string | undefined => {
  if (dayEvents.length === 0) return undefined;
  const counts = new Map<string, number>();
  for (const ev of dayEvents) {
    const hex = projectHexMap.get(ev.project) ?? PROJECT_HEX.blue;
    counts.set(hex, (counts.get(hex) || 0) + 1);
  }
  const total = dayEvents.length;
  if (counts.size === 1) {
    const [hex] = counts.keys();
    return `linear-gradient(to bottom, ${shadeHex(hex, 35)}, ${shadeHex(hex, -25)})`;
  }
  let acc = 0;
  const stops: string[] = [];
  for (const [hex, count] of counts) {
    const start = (acc / total) * 100;
    acc += count;
    const end = (acc / total) * 100;
    stops.push(`${shadeHex(hex, 35)} ${start}%`);
    stops.push(`${shadeHex(hex, -25)} ${end}%`);
  }
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
};

```

# FILE: apps/frontend/src/features/calendar/utils/date.ts

```
export const toISODate = (d: Date) => d.toLocaleDateString("en-CA");

export const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

export const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

export const isPastDay = (date: Date) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return date < startOfToday;
};

export const buildMonthDays = (
  year: number,
  month: number,
): (Date | null)[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
  return days;
};

```

# FILE: apps/frontend/src/features/reports/components/ReportForm.tsx

```
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventReport } from "../../../types";
import ReportStatusBadge from "./ReportStatusBadge";
import { useInventory } from "../../../hooks/useInventory";
import { fadeVariants, modalContentVariants } from "../../../lib/motion";

interface Expense {
  name: string;
  amount: number;
}

interface CrewInfo {
  host?: { id: string; name: string } | null;
  driver?: { id: string; name: string } | null;
}

interface ReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  schoolName: string;
  eventDate?: string;
  crew?: CrewInfo;
  report?: EventReport | null;
  reportLoading?: boolean;
  onCreateDraft: (data: {
    eventId: string;
    announcementDone: boolean;
    materialShown: boolean;
    childrenCount: number;
    classesCount: number;
    privilegedCount: number;
    showingsCount: number;
    totalSum: number;
    schoolSum: number;
    remainderSum: number;
    rating: number;
    directorSatisfied?: boolean;
    teachersSatisfied?: boolean;
    hadIssues?: boolean;
    comment?: string;
    expenses?: Expense[];
    salaries?: { userId: string; name: string; amount: number; role: string }[];
    inventoryUsages?: { itemId: string; quantity: number }[];
  }) => void;
  onSaveDraft: (data: {
    id: string;
    announcementDone?: boolean;
    materialShown?: boolean;
    childrenCount?: number;
    classesCount?: number;
    privilegedCount?: number;
    showingsCount?: number;
    totalSum?: number;
    schoolSum?: number;
    remainderSum?: number;
    rating?: number;
    directorSatisfied?: boolean;
    teachersSatisfied?: boolean;
    hadIssues?: boolean;
    comment?: string;
  }) => void;
  onSubmit: (id: string) => void;
  submitLoading?: boolean;
}

const WEEKDAY_FMT = new Intl.DateTimeFormat("uk-UA", { weekday: "long" });
const DATE_FMT = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "—";
  return `${DATE_FMT.format(d)} ${WEEKDAY_FMT.format(d)}`;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("uk-UA").format(Math.round(value || 0));
}

function IconBadge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${color}`}>
      {children}
    </span>
  );
}

function CardHeader({ icon, color, title }: { icon: React.ReactNode; color: string; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <IconBadge color={color}>{icon}</IconBadge>
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="text-sm font-medium text-slate-800">{children}</div>
    </div>
  );
}

function TogglePill({ value, onChange, disabled }: { value: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <div className="flex gap-1.5">
      <button type="button" disabled={disabled} onClick={() => onChange(true)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400 hover:bg-slate-200"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>Так</button>
      <button type="button" disabled={disabled} onClick={() => onChange(false)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${!value ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400 hover:bg-slate-200"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>Ні</button>
    </div>
  );
}

function NumberField({ value, onChange, suffix, disabled }: { value: number; onChange: (v: number) => void; suffix?: string; disabled?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1">
      <input type="number" min={0} inputMode="decimal" value={value || ""} disabled={disabled}
        onChange={(e) => onChange(+e.target.value)}
        className={`w-16 text-right bg-transparent outline-none font-medium text-base text-slate-800 focus:bg-blue-50 rounded px-1 -mr-1 ${disabled ? "opacity-60" : ""}`}
        placeholder="0" />
      {suffix && <span className="text-slate-400 text-xs">{suffix}</span>}
    </span>
  );
}

export default function ReportForm({
  isOpen, onClose, eventId, schoolName, eventDate, crew,
  report, reportLoading, onCreateDraft, onSaveDraft, onSubmit, submitLoading,
}: ReportFormProps) {
  const headingId = "report-form-heading";
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const isEditable = report
    ? report.status === "DRAFT" || report.status === "NEEDS_REVISION"
    : true;

  const [form, setForm] = useState({
    announcementDone: true,
    materialShown: true,
    childrenCount: 0,
    classesCount: 0,
    privilegedCount: 0,
    showingsCount: 0,
    totalSum: 0,
    schoolPercentage: 20,
    rating: 8,
    directorSatisfied: true,
    teachersSatisfied: true,
    hadIssues: false,
    comment: "",
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExp, setNewExp] = useState({ name: "", amount: "" });
  const [salaries, setSalaries] = useState<Record<string, number>>({});
  const { data: inventoryItems } = useInventory();
  const [inventoryUsages, setInventoryUsages] = useState<Record<string, number>>({});
  const [autoSaveState, setAutoSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const lastReportId = useRef<string | undefined>();
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (report && report.id !== lastReportId.current) {
      lastReportId.current = report.id;
      setForm({
        announcementDone: report.announcementDone,
        materialShown: report.materialShown,
        childrenCount: report.childrenCount,
        classesCount: report.classesCount,
        privilegedCount: report.privilegedCount,
        showingsCount: report.showingsCount,
        totalSum: report.totalSum,
        schoolPercentage: report.totalSum > 0 && report.schoolSum > 0
          ? Math.round((report.schoolSum / report.totalSum) * 100)
          : 20,
        rating: report.rating,
        directorSatisfied: report.directorSatisfied ?? true,
        teachersSatisfied: report.teachersSatisfied ?? true,
        hadIssues: report.hadIssues ?? false,
        comment: report.comment ?? "",
      });
      setExpenses(report.expenseItems?.map((e) => ({ name: e.name ?? e.category ?? "", amount: e.amount })) ?? []);
      const salaryMap: Record<string, number> = {};
      for (const s of report.salaryRecords ?? []) {
        salaryMap[s.employeeId] = s.amount;
      }
      setSalaries(salaryMap);
    }
  }, [report]);

  const schoolSum = (form.totalSum * form.schoolPercentage) / 100;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const remainder = form.totalSum - schoolSum - totalExpenses;

  const crewMembers = [
    ...(crew?.host ? [{ id: crew.host.id, name: crew.host.name, role: "Ведучий" }] : []),
    ...(crew?.driver ? [{ id: crew.driver.id, name: crew.driver.name, role: "Водій" }] : []),
  ];

  const salariesArr = crewMembers
    .map((m) => ({ userId: m.id, name: m.name, amount: salaries[m.id] || 0, role: m.role }))
    .filter((s) => s.amount > 0);

  const handleAutoSave = useCallback(async () => {
    if (!report?.id) return;
    if (report.status !== "DRAFT" && report.status !== "NEEDS_REVISION") return;

    setAutoSaveState("saving");
    try {
      const schoolSum = (form.totalSum * form.schoolPercentage) / 100;
      const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
      const remainder = form.totalSum - schoolSum - totalExpenses;

      await onSaveDraft({
        id: report.id,
        announcementDone: form.announcementDone,
        materialShown: form.materialShown,
        childrenCount: form.childrenCount,
        classesCount: form.classesCount,
        privilegedCount: form.privilegedCount,
        showingsCount: form.showingsCount,
        totalSum: form.totalSum,
        schoolSum,
        remainderSum: remainder,
        rating: form.rating,
        directorSatisfied: form.directorSatisfied,
        teachersSatisfied: form.teachersSatisfied,
        hadIssues: form.hadIssues,
        comment: form.comment,
      });
      setAutoSaveState("saved");
      setTimeout(() => setAutoSaveState("idle"), 3000);
    } catch {
      setAutoSaveState("idle");
    }
  }, [form, expenses, report?.id, report?.status, onSaveDraft]);

  useEffect(() => {
    if (!report?.id) return;
    if (report.status !== "DRAFT" && report.status !== "NEEDS_REVISION") return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      handleAutoSave();
    }, 20000);

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [form, expenses, report?.id, report?.status, handleAutoSave]);

  const handleSaveDraft = () => {
    if (report) {
      onSaveDraft({
        id: report.id,
        announcementDone: form.announcementDone,
        materialShown: form.materialShown,
        childrenCount: form.childrenCount,
        classesCount: form.classesCount,
        privilegedCount: form.privilegedCount,
        showingsCount: form.showingsCount,
        totalSum: form.totalSum,
        schoolSum,
        remainderSum: remainder,
        rating: form.rating,
        directorSatisfied: form.directorSatisfied,
        teachersSatisfied: form.teachersSatisfied,
        hadIssues: form.hadIssues,
        comment: form.comment,
      });
    } else {
      onCreateDraft({
        eventId,
        announcementDone: form.announcementDone,
        materialShown: form.materialShown,
        childrenCount: form.childrenCount,
        classesCount: form.classesCount,
        privilegedCount: form.privilegedCount,
        showingsCount: form.showingsCount,
        totalSum: form.totalSum,
        schoolSum,
        remainderSum: remainder,
        rating: form.rating,
        directorSatisfied: form.directorSatisfied,
        teachersSatisfied: form.teachersSatisfied,
        hadIssues: form.hadIssues,
        comment: form.comment,
        expenses,
        salaries: salariesArr,
        inventoryUsages: Object.entries(inventoryUsages)
          .filter(([, qty]) => qty > 0)
          .map(([itemId, quantity]) => ({ itemId, quantity })),
      });
    }
  };

  const handleSubmit = () => {
    if (report) {
      onSaveDraft({
        id: report.id,
        announcementDone: form.announcementDone,
        materialShown: form.materialShown,
        childrenCount: form.childrenCount,
        classesCount: form.classesCount,
        privilegedCount: form.privilegedCount,
        showingsCount: form.showingsCount,
        totalSum: form.totalSum,
        schoolSum,
        remainderSum: remainder,
        rating: form.rating,
        directorSatisfied: form.directorSatisfied,
        teachersSatisfied: form.teachersSatisfied,
        hadIssues: form.hadIssues,
        comment: form.comment,
      });
      onSubmit(report.id);
    } else {
      onCreateDraft({
        eventId,
        announcementDone: form.announcementDone,
        materialShown: form.materialShown,
        childrenCount: form.childrenCount,
        classesCount: form.classesCount,
        privilegedCount: form.privilegedCount,
        showingsCount: form.showingsCount,
        totalSum: form.totalSum,
        schoolSum,
        remainderSum: remainder,
        rating: form.rating,
        directorSatisfied: form.directorSatisfied,
        teachersSatisfied: form.teachersSatisfied,
        hadIssues: form.hadIssues,
        comment: form.comment,
        expenses,
        salaries: salariesArr,
        inventoryUsages: Object.entries(inventoryUsages)
          .filter(([, qty]) => qty > 0)
          .map(([itemId, quantity]) => ({ itemId, quantity })),
      });
      onSubmit(report?.id ?? "");
    }
  };

  const addExpense = () => {
    const amount = Number(newExp.amount);
    if (!newExp.name.trim() || !amount) return;
    setExpenses((prev) => [...prev, { name: newExp.name.trim(), amount }]);
    setNewExp({ name: "", amount: "" });
  };

  const removeExpense = (index: number) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  if (reportLoading) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div variants={fadeVariants} initial="hidden" animate="visible" exit="exit"
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl">Завантаження...</div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div role="dialog" aria-modal="true" aria-labelledby={headingId}
          variants={fadeVariants} initial="hidden" animate="visible" exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div variants={modalContentVariants} initial="hidden" animate="visible" exit="exit"
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden pb-safe"
            style={{ willChange: "transform" }}>
            <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />

            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between shrink-0">
              <div className="min-w-0">
                <h3 id={headingId} className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
                  Звіт по події
                </h3>
                <p className="text-sm text-slate-500 mt-0.5 truncate">{schoolName}</p>
                {eventDate && <p className="text-xs text-slate-400 mt-0.5">{formatDate(eventDate)}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {autoSaveState === "saving" && (
                  <span className="text-xs text-slate-400">Збереження…</span>
                )}
                {autoSaveState === "saved" && (
                  <span className="text-xs text-emerald-600">Збережено</span>
                )}
                {report && <ReportStatusBadge status={report.status} />}
                <button ref={closeRef} onClick={onClose} aria-label="Закрити"
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none p-2 -mr-2 active:scale-90 transition-transform duration-fast">✕</button>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50/50">
              {report?.revisionComment && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-700">
                  <p className="font-semibold mb-1">Коментар менеджера:</p>
                  <p>{report.revisionComment}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                  <CardHeader icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  } color="bg-violet-50 text-violet-600" title="Охоплення та Проведення" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    <Row label="Оголошення зроблено">
                      <TogglePill value={form.announcementDone} onChange={(v) => setForm({ ...form, announcementDone: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Матеріал показано">
                      <TogglePill value={form.materialShown} onChange={(v) => setForm({ ...form, materialShown: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Кількість дітей">
                      <NumberField value={form.childrenCount} onChange={(v) => setForm({ ...form, childrenCount: v })} suffix="дітей" disabled={!isEditable} />
                    </Row>
                    <Row label="Класів">
                      <NumberField value={form.classesCount} onChange={(v) => setForm({ ...form, classesCount: v })} suffix="кл." disabled={!isEditable} />
                    </Row>
                    <Row label="Пільгових дітей">
                      <NumberField value={form.privilegedCount} onChange={(v) => setForm({ ...form, privilegedCount: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Кількість показів">
                      <NumberField value={form.showingsCount} onChange={(v) => setForm({ ...form, showingsCount: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Директор задоволений">
                      <TogglePill value={form.directorSatisfied} onChange={(v) => setForm({ ...form, directorSatisfied: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Вчителі задоволені">
                      <TogglePill value={form.teachersSatisfied} onChange={(v) => setForm({ ...form, teachersSatisfied: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Були проблеми">
                      <TogglePill value={form.hadIssues} onChange={(v) => setForm({ ...form, hadIssues: v })} disabled={!isEditable} />
                    </Row>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                  <CardHeader icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
                      <path d="M16 12h6v4h-6a2 2 0 1 1 0-4z" />
                    </svg>
                  } color="bg-amber-50 text-amber-600" title="Фінансовий результат" />
                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-sm text-slate-500 font-medium">Загальна виручка</span>
                    <span className="inline-flex items-center gap-1">
                      <input type="number" min={0} inputMode="decimal" value={form.totalSum || ""} disabled={!isEditable}
                        onChange={(e) => setForm({ ...form, totalSum: +e.target.value })}
                        className={`w-28 text-right bg-transparent outline-none font-bold text-lg text-base text-slate-800 focus:bg-blue-50 rounded px-1 ${!isEditable ? "opacity-60" : ""}`}
                        placeholder="0" />
                      <span className="text-slate-400 text-sm">грн</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-sm text-slate-500">Відсоток закладу</span>
                    <NumberField value={form.schoolPercentage} onChange={(v) => setForm({ ...form, schoolPercentage: v })} suffix="%" disabled={!isEditable} />
                  </div>
                  <Row label={`Сума закладу (${form.schoolPercentage}%)`}>
                    <span>{formatMoney(schoolSum)} грн</span>
                  </Row>
                  <div className="py-3 border-b border-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-500">Додаткові витрати</span>
                      <span className="text-sm font-medium text-rose-500">−{formatMoney(totalExpenses)} грн</span>
                    </div>
                    {expenses.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {expenses.map((exp, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full pl-3 pr-1.5 py-1 text-xs">
                            <span className="text-slate-600">{exp.name}</span>
                            <span className="font-semibold text-slate-700">{formatMoney(exp.amount)} грн</span>
                            {isEditable && (
                              <button onClick={() => removeExpense(i)} className="text-slate-400 hover:text-rose-500 w-4 h-4 rounded-full flex items-center justify-center hover:bg-white">✕</button>
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                    {isEditable && (
                      <div className="flex gap-2 mt-2">
                        <input placeholder="Назва витрати" value={newExp.name}
                          onChange={(e) => setNewExp({ ...newExp, name: e.target.value })}
                          className="flex-1 min-w-0 p-2 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-blue-500 outline-none" />
                        <input type="number" min={0} inputMode="decimal" placeholder="грн" value={newExp.amount}
                          onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
                          className="w-20 sm:w-24 p-2 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-blue-500 outline-none" />
                        <button onClick={addExpense} type="button"
                          className="px-3 shrink-0 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium text-sm">+</button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
                    <span className="text-sm font-semibold text-emerald-700">Залишок ({100 - form.schoolPercentage}%)</span>
                    <span className="text-lg font-bold text-emerald-700">{formatMoney(remainder)} грн</span>
                  </div>
                </div>

                {crewMembers.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                    <CardHeader icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    } color="bg-blue-50 text-blue-600" title="Заробітня плата" />
                    <div className="space-y-1">
                      {crewMembers.map((m) => (
                        <Row key={m.id} label={`${m.name} (${m.role})`}>
                          <span className="inline-flex items-center gap-1">
                            <input type="number" min={0} inputMode="decimal" value={salaries[m.id] || ""} disabled={!isEditable}
                              onChange={(e) => setSalaries((prev) => ({ ...prev, [m.id]: +e.target.value }))}
                              className={`w-24 text-right bg-transparent outline-none font-medium text-base text-slate-800 focus:bg-blue-50 rounded px-1 ${!isEditable ? "opacity-60" : ""}`}
                              placeholder="0" />
                            <span className="text-slate-400 text-xs">грн</span>
                          </span>
                        </Row>
                      ))}
                    </div>
                    {crewMembers.some((m) => salaries[m.id] > 0) && (
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                        <span className="text-sm font-semibold text-slate-500">Разом ЗП</span>
                        <span className="font-bold text-blue-600">{formatMoney(crewMembers.reduce((s, m) => s + (salaries[m.id] || 0), 0))} грн</span>
                      </div>
                    )}
                  </div>
                )}

                {inventoryItems && inventoryItems.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                    <CardHeader icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    } color="bg-teal-50 text-teal-600" title="Витрата матеріалів" />
                    <div className="space-y-2">
                      {inventoryItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-700">{item.name}</span>
                            <span className="text-xs text-slate-400">({item.unit})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400">
                              {item.currentStock} {item.unit}
                            </span>
                            <input
                              type="number"
                              min={0}
                              max={item.currentStock}
                              inputMode="numeric"
                              value={inventoryUsages[item.id] || ""}
                              disabled={!isEditable}
                              onChange={(e) =>
                                setInventoryUsages((prev) => ({
                                  ...prev,
                                  [item.id]: +e.target.value,
                                }))
                              }
                              className={`w-16 text-right bg-transparent outline-none font-medium text-base text-slate-800 focus:bg-blue-50 rounded px-1 ${!isEditable ? "opacity-60" : ""}`}
                              placeholder="0"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isEditable && (
                  <div className="md:col-span-2">
                    <label className="text-sm text-slate-500 block mb-1">Коментар</label>
                    <textarea value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      rows={3} disabled={!isEditable}
                      className="w-full p-3 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      placeholder="Додаткові коментарі..." />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 px-4 sm:px-6 py-4 border-t border-slate-100 bg-white shrink-0">
              <button onClick={onClose}
                className="flex-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium py-3 active:scale-[0.97] transition-transform duration-fast">
                {isEditable ? "Скасувати" : "Закрити"}
              </button>
              {isEditable && (
                <>
                  <button onClick={handleSaveDraft} disabled={submitLoading}
                    className="flex-1 bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-xl font-medium py-3 disabled:opacity-50 active:scale-[0.97] transition-transform duration-fast">
                    {report ? "Зберегти чернетку" : "Створити чернетку"}
                  </button>
                  <button onClick={handleSubmit} disabled={submitLoading}
                    className="flex-1 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 py-3 disabled:opacity-50 active:scale-[0.97] transition-transform duration-fast">
                    {submitLoading ? "..." : "Подати"}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/features/reports/components/ReportStatusBadge.tsx

```
import type { ReportStatus } from "../../../types";

const LABELS: Record<ReportStatus, string> = {
  DRAFT: "Чернетка",
  SUBMITTED: "На перевірці",
  NEEDS_REVISION: "На доопрацюванні",
  APPROVED: "Затверджено",
  REJECTED: "Відхилено",
  CLOSED: "Закрито",
};

const COLORS: Record<ReportStatus, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SUBMITTED: "bg-amber-50 text-amber-700",
  NEEDS_REVISION: "bg-rose-50 text-rose-600",
  APPROVED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-600",
  CLOSED: "bg-slate-200 text-slate-500",
};

export default function ReportStatusBadge({
  status,
  className = "",
}: {
  status: ReportStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${COLORS[status] ?? "bg-slate-100 text-slate-600"} ${className}`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}

```

# FILE: apps/frontend/src/features/reports/pages/ReportsReviewPage.tsx

```
import { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown, Star, Users, CheckCircle } from "lucide-react";
import {
  useSubmittedReports,
  useApproveReport,
  useRejectReport,
} from "../../../hooks/useReports";
import ReportStatusBadge from "../components/ReportStatusBadge";
import PhoneLink from "../../../components/PhoneLink";
import AddressLink from "../../../components/AddressLink";
import type { ExpenseItem, SalaryRecord } from "../../../types";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Skeleton } from "../../../components/ui/Skeleton";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function fmt(n: unknown) {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));
}

export default function ReportsReviewPage() {
  const { data: reports = [], isLoading } = useSubmittedReports();
  const approveMutation = useApproveReport();
  const rejectMutation = useRejectReport();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [actionTarget, setActionTarget] = useState<{ id: string; action: "reject" } | null>(null);

  const handleApprove = (id: string) => approveMutation.mutate(id);

  const handleReject = (id: string) => {
    if (!comment.trim()) return;
    rejectMutation.mutate({ id, comment: comment.trim() });
    setComment("");
    setActionTarget(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setActionTarget(null);
    setComment("");
  };

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-content-primary">Перевірка звітів</h1>
        <p className="text-sm text-content-muted mt-1">
          {reports.length > 0
            ? `${reports.length} ${reports.length === 1 ? "звіт очікує" : "звітів очікують"} перевірки`
            : "Немає звітів, що очікують перевірки"}
        </p>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-card border border-border p-5 animate-pulse">
              <Skeleton className="h-5 w-1/3 mb-2" />
              <Skeleton className="h-3 w-1/2 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && reports.length === 0 && (
        <EmptyState
          icon={CheckCircle}
          title="Усі звіти перевірено"
          description="Нові звіти з'являться тут після подачі"
        />
      )}

      {!isLoading && reports.length > 0 && (
        <div className="space-y-4">
          {reports.map((r) => {
            const ev = (r as Record<string, unknown>).event as Record<string, unknown> | undefined;
            const school = (ev?.school ?? {}) as Record<string, unknown>;
            const city = (ev?.city ?? {}) as Record<string, unknown>;
            const crew = (ev?.crew ?? {}) as Record<string, unknown>;
            const isExpanded = expandedId === r.id;
            const totalExpenses = (r.expenseItems ?? []).reduce(
              (s: number, e: ExpenseItem) => s + Number(e.amount) || 0,
              0,
            );

            const contactPerson =
              (ev?.contactPerson as string) || (school.director as string) || null;
            const contactPhone =
              (ev?.contactPhone as string) || (school.phone as string) || null;
            const address = ev?.address as string | undefined;

            return (
              <div
                key={r.id}
                className="bg-surface rounded-card border border-border shadow-card overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(r.id)}
                  className="w-full text-left p-4 sm:p-5 hover:bg-surface-muted transition flex items-start justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-content-primary text-base">
                        {(school.name as string) ?? "—"}
                      </span>
                      <span className="text-2xs px-2 py-0.5 rounded-pill bg-brand-50 text-brand-700 border border-brand-100 font-medium">
                        {(school.type as string) ?? ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-content-muted flex-wrap">
                      <span>{(city.name as string) ?? "—"}</span>
                      <span>·</span>
                      <span>{(ev?.project as string) ?? ""}</span>
                      <span>·</span>
                      <span>{ev?.date ? formatDate(ev.date as string) : ""}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-content-muted flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {(crew as any)?.host?.name ?? "—"} / {(crew as any)?.driver?.name ?? "—"}
                      </span>
                      {contactPerson && (
                        <span className="text-content-secondary">👤 {contactPerson}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <ReportStatusBadge status={r.status} />
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {r.rating}/10
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-content-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-border pt-4">
                    {(contactPerson || address) && (
                      <div className="bg-brand-50/60 border border-brand-100 rounded-xl p-3 mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-sm">
                        {contactPerson && (
                          <span className="font-medium text-content-primary shrink-0">
                            👤 {contactPerson}
                          </span>
                        )}
                        {contactPhone && <PhoneLink phone={contactPhone} />}
                        {address && <AddressLink address={address} />}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="bg-surface-muted rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-content-muted uppercase tracking-wide mb-2">
                          Результати
                        </h4>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between">
                            <span className="text-content-muted">Дітей:</span>
                            <span className="font-medium">{r.childrenCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-content-muted">Класів:</span>
                            <span className="font-medium">{r.classesCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-content-muted">Пільговиків:</span>
                            <span className="font-medium">{r.privilegedCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-content-muted">Сеансів:</span>
                            <span className="font-medium">{r.showingsCount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-surface-muted rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-content-muted uppercase tracking-wide mb-2">
                          Фінанси
                        </h4>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between">
                            <span className="text-content-muted">Виручка:</span>
                            <span className="font-bold">{fmt(r.totalSum)} грн</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-content-muted">Закладу:</span>
                            <span className="text-danger-600">−{fmt(r.schoolSum)} грн</span>
                          </div>
                          {totalExpenses > 0 && (
                            <div className="flex justify-between">
                              <span className="text-content-muted">Витрати:</span>
                              <span className="text-danger-600">−{fmt(totalExpenses)} грн</span>
                            </div>
                          )}
                          <div className="flex justify-between pt-1 border-t border-border">
                            <span className="font-semibold text-content-primary">
                              Чистий прибуток:
                            </span>
                            <span className="font-bold text-success-600">
                              {fmt(r.remainderSum)} грн
                            </span>
                          </div>
                        </div>
                        {(r.salaryRecords ?? []).length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <h5 className="text-2xs font-semibold text-content-muted uppercase tracking-wide mb-1.5">
                              Зарплати
                            </h5>
                            {r.salaryRecords.map((s: SalaryRecord, i: number) => (
                              <div key={i} className="flex justify-between text-xs">
                                <span>{s.employee?.name ?? "—"}</span>
                                <span className="text-brand font-medium">{fmt(s.amount)} грн</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {r.comment && (
                      <div className="mb-4 p-3 bg-surface-muted rounded-xl text-sm text-content-secondary italic">
                        {r.comment}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleApprove(r.id)}
                        disabled={approveMutation.isPending}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-success text-white rounded-xl font-medium hover:bg-success-700 disabled:opacity-50 transition"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Затвердити
                      </button>

                      {actionTarget?.id === r.id && actionTarget.action === "reject" ? (
                        <div className="w-full flex gap-2 items-start mt-2">
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={2}
                            placeholder="Обов'язково вкажіть причину відхилення"
                            className="flex-1 p-2 border border-border rounded-lg text-base focus:ring-2 focus:ring-danger outline-none resize-none"
                          />
                          <button
                            onClick={() => handleReject(r.id)}
                            disabled={!comment.trim() || rejectMutation.isPending}
                            className="px-4 py-2 bg-danger text-white rounded-lg font-medium hover:bg-danger-700 disabled:opacity-50 text-sm shrink-0 active:scale-[0.97] transition-transform duration-fast"
                          >
                            Відхилити
                          </button>
                          <button
                            onClick={() => { setActionTarget(null); setComment(""); }}
                            className="px-3 py-2 text-content-muted hover:text-content-secondary text-sm active:scale-90 transition-transform duration-fast"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setActionTarget({ id: r.id, action: "reject" }); setComment(""); }}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-danger-subtle text-danger-600 border border-danger-100 rounded-xl font-medium hover:bg-danger-100 transition"
                        >
                          <XCircle className="w-4 h-4" /> Відхилити
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/features/salary/components/SalaryStatusBadge.tsx

```
import type { SalaryStatus } from "../../../types";

const config: Record<SalaryStatus, { bg: string; text: string; label: string }> = {
  PENDING: { bg: "bg-amber-100", text: "text-amber-700", label: "Очікує" },
  PAID: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Виплачено" },
  CANCELLED: { bg: "bg-slate-100", text: "text-slate-500", label: "Скасовано" },
};

export default function SalaryStatusBadge({ status }: { status: SalaryStatus }) {
  const c = config[status] ?? config.PENDING;
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

```

# FILE: apps/frontend/src/features/salary/pages/Company.tsx

```
import { useState, lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";
import { useSelectedCity } from "../../../context/CityContext";
import type { FinanceDashboardData } from "../../../types";

const FinanceCharts = lazy(() => import("../../../components/finance/FinanceCharts"));

function FinanceSkeleton() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-xl w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
      <div className="h-64 bg-white rounded-2xl border border-slate-100" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-48 bg-white rounded-2xl border border-slate-100" />
        <div className="h-48 bg-white rounded-2xl border border-slate-100" />
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

  if (isLoading || !data) return <FinanceSkeleton />;

  return (
    <Suspense fallback={<FinanceSkeleton />}>
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

```

# FILE: apps/frontend/src/features/salary/pages/Expenses.tsx

```
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { api } from "../../../config/api";
import { useSelectedCity } from "../../../context/CityContext";
import type { FinanceDashboardData } from "../../../types";
import { staggerContainer, staggerItem, useCountUp } from "../../../lib/motion";

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

      <ExpensesTotal value={totalExpenses} />

      {categories.length > 0 && (
        <Suspense fallback={<div className="h-64 bg-white rounded-2xl animate-pulse" />}>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Витрати по категоріях</h3>
            <ExpenseChart byExpenseCategory={categories} />
          </div>
        </Suspense>
      )}

      {categories.length > 0 && (
        <motion.div
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Деталізація</h3>
          <div className="space-y-2">
            {categories.map((cat) => {
              const pct = totalExpenses > 0 ? Math.round((Number(cat.amount) / Number(totalExpenses)) * 100) : 0;
              return (
                <motion.div key={cat.name} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0" variants={staggerItem}>
                  <span className="text-sm text-slate-700">{cat.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{pct}%</span>
                    <span className="text-sm font-semibold text-slate-800">{fmt(cat.amount)} грн</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ExpensesTotal({ value }: { value: number }) {
  const display = useCountUp(value, { duration: 0.9 });
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <p className="text-sm text-slate-400 mb-1">Загальні витрати</p>
      <p className="text-3xl font-bold text-slate-800">{fmt(display)} <span className="text-lg text-slate-400">грн</span></p>
    </div>
  );
}

```

# FILE: apps/frontend/src/features/salary/pages/MySalary.tsx

```
import { motion } from "framer-motion";
import { useMySalary } from "../../../hooks/useSalary";
import { useAuth } from "../../../context/AuthContext";
import { useSelectedCity } from "../../../context/CityContext";
import SalaryStatusBadge from "../components/SalaryStatusBadge";
import { staggerContainer, staggerItem } from "../../../lib/motion";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Wallet } from "lucide-react";

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

export default function MySalary() {
  const { user } = useAuth();
  const { selectedCity } = useSelectedCity();
  const { data: records = [], isLoading } = useMySalary(
    user?.role === "MANAGER" || user?.role === "SUPERADMIN" ? undefined : selectedCity.id,
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="p-4">
        <EmptyState
          icon={Wallet}
          title="Ще немає нарахувань"
          description="Нарахування з'являться після проведення подій"
        />
      </div>
    );
  }

  return (
    <motion.div
      className="p-4 space-y-3"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {records.map((r) => (
        <motion.div key={r.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm" variants={staggerItem} whileTap={{ scale: 0.98 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-800">{r.event?.project ?? "—"}</span>
            <SalaryStatusBadge status={r.status} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">{r.event?.date ? new Date(r.event.date).toLocaleDateString("uk-UA") : "—"}</span>
            <span className="font-bold text-blue-600">{fmt(r.amount)} грн</span>
          </div>
          {r.comment && <p className="text-xs text-slate-400 mt-1">{r.comment}</p>}
        </motion.div>
      ))}
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/features/salary/pages/TeamSalaries.tsx

```
import { useAllSalary, useMarkPaid } from "../../../hooks/useSalary";
import { useSelectedCity } from "../../../context/CityContext";
import SalaryStatusBadge from "../components/SalaryStatusBadge";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Users } from "lucide-react";

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

export default function TeamSalaries() {
  const { selectedCity } = useSelectedCity();
  const { data: records = [], isLoading } = useAllSalary(selectedCity.id);
  const markPaidMutation = useMarkPaid();

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="p-4">
        <EmptyState
          icon={Users}
          title="Немає нарахувань"
          description="Нарахування для цього міста ще відсутні"
        />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {records.map((r) => (
        <div key={r.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-800">{r.employee?.name ?? "—"}</span>
            <SalaryStatusBadge status={r.status} />
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500">{r.event?.project ?? "—"} · {r.event?.date ? new Date(r.event.date).toLocaleDateString("uk-UA") : "—"}</span>
            <span className="font-bold text-blue-600">{fmt(r.amount)} грн</span>
          </div>
          {r.comment && <p className="text-xs text-slate-400 mb-2">{r.comment}</p>}
          {r.status === "PENDING" && (
            <button
              onClick={() => markPaidMutation.mutate(r.id)}
              disabled={markPaidMutation.isPending}
              className="w-full mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              Позначити виплаченим
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

```

# FILE: apps/frontend/src/hooks/useAnalytics.ts

```
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  profit: number;
  events: number;
}

export interface CityEvents {
  cityId: string;
  cityName: string;
  events: number;
}

export interface CityProfit {
  cityId: string;
  cityName: string;
  revenue: number;
  profit: number;
  expenses: number;
  count: number;
}

export interface SalaryFund {
  total: number;
  month: number;
  year: number;
  byCity?: Record<string, number>;
}

export interface Roi {
  totalRevenue: number;
  totalExpenses: number;
  salaryExpenses: number;
  profit: number;
  roi: number;
}

export function useRevenueByMonth(params?: { cityId?: string; projectId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "revenue-by-month", params],
    queryFn: () => api.get<MonthlyRevenue[]>("/analytics/revenue-by-month", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useEventsByCity(params?: { year?: number }) {
  return useQuery({
    queryKey: ["analytics", "events-by-city", params],
    queryFn: () => api.get<CityEvents[]>("/analytics/events-by-city", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProfitByCity(params?: { cityId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "profit-by-city", params],
    queryFn: () => api.get<CityProfit[]>("/analytics/profit-by-city", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSalaryFund(params?: { month?: number; year?: number; cityId?: string }) {
  return useQuery({
    queryKey: ["analytics", "salary-fund", params],
    queryFn: () => api.get<SalaryFund>("/analytics/salary-fund", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRoi(params?: { cityId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "roi", params],
    queryFn: () => api.get<Roi>("/analytics/roi", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

```

# FILE: apps/frontend/src/hooks/useApi.ts

```
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { api } from "../config/api";
import type { City, School } from "../types";

export function useAddCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api.post<City>("/cities", { name }).then((r) => r.data),
    onSuccess: (newCity) => {
      qc.setQueryData(["cities"], (old: City[] = []) => [newCity, ...old]);
    },
  });
}

export interface SchoolFilters {
  search?: string;
  cityId?: string;
  type?: "Школа" | "Садочок";
  stage?: "new" | "planned" | "inProgress" | "done";
  size?: "small" | "medium" | "large";
}

interface SchoolsPage {
  data: School[];
  meta: {
    totalItems: number;
    page: number;
    take: number;
    pageCount: number;
    hasNextPage: boolean;
  };
}

export function useSchools(filters: SchoolFilters = {}) {
  return useInfiniteQuery({
    queryKey: ["schools", filters],
    queryFn: ({ pageParam = 1 }) =>
      api
        .get<SchoolsPage>("/schools", {
          params: { ...filters, page: pageParam, take: 30 },
        })
        .then((r) => r.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSchoolStats(
  filters: Pick<SchoolFilters, "cityId" | "type" | "stage"> = {},
) {
  return useQuery({
    queryKey: ["schoolStats", filters],
    queryFn: () =>
      api
        .get("/schools/stats", { params: filters })
        .then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useSupportedCities() {
  return useQuery({
    queryKey: ["supportedCities"],
    queryFn: () =>
      api
        .get<string[]>("/schools/supported-cities")
        .then((r) => r.data),
    staleTime: 60 * 60 * 1000,
  });
}

export function useAddSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<School>) =>
      api
        .post<School>("/schools", data)
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
    },
  });
}

export function useDeleteSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (schoolId: string) =>
      api.delete(`/schools/${schoolId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
    },
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => api.get("/events").then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function usePrefetchSchool() {
  const qc = useQueryClient();
  return (schoolId: string) => {
    qc.prefetchQuery({
      queryKey: ["school", schoolId],
      queryFn: () =>
        api
          .get<School>(`/schools/${schoolId}`)
          .then((r) => r.data),
      staleTime: 2 * 60 * 1000,
    });
  };
}

```

# FILE: apps/frontend/src/hooks/useCalendar.ts

```
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import type { Event, Project } from "../types";

export function useCalendarEvents() {
  return useQuery<Event[]>({
    queryKey: ["calendarEvents"],
    queryFn: () =>
      api.get<{ data: Event[] }>("/events").then((r) => r.data.data),
    staleTime: 60 * 1000,
  });
}

export function useCalendarProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () =>
      api.get<{ data: Project[] }>("/projects").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

```

# FILE: apps/frontend/src/hooks/useCities.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { City, CityProfile } from "../types";

export function useCities() {
  return useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => api.get<City[]>("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCity(id: string | undefined) {
  return useQuery<CityProfile>({
    queryKey: ["city", id],
    queryFn: () => api.get<CityProfile>(`/cities/${id}`).then((r) => r.data),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api.post("/cities", { name }).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData<City[]>(["cities"], (old) =>
        Array.isArray(old) ? [data, ...old] : [data],
      );
    },
  });
}

export function useCreateCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: { name: string; hostId: string; driverId: string }) =>
      api.post(`/cities/${cityId}/crews`, form).then((r) => r.data),
    onMutate: async (form) => {
      await qc.cancelQueries({ queryKey: ["city", cityId] });
      const prev = qc.getQueryData<CityProfile>(["city", cityId]);
      const optimistic: Crew = { id: `temp-${Date.now()}`, ...form, name: form.name, cityId: cityId! };
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old ? { ...old, crews: [...(old.crews || []), optimistic] } : old,
      );
      return { prev };
    },
    onSuccess: (data) => {
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old
          ? {
              ...old,
              crews: old.crews?.map((c: Crew) =>
                c.id?.startsWith("temp-") ? data : c,
              ),
            }
          : old,
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<CityProfile>(["city", cityId], ctx.prev);
    },
  });
}

export function useDeleteCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (crewId: string) =>
      api.delete(`/cities/crews/${crewId}`).then((r) => r.data),
    onMutate: async (crewId) => {
      await qc.cancelQueries({ queryKey: ["city", cityId] });
      const prev = qc.getQueryData<CityProfile>(["city", cityId]);
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old
          ? { ...old, crews: old.crews?.filter((c: Crew) => c.id !== crewId) }
          : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<CityProfile>(["city", cityId], ctx.prev);
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useDashboardData.ts

```
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import type { FinanceDashboardData } from "../types";
import { useSelectedCity } from "../context/CityContext";

export function useFinanceDashboard(period = "month") {
  const { selectedCity } = useSelectedCity();

  return useQuery<FinanceDashboardData>({
    queryKey: ["finance", "dashboard", period, selectedCity.id],
    queryFn: () =>
      api
        .get<FinanceDashboardData>("/finance/dashboard", {
          params: {
            period,
            cityId: selectedCity.id || undefined,
          },
        })
        .then((r) => r.data),
    staleTime: 60 * 1000,
  });
}

```

# FILE: apps/frontend/src/hooks/useDashboardSummary.ts

```
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";

export interface DashboardSummary {
  todayEvents: TodayEvent[];
  upcomingEvents: UpcomingEvent[];
  funnel: Record<string, number>;
  totalSchools: number;
  monthlyKpi: {
    revenue: number;
    profit: number;
    children: number;
    count: number;
  };
  staleSchools: StaleSchool[];
  activityFeed: ActivityFeedItem[];
  citiesStats: CityStat[];
}

interface TodayEvent {
  id: string;
  time?: string | null;
  project: string;
  school?: { id: string; name: string } | null;
  crew?: {
    id: string;
    name?: string;
    host?: { id: string; name: string } | null;
    driver?: { id: string; name: string } | null;
  } | null;
}

interface UpcomingEvent {
  id: string;
  date: string;
  time?: string | null;
  project: string;
  school?: { id: string; name: string } | null;
  crew?: {
    id: string;
    name?: string;
    host?: { id: string; name: string } | null;
    driver?: { id: string; name: string } | null;
  } | null;
}

interface StaleSchool {
  id: string;
  name: string;
  status: string | null;
  lastActivity: string | null;
  daysStale: number | null;
}

interface ActivityFeedItem {
  id: string;
  userName: string;
  role: string;
  action: string;
  comment: string | null;
  createdAt: string;
  schoolId: string | null;
  schoolName: string | null;
  eventId: string | null;
}

interface CityStat {
  cityId: string;
  cityName: string;
  schoolsCount: number;
  activeEvents: number;
  monthRevenue: number;
}

export function useDashboardSummary() {
  const { selectedCity } = useSelectedCity();

  return useQuery<DashboardSummary>({
    queryKey: ["dashboard", "summary", selectedCity.id],
    queryFn: () =>
      api
        .get<DashboardSummary>("/dashboard/summary", {
          params: { cityId: selectedCity.id || undefined },
        })
        .then((r) => r.data),
    staleTime: 60 * 1000,
  });
}

```

# FILE: apps/frontend/src/hooks/useDaysOff.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface DayOff {
  id: string;
  userId: string;
  date: string;
  user: { id: string; name: string; role: string; cityId: string | null };
}

export function useDaysOff(from?: string, to?: string, cityId?: string) {
  return useQuery({
    queryKey: ["daysOff", from, to, cityId],
    queryFn: () => {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (cityId) params.set("cityId", cityId);
      return api.get<DayOff[]>(`/days-off?${params}`).then((r) => r.data);
    },
    staleTime: 30 * 1000,
  });
}

export function useCreateDayOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { date: string; userId?: string }) =>
      api.post<DayOff>("/days-off", payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}

export function useDeleteDayOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/days-off/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useDebounce.ts

```
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

```

# FILE: apps/frontend/src/hooks/useEmployees.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { User, Project } from "../types";

export interface UserFormData {
  fullName: string;
  phone: string;
  email: string;
  cityId: string;
  role: string;
  password: string;
  telegramId: string;
  car: string;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      api.get<User[]>("/users", undefined).then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      api.get<Project[]>("/projects", undefined).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: UserFormData) =>
      api.post<User>("/users", form, undefined).then((r) => r.data),
    onMutate: async (form) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      const optimistic = {
        id: `temp-${Date.now()}`,
        name: form.fullName,
        ...form,
      };
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old) ? [...old, optimistic] : [optimistic],
      );
      return { prev };
    },
    onSuccess: (data) => {
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) => (u.id?.startsWith("temp-") ? data : u))
          : [data],
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, form }: { id: string; form: Partial<UserFormData> }) =>
      api
        .patch<User>(`/users/${id}`, form, undefined)
        .then((r) => r.data),
    onMutate: async ({ id, form }) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) =>
              u.id === id
                ? { ...u, name: form.fullName ?? u.name, ...form }
                : u,
            )
          : old,
      );
      return { prev };
    },
    onSuccess: (data, vars) => {
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) => (u.id === vars.id ? { ...u, ...data } : u))
          : old,
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/users/${id}`, undefined).then((r) => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old) ? old.filter((u) => u.id !== id) : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: {
      name: string;
      color: string;
      pricePerChild?: number;
    }) =>
      api
        .post<Project>("/projects", form, undefined)
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old) ? [...old, data] : [data],
      );
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      form,
    }: {
      id: string;
      form: { name?: string; color?: string; pricePerChild?: number };
    }) =>
      api
        .patch<Project>(`/projects/${id}`, form, undefined)
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old)
          ? old.map((p) => (p.id === vars.id ? { ...p, ...data } : p))
          : old,
      );
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/projects/${id}`, undefined).then((r) => r.data),
    onSuccess: (_data, id) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old) ? old.filter((p) => p.id !== id) : old,
      );
    },
  });
}

```

