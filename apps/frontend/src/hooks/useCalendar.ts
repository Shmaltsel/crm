import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";

export function useCalendarEvents() {
  return useQuery({
    queryKey: ["calendarEvents"],
    queryFn: () => api.get("/events").then((r) => r.data),
    staleTime: 60 * 1000,
  });
}

export function useCalendarProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => api.get("/projects").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}
