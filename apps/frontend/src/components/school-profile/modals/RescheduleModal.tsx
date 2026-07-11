import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../config/api";
import { backdropVariants, modalContentVariants } from "../../../lib/motion";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  currentDate: string;
  currentTime: string;
  onSuccess: () => void;
}

export default function RescheduleModal({
  isOpen,
  onClose,
  eventId,
  currentDate,
  currentTime,
  onSuccess,
}: RescheduleModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const headingId = 'reschedule-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && currentDate) {
      setDate(currentDate.slice(0, 10));
      setTime(currentTime || "");
    }
  }, [isOpen, currentDate, currentTime]);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.patch(`/events/${eventId}/reschedule`, { date, time });
      onClose();
      onSuccess();
    } catch (e) {
      console.error("Помилка перенесення:", e);
    } finally {
      setLoading(false);
    }
  };

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
          className="fixed inset-0 bg-backdrop backdrop-blur-sm z-modal flex items-center justify-center p-4"
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
            📅 Перенести подію
          </h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-content-muted hover:text-content-secondary text-xl leading-none p-2 -mr-2 transition-colors">
            ✕
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-content-secondary mb-1.5">
              Нова дата
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-border-strong rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-content-secondary mb-1.5">
              Новий час
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border border-border-strong rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
            />
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-surface-muted text-content-secondary py-3 rounded-xl font-medium hover:bg-surface-muted transition-colors"
            >
              Скасувати
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Збереження..." : "Зберегти"}
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
