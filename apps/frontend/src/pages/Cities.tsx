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
            <CityMobileHeader selectedCity={selectedCity} cities={cities} />
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2">✕</button>
            </div>
            <form onSubmit={handleAddCity} className="p-6">
              <input
                type="text" value={newCityName} onChange={(e) => setNewCityName(e.target.value)}
                placeholder="Наприклад: Львів" className="w-full p-3 mb-6 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" autoFocus required
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                  Скасувати
                </button>
                <button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
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
