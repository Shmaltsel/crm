import { motion } from "framer-motion";
import { useMySalary, useMySalarySummary } from "../../../hooks/useSalary";
import { useAuth } from "../../../context/AuthContext";
import { useSelectedCity } from "../../../context/CityContext";
import SalaryStatusBadge from "../components/SalaryStatusBadge";
import { staggerContainer, staggerItem } from "../../../lib/motion";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Wallet } from "lucide-react";

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

export default function MySalary() {
  const { user } = useAuth();
  const { selectedCity } = useSelectedCity();
  const { data: records = [], isLoading } = useMySalary(
    user?.role === "MANAGER" || user?.role === "SUPERADMIN" ? undefined : selectedCity.id,
  );
  const { data: summary } = useMySalarySummary();

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-surface rounded-card border border-border" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {summary && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface rounded-card border border-border p-3">
            <p className="text-2xs text-content-muted uppercase tracking-wide">Баланс</p>
            <p className="text-lg font-bold text-brand">{fmt(summary.balance)} грн</p>
          </div>
          <div className="bg-surface rounded-card border border-border p-3">
            <p className="text-2xs text-content-muted uppercase tracking-wide">Виплачено</p>
            <p className="text-lg font-bold text-success">{fmt(summary.totalPaid)} грн</p>
          </div>
          <div className="bg-surface rounded-card border border-border p-3">
            <p className="text-2xs text-content-muted uppercase tracking-wide">Нараховано</p>
            <p className="text-lg font-bold text-content-primary">{fmt(summary.totalAllocated)} грн</p>
          </div>
          <div className="bg-surface rounded-card border border-border p-3">
            <p className="text-2xs text-content-muted uppercase tracking-wide">Очікує</p>
            <p className="text-lg font-bold text-amber-600">{fmt(summary.pending)} грн</p>
          </div>
        </div>
      )}

      {records.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="Ще немає нарахувань"
          description="Нарахування з'являться після проведення подій"
        />
      ) : (
        <motion.div
          className="space-y-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {records.map((r) => (
            <motion.div key={r.id} className="bg-surface rounded-card border border-border p-4 shadow-soft" variants={staggerItem} whileTap={{ scale: 0.98 }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-content-primary">{r.event?.project ?? "—"}</span>
                <SalaryStatusBadge status={r.status} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-content-secondary">{r.event?.date ? new Date(r.event.date).toLocaleDateString("uk-UA") : "—"}</span>
                <span className="font-bold text-brand">{fmt(r.amount)} грн</span>
              </div>
              {r.comment && <p className="text-xs text-content-muted mt-1">{r.comment}</p>}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
