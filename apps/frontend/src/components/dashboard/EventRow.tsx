import { useNavigate } from "react-router-dom";

const UA_WEEKDAYS = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const UA_MONTHS_SHORT = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = UA_MONTHS_SHORT[d.getMonth()];
  const weekday = UA_WEEKDAYS[d.getDay()];
  return `${day} ${month}, ${weekday}`;
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

interface EventBase {
  id: string;
  time?: string | null;
  project: string;
  school?: School | null;
  crew?: Crew | null;
}

interface TodayEvent extends EventBase {
  date?: never;
}

interface UpcomingEvent extends EventBase {
  date: string;
}

type EventRowEvent = TodayEvent | UpcomingEvent;

interface Props {
  event: EventRowEvent;
  isUpcoming?: boolean;
}

export default function EventRow({ event, isUpcoming = false }: Props) {
  const navigate = useNavigate();
  const hasCrew = !!event.crew;
  const crewLabel = event.crew?.name ?? event.crew?.host?.name ?? null;

  return (
    <div
      onClick={() => event.school && navigate(`/schools/${event.school.id}`)}
      className={`rounded-control border p-3 flex flex-col gap-2 cursor-pointer ${
        hasCrew
          ? "border-border bg-surface"
          : "border-warning/30 bg-warning-subtle"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={isUpcoming ? "text-sm font-medium text-content-primary tabular-nums shrink-0" : "text-base font-bold text-content-primary tabular-nums shrink-0"}>
          {isUpcoming ? formatDate(event.date) : event.time ?? "—:——"}
        </span>
        {isUpcoming && (
          <span className="text-2xs text-content-muted truncate">
            {event.time ?? '—:——'}
          </span>
        )}
        <span className="text-2xs text-content-muted truncate">
          {event.project}
        </span>
      </div>

      <p className="text-sm font-semibold text-content-primary leading-snug line-clamp-2">
        {event.school?.name ?? "—"}
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
            if (event.school) navigate(`/schools/${event.school.id}`);
          }}
          className={`text-2xs font-semibold px-2.5 py-1 rounded-control transition-colors shrink-0 active:scale-95 ${
            hasCrew
              ? "bg-surface-muted text-content-secondary hover:bg-border-strong"
              : "bg-surface border border-warning text-warning-600 hover:bg-warning-subtle"
          }`}
        >
          {hasCrew ? "Відкрити →" : "Призначити →"}
        </button>
      </div>
    </div>
  );
}