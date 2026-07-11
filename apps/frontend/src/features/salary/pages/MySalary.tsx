import { motion } from "framer-motion";
import { useMySalary } from "../../../hooks/useSalary";
import { useAuth } from "../../../context/AuthContext";
import { useSelectedCity } from "../../../context/CityContext";
import SalaryStatusBadge from "../components/SalaryStatusBadge";
import { staggerContainer, staggerItem } from "../../../lib/motion";

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

export default function MySalary() {
  const { user } = useAuth();
  const { selectedCity } = useSelectedCity();
  const { data: records = [], isLoading } = useMySalary(
    user?.role === "MANAGER" || user?.role === "SUPERADMIN" ? undefined : selectedCity.id,
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="p-4">
        <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
          Ще немає нарахувань
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-4 space-y-3"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {records.map((r) => (
        <motion.div key={r.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm" variants={staggerItem} whileTap={{ scale: 0.98 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-800">{r.event?.project ?? "—"}</span>
            <SalaryStatusBadge status={r.status} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">{r.event?.date ? new Date(r.event.date).toLocaleDateString("uk-UA") : "—"}</span>
            <span className="font-bold text-blue-600">{fmt(r.amount)} грн</span>
          </div>
          {r.comment && <p className="text-xs text-slate-400 mt-1">{r.comment}</p>}
        </motion.div>
      ))}
    </motion.div>
  );
}
