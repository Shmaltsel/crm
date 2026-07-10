import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { City } from "../../types";
import { CITY_ICONS, DEFAULT_CITY_ICON } from "../../constants/cityIcons";

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

const TABS = [
  { key: "ACTIVE" as const, label: "Активні" },
  { key: "ALL" as const, label: "Усі" },
  { key: "ARCHIVED" as const, label: "Архівні" },
];

export default function CityMobileList({
  cities,
  selectedCity,
  onSelectCity,
}: CityMobileListProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "ALL" | "ARCHIVED">("ACTIVE");

  const filteredCities = useMemo(() => {
    return cities.filter((c: City) => {
      const hasEvents = (c.plannedEvents || 0) + (c.completedEvents || 0) > 0;
      if (activeTab === "ACTIVE") return hasEvents;
      if (activeTab === "ARCHIVED") return !hasEvents;
      return true;
    });
  }, [cities, activeTab]);

  return (
    <div className="md:hidden flex flex-col gap-3 mb-24 mt-1">
      <div className="flex bg-surface-muted rounded-control p-0.5">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 text-sm font-medium rounded-control transition-all duration-fast active:scale-95 ${
              activeTab === tab.key
                ? "bg-surface shadow-soft text-content-primary"
                : "text-content-muted hover:text-content-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
        {filteredCities.map((city: City, index: number) => {
          const totalEvents = (city.plannedEvents || 0) + (city.completedEvents || 0);
          const isSelected = selectedCity?.id === city.id;

          return (
            <div
              key={city.id}
              className={`flex items-center p-3 border-b border-border transition-colors duration-fast active:bg-surface-muted active:scale-[0.98] transition-transform ${
                isSelected ? "bg-brand-50/30" : ""
              }`}
              onClick={() => onSelectCity({ id: city.id, name: city.name })}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 text-lg shrink-0 ${ICON_COLORS[index % ICON_COLORS.length]}`}
              >
                {CITY_ICONS[city.name] || DEFAULT_CITY_ICON}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-content-primary text-sm">
                  {city.name}
                </p>
                <p className="text-2xs text-content-muted mt-0.5">
                  {totalEvents} подій · {city.schoolsCount || 0} шкіл
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/cities/${city.id}`);
                }}
                className="p-2.5 text-content-muted hover:text-brand text-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-90"
              >
                ›
              </button>
            </div>
          );
        })}

        {filteredCities.length === 0 && (
          <div className="p-8 text-center text-content-muted font-medium text-sm">
            Міст не знайдено
          </div>
        )}
      </div>
    </div>
  );
}
