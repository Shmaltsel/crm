import { useFinanceDashboard } from "../../hooks/useDashboardData";

function fmt(n: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(n));
}

function pct(a: number, b: number): number | null {
  if (!b) return null;
  return Math.round(((a - b) / b) * 100);
}

function pctColor(v: number | null): string {
  if (v === null) return "text-slate-400";
  if (v > 0) return "text-emerald-600";
  if (v < 0) return "text-red-500";
  return "text-slate-400";
}

function pctArrow(v: number | null): string {
  if (v === null) return "—";
  if (v > 0) return `↑ ${v}%`;
  if (v < 0) return `↓ ${Math.abs(v)}%`;
  return "0%";
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse">
      <div className="h-4 bg-slate-100 rounded-full w-1/3 mb-3" />
      <div className="h-8 bg-slate-100 rounded w-2/3 mb-2" />
      <div className="h-3 bg-slate-100 rounded w-1/2" />
    </div>
  );
}

export default function OwnerDashboard() {
  const { data: dashboard, isLoading } = useFinanceDashboard("month");

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="text-center py-20 text-slate-400 text-sm">
          Не вдалося завантажити фінансові дані
        </div>
      </div>
    );
  }

  const { kpi, monthly, expectedRevenue } = dashboard;
  const prevMonth = monthly.length > 1 ? monthly[monthly.length - 2] : null;

  const tiles = [
    {
      label: "Виручка",
      value: `${fmt(kpi.totalRevenue)} грн`,
      change: prevMonth ? pct(kpi.totalRevenue, prevMonth.revenue) : null,
      icon: "💰",
      bg: "bg-blue-50",
      color: "text-blue-700",
    },
    {
      label: "Витрати",
      value: `${fmt(kpi.totalExpenses)} грн`,
      change: null,
      icon: "💳",
      bg: "bg-rose-50",
      color: "text-rose-700",
    },
    {
      label: "Прибуток",
      value: `${fmt(kpi.totalProfit)} грн`,
      change: prevMonth ? pct(kpi.totalProfit, prevMonth.profit) : null,
      icon: "📈",
      bg: "bg-emerald-50",
      color: "text-emerald-700",
    },
    {
      label: "Подій",
      value: fmt(kpi.totalEvents),
      change: null,
      icon: "📅",
      bg: "bg-purple-50",
      color: "text-purple-700",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Фінансовий дашборд</h1>
        <p className="text-xs text-slate-400 mt-1">
          {new Date().toLocaleDateString("uk-UA", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-base">{tile.icon}</span>
              <span className={`text-xs font-medium ${tile.color}`}>{tile.label}</span>
            </div>
            <p className={`text-2xl font-bold leading-none ${tile.color}`}>{tile.value}</p>
            {tile.change !== null && (
              <p className={`text-xs mt-1.5 ${pctColor(tile.change)}`}>
                {pctArrow(tile.change)} до минулого місяця
              </p>
            )}
          </div>
        ))}
      </div>

      {expectedRevenue > 0 && (
        <div className="mt-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-sm font-semibold text-slate-800 mb-1">Очікувана виручка</p>
          <p className="text-xl font-bold text-slate-800">{fmt(expectedRevenue)} грн</p>
        </div>
      )}

      {monthly.length > 0 && (
        <div className="mt-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-sm font-semibold text-slate-800 mb-3">Динаміка за місяцями</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {monthly.map((m) => (
              <div key={m.month} className="min-w-[100px] shrink-0 rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500 mb-1">{m.month}</p>
                <p className="text-sm font-bold text-blue-700">{fmt(m.revenue)} грн</p>
                <p className={`text-xs font-medium ${m.profit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {fmt(m.profit)} грн
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
