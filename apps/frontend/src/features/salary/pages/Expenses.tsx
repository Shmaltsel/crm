import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "../../../config/api";
import { useSelectedCity } from "../../../context/CityContext";
import { useAuth } from "../../../context/AuthContext";
import type { FinanceDashboardData, ManualExpense } from "../../../types";
import { staggerContainer, staggerItem, useCountUp, fabVariants } from "../../../lib/motion";
import {
  useManualExpenses,
  useCreateManualExpense,
  useUpdateManualExpense,
  useDeleteManualExpense,
} from "../../../hooks/useManualExpenses";
import { ManualExpenseModal } from "../../../components/finance/ManualExpenseModal";
import { ExpenseDetailModal } from "../../../components/finance/ExpenseDetailModal";

const ExpenseChart = lazy(() =>
  import("../../../components/finance/FinanceCharts").then((m) => ({ default: m.ExpenseChart }))
);

function Skeleton() {
  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-surface-muted rounded-control w-48" />
      <div className="h-24 bg-surface rounded-card border border-border" />
      <div className="h-64 bg-surface rounded-card border border-border" />
    </div>
  );
}

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

export default function Expenses() {
  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();
  const [period, setPeriod] = useState("year");
  const [modalOpen, setModalOpen] = useState(false);
  const [editExpense, setEditExpense] = useState(null as null | { id: string; category: string; name?: string; description?: string; amount: number; date: string; cityId?: string });
  const [detailExpense, setDetailExpense] = useState<ManualExpense | null>(null);

  const canManage = ["SUPERADMIN", "OWNER", "MANAGER"].includes(user?.role ?? "");

  const { data, isLoading } = useQuery({
    queryKey: ["finance", selectedCity.id, period],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (period) params.set("period", period);
      if (selectedCity?.id) params.set("cityId", selectedCity.id);
      const res = await api.get(`/finance/dashboard?${params}`);
      return res.data as FinanceDashboardData;
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: manualData } = useManualExpenses({
    period,
    cityId: selectedCity?.id,
    take: 50,
  });

  const createMutation = useCreateManualExpense();
  const updateMutation = useUpdateManualExpense();
  const deleteMutation = useDeleteManualExpense();

  const handleSave = async (formData: { category: string; name?: string; description?: string; amount: number; date: string; cityId?: string }) => {
    if (editExpense) {
      await updateMutation.mutateAsync({ id: editExpense.id, ...formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    setModalOpen(false);
    setEditExpense(null);
  };

  const handleEdit = (expense: typeof editExpense) => {
    setEditExpense(expense);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Видалити витрату?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleOpenCreate = () => {
    setEditExpense(null);
    setModalOpen(true);
  };

  if (isLoading || !data) return <Skeleton />;

  const totalExpenses = data.kpi?.totalExpenses ?? 0;
  const categories = [...(data.byExpenseCategory ?? [])].sort((a, b) => Number(b.value) - Number(a.value));
  const manualExpenses = manualData?.items ?? [];

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-content-primary">Витрати</h1>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="text-sm border border-border-strong rounded-control px-3 py-1.5 bg-surface"
          >
            <option value="year">Цей рік</option>
            <option value="quarter">Цей квартал</option>
            <option value="month">Цей місяць</option>
            <option value="all">За весь час</option>
          </select>
        </div>
        {canManage && (
          <button
            onClick={handleOpenCreate}
            className="hidden md:flex items-center gap-2 bg-brand text-white rounded-pill px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Додати витрату
          </button>
        )}
      </div>

      <ExpensesTotal value={totalExpenses} />

      {categories.length > 0 && (
        <Suspense fallback={<div className="h-64 bg-surface rounded-card animate-pulse" />}>
          <div className="bg-surface rounded-card shadow-soft border border-border p-5">
            <h3 className="text-sm font-semibold text-content-primary mb-4">Витрати по категоріях</h3>
            <ExpenseChart byExpenseCategory={categories} />
          </div>
        </Suspense>
      )}

      {categories.length > 0 && (
        <motion.div
          className="bg-surface rounded-card shadow-soft border border-border p-5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-sm font-semibold text-content-primary mb-3">Деталізація</h3>
          <div className="space-y-2">
            {categories.map((cat) => {
              const pct = totalExpenses > 0 ? Math.round((Number(cat.value) / Number(totalExpenses)) * 100) : 0;
              return (
                <motion.div key={cat.name} className="flex items-center justify-between py-2 border-b border-border last:border-0" variants={staggerItem}>
                  <span className="text-sm text-content-secondary">{cat.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-content-muted">{pct}%</span>
                    <span className="text-sm font-semibold text-content-primary">{fmt(cat.value)} грн</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {manualExpenses.length > 0 && (
        <motion.div
          className="bg-surface rounded-card shadow-soft border border-border p-5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-sm font-semibold text-content-primary mb-3">Ручні витрати</h3>
          <div className="space-y-2">
            {manualExpenses.map((exp) => (
              <motion.div
                key={exp.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer hover:bg-surface-muted/50 -mx-2 px-2 rounded-lg transition-colors"
                variants={staggerItem}
                onClick={() => setDetailExpense(exp)}
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-sm text-content-primary font-medium truncate">
                    {exp.category}{exp.name ? ` — ${exp.name}` : ""}
                  </span>
                  <span className="text-xs text-content-muted">
                    {new Date(exp.date).toLocaleDateString("uk-UA")}
                    {exp.city?.name ? ` · ${exp.city.name}` : ""}
                    {exp.createdBy?.name ? ` · ${exp.createdBy.name}` : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-semibold text-content-primary whitespace-nowrap">{fmt(exp.amount)} грн</span>
                  {canManage && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(exp); }} className="p-1 text-content-muted hover:text-brand transition-colors" aria-label="Редагувати">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(exp.id); }} className="p-1 text-content-muted hover:text-red-500 transition-colors" aria-label="Видалити">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {canManage && !modalOpen && (
        <motion.button
          onClick={handleOpenCreate}
          className="md:hidden fab"
          variants={fabVariants}
          initial="hidden"
          animate="visible"
          whileTap={{ scale: 0.9 }}
          aria-label="Додати витрату"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      )}

      <ManualExpenseModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditExpense(null); }}
        onSave={handleSave}
        expense={editExpense}
      />

      {detailExpense && (
        <ExpenseDetailModal
          isOpen={!!detailExpense}
          onClose={() => setDetailExpense(null)}
          expense={detailExpense}
        />
      )}
    </div>
  );
}

function ExpensesTotal({ value }: { value: number }) {
  const display = useCountUp(value, { duration: 0.9 });
  return (
    <div className="bg-surface rounded-card shadow-soft border border-border p-5">
      <p className="text-sm text-content-muted mb-1">Загальні витрати</p>
      <p className="text-3xl font-bold text-content-primary">{fmt(display)} <span className="text-lg text-content-muted">грн</span></p>
    </div>
  );
}
