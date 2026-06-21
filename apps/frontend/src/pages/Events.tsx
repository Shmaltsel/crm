import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config/api";
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

// Ролі, для яких сторінка показує лише "власні" події (де вони в екіпажі)
const FIELD_ROLES = ["DRIVER", "HOST"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Events() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { selectedCity } = useSelectedCity();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (e) {
        console.error("Помилка завантаження подій:", e);
        setError("Не вдалося завантажити список подій");
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, []);

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
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {title}
            {selectedCity.id && !isFieldStaff && (
              <span className="ml-2 text-base font-normal text-blue-500">
                · {selectedCity.name}
              </span>
            )}
          </h1>{" "}
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>
        {!isFieldStaff && (
          <button
            onClick={() => navigate("/schools")}
            className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            + Додати подію
          </button>
        )}
      </div>

      {isLoading && (
        <div className="text-center text-slate-400 py-16">Завантаження...</div>
      )}

      {!isLoading && error && (
        <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      {!isLoading && !error && filteredEvents.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
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
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer active:bg-slate-50"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-gray-800">{ev.project}</p>
                  <span
                    className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      STATUS_COLORS[ev.status] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {STATUS_LABELS[ev.status] ?? ev.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(ev.date)}
                  {ev.time ? `, ${ev.time}` : ""} · {ev.city?.name ?? "—"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  🏫 {ev.school?.name ?? "—"}
                </p>
                {ev.address && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    📍 <AddressLink address={ev.address} />
                  </p>
                )}
                {(ev.crew?.host || ev.crew?.driver) && (
                  <p className="text-xs text-gray-500 mt-1">
                    👤 {ev.crew?.host?.name ?? "—"} · 🚐{" "}
                    {ev.crew?.driver?.name ?? "—"}
                  </p>
                )}
                {isFieldStaff && (ev.contactPerson || ev.contactPhone) && (
                  <p className="text-xs text-gray-500 mt-0.5">
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
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-medium text-gray-600">Подія</th>
                  <th className="p-4 font-medium text-gray-600">Дата</th>
                  <th className="p-4 font-medium text-gray-600">Локація</th>
                  <th className="p-4 font-medium text-gray-600">Екіпаж</th>
                  <th className="p-4 font-medium text-gray-600">Статус</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((ev) => (
                  <tr
                    key={ev.id}
                    onClick={() => goToEvent(ev)}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition cursor-pointer"
                  >
                    <td className="p-4 text-gray-800 font-medium">
                      {ev.project}
                      <div className="text-xs text-gray-400 font-normal mt-0.5">
                        {ev.school?.name ?? "—"}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      {formatDate(ev.date)}
                      {ev.time && (
                        <div className="text-xs text-gray-400">{ev.time}</div>
                      )}
                    </td>
                    <td className="p-4 text-gray-600">
                      {ev.city?.name ?? "—"}
                      {ev.address && (
                        <div className="text-xs text-gray-400">
                          <AddressLink address={ev.address} />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      <div>👤 {ev.crew?.host?.name ?? "—"}</div>
                      <div>🚐 {ev.crew?.driver?.name ?? "—"}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          STATUS_COLORS[ev.status] ??
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {STATUS_LABELS[ev.status] ?? ev.status}
                      </span>
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
