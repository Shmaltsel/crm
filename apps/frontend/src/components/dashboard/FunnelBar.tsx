import { useNavigate } from 'react-router-dom';

const PIPELINE_STAGES = [
  { key: 'BASE',          name: 'База',                  sub: 'Усього шкіл',       icon: '🏫', color: 'text-slate-600',  bg: 'bg-slate-50',   border: 'border-slate-200' },
  { key: 'FIRST_CONTACT', name: 'Перший контакт',        sub: 'У роботі',          icon: '📞', color: 'text-blue-700',   bg: 'bg-blue-50',    border: 'border-blue-100'  },
  { key: 'INTERESTED',    name: 'Зацікавлені',           sub: 'У роботі',          icon: '⭐', color: 'text-amber-700',  bg: 'bg-amber-50',   border: 'border-amber-100' },
  { key: 'PRE_APPROVAL',  name: 'Попереднє погодження',  sub: 'Очікують',          icon: '🤝', color: 'text-purple-700', bg: 'bg-purple-50',  border: 'border-purple-100'},
  { key: 'DATE_CONFIRMED',name: 'Підтверджено дату',     sub: 'Заплановано',       icon: '📅', color: 'text-blue-700',   bg: 'bg-blue-50',    border: 'border-blue-100'  },
  { key: 'PREPARATION',   name: 'Підготовка',            sub: 'У роботі',          icon: '⚙️', color: 'text-orange-700', bg: 'bg-orange-50',  border: 'border-orange-100'},
  { key: 'IN_PROGRESS',   name: 'Подія в роботі',        sub: 'Активні',           icon: '▶️', color: 'text-teal-700',   bg: 'bg-teal-50',    border: 'border-teal-100'  },
  { key: 'DONE',          name: 'Проведено',             sub: 'Завершено',         icon: '✅', color: 'text-emerald-700',bg: 'bg-emerald-50', border: 'border-emerald-100'},
  { key: 'REPORT',        name: 'Звіт',                  sub: 'Очікують звіту',    icon: '📋', color: 'text-indigo-700', bg: 'bg-indigo-50',  border: 'border-indigo-100'},
  { key: 'RE_SALE',       name: 'Повторний продаж',      sub: 'Цей місяць',        icon: '🔄', color: 'text-green-700',  bg: 'bg-green-50',   border: 'border-green-100' },
];

// Відображаємо тільки ключові етапи воронки на дашборді
const VISIBLE_STAGES = ['BASE', 'FIRST_CONTACT', 'INTERESTED', 'DATE_CONFIRMED', 'PREPARATION', 'DONE'];

interface Props {
  funnel: Record<string, number>;
}

export default function FunnelBar({ funnel }: Props) {
  const navigate = useNavigate();

  const visibleStages = PIPELINE_STAGES.filter(s => VISIBLE_STAGES.includes(s.key));

  return (
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
        Воронка роботи зі школами
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {visibleStages.map((stage) => {
          const count = funnel[stage.key] ?? 0;
          return (
            <button
              key={stage.key}
              onClick={() => navigate('/schools')}
              className={`
                flex flex-col items-start p-3.5 rounded-xl border text-left
                transition-all duration-150 hover:shadow-sm hover:border-opacity-80 active:scale-[0.98]
                bg-white ${stage.border}
              `}
            >
              <div className={`w-8 h-8 rounded-lg ${stage.bg} flex items-center justify-center text-base mb-2.5`}>
                {stage.icon}
              </div>
              <span className={`text-2xl font-bold leading-none ${stage.color}`}>
                {count}
              </span>
              <span className="text-xs font-medium text-slate-700 mt-1.5 leading-tight">
                {stage.name}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {stage.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
