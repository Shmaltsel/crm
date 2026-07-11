import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useSelectedCity } from "../context/CityContext";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import EventsWidget from "../components/dashboard/EventsWidget";
import StaleSchools from "../components/dashboard/StaleSchools";
import FunnelBar from "../components/dashboard/FunnelBar";
import CitiesTable from "../components/dashboard/CitiesTable";
import CollapsibleSection from "../components/dashboard/CollapsibleSection";
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
  const { selectedCity, isCityLocked } = useSelectedCity();
  const { data: summary, isError } = useDashboardSummary();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброго ранку";
    if (hour < 18) return "Доброго дня";
    return "Доброго вечора";
  }, []);

  const showCitiesTable = !isCityLocked && selectedCity.id === "";

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
      {/* Привітання - без хрому */}
      <div className="p-4 md:p-8 pb-0">
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

      <div className="p-4 md:p-8 space-y-6">
        {isError ? (
          <div className="text-center py-12 text-content-muted">
            <span className="text-2xl block mb-2 opacity-50">⚠️</span>
            <p className="text-sm font-medium">Не вдалося завантажити дані дашборду</p>
          </div>
        ) : (
          <>
            {/* KPI Grid */}
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

            <div className="lg:grid lg:grid-cols-2 lg:gap-6">
              {/* Ліва колонка */}
              <div className="space-y-6 mb-6 lg:mb-0">
                <StaleSchools schools={summary?.staleSchools ?? []} loading={!summary} />
                <EventsWidget 
                  todayEvents={summary?.todayEvents ?? []} 
                  upcomingEvents={summary?.upcomingEvents ?? []} 
                />
              </div>

              {/* Права колонка */}
              <div className="space-y-6">
                <CollapsibleSection
                  title="Воронка"
                  subtitle={summary?.funnel ? `${summary.funnel.BASE ?? 0} шкіл · ${summary.funnel.DONE ?? 0} проведено` : undefined}
                >
                  <FunnelBar funnel={summary?.funnel ?? {}} />
                </CollapsibleSection>

                {showCitiesTable && summary?.citiesStats && (
                  <CollapsibleSection
                    title="По містах"
                    subtitle={`${summary.citiesStats.length} міст`}
                  >
                    <CitiesTable rows={summary.citiesStats} />
                  </CollapsibleSection>
                )}

                <ActivityFeed items={summary?.activityFeed ?? []} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}