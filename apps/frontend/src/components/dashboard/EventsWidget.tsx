import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, emptyStateVariants } from "../../lib/motion";

const UA_WEEKDAYS = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const UA_MONTHS_SHORT = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = UA_MONTHS_SHORT[d.getMonth()];
  const weekday = UA_WEEKDAYS[d.getDay()];
  return `${day} ${month}, ${weekday}`;
}

function plural(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return "подія";
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
    return "події";
  return "подій";
}

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

interface UpcomingEvent {
  id: string;
  date: string;
  time?: string | null;
  project: string;
  school?: School | null;
  crew?: Crew | null;
}

interface Props {
  todayEvents: TodayEvent[];
  upcomingEvents: UpcomingEvent[];
}

function EventRow({ 
  ev, 
  hasCrew, 
  crewLabel, 
  onClick, 
  buttonText, 
  buttonVariant,
  timeLabel 
}: {
  ev: TodayEvent | UpcomingEvent;
  hasCrew: boolean;
  crewLabel: string | null;
  onClick: () => void;
  buttonText: string;
  buttonVariant: "crew" | "no-crew";
  timeLabel: string;
}) {
  return (
    <motion.div
      key={ev.id}
      variants={staggerItem}
      onClick={onClick}
      className={`rounded-control border p-3 flex flex-col gap-2 ${
        hasCrew
          ? "border-border bg-surface"
          : "border-warning/30 bg-warning-subtle"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-content-primary tabular-nums shrink-0">
          {timeLabel}
        </span>
        <span className="text-2xs text-content-muted truncate">
          {ev.project}
        </span>
      </div>

      <p className="text-sm font-semibold text-content-primary leading-snug line-clamp-2">
        {ev.school?.name ?? "—"}
      </p>

      <div className="flex items-center justify-between gap-2">
        {hasCrew ? (
          <span className="badge-success text-2xs px-2 py-0.5 rounded-pill font-medium shrink-0">
            {crewLabel ?? "Екіпаж призначено"}
          </span>
        ) : (
          <span className="badge-warning text-2xs px-2 py-0.5 rounded-pill font-medium shrink-0">
            Немає екіпажу
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={`text-2xs font-semibold px-2.5 py-1 rounded-control transition-colors transition-transform shrink-0 active:scale-95 ${
            buttonVariant === "crew"
              ? "bg-surface-muted text-content-secondary hover:bg-border-strong"
              : "bg-surface border border-warning text-warning-600 hover:bg-warning-subtle"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
}

export default function EventsWidget({ todayEvents, upcomingEvents }: Props) {
  const navigate = useNavigate();

  const dateLabel = new Date().toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  return (
    <div className="mobile-card flex flex-col">
      {/* Сьогодні */}
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2.5">
          <div>
            <p className="text-sm font-semibold text-content-primary">
              Сьогоднішні події
            </p>
            <p className="text-2xs text-content-muted mt-0.5 capitalize">
              {dateLabel}
            </p>
          </div>
          <button
            onClick={() => navigate("/calendar")}
            className="text-2xs text-brand hover:underline shrink-0 active:scale-[0.97] transition-transform duration-fast"
          >
            Календар
          </button>
        </div>

        {todayEvents.length === 0 ? (
          <motion.div variants={emptyStateVariants} initial="hidden" animate="visible" className="py-5 text-center text-content-muted text-sm">
            Сьогодні подій немає
          </motion.div>
        ) : (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-1.5">
            {todayEvents.map((ev) => {
              const hasCrew = !!ev.crew;
              const crewLabel = ev.crew?.name ?? ev.crew?.host?.name ?? null;

              return (
                <EventRow
                  ev={ev}
                  hasCrew={hasCrew}
                  crewLabel={crewLabel}
                  onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
                  buttonText={hasCrew ? "Відкрити →" : "Призначити →"}
                  buttonVariant={hasCrew ? "crew" : "no-crew"}
                  timeLabel={ev.time ?? "—:——"}
                />
              );
            })}
          </motion.div>
        )}

        <p className="text-2xs text-content-muted mt-2.5 pt-2.5 border-t border-border">
          Усього на сьогодні: {todayEvents.length} {plural(todayEvents.length)}
        </p>
      </div>

      {/* Найближчі події */}
      {upcomingEvents.length > 0 && (
        <div className="pt-3 border-t border-border">
          <p className="text-sm font-semibold text-content-primary mb-2.5">
            Найближчим часом
          </p>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-1.5">
            {upcomingEvents.map((ev) => {
              const hasCrew = !!ev.crew;
              const crewLabel = ev.crew?.name ?? ev.crew?.host?.name ?? null;

              return (
                <EventRow
                  ev={ev}
                  hasCrew={hasCrew}
                  crewLabel={crewLabel}
                  onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
                  buttonText={hasCrew ? "Відкрити →" : "Призначити →"}
                  buttonVariant={hasCrew ? "crew" : "no-crew"}
                  timeLabel={`${formatDate(ev.date)}, ${ev.time ?? "—:——"}`}
                />
              );
            })}
          </motion.div>
        </div>
      )}
    </div>
  );
}