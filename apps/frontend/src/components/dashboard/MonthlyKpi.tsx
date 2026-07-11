import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, useHoverCapable } from '../../lib/motion';

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
  const hoverCapable = useHoverCapable();
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
    <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-content-primary">
          Фінанси —{' '}
          <span className="font-normal text-content-muted capitalize">
            {monthLabel} {yearLabel}
          </span>
        </p>
        <button
          onClick={() => navigate('/finance')}
          className="text-xs text-blue-600 hover:underline shrink-0 active:scale-[0.97] transition-transform duration-fast"
        >
          Детальніше
        </button>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-3 gap-3">
        {tiles.map((tile) => (
          <motion.div
            key={tile.label}
            variants={staggerItem}
            whileHover={hoverCapable ? "hover" : undefined}
            initial="rest"
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
            <p className="text-xs text-content-muted mt-1">{tile.sub}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
