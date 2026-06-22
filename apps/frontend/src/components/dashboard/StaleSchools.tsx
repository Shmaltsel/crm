import { useNavigate } from 'react-router-dom';

const STAGE_LABELS: Record<string, string> = {
  BASE:           'База',
  FIRST_CONTACT:  'Перший контакт',
  INTERESTED:     'Зацікавлені',
  PRE_APPROVAL:   'Попереднє погодження',
  DATE_CONFIRMED: 'Підтвердження дати',
  PREPARATION:    'Підготовка',
  IN_PROGRESS:    'Подія в роботі',
};

function daysColor(days: number): string {
  if (days >= 14) return 'text-red-600 bg-red-50';
  if (days >= 10) return 'text-orange-600 bg-orange-50';
  return 'text-amber-600 bg-amber-50';
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

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center">
            <span className="text-xs">⚠️</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">Потребують уваги</p>
        </div>
        <button
          onClick={() => navigate('/schools')}
          className="text-xs text-blue-600 hover:underline shrink-0"
        >
          Переглянути всі
        </button>
      </div>

      {schools.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-2xl mb-1">✅</p>
          <p className="text-sm text-slate-400">Усі школи активні</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-slate-50">
          {schools.map((school) => {
            const stageLabel = school.status ? STAGE_LABELS[school.status] ?? school.status : '—';
            const days = school.daysStale ?? 0;
            const colorClass = daysColor(days);

            return (
              <div
                key={school.id}
                onClick={() => navigate(`/schools/${school.id}`)}
                className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-slate-50/60 rounded-lg px-1 -mx-1 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <span className="text-sm">🏫</span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {school.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Статус: {stageLabel}
                  </p>
                </div>

                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${colorClass}`}>
                  {days} дн
                </span>
              </div>
            );
          })}
        </div>
      )}

      {schools.length > 0 && (
        <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
          Без активності понад 7 днів: {schools.length} шкіл
        </p>
      )}
    </div>
  );
}
