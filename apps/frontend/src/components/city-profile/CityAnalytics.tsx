import { useMemo, useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';

interface CityAnalyticsProps {
  events: any[];
}

const PALETTE = ['#2563eb', '#10b981', '#06b6d4', '#f59e0b', '#8b5cf6', '#f43f5e', '#84cc16', '#6366f1', '#0ea5e9', '#ec4899', '#14b8a6', '#a855f7'];

const UA_MONTHS = ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'];
const DATE_FMT = new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });

function toMonthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(key: string) {
  const [y, m] = key.split('-').map(Number);
  return `${UA_MONTHS[m - 1]} ${String(y).slice(-2)}`;
}

function fmt(n: number) {
  return new Intl.NumberFormat('uk-UA').format(Math.round(n || 0));
}

function toInputDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function CityAnalytics({ events }: CityAnalyticsProps) {
  const today = useMemo(() => new Date(), []);

  const [from, setFrom] = useState(() => toInputDate(new Date(today.getFullYear(), today.getMonth() - 5, 1)));
  const [to, setTo] = useState(() => toInputDate(today));
  const [isOpen, setIsOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState(from);
  const [draftTo, setDraftTo] = useState(to);

  const applyPreset = (months: number | null, mode?: 'year' | 'all') => {
    const t = new Date();
    let f: Date;
    if (mode === 'year') f = new Date(t.getFullYear(), 0, 1);
    else if (mode === 'all') f = new Date(2000, 0, 1);
    else f = new Date(t.getFullYear(), t.getMonth() - (months! - 1), 1);
    setDraftFrom(toInputDate(f));
    setDraftTo(toInputDate(t));
  };

  const applyRange = () => {
    setFrom(draftFrom);
    setTo(draftTo);
    setIsOpen(false);
  };

  const filtered = useMemo(() => {
    const fromD = new Date(from);
    const toD = new Date(to);
    toD.setHours(23, 59, 59, 999);
    return (events || []).filter(ev => {
      const d = new Date(ev.date);
      return d >= fromD && d <= toD;
    });
  }, [events, from, to]);

  const monthly = useMemo(() => {
    const map = new Map<string, { revenue: number; profit: number; children: number; count: number }>();
    const fromD = new Date(from);
    const toD = new Date(to);
    const cursor = new Date(fromD.getFullYear(), fromD.getMonth(), 1);
    const last = new Date(toD.getFullYear(), toD.getMonth(), 1);
    let guard = 0;
    while (cursor <= last && guard < 240) {
      map.set(toMonthKey(cursor), { revenue: 0, profit: 0, children: 0, count: 0 });
      cursor.setMonth(cursor.getMonth() + 1);
      guard += 1;
    }
    filtered.forEach(ev => {
      const key = toMonthKey(new Date(ev.date));
      const bucket = map.get(key) || { revenue: 0, profit: 0, children: 0, count: 0 };
      bucket.revenue += ev.report?.totalSum || ev.price || 0;
      bucket.profit += ev.report?.remainderSum || 0;
      bucket.children += ev.report?.childrenCount || ev.childrenPlanned || 0;
      bucket.count += 1;
      map.set(key, bucket);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, v]) => ({ key, label: monthLabel(key), ...v }));
  }, [filtered, from, to]);

  const totalRevenue = filtered.reduce((s, ev) => s + (ev.report?.totalSum || ev.price || 0), 0);
  const totalProfit = filtered.reduce((s, ev) => s + (ev.report?.remainderSum || 0), 0);
  const totalChildren = filtered.reduce((s, ev) => s + (ev.report?.childrenCount || ev.childrenPlanned || 0), 0);
  const totalCount = filtered.length;

  const pieData = monthly.filter(m => m.count > 0);
  const pieTotal = pieData.reduce((s, m) => s + m.count, 0);
  const hasRevenue = monthly.some(m => m.revenue > 0);

  const exportCsv = () => {
    const header = 'Місяць;Виручка;Прибуток;Подій;Дітей\n';
    const rows = monthly.map(m => `${m.label};${m.revenue};${m.profit};${m.count};${m.children}`).join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${from}_${to}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const rangeLabel = `${DATE_FMT.format(new Date(from))} – ${DATE_FMT.format(new Date(to))}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Контроли */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Аналітика по місяцях</h3>
          <p className="text-sm text-slate-400 mt-0.5">На основі завершених подій закладу</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <button
              onClick={() => { setDraftFrom(from); setDraftTo(to); setIsOpen(v => !v); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              📅 <span className="truncate">{rangeLabel}</span> <span className="text-slate-400">⌄</span>
            </button>

            {isOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                <div className="absolute right-0 top-full mt-2 z-20 bg-white rounded-xl shadow-lg border border-slate-100 p-4 w-72">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={() => applyPreset(3)} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">3 міс.</button>
                    <button onClick={() => applyPreset(6)} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">6 міс.</button>
                    <button onClick={() => applyPreset(12)} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">12 міс.</button>
                    <button onClick={() => applyPreset(null, 'year')} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">Цей рік</button>
                    <button onClick={() => applyPreset(null, 'all')} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">Весь час</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Від</label>
                      <input type="date" value={draftFrom} onChange={e => setDraftFrom(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-400" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">До</label>
                      <input type="date" value={draftTo} onChange={e => setDraftTo(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-400" />
                    </div>
                  </div>
                  <button onClick={applyRange} className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Застосувати
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={exportCsv}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            ⬇ <span className="hidden sm:inline">Експорт</span>
          </button>
        </div>
      </div>

      {/* Загальна інформація */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
          <Stat label="Загальна виручка" value={`${fmt(totalRevenue)} грн`} />
          <Stat label="Загальний прибуток" value={`${fmt(totalProfit)} грн`} />
          <Stat label="Проведено подій" value={totalCount} />
          <Stat label="Охоплено дітей" value={fmt(totalChildren)} />
        </div>
      </div>

      {/* Графіки */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Виручка по місяцях */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
          <h4 className="font-bold text-slate-800 mb-4">Виручка по місяцях</h4>
          {!hasRevenue ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthly} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} interval={monthly.length > 8 ? 1 : 0} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  width={46}
                  tickFormatter={(v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`)}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  formatter={(v: number) => [`${fmt(v)} грн`, 'Виручка']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                />
                <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Проведено подій по місяцях */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
          <h4 className="font-bold text-slate-800 mb-4">Проведено подій по місяцях</h4>
          {pieData.length === 0 ? (
            <EmptyChart />
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-44 h-44 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="count" nameKey="label" innerRadius={52} outerRadius={78} paddingAngle={2} strokeWidth={0}>
                      {pieData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number, n: string) => [`${v} подій`, n]} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400">Всього</span>
                  <span className="text-xl font-bold text-slate-800">{pieTotal}</span>
                </div>
              </div>
              <ul className="flex-1 flex flex-col gap-2 text-sm w-full min-w-0">
                {pieData.map((m, i) => (
                  <li key={m.key} className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
                    <span className="text-slate-600 truncate flex-1">{m.label}</span>
                    <span className="font-medium text-slate-800 shrink-0">{m.count} ({Math.round((m.count / pieTotal) * 100)}%)</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-400 font-medium mb-1.5 truncate">{label}</p>
      <p className="text-lg sm:text-2xl font-bold text-slate-800 truncate">{value}</p>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="h-[280px] flex flex-col items-center justify-center text-slate-300">
      <span className="text-3xl mb-2">📊</span>
      <span className="text-sm text-slate-400">Немає даних за цей період</span>
    </div>
  );
}