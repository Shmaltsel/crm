import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, emptyStateVariants } from '../../lib/motion';

const UA_WEEKDAYS = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const UA_MONTHS_SHORT = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = UA_MONTHS_SHORT[d.getMonth()];
  const weekday = UA_WEEKDAYS[d.getDay()];
  return `${day} ${month}, ${weekday}`;
}

interface Crew {
  id: string;
  name?: string;
  host?: { id: string; name: string } | null;
}

interface UpcomingEvent {
  id: string;
  date: string;
  time?: string | null;
  project: string;
  school?: { id: string; name: string } | null;
  city?: { id: string; name: string } | null;
  crew?: Crew | null;
}

interface Props {
  events: UpcomingEvent[];
}

export default function UpcomingEvents({ events }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-content-primary">Найближчі події (5 днів)</p>
        <button
          onClick={() => navigate('/calendar')}
          className="text-xs text-blue-600 hover:underline shrink-0 active:scale-[0.97] transition-transform duration-fast"
        >
          Перейти до календаря
        </button>
      </div>

      {events.length === 0 ? (
        <motion.div variants={emptyStateVariants} initial="hidden" animate="visible" className="py-6 text-center text-content-muted text-sm">
          Найближчими днями подій немає
        </motion.div>
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col divide-y divide-border">
          {events.map((ev) => {
            const crewName = ev.crew?.name ?? (ev.crew?.host?.name ?? null);

            return (
              <motion.div
                key={ev.id}
                variants={staggerItem}
                onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
                className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-surface-muted/60 rounded-lg px-1 -mx-1 transition-colors active:scale-[0.97]"
              >
                <div className="shrink-0 text-right w-24">
                  <p className="text-xs font-medium text-content-secondary">
                    {formatDate(ev.date)}
                  </p>
                  <p className="text-xs text-content-muted">{ev.time ?? '—:——'}</p>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-content-primary truncate">
                    {ev.school?.name ?? '—'}
                  </p>
                  <p className="text-xs text-content-muted truncate">{ev.project}</p>
                </div>

                {crewName && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
                    {crewName}
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
