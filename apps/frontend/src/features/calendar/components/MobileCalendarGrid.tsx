import { motion, AnimatePresence } from "framer-motion";
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
      <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-border" data-no-swipe>
          <button
            onClick={prevMonth}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-control text-content-muted active:bg-surface-muted transition-colors"
          >
            ‹
          </button>
          <AnimatePresence mode="wait">
            <motion.span
              key={`${month}-${year}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-bold text-content-primary capitalize"
            >
              {MONTH_NAMES[month]}{" "}
              <span className="text-content-muted font-medium">{year}</span>
            </motion.span>
          </AnimatePresence>
          <button
            onClick={nextMonth}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-control text-content-muted active:bg-surface-muted transition-colors"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 px-2 pt-2">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
            <div
              key={dayName}
              className="text-center text-2xs font-bold tracking-wide text-content-muted uppercase pb-1"
            >
              {dayName}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1.5 px-2 pb-2.5" data-no-swipe>
          {days.map((day, idx) => {
            const isToday = day && day.toDateString() === new Date().toDateString();
            const isSelected = day && day.toDateString() === selectedMobileDate.toDateString();
            const dayKey = day ? toISODate(day) : "";
            const dayEvents = day ? (eventsByDate.get(dayKey) ?? []) : [];
            const dayOffEntries = day ? (dayOffsByDate.get(dayKey) ?? []) : [];
            const dayColor = day ? getDayColor(dayEvents, projectHexMap) : undefined;

            return (
              <div key={idx} className="flex items-center justify-center py-0.5">
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
                    className={`relative min-w-[38px] min-h-[38px] w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold select-none no-select-ios touch-manipulation transition-transform duration-fast active:scale-90
                      ${isSelected ? "ring-2 ring-brand ring-offset-2" : ""}
                      ${isToday && !isSelected ? "ring-2 ring-brand/20" : ""}
                      ${triggeredDay === day ? "dayoff-cell-enter" : ""}
                    `}
                    style={{
                      background: dayColor || "#f1f5f9",
                      color: dayColor ? "#fff" : "#64748b",
                      textShadow: dayColor ? "0 1px 2px rgba(0,0,0,0.35)" : "none",
                      transform: pressingDay === day ? "scale(0.9)" : "",
                      transition: pressingDay === day ? "transform 550ms ease-out" : "transform 150ms ease-out",
                    }}
                  >
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                      <circle
                        cx="18" cy="18" r="16" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        strokeDasharray="100.53"
                        strokeDashoffset={pressingDay === day ? 0 : 100.53}
                        style={{
                          transition: pressingDay === day ? "stroke-dashoffset 550ms linear" : "stroke-dashoffset 150ms ease-out",
                        }}
                        className="text-brand opacity-70"
                      />
                    </svg>
                    {day.getDate()}
                    {dayOffEntries.length > 0 && (
                      <span className="pointer-events-none absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-danger border-2 border-white flex items-center justify-center">
                        <span className="text-white text-[6px] font-bold leading-none">✕</span>
                      </span>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mt-2.5 px-1">
        {projects.map((p: Project) => (
          <span
            key={p.id}
            className="inline-flex items-center gap-1 text-2xs font-medium text-content-secondary bg-surface-muted border border-border px-2 py-0.5 rounded-pill"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: PROJECT_HEX[p.color] || PROJECT_HEX.blue }}
            />
            {p.name}
          </span>
        ))}
        <span className="inline-flex items-center gap-1 text-2xs font-medium text-danger-600 bg-danger-50 border border-danger-100 px-2 py-0.5 rounded-pill">
          <span className="w-2 h-2 rounded-full bg-danger shrink-0" />
          Вихідний
        </span>

        {userRole === "SUPERADMIN" && (
          <select
            value={filterCityId}
            onChange={(e) => setFilterCityId(e.target.value)}
            className="ml-auto text-2xs font-semibold text-content-secondary outline-none bg-surface-muted border border-border rounded-control px-2.5 py-1.5 min-h-[32px]"
          >
            <option value="ALL">Всі міста</option>
            {cities.map((c: City) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}
