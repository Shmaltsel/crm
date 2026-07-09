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
