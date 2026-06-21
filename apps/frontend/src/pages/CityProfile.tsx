import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CityAnalytics from '../components/city-profile/CityAnalytics.tsx';

import { api } from '../config/api';

type Tab = 'events' | 'crews' | 'analytics';

export default function CityProfile() {
  const { id } = useParams();
  const [city, setCity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('events');

  const fetchCity = async () => {
    try {
      const res = await api.get(`/cities/${id}`);
      setCity(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchCity(); }, [id]);

  if (isLoading) return <div className="p-8 text-slate-500">Завантаження...</div>;
  if (!city) return <div className="p-8 text-slate-500">Місто не знайдено</div>;

  const completedEvents: any[] = city.events || [];
  const crews: any[] = city.crews || [];
  const manager = city.manager;

  // Статистика з завершених подій
  const totalChildren = completedEvents.reduce((sum: number, ev: any) => sum + (ev.report?.childrenCount || ev.childrenPlanned || 0), 0);
  const totalRevenue = completedEvents.reduce((sum: number, ev: any) => sum + (ev.report?.totalSum || ev.price || 0), 0);
  const totalProfit = completedEvents.reduce((sum: number, ev: any) => sum + (ev.report?.remainderSum || 0), 0);

  const fmt = (n: number) => new Intl.NumberFormat('uk-UA').format(Math.round(n));

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: 'events', label: 'Події', icon: '📅' },
    { key: 'crews', label: 'Екіпажі', icon: '🚐' },
    { key: 'analytics', label: 'Аналітика', icon: '📊' },
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-500 mb-6">
        <Link to="/cities" className="hover:text-blue-600 transition-colors">Міста</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-800 font-medium">{city.name}</span>
      </div>

      {/* Шапка — менеджер + статистика */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Менеджер зліва */}
          <div className="flex items-center gap-4 min-w-[220px]">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {manager?.name?.charAt(0) ?? '?'}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Менеджер</p>
              <p className="font-bold text-slate-800">{manager?.name ?? '—'}</p>
              <p className="text-sm text-slate-500">{manager?.phone ?? '—'}</p>
            </div>
          </div>

          {/* Розділювач */}
          <div className="hidden md:block w-px h-16 bg-slate-100" />

          {/* Статистика */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-4 sm:gap-8 flex-1">
            <Stat label="Заплановано подій" value={city.schools?.length ?? 0} />
            <Stat label="Проведено подій" value={completedEvents.length} />
            <Stat label="Охоплено дітей" value={fmt(totalChildren)} />
            <Stat label="Виручка" value={`${fmt(totalRevenue)} грн`} />
            <Stat label="Прибуток" value={`${fmt(totalProfit)} грн`} />
          </div>
        </div>
      </div>

      {/* Вкладки */}
      <div className="grid grid-cols-3 sm:flex sm:w-fit gap-1 bg-white rounded-xl p-1 border border-slate-100 shadow-sm mb-6">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span> <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Контент вкладок */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Завершені події ({completedEvents.length})</h3>
          </div>
          {completedEvents.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">Завершених подій ще немає</p>
              <p className="text-sm mt-1">Вони з'являться тут після завершення пайплайну в профілі школи</p>
            </div>
          ) : (
            <>
              {/* Картки — мобільний вигляд */}
              <div className="md:hidden divide-y divide-slate-50">
                {completedEvents.map((ev: any) => (
                  <Link
                    key={ev.id}
                    to={`/events/${ev.id}/report`}
                    className="flex items-center justify-between gap-3 p-4 active:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-blue-600 truncate">{ev.school?.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {ev.project} · {new Date(ev.date).toLocaleDateString('uk-UA')}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        👶 {ev.report?.childrenCount || ev.childrenPlanned || '—'} дітей
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-slate-800 text-sm">{fmt(ev.report?.totalSum || ev.price || 0)} грн</p>
                      <p className="text-xs font-medium text-emerald-600 mt-0.5">+{fmt(ev.report?.remainderSum || 0)} грн</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Таблиця — десктоп */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                      <th className="p-4">Заклад</th>
                      <th className="p-4">Проєкт</th>
                      <th className="p-4">Дата</th>
                      <th className="p-4">Дітей</th>
                      <th className="p-4">Виручка</th>
                      <th className="p-4">Прибуток</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedEvents.map((ev: any) => (
                      <tr key={ev.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <Link to={`/events/${ev.id}/report`} className="font-medium text-blue-600 hover:underline">
                              {ev.school?.name}
                              </Link>
                          <p className="text-xs text-slate-400">{ev.school?.type}</p>
                        </td>
                        <td className="p-4 text-slate-700">{ev.project}</td>
                        <td className="p-4 text-slate-600">{new Date(ev.date).toLocaleDateString('uk-UA')}</td>
                        <td className="p-4 font-medium">{ev.report?.childrenCount || ev.childrenPlanned || '—'}</td>
                        <td className="p-4 font-medium text-slate-800">{fmt(ev.report?.totalSum || ev.price || 0)} грн</td>
                        <td className="p-4 font-medium text-emerald-600">{fmt(ev.report?.remainderSum || 0)} грн</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'crews' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Екіпажі ({crews.length})</h3>
          </div>
          {crews.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-4xl mb-3">🚐</p>
              <p className="font-medium">Екіпажів ще немає</p>
            </div>
          ) : (
            <>
              {/* Картки — мобільний вигляд */}
              <div className="md:hidden divide-y divide-slate-50">
                {crews.map((crew: any) => (
                  <div key={crew.id} className="p-4">
                    <p className="font-semibold text-slate-800">{crew.name}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                      <span>🎙️ <span className="text-blue-600 font-medium">{crew.host?.name || '—'}</span></span>
                      <span>🚗 <span className="text-emerald-600 font-medium">{crew.driver?.name || '—'}</span></span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-slate-500">
                      <span>{crew.car || '—'}</span>
                      <span>{crew.phone || '—'}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Таблиця — десктоп */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                      <th className="p-4">Назва</th>
                      <th className="p-4">Ведучий</th>
                      <th className="p-4">Водій</th>
                      <th className="p-4">Авто</th>
                      <th className="p-4">Телефон</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crews.map((crew: any) => (
                      <tr key={crew.id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="p-4 font-medium">{crew.name}</td>
                        <td className="p-4 text-blue-600">{crew.host?.name || '—'}</td>
                        <td className="p-4 text-emerald-600">{crew.driver?.name || '—'}</td>
                        <td className="p-4 text-slate-600">{crew.car || '—'}</td>
                        <td className="p-4 text-slate-600">{crew.phone || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <CityAnalytics events={completedEvents} />
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}