import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { DUR, EASE, pageVariants } from "../lib/motion";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
import { hasRole } from "../utils/roles";
import { EmptyState } from "../components/ui/EmptyState";
import { BarChart3, Trophy } from "lucide-react";

interface CityLeaderboardEntry {
  cityId: string;
  cityName: string;
  events: number;
  revenue: number;
  profit: number;
  children: number;
  schools: number;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  revenue: number;
  events: number;
}

const METRICS: { key: string; label: string }[] = [
  { key: "events", label: "Події" },
  { key: "revenue", label: "Дохід" },
  { key: "profit", label: "Прибуток" },
  { key: "children", label: "Діти" },
  { key: "schools", label: "Школи" },
];

const PERIOD_LABELS: Record<string, string> = {
  year: "Цей рік",
  quarter: "Цей квартал",
  month: "Цей місяць",
  all: "За весь час",
};

function fmt(n: unknown): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));
}

function fmtMoney(n: unknown): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);
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
      <div className="w-24 h-4 bg-surface-muted rounded-full shrink-0" />
      <div className="h-8 bg-surface-muted rounded-full flex-1" />
      <div className="w-16 h-4 bg-surface-muted rounded-full shrink-0" />
    </div>
  );
}

export default function CityLeaderboard() {
  const [metric, setMetric] = useState("events");
  const [year, setYear] = useState(currentYear);
  const [staffPeriod, setStaffPeriod] = useState("year");
  const [schoolType, setSchoolType] = useState<'all' | 'school' | 'kindergarten'>('all');
  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();
  const showStaff = hasRole(user?.role, ["SUPERADMIN", "OWNER", "MANAGER"]);

  const { data: staffResult, isLoading: staffLoading } = useQuery({
    queryKey: ["staff-revenue", staffPeriod],
    queryFn: () => {
      const params = new URLSearchParams();
      if (staffPeriod) params.set("period", staffPeriod);
      
      return api.get(`/finance/staff-revenue?${params}`).then((r) => r.data);
    },
    enabled: showStaff,
    staleTime: 5 * 60 * 1000,
  });

  const staffByRole = useMemo(() => {
    if (!staffResult?.staff) return { hosts: [] as StaffMember[], drivers: [] as StaffMember[] };
    return {
      hosts: staffResult.staff.filter((s: StaffMember) => s.role === "HOST"),
      drivers: staffResult.staff.filter((s: StaffMember) => s.role === "DRIVER"),
    };
  }, [staffResult]);

  const staffMaxRevenue = staffResult?.staff?.[0]?.revenue ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "city-leaderboard", metric, year, schoolType],
    queryFn: () =>
      api
        .get<CityLeaderboardEntry[]>("/analytics/city-leaderboard", {
          params: { metric, year, schoolType: schoolType === 'all' ? undefined : schoolType === 'school' ? 'Школи' : 'Садочки' },
        })
        .then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const maxValue = data
    ? Math.max(...data.map((d) => d[metric as keyof CityLeaderboardEntry] as number), 1)
    : 1;

  const formatValue = metric === "revenue" || metric === "profit" ? fmtMoney : fmt;

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      {showStaff && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-content-primary">Рейтинг працівників</h2>
            <select
              value={staffPeriod}
              onChange={(e) => setStaffPeriod(e.target.value)}
              className="px-3 py-2 bg-surface border border-border-strong rounded-lg text-sm focus:outline-none focus:border-blue-400"
            >
              <option value="year">Цей рік</option>
              <option value="quarter">Цей квартал</option>
              <option value="month">Цей місяць</option>
              <option value="all">За весь час</option>
            </select>
        <div className="flex items-center gap-1 bg-surface-muted rounded-lg p-1 ml-2">
          {[
            { key: 'all' as const, label: 'Всі' },
            { key: 'school' as const, label: 'Школи' },
            { key: 'kindergarten' as const, label: 'Садочки' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setSchoolType(t.key)}
              className={"px-3 py-1.5 rounded-md text-sm font-medium transition-colors " + (
                schoolType === t.key
                  ? "bg-surface text-content-primary shadow-sm"
                  : "text-content-secondary hover:text-content-primary"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
          </div>
          {staffLoading ? (
            <div className="bg-surface rounded-card border border-border shadow-card p-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 mb-3 animate-pulse">
                  <div className="w-8 h-8 bg-surface-muted rounded-full shrink-0" />
                  <div className="h-4 bg-surface-muted rounded-full flex-1" />
                  <div className="w-16 h-4 bg-surface-muted rounded-full shrink-0" />
                </div>
              ))}
            </div>
          ) : !staffResult?.staff?.length ? (
            <div className="bg-surface rounded-card border border-border shadow-card p-6">
              <EmptyState icon={BarChart3} title="Немає даних за обраний період" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {([
                { label: "🎙️ Ведучі", members: staffByRole.hosts },
                { label: "🚗 Водії", members: staffByRole.drivers },
              ] as const).map(({ label, members }) => {
                if (members.length === 0) return null;
                return (
                  <div key={label} className="bg-surface rounded-card border border-border shadow-card p-5">
                    <h3 className="font-bold text-content-primary mb-3">{label}</h3>
                    <div className="flex flex-col gap-3">
                      {members.map((member, i) => {
                        const pct = staffMaxRevenue > 0 ? Math.round((member.revenue / staffMaxRevenue) * 100) : 0;
                        const isTop = i === 0;
                        return (
                          <div key={member.id}>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isTop ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                                  {i + 1}
                                </span>
                                <span className="text-sm font-semibold text-content-primary">{member.name}</span>
                                {isTop && <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">🏆 Топ</span>}
                              </div>
                              <span className="text-xs font-bold text-content-secondary">{fmt(member.revenue)} грн</span>
                            </div>
                            <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${isTop ? "bg-amber-400" : "bg-blue-400"}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: DUR.verySlow, ease: EASE.decelerate }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-content-primary">Рейтинг міст</h1>
        <p className="text-xs text-content-muted mt-1">Порівняння міст за обраною метрикою</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {METRICS.map((m) => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              metric === m.key
                ? "bg-brand text-white shadow-sm"
                : "bg-surface text-content-secondary border border-border-strong hover:border-blue-300"
            }`}
          >
            {m.label}
          </button>
        ))}

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="ml-auto px-3 py-2.5 bg-surface border border-border-strong rounded-lg text-sm focus:outline-none focus:border-blue-400"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="bg-surface rounded-card border border-border shadow-card p-6">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonBar key={i} />)}
        </div>
      ) : !data || data.length === 0 ? (
        <div className="bg-surface rounded-card border border-border shadow-card p-6">
          <EmptyState icon={Trophy} title={`Немає даних за ${year} рік`} />
        </div>
      ) : (
        <div className="bg-surface rounded-card border border-border shadow-card p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={metric}
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {data.map((entry, i) => {
                const value = entry[metric as keyof CityLeaderboardEntry] as number;
                const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;
                const colorIndex = Math.min(i, BAR_COLORS.length - 1);

                return (
                  <div key={entry.cityId} className="flex items-center gap-3 mb-3">
                    <span className="w-24 text-xs text-content-muted truncate shrink-0 text-right">
                      {entry.cityName}
                    </span>
                    <div className="flex-1 h-8 bg-surface-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${BAR_COLORS[colorIndex]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: DUR.verySlow, ease: EASE.decelerate }}
                      />
                    </div>
                    <span className="w-20 text-xs font-semibold text-content-secondary text-right shrink-0">
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
