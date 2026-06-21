import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../config/api";
// Фото для міст за назвою (Unsplash)
const CITY_PHOTOS: Record<string, string> = {
  Львів: "https://images.unsplash.com/photo-1555990793-da11153b2473?w=600&q=80",
  Київ: "https://images.unsplash.com/photo-1630651814316-fe71f3c30279?w=600&q=80",
  Харків:
    "https://images.unsplash.com/photo-1584646098378-0f87b72cffe1?w=600&q=80",
  Одеса:
    "https://images.unsplash.com/photo-1585168050053-a4ba02e3f0d2?w=600&q=80",
  Дніпро:
    "https://images.unsplash.com/photo-1570587953042-a65fd17e2f73?w=600&q=80",
  Запоріжжя:
    "https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&q=80",
  Вінниця:
    "https://images.unsplash.com/photo-1591389703635-e15a07b842d7?w=600&q=80",
  "Івано-Франківськ":
    "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?w=600&q=80",
  Тернопіль:
    "https://images.unsplash.com/photo-1564760290292-23341e4df6ec?w=600&q=80",
  Луцьк:
    "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80",
  Рівне: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
  Хмельницький:
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&q=80",
  Чернівці:
    "https://images.unsplash.com/photo-1562619371-b67725b6fde2?w=600&q=80",
  Ужгород:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
};

const DEFAULT_PHOTO =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80";

interface City {
  id: string;
  name: string;
  manager?: { name: string; phone: string } | null;
  plannedEvents?: number;
  completedEvents?: number;
}

export default function Cities() {
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCities = async () => {
    try {
      const response = await api.get("/cities");
      setCities(response.data);
    } catch (error) {
      console.error("Помилка при завантаженні міст:", error);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchCities();
    };
    void load();
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

  return (
    <div className="p-4 md:p-8 relative h-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Міста</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center justify-center w-full sm:w-auto"
        >
          <span className="mr-2">+</span> Додати місто
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <div
            key={city.id}
            onClick={() => navigate(`/cities/${city.id}`)}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer overflow-hidden group"
          >
            {/* Фото міста */}
            <div className="h-44 overflow-hidden relative">
              <img
                src={CITY_PHOTOS[city.name] || DEFAULT_PHOTO}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_PHOTO;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Контент картки */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {city.name}
                </h2>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                  Активне місто
                </span>
              </div>

              {/* Менеджер */}
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

              {/* Статистика */}
              <div className="space-y-2 text-sm border-t border-slate-50 pt-3">
                <div className="flex justify-between text-slate-500">
                  <span>Заплановано подій:</span>
                  <span className="font-semibold text-slate-800">
                    {city.plannedEvents ?? 0}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Проведено подій:</span>
                  <span className="font-semibold text-slate-800">
                    {city.completedEvents ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {cities.length === 0 && (
          <div className="col-span-full text-center py-10 text-slate-500">
            Міст ще немає. Натисни "+ Додати місто", щоб створити перше!
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden">
            <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
            <div className="p-5 sm:p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
            </div>
            <form onSubmit={handleAddCity} className="p-5 sm:p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Назва міста
                </label>
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
