import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../hooks/useAuth";
import IssueCarousel from "../components/IssueCarousel";
import FunnelBar from "../components/dashboard/FunnelBar";
import TodayEvents from "../components/dashboard/TodayEvents";
import UpcomingEvents from "../components/dashboard/UpcomingEvents";
import StaleSchools from "../components/dashboard/StaleSchools";
import MonthlyKpi from "../components/dashboard/MonthlyKpi";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import CitiesTable from "../components/dashboard/CitiesTable";

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

// ── Skeleton компоненти ──────────────────────────────────────────────────────

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

// ── Dashboard ────────────────────────────────────────────────────────────────

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
          <p className="text-sm text-slate-500 mt-1">📍 Оберіть місто</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
          <p className="text-4xl mb-3">📍</p>
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
          <div>
            <IssueCarousel />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TodayEvents events={summary.todayEvents} />
            <StaleSchools schools={summary.staleSchools} />
            <UpcomingEvents events={summary.upcomingEvents} />
          </div>

          <hr className="border-slate-200" />

          {/* ── АНАЛІТИКА ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MonthlyKpi kpi={summary.monthlyKpi} />
            <FunnelBar funnel={summary.funnel} />
          </div>

          <div className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}>
            <ActivityFeed items={summary.activityFeed} />
            {isSuperAdmin && summary.citiesStats.length > 0 && (
              <CitiesTable rows={summary.citiesStats} />
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