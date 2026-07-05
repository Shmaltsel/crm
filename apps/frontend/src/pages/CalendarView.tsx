import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCalendarEvents, useCalendarProjects } from "../hooks/useCalendar";
import { useUsers } from "../hooks/useEmployees";
import { useCities } from "../hooks/useCities";
import {
  useDaysOff,
  useCreateDayOff,
  useDeleteDayOff,
} from "../hooks/useDaysOff";
import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayOffModal from "../components/calendar/DayOffModal";

const STAFF_ROLES = ["HOST", "DRIVER"];
const MANAGER_ROLES = ["SUPERADMIN", "MANAGER"];

const PROJECT_HEX: Record<string, string> = {
  blue: "#3b82f6",
  emerald: "#10b981",
  rose: "#f43f5e",
  red: "#ef4444",
  amber: "#f59e0b",
  purple: "#a855f7",
};
const ROLE_ICON_MAP: Record<string, string> = {
  HOST: "🎙️",
  DRIVER: "🚗",
};

const toISODate = (d: Date) => d.toLocaleDateString("en-CA");

export default function CalendarView() {
  const { data: events = [], isLoading: eventsLoading } = useCalendarEvents();
  const { data: projects = [] } = useCalendarProjects();
  const { data: cities = [] } = useCities();
  const { data: allUsers = [] } = useUsers();
  const [currentDate, setCurrentDate] = useState(new Date());
  const isLoading = eventsLoading;
  const [selectedMobileDate, setSelectedMobileDate] = useState<Date>(
    new Date(),
  );
  const [dayOffModalDate, setDayOffModalDate] = useState<Date | null>(null);

  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();
  const navigate = useNavigate();

  const userRole = user?.role || "GUEST";
  const isStaff = STAFF_ROLES.includes(userRole);
  const isManagerOrAdmin = MANAGER_ROLES.includes(userRole);

  const [filterCityId, setFilterCityId] = useState<string>(() =>
    userRole === "MANAGER" && user?.cityId ? user.cityId : "ALL",
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

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

  const monthFrom = toISODate(new Date(year, month, 1));
  const monthTo = toISODate(new Date(year, month + 1, 0));

  const dayOffCityId = isManagerOrAdmin
    ? filterCityId !== "ALL"
      ? filterCityId
      : undefined
    : undefined;

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
        ? user?.cityId
        : filterCityId !== "ALL"
          ? filterCityId
          : null;
    return allUsers.filter(
      (u: any) =>
        STAFF_ROLES.includes(u.role) && (!cityScope || u.cityId === cityScope),
    );
  }, [allUsers, userRole, user?.cityId, filterCityId]);

  const filteredEvents = events.filter((ev: any) => {
    if (ev.status === "RE_SALE") return false;
    if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) return false;
    return true;
  });

  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter((ev: any) => {
      const evDate = new Date(ev.date);
      return (
        evDate.getFullYear() === date.getFullYear() &&
        evDate.getMonth() === date.getMonth() &&
        evDate.getDate() === date.getDate()
      );
    });
  };

  const isPastDay = (date: Date) => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return date < startOfToday;
  };

  const handleDayOffClick = useCallback(
    (e: React.MouseEvent, date: Date) => {
      e.stopPropagation();
      if (isPastDay(date)) return;

      if (isStaff && user) {
        const key = toISODate(date);
        const existing = dayOffsByDate
          .get(key)
          ?.find((d) => d.userId === user.id);
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
    [
      isStaff,
      isManagerOrAdmin,
      user,
      dayOffsByDate,
      createDayOff,
      deleteDayOff,
    ],
  );

  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);

  const startLongPress = useCallback(
    (day: Date) => {
      longPressFired.current = false;
      pressTimer.current = setTimeout(() => {
        longPressFired.current = true;
        if ("vibrate" in navigator) navigator.vibrate(15);
        if (isPastDay(day)) return;
        if (isStaff && user) {
          const key = toISODate(day);
          const existing = dayOffsByDate
            .get(key)
            ?.find((d) => d.userId === user.id);
          if (existing) deleteDayOff.mutate(existing.id);
          else createDayOff.mutate({ date: key });
        } else if (isManagerOrAdmin) {
          setDayOffModalDate(day);
        }
      }, 550);
    },
    [
      isStaff,
      isManagerOrAdmin,
      user,
      dayOffsByDate,
      createDayOff,
      deleteDayOff,
    ],
  );

  const cancelLongPress = useCallback(() => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  }, []);

  const handleMobileDayTap = useCallback((day: Date) => {
    if (longPressFired.current) {
      longPressFired.current = false;
      return;
    }
    setSelectedMobileDate(day);
  }, []);

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

  const monthNames = [
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

  const getProjectColor = (projectName: string) => {
    const proj = projects.find((p: any) => p.name === projectName);
    const color = proj ? proj.color : "blue";

    switch (color) {
      case "emerald":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300";
      case "rose":
        return "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 hover:border-rose-300";
      case "red":
        return "bg-red-100 text-red-700 border-red-300 hover:bg-red-200 hover:border-red-400";
      case "amber":
        return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 hover:border-amber-300";
      case "purple":
        return "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:border-purple-300";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300";
    }
  };

  const getProjectHex = (projectName: string) => {
    const proj = projects.find((p: any) => p.name === projectName);
    return PROJECT_HEX[proj?.color] || PROJECT_HEX.blue;
  };

  const shadeHex = (hex: string, percent: number) => {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, Math.max(0, (n >> 16) + percent));
    const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + percent));
    const b = Math.min(255, Math.max(0, (n & 0xff) + percent));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getDayColor = (dayEvents: any[]) => {
    if (dayEvents.length === 0) return undefined;
    const counts = new Map<string, number>();
    for (const ev of dayEvents) {
      const hex = getProjectHex(ev.project);
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

  if (isLoading)
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="h-8 w-52 bg-slate-200 rounded-xl mb-2" />
            <div className="h-4 w-72 bg-slate-200 rounded-lg mb-4" />
            <div className="flex gap-3 mt-4">
              {[80, 100, 90].map((w, i) => (
                <div
                  key={i}
                  className="h-4 bg-slate-200 rounded-full"
                  style={{ width: w }}
                />
              ))}
            </div>
          </div>
          <div className="h-10 w-48 bg-slate-200 rounded-xl" />
        </div>

        <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100">
            <div className="h-8 w-36 bg-slate-200 rounded-xl" />
            <div className="h-10 w-44 bg-slate-200 rounded-2xl" />
          </div>

          <div className="grid grid-cols-7 bg-slate-50/50">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
              <div key={d} className="py-3 flex justify-center">
                <div className="h-3 w-6 bg-slate-200 rounded" />
              </div>
            ))}

            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-2"
              >
                <div className="flex justify-end mb-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200" />
                </div>
                {i % 4 === 0 && (
                  <div className="h-5 bg-slate-100 rounded-md mb-1.5 mx-0.5" />
                )}
                {i % 7 === 2 && (
                  <div className="h-5 bg-slate-100 rounded-md mx-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <div className="h-6 w-40 bg-slate-200 rounded-lg mb-3" />
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border-l-4 border-l-slate-200 shadow-sm"
              >
                <div className="flex justify-between mb-2">
                  <div className="h-5 w-20 bg-slate-200 rounded" />
                  <div className="h-5 w-28 bg-slate-200 rounded" />
                </div>
                <div className="h-5 w-48 bg-slate-200 rounded mb-1" />
                <div className="h-4 w-36 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  const selectedDayEvents = getEventsForDay(selectedMobileDate);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24">
      <style>{`
        @keyframes dayOffPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .dayoff-cell-enter {
          animation: dayOffPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* Шапка календаря */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Календар подій
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Графік запланованих та активних заходів
          </p>

          <div className="hidden md:flex flex-wrap items-center gap-3 mt-4">
            {projects.map((p: any) => {
              const badgeColor =
                {
                  blue: "bg-blue-400",
                  emerald: "bg-emerald-400",
                  rose: "bg-rose-400",
                  red: "bg-red-500",
                  amber: "bg-amber-400",
                  purple: "bg-purple-400",
                }[p.color] || "bg-blue-400";

              return (
                <span
                  key={p.id}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
                >
                  <span className={`w-3 h-3 rounded-full ${badgeColor}`}></span>{" "}
                  {p.name}
                </span>
              );
            })}
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>{" "}
              Вихідний
            </span>
          </div>
        </div>

        {userRole === "SUPERADMIN" && (
          <div className="hidden md:flex bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 items-center gap-3 shrink-0">
            <span className="text-sm text-slate-500 font-medium">Місто:</span>
            <select
              value={filterCityId}
              onChange={(e) => setFilterCityId(e.target.value)}
              className="text-sm font-semibold text-slate-800 outline-none cursor-pointer bg-transparent"
            >
              <option value="ALL">🌍 Всі міста</option>
              {cities.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="flex items-center justify-center p-5 md:p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <button
              onClick={prevMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
            >
              ◀
            </button>
            <span className="px-4 md:px-6 py-2 text-slate-800 font-bold capitalize tracking-tight">
              {monthNames[month]}{" "}
              <span className="text-slate-400 font-medium">{year}</span>
            </span>
            <button
              onClick={nextMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-7 bg-slate-50/50">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
            <div
              key={dayName}
              className="py-3 text-center text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase border-b border-slate-100"
            >
              {dayName}
            </div>
          ))}

          {days.map((day, idx) => {
            const isToday =
              day && day.toDateString() === new Date().toDateString();
            const isSelected =
              day && day.toDateString() === selectedMobileDate.toDateString();
            const dayEvents = day ? getEventsForDay(day) : [];
            const dayKey = day ? toISODate(day) : "";
            const dayOffEntries = day ? (dayOffsByDate.get(dayKey) ?? []) : [];

            const myDayOff = isStaff
              ? dayOffEntries.find((d) => d.userId === user?.id)
              : undefined;
            const hasAnyDayOff = isStaff
              ? !!myDayOff
              : dayOffEntries.length > 0;

            const showCross =
              day && !isPastDay(day) && (isStaff || isManagerOrAdmin);

            return (
              <div
                key={idx}
                onClick={() => day && setSelectedMobileDate(day)}
                className={`min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-1 md:p-2 transition-colors relative group
                  ${day ? "bg-white hover:bg-slate-50 cursor-pointer" : "bg-slate-50/30"}
                  ${isSelected ? "ring-2 ring-inset ring-blue-500/20 bg-blue-50/10" : ""}
                  ${hasAnyDayOff ? "dayoff-cell-enter bg-rose-50/70" : ""}
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
                              : "Призначити вихідний"
                          }
                          className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all
                            ${
                              hasAnyDayOff
                                ? "bg-rose-500 text-white shadow-sm hover:bg-rose-600"
                                : "bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-rose-100 hover:text-rose-500"
                            }`}
                        >
                          ✕
                        </button>

                        {isManagerOrAdmin && dayOffEntries.length > 0 && (
                          <div className="hidden md:block absolute top-full left-0 mt-2 w-48 bg-slate-800 text-white p-2.5 rounded-xl shadow-2xl opacity-0 invisible group-hover/dayoff:opacity-100 group-hover/dayoff:visible transition-all duration-200 pointer-events-none">
                            <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-1.5">
                              Вихідний ({dayOffEntries.length})
                            </p>
                            <div className="space-y-1">
                              {dayOffEntries.map((d) => {
                                const u = allUsers.find(
                                  (au: any) => au.id === d.userId,
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
                      </div>
                    )}

                    <div className="flex justify-center md:justify-end mb-1.5">
                      <span
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold transition-colors
                        ${isToday ? "bg-blue-600 text-white shadow-md" : "text-slate-500 md:group-hover:text-blue-600"}
                      `}
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

                    <div className="space-y-1.5">
                      {dayEvents.slice(0, 3).map((ev: any) => (
                        <div
                          key={ev.id}
                          className="relative group/event z-0 hover:z-50"
                        >
                          <button
                            className={`w-full px-1.5 py-1 text-center md:text-left rounded-md border text-[10px] md:text-xs font-bold transition-all shadow-sm ${getProjectColor(ev.project)}`}
                          >
                            {ev.time || "—"}
                          </button>

                          <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white p-3 rounded-xl shadow-2xl opacity-0 invisible group-hover/event:opacity-100 group-hover/event:visible transition-all duration-200 pointer-events-none">
                            <p className="font-bold text-sm mb-1 truncate">
                              {ev.school?.name || "Невідомий заклад"}
                            </p>
                            <div className="space-y-1 text-xs text-slate-300">
                              <p>
                                <span className="text-slate-400">Проєкт:</span>{" "}
                                {ev.project}
                              </p>
                              <p>
                                <span className="text-slate-400">Екіпаж:</span>{" "}
                                {ev.crew?.name || "Не призначено"}
                              </p>
                              <p>
                                <span className="text-slate-400">Час:</span>{" "}
                                <span className="font-bold text-white">
                                  {ev.time || "—"}
                                </span>
                              </p>
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-800"></div>
                          </div>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 text-center">
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

      <div className="md:hidden mt-4">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-3.5 border-b border-slate-100">
            <button
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 active:bg-slate-100 transition-colors"
            >
              ‹
            </button>
            <span className="text-base font-bold text-slate-800 capitalize">
              {monthNames[month]}{" "}
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
              const dayEvents = day ? getEventsForDay(day) : [];
              const dayKey = day ? toISODate(day) : "";
              const dayOffEntries = day
                ? (dayOffsByDate.get(dayKey) ?? [])
                : [];
              const dayColor = day ? getDayColor(dayEvents) : undefined;

              return (
                <div
                  key={idx}
                  className="flex items-center justify-center py-0.5"
                >
                  {day && (
                    <button
                      onTouchStart={() => startLongPress(day)}
                      onTouchEnd={() => {
                        cancelLongPress();
                        handleMobileDayTap(day);
                      }}
                      onTouchMove={cancelLongPress}
                      onContextMenu={(e) => e.preventDefault()}
                      onClick={() => handleMobileDayTap(day)}
                      className={`relative w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-transform active:scale-90
                        ${isSelected ? "ring-2 ring-blue-600 ring-offset-2" : ""}
                        ${isToday && !isSelected ? "ring-2 ring-blue-200" : ""}
                      `}
                      style={{
                        background: dayColor || "#f1f5f9",
                        color: dayColor ? "#fff" : "#64748b",
                        textShadow: dayColor
                          ? "0 1px 2px rgba(0,0,0,0.35)"
                          : "none",
                      }}
                    >
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
          {projects.map((p: any) => (
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
              {cities.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={toISODate(selectedMobileDate)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            <h3 className="text-sm font-bold text-slate-800 mb-2.5">
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
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {dayOffEntries.map((d) => {
                    const u = allUsers.find((au: any) => au.id === d.userId);
                    return (
                      <span
                        key={d.id}
                        className="text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-1 rounded-full"
                      >
                        🌴 {u?.name || "Вихідний"}
                      </span>
                    );
                  })}
                </div>
              );
            })()}

            {selectedDayEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-sm">
                На цей день подій не заплановано
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayEvents.map((ev: any) => (
                  <div
                    key={ev.id}
                    onClick={() =>
                      ev.school && navigate(`/schools/${ev.school.id}`)
                    }
                    className="bg-white p-4 rounded-2xl border-l-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                    style={{ borderLeftColor: getProjectHex(ev.project) }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                        🕒 {ev.time || "Не вказано"}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {ev.project}
                      </span>
                    </div>
                    <p className="font-bold text-slate-800">
                      {ev.school?.name}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      🚐 Екіпаж: {ev.crew?.name || "Не призначено"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
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
