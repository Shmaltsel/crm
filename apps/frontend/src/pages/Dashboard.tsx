import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function Dashboard() {
  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isSuperAdmin = user?.role === "SUPERADMIN";

  useEffect(() => {
    // Суперадмін бачить дашборд без вибору міста
    if (!selectedCity.id && !isSuperAdmin) return;

    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const params = selectedCity.id ? `?cityId=${selectedCity.id}` : "";
        const res = await api.get(`/dashboard/summary${params}`);
        setSummary(res.data);
      } catch (e) {
        console.error("Помилка завантаження дашборду:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [selectedCity.id, isSuperAdmin]);

  // Тільки не-суперадміни бачать заглушку "оберіть місто"
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
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-3" />
          <p className="text-sm">Завантаження...</p>
        </div>
      ) : summary ? (
        <div className="flex flex-col gap-6">
          {/* ── ЗОНА ДІЇ ── */}
          {/* 3. Проблеми та звернення */}
          <div>
            <IssueCarousel />
          </div>

          {/* 1. Сьогодні + Найближчі події */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TodayEvents events={summary.todayEvents} />

             {/* 2. Потребують уваги */}
          <StaleSchools schools={summary.staleSchools} />
          
            <UpcomingEvents events={summary.upcomingEvents} />
          </div>

         

          

          {/* ── РОЗДІЛЮВАЧ ── */}
          <hr className="border-slate-200" />

          {/* ── АНАЛІТИКА ── */}

          {/* 4. KPI місяця + Воронка */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MonthlyKpi kpi={summary.monthlyKpi} />
            <FunnelBar funnel={summary.funnel} />
          </div>

          {/* 5. Активність команди + Стан по містах (superadmin) */}
          <div
            className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}
          >
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
