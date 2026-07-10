import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import {
  useSchools,
  useSchoolStats,
  useDeleteSchool,
  usePrefetchSchool,
  useSupportedCities,
} from "../hooks/useApi";
import { useCities } from "../hooks/useCities";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import VirtualSchoolList from "../components/VirtualSchoolList";
import { SchoolCard } from "../components/schools/SchoolMobileList";
import type { SchoolContact } from "../types";
import { useAuth } from "../context/AuthContext";
import { Download } from "lucide-react";
import { PIPELINE_STAGES } from "../constants/pipelineStages";
import EstablishmentsTopNav from "../components/establishments/EstablishmentsTopNav";

const INSTITUTION_TYPES = {
  school: { apiType: "Школа" as const, label: "Школи", countLabel: "шкіл" },
  kindergarten: { apiType: "Садочок" as const, label: "Садочки", countLabel: "садочків" },
} as const;

type InstitutionType = keyof typeof INSTITUTION_TYPES;

const ESTABLISHMENT_IDS: InstitutionType[] = ["school", "kindergarten"];

interface NewSchoolPayload {
  name: string;
  cityId: string;
  sourceUrl: string;
  director: string;
  phone: string;
  type: string;
}

const StatsBar = lazy(() => import("../components/schools/StatsBar"));
const VirtualDesktopTable = lazy(
  () => import("../components/schools/VirtualDesktopTable"),
);
interface City {
  id: string;
  name: string;
}

export default function Schools() {
  const { selectedCity } = useSelectedCity();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const userRole = user?.role ?? null;
  const qc = useQueryClient();

  const institutionType = useMemo<InstitutionType>(() => {
    const fromUrl = searchParams.get("type");
    if (fromUrl === "kindergarten") return "kindergarten";
    if (fromUrl === "school") return "school";
    if (location.pathname.includes("kindergarten")) return "kindergarten";
    return "school";
  }, [searchParams, location.pathname]);

  const typeInfo = INSTITUTION_TYPES[institutionType];

  const swiperRef = useRef<any>(null);

  const handleTabChange = useCallback(
    (id: string) => {
      const idx = ESTABLISHMENT_IDS.findIndex((t) => t === id);
      if (idx !== -1 && swiperRef.current) {
        swiperRef.current.slideTo(idx);
      }
      setSearchParams({ type: id }, { replace: true });
    },
    [setSearchParams],
  );

  const handleSlideChange = useCallback(
    (swiper: any) => {
      const tabId = ESTABLISHMENT_IDS[swiper.activeIndex];
      if (tabId && tabId !== institutionType) {
        setSearchParams({ type: tab.id }, { replace: true });
      }
    },
    [institutionType, setSearchParams],
  );

  const [form, setForm] = useState({
    name: "",
    cityId: "",
    sourceUrl: "",
    director: "",
    phone: "",
  });
  const [matchedContacts, setMatchedContacts] = useState<SchoolContact[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; url: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dotCount, setDotCount] = useState(3);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addSchoolMutation = useMutation({
    mutationFn: (newSchool: NewSchoolPayload) =>
      api.post("/schools", newSchool),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      setIsModalOpen(false);
    },
    onError: () => alert("Не вдалося створити заклад"),
  });

  const bulkImportMutation = useMutation({
    mutationFn: (cityId: string) =>
      api.post(
        "/schools/bulk-import",
        { cityId, type: typeInfo.apiType },
        { timeout: 120000 },
      ),
    onSuccess: (res) => {
      alert(
        `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
      );
      qc.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: () => alert("Помилка імпорту."),
  });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const schoolFilters = useMemo(
    () => ({
      search: debouncedQuery || undefined,
      cityId: selectedCity.id || undefined,
      type: typeInfo.apiType,
      stage: (activeFilter as any) || undefined,
      size: (sizeFilter as any) || undefined,
    }),
    [debouncedQuery, selectedCity.id, activeFilter, sizeFilter, typeInfo],
  );

  const {
    data: schoolsPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSchools(schoolFilters);
  const { data: stats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: typeInfo.apiType,
    stage: (activeFilter as any) || undefined,
  });
  const { data: cities = [] } = useCities();
  const { data: supportedCities = [] } = useSupportedCities();
  const deleteSchool = useDeleteSchool();
  const prefetchSchool = usePrefetchSchool();

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const filteredSchools = useMemo(
    () => schoolsPages?.pages.flatMap((p) => p.data) ?? [],
    [schoolsPages],
  );
  const totalItems = schoolsPages?.pages[0]?.meta.totalItems ?? 0;

  const handleOpenModal = useCallback(() => {
    setForm({
      name: "",
      cityId: selectedCity.id || cities[0]?.id || "",
      sourceUrl: "",
      director: "",
      phone: "",
    });
    setMatchedContacts([]);
    setIsModalOpen(true);
  }, [selectedCity.id, cities]);

  const fetchContacts = async (schoolName: string) => {
    if (!schoolName || schoolName.trim().length < 1)
      return setMatchedContacts([]);
    const currentCityName =
      selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
    if (currentCityName.toLowerCase() !== "львів")
      return setMatchedContacts([]);
    try {
      const data = await qc.fetchQuery<SchoolContact[]>({
        queryKey: ["schoolContacts", schoolName, currentCityName],
        queryFn: async () => {
          const res = await api.get<SchoolContact[]>(
            `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Школа`,
          );
          return res.data;
        },
        staleTime: 1000 * 60 * 5,
      });

      setMatchedContacts(data);
      if (data.length > 0) {
        const director =
          data.find(
            (c: SchoolContact) =>
              c.role?.includes("Директор") || c.role?.includes("Завідувач"),
          ) || data[0];
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
        const [externalData] = await Promise.all([
          qc.fetchQuery({
            queryKey: ["schoolSearchExternal", value],
            queryFn: async () => {
              const res = await api.get(
                `/schools/search?q=${encodeURIComponent(value)}&type=Школа`,
              );
              return res.data;
            },
            staleTime: 1000 * 60 * 5,
          }),
          fetchContacts(value),
        ]);
        setSuggestions(externalData);
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

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.cityId) return;
    addSchoolMutation.mutate({ ...form, type: "Школа" });
  };

  const handleDeleteSchool = useCallback(
    async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
      e.stopPropagation();
      if (userRole !== "SUPERADMIN") return;
      if (
        !window.confirm(
          `Видалити школу "${schoolName}"? Це видалить також усі її події.`,
        )
      )
        return;
      await deleteSchool.mutateAsync(schoolId);
    },
    [deleteSchool, userRole],
  );

  return (
    <div className="bg-gradient-subtle min-h-screen flex flex-col">
      <EstablishmentsTopNav
        activeTab={institutionType}
        onChange={handleTabChange}
      />

      <div className="p-4 md:p-8 flex flex-col flex-1 max-w-[100vw]">
        {/* Шапка */}
        <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-content-primary leading-tight">
              {typeInfo.label}
              {selectedCity.id && (
                <span className="ml-1 text-sm font-normal text-brand">
                  · {selectedCity.name}
                </span>
              )}
            </h1>
            <p className="text-sm text-content-muted mt-0.5">
              {filteredSchools.length} {typeInfo.countLabel} у місті
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            {(userRole === "SUPERADMIN" || userRole === "MANAGER") && (
              <button
                onClick={() => {
                  if (!selectedCity.id) return alert("Спочатку оберіть місто");
                  if (!supportedCities.includes(selectedCity.name))
                    return alert(
                      `Місто "${selectedCity.name}" не підтримується для імпорту.`,
                    );
                  if (
                    !window.confirm(
                      `Імпортувати всі школи з isuo.org для міста ${selectedCity.name}?`,
                    )
                  )
                    return;

                  setDotCount(3);
                  const dotInterval = setInterval(() => {
                    setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
                  }, 500);

                  bulkImportMutation.mutate(selectedCity.id, {
                    onSettled: () => clearInterval(dotInterval),
                  });
                }}
                disabled={bulkImportMutation.isPending}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 hover:shadow-lift hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 transition-all duration-200"
              >
                {bulkImportMutation.isPending ? (
                  <span className="font-medium">
                    Імпортую{"·".repeat(dotCount)}
                  </span>
                ) : (
                  <><Download className="w-4 h-4" /> Імпорт з isuo</>
                )}
              </button>
            )}
            <button
              onClick={handleOpenModal}
              className="hidden md:flex items-center gap-1 px-4 py-2.5 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-hover hover:shadow-lift hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              + Додати
            </button>
          </div>
        </div>

        {/* StatsBar */}
        <div className="shrink-0">
          <Suspense
            fallback={
              <div className="h-[72px] bg-white rounded-2xl animate-pulse mb-4" />
            }
          >
            <StatsBar
              statusStats={
                stats?.statusStats ?? {
                  new: 0,
                  planned: 0,
                  inProgress: 0,
                  done: 0,
                }
              }
              sizeStats={stats?.sizeStats ?? { small: 0, medium: 0, large: 0 }}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              sizeFilter={sizeFilter}
              onSizeFilterChange={setSizeFilter}
              schoolType={typeInfo.apiType}
            />
          </Suspense>
        </div>

        {/* Swipeable списки */}
        <div className="flex-1 w-full min-h-0 mt-3">
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            initialSlide={ESTABLISHMENT_IDS.findIndex((t) => t === institutionType)}
            onSlideChange={handleSlideChange}
            speed={280}
            allowTouchMove={true}
            className="w-full h-full"
            style={{ willChange: "transform" }}
          >
            {ESTABLISHMENT_IDS.map((id) => {
              const info = INSTITUTION_TYPES[id];
              return (
                <SwiperSlide key={id} className="overflow-y-auto">
                  <EstablishmentList
                    isLoading={isLoading}
                    filteredSchools={filteredSchools}
                    totalItems={totalItems}
                    activeFilter={activeFilter}
                    sizeFilter={sizeFilter}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onClearFilters={() => {
                      setActiveFilter(null);
                      setSizeFilter(null);
                    }}
                    handleLoadMore={handleLoadMore}
                    prefetchSchool={prefetchSchool}
                    handleDeleteSchool={handleDeleteSchool}
                    searchPlaceholder={`Пошук за назвою ${id === "school" ? "школи" : "садочка"}...`}
                    countLabel={info.countLabel}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Мобільна плаваюча кнопка FAB */}
        <button
          onClick={handleOpenModal}
          className="md:hidden fixed right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
          style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
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
                  disabled={addSchoolMutation.isPending}
                  className="flex-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

function EstablishmentList({
  isLoading,
  filteredSchools,
  totalItems,
  activeFilter,
  sizeFilter,
  searchQuery,
  onSearchChange,
  onClearFilters,
  handleLoadMore,
  prefetchSchool,
  handleDeleteSchool,
  searchPlaceholder,
  countLabel,
}: {
  isLoading: boolean;
  filteredSchools: any[];
  totalItems: number;
  activeFilter: string | null;
  sizeFilter: string | null;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onClearFilters: () => void;
  handleLoadMore: () => void;
  prefetchSchool: (id: string) => void;
  handleDeleteSchool: (e: React.MouseEvent, id: string, name: string) => void;
  searchPlaceholder: string;
  countLabel: string;
}) {
  return (
    <div className="flex flex-col h-full">
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
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border border-border rounded-2xl sm:rounded-xl text-sm font-medium text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand shadow-soft transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
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
        {`${filteredSchools.length} з ${totalItems} ${countLabel}`}
        {(activeFilter || sizeFilter) && (
          <button
            onClick={onClearFilters}
            className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
          >
            скинути фільтри
          </button>
        )}
      </p>

      {/* Компоненти списків */}
      {isLoading ? (
        <div className="flex flex-col gap-2.5 flex-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-3.5 animate-pulse"
              style={{ opacity: 1 - i * 0.1 }}
            >
              <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
                <div className="h-3 bg-slate-100 rounded-lg w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Мобільний */}
          <div className="md:hidden flex-1 w-full overflow-hidden">
            <VirtualSchoolList
              schools={filteredSchools}
              itemHeight={110}
              onEndReached={handleLoadMore}
              animationKey={`${activeFilter}-${sizeFilter}`}
              renderItem={(school, index) => (
                <div
                  className="pb-2.5"
                  onMouseEnter={() => prefetchSchool(school.id)}
                >
                  <SchoolCard
                    school={school}
                    index={index}
                    onDelete={handleDeleteSchool}
                    stages={PIPELINE_STAGES}
                  />
                </div>
              )}
            />
          </div>

          {/* Десктоп */}
          <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0 min-w-0">
            <Suspense
              fallback={<div className="flex-1 animate-pulse bg-slate-50" />}
            >
              <VirtualDesktopTable
                schools={filteredSchools}
                searchQuery={searchQuery}
                onDelete={handleDeleteSchool}
                stages={PIPELINE_STAGES}
                onEndReached={handleLoadMore}
              />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
