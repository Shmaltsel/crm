import { Link } from "react-router-dom";
import { toISODate, isPastDay } from "../utils/date";
import { MONTH_NAMES, ROLE_ICON_MAP } from "../constants";
import { getDayColor } from "../utils/color";
import EventTooltip from "./EventTooltip";
import type { Event as CalendarEvent, DayOff, DayOffRequest, User } from "../../../types";

interface DesktopCalendarGridProps {
  days: (Date | null)[];
  year: number;
  month: number;
  selectedMobileDate: Date;
  setSelectedMobileDate: (date: Date) => void;
  eventsByDate: Map<string, CalendarEvent[]>;
  dayOffsByDate: Map<string, DayOff[]>;
  pendingRequestsByDate: Map<string, DayOffRequest[]>;
  projectColorMap: Map<string, string>;
  projectHexMap: Map<string, string>;
  isStaff: boolean;
  isManagerOrAdmin: boolean;
  user: { id: string } | null;
  allUsers: User[];
  handleDayOffClick: (e: React.MouseEvent, date: Date) => void;
  prevMonth: () => void;
  nextMonth: () => void;
}

export default function DesktopCalendarGrid({
  days,
  year,
  month,
  selectedMobileDate,
  setSelectedMobileDate,
  eventsByDate,
  dayOffsByDate,
  pendingRequestsByDate,
  projectColorMap,
  projectHexMap,
  isStaff,
  isManagerOrAdmin,
  user,
  allUsers,
  handleDayOffClick,
  prevMonth,
  nextMonth,
}: DesktopCalendarGridProps) {
  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-border overflow-hidden flex flex-col">
        <div className="flex items-center justify-center p-5 md:p-6 border-b border-border bg-white">
          <div className="flex items-center gap-1.5 bg-surface-muted p-1.5 rounded-2xl border border-border">
            <button
              onClick={prevMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-content-secondary transition-all font-medium"
            >
              ◀
            </button>
            <span className="px-4 md:px-6 py-2 text-content-primary font-bold capitalize tracking-tight">
              {MONTH_NAMES[month]}{" "}
              <span className="text-content-muted font-medium">{year}</span>
            </span>
            <button
              onClick={nextMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-content-secondary transition-all font-medium"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 bg-surface-muted/50">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
            <div
              key={dayName}
              className="py-3 text-center text-[10px] md:text-xs font-bold tracking-widest text-content-muted uppercase border-b border-border"
            >
              {dayName}
            </div>
          ))}

          {days.map((day, idx) => {
            const isToday =
              day && day.toDateString() === new Date().toDateString();
            const isSelected =
              day && day.toDateString() === selectedMobileDate.toDateString();
            const dayKey = day ? toISODate(day) : "";
            const dayEvents = day ? (eventsByDate.get(dayKey) ?? []) : [];
            const dayOffEntries = day ? (dayOffsByDate.get(dayKey) ?? []) : [];
            const dayPendingRequests = day
              ? (pendingRequestsByDate.get(dayKey) ?? [])
              : [];

            const dayColor = day
              ? getDayColor(dayEvents, projectHexMap)
              : undefined;

            const myDayOff = isStaff
              ? dayOffEntries.find((d) => d.userId === user?.id)
              : undefined;
            const myPendingRequest = isStaff
              ? dayPendingRequests.find((r) => r.userId === user?.id)
              : undefined;
            const hasAnyDayOff = isStaff
              ? !!myDayOff
              : dayOffEntries.length > 0;
            const hasAnyPending = dayPendingRequests.length > 0;

            const showCross =
              day && !isPastDay(day) && (isStaff || isManagerOrAdmin);

            return (
              <div
                key={idx}
                onClick={() => day && setSelectedMobileDate(day)}
                className={`min-h-[80px] md:min-h-[120px] border-b border-r border-border p-1 md:p-2 transition-colors relative group select-none no-select-ios
                  ${day ? "bg-white hover:bg-surface-muted cursor-pointer" : "bg-surface-muted/30"}
                  ${isSelected ? "ring-2 ring-inset ring-blue-500/20 bg-blue-50/10" : ""}
                  ${hasAnyDayOff ? "dayoff-cell-enter bg-rose-50/70" : ""}
                  ${!hasAnyDayOff && hasAnyPending ? "bg-blue-50/30" : ""}
                `}
              >
                {day && (
                  <>
                    {showCross && (
                      <div className="absolute top-1 left-1 z-10 group/dayoff">
                        <button
                          onClick={(e) => handleDayOffClick(e, day)}
                          title={
                            hasAnyDayOff
                              ? "Скасувати вихідний"
                              : hasAnyPending
                                ? "Очікує підтвердження"
                                : "Призначити вихідний"
                          }
                          className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all
                            ${
                              hasAnyDayOff
                                ? "bg-rose-500 text-white shadow-sm hover:bg-rose-600"
                                : myPendingRequest
                                  ? "bg-blue-500 text-white shadow-sm pending-pulse"
                                  : "bg-surface-muted text-content-muted opacity-0 group-hover:opacity-100 hover:bg-rose-100 hover:text-rose-500"
                            }`}
                        >
                          {hasAnyDayOff ? "✕" : myPendingRequest ? "?" : "✕"}
                        </button>

                        {isManagerOrAdmin && dayOffEntries.length > 0 && (
                          <div className="hidden md:block absolute top-full left-0 mt-2 w-48 bg-neutral-800 text-white p-2.5 rounded-xl shadow-2xl opacity-0 invisible group-hover/dayoff:opacity-100 group-hover/dayoff:visible transition-all duration-200 pointer-events-none">
                            <p className="text-[10px] uppercase tracking-wide text-content-muted mb-1.5">
                              Вихідний ({dayOffEntries.length})
                            </p>
                            <div className="space-y-1">
                              {dayOffEntries.map((d: DayOff) => {
                                const u = allUsers.find(
                                  (au: User) => au.id === d.userId,
                                );
                                return (
                                  <p
                                    key={d.id}
                                    className="text-xs font-medium truncate"
                                  >
                                    {u
                                      ? `${ROLE_ICON_MAP[u.role] || "👤"} ${u.name}`
                                      : "Невідомий"}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {isManagerOrAdmin && dayPendingRequests.length > 0 && (
                          <div className="hidden md:block absolute top-full left-0 mt-2 w-48 bg-blue-800 text-white p-2.5 rounded-xl shadow-2xl opacity-0 invisible group-hover/dayoff:opacity-100 group-hover/dayoff:visible transition-all duration-200 pointer-events-none z-20">
                            <p className="text-[10px] uppercase tracking-wide text-blue-200 mb-1.5">
                              Очікують підтвердження ({dayPendingRequests.length})
                            </p>
                            <div className="space-y-1">
                              {dayPendingRequests.map((r: DayOffRequest) => {
                                const u = allUsers.find(
                                  (au: User) => au.id === r.userId,
                                );
                                return (
                                  <p
                                    key={r.id}
                                    className="text-xs font-medium truncate"
                                  >
                                    {u
                                      ? `${ROLE_ICON_MAP[u.role] || "👤"} ${u.name}`
                                      : "Невідомий"}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-center md:justify-end mb-1.5">
                      <span
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold transition-colors
                        ${isToday && !dayColor ? "bg-blue-600 text-white shadow-md" : !dayColor ? "text-content-muted md:group-hover:text-blue-600" : "text-white"}
                      `}
                        style={{
                          background: dayColor || undefined,
                          textShadow: dayColor ? "0 1px 2px rgba(0,0,0,0.35)" : "none",
                        }}
                      >
                        {day.getDate()}
                      </span>
                    </div>

                    {hasAnyDayOff && !isStaff && dayOffEntries.length > 0 && (
                      <p className="text-[9px] md:text-[10px] text-rose-600 font-semibold text-center mb-1 truncate px-1">
                        🌴 {dayOffEntries.length}{" "}
                        {dayOffEntries.length === 1 ? "вихідний" : "вихідних"}
                      </p>
                    )}

                    {!hasAnyDayOff && hasAnyPending && (
                      <p className="text-[9px] md:text-[10px] text-blue-500 font-semibold text-center mb-1 truncate px-1">
                        ? {dayPendingRequests.length}{" "}
                        {dayPendingRequests.length === 1 ? "запит" : "запитів"}
                      </p>
                    )}

                    <div className="space-y-1.5">
                      {dayEvents.slice(0, 3).map((ev: CalendarEvent) => (
                        <div
                          key={ev.id}
                          className="relative group/event z-0 hover:z-50"
                        >
                          <Link
                            to={`/schools/${ev.schoolId}`}
                            className={`block w-full px-1.5 py-1 text-center md:text-left rounded-md border text-[10px] md:text-xs font-bold transition-all shadow-sm ${projectColorMap.get(ev.project) ?? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300"}`}
                          >
                            {ev.time || "—"}
                          </Link>

                          <EventTooltip event={ev} />
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <p className="text-[9px] md:text-[10px] font-bold text-content-muted text-center">
                          +{dayEvents.length - 3} ще
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
  );
}
