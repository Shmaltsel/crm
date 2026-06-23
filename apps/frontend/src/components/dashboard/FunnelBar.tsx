import { useNavigate } from 'react-router-dom';

const PIPELINE_STAGES = [
  { key: 'BASE',           name: 'База',             icon: '🏫', color: 'text-slate-600',   bg: 'bg-slate-100',   bar: 'bg-slate-400'   },
  { key: 'FIRST_CONTACT',  name: 'Перший контакт',   icon: '📞', color: 'text-blue-700',    bg: 'bg-blue-50',     bar: 'bg-blue-500'    },
  { key: 'INTERESTED',     name: 'Зацікавлені',      icon: '⭐', color: 'text-amber-700',   bg: 'bg-amber-50',    bar: 'bg-amber-400'   },
  { key: 'DATE_CONFIRMED', name: 'Підтверджено дату',icon: '📅', color: 'text-purple-700',  bg: 'bg-purple-50',   bar: 'bg-purple-500'  },
  { key: 'PREPARATION',    name: 'Підготовка',       icon: '⚙️', color: 'text-orange-700',  bg: 'bg-orange-50',   bar: 'bg-orange-400'  },
  { key: 'DONE',           name: 'Проведено',        icon: '✅', color: 'text-emerald-700', bg: 'bg-emerald-50',  bar: 'bg-emerald-500' },
];

interface Props {
  funnel: Record<string, number>;
}

export default function FunnelBar({ funnel }: Props) {
  const navigate = useNavigate();

  const base  = funnel['BASE'] ?? 0;
  const done  = funnel['DONE'] ?? 0;
  // Прогрес = скільки шкіл дійшло до DONE відносно бази
  const progress = base > 0 ? Math.round((done / base) * 100) : 0;

  // Для mini-bar: максимум серед усіх видимих стадій
  const counts = PIPELINE_STAGES.map(s => funnel[s.key] ?? 0);
  const maxCount = Math.max(...counts, 1);

  return (
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
        Воронка роботи зі школами
      </p>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">

        {/* Прогрес по місту */}
        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-xs text-slate-500">Прогрес по місту</span>
            <span className="text-sm font-bold text-slate-800">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {done} з {base} шкіл дійшли до проведення події
          </p>
        </div>

        {/* Стадії */}
        <div className="flex flex-col gap-2">
          {PIPELINE_STAGES.map((stage) => {
            const count    = funnel[stage.key] ?? 0;
            const barWidth = Math.round((count / maxCount) * 100);

            return (
              <button
                key={stage.key}
                onClick={() => navigate('/schools')}
                className="flex items-center gap-3 group w-full text-left"
              >
                {/* Іконка */}
                <div className={`w-6 h-6 rounded-md ${stage.bg} flex items-center justify-center text-xs shrink-0`}>
                  {stage.icon}
                </div>

                {/* Назва */}
                <span className="text-xs text-slate-600 w-36 shrink-0 truncate group-hover:text-slate-900 transition-colors">
                  {stage.name}
                </span>

                {/* Бар */}
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${stage.bar}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                {/* Кількість */}
                <span className={`text-xs font-bold w-6 text-right shrink-0 ${stage.color}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}