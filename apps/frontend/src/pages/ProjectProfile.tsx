import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { useCities } from "../hooks/useCities";
import type { Project } from "../types";
import { Skeleton } from "../components/ui/Skeleton";

interface ProjectStats {
  totalEvents: number;
  completedEvents: number;
  totalRevenue: number;
  totalProfit: number;
  totalSchoolSum: number;
  avgRating: number;
}

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

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
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
        </div>
      </div>
    );
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
