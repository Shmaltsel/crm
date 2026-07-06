import React, { useEffect, useRef } from "react";
import type { Event, ExpenseItem, SalaryItem } from "../../types";

interface CompletedEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

const CompletedEventModal: React.FC<CompletedEventModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const headingId = 'completed-event-modal-heading';
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

  if (!isOpen || !event) return null;

  const report = event.report;
  const fmt = (n: number | null | undefined) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
          <div>
            <h3 id={headingId} className="text-xl font-bold text-slate-800">
              Звіт: {event.project}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {new Date(event.date).toLocaleDateString("uk-UA")}
            </p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg">
            ✕
          </button>
        </div>

        <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-slate-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Результати */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4">📊 Результати</h4>
              <div className="space-y-3 text-sm">
                {[
                  ["Дітей (факт)", report?.childrenCount || 0],
                  ["Класів", report?.classesCount || 0],
                  ["Пільговиків", report?.privilegedCount || 0],
                  ["Сеансів", report?.showingsCount || 0],
                ].map(([label, val]) => (
                  <div
                    key={label as string}
                    className="flex justify-between border-b border-slate-50 pb-2"
                  >
                    <span className="text-slate-500">{label}:</span>
                    <span className="font-medium">{val}</span>
                  </div>
                ))}
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500">Оцінка:</span>
                  <span className="font-bold text-amber-500">
                    ⭐ {report?.rating || 0}/10
                  </span>
                </div>
              </div>
            </div>

            {/* Фінанси */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4">💰 Фінанси</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Загальна виручка:</span>
                  <span className="font-bold">{fmt(report?.totalSum)} грн</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">На заклад:</span>
                  <span className="font-medium text-rose-500">
                    − {fmt(report?.schoolSum)} грн
                  </span>
                </div>

                {Array.isArray(report?.expenses) &&
                  report.expenses.map((exp: ExpenseItem, i: number) => (
                    <div key={i} className="flex justify-between text-xs pl-2">
                      <span className="text-slate-400">
                        — {exp.name || exp.category || "Інше"}
                      </span>
                      <span className="text-rose-500 font-medium">
                        − {fmt(exp.amount)} грн
                      </span>
                    </div>
                  ))}

                <div className="flex justify-between pt-1 border-t border-slate-100">
                  <span className="font-bold text-slate-800">
                    Чистий прибуток:
                  </span>
                  <span className="font-bold text-emerald-600 text-base">
                    {fmt(report?.remainderSum)} грн
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Зарплати */}
          {Array.isArray(report?.salaries) && report.salaries.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mt-4">
              <h4 className="font-bold text-slate-800 mb-4">👥 Зарплати</h4>
              <div className="space-y-2">
                {report.salaries.map((s: SalaryItem, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {s.name} {s.role ? `(${s.role})` : ""}
                    </span>
                    <span className="font-medium text-blue-600">
                      {fmt(s.amount)} грн
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Історія пайплайну */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm mt-4">
            <h4 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                ⏳
              </span>
              Історія пайплайну
            </h4>
            {!event.history || event.history.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">
                Історія порожня.
              </p>
            ) : (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
                {[...event.history]
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  )
                  .map((item) => (
                    <div key={item.id} className="relative pl-8 text-sm">
                      <div className="absolute left-1.5 w-3 h-3 rounded-full top-1 bg-violet-500 ring-4 ring-white"></div>
                      <p className="font-semibold text-slate-800">
                        {item.action}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(item.createdAt).toLocaleString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · 👤 {item.userName}
                      </p>
                      {item.comment && (
                        <div className="mt-2 p-3 bg-slate-50/80 rounded-xl text-slate-600 italic border border-slate-100">
                          {item.comment}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedEventModal;
