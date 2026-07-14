import { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../config/api";
import type { City, Crew } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { useDaysOff } from "../../../hooks/useDaysOff";
import { backdropVariants, modalContentVariants } from "../../../lib/motion";
import { useMobileModalOffsets } from "./useMobileModalOffsets";
interface CrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  city?: string;
  eventDate?: string;
  onSave: (crewId: string) => void;
}

export default function CrewModal({
  isOpen,
  onClose,
  city,
  eventDate,
  onSave,
}: CrewModalProps) {
  const headingId = 'crew-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  const navigate = useNavigate();
  const { data: allCities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: () => api.get("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const currentCity = allCities.find((c: City) => c.name === city);
  const { data: crews = [], isLoading } = useQuery({
    queryKey: ["cityCrews", currentCity?.id],
    queryFn: () => {
      if (!currentCity) return Promise.resolve([]);
      return api.get<Crew[]>(`/cities/${currentCity.id}/crews`).then((r) => r.data);
    },
    enabled: !!currentCity?.id && isOpen,
    staleTime: 60 * 1000,
  });
  const dayOnly = eventDate ? eventDate.slice(0, 10) : undefined;
  const { data: dayOffs = [] } = useDaysOff(dayOnly, dayOnly);
  const dayOffUserIds = useMemo(
    () => (dayOnly ? new Set(dayOffs.map((d) => d.userId)) : new Set<string>()),
    [dayOffs, dayOnly],
  );
  const [selectedCrewId, setSelectedCrewId] = useState("");
  const mobileOffsets = useMobileModalOffsets();

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-backdrop md:backdrop-blur-sm z-[60] flex items-center justify-center"
          style={{
            paddingTop: mobileOffsets.paddingTop,
            paddingBottom: mobileOffsets.paddingBottom,
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
        <div className="p-5 border-b border-border flex justify-between items-center bg-surface-muted">
          <h3 id={headingId} className="text-xl font-bold text-content-primary">
            Призначити екіпаж
          </h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-content-muted hover:text-content-secondary active:scale-90 transition-transform duration-fast">
            ✕
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <p className="text-content-muted text-center py-4">Завантаження...</p>
          ) : crews.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-content-muted">
                У цьому місті ще немає сформованих екіпажів.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (currentCity?.id) navigate(`/cities/${currentCity.id}`);
                }}
                className="text-sm mt-2 text-blue-600 hover:text-blue-800 underline underline-offset-2 active:scale-[0.97] transition-transform duration-fast"
              >
                Створіть екіпаж у вкладці міста!
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-content-secondary">
                Оберіть готовий екіпаж
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {crews.map((crew) => {
                   const hostOnDayOff =
                     !!crew.hostId && dayOffUserIds.has(crew.hostId);
                   const driverOnDayOff =
                     !!crew.driverId && dayOffUserIds.has(crew.driverId);
                  const isUnavailable = hostOnDayOff || driverOnDayOff;
                  return (
                    <label
                      key={crew.id}
                      className={`flex items-start p-3 rounded-xl border transition-all ${
                        isUnavailable
                          ? "border-border-strong bg-surface-muted opacity-60 cursor-not-allowed"
                          : selectedCrewId === crew.id
                            ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 cursor-pointer"
                            : "border-border-strong hover:border-blue-300 cursor-pointer"
                      }`}
                    >
                      <input
                        type="radio"
                        name="crew"
                        value={crew.id}
                        checked={selectedCrewId === crew.id}
                        disabled={!!isUnavailable}
                        onChange={() => setSelectedCrewId(crew.id)}
                        className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="font-bold text-content-primary">{crew.name}</p>
                        <p className="text-xs text-content-muted mt-1">
                          🎙️ {crew.host?.name || "—"} | 🚗{" "}
                          {crew.driver?.name || "—"}
                        </p>
                        {crew.car && (
                          <p className="text-xs text-emerald-600 mt-0.5">
                            Авто: {crew.car}
                          </p>
                        )}
                        {isUnavailable && (
                          <p className="text-xs text-rose-500 font-medium mt-1">
                            🌴 {hostOnDayOff ? "Ведучий" : "Водій"} у вихідному
                            цього дня
                          </p>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-surface-muted text-content-secondary rounded-lg text-sm font-medium hover:bg-surface-muted active:scale-[0.97] transition-transform duration-fast"
            >
              Скасувати
            </button>
            <button
              onClick={() => onSave(selectedCrewId)}
              disabled={!selectedCrewId}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-opacity active:scale-[0.97] transition-transform duration-fast"
            >
              Призначити
            </button>
          </div>
          </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
