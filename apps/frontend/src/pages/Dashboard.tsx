import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
const IssueCarousel = lazy(() => import("../components/IssueCarousel"));
const FunnelBar = lazy(() => import("../components/dashboard/FunnelBar"));
const TodayEvents = lazy(() => import("../components/dashboard/TodayEvents"));
const UpcomingEvents = lazy(() => import("../components/dashboard/UpcomingEvents"));
const StaleSchools = lazy(() => import("../components/dashboard/StaleSchools"));
const MonthlyKpi = lazy(() => import("../components/dashboard/MonthlyKpi"));
const ActivityFeed = lazy(() => import("../components/dashboard/ActivityFeed"));
const CitiesTable = lazy(() => import("../components/dashboard/CitiesTable"));

interface DashboardSummary {
  todayEvents: any[];
  upcomingEvents: any[];
  funnel: Record<string, number>;
  totalSchools: number;
  monthlyKpi: {
    revenue: number;
    profit: number;
    children: number;
    count: number;
  };
  staleSchools: {
    id: string;
    name: string;
    status: string | null;
    lastActivity: string | null;
    daysStale: number | null;
  }[];
  activityFeed: {
    id: string;
    userName: string;
    role: string;
    action: string;
    comment: string | null;
    createdAt: string;
    schoolId: string | null;
    schoolName: string | null;
    eventId: string | null;
  }[];
  citiesStats: {
    cityId: string;
    cityName: string;
    schoolsCount: number;
    activeEvents: number;
    monthRevenue: number;
  }[];
}


function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse ${className}`}>
      <div className="h-4 bg-slate-100 rounded-full w-1/3 mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded-full w-full" />
        <div className="h-3 bg-slate-100 rounded-full w-4/5" />
        <div className="h-3 bg-slate-100 rounded-full w-3/5" />
      </div>
    </div>
  );
}

function SkeletonEventCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-3 animate-pulse">
      <div className="flex justify-between mb-2">
        <div className="h-5 bg-slate-100 rounded w-16" />
        <div className="h-4 bg-slate-100 rounded w-24" />
      </div>
      <div className="h-4 bg-slate-100 rounded w-3/4 mb-3" />
      <div className="flex justify-between items-center">
        <div className="h-5 bg-slate-100 rounded-full w-28" />
        <div className="h-7 bg-slate-100 rounded-lg w-20" />
      </div>
    </div>
  );
}

function DashboardSkeleton({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      {/* IssueCarousel placeholder */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse h-24" />

      {/* Сьогодні + Потребують уваги */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TodayEvents */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse">
          <div className="flex justify-between mb-3">
            <div>
              <div className="h-4 bg-slate-100 rounded w-36 mb-1" />
              <div className="h-3 bg-slate-100 rounded w-28" />
            </div>
            <div className="h-4 bg-slate-100 rounded w-16" />
          </div>
          <div className="flex flex-col gap-2">
            <SkeletonEventCard />
            <SkeletonEventCard />
          </div>
        </div>

        {/* StaleSchools */}
        <SkeletonCard />
        {/* UpcomingEvents */}
        <SkeletonCard />
      </div>

      <hr className="border-slate-200" />

      {/* KPI + Воронка */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Activity + Cities */}
      <div className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}>
        <SkeletonCard className="min-h-[200px]" />
        {isSuperAdmin && <SkeletonCard className="min-h-[200px]" />}
      </div>
    </div>
  );
}


export default function Dashboard() {
  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();

  const isSuperAdmin = user?.role === "SUPERADMIN";

  const { data: summary, isLoading } = useQuery<DashboardSummary>({
    queryKey: ["dashboardSummary", selectedCity.id],
    queryFn: async () => {
      const params = selectedCity.id ? `?cityId=${selectedCity.id}` : "";
      const res = await api.get(`/dashboard/summary${params}`);
      return res.data;
    },
    enabled: Boolean(selectedCity.id || isSuperAdmin),
  });

  if (!selectedCity.id && !isSuperAdmin) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Дашборд</h1>
          <p className="text-sm text-content-muted mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Оберіть місто</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
          <MapPin className="w-10 h-10 mx-auto mb-3 text-content-muted" />
          <p className="font-semibold text-slate-700 mb-2">Місто не обрано</p>
          <p className="text-sm text-slate-500 mb-4">
            Оберіть місто у розділі «Міста», щоб бачити активність
          </p>
          <Link
            to="/cities"
            className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Перейти до міст
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Шапка */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Дашборд
          {selectedCity.name && (
            <span className="ml-2 text-base font-normal text-blue-500">
              · {selectedCity.name}
            </span>
          )}
          {isSuperAdmin && !selectedCity.name && (
            <span className="ml-2 text-base font-normal text-purple-500">
              · Усі міста
            </span>
          )}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {new Date().toLocaleDateString("uk-UA", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {isLoading ? (
        <DashboardSkeleton isSuperAdmin={isSuperAdmin} />
      ) : summary ? (
        <div className="flex flex-col gap-6">
          {/* ── ЗОНА ДІЇ ── */}
          <Suspense fallback={<div className="h-24 bg-white rounded-2xl animate-pulse border border-slate-100" />}>
            <IssueCarousel />
          </Suspense>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Suspense fallback={<SkeletonCard />}>
              <TodayEvents events={summary.todayEvents} />
            </Suspense>
            <Suspense fallback={<SkeletonCard />}>
              <StaleSchools schools={summary.staleSchools} />
            </Suspense>
            <Suspense fallback={<SkeletonCard />}>
              <UpcomingEvents events={summary.upcomingEvents} />
            </Suspense>
          </div>

          <hr className="border-slate-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Suspense fallback={<SkeletonCard />}>
              <MonthlyKpi kpi={summary.monthlyKpi} />
            </Suspense>
            <Suspense fallback={<SkeletonCard />}>
              <FunnelBar funnel={summary.funnel} />
            </Suspense>
          </div>

          <div className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}>
            <Suspense fallback={<SkeletonCard className="min-h-[200px]" />}>
              <ActivityFeed items={summary.activityFeed} />
            </Suspense>
            {isSuperAdmin && summary.citiesStats.length > 0 && (
              <Suspense fallback={<SkeletonCard className="min-h-[200px]" />}>
                <CitiesTable rows={summary.citiesStats} />
              </Suspense>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400 text-sm">
          Не вдалося завантажити дані
        </div>
      )}
    </div>
  );
}