import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../ui/OptimizedImage";

const CITY_PHOTOS: Record<string, string> = {
  Львів:
    "https://gohotels.com.ua/images/stories/f08072159a443e07501f3df97987f8a3.jpg",
  Київ: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Kiev_-_St_Sophia_Monument_and_St_Michael_Cathedral.jpg/600px-Kiev_-_St_Sophia_Monument_and_St_Michael_Cathedral.jpg",
  Харків:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Derzhprom_2010.jpg/600px-Derzhprom_2010.jpg",
  Одеса:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Odessa_Opera_Theater_%2825828456104%29.jpg/600px-Odessa_Opera_Theater_%2825828456104%29.jpg",
  Дніпро:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Dnipro_Skyline.jpg/600px-Dnipro_Skyline.jpg",
  Запоріжжя:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Zaporizhzhia_-_Dnipro_HES.jpg/600px-Zaporizhzhia_-_Dnipro_HES.jpg",
  "Івано-Франківськ":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Town_Hall%2C_Ivano-Frankivsk.jpg/600px-Town_Hall%2C_Ivano-Frankivsk.jpg",
  Чернівці:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Chernivtsi_University_1.jpg/600px-Chernivtsi_University_1.jpg",
  Тернопіль:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ternopil_pond_in_summer.jpg/600px-Ternopil_pond_in_summer.jpg",
  Ужгород:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Uzhhorod_Synagogue_2016.jpg/600px-Uzhhorod_Synagogue_2016.jpg",
  Миколаїв:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Mykolaiv_City_Hall.jpg/600px-Mykolaiv_City_Hall.jpg",
  Вінниця:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Vinnytsia_water_tower.jpg/600px-Vinnytsia_water_tower.jpg",
  Херсон:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Kherson_art_museum_2.jpg/600px-Kherson_art_museum_2.jpg",
  Полтава:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Krugla_ploscha_Poltava.jpg/600px-Krugla_ploscha_Poltava.jpg",
  Чернігів:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Katerynynska_church_Chernihiv.jpg/600px-Katerynynska_church_Chernihiv.jpg",
  Черкаси:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Cherkasy_White_Lotus.jpg/600px-Cherkasy_White_Lotus.jpg",
  Суми: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Sumy_Altanka.jpg/600px-Sumy_Altanka.jpg",
  Житомир:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Zhytomyr_Transfiguration_Cathedral.jpg/600px-Zhytomyr_Transfiguration_Cathedral.jpg",
  Хмельницький:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Khmelnytskyi_railway_station.jpg/600px-Khmelnytskyi_railway_station.jpg",
  Рівне:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Rivne_Drama_Theatre.jpg/600px-Rivne_Drama_Theatre.jpg",
  Кропивницький:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Kropyvnytskyi_theatre.jpg/600px-Kropyvnytskyi_theatre.jpg",
  Луцьк:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Lutsk_castle_tower.jpg/600px-Lutsk_castle_tower.jpg",
};
const DEFAULT_PHOTO =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format";

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
          <div className="check-enter absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
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
            className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all duration-200 ${
              isSelected
                ? "bg-blue-50 text-blue-700 border border-blue-200 scale-[0.98]"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 transition-all duration-200">
              {isSelected ? "✓ Обрано" : "Вибрати"}
            </span>
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

export default function CityDesktopGrid({
  cities,
  selectedCity,
  onSelectCity,
}: any) {
  return (
    <>
      {}
      <style>{`
        @keyframes cityCardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .city-card-enter {
          animation: cityCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes checkIn {
          from { opacity: 0; transform: scale(0.4) rotate(-20deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .check-enter {
          animation: checkIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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
