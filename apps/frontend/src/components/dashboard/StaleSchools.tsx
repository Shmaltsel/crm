import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, emptyStateVariants } from "../../lib/motion";

const STAGE_LABELS: Record<string, string> = {
  BASE: "База",
  FIRST_CONTACT: "Перший контакт",
  INTERESTED: "Зацікавлені",
  PRE_APPROVAL: "Попереднє погодження",
  DATE_CONFIRMED: "Підтвердження дати",
  PREPARATION: "Підготовка",
  IN_PROGRESS: "Подія в роботі",
};

interface Tier {
  label: string;
  emoji: string;
  min: number;
  max: number;
  dot: string;
  badge: string;
  bar: string;
  row: string;
}

const TIERS: Tier[] = [
  {
    label: "Критично",
    emoji: "🔴",
    min: 21,
    max: Infinity,
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700 border border-red-200",
    bar: "bg-red-500",
    row: "hover:bg-red-50/40",
  },
  {
    label: "Небезпечно",
    emoji: "🟠",
    min: 14,
    max: 20,
    dot: "bg-orange-400",
    badge: "bg-orange-100 text-orange-700 border border-orange-200",
    bar: "bg-orange-400",
    row: "hover:bg-orange-50/40",
  },
  {
    label: "Увага",
    emoji: "🟡",
    min: 7,
    max: 13,
    dot: "bg-amber-400",
    badge: "bg-amber-100 text-amber-700 border border-amber-200",
    bar: "bg-amber-400",
    row: "hover:bg-amber-50/30",
  },
];

function getTier(days: number): Tier {
  return TIERS.find((t) => days >= t.min && days <= t.max) ?? TIERS[2];
}

function barWidth(days: number): number {
  return Math.min(100, Math.round((days / 30) * 100));
}

interface StaleSchool {
  id: string;
  name: string;
  status: string | null;
  daysStale: number | null;
}

interface Props {
  schools: StaleSchool[];
}

export default function StaleSchools({ schools }: Props) {
  const navigate = useNavigate();

  const sorted = [...schools].sort(
    (a, b) => (b.daysStale ?? 0) - (a.daysStale ?? 0),
  );

  const criticalCount = schools.filter((s) => (s.daysStale ?? 0) >= 21).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
      {/* Хедер */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center">
            <span className="text-xs">⚠️</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            Потребують уваги
          </p>
          {criticalCount > 0 && (
            <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white leading-none">
              {criticalCount}
            </span>
          )}
        </div>
        <button
          onClick={() => navigate("/schools")}
          className="text-xs text-blue-600 hover:underline shrink-0 active:scale-[0.97] transition-transform duration-fast"
        >
          Переглянути всі
        </button>
      </div>

      {schools.length === 0 ? (
        <motion.div variants={emptyStateVariants} initial="hidden" animate="visible" className="py-6 text-center">
          <p className="text-2xl mb-1">✅</p>
          <p className="text-sm text-slate-400">Усі школи активні</p>
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-1">
          {sorted.map((school) => {
            const days = school.daysStale ?? 0;
            const tier = getTier(days);
            const stageLabel = school.status
              ? (STAGE_LABELS[school.status] ?? school.status)
              : "—";
            const width = barWidth(days);

            return (
              <motion.div
                key={school.id}
                variants={staggerItem}
                onClick={() => navigate(`/schools/${school.id}`)}
                className={`group relative flex items-center gap-3 py-2.5 px-2 -mx-1 rounded-xl cursor-pointer transition-colors ${tier.row}`}
              >
                {/* Кольорова крапка-індикатор */}
                <div className={`w-2 h-2 rounded-full shrink-0 ${tier.dot}`} />

                {/* Назва + стадія + прогрес-бар */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 truncate leading-tight">
                    {school.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 mb-1.5">
                    {stageLabel}
                  </p>

                  {/* Heat bar */}
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${tier.bar}`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>

                {/* Badge з днями */}
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${tier.badge}`}
                >
                  {days} дн
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Футер — легенда тирів */}
      {schools.length > 0 && (
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-50">
          {TIERS.map((t) => {
            const count = schools.filter(
              (s) => (s.daysStale ?? 0) >= t.min && (s.daysStale ?? 0) <= t.max,
            ).length;
            if (count === 0) return null;
            return (
              <span
                key={t.label}
                className="flex items-center gap-1 text-xs text-slate-400"
              >
                {t.emoji}{" "}
                <span className="font-medium text-slate-600">{count}</span>{" "}
                {t.label.toLowerCase()}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
