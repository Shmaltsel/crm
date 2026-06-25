import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  schools: any[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: any[];
}

// 1. Експортуємо SchoolCard, щоб уникнути помилок при імпорті в інших файлах
export const SchoolCard = React.memo(({ school, onDelete, stages, index = 0 }: any) => {
  const navigate = useNavigate();
  const latestEvent = school.events?.[0];
  const stage = latestEvent
    ? stages.find((s: any) => s.key === latestEvent.status)
    : null;

  return (
    <div
      className="school-row-enter bg-white rounded-2xl border border-slate-100 p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-200 cursor-pointer active:scale-[0.99]"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: "both" }}
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
        {stage && (
          <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
            {stage.name}
          </span>
        )}
      </div>
    </div>
  );
});

SchoolCard.displayName = "SchoolCard";

// 2. Головний компонент залишається default export
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
          <SchoolCard key={school.id} school={school} index={index} onDelete={onDelete} stages={stages} />
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
