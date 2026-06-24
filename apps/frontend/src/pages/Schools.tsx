import { useState, useEffect, useRef, useMemo } from "react";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import StatsBar, {
  classifySchool,
  classifySize,
} from "../components/schools/StatsBar";

import VirtualSchoolList from "../components/VirtualSchoolList";
import { SchoolCard } from "../components/schools/SchoolMobileList";

import VirtualDesktopTable from "../components/schools/VirtualDesktopTable";
export const PIPELINE_STAGES = [
  { key: "BASE", name: "Новий заклад" },
  { key: "FIRST_CONTACT", name: "Знайомство" },
  { key: "DATE_CONFIRMED", name: "Підтвердження дати" },
  { key: "PREPARATION", name: "Оголошення" },
  { key: "IN_PROGRESS", name: "Підготовка" },
  { key: "DONE", name: "Проведення заходу" },
  { key: "REPORT", name: "Звіт" },
];

interface City {
  id: string;
  name: string;
}

export default function Schools() {
  const { selectedCity } = useSelectedCity();
  const [schools, setSchools] = useState<any[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    name: "",
    cityId: "",
    sourceUrl: "",
    director: "",
    phone: "",
  });
  const [matchedContacts, setMatchedContacts] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<
    { name: string; url: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSchools = async () => {
    try {
      const res = await api.get("/schools?minimal=true", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSchools(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await api.get("/cities", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCities(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSchools();
    fetchCities();
  }, []);

  const handleOpenModal = () => {
    setForm({
      name: "",
      cityId: selectedCity.id || cities[0]?.id || "",
      sourceUrl: "",
      director: "",
      phone: "",
    });
    setMatchedContacts([]);
    setIsModalOpen(true);
  };

  const fetchContacts = async (schoolName: string) => {
    if (!schoolName || schoolName.trim().length < 1)
      return setMatchedContacts([]);
    const currentCityName =
      selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
    if (currentCityName.toLowerCase() !== "львів")
      return setMatchedContacts([]);
    try {
      const res = await api.get(
        `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Школа`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setMatchedContacts(res.data);
      if (res.data.length > 0) {
        const director =
          res.data.find(
            (c: any) =>
              c.role?.includes("Директор") || c.role?.includes("Завідувач"),
          ) || res.data[0];
        setForm((f) => ({
          ...f,
          director: director.contactName,
          phone: director.phone,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNameChange = (value: string) => {
    setForm({ ...form, name: value });
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (value.length < 2) {
      setShowSuggestions(false);
      setIsSearching(false);
      setMatchedContacts([]);
      return;
    }
    setIsSearching(true);
    setShowSuggestions(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const [externalRes] = await Promise.all([
          api.get(`/schools/search?q=${value}&type=Школа`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetchContacts(value),
        ]);
        setSuggestions(externalRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  const handleSelectSuggestion = (name: string, url: string) => {
    setForm({ ...form, name, sourceUrl: url });
    setShowSuggestions(false);
    fetchContacts(name);
  };

  const handleAddSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.cityId) return;
    setIsSubmitting(true);
    try {
      await api.post(
        "/schools",
        { ...form, type: "Школа" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setIsModalOpen(false);
      fetchSchools();
    } catch (e) {
      alert("Не вдалося створити заклад");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSchool = async (
    e: React.MouseEvent,
    schoolId: string,
    schoolName: string,
  ) => {
    e.stopPropagation();
    if (
      !window.confirm(
        `Видалити школу "${schoolName}"? Це видалить також усі її події.`,
      )
    )
      return;
    try {
      await api.delete(`/schools/${schoolId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSchools(schools.filter((s) => s.id !== schoolId));
    } catch (e) {
      console.error(e);
    }
  };

  const baseFiltered = schools.filter((s) => {
    const isCityMatch = selectedCity.id ? s.cityId === selectedCity.id : true;
    const isFilterMatch = activeFilter
      ? classifySchool(s) === activeFilter
      : true;
    const isSizeMatch = sizeFilter
      ? classifySize(s, "Школа") === sizeFilter
      : true;
    return isCityMatch && s.type === "Школа" && isFilterMatch && isSizeMatch;
  });

  const filteredSchools = useMemo(() => {
    if (!searchQuery.trim()) return baseFiltered;
    const q = searchQuery.toLowerCase().trim();
    return baseFiltered.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.city?.name?.toLowerCase().includes(q) ||
        s.director?.toLowerCase().includes(q) ||
        s.address?.toLowerCase().includes(q),
    );
  }, [baseFiltered, searchQuery]);

  return (
    <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-slate-50 min-h-screen">
      {/* Шапка */}
      <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-800 leading-tight">
            Школи
            {selectedCity.id && (
              <span className="ml-2 text-sm font-normal text-blue-500">
                · {selectedCity.name}
              </span>
            )}
          </h1>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={async () => {
              if (!selectedCity.id) return alert("Спочатку оберіть місто");
              if (
                !window.confirm(
                  `Імпортувати всі школи з isuo.org для міста ${selectedCity.name}?`,
                )
              )
                return;
              try {
                const res = await api.post(
                  "/schools/bulk-import",
                  { cityId: selectedCity.id, type: "Школа" },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    timeout: 120000,
                  },
                );
                alert(
                  `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
                );
                fetchSchools();
              } catch (e) {
                alert("Помилка імпорту.");
              }
            }}
            className="md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
          >
            📥 Імпорт з isuo
          </button>
          <button
            onClick={handleOpenModal}
            className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Додати
          </button>
        </div>
      </div>

      <div className="shrink-0">
        <StatsBar
          schools={schools.filter(
            (s) =>
              (selectedCity.id ? s.cityId === selectedCity.id : true) &&
              s.type === "Школа",
          )}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sizeFilter={sizeFilter}
          onSizeFilterChange={setSizeFilter}
          schoolType="Школа"
        />
      </div>

      {/* Пошук */}
      <div className="relative shrink-0 mb-4 mt-2">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук за назвою, директором, адресою..."
          className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border-none sm:border sm:border-slate-200 rounded-2xl sm:rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Лічильник */}
      <p className="text-xs font-semibold text-slate-400 mb-4 shrink-0 uppercase tracking-wide px-1">
        {filteredSchools.length === baseFiltered.length
          ? `${baseFiltered.length} шкіл`
          : `${filteredSchools.length} з ${baseFiltered.length} шкіл`}
        {(activeFilter || sizeFilter) && (
          <button
            onClick={() => {
              setActiveFilter(null);
              setSizeFilter(null);
            }}
            className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
          >
            скинути фільтри
          </button>
        )}
      </p>

      {/* Компоненти списків */}
      {/* Віртуалізований список шкіл */}
      <div className="md:hidden flex-1 w-full overflow-hidden">
        <VirtualSchoolList
          schools={filteredSchools}
          itemHeight={110}
          renderItem={(school) => (
            <div className="pb-2.5">
              <SchoolCard
                school={school}
                onDelete={handleDeleteSchool}
                stages={PIPELINE_STAGES}
              />
            </div>
          )}
        />
      </div>

      {/* Десктоп: таблиця з віртуалізованим tbody */}
      <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0">
        <div className="overflow-y-auto flex-1">
          <VirtualDesktopTable
            schools={filteredSchools}
            searchQuery={searchQuery}
            onDelete={handleDeleteSchool}
            stages={PIPELINE_STAGES}
          />
        </div>
      </div>

      {/* Мобільна плаваюча кнопка FAB */}
      <button
        onClick={handleOpenModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
      >
        +
      </button>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold text-slate-800">Нова школа</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 -mr-2 leading-none text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleAddSchool}
              className="p-6 flex flex-col gap-4 overflow-y-auto"
            >
              <div className="relative">
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Назва школи
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  placeholder="Наприклад: Школа №1"
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {showSuggestions && (
                  <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
                    {isSearching ? (
                      <li className="px-4 py-3 text-sm text-slate-400 italic">
                        Пошук...
                      </li>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((s, i) => (
                        <li
                          key={i}
                          onMouseDown={() =>
                            handleSelectSuggestion(s.name, s.url)
                          }
                          className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer font-medium border-b border-slate-50 last:border-0"
                        >
                          {s.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-slate-400 italic">
                        Нічого не знайдено
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {!selectedCity.id && (
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Місто
                  </label>
                  <select
                    value={form.cityId}
                    onChange={(e) =>
                      setForm({ ...form, cityId: e.target.value })
                    }
                    required
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">— Оберіть місто —</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Контакт{" "}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    (автозаповнення)
                  </span>
                </label>
                {matchedContacts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {matchedContacts.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            director: c.contactName,
                            phone: c.phone,
                          }))
                        }
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                      >
                        {c.role ? `${c.role}: ` : ""}
                        {c.contactName}
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={form.director}
                  onChange={(e) =>
                    setForm({ ...form, director: e.target.value })
                  }
                  placeholder="Микола Петренко"
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Телефон
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0671234567"
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-5 py-3.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? "Збереження..." : "Створити"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
