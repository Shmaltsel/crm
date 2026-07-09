import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useSelectedCity } from "../context/CityContext";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { useCities } from "../hooks/useCities";
import TodayEvents from "../components/dashboard/TodayEvents";
import ActivityFeed from "../components/dashboard/ActivityFeed";

function fmtAmount(value: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(value));
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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between min-h-[100px]">
      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-100 rounded w-1/2" />
          <div className="h-7 bg-slate-100 rounded w-2/3" />
          <div className="h-3 bg-slate-100 rounded w-1/3" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-base">{icon}</span>
            <span className="text-xs font-semibold text-slate-500">{title}</span>
          </div>
          <p className="text-xl font-bold text-slate-800 leading-none">{value}</p>
          {subtitle && (
            <p className="text-[11px] text-slate-400 mt-1.5 font-medium">{subtitle}</p>
          )}
        </>
      )}
    </div>
  );
}

export default function OverviewTab() {
  const { user } = useAuth();
  const { selectedCity, setSelectedCity } = useSelectedCity();
  const { data: summary, isError } = useDashboardSummary();
  const { data: cities } = useCities();

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
    <div className="bg-slate-50 min-h-screen">
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-800">
              {greeting}, {user?.name ?? "Користувач"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {new Date().toLocaleDateString("uk-UA", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>

          {cities && cities.length > 0 && (
            <select
              value={selectedCity.id || ""}
              onChange={(e) => {
                const city = cities.find((c) => c.id === e.target.value);
                if (city) setSelectedCity({ id: city.id, name: city.name });
              }}
              className="bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 shadow-sm max-w-[140px] truncate"
              aria-label="Вибір міста"
            >
              <option value="">Всі міста</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-6">
        {isError ? (
          <div className="text-center py-16 text-slate-400">
            <span className="text-3xl block mb-3 opacity-50">⚠️</span>
            <p className="text-sm font-medium">Не вдалося завантажити дані дашборду</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TodayEvents events={summary?.todayEvents ?? []} />
              <ActivityFeed items={summary?.activityFeed ?? []} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
