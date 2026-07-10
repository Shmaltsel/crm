import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Expense {
  name: string;
  amount: number;
}
interface CrewMember {
  id: string;
  name: string;
  role: "host" | "driver";
}
export interface ReportData {
  announcementDone: boolean;
  materialShown: boolean;
  childrenCount: number;
  classesCount: number;
  privilegedCount: number;
  showingsCount: number;
  totalSum: number;
  schoolSum: number;
  remainderSum: number;
  rating: number;
  expenses: { name: string; amount: number }[];
  salaries: { userId: string; name: string; amount: number; role: string }[];
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ReportData) => void;
  schoolName: string;
  eventType?: string;
  eventDate?: string;
  eventIndex?: number;
  crew?: {
    host?: { id: string; name: string } | null;
    driver?: { id: string; name: string } | null;
  };
}

const WEEKDAY_FMT = new Intl.DateTimeFormat("uk-UA", { weekday: "long" });
const DATE_FMT = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "—";
  return `${DATE_FMT.format(d)} ${WEEKDAY_FMT.format(d)}`;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("uk-UA").format(Math.round(value || 0));
}

const Icon = {
  Check: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  Users: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Wallet: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
      <path d="M16 12h6v4h-6a2 2 0 1 1 0-4z" />
    </svg>
  ),
  Star: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

function IconBadge({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${color}`}
    >
      {children}
    </span>
  );
}

function CardHeader({
  icon,
  color,
  title,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <IconBadge color={color}>{icon}</IconBadge>
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="text-sm font-medium text-slate-800">{children}</div>
    </div>
  );
}

function TogglePill({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-1.5">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
      >
        Так
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${!value ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
      >
        Ні
      </button>
    </div>
  );
}

function NumberField({
  value,
  onChange,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <input
        type="number"
        min={0}
        inputMode="decimal"
        value={value || ""}
        onChange={(e) => onChange(+e.target.value)}
        className="w-16 text-right bg-transparent outline-none font-medium text-base text-slate-800 focus:bg-blue-50 rounded px-1 -mr-1"
        placeholder="0"
      />
      {suffix && <span className="text-slate-400 text-xs">{suffix}</span>}
    </span>
  );
}

export default function ReportModal({
  isOpen,
  onClose,
  onSave,
  schoolName,
  eventType,
  eventDate,
  eventIndex,
  crew,
}: ReportModalProps) {
  const headingId = 'report-modal-heading';
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
  const [form, setForm] = useState({
    announcementDone: true,
    materialShown: true,
    childrenCount: 0,
    classesCount: 0,
    privilegedCount: 0,
    showingsCount: 0,
    totalSum: 0,
    schoolPercentage: 20,
    rating: 5,
  });

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExp, setNewExp] = useState({ name: "", amount: "" });
  const [salaries, setSalaries] = useState<Record<string, number>>({});

  const schoolSum = (form.totalSum * form.schoolPercentage) / 100;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const remainder = form.totalSum - schoolSum - totalExpenses;

  const addExpense = () => {
    const amount = Number(newExp.amount);
    if (!newExp.name.trim() || !amount) return;
    setExpenses((prev) => [...prev, { name: newExp.name.trim(), amount }]);
    setNewExp({ name: "", amount: "" });
  };

  const removeExpense = (index: number) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  const crewMembers = [
    ...(crew?.host
      ? [
          {
            id: crew.host.id,
            name: crew.host.name,
            role: "Ведучий",
          },
        ]
      : []),
    ...(crew?.driver
      ? [
          {
            id: crew.driver.id,
            name: crew.driver.name,
            role: "Водій",
          },
        ]
      : []),
  ];

  const handleSave = () => {
    const salariesArr = crewMembers
      .map((m) => ({
        userId: m.id,
        name: m.name,
        amount: salaries[m.id] || 0,
        role: m.role,
      }))
      .filter((s) => s.amount > 0);

    const { schoolPercentage, ...formRest } = form;
    void schoolPercentage;

    onSave({
      ...formRest,
      expenses,
      schoolSum,
      remainderSum: remainder,
      salaries: salariesArr,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden pb-safe"
            style={{ willChange: "transform" }}
          >
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />

        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between shrink-0">
          <div className="min-w-0">
            <h3 id={headingId} className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
              Звіт по події
            </h3>
            <p className="text-sm text-slate-500 mt-0.5 truncate">
              {schoolName}
            </p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 text-lg leading-none p-2 -mr-2 shrink-0">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Охоплення */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
              <CardHeader
                icon={<Icon.Users />}
                color="bg-violet-50 text-violet-600"
                title="Охоплення та Проведення"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <Row label="Кількість дітей">
                  <NumberField
                    value={form.childrenCount}
                    onChange={(v) => setForm({ ...form, childrenCount: v })}
                    suffix="дітей"
                  />
                </Row>
                <Row label="Класів">
                  <NumberField
                    value={form.classesCount}
                    onChange={(v) => setForm({ ...form, classesCount: v })}
                    suffix="кл."
                  />
                </Row>
                <Row label="Пільгових дітей">
                  <NumberField
                    value={form.privilegedCount}
                    onChange={(v) => setForm({ ...form, privilegedCount: v })}
                  />
                </Row>
                <Row label="Кількість показів">
                  <NumberField
                    value={form.showingsCount}
                    onChange={(v) => setForm({ ...form, showingsCount: v })}
                  />
                </Row>
              </div>
            </div>

            {/* Фінансовий результат */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
              <CardHeader
                icon={<Icon.Wallet />}
                color="bg-amber-50 text-amber-600"
                title="Фінансовий результат"
              />
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500 font-medium">
                  Загальна виручка
                </span>
                <span className="inline-flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    inputMode="decimal"
                    value={form.totalSum || ""}
                    onChange={(e) =>
                      setForm({ ...form, totalSum: +e.target.value })
                    }
                    className="w-28 text-right bg-transparent outline-none font-bold text-lg text-base text-slate-800 focus:bg-blue-50 rounded px-1"
                    placeholder="0"
                  />
                  <span className="text-slate-400 text-sm">грн</span>
                </span>
              </div>

              {/* НОВЕ: Змінний відсоток для закладу */}
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Відсоток закладу</span>
                <NumberField
                  value={form.schoolPercentage}
                  onChange={(v) => setForm({ ...form, schoolPercentage: v })}
                  suffix="%"
                />
              </div>

              <Row label={`Сума закладу (${form.schoolPercentage}%)`}>
                <span>{formatMoney(schoolSum)} грн</span>
              </Row>

              <div className="py-3 border-b border-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">
                    Додаткові витрати
                  </span>
                  <span className="text-sm font-medium text-rose-500">
                    −{formatMoney(totalExpenses)} грн
                  </span>
                </div>
                {expenses.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {expenses.map((exp, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full pl-3 pr-1.5 py-1 text-xs"
                      >
                        <span className="text-slate-600">{exp.name}</span>
                        <span className="font-semibold text-slate-700">
                          {formatMoney(exp.amount)} грн
                        </span>
                        <button
                          onClick={() => removeExpense(i)}
                          className="text-slate-400 hover:text-rose-500 w-4 h-4 rounded-full flex items-center justify-center hover:bg-white"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  <input
                    placeholder="Назва витрати"
                    value={newExp.name}
                    onChange={(e) =>
                      setNewExp({ ...newExp, name: e.target.value })
                    }
                    className="flex-1 min-w-0 p-2 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    min={0}
                    inputMode="decimal"
                    placeholder="грн"
                    value={newExp.amount}
                    onChange={(e) =>
                      setNewExp({ ...newExp, amount: e.target.value })
                    }
                    className="w-20 sm:w-24 p-2 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    onClick={addExpense}
                    type="button"
                    className="px-3 shrink-0 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
                <span className="text-sm font-semibold text-emerald-700">
                  Залишок ({100 - form.schoolPercentage}%)
                </span>
                <span className="text-lg font-bold text-emerald-700">
                  {formatMoney(remainder)} грн
                </span>
              </div>
            </div>
            {crewMembers.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                <CardHeader
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  }
                  color="bg-blue-50 text-blue-600"
                  title="Заробітня плата"
                />
                <div className="space-y-1">
                  {crewMembers.map((m) => (
                    <Row key={m.id} label={`${m.name} (${m.role})`}>
                      <span className="inline-flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          inputMode="decimal"
                          value={salaries[m.id] || ""}
                          onChange={(e) =>
                            setSalaries((prev) => ({
                              ...prev,
                              [m.id]: +e.target.value,
                            }))
                          }
                          className="w-24 text-right bg-transparent outline-none font-medium text-base text-slate-800 focus:bg-blue-50 rounded px-1"
                          placeholder="0"
                        />
                        <span className="text-slate-400 text-xs">грн</span>
                      </span>
                    </Row>
                  ))}
                </div>
                {crewMembers.some((m) => salaries[m.id] > 0) && (
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                    <span className="text-sm font-semibold text-slate-500">
                      Разом ЗП
                    </span>
                    <span className="font-bold text-blue-600">
                      {formatMoney(
                        crewMembers.reduce(
                          (s, m) => s + (salaries[m.id] || 0),
                          0,
                        ),
                      )}{" "}
                      грн
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-4 sm:px-6 py-4 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] sm:pb-4 border-t border-slate-100 bg-white shrink-0">
          <button
            onClick={onClose}
            className="flex-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium py-3"
          >
            Скасувати
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 py-3"
          >
            Зберегти звіт
          </button>
        </div>
      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
