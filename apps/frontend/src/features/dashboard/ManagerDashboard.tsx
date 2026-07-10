import { useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/api";
import { useSubmittedReports } from "../../hooks/useReports";
import { useSelectedCity } from "../../context/CityContext";
import { useCity } from "../../hooks/useCities";
import type { Event } from "../../types";

const IssueCarousel = lazy(() => import("../../components/IssueCarousel"));

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
      </div>
    </div>
  );
}

export default function ManagerDashboard() {
  const today = todayDateStr();
  const { selectedCity } = useSelectedCity();

  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["city-events", today, selectedCity.id],
    queryFn: () =>
      api
        .get<{ data: Event[] }>("/events", {
          params: { dateFrom: today, dateTo: today, cityId: selectedCity.id || undefined },
        })
        .then((r) => r.data.data),
    enabled: !!selectedCity.id,
    staleTime: 30 * 1000,
  });

  const { data: submittedReports, isLoading: reportsLoading } = useSubmittedReports();
  const { data: cityProfile, isLoading: cityLoading } = useCity(selectedCity.id || undefined);

  const todayEvents = useMemo(() => {
    if (!events) return [];
    return events.filter((e) => e.date === today);
  }, [events, today]);

  const cityReports = useMemo(() => {
    if (!submittedReports || !selectedCity.id) return [];
    return submittedReports.filter((r) => selectedCity.id === r.event?.cityId || false);
  }, [submittedReports, selectedCity.id]);

  const dateLabel = new Date().toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  if (!selectedCity.id) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Дашборд</h1>
          <p className="text-sm text-content-muted mt-1">Оберіть місто для перегляду</p>
        </div>
      </div>
    );
  }

  if (eventsLoading || reportsLoading || cityLoading) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
          <div className="h-4 bg-slate-100 rounded w-36 mt-2 animate-pulse" />
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
        <h1 className="text-2xl font-bold text-slate-800">
          Дашборд · {selectedCity.name}
        </h1>
        <p className="text-xs text-slate-400 mt-1">{dateLabel}</p>
      </div>

      <Suspense fallback={null}>
        <IssueCarousel />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Події сьогодні */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm font-semibold text-slate-800">Події сьогодні</p>
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

        {/* Неперевірені звіти */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <p className="text-sm font-semibold text-slate-800 mb-3">Неперевірені звіти</p>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold text-amber-600">{cityReports.length}</span>
            <span className="text-sm text-slate-400">шт.</span>
          </div>
          <p className="text-xs text-slate-400">
            {selectedCity.name}
          </p>
          <Link
            to="/reports"
            className="mt-auto pt-3 text-xs text-blue-600 hover:underline"
          >
            Переглянути →
          </Link>
        </div>

        {/* Моє місто */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <p className="text-sm font-semibold text-slate-800 mb-3">Моє місто</p>
          <p className="text-lg font-bold text-slate-800">{cityProfile?.name ?? selectedCity.name}</p>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-slate-500">
              Шкіл: <span className="font-semibold text-slate-700">{cityProfile?.schoolsCount ?? cityProfile?.schools?.length ?? "—"}</span>
            </p>
            <p className="text-xs text-slate-500">
              Команд: <span className="font-semibold text-slate-700">{cityProfile?.crews?.length ?? "—"}</span>
            </p>
          </div>
          <Link
            to={`/cities/${selectedCity.id}`}
            className="mt-auto pt-3 text-xs text-blue-600 hover:underline"
          >
            Детальніше →
          </Link>
        </div>
      </div>
    </div>
  );
}
