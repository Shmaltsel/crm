import { useNavigate } from 'react-router-dom';

const STAGE_COLORS = ['#185fa5', '#0f6e56', '#534ab7', '#854f0b', '#993c1d', '#3b6d11'];

interface CrewMember {
  id: string;
  name: string;
}

interface Crew {
  id: string;
  name?: string;
  host?: CrewMember | null;
  driver?: CrewMember | null;
}

interface School {
  id: string;
  name: string;
}

interface TodayEvent {
  id: string;
  time?: string | null;
  project: string;
  school?: School | null;
  crew?: Crew | null;
}

interface Props {
  events: TodayEvent[];
}

export default function TodayEvents({ events }: Props) {
  const navigate = useNavigate();
  const today = new Date();
  const dateLabel = today.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col gap-0">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">Сьогоднішні події</p>
          <p className="text-xs text-slate-400 mt-0.5 capitalize">{dateLabel}</p>
        </div>
        <button
          onClick={() => navigate('/calendar')}
          className="text-xs text-blue-600 hover:underline shrink-0"
        >
          Переглянути всі
        </button>
      </div>

      {events.length === 0 ? (
        <div className="py-6 text-center text-slate-400 text-sm">
          Сьогодні подій немає
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-slate-50">
          {events.map((ev, idx) => {
            const dotColor = STAGE_COLORS[idx % STAGE_COLORS.length];
            const crewName = ev.crew?.name
              ?? (ev.crew?.host?.name ? `${ev.crew.host.name}` : null)
              ?? '—';

            return (
              <div
                key={ev.id}
                onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
                className="flex items-start gap-3 py-2.5 cursor-pointer hover:bg-slate-50/60 rounded-lg px-1 -mx-1 transition-colors"
              >
                <span className="text-xs font-medium text-slate-500 w-11 pt-0.5 shrink-0">
                  {ev.time ?? '—:——'}
                </span>
                <span
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: dotColor }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {ev.school?.name ?? '—'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{ev.project}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                      {crewName}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
        Усього на сьогодні: {events.length} {events.length === 1 ? 'подія' : events.length < 5 ? 'події' : 'подій'}
      </p>
    </div>
  );
}
