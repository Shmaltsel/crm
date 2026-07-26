import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Plus, Trash2, Fuel, Wrench, Send, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { EmptyState } from "../../../components/ui/EmptyState";
import { staggerContainer, staggerItem } from "../../../lib/motion";
import { useAuth } from "../../../context/AuthContext";
import { useCreateMileageReport, useMileageReportsMine } from "../../../hooks/useMileageReports";
import { useToast } from "../../../components/ui/Toast";
import type { MileageReportStatus } from "../../../types";

interface LocalRecord {
  id: string;
  date: string;
  km: number;
  fuel: number;
  depreciation: number;
}

const FUEL_RATE = 6;
const DEPRECIATION_RATE = 4;
const STORAGE_KEY_PREFIX = "mileage-draft-";

const fmt = (n: number) => new Intl.NumberFormat("uk-UA").format(n);

function getTodayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadDraft(key: string): LocalRecord[] {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}

function saveDraft(key: string, records: LocalRecord[]) {
  localStorage.setItem(key, JSON.stringify(records));
}

const STATUS_LABELS: Record<MileageReportStatus, { label: string; icon: typeof Clock; color: string }> = {
  PENDING: { label: "Очікує", icon: Clock, color: "text-amber-600 bg-amber-50 border-amber-100" },
  APPROVED: { label: "Затверджено", icon: CheckCircle2, color: "text-success bg-green-50 border-green-100" },
  REJECTED: { label: "Відхилено", icon: XCircle, color: "text-danger-600 bg-red-50 border-red-100" },
};

export default function Mileage() {
  const { user } = useAuth();
  const toast = useToast();
  const storageKey = `${STORAGE_KEY_PREFIX}${user?.id ?? "anon"}`;
  const [records, setRecords] = useState<LocalRecord[]>(() => loadDraft(storageKey));
  const [date, setDate] = useState(getTodayISO);
  const [km, setKm] = useState("");

  const { data: submitted = [], isLoading } = useMileageReportsMine();
  const createMutation = useCreateMileageReport();

  const kmNum = Math.max(0, Math.floor(Number(km) || 0));
  const fuel = kmNum * FUEL_RATE;
  const depreciation = kmNum * DEPRECIATION_RATE;

  const handleAdd = useCallback(() => {
    if (kmNum <= 0) return;
    const rec: LocalRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date,
      km: kmNum,
      fuel,
      depreciation,
    };
    const next = [rec, ...records];
    setRecords(next);
    saveDraft(storageKey, next);
    setKm("");
  }, [date, kmNum, fuel, depreciation, records, storageKey]);

  const handleDelete = useCallback((id: string) => {
    const next = records.filter((r) => r.id !== id);
    setRecords(next);
    saveDraft(storageKey, next);
  }, [records, storageKey]);

  const handleSubmit = useCallback(() => {
    if (records.length === 0) return;
    const totalKm = records.reduce((s, r) => s + r.km, 0);
    const totalFuel = records.reduce((s, r) => s + r.fuel, 0);
    const totalDep = records.reduce((s, r) => s + r.depreciation, 0);
    createMutation.mutate(
      { date: records[0].date, km: totalKm, fuel: totalFuel, depreciation: totalDep, totalAmount: totalFuel + totalDep },
      {
        onSuccess: () => {
          setRecords([]);
          saveDraft(storageKey, []);
          toast("Заявку на кілометраж надіслано", "success");
        },
        onError: () => toast("Помилка надсилання заявки", "error"),
      },
    );
  }, [records, createMutation, storageKey, toast]);

  const totalKm = records.reduce((s, r) => s + r.km, 0);
  const totalFuel = records.reduce((s, r) => s + r.fuel, 0);
  const totalDepreciation = records.reduce((s, r) => s + r.depreciation, 0);

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Car className="w-5 h-5 text-brand" />
        <h1 className="text-2xl font-bold text-content-primary">Кілометраж</h1>
      </div>

      <div className="bg-surface rounded-card shadow-soft border border-border p-4 md:p-5">
        <h3 className="text-sm font-semibold text-content-primary mb-3">Новий запис</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label htmlFor="mileage-date" className="block text-sm mb-1 text-content-secondary">Дата</label>
            <input id="mileage-date" type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full p-2.5 border border-border-strong rounded-control bg-surface text-content-primary focus:ring-2 focus:ring-brand outline-none" />
          </div>
          <div>
            <label htmlFor="mileage-km" className="block text-sm mb-1 text-content-secondary">Кілометри</label>
            <input id="mileage-km" type="number" inputMode="decimal" min={0} step="0.1" value={km}
              onChange={(e) => setKm(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
              placeholder="0"
              className="w-full p-2.5 border border-border-strong rounded-control bg-surface text-content-primary focus:ring-2 focus:ring-brand outline-none" />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-sm mb-1 text-content-secondary">Пальне (грн)</label>
              <div className="flex items-center gap-2 p-2.5 border border-border rounded-control bg-surface-muted text-content-muted">
                <Fuel className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{fmt(fuel)}</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1 text-content-secondary">Амортизація (грн)</label>
              <div className="flex items-center gap-2 p-2.5 border border-border rounded-control bg-surface-muted text-content-muted">
                <Wrench className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{fmt(depreciation)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <Button onClick={handleAdd} disabled={kmNum <= 0} className="w-full" size="md">
              <Plus className="w-4 h-4 mr-1.5" />
              Додати запис
            </Button>
          </div>
        </div>
      </div>

      {records.length === 0 ? (
        <EmptyState
          icon={Car}
          title="Ще немає записів"
          description="Додайте запис кілометражу вище та натисніть 'Подати'"
        />
      ) : (
        <>
          <div className="hidden md:block bg-surface rounded-card shadow-card border border-border overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-muted border-b border-border">
                  <th className="px-4 py-3 font-medium text-content-secondary">Дата</th>
                  <th className="px-4 py-3 font-medium text-content-secondary text-right">Км</th>
                  <th className="px-4 py-3 font-medium text-content-secondary text-right">Пальне</th>
                  <th className="px-4 py-3 font-medium text-content-secondary text-right">Амортизація</th>
                  <th className="px-4 py-3 font-medium text-content-secondary text-right">Разом</th>
                  <th className="px-4 py-3 w-10" />
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface-muted/50 transition-colors">
                    <td className="px-4 py-3 text-content-primary font-medium">{new Date(r.date).toLocaleDateString("uk-UA")}</td>
                    <td className="px-4 py-3 text-content-secondary text-right">{fmt(r.km)}</td>
                    <td className="px-4 py-3 text-content-secondary text-right">{fmt(r.fuel)} грн</td>
                    <td className="px-4 py-3 text-content-secondary text-right">{fmt(r.depreciation)} грн</td>
                    <td className="px-4 py-3 text-content-primary font-semibold text-right">{fmt(r.fuel + r.depreciation)} грн</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleDelete(r.id)} className="p-1 text-content-muted hover:text-red-500 transition-colors" aria-label="Видалити">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-2">
            <AnimatePresence mode="popLayout">
              {records.map((r) => (
                <motion.div key={r.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40 }}
                  className="bg-surface rounded-card shadow-soft border border-border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-content-primary">{new Date(r.date).toLocaleDateString("uk-UA")}</span>
                    <button onClick={() => handleDelete(r.id)} className="p-1 text-content-muted hover:text-red-500 transition-colors" aria-label="Видалити">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-2xs text-content-muted uppercase">Км</p>
                      <p className="text-sm font-semibold text-content-primary">{fmt(r.km)}</p>
                    </div>
                    <div>
                      <p className="text-2xs text-content-muted uppercase">Пальне</p>
                      <p className="text-sm font-semibold text-amber-600">{fmt(r.fuel)}</p>
                    </div>
                    <div>
                      <p className="text-2xs text-content-muted uppercase">Аморт.</p>
                      <p className="text-sm font-semibold text-content-primary">{fmt(r.depreciation)}</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-border flex justify-between items-center">
                    <span className="text-xs text-content-muted">Разом</span>
                    <span className="text-sm font-bold text-brand">{fmt(r.fuel + r.depreciation)} грн</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div className="bg-surface rounded-card shadow-soft border border-border p-4 md:p-5" variants={staggerContainer} initial="hidden" animate="visible">
            <h3 className="text-sm font-semibold text-content-primary mb-3">Підсумок</h3>
            <div className="grid grid-cols-3 gap-3">
              <motion.div variants={staggerItem}>
                <p className="text-2xs text-content-muted uppercase tracking-wide">Кілометри</p>
                <p className="text-lg font-bold text-content-primary">{fmt(totalKm)} км</p>
              </motion.div>
              <motion.div variants={staggerItem}>
                <p className="text-2xs text-content-muted uppercase tracking-wide">Пальне</p>
                <p className="text-lg font-bold text-amber-600">{fmt(totalFuel)} грн</p>
              </motion.div>
              <motion.div variants={staggerItem}>
                <p className="text-2xs text-content-muted uppercase tracking-wide">Амортизація</p>
                <p className="text-lg font-bold text-content-primary">{fmt(totalDepreciation)} грн</p>
              </motion.div>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <span className="text-xl font-bold text-brand">{fmt(totalFuel + totalDepreciation)} грн</span>
              <Button onClick={handleSubmit} disabled={createMutation.isPending} variant="primary" size="md">
                <Send className="w-4 h-4 mr-1.5" />
                Подати заявку
              </Button>
            </div>
          </motion.div>
        </>
      )}

      {!isLoading && submitted.length > 0 && (
        <motion.div className="bg-surface rounded-card shadow-soft border border-border p-4 md:p-5" variants={staggerContainer} initial="hidden" animate="visible">
          <h3 className="text-sm font-semibold text-content-primary mb-3">Подані заявки</h3>
          <div className="space-y-2">
            {submitted.map((r) => {
              const st = STATUS_LABELS[r.status];
              const Icon = st.icon;
              return (
                <motion.div key={r.id} variants={staggerItem}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-surface-muted rounded-xl">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-content-primary">
                      {new Date(r.date).toLocaleDateString("uk-UA")} — {fmt(r.km)} км
                    </div>
                    <div className="text-xs text-content-muted">
                      Пальне: {fmt(r.fuel)} грн · Аморт.: {fmt(r.depreciation)} грн · Разом: {fmt(r.totalAmount)} грн
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-pill border shrink-0 ${st.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {st.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
