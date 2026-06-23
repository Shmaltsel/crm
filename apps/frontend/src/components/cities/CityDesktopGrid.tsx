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
