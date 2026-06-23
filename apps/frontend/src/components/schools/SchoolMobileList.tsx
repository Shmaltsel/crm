import { useNavigate } from "react-router-dom";

interface Props {
  schools: any[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: any[];
}

export default function SchoolMobileList({ schools, searchQuery, onDelete, stages }: Props) {
  const navigate = useNavigate();

  return (
    <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-3 pb-24">
      {schools.map((school) => {
        const latestEvent = school.events?.[0];
        const stage = latestEvent ? stages.find((s) => s.key === latestEvent.status) : null;
        
        return (
          <div
            key={school.id}
            onClick={() => navigate(`/schools/${school.id}`)}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 active:scale-[0.99] transition-transform"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-slate-800 text-base leading-snug">
                  {school.name}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  {school.city?.name}
                </p>
              </div>
              <button
                onClick={(e) => onDelete(e, school.id, school.name)}
                className="text-slate-300 hover:text-red-500 active:text-red-500 transition-colors p-2 -mr-2 -mt-1 shrink-0 text-lg"
              >
                🗑
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[11px] font-bold">
                Активна
              </span>
              {stage ? (
                <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold border border-blue-100">
                  {stage.name}
                </span>
              ) : (
                <span className="text-slate-400 text-[11px] italic">
                  Етап не визначено
                </span>
              )}
            </div>
          </div>
        );
      })}
      {schools.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 text-center py-10 text-slate-400 text-sm font-medium shadow-sm">
          {searchQuery ? `Нічого не знайдено за «${searchQuery}»` : "Шкіл ще немає"}
        </div>
      )}
    </div>
  );
}