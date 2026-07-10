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
