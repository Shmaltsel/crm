import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../ui/OptimizedImage";

const CITY_PHOTOS: Record<string, string> = {
  Львів:
    "https://gohotels.com.ua/images/stories/f08072159a443e07501f3df97987f8a3.jpg",
  Київ: "https://images.unsplash.com/photo-1630651814316-fe71f3c30279?w=600&q=80&auto=format",
  Харків:
    "https://images.unsplash.com/photo-1584646098378-0f87b72cffe1?w=600&q=80&auto=format",
  Одеса:
    "https://images.unsplash.com/photo-1585168050053-a4ba02e3f0d2?w=600&q=80&auto=format",
  Дніпро:
    "https://images.unsplash.com/photo-1570587953042-a65fd17e2f73?w=600&q=80&auto=format",
};
const DEFAULT_PHOTO =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format";

// ─── Одна картка міста ────────────────────────────────────────────────────────

function CityCard({
  city,
  index,
  isSelected,
  onSelect,
}: {
  city: any;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);

  // Паралакс: фото зміщується на 4px при русі миші над карткою
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    img.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = "scale(1) translate(0, 0)";
  }, []);

  return (
    <div
      // Stagger animation: кожна картка з'являється з затримкою index * 60ms
      style={{
        animationDelay: `${index * 60}ms`,
        animationFillMode: "both",
      }}
      className={`
        city-card-enter
        bg-white rounded-2xl shadow-sm border overflow-hidden group
        transition-[transform,box-shadow] duration-300 ease-out
        hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl
        ${
          isSelected
            ? "border-blue-500 ring-4 ring-blue-500/20 shadow-md"
            : "border-slate-100 hover:border-blue-200"
        }
      `}
    >
      {/* Фото з паралаксом і градієнтом Netflix-стилю */}
      <div
        className="h-44 overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={CITY_PHOTOS[city.name] || DEFAULT_PHOTO}
          alt={city.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_PHOTO;
          }}
        />

        {/* Темний градієнт знизу — назва міста чітко читається */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Назва міста поверх градієнта */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-white text-xl font-bold drop-shadow-sm leading-tight">
            {city.name}
          </h2>
        </div>

        {/* Чекмарк якщо місто обрано */}
        {isSelected && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Контент картки */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
            Активне
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
            {city.manager?.name?.charAt(0) ?? "?"}
          </div>
          <span>
            Менеджер:{" "}
            <span className="font-medium">{city.manager?.name ?? "—"}</span>
          </span>
        </div>

        <div className="space-y-2 text-sm border-t border-slate-50 pt-3">
          <div className="flex justify-between text-slate-500">
            <span>Заплановано подій:</span>
            <span className="font-semibold text-slate-800">
              {city.plannedEvents ?? 0}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
          <button
            onClick={onSelect}
            className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
              isSelected
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "bg-blue-600 hover:bg-blue-700 text-white"
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
}

// ─── Грід ────────────────────────────────────────────────────────────────────

export default function CityDesktopGrid({
  cities,
  selectedCity,
  onSelectCity,
}: any) {
  return (
    <>
      {/*
        Стиль анімації — вставляємо один раз через <style>.
        opacity: 0 → 1  +  translateY(16px) → 0
        Це stagger: кожна картка отримує animationDelay через inline style вище.
      */}
      <style>{`
        @keyframes cityCardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .city-card-enter {
          animation: cityCardIn 0.35s ease-out;
        }
      `}</style>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city: any, index: number) => (
          <CityCard
            key={city.id}
            city={city}
            index={index}
            isSelected={selectedCity?.id === city.id}
            onSelect={() => onSelectCity({ id: city.id, name: city.name })}
          />
        ))}
      </div>
    </>
  );
}
