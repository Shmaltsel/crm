import { useNavigate } from 'react-router-dom';

function fmt(n: unknown): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));
}

interface MonthlyKpi {
  revenue:  number;
  profit:   number;
  children: number;
  count:    number;
}

interface Props {
  kpi: MonthlyKpi;
}

const UA_MONTHS = [
  'січень','лютий','березень','квітень','травень','червень',
  'липень','серпень','вересень','жовтень','листопад','грудень',
];

export default function MonthlyKpi({ kpi }: Props) {
  const navigate = useNavigate();
  const now = new Date();
  const monthLabel = UA_MONTHS[now.getMonth()];
  const yearLabel  = now.getFullYear();

  const margin = kpi.revenue > 0
    ? Math.round((kpi.profit / kpi.revenue) * 100)
    : 0;

  const tiles = [
    {
      label: 'Виручка',
      value: `${fmt(kpi.revenue)} грн`,
      sub:   kpi.count > 0 ? `${kpi.count} ${kpi.count === 1 ? 'подія' : kpi.count < 5 ? 'події' : 'подій'}` : 'Подій ще немає',
      icon:  '💰',
      color: 'text-blue-700',
      bg:    'bg-blue-50',
    },
    {
      label: 'Прибуток',
      value: `${fmt(kpi.profit)} грн`,
      sub:   `Маржа ${margin}%`,
      icon:  '📈',
      color: 'text-emerald-700',
      bg:    'bg-emerald-50',
    },
    {
      label: 'Дітей охоплено',
      value: fmt(kpi.children),
      sub:   kpi.count > 0 && kpi.children > 0
        ? `~${Math.round(kpi.children / kpi.count)} на подію`
        : '—',
      icon:  '👦',
      color: 'text-purple-700',
      bg:    'bg-purple-50',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-slate-800">
          Фінанси —{' '}
          <span className="font-normal text-slate-500 capitalize">
            {monthLabel} {yearLabel}
          </span>
        </p>
        <button
          onClick={() => navigate('/finance')}
          className="text-xs text-blue-600 hover:underline shrink-0"
        >
          Детальніше
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={`rounded-xl p-3 ${tile.bg}`}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-base">{tile.icon}</span>
              <span className={`text-xs font-medium ${tile.color}`}>
                {tile.label}
              </span>
            </div>
            <p className={`text-lg font-bold leading-none ${tile.color}`}>
              {tile.value}
            </p>
            <p className="text-xs text-slate-400 mt-1">{tile.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
