import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { api } from "../../../config/api";

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

  useEffect(() => {
    if (isOpen && currentDate) {
      setDate(currentDate.slice(0, 10));
      setTime(currentTime || "");
    }
  }, [isOpen, currentDate, currentTime]);

  if (!isOpen) return null;

  const handleSave = () => {
    onClose(); // закриваємо одразу
    onSuccess();
    // запит у фоні
    api.patch(`/events/${eventId}/reschedule`, { date, time }).catch((e) => {
      console.error('Помилка перенесення:', e);
    });
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
      style={{ animation: "fadeIn 0.2s ease-out forwards" }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalScale {
          from { opacity: 0; transform: scale(0.95) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
        style={{ animation: "modalScale 0.3s ease-out forwards" }}
      >
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">
            📅 Перенести подію
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Нова дата
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Новий час
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
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
      </div>
    </div>,
    document.body,
  );
}
