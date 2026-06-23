import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedCity } from "../context/CityContext";
import IssueCarousel from "../components/IssueCarousel";
import { api } from "../config/api";

const CITY_PHOTOS: Record<string, string> = {
  Львів: "https://gohotels.com.ua/images/stories/f08072159a443e07501f3df97987f8a3.jpg",
  Київ: "https://images.unsplash.com/photo-1630651814316-fe71f3c30279?w=600&q=80&auto=format",
  Харків: "https://images.unsplash.com/photo-1584646098378-0f87b72cffe1?w=600&q=80&auto=format",
  Одеса: "https://images.unsplash.com/photo-1585168050053-a4ba02e3f0d2?w=600&q=80&auto=format",
  Дніпро: "https://images.unsplash.com/photo-1570587953042-a65fd17e2f73?w=600&q=80&auto=format",
  Запоріжжя: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&q=80&auto=format",
  Вінниця: "https://images.unsplash.com/photo-1591389703635-e15a07b842d7?w=600&q=80&auto=format",
  "Івано-Франківськ": "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?w=600&q=80&auto=format",
  Тернопіль: "https://images.unsplash.com/photo-1564760290292-23341e4df6ec?w=600&q=80&auto=format",
  Луцьк: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80&auto=format",
  Рівне: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80&auto=format",
  Хмельницький: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&q=80&auto=format",
  Чернівці: "https://images.unsplash.com/photo-1562619371-b67725b6fde2?w=600&q=80&auto=format",
  Ужгород: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format",
};

const DEFAULT_PHOTO = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format";

interface City {
  id: string;
  name: string;
  manager?: { name: string; phone: string } | null;
  plannedEvents?: number;
  completedEvents?: number;
}

const CitySkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-44 bg-slate-200/60 w-full"></div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start mb-1">
          <div className="h-7 bg-slate-200/60 rounded-md w-1/2"></div>
          <div className="h-6 bg-slate-200/60 rounded-full w-1/3"></div>
        </div>
        <div className="h-4 bg-slate-200/60 rounded-md w-2/3 mb-2"></div>
        <div className="w-full h-px bg-slate-50 mt-1 mb-1"></div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="h-3 bg-slate-200/60 rounded w-3/4 mb-2"></div>
            <div className="h-5 bg-slate-200/60 rounded w-1/4"></div>
          </div>
          <div>
            <div className="h-3 bg-slate-200/60 rounded w-3/4 mb-2"></div>
            <div className="h-5 bg-slate-200/60 rounded w-1/4"></div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
          <div className="h-9 bg-slate-200/60 rounded-lg flex-1"></div>
          <div className="h-9 w-10 bg-slate-200/60 rounded-lg shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

// Палітра кольорів для іконок мобільного списку
const ICON_COLORS = [
  "bg-purple-50 text-purple-600",
  "bg-amber-50 text-amber-600",
  "bg-teal-50 text-teal-600",
  "bg-rose-50 text-rose-600",
  "bg-sky-50 text-sky-600",
];

export default function Cities() {
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Стан для фільтрів (як на макеті)
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "ALL" | "ARCHIVED">("ACTIVE");
  const [searchQuery, setSearchQuery] = useState("");

  const { selectedCity, setSelectedCity } = useSelectedCity();

  const fetchCities = async () => {
    setIsFetching(true);
    try {
      const response = await api.get("/cities");
      setCities(response.data);
    } catch (error) {
      console.error("Помилка при завантаженні міст:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;
    setIsLoading(true);
    try {
      await api.post("/cities", { name: newCityName });
      setNewCityName("");
      setIsModalOpen(false);
      fetchCities();
    } catch (error) {
      console.error("Помилка при створенні міста:", error);
      alert("Не вдалося створити місто");
    } finally {
      setIsLoading(false);
    }
  };

  // Логіка фільтрації
  const filteredCities = useMemo(() => {
    return cities.filter(c => {
      // 1. Пошук
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // 2. Вкладки
      const hasEvents = (c.plannedEvents || 0) + (c.completedEvents || 0) > 0;
      if (activeTab === "ACTIVE") return hasEvents;
      if (activeTab === "ARCHIVED") return false; 
      return true; // "ALL"
    });
  }, [cities, searchQuery, activeTab]);

  return (
    <div className="p-4 md:p-8 relative h-full bg-slate-50 min-h-screen">
      {/* --- ШАПКА ДЛЯ ПК --- */}
      <div className="hidden md:flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Міста</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center justify-center w-full sm:w-auto"
        >
          <span className="mr-2">+</span> Додати місто
        </button>
      </div>

      <IssueCarousel />

      {/* --- МОБІЛЬНИЙ БЛОК: ПОТОЧНЕ МІСТО (як на скріні) --- */}
      {selectedCity?.id && (
        <div className="md:hidden mb-6 bg-white border border-blue-100 rounded-3xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-4 relative z-10">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Поточне місто</span>
            <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-emerald-100/50">
              ✓ Активне місто
            </span>
          </div>

          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-lg shadow-inner">📍</div>
              <h2 className="text-2xl font-bold text-slate-800">{selectedCity.name}</h2>
            </div>
            {/* Кнопка переходу в місто з блоку поточного міста */}
            <button 
              onClick={() => navigate(`/cities/${selectedCity.id}`)} 
              className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-blue-600 bg-white shadow-sm"
            >
              →
            </button>
          </div>

          <div className="flex gap-2 relative z-10 overflow-x-auto pb-1 scrollbar-hide">
            <div className="bg-white border border-slate-100 shadow-sm text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-blue-500">📅</span> 
              <span className="font-bold text-slate-800">{cities.find(c => c.id === selectedCity.id)?.plannedEvents || 0}</span> подій 
            </div>
          </div>
        </div>
      )}

      {/* --- МОБІЛЬНИЙ БЛОК: ПОШУК ТА ВКЛАДКИ --- */}
      <div className="md:hidden flex flex-col gap-4 mb-4">
        {/* Пошук */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Пошук міста..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-2xl py-3.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700 font-medium" 
            />
          </div>
          <button className="w-[50px] h-[50px] bg-white border border-slate-200 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
          </button>
        </div>

        {/* Вкладки */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['Активні', 'Усі', 'Архівні'].map(tab => {
            const isActive = (tab === 'Активні' && activeTab === 'ACTIVE') || (tab === 'Усі' && activeTab === 'ALL') || (tab === 'Архівні' && activeTab === 'ARCHIVED');
            return (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab === 'Активні' ? 'ACTIVE' : tab === 'Усі' ? 'ALL' : 'ARCHIVED')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${isActive ? 'bg-blue-50 border border-blue-100 text-blue-600' : 'bg-slate-100/80 text-slate-500 hover:bg-slate-200 border border-transparent'}`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      {/* --- МОБІЛЬНИЙ СПИСОК (Як на скріні) --- */}
      <div className="md:hidden flex flex-col bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden mb-24">
        {isFetching ? (
          <div className="p-8 text-center text-slate-400">Завантаження...</div>
        ) : filteredCities.length === 0 ? (
          <div className="p-8 text-center text-slate-400">Міст не знайдено</div>
        ) : (
          filteredCities.map((city, index) => {
            const isSelected = selectedCity?.id === city.id;
            const iconStyle = ICON_COLORS[index % ICON_COLORS.length];
            
            return (
              <div 
                key={city.id} 
                onClick={() => setSelectedCity({ id: city.id, name: city.name })}
                className={`flex items-center p-4 border-b border-slate-50 transition-colors ${isSelected ? 'bg-blue-50/30' : 'active:bg-slate-50'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shrink-0 ${iconStyle}`}>
                   🏛️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-base">{city.name}</p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    {city.plannedEvents || 0} подій <span className="mx-1">•</span> Менеджер: {city.manager?.name || "—"}
                  </p>
                </div>
                {/* Кнопка зі стрілочкою вправо */}
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    navigate(`/cities/${city.id}`); 
                  }} 
                  className="p-3 text-slate-400 hover:text-blue-600"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            )
          })
        )}
      </div>

      {/* --- МОБІЛЬНА КНОПКА ДОДАТИ (FAB) --- */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 transition-transform active:scale-95"
      >
        +
      </button>

      {/* --- СІТКА КАРТОК ДЛЯ ПК (Старий вигляд, який був) --- */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isFetching
          ? Array.from({ length: 6 }).map((_, index) => <CitySkeleton key={index} />)
          : filteredCities.map((city) => {
              const isSelected = selectedCity?.id === city.id;
              return (
                <div
                  key={city.id}
                  className={`bg-white rounded-2xl shadow-sm border transition-all overflow-hidden group ${
                    isSelected
                      ? "border-blue-500 ring-4 ring-blue-500/20 shadow-md"
                      : "border-slate-100 hover:shadow-lg hover:border-blue-200"
                  }`}
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={CITY_PHOTOS[city.name] || DEFAULT_PHOTO}
                      alt={city.name}
                      width="400"
                      height="176"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_PHOTO;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {isSelected && (
                      <div className="absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {city.name}
                      </h2>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                        Активне місто
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                        {city.manager?.name?.charAt(0) ?? "?"}
                      </div>
                      <span>
                        <span className="text-slate-400">Менеджер: </span>
                        <span className="font-medium">
                          {city.manager?.name ?? "—"}
                        </span>
                      </span>
                    </div>

                    <div className="space-y-2 text-sm border-t border-slate-50 pt-3">
                      <div className="flex justify-between text-slate-500">
                        <span>Заплановано подій:</span>
                        <span className="font-semibold text-slate-800">{city.plannedEvents ?? 0}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Проведено подій:</span>
                        <span className="font-semibold text-slate-800">{city.completedEvents ?? 0}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
                      <button
                        onClick={() => setSelectedCity({ id: city.id, name: city.name })}
                        className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
                          isSelected
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                      >
                        {isSelected ? "Обрано" : "✓ Вибрати місто"}
                      </button>
                      <button
                        onClick={() => navigate(`/cities/${city.id}`)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm rounded-lg transition-colors"
                        title="Детальніше"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {/* МОДАЛКА (Спільна) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden">
            <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
            <div className="p-5 sm:p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
            </div>
            <form onSubmit={handleAddCity} className="p-5 sm:p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Назва міста</label>
                <input
                  type="text"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  placeholder="Наприклад: Львів"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  autoFocus
                  required
                />
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-slate-600 font-medium hover:bg-slate-50 bg-slate-100 sm:bg-transparent rounded-xl transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 sm:py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Збереження..." : "Зберегти"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}