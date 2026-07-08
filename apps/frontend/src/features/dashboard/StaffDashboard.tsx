import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/api";
import { useMySalary } from "../../hooks/useSalary";
import type { Event } from "../../types";

function fmt(n: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(n));
}

function todayDateStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse">
      <div className="h-4 bg-slate-100 rounded-full w-1/3 mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded-full w-full" />
        <div className="h-3 bg-slate-100 rounded-full w-4/5" />
        <div className="h-3 bg-slate-100 rounded-full w-3/5" />
      </div>
    </div>
  );
}

export default function StaffDashboard() {
  const today = todayDateStr();

  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["my-events", today],
    queryFn: () =>
      api.get<{ data: Event[] }>("/events", { params: { dateFrom: today, dateTo: today } }).then((r) => r.data.data),
    staleTime: 30 * 1000,
  });

  const { data: salary, isLoading: salaryLoading } = useMySalary();

  const pendingSalary = useMemo(() => {
    if (!salary) return 0;
    return salary
      .filter((s) => s.status === "PENDING")
      .reduce((sum, s) => sum + s.amount, 0);
  }, [salary]);

  const todayEvents = useMemo(() => {
    if (!events) return [];
    return events.filter((e) => e.date === today);
  }, [events, today]);

  const recentEvents = useMemo(() => {
    if (!events) return [];
    return [...events]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [events]);

  const dateLabel = new Date().toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  if (eventsLoading || salaryLoading) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Мій дашборд</h1>
        <p className="text-xs text-slate-400 mt-1">{dateLabel}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Сьогодні */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm font-semibold text-slate-800">Сьогодні</p>
            <Link to="/calendar" className="text-xs text-blue-600 hover:underline shrink-0">
              Календар
            </Link>
          </div>
          {todayEvents.length === 0 ? (
            <div className="py-6 text-center text-slate-400 text-sm">Сьогодні подій немає</div>
          ) : (
            <div className="flex flex-col gap-2">
              {todayEvents.map((ev) => (
                <div key={ev.id} className="rounded-xl border border-slate-100 bg-white p-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-800 tabular-nums">
                      {ev.time ?? "—:——"}
                    </span>
                    <span className="text-xs text-slate-400 truncate">{ev.project}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 leading-snug line-clamp-2">
                    {ev.school?.name ?? "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
            Усього на сьогодні: {todayEvents.length}
          </p>
        </div>

        {/* Моя зарплата */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <p className="text-sm font-semibold text-slate-800 mb-3">Моя зарплата</p>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold text-emerald-700">{fmt(pendingSalary)}</span>
            <span className="text-sm text-slate-400">грн</span>
          </div>
          <p className="text-xs text-slate-400">до виплати (очікує)</p>
          <Link
            to="/salary"
            className="mt-auto pt-3 text-xs text-blue-600 hover:underline"
          >
            Детальніше →
          </Link>
        </div>

        {/* Останні події */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <p className="text-sm font-semibold text-slate-800 mb-3">Останні події</p>
          {recentEvents.length === 0 ? (
            <div className="py-6 text-center text-slate-400 text-sm">Подій поки що немає</div>
          ) : (
            <div className="flex flex-col gap-2">
              {recentEvents.map((ev) => (
                <Link
                  key={ev.id}
                  to={`/events/${ev.id}`}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 hover:bg-slate-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">
                      {ev.school?.name ?? "—"}
                    </p>
                    <p className="text-xs text-slate-400">{ev.date}</p>
                  </div>
                  <span className="text-xs text-blue-600 shrink-0 ml-2">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
