import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import type { Event, Project } from "../types";

export function useCalendarEvents(monthFrom?: string, monthTo?: string) {
  return useQuery<Event[]>({
    queryKey: ["calendarEvents", monthFrom, monthTo],
    queryFn: () => {
      const params = new URLSearchParams();
      if (monthFrom) params.set("dateFrom", monthFrom);
      if (monthTo) params.set("dateTo", monthTo);
      const qs = params.toString();
      return api
        .get<Event[]>(`/events${qs ? `?${qs}` : ""}`)
        .then((r) => r.data);
    },
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useCalendarProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () =>
      api.get<{ data: Project[] }>("/projects").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}
