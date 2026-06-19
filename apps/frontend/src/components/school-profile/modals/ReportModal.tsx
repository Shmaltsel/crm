import React, { useState } from 'react';

interface Expense {
  name: string;
  amount: number;
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  schoolName: string;
  eventType?: string;
  eventDate?: string;
  eventIndex?: number; // який це за рахунком захід у цьому закладі
}

const WEEKDAY_FMT = new Intl.DateTimeFormat('uk-UA', { weekday: 'long' });
const DATE_FMT = new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: '2-digit', year: '2-digit' });

function formatDate(dateStr?: string) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '—';
  return `${DATE_FMT.format(d)} ${WEEKDAY_FMT.format(d)}`;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('uk-UA').format(Math.round(value || 0));
}

/* ---------- мінімальні inline-іконки, без зовнішніх залежностей ---------- */
const Icon = {
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Wallet: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" /><path d="M16 12h6v4h-6a2 2 0 1 1 0-4z" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

function IconBadge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${color}`}>
      {children}
    </span>
  );
}

function CardHeader({ icon, color, title }: { icon: React.ReactNode; color: string; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <IconBadge color={color}>{icon}</IconBadge>
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="text-sm font-medium text-slate-800">{children}</div>
    </div>
  );
}

function TogglePill({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex gap-1.5">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${value ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
      >
        Так
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${!value ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
      >
        Ні
      </button>
    </div>
  );
}

function NumberField({ value, onChange, suffix }: { value: number; onChange: (v: number) => void; suffix?: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <input
        type="number" min={0}
        value={value || ''}
        onChange={e => onChange(+e.target.value)}
        className="w-16 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1 -mr-1"
        placeholder="0"
      />
      {suffix && <span className="text-slate-400 text-xs">{suffix}</span>}
    </span>
  );
}

export default function ReportModal({
  isOpen, onClose, onSave, schoolName, eventType, eventDate, eventIndex,
}: ReportModalProps) {
  const [form, setForm] = useState({
    announcementDone: true,
    materialShown: true,
    childrenCount: 0,
    classesCount: 0,
    privilegedCount: 0,
    showingsCount: 0,
    totalSum: 0,
    rating: 8,
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExp, setNewExp] = useState({ name: '', amount: '' });

  if (!isOpen) return null;

  const schoolSum = form.totalSum * 0.2;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const remainder = form.totalSum - schoolSum - totalExpenses;

  const addExpense = () => {
    const amount = Number(newExp.amount);
    if (!newExp.name.trim() || !amount) return;
    setExpenses(prev => [...prev, { name: newExp.name.trim(), amount }]);
    setNewExp({ name: '', amount: '' });
  };

  const removeExpense = (index: number) => {
    setExpenses(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({ ...form, expenses, schoolSum, remainderSum: remainder });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                {eventType || 'Подія'}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {formatDate(eventDate)}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 leading-tight">Звіт по події</h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {schoolName}{eventIndex ? <span className="text-slate-400"> · подія №{eventIndex}</span> : null}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg leading-none">✕</button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Проведено */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <CardHeader icon={<Icon.Check />} color="bg-blue-50 text-blue-600" title="Проведено" />
              <Row label="Оголошення про проєкт">
                <TogglePill value={form.announcementDone} onChange={v => setForm({ ...form, announcementDone: v })} />
              </Row>
              <Row label="Показ матеріалу">
                <TogglePill value={form.materialShown} onChange={v => setForm({ ...form, materialShown: v })} />
              </Row>
            </div>

            {/* Охоплення */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <CardHeader icon={<Icon.Users />} color="bg-violet-50 text-violet-600" title="Охоплення" />
              <Row label="Кількість дітей">
                <NumberField value={form.childrenCount} onChange={v => setForm({ ...form, childrenCount: v })} suffix="дітей" />
              </Row>
              <Row label="Класів">
                <NumberField value={form.classesCount} onChange={v => setForm({ ...form, classesCount: v })} suffix="кл." />
              </Row>
              <Row label="Пільгових дітей">
                <NumberField value={form.privilegedCount} onChange={v => setForm({ ...form, privilegedCount: v })} />
              </Row>
              <Row label="Кількість показів">
                <NumberField value={form.showingsCount} onChange={v => setForm({ ...form, showingsCount: v })} />
              </Row>
            </div>

            {/* Фінансовий результат */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:col-span-2">
              <CardHeader icon={<Icon.Wallet />} color="bg-amber-50 text-amber-600" title="Фінансовий результат" />

              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Загальна сума</span>
                <span className="inline-flex items-center gap-1">
                  <input
                    type="number" min={0}
                    value={form.totalSum || ''}
                    onChange={e => setForm({ ...form, totalSum: +e.target.value })}
                    className="w-28 text-right bg-transparent outline-none font-bold text-lg text-slate-800 focus:bg-blue-50 rounded px-1"
                    placeholder="0"
                  />
                  <span className="text-slate-400 text-sm">грн</span>
                </span>
              </div>

              <Row label="На заклад (20%)">
                <span>{formatMoney(schoolSum)} грн</span>
              </Row>

              <div className="py-2 border-b border-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">Додаткові витрати</span>
                  <span className="text-sm font-medium text-rose-500">−{formatMoney(totalExpenses)} грн</span>
                </div>

                {expenses.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {expenses.map((exp, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full pl-3 pr-1.5 py-1 text-xs">
                        <span className="text-slate-600">{exp.name}</span>
                        <span className="font-semibold text-slate-700">{formatMoney(exp.amount)} грн</span>
                        <button onClick={() => removeExpense(i)} className="text-slate-400 hover:text-rose-500 w-4 h-4 rounded-full flex items-center justify-center hover:bg-white">✕</button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    placeholder="Назва витрати"
                    value={newExp.name}
                    onChange={e => setNewExp({ ...newExp, name: e.target.value })}
                    className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="number" min={0}
                    placeholder="грн"
                    value={newExp.amount}
                    onChange={e => setNewExp({ ...newExp, amount: e.target.value })}
                    className="w-24 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    onClick={addExpense}
                    type="button"
                    className="px-3 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
                <span className="text-sm font-semibold text-emerald-700">Залишок (80%)</span>
                <span className="text-lg font-bold text-emerald-700">{formatMoney(remainder)} грн</span>
              </div>
            </div>

            {/* Оцінка */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 md:col-span-2">
              <CardHeader icon={<Icon.Star />} color="bg-rose-50 text-rose-500" title="Оцінка по закладу" />
              <div className="flex items-center gap-4">
                <input
                  type="range" min={1} max={10} step={1}
                  value={form.rating}
                  onChange={e => setForm({ ...form, rating: +e.target.value })}
                  className="flex-1 accent-blue-600"
                />
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm shrink-0">
                  {form.rating}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-white shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium">
            Скасувати
          </button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700">
            Зберегти звіт
          </button>
        </div>
      </div>
    </div>
  );
}