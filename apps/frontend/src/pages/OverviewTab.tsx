import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import TodayEvents from "../components/dashboard/TodayEvents";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import { staggerContainer, staggerItem, useCountUp, TRANSITION } from "../lib/motion";
import { TrendingUp, DollarSign, Users, Building2 } from "lucide-react";

function AnimatedAmount({ value, suffix }: { value: number; suffix?: string }) {
  const display = useCountUp(value, { duration: 0.9 });
  return (
    <>
      {new Intl.NumberFormat("uk-UA").format(display)}
      {suffix ? ` ${suffix}` : ""}
    </>
  );
}

function KpiCard({
  title,
  numericValue,
  suffix,
  subtitle,
  icon,
  loading,
}: {
  title: string;
  numericValue: number;
  suffix?: string;
  subtitle?: string;
  icon: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <motion.div className="mobile-kpi-card min-h-[80px]" variants={staggerItem} whileTap={{ scale: 0.97 }} transition={TRANSITION.tap}>
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-3 bg-neutral-100 rounded w-1/2" />
          <div className="h-6 bg-neutral-100 rounded w-2/3" />
          <div className="h-2.5 bg-neutral-100 rounded w-1/3" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-content-muted">{icon}</span>
            <span className="mobile-stat-label">{title}</span>
          </div>
          <p className="text-xl font-bold text-content-primary leading-none">
            <AnimatedAmount value={numericValue} suffix={suffix} />
          </p>
          {subtitle && (
            <p className="text-2xs text-content-muted mt-1">{subtitle}</p>
          )}
        </>
      )}
    </motion.div>
  );
}

export default function OverviewTab() {
  const { user } = useAuth();
  const { data: summary, isError } = useDashboardSummary();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброго ранку";
    if (hour < 18) return "Доброго дня";
    return "Доброго вечора";
  }, []);

  const kpiCards = useMemo(() => {
    if (!summary) return null;
    return [
      {
        title: "Виручка",
        numericValue: Number(summary.monthlyKpi.revenue) || 0,
        suffix: "грн",
        icon: <DollarSign className="w-4 h-4" />,
      },
      {
        title: "Прибуток",
        numericValue: Number(summary.monthlyKpi.profit) || 0,
        suffix: "грн",
        icon: <TrendingUp className="w-4 h-4" />,
      },
      {
        title: "Дітей",
        numericValue: Number(summary.monthlyKpi.children) || 0,
        subtitle: `за ${summary.monthlyKpi.count} подіями`,
        icon: <Users className="w-4 h-4" />,
      },
      {
        title: "Активних шкіл",
        numericValue: Number(summary.totalSchools) || 0,
        icon: <Building2 className="w-4 h-4" />,
      },
    ];
  }, [summary]);

  return (
    <div className="min-h-0">
      <div className="bg-white/80 md:backdrop-blur-md border-b border-border px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-content-primary">
              {greeting}, {user?.name ?? "Користувач"}
            </h1>
            <p className="text-2xs text-content-muted mt-0.5">
              {new Date().toLocaleDateString("uk-UA", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-4">
        {isError ? (
          <div className="text-center py-12 text-content-muted">
            <span className="text-2xl block mb-2 opacity-50">⚠️</span>
            <p className="text-sm font-medium">Не вдалося завантажити дані дашборду</p>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {kpiCards
                ? kpiCards.map((kpi) => (
                    <KpiCard key={kpi.title} {...kpi} loading={false} />
                  ))
                : Array.from({ length: 4 }).map((_, i) => (
                    <KpiCard
                      key={i}
                      title=""
                      numericValue={0}
                      icon=""
                      loading={true}
                    />
                  ))}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <TodayEvents events={summary?.todayEvents ?? []} />
              <ActivityFeed items={summary?.activityFeed ?? []} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
