import { useNavigate } from "react-router-dom";

interface Props {
  schools: any[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: any[];
}

function stalenessColor(days: number | null): string {
  if (days === null) return 'text-slate-400';
  if (days >= 21)   return 'text-red-500';
  if (days >= 14)   return 'text-orange-500';
  if (days >= 7)    return 'text-amber-500';
  return 'text-emerald-500';
}

export default function SchoolMobileList({ schools, searchQuery, onDelete, stages }: Props) {
  const navigate = useNavigate();

  return (
    <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-2.5 pb-24">
      {schools.map((school) => {
        const latestEvent = school.events?.[0];
        const stage = latestEvent ? stages.find((s) => s.key === latestEvent.status) : null;

        const lastActivityDate = school.events?.[0]?.updatedAt ?? school.updatedAt ?? null;
        const daysStale = lastActivityDate
          ? Math.floor((Date.now() - new Date(lastActivityDate).getTime()) / 86400000)
          : null;

        return (
          <div
            key={school.id}
            onClick={() => navigate(`/schools/${school.id}`)}
            className="bg-white rounded-2xl border border-slate-100 p-3.5 active:scale-[0.99] transition-transform"
          >
            {/* Рядок 1: назва + видалити */}
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
                {school.name}
              </p>
              <button
                onClick={(e) => onDelete(e, school.id, school.name)}
                className="text-slate-300 active:text-red-500 transition-colors p-1 -mt-0.5 -mr-1 shrink-0"
              >
                🗑
              </button>
            </div>

            {/* Рядок 2: телефон/директор + етап */}
            <div className="flex items-center justify-between gap-2 mt-2">
              <div className="flex items-center gap-1.5 min-w-0">
                {school.phone ? (
                  <a>
                    href={`tel:${school.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs text-blue-600 font-medium truncate"
                  
                    📞 {school.director || school.phone}
                  </a>
                ) : school.director ? (
                  <span className="text-xs text-slate-500 truncate">👤 {school.director}</span>
                ) : (
                  <span className="text-xs text-slate-300 italic">Контакт не вказано</span>
                )}
              </div>

              {stage ? (
                <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100 shrink-0 font-medium">
                  {stage.name}
                </span>
              ) : (
                <span className="text-[10px] text-slate-300 shrink-0">Етап —</span>
              )}
            </div>

            {/* Рядок 3: остання активність */}
            {daysStale !== null && (
              <p className={`text-[11px] mt-1.5 ${stalenessColor(daysStale)}`}>
                ⏱ {daysStale === 0
                  ? 'Активність сьогодні'
                  : `Остання активність ${daysStale} дн тому`}
              </p>
            )}
          </div>
        );
      })}

      {schools.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 text-center py-10 text-slate-400 text-sm">
          {searchQuery ? `Нічого не знайдено за «${searchQuery}»` : "Шкіл ще немає"}
        </div>
      )}
    </div>
  );
}