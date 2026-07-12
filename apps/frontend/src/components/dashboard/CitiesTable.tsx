import { useNavigate } from 'react-router-dom';

function fmt(n: unknown): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));
}

function plural(n: number, one: string, few: string, many: string): string {
  const mod10  = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

interface CityRow {
  cityId:       string;
  cityName:     string;
  schoolsCount: number;
  activeEvents: number;
  monthRevenue: number;
}

interface Props {
  rows: CityRow[];
}

export default function CitiesTable({ rows }: Props) {
  const navigate = useNavigate();

  const totals = rows.reduce(
    (acc, r) => {
      acc.schools  += r.schoolsCount;
      acc.events   += r.activeEvents;
      acc.revenue  += r.monthRevenue;
      return acc;
    },
    { schools: 0, events: 0, revenue: 0 },
  );

  return (
    <div className="mobile-card">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-purple-50 flex items-center justify-center">
            <span className="text-xs">🗺️</span>
          </div>
          <p className="text-sm font-semibold text-content-primary">Стан по містах</p>
        </div>
        <button
          onClick={() => navigate('/cities')}
          className="text-xs text-blue-600 hover:underline active:scale-[0.97] transition-transform duration-fast"
        >
          Переглянути всі
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 px-4 swiper-no-swiping" style={{ touchAction: "pan-y" }}>
        <table className="w-full text-left border-collapse min-w-[380px]">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-2 text-xs font-medium text-content-muted pr-3">Місто</th>
              <th className="pb-2 text-xs font-medium text-content-muted text-right pr-3">Шкіл</th>
              <th className="pb-2 text-xs font-medium text-content-muted text-right pr-3">Активних подій</th>
              <th className="pb-2 text-xs font-medium text-content-muted text-right">Виручка місяця</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.cityId}
                onClick={() => navigate(`/cities/${row.cityId}`)}
                className="border-b border-border cursor-pointer hover:bg-surface-muted/60 transition-colors"
              >
                <td className="py-2.5 pr-3">
                  <span className="text-sm font-medium text-content-primary">
                    {row.cityName}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-right">
                  <span className="text-sm text-content-secondary">{row.schoolsCount}</span>
                </td>
                <td className="py-2.5 pr-3 text-right">
                  {row.activeEvents > 0 ? (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {row.activeEvents}
                    </span>
                  ) : (
                    <span className="text-sm text-neutral-300">—</span>
                  )}
                </td>
                <td className="py-2.5 text-right">
                  {row.monthRevenue > 0 ? (
                    <span className="text-sm font-semibold text-content-primary">
                      {fmt(row.monthRevenue)} грн
                    </span>
                  ) : (
                    <span className="text-sm text-neutral-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          {/* Підсумок */}
          <tfoot>
            <tr className="border-t border-border-strong">
              <td className="pt-2.5 text-xs font-semibold text-content-muted">
                Усього
              </td>
              <td className="pt-2.5 text-right text-xs font-semibold text-content-secondary">
                {totals.schools}
              </td>
              <td className="pt-2.5 text-right text-xs font-semibold text-content-secondary">
                {totals.events}
              </td>
              <td className="pt-2.5 text-right text-xs font-semibold text-blue-700">
                {fmt(totals.revenue)} грн
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="text-xs text-content-muted mt-3 pt-3 border-t border-border">
        {rows.length} {plural(rows.length, 'місто', 'міста', 'міст')} · виручка за поточний місяць
      </p>
    </div>
  );
}
