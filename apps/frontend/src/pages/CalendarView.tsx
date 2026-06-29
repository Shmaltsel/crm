import { useSelectedCity } from "../context/CityContext";
import { useNavigate } from "react-router-dom";
import { useCalendarEvents, useCalendarProjects } from "../hooks/useCalendar";
import { useState, useEffect } from 'react';
interface CalendarEvent {
  id: string;
  project: string;
  date: string;
  time?: string;
  status: string;
  school?: { id: string; name: string };
  city?: { id: string; name: string };
  crew?: { id: string; name: string };
}

export default function CalendarView() {
  const { data: events = [], isLoading: eventsLoading } = useCalendarEvents();
  const { data: projects = [] } = useCalendarProjects();
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const isLoading = eventsLoading;
  const [selectedMobileDate, setSelectedMobileDate] = useState<Date>(
    new Date(),
  );

  const { selectedCity } = useSelectedCity();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState<string>("GUEST");
  const [filterCityId, setFilterCityId] = useState<string>("ALL");

  // Не забудьте додати стейт для проєктів на початку компонента (якщо ще не додали):
  // const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role);
        if (payload.role === "MANAGER" && selectedCity?.id) {
          setFilterCityId(selectedCity.id);
        }
      }
    } catch (e) {
      console.error("Помилка парсингу токена", e);
    }
  }, [selectedCity]);

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

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

  const filteredEvents = events.filter((ev) => {
    if (ev.status === "RE_SALE") return false;
    if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) return false;
    return true;
  });

  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter((ev) => {
      const evDate = new Date(ev.date);
      return (
        evDate.getFullYear() === date.getFullYear() &&
        evDate.getMonth() === date.getMonth() &&
        evDate.getDate() === date.getDate()
      );
    });
  };

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

  // Логіка кольорів для проєктів
  const getProjectColor = (projectName: string) => {
    const proj = projects.find((p) => p.name === projectName);
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

  if (isLoading)
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24 animate-pulse">
        {/* Шапка */}
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

        {/* Календар */}
        <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden">
          {/* Керування місяцем */}
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100">
            <div className="h-8 w-36 bg-slate-200 rounded-xl" />
            <div className="h-10 w-44 bg-slate-200 rounded-2xl" />
          </div>

          {/* Дні тижня */}
          <div className="grid grid-cols-7 bg-slate-50/50">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
              <div key={d} className="py-3 flex justify-center">
                <div className="h-3 w-6 bg-slate-200 rounded" />
              </div>
            ))}

            {/* Клітинки */}
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

        {/* Мобільний блок подій */}
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
      {/* Шапка календаря */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Календар подій
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Графік запланованих та активних заходів
          </p>

          {/* Легенда */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {projects.map((p) => {
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
          </div>
        </div>

        {userRole === "SUPERADMIN" && (
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3 shrink-0">
            <span className="text-sm text-slate-500 font-medium">Місто:</span>
            <select
              value={filterCityId}
              onChange={(e) => setFilterCityId(e.target.value)}
              className="text-sm font-semibold text-slate-800 outline-none cursor-pointer bg-transparent"
            >
              <option value="ALL">🌍 Всі міста</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        {/* Керування місяцями */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-5 md:p-6 border-b border-slate-100 gap-4 bg-white">
          <h2 className="text-2xl font-bold text-slate-800 capitalize tracking-tight">
            {monthNames[month]}{" "}
            <span className="text-slate-400 font-medium">{year}</span>
          </h2>
          <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <button
              onClick={prevMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
            >
              ◀
            </button>
            <button
              onClick={today}
              className="px-4 md:px-6 py-2 bg-white rounded-xl shadow-sm text-slate-800 font-bold transition-all hover:bg-slate-50"
            >
              Сьогодні
            </button>
            <button
              onClick={nextMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Сітка календаря */}
        <div className="grid grid-cols-7 bg-slate-50/50">
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

            return (
              <div
                key={idx}
                onClick={() => day && setSelectedMobileDate(day)}
                className={`min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-1 md:p-2 transition-colors relative group
                  ${day ? "bg-white hover:bg-slate-50 cursor-pointer" : "bg-slate-50/30"}
                  ${isSelected ? "ring-2 ring-inset ring-blue-500/20 bg-blue-50/10" : ""}
                `}
              >
                {day && (
                  <>
                    <div className="flex justify-center md:justify-end mb-1.5">
                      <span
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold transition-colors
                        ${isToday ? "bg-blue-600 text-white shadow-md" : "text-slate-500 md:group-hover:text-blue-600"}
                      `}
                      >
                        {day.getDate()}
                      </span>
                    </div>

                    <div className="space-y-1.5 max-h-[80px] md:max-h-[100px] overflow-y-auto custom-scrollbar pr-0.5">
                      {dayEvents.map((ev) => (
                        <div
                          key={ev.id}
                          className="relative group/event z-0 hover:z-50"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Щоб не спрацьовував клік по всій клітинці
                              if (ev.school)
                                navigate(`/schools/${ev.school.id}`);
                            }}
                            className={`w-full px-1.5 py-1 text-center md:text-left rounded-md border text-[10px] md:text-xs font-bold transition-all shadow-sm ${getProjectColor(ev.project)}`}
                          >
                            {ev.time || "—"}
                          </button>

                          {/* Тултип (тільки для Десктопу) */}
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
                            {/* Трикутник тултипа */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-800"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Блок подій для мобільних пристроїв (з'являється під календарем) */}
      <div className="mt-6 md:hidden">
        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
          📅 Події на{" "}
          {selectedMobileDate.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "long",
          })}
        </h3>

        {selectedDayEvents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400">
            На цей день подій не заплановано
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDayEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() =>
                  ev.school && navigate(`/schools/${ev.school.id}`)
                }
                className={`bg-white p-4 rounded-2xl border-l-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer
                  ${
                    ev.project.toLowerCase().includes("голограм")
                      ? "border-l-emerald-500"
                      : ev.project.toLowerCase().includes("малювайк")
                        ? "border-l-rose-500"
                        : ev.project.toLowerCase().includes("360")
                          ? "border-l-red-500"
                          : "border-l-blue-500"
                  }
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                    🕒 {ev.time || "Не вказано"}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {ev.project}
                  </span>
                </div>
                <p className="font-bold text-slate-800">{ev.school?.name}</p>
                <p className="text-sm text-slate-500 mt-1">
                  🚐 Екіпаж: {ev.crew?.name || "Не призначено"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
