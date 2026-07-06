import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { City } from "../../types";

const CITY_ICONS: Record<string, string> = {
  Львів: "🦁",
  Київ: "🏰",
  Харків: "⚙️",
  Одеса: "⚓",
  Дніпро: "🌊",
  Запоріжжя: "⚡",
  "Івано-Франківськ": "⛰️",
  Чернівці: "🏛️",
  Тернопіль: "⛵",
  Ужгород: "🌸",
  Миколаїв: "🚢",
  Вінниця: "⛲",
  Херсон: "🍉",
  Полтава: "🥟",
  Чернігів: "⛪",
  Черкаси: "🌳",
  Суми: "🎪",
  Житомир: "🚀",
  Хмельницький: "🛍️",
  Рівне: "💎",
  Кропивницький: "🎭",
  Луцьк: "🏰",
};
const DEFAULT_CITY_ICON = "🏙️";

const ICON_COLORS = [
  "bg-purple-50",
  "bg-amber-50",
  "bg-teal-50",
  "bg-rose-50",
  "bg-sky-50",
];

interface CityMobileListProps {
  cities: City[];
  selectedCity: City | null;
  onSelectCity: (city: { id: string; name: string }) => void;
}

export default function CityMobileList({
  cities,
  selectedCity,
  onSelectCity,
}: CityMobileListProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "ALL" | "ARCHIVED">(
    "ACTIVE",
  );

  const [tabKey, setTabKey] = useState(0);

  const filteredCities = useMemo(() => {
    return cities.filter((c: City) => {
      const hasEvents = (c.plannedEvents || 0) + (c.completedEvents || 0) > 0;
      if (activeTab === "ACTIVE") return hasEvents;
      if (activeTab === "ARCHIVED") return !hasEvents;
      return true;
    });
  }, [cities, activeTab]);

  return (
    <>
      {/* Stagger анімація для мобільних рядків */}
      <style>{`
        @keyframes cityRowIn {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .city-row-enter {
          animation: cityRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: both;
        }
        @keyframes tabSlideIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
        .dot-pop {
          animation: dotPop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <div className="md:hidden flex flex-col gap-4 mb-24">
        {/* Вкладки */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-1">
          {["Активні", "Усі", "Архівні"].map((tab) => {
            const tabKey =
              tab === "Активні" ? "ACTIVE" : tab === "Усі" ? "ALL" : "ARCHIVED";
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tabKey as typeof activeTab);
                  setTabKey((k) => k + 1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {isActive && (
                  <span className="dot-pop w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Список */}
        <div
          key={tabKey}
          className="flex flex-col bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden"
        >
          {filteredCities.map((city: City, index: number) => {
            const iconStyle = ICON_COLORS[index % ICON_COLORS.length];
            const totalEvents =
              (city.plannedEvents || 0) + (city.completedEvents || 0);
            const isSelected = selectedCity?.id === city.id;

            return (
              <div
                key={city.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`
                  city-row-enter
                  flex items-center p-4 border-b border-slate-50
                  transition-[background-color,transform] duration-150
                  active:scale-[0.99] active:bg-slate-50
                  ${isSelected ? "bg-blue-50/30" : ""}
                `}
                onClick={() => onSelectCity({ id: city.id, name: city.name })}
              >
                {/* Іконка */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shrink-0 ${ICON_COLORS[index % ICON_COLORS.length]}`}
                >
                  {CITY_ICONS[city.name] || DEFAULT_CITY_ICON}
                </div>

                {/* Текст */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-base">
                    {city.name}
                  </p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    {totalEvents} подій • {city.schoolsCount || 0} шкіл
                  </p>
                </div>

                {/* Стрілка переходу */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cities/${city.id}`);
                  }}
                  className="p-3 text-slate-400 hover:text-blue-600 text-2xl font-light leading-none transition-colors"
                >
                  ›
                </button>
              </div>
            );
          })}

          {filteredCities.length === 0 && (
            <div className="p-8 text-center text-slate-400 font-medium">
              Міст не знайдено
            </div>
          )}
        </div>
      </div>
    </>
  );
}
