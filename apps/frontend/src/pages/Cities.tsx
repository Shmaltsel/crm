import React, { useState, useCallback, lazy } from "react";
import { createPortal } from "react-dom";
import { useSelectedCity } from "../context/CityContext";
import { useAddCity, useSupportedCities } from "../hooks/useApi";
import { useCities, useDeleteCity } from "../hooks/useCities";
import { useAuth } from "../context/AuthContext";
import { Modal } from "../components/ui/Modal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";

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

const CitiesSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="md:hidden flex flex-col gap-3 mt-4">
      <div className="h-24 bg-neutral-100 rounded-card w-full" />
      <div className="h-14 bg-neutral-100 rounded-card w-full" />
      <div className="h-14 bg-neutral-100 rounded-card w-full" />
    </div>
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-surface rounded-card shadow-card border border-border h-72 overflow-hidden">
          <div className="h-44 bg-neutral-100 w-full" />
          <div className="p-5 flex flex-col gap-3">
            <div className="h-6 bg-neutral-100 rounded w-1/2" />
            <div className="h-4 bg-neutral-100 rounded w-3/4 mt-2" />
            <div className="h-10 bg-neutral-100 rounded w-full mt-auto" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Cities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [cityError, setCityError] = useState("");

  const { selectedCity, setSelectedCity } = useSelectedCity();
  const { data: cities = [], isLoading } = useCities();
  const { data: supportedCities = [] } = useSupportedCities();
  const addCity = useAddCity();
  const deleteCity = useDeleteCity();
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);

  const handleSelectCity = useCallback(
    (city: { id: string; name: string }) => {
      setSelectedCity(city);
    },
    [setSelectedCity],
  );
  const { user } = useAuth();
  const userRole = user?.role ?? null;

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCityName.trim();
    if (!trimmed) return;

    const isSupported = supportedCities.some(
      (c) => c.toLowerCase() === trimmed.toLowerCase(),
    );
    if (!isSupported) {
      setCityError("Це місто поки що не підтримується");
      return;
    }
    setCityError("");
    try {
      await addCity.mutateAsync(trimmed);
      setNewCityName("");
      setIsModalOpen(false);
    } catch {
      setCityError("Не вдалося додати місто");
    }
  };

  const handleDeleteCity = useCallback(async () => {
    if (!confirmDelete) return;
    await deleteCity.mutateAsync(confirmDelete.id);
    setConfirmDelete(null);
  }, [confirmDelete, deleteCity]);

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen" style={{ contentVisibility: "auto" }}>
      <div className="hidden md:flex justify-between items-center mb-8">
        <h1 className="header-enter text-3xl font-bold text-content-primary">Міста</h1>
        {userRole === "SUPERADMIN" && (
          <button
            onClick={() => { setCityError(""); setIsModalOpen(true); }}
            className="header-btn-enter bg-brand hover:bg-brand-hover active:scale-95 text-white px-5 py-2.5 rounded-control font-medium shadow-sm flex items-center transition-all duration-fast"
          >
            <span className="mr-2">+</span> Додати місто
          </button>
        )}
      </div>

      {isLoading && cities.length === 0 ? (
        <CitiesSkeleton />
      ) : (
        <>
          <div className="md:hidden">
            <CityMobileHeader selectedCity={selectedCity} cities={cities} />
            <CityMobileList
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
              onDeleteCity={(id, name) => setConfirmDelete({ id, name })}
              isSuperAdmin={userRole === "SUPERADMIN"}
            />
          </div>

          <div className="hidden md:block">
            <IssueCarousel />
            <CityDesktopGrid
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
              onDeleteCity={(id, name) => setConfirmDelete({ id, name })}
              isSuperAdmin={userRole === "SUPERADMIN"}
            />
          </div>
        </>
      )}

      {userRole === "SUPERADMIN" && !isModalOpen && createPortal(
        <button
          onClick={() => { setCityError(""); setIsModalOpen(true); }}
          className="fab"
          aria-label="Додати місто"
        >
          +
        </button>,
        document.body,
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Нове місто">
        <form onSubmit={handleAddCity} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              value={newCityName}
              onChange={(e) => { setNewCityName(e.target.value); setCityError(""); }}
              placeholder="Наприклад: Львів"
              list="supported-cities"
              className="w-full p-3 border border-border-strong rounded-control focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-shadow text-base"
              autoFocus
              required
            />
            <datalist id="supported-cities">
              {supportedCities.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {cityError && (
              <p className="text-xs text-red-500 mt-1">{cityError}</p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 bg-surface-muted text-content-secondary py-2.5 rounded-control font-medium hover:bg-border-strong transition-colors text-sm"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={addCity.isPending}
              className="flex-1 bg-brand text-white py-2.5 rounded-control font-medium hover:bg-brand-hover disabled:opacity-50 transition-colors text-sm"
            >
              {addCity.isPending ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDeleteCity}
        title="Видалити місто?"
        message={`Ви впевнені, що хочете видалити "${confirmDelete?.name}"? Всі школи, події, екіпажі та інвентар цього міста будуть видалені незворотно.`}
        confirmText="Видалити"
        variant="danger"
      />
    </div>
  );
}
