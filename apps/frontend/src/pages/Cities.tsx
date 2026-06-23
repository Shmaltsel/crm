Це чудова ідея. Компонентний підхід — це стандарт для React. Винесення логіки в окремі файли не тільки зробить `Cities.tsx` утричі коротшим і легшим для читання, але й **виправить баг із відображенням міст на ПК**.

Проблема виникала через те, що фільтр вкладок («Активні/Усі») застосовувався до загального масиву `filteredCities`, який рендерився і на мобільному, і на десктопі. Тепер ми розділимо стан: мобільний список матиме свої фільтри, а десктопна сітка завжди отримуватиме всі міста.

Створіть папку `src/components/cities/` та додайте туди три нові компоненти, а потім оновіть головний файл.

### 1. Мобільна шапка (Як на скріншоті)

Цей компонент відповідає за блок «Активна проблема» та «Поточне місто».
Створіть файл **`src/components/cities/CityMobileHeader.tsx`**:

```tsx
import { useNavigate } from "react-router-dom";

interface Props {
  selectedCity: any;
}

export default function CityMobileHeader({ selectedCity }: Props) {
  const navigate = useNavigate();

  return (
    <div className="md:hidden flex flex-col gap-4 mb-4">
      {/* Сповіщення про проблему */}
      <div className="bg-[#FFF4F4] border border-red-100 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 text-xl shadow-sm">
          🔔
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-sm">1 активна проблема</p>
          <p className="text-xs text-slate-600 truncate mt-0.5">Початкова приватна школа "Альфа"</p>
          <p className="text-[10px] text-slate-400 mt-1">27.06.2026</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 text-xl font-light">›</button>
      </div>

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
              <span className="text-blue-500 text-sm">📅</span> 4 події сьогодні
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">🏫</span> 28 шкіл
            </div>
            <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-2 rounded-xl">
              <span className="text-sm">⚠️</span> 1 проблема
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

```

---

### 2. Мобільний список міст

Цей компонент містить пошук, вкладки та компактний список. Він тримає свій локальний стан фільтрації, щоб не ламати десктоп.
Створіть файл **`src/components/cities/CityMobileList.tsx`**:

```tsx
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

```

---

### 3. Десктопна сітка

Рендерить усі міста картками. Жодних вкладок "Активні/Усі" — показує весь масив, як ви й хотіли для ПК.
Створіть файл **`src/components/cities/CityDesktopGrid.tsx`**:

```tsx
import { useNavigate } from "react-router-dom";

const CITY_PHOTOS: Record<string, string> = {
  Львів: "https://gohotels.com.ua/images/stories/f08072159a443e07501f3df97987f8a3.jpg",
  Київ: "https://images.unsplash.com/photo-1630651814316-fe71f3c30279?w=600&q=80&auto=format",
  Харків: "https://images.unsplash.com/photo-1584646098378-0f87b72cffe1?w=600&q=80&auto=format",
  Одеса: "https://images.unsplash.com/photo-1585168050053-a4ba02e3f0d2?w=600&q=80&auto=format",
  Дніпро: "https://images.unsplash.com/photo-1570587953042-a65fd17e2f73?w=600&q=80&auto=format",
};
const DEFAULT_PHOTO = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format";

export default function CityDesktopGrid({ cities, selectedCity, onSelectCity }: any) {
  const navigate = useNavigate();

  return (
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cities.map((city: any) => {
        const isSelected = selectedCity?.id === city.id;
        return (
          <div
            key={city.id}
            className={`bg-white rounded-2xl shadow-sm border transition-all overflow-hidden group ${
              isSelected ? "border-blue-500 ring-4 ring-blue-500/20 shadow-md" : "border-slate-100 hover:shadow-lg hover:border-blue-200"
            }`}
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={CITY_PHOTOS[city.name] || DEFAULT_PHOTO}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_PHOTO; }}
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
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{city.name}</h2>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">Активне</span>
              </div>
              <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
                  {city.manager?.name?.charAt(0) ?? "?"}
                </div>
                <span>Менеджер: <span className="font-medium">{city.manager?.name ?? "—"}</span></span>
              </div>
              <div className="space-y-2 text-sm border-t border-slate-50 pt-3">
                <div className="flex justify-between text-slate-500">
                  <span>Заплановано подій:</span>
                  <span className="font-semibold text-slate-800">{city.plannedEvents ?? 0}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
                <button
                  onClick={() => onSelectCity({ id: city.id, name: city.name })}
                  className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
                    isSelected ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isSelected ? "Обрано" : "✓ Вибрати"}
                </button>
                <button
                  onClick={() => navigate(`/cities/${city.id}`)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm rounded-lg transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

```

---

### 4. Оновлений `Cities.tsx` (Батьківський файл)

Тепер головний файл просто отримує дані і розкидає їх по компонентах. Він став надзвичайно коротким.
Замініть вміст **`src/pages/Cities.tsx`**:

```tsx
import { useState, useEffect } from "react";
import { useSelectedCity } from "../context/CityContext";
import { api } from "../config/api";
import IssueCarousel from "../components/IssueCarousel";
import CityMobileHeader from "../components/cities/CityMobileHeader";
import CityMobileList from "../components/cities/CityMobileList";
import CityDesktopGrid from "../components/cities/CityDesktopGrid";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

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

  useEffect(() => { fetchCities(); }, []);

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
      alert("Не вдалося створити місто");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Шапка для ПК */}
      <div className="hidden md:flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Міста</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center"
        >
          <span className="mr-2">+</span> Додати місто
        </button>
      </div>

      {isFetching ? (
        <div className="text-center text-slate-400 py-10">Завантаження міст...</div>
      ) : (
        <>
          {/* 1. Блок для Мобільних (Шапка + Список) */}
          <div className="md:hidden">
            <CityMobileHeader selectedCity={selectedCity} />
            <CityMobileList cities={cities} selectedCity={selectedCity} onSelectCity={setSelectedCity} />
          </div>

          {/* 2. Блок для Десктопів (Карусель + Сітка) */}
          <div className="hidden md:block">
            <IssueCarousel />
            <CityDesktopGrid cities={cities} selectedCity={selectedCity} onSelectCity={setSelectedCity} />
          </div>
        </>
      )}

      {/* Мобільна плаваюча кнопка FAB */}
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40"
      >
        +
      </button>

      {/* Модалка додавання (спільна) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleAddCity} className="p-6">
              <input
                type="text" value={newCityName} onChange={(e) => setNewCityName(e.target.value)}
                placeholder="Наприклад: Львів" className="w-full p-3 mb-4 border border-slate-200 rounded-xl" autoFocus required
              />
              <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium">
                {isLoading ? "Збереження..." : "Зберегти"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

```