import React from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { School, PipelineStage } from "../../types";

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

const CATEGORY_BADGES: Record<string, { label: string; className: string }> = {
  planned: {
    label: "Заплановано",
    className: "bg-blue-50 text-blue-600 border-blue-100",
  },
  inProgress: {
    label: "У процесі",
    className: "bg-amber-50 text-amber-600 border-amber-100",
  },
  done: {
    label: "Проведено",
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
};

export const SchoolRow = React.memo(
  ({ school, onDelete, stages, navigate }: SchoolRowProps) => {
    const latestEvent = school.events?.[0];
    const stage = latestEvent
      ? stages.find((s) => s.key === latestEvent.status)
      : null;
    const categories = (school as any).categories as string[] | undefined;

    return (
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => navigate(`/schools/${school.id}`)}
        className="border-b border-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer"
      >
        <td className="p-4 font-bold text-slate-800 max-w-0 w-full">
          <span className="block truncate" title={school.name}>
            {school.name}
          </span>
        </td>
        <td className="p-4 font-medium text-slate-600">{school.city?.name}</td>
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
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${CATEGORY_BADGES[cat]?.className ?? "bg-slate-50 text-slate-500 border-slate-100"}`}
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
            <span className="text-slate-400 text-xs italic">—</span>
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
    <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0 custom-scrollbar">
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-left border-collapse table-fixed">
          <colgroup>
            <col style={{ width: "42%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr className="border-b border-slate-100">
              <th className="p-4 font-medium text-slate-600">Назва школи</th>
              <th className="p-4 font-medium text-slate-600">Місто</th>
              <th className="p-4 font-medium text-slate-600">Статус</th>
              <th className="p-4 font-medium text-slate-600">Поточний етап</th>
              <th className="p-4 font-medium text-slate-600 text-center">
                Дія
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
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
          </tbody>
        </table>
        {schools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-slate-400 text-sm font-medium"
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
