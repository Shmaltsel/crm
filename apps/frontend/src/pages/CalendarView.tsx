import { useState, useEffect } from "react";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import { useNavigate } from "react-router-dom";

interface CalendarEvent {
  id: string;
  project: string;
  date: string;
  time?: string;
  status: string;
  school?: { id: string; name: string };
  city?: { id: string; name: string };
}

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  
  const { selectedCity } = useSelectedCity();
  const navigate = useNavigate();

  // Логіка ролей
  const [userRole, setUserRole] = useState<string>("GUEST");
  const [filterCityId, setFilterCityId] = useState<string>("ALL");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role);
        // Якщо це менеджер, відразу фіксуємо його місто за замовчуванням
        if (payload.role === "MANAGER" && selectedCity?.id) {
          setFilterCityId(selectedCity.id);
        }
      }
    } catch (e) {
      console.error("Помилка парсингу токена", e);
    }
  }, [selectedCity]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
        // Бекенд вже сам фільтрує для водіїв/ведучих (повертає тільки їхні події)
        const [eventsRes, citiesRes] = await Promise.all([
          api.get("/events", { headers }),
          api.get("/cities", { headers })
        ]);
        setEvents(eventsRes.data);
        setCities(citiesRes.data);
      } catch (error) {
        console.error("Помилка завантаження календаря", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Навігація по місяцях
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const today = () => setCurrentDate(new Date());

  // Генерація сітки
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Робимо понеділок першим днем (0)
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

  // Фільтрація подій
  const filteredEvents = events.filter((ev) => {
    // Не показуємо повністю закриті події
    if (ev.status === "RE_SALE") return false;
    
    // Якщо вибрано конкретне місто (і це не ВСІ)
    if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) {
      return false;
    }
    return true;
  });

  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter(ev => {
      const evDate = new Date(ev.date);
      return evDate.getFullYear() === date.getFullYear() &&
             evDate.getMonth() === date.getMonth() &&
             evDate.getDate() === date.getDate();
    });
  };

  const monthNames = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "BASE": case "FIRST_CONTACT": return "bg-slate-100 text-slate-700 border-slate-200";
      case "IN_PROGRESS": case "PREPARATION": return "bg-blue-50 text-blue-700 border-blue-200";
      case "DONE": case "REPORT": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default: return "bg-purple-50 text-purple-700 border-purple-200";
    }
  };

  if (isLoading) return <div className="p-8 text-slate-500">Завантаження календаря...</div>;

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Календар подій</h1>
          <p className="text-slate-500 mt-1">Графік запланованих та активних заходів</p>
        </div>

        {/* Фільтр міст (тільки для SUPERADMIN) */}
        {userRole === "SUPERADMIN" && (
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
            <span className="text-sm text-slate-500 font-medium">Місто:</span>
            <select
              value={filterCityId}
              onChange={(e) => setFilterCityId(e.target.value)}
              className="text-sm font-semibold text-slate-800 outline-none cursor-pointer bg-transparent"
            >
              <option value="ALL">🌍 Всі міста</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Шапка календаря */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 capitalize">
            {monthNames[month]} <span className="text-slate-400 font-medium">{year}</span>
          </h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">◀</button>
            <button onClick={today} className="px-4 py-2.5 rounded-xl hover:bg-slate-100 text-slate-700 font-medium transition-colors">Сьогодні</button>
            <button onClick={nextMonth} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors">▶</button>
          </div>
        </div>

        {/* Сітка */}
        <div className="grid grid-cols-7 gap-px bg-slate-100">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map(dayName => (
            <div key={dayName} className="bg-slate-50/80 py-3 text-center text-xs font-bold tracking-widest text-slate-400 uppercase">
              {dayName}
            </div>
          ))}
          
          {days.map((day, idx) => {
            const isToday = day && day.toDateString() === new Date().toDateString();
            const dayEvents = day ? getEventsForDay(day) : [];

            return (
              <div 
                key={idx} 
                className={`min-h-[140px] bg-white p-2 transition-colors ${day ? 'hover:bg-blue-50/30 group' : ''}`}
              >
                {day && (
                  <>
                    <div className="flex justify-end mb-2">
                      <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold ${isToday ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 group-hover:text-blue-600'}`}>
                        {day.getDate()}
                      </span>
                    </div>
                    <div className="space-y-1.5 h-[100px] overflow-y-auto no-scrollbar pr-1">
                      {dayEvents.map(ev => (
                        <div 
                          key={ev.id}
                          onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
                          className={`text-xs p-2 rounded-lg border cursor-pointer hover:shadow-sm transition-all ${getStatusColor(ev.status)}`}
                        >
                          <div className="font-bold truncate">{ev.time ? `${ev.time} ` : ''}{ev.project}</div>
                          <div className="truncate opacity-80 mt-0.5">{ev.school?.name}</div>
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
    </div>
  );
}
