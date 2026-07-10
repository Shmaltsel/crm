import { useNavigate } from "react-router-dom";

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

function plural(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return "подія";
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
    return "події";
  return "подій";
}

export default function TodayEvents({ events }: Props) {
  const navigate = useNavigate();

  const dateLabel = new Date().toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  return (
    <div className="mobile-card flex flex-col">
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
          className="text-2xs text-brand hover:underline shrink-0"
        >
          Календар
        </button>
      </div>

      {events.length === 0 ? (
        <div className="py-5 text-center text-content-muted text-sm">
          Сьогодні подій немає
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {events.map((ev) => {
            const hasCrew = !!ev.crew;
            const crewLabel = ev.crew?.name ?? ev.crew?.host?.name ?? null;

            return (
              <div
                key={ev.id}
                className={`rounded-control border p-3 flex flex-col gap-2 ${
                  hasCrew
                    ? "border-border bg-surface"
                    : "border-warning/30 bg-warning-subtle"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-content-primary tabular-nums shrink-0">
                    {ev.time ?? "—:——"}
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
                    onClick={() =>
                      ev.school && navigate(`/schools/${ev.school.id}`)
                    }
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
          })}
        </div>
      )}

      <p className="text-2xs text-content-muted mt-2.5 pt-2.5 border-t border-border">
        Усього на сьогодні: {events.length} {plural(events.length)}
      </p>
    </div>
  );
}
