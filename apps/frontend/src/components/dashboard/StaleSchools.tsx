import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

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
  loading?: boolean;
}

const COLLAPSED_COUNT = 3;

export default function StaleSchools({ schools, loading }: Props) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const sorted = useMemo(() =>
    [...schools].sort((a, b) => (b.daysStale ?? 0) - (a.daysStale ?? 0)),
    [schools]
  );

  const criticalCount = schools.filter((s) => (s.daysStale ?? 0) >= 21).length;
  const hasMore = sorted.length > COLLAPSED_COUNT;
  const visible = expanded ? sorted : sorted.slice(0, COLLAPSED_COUNT);

  return (
    <div className="mobile-card flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center">
            <span className="text-xs">⚠️</span>
          </div>
          <p className="text-sm font-semibold text-content-primary">
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

      {loading ? (
        <div className="animate-pulse space-y-3 py-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-border-strong" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-neutral-100 rounded w-2/3" />
                <div className="h-2 bg-neutral-100 rounded w-1/3" />
                <div className="h-1 bg-neutral-100 rounded w-full" />
              </div>
              <div className="h-5 bg-neutral-100 rounded-full w-12" />
            </div>
          ))}
        </div>
      ) : schools.length === 0 ? (
        <div className="py-6 text-center empty-state-enter">
          <p className="text-2xl mb-1">✅</p>
          <p className="text-sm text-content-muted">Усі школи в тонусі 🎉</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1 stagger-container">
            {visible.map((school) => {
              const days = school.daysStale ?? 0;
              const tier = getTier(days);
              const stageLabel = school.status
                ? (STAGE_LABELS[school.status] ?? school.status)
                : "—";
              const width = barWidth(days);

              return (
                <div
                  key={school.id}
                  onClick={() => navigate(`/schools/${school.id}`)}
                  className={`group relative flex items-center gap-3 py-2.5 px-2 -mx-1 rounded-xl cursor-pointer transition-colors ${tier.row}`}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${tier.dot}`} />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-content-primary truncate leading-tight">
                      {school.name}
                    </p>
                    <p className="text-xs text-content-muted mt-0.5 mb-1.5">
                      {stageLabel}
                    </p>

                    <div className="h-1 w-full bg-surface-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${tier.bar}`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${tier.badge}`}
                  >
                    {days} дн
                  </span>
                </div>
              );
            })}
          </div>

          {hasMore && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-2.5 pt-2.5 border-t border-border text-2xs text-brand hover:underline text-center w-full active:scale-[0.97] transition-transform duration-fast"
            >
              {expanded
                ? "↑ Згорнути"
                : `↓ Показати ще ${sorted.length - COLLAPSED_COUNT}`}
            </button>
          )}
        </>
      )}

      {schools.length > 0 && (
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
          {TIERS.map((t) => {
            const count = schools.filter(
              (s) => (s.daysStale ?? 0) >= t.min && (s.daysStale ?? 0) <= t.max,
            ).length;
            if (count === 0) return null;
            return (
              <span
                key={t.label}
                className="flex items-center gap-1 text-xs text-content-muted"
              >
                {t.emoji}{" "}
                <span className="font-medium text-content-secondary">{count}</span>{" "}
                {t.label.toLowerCase()}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
