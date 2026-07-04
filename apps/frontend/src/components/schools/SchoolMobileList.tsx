import React from "react";
import { useNavigate } from "react-router-dom";
import type { School, PipelineStage } from "../../types";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
}

interface SchoolCardProps {
  school: School;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  index?: number;
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

export const SchoolCard = React.memo(
  ({ school, onDelete, stages, index = 0 }: SchoolCardProps) => {
    const navigate = useNavigate();
    const latestEvent = school.events?.[0];
    const stage = latestEvent
      ? stages.find((s) => s.key === latestEvent.status)
      : null;
    const categories = (school as any).categories as string[] | undefined;

    return (
      <div
        className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-200 cursor-pointer active:scale-[0.99]"
        onClick={() => navigate(`/schools/${school.id}`)}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
            {school.name}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e, school.id, school.name);
            }}
            className="text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all p-2 rounded-lg"
          >
            🗑
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 mt-2">
          {school.phone ? (
            <a
              href={`tel:${school.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-blue-600 font-medium truncate"
            >
              📞 {school.director || school.phone}
            </a>
          ) : (
            <span className="text-xs text-slate-500 truncate">
              👤 {school.director || "Контакт не вказано"}
            </span>
          )}
          {categories && categories.length > 0 ? (
            <div className="flex flex-wrap gap-1 justify-end">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${CATEGORY_BADGES[cat]?.className ?? "bg-slate-50 text-slate-500 border-slate-100"}`}
                >
                  {CATEGORY_BADGES[cat]?.label ?? cat}
                </span>
              ))}
            </div>
          ) : (
            stage && (
              <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
                {stage.name}
              </span>
            )
          )}
        </div>
      </div>
    );
  },
);

SchoolCard.displayName = "SchoolCard";

export default function SchoolMobileList({
  schools,
  searchQuery,
  onDelete,
  stages,
}: Props) {
  return (
    <>
      <style>{`
        @keyframes schoolRowIn {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .school-row-enter {
          animation: schoolRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
        }
      `}</style>
      <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-3 pb-24 px-1 custom-scrollbar">
        {schools.map((school, index) => (
          <SchoolCard
            key={school.id}
            school={school}
            index={index}
            onDelete={onDelete}
            stages={stages}
          />
        ))}

        {schools.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <p>
              {searchQuery
                ? `Нічого не знайдено за «${searchQuery}»`
                : "Шкіл ще немає"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
