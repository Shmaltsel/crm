import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, modalContentVariants } from "../../lib/motion";
import type { Event, ExpenseItem, SalaryRecord } from "../../types";

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

  const report = event?.report ?? null;
  const fmt = (n: unknown) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

  return (
    <AnimatePresence>
      {isOpen && event && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
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
            className="bg-surface rounded-t-modal sm:rounded-modal shadow-modal w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col pb-safe"
          >
        <div className="p-5 sm:p-6 border-b border-border flex justify-between bg-surface-muted shrink-0">
          <div>
            <h3 id={headingId} className="text-xl font-bold text-content-primary">
              Звіт: {event.project}
            </h3>
            <p className="text-sm text-content-muted mt-1">
              {new Date(event.date).toLocaleDateString("uk-UA")}
            </p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-content-muted hover:text-content-secondary p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg active:scale-90 transition-transform duration-fast">
            ✕
          </button>
        </div>

        <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-surface-subtle">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-surface p-5 rounded-card border border-border shadow-card">
              <h4 className="font-bold text-content-primary mb-4">📊 Результати</h4>
              <div className="space-y-3 text-sm">
                {[
                  ["Дітей (факт)", report?.childrenCount || 0],
                  ["Класів", report?.classesCount || 0],
                  ["Пільговиків", report?.privilegedCount || 0],
                  ["Сеансів", report?.showingsCount || 0],
                ].map(([label, val]) => (
                  <div
                    key={label as string}
                    className="flex justify-between border-b border-surface-muted pb-2"
                  >
                    <span className="text-content-muted">{label}:</span>
                    <span className="font-medium text-content-primary">{val}</span>
                  </div>
                ))}
                <div className="flex justify-between pb-1">
                  <span className="text-content-muted">Оцінка:</span>
                  <span className="font-bold text-warning-600">
                    ⭐ {report?.rating || 0}/10
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface p-5 rounded-card border border-border shadow-card">
              <h4 className="font-bold text-content-primary mb-4">💰 Фінанси</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-surface-muted pb-2">
                  <span className="text-content-muted">Загальна виручка:</span>
                  <span className="font-bold text-content-primary">{fmt(report?.totalSum)} грн</span>
                </div>
                <div className="flex justify-between border-b border-surface-muted pb-2">
                  <span className="text-content-muted">На заклад:</span>
                  <span className="font-medium text-danger-600">
                    − {fmt(report?.schoolSum)} грн
                  </span>
                </div>

                {Array.isArray(report?.expenseItems) &&
                  report.expenseItems.map((exp: ExpenseItem, i: number) => (
                    <div key={i} className="flex justify-between text-xs pl-2">
                      <span className="text-content-muted">
                        — {exp.name || exp.category || "Інше"}
                      </span>
                      <span className="text-danger-600 font-medium">
                        − {fmt(exp.amount)} грн
                      </span>
                    </div>
                  ))}

                <div className="flex justify-between pt-1 border-t border-border">
                  <span className="font-bold text-content-primary">
                    Чистий прибуток:
                  </span>
                  <span className="font-bold text-success-600 text-base">
                    {fmt(report?.remainderSum)} грн
                  </span>
                </div>
              </div>
            </div>
          </div>

          {Array.isArray(report?.salaryRecords) && report.salaryRecords.length > 0 && (
            <div className="bg-surface p-5 rounded-card border border-border shadow-card mt-4">
              <h4 className="font-bold text-content-primary mb-4">👥 Зарплати</h4>
              <div className="space-y-2">
                {report.salaryRecords.map((s: SalaryRecord, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                      <span className="text-content-secondary">
                        {s.employee?.name ?? "—"}
                      </span>
                    <span className="font-medium text-brand">
                      {fmt(s.amount)} грн
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-surface p-5 sm:p-6 rounded-card border border-border shadow-card mt-4">
            <h4 className="font-bold text-content-primary mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-50 text-brand flex items-center justify-center">
                ⏳
              </span>
              Історія пайплайну
            </h4>
            {!event.history || event.history.length === 0 ? (
              <p className="text-sm text-content-muted text-center py-4">
                Історія порожня.
              </p>
            ) : (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-border">
                {[...event.history]
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  )
                  .map((item) => (
                    <div key={item.id} className="relative pl-8 text-sm">
                      <div className="absolute left-1.5 w-3 h-3 rounded-full top-1 bg-brand ring-4 ring-surface"></div>
                      <p className="font-semibold text-content-primary">
                        {item.action}
                      </p>
                      <p className="text-xs text-content-muted mt-0.5">
                        {new Date(item.createdAt).toLocaleString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · 👤 {item.userName}
                      </p>
                      {item.comment && (
                        <div className="mt-2 p-3 bg-surface-muted rounded-card text-content-secondary italic border border-border">
                          {item.comment}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompletedEventModal;
