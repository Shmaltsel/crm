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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
      {/* Хедер */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Сьогоднішні події
          </p>
          <p className="text-xs text-slate-400 mt-0.5 capitalize">
            {dateLabel}
          </p>
        </div>
        <button
          onClick={() => navigate("/calendar")}
          className="text-xs text-blue-600 hover:underline shrink-0"
        >
          Календар
        </button>
      </div>

      {events.length === 0 ? (
        <div className="py-6 text-center text-slate-400 text-sm">
          Сьогодні подій немає
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {events.map((ev) => {
            const hasCrew = !!ev.crew;
            const crewLabel = ev.crew?.name ?? ev.crew?.host?.name ?? null;

            return (
              <div
                key={ev.id}
                className={`rounded-xl border p-3 flex flex-col gap-2.5 ${
                  hasCrew
                    ? "border-slate-100 bg-white"
                    : "border-amber-200 bg-amber-50/40"
                }`}
              >
                {/* Час + проєкт в один рядок */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-800 tabular-nums shrink-0">
                    {ev.time ?? "—:——"}
                  </span>
                  <span className="text-xs text-slate-400 truncate">
                    {ev.project}
                  </span>
                </div>

                {/* Назва школи — дозволяємо переноситись, не обрізаємо */}
                <p className="text-sm font-semibold text-slate-700 leading-snug line-clamp-2">
                  {ev.school?.name ?? "—"}
                </p>

                {/* Статус екіпажу + кнопка в один рядок */}
                <div className="flex items-center justify-between gap-2">
                  {hasCrew ? (
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium shrink-0">
                      ✅ {crewLabel ?? "Екіпаж призначено"}
                    </span>
                  ) : (
                    <span className="text-[11px] text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full font-medium shrink-0">
                      ⚠️ Немає екіпажу
                    </span>
                  )}

                  <button
                    onClick={() =>
                      ev.school && navigate(`/schools/${ev.school.id}`)
                    }
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                      hasCrew
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "bg-white border border-amber-400 text-amber-700 hover:bg-amber-50"
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

      <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
        Усього на сьогодні: {events.length} {plural(events.length)}
      </p>
    </div>
  );
}
