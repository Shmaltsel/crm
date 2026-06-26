import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";

const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export function useCalendarEvents() {
  return useQuery({
    queryKey: ["calendarEvents"],
    queryFn: () => api.get("/events", { headers: h() }).then((r) => r.data),
    staleTime: 60 * 1000,
  });
}

export function useCalendarProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => api.get("/projects", { headers: h() }).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}
