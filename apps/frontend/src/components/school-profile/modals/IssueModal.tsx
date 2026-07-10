import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { api } from "../../../config/api";

interface Employee {
  id: string;
  name: string;
  role: string;
}

interface IssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolName: string;
  eventName: string;
  eventId: string;
  cityId: string;
  employees?: Employee[];
}

export default function IssueModal({
  isOpen,
  onClose,
  schoolName,
  eventName,
  eventId,
  cityId,
  employees = [],
}: IssueModalProps) {
  const [message, setMessage] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [sent, setSent] = useState(false);
  const headingId = 'issue-modal-heading';
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

  if (!isOpen) return null;

  const assignedUser = employees.find((e) => e.id === assignedUserId);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage("");
      setDeadline("");
      setAssignedUserId("");
      onClose();
    }, 600);
    api
      .post("/issues", {
        eventId,
        schoolName,
        eventName,
        message,
        cityId,
        deadline: deadline || undefined,
        assignedUserId: assignedUserId || undefined,
        assignedUserName: assignedUser?.name || undefined,
      })
      .catch((e) => console.error(e));
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
      style={{ animation: "fadeIn 0.2s ease-out forwards" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalScale {
          from { opacity: 0; transform: scale(0.95) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col opacity-0"
        style={{ animation: "modalScale 0.3s ease-out forwards" }}
      >
        <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50 shrink-0">
          <div>
            <h3 id={headingId} className="text-xl font-bold text-slate-800">🚨 Запит</h3>
            <p className="text-sm text-red-500 mt-0.5 font-medium">
              {schoolName}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{eventName}</p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors">
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 overflow-y-auto">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Опишіть проблему або запит..."
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none resize-none h-32 text-base"
            autoFocus
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              ⏰ Дедлайн{" "}
              <span className="text-slate-400 font-normal">
                (необов'язково)
              </span>
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-base"
            />
          </div>

          {employees.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                👤 Відповідальний{" "}
                <span className="text-slate-400 font-normal">
                  (необов'язково)
                </span>
              </label>
              <select
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-base bg-white"
              >
                <option value="">— Оберіть працівника —</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.role})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={sent || !message.trim()}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {sent ? "✓ Надіслано!" : "Відправити"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
