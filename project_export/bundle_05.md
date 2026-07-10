# FILE: apps/frontend/src/features/calendar/components/MobileCalendarGrid.tsx

```
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
          <span className="text-sm font-bold text-content-primary capitalize">
            {MONTH_NAMES[month]}{" "}
            <span className="text-content-muted font-medium">{year}</span>
          </span>
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
                    className={`relative min-w-[38px] min-h-[38px] w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold select-none no-select-ios touch-manipulation active:scale-90
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

```

# FILE: apps/frontend/src/features/calendar/components/MobileDayDetailsPanel.tsx

```
import { motion, AnimatePresence } from "framer-motion";
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
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={toISODate(selectedMobileDate)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="mt-3 select-none"
      >
        <h3 className="text-sm font-bold text-content-primary mb-2">
          {selectedMobileDate.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "long",
            weekday: "long",
          })}
        </h3>

        {(() => {
          const key = toISODate(selectedMobileDate);
          const dayOffEntries = dayOffsByDate.get(key) ?? [];
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
            {selectedDayEvents.map((ev: CalendarEvent) => (
              <div
                key={ev.id}
                onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
                className="bg-surface p-3 rounded-card border-l-4 shadow-soft active:scale-[0.98] transition-transform cursor-pointer"
                style={{ borderLeftColor: projectHexMap.get(ev.project) ?? PROJECT_HEX.blue }}
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
      </motion.div>
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/features/calendar/constants.ts

```
export const STAFF_ROLES = ["HOST", "DRIVER"];
export const MANAGER_ROLES = ["SUPERADMIN", "MANAGER"];

export const PROJECT_HEX: Record<string, string> = {
  blue: "#3b82f6",
  emerald: "#10b981",
  rose: "#f43f5e",
  red: "#ef4444",
  amber: "#f59e0b",
  purple: "#a855f7",
};

export const ROLE_ICON_MAP: Record<string, string> = {
  HOST: "🎙️",
  DRIVER: "🚗",
};

export const MONTH_NAMES = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export const WEEKDAY_HEADERS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

export const PROJECT_BADGE_COLORS: Record<string, string> = {
  blue: "bg-blue-400",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
  red: "bg-red-500",
  amber: "bg-amber-400",
  purple: "bg-purple-400",
};

```

# FILE: apps/frontend/src/features/calendar/hooks/useCalendarData.ts

```
import { useMemo } from "react";
import { useCalendarEvents, useCalendarProjects } from "../../../hooks/useCalendar";
import { useUsers } from "../../../hooks/useEmployees";
import { useCities } from "../../../hooks/useCities";
import { PROJECT_HEX } from "../constants";
import type { Event as CalendarEvent } from "../../../types";

export function useCalendarData(filterCityId: string) {
  const { data: events = [], isLoading: eventsLoading } = useCalendarEvents();
  const { data: projects = [] } = useCalendarProjects();
  const { data: cities = [] } = useCities();
  const { data: allUsers = [] } = useUsers();

  const filteredEvents = useMemo(() => {
    return events.filter((ev: CalendarEvent) => {
      if (ev.status === "RE_SALE") return false;
      if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) return false;
      return true;
    });
  }, [events, filterCityId]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of filteredEvents) {
      const key = ev.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
    return map;
  }, [filteredEvents]);

  const projectColorMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) {
      switch (p.color) {
        case "emerald":
          map.set(p.name, "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300"); break;
        case "rose":
          map.set(p.name, "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 hover:border-rose-300"); break;
        case "red":
          map.set(p.name, "bg-red-100 text-red-700 border-red-300 hover:bg-red-200 hover:border-red-400"); break;
        case "amber":
          map.set(p.name, "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 hover:border-amber-300"); break;
        case "purple":
          map.set(p.name, "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:border-purple-300"); break;
        default:
          map.set(p.name, "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300");
      }
    }
    return map;
  }, [projects]);

  const projectHexMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) {
      map.set(p.name, PROJECT_HEX[p.color] || PROJECT_HEX.blue);
    }
    return map;
  }, [projects]);

  return {
    events,
    eventsLoading,
    projects,
    cities,
    allUsers,
    filteredEvents,
    eventsByDate,
    projectColorMap,
    projectHexMap,
  };
}

```

# FILE: apps/frontend/src/features/calendar/hooks/useCalendarMonth.ts

```
import { useState, useMemo } from "react";
import { buildMonthDays, toISODate } from "../utils/date";

export function useCalendarMonth() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMobileDate, setSelectedMobileDate] = useState<Date>(
    new Date(),
  );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  const today = () => {
    setCurrentDate(new Date());
    setSelectedMobileDate(new Date());
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => buildMonthDays(year, month), [year, month]);

  const monthFrom = toISODate(new Date(year, month, 1));
  const monthTo = toISODate(new Date(year, month + 1, 0));

  return {
    currentDate,
    setCurrentDate,
    selectedMobileDate,
    setSelectedMobileDate,
    nextMonth,
    prevMonth,
    today,
    year,
    month,
    days,
    monthFrom,
    monthTo,
  };
}

```

# FILE: apps/frontend/src/features/calendar/hooks/useDayOffActions.ts

```
import { useState, useMemo, useCallback } from "react";
import {
  useDaysOff,
  useCreateDayOff,
  useDeleteDayOff,
} from "../../../hooks/useDaysOff";
import { STAFF_ROLES } from "../constants";
import { toISODate, isPastDay } from "../utils/date";
import type { User } from "../../../types";

export function useDayOffActions(
  monthFrom: string,
  monthTo: string,
  dayOffCityId: string | undefined,
  isStaff: boolean,
  isManagerOrAdmin: boolean,
  user: { id: string } | null,
  allUsers: User[],
  filterCityId: string,
  userRole: string,
  userCityId: string | null | undefined,
) {
  const [dayOffModalDate, setDayOffModalDate] = useState<Date | null>(null);

  const { data: dayOffs = [] } = useDaysOff(monthFrom, monthTo, dayOffCityId);
  const createDayOff = useCreateDayOff();
  const deleteDayOff = useDeleteDayOff();

  const dayOffsByDate = useMemo(() => {
    const map = new Map<string, typeof dayOffs>();
    for (const d of dayOffs) {
      const key = d.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    }
    return map;
  }, [dayOffs]);

  const staffForModal = useMemo(() => {
    const cityScope =
      userRole === "MANAGER"
        ? userCityId
        : filterCityId !== "ALL"
          ? filterCityId
          : null;
    return allUsers.filter(
      (u: User) =>
        STAFF_ROLES.includes(u.role) && (!cityScope || u.cityId === cityScope),
    );
  }, [allUsers, userRole, userCityId, filterCityId]);

  const handleDayOffClick = useCallback(
    (e: React.MouseEvent, date: Date) => {
      e.stopPropagation();
      if (isPastDay(date)) return;

      if (isStaff && user) {
        const key = toISODate(date);
        const existing = dayOffsByDate
          .get(key)
          ?.find((d: { userId: string }) => d.userId === user.id);
        if (existing) {
          deleteDayOff.mutate(existing.id);
        } else {
          createDayOff.mutate({ date: key });
        }
        return;
      }

      if (isManagerOrAdmin) {
        setDayOffModalDate(date);
      }
    },
    [isStaff, isManagerOrAdmin, user, dayOffsByDate, createDayOff, deleteDayOff],
  );

  const handleToggleStaffDayOff = useCallback(
    (targetUserId: string, existingId?: string) => {
      if (existingId) {
        deleteDayOff.mutate(existingId);
      } else if (dayOffModalDate) {
        createDayOff.mutate({
          date: toISODate(dayOffModalDate),
          userId: targetUserId,
        });
      }
    },
    [dayOffModalDate, createDayOff, deleteDayOff],
  );

  const handleLongPressDayOff = useCallback(
    (day: Date) => {
      if (isPastDay(day)) return;
      if (isStaff && user) {
        const key = toISODate(day);
        const existing = dayOffsByDate
          .get(key)
          ?.find((d: { userId: string }) => d.userId === user.id);
        if (existing) deleteDayOff.mutate(existing.id);
        else createDayOff.mutate({ date: key });
      } else if (isManagerOrAdmin) {
        setDayOffModalDate(day);
      }
    },
    [isStaff, isManagerOrAdmin, user, dayOffsByDate, createDayOff, deleteDayOff],
  );

  return {
    dayOffsByDate,
    staffForModal,
    dayOffModalDate,
    setDayOffModalDate,
    handleDayOffClick,
    handleToggleStaffDayOff,
    handleLongPressDayOff,
  };
}

```

# FILE: apps/frontend/src/features/calendar/hooks/useLongPress.ts

```
import { useRef, useCallback, useState } from "react";

const MOVE_THRESHOLD = 10;

export function useLongPress(onTrigger: (day: Date) => void, delay = 550) {
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const [pressingDay, setPressingDay] = useState<Date | null>(null);
  const [triggeredDay, setTriggeredDay] = useState<Date | null>(null);

  const startLongPress = useCallback(
    (day: Date, clientX?: number, clientY?: number) => {
      touchStartPos.current = clientX != null && clientY != null ? { x: clientX, y: clientY } : null;
      longPressFired.current = false;
      setPressingDay(day);
      pressTimer.current = setTimeout(() => {
        longPressFired.current = true;
        setPressingDay(null);
        setTriggeredDay(day);
        setTimeout(() => setTriggeredDay(null), 350);
        if ("vibrate" in navigator) navigator.vibrate(15);
        onTrigger(day);
      }, delay);
    },
    [onTrigger, delay],
  );

  const cancelLongPress = useCallback(
    (clientX?: number, clientY?: number) => {
      if (clientX != null && clientY != null && touchStartPos.current) {
        const dx = clientX - touchStartPos.current.x;
        const dy = clientY - touchStartPos.current.y;
        if (Math.hypot(dx, dy) <= MOVE_THRESHOLD) return;
      }
      if (pressTimer.current) clearTimeout(pressTimer.current);
      touchStartPos.current = null;
      longPressFired.current = false;
      setPressingDay(null);
    },
    [],
  );

  const wasLongPress = useCallback(() => {
    if (longPressFired.current) {
      longPressFired.current = false;
      return true;
    }
    return false;
  }, []);

  return { startLongPress, cancelLongPress, wasLongPress, pressingDay, triggeredDay };
}

```

# FILE: apps/frontend/src/features/calendar/utils/color.ts

```
import { PROJECT_HEX } from "../constants";

export const shadeHex = (hex: string, percent: number) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + percent));
  const b = Math.min(255, Math.max(0, (n & 0xff) + percent));
  return `rgb(${r}, ${g}, ${b})`;
};

export const getDayColor = (
  dayEvents: { project: string }[],
  projectHexMap: Map<string, string>,
): string | undefined => {
  if (dayEvents.length === 0) return undefined;
  const counts = new Map<string, number>();
  for (const ev of dayEvents) {
    const hex = projectHexMap.get(ev.project) ?? PROJECT_HEX.blue;
    counts.set(hex, (counts.get(hex) || 0) + 1);
  }
  const total = dayEvents.length;
  if (counts.size === 1) {
    const [hex] = counts.keys();
    return `linear-gradient(to bottom, ${shadeHex(hex, 35)}, ${shadeHex(hex, -25)})`;
  }
  let acc = 0;
  const stops: string[] = [];
  for (const [hex, count] of counts) {
    const start = (acc / total) * 100;
    acc += count;
    const end = (acc / total) * 100;
    stops.push(`${shadeHex(hex, 35)} ${start}%`);
    stops.push(`${shadeHex(hex, -25)} ${end}%`);
  }
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
};

```

# FILE: apps/frontend/src/features/calendar/utils/date.ts

```
export const toISODate = (d: Date) => d.toLocaleDateString("en-CA");

export const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

export const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

export const isPastDay = (date: Date) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return date < startOfToday;
};

export const buildMonthDays = (
  year: number,
  month: number,
): (Date | null)[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
  return days;
};

```

# FILE: apps/frontend/src/features/dashboard/ManagerDashboard.tsx

```
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/api";
import { useSubmittedReports } from "../../hooks/useReports";
import { useSelectedCity } from "../../context/CityContext";
import { useCity } from "../../hooks/useCities";
import type { Event } from "../../types";

function todayDateStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse">
      <div className="h-4 bg-slate-100 rounded-full w-1/3 mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded-full w-full" />
        <div className="h-3 bg-slate-100 rounded-full w-4/5" />
      </div>
    </div>
  );
}

export default function ManagerDashboard() {
  const today = todayDateStr();
  const { selectedCity } = useSelectedCity();

  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["city-events", today, selectedCity.id],
    queryFn: () =>
      api
        .get<{ data: Event[] }>("/events", {
          params: { dateFrom: today, dateTo: today, cityId: selectedCity.id || undefined },
        })
        .then((r) => r.data.data),
    enabled: !!selectedCity.id,
    staleTime: 30 * 1000,
  });

  const { data: submittedReports, isLoading: reportsLoading } = useSubmittedReports();
  const { data: cityProfile, isLoading: cityLoading } = useCity(selectedCity.id || undefined);

  const todayEvents = useMemo(() => {
    if (!events) return [];
    return events.filter((e) => e.date === today);
  }, [events, today]);

  const cityReports = useMemo(() => {
    if (!submittedReports || !selectedCity.id) return [];
    return submittedReports.filter((r) => selectedCity.id === r.event?.cityId || false);
  }, [submittedReports, selectedCity.id]);

  const dateLabel = new Date().toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  if (!selectedCity.id) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Дашборд</h1>
          <p className="text-sm text-content-muted mt-1">Оберіть місто для перегляду</p>
        </div>
      </div>
    );
  }

  if (eventsLoading || reportsLoading || cityLoading) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
          <div className="h-4 bg-slate-100 rounded w-36 mt-2 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Дашборд · {selectedCity.name}
        </h1>
        <p className="text-xs text-slate-400 mt-1">{dateLabel}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Події сьогодні */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm font-semibold text-slate-800">Події сьогодні</p>
            <Link to="/calendar" className="text-xs text-blue-600 hover:underline shrink-0">
              Календар
            </Link>
          </div>
          {todayEvents.length === 0 ? (
            <div className="py-6 text-center text-slate-400 text-sm">Сьогодні подій немає</div>
          ) : (
            <div className="flex flex-col gap-2">
              {todayEvents.map((ev) => (
                <div key={ev.id} className="rounded-xl border border-slate-100 bg-white p-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-800 tabular-nums">
                      {ev.time ?? "—:——"}
                    </span>
                    <span className="text-xs text-slate-400 truncate">{ev.project}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 leading-snug line-clamp-2">
                    {ev.school?.name ?? "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
            Усього на сьогодні: {todayEvents.length}
          </p>
        </div>

        {/* Неперевірені звіти */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <p className="text-sm font-semibold text-slate-800 mb-3">Неперевірені звіти</p>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold text-amber-600">{cityReports.length}</span>
            <span className="text-sm text-slate-400">шт.</span>
          </div>
          <p className="text-xs text-slate-400">
            {selectedCity.name}
          </p>
          <Link
            to="/reports"
            className="mt-auto pt-3 text-xs text-blue-600 hover:underline"
          >
            Переглянути →
          </Link>
        </div>

        {/* Моє місто */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <p className="text-sm font-semibold text-slate-800 mb-3">Моє місто</p>
          <p className="text-lg font-bold text-slate-800">{cityProfile?.name ?? selectedCity.name}</p>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-slate-500">
              Шкіл: <span className="font-semibold text-slate-700">{cityProfile?.schoolsCount ?? cityProfile?.schools?.length ?? "—"}</span>
            </p>
            <p className="text-xs text-slate-500">
              Команд: <span className="font-semibold text-slate-700">{cityProfile?.crews?.length ?? "—"}</span>
            </p>
          </div>
          <Link
            to={`/cities/${selectedCity.id}`}
            className="mt-auto pt-3 text-xs text-blue-600 hover:underline"
          >
            Детальніше →
          </Link>
        </div>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/features/dashboard/OwnerDashboard.tsx

```
import { useFinanceDashboard } from "../../hooks/useDashboardData";

function fmt(n: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(n));
}

function pct(a: number, b: number): number | null {
  if (!b) return null;
  return Math.round(((a - b) / b) * 100);
}

function pctColor(v: number | null): string {
  if (v === null) return "text-slate-400";
  if (v > 0) return "text-emerald-600";
  if (v < 0) return "text-red-500";
  return "text-slate-400";
}

function pctArrow(v: number | null): string {
  if (v === null) return "—";
  if (v > 0) return `↑ ${v}%`;
  if (v < 0) return `↓ ${Math.abs(v)}%`;
  return "0%";
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse">
      <div className="h-4 bg-slate-100 rounded-full w-1/3 mb-3" />
      <div className="h-8 bg-slate-100 rounded w-2/3 mb-2" />
      <div className="h-3 bg-slate-100 rounded w-1/2" />
    </div>
  );
}

export default function OwnerDashboard() {
  const { data: dashboard, isLoading } = useFinanceDashboard("month");

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="text-center py-20 text-slate-400 text-sm">
          Не вдалося завантажити фінансові дані
        </div>
      </div>
    );
  }

  const { kpi, monthly, expectedRevenue } = dashboard;
  const prevMonth = monthly.length > 1 ? monthly[monthly.length - 2] : null;

  const tiles = [
    {
      label: "Виручка",
      value: `${fmt(kpi.totalRevenue)} грн`,
      change: prevMonth ? pct(kpi.totalRevenue, prevMonth.revenue) : null,
      icon: "💰",
      bg: "bg-blue-50",
      color: "text-blue-700",
    },
    {
      label: "Витрати",
      value: `${fmt(kpi.totalExpenses)} грн`,
      change: null,
      icon: "💳",
      bg: "bg-rose-50",
      color: "text-rose-700",
    },
    {
      label: "Прибуток",
      value: `${fmt(kpi.totalProfit)} грн`,
      change: prevMonth ? pct(kpi.totalProfit, prevMonth.profit) : null,
      icon: "📈",
      bg: "bg-emerald-50",
      color: "text-emerald-700",
    },
    {
      label: "Подій",
      value: fmt(kpi.totalEvents),
      change: null,
      icon: "📅",
      bg: "bg-purple-50",
      color: "text-purple-700",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Фінансовий дашборд</h1>
        <p className="text-xs text-slate-400 mt-1">
          {new Date().toLocaleDateString("uk-UA", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-base">{tile.icon}</span>
              <span className={`text-xs font-medium ${tile.color}`}>{tile.label}</span>
            </div>
            <p className={`text-2xl font-bold leading-none ${tile.color}`}>{tile.value}</p>
            {tile.change !== null && (
              <p className={`text-xs mt-1.5 ${pctColor(tile.change)}`}>
                {pctArrow(tile.change)} до минулого місяця
              </p>
            )}
          </div>
        ))}
      </div>

      {expectedRevenue > 0 && (
        <div className="mt-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-sm font-semibold text-slate-800 mb-1">Очікувана виручка</p>
          <p className="text-xl font-bold text-slate-800">{fmt(expectedRevenue)} грн</p>
        </div>
      )}

      {monthly.length > 0 && (
        <div className="mt-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-sm font-semibold text-slate-800 mb-3">Динаміка за місяцями</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {monthly.map((m) => (
              <div key={m.month} className="min-w-[100px] shrink-0 rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500 mb-1">{m.month}</p>
                <p className="text-sm font-bold text-blue-700">{fmt(m.revenue)} грн</p>
                <p className={`text-xs font-medium ${m.profit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {fmt(m.profit)} грн
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/features/dashboard/StaffDashboard.tsx

```
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../config/api";
import { useMySalary } from "../../hooks/useSalary";
import type { Event } from "../../types";

function fmt(n: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(n));
}

function todayDateStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse">
      <div className="h-4 bg-slate-100 rounded-full w-1/3 mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded-full w-full" />
        <div className="h-3 bg-slate-100 rounded-full w-4/5" />
        <div className="h-3 bg-slate-100 rounded-full w-3/5" />
      </div>
    </div>
  );
}

export default function StaffDashboard() {
  const today = todayDateStr();

  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["my-events", today],
    queryFn: () =>
      api.get<{ data: Event[] }>("/events", { params: { dateFrom: today, dateTo: today } }).then((r) => r.data.data),
    staleTime: 30 * 1000,
  });

  const { data: salary, isLoading: salaryLoading } = useMySalary();

  const pendingSalary = useMemo(() => {
    if (!salary) return 0;
    return salary
      .filter((s) => s.status === "PENDING")
      .reduce((sum, s) => sum + s.amount, 0);
  }, [salary]);

  const todayEvents = useMemo(() => {
    if (!events) return [];
    return events.filter((e) => e.date === today);
  }, [events, today]);

  const recentEvents = useMemo(() => {
    if (!events) return [];
    return [...events]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [events]);

  const dateLabel = new Date().toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  if (eventsLoading || salaryLoading) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <div className="h-8 bg-slate-200 rounded-xl w-48 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Мій дашборд</h1>
        <p className="text-xs text-slate-400 mt-1">{dateLabel}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Сьогодні */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm font-semibold text-slate-800">Сьогодні</p>
            <Link to="/calendar" className="text-xs text-blue-600 hover:underline shrink-0">
              Календар
            </Link>
          </div>
          {todayEvents.length === 0 ? (
            <div className="py-6 text-center text-slate-400 text-sm">Сьогодні подій немає</div>
          ) : (
            <div className="flex flex-col gap-2">
              {todayEvents.map((ev) => (
                <div key={ev.id} className="rounded-xl border border-slate-100 bg-white p-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-800 tabular-nums">
                      {ev.time ?? "—:——"}
                    </span>
                    <span className="text-xs text-slate-400 truncate">{ev.project}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 leading-snug line-clamp-2">
                    {ev.school?.name ?? "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
            Усього на сьогодні: {todayEvents.length}
          </p>
        </div>

        {/* Моя зарплата */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <p className="text-sm font-semibold text-slate-800 mb-3">Моя зарплата</p>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold text-emerald-700">{fmt(pendingSalary)}</span>
            <span className="text-sm text-slate-400">грн</span>
          </div>
          <p className="text-xs text-slate-400">до виплати (очікує)</p>
          <Link
            to="/salary"
            className="mt-auto pt-3 text-xs text-blue-600 hover:underline"
          >
            Детальніше →
          </Link>
        </div>

        {/* Останні події */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
          <p className="text-sm font-semibold text-slate-800 mb-3">Останні події</p>
          {recentEvents.length === 0 ? (
            <div className="py-6 text-center text-slate-400 text-sm">Подій поки що немає</div>
          ) : (
            <div className="flex flex-col gap-2">
              {recentEvents.map((ev) => (
                <Link
                  key={ev.id}
                  to={`/events/${ev.id}`}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 hover:bg-slate-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">
                      {ev.school?.name ?? "—"}
                    </p>
                    <p className="text-xs text-slate-400">{ev.date}</p>
                  </div>
                  <span className="text-xs text-blue-600 shrink-0 ml-2">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/features/reports/components/ReportForm.tsx

```
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventReport } from "../../../types";
import ReportStatusBadge from "./ReportStatusBadge";
import { useInventory } from "../../../hooks/useInventory";

interface Expense {
  name: string;
  amount: number;
}

interface CrewInfo {
  host?: { id: string; name: string } | null;
  driver?: { id: string; name: string } | null;
}

interface ReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  schoolName: string;
  eventDate?: string;
  crew?: CrewInfo;
  report?: EventReport | null;
  reportLoading?: boolean;
  onCreateDraft: (data: {
    eventId: string;
    announcementDone: boolean;
    materialShown: boolean;
    childrenCount: number;
    classesCount: number;
    privilegedCount: number;
    showingsCount: number;
    totalSum: number;
    schoolSum: number;
    remainderSum: number;
    rating: number;
    directorSatisfied?: boolean;
    teachersSatisfied?: boolean;
    hadIssues?: boolean;
    comment?: string;
    expenses?: Expense[];
    salaries?: { userId: string; name: string; amount: number; role: string }[];
    inventoryUsages?: { itemId: string; quantity: number }[];
  }) => void;
  onSaveDraft: (data: {
    id: string;
    announcementDone?: boolean;
    materialShown?: boolean;
    childrenCount?: number;
    classesCount?: number;
    privilegedCount?: number;
    showingsCount?: number;
    totalSum?: number;
    schoolSum?: number;
    remainderSum?: number;
    rating?: number;
    directorSatisfied?: boolean;
    teachersSatisfied?: boolean;
    hadIssues?: boolean;
    comment?: string;
  }) => void;
  onSubmit: (id: string) => void;
  submitLoading?: boolean;
}

const WEEKDAY_FMT = new Intl.DateTimeFormat("uk-UA", { weekday: "long" });
const DATE_FMT = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "—";
  return `${DATE_FMT.format(d)} ${WEEKDAY_FMT.format(d)}`;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("uk-UA").format(Math.round(value || 0));
}

function IconBadge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${color}`}>
      {children}
    </span>
  );
}

function CardHeader({ icon, color, title }: { icon: React.ReactNode; color: string; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <IconBadge color={color}>{icon}</IconBadge>
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="text-sm font-medium text-slate-800">{children}</div>
    </div>
  );
}

function TogglePill({ value, onChange, disabled }: { value: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <div className="flex gap-1.5">
      <button type="button" disabled={disabled} onClick={() => onChange(true)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400 hover:bg-slate-200"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>Так</button>
      <button type="button" disabled={disabled} onClick={() => onChange(false)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${!value ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400 hover:bg-slate-200"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>Ні</button>
    </div>
  );
}

function NumberField({ value, onChange, suffix, disabled }: { value: number; onChange: (v: number) => void; suffix?: string; disabled?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1">
      <input type="number" min={0} value={value || ""} disabled={disabled}
        onChange={(e) => onChange(+e.target.value)}
        className={`w-16 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1 -mr-1 ${disabled ? "opacity-60" : ""}`}
        placeholder="0" />
      {suffix && <span className="text-slate-400 text-xs">{suffix}</span>}
    </span>
  );
}

export default function ReportForm({
  isOpen, onClose, eventId, schoolName, eventDate, crew,
  report, reportLoading, onCreateDraft, onSaveDraft, onSubmit, submitLoading,
}: ReportFormProps) {
  const headingId = "report-form-heading";
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const isEditable = report
    ? report.status === "DRAFT" || report.status === "NEEDS_REVISION"
    : true;

  const [form, setForm] = useState({
    announcementDone: true,
    materialShown: true,
    childrenCount: 0,
    classesCount: 0,
    privilegedCount: 0,
    showingsCount: 0,
    totalSum: 0,
    schoolPercentage: 20,
    rating: 8,
    directorSatisfied: true,
    teachersSatisfied: true,
    hadIssues: false,
    comment: "",
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExp, setNewExp] = useState({ name: "", amount: "" });
  const [salaries, setSalaries] = useState<Record<string, number>>({});
  const { data: inventoryItems } = useInventory();
  const [inventoryUsages, setInventoryUsages] = useState<Record<string, number>>({});
  const [autoSaveState, setAutoSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const lastReportId = useRef<string | undefined>();
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (report && report.id !== lastReportId.current) {
      lastReportId.current = report.id;
      setForm({
        announcementDone: report.announcementDone,
        materialShown: report.materialShown,
        childrenCount: report.childrenCount,
        classesCount: report.classesCount,
        privilegedCount: report.privilegedCount,
        showingsCount: report.showingsCount,
        totalSum: report.totalSum,
        schoolPercentage: report.totalSum > 0 && report.schoolSum > 0
          ? Math.round((report.schoolSum / report.totalSum) * 100)
          : 20,
        rating: report.rating,
        directorSatisfied: report.directorSatisfied ?? true,
        teachersSatisfied: report.teachersSatisfied ?? true,
        hadIssues: report.hadIssues ?? false,
        comment: report.comment ?? "",
      });
      setExpenses(report.expenseItems?.map((e) => ({ name: e.name ?? e.category ?? "", amount: e.amount })) ?? []);
      const salaryMap: Record<string, number> = {};
      for (const s of report.salaryRecords ?? []) {
        salaryMap[s.employeeId] = s.amount;
      }
      setSalaries(salaryMap);
    }
  }, [report]);

  const schoolSum = (form.totalSum * form.schoolPercentage) / 100;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const remainder = form.totalSum - schoolSum - totalExpenses;

  const crewMembers = [
    ...(crew?.host ? [{ id: crew.host.id, name: crew.host.name, role: "Ведучий" }] : []),
    ...(crew?.driver ? [{ id: crew.driver.id, name: crew.driver.name, role: "Водій" }] : []),
  ];

  const salariesArr = crewMembers
    .map((m) => ({ userId: m.id, name: m.name, amount: salaries[m.id] || 0, role: m.role }))
    .filter((s) => s.amount > 0);

  const handleAutoSave = useCallback(async () => {
    if (!report?.id) return;
    if (report.status !== "DRAFT" && report.status !== "NEEDS_REVISION") return;

    setAutoSaveState("saving");
    try {
      const schoolSum = (form.totalSum * form.schoolPercentage) / 100;
      const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
      const remainder = form.totalSum - schoolSum - totalExpenses;

      await onSaveDraft({
        id: report.id,
        announcementDone: form.announcementDone,
        materialShown: form.materialShown,
        childrenCount: form.childrenCount,
        classesCount: form.classesCount,
        privilegedCount: form.privilegedCount,
        showingsCount: form.showingsCount,
        totalSum: form.totalSum,
        schoolSum,
        remainderSum: remainder,
        rating: form.rating,
        directorSatisfied: form.directorSatisfied,
        teachersSatisfied: form.teachersSatisfied,
        hadIssues: form.hadIssues,
        comment: form.comment,
      });
      setAutoSaveState("saved");
      setTimeout(() => setAutoSaveState("idle"), 3000);
    } catch {
      setAutoSaveState("idle");
    }
  }, [form, expenses, report?.id, report?.status, onSaveDraft]);

  useEffect(() => {
    if (!report?.id) return;
    if (report.status !== "DRAFT" && report.status !== "NEEDS_REVISION") return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      handleAutoSave();
    }, 20000);

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [form, expenses, report?.id, report?.status, handleAutoSave]);

  const handleSaveDraft = () => {
    if (report) {
      onSaveDraft({
        id: report.id,
        announcementDone: form.announcementDone,
        materialShown: form.materialShown,
        childrenCount: form.childrenCount,
        classesCount: form.classesCount,
        privilegedCount: form.privilegedCount,
        showingsCount: form.showingsCount,
        totalSum: form.totalSum,
        schoolSum,
        remainderSum: remainder,
        rating: form.rating,
        directorSatisfied: form.directorSatisfied,
        teachersSatisfied: form.teachersSatisfied,
        hadIssues: form.hadIssues,
        comment: form.comment,
      });
    } else {
      onCreateDraft({
        eventId,
        announcementDone: form.announcementDone,
        materialShown: form.materialShown,
        childrenCount: form.childrenCount,
        classesCount: form.classesCount,
        privilegedCount: form.privilegedCount,
        showingsCount: form.showingsCount,
        totalSum: form.totalSum,
        schoolSum,
        remainderSum: remainder,
        rating: form.rating,
        directorSatisfied: form.directorSatisfied,
        teachersSatisfied: form.teachersSatisfied,
        hadIssues: form.hadIssues,
        comment: form.comment,
        expenses,
        salaries: salariesArr,
        inventoryUsages: Object.entries(inventoryUsages)
          .filter(([, qty]) => qty > 0)
          .map(([itemId, quantity]) => ({ itemId, quantity })),
      });
    }
  };

  const handleSubmit = () => {
    if (report) {
      onSaveDraft({
        id: report.id,
        announcementDone: form.announcementDone,
        materialShown: form.materialShown,
        childrenCount: form.childrenCount,
        classesCount: form.classesCount,
        privilegedCount: form.privilegedCount,
        showingsCount: form.showingsCount,
        totalSum: form.totalSum,
        schoolSum,
        remainderSum: remainder,
        rating: form.rating,
        directorSatisfied: form.directorSatisfied,
        teachersSatisfied: form.teachersSatisfied,
        hadIssues: form.hadIssues,
        comment: form.comment,
      });
      onSubmit(report.id);
    } else {
      onCreateDraft({
        eventId,
        announcementDone: form.announcementDone,
        materialShown: form.materialShown,
        childrenCount: form.childrenCount,
        classesCount: form.classesCount,
        privilegedCount: form.privilegedCount,
        showingsCount: form.showingsCount,
        totalSum: form.totalSum,
        schoolSum,
        remainderSum: remainder,
        rating: form.rating,
        directorSatisfied: form.directorSatisfied,
        teachersSatisfied: form.teachersSatisfied,
        hadIssues: form.hadIssues,
        comment: form.comment,
        expenses,
        salaries: salariesArr,
        inventoryUsages: Object.entries(inventoryUsages)
          .filter(([, qty]) => qty > 0)
          .map(([itemId, quantity]) => ({ itemId, quantity })),
      });
      onSubmit(report?.id ?? "");
    }
  };

  const addExpense = () => {
    const amount = Number(newExp.amount);
    if (!newExp.name.trim() || !amount) return;
    setExpenses((prev) => [...prev, { name: newExp.name.trim(), amount }]);
    setNewExp({ name: "", amount: "" });
  };

  const removeExpense = (index: number) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  if (reportLoading) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl">Завантаження...</div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div role="dialog" aria-modal="true" aria-labelledby={headingId}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <motion.div initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden pb-safe"
            style={{ willChange: "transform" }}>
            <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />

            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between shrink-0">
              <div className="min-w-0">
                <h3 id={headingId} className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
                  Звіт по події
                </h3>
                <p className="text-sm text-slate-500 mt-0.5 truncate">{schoolName}</p>
                {eventDate && <p className="text-xs text-slate-400 mt-0.5">{formatDate(eventDate)}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {autoSaveState === "saving" && (
                  <span className="text-xs text-slate-400">Збереження…</span>
                )}
                {autoSaveState === "saved" && (
                  <span className="text-xs text-emerald-600">Збережено</span>
                )}
                {report && <ReportStatusBadge status={report.status} />}
                <button ref={closeRef} onClick={onClose} aria-label="Закрити"
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none p-2 -mr-2">✕</button>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50/50">
              {report?.revisionComment && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl text-sm text-rose-700">
                  <p className="font-semibold mb-1">Коментар менеджера:</p>
                  <p>{report.revisionComment}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                  <CardHeader icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  } color="bg-violet-50 text-violet-600" title="Охоплення та Проведення" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    <Row label="Оголошення зроблено">
                      <TogglePill value={form.announcementDone} onChange={(v) => setForm({ ...form, announcementDone: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Матеріал показано">
                      <TogglePill value={form.materialShown} onChange={(v) => setForm({ ...form, materialShown: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Кількість дітей">
                      <NumberField value={form.childrenCount} onChange={(v) => setForm({ ...form, childrenCount: v })} suffix="дітей" disabled={!isEditable} />
                    </Row>
                    <Row label="Класів">
                      <NumberField value={form.classesCount} onChange={(v) => setForm({ ...form, classesCount: v })} suffix="кл." disabled={!isEditable} />
                    </Row>
                    <Row label="Пільгових дітей">
                      <NumberField value={form.privilegedCount} onChange={(v) => setForm({ ...form, privilegedCount: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Кількість показів">
                      <NumberField value={form.showingsCount} onChange={(v) => setForm({ ...form, showingsCount: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Директор задоволений">
                      <TogglePill value={form.directorSatisfied} onChange={(v) => setForm({ ...form, directorSatisfied: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Вчителі задоволені">
                      <TogglePill value={form.teachersSatisfied} onChange={(v) => setForm({ ...form, teachersSatisfied: v })} disabled={!isEditable} />
                    </Row>
                    <Row label="Були проблеми">
                      <TogglePill value={form.hadIssues} onChange={(v) => setForm({ ...form, hadIssues: v })} disabled={!isEditable} />
                    </Row>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                  <CardHeader icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
                      <path d="M16 12h6v4h-6a2 2 0 1 1 0-4z" />
                    </svg>
                  } color="bg-amber-50 text-amber-600" title="Фінансовий результат" />
                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-sm text-slate-500 font-medium">Загальна виручка</span>
                    <span className="inline-flex items-center gap-1">
                      <input type="number" min={0} value={form.totalSum || ""} disabled={!isEditable}
                        onChange={(e) => setForm({ ...form, totalSum: +e.target.value })}
                        className={`w-28 text-right bg-transparent outline-none font-bold text-lg text-slate-800 focus:bg-blue-50 rounded px-1 ${!isEditable ? "opacity-60" : ""}`}
                        placeholder="0" />
                      <span className="text-slate-400 text-sm">грн</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-sm text-slate-500">Відсоток закладу</span>
                    <NumberField value={form.schoolPercentage} onChange={(v) => setForm({ ...form, schoolPercentage: v })} suffix="%" disabled={!isEditable} />
                  </div>
                  <Row label={`Сума закладу (${form.schoolPercentage}%)`}>
                    <span>{formatMoney(schoolSum)} грн</span>
                  </Row>
                  <div className="py-3 border-b border-slate-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-500">Додаткові витрати</span>
                      <span className="text-sm font-medium text-rose-500">−{formatMoney(totalExpenses)} грн</span>
                    </div>
                    {expenses.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {expenses.map((exp, i) => (
                          <span key={i} className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full pl-3 pr-1.5 py-1 text-xs">
                            <span className="text-slate-600">{exp.name}</span>
                            <span className="font-semibold text-slate-700">{formatMoney(exp.amount)} грн</span>
                            {isEditable && (
                              <button onClick={() => removeExpense(i)} className="text-slate-400 hover:text-rose-500 w-4 h-4 rounded-full flex items-center justify-center hover:bg-white">✕</button>
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                    {isEditable && (
                      <div className="flex gap-2 mt-2">
                        <input placeholder="Назва витрати" value={newExp.name}
                          onChange={(e) => setNewExp({ ...newExp, name: e.target.value })}
                          className="flex-1 min-w-0 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        <input type="number" min={0} placeholder="грн" value={newExp.amount}
                          onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
                          className="w-20 sm:w-24 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        <button onClick={addExpense} type="button"
                          className="px-3 shrink-0 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium text-sm">+</button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
                    <span className="text-sm font-semibold text-emerald-700">Залишок ({100 - form.schoolPercentage}%)</span>
                    <span className="text-lg font-bold text-emerald-700">{formatMoney(remainder)} грн</span>
                  </div>
                </div>

                {crewMembers.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                    <CardHeader icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                    } color="bg-blue-50 text-blue-600" title="Заробітня плата" />
                    <div className="space-y-1">
                      {crewMembers.map((m) => (
                        <Row key={m.id} label={`${m.name} (${m.role})`}>
                          <span className="inline-flex items-center gap-1">
                            <input type="number" min={0} value={salaries[m.id] || ""} disabled={!isEditable}
                              onChange={(e) => setSalaries((prev) => ({ ...prev, [m.id]: +e.target.value }))}
                              className={`w-24 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1 ${!isEditable ? "opacity-60" : ""}`}
                              placeholder="0" />
                            <span className="text-slate-400 text-xs">грн</span>
                          </span>
                        </Row>
                      ))}
                    </div>
                    {crewMembers.some((m) => salaries[m.id] > 0) && (
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                        <span className="text-sm font-semibold text-slate-500">Разом ЗП</span>
                        <span className="font-bold text-blue-600">{formatMoney(crewMembers.reduce((s, m) => s + (salaries[m.id] || 0), 0))} грн</span>
                      </div>
                    )}
                  </div>
                )}

                {inventoryItems && inventoryItems.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                    <CardHeader icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    } color="bg-teal-50 text-teal-600" title="Витрата матеріалів" />
                    <div className="space-y-2">
                      {inventoryItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-700">{item.name}</span>
                            <span className="text-xs text-slate-400">({item.unit})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400">
                              {item.currentStock} {item.unit}
                            </span>
                            <input
                              type="number"
                              min={0}
                              max={item.currentStock}
                              value={inventoryUsages[item.id] || ""}
                              disabled={!isEditable}
                              onChange={(e) =>
                                setInventoryUsages((prev) => ({
                                  ...prev,
                                  [item.id]: +e.target.value,
                                }))
                              }
                              className={`w-16 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1 ${!isEditable ? "opacity-60" : ""}`}
                              placeholder="0"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isEditable && (
                  <div className="md:col-span-2">
                    <label className="text-sm text-slate-500 block mb-1">Коментар</label>
                    <textarea value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      rows={3} disabled={!isEditable}
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      placeholder="Додаткові коментарі..." />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 px-4 sm:px-6 py-4 border-t border-slate-100 bg-white shrink-0">
              <button onClick={onClose}
                className="flex-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium py-3">
                {isEditable ? "Скасувати" : "Закрити"}
              </button>
              {isEditable && (
                <>
                  <button onClick={handleSaveDraft} disabled={submitLoading}
                    className="flex-1 bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-xl font-medium py-3 disabled:opacity-50">
                    {report ? "Зберегти чернетку" : "Створити чернетку"}
                  </button>
                  <button onClick={handleSubmit} disabled={submitLoading}
                    className="flex-1 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 py-3 disabled:opacity-50">
                    {submitLoading ? "..." : "Подати"}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/features/reports/components/ReportStatusBadge.tsx

```
import type { ReportStatus } from "../../../types";

const LABELS: Record<ReportStatus, string> = {
  DRAFT: "Чернетка",
  SUBMITTED: "На перевірці",
  NEEDS_REVISION: "На доопрацюванні",
  APPROVED: "Затверджено",
  REJECTED: "Відхилено",
  CLOSED: "Закрито",
};

const COLORS: Record<ReportStatus, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SUBMITTED: "bg-amber-50 text-amber-700",
  NEEDS_REVISION: "bg-rose-50 text-rose-600",
  APPROVED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-600",
  CLOSED: "bg-slate-200 text-slate-500",
};

export default function ReportStatusBadge({
  status,
  className = "",
}: {
  status: ReportStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${COLORS[status] ?? "bg-slate-100 text-slate-600"} ${className}`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}

```

# FILE: apps/frontend/src/features/reports/pages/ReportsReviewPage.tsx

```
import { useState } from "react";
import { useSubmittedReports, useApproveReport, useRequestRevision, useRejectReport } from "../../../hooks/useReports";
import ReportStatusBadge from "../components/ReportStatusBadge";
import type { ExpenseItem, SalaryRecord } from "../../../types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("uk-UA", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

function fmt(n: number) {
  return new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
}

export default function ReportsReviewPage() {
  const { data: reports = [], isLoading } = useSubmittedReports();
  const approveMutation = useApproveReport();
  const revisionMutation = useRequestRevision();
  const rejectMutation = useRejectReport();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [actionTarget, setActionTarget] = useState<{ id: string; action: "revision" | "reject" } | null>(null);

  const handleApprove = (id: string) => {
    approveMutation.mutate(id);
  };

  const handleRequestRevision = (id: string) => {
    if (!comment.trim()) return;
    revisionMutation.mutate({ id, comment: comment.trim() });
    setComment("");
    setActionTarget(null);
  };

  const handleReject = (id: string) => {
    if (!comment.trim()) return;
    rejectMutation.mutate({ id, comment: comment.trim() });
    setComment("");
    setActionTarget(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setActionTarget(null);
    setComment("");
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Перевірка звітів</h1>
        <p className="text-sm text-slate-500 mt-1">
          {reports.length > 0
            ? `${reports.length} звітів очікують перевірки`
            : "Немає звітів, що очікують перевірки"}
        </p>
      </div>

      {isLoading && (
        <div className="text-center text-slate-400 py-16">Завантаження...</div>
      )}

      {!isLoading && reports.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
          Усі звіти перевірено
        </div>
      )}

      {!isLoading && reports.length > 0 && (
        <div className="space-y-4">
          {reports.map((r) => {
            const ev = (r as Record<string, unknown>).event as Record<string, unknown> | undefined;
            const school = (ev?.school ?? {}) as Record<string, unknown>;
            const city = (ev?.city ?? {}) as Record<string, unknown>;
            const crew = (ev?.crew ?? {}) as Record<string, unknown>;
            const isExpanded = expandedId === r.id;
            const totalExpenses = (r.expenseItems ?? []).reduce((s: number, e: ExpenseItem) => s + e.amount, 0);

            return (
              <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <button onClick={() => toggleExpand(r.id)} className="w-full text-left p-4 sm:p-5 hover:bg-slate-50 transition flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-800">{school.name ?? "—"}</span>
                      <span className="text-xs text-slate-400">· {city.name ?? "—"}</span>
                      <span className="text-xs text-slate-400">· {school.type ?? ""}</span>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      {ev.project ?? ""} · {ev.date ? formatDate(ev.date) : ""}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span>Хост: {crew?.host?.name ?? "—"}</span>
                      <span>Водій: {crew?.driver?.name ?? "—"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ReportStatusBadge status={r.status} />
                    <span className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}>▾</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-slate-100 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Результати</h4>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between"><span className="text-slate-500">Дітей:</span><span className="font-medium">{r.childrenCount}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Класів:</span><span className="font-medium">{r.classesCount}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Пільговиків:</span><span className="font-medium">{r.privilegedCount}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Сеансів:</span><span className="font-medium">{r.showingsCount}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Рейтинг:</span><span className="font-bold text-amber-600">{r.rating}/10</span></div>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Фінанси</h4>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between"><span className="text-slate-500">Виручка:</span><span className="font-bold">{fmt(r.totalSum)} грн</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Закладу:</span><span className="text-rose-600">−{fmt(r.schoolSum)} грн</span></div>
                          {totalExpenses > 0 && (
                            <div className="flex justify-between"><span className="text-slate-500">Витрати:</span><span className="text-rose-600">−{fmt(totalExpenses)} грн</span></div>
                          )}
                          <div className="flex justify-between pt-1 border-t border-slate-200"><span className="font-semibold text-slate-700">Чистий прибуток:</span><span className="font-bold text-emerald-600">{fmt(r.remainderSum)} грн</span></div>
                        </div>
                        {(r.salaryRecords ?? []).length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Зарплати</h5>
                            {r.salaryRecords.map((s: SalaryRecord, i: number) => (
                              <div key={i} className="flex justify-between text-xs"><span>{s.employee?.name ?? "—"}</span><span className="text-blue-600">{fmt(s.amount)} грн</span></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {r.comment && (
                      <div className="mb-4 p-3 bg-slate-50 rounded-xl text-sm text-slate-600 italic">
                        {r.comment}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => handleApprove(r.id)} disabled={approveMutation.isPending}
                        className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 transition">
                        Затвердити
                      </button>

                      {actionTarget?.id === r.id && actionTarget.action === "revision" ? (
                        <div className="w-full flex gap-2 items-start mt-2">
                          <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                            rows={2} placeholder="Обов'язково вкажіть, що потрібно виправити"
                            className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
                          <button onClick={() => handleRequestRevision(r.id)} disabled={!comment.trim() || revisionMutation.isPending}
                            className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 text-sm shrink-0">
                            Відправити
                          </button>
                          <button onClick={() => { setActionTarget(null); setComment(""); }}
                            className="px-3 py-2 text-slate-500 hover:text-slate-700 text-sm">✕</button>
                        </div>
                      ) : (
                        <button onClick={() => { setActionTarget({ id: r.id, action: "revision" }); setComment(""); }}
                          className="px-5 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl font-medium hover:bg-amber-100 transition">
                          На доопрацювання
                        </button>
                      )}

                      {actionTarget?.id === r.id && actionTarget.action === "reject" ? (
                        <div className="w-full flex gap-2 items-start mt-2">
                          <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                            rows={2} placeholder="Обов'язково вкажіть причину відхилення"
                            className="flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none resize-none" />
                          <button onClick={() => handleReject(r.id)} disabled={!comment.trim() || rejectMutation.isPending}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 text-sm shrink-0">
                            Відхилити
                          </button>
                          <button onClick={() => { setActionTarget(null); setComment(""); }}
                            className="px-3 py-2 text-slate-500 hover:text-slate-700 text-sm">✕</button>
                        </div>
                      ) : (
                        <button onClick={() => { setActionTarget({ id: r.id, action: "reject" }); setComment(""); }}
                          className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl font-medium hover:bg-red-100 transition">
                          Відхилити
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/features/salary/components/SalaryStatusBadge.tsx

```
import type { SalaryStatus } from "../../../types";

const config: Record<SalaryStatus, { bg: string; text: string; label: string }> = {
  PENDING: { bg: "bg-amber-100", text: "text-amber-700", label: "Очікує" },
  PAID: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Виплачено" },
  CANCELLED: { bg: "bg-slate-100", text: "text-slate-500", label: "Скасовано" },
};

export default function SalaryStatusBadge({ status }: { status: SalaryStatus }) {
  const c = config[status] ?? config.PENDING;
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

```

# FILE: apps/frontend/src/features/salary/pages/Company.tsx

```
import { useState, lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../config/api";
import { useSelectedCity } from "../../../context/CityContext";
import type { FinanceDashboardData } from "../../../types";

const FinanceCharts = lazy(() => import("../../../components/finance/FinanceCharts"));

function FinanceSkeleton() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-xl w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
      <div className="h-64 bg-white rounded-2xl border border-slate-100" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-48 bg-white rounded-2xl border border-slate-100" />
        <div className="h-48 bg-white rounded-2xl border border-slate-100" />
      </div>
    </div>
  );
}

export default function Company() {
  const { selectedCity } = useSelectedCity();
  const [period, setPeriod] = useState("year");
  const [projectFilter, setProjectFilter] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["finance", selectedCity.id, period, projectFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (period) params.set("period", period);
      if (selectedCity?.id) params.set("cityId", selectedCity.id);
      if (projectFilter) params.set("project", projectFilter);
      const res = await api.get(`/finance/dashboard?${params}`);
      return res.data as FinanceDashboardData;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !data) return <FinanceSkeleton />;

  return (
    <Suspense fallback={<FinanceSkeleton />}>
      <FinanceCharts
        data={data}
        period={period}
        setPeriod={setPeriod}
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        selectedCity={selectedCity}
      />
    </Suspense>
  );
}

```

# FILE: apps/frontend/src/features/salary/pages/MySalary.tsx

```
import { useMySalary } from "../../../hooks/useSalary";
import { useAuth } from "../../../context/AuthContext";
import { useSelectedCity } from "../../../context/CityContext";
import SalaryStatusBadge from "../components/SalaryStatusBadge";

const fmt = (n: number) => new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));

export default function MySalary() {
  const { user } = useAuth();
  const { selectedCity } = useSelectedCity();
  const { data: records = [], isLoading } = useMySalary(
    user?.role === "MANAGER" || user?.role === "SUPERADMIN" ? undefined : selectedCity.id,
  );

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="p-4">
        <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
          Ще немає нарахувань
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {records.map((r) => (
        <div key={r.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-800">{r.event?.project ?? "—"}</span>
            <SalaryStatusBadge status={r.status} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">{r.event?.date ? new Date(r.event.date).toLocaleDateString("uk-UA") : "—"}</span>
            <span className="font-bold text-blue-600">{fmt(r.amount)} грн</span>
          </div>
          {r.comment && <p className="text-xs text-slate-400 mt-1">{r.comment}</p>}
        </div>
      ))}
    </div>
  );
}

```

# FILE: apps/frontend/src/features/salary/pages/TeamSalaries.tsx

```
import { useAllSalary, useMarkPaid } from "../../../hooks/useSalary";
import { useSelectedCity } from "../../../context/CityContext";
import SalaryStatusBadge from "../components/SalaryStatusBadge";

const fmt = (n: number) => new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));

export default function TeamSalaries() {
  const { selectedCity } = useSelectedCity();
  const { data: records = [], isLoading } = useAllSalary(selectedCity.id);
  const markPaidMutation = useMarkPaid();

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="p-4">
        <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
          Немає нарахувань для цього міста
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {records.map((r) => (
        <div key={r.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-800">{r.employee?.name ?? "—"}</span>
            <SalaryStatusBadge status={r.status} />
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500">{r.event?.project ?? "—"} · {r.event?.date ? new Date(r.event.date).toLocaleDateString("uk-UA") : "—"}</span>
            <span className="font-bold text-blue-600">{fmt(r.amount)} грн</span>
          </div>
          {r.comment && <p className="text-xs text-slate-400 mb-2">{r.comment}</p>}
          {r.status === "PENDING" && (
            <button
              onClick={() => markPaidMutation.mutate(r.id)}
              disabled={markPaidMutation.isPending}
              className="w-full mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              Позначити виплаченим
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

```

# FILE: apps/frontend/src/hooks/useAnalytics.ts

```
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  profit: number;
  events: number;
}

export interface CityEvents {
  cityId: string;
  cityName: string;
  events: number;
}

export interface CityProfit {
  cityId: string;
  cityName: string;
  revenue: number;
  profit: number;
  expenses: number;
  count: number;
}

export interface SalaryFund {
  total: number;
  month: number;
  year: number;
  byCity?: Record<string, number>;
}

export interface Roi {
  totalRevenue: number;
  totalExpenses: number;
  salaryExpenses: number;
  profit: number;
  roi: number;
}

export function useRevenueByMonth(params?: { cityId?: string; projectId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "revenue-by-month", params],
    queryFn: () => api.get<MonthlyRevenue[]>("/analytics/revenue-by-month", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useEventsByCity(params?: { year?: number }) {
  return useQuery({
    queryKey: ["analytics", "events-by-city", params],
    queryFn: () => api.get<CityEvents[]>("/analytics/events-by-city", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProfitByCity(params?: { cityId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "profit-by-city", params],
    queryFn: () => api.get<CityProfit[]>("/analytics/profit-by-city", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSalaryFund(params?: { month?: number; year?: number; cityId?: string }) {
  return useQuery({
    queryKey: ["analytics", "salary-fund", params],
    queryFn: () => api.get<SalaryFund>("/analytics/salary-fund", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRoi(params?: { cityId?: string; year?: number }) {
  return useQuery({
    queryKey: ["analytics", "roi", params],
    queryFn: () => api.get<Roi>("/analytics/roi", { params }).then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

```

# FILE: apps/frontend/src/hooks/useApi.ts

```
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { api } from "../config/api";
import type { City, School } from "../types";

export function useAddCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api.post<City>("/cities", { name }).then((r) => r.data),
    onSuccess: (newCity) => {
      qc.setQueryData(["cities"], (old: City[] = []) => [newCity, ...old]);
    },
  });
}

export interface SchoolFilters {
  search?: string;
  cityId?: string;
  type?: "Школа" | "Садочок";
  stage?: "new" | "planned" | "inProgress" | "done";
  size?: "small" | "medium" | "large";
}

interface SchoolsPage {
  data: School[];
  meta: {
    totalItems: number;
    page: number;
    take: number;
    pageCount: number;
    hasNextPage: boolean;
  };
}

export function useSchools(filters: SchoolFilters = {}) {
  return useInfiniteQuery({
    queryKey: ["schools", filters],
    queryFn: ({ pageParam = 1 }) =>
      api
        .get<SchoolsPage>("/schools", {
          params: { ...filters, page: pageParam, take: 30 },
        })
        .then((r) => r.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSchoolStats(
  filters: Pick<SchoolFilters, "cityId" | "type" | "stage"> = {},
) {
  return useQuery({
    queryKey: ["schoolStats", filters],
    queryFn: () =>
      api
        .get("/schools/stats", { params: filters })
        .then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useSupportedCities() {
  return useQuery({
    queryKey: ["supportedCities"],
    queryFn: () =>
      api
        .get<string[]>("/schools/supported-cities")
        .then((r) => r.data),
    staleTime: 60 * 60 * 1000,
  });
}

export function useAddSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<School>) =>
      api
        .post<School>("/schools", data)
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
    },
  });
}

export function useDeleteSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (schoolId: string) =>
      api.delete(`/schools/${schoolId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
    },
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => api.get("/events").then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function usePrefetchSchool() {
  const qc = useQueryClient();
  return (schoolId: string) => {
    qc.prefetchQuery({
      queryKey: ["school", schoolId],
      queryFn: () =>
        api
          .get<School>(`/schools/${schoolId}`)
          .then((r) => r.data),
      staleTime: 2 * 60 * 1000,
    });
  };
}

```

# FILE: apps/frontend/src/hooks/useCalendar.ts

```
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import type { Event, Project } from "../types";

export function useCalendarEvents() {
  return useQuery<Event[]>({
    queryKey: ["calendarEvents"],
    queryFn: () =>
      api.get<{ data: Event[] }>("/events").then((r) => r.data.data),
    staleTime: 60 * 1000,
  });
}

export function useCalendarProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () =>
      api.get<{ data: Project[] }>("/projects").then((r) => r.data.data),
    staleTime: 5 * 60 * 1000,
  });
}

```

# FILE: apps/frontend/src/hooks/useCities.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { City, CityProfile } from "../types";

export function useCities() {
  return useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => api.get<City[]>("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCity(id: string | undefined) {
  return useQuery<CityProfile>({
    queryKey: ["city", id],
    queryFn: () => api.get<CityProfile>(`/cities/${id}`).then((r) => r.data),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api.post("/cities", { name }).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData<City[]>(["cities"], (old) =>
        Array.isArray(old) ? [data, ...old] : [data],
      );
    },
  });
}

export function useCreateCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: { name: string; hostId: string; driverId: string }) =>
      api.post(`/cities/${cityId}/crews`, form).then((r) => r.data),
    onMutate: async (form) => {
      await qc.cancelQueries({ queryKey: ["city", cityId] });
      const prev = qc.getQueryData<CityProfile>(["city", cityId]);
      const optimistic: Crew = { id: `temp-${Date.now()}`, ...form, name: form.name, cityId: cityId! };
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old ? { ...old, crews: [...(old.crews || []), optimistic] } : old,
      );
      return { prev };
    },
    onSuccess: (data) => {
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old
          ? {
              ...old,
              crews: old.crews?.map((c: Crew) =>
                c.id?.startsWith("temp-") ? data : c,
              ),
            }
          : old,
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<CityProfile>(["city", cityId], ctx.prev);
    },
  });
}

export function useDeleteCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (crewId: string) =>
      api.delete(`/cities/crews/${crewId}`).then((r) => r.data),
    onMutate: async (crewId) => {
      await qc.cancelQueries({ queryKey: ["city", cityId] });
      const prev = qc.getQueryData<CityProfile>(["city", cityId]);
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old
          ? { ...old, crews: old.crews?.filter((c: Crew) => c.id !== crewId) }
          : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<CityProfile>(["city", cityId], ctx.prev);
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useDashboardData.ts

```
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import type { FinanceDashboardData } from "../types";
import { useSelectedCity } from "../context/CityContext";

export function useFinanceDashboard(period = "month") {
  const { selectedCity } = useSelectedCity();

  return useQuery<FinanceDashboardData>({
    queryKey: ["finance", "dashboard", period, selectedCity.id],
    queryFn: () =>
      api
        .get<FinanceDashboardData>("/finance/dashboard", {
          params: {
            period,
            cityId: selectedCity.id || undefined,
          },
        })
        .then((r) => r.data),
    staleTime: 60 * 1000,
  });
}

```

# FILE: apps/frontend/src/hooks/useDashboardSummary.ts

```
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";

export interface DashboardSummary {
  todayEvents: TodayEvent[];
  upcomingEvents: UpcomingEvent[];
  funnel: Record<string, number>;
  totalSchools: number;
  monthlyKpi: {
    revenue: number;
    profit: number;
    children: number;
    count: number;
  };
  staleSchools: StaleSchool[];
  activityFeed: ActivityFeedItem[];
  citiesStats: CityStat[];
}

interface TodayEvent {
  id: string;
  time?: string | null;
  project: string;
  school?: { id: string; name: string } | null;
  crew?: {
    id: string;
    name?: string;
    host?: { id: string; name: string } | null;
    driver?: { id: string; name: string } | null;
  } | null;
}

interface UpcomingEvent {
  id: string;
  date: string;
  time?: string | null;
  project: string;
  school?: { id: string; name: string } | null;
  crew?: {
    id: string;
    name?: string;
    host?: { id: string; name: string } | null;
    driver?: { id: string; name: string } | null;
  } | null;
}

interface StaleSchool {
  id: string;
  name: string;
  status: string | null;
  lastActivity: string | null;
  daysStale: number | null;
}

interface ActivityFeedItem {
  id: string;
  userName: string;
  role: string;
  action: string;
  comment: string | null;
  createdAt: string;
  schoolId: string | null;
  schoolName: string | null;
  eventId: string | null;
}

interface CityStat {
  cityId: string;
  cityName: string;
  schoolsCount: number;
  activeEvents: number;
  monthRevenue: number;
}

export function useDashboardSummary() {
  const { selectedCity } = useSelectedCity();

  return useQuery<DashboardSummary>({
    queryKey: ["dashboard", "summary", selectedCity.id],
    queryFn: () =>
      api
        .get<DashboardSummary>("/dashboard/summary", {
          params: { cityId: selectedCity.id || undefined },
        })
        .then((r) => r.data),
    staleTime: 60 * 1000,
  });
}

```

# FILE: apps/frontend/src/hooks/useDaysOff.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface DayOff {
  id: string;
  userId: string;
  date: string;
  user: { id: string; name: string; role: string; cityId: string | null };
}

export function useDaysOff(from?: string, to?: string, cityId?: string) {
  return useQuery({
    queryKey: ["daysOff", from, to, cityId],
    queryFn: () => {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (cityId) params.set("cityId", cityId);
      return api.get<DayOff[]>(`/days-off?${params}`).then((r) => r.data);
    },
    staleTime: 30 * 1000,
  });
}

export function useCreateDayOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { date: string; userId?: string }) =>
      api.post<DayOff>("/days-off", payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}

export function useDeleteDayOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/days-off/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useDebounce.ts

```
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

```

# FILE: apps/frontend/src/hooks/useEmployees.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { User, Project } from "../types";

export interface UserFormData {
  fullName: string;
  phone: string;
  email: string;
  cityId: string;
  role: string;
  password: string;
  telegramId: string;
  car: string;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      api.get<User[]>("/users", undefined).then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      api.get<Project[]>("/projects", undefined).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: UserFormData) =>
      api.post<User>("/users", form, undefined).then((r) => r.data),
    onMutate: async (form) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      const optimistic = {
        id: `temp-${Date.now()}`,
        name: form.fullName,
        ...form,
      };
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old) ? [...old, optimistic] : [optimistic],
      );
      return { prev };
    },
    onSuccess: (data) => {
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) => (u.id?.startsWith("temp-") ? data : u))
          : [data],
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, form }: { id: string; form: Partial<UserFormData> }) =>
      api
        .patch<User>(`/users/${id}`, form, undefined)
        .then((r) => r.data),
    onMutate: async ({ id, form }) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) =>
              u.id === id
                ? { ...u, name: form.fullName ?? u.name, ...form }
                : u,
            )
          : old,
      );
      return { prev };
    },
    onSuccess: (data, vars) => {
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) => (u.id === vars.id ? { ...u, ...data } : u))
          : old,
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/users/${id}`, undefined).then((r) => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old) ? old.filter((u) => u.id !== id) : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: {
      name: string;
      color: string;
      pricePerChild?: number;
    }) =>
      api
        .post<Project>("/projects", form, undefined)
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old) ? [...old, data] : [data],
      );
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      form,
    }: {
      id: string;
      form: { name?: string; color?: string; pricePerChild?: number };
    }) =>
      api
        .patch<Project>(`/projects/${id}`, form, undefined)
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old)
          ? old.map((p) => (p.id === vars.id ? { ...p, ...data } : p))
          : old,
      );
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/projects/${id}`, undefined).then((r) => r.data),
    onSuccess: (_data, id) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old) ? old.filter((p) => p.id !== id) : old,
      );
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useInventory.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { InventoryItem, CreateInventoryPayload, UpdateInventoryPayload } from "../types";

export function useInventory(filters?: { category?: string; cityId?: string; lowStock?: string; search?: string }) {
  const params = new URLSearchParams();
  if (filters?.category) params.set("category", filters.category);
  if (filters?.cityId) params.set("cityId", filters.cityId);
  if (filters?.lowStock) params.set("lowStock", filters.lowStock);
  if (filters?.search) params.set("search", filters.search);
  const qs = params.toString();

  return useQuery({
    queryKey: ["inventory", filters],
    queryFn: () => api.get<InventoryItem[]>(`/inventory${qs ? `?${qs}` : ""}`).then(r => r.data),
    staleTime: 30 * 1000,
  });
}

export function useLowStockItems() {
  return useQuery({
    queryKey: ["inventory", "low-stock"],
    queryFn: () => api.get<InventoryItem[]>("/inventory/low-stock").then(r => r.data),
    staleTime: 30 * 1000,
  });
}

export function useCreateInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInventoryPayload) =>
      api.post<InventoryItem>("/inventory", data).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useUpdateInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UpdateInventoryPayload) =>
      api.patch<InventoryItem>(`/inventory/${id}`, data).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useDeleteInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/inventory/${id}`).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useInventoryByProject(project: string | undefined) {
  return useQuery({
    queryKey: ["inventory", "by-project", project],
    queryFn: () =>
      api
        .get<InventoryItem[]>(`/inventory/by-project?project=${encodeURIComponent(project ?? "")}`)
        .then((r) => r.data),
    enabled: !!project,
    staleTime: 30 * 1000,
  });
}

export function useAddStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      api.post(`/inventory/${id}/add-stock`, { quantity }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

```

# FILE: apps/frontend/src/hooks/useNotifications.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface NotificationItem {
  id: string;
  userId: string;
  type: string;
  payload: Record<string, unknown>;
  readAt: string | null;
  createdAt: string;
}

export function useNotifications(page = 1) {
  return useQuery({
    queryKey: ["notifications", page],
    queryFn: () => api.get<{ items: NotificationItem[]; total: number; page: number; pageCount: number }>("/notifications", { params: { page } }).then(r => r.data),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => api.get<{ count: number }>("/notifications/unread-count").then(r => r.data),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/notifications/${id}/read`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notifications"] }); },
  });
}

export function useMarkAllRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.patch("/notifications/read-all"),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notifications"] }); },
  });
}

```

# FILE: apps/frontend/src/hooks/useReports.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { EventReport } from "../types";

export function useReport(eventId: string | undefined) {
  return useQuery({
    queryKey: ["report", eventId],
    queryFn: () =>
      api
        .get<EventReport>(`/reports/event/${eventId}`)
        .then((r) => r.data),
    enabled: !!eventId,
    staleTime: 30 * 1000,
  });
}

export function useSubmittedReports() {
  return useQuery({
    queryKey: ["reports", "submitted"],
    queryFn: () =>
      api.get<EventReport[]>("/reports/submitted").then((r) => r.data),
    staleTime: 30 * 1000,
  });
}

export function useCreateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: {
      eventId: string;
      announcementDone?: boolean;
      materialShown?: boolean;
      childrenCount?: number;
      classesCount?: number;
      privilegedCount?: number;
      showingsCount?: number;
      totalSum?: number;
      schoolSum?: number;
      remainderSum?: number;
      rating?: number;
      directorSatisfied?: boolean;
      teachersSatisfied?: boolean;
      hadIssues?: boolean;
      comment?: string;
    }) => api.post<EventReport>("/reports", dto).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
    },
  });
}

export function useUpdateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...dto
    }: {
      id: string;
      announcementDone?: boolean;
      materialShown?: boolean;
      childrenCount?: number;
      classesCount?: number;
      privilegedCount?: number;
      showingsCount?: number;
      totalSum?: number;
      schoolSum?: number;
      remainderSum?: number;
      rating?: number;
      directorSatisfied?: boolean;
      teachersSatisfied?: boolean;
      hadIssues?: boolean;
      comment?: string;
    }) => api.patch<EventReport>(`/reports/${id}`, dto).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
    },
  });
}

export function useSubmitReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.post<EventReport>(`/reports/${id}/submit`).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}

export function useApproveReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.post<EventReport>(`/reports/${id}/approve`).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}

export function useRequestRevision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      api
        .post<EventReport>(`/reports/${id}/request-revision`, { comment })
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}

export function useRejectReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      api
        .post<EventReport>(`/reports/${id}/reject`, { comment })
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useSalary.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { SalaryRecord } from "../types";

export function useMySalary(cityId?: string) {
  return useQuery({
    queryKey: ["salary", "mine", cityId],
    queryFn: () =>
      api
        .get<SalaryRecord[]>("/salary/mine", { params: { cityId } })
        .then((r) => r.data),
    staleTime: 30 * 1000,
  });
}

export function useAllSalary(cityId?: string) {
  return useQuery({
    queryKey: ["salary", "all", cityId],
    queryFn: () =>
      api
        .get<SalaryRecord[]>("/salary", { params: { cityId } })
        .then((r) => r.data),
    staleTime: 30 * 1000,
  });
}

export function useCreateSalary() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: {
      reportId: string;
      items: { employeeId: string; amount: number; comment?: string }[];
    }) => api.post("/salary", dto).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["salary"] });
    },
  });
}

export function useMarkPaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/salary/${id}/mark-paid`).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["salary"] });
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useSchoolComments.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { CommentType } from "../types";

export interface SchoolCommentItem {
  id: string;
  schoolId: string;
  authorId: string;
  type: CommentType;
  text: string;
  createdAt: string;
  author: { id: string; name: string; role: string };
}

export function useSchoolComments(schoolId: string, type?: CommentType, page = 1) {
  return useQuery({
    queryKey: ["school-comments", schoolId, type, page],
    queryFn: () =>
      api
        .get<{ items: SchoolCommentItem[]; total: number; page: number; pageCount: number }>(
          `/schools/${schoolId}/comments`,
          { params: { type, page, take: 20 } },
        )
        .then((r) => r.data),
    enabled: !!schoolId,
    staleTime: 60 * 1000,
  });
}

export function useCreateSchoolComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      schoolId,
      type,
      text,
    }: {
      schoolId: string;
      type: CommentType;
      text: string;
    }) =>
      api
        .post(`/schools/${schoolId}/comments`, { type, text })
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["school-comments", vars.schoolId] });
    },
  });
}

export function useDeleteSchoolComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      schoolId,
      commentId,
    }: {
      schoolId: string;
      commentId: string;
    }) => api.delete(`/schools/${schoolId}/comments/${commentId}`).then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["school-comments", vars.schoolId] });
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useSchoolProfile.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type {
  Event,
  EventHistory,
  SchoolProfileData,
  CreateEventPayload,
} from "../types";
import type { ReportData } from "../components/school-profile/modals/ReportModal";

export function useSchool(id: string | undefined) {
  return useQuery({
    queryKey: ["school", id],
    queryFn: async () => {
      const res = await api.get(`/schools/${id}`);
      return res.data;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSchoolCompletedEvents(schoolId: string | undefined) {
  return useQuery({
    queryKey: ["schoolCompletedEvents", schoolId],
    queryFn: async () => {
      const res = await api.get<Event[]>(
        `/events/school/${schoolId}/completed`,
      );
      return res.data;
    },
    enabled: !!schoolId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSchoolEvents(schoolId: string | undefined, full = false) {
  return useQuery({
    queryKey: ["schoolEvents", schoolId, full],
    queryFn: async () => {
      const url = full
        ? `/events/school/${schoolId}`
        : `/events/school/${schoolId}?minimal=true`;
      const res = await api.get<Event[]>(url, undefined);
      return res.data.filter((ev) => ev.status !== "RE_SALE");
    },
    enabled: !!schoolId,
    staleTime: 60 * 1000,
  });
}

export function useEventFull(eventId: string | undefined) {
  return useQuery({
    queryKey: ["eventFull", eventId],
    queryFn: async () => {
      const res = await api.get<Event>(`/events/${eventId}`);
      return res.data;
    },
    enabled: !!eventId,
    staleTime: 30 * 1000,
  });
}

export { useUsers } from "./useEmployees";

export function useUpdateEventStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      status,
      actionName,
      comment,
    }: {
      eventId: string;
      status: string;
      actionName: string;
      comment?: string;
    }) =>
      api
        .patch(
          `/events/${eventId}/status`,
          { status, actionName, comment },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], data);
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old)
            ? old
                .map((ev) =>
                  ev.id === vars.eventId
                    ? { ...ev, status: vars.status, ...data }
                    : ev,
                )
                .filter((ev) => ev.status !== "RE_SALE")
            : old,
      );
    },
  });
}

export function useUpdatePreparation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      field,
      status,
    }: {
      eventId: string;
      field: string;
      status: string;
    }) =>
      api
        .patch(
          `/events/${eventId}/preparation`,
          { field, status },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old
          ? {
              ...old,
              preparation: {
                ...(old.preparation || {}),
                [vars.field]: vars.status,
              },
            }
          : old,
      );
    },
  });
}

export function useAssignCrew() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, crewId }: { eventId: string; crewId: string }) =>
      api
        .post(
          `/events/${eventId}/assign-crew`,
          { crewId },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], data);
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old)
            ? old.map((ev) =>
                ev.id === vars.eventId
                  ? { ...ev, crewId: vars.crewId, crew: data.crew }
                  : ev,
              )
            : old,
      );
    },
  });
}

export function useSubmitReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      reportData,
    }: {
      eventId: string;
      reportData: ReportData;
    }) =>
      api
        .post(`/events/${eventId}/report`, reportData)
        .then((r) => r.data)
        .catch((err) => {
          console.error("submitReport failed:", err.response?.data ?? err);
          throw err;
        }),
    onSuccess: (_data, vars) => {
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old) ? old.filter((ev) => ev.id !== vars.eventId) : old,
      );
      qc.removeQueries({ queryKey: ["eventFull", vars.eventId] });
    },
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, comment }: { eventId: string; comment: string }) =>
      api
        .post(
          `/events/${eventId}/history`,
          { comment },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old ? { ...old, history: data.history } : old,
      );
    },
  });
}

export const useUpdateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & Omit<SchoolProfileData, "id" | "city">) => {
      const res = await api.patch(`/schools/${id}`, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["school", variables.id] });
    },
  });
};

export function useDeleteEvent(schoolId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: string) => {
      await api.delete(`/events/${eventId}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["school", schoolId] });
      qc.invalidateQueries({ queryKey: ["schoolCompletedEvents", schoolId] });
    },
  });
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const res = await api.post<Event>("/events", payload);
      return res.data;
    },
    onSuccess: (_newEvent, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["schoolEvents", variables.schoolId],
      });
    },
  });
};

export function useUpdateHistoryComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      historyId,
      comment,
      eventId,
    }: {
      historyId: string;
      comment: string;
      eventId: string;
    }) =>
      api
        .patch(
          `/events/history/${historyId}`,
          { comment },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old
          ? {
              ...old,
              history: old.history?.map((h: EventHistory) =>
                h.id === vars.historyId ? { ...h, comment: vars.comment } : h,
              ),
            }
          : old,
      );
    },
  });
}

```

# FILE: apps/frontend/src/index.css

```

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *:focus-visible {
    outline: 2px solid theme('colors.brand.DEFAULT');
    outline-offset: 2px;
  }
}

@layer components {
  .mobile-card {
    @apply bg-surface rounded-card shadow-card border border-border p-4;
  }
  .mobile-section-title {
    @apply text-xl font-bold text-content-primary;
  }
  .mobile-stat-value {
    @apply text-2xl font-bold text-content-primary;
  }
  .mobile-stat-label {
    @apply text-xs font-medium text-content-muted;
  }
  .mobile-kpi-card {
    @apply bg-surface rounded-card shadow-card border border-border p-3 flex flex-col justify-between;
  }
  .fab {
    @apply md:hidden fixed z-40 w-14 h-14 rounded-full bg-brand text-white
           shadow-lg active:scale-95 transition-transform duration-fast
           flex items-center justify-center;
    bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}

@keyframes headerFadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.header-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
.header-btn-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
@keyframes fabPop {
  from { opacity: 0; transform: scale(0.5) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes modalScale {
  from { opacity: 0; transform: scale(0.95) translateY(15px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes schoolRowIn {
  from { opacity: 0; transform: translateX(-14px); }
  to   { opacity: 1; transform: translateX(0); }
}
.school-row-enter {
  animation: schoolRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  animation-fill-mode: both;
}

.no-select-ios {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

@keyframes dayOffPop {
  0% { transform: scale(0.7); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.dayoff-cell-enter {
  animation: dayOffPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.dashboard-swiper {
  width: 100%;
  height: 100%;
}
.dashboard-swiper .swiper-slide {
  height: auto;
  overflow-y: auto;
}

.establishments-swiper {
  width: 100%;
  height: 100%;
}
.establishments-swiper .swiper-slide {
  height: auto;
  overflow-y: auto;
}

```

# FILE: apps/frontend/src/instrument.ts

```
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT ?? import.meta.env.MODE,
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
  replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 0,
  replaysOnErrorSampleRate: 1.0,
});

```

# FILE: apps/frontend/src/main.tsx

```
import "./instrument";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import { ToastProvider } from "./components/ui/Toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>,
);

```

# FILE: apps/frontend/src/pages/Analytics.tsx

```
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCities } from "../hooks/useCities";
import {
  useRevenueByMonth,
  useEventsByCity,
  useSalaryFund,
  useRoi,
} from "../hooks/useAnalytics";
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const UA_MONTHS = [
  "Січ", "Лют", "Бер", "Кві", "Трав", "Чер",
  "Лип", "Сер", "Вер", "Жов", "Лис", "Гру",
];

function fmtMoney(n: number): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => currentYear - i);

function SkeletonCard() {
  return (
    <div className="mobile-card animate-pulse">
      <div className="h-3 bg-neutral-100 rounded-full w-1/3 mb-2.5" />
      <div className="h-7 bg-neutral-100 rounded w-2/3 mb-1.5" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="mobile-card animate-pulse">
      <div className="h-4 bg-neutral-100 rounded w-1/4 mb-5" />
      <div className="h-[280px] bg-surface-muted rounded-xl" />
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="h-[280px] flex flex-col items-center justify-center text-content-muted">
      <span className="text-2xl mb-2">📊</span>
      <span className="text-sm text-content-muted">{text}</span>
    </div>
  );
}

export default function Analytics() {
  const { user } = useAuth();
  const isSuper = user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const [year, setYear] = useState(currentYear);
  const [cityId, setCityId] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  const { data: cities } = useCities();
  const { data: revenueData, isLoading: revenueLoading } = useRevenueByMonth({
    cityId: cityId || undefined,
    projectId: projectId || undefined,
    year,
  });
  const { data: eventsByCity, isLoading: eventsLoading } = useEventsByCity({ year });
  const { data: salaryFund } = useSalaryFund({ year, cityId: cityId || undefined });
  const { data: roi } = useRoi({ cityId: cityId || undefined, year });

  const totalRevenue = revenueData?.reduce((s, m) => s + m.revenue, 0) ?? 0;
  const totalProfit = revenueData?.reduce((s, m) => s + m.profit, 0) ?? 0;

  const chartData = (revenueData ?? []).map((m) => ({
    ...m,
    label: UA_MONTHS[Number(m.month) - 1] || m.month,
  }));

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-content-primary">Аналітика</h1>
        <p className="text-2xs text-content-muted mt-1">
          {new Date().toLocaleDateString("uk-UA", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="px-3 py-2.5 bg-surface border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand min-h-[44px]"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        {isSuper && (
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="px-3 py-2.5 bg-surface border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand min-h-[44px]"
          >
            <option value="">Всі міста</option>
            {cities?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Проєкт (фільтр)"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="px-3 py-2.5 bg-surface border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand w-48 min-h-[44px]"
        />
      </div>

      {revenueLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <KPICard label="Загальний дохід" value={fmtMoney(totalRevenue)} color="text-brand" />
          <KPICard label="Прибуток" value={fmtMoney(totalProfit)} color="text-success" />
          <KPICard label="ROI" value={roi ? `${roi.roi}%` : "—"} color="text-purple-600" />
          <KPICard label="Витрати на ЗП" value={fmtMoney(salaryFund?.total ?? 0)} color="text-danger" />
        </div>
      )}

      {revenueLoading ? (
        <ChartSkeleton />
      ) : (
        <div className="mobile-card mb-5">
          <h3 className="font-bold text-content-primary mb-3 text-sm">Дохід по місяцях</h3>
          {chartData.length === 0 ? (
            <EmptyState text="Немає даних за цей період" />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={50} tickFormatter={(v: number) => v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`} />
                <Tooltip
                  formatter={(v: number) => [fmtMoney(v), ""]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ r: 3, fill: "#2563eb" }} name="Дохід" />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: "#10b981" }} name="Прибуток" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {isSuper && (
        eventsLoading ? (
          <ChartSkeleton />
        ) : (
          <div className="mobile-card">
            <h3 className="font-bold text-content-primary mb-3 text-sm">Події по містах</h3>
            {!eventsByCity || eventsByCity.length === 0 ? (
              <EmptyState text="Немає подій за цей рік" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={eventsByCity} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="cityName" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={30} allowDecimals={false} />
                  <Tooltip
                    formatter={(v: number) => [v, "Подій"]}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                  />
                  <Bar dataKey="events" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={48} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        )
      )}
      {isSuper && (
        <div className="mt-5">
          <h3 className="font-bold text-content-primary mb-3 text-sm">KPI — Топ 10</h3>
          <KpiTables />
        </div>
      )}
    </div>
  );
}

interface KpiManager {
  userId: string;
  name: string;
  approvedReports: number;
}

interface KpiHost {
  userId: string;
  name: string;
  avgRating: number;
  reportsCount: number;
}

interface KpiProject {
  project: string;
  eventsCount: number;
  childrenTotal: number;
  profit: number;
}

function KpiTables() {
  const { data: managers } = useQuery<KpiManager[]>({
    queryKey: ["analytics", "kpi", "managers"],
    queryFn: () => api.get("/analytics/kpi/managers").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
  const { data: hosts } = useQuery<KpiHost[]>({
    queryKey: ["analytics", "kpi", "hosts"],
    queryFn: () => api.get("/analytics/kpi/hosts").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
  const { data: projects } = useQuery<KpiProject[]>({
    queryKey: ["analytics", "kpi", "projects"],
    queryFn: () => api.get("/analytics/kpi/projects").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <KpiTable
        title="Менеджери"
        headers={["#", "Ім'я", "Затверджено"]}
        rows={
          managers?.map((m, i) => [
            String(i + 1),
            m.name,
            String(m.approvedReports),
          ]) ?? []
        }
      />
      <KpiTable
        title="Ведучі"
        headers={["#", "Ім'я", "Рейтинг", "Звітів"]}
        rows={
          hosts?.map((h, i) => [
            String(i + 1),
            h.name,
            String(h.avgRating),
            String(h.reportsCount),
          ]) ?? []
        }
      />
      <KpiTable
        title="Проєкти"
        headers={["#", "Назва", "Подій", "Прибуток"]}
        rows={
          projects?.map((p, i) => [
            String(i + 1),
            p.project,
            String(p.eventsCount),
            fmtMoney(p.profit),
          ]) ?? []
        }
      />
    </div>
  );
}

function KpiTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mobile-card">
      <h4 className="font-semibold text-content-secondary mb-2 text-sm">{title}</h4>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-content-muted border-b border-border">
            {headers.map((h) => (
              <th key={h} className="text-left pb-1.5 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-5 text-content-muted">
                Немає даних
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className={`py-1.5 ${j === 0 ? "text-content-muted w-6" : "text-content-primary"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function KPICard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="mobile-card">
      <p className={`text-2xs font-medium ${color} mb-1.5`}>{label}</p>
      <p className={`text-2xl font-bold leading-none ${color}`}>{value}</p>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/CalendarView.tsx

```
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import DayOffModal from "../components/calendar/DayOffModal";
import { STAFF_ROLES, MANAGER_ROLES } from "../features/calendar/constants";
import { toISODate } from "../features/calendar/utils/date";
import { useCalendarMonth } from "../features/calendar/hooks/useCalendarMonth";
import { useCalendarData } from "../features/calendar/hooks/useCalendarData";
import { useDayOffActions } from "../features/calendar/hooks/useDayOffActions";
import { useLongPress } from "../features/calendar/hooks/useLongPress";
import CalendarSkeleton from "../features/calendar/components/CalendarSkeleton";
import CalendarHeader from "../features/calendar/components/CalendarHeader";
import DesktopCalendarGrid from "../features/calendar/components/DesktopCalendarGrid";
import MobileCalendarGrid from "../features/calendar/components/MobileCalendarGrid";
import MobileDayDetailsPanel from "../features/calendar/components/MobileDayDetailsPanel";

export default function CalendarView() {
  const {
    days, year, month, monthFrom, monthTo,
    selectedMobileDate, setSelectedMobileDate,
    nextMonth, prevMonth,
  } = useCalendarMonth();

  const { user } = useAuth();
  const navigate = useNavigate();

  const userRole = user?.role || "GUEST";
  const isStaff = STAFF_ROLES.includes(userRole);
  const isManagerOrAdmin = MANAGER_ROLES.includes(userRole);

  const [filterCityId, setFilterCityId] = useState<string>(() =>
    userRole === "MANAGER" && user?.cityId ? user.cityId : "ALL",
  );

  const {
    eventsLoading, projects, cities, allUsers,
    eventsByDate, projectColorMap, projectHexMap,
  } = useCalendarData(filterCityId);

  const dayOffCityId = isManagerOrAdmin
    ? filterCityId !== "ALL" ? filterCityId : undefined
    : undefined;

  const {
    dayOffsByDate, staffForModal, dayOffModalDate,
    setDayOffModalDate, handleDayOffClick,
    handleToggleStaffDayOff, handleLongPressDayOff,
  } = useDayOffActions(
    monthFrom, monthTo, dayOffCityId, isStaff, isManagerOrAdmin,
    user, allUsers, filterCityId, userRole, user?.cityId,
  );

  const { startLongPress, cancelLongPress, wasLongPress, pressingDay, triggeredDay } = useLongPress(handleLongPressDayOff);

  const handleMobileDayTap = useCallback(
    (day: Date) => {
      if (wasLongPress()) return;
      setSelectedMobileDate(day);
    },
    [setSelectedMobileDate, wasLongPress],
  );

  const selectedDayEvents = eventsByDate.get(toISODate(selectedMobileDate)) ?? [];

  if (eventsLoading) return <CalendarSkeleton />;

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24">
      <CalendarHeader
        projects={projects}
        filterCityId={filterCityId}
        setFilterCityId={setFilterCityId}
        cities={cities}
        userRole={userRole}
      />

      <div className="hidden md:block">
        <DesktopCalendarGrid
          days={days}
          year={year}
          month={month}
          selectedMobileDate={selectedMobileDate}
          setSelectedMobileDate={setSelectedMobileDate}
          eventsByDate={eventsByDate}
          dayOffsByDate={dayOffsByDate}
          projectColorMap={projectColorMap}
          projectHexMap={projectHexMap}
          isStaff={isStaff}
          isManagerOrAdmin={isManagerOrAdmin}
          user={user}
          allUsers={allUsers}
          handleDayOffClick={handleDayOffClick}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
      </div>

      <div className="md:hidden mt-4">
        <MobileCalendarGrid
          days={days}
          year={year}
          month={month}
          selectedMobileDate={selectedMobileDate}
          eventsByDate={eventsByDate}
          dayOffsByDate={dayOffsByDate}
          projectHexMap={projectHexMap}
          projects={projects}
          filterCityId={filterCityId}
          setFilterCityId={setFilterCityId}
          cities={cities}
          userRole={userRole}
          handleMobileDayTap={handleMobileDayTap}
          startLongPress={startLongPress}
          cancelLongPress={cancelLongPress}
          pressingDay={pressingDay}
          triggeredDay={triggeredDay}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />

        <MobileDayDetailsPanel
          selectedMobileDate={selectedMobileDate}
          selectedDayEvents={selectedDayEvents}
          dayOffsByDate={dayOffsByDate}
          allUsers={allUsers}
          projectHexMap={projectHexMap}
          navigate={navigate}
        />
      </div>

      <DayOffModal
        isOpen={!!dayOffModalDate}
        onClose={() => setDayOffModalDate(null)}
        date={dayOffModalDate}
        staff={staffForModal}
        dayOffs={
          dayOffModalDate
            ? (dayOffsByDate.get(toISODate(dayOffModalDate)) ?? [])
            : []
        }
        onToggle={handleToggleStaffDayOff}
      />
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Cities.tsx

```
import React, { useState, useCallback, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { useSelectedCity } from "../context/CityContext";
import { useAddCity } from "../hooks/useApi";
import { useCities } from "../hooks/useCities";
import { useAuth } from "../context/AuthContext";
import { Modal } from "../components/ui/Modal";

const IssueCarousel = lazy(() => import("../components/IssueCarousel"));
const CityMobileHeader = lazy(
  () => import("../components/cities/CityMobileHeader"),
);
const CityMobileList = lazy(
  () => import("../components/cities/CityMobileList"),
);
const CityDesktopGrid = lazy(
  () => import("../components/cities/CityDesktopGrid"),
);

const CitiesSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="md:hidden flex flex-col gap-3 mt-4">
      <div className="h-24 bg-neutral-100 rounded-card w-full" />
      <div className="h-14 bg-neutral-100 rounded-card w-full" />
      <div className="h-14 bg-neutral-100 rounded-card w-full" />
    </div>
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-surface rounded-card shadow-card border border-border h-72 overflow-hidden">
          <div className="h-44 bg-neutral-100 w-full" />
          <div className="p-5 flex flex-col gap-3">
            <div className="h-6 bg-neutral-100 rounded w-1/2" />
            <div className="h-4 bg-neutral-100 rounded w-3/4 mt-2" />
            <div className="h-10 bg-neutral-100 rounded w-full mt-auto" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Cities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");

  const { selectedCity, setSelectedCity } = useSelectedCity();
  const { data: cities = [], isLoading: isFetching } = useCities();
  const addCity = useAddCity();

  const handleSelectCity = useCallback(
    (city: { id: string; name: string }) => {
      setSelectedCity(city);
    },
    [setSelectedCity],
  );
  const { user } = useAuth();
  const userRole = user?.role ?? null;

  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;
    try {
      await addCity.mutateAsync(newCityName.trim());
      setNewCityName("");
      setIsModalOpen(false);
    } catch {
      setNewCityName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen" style={{ contentVisibility: "auto" }}>
      <div className="hidden md:flex justify-between items-center mb-8">
        <h1 className="header-enter text-3xl font-bold text-content-primary">Міста</h1>
        {userRole === "SUPERADMIN" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="header-btn-enter bg-brand hover:bg-brand-hover active:scale-95 text-white px-5 py-2.5 rounded-control font-medium shadow-sm flex items-center transition-all duration-fast"
          >
            <span className="mr-2">+</span> Додати місто
          </button>
        )}
      </div>

      {isFetching ? (
        <CitiesSkeleton />
      ) : (
        <Suspense fallback={<CitiesSkeleton />}>
          <div className="md:hidden">
            <CityMobileHeader selectedCity={selectedCity} cities={cities} />
            <CityMobileList
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
            />
          </div>

          <div className="hidden md:block">
            <IssueCarousel />
            <CityDesktopGrid
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
            />
          </div>
        </Suspense>
      )}

      {userRole === "SUPERADMIN" && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fab"
          aria-label="Додати місто"
        >
          +
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Нове місто">
        <form onSubmit={handleAddCity} className="flex flex-col gap-4">
          <input
            type="text"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            placeholder="Наприклад: Львів"
            className="w-full p-3 border border-border-strong rounded-control focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-shadow text-sm"
            autoFocus
            required
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 bg-surface-muted text-content-secondary py-2.5 rounded-control font-medium hover:bg-border-strong transition-colors text-sm"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={addCity.isPending}
              className="flex-1 bg-brand text-white py-2.5 rounded-control font-medium hover:bg-brand-hover disabled:opacity-50 transition-colors text-sm"
            >
              {addCity.isPending ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/CityLeaderboard.tsx

```
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../config/api";

interface CityLeaderboardEntry {
  cityId: string;
  cityName: string;
  events: number;
  revenue: number;
  profit: number;
  children: number;
  schools: number;
}

const METRICS: { key: string; label: string }[] = [
  { key: "events", label: "Події" },
  { key: "revenue", label: "Дохід" },
  { key: "profit", label: "Прибуток" },
  { key: "children", label: "Діти" },
  { key: "schools", label: "Школи" },
];

function fmt(n: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(n));
}

function fmtMoney(n: number): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

const BAR_COLORS = [
  "bg-blue-600",
  "bg-blue-500",
  "bg-blue-400",
  "bg-blue-300",
  "bg-blue-200",
];

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => currentYear - i);

function SkeletonBar() {
  return (
    <div className="flex items-center gap-3 mb-3 animate-pulse">
      <div className="w-24 h-4 bg-surface-muted rounded-full shrink-0" />
      <div className="h-8 bg-surface-muted rounded-full flex-1" />
      <div className="w-16 h-4 bg-surface-muted rounded-full shrink-0" />
    </div>
  );
}

export default function CityLeaderboard() {
  const [metric, setMetric] = useState("events");
  const [year, setYear] = useState(currentYear);

  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "city-leaderboard", metric, year],
    queryFn: () =>
      api
        .get<CityLeaderboardEntry[]>("/analytics/city-leaderboard", {
          params: { metric, year },
        })
        .then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const maxValue = data
    ? Math.max(...data.map((d) => d[metric as keyof CityLeaderboardEntry] as number), 1)
    : 1;

  const formatValue = metric === "revenue" || metric === "profit" ? fmtMoney : fmt;

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-content-primary">Рейтинг міст</h1>
        <p className="text-xs text-content-muted mt-1">Порівняння міст за обраною метрикою</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {METRICS.map((m) => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              metric === m.key
                ? "bg-brand text-white shadow-sm"
                : "bg-surface text-content-secondary border border-border-strong hover:border-blue-300"
            }`}
          >
            {m.label}
          </button>
        ))}

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="ml-auto px-3 py-2.5 bg-surface border border-border-strong rounded-lg text-sm focus:outline-none focus:border-blue-400"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="bg-surface rounded-card border border-border shadow-card p-6">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonBar key={i} />)}
        </div>
      ) : !data || data.length === 0 ? (
        <div className="bg-surface rounded-card border border-border shadow-card p-6">
          <div className="h-[200px] flex flex-col items-center justify-center text-slate-300">
            <span className="text-3xl mb-2">🏆</span>
            <span className="text-sm text-content-muted">Немає даних за {year} рік</span>
          </div>
        </div>
      ) : (
        <div className="bg-surface rounded-card border border-border shadow-card p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={metric}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {data.map((entry, i) => {
                const value = entry[metric as keyof CityLeaderboardEntry] as number;
                const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;
                const colorIndex = Math.min(i, BAR_COLORS.length - 1);

                return (
                  <div key={entry.cityId} className="flex items-center gap-3 mb-3">
                    <span className="w-24 text-xs text-content-muted truncate shrink-0 text-right">
                      {entry.cityName}
                    </span>
                    <div className="flex-1 h-8 bg-surface-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${BAR_COLORS[colorIndex]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <span className="w-20 text-xs font-semibold text-content-secondary text-right shrink-0">
                      {formatValue(value)}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/CityProfile.tsx

```
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
const CityAnalytics = lazy(
  () => import("../components/city-profile/CityAnalytics"),
);
import PhoneLink from "../components/PhoneLink";
import type { Event, Crew, CityProfile as CityProfileType } from "../types";
import OptimizedImage from "../components/ui/OptimizedImage";
import { useCity, useCreateCrew, useDeleteCrew } from "../hooks/useCities";
import { useUsers } from "../hooks/useEmployees";

type Tab = "events" | "crews" | "analytics";

export default function CityProfile() {
  const { id } = useParams();
  const { data: city, isLoading } = useCity(id);
  const { data: users = [] } = useUsers();
  const createCrew = useCreateCrew(id);
  const deleteCrew = useDeleteCrew(id);

  const [activeTab, setActiveTab] = useState<Tab>("crews");
  const [selectedReportEvent, setSelectedReportEvent] = useState<any>(null);
  const [isCreateCrewModalOpen, setIsCreateCrewModalOpen] = useState(false);
  const [completedSearchQuery, setCompletedSearchQuery] = useState("");
  const [crewForm, setCrewForm] = useState({
    name: "",
    hostId: "",
    driverId: "",
  });

  const handleCreateCrew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crewForm.hostId || !crewForm.driverId)
      return alert("Оберіть ведучого та водія!");
    setIsCreateCrewModalOpen(false);
    createCrew.mutate(crewForm);
  };

  const handleDeleteCrew = (crewId: string) => {
    if (!window.confirm("Видалити екіпаж?")) return;
    deleteCrew.mutate(crewId);
  };

  if (isLoading)
    return <div className="p-8 text-content-muted">Завантаження...</div>;
  if (!city) return <div className="p-8 text-content-muted">Місто не знайдено</div>;

  const completedEvents: Event[] = city.events || [];
  const filteredCompletedEvents = completedEvents.filter((ev) =>
    (ev.school?.name || "")
      .toLowerCase()
      .includes(completedSearchQuery.trim().toLowerCase()),
  );
  const crews: Crew[] = city.crews || [];
  const manager = city.manager;

  const busyUserIds = crews.flatMap((c: any) => [c.hostId, c.driverId]);
  const availableHosts = users.filter(
    (u) =>
      u.role === "HOST" &&
      u.city?.id === city.id &&
      !busyUserIds.includes(u.id),
  );
  const availableDrivers = users.filter(
    (u) =>
      u.role === "DRIVER" &&
      u.city?.id === city.id &&
      !busyUserIds.includes(u.id),
  );

  const totalChildren = completedEvents.reduce(
    (sum, ev) => sum + (ev.report?.childrenCount || ev.childrenPlanned || 0),
    0,
  );
  const totalRevenue = completedEvents.reduce(
    (sum, ev) => sum + (ev.report?.totalSum || ev.price || 0),
    0,
  );
  const totalProfit = completedEvents.reduce(
    (sum, ev) => sum + (ev.report?.remainderSum || 0),
    0,
  );
  const fmt = (n: number) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(n));

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: "events", label: "Події", icon: "📅" },
    { key: "crews", label: "Екіпажі", icon: "🚐" },
    { key: "analytics", label: "Аналітика", icon: "📊" },
  ];

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      <div className="text-sm text-content-muted mb-6">
        <Link to="/cities" className="hover:text-brand transition-colors">
          Міста
        </Link>
        <span className="mx-2">›</span>
        <span className="text-content-primary font-medium">{city.name}</span>
      </div>

      <div className="bg-surface rounded-card shadow-card border border-border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4 min-w-[220px]">
            <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold text-lg shrink-0">
              {manager?.name?.charAt(0) ?? "?"}
            </div>
            <div>
              <p className="text-xs text-content-muted font-medium uppercase tracking-wide mb-0.5">
                Менеджер
              </p>
              <p className="font-bold text-content-primary">{manager?.name ?? "—"}</p>
              <p className="text-sm text-content-muted">
                <PhoneLink phone={manager?.phone} />
              </p>
            </div>
          </div>
          <div className="hidden md:block w-px h-16 bg-slate-100" />
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-4 sm:gap-8 flex-1">
            <Stat label="Закладів" value={city.schools?.length ?? 0} />
            <Stat label="Проведено подій" value={completedEvents.length} />
            <Stat label="Охоплено дітей" value={fmt(totalChildren)} />
            <Stat label="Виручка" value={`${fmt(totalRevenue)} грн`} />
            <Stat label="Прибуток" value={`${fmt(totalProfit)} грн`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:flex sm:w-fit gap-1 bg-white rounded-xl p-1 border border-border shadow-sm mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-control text-xs sm:text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-brand text-white shadow-sm"
                : "text-content-muted hover:text-content-secondary hover:bg-surface-muted"
            }`}
          >
            <span>{tab.icon}</span>{" "}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "events" && (
        <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
          <div className="p-6 border-b border-border bg-surface-muted">
            <h3 className="font-bold text-content-primary mb-4">
              Завершені події ({completedEvents.length})
            </h3>
            <input
              type="text"
              value={completedSearchQuery}
              onChange={(e) => setCompletedSearchQuery(e.target.value)}
              placeholder="Пошук за назвою закладу..."
              className="w-full sm:max-w-xs p-2.5 border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {filteredCompletedEvents.length === 0 ? (
            <div className="p-12 text-center text-content-muted">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">
                {completedSearchQuery
                  ? "Нічого не знайдено"
                  : "Завершених подій ще немає"}
              </p>
            </div>
          ) : (
            <>
              <div className="md:hidden divide-y divide-border">
                {filteredCompletedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedReportEvent(ev)}
                    className="flex items-center justify-between gap-3 p-4 active:bg-surface-muted cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-brand truncate">
                        {ev.school?.name}
                      </p>
                      <p className="text-xs text-content-muted mt-0.5">
                        {ev.project} ·{" "}
                        {new Date(ev.date).toLocaleDateString("uk-UA")}
                      </p>
                      <p className="text-xs text-content-muted mt-1">
                        👶{" "}
                        {ev.report?.childrenCount || ev.childrenPlanned || "—"}{" "}
                        дітей
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-content-primary text-sm">
                        {fmt(ev.report?.totalSum || ev.price || 0)} грн
                      </p>
                      <p className="text-xs font-medium text-success-600 mt-0.5">
                        +{fmt(ev.report?.remainderSum || 0)} грн
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white border-b border-border text-content-muted text-xs font-semibold uppercase tracking-wider">
                      <th className="p-4">Заклад</th>
                      <th className="p-4">Проєкт</th>
                      <th className="p-4">Дата</th>
                      <th className="p-4">Дітей</th>
                      <th className="p-4">Виручка</th>
                      <th className="p-4">Прибуток</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompletedEvents.map((ev) => (
                      <tr
                        key={ev.id}
                        onClick={() => setSelectedReportEvent(ev)}
                        className="border-b border-slate-50 hover:bg-surface-muted transition-colors cursor-pointer"
                      >
                        <td className="p-4">
                          <span className="font-medium text-brand">
                            {ev.school?.name}
                          </span>
                          <p className="text-xs text-content-muted">
                            {ev.school?.type}
                          </p>
                        </td>
                        <td className="p-4 text-content-secondary">{ev.project}</td>
                        <td className="p-4 text-content-secondary">
                          {new Date(ev.date).toLocaleDateString("uk-UA")}
                        </td>
                        <td className="p-4 font-medium">
                          {ev.report?.childrenCount ||
                            ev.childrenPlanned ||
                            "—"}
                        </td>
                        <td className="p-4 font-medium text-content-primary">
                          {fmt(ev.report?.totalSum || ev.price || 0)} грн
                        </td>
                        <td className="p-4 font-medium text-success-600">
                          {fmt(ev.report?.remainderSum || 0)} грн
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* Вкладка ЕКІПАЖІ з новим дизайном */}
      {activeTab === "crews" && (
        <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center bg-white">
            <h3 className="text-xl font-bold text-content-primary">
              Екіпажі - {city.name}
            </h3>
            <button
              onClick={() => {
                setCrewForm({
                  name: `Екіпаж №${crews.length + 1}`,
                  hostId: "",
                  driverId: "",
                });
                setIsCreateCrewModalOpen(true);
              }}
              className="bg-brand hover:bg-brand-hover text-white px-5 py-2.5 rounded-control text-sm font-medium transition-colors shadow-sm"
            >
              + Додати екіпаж
            </button>
          </div>

          {crews.length === 0 ? (
            <div className="p-12 text-center text-content-muted">
              <p className="text-4xl mb-3">🚐</p>
              <p className="font-medium">Екіпажів ще немає</p>
            </div>
          ) : (
            <>
              {/* Мобільний вигляд */}
              <div className="md:hidden divide-y divide-border">
                {crews.map((crew: any) => {
                  const hostObj = users.find((u) => u.id === crew.hostId);
                  const driverObj = users.find((u) => u.id === crew.driverId);
                  const carName = crew.car
                    ? crew.car.split("(")[0].trim()
                    : "—";
                  const carPlate = crew.car?.match(/\(([^)]+)\)/)?.[1] || "";
                  const eventsCount =
                    city.events?.filter((e: any) => e.crewId === crew.id)
                      .length || 0;

                  return (
                    <div key={crew.id} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-10 rounded overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-border-strong">
                            <OptimizedImage
                              src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
                              alt="van"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="font-bold text-content-primary">
                            {crew.name}
                          </p>
                        </div>
                        <span className="bg-success-subtle text-success-600 px-2.5 py-1 rounded text-xs font-medium">
                          Активний
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3 text-xs mt-4">
                        <div>
                          <p className="font-medium text-content-primary">
                            {hostObj?.name || crew.host?.name || "—"}
                          </p>
                          <p className="text-content-muted mt-0.5">
                            {hostObj?.phone || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-content-primary">
                            {driverObj?.name || crew.driver?.name || "—"}
                          </p>
                          <p className="text-content-muted mt-0.5">
                            {driverObj?.phone || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-content-primary">
                            {carName}
                          </p>
                          {carPlate && (
                            <p className="text-content-muted mt-0.5">{carPlate}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-content-muted">
                            Подій:{" "}
                            <span className="font-bold text-content-primary">
                              {eventsCount}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCrew(crew.id)}
                        className="w-full mt-4 py-2 border border-border-strong text-content-secondary hover:bg-danger-subtle hover:text-danger hover:border-danger-200 rounded-control text-sm font-medium transition-colors"
                      >
                        Видалити екіпаж
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Десктоп таблиця як на дизайні */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white border-b border-border text-content-primary font-bold">
                      <th className="p-5">Екіпаж</th>
                      <th className="p-5">Ведучий</th>
                      <th className="p-5">Водій</th>
                      <th className="p-5">Авто</th>
                      <th className="p-5">Статус</th>
                      <th className="p-5 text-center">Подій (міс.)</th>
                      <th className="p-5 text-center">Дія</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crews.map((crew: any) => {
                      const hostObj = users.find((u) => u.id === crew.hostId);
                      const driverObj = users.find(
                        (u) => u.id === crew.driverId,
                      );

                      const carName = crew.car
                        ? crew.car.split("(")[0].trim()
                        : "—";
                      const carPlate =
                        crew.car?.match(/\(([^)]+)\)/)?.[1] || "";

                      const eventsCount =
                        city.events?.filter((e: any) => e.crewId === crew.id)
                          .length || 0;

                      return (
                        <tr
                          key={crew.id}
                          className="border-b border-slate-50 hover:bg-surface-muted transition-colors"
                        >
                          <td className="p-5">
                            <div className="flex items-center gap-3">
                              {/* Універсальна фотографія буса */}
                              <div className="w-[60px] h-[40px] rounded border border-border-strong overflow-hidden bg-slate-100 shrink-0 shadow-sm">
                                <OptimizedImage
                                  src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
                                  alt="van"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-bold text-content-primary">
                                {crew.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-content-primary">
                              {hostObj?.name || crew.host?.name || "—"}
                            </div>
                            <div className="text-xs text-content-muted mt-1 tracking-wide">
                              {hostObj?.phone || "—"}
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-content-primary">
                              {driverObj?.name || crew.driver?.name || "—"}
                            </div>
                            <div className="text-xs text-content-muted mt-1 tracking-wide">
                              {driverObj?.phone || "—"}
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-content-secondary">
                              {carName}
                            </div>
                            {carPlate ? (
                              <div className="text-xs text-content-muted mt-1 tracking-wider">
                                {carPlate}
                              </div>
                            ) : (
                              <div className="text-xs text-content-muted mt-1">
                                —
                              </div>
                            )}
                          </td>
                          <td className="p-5">
                            <span className="bg-success-subtle text-success-600 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide">
                              Активний
                            </span>
                          </td>
                          <td className="p-5 text-center font-bold text-content-primary text-base">
                            {eventsCount}
                          </td>
                          <td className="p-5 text-center">
                            <button
                              onClick={() => handleDeleteCrew(crew.id)}
                              className="text-content-muted hover:text-red-500 p-2 transition-colors rounded-control hover:bg-red-50"
                              title="Видалити екіпаж"
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "analytics" && (
        <Suspense
          fallback={
            <div className="bg-white rounded-card h-64 animate-pulse border border-border" />
          }
        >
          <CityAnalytics events={completedEvents} />
        </Suspense>
      )}

      {/* Модалка створення екіпажу */}
      {isCreateCrewModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-card shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-5 sm:p-6 border-b border-border flex justify-between bg-surface-muted">
              <h3 className="text-xl font-bold text-content-primary">Новий екіпаж</h3>
              <button
                onClick={() => setIsCreateCrewModalOpen(false)}
                className="text-content-muted hover:text-content-secondary text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateCrew} className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-content-secondary mb-1">
                  Назва екіпажу
                </label>
                <input
                  type="text"
                  value={crewForm.name}
                  onChange={(e) =>
                    setCrewForm({ ...crewForm, name: e.target.value })
                  }
                  className="w-full p-2.5 border border-border-strong rounded-control focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-content-secondary mb-1">
                  Ведучий
                </label>
                <select
                  value={crewForm.hostId}
                  onChange={(e) =>
                    setCrewForm({ ...crewForm, hostId: e.target.value })
                  }
                  required
                  className="w-full p-2.5 border border-border-strong rounded-control bg-white outline-none"
                >
                  <option value="" disabled>
                    Оберіть ведучого
                  </option>
                  {availableHosts.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-success-600 mt-1">
                  ✓ Доступно: {availableHosts.length} вільних
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-content-secondary mb-1">
                  Водій
                </label>
                <select
                  value={crewForm.driverId}
                  onChange={(e) =>
                    setCrewForm({ ...crewForm, driverId: e.target.value })
                  }
                  required
                  className="w-full p-2.5 border border-border-strong rounded-control bg-white outline-none"
                >
                  <option value="" disabled>
                    Оберіть водія
                  </option>
                  {availableDrivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} {d.car ? `(🚗 ${d.car})` : ""}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-success-600 mt-1">
                  ✓ Доступно: {availableDrivers.length} вільних
                </p>
              </div>
              <div className="flex gap-3 pt-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateCrewModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-content-secondary rounded-control font-medium hover:bg-slate-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-brand text-white rounded-control font-medium hover:bg-brand-hover transition-colors"
                >
                  Створити
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модальне вікно Звіту */}
      <CompletedEventModal
        isOpen={!!selectedReportEvent}
        onClose={() => setSelectedReportEvent(null)}
        event={selectedReportEvent}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-content-muted font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-content-primary">{value}</p>
    </div>
  );
}

function CompletedEventModal({
  isOpen,
  onClose,
  event,
}: {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}) {
  if (!isOpen || !event) return null;
  const fmt = (n: number) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
  const report = event.report;

  return (
    <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-card shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
        <div className="p-5 sm:p-6 border-b border-border flex justify-between bg-surface-muted shrink-0">
          <div>
            <h3 className="text-xl font-bold text-content-primary">
              Звіт: {event.project}
            </h3>
            <p className="text-sm text-content-muted mt-1">
              {event.school?.name} ·{" "}
              {new Date(event.date).toLocaleDateString("uk-UA")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-content-muted hover:text-content-secondary p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg"
          >
            ✕
          </button>
        </div>
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-surface-muted">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-5 rounded-card border border-border shadow-sm">
              <h4 className="font-bold text-content-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-brand flex items-center justify-center">
                  📊
                </span>
                Результати
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-content-muted">Дітей (факт):</span>
                  <span className="font-bold">
                    {report?.childrenCount || 0}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-content-muted">Класів:</span>
                  <span className="font-medium">
                    {report?.classesCount || 0}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-content-muted">Пільговиків:</span>
                  <span className="font-medium">
                    {report?.privilegedCount || 0}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-content-muted">Сеансів:</span>
                  <span className="font-medium">
                    {report?.showingsCount || 0}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-content-muted">Оцінка:</span>
                  <span className="font-bold text-amber-500">
                    ⭐ {report?.rating || 0}/10
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-card border border-border shadow-sm">
              <h4 className="font-bold text-content-primary mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-success-subtle text-success-600 flex items-center justify-center">
                  💰
                </span>
                Фінанси
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-content-muted">Загальна виручка:</span>
                  <span className="font-bold">{fmt(report?.totalSum)} грн</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-content-muted">На заклад (20%):</span>
                  <span className="font-medium text-danger-600">
                    − {fmt(report?.schoolSum)} грн
                  </span>
                </div>
                {Array.isArray(report?.expenseItems) &&
                  report.expenseItems.length > 0 && (
                    <div className="py-2 border-b border-slate-50">
                      <span className="text-content-muted block mb-2">
                        Додаткові витрати:
                      </span>
                      {report.expenseItems.map((exp: any, i: number) => (
                        <div
                          key={i}
                          className="flex justify-between text-xs mb-1 pl-2"
                        >
                          <span className="text-content-muted">
                            — {exp.name || exp.category}
                          </span>
                          <span className="text-danger-600 font-medium">
                            − {fmt(exp.amount)} грн
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-content-primary">
                    Чистий прибуток:
                  </span>
                  <span className="font-bold text-success-600 text-base">
                    {fmt(report?.remainderSum)} грн
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-card border border-border shadow-sm">
            <h4 className="font-bold text-content-primary mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                ⏳
              </span>
              Історія пайплайну
            </h4>
            {!event.history || event.history.length === 0 ? (
              <p className="text-sm text-content-muted text-center py-4">
                Історія порожня.
              </p>
            ) : (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
                {[...event.history]
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  )
                  .map((item: any) => (
                    <div key={item.id} className="relative pl-8 text-sm">
                      <div className="absolute left-1.5 w-3 h-3 rounded-full top-1 bg-violet-500 ring-4 ring-white"></div>
                      <p className="font-semibold text-content-primary">
                        {item.action}
                      </p>
                      <p className="text-[11px] text-content-muted mt-0.5">
                        {new Date(item.createdAt).toLocaleString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · 👤 {item.userName}
                      </p>
                      {item.comment && (
                        <div className="mt-2 p-3 bg-surface-muted rounded-xl text-content-secondary italic border border-border">
                          {item.comment}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Dashboard.tsx

```
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAuth } from "../context/AuthContext";
import { DASHBOARD_TABS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";
import DashboardTopNav from "../components/dashboard/DashboardTopNav";
import TabErrorBoundary from "../components/dashboard/TabErrorBoundary";

const OverviewTab = lazy(() => import("./OverviewTab"));
const ReportsTab = lazy(() => import("../features/reports/pages/ReportsReviewPage"));
const LeaderboardTab = lazy(() => import("./CityLeaderboard"));
const AnalyticsTab = lazy(() => import("./Analytics"));

const TAB_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  overview: OverviewTab,
  reports: ReportsTab,
  leaderboard: LeaderboardTab,
  analytics: AnalyticsTab,
};

export default function Dashboard() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const swiperRef = useRef<any>(null);
  const prevTabRef = useRef<string>("");

  const allowedTabs = useMemo(
    () => DASHBOARD_TABS.filter((t) => hasRole(user?.role, t.roles)),
    [user],
  );
  const allowedIds = useMemo(() => allowedTabs.map((t) => t.id), [allowedTabs]);

  const resolveInitial = useCallback(() => {
    const fromUrl = searchParams.get("tab");
    if (fromUrl && allowedIds.includes(fromUrl)) return fromUrl;
    const fromStorage = sessionStorage.getItem("dashboard:lastTab");
    if (fromStorage && allowedIds.includes(fromStorage)) return fromStorage;
    return allowedIds[0] ?? "overview";
  }, [searchParams, allowedIds]);

  const [activeTab, setActiveTab] = useState(() => resolveInitial());

  useEffect(() => {
    if (prevTabRef.current && prevTabRef.current !== activeTab) {
      window.dispatchEvent(
        new CustomEvent("tab_switch", {
          detail: { from: prevTabRef.current, to: activeTab },
        }),
      );
    }
    prevTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (!allowedIds.includes(activeTab)) {
      const fallback = allowedIds[0] ?? "overview";
      setActiveTab(fallback);
      setSearchParams({ tab: fallback }, { replace: true });
    }
  }, [allowedIds, activeTab, setSearchParams]);

  const handleTabChange = useCallback(
    (id: string) => {
      const idx = allowedIds.indexOf(id);
      if (idx !== -1 && swiperRef.current) {
        swiperRef.current.slideTo(idx);
      }
      setActiveTab(id);
      setSearchParams({ tab: id }, { replace: true });
      sessionStorage.setItem("dashboard:lastTab", id);
    },
    [allowedIds, setSearchParams],
  );

  const handleSlideChange = useCallback(
    (swiper: any) => {
      const id = allowedIds[swiper.activeIndex];
      if (id && id !== activeTab) {
        setActiveTab(id);
        setSearchParams({ tab: id }, { replace: true });
        sessionStorage.setItem("dashboard:lastTab", id);
      }
    },
    [allowedIds, activeTab, setSearchParams],
  );

  return (
    <div className="bg-gradient-subtle min-h-screen flex flex-col">
      <DashboardTopNav
        tabs={allowedTabs}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <div className="flex-1">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          initialSlide={allowedIds.indexOf(activeTab)}
          onSlideChange={handleSlideChange}
          speed={280}
          allowTouchMove={true}
          className="dashboard-swiper"
        >
          {allowedTabs.map((tab) => {
            const Component = TAB_COMPONENTS[tab.id];
            return (
            <SwiperSlide key={tab.id}>
              <div className="md:p-4 lg:p-8">
                <TabErrorBoundary label={tab.label}>
                  <Suspense fallback={<div className="text-sm text-content-muted p-4">Завантаження...</div>}>
                    <Component />
                  </Suspense>
                </TabErrorBoundary>
              </div>
            </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Employees.tsx

```
import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { X, Search, UserPlus } from "lucide-react";
import {
  useUsers,
  useProjects,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../hooks/useEmployees";
import { useCities } from "../hooks/useCities";
import { useDebounce } from "../hooks/useDebounce";
import EmployeeCard from "../components/employees/EmployeeCard";
import EmployeesTable from "../components/employees/EmployeesTable";
import UserModal from "../components/employees/UserModal";
import ProjectModal from "../components/employees/ProjectModal";
import { EmployeesHeader } from "../components/employees/EmployeesHeader";
import { FilterPanel } from "../components/employees/FilterPanel";
import { EmptyState } from "../components/ui/EmptyState";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { LoadingBar } from "../components/ui/LoadingBar";
import { useToast } from "../components/ui/Toast";
import { exportCsv } from "../utils/exportCsv";
import { sectionVariants } from "../animations/employees";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";

type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";
type ViewMode = "cards" | "table";

interface City { id: string; name: string }
interface User {
  id: string; name: string; phone: string | null; email: string;
  cityId: string | null; city?: City; role: Role;
  telegramId?: string | null; car?: string | null;
}
interface Project { id: string; name: string; color: string }

const ROLE_LABELS: Record<string, string> = {
  MANAGER: "Менеджер", DRIVER: "Водій", HOST: "Ведучий",
  SUPERADMIN: "Суперадмін", GUEST: "Гість",
};
const ROLE_COLORS: Record<string, string> = {
  MANAGER: "bg-blue-50 text-blue-700 border-blue-200",
  DRIVER: "bg-emerald-50 text-emerald-700 border-emerald-200",
  HOST: "bg-violet-50 text-violet-700 border-violet-200",
};
const ROLE_HEADER_COLORS: Record<string, string> = {
  MANAGER: "bg-blue-600", DRIVER: "bg-emerald-600", HOST: "bg-violet-600",
};
const EMPTY_FORM = {
  fullName: "", phone: "", email: "", cityId: "", role: "MANAGER" as Role,
  password: "", telegramId: "", car: "",
};
const PROJECT_COLORS: Record<string, string> = {
  blue: "bg-blue-500", emerald: "bg-emerald-500", rose: "bg-rose-500",
  red: "bg-red-500", amber: "bg-amber-500", purple: "bg-purple-500",
};

function Shimmer() {
  return (
    <motion.div
      className="absolute inset-0 -translate-x-full"
      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
      animate={{ translateX: ["-100%", "100%"] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
    />
  );
}

function EmployeesSkeleton() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-7 w-56 bg-slate-200 rounded-lg mb-2" />
          <div className="h-4 w-72 bg-slate-100 rounded" />
        </div>
        <div className="h-10 w-44 bg-slate-200 rounded-lg" />
      </div>
      {[
        { label: "Менеджери", accent: "bg-blue-200" },
        { label: "Водії", accent: "bg-emerald-200" },
        { label: "Ведучі", accent: "bg-violet-200" },
      ].map(({ label, accent }) => (
        <div key={label} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-1 h-6 rounded-full ${accent}`} />
            <div className="h-5 w-24 bg-slate-200 rounded" />
            <div className="h-5 w-8 bg-slate-100 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-5 flex items-start gap-4">
                <Shimmer />
                <div className="w-12 h-12 rounded-2xl bg-slate-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                  <div className="h-3 w-40 bg-slate-100 rounded mb-3" />
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-slate-100 rounded-full" />
                    <div className="h-5 w-20 bg-slate-100 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Employees() {
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: cities = [] } = useCities();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const toast = useToast();
  const { selectedCity: contextCity } = useSelectedCity();
  const { user: authUser } = useAuth();
  const isSuperAdmin = authUser?.role === "SUPERADMIN";

  const [searchParams, setSearchParams] = useSearchParams();
  const rawSearch = searchParams.get("search") ?? "";
  const rawRoles = searchParams.get("roles") ?? "";
  const rawCity = searchParams.get("city") ?? "";

  const updateParams = useCallback((updates: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      return next;
    });
  }, [setSearchParams]);

  const debouncedSearch = useDebounce(rawSearch, 300);

  const selectedRoles = useMemo(
    () => rawRoles ? rawRoles.split(",").filter(Boolean) : [],
    [rawRoles],
  );
  const selectedCity = rawCity;

  const [viewMode, setViewMode] = useState<ViewMode>(
    (searchParams.get("view") as ViewMode) ?? "cards",
  );
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    updateParams({ view: mode });
  }, [updateParams]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userFormValues, setUserFormValues] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({ name: "", color: "blue", pricePerChild: "" });

  const [formError, setFormError] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (confirmDelete) setConfirmDelete(null);
        else if (isModalOpen) setIsModalOpen(false);
        else if (isProjectModalOpen) { setIsProjectModalOpen(false); setEditingProject(null); }
        else if (filterPanelOpen) setFilterPanelOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmDelete, isModalOpen, isProjectModalOpen, filterPanelOpen]);

  const handleOpenProjectModal = useCallback((project: Project | null = null) => {
    setEditingProject(project);
    setProjectForm(
      project
        ? { name: project.name, color: project.color, pricePerChild: String((project as any).pricePerChild ?? "") }
        : { name: "", color: "blue", pricePerChild: "" },
    );
    setIsProjectModalOpen(true);
  }, []);

  const cityFilteredUsers = useMemo(
    () => contextCity.id ? users.filter((u) => u.cityId === contextCity.id) : users,
    [users, contextCity.id],
  );

  const filteredUsers = useMemo(() => {
    let result = cityFilteredUsers;

    if (selectedRoles.length > 0) {
      result = result.filter((u) => selectedRoles.includes(u.role));
    }

    if (selectedCity && selectedCity !== "all") {
      result = result.filter((u) => u.cityId === selectedCity || u.city?.id === selectedCity);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.phone ?? "").toLowerCase().includes(q),
      );
    }

    return result;
  }, [cityFilteredUsers, selectedRoles, selectedCity, debouncedSearch]);

  const grouped = useMemo(
    () => (["MANAGER", "DRIVER", "HOST"] as Role[]).map((role) => ({
      role,
      label: ROLE_LABELS[role],
      items: filteredUsers.filter((u) => u.role === role),
    })),
    [filteredUsers],
  );

  const hasActiveFilters = selectedRoles.length > 0 || (selectedCity !== "" && selectedCity !== "all");

  const handleResetFilters = useCallback(() => {
    updateParams({ roles: null, city: null });
  }, [updateParams]);

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];

    if (debouncedSearch.trim()) {
      chips.push({
        key: "search",
        label: `Пошук: "${debouncedSearch.trim()}"`,
        onRemove: () => updateParams({ search: null }),
      });
    }

    selectedRoles.forEach((r) => {
      chips.push({
        key: `role-${r}`,
        label: ROLE_LABELS[r] ?? r,
        onRemove: () => {
          const next = selectedRoles.filter((x) => x !== r);
          updateParams({ roles: next.length > 0 ? next.join(",") : null });
        },
      });
    });

    if (selectedCity && selectedCity !== "all") {
      const cityName = cities.find((c) => c.id === selectedCity)?.name || selectedCity;
      chips.push({
        key: "city",
        label: cityName,
        onRemove: () => updateParams({ city: null }),
      });
    }

    return chips;
  }, [debouncedSearch, selectedRoles, selectedCity, cities, updateParams]);

  const handleOpenModal = useCallback((user: User | null = null) => {
    setFormError("");
    setEditingUser(user);
    setUserFormValues(
      user
        ? {
            fullName: user.name, phone: user.phone || "", email: user.email,
            cityId: user.cityId || "", role: user.role, password: "",
            telegramId: user.telegramId || "", car: user.car || "",
          }
        : { ...EMPTY_FORM },
    );
    setIsModalOpen(true);
  }, []);

  const handleSaveUser = useCallback(async (values: Record<string, string>) => {
    setFormError("");
    setIsSubmitting(true);
    setIsMutating(true);
    try {
      if (editingUser) {
        const { password, ...rest } = values;
        const payload = password.trim() ? values : rest;
        await updateUser.mutateAsync({ id: editingUser.id, form: payload });
        toast("Користувача оновлено", "success");
      } else {
        await createUser.mutateAsync(values);
        toast("Користувача створено", "success");
      }
      setShowSuccess(true);
      setTimeout(() => { setShowSuccess(false); setIsModalOpen(false); }, 700);
    } catch (err: any) {
      const messages = err?.response?.data?.message;
      const errorMsg = Array.isArray(messages) ? messages.join(", ") : messages || "Помилка збереження";
      setFormError(errorMsg);
      toast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
      setIsMutating(false);
    }
  }, [editingUser, createUser, updateUser, toast]);

  const handleExport = useCallback(() => {
    if (filteredUsers.length === 0) {
      toast("Немає даних для експорту", "info");
      return;
    }
    const rows = filteredUsers.map((u) => ({
      "Ім'я": u.name,
      "Email": u.email,
      "Телефон": u.phone ?? "",
      "Роль": ROLE_LABELS[u.role] ?? u.role,
      "Місто": u.city?.name ?? "",
    }));
    exportCsv(rows, `employees-${new Date().toISOString().slice(0, 10)}.csv`);
    toast(`Експортовано ${rows.length} записів`, "success");
  }, [filteredUsers, toast]);

  const handleDelete = useCallback(async () => {
    if (!confirmDelete) return;
    setIsMutating(true);
    try {
      await deleteUser.mutateAsync(confirmDelete.id);
      toast("Користувача видалено", "success");
    } catch {
      toast("Помилка видалення", "error");
    } finally {
      setConfirmDelete(null);
      setIsMutating(false);
    }
  }, [confirmDelete, deleteUser, toast]);

  const handleCreateProject = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name.trim()) return;
    setIsProjectModalOpen(false);
    const payload = { ...projectForm, pricePerChild: Number(projectForm.pricePerChild) || 0 };
    setProjectForm({ name: "", color: "blue", pricePerChild: "" });
    if (editingProject) {
      updateProject.mutate({ id: editingProject.id, form: payload });
      setEditingProject(null);
    } else {
      createProject.mutate(payload);
    }
  }, [projectForm, editingProject, updateProject, createProject]);

  const handleDeleteProject = useCallback(async (id: string, name: string) => {
    if (!window.confirm(`Видалити вид події "${name}"? Існуючі події з цією назвою збережуться.`)) return;
    try { await deleteProject.mutateAsync(id); }
    catch { alert("Помилка видалення"); }
  }, [deleteProject]);

  const cityOptions = useMemo(
    () => [{ value: "all", label: "Всі міста" }, ...cities.map((c: City) => ({ value: c.id, label: c.name }))],
    [cities],
  );

  if (usersLoading) return <EmployeesSkeleton />;

  return (
    <>
      <LoadingBar isLoading={isMutating} />
      <MotionConfig reducedMotion="user">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="p-4 md:p-8 h-full"
        >
        <EmployeesHeader
          isSuperAdmin={isSuperAdmin}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onAddUser={() => handleOpenModal()}
          onToggleFilter={() => setFilterPanelOpen((p) => !p)}
          searchQuery={rawSearch}
          onSearchChange={(q) => updateParams({ search: q || null })}
          onExport={handleExport}
        />

        {activeFilterChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeFilterChips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200"
              >
                {chip.label}
                <button onClick={chip.onRemove} className="hover:text-brand-900 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-content-muted hover:text-content-primary transition-colors"
              >
                Очистити всі
              </button>
            )}
          </div>
        )}

        <div className="flex gap-6">
          <FilterPanel
            isMobileOpen={filterPanelOpen}
            onMobileClose={() => setFilterPanelOpen(false)}
            selectedRoles={selectedRoles}
            onRolesChange={(roles) => updateParams({ roles: roles.length > 0 ? roles.join(",") : null })}
            selectedCity={selectedCity || "all"}
            onCityChange={(city) => updateParams({ city: city === "all" ? null : city })}
            cityOptions={cityOptions}
            onReset={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <div className="flex-1 min-w-0">
            {filteredUsers.length === 0 ? (
              <EmptyState
                icon={Search}
                title="Нічого не знайдено"
                description="Спробуйте змінити параметри пошуку або фільтри"
                action={
                  hasActiveFilters || debouncedSearch.trim() ? (
                    <button
                      onClick={handleResetFilters}
                      className="text-sm font-semibold text-brand hover:text-brand-700 transition-colors"
                    >
                      Очистити фільтри
                    </button>
                  ) : isSuperAdmin ? (
                    <button
                      onClick={() => handleOpenModal()}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-700 transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      Додати працівника
                    </button>
                  ) : undefined
                }
              />
            ) : viewMode === "cards" ? (
              <div className="space-y-8">
                {grouped.map(({ role, label, items }) => (
                  <motion.div
                    key={role}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-1 h-6 rounded-full ${ROLE_HEADER_COLORS[role]}`} />
                      <h2 className="text-lg font-bold text-slate-700">{label}</h2>
                      <motion.span
                        key={items.length}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[role]}`}
                      >
                        {items.length}
                      </motion.span>
                    </div>
                    {items.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center"
                      >
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 text-lg">👤</div>
                        <p className="text-slate-400 text-sm mb-3">Немає {label.toLowerCase()}ів</p>
                        {isSuperAdmin && (
                          <button onClick={() => handleOpenModal()} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                            + Додати {label.toLowerCase()}а
                          </button>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        variants={sectionVariants}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
                      >
                        <AnimatePresence initial={false}>
                          {items.map((u) => (
                            <EmployeeCard
                              key={u.id}
                              user={u}
                              role={role}
                              isSuperAdmin={isSuperAdmin}
                              onEdit={handleOpenModal}
                              onDelete={(id, name) => setConfirmDelete({ id, name })}
                            />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                <div className="border-t border-slate-200 pt-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Види подій (Проєкти)</h2>
                      <p className="text-sm text-slate-400 mt-1">Ці проєкти відображатимуться у випадаючому списку при створенні події</p>
                    </div>
                    {isSuperAdmin && (
                      <button onClick={() => handleOpenProjectModal()} className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full sm:w-auto">
                        + Створити вид події
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((p, pi) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: pi * 0.05 }}
                        whileHover={{ y: -3, boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10)" }}
                        className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group cursor-default hover:border-slate-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.15 }}
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center ${PROJECT_COLORS[p.color] || "bg-blue-500"} shadow-sm ring-4 ring-offset-1 ring-slate-50`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
                          </motion.div>
                          <div>
                            <span className="font-bold text-slate-800">{p.name}</span>
                            {!!(p as any).pricePerChild && (
                              <p className="text-xs text-slate-400">{(p as any).pricePerChild} грн / дитина</p>
                            )}
                          </div>
                        </div>
                        {isSuperAdmin && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleOpenProjectModal(p)} className="text-slate-300 hover:text-blue-500 p-2 -mr-1" title="Редагувати">✏️</button>
                            <button onClick={() => handleDeleteProject(p.id, p.name)} className="text-slate-300 hover:text-red-500 p-2 -mr-2" title="Видалити">🗑</button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {projects.length === 0 && (
                      <div className="col-span-full text-center py-10 text-slate-400">Ви ще не додали жодного виду події</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <EmployeesTable users={filteredUsers} onSelect={(user) => console.log("select", user)} />
            )}
          </div>
        </div>

        <ProjectModal
          isOpen={isProjectModalOpen}
          isEditing={!!editingProject}
          form={projectForm}
          setForm={setProjectForm}
          onClose={() => { setIsProjectModalOpen(false); setEditingProject(null); }}
          onSubmit={handleCreateProject}
        />
        <UserModal
          isOpen={isModalOpen}
          isEditing={!!editingUser}
          initialValues={userFormValues}
          cities={cities}
          formError={formError}
          isSubmitting={isSubmitting}
          showSuccess={showSuccess}
          onClose={() => { setIsModalOpen(false); setEditingUser(null); }}
          onSave={handleSaveUser}
        />
        <ConfirmDialog
          isOpen={!!confirmDelete}
          title="Видалити користувача"
          message={`Ви впевнені, що хочете видалити "${confirmDelete?.name}"?`}
          confirmLabel="Видалити"
          variant="danger"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
        </motion.div>
      </MotionConfig>
    </>
  );
}

```

# FILE: apps/frontend/src/pages/EventReport.tsx

```
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

import { useEventFull } from "../hooks/useSchoolProfile";
import AddressLink from "../components/AddressLink";
import { formatCurrency } from "../utils/formatCurrency";

export default function EventReport() {
  const { eventId } = useParams();
  const { data: event, isLoading, isError } = useEventFull(eventId);

  if (isLoading)
    return <div className="p-8 text-content-muted">Завантаження...</div>;
  if (isError || !event)
    return <div className="p-8 text-content-muted">Подію не знайдено</div>;

  const report = event.report;
  const crew = event.crew;
  const fmt = formatCurrency;

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs sm:text-sm text-content-muted mb-4 flex items-center gap-1 flex-wrap">
        <Link to="/cities" className="hover:text-brand">
          Міста
        </Link>
        <span>›</span>
        <Link to={`/cities/${event.cityId}`} className="hover:text-brand">
          {event.city?.name}
        </Link>
        <span>›</span>
        <span>Події</span>
        <span>›</span>
        <span className="text-content-primary font-medium">Звіт по події</span>
      </div>

      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2.5 bg-surface border border-border-strong rounded-lg text-sm text-content-secondary hover:bg-surface-subtle flex items-center gap-2"
      >
        ← Назад
      </button>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold text-content-primary">
          Звіт по події
        </h1>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          Проведено
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Інформація */}
        <div className="bg-surface rounded-card border border-border shadow-card p-4 sm:p-6">
          <h3 className="font-bold text-content-primary mb-4">Інформація</h3>
          <div className="space-y-2 text-sm">
            <Row label="Заклад" value={event.school?.name} />
            <Row
              label="Адреса"
              value={<AddressLink address={event.address} />}
            />
            <Row
              label="Дата"
              value={new Date(event.date).toLocaleDateString("uk-UA")}
            />
            <Row label="Час" value={event.time} />
            <Row label="Проєкт" value={event.project} />
            <Row label="Екіпаж" value={crew?.name} />
            <Row label="Ведучий" value={crew?.host?.name} />
            <Row label="Водій" value={crew?.driver?.name} />
          </div>
        </div>

        {/* Результат */}
        <div className="bg-surface rounded-card border border-border shadow-card p-4 sm:p-6">
          <h3 className="font-bold text-content-primary mb-4">Результат</h3>
          <div className="space-y-2 text-sm">
            <Row label="Заплановано дітей" value={event.childrenPlanned} />
            <Row label="Фактично дітей" value={report?.childrenCount} />
            <Row label="Вартість" value={`${fmt(event.price)} грн`} />
            <Row label="Отримано" value={`${fmt(report?.totalSum)} грн`} />
            <Row label="Спосіб оплати" value={event.paymentMethod} />
          </div>
        </div>

        {/* Оцінка */}
        <div className="bg-surface rounded-card border border-border shadow-card p-4 sm:p-6">
          <h3 className="font-bold text-content-primary mb-4">Оцінка</h3>
          <div className="space-y-2 text-sm">
            <Row
              label="Директор задоволений"
              value={report?.directorSatisfied ? "Так" : "Ні"}
            />
            <Row
              label="Вчителі задоволені"
              value={report?.teachersSatisfied ? "Так" : "Ні"}
            />
            <Row label="Проблеми" value={report?.hadIssues ? "Так" : "Ні"} />
            {report?.comment && (
              <div className="pt-2">
                <p className="text-content-muted mb-1">Коментар:</p>
                <p className="text-content-secondary italic">"{report.comment}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-content-muted">{label}:</span>
      <span className="font-medium text-content-primary">{value ?? "—"}</span>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Events.tsx

```
import { useState } from "react";
import { useEvents } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { School, MapPin, User, Truck } from "lucide-react";
import AddressLink from "../components/AddressLink";
import PhoneLink from "../components/PhoneLink";
import { useSelectedCity } from "../context/CityContext";

interface AuthUser {
  id: string;
  name: string;
  role: string;
}

interface CrewMember {
  id: string;
  name: string;
}

interface EventListItem {
  id: string;
  project: string;
  date: string;
  time?: string | null;
  status: string;
  address?: string | null;
  contactPerson?: string | null;
  contactPhone?: string | null;
  school?: { id: string; name: string; type: string } | null;
  city?: { id: string; name: string } | null;
  crew?: {
    host?: CrewMember | null;
    driver?: CrewMember | null;
  } | null;
  report?: { status: string } | null;
}

const STATUS_LABELS: Record<string, string> = {
  BASE: "База",
  FIRST_CONTACT: "Перший контакт",
  INTERESTED: "Зацікавлений",
  PRE_APPROVAL: "Попереднє погодження",
  DATE_CONFIRMED: "Дата підтверджена",
  PREPARATION: "Підготовка",
  IN_PROGRESS: "В роботі",
  DONE: "Проведено",
  REPORT: "Звіт",
  RE_SALE: "Повторний продаж",
};

const STATUS_COLORS: Record<string, string> = {
  BASE: "bg-slate-100 text-slate-600",
  FIRST_CONTACT: "bg-sky-50 text-sky-700",
  INTERESTED: "bg-indigo-50 text-indigo-700",
  PRE_APPROVAL: "bg-amber-50 text-amber-700",
  DATE_CONFIRMED: "bg-emerald-50 text-emerald-700",
  PREPARATION: "bg-violet-50 text-violet-700",
  IN_PROGRESS: "bg-blue-50 text-blue-700",
  DONE: "bg-green-50 text-green-700",
  REPORT: "bg-teal-50 text-teal-700",
  RE_SALE: "bg-pink-50 text-pink-700",
};

const FIELD_ROLES = ["DRIVER", "HOST"];

const REPORT_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Чернетка",
  SUBMITTED: "На перевірці",
  NEEDS_REVISION: "На доопрацюванні",
  APPROVED: "Затверджено",
  REJECTED: "Відхилено",
  CLOSED: "Закрито",
};

const REPORT_STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-500",
  SUBMITTED: "bg-amber-50 text-amber-600",
  NEEDS_REVISION: "bg-rose-50 text-rose-600",
  APPROVED: "bg-emerald-50 text-emerald-600",
  REJECTED: "bg-red-50 text-red-500",
  CLOSED: "bg-slate-200 text-slate-400",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Events() {
  const navigate = useNavigate();
  const [user] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const { selectedCity } = useSelectedCity();
  const { data: events = [], isLoading, isError } = useEvents();
  const error = isError ? "Не вдалося завантажити список подій" : "";

  const isFieldStaff = !!user && FIELD_ROLES.includes(user.role);
  const filteredEvents = selectedCity.id
    ? events.filter((ev) => ev.city?.id === selectedCity.id)
    : events;
  const title = isFieldStaff ? "Мої події" : "Розклад подій";
  const subtitle = isFieldStaff
    ? "Події, на які вас призначив менеджер"
    : "Всі заплановані та проведені події";

  const goToEvent = (ev: EventListItem) => {
    if (ev.school?.id) navigate(`/schools/${ev.school.id}`);
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-subtle min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-content-primary">
            {title}
            {selectedCity.id && !isFieldStaff && (
              <span className="ml-2 text-base font-normal text-brand">
                · {selectedCity.name}
              </span>
            )}
          </h1>{" "}
          <p className="text-sm text-content-muted mt-1">{subtitle}</p>
        </div>
        {!isFieldStaff && (
          <button
            onClick={() => navigate("/schools")}
            className="bg-brand text-white px-4 py-2.5 sm:py-2.5 rounded-lg text-sm font-medium hover:bg-brand-hover hover:shadow-lift hover:-translate-y-0.5 active:scale-95 transition-all duration-200 w-full sm:w-auto"
          >
            + Додати подію
          </button>
        )}
      </div>

      {isLoading && (
        <div className="text-center text-content-muted py-16">Завантаження...</div>
      )}

      {!isLoading && error && (
        <div className="bg-red-50 text-red-600 border border-red-100 rounded-card p-4 text-sm">
          {error}
        </div>
      )}

      {!isLoading && !error && filteredEvents.length === 0 && (
        <div className="bg-surface border border-border rounded-card p-10 text-center text-content-muted">
          {isFieldStaff
            ? "Поки що немає подій, на які вас призначено."
            : "Подій ще немає."}
        </div>
      )}

      {!isLoading && !error && filteredEvents.length > 0 && (
        <>
          {/* Картки — мобільний вигляд */}
          <div className="md:hidden flex flex-col gap-3">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => goToEvent(ev)}
                className="bg-surface rounded-card shadow-card border border-border p-4 cursor-pointer active:bg-surface-subtle"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-content-primary">{ev.project}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        STATUS_COLORS[ev.status] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {STATUS_LABELS[ev.status] ?? ev.status}
                    </span>
                    {ev.report?.status && (
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-2xs font-medium ${
                          REPORT_STATUS_COLORS[ev.report.status] ?? "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {REPORT_STATUS_LABELS[ev.report.status] ?? ev.report.status}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-content-muted mt-1">
                  {formatDate(ev.date)}
                  {ev.time ? `, ${ev.time}` : ""} · {ev.city?.name ?? "—"}
                </p>
                <p className="text-xs text-content-muted mt-0.5 flex items-center gap-1">
                  <School className="w-3 h-3 shrink-0" /> {ev.school?.name ?? "—"}
                </p>
                {ev.address && (
                  <p className="text-xs text-content-muted mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" /> <AddressLink address={ev.address} />
                  </p>
                )}
                {(ev.crew?.host || ev.crew?.driver) && (
                  <p className="text-xs text-content-muted mt-1 flex items-center gap-1">
                    <User className="w-3 h-3 shrink-0" /> {ev.crew?.host?.name ?? "—"} <Truck className="w-3 h-3 shrink-0" />{" "}
                    {ev.crew?.driver?.name ?? "—"}
                  </p>
                )}
                {isFieldStaff && (ev.contactPerson || ev.contactPhone) && (
                  <p className="text-xs text-content-muted mt-0.5">
                    {ev.contactPerson ?? "—"}
                    {ev.contactPhone ? (
                      <>
                        {" "}
                        · <PhoneLink phone={ev.contactPhone} />
                      </>
                    ) : null}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Таблиця — десктоп */}
          <div className="hidden md:block bg-surface rounded-card shadow-card border border-border overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-muted border-b border-border">
                  <th className="p-4 font-medium text-content-secondary">Подія</th>
                  <th className="p-4 font-medium text-content-secondary">Дата</th>
                  <th className="p-4 font-medium text-content-secondary">Локація</th>
                  <th className="p-4 font-medium text-content-secondary">Екіпаж</th>
                  <th className="p-4 font-medium text-content-secondary">Статус</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((ev) => (
                  <tr
                    key={ev.id}
                    onClick={() => goToEvent(ev)}
                    className="border-b border-border hover:bg-surface-muted/50 transition cursor-pointer"
                  >
                    <td className="p-4 text-content-primary font-medium">
                      {ev.project}
                      <div className="text-xs text-content-muted font-normal mt-0.5">
                        {ev.school?.name ?? "—"}
                      </div>
                    </td>
                    <td className="p-4 text-content-secondary">
                      {formatDate(ev.date)}
                      {ev.time && (
                        <div className="text-xs text-content-muted">{ev.time}</div>
                      )}
                    </td>
                    <td className="p-4 text-content-secondary">
                      {ev.city?.name ?? "—"}
                      {ev.address && (
                        <div className="text-xs text-content-muted">
                          <AddressLink address={ev.address} />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-content-secondary text-sm">
                      <div className="flex items-center gap-1"><User className="w-3 h-3 shrink-0" /> {ev.crew?.host?.name ?? "—"}</div>
                      <div className="flex items-center gap-1"><Truck className="w-3 h-3 shrink-0" /> {ev.crew?.driver?.name ?? "—"}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            STATUS_COLORS[ev.status] ??
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {STATUS_LABELS[ev.status] ?? ev.status}
                        </span>
                        {ev.report?.status && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              REPORT_STATUS_COLORS[ev.report.status] ?? "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {REPORT_STATUS_LABELS[ev.report.status] ?? ev.report.status}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Finance.tsx

```
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MySalary from "../features/salary/pages/MySalary";
import TeamSalaries from "../features/salary/pages/TeamSalaries";
import Company from "../features/salary/pages/Company";

type Tab = "my-salary" | "team" | "company";

function PeekSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-xl w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
      <div className="h-64 bg-white rounded-2xl border border-slate-100" />
    </div>
  );
}

export default function Finance({ isPeek }: { isPeek?: boolean }) {
  const { user } = useAuth();
  const isManagerOrAdmin = user?.role === "MANAGER" || user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const tabs: { key: Tab; label: string; managerOnly?: boolean }[] = [
    { key: "my-salary", label: "Мої нарахування" },
    { key: "team", label: "Нарахування команди", managerOnly: true },
    { key: "company", label: "Фінанси компанії", managerOnly: true },
  ];

  const availableTabs = tabs.filter((t) => !t.managerOnly || isManagerOrAdmin);
  const [activeTab, setActiveTab] = useState<Tab>(availableTabs[0]?.key ?? "my-salary");

  if (isPeek) {
    return <PeekSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="flex overflow-x-auto scrollbar-none">
          {availableTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "my-salary" && <MySalary />}
      {activeTab === "team" && isManagerOrAdmin && <TeamSalaries />}
      {activeTab === "company" && isManagerOrAdmin && <Company />}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Inventory.tsx

```
import { useState, useMemo } from "react";
import { Plus, Search, Edit3, Trash2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  useInventory,
  useCreateInventoryItem,
  useUpdateInventoryItem,
  useDeleteInventoryItem,
  useAddStock,
} from "../hooks/useInventory";
import { InventoryItemModal } from "../components/inventory/InventoryItemModal";
import type { InventoryItem } from "../types";

function StockBadge({ current, min }: { current: number; min: number }) {
  let color = "bg-green-100 text-green-700";
  if (current < min) color = "bg-red-100 text-red-700";
  else if (current === min) color = "bg-yellow-100 text-yellow-700";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      {current}
    </span>
  );
}

const CATEGORIES = ["Техніка", "Матеріали", "Реквізит", "Канцелярія", "Інше"];

export default function InventoryPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  const { data: items, isLoading } = useInventory({
    search: search || undefined,
    category: categoryFilter || undefined,
    lowStock: lowStockOnly ? "true" : undefined,
  });

  const createItem = useCreateInventoryItem();
  const updateItem = useUpdateInventoryItem();
  const deleteItem = useDeleteInventoryItem();
  const addStock = useAddStock();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [stockModal, setStockModal] = useState<{ id: string; name: string } | null>(null);
  const [stockQty, setStockQty] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const canEdit = user?.role === "SUPERADMIN" || user?.role === "OWNER";
  const canAddStock = canEdit || user?.role === "MANAGER";

  const uniqueCategories = useMemo(() => {
    if (!items) return CATEGORIES;
    const cats = new Set(items.map((i) => i.category));
    return [...new Set([...CATEGORIES, ...cats])];
  }, [items]);

  const handleOpenCreate = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: InventoryItem) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleSave = async (data: { name: string; category: string; project?: string; minStock: number; currentStock: number; notes?: string }) => {
    if (editItem) {
      await updateItem.mutateAsync({ id: editItem.id, ...data });
    } else {
      await createItem.mutateAsync(data);
    }
    setModalOpen(false);
    setEditItem(null);
  };

  const handleDelete = async (id: string) => {
    await deleteItem.mutateAsync(id);
    setDeleteConfirm(null);
  };

  const handleAddStock = async () => {
    if (!stockModal || stockQty <= 0) return;
    await addStock.mutateAsync({ id: stockModal.id, quantity: stockQty });
    setStockModal(null);
    setStockQty(0);
  };

  const cardView = (item: InventoryItem) => (
    <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 sm:hidden">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-semibold text-slate-800 truncate">{item.name}</div>
          {item.sku && <div className="text-xs text-slate-400 mt-0.5">{item.sku}</div>}
        </div>
        <StockBadge current={item.currentStock} min={item.minStock} />
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="bg-slate-100 px-2 py-0.5 rounded">{item.category}</span>
        {item.project && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{item.project}</span>}
        {item.city && <span>{item.city.name}</span>}
      </div>
      <div className="flex items-center gap-2 pt-1">
        {canAddStock && (
          <button onClick={() => setStockModal({ id: item.id, name: item.name })} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">
            Поповнити
          </button>
        )}
        {canEdit && (
          <>
            <button onClick={() => handleOpenEdit(item)} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium">
              <Edit3 className="w-3.5 h-3.5 inline mr-1" />
              Змінити
            </button>
            <button onClick={() => setDeleteConfirm(item.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium">
              <Trash2 className="w-3.5 h-3.5 inline mr-1" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Склад</h1>
        {canEdit && (
          <button
            onClick={handleOpenCreate}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Додати товар
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук товару..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="">Всі категорії</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={lowStockOnly}
            onChange={(e) => setLowStockOnly(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Мало на складі
        </label>
      </div>

      {isLoading ? (
        <div className="text-slate-500 py-8 text-center">Завантаження...</div>
      ) : !items || items.length === 0 ? (
        <div className="text-slate-400 py-16 text-center">
          <p className="text-lg mb-2">Склад порожній</p>
          {canEdit && (
            <button onClick={handleOpenCreate} className="text-blue-600 font-medium text-sm hover:underline">
              + Додати перший товар
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="flex flex-col gap-3 sm:hidden">{items.map(cardView)}</div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto bg-white rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Назва</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Категорія</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Проєкт</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">На складі</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">Мін.</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Місто</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600">Дії</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                    <td className="px-4 py-3 text-slate-500">{item.category}</td>
                    <td className="px-4 py-3 text-slate-500">{item.project || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      <StockBadge current={item.currentStock} min={item.minStock} />
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600">{item.minStock}</td>
                    <td className="px-4 py-3 text-slate-500">{item.city?.name || "—"}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {canAddStock && (
                        <button
                          onClick={() => setStockModal({ id: item.id, name: item.name })}
                          className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium"
                        >
                          Поповнити
                        </button>
                      )}
                      {canEdit && (
                        <>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium"
                          >
                            <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                            Змінити
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item.id)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* FAB for mobile */}
      {canEdit && (
        <button
          onClick={handleOpenCreate}
          className="sm:hidden fixed right-4 z-40 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          style={{ bottom: "calc(5rem + env(safe-area-inset-bottom, 0px))" }}
          aria-label="Додати товар"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Create/Edit Modal */}
      <InventoryItemModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null); }}
        onSave={handleSave}
        item={editItem}
      />

      {/* Stock modal */}
      {stockModal && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setStockModal(null); }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4">
            <h2 className="text-lg font-bold text-slate-800 mb-1">Поповнення складу</h2>
            <p className="text-sm text-slate-500 mb-4">{stockModal.name}</p>
            <input
              type="number"
              min={1}
              value={stockQty || ""}
              onChange={(e) => setStockQty(+e.target.value)}
              placeholder="Кількість"
              className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setStockModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm"
              >
                Скасувати
              </button>
              <button
                onClick={handleAddStock}
                disabled={stockQty <= 0 || addStock.isPending}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm disabled:opacity-50"
              >
                {addStock.isPending ? "..." : "Додати"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteConfirm(null); }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Видалити товар?</h2>
            <p className="text-sm text-slate-500 mb-5">Цю дію не можна скасувати.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm"
              >
                Скасувати
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteItem.isPending}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-medium text-sm disabled:opacity-50"
              >
                {deleteItem.isPending ? "..." : "Видалити"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Kindergartens.tsx

```
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import {
  useSchools,
  useSchoolStats,
  useDeleteSchool,
  usePrefetchSchool,
  useSupportedCities,
} from "../hooks/useApi";
import { useCities } from "../hooks/useCities";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import VirtualSchoolList from "../components/VirtualSchoolList";
import { SchoolCard } from "../components/schools/SchoolMobileList";
import type { SchoolContact } from "../types";
import { useAuth } from "../context/AuthContext";
import { Download } from "lucide-react";
import { PIPELINE_STAGES } from "../constants/pipelineStages";

interface NewSchoolPayload {
  name: string;
  cityId: string;
  sourceUrl: string;
  director: string;
  phone: string;
  type: string;
}

const StatsBar = lazy(() => import("../components/schools/StatsBar"));
const VirtualDesktopTable = lazy(
  () => import("../components/schools/VirtualDesktopTable"),
);

export default function Kindergartens() {
  const { selectedCity } = useSelectedCity();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const userRole = user?.role ?? null;
  const qc = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    cityId: "",
    sourceUrl: "",
    director: "",
    phone: "",
  });
  const [matchedContacts, setMatchedContacts] = useState<SchoolContact[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; url: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dotCount, setDotCount] = useState(3);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addSchoolMutation = useMutation({
    mutationFn: (newSchool: NewSchoolPayload) =>
      api.post("/schools", newSchool),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      setIsModalOpen(false);
    },
    onError: () => alert("Не вдалося створити садочок"),
  });

  const bulkImportMutation = useMutation({
    mutationFn: (cityId: string) =>
      api.post(
        "/schools/bulk-import",
        { cityId, type: "Садочок" },
        { timeout: 120000 },
      ),
    onSuccess: (res) => {
      alert(
        `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
      );
      qc.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: () => alert("Помилка імпорту."),
  });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const schoolFilters = useMemo(
    () => ({
      search: debouncedQuery || undefined,
      cityId: selectedCity.id || undefined,
      type: "Садочок" as const,
      stage: (activeFilter as any) || undefined,
      size: (sizeFilter as any) || undefined,
    }),
    [debouncedQuery, selectedCity.id, activeFilter, sizeFilter],
  );

  const {
    data: schoolsPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSchools(schoolFilters);
  const { data: stats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: "Садочок",
    stage: (activeFilter as any) || undefined,
  });
  const { data: cities = [] } = useCities();
  const { data: supportedCities = [] } = useSupportedCities();
  const deleteSchool = useDeleteSchool();
  const prefetchSchool = usePrefetchSchool();

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const filteredSchools = useMemo(
    () => schoolsPages?.pages.flatMap((p) => p.data) ?? [],
    [schoolsPages],
  );
  const totalItems = schoolsPages?.pages[0]?.meta.totalItems ?? 0;

  const handleOpenModal = useCallback(() => {
    setForm({
      name: "",
      cityId: selectedCity.id || cities[0]?.id || "",
      sourceUrl: "",
      director: "",
      phone: "",
    });
    setMatchedContacts([]);
    setIsModalOpen(true);
  }, [selectedCity.id, cities]);

  const fetchContacts = async (schoolName: string) => {
    if (!schoolName || schoolName.trim().length < 1)
      return setMatchedContacts([]);
    const currentCityName =
      selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
    if (currentCityName.toLowerCase() !== "львів")
      return setMatchedContacts([]);
    try {
      const data = await qc.fetchQuery<SchoolContact[]>({
        queryKey: ["schoolContacts", schoolName, currentCityName],
        queryFn: async () => {
          const res = await api.get<SchoolContact[]>(
            `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Садочок`,
          );
          return res.data;
        },
        staleTime: 1000 * 60 * 5,
      });

      setMatchedContacts(data);
      if (data.length > 0) {
        const director =
          data.find(
            (c: SchoolContact) =>
              c.role?.includes("Директор") || c.role?.includes("Завідувач"),
          ) || data[0];
        setForm((f) => ({
          ...f,
          director: director.contactName,
          phone: director.phone,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNameChange = (value: string) => {
    setForm({ ...form, name: value });
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (value.length < 2) {
      setShowSuggestions(false);
      setIsSearching(false);
      setMatchedContacts([]);
      return;
    }
    setIsSearching(true);
    setShowSuggestions(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const [externalData] = await Promise.all([
          qc.fetchQuery({
            queryKey: ["schoolSearchExternal", value],
            queryFn: async () => {
              const res = await api.get(
                `/schools/search?q=${encodeURIComponent(value)}&type=Садочок`,
              );
              return res.data;
            },
            staleTime: 1000 * 60 * 5,
          }),
          fetchContacts(value),
        ]);
        setSuggestions(externalData);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  const handleSelectSuggestion = (name: string, url: string) => {
    setForm({ ...form, name, sourceUrl: url });
    setShowSuggestions(false);
    fetchContacts(name);
  };

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.cityId) return;
    addSchoolMutation.mutate({ ...form, type: "Садочок" });
  };

  const handleDeleteSchool = useCallback(
    async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
      e.stopPropagation();
      if (userRole !== "SUPERADMIN") return;
      if (
        !window.confirm(
          `Видалити садочок "${schoolName}"? Це видалить також усі його події.`,
        )
      )
        return;
      await deleteSchool.mutateAsync(schoolId);
    },
    [deleteSchool, userRole],
  );

  return (
    <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-surface-subtle min-h-screen">
      <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-content-primary leading-tight">
            Садочки
            {selectedCity.id && (
              <span className="ml-2 text-sm font-normal text-blue-500">
                · {selectedCity.name}
              </span>
            )}
          </h1>
        </div>
        <div className="flex gap-2 shrink-0">
          {(userRole === "SUPERADMIN" || userRole === "MANAGER") && (
            <button
              onClick={() => {
                if (!selectedCity.id) return alert("Спочатку оберіть місто");
                if (!supportedCities.includes(selectedCity.name))
                  return alert(
                    `Місто "${selectedCity.name}" не підтримується для імпорту.`,
                  );
                if (
                  !window.confirm(
                    `Імпортувати всі садочки з isuo.org для міста ${selectedCity.name}?`,
                  )
                )
                  return;

                setDotCount(3);
                const dotInterval = setInterval(() => {
                  setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
                }, 500);

                bulkImportMutation.mutate(selectedCity.id, {
                  onSettled: () => clearInterval(dotInterval),
                });
              }}
              disabled={bulkImportMutation.isPending}
              className="flex items-center gap-1.5 px-3 py-2 bg-success text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-70 transition-all"
            >
              {bulkImportMutation.isPending ? (
                <span className="font-medium">
                  Імпортую{"·".repeat(dotCount)}
                </span>
              ) : (
                <><Download className="w-4 h-4" /> Імпорт з isuo</>
              )}
            </button>
          )}
          <button
            onClick={handleOpenModal}
            className="hidden md:flex items-center gap-1 px-3 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-hover"
          >
            + Додати
          </button>
        </div>
      </div>

      <div className="shrink-0">
        <Suspense
          fallback={
            <div className="h-[72px] bg-surface rounded-card animate-pulse mb-4" />
          }
        >
          <StatsBar
            statusStats={
              stats?.statusStats ?? {
                new: 0,
                planned: 0,
                inProgress: 0,
                done: 0,
              }
            }
            sizeStats={stats?.sizeStats ?? { small: 0, medium: 0, large: 0 }}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sizeFilter={sizeFilter}
            onSizeFilterChange={setSizeFilter}
            schoolType="Садочок"
          />
        </Suspense>
      </div>

      <div className="relative shrink-0 mb-4 mt-2">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-content-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук за назвою садочка..."
          className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-surface border-none sm:border sm:border-border-strong rounded-card sm:rounded-control text-sm font-medium text-content-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand shadow-sm transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-content-muted hover:text-content-secondary transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <p className="text-xs font-semibold text-content-muted mb-4 shrink-0 uppercase tracking-wide px-1">
        {`${filteredSchools.length} з ${totalItems} садочків`}
        {(activeFilter || sizeFilter) && (
          <button
            onClick={() => {
              setActiveFilter(null);
              setSizeFilter(null);
            }}
            className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
          >
            скинути фільтри
          </button>
        )}
      </p>

      {isLoading ? (
        <div className="flex flex-col gap-2.5 flex-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface rounded-card border border-border p-3.5 animate-pulse"
              style={{ opacity: 1 - i * 0.1 }}
            >
              <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-surface-muted rounded-lg w-1/3" />
                <div className="h-3 bg-surface-muted rounded-lg w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="md:hidden flex-1 w-full overflow-hidden">
            <VirtualSchoolList
              schools={filteredSchools}
              itemHeight={110}
              onEndReached={handleLoadMore}
              animationKey={`${activeFilter}-${sizeFilter}`}
              renderItem={(school, index) => (
                <div
                  className="pb-2.5"
                  onMouseEnter={() => prefetchSchool(school.id)}
                >
                  <SchoolCard
                    school={school}
                    index={index}
                    onDelete={handleDeleteSchool}
                    stages={PIPELINE_STAGES}
                  />
                </div>
              )}
            />
          </div>

          <div className="hidden md:flex flex-col flex-1 bg-surface rounded-card shadow-card border border-border overflow-hidden min-h-0">
            <Suspense
              fallback={<div className="flex-1 animate-pulse bg-surface-subtle" />}
            >
              <VirtualDesktopTable
                schools={filteredSchools}
                searchQuery={searchQuery}
                onDelete={handleDeleteSchool}
                stages={PIPELINE_STAGES}
                onEndReached={handleLoadMore}
              />
            </Suspense>
          </div>
        </>
      )}

      <button
        onClick={handleOpenModal}
        className="md:hidden fixed right-6 w-14 h-14 bg-brand text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-brand-hover active:scale-95 transition-transform"
        style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
      >
        +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-card shadow-modal w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-border flex justify-between items-center bg-surface-subtle shrink-0">
              <h3 className="text-xl font-bold text-content-primary">
                Новий садочок
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-content-muted hover:text-content-secondary p-2 -mr-2 leading-none text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleAddSchool}
              className="p-6 flex flex-col gap-4 overflow-y-auto"
            >
              <div className="relative">
                <label className="block text-sm font-medium text-content-secondary mb-1.5">
                  Назва садочка
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  placeholder="Наприклад: Садочок №1"
                  required
                  className="w-full p-3 border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
                {showSuggestions && (
                  <ul className="absolute z-10 w-full bg-surface border border-border-strong rounded-control shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
                    {isSearching ? (
                      <li className="px-4 py-3 text-sm text-content-muted italic">
                        Пошук...
                      </li>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((s, i) => (
                        <li
                          key={i}
                          onMouseDown={() =>
                            handleSelectSuggestion(s.name, s.url)
                          }
                          className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer font-medium border-b border-slate-50 last:border-0"
                        >
                          {s.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-content-muted italic">
                        Нічого не знайдено
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {!selectedCity.id && (
                <div>
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
                    Місто
                  </label>
                  <select
                    value={form.cityId}
                    onChange={(e) =>
                      setForm({ ...form, cityId: e.target.value })
                    }
                    required
                    className="w-full p-3 border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand bg-surface"
                  >
                    <option value="">— Оберіть місто —</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-content-secondary mb-1.5">
                  Контакт{" "}
                  <span className="ml-1 text-xs font-normal text-content-muted">
                    (автозаповнення)
                  </span>
                </label>
                {matchedContacts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {matchedContacts.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            director: c.contactName,
                            phone: c.phone,
                          }))
                        }
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-brand text-white border-blue-600 shadow-sm" : "bg-surface text-content-secondary border-border-strong hover:bg-surface-subtle"}`}
                      >
                        {c.role ? `${c.role}: ` : ""}
                        {c.contactName}
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={form.director}
                  onChange={(e) =>
                    setForm({ ...form, director: e.target.value })
                  }
                  placeholder="Микола Петренко"
                  className="w-full p-3 border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand mb-4"
                />
                <label className="block text-sm font-medium text-content-secondary mb-1.5">
                  Телефон
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0671234567"
                  className="w-full p-3 border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-5 py-3.5 bg-surface-muted rounded-control text-sm font-bold text-content-secondary hover:bg-slate-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={addSchoolMutation.isPending}
                  className="flex-1 px-5 py-3.5 bg-brand text-white rounded-control text-sm font-bold hover:bg-brand-hover disabled:opacity-50 transition-colors"
                >
                  {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/lazyTabPages.ts

```
import { lazy } from "react";

export function lazyWithRetry(factory: () => Promise<any>) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      const key = "chunk-reload-ts";
      const last = Number(sessionStorage.getItem(key) || 0);
      if (Date.now() - last > 10000) {
        sessionStorage.setItem(key, String(Date.now()));
        window.location.reload();
        return new Promise(() => {});
      }
      throw err;
    }
  });
}

export const rawImportFactories: Record<string, () => Promise<any>> = {
  "/dashboard": () => import("./Dashboard"),
  "/schools": () => import("./Schools"),
  "/kindergartens": () => import("./Kindergartens"),
  "/finance": () => import("./Finance"),
  "/calendar": () => import("./CalendarView"),
  "/employees": () => import("./Employees"),
  "/analytics": () => import("./Analytics"),
};

const Dashboard = lazyWithRetry(rawImportFactories["/dashboard"]);
const Schools = lazyWithRetry(rawImportFactories["/schools"]);
const Kindergartens = lazyWithRetry(rawImportFactories["/kindergartens"]);
const Finance = lazyWithRetry(rawImportFactories["/finance"]);
const CalendarView = lazyWithRetry(rawImportFactories["/calendar"]);
const Employees = lazyWithRetry(rawImportFactories["/employees"]);
const Analytics = lazyWithRetry(rawImportFactories["/analytics"]);

export const TAB_PAGE_COMPONENTS: Record<string, React.LazyExoticComponent<any>> = {
  "/dashboard": Dashboard,
  "/schools": Schools,
  "/kindergartens": Kindergartens,
  "/finance": Finance,
  "/calendar": CalendarView,
  "/employees": Employees,
  "/analytics": Analytics,
};

```

# FILE: apps/frontend/src/pages/Login.tsx

```
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { api } from "../config/api";

const CIRCLE_VARIANTS = {
  hidden: { scale: 0, opacity: 1 },
  visible: {
    scale: 1,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginProps {
  onLogin?: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const proceedAfterLogin = () => {
    if (onLogin && loggedInUser) {
      onLogin(loggedInUser);
    } else {
      navigate("/cities");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      setLoggedInUser(response.data.user);
      setIsTransitioning(true);
    } catch {
      setError("Невірний email або пароль");
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface-subtle p-4">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            variants={CIRCLE_VARIANTS}
            initial="hidden"
            animate="visible"
            onAnimationComplete={proceedAfterLogin}
            style={{
              width: "300vmax",
              height: "300vmax",
              borderRadius: "9999px",
              willChange: "transform",
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-brand"
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={
          isTransitioning
            ? { opacity: 0, scale: 0.97 }
            : shake
              ? { x: [-10, 10, -10, 10, 0], opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.4 }}
        className="p-6 sm:p-8 bg-surface rounded-card shadow-modal w-full max-w-sm sm:max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-content-primary mb-6">
          Вхід у CRM
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-danger-50 text-danger-600 rounded-control text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-content-primary mb-1.5">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-3 border border-border-strong rounded-control focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-sm transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-content-primary mb-1.5">
              Пароль
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-3 border border-border-strong rounded-control focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-sm transition-colors"
              required
            />
          </div>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
            className="mt-2 bg-brand text-white font-medium px-5 py-3 rounded-control hover:bg-brand-hover transition disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLoading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                  />
                  Вхід...
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Увійти
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/NotFound.tsx

```
import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle px-4">
      <div className="max-w-md w-full bg-surface rounded-card shadow-card border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-subtle flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7 text-brand" />
        </div>
        <h1 className="text-xl font-bold text-content-primary mb-2">
          Сторінку не знайдено
        </h1>
        <p className="text-sm text-content-muted mb-6">
          Можливо, її було переміщено або видалено.
        </p>
        <Button onClick={() => navigate("/")}>
          На головну
        </Button>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/OverviewTab.tsx

```
import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useSelectedCity } from "../context/CityContext";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { useCities } from "../hooks/useCities";
import TodayEvents from "../components/dashboard/TodayEvents";
import ActivityFeed from "../components/dashboard/ActivityFeed";

function fmtAmount(value: number): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(value));
}

function KpiCard({
  title,
  value,
  subtitle,
  icon,
  loading,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: string;
  loading?: boolean;
}) {
  return (
    <div className="mobile-kpi-card min-h-[80px]">
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-3 bg-neutral-100 rounded w-1/2" />
          <div className="h-6 bg-neutral-100 rounded w-2/3" />
          <div className="h-2.5 bg-neutral-100 rounded w-1/3" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-sm">{icon}</span>
            <span className="mobile-stat-label">{title}</span>
          </div>
          <p className="text-xl font-bold text-content-primary leading-none">{value}</p>
          {subtitle && (
            <p className="text-2xs text-content-muted mt-1">{subtitle}</p>
          )}
        </>
      )}
    </div>
  );
}

export default function OverviewTab() {
  const { user } = useAuth();
  const { selectedCity, setSelectedCity } = useSelectedCity();
  const { data: summary, isError } = useDashboardSummary();
  const { data: cities } = useCities();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброго ранку";
    if (hour < 18) return "Доброго дня";
    return "Доброго вечора";
  }, []);

  const kpiCards = useMemo(() => {
    if (!summary) return null;
    return [
      {
        title: "Виручка",
        value: `${fmtAmount(summary.monthlyKpi.revenue)} грн`,
        icon: "💰",
      },
      {
        title: "Прибуток",
        value: `${fmtAmount(summary.monthlyKpi.profit)} грн`,
        icon: "📈",
      },
      {
        title: "Дітей",
        value: fmtAmount(summary.monthlyKpi.children),
        subtitle: `за ${summary.monthlyKpi.count} подіями`,
        icon: "👶",
      },
      {
        title: "Активних шкіл",
        value: fmtAmount(summary.totalSchools),
        icon: "🏫",
      },
    ];
  }, [summary]);

  return (
    <div className="min-h-0">
      <div className="bg-white/80 backdrop-blur-md border-b border-border px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-content-primary">
              {greeting}, {user?.name ?? "Користувач"}
            </h1>
            <p className="text-2xs text-content-muted mt-0.5">
              {new Date().toLocaleDateString("uk-UA", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>

          {cities && cities.length > 0 && (
            <select
              value={selectedCity.id || ""}
              onChange={(e) => {
                const city = cities.find((c) => c.id === e.target.value);
                if (city) setSelectedCity({ id: city.id, name: city.name });
              }}
              className="bg-surface border border-border-strong text-content-secondary text-2xs font-medium rounded-control px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand shadow-soft max-w-[120px] truncate"
              aria-label="Вибір міста"
            >
              <option value="">Всі міста</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-4">
        {isError ? (
          <div className="text-center py-12 text-content-muted">
            <span className="text-2xl block mb-2 opacity-50">⚠️</span>
            <p className="text-sm font-medium">Не вдалося завантажити дані дашборду</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {kpiCards
                ? kpiCards.map((kpi) => (
                    <KpiCard key={kpi.title} {...kpi} loading={false} />
                  ))
                : Array.from({ length: 4 }).map((_, i) => (
                    <KpiCard
                      key={i}
                      title=""
                      value=""
                      icon=""
                      loading={true}
                    />
                  ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TodayEvents events={summary?.todayEvents ?? []} />
              <ActivityFeed items={summary?.activityFeed ?? []} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/ProjectProfile.tsx

```
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { useCities } from "../hooks/useCities";
import type { Project } from "../types";

interface ProjectStats {
  totalEvents: number;
  completedEvents: number;
  totalRevenue: number;
  totalProfit: number;
  totalSchoolSum: number;
  avgRating: number;
}

const fmt = (n: number) => new Intl.NumberFormat("uk-UA").format(Math.round(n));

export default function ProjectProfile() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { data: cities = [] } = useCities();
  const isSuperAdminOrOwner = user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const { data: project } = useQuery<Project>({
    queryKey: ["project", id],
    queryFn: () => api.get<Project>(`/projects/${id}`).then((r) => r.data),
    enabled: !!id,
  });

  const [cityId, setCityId] = useState("");

  const { data: stats } = useQuery<ProjectStats>({
    queryKey: ["projectStats", id, cityId],
    queryFn: () =>
      api
        .get<ProjectStats>(`/projects/${id}/stats`, {
          params: cityId ? { cityId } : {},
        })
        .then((r) => r.data),
    enabled: !!id,
  });

  if (!project) {
    return <div className="p-8 text-content-muted">Завантаження...</div>;
  }

  const cards = [
    { label: "Всього подій", value: stats?.totalEvents ?? "—", color: "text-brand", bg: "bg-brand-50" },
    { label: "Завершено", value: stats?.completedEvents ?? "—", color: "text-success-600", bg: "bg-success-subtle" },
    { label: "Дохід", value: stats ? `${fmt(stats.totalRevenue)} грн` : "—", color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Прибуток", value: stats ? `${fmt(stats.totalProfit)} грн` : "—", color: "text-success-600", bg: "bg-success-subtle" },
    { label: "Середній рейтинг", value: stats?.avgRating ? `${stats.avgRating}/10` : "—", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-5 h-5 rounded-full shrink-0"
          style={{ backgroundColor: project.color }}
        />
        <h1 className="text-2xl font-bold text-content-primary">{project.name}</h1>
      </div>

      {isSuperAdminOrOwner && cities.length > 0 && (
        <div className="mb-6">
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="w-full sm:max-w-xs p-2.5 border border-border-strong rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand bg-surface"
          >
            <option value="">Всі міста</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-surface rounded-card shadow-card border border-border p-5"
          >
            <p className="text-xs text-content-muted font-medium mb-2">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/SchoolProfile.tsx

```
import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import {
  useSchool,
  useSchoolEvents,
  useUsers,
  useUpdateEventStatus,
  useUpdatePreparation,
  useAssignCrew,
  useSubmitReport,
  useAddComment,
  useUpdateHistoryComment,
  useEventFull,
  useSchoolCompletedEvents,
  useUpdateSchool,
  useCreateEvent,
} from "../hooks/useSchoolProfile";

import type { Event, User } from "../types";
import type { ReportData } from "../components/school-profile/modals/ReportModal";

import SchoolProfileHeader from "../components/school-profile/SchoolProfileHeader";
import CompletedEventModal from "../components/school-profile/CompletedEventModal";

const Pipeline = lazy(() => import("../components/school-profile/Pipeline"));
const HistoryTimeline = lazy(
  () => import("../components/school-profile/HistoryTimeline"),
);
const CommentsTimeline = lazy(
  () => import("../components/school-profile/CommentsTimeline"),
);
const EventDetails = lazy(
  () => import("../components/school-profile/EventDetails"),
);
const SchoolInfoCard = lazy(
  () => import("../components/school-profile/SchoolInfoCard"),
);
const EventsTable = lazy(
  () => import("../components/school-profile/EventsTable"),
);
const EventPreparation = lazy(
  () => import("../components/school-profile/EventPreparation"),
);
const AssignedCrew = lazy(
  () => import("../components/school-profile/AssignedCrew"),
);

import EditSchoolModal from "../components/school-profile/modals/EditSchoolModal";
import EventModal from "../components/school-profile/modals/EventModal";
import CommentModal from "../components/school-profile/modals/CommentModal";
import type { EventFormValues } from "../components/school-profile/modals/EventSchema";
import type { SchoolEditFormValues } from "../components/school-profile/modals/SchoolEditSchema";
import CrewModal from "../components/school-profile/modals/CrewModal";
import ReportModal from "../components/school-profile/modals/ReportModal";

const PIPELINE_STAGES = [
  { id: 1, key: "BASE", name: "Новий заклад" },
  { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
  { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
  { id: 4, key: "PREPARATION", name: "Оголошення" },
  { id: 5, key: "IN_PROGRESS", name: "Підготовка" },
  { id: 6, key: "DONE", name: "Проведення заходу" },
  { id: 7, key: "REPORT", name: "Звіт" },
] as const;

export default function SchoolProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isLeavingPage, setIsLeavingPage] = useState(false);

  const { data: schoolRaw } = useSchool(id);
  const { data: eventsRaw = [] } = useSchoolEvents(id, false);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [exitingEventId, setExitingEventId] = useState<string | null>(null);

  const { data: eventFull, isLoading: eventFullLoading } = useEventFull(
    selectedEventId ?? eventsRaw[0]?.id,
  );

  const { data: users = [] } = useUsers();
  const { data: completedEvents = [] } = useSchoolCompletedEvents(id);
  const [selectedReportEvent, setSelectedReportEvent] = useState<Event | null>(
    null,
  );
  const updateStatus = useUpdateEventStatus();
  const updatePreparation = useUpdatePreparation();
  const assignCrewMutation = useAssignCrew();
  const submitReportMutation = useSubmitReport();
  const addCommentMutation = useAddComment();
  const updateHistoryMutation = useUpdateHistoryComment();

  const schoolData = useMemo(() => {
    if (!schoolRaw) {
      return {
        id: "",
        cityId: "",
        name: "",
        type: "Школа",
        city: "",
        address: "",
        director: "",
        phone: "",
        email: "",
        childrenCount: 0,
        notes: "",
      };
    }

    return {
      id: schoolRaw.id,
      cityId: schoolRaw.cityId,
      name: schoolRaw.name || "",
      type: schoolRaw.type || "Школа",
      city: schoolRaw.city?.name || "",
      address: schoolRaw.address || "",
      director: schoolRaw.director || "",
      phone: schoolRaw.phone || "",
      email: schoolRaw.email || "",
      childrenCount: schoolRaw.childrenCount || 0,
      notes: schoolRaw.notes || "",
    };
  }, [schoolRaw]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [commentModal, setCommentModal] = useState({
    isOpen: false,
    mode: "pipeline",
    stepId: null as number | null,
    historyId: null as string | null,
    text: "",
  });

  const currentEventBase = useMemo(
    () => eventsRaw.find((ev) => ev.id === selectedEventId) ?? eventsRaw[0],
    [eventsRaw, selectedEventId],
  );

  const currentEvent = useMemo(() => {
    if (!currentEventBase) return null;
    if (eventFull?.id === currentEventBase.id) {
      return { ...currentEventBase, ...eventFull };
    }
    return currentEventBase;
  }, [currentEventBase, eventFull]);
  const currentStageIndex = useMemo(() => {
    if (!currentEvent?.status) return 0;
    const idx = PIPELINE_STAGES.findIndex(
      (s) => s.key === currentEvent?.status,
    );
    return idx !== -1 ? idx : 0;
  }, [currentEvent?.status]);
  const creatorName = useMemo(
    () =>
      currentEvent?.history?.length > 0
        ? currentEvent.history[currentEvent.history.length - 1].userName
        : "Немає даних",
    [currentEvent?.history],
  );

  const handlePipelineClick = useCallback(
    (stepId: number) => {
      if (!currentEvent) return;
      const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
      if (nextStage?.id !== stepId) return;
      if (nextStage.key === "REPORT") return setIsReportModalOpen(true);
      setCommentModal({
        isOpen: true,
        mode: "pipeline",
        stepId: nextStage.id,
        historyId: null,
        text: "",
      });
    },
    [currentEvent, currentStageIndex],
  );

  const handleHistoryClick = useCallback(
    (historyItem: { id: string; comment?: string }) => {
      setCommentModal({
        isOpen: true,
        mode: "history",
        stepId: null,
        historyId: historyItem.id,
        text: historyItem.comment || "",
      });
    },
    [],
  );

  const handleAddCommentClick = useCallback(() => {
    setCommentModal({
      isOpen: true,
      mode: "add_comment",
      stepId: null,
      historyId: null,
      text: "",
    });
  }, []);

  const handleSaveComment = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (commentModal.mode === "pipeline") {
        const activeStage = PIPELINE_STAGES[currentStageIndex];
        const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
        if (!nextStage || !currentEvent) return;

        await updateStatus.mutateAsync({
          eventId: currentEvent.id,
          status: nextStage.key,
          actionName: `Етап пройдено: ${activeStage.name}`,
          comment: commentModal.text,
        });
        if (nextStage.key === "RE_SALE") {
          setExitingEventId(currentEvent.id);
          setTimeout(() => {
            setSelectedEventId(null);
            setExitingEventId(null);
          }, 500);
        }
      } else if (commentModal.mode === "add_comment") {
        await addCommentMutation.mutateAsync({
          eventId: currentEvent.id,
          comment: commentModal.text,
        });
      } else if (commentModal.mode === "history" && commentModal.historyId) {
        await updateHistoryMutation.mutateAsync({
          historyId: commentModal.historyId,
          comment: commentModal.text,
          eventId: currentEvent.id,
        });
      }
      setCommentModal({
        isOpen: false,
        mode: "pipeline",
        stepId: null,
        historyId: null,
        text: "",
      });
    },
    [
      commentModal,
      currentEvent,
      currentStageIndex,
      updateStatus,
      addCommentMutation,
      updateHistoryMutation,
    ],
  );

  const updateSchoolMutation = useUpdateSchool();
  const createEventMutation = useCreateEvent();

  const handleSaveEvent = useCallback(
    async (data: EventFormValues) => {
      if (!schoolData.id) return;

      const payload = {
        ...data,
        schoolId: schoolData.id,
        cityId: schoolData.cityId,
        childrenPlanned: Number(data.childrenPlanned) || 0,
        price: Number(data.price) || 0,
      };

      const newEvent = await createEventMutation.mutateAsync(payload);

      setIsEventModalOpen(false);
      setSelectedEventId(newEvent.id);
    },
    [schoolData, createEventMutation],
  );

  const handleSaveSchoolInfo = useCallback(
    async (data: SchoolEditFormValues) => {
      if (!id) return;

      await updateSchoolMutation.mutateAsync({
        ...data,
        childrenCount: Number(data.childrenCount) || 0,
        id,
      });
      setIsEditModalOpen(false);
    },
    [id, updateSchoolMutation],
  );

  const editDefaultValues = useMemo<SchoolEditFormValues>(
    () => ({
      type: (schoolData.type as "Школа" | "Садочок") || "Школа",
      address: schoolData.address,
      director: schoolData.director,
      phone: schoolData.phone,
      email: schoolData.email,
      childrenCount: schoolData.childrenCount
        ? String(schoolData.childrenCount)
        : "",
    }),
    [schoolData],
  );

  const handleUpdatePreparation = useCallback(
    async (field: string, status: "PLANNED" | "IN_PROGRESS" | "DONE") => {
      if (!currentEvent) return;
      await updatePreparation.mutateAsync({
        eventId: currentEvent.id,
        field,
        status,
      });
    },
    [currentEvent, updatePreparation],
  );

  const handleSubmitReport = useCallback(
    async (reportData: ReportData) => {
      if (!currentEvent) return;
      setIsReportModalOpen(false);
      setExitingEventId(currentEvent.id);
      await submitReportMutation.mutateAsync({
        eventId: currentEvent.id,
        reportData,
      });
      setIsLeavingPage(true);
      setTimeout(() => {
        navigate("/schools");
      }, 300);
    },
    [currentEvent, submitReportMutation, navigate],
  );

  const handleAssignCrew = useCallback(
    async (crewId: string) => {
      if (!currentEvent) return;

      setIsCrewModalOpen(false);

      await Promise.all([
        assignCrewMutation.mutateAsync({
          eventId: currentEvent.id,
          crewId,
        }),
        updatePreparation.mutateAsync({
          eventId: currentEvent.id,
          field: "assignCrew",
          status: "DONE",
        }),
      ]);
    },
    [currentEvent, assignCrewMutation, updatePreparation],
  );

  const events = eventsRaw;

  const openAddEventModal = useCallback(() => {
    setIsEventModalOpen(true);
  }, []);

  const eventDefaultValues = useMemo<Partial<EventFormValues>>(
    () => ({
      project: "Голограма для школи",
      time: "11:00",
      address: schoolData.address,
      contactPerson: schoolData.director,
      contactPhone: schoolData.phone,
      childrenPlanned: String(schoolData.childrenCount),
    }),
    [schoolData],
  );
  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.1 + i * 0.07, ease: "easeOut" },
  });

  return (
    <motion.div
      animate={{ opacity: isLeavingPage ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 bg-gradient-subtle min-h-screen text-content-primary font-sans w-full overflow-x-hidden pb-24 md:pb-8"
    >
      <SchoolProfileHeader
        schoolData={schoolData}
        onEdit={() => setIsEditModalOpen(true)}
        onAddEvent={openAddEventModal}
      />

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Ліва колонка */}
        <div className="w-full xl:w-80 flex flex-col gap-6">
          <motion.div {...stagger(0)}>
            <Suspense
              fallback={
                <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
              }
            >
              <SchoolInfoCard schoolData={schoolData} />
            </Suspense>
          </motion.div>

          <AnimatePresence>
            {currentEvent &&
              currentStageIndex >= 1 &&
              exitingEventId !== currentEvent.id && (
              <motion.div
                key="responsible"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-gradient-card rounded-card shadow-card border border-border p-6 hover:shadow-card-hover transition-all duration-200"
              >
                <h3 className="font-bold text-content-primary mb-4 tracking-tight">
                  Відповідальна особа
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-content-muted">Остання дія:</span>
                    <span className="font-medium text-brand">
                      {creatorName}
                    </span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div {...stagger(1)}>
            <Suspense
              fallback={
                <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
              }
            >
              <HistoryTimeline
                currentEvent={
                  eventFullLoading ? currentEventBase : currentEvent
                }
                onHistoryClick={handleHistoryClick}
                onAddCommentClick={handleAddCommentClick}
              />
            </Suspense>
          </motion.div>

          <motion.div {...stagger(2)}>
            <Suspense
              fallback={
                <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
              }
            >
              <CommentsTimeline schoolId={schoolData.id} />
            </Suspense>
          </motion.div>
        </div>

        {/* Права колонка */}
        <motion.div
          className={`flex-1 flex flex-col gap-6 transition-all duration-500 ease-in-out transform origin-top ${
            exitingEventId === currentEvent?.id
              ? "opacity-0 scale-95 -translate-y-4 pointer-events-none"
              : ""
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {currentEvent && (
            <Suspense
              fallback={
                <div className="bg-surface rounded-card shadow-card h-24 animate-pulse border border-border" />
              }
            >
              <Pipeline
                currentStageIndex={currentStageIndex}
                currentEvent={currentEvent}
                onPipelineClick={handlePipelineClick}
                stages={PIPELINE_STAGES}
              />
            </Suspense>
          )}

          <AnimatePresence>
            {currentEvent &&
              currentStageIndex >= 4 &&
              exitingEventId !== currentEvent.id && (
              <motion.div
                key="preparation"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 xl:grid-cols-2 gap-6"
              >
                {eventFullLoading ? (
                  <div className="bg-surface p-6 rounded-card shadow-card border border-border animate-pulse h-48" />
                ) : (
                  <Suspense
                    fallback={
                      <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
                    }
                  >
                    <EventPreparation
                      data={currentEvent.preparation || {}}
                      onUpdate={handleUpdatePreparation}
                      onOpenCrewModal={() => setIsCrewModalOpen(true)}
                      project={currentEvent.project}
                    />
                  </Suspense>
                )}
                <Suspense
                  fallback={
                    <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
                  }
                >
                  <AssignedCrew currentEvent={currentEvent} employees={users} />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div {...stagger(2)}>
                <Suspense
                  fallback={
                    <div className="bg-surface rounded-card shadow-card h-32 animate-pulse border border-border" />
                  }
                >
                  <EventDetails
                currentEvent={currentEvent}
                schoolName={schoolData.name}
                cityId={schoolData.cityId}
                onEventUpdated={() =>
                  qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
                }
              />
            </Suspense>
          </motion.div>

          <motion.div {...stagger(3)}>
            <Suspense
              fallback={
                <div className="bg-surface rounded-card shadow-card h-32 animate-pulse border border-border" />
              }
            >
              <EventsTable
                events={events}
                selectedEventId={selectedEventId}
                onEventSelect={setSelectedEventId}
                onDeleteSuccess={() =>
                  qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
                }
                schoolId={schoolData.id}
              />
            </Suspense>
            {completedEvents.length > 0 && (
              <motion.div {...stagger(4)}>
                <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
                  <div className="p-6 border-b border-border bg-surface-muted">
                    <h3 className="font-bold text-content-primary">
                      Завершені події ({completedEvents.length})
                    </h3>
                  </div>
                  <div className="md:hidden divide-y divide-border">
                    {completedEvents.map((ev: Event) => (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedReportEvent(ev)}
                        className="flex items-center justify-between gap-3 p-4 active:bg-surface-muted cursor-pointer"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-brand truncate">
                            {ev.project}
                          </p>
                          <p className="text-xs text-content-muted mt-0.5">
                            {new Date(ev.date).toLocaleDateString("uk-UA")}
                          </p>
                          <p className="text-xs text-content-secondary mt-1">
                            👶{" "}
                            {ev.report?.childrenCount ||
                              ev.childrenPlanned ||
                              "—"}{" "}
                            дітей
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-semibold text-content-primary text-sm">
                            {new Intl.NumberFormat("uk-UA").format(
                              ev.report?.totalSum || ev.price || 0,
                            )}{" "}
                            грн
                          </p>
                          <p className="text-xs font-medium text-success-600 mt-0.5">
                            +
                            {new Intl.NumberFormat("uk-UA").format(
                              ev.report?.remainderSum || 0,
                            )}{" "}
                            грн
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-surface border-b border-border text-content-muted text-xs font-semibold uppercase tracking-wider">
                          <th className="p-4">Проєкт</th>
                          <th className="p-4">Дата</th>
                          <th className="p-4">Дітей</th>
                          <th className="p-4">Виручка</th>
                          <th className="p-4">Прибуток</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedEvents.map((ev: any) => (
                          <tr
                            key={ev.id}
                            onClick={() => setSelectedReportEvent(ev)}
                            className="border-b border-surface-muted hover:bg-surface-muted transition-colors cursor-pointer"
                          >
                            <td className="p-4 text-content-secondary font-medium">
                              {ev.project}
                            </td>
                            <td className="p-4 text-content-muted">
                              {new Date(ev.date).toLocaleDateString("uk-UA")}
                            </td>
                            <td className="p-4 font-medium">
                              {ev.report?.childrenCount ||
                                ev.childrenPlanned ||
                                "—"}
                            </td>
                            <td className="p-4 font-medium text-content-primary">
                              {new Intl.NumberFormat("uk-UA").format(
                                ev.report?.totalSum || ev.price || 0,
                              )}{" "}
                              грн
                            </td>
                            <td className="p-4 font-medium text-success-600">
                              {new Intl.NumberFormat("uk-UA").format(
                                ev.report?.remainderSum || 0,
                              )}{" "}
                              грн
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Мобільна FAB */}
      <button
        onClick={openAddEventModal}
        className="md:hidden fixed right-6 w-14 h-14 bg-brand text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 pb-1 active:scale-95 transition-transform"
        style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
      >
        +
      </button>

      {/* Модальні вікна */}
      <EditSchoolModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultValues={editDefaultValues}
        onSave={handleSaveSchoolInfo}
      />
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        defaultValues={eventDefaultValues}
        onSave={handleSaveEvent}
      />
      <CommentModal
        isOpen={commentModal.isOpen}
        onClose={() => setCommentModal({ ...commentModal, isOpen: false })}
        mode={commentModal.mode}
        text={commentModal.text}
        setText={(t) => setCommentModal({ ...commentModal, text: t })}
        onSave={handleSaveComment}
      />
      <CrewModal
        isOpen={isCrewModalOpen}
        onClose={() => setIsCrewModalOpen(false)}
        city={schoolData.city}
        eventDate={currentEvent?.date}
        employees={users}
        onSave={handleAssignCrew}
      />
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSave={handleSubmitReport}
        schoolName={schoolData.name}
        eventType={currentEvent?.project}
        eventDate={currentEvent?.date}
        eventIndex={
          events
            .filter((e) => e.schoolId === schoolData.id)
            .findIndex((e) => e.id === currentEvent?.id) + 1
        }
        crew={
          currentEvent?.crew
            ? {
                host: currentEvent.crew.hostId
                  ? (users.find(
                      (u: User) => u.id === currentEvent.crew.hostId,
                    ) ?? null)
                  : (currentEvent.crew.host ?? null),
                driver: currentEvent.crew.driverId
                  ? (users.find(
                      (u: User) => u.id === currentEvent.crew.driverId,
                    ) ?? null)
                  : (currentEvent.crew.driver ?? null),
              }
            : undefined
        }
      />
      <CompletedEventModal
        isOpen={!!selectedReportEvent}
        onClose={() => setSelectedReportEvent(null)}
        event={selectedReportEvent}
      />
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/pages/Schools.tsx

```
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import {
  useSchools,
  useSchoolStats,
  useDeleteSchool,
  usePrefetchSchool,
  useSupportedCities,
} from "../hooks/useApi";
import { useCities } from "../hooks/useCities";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import VirtualSchoolList from "../components/VirtualSchoolList";
import { SchoolCard } from "../components/schools/SchoolMobileList";
import type { SchoolContact } from "../types";
import { useAuth } from "../context/AuthContext";
import { Download } from "lucide-react";
import { PIPELINE_STAGES } from "../constants/pipelineStages";
import EstablishmentsTopNav from "../components/establishments/EstablishmentsTopNav";

const INSTITUTION_TYPES = {
  school: { apiType: "Школа" as const, label: "Школи", countLabel: "шкіл" },
  kindergarten: { apiType: "Садочок" as const, label: "Садочки", countLabel: "садочків" },
} as const;

type InstitutionType = keyof typeof INSTITUTION_TYPES;

const ESTABLISHMENT_IDS: InstitutionType[] = ["school", "kindergarten"];

interface NewSchoolPayload {
  name: string;
  cityId: string;
  sourceUrl: string;
  director: string;
  phone: string;
  type: string;
}

const StatsBar = lazy(() => import("../components/schools/StatsBar"));
const VirtualDesktopTable = lazy(
  () => import("../components/schools/VirtualDesktopTable"),
);
interface City {
  id: string;
  name: string;
}

export default function Schools() {
  const { selectedCity } = useSelectedCity();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const userRole = user?.role ?? null;
  const qc = useQueryClient();

  const institutionType = useMemo<InstitutionType>(() => {
    const fromUrl = searchParams.get("type");
    if (fromUrl === "kindergarten") return "kindergarten";
    if (fromUrl === "school") return "school";
    if (location.pathname.includes("kindergarten")) return "kindergarten";
    return "school";
  }, [searchParams, location.pathname]);

  const swiperRef = useRef<any>(null);

  const handleTabChange = useCallback(
    (id: string) => {
      const idx = ESTABLISHMENT_IDS.findIndex((t) => t === id);
      if (idx !== -1 && swiperRef.current) {
        swiperRef.current.slideTo(idx);
      }
      setSearchParams({ type: id }, { replace: true });
    },
    [setSearchParams],
  );

  const handleSlideChange = useCallback(
    (swiper: any) => {
      const tabId = ESTABLISHMENT_IDS[swiper.activeIndex];
      if (tabId && tabId !== institutionType) {
        setSearchParams({ type: tabId }, { replace: true });
      }
    },
    [institutionType, setSearchParams],
  );

  const [form, setForm] = useState({
    name: "",
    cityId: "",
    sourceUrl: "",
    director: "",
    phone: "",
  });
  const [matchedContacts, setMatchedContacts] = useState<SchoolContact[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; url: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dotCount, setDotCount] = useState(3);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addSchoolMutation = useMutation({
    mutationFn: (newSchool: NewSchoolPayload) =>
      api.post("/schools", newSchool),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      setIsModalOpen(false);
    },
    onError: () => alert("Не вдалося створити заклад"),
  });

  const bulkImportMutation = useMutation({
    mutationFn: ({ cityId, type }: { cityId: string; type: "Школа" | "Садочок" }) =>
      api.post(
        "/schools/bulk-import",
        { cityId, type },
        { timeout: 120000 },
      ),
    onSuccess: (res) => {
      alert(
        `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
      );
      qc.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: () => alert("Помилка імпорту."),
  });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const baseFilters = useMemo(
    () => ({
      search: debouncedQuery || undefined,
      cityId: selectedCity.id || undefined,
      stage: (activeFilter as any) || undefined,
      size: (sizeFilter as any) || undefined,
    }),
    [debouncedQuery, selectedCity.id, activeFilter, sizeFilter],
  );

  const schoolFilters = useMemo(
    () => ({ ...baseFilters, type: "Школа" as const }),
    [baseFilters],
  );

  const kindergartenFilters = useMemo(
    () => ({ ...baseFilters, type: "Садочок" as const }),
    [baseFilters],
  );

  const {
    data: schoolPages,
    isLoading: isSchoolsLoading,
    fetchNextPage: fetchNextSchools,
    hasNextPage: hasNextSchools,
    isFetchingNextPage: isFetchingNextSchools,
  } = useSchools(schoolFilters);

  const {
    data: kindergartenPages,
    isLoading: isKindergartenLoading,
    fetchNextPage: fetchNextKindergartens,
    hasNextPage: hasNextKindergartens,
    isFetchingNextPage: isFetchingNextKindergartens,
  } = useSchools(kindergartenFilters);

  const { data: schoolStats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: "Школа" as const,
    stage: (activeFilter as any) || undefined,
  });

  const { data: kindergartenStats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: "Садочок" as const,
    stage: (activeFilter as any) || undefined,
  });

  const { data: cities = [] } = useCities();
  const { data: supportedCities = [] } = useSupportedCities();
  const deleteSchool = useDeleteSchool();
  const prefetchSchool = usePrefetchSchool();

  const schoolData = useMemo(() => ({
    filtered: schoolPages?.pages.flatMap((p) => p.data) ?? [],
    totalItems: schoolPages?.pages[0]?.meta.totalItems ?? 0,
  }), [schoolPages]);

  const kindergartenData = useMemo(() => ({
    filtered: kindergartenPages?.pages.flatMap((p) => p.data) ?? [],
    totalItems: kindergartenPages?.pages[0]?.meta.totalItems ?? 0,
  }), [kindergartenPages]);

  const handleLoadMoreSchools = useCallback(() => {
    if (hasNextSchools && !isFetchingNextSchools) fetchNextSchools();
  }, [hasNextSchools, isFetchingNextSchools, fetchNextSchools]);

  const handleLoadMoreKindergartens = useCallback(() => {
    if (hasNextKindergartens && !isFetchingNextKindergartens) fetchNextKindergartens();
  }, [hasNextKindergartens, isFetchingNextKindergartens, fetchNextKindergartens]);

  const handleOpenModal = useCallback(() => {
    setForm({
      name: "",
      cityId: selectedCity.id || cities[0]?.id || "",
      sourceUrl: "",
      director: "",
      phone: "",
    });
    setMatchedContacts([]);
    setIsModalOpen(true);
  }, [selectedCity.id, cities]);

  const fetchContacts = async (schoolName: string) => {
    if (!schoolName || schoolName.trim().length < 1)
      return setMatchedContacts([]);
    const currentCityName =
      selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
    if (currentCityName.toLowerCase() !== "львів")
      return setMatchedContacts([]);
    try {
      const data = await qc.fetchQuery<SchoolContact[]>({
        queryKey: ["schoolContacts", schoolName, currentCityName],
        queryFn: async () => {
          const res = await api.get<SchoolContact[]>(
            `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Школа`,
          );
          return res.data;
        },
        staleTime: 1000 * 60 * 5,
      });

      setMatchedContacts(data);
      if (data.length > 0) {
        const director =
          data.find(
            (c: SchoolContact) =>
              c.role?.includes("Директор") || c.role?.includes("Завідувач"),
          ) || data[0];
        setForm((f) => ({
          ...f,
          director: director.contactName,
          phone: director.phone,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNameChange = (value: string) => {
    setForm({ ...form, name: value });
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (value.length < 2) {
      setShowSuggestions(false);
      setIsSearching(false);
      setMatchedContacts([]);
      return;
    }
    setIsSearching(true);
    setShowSuggestions(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const [externalData] = await Promise.all([
          qc.fetchQuery({
            queryKey: ["schoolSearchExternal", value],
            queryFn: async () => {
              const res = await api.get(
                `/schools/search?q=${encodeURIComponent(value)}&type=Школа`,
              );
              return res.data;
            },
            staleTime: 1000 * 60 * 5,
          }),
          fetchContacts(value),
        ]);
        setSuggestions(externalData);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  const handleSelectSuggestion = (name: string, url: string) => {
    setForm({ ...form, name, sourceUrl: url });
    setShowSuggestions(false);
    fetchContacts(name);
  };

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.cityId) return;
    addSchoolMutation.mutate({ ...form, type: "Школа" });
  };

  const handleDeleteSchool = useCallback(
    async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
      e.stopPropagation();
      if (userRole !== "SUPERADMIN") return;
      if (
        !window.confirm(
          `Видалити школу "${schoolName}"? Це видалить також усі її події.`,
        )
      )
        return;
      await deleteSchool.mutateAsync(schoolId);
    },
    [deleteSchool, userRole],
  );

  return (
    <div className="bg-gradient-subtle min-h-screen flex flex-col">
      <EstablishmentsTopNav
        activeTab={institutionType}
        onChange={handleTabChange}
      />

      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        initialSlide={ESTABLISHMENT_IDS.findIndex((t) => t === institutionType)}
        onSlideChange={handleSlideChange}
        speed={280}
        allowTouchMove={true}
        className="establishments-swiper"
      >
        {ESTABLISHMENT_IDS.map((id) => {
          const info = INSTITUTION_TYPES[id];
          const isSchool = id === "school";
          const data = isSchool ? schoolData : kindergartenData;
          const stats = isSchool ? schoolStats : kindergartenStats;
          const isLoading = isSchool ? isSchoolsLoading : isKindergartenLoading;
          const handleLoadMore = isSchool ? handleLoadMoreSchools : handleLoadMoreKindergartens;

          return (
            <SwiperSlide key={id}>
              <div className="p-4 md:p-8 max-w-[100vw] min-h-[calc(100dvh-5rem)] md:min-h-0 flex flex-col">
                {/* Шапка */}
                <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
                  <div className="min-w-0">
                    <h1 className="text-2xl font-bold tracking-tight text-content-primary leading-tight">
                      {info.label}
                      {selectedCity.id && (
                        <span className="ml-1 text-sm font-normal text-brand">
                          · {selectedCity.name}
                        </span>
                      )}
                    </h1>
                    <p className="text-sm text-content-muted mt-0.5">
                      {data.filtered.length} {info.countLabel} у місті
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {(userRole === "SUPERADMIN" || userRole === "MANAGER") && (
                      <button
                        onClick={() => {
                          if (!selectedCity.id) return alert("Спочатку оберіть місто");
                          if (!supportedCities.includes(selectedCity.name))
                            return alert(
                              `Місто "${selectedCity.name}" не підтримується для імпорту.`,
                            );
                          if (
                            !window.confirm(
                              `Імпортувати всі ${info.countLabel} з isuo.org для міста ${selectedCity.name}?`,
                            )
                          )
                            return;

                          setDotCount(3);
                          const dotInterval = setInterval(() => {
                            setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
                          }, 500);

                          bulkImportMutation.mutate(
                            { cityId: selectedCity.id, type: info.apiType },
                            { onSettled: () => clearInterval(dotInterval) },
                          );
                        }}
                        disabled={bulkImportMutation.isPending}
                        className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 hover:shadow-lift hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 transition-all duration-200"
                      >
                        {bulkImportMutation.isPending ? (
                          <span className="font-medium">
                            Імпортую{"·".repeat(dotCount)}
                          </span>
                        ) : (
                          <><Download className="w-4 h-4" /> Імпорт з isuo</>
                        )}
                      </button>
                    )}
                    <button
                      onClick={handleOpenModal}
                      className="hidden md:flex items-center gap-1 px-4 py-2.5 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-hover hover:shadow-lift hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    >
                      + Додати
                    </button>
                  </div>
                </div>

                {/* StatsBar */}
                <div className="shrink-0">
                  <Suspense
                    fallback={
                      <div className="h-[72px] bg-surface rounded-card animate-pulse mb-4" />
                    }
                  >
                    <StatsBar
                      statusStats={
                        stats?.statusStats ?? {
                          new: 0,
                          planned: 0,
                          inProgress: 0,
                          done: 0,
                        }
                      }
                      sizeStats={stats?.sizeStats ?? { small: 0, medium: 0, large: 0 }}
                      activeFilter={activeFilter}
                      onFilterChange={setActiveFilter}
                      sizeFilter={sizeFilter}
                      onSizeFilterChange={setSizeFilter}
                      schoolType={info.apiType}
                    />
                  </Suspense>
                </div>

                {/* Список */}
                <div className="flex-1 w-full min-h-0 mt-3">
                  <EstablishmentList
                    isLoading={isLoading}
                    filteredSchools={data.filtered}
                    totalItems={data.totalItems}
                    activeFilter={activeFilter}
                    sizeFilter={sizeFilter}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onClearFilters={() => {
                      setActiveFilter(null);
                      setSizeFilter(null);
                    }}
                    handleLoadMore={handleLoadMore}
                    prefetchSchool={prefetchSchool}
                    handleDeleteSchool={handleDeleteSchool}
                    searchPlaceholder={`Пошук за назвою ${id === "school" ? "школи" : "садочка"}...`}
                    countLabel={info.countLabel}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Мобільна плаваюча кнопка FAB */}
      <button
        onClick={handleOpenModal}
        className="md:hidden fixed right-6 w-14 h-14 bg-brand text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 pb-1 hover:bg-brand-hover active:scale-95 transition-transform"
        style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
      >
        +
      </button>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-modal shadow-modal w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-border flex justify-between items-center bg-surface-muted shrink-0">
              <h3 className="text-xl font-bold text-content-primary">Нова школа</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-content-muted hover:text-content-secondary p-2 -mr-2 leading-none text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleAddSchool}
              className="p-6 flex flex-col gap-4 overflow-y-auto"
            >
              <div className="relative">
                <label className="block text-sm font-medium text-content-secondary mb-1.5">
                  Назва школи
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  placeholder="Наприклад: Школа №1"
                  required
                  className="w-full p-3 border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
                {showSuggestions && (
                  <ul className="absolute z-10 w-full bg-surface border border-border-strong rounded-control shadow-dropdown mt-1 max-h-48 overflow-y-auto overflow-hidden">
                    {isSearching ? (
                      <li className="px-4 py-3 text-sm text-content-muted italic">
                        Пошук...
                      </li>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((s, i) => (
                        <li
                          key={i}
                          onMouseDown={() =>
                            handleSelectSuggestion(s.name, s.url)
                          }
                          className="px-4 py-3 text-sm hover:bg-brand-50 cursor-pointer font-medium border-b border-surface-muted last:border-0"
                        >
                          {s.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-content-muted italic">
                        Нічого не знайдено
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {!selectedCity.id && (
                <div>
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
                    Місто
                  </label>
                  <select
                    value={form.cityId}
                    onChange={(e) =>
                      setForm({ ...form, cityId: e.target.value })
                    }
                    required
                    className="w-full p-3 border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 bg-surface"
                  >
                    <option value="">— Оберіть місто —</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-content-secondary mb-1.5">
                  Контакт{" "}
                  <span className="ml-1 text-xs font-normal text-content-muted">
                    (автозаповнення)
                  </span>
                </label>
                {matchedContacts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {matchedContacts.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            director: c.contactName,
                            phone: c.phone,
                          }))
                        }
                        className={`text-xs font-medium px-3 py-1.5 rounded-control border transition-colors ${form.director === c.contactName ? "bg-brand text-white border-brand shadow-sm" : "bg-surface text-content-secondary border-border-strong hover:bg-surface-muted"}`}
                      >
                        {c.role ? `${c.role}: ` : ""}
                        {c.contactName}
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={form.director}
                  onChange={(e) =>
                    setForm({ ...form, director: e.target.value })
                  }
                  placeholder="Микола Петренко"
                  className="w-full p-3 border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 mb-4"
                />
                <label className="block text-sm font-medium text-content-secondary mb-1.5">
                  Телефон
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0671234567"
                  className="w-full p-3 border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-5 py-3.5 bg-surface-muted rounded-control text-sm font-bold text-content-secondary hover:bg-neutral-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={addSchoolMutation.isPending}
                  className="flex-1 px-5 py-3.5 bg-brand text-white rounded-control text-sm font-bold hover:bg-brand-hover disabled:opacity-50 transition-colors"
                >
                  {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EstablishmentList({
  isLoading,
  filteredSchools,
  totalItems,
  activeFilter,
  sizeFilter,
  searchQuery,
  onSearchChange,
  onClearFilters,
  handleLoadMore,
  prefetchSchool,
  handleDeleteSchool,
  searchPlaceholder,
  countLabel,
}: {
  isLoading: boolean;
  filteredSchools: any[];
  totalItems: number;
  activeFilter: string | null;
  sizeFilter: string | null;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onClearFilters: () => void;
  handleLoadMore: () => void;
  prefetchSchool: (id: string) => void;
  handleDeleteSchool: (e: React.MouseEvent, id: string, name: string) => void;
  searchPlaceholder: string;
  countLabel: string;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Пошук */}
      <div className="relative shrink-0 mb-4 mt-2">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-content-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border border-border rounded-2xl sm:rounded-xl text-sm font-medium text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand shadow-soft transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-4 flex items-center text-content-muted hover:text-content-secondary transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Лічильник */}
      <p className="text-xs font-semibold text-content-muted mb-4 shrink-0 uppercase tracking-wide px-1">
        {`${filteredSchools.length} з ${totalItems} ${countLabel}`}
        {(activeFilter || sizeFilter) && (
          <button
            onClick={onClearFilters}
            className="ml-3 text-brand hover:text-brand-hover lowercase"
          >
            скинути фільтри
          </button>
        )}
      </p>

      {/* Компоненти списків */}
      {isLoading ? (
        <div className="flex flex-col gap-2.5 flex-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface rounded-card border border-border p-3.5 animate-pulse"
              style={{ opacity: 1 - i * 0.1 }}
            >
              <div className="h-4 bg-neutral-200 rounded-control w-3/4 mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-surface-muted rounded-control w-1/3" />
                <div className="h-3 bg-surface-muted rounded-control w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Мобільний */}
          <div className="md:hidden flex-1 w-full overflow-hidden">
            <VirtualSchoolList
              schools={filteredSchools}
              itemHeight={110}
              onEndReached={handleLoadMore}
              animationKey={`${activeFilter}-${sizeFilter}`}
              renderItem={(school, index) => (
                <div
                  className="pb-2.5"
                  onMouseEnter={() => prefetchSchool(school.id)}
                >
                  <SchoolCard
                    school={school}
                    index={index}
                    onDelete={handleDeleteSchool}
                    stages={PIPELINE_STAGES}
                  />
                </div>
              )}
            />
          </div>

          {/* Десктоп */}
          <div className="hidden md:flex flex-col flex-1 bg-surface rounded-card shadow-card border border-border overflow-hidden min-h-0 min-w-0">
            <Suspense
              fallback={<div className="flex-1 animate-pulse bg-surface-muted" />}
            >
              <VirtualDesktopTable
                schools={filteredSchools}
                searchQuery={searchQuery}
                onDelete={handleDeleteSchool}
                stages={PIPELINE_STAGES}
                onEndReached={handleLoadMore}
              />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/tests/component/calendar/CalendarComponents.test.tsx

```
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CalendarSkeleton from "../../../features/calendar/components/CalendarSkeleton";
import CalendarHeader from "../../../features/calendar/components/CalendarHeader";
import EventTooltip from "../../../features/calendar/components/EventTooltip";
import type { Project, City } from "../../../types";

describe("CalendarSkeleton", () => {
  it("рендерить skeleton без помилок", () => {
    const { container } = render(<CalendarSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("містить 35 клітинок-скелетів", () => {
    const { container } = render(<CalendarSkeleton />);
    const cells = container.querySelectorAll(".min-h-\\[80px\\]");
    expect(cells.length).toBeGreaterThanOrEqual(30);
  });
});

describe("CalendarHeader", () => {
  const projects: Project[] = [
    { id: "p1", name: "Проєкт A", color: "blue" },
    { id: "p2", name: "Проєкт B", color: "emerald" },
  ];
  const cities: City[] = [
    { id: "c1", name: "Київ" },
    { id: "c2", name: "Львів" },
  ];
  const defaultProps = {
    projects,
    filterCityId: "ALL",
    setFilterCityId: vi.fn(),
    cities,
    userRole: "MANAGER",
  };

  it("рендерить заголовок Календар подій", () => {
    render(<CalendarHeader {...defaultProps} />);
    expect(screen.getByText("Календар подій")).toBeInTheDocument();
  });

  it("рендерить бейджі проєктів", () => {
    render(<CalendarHeader {...defaultProps} />);
    expect(screen.getByText("Проєкт A")).toBeInTheDocument();
    expect(screen.getByText("Проєкт B")).toBeInTheDocument();
  });

  it("не показує city-select для MANAGER", () => {
    render(<CalendarHeader {...defaultProps} userRole="MANAGER" />);
    expect(screen.queryByText("Місто:")).not.toBeInTheDocument();
  });

  it("показує city-select для SUPERADMIN", () => {
    render(<CalendarHeader {...defaultProps} userRole="SUPERADMIN" />);
    expect(screen.getByText("Місто:")).toBeInTheDocument();
    expect(screen.getByText("🌍 Всі міста")).toBeInTheDocument();
  });
});

describe("EventTooltip", () => {
  it("рендерить назву школи та проєкт", () => {
    const event = {
      id: "e1",
      project: "Проєкт A",
      time: "10:00",
      school: { id: "s1", name: "Школа №1", type: "school" },
      crew: { id: "c1", name: "Екіпаж 1", cityId: "city-1" },
    } as any;

    render(<EventTooltip event={event} />);
    expect(screen.getByText("Школа №1")).toBeInTheDocument();
    expect(screen.getByText(/Проєкт A/)).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
  });

  it("рендерить fallback при відсутніх даних", () => {
    const event = { id: "e2", project: "Проєкт B", time: "" } as any;

    render(<EventTooltip event={event} />);
    expect(screen.getByText("Невідомий заклад")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});

```

# FILE: apps/frontend/src/tests/component/ConfirmDialog.test.tsx

```
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";

describe("ConfirmDialog", () => {
  it("не рендериться, якщо isOpen=false", () => {
    render(
      <ConfirmDialog
        isOpen={false}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.queryByText("Видалити")).not.toBeInTheDocument();
    expect(screen.queryByText("Справді?")).not.toBeInTheDocument();
  });

  it("рендериться, коли isOpen=true", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("Видалити")).toBeInTheDocument();
    expect(screen.getByText("Справді?")).toBeInTheDocument();
  });

  it("кнопка Підтвердити викликає onConfirm", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("Підтвердити"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("кнопка Скасувати викликає onCancel", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByText("Скасувати"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("клік на backdrop викликає onCancel", () => {
    const onCancel = vi.fn();
    const { container } = render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );
    const backdrop = container.querySelector(".fixed.inset-0")!;
    fireEvent.click(backdrop);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("клік всередині модалки не викликає onCancel", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByText("Видалити"));
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("показує іконку Trash2 для variant=danger", () => {
    const { container } = render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        variant="danger"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(container.innerHTML).toContain("lucide-trash2");
  });

  it("показує іконку AlertTriangle для variant=warning", () => {
    const { container } = render(
      <ConfirmDialog
        isOpen={true}
        title="Увага"
        message="Перевірте дані"
        variant="warning"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(container.innerHTML).toContain("lucide-triangle-alert");
  });

  it("використовує confirmLabel за замовчуванням", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("Підтвердити")).toBeInTheDocument();
  });

  it("використовує кастомний confirmLabel", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        confirmLabel="Так, видалити"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("Так, видалити")).toBeInTheDocument();
  });
});

```

