import { useMemo } from "react";
import { useCalendarEvents, useCalendarProjects } from "../../../hooks/useCalendar";
import { useUsers } from "../../../hooks/useEmployees";
import { useCities } from "../../../hooks/useCities";
import { PROJECT_HEX } from "../constants";
import type { Event as CalendarEvent } from "../../../types";

export function useCalendarData(filterCityId: string, monthFrom?: string, monthTo?: string) {
  const { data: events = [], isLoading: eventsLoading, isFetching, error: eventsError } = useCalendarEvents(monthFrom, monthTo);
  const { data: projects = [] } = useCalendarProjects();
  const { data: cities = [] } = useCities();
  const { data: allUsers = [] } = useUsers();

  const filteredEvents = useMemo(() => {
    return events.filter((ev: CalendarEvent) => {
      if (ev.status === "RE_SALE" || ev.status === "REPORT") return false;
      if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) return false;
      return true;
    });
  }, [events, filterCityId]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of filteredEvents) {
      const key = ev.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
    return map;
  }, [filteredEvents]);

  const projectColorMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) {
      switch (p.color) {
        case "emerald":
          map.set(p.name, "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300"); break;
        case "rose":
          map.set(p.name, "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 hover:border-rose-300"); break;
        case "red":
          map.set(p.name, "bg-red-100 text-red-700 border-red-300 hover:bg-red-200 hover:border-red-400"); break;
        case "amber":
          map.set(p.name, "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 hover:border-amber-300"); break;
        case "purple":
          map.set(p.name, "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:border-purple-300"); break;
        default:
          map.set(p.name, "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300");
      }
    }
    return map;
  }, [projects]);

  const projectHexMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) {
      map.set(p.name, PROJECT_HEX[p.color] || PROJECT_HEX.blue);
    }
    return map;
  }, [projects]);

  return {
    events,
    eventsLoading,
    isFetching,
    error: eventsError,
    projects,
    cities,
    allUsers,
    filteredEvents,
    eventsByDate,
    projectColorMap,
    projectHexMap,
  };
}
