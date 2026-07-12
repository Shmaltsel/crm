import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, modalContentVariants } from "../lib/motion";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { useToast } from "../components/ui/Toast";
import { useSearchParams, useLocation } from "react-router-dom";
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
import { Download, X } from "lucide-react";
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
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const userRole = user?.role ?? null;
  const qc = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [pendingImport, setPendingImport] = useState<{ cityId: string; type: "Школа" | "Садочок" } | null>(null);

  const institutionType = useMemo<InstitutionType>(() => {
    const fromUrl = searchParams.get("type");
    if (fromUrl === "kindergarten") return "kindergarten";
    if (fromUrl === "school") return "school";
    if (location.pathname.includes("kindergarten")) return "kindergarten";
    return "school";
  }, [searchParams, location.pathname]);

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
        setSearchParams({ type: tabId }, { replace: true });
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

  useEffect(() => {
    if (!isModalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsModalOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isModalOpen]);

  const addSchoolMutation = useMutation({
    mutationFn: (newSchool: NewSchoolPayload) =>
      api.post("/schools", newSchool),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      setIsModalOpen(false);
    },
    onError: () => toast("Не вдалося створити заклад", "error"),
  });

  const bulkImportMutation = useMutation({
    mutationFn: ({ cityId, type }: { cityId: string; type: "Школа" | "Садочок" }) =>
      api.post(
        "/schools/bulk-import",
        { cityId, type },
        { timeout: 120000 },
      ),
    onSuccess: (res) => {
      toast("Імпорт завершено: додано " + res.data.created + ", пропущено " + res.data.skipped, "success");
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
      qc.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: () => toast("Помилка імпорту", "error"),
  });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const baseFilters = useMemo(
    () => ({
      search: debouncedQuery || undefined,
      cityId: selectedCity.id || undefined,
      stage: (activeFilter as any) || undefined,
      size: (sizeFilter as any) || undefined,
    }),
    [debouncedQuery, selectedCity.id, activeFilter, sizeFilter],
  );

  const schoolFilters = useMemo(
    () => ({ ...baseFilters, type: "Школа" as const }),
    [baseFilters],
  );

  const kindergartenFilters = useMemo(
    () => ({ ...baseFilters, type: "Садочок" as const }),
    [baseFilters],
  );

  const {
    data: schoolPages,
    isLoading: isSchoolsLoading,
    fetchNextPage: fetchNextSchools,
    hasNextPage: hasNextSchools,
    isFetchingNextPage: isFetchingNextSchools,
  } = useSchools(schoolFilters);

  const {
    data: kindergartenPages,
    isLoading: isKindergartenLoading,
    fetchNextPage: fetchNextKindergartens,
    hasNextPage: hasNextKindergartens,
    isFetchingNextPage: isFetchingNextKindergartens,
  } = useSchools(kindergartenFilters);

  const { data: schoolStats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: "Школа" as const,
    stage: (activeFilter as any) || undefined,
  });

  const { data: kindergartenStats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: "Садочок" as const,
    stage: (activeFilter as any) || undefined,
  });

  const { data: cities = [] } = useCities();
  const { data: supportedCities = [] } = useSupportedCities();
  const deleteSchool = useDeleteSchool();
  const prefetchSchool = usePrefetchSchool();

  const schoolData = useMemo(() => ({
    filtered: schoolPages?.pages.flatMap((p) => p.data) ?? [],
    totalItems: schoolPages?.pages[0]?.meta.totalItems ?? 0,
  }), [schoolPages]);

  const kindergartenData = useMemo(() => ({
    filtered: kindergartenPages?.pages.flatMap((p) => p.data) ?? [],
    totalItems: kindergartenPages?.pages[0]?.meta.totalItems ?? 0,
  }), [kindergartenPages]);

  const handleLoadMoreSchools = useCallback(() => {
    if (hasNextSchools && !isFetchingNextSchools) fetchNextSchools();
  }, [hasNextSchools, isFetchingNextSchools, fetchNextSchools]);

  const handleLoadMoreKindergartens = useCallback(() => {
    if (hasNextKindergartens && !isFetchingNextKindergartens) fetchNextKindergartens();
  }, [hasNextKindergartens, isFetchingNextKindergartens, fetchNextKindergartens]);

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
    (e: React.MouseEvent, schoolId: string, schoolName: string) => {
      e.stopPropagation();
      if (userRole !== "SUPERADMIN") return;
      setDeleteTarget({ id: schoolId, name: schoolName });
    },
    [userRole],
  );

  const confirmDeleteSchool = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteSchool.mutateAsync(deleteTarget.id);
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, deleteSchool]);

  const confirmImport = () => {
    if (!pendingImport) return;
    setDotCount(3);
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
    }, 500);
    bulkImportMutation.mutate(pendingImport, {
      onSettled: () => clearInterval(dotInterval),
    });
    setPendingImport(null);
  };

  return (
    <div className="bg-gradient-subtle min-h-screen flex flex-col">
      <EstablishmentsTopNav
        activeTab={institutionType}
        onChange={handleTabChange}
      />

      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        initialSlide={ESTABLISHMENT_IDS.findIndex((t) => t === institutionType)}
        onSlideChange={handleSlideChange}
        speed={280}
        allowTouchMove={true}
        className="establishments-swiper"
      >
        {ESTABLISHMENT_IDS.map((id) => {
          const info = INSTITUTION_TYPES[id];
          const isSchool = id === "school";
          const data = isSchool ? schoolData : kindergartenData;
          const stats = isSchool ? schoolStats : kindergartenStats;
          const isLoading = isSchool ? isSchoolsLoading : isKindergartenLoading;
          const handleLoadMore = isSchool ? handleLoadMoreSchools : handleLoadMoreKindergartens;

          return (
            <SwiperSlide key={id}>
              <div className="p-4 md:p-8 max-w-[100vw] min-h-[calc(100dvh-5rem)] md:min-h-0 flex flex-col">
                {/* Шапка */}
                <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
                  <div className="min-w-0">
                    <h1 className="text-2xl font-bold tracking-tight text-content-primary leading-tight">
                      {info.label}
                      {selectedCity.id && (
                        <span className="ml-1 text-sm font-normal text-brand">
                          · {selectedCity.name}
                        </span>
                      )}
                    </h1>
                    <p className="text-sm text-content-muted mt-0.5">
                      {data.filtered.length} {info.countLabel} у місті
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {(userRole === "SUPERADMIN" || userRole === "MANAGER") && (
                      <button
                        onClick={() => {
                          if (!selectedCity.id) return toast("Спочатку оберіть місто", "error");
                          if (!supportedCities.includes(selectedCity.name))
                            return toast(
                              "Місто не підтримується для імпорту",
                              "error",
                            );
                          setPendingImport({ cityId: selectedCity.id, type: info.apiType });
                        }}
                        disabled={bulkImportMutation.isPending}
                        className="flex items-center gap-1.5 px-3 py-2 bg-success text-white rounded-control text-sm font-medium hover:bg-success-600 hover:shadow-lift hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 transition-all duration-200"
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
                      className="hidden md:flex items-center gap-1 px-4 py-2.5 bg-brand text-white rounded-control text-sm font-medium hover:bg-brand-hover hover:shadow-lift hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    >
                      + Додати
                    </button>
                  </div>
                </div>

                {/* StatsBar */}
                <div className="shrink-0">
                  <Suspense
                    fallback={
                      <div className="h-[72px] bg-surface rounded-card animate-pulse mb-4" />
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
                      schoolType={info.apiType}
                    />
                  </Suspense>
                </div>

                {/* Список */}
                <div className="flex-1 w-full min-h-0 mt-3">
                  <EstablishmentList
                    isLoading={isLoading}
                    filteredSchools={data.filtered}
                    totalItems={data.totalItems}
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
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Мобільна плаваюча кнопка FAB */}
      {!isModalOpen && (
        <button
          onClick={handleOpenModal}
          className="md:hidden fab"
          aria-label="Додати школу"
        >
          +
        </button>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div variants={backdropVariants} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 bg-neutral-900/40 md:backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div variants={modalContentVariants} initial="hidden" animate="visible" exit="exit" className="bg-surface rounded-modal shadow-modal w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-5 border-b border-border flex justify-between items-center bg-surface-muted shrink-0">
                <h3 className="text-xl font-bold text-content-primary">Нова школа</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-content-muted hover:text-content-secondary p-2 -mr-2 leading-none active:scale-90 transition-transform duration-fast"
                  aria-label="Закрити"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={handleAddSchool}
                className="p-6 flex flex-col gap-4 overflow-y-auto"
              >
                <div className="relative">
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
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
                    className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                  {showSuggestions && (
                    <ul className="absolute z-10 w-full bg-surface border border-border-strong rounded-control shadow-dropdown mt-1 max-h-48 overflow-y-auto overflow-hidden">
                      {isSearching ? (
                        <li className="px-4 py-3 text-sm text-content-muted italic">
                          Пошук...
                        </li>
                      ) : suggestions.length > 0 ? (
                        suggestions.map((s, i) => (
                          <li
                            key={i}
                            onMouseDown={() =>
                              handleSelectSuggestion(s.name, s.url)
                            }
                            className="px-4 py-3 text-sm hover:bg-brand-50 cursor-pointer font-medium border-b border-surface-muted last:border-0"
                          >
                            {s.name}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-3 text-sm text-content-muted italic">
                          Нічого не знайдено
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                {!selectedCity.id && (
                  <div>
                    <label className="block text-sm font-medium text-content-secondary mb-1.5">
                      Місто
                    </label>
                    <select
                      value={form.cityId}
                      onChange={(e) =>
                        setForm({ ...form, cityId: e.target.value })
                      }
                      required
                      className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 bg-surface"
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
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
                    Контакт{" "}
                    <span className="ml-1 text-xs font-normal text-content-muted">
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
                          className={`text-xs font-medium px-3 py-1.5 rounded-control border transition-colors ${form.director === c.contactName ? "bg-brand text-white border-brand shadow-sm" : "bg-surface text-content-secondary border-border-strong hover:bg-surface-muted"}`}
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
                    className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 mb-4"
                  />
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
                    Телефон
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0671234567"
                    className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-5 py-3.5 bg-surface-muted rounded-control text-sm font-bold text-content-secondary hover:bg-neutral-200 transition-colors"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    disabled={addSchoolMutation.isPending}
                    className="flex-1 px-5 py-3.5 bg-brand text-white rounded-control text-sm font-bold hover:bg-brand-hover disabled:opacity-50 transition-colors"
                  >
                    {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Видалити школу?"
        message={`Школа «${deleteTarget?.name ?? ''}» та усі її події будуть видалені назавжди.`}
        confirmLabel="Видалити"
        variant="danger"
        onConfirm={confirmDeleteSchool}
        onCancel={() => setDeleteTarget(null)}
      />
      <ConfirmDialog
        isOpen={!!pendingImport}
        title="Імпорт закладів?"
        message={`Імпортувати всі заклади з isuo.org для міста ${selectedCity.name}?`}
        confirmLabel="Імпортувати"
        variant="warning"
        onConfirm={confirmImport}
        onCancel={() => setPendingImport(null)}
      />
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
            className="w-5 h-5 text-content-muted"
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
          aria-label={searchPlaceholder}
          className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-surface border border-border rounded-2xl sm:rounded-control text-base font-medium text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand shadow-soft transition-all duration-200"
          enterKeyHint="search"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-4 flex items-center text-content-muted hover:text-content-secondary transition"
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
      <p className="text-xs font-semibold text-content-muted mb-4 shrink-0 uppercase tracking-wide px-1">
        {`${filteredSchools.length} з ${totalItems} ${countLabel}`}
        {(activeFilter || sizeFilter) && (
          <button
            onClick={onClearFilters}
            className="ml-3 text-brand hover:text-brand-hover lowercase active:scale-[0.97] transition-transform duration-fast"
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
              className="bg-surface rounded-card border border-border p-3.5 animate-pulse"
              style={{ opacity: 1 - i * 0.1 }}
            >
              <div className="h-4 bg-neutral-200 rounded-control w-3/4 mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-surface-muted rounded-control w-1/3" />
                <div className="h-3 bg-surface-muted rounded-control w-1/4" />
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
          <div className="hidden md:flex flex-col flex-1 bg-surface rounded-card shadow-card border border-border overflow-hidden min-h-0 min-w-0">
            <Suspense
              fallback={<div className="flex-1 animate-pulse bg-surface-muted" />}
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
