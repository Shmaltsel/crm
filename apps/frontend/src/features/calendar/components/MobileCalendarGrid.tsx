import { getDayColor } from "../utils/color";
import { toISODate } from "../utils/date";
import { MONTH_NAMES, PROJECT_HEX } from "../constants";
import type { Event as CalendarEvent, Project, City, DayOff } from "../../../types";

interface MobileCalendarGridProps {
  days: (Date | null)[];
  year: number;
  month: number;
  selectedMobileDate: Date;
  eventsByDate: Map<string, CalendarEvent[]>;
  dayOffsByDate: Map<string, DayOff[]>;
  projectHexMap: Map<string, string>;
  projects: Project[];
  filterCityId: string;
  setFilterCityId: (value: string) => void;
  cities: City[];
  userRole: string;
  handleMobileDayTap: (day: Date) => void;
  startLongPress: (day: Date) => void;
  cancelLongPress: () => void;
  pressingDay: Date | null;
  triggeredDay: Date | null;
  prevMonth: () => void;
  nextMonth: () => void;
}

export default function MobileCalendarGrid({
  days,
  year,
  month,
  selectedMobileDate,
  eventsByDate,
  dayOffsByDate,
  projectHexMap,
  projects,
  filterCityId,
  setFilterCityId,
  cities,
  userRole,
  handleMobileDayTap,
  startLongPress,
  cancelLongPress,
  pressingDay,
  triggeredDay,
  prevMonth,
  nextMonth,
}: MobileCalendarGridProps) {
  return (
    <>
      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-3.5 border-b border-slate-100">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 active:bg-slate-100 transition-colors"
          >
            ‹
          </button>
          <span className="text-base font-bold text-slate-800 capitalize">
            {MONTH_NAMES[month]}{" "}
            <span className="text-slate-400 font-medium">{year}</span>
          </span>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 active:bg-slate-100 transition-colors"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 px-2 pt-2">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
            <div
              key={dayName}
              className="text-center text-[10px] font-bold tracking-wide text-slate-400 uppercase pb-1.5"
            >
              {dayName}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1.5 px-2 pb-3">
          {days.map((day, idx) => {
            const isToday =
              day && day.toDateString() === new Date().toDateString();
            const isSelected =
              day && day.toDateString() === selectedMobileDate.toDateString();
            const dayKey = day ? toISODate(day) : "";
            const dayEvents = day ? (eventsByDate.get(dayKey) ?? []) : [];
            const dayOffEntries = day
              ? (dayOffsByDate.get(dayKey) ?? [])
              : [];
            const dayColor = day
              ? getDayColor(dayEvents, projectHexMap)
              : undefined;

            return (
              <div
                key={idx}
                className="flex items-center justify-center py-0.5"
              >
                {day && (
                  <button
                    onTouchStart={(e) => {
                      const t = e.touches[0];
                      startLongPress(day, t.clientX, t.clientY);
                    }}
                    onTouchEnd={() => cancelLongPress()}
                    onTouchMove={(e) => {
                      const t = e.touches[0];
                      cancelLongPress(t.clientX, t.clientY);
                    }}
                    onTouchCancel={() => cancelLongPress()}
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => handleMobileDayTap(day)}
                    className={`relative w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold select-none no-select-ios touch-manipulation active:scale-90
                      ${isSelected ? "ring-2 ring-blue-600 ring-offset-2" : ""}
                      ${isToday && !isSelected ? "ring-2 ring-blue-200" : ""}
                      ${triggeredDay === day ? "dayoff-cell-enter" : ""}
                    `}
                    style={{
                      background: dayColor || "#f1f5f9",
                      color: dayColor ? "#fff" : "#64748b",
                      textShadow: dayColor
                        ? "0 1px 2px rgba(0,0,0,0.35)"
                        : "none",
                      transform: pressingDay === day ? "scale(0.9)" : "",
                      transition: pressingDay === day
                        ? "transform 550ms ease-out"
                        : "transform 150ms ease-out",
                    }}
                  >
                    <svg
                      className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                      viewBox="0 0 36 36"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="100.53"
                        strokeDashoffset={pressingDay === day ? 0 : 100.53}
                        style={{
                          transition: pressingDay === day
                            ? "stroke-dashoffset 550ms linear"
                            : "stroke-dashoffset 150ms ease-out",
                        }}
                        className="text-blue-500 opacity-70"
                      />
                    </svg>
                    {day.getDate()}
                    {dayOffEntries.length > 0 && (
                      <span className="pointer-events-none absolute -top-2.5 -right-2.5 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center">
                        <span className="text-white text-[6px] font-bold leading-none">
                          ✕
                        </span>
                      </span>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mt-3 px-1">
        {projects.map((p: Project) => (
          <span
            key={p.id}
            className="flex items-center gap-1 text-[10px] font-medium text-slate-500"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: PROJECT_HEX[p.color] || PROJECT_HEX.blue,
              }}
            />
            {p.name}
          </span>
        ))}
        <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          Вихідний
        </span>

        {userRole === "SUPERADMIN" && (
          <select
            value={filterCityId}
            onChange={(e) => setFilterCityId(e.target.value)}
            className="ml-auto text-[11px] font-semibold text-slate-700 outline-none bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
          >
            <option value="ALL">🌍 Всі міста</option>
            {cities.map((c: City) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}
