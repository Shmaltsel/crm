import React from "react";
export { classifySchool, classifySize } from "./schoolUtils";

interface StatsBarProps {
  statusStats: Record<string, number>;
  sizeStats: Record<string, number>;
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  sizeFilter: string | null;
  onSizeFilterChange: (filter: string | null) => void;
  schoolType?: "Школа" | "Садочок";
}


const STATUS_ITEMS = [
  {
    key: "new",
    label: "Нові",
    dot: "bg-slate-400",
    active: "bg-slate-800 text-white",
    inactive: "text-slate-600",
  },
  {
    key: "planned",
    label: "Заплановані",
    dot: "bg-amber-400",
    active: "bg-amber-500 text-white",
    inactive: "text-amber-600",
  },
  {
    key: "inProgress",
    label: "В роботі",
    dot: "bg-blue-500",
    active: "bg-blue-600 text-white",
    inactive: "text-blue-600",
  },
  {
    key: "notConfirmed",
    label: "Не підтв.",
    dot: "bg-rose-400",
    active: "bg-rose-600 text-white",
    inactive: "text-rose-600",
  },
  {
    key: "done",
    label: "Проведені",
    dot: "bg-emerald-500",
    active: "bg-emerald-600 text-white",
    inactive: "text-emerald-600",
  },
];

const SIZE_ITEMS_SCHOOL = [
  {
    key: "small",
    label: "Малі",
    sublabel: "< 150",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "medium",
    label: "Середні",
    sublabel: "150–500",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "large",
    label: "Великі",
    sublabel: "500+",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
];

const SIZE_ITEMS_KINDER = [
  {
    key: "small",
    label: "Малі",
    sublabel: "< 50",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "medium",
    label: "Середні",
    sublabel: "50–100",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "large",
    label: "Великі",
    sublabel: "100+",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
];

export default function StatsBar({
  statusStats,
  activeFilter,
  onFilterChange,
  sizeStats,
  sizeFilter,
  onSizeFilterChange,
  schoolType = "Школа",
}: StatsBarProps) {
  const sizeItems =
    schoolType === "Садочок" ? SIZE_ITEMS_KINDER : SIZE_ITEMS_SCHOOL;

  return (
    <div className="flex flex-col gap-2 mb-4">
      {/* Рядок 1: статус */}
      <div className="flex items-center bg-surface rounded-card shadow-card border border-border overflow-hidden">
        {STATUS_ITEMS.map((item, i) => {
          const isActive = activeFilter === item.key;
          return (
            <React.Fragment key={item.key}>
              {i > 0 && <div className="w-px h-8 bg-border shrink-0" />}
              <button
                onClick={() => onFilterChange(isActive ? null : item.key)}
                className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
                  isActive
                    ? item.active
                    : `bg-surface ${item.inactive} hover:bg-surface-muted`
                }`}
              >
                <span className="text-base font-bold tabular-nums leading-none">
                  {statusStats[item.key] ?? 0}
                </span>
                <span className="text-2xs mt-1 leading-none opacity-80 truncate w-full text-center">
                  {item.label}
                </span>
              </button>
            </React.Fragment>
          );
        })}
        {activeFilter && (
          <button
            onClick={() => onFilterChange(null)}
            className="px-3 text-content-muted hover:text-content-secondary text-lg shrink-0 border-l border-border self-stretch flex items-center"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center bg-surface rounded-card shadow-card border border-border overflow-hidden">
        {sizeItems.map((item, i) => {
          const isActive = sizeFilter === item.key;
          return (
            <React.Fragment key={item.key}>
              {i > 0 && <div className="w-px h-8 bg-border shrink-0" />}
              <button
                onClick={() => onSizeFilterChange(isActive ? null : item.key)}
                className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
                  isActive
                    ? item.active
                    : `bg-surface ${item.inactive} hover:bg-surface-muted`
                }`}
              >
                <span className="text-base font-bold tabular-nums leading-none">
                  {sizeStats[item.key] ?? 0}
                </span>
                <span className="text-2xs mt-1 leading-none opacity-80 truncate w-full text-center">
                  {item.label}
                  <span className="opacity-60 ml-0.5">{item.sublabel}</span>
                </span>
              </button>
            </React.Fragment>
          );
        })}
        {sizeFilter && (
          <button
            onClick={() => onSizeFilterChange(null)}
            className="px-3 text-content-muted hover:text-content-secondary text-lg shrink-0 border-l border-border self-stretch flex items-center"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
