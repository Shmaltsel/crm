import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/api";

interface Props {
  selectedCity: any;
  cities: any[]; // Передаємо всі міста для статистики
}

const STATUS_STYLES: Record<string, string> = {
  'Планується': 'bg-amber-50 text-amber-700 border-amber-200',
  'Виконується': 'bg-blue-50 text-blue-700 border-blue-200',
  'Виконано': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export default function CityMobileHeader({ selectedCity, cities }: Props) {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!selectedCity?.id) {
      setIssues([]);
      return;
    }
    api.get(`/issues?cityId=${selectedCity.id}`).then((res) => {
      setIssues(res.data.filter((i: any) => i.status !== "Виконано"));
    }).catch(console.error);
  }, [selectedCity?.id]);

  const currentCityData = cities?.find((c: any) => c.id === selectedCity?.id);
  const totalEvents = (currentCityData?.plannedEvents || 0) + (currentCityData?.completedEvents || 0);
  const schoolsCount = currentCityData?.schoolsCount || 0;

  return (
    <div className="md:hidden flex flex-col gap-4 mb-4">
      {/* Сповіщення про проблему з розгортанням */}
      {issues.length > 0 && (
        <div className="bg-[#FFF4F4] border border-red-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm transition-all">
          <div 
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 text-xl shadow-sm">
              🔔
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm">
                {issues.length} активн{issues.length === 1 ? 'а проблема' : issues.length < 5 ? 'і проблеми' : 'их проблем'}
              </p>
              {!isExpanded && (
                <p className="text-xs text-slate-600 truncate mt-0.5">{issues[0]?.schoolName}</p>
              )}
            </div>
            <button 
              className="text-slate-400 hover:text-slate-600 text-2xl font-light transition-transform duration-300"
              style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              ›
            </button>
          </div>

          {/* Розгорнутий список проблем */}
          {isExpanded && (
            <div className="flex flex-col gap-3 mt-2 border-t border-red-100/50 pt-3">
              {issues.map(issue => (
                <div key={issue.id} className="bg-white rounded-xl p-3 border border-red-50 shadow-sm relative">
                  <p className="text-xs text-slate-400 mb-1">{new Date(issue.createdAt).toLocaleDateString('uk-UA')}</p>
                  <p className="font-bold text-slate-800 text-sm">{issue.schoolName}</p>
                  <p className="text-xs text-slate-500 mb-2">{issue.eventName}</p>
                  <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-2 italic mb-2">"{issue.message}"</p>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${STATUS_STYLES[issue.status] || STATUS_STYLES['Планується']}`}>
                    {issue.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Поточне місто */}
      {selectedCity?.id && (
        <div className="bg-white border border-blue-50 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Поточне місто</span>
            <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
              ✓ Активне місто
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full text-lg">📍</div>
            <h2 className="text-2xl font-bold text-slate-800">{selectedCity.name}</h2>
          </div>

          <div className="flex items-center justify-between text-xs font-medium gap-2">
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">📅</span> {totalEvents} подій
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">🏫</span> {schoolsCount} шкіл
            </div>
            <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-2 rounded-xl">
              <span className="text-sm">⚠️</span> {issues.length} проблем
            </div>
            <button 
              onClick={() => navigate(`/cities/${selectedCity.id}`)} 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm shrink-0"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}