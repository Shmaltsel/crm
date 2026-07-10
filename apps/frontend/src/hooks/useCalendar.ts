import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import type { Event, Project } from "../types";

export function useCalendarEvents() {
  return useQuery<Event[]>({
    queryKey: ["calendarEvents"],
    queryFn: () =>
      api.get<{ data: Event[] }>("/events").then((r) => r.data.data),
    staleTime: 60 * 1000,
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
