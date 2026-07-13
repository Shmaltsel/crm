import type { Project, City } from "../../../types";

interface CalendarHeaderProps {
  projects: Project[];
  filterCityId: string;
  setFilterCityId: (value: string) => void;
  cities: City[];
  userRole: string;
}

const BADGE_COLORS: Record<string, string> = {
  blue: "bg-blue-400",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
  red: "bg-red-500",
  amber: "bg-amber-400",
  purple: "bg-purple-400",
};

export default function CalendarHeader({
  projects,
  filterCityId,
  setFilterCityId,
  cities,
  userRole,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div className="fade-in-up" style={{ animationDelay: "0ms" }}>
        <h1 className="text-2xl md:text-3xl font-bold text-content-primary">
          Календар подій
        </h1>
        <p className="text-content-muted mt-1 text-sm">
          Графік запланованих та активних заходів
        </p>

        <div className="hidden md:flex flex-wrap items-center gap-3 mt-4">
          {projects.map((p: Project) => {
            const badgeColor = BADGE_COLORS[p.color] || "bg-blue-400";
            return (
              <span
                key={p.id}
                className="flex items-center gap-1.5 text-xs font-medium text-content-secondary"
              >
                <span className={`w-3 h-3 rounded-full ${badgeColor}`}></span>{" "}
                {p.name}
              </span>
            );
          })}
          <span className="flex items-center gap-1.5 text-xs font-medium text-content-secondary">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>{" "}
            Вихідний
          </span>
        </div>
      </div>

      {userRole === "SUPERADMIN" && (
        <div
          className="hidden md:flex bg-white px-4 py-2 rounded-xl shadow-sm border border-border-strong items-center gap-3 shrink-0 fade-in-up"
          style={{ animationDelay: "50ms" }}
        >
          <span className="text-sm text-content-muted font-medium">Місто:</span>
          <select
            value={filterCityId}
            onChange={(e) => setFilterCityId(e.target.value)}
            className="text-sm font-semibold text-content-primary outline-none cursor-pointer bg-transparent"
          >
            <option value="ALL">🌍 Всі міста</option>
            {cities.map((c: City) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
