import React from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fadeVariants, staggerContainer, staggerItem, TRANSITION, useHoverCapable } from "../../lib/motion";
import type { School, PipelineStage } from "../../types";
import { CATEGORY_BADGES } from "../../constants/categoryBadges";
import { withViewTransition } from "../../lib/viewTransition";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
}

interface SchoolRowProps {
  school: School;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  navigate: NavigateFunction;
}

export const SchoolRow = React.memo(
  ({ school, onDelete, stages, navigate }: SchoolRowProps) => {
    const hoverCapable = useHoverCapable();
    const latestEvent = school.events?.[0];
    const stage = latestEvent
      ? stages.find((s) => s.key === latestEvent.status)
      : null;
    const categories = (school as any).categories as string[] | undefined;

    return (
      <motion.tr
        variants={staggerItem}
        onClick={() => withViewTransition(() => navigate(`/schools/${school.id}`))}
        className="border-b border-border transition-colors cursor-pointer"
        whileHover={hoverCapable ? { backgroundColor: "rgba(239, 246, 255, 0.5)" } : undefined}
        transition={TRANSITION.hover}
        style={{ viewTransitionName: `school-card-${school.id}` } as React.CSSProperties}
      >
        <td className="p-4 font-bold text-content-primary overflow-hidden">
          <span className="block truncate" title={school.name}>
            {school.name}
          </span>
        </td>
        <td className="p-4 font-medium text-content-secondary">{school.city?.name}</td>
        <td className="p-4">
          <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
            Активна
          </span>
        </td>
        <td className="p-4">
          {categories && categories.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${CATEGORY_BADGES[cat]?.className ?? "bg-surface-muted text-content-muted border-border"}`}
                >
                  {CATEGORY_BADGES[cat]?.label ?? cat}
                </span>
              ))}
            </div>
          ) : stage ? (
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
              {stage.name}
            </span>
          ) : (
            <span className="text-content-muted text-xs italic">—</span>
          )}
        </td>
        <td className="p-4 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e, school.id, school.name);
            }}
            className="p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all text-lg"
          >
            🗑
          </button>
        </td>
      </motion.tr>
    );
  },
);

SchoolRow.displayName = "SchoolRow";

export default function SchoolDesktopTable({
  schools,
  searchQuery,
  onDelete,
  stages,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-border overflow-hidden min-h-0 min-w-0 custom-scrollbar">
      <div className="overflow-y-auto flex-1 min-w-0">
        <table className="w-full text-left border-collapse table-fixed">
          <colgroup>
            <col style={{ width: "42%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead className="sticky top-0 z-10 bg-surface-muted">
            <tr className="border-b border-border">
              <th className="p-4 font-medium text-content-secondary">Назва школи</th>
              <th className="p-4 font-medium text-content-secondary">Місто</th>
              <th className="p-4 font-medium text-content-secondary">Статус</th>
              <th className="p-4 font-medium text-content-secondary">Поточний етап</th>
              <th className="p-4 font-medium text-content-secondary text-center">
                Дія
              </th>
            </tr>
          </thead>
          <motion.tbody
            className="divide-y divide-border"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {schools.map((school) => (
                <SchoolRow
                  key={school.id}
                  school={school}
                  onDelete={onDelete}
                  stages={stages}
                  navigate={navigate}
                />
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
        {schools.length === 0 && (
          <motion.div
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            className="text-center py-16 text-content-muted text-sm font-medium"
          >
            {searchQuery
              ? `Нічого не знайдено за «${searchQuery}»`
              : "Шкіл ще немає"}
          </motion.div>
        )}
      </div>
    </div>
  );
}
