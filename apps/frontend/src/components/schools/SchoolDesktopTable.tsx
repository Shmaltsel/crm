import { useNavigate } from "react-router-dom";

interface Props {
  schools: any[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: any[];
}

export default function SchoolDesktopTable({ schools, searchQuery, onDelete, stages }: Props) {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0">
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 font-medium text-slate-600">Назва школи</th>
              <th className="p-4 font-medium text-slate-600">Місто</th>
              <th className="p-4 font-medium text-slate-600">Статус</th>
              <th className="p-4 font-medium text-slate-600">Поточний етап</th>
              <th className="p-4 font-medium text-slate-600 text-center">Дія</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => {
              const latestEvent = school.events?.[0];
              const stage = latestEvent ? stages.find((s) => s.key === latestEvent.status) : null;
              return (
                <tr
                  key={school.id}
                  onClick={() => navigate(`/schools/${school.id}`)}
                  className="cursor-pointer border-b border-slate-50 hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-4 text-slate-800 font-bold">{school.name}</td>
                  <td className="p-4 text-slate-600 font-medium">{school.city?.name}</td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                      Активна
                    </span>
                  </td>
                  <td className="p-4">
                    {stage ? (
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                        {stage.name}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs italic">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={(e) => onDelete(e, school.id, school.name)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-2 text-lg"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {schools.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm font-medium">
            {searchQuery ? `Нічого не знайдено за «${searchQuery}»` : "Шкіл ще немає"}
          </div>
        )}
      </div>
    </div>
  );
}
