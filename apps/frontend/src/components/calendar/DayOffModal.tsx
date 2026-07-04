import { createPortal } from "react-dom";
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
  if (!isOpen || !date) return null;

  const dateStr = date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

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
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Вихідний на {dateStr}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Оберіть співробітника
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {staff.length === 0 ? (
            <p className="text-center text-slate-400 py-6 text-sm">
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
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                      isOff
                        ? "border-rose-200 bg-rose-50"
                        : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium text-slate-800">
                      <span>{ROLE_ICON[s.role] || "👤"}</span>
                      {s.name}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        isOff
                          ? "bg-rose-100 text-rose-600"
                          : "bg-slate-100 text-slate-500"
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
      </div>
    </div>,
    document.body,
  );
}
