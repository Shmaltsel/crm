import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "../ui/OptimizedImage";

const CITY_PHOTOS: Record<string, string> = {
  Львів:
    "https://static4.depositphotos.com/1027798/376/i/450/depositphotos_3763579-stock-photo-lviv-lvov-ukraine.jpg",

  Київ: "https://st.depositphotos.com/58719516/51188/i/450/depositphotos_511888226-stock-photo-kyiv-central-square-buildings-landscape.jpg",

  Харків:
    "https://st.depositphotos.com/67336120/56801/i/950/depositphotos_568018044-stock-photo-kharkiv-ukraine-spring-2021-panoramic.jpg",

  Одеса:
    "https://st3.depositphotos.com/3644443/16721/i/450/depositphotos_167218870-stock-photo-aerial-view-opera-and-ballet.jpg",

  Дніпро:
    "https://st4.depositphotos.com/1005991/20622/i/450/depositphotos_206223052-stock-photo-dnepropetrovsk-beautiful-city-landscape-dnepr.jpg",

  Запоріжжя:
    "https://st4.depositphotos.com/2955305/41468/i/950/depositphotos_414689920-stock-photo-zaporozhye-ukraine-2020-theater-square.jpg",

  "Івано-Франківськ":
    "https://st3.depositphotos.com/7149852/15888/i/450/depositphotos_158883576-stock-photo-the-center-of-historic-european.jpg",

  Чернівці:
    "https://st3.depositphotos.com/6179956/16823/i/450/depositphotos_168238240-stock-photo-chernivtsi-ukraine-april-2017-residence.jpg",

  Тернопіль:
    "https://st.depositphotos.com/3651191/51255/i/450/depositphotos_512553730-stock-photo-colorful-autumn-view-flying-drone.jpg",

  Ужгород:
    "https://st2.depositphotos.com/2954445/42446/i/950/depositphotos_424466430-stock-photo-view-city-mountain-uzhhorod-castle.jpg",

  Миколаїв:
    "https://korabelov.info/wp-content/uploads/2023/02/752638-780x470.jpg.webp",

  Вінниця:
    "https://st5.depositphotos.com/10859846/83141/i/950/depositphotos_831410524-stock-photo-aerial-view-cremona-italy-highlighting.jpg",

  Херсон:
    "https://st2.depositphotos.com/28888872/48293/i/450/depositphotos_482930928-stock-photo-aerial-view-of-the-kherson.jpg",

  Полтава:
    "https://st4.depositphotos.com/8109164/38951/i/450/depositphotos_389510792-stock-photo-aerial-view-on-holy-dormition.jpg",

  Чернігів:
    "https://st2.depositphotos.com/1642129/6819/i/450/depositphotos_68194491-stock-photo-chernihivs-railway-station-is-looking.jpg",

  Черкаси:
    "https://st4.depositphotos.com/6259690/24892/i/450/depositphotos_248928436-stock-photo-scenic-cityscape-of-cherkasy-ukraine.jpg",

  Суми: "https://st3.depositphotos.com/29384342/33416/i/450/depositphotos_334165806-stock-photo-scenic-view-christmas-decorations.jpg",

  Житомир:
    "https://st4.depositphotos.com/1315434/22548/i/950/depositphotos_225486326-stock-photo-aerial-view-zhytomyr-city-ukraine.jpg",

  Хмельницький:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMF4ElBw0lBXcW--rvqPYk5ZTM7PXi-A6qxxw9UAwhmg&s=10",

  Рівне:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVEqOaKt-xPQssGp6LtVdqPkKmNMeK1BkDf9HwkF0_qw&s=10",

  Кропивницький:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTY417WfgkTzzu3LZ2o_3MOpWeP4D2ueot6GV80VQPA&s=10",

  Луцьк:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWzzd6fMVMUDsaUHZITW7-U8MS-FpM70v2DjBnoYRoQ&s=10",
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
