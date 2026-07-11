import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, modalContentVariants } from "../../lib/motion";
import type { DayOff } from "../../hooks/useDaysOff";

interface StaffUser {
  id: string;
  name: string;
  role: string;
}

interface DayOffModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  staff: StaffUser[];
  dayOffs: DayOff[];
  onToggle: (userId: string, existingId?: string) => void;
}

const ROLE_ICON: Record<string, string> = {
  HOST: "🎙️",
  DRIVER: "🚗",
};

export default function DayOffModal({
  isOpen,
  onClose,
  date,
  staff,
  dayOffs,
  onToggle,
}: DayOffModalProps) {
  const headingId = 'dayoff-modal-heading';
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

  const dateStr = date?.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }) ?? "";

  return createPortal(
    <AnimatePresence>
      {isOpen && date && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden select-none no-select-ios"
          >
            <div className="p-5 border-b border-border flex justify-between items-center bg-surface-muted">
              <div>
                <h3 id={headingId} className="text-lg font-bold text-content-primary">
                  Вихідний на {dateStr}
                </h3>
                <p className="text-xs text-content-muted mt-0.5">
                  Оберіть співробітника
                </p>
              </div>
              <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-content-muted hover:text-content-secondary text-xl leading-none p-2 -mr-2 transition-colors active:scale-90 transition-transform duration-fast">
                ✕
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {staff.length === 0 ? (
                <p className="text-center text-content-muted py-6 text-sm">
                  Немає співробітників у цьому місті
                </p>
              ) : (
                <div className="space-y-2">
                  {staff.map((s) => {
                    const existing = dayOffs.find((d) => d.userId === s.id);
                    const isOff = !!existing;
                    return (
                      <button
                        key={s.id}
                        onClick={() => onToggle(s.id, existing?.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left no-select-ios active:scale-[0.98] ${
                          isOff
                            ? "border-rose-200 bg-rose-50"
                            : "border-border-strong hover:border-blue-300 hover:bg-blue-50/30"
                        }`}
                      >
                        <span className="flex items-center gap-2 font-medium text-content-primary">
                          <span>{ROLE_ICON[s.role] || "👤"}</span>
                          {s.name}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            isOff
                              ? "bg-rose-100 text-rose-600"
                              : "bg-surface-muted text-content-muted"
                          }`}
                        >
                          {isOff ? "Вихідний ✕" : "Призначити"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
