import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import StatsBar, { classifySchool } from "../components/schools/StatsBar";
import { useSchools, useDeleteSchool, useCities } from "../hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";

const PIPELINE_STAGES = [
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

export default function Kindergartens() {
  const { data: schools = [] } = useSchools();
  const { data: cities = [] } = useCities();
  const deleteSchool = useDeleteSchool();
  const qc = useQueryClient();

  const [userRole] = useState<string | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null")?.role ?? null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();
  const { selectedCity } = useSelectedCity();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cityId: "",
    sourceUrl: "",
    director: "",
    phone: "",
  });
  const [matchedContacts, setMatchedContacts] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<
    { name: string; url: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (!schoolName || schoolName.trim().length < 1) {
      setMatchedContacts([]);
      return;
    }
    const currentCityName =
      selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
    if (currentCityName.toLowerCase() !== "львів") {
      setMatchedContacts([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(
        `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=${encodeURIComponent("Садочок")}`,
        { headers: { Authorization: `Bearer ${token}` } },
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
      const token = localStorage.getItem("token");
      try {
        const [externalRes] = await Promise.all([
          api.get(
            `/schools/search?q=${value}&type=${encodeURIComponent("Садочок")}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          ),
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
      const token = localStorage.getItem("token");
      await api.post(
        "/schools",
        { ...form, type: "Садочок" },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setIsModalOpen(false);
      qc.invalidateQueries({ queryKey: ["schools"] });
    } catch (e) {
      console.error(e);
      alert("Не вдалося створити садочок");
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
    if (!window.confirm(`Видалити садочок "${schoolName}"?...`)) return;
    await deleteSchool.mutateAsync(schoolId);
  };

  const filteredKindergartens = schools.filter((s) => {
    const isCityMatch = selectedCity.id ? s.cityId === selectedCity.id : true;
    const isFilterMatch = activeFilter
      ? classifySchool(s) === activeFilter
      : true;
    return isCityMatch && s.type === "Садочок" && isFilterMatch;
  });

  return (
    <div className="p-4 md:p-8 h-full max-w-[100vw]">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h1 className="text-xl font-bold text-slate-800">
          Садочки
          {selectedCity.id && (
            <span className="ml-2 text-sm font-normal text-blue-500">
              · {selectedCity.name}
            </span>
          )}
        </h1>
        <div className="flex gap-2 shrink-0">
          {userRole === "SUPERADMIN" && (
            <button
              onClick={async () => {
                if (!selectedCity.id) return alert("Спочатку оберіть місто");
                if (
                  !window.confirm(
                    `Імпортувати всі садочки з isuo.org для міста ${selectedCity.name}?`,
                  )
                )
                  return;
                try {
                  const token = localStorage.getItem("token");
                  const res = await api.post(
                    "/schools/bulk-import",
                    { cityId: selectedCity.id, type: "Садочок" },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                      timeout: 120000,
                    },
                  );
                  alert(
                    `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
                  );
                  qc.invalidateQueries({ queryKey: ["schools"] });
                } catch (e) {
                  alert("Помилка імпорту.");
                }
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
            >
              📥 Імпорт з isuo
            </button>
          )}
          {userRole === "SUPERADMIN" && (
            <button
              onClick={handleOpenModal}
              className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              + Додати
            </button>
          )}
        </div>
      </div>

      <StatsBar
        schools={schools.filter(
          (s) =>
            (selectedCity.id ? s.cityId === selectedCity.id : true) &&
            s.type === "Садочок",
        )}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Мобільний вигляд */}
      <div className="md:hidden flex flex-col gap-2.5">
        {filteredKindergartens.map((school) => {
          const latestEvent = school.events?.[0];
          const stage = latestEvent
            ? PIPELINE_STAGES.find((s) => s.key === latestEvent.status)
            : null;

          // Остання активність
          const lastActivityDate =
            school.events?.[0]?.updatedAt ?? school.updatedAt ?? null;
          const daysStale = lastActivityDate
            ? Math.floor(
                (Date.now() - new Date(lastActivityDate).getTime()) / 86400000,
              )
            : null;

          const stalenessColor =
            daysStale === null
              ? "text-slate-400"
              : daysStale >= 21
                ? "text-red-500"
                : daysStale >= 14
                  ? "text-orange-500"
                  : daysStale >= 7
                    ? "text-amber-500"
                    : "text-emerald-500";

          return (
            <div
              key={school.id}
              onClick={() => navigate(`/schools/${school.id}`)}
              className="bg-white rounded-2xl border border-slate-100 p-3.5 active:scale-[0.99] transition-transform"
            >
              {/* Рядок 1: назва + видалити */}
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
                  {school.name}
                </p>
                {userRole === "SUPERADMIN" && (
                  <button
                    onClick={(e) =>
                      handleDeleteSchool(e, school.id, school.name)
                    }
                    className="text-slate-300 active:text-red-500 p-1 -mt-0.5 -mr-1 shrink-0"
                  >
                    🗑
                  </button>
                )}
              </div>

              {/* Рядок 2: директор (клікабельний телефон) + етап */}
              <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  {school.phone ? (
                    <a
                      href={`tel:${school.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs text-blue-600 font-medium truncate"
                    >
                      📞 {school.director || school.phone}
                    </a>
                  ) : school.director ? (
                    <span className="text-xs text-slate-500 truncate">
                      👤 {school.director}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-300 italic">
                      Контакт не вказано
                    </span>
                  )}
                </div>

                {stage ? (
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shrink-0 font-medium">
                    {stage.name}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-300 shrink-0">
                    Етап —
                  </span>
                )}
              </div>

              {/* Рядок 3: остання активність */}
              {daysStale !== null && (
                <p className={`text-[11px] mt-1.5 ${stalenessColor}`}>
                  ⏱{" "}
                  {daysStale === 0
                    ? "Активність сьогодні"
                    : `Остання активність ${daysStale} дн тому`}
                </p>
              )}
            </div>
          );
        })}

        {filteredKindergartens.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 text-center py-10 text-slate-400 text-sm">
            Садочків ще немає
          </div>
        )}

        {/* FAB */}
        {userRole === "SUPERADMIN" && (
          <button
            onClick={handleOpenModal}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
          >
            +
          </button>
        )}
      </div>

      {/* Десктоп таблиця */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 font-medium text-slate-600">Назва садочку</th>
              <th className="p-4 font-medium text-slate-600">Місто</th>
              <th className="p-4 font-medium text-slate-600">Статус</th>
              <th className="p-4 font-medium text-slate-600">Поточний етап</th>
              <th className="p-4 font-medium text-slate-600 text-center">
                Дія
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredKindergartens.map((school) => {
              const latestEvent = school.events?.[0];
              const stage = latestEvent
                ? PIPELINE_STAGES.find((s) => s.key === latestEvent.status)
                : null;
              return (
                <tr
                  key={school.id}
                  onClick={() => navigate(`/schools/${school.id}`)}
                  className="cursor-pointer border-b border-slate-50 hover:bg-slate-50/50 transition"
                >
                  <td className="p-4 text-slate-800 font-medium">
                    {school.name}
                  </td>
                  <td className="p-4 text-slate-600">{school.city?.name}</td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">
                      Активний
                    </span>
                  </td>
                  <td className="p-4">
                    {stage ? (
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
                        {stage.name}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs italic">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {userRole === "SUPERADMIN" && (
                      <button
                        onClick={(e) =>
                          handleDeleteSchool(e, school.id, school.name)
                        }
                        className="text-slate-400 hover:text-red-500 transition-colors p-2"
                      >
                        🗑
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Модалка */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md max-h-[92vh] overflow-hidden flex flex-col">
            <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
            <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold text-slate-800">
                Новий садочок
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 -mr-2"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleAddSchool}
              className="p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto"
            >
              <div className="relative">
                <label className="block text-sm text-slate-600 mb-1">
                  Назва садочку
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  required
                  placeholder="Наприклад: Садочок №1"
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                />
                {showSuggestions && (
                  <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                    {isSearching ? (
                      <li className="px-3 py-2 text-sm text-slate-400 italic">
                        Пошук за збігами...
                      </li>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((s, i) => (
                        <li
                          key={i}
                          onMouseDown={() =>
                            handleSelectSuggestion(s.name, s.url)
                          }
                          className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                        >
                          {s.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-sm text-slate-400 italic">
                        Нічого не знайдено
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {!selectedCity.id && (
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    Місто
                  </label>
                  <select
                    value={form.cityId}
                    onChange={(e) =>
                      setForm({ ...form, cityId: e.target.value })
                    }
                    required
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white"
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
                <label className="block text-sm text-slate-600 mb-1">
                  Контакт{" "}
                  <span className="ml-1 text-xs text-slate-400">
                    (автозаповнення)
                  </span>
                </label>
                {matchedContacts.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
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
                        className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                          form.director === c.contactName
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                        }`}
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
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  Телефон{" "}
                  <span className="ml-1 text-xs text-slate-400">
                    (автозаповнення)
                  </span>
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0671234567"
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-2 pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 rounded-xl sm:rounded-lg text-sm font-medium hover:bg-slate-200"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-blue-600 text-white rounded-xl sm:rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
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
