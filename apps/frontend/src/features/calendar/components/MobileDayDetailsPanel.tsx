import { toISODate } from "../utils/date";
import { PROJECT_HEX } from "../constants";
import type { Event as CalendarEvent, DayOff, User } from "../../../types";

interface MobileDayDetailsPanelProps {
  selectedMobileDate: Date;
  selectedDayEvents: CalendarEvent[];
  dayOffsByDate: Map<string, DayOff[]>;
  allUsers: User[];
  projectHexMap: Map<string, string>;
  navigate: (path: string) => void;
}

export default function MobileDayDetailsPanel({
  selectedMobileDate,
  selectedDayEvents,
  dayOffsByDate,
  allUsers,
  projectHexMap,
  navigate,
}: MobileDayDetailsPanelProps) {
  const dateKey = toISODate(selectedMobileDate);

  return (
    <div key={dateKey} className="mt-3 select-none fade-in-up">
      <h3 className="text-sm font-bold text-content-primary mb-2">
        {selectedMobileDate.toLocaleDateString("uk-UA", {
          day: "2-digit",
          month: "long",
          weekday: "long",
        })}
      </h3>

      {(() => {
        const dayOffEntries = dayOffsByDate.get(dateKey) ?? [];
        if (dayOffEntries.length === 0) return null;
        return (
          <div className="mb-2.5 flex flex-wrap gap-1">
            {dayOffEntries.map((d: DayOff) => {
              const u = allUsers.find((au: User) => au.id === d.userId);
              return (
                <span
                  key={d.id}
                  className="text-2xs font-semibold text-danger-600 bg-danger-50 border border-danger-100 px-2 py-0.5 rounded-pill"
                >
                  🌴 {u?.name || "Вихідний"}
                </span>
              );
            })}
          </div>
        );
      })()}

      {selectedDayEvents.length === 0 ? (
        <div className="bg-surface rounded-card border border-border p-6 text-center text-content-muted text-sm">
          На цей день подій не заплановано
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {selectedDayEvents.map((ev: CalendarEvent, index: number) => (
            <div
              key={ev.id}
              onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
              className="bg-surface p-3 rounded-card border-l-4 shadow-soft active:scale-[0.98] transition-transform cursor-pointer fade-in-up"
              style={{
                borderLeftColor: projectHexMap.get(ev.project) ?? PROJECT_HEX.blue,
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-2xs font-bold px-2 py-0.5 rounded-control bg-surface-muted text-content-secondary">
                  🕒 {ev.time || "Не вказано"}
                </span>
                <span className="text-2xs font-medium text-content-muted">
                  {ev.project}
                </span>
              </div>
              <p className="text-sm font-semibold text-content-primary">
                {ev.school?.name}
              </p>
              <p className="text-2xs text-content-secondary mt-1">
                🚐 Екіпаж: {ev.crew?.name || "Не призначено"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
