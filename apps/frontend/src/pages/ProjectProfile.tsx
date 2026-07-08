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
    return <div className="p-8 text-slate-500">Завантаження...</div>;
  }

  const cards = [
    { label: "Всього подій", value: stats?.totalEvents ?? "—", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Завершено", value: stats?.completedEvents ?? "—", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Дохід", value: stats ? `${fmt(stats.totalRevenue)} грн` : "—", color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Прибуток", value: stats ? `${fmt(stats.totalProfit)} грн` : "—", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Середній рейтинг", value: stats?.avgRating ? `${stats.avgRating}/10` : "—", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-5 h-5 rounded-full shrink-0"
          style={{ backgroundColor: project.color }}
        />
        <h1 className="text-2xl font-bold text-slate-800">{project.name}</h1>
      </div>

      {isSuperAdminOrOwner && cities.length > 0 && (
        <div className="mb-6">
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="w-full sm:max-w-xs p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5"
          >
            <p className="text-xs text-slate-400 font-medium mb-2">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
