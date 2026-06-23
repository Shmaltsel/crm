import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const ICON_COLORS = [
  "bg-purple-50 text-purple-600",
  "bg-amber-50 text-amber-600",
  "bg-teal-50 text-teal-600",
  "bg-rose-50 text-rose-600",
  "bg-sky-50 text-sky-600",
];

export default function CityMobileList({ cities, selectedCity, onSelectCity }: any) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "ALL" | "ARCHIVED">("ACTIVE");

  const filteredCities = useMemo(() => {
    return cities.filter((c: any) => {
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      const hasEvents = (c.plannedEvents || 0) + (c.completedEvents || 0) > 0;
      if (activeTab === "ACTIVE") return hasEvents;
      if (activeTab === "ARCHIVED") return false; 
      return true; 
    });
  }, [cities, searchQuery, activeTab]);

  return (
    <div className="md:hidden flex flex-col gap-4 mb-24">
      {/* Пошук */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input 
            type="text" 
            placeholder="Пошук міста..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 border-none rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-blue-500 font-medium" 
          />
        </div>
        <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-xl">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
        </button>
      </div>

      {/* Вкладки */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['Активні', 'Усі', 'Архівні'].map(tab => {
          const tabKey = tab === 'Активні' ? 'ACTIVE' : tab === 'Усі' ? 'ALL' : 'ARCHIVED';
          const isActive = activeTab === tabKey;
          return (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tabKey)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 ${isActive ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-100 text-slate-500'}`}
            >
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
              {tab}
            </button>
          )
        })}
      </div>

      {/* Список */}
      <div className="flex flex-col bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
        {filteredCities.map((city: any, index: number) => {
          const iconStyle = ICON_COLORS[index % ICON_COLORS.length];
          return (
            <div 
              key={city.id} 
              onClick={() => onSelectCity({ id: city.id, name: city.name })}
              className="flex items-center p-4 border-b border-slate-50 active:bg-slate-50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shrink-0 ${iconStyle}`}>
                🏛️
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-base">{city.name}</p>
                <p className="text-xs font-medium text-slate-400 mt-0.5">
                  {city.plannedEvents || 0} подій • {city.schoolsCount || 3} школи
                </p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); navigate(`/cities/${city.id}`); }} 
                className="p-3 text-slate-400 text-xl font-light"
              >
                ›
              </button>
            </div>
          )
        })}
        {filteredCities.length === 0 && <div className="p-8 text-center text-slate-400">Міст не знайдено</div>}
      </div>
    </div>
  );
}