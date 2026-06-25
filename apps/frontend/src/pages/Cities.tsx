import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { useSelectedCity } from "../context/CityContext";
import { api } from "../config/api";

// --- ДИНАМІЧНІ ІМПОРТИ (Code Splitting) ---
const IssueCarousel = lazy(() => import("../components/IssueCarousel"));
const CityMobileHeader = lazy(
  () => import("../components/cities/CityMobileHeader"),
);
const CityMobileList = lazy(
  () => import("../components/cities/CityMobileList"),
);
const CityDesktopGrid = lazy(
  () => import("../components/cities/CityDesktopGrid"),
);

// Оптимізація 1: Скелетне завантаження (Skeleton Screen).
// Це повністю прибирає проблему CLS (зсув макета) і покращує LCP,
// оскільки користувач одразу бачить структуру сторінки, а не пустий екран.
const CitiesSkeleton = () => (
  <div className="w-full animate-pulse">
    {/* Мобільний скелетон */}
    <div className="md:hidden flex flex-col gap-4 mt-4">
      <div className="h-28 bg-slate-200 rounded-2xl w-full"></div>
      <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
      <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
    </div>
    {/* Десктопний скелетон */}
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 h-72 overflow-hidden"
        >
          <div className="h-44 bg-slate-200 w-full"></div>
          <div className="p-5 flex flex-col gap-3">
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mt-2"></div>
            <div className="h-10 bg-slate-200 rounded w-full mt-auto"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const { selectedCity, setSelectedCity } = useSelectedCity();

  // Оптимізація 2: AbortController для запобігання витоку пам'яті (Memory Leaks)
  useEffect(() => {
    const abortController = new AbortController();

    const fetchCities = async () => {
      setIsFetching(true);
      try {
        const response = await api.get("/cities", {
          signal: abortController.signal,
        });
        setCities(response.data);
      } catch (error: any) {
        if (error.name !== "CanceledError") {
          console.error("Помилка при завантаженні міст:", error);
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchCities();

    return () => {
      abortController.abort(); // Скасовуємо запит при розмонтуванні компонента
    };
  }, []);

  // Оптимізація 3: useCallback
  const handleSelectCity = useCallback(
    (city: any) => {
      setSelectedCity(city);
    },
    [setSelectedCity],
  );

  // Оптимізація 4: Оптимістичне оновлення UI (Optimistic UI Update)
  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;
    setIsLoading(true);

    try {
      const response = await api.post("/cities", { name: newCityName.trim() });
      setCities((prev) => [response.data, ...prev] as any);
      setNewCityName("");
      setIsModalOpen(false);
    } catch (error) {
      alert("Не вдалося створити місто. Можливо воно вже існує.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Оптимізація 5: content-visibility
    <div
      className="p-4 md:p-8 bg-slate-50 min-h-screen"
      style={{ contentVisibility: "auto" }}
    >
      {/* Шапка для ПК */}
      <style>{`
        @keyframes headerFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .header-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .header-btn-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
      `}</style>
      <div className="hidden md:flex justify-between items-center mb-8">
        <h1 className="header-enter text-3xl font-bold text-slate-800">Міста</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="header-btn-enter bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center transition-all duration-150"
        >
          <span className="mr-2">+</span> Додати місто
        </button>
      </div>

      {isFetching ? (
        <CitiesSkeleton />
      ) : (
        /* Оптимізація 6: Suspense обгортка для лінивих компонентів */
        <Suspense fallback={<CitiesSkeleton />}>
          {/* 1. Блок для Мобільних (Шапка + Список) */}
          <div className="md:hidden">
            <CityMobileHeader selectedCity={selectedCity} cities={cities} />
            <CityMobileList
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
            />
          </div>

          {/* 2. Блок для Десктопів (Карусель + Сітка) */}
          <div className="hidden md:block">
            <IssueCarousel />
            <CityDesktopGrid
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
            />
          </div>
        </Suspense>
      )}

      {/* Мобільна плаваюча кнопка FAB */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 active:scale-95 transition-transform opacity-0"
        style={{
          animation:
            "fabPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) 0.2s forwards",
        }}
        aria-label="Додати місто"
      >
        <style>{`
          @keyframes fabPop {
            from { opacity: 0; transform: scale(0.5) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
        +
      </button>

      {/* Модалка додавання */}
      {isModalOpen && createPortal(
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
          style={{ animation: "fadeIn 0.2s ease-out forwards" }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modalScale {
              from { opacity: 0; transform: scale(0.95) translateY(15px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

          {/* ТУТ БУЛА ПРОБЛЕМА: додано opacity-0 та style з анімацією modalScale */}
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
            style={{ animation: "modalScale 0.3s ease-out forwards" }}
          >
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddCity} className="p-6">
              <input
                type="text"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="Наприклад: Львів"
                className="w-full p-3 mb-6 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                autoFocus
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? "Збереження..." : "Зберегти"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
