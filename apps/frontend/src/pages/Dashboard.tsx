import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../config/api';
import { useSelectedCity } from '../context/CityContext';
import IssueCarousel from '../components/IssueCarousel';
import FunnelBar from '../components/dashboard/FunnelBar';
import TodayEvents from '../components/dashboard/TodayEvents';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import StaleSchools from '../components/dashboard/StaleSchools';
import MonthlyKpi from '../components/dashboard/MonthlyKpi';

interface DashboardSummary {
  todayEvents:  any[];
  upcomingEvents: any[];
  funnel:       Record<string, number>;
  totalSchools: number;
  monthlyKpi: {
    revenue:  number;
    profit:   number;
    children: number;
    count:    number;
  };
  staleSchools: {
    id:           string;
    name:         string;
    status:       string | null;
    lastActivity: string | null;
    daysStale:    number | null;
  }[];
}

export default function Dashboard() {
  const { selectedCity } = useSelectedCity();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedCity.id) return;

    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const params = selectedCity.id ? `?cityId=${selectedCity.id}` : '';
        const res = await api.get(`/dashboard/summary${params}`);
        setSummary(res.data);
      } catch (e) {
        console.error('Помилка завантаження дашборду:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [selectedCity.id]);

  if (!selectedCity.id) {
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
          <span className="ml-2 text-base font-normal text-blue-500">
            · {selectedCity.name}
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {new Date().toLocaleDateString('uk-UA', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
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

          {/* Воронка */}
          <FunnelBar funnel={summary.funnel} />

          {/* Сьогодні + Найближчі */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TodayEvents events={summary.todayEvents} />
            <UpcomingEvents events={summary.upcomingEvents} />
          </div>

          {/* Потребують уваги + Фінанси */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StaleSchools schools={summary.staleSchools} />
            <MonthlyKpi kpi={summary.monthlyKpi} />
          </div>

          {/* Проблеми та звернення */}
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
              Проблеми та звернення
            </p>
            <IssueCarousel />
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