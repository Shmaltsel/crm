import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import TodayEvents from "../components/dashboard/TodayEvents";
import ActivityFeed from "../components/dashboard/ActivityFeed";

function fmtAmount(value: unknown): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(value) || 0));
}

function KpiCard({
  title,
  value,
  subtitle,
  icon,
  loading,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: string;
  loading?: boolean;
}) {
  return (
    <div className="mobile-kpi-card min-h-[80px]">
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-3 bg-neutral-100 rounded w-1/2" />
          <div className="h-6 bg-neutral-100 rounded w-2/3" />
          <div className="h-2.5 bg-neutral-100 rounded w-1/3" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-sm">{icon}</span>
            <span className="mobile-stat-label">{title}</span>
          </div>
          <p className="text-xl font-bold text-content-primary leading-none">{value}</p>
          {subtitle && (
            <p className="text-2xs text-content-muted mt-1">{subtitle}</p>
          )}
        </>
      )}
    </div>
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
        value: `${fmtAmount(summary.monthlyKpi.revenue)} грн`,
        icon: "💰",
      },
      {
        title: "Прибуток",
        value: `${fmtAmount(summary.monthlyKpi.profit)} грн`,
        icon: "📈",
      },
      {
        title: "Дітей",
        value: fmtAmount(summary.monthlyKpi.children),
        subtitle: `за ${summary.monthlyKpi.count} подіями`,
        icon: "👶",
      },
      {
        title: "Активних шкіл",
        value: fmtAmount(summary.totalSchools),
        icon: "🏫",
      },
    ];
  }, [summary]);

  return (
    <div className="min-h-0">
      <div className="bg-white/80 backdrop-blur-md border-b border-border px-4 md:px-8 py-3">
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {kpiCards
                ? kpiCards.map((kpi) => (
                    <KpiCard key={kpi.title} {...kpi} loading={false} />
                  ))
                : Array.from({ length: 4 }).map((_, i) => (
                    <KpiCard
                      key={i}
                      title=""
                      value=""
                      icon=""
                      loading={true}
                    />
                  ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TodayEvents events={summary?.todayEvents ?? []} />
              <ActivityFeed items={summary?.activityFeed ?? []} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
