# FILE: apps/frontend/src/hooks/useCities.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { City, CityProfile } from "../types";

export function useCities() {
  return useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => api.get<City[]>("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCity(id: string | undefined) {
  return useQuery<CityProfile>({
    queryKey: ["city", id],
    queryFn: () => api.get<CityProfile>(`/cities/${id}`).then((r) => r.data),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api.post("/cities", { name }).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData<City[]>(["cities"], (old) =>
        Array.isArray(old) ? [data, ...old] : [data],
      );
    },
  });
}

export function useCreateCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: { name: string; hostId: string; driverId: string }) =>
      api.post(`/cities/${cityId}/crews`, form).then((r) => r.data),
    onMutate: async (form) => {
      await qc.cancelQueries({ queryKey: ["city", cityId] });
      const prev = qc.getQueryData<CityProfile>(["city", cityId]);
      const optimistic: Crew = { id: `temp-${Date.now()}`, ...form, name: form.name, cityId: cityId! };
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old ? { ...old, crews: [...(old.crews || []), optimistic] } : old,
      );
      return { prev };
    },
    onSuccess: (data) => {
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old
          ? {
              ...old,
              crews: old.crews?.map((c: Crew) =>
                c.id?.startsWith("temp-") ? data : c,
              ),
            }
          : old,
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<CityProfile>(["city", cityId], ctx.prev);
    },
  });
}

export function useDeleteCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (crewId: string) =>
      api.delete(`/cities/crews/${crewId}`).then((r) => r.data),
    onMutate: async (crewId) => {
      await qc.cancelQueries({ queryKey: ["city", cityId] });
      const prev = qc.getQueryData<CityProfile>(["city", cityId]);
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old
          ? { ...old, crews: old.crews?.filter((c: Crew) => c.id !== crewId) }
          : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<CityProfile>(["city", cityId], ctx.prev);
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useDaysOff.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface DayOff {
  id: string;
  userId: string;
  date: string;
  user: { id: string; name: string; role: string; cityId: string | null };
}

export function useDaysOff(from?: string, to?: string, cityId?: string) {
  return useQuery({
    queryKey: ["daysOff", from, to, cityId],
    queryFn: () => {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (cityId) params.set("cityId", cityId);
      return api.get<DayOff[]>(`/days-off?${params}`).then((r) => r.data);
    },
    staleTime: 30 * 1000,
  });
}

export function useCreateDayOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { date: string; userId?: string }) =>
      api.post<DayOff>("/days-off", payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}

export function useDeleteDayOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/days-off/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useDebounce.ts

```
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

```

# FILE: apps/frontend/src/hooks/useEmployees.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { User, Project } from "../types";

export interface UserFormData {
  fullName: string;
  phone: string;
  email: string;
  cityId: string;
  role: string;
  password: string;
  telegramId: string;
  car: string;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      api.get<User[]>("/users", undefined).then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      api.get<Project[]>("/projects", undefined).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: UserFormData) =>
      api.post<User>("/users", form, undefined).then((r) => r.data),
    onMutate: async (form) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      const optimistic = {
        id: `temp-${Date.now()}`,
        name: form.fullName,
        ...form,
      };
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old) ? [...old, optimistic] : [optimistic],
      );
      return { prev };
    },
    onSuccess: (data) => {
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) => (u.id?.startsWith("temp-") ? data : u))
          : [data],
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, form }: { id: string; form: Partial<UserFormData> }) =>
      api
        .patch<User>(`/users/${id}`, form, undefined)
        .then((r) => r.data),
    onMutate: async ({ id, form }) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) =>
              u.id === id
                ? { ...u, name: form.fullName ?? u.name, ...form }
                : u,
            )
          : old,
      );
      return { prev };
    },
    onSuccess: (data, vars) => {
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) => (u.id === vars.id ? { ...u, ...data } : u))
          : old,
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/users/${id}`, undefined).then((r) => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old) ? old.filter((u) => u.id !== id) : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: {
      name: string;
      color: string;
      pricePerChild?: number;
    }) =>
      api
        .post<Project>("/projects", form, undefined)
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old) ? [...old, data] : [data],
      );
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      form,
    }: {
      id: string;
      form: { name?: string; color?: string; pricePerChild?: number };
    }) =>
      api
        .patch<Project>(`/projects/${id}`, form, undefined)
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old)
          ? old.map((p) => (p.id === vars.id ? { ...p, ...data } : p))
          : old,
      );
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/projects/${id}`, undefined).then((r) => r.data),
    onSuccess: (_data, id) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old) ? old.filter((p) => p.id !== id) : old,
      );
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useSchoolProfile.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type {
  Event,
  EventHistory,
  SchoolProfileData,
  CreateEventPayload,
} from "../types";
import type { ReportData } from "../components/school-profile/modals/ReportModal";

export function useSchool(id: string | undefined) {
  return useQuery({
    queryKey: ["school", id],
    queryFn: async () => {
      const res = await api.get(`/schools/${id}`);
      return res.data;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSchoolCompletedEvents(schoolId: string | undefined) {
  return useQuery({
    queryKey: ["schoolCompletedEvents", schoolId],
    queryFn: async () => {
      const res = await api.get<Event[]>(
        `/events/school/${schoolId}/completed`,
      );
      return res.data;
    },
    enabled: !!schoolId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSchoolEvents(schoolId: string | undefined, full = false) {
  return useQuery({
    queryKey: ["schoolEvents", schoolId, full],
    queryFn: async () => {
      const url = full
        ? `/events/school/${schoolId}`
        : `/events/school/${schoolId}?minimal=true`;
      const res = await api.get<Event[]>(url, undefined);
      return res.data.filter((ev) => ev.status !== "RE_SALE");
    },
    enabled: !!schoolId,
    staleTime: 60 * 1000,
  });
}

export function useEventFull(eventId: string | undefined) {
  return useQuery({
    queryKey: ["eventFull", eventId],
    queryFn: async () => {
      const res = await api.get<Event>(`/events/${eventId}`);
      return res.data;
    },
    enabled: !!eventId,
    staleTime: 30 * 1000,
  });
}

export { useUsers } from "./useEmployees";

export function useUpdateEventStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      status,
      actionName,
      comment,
    }: {
      eventId: string;
      status: string;
      actionName: string;
      comment?: string;
    }) =>
      api
        .patch(
          `/events/${eventId}/status`,
          { status, actionName, comment },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], data);
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old)
            ? old
                .map((ev) =>
                  ev.id === vars.eventId
                    ? { ...ev, status: vars.status, ...data }
                    : ev,
                )
                .filter((ev) => ev.status !== "RE_SALE")
            : old,
      );
    },
  });
}

export function useUpdatePreparation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      field,
      status,
    }: {
      eventId: string;
      field: string;
      status: string;
    }) =>
      api
        .patch(
          `/events/${eventId}/preparation`,
          { field, status },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old
          ? {
              ...old,
              preparation: {
                ...(old.preparation || {}),
                [vars.field]: vars.status,
              },
            }
          : old,
      );
    },
  });
}

export function useAssignCrew() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, crewId }: { eventId: string; crewId: string }) =>
      api
        .post(
          `/events/${eventId}/assign-crew`,
          { crewId },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], data);
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old)
            ? old.map((ev) =>
                ev.id === vars.eventId
                  ? { ...ev, crewId: vars.crewId, crew: data.crew }
                  : ev,
              )
            : old,
      );
    },
  });
}

export function useSubmitReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      reportData,
    }: {
      eventId: string;
      reportData: ReportData;
    }) =>
      api
        .post(`/events/${eventId}/report`, reportData)
        .then((r) => r.data)
        .catch((err) => {
          console.error("submitReport failed:", err.response?.data ?? err);
          throw err;
        }),
    onSuccess: (_data, vars) => {
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old) ? old.filter((ev) => ev.id !== vars.eventId) : old,
      );
      qc.removeQueries({ queryKey: ["eventFull", vars.eventId] });
    },
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, comment }: { eventId: string; comment: string }) =>
      api
        .post(
          `/events/${eventId}/history`,
          { comment },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old ? { ...old, history: data.history } : old,
      );
    },
  });
}

export const useUpdateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & Omit<SchoolProfileData, "id" | "city">) => {
      const res = await api.patch(`/schools/${id}`, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["school", variables.id] });
    },
  });
};

export function useDeleteEvent(schoolId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: string) => {
      await api.delete(`/events/${eventId}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["school", schoolId] });
      qc.invalidateQueries({ queryKey: ["schoolCompletedEvents", schoolId] });
    },
  });
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const res = await api.post<Event>("/events", payload);
      return res.data;
    },
    onSuccess: (_newEvent, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["schoolEvents", variables.schoolId],
      });
    },
  });
};

export function useUpdateHistoryComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      historyId,
      comment,
      eventId,
    }: {
      historyId: string;
      comment: string;
      eventId: string;
    }) =>
      api
        .patch(
          `/events/history/${historyId}`,
          { comment },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old
          ? {
              ...old,
              history: old.history?.map((h: EventHistory) =>
                h.id === vars.historyId ? { ...h, comment: vars.comment } : h,
              ),
            }
          : old,
      );
    },
  });
}

```

# FILE: apps/frontend/src/index.css

```

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *:focus-visible {
    outline: 2px solid theme('colors.brand.DEFAULT');
    outline-offset: 2px;
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}

@keyframes headerFadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.header-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
.header-btn-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
@keyframes fabPop {
  from { opacity: 0; transform: scale(0.5) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes modalScale {
  from { opacity: 0; transform: scale(0.95) translateY(15px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes schoolRowIn {
  from { opacity: 0; transform: translateX(-14px); }
  to   { opacity: 1; transform: translateX(0); }
}
.school-row-enter {
  animation: schoolRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  animation-fill-mode: both;
}

.no-select-ios {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

@keyframes dayOffPop {
  0% { transform: scale(0.7); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.dayoff-cell-enter {
  animation: dayOffPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

```

# FILE: apps/frontend/src/instrument.ts

```
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT ?? import.meta.env.MODE,
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
  replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 0,
  replaysOnErrorSampleRate: 1.0,
});

```

# FILE: apps/frontend/src/main.tsx

```
import "./instrument";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import { ToastProvider } from "./components/ui/Toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>,
);

```

# FILE: apps/frontend/src/pages/Analytics.tsx

```
export default function Analytics() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Аналітика</h1>
      <p className="text-muted-foreground">Сторінка в розробці</p>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/CalendarView.tsx

```
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import DayOffModal from "../components/calendar/DayOffModal";
import { STAFF_ROLES, MANAGER_ROLES } from "../features/calendar/constants";
import { toISODate } from "../features/calendar/utils/date";
import { useCalendarMonth } from "../features/calendar/hooks/useCalendarMonth";
import { useCalendarData } from "../features/calendar/hooks/useCalendarData";
import { useDayOffActions } from "../features/calendar/hooks/useDayOffActions";
import { useLongPress } from "../features/calendar/hooks/useLongPress";
import CalendarSkeleton from "../features/calendar/components/CalendarSkeleton";
import CalendarHeader from "../features/calendar/components/CalendarHeader";
import DesktopCalendarGrid from "../features/calendar/components/DesktopCalendarGrid";
import MobileCalendarGrid from "../features/calendar/components/MobileCalendarGrid";
import MobileDayDetailsPanel from "../features/calendar/components/MobileDayDetailsPanel";

export default function CalendarView() {
  const {
    days, year, month, monthFrom, monthTo,
    selectedMobileDate, setSelectedMobileDate,
    nextMonth, prevMonth,
  } = useCalendarMonth();

  const { user } = useAuth();
  const navigate = useNavigate();

  const userRole = user?.role || "GUEST";
  const isStaff = STAFF_ROLES.includes(userRole);
  const isManagerOrAdmin = MANAGER_ROLES.includes(userRole);

  const [filterCityId, setFilterCityId] = useState<string>(() =>
    userRole === "MANAGER" && user?.cityId ? user.cityId : "ALL",
  );

  const {
    eventsLoading, projects, cities, allUsers,
    eventsByDate, projectColorMap, projectHexMap,
  } = useCalendarData(filterCityId);

  const dayOffCityId = isManagerOrAdmin
    ? filterCityId !== "ALL" ? filterCityId : undefined
    : undefined;

  const {
    dayOffsByDate, staffForModal, dayOffModalDate,
    setDayOffModalDate, handleDayOffClick,
    handleToggleStaffDayOff, handleLongPressDayOff,
  } = useDayOffActions(
    monthFrom, monthTo, dayOffCityId, isStaff, isManagerOrAdmin,
    user, allUsers, filterCityId, userRole, user?.cityId,
  );

  const { startLongPress, cancelLongPress, wasLongPress, pressingDay, triggeredDay } = useLongPress(handleLongPressDayOff);

  const handleMobileDayTap = useCallback(
    (day: Date) => {
      if (wasLongPress()) return;
      setSelectedMobileDate(day);
    },
    [setSelectedMobileDate, wasLongPress],
  );

  const selectedDayEvents = eventsByDate.get(toISODate(selectedMobileDate)) ?? [];

  if (eventsLoading) return <CalendarSkeleton />;

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24">
      <CalendarHeader
        projects={projects}
        filterCityId={filterCityId}
        setFilterCityId={setFilterCityId}
        cities={cities}
        userRole={userRole}
      />

      <div className="hidden md:block">
        <DesktopCalendarGrid
          days={days}
          year={year}
          month={month}
          selectedMobileDate={selectedMobileDate}
          setSelectedMobileDate={setSelectedMobileDate}
          eventsByDate={eventsByDate}
          dayOffsByDate={dayOffsByDate}
          projectColorMap={projectColorMap}
          projectHexMap={projectHexMap}
          isStaff={isStaff}
          isManagerOrAdmin={isManagerOrAdmin}
          user={user}
          allUsers={allUsers}
          handleDayOffClick={handleDayOffClick}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
      </div>

      <div className="md:hidden mt-4">
        <MobileCalendarGrid
          days={days}
          year={year}
          month={month}
          selectedMobileDate={selectedMobileDate}
          eventsByDate={eventsByDate}
          dayOffsByDate={dayOffsByDate}
          projectHexMap={projectHexMap}
          projects={projects}
          filterCityId={filterCityId}
          setFilterCityId={setFilterCityId}
          cities={cities}
          userRole={userRole}
          handleMobileDayTap={handleMobileDayTap}
          startLongPress={startLongPress}
          cancelLongPress={cancelLongPress}
          pressingDay={pressingDay}
          triggeredDay={triggeredDay}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />

        <MobileDayDetailsPanel
          selectedMobileDate={selectedMobileDate}
          selectedDayEvents={selectedDayEvents}
          dayOffsByDate={dayOffsByDate}
          allUsers={allUsers}
          projectHexMap={projectHexMap}
          navigate={navigate}
        />
      </div>

      <DayOffModal
        isOpen={!!dayOffModalDate}
        onClose={() => setDayOffModalDate(null)}
        date={dayOffModalDate}
        staff={staffForModal}
        dayOffs={
          dayOffModalDate
            ? (dayOffsByDate.get(toISODate(dayOffModalDate)) ?? [])
            : []
        }
        onToggle={handleToggleStaffDayOff}
      />
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Cities.tsx

```
import React, { useState, useCallback, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { useSelectedCity } from "../context/CityContext";
import { useAddCity } from "../hooks/useApi";
import { useCities } from "../hooks/useCities";
import { useAuth } from "../context/AuthContext";

const IssueCarousel = lazy(() => import("../components/IssueCarousel"));
const CityMobileHeader = lazy(
  () => import("../components/cities/CityMobileHeader"),
);
const CityMobileList = lazy(
  () => import("../components/cities/CityMobileList"),
);
const CityDesktopGrid = lazy(
  () => import("../components/cities/CityDesktopGrid"),
);

const CitiesSkeleton = () => (
  <div className="w-full animate-pulse">
    {/* Мобільний скелетон */}
    <div className="md:hidden flex flex-col gap-4 mt-4">
      <div className="h-28 bg-slate-200 rounded-2xl w-full"></div>
      <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
      <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
    </div>
    {/* Десктопний скелетон */}
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 h-72 overflow-hidden"
        >
          <div className="h-44 bg-slate-200 w-full"></div>
          <div className="p-5 flex flex-col gap-3">
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mt-2"></div>
            <div className="h-10 bg-slate-200 rounded w-full mt-auto"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Cities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");

  const { selectedCity, setSelectedCity } = useSelectedCity();
  const { data: cities = [], isLoading: isFetching } = useCities();
  const addCity = useAddCity();

  const handleSelectCity = useCallback(
    (city: any) => {
      setSelectedCity(city);
    },
    [setSelectedCity],
  );
  const { user } = useAuth();
  const userRole = user?.role ?? null;
  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;
    try {
      await addCity.mutateAsync(newCityName.trim());
      setNewCityName("");
      setIsModalOpen(false);
    } catch (err: any) {
      setNewCityName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="p-4 md:p-8 bg-slate-50 min-h-screen"
      style={{ contentVisibility: "auto" }}
    >
      <div className="hidden md:flex justify-between items-center mb-8">
        <h1 className="header-enter text-3xl font-bold text-slate-800">
          Міста
        </h1>
        {userRole === "SUPERADMIN" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="header-btn-enter bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center transition-all duration-150"
          >
            <span className="mr-2">+</span> Додати місто
          </button>
        )}
      </div>

      {isFetching ? (
        <CitiesSkeleton />
      ) : (
        /* Оптимізація 6: Suspense обгортка для лінивих компонентів */
        <Suspense fallback={<CitiesSkeleton />}>
          
          <div className="md:hidden">
            <CityMobileHeader selectedCity={selectedCity} cities={cities} />
            <CityMobileList
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
            />
          </div>

          
          <div className="hidden md:block">
            <IssueCarousel />
            <CityDesktopGrid
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
            />
          </div>
        </Suspense>
      )}

      {/* Мобільна плаваюча кнопка FAB */}
      {userRole === "SUPERADMIN" && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 active:scale-95 transition-transform opacity-0"
          style={{
            animation:
              "fabPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) 0.2s forwards",
          }}
          aria-label="Додати місто"
        >
          +
        </button>
      )}

      {/* Модалка додавання */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
            style={{ animation: "fadeIn 0.2s ease-out forwards" }}
          >
            
            <div
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
              style={{ animation: "modalScale 0.3s ease-out forwards" }}
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddCity} className="p-6">
                <input
                  type="text"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  placeholder="Наприклад: Львів"
                  className="w-full p-3 mb-6 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  autoFocus
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    disabled={addCity.isPending}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {addCity.isPending ? "Збереження..." : "Зберегти"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/CityProfile.tsx

```
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
    return <div className="p-8 text-slate-500">Завантаження...</div>;
  if (!city) return <div className="p-8 text-slate-500">Місто не знайдено</div>;

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
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="text-sm text-slate-500 mb-6">
        <Link to="/cities" className="hover:text-blue-600 transition-colors">
          Міста
        </Link>
        <span className="mx-2">›</span>
        <span className="text-slate-800 font-medium">{city.name}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4 min-w-[220px]">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {manager?.name?.charAt(0) ?? "?"}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                Менеджер
              </p>
              <p className="font-bold text-slate-800">{manager?.name ?? "—"}</p>
              <p className="text-sm text-slate-500">
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

      <div className="grid grid-cols-3 sm:flex sm:w-fit gap-1 bg-white rounded-xl p-1 border border-slate-100 shadow-sm mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span>{tab.icon}</span>{" "}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "events" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 mb-4">
              Завершені події ({completedEvents.length})
            </h3>
            <input
              type="text"
              value={completedSearchQuery}
              onChange={(e) => setCompletedSearchQuery(e.target.value)}
              placeholder="Пошук за назвою закладу..."
              className="w-full sm:max-w-xs p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {filteredCompletedEvents.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">
                {completedSearchQuery
                  ? "Нічого не знайдено"
                  : "Завершених подій ще немає"}
              </p>
            </div>
          ) : (
            <>
              <div className="md:hidden divide-y divide-slate-50">
                {filteredCompletedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedReportEvent(ev)}
                    className="flex items-center justify-between gap-3 p-4 active:bg-slate-50 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-blue-600 truncate">
                        {ev.school?.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {ev.project} ·{" "}
                        {new Date(ev.date).toLocaleDateString("uk-UA")}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        👶{" "}
                        {ev.report?.childrenCount || ev.childrenPlanned || "—"}{" "}
                        дітей
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-slate-800 text-sm">
                        {fmt(ev.report?.totalSum || ev.price || 0)} грн
                      </p>
                      <p className="text-xs font-medium text-emerald-600 mt-0.5">
                        +{fmt(ev.report?.remainderSum || 0)} грн
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
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
                        className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="p-4">
                          <span className="font-medium text-blue-600">
                            {ev.school?.name}
                          </span>
                          <p className="text-xs text-slate-400">
                            {ev.school?.type}
                          </p>
                        </td>
                        <td className="p-4 text-slate-700">{ev.project}</td>
                        <td className="p-4 text-slate-600">
                          {new Date(ev.date).toLocaleDateString("uk-UA")}
                        </td>
                        <td className="p-4 font-medium">
                          {ev.report?.childrenCount ||
                            ev.childrenPlanned ||
                            "—"}
                        </td>
                        <td className="p-4 font-medium text-slate-800">
                          {fmt(ev.report?.totalSum || ev.price || 0)} грн
                        </td>
                        <td className="p-4 font-medium text-emerald-600">
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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="text-xl font-bold text-slate-800">
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              + Додати екіпаж
            </button>
          </div>

          {crews.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-4xl mb-3">🚐</p>
              <p className="font-medium">Екіпажів ще немає</p>
            </div>
          ) : (
            <>
              {/* Мобільний вигляд */}
              <div className="md:hidden divide-y divide-slate-50">
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
                          <div className="w-16 h-10 rounded overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-200">
                            <OptimizedImage
                              src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
                              alt="van"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="font-bold text-slate-800">
                            {crew.name}
                          </p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded text-xs font-medium">
                          Активний
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3 text-xs mt-4">
                        <div>
                          <p className="font-medium text-slate-800">
                            {hostObj?.name || crew.host?.name || "—"}
                          </p>
                          <p className="text-slate-500 mt-0.5">
                            {hostObj?.phone || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {driverObj?.name || crew.driver?.name || "—"}
                          </p>
                          <p className="text-slate-500 mt-0.5">
                            {driverObj?.phone || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {carName}
                          </p>
                          {carPlate && (
                            <p className="text-slate-500 mt-0.5">{carPlate}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-slate-500">
                            Подій:{" "}
                            <span className="font-bold text-slate-800">
                              {eventsCount}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCrew(crew.id)}
                        className="w-full mt-4 py-2 border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg text-sm font-medium transition-colors"
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
                    <tr className="bg-white border-b border-slate-100 text-slate-800 font-bold">
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
                          className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="p-5">
                            <div className="flex items-center gap-3">
                              {/* Універсальна фотографія буса */}
                              <div className="w-[60px] h-[40px] rounded border border-slate-200 overflow-hidden bg-slate-100 shrink-0 shadow-sm">
                                <OptimizedImage
                                  src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
                                  alt="van"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-bold text-slate-800">
                                {crew.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-slate-800">
                              {hostObj?.name || crew.host?.name || "—"}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 tracking-wide">
                              {hostObj?.phone || "—"}
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-slate-800">
                              {driverObj?.name || crew.driver?.name || "—"}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 tracking-wide">
                              {driverObj?.phone || "—"}
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-slate-600">
                              {carName}
                            </div>
                            {carPlate ? (
                              <div className="text-xs text-slate-500 mt-1 tracking-wider">
                                {carPlate}
                              </div>
                            ) : (
                              <div className="text-xs text-slate-400 mt-1">
                                —
                              </div>
                            )}
                          </td>
                          <td className="p-5">
                            <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide">
                              Активний
                            </span>
                          </td>
                          <td className="p-5 text-center font-bold text-slate-800 text-base">
                            {eventsCount}
                          </td>
                          <td className="p-5 text-center">
                            <button
                              onClick={() => handleDeleteCrew(crew.id)}
                              className="text-slate-400 hover:text-red-500 p-2 transition-colors rounded-lg hover:bg-red-50"
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
            <div className="bg-white rounded-2xl h-64 animate-pulse border border-slate-100" />
          }
        >
          <CityAnalytics events={completedEvents} />
        </Suspense>
      )}

      {/* Модалка створення екіпажу */}
      {isCreateCrewModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Новий екіпаж</h3>
              <button
                onClick={() => setIsCreateCrewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateCrew} className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Назва екіпажу
                </label>
                <input
                  type="text"
                  value={crewForm.name}
                  onChange={(e) =>
                    setCrewForm({ ...crewForm, name: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Ведучий
                </label>
                <select
                  value={crewForm.hostId}
                  onChange={(e) =>
                    setCrewForm({ ...crewForm, hostId: e.target.value })
                  }
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none"
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
                <p className="text-xs text-emerald-600 mt-1">
                  ✓ Доступно: {availableHosts.length} вільних
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Водій
                </label>
                <select
                  value={crewForm.driverId}
                  onChange={(e) =>
                    setCrewForm({ ...crewForm, driverId: e.target.value })
                  }
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none"
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
                <p className="text-xs text-emerald-600 mt-1">
                  ✓ Доступно: {availableDrivers.length} вільних
                </p>
              </div>
              <div className="flex gap-3 pt-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateCrewModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
      <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
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
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
        <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Звіт: {event.project}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {event.school?.name} ·{" "}
              {new Date(event.date).toLocaleDateString("uk-UA")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg"
          >
            ✕
          </button>
        </div>
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-slate-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  📊
                </span>
                Результати
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Дітей (факт):</span>
                  <span className="font-bold">
                    {report?.childrenCount || 0}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Класів:</span>
                  <span className="font-medium">
                    {report?.classesCount || 0}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Пільговиків:</span>
                  <span className="font-medium">
                    {report?.privilegedCount || 0}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Сеансів:</span>
                  <span className="font-medium">
                    {report?.showingsCount || 0}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500">Оцінка:</span>
                  <span className="font-bold text-amber-500">
                    ⭐ {report?.rating || 0}/10
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  💰
                </span>
                Фінанси
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Загальна виручка:</span>
                  <span className="font-bold">{fmt(report?.totalSum)} грн</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">На заклад (20%):</span>
                  <span className="font-medium text-rose-500">
                    − {fmt(report?.schoolSum)} грн
                  </span>
                </div>
                {Array.isArray(report?.expenses) &&
                  report.expenses.length > 0 && (
                    <div className="py-2 border-b border-slate-50">
                      <span className="text-slate-500 block mb-2">
                        Додаткові витрати:
                      </span>
                      {report.expenses.map((exp: any, i: number) => (
                        <div
                          key={i}
                          className="flex justify-between text-xs mb-1 pl-2"
                        >
                          <span className="text-slate-400">
                            — {exp.name || exp.category}
                          </span>
                          <span className="text-rose-500 font-medium">
                            − {fmt(exp.amount)} грн
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-slate-800">
                    Чистий прибуток:
                  </span>
                  <span className="font-bold text-emerald-600 text-base">
                    {fmt(report?.remainderSum)} грн
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                ⏳
              </span>
              Історія пайплайну
            </h4>
            {!event.history || event.history.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">
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
                      <p className="font-semibold text-slate-800">
                        {item.action}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(item.createdAt).toLocaleString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · 👤 {item.userName}
                      </p>
                      {item.comment && (
                        <div className="mt-2 p-3 bg-slate-50/80 rounded-xl text-slate-600 italic border border-slate-100">
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

```

# FILE: apps/frontend/src/pages/Dashboard.tsx

```
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
const IssueCarousel = lazy(() => import("../components/IssueCarousel"));
const FunnelBar = lazy(() => import("../components/dashboard/FunnelBar"));
const TodayEvents = lazy(() => import("../components/dashboard/TodayEvents"));
const UpcomingEvents = lazy(() => import("../components/dashboard/UpcomingEvents"));
const StaleSchools = lazy(() => import("../components/dashboard/StaleSchools"));
const MonthlyKpi = lazy(() => import("../components/dashboard/MonthlyKpi"));
const ActivityFeed = lazy(() => import("../components/dashboard/ActivityFeed"));
const CitiesTable = lazy(() => import("../components/dashboard/CitiesTable"));

interface DashboardSummary {
  todayEvents: any[];
  upcomingEvents: any[];
  funnel: Record<string, number>;
  totalSchools: number;
  monthlyKpi: {
    revenue: number;
    profit: number;
    children: number;
    count: number;
  };
  staleSchools: {
    id: string;
    name: string;
    status: string | null;
    lastActivity: string | null;
    daysStale: number | null;
  }[];
  activityFeed: {
    id: string;
    userName: string;
    role: string;
    action: string;
    comment: string | null;
    createdAt: string;
    schoolId: string | null;
    schoolName: string | null;
    eventId: string | null;
  }[];
  citiesStats: {
    cityId: string;
    cityName: string;
    schoolsCount: number;
    activeEvents: number;
    monthRevenue: number;
  }[];
}


function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse ${className}`}>
      <div className="h-4 bg-slate-100 rounded-full w-1/3 mb-3" />
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded-full w-full" />
        <div className="h-3 bg-slate-100 rounded-full w-4/5" />
        <div className="h-3 bg-slate-100 rounded-full w-3/5" />
      </div>
    </div>
  );
}

function SkeletonEventCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-3 animate-pulse">
      <div className="flex justify-between mb-2">
        <div className="h-5 bg-slate-100 rounded w-16" />
        <div className="h-4 bg-slate-100 rounded w-24" />
      </div>
      <div className="h-4 bg-slate-100 rounded w-3/4 mb-3" />
      <div className="flex justify-between items-center">
        <div className="h-5 bg-slate-100 rounded-full w-28" />
        <div className="h-7 bg-slate-100 rounded-lg w-20" />
      </div>
    </div>
  );
}

function DashboardSkeleton({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      {/* IssueCarousel placeholder */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse h-24" />

      {/* Сьогодні + Потребують уваги */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* TodayEvents */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 animate-pulse">
          <div className="flex justify-between mb-3">
            <div>
              <div className="h-4 bg-slate-100 rounded w-36 mb-1" />
              <div className="h-3 bg-slate-100 rounded w-28" />
            </div>
            <div className="h-4 bg-slate-100 rounded w-16" />
          </div>
          <div className="flex flex-col gap-2">
            <SkeletonEventCard />
            <SkeletonEventCard />
          </div>
        </div>

        {/* StaleSchools */}
        <SkeletonCard />
        {/* UpcomingEvents */}
        <SkeletonCard />
      </div>

      <hr className="border-slate-200" />

      {/* KPI + Воронка */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Activity + Cities */}
      <div className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}>
        <SkeletonCard className="min-h-[200px]" />
        {isSuperAdmin && <SkeletonCard className="min-h-[200px]" />}
      </div>
    </div>
  );
}


export default function Dashboard() {
  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();

  const isSuperAdmin = user?.role === "SUPERADMIN";

  const { data: summary, isLoading } = useQuery<DashboardSummary>({
    queryKey: ["dashboardSummary", selectedCity.id],
    queryFn: async () => {
      const params = selectedCity.id ? `?cityId=${selectedCity.id}` : "";
      const res = await api.get(`/dashboard/summary${params}`);
      return res.data;
    },
    enabled: Boolean(selectedCity.id || isSuperAdmin),
  });

  if (!selectedCity.id && !isSuperAdmin) {
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Дашборд</h1>
          <p className="text-sm text-content-muted mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Оберіть місто</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
          <MapPin className="w-10 h-10 mx-auto mb-3 text-content-muted" />
          <p className="font-semibold text-slate-700 mb-2">Місто не обрано</p>
          <p className="text-sm text-slate-500 mb-4">
            Оберіть місто у розділі «Міста», щоб бачити активність
          </p>
          <Link
            to="/cities"
            className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Перейти до міст
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Шапка */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Дашборд
          {selectedCity.name && (
            <span className="ml-2 text-base font-normal text-blue-500">
              · {selectedCity.name}
            </span>
          )}
          {isSuperAdmin && !selectedCity.name && (
            <span className="ml-2 text-base font-normal text-purple-500">
              · Усі міста
            </span>
          )}
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          {new Date().toLocaleDateString("uk-UA", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {isLoading ? (
        <DashboardSkeleton isSuperAdmin={isSuperAdmin} />
      ) : summary ? (
        <div className="flex flex-col gap-6">
          {/* ── ЗОНА ДІЇ ── */}
          <Suspense fallback={<div className="h-24 bg-white rounded-2xl animate-pulse border border-slate-100" />}>
            <IssueCarousel />
          </Suspense>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Suspense fallback={<SkeletonCard />}>
              <TodayEvents events={summary.todayEvents} />
            </Suspense>
            <Suspense fallback={<SkeletonCard />}>
              <StaleSchools schools={summary.staleSchools} />
            </Suspense>
            <Suspense fallback={<SkeletonCard />}>
              <UpcomingEvents events={summary.upcomingEvents} />
            </Suspense>
          </div>

          <hr className="border-slate-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Suspense fallback={<SkeletonCard />}>
              <MonthlyKpi kpi={summary.monthlyKpi} />
            </Suspense>
            <Suspense fallback={<SkeletonCard />}>
              <FunnelBar funnel={summary.funnel} />
            </Suspense>
          </div>

          <div className={`grid grid-cols-1 gap-4 ${isSuperAdmin ? "md:grid-cols-2" : ""}`}>
            <Suspense fallback={<SkeletonCard className="min-h-[200px]" />}>
              <ActivityFeed items={summary.activityFeed} />
            </Suspense>
            {isSuperAdmin && summary.citiesStats.length > 0 && (
              <Suspense fallback={<SkeletonCard className="min-h-[200px]" />}>
                <CitiesTable rows={summary.citiesStats} />
              </Suspense>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400 text-sm">
          Не вдалося завантажити дані
        </div>
      )}
    </div>
  );
}
```

# FILE: apps/frontend/src/pages/Employees.tsx

```
import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { X, Search, UserPlus } from "lucide-react";
import {
  useUsers,
  useProjects,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../hooks/useEmployees";
import { useCities } from "../hooks/useCities";
import { useDebounce } from "../hooks/useDebounce";
import EmployeeCard from "../components/employees/EmployeeCard";
import EmployeesTable from "../components/employees/EmployeesTable";
import UserModal from "../components/employees/UserModal";
import ProjectModal from "../components/employees/ProjectModal";
import { EmployeesHeader } from "../components/employees/EmployeesHeader";
import { FilterPanel } from "../components/employees/FilterPanel";
import { EmptyState } from "../components/ui/EmptyState";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { LoadingBar } from "../components/ui/LoadingBar";
import { useToast } from "../components/ui/Toast";
import { exportCsv } from "../utils/exportCsv";
import { sectionVariants } from "../animations/employees";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";

type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";
type ViewMode = "cards" | "table";

interface City { id: string; name: string }
interface User {
  id: string; name: string; phone: string | null; email: string;
  cityId: string | null; city?: City; role: Role;
  telegramId?: string | null; car?: string | null;
}
interface Project { id: string; name: string; color: string }

const ROLE_LABELS: Record<string, string> = {
  MANAGER: "Менеджер", DRIVER: "Водій", HOST: "Ведучий",
  SUPERADMIN: "Суперадмін", GUEST: "Гість",
};
const ROLE_COLORS: Record<string, string> = {
  MANAGER: "bg-blue-50 text-blue-700 border-blue-200",
  DRIVER: "bg-emerald-50 text-emerald-700 border-emerald-200",
  HOST: "bg-violet-50 text-violet-700 border-violet-200",
};
const ROLE_HEADER_COLORS: Record<string, string> = {
  MANAGER: "bg-blue-600", DRIVER: "bg-emerald-600", HOST: "bg-violet-600",
};
const EMPTY_FORM = {
  fullName: "", phone: "", email: "", cityId: "", role: "MANAGER" as Role,
  password: "", telegramId: "", car: "",
};
const PROJECT_COLORS: Record<string, string> = {
  blue: "bg-blue-500", emerald: "bg-emerald-500", rose: "bg-rose-500",
  red: "bg-red-500", amber: "bg-amber-500", purple: "bg-purple-500",
};

function Shimmer() {
  return (
    <motion.div
      className="absolute inset-0 -translate-x-full"
      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
      animate={{ translateX: ["-100%", "100%"] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
    />
  );
}

function EmployeesSkeleton() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-7 w-56 bg-slate-200 rounded-lg mb-2" />
          <div className="h-4 w-72 bg-slate-100 rounded" />
        </div>
        <div className="h-10 w-44 bg-slate-200 rounded-lg" />
      </div>
      {[
        { label: "Менеджери", accent: "bg-blue-200" },
        { label: "Водії", accent: "bg-emerald-200" },
        { label: "Ведучі", accent: "bg-violet-200" },
      ].map(({ label, accent }) => (
        <div key={label} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-1 h-6 rounded-full ${accent}`} />
            <div className="h-5 w-24 bg-slate-200 rounded" />
            <div className="h-5 w-8 bg-slate-100 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-5 flex items-start gap-4">
                <Shimmer />
                <div className="w-12 h-12 rounded-2xl bg-slate-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                  <div className="h-3 w-40 bg-slate-100 rounded mb-3" />
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-slate-100 rounded-full" />
                    <div className="h-5 w-20 bg-slate-100 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Employees() {
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: cities = [] } = useCities();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const toast = useToast();
  const { selectedCity: contextCity } = useSelectedCity();
  const { user: authUser } = useAuth();
  const isSuperAdmin = authUser?.role === "SUPERADMIN";

  const [searchParams, setSearchParams] = useSearchParams();
  const rawSearch = searchParams.get("search") ?? "";
  const rawRoles = searchParams.get("roles") ?? "";
  const rawCity = searchParams.get("city") ?? "";

  const updateParams = useCallback((updates: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      return next;
    });
  }, [setSearchParams]);

  const debouncedSearch = useDebounce(rawSearch, 300);

  const selectedRoles = useMemo(
    () => rawRoles ? rawRoles.split(",").filter(Boolean) : [],
    [rawRoles],
  );
  const selectedCity = rawCity;

  const [viewMode, setViewMode] = useState<ViewMode>(
    (searchParams.get("view") as ViewMode) ?? "cards",
  );
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    updateParams({ view: mode });
  }, [updateParams]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userFormValues, setUserFormValues] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({ name: "", color: "blue", pricePerChild: "" });

  const [formError, setFormError] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (confirmDelete) setConfirmDelete(null);
        else if (isModalOpen) setIsModalOpen(false);
        else if (isProjectModalOpen) { setIsProjectModalOpen(false); setEditingProject(null); }
        else if (filterPanelOpen) setFilterPanelOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmDelete, isModalOpen, isProjectModalOpen, filterPanelOpen]);

  const handleOpenProjectModal = useCallback((project: Project | null = null) => {
    setEditingProject(project);
    setProjectForm(
      project
        ? { name: project.name, color: project.color, pricePerChild: String((project as any).pricePerChild ?? "") }
        : { name: "", color: "blue", pricePerChild: "" },
    );
    setIsProjectModalOpen(true);
  }, []);

  const cityFilteredUsers = useMemo(
    () => contextCity.id ? users.filter((u) => u.cityId === contextCity.id) : users,
    [users, contextCity.id],
  );

  const filteredUsers = useMemo(() => {
    let result = cityFilteredUsers;

    if (selectedRoles.length > 0) {
      result = result.filter((u) => selectedRoles.includes(u.role));
    }

    if (selectedCity && selectedCity !== "all") {
      result = result.filter((u) => u.cityId === selectedCity || u.city?.id === selectedCity);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.phone ?? "").toLowerCase().includes(q),
      );
    }

    return result;
  }, [cityFilteredUsers, selectedRoles, selectedCity, debouncedSearch]);

  const grouped = useMemo(
    () => (["MANAGER", "DRIVER", "HOST"] as Role[]).map((role) => ({
      role,
      label: ROLE_LABELS[role],
      items: filteredUsers.filter((u) => u.role === role),
    })),
    [filteredUsers],
  );

  const hasActiveFilters = selectedRoles.length > 0 || (selectedCity !== "" && selectedCity !== "all");

  const handleResetFilters = useCallback(() => {
    updateParams({ roles: null, city: null });
  }, [updateParams]);

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];

    if (debouncedSearch.trim()) {
      chips.push({
        key: "search",
        label: `Пошук: "${debouncedSearch.trim()}"`,
        onRemove: () => updateParams({ search: null }),
      });
    }

    selectedRoles.forEach((r) => {
      chips.push({
        key: `role-${r}`,
        label: ROLE_LABELS[r] ?? r,
        onRemove: () => {
          const next = selectedRoles.filter((x) => x !== r);
          updateParams({ roles: next.length > 0 ? next.join(",") : null });
        },
      });
    });

    if (selectedCity && selectedCity !== "all") {
      const cityName = cities.find((c) => c.id === selectedCity)?.name || selectedCity;
      chips.push({
        key: "city",
        label: cityName,
        onRemove: () => updateParams({ city: null }),
      });
    }

    return chips;
  }, [debouncedSearch, selectedRoles, selectedCity, cities, updateParams]);

  const handleOpenModal = useCallback((user: User | null = null) => {
    setFormError("");
    setEditingUser(user);
    setUserFormValues(
      user
        ? {
            fullName: user.name, phone: user.phone || "", email: user.email,
            cityId: user.cityId || "", role: user.role, password: "",
            telegramId: user.telegramId || "", car: user.car || "",
          }
        : { ...EMPTY_FORM },
    );
    setIsModalOpen(true);
  }, []);

  const handleSaveUser = useCallback(async (values: Record<string, string>) => {
    setFormError("");
    setIsSubmitting(true);
    setIsMutating(true);
    try {
      if (editingUser) {
        const { password, ...rest } = values;
        const payload = password.trim() ? values : rest;
        await updateUser.mutateAsync({ id: editingUser.id, form: payload });
        toast("Користувача оновлено", "success");
      } else {
        await createUser.mutateAsync(values);
        toast("Користувача створено", "success");
      }
      setShowSuccess(true);
      setTimeout(() => { setShowSuccess(false); setIsModalOpen(false); }, 700);
    } catch (err: any) {
      const messages = err?.response?.data?.message;
      const errorMsg = Array.isArray(messages) ? messages.join(", ") : messages || "Помилка збереження";
      setFormError(errorMsg);
      toast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
      setIsMutating(false);
    }
  }, [editingUser, createUser, updateUser, toast]);

  const handleExport = useCallback(() => {
    if (filteredUsers.length === 0) {
      toast("Немає даних для експорту", "info");
      return;
    }
    const rows = filteredUsers.map((u) => ({
      "Ім'я": u.name,
      "Email": u.email,
      "Телефон": u.phone ?? "",
      "Роль": ROLE_LABELS[u.role] ?? u.role,
      "Місто": u.city?.name ?? "",
    }));
    exportCsv(rows, `employees-${new Date().toISOString().slice(0, 10)}.csv`);
    toast(`Експортовано ${rows.length} записів`, "success");
  }, [filteredUsers, toast]);

  const handleDelete = useCallback(async () => {
    if (!confirmDelete) return;
    setIsMutating(true);
    try {
      await deleteUser.mutateAsync(confirmDelete.id);
      toast("Користувача видалено", "success");
    } catch {
      toast("Помилка видалення", "error");
    } finally {
      setConfirmDelete(null);
      setIsMutating(false);
    }
  }, [confirmDelete, deleteUser, toast]);

  const handleCreateProject = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name.trim()) return;
    setIsProjectModalOpen(false);
    const payload = { ...projectForm, pricePerChild: Number(projectForm.pricePerChild) || 0 };
    setProjectForm({ name: "", color: "blue", pricePerChild: "" });
    if (editingProject) {
      updateProject.mutate({ id: editingProject.id, form: payload });
      setEditingProject(null);
    } else {
      createProject.mutate(payload);
    }
  }, [projectForm, editingProject, updateProject, createProject]);

  const handleDeleteProject = useCallback(async (id: string, name: string) => {
    if (!window.confirm(`Видалити вид події "${name}"? Існуючі події з цією назвою збережуться.`)) return;
    try { await deleteProject.mutateAsync(id); }
    catch { alert("Помилка видалення"); }
  }, [deleteProject]);

  const cityOptions = useMemo(
    () => [{ value: "all", label: "Всі міста" }, ...cities.map((c: City) => ({ value: c.id, label: c.name }))],
    [cities],
  );

  if (usersLoading) return <EmployeesSkeleton />;

  return (
    <>
      <LoadingBar isLoading={isMutating} />
      <MotionConfig reducedMotion="user">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="p-4 md:p-8 h-full"
        >
        <EmployeesHeader
          isSuperAdmin={isSuperAdmin}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onAddUser={() => handleOpenModal()}
          onToggleFilter={() => setFilterPanelOpen((p) => !p)}
          searchQuery={rawSearch}
          onSearchChange={(q) => updateParams({ search: q || null })}
          onExport={handleExport}
        />

        {activeFilterChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeFilterChips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200"
              >
                {chip.label}
                <button onClick={chip.onRemove} className="hover:text-brand-900 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-content-muted hover:text-content-primary transition-colors"
              >
                Очистити всі
              </button>
            )}
          </div>
        )}

        <div className="flex gap-6">
          <FilterPanel
            isMobileOpen={filterPanelOpen}
            onMobileClose={() => setFilterPanelOpen(false)}
            selectedRoles={selectedRoles}
            onRolesChange={(roles) => updateParams({ roles: roles.length > 0 ? roles.join(",") : null })}
            selectedCity={selectedCity || "all"}
            onCityChange={(city) => updateParams({ city: city === "all" ? null : city })}
            cityOptions={cityOptions}
            onReset={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <div className="flex-1 min-w-0">
            {filteredUsers.length === 0 ? (
              <EmptyState
                icon={Search}
                title="Нічого не знайдено"
                description="Спробуйте змінити параметри пошуку або фільтри"
                action={
                  hasActiveFilters || debouncedSearch.trim() ? (
                    <button
                      onClick={handleResetFilters}
                      className="text-sm font-semibold text-brand hover:text-brand-700 transition-colors"
                    >
                      Очистити фільтри
                    </button>
                  ) : isSuperAdmin ? (
                    <button
                      onClick={() => handleOpenModal()}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-700 transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      Додати працівника
                    </button>
                  ) : undefined
                }
              />
            ) : viewMode === "cards" ? (
              <div className="space-y-8">
                {grouped.map(({ role, label, items }) => (
                  <motion.div
                    key={role}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-1 h-6 rounded-full ${ROLE_HEADER_COLORS[role]}`} />
                      <h2 className="text-lg font-bold text-slate-700">{label}</h2>
                      <motion.span
                        key={items.length}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[role]}`}
                      >
                        {items.length}
                      </motion.span>
                    </div>
                    {items.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center"
                      >
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 text-lg">👤</div>
                        <p className="text-slate-400 text-sm mb-3">Немає {label.toLowerCase()}ів</p>
                        {isSuperAdmin && (
                          <button onClick={() => handleOpenModal()} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                            + Додати {label.toLowerCase()}а
                          </button>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        variants={sectionVariants}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
                      >
                        <AnimatePresence initial={false}>
                          {items.map((u) => (
                            <EmployeeCard
                              key={u.id}
                              user={u}
                              role={role}
                              isSuperAdmin={isSuperAdmin}
                              onEdit={handleOpenModal}
                              onDelete={(id, name) => setConfirmDelete({ id, name })}
                            />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                <div className="border-t border-slate-200 pt-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Види подій (Проєкти)</h2>
                      <p className="text-sm text-slate-400 mt-1">Ці проєкти відображатимуться у випадаючому списку при створенні події</p>
                    </div>
                    {isSuperAdmin && (
                      <button onClick={() => handleOpenProjectModal()} className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full sm:w-auto">
                        + Створити вид події
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((p, pi) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: pi * 0.05 }}
                        whileHover={{ y: -3, boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10)" }}
                        className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group cursor-default hover:border-slate-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.15 }}
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center ${PROJECT_COLORS[p.color] || "bg-blue-500"} shadow-sm ring-4 ring-offset-1 ring-slate-50`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
                          </motion.div>
                          <div>
                            <span className="font-bold text-slate-800">{p.name}</span>
                            {!!(p as any).pricePerChild && (
                              <p className="text-xs text-slate-400">{(p as any).pricePerChild} грн / дитина</p>
                            )}
                          </div>
                        </div>
                        {isSuperAdmin && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleOpenProjectModal(p)} className="text-slate-300 hover:text-blue-500 p-2 -mr-1" title="Редагувати">✏️</button>
                            <button onClick={() => handleDeleteProject(p.id, p.name)} className="text-slate-300 hover:text-red-500 p-2 -mr-2" title="Видалити">🗑</button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {projects.length === 0 && (
                      <div className="col-span-full text-center py-10 text-slate-400">Ви ще не додали жодного виду події</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <EmployeesTable users={filteredUsers} onSelect={(user) => console.log("select", user)} />
            )}
          </div>
        </div>

        <ProjectModal
          isOpen={isProjectModalOpen}
          isEditing={!!editingProject}
          form={projectForm}
          setForm={setProjectForm}
          onClose={() => { setIsProjectModalOpen(false); setEditingProject(null); }}
          onSubmit={handleCreateProject}
        />
        <UserModal
          isOpen={isModalOpen}
          isEditing={!!editingUser}
          initialValues={userFormValues}
          cities={cities}
          formError={formError}
          isSubmitting={isSubmitting}
          showSuccess={showSuccess}
          onClose={() => { setIsModalOpen(false); setEditingUser(null); }}
          onSave={handleSaveUser}
        />
        <ConfirmDialog
          isOpen={!!confirmDelete}
          title="Видалити користувача"
          message={`Ви впевнені, що хочете видалити "${confirmDelete?.name}"?`}
          confirmLabel="Видалити"
          variant="danger"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
        </motion.div>
      </MotionConfig>
    </>
  );
}

```

# FILE: apps/frontend/src/pages/EventReport.tsx

```
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

import { useEventFull } from "../hooks/useSchoolProfile";
import AddressLink from "../components/AddressLink";
import { formatCurrency } from "../utils/formatCurrency";

export default function EventReport() {
  const { eventId } = useParams();
  const { data: event, isLoading, isError } = useEventFull(eventId);

  if (isLoading)
    return <div className="p-8 text-slate-500">Завантаження...</div>;
  if (isError || !event)
    return <div className="p-8 text-slate-500">Подію не знайдено</div>;

  const report = event.report;
  const crew = event.crew;
  const fmt = formatCurrency;

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs sm:text-sm text-slate-500 mb-4 flex items-center gap-1 flex-wrap">
        <Link to="/cities" className="hover:text-blue-600">
          Міста
        </Link>
        <span>›</span>
        <Link to={`/cities/${event.cityId}`} className="hover:text-blue-600">
          {event.city?.name}
        </Link>
        <span>›</span>
        <span>Події</span>
        <span>›</span>
        <span className="text-slate-800 font-medium">Звіт по події</span>
      </div>

      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
      >
        ← Назад
      </button>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Звіт по події
        </h1>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          Проведено
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Інформація */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-slate-800 mb-4">Інформація</h3>
          <div className="space-y-2 text-sm">
            <Row label="Заклад" value={event.school?.name} />
            <Row
              label="Адреса"
              value={<AddressLink address={event.address} />}
            />
            <Row
              label="Дата"
              value={new Date(event.date).toLocaleDateString("uk-UA")}
            />
            <Row label="Час" value={event.time} />
            <Row label="Проєкт" value={event.project} />
            <Row label="Екіпаж" value={crew?.name} />
            <Row label="Ведучий" value={crew?.host?.name} />
            <Row label="Водій" value={crew?.driver?.name} />
          </div>
        </div>

        {/* Результат */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-slate-800 mb-4">Результат</h3>
          <div className="space-y-2 text-sm">
            <Row label="Заплановано дітей" value={event.childrenPlanned} />
            <Row label="Фактично дітей" value={report?.childrenCount} />
            <Row label="Вартість" value={`${fmt(event.price)} грн`} />
            <Row label="Отримано" value={`${fmt(report?.totalSum)} грн`} />
            <Row label="Спосіб оплати" value={event.paymentMethod} />
          </div>
        </div>

        {/* Оцінка */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-slate-800 mb-4">Оцінка</h3>
          <div className="space-y-2 text-sm">
            <Row
              label="Директор задоволений"
              value={report?.directorSatisfied ? "Так" : "Ні"}
            />
            <Row
              label="Вчителі задоволені"
              value={report?.teachersSatisfied ? "Так" : "Ні"}
            />
            <Row label="Проблеми" value={report?.hadIssues ? "Так" : "Ні"} />
            {report?.comment && (
              <div className="pt-2">
                <p className="text-slate-400 mb-1">Коментар:</p>
                <p className="text-slate-700 italic">"{report.comment}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}:</span>
      <span className="font-medium text-slate-800">{value ?? "—"}</span>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Events.tsx

```
import { useState } from "react";
import { useEvents } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { School, MapPin, User, Truck } from "lucide-react";
import AddressLink from "../components/AddressLink";
import PhoneLink from "../components/PhoneLink";
import { useSelectedCity } from "../context/CityContext";

interface AuthUser {
  id: string;
  name: string;
  role: string;
}

interface CrewMember {
  id: string;
  name: string;
}

interface EventListItem {
  id: string;
  project: string;
  date: string;
  time?: string | null;
  status: string;
  address?: string | null;
  contactPerson?: string | null;
  contactPhone?: string | null;
  school?: { id: string; name: string; type: string } | null;
  city?: { id: string; name: string } | null;
  crew?: {
    host?: CrewMember | null;
    driver?: CrewMember | null;
  } | null;
}

const STATUS_LABELS: Record<string, string> = {
  BASE: "База",
  FIRST_CONTACT: "Перший контакт",
  INTERESTED: "Зацікавлений",
  PRE_APPROVAL: "Попереднє погодження",
  DATE_CONFIRMED: "Дата підтверджена",
  PREPARATION: "Підготовка",
  IN_PROGRESS: "В роботі",
  DONE: "Проведено",
  REPORT: "Звіт",
  RE_SALE: "Повторний продаж",
};

const STATUS_COLORS: Record<string, string> = {
  BASE: "bg-slate-100 text-slate-600",
  FIRST_CONTACT: "bg-sky-50 text-sky-700",
  INTERESTED: "bg-indigo-50 text-indigo-700",
  PRE_APPROVAL: "bg-amber-50 text-amber-700",
  DATE_CONFIRMED: "bg-emerald-50 text-emerald-700",
  PREPARATION: "bg-violet-50 text-violet-700",
  IN_PROGRESS: "bg-blue-50 text-blue-700",
  DONE: "bg-green-50 text-green-700",
  REPORT: "bg-teal-50 text-teal-700",
  RE_SALE: "bg-pink-50 text-pink-700",
};

const FIELD_ROLES = ["DRIVER", "HOST"];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Events() {
  const navigate = useNavigate();
  const [user] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const { selectedCity } = useSelectedCity();
  const { data: events = [], isLoading, isError } = useEvents();
  const error = isError ? "Не вдалося завантажити список подій" : "";

  const isFieldStaff = !!user && FIELD_ROLES.includes(user.role);
  const filteredEvents = selectedCity.id
    ? events.filter((ev) => ev.city?.id === selectedCity.id)
    : events;
  const title = isFieldStaff ? "Мої події" : "Розклад подій";
  const subtitle = isFieldStaff
    ? "Події, на які вас призначив менеджер"
    : "Всі заплановані та проведені події";

  const goToEvent = (ev: EventListItem) => {
    if (ev.school?.id) navigate(`/schools/${ev.school.id}`);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {title}
            {selectedCity.id && !isFieldStaff && (
              <span className="ml-2 text-base font-normal text-blue-500">
                · {selectedCity.name}
              </span>
            )}
          </h1>{" "}
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>
        {!isFieldStaff && (
          <button
            onClick={() => navigate("/schools")}
            className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            + Додати подію
          </button>
        )}
      </div>

      {isLoading && (
        <div className="text-center text-slate-400 py-16">Завантаження...</div>
      )}

      {!isLoading && error && (
        <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      {!isLoading && !error && filteredEvents.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
          {isFieldStaff
            ? "Поки що немає подій, на які вас призначено."
            : "Подій ще немає."}
        </div>
      )}

      {!isLoading && !error && filteredEvents.length > 0 && (
        <>
          {/* Картки — мобільний вигляд */}
          <div className="md:hidden flex flex-col gap-3">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => goToEvent(ev)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer active:bg-slate-50"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-gray-800">{ev.project}</p>
                  <span
                    className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      STATUS_COLORS[ev.status] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {STATUS_LABELS[ev.status] ?? ev.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(ev.date)}
                  {ev.time ? `, ${ev.time}` : ""} · {ev.city?.name ?? "—"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <School className="w-3 h-3 shrink-0" /> {ev.school?.name ?? "—"}
                </p>
                {ev.address && (
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" /> <AddressLink address={ev.address} />
                  </p>
                )}
                {(ev.crew?.host || ev.crew?.driver) && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <User className="w-3 h-3 shrink-0" /> {ev.crew?.host?.name ?? "—"} <Truck className="w-3 h-3 shrink-0" />{" "}
                    {ev.crew?.driver?.name ?? "—"}
                  </p>
                )}
                {isFieldStaff && (ev.contactPerson || ev.contactPhone) && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {ev.contactPerson ?? "—"}
                    {ev.contactPhone ? (
                      <>
                        {" "}
                        · <PhoneLink phone={ev.contactPhone} />
                      </>
                    ) : null}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Таблиця — десктоп */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-medium text-gray-600">Подія</th>
                  <th className="p-4 font-medium text-gray-600">Дата</th>
                  <th className="p-4 font-medium text-gray-600">Локація</th>
                  <th className="p-4 font-medium text-gray-600">Екіпаж</th>
                  <th className="p-4 font-medium text-gray-600">Статус</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((ev) => (
                  <tr
                    key={ev.id}
                    onClick={() => goToEvent(ev)}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition cursor-pointer"
                  >
                    <td className="p-4 text-gray-800 font-medium">
                      {ev.project}
                      <div className="text-xs text-gray-400 font-normal mt-0.5">
                        {ev.school?.name ?? "—"}
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      {formatDate(ev.date)}
                      {ev.time && (
                        <div className="text-xs text-gray-400">{ev.time}</div>
                      )}
                    </td>
                    <td className="p-4 text-gray-600">
                      {ev.city?.name ?? "—"}
                      {ev.address && (
                        <div className="text-xs text-gray-400">
                          <AddressLink address={ev.address} />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      <div className="flex items-center gap-1"><User className="w-3 h-3 shrink-0" /> {ev.crew?.host?.name ?? "—"}</div>
                      <div className="flex items-center gap-1"><Truck className="w-3 h-3 shrink-0" /> {ev.crew?.driver?.name ?? "—"}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          STATUS_COLORS[ev.status] ??
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {STATUS_LABELS[ev.status] ?? ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Finance.tsx

```
import { useState, useEffect, lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";

const FinanceCharts = lazy(() => import("../components/finance/FinanceCharts"));
const StaffFinanceView = lazy(
  () => import("../components/finance/StaffFinanceView"),
);

function FinanceSkeleton() {
  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-xl w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-white rounded-2xl border border-slate-100"
          />
        ))}
      </div>
      <div className="h-64 bg-white rounded-2xl border border-slate-100" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-48 bg-white rounded-2xl border border-slate-100" />
        <div className="h-48 bg-white rounded-2xl border border-slate-100" />
      </div>
    </div>
  );
}

export default function Finance() {
  const { selectedCity } = useSelectedCity();
  const { user: currentUser } = useAuth();
  const [period, setPeriod] = useState("year");
  const [projectFilter, setProjectFilter] = useState("");
  const [myBalance, setMyBalance] = useState<number | null>(null);

  const isManagerOrAdmin =
    currentUser?.role === "MANAGER" || currentUser?.role === "SUPERADMIN";

   useEffect(() => {
    if (isManagerOrAdmin === false) {
      api
        .get("/finance/my-balance")
        .then((r) => setMyBalance(r.data.balance))
        .catch(() => {});
    }
  }, [isManagerOrAdmin]);

  const { data, isLoading } = useQuery({
    queryKey: ["finance", selectedCity.id, period, projectFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (period) params.set("period", period);
      if (selectedCity?.id) params.set("cityId", selectedCity.id);
      if (projectFilter) params.set("project", projectFilter);
      const res = await api.get(`/finance/dashboard?${params}`);
      return res.data;
    },
    enabled: !!isManagerOrAdmin,
    staleTime: 5 * 60 * 1000,
  });
  
  if (!isManagerOrAdmin) {
    return (
      <Suspense fallback={<FinanceSkeleton />}>
        <StaffFinanceView myBalance={myBalance} selectedCity={selectedCity} />
      </Suspense>
    );
  }

  if (isLoading || !data) return <FinanceSkeleton />;

  return (
    <Suspense fallback={<FinanceSkeleton />}>
      <FinanceCharts
        data={data}
        period={period}
        setPeriod={setPeriod}
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        selectedCity={selectedCity}
      />
    </Suspense>
  );
}

```

# FILE: apps/frontend/src/pages/Kindergartens.tsx

```
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import {
  useSchools,
  useSchoolStats,
  useDeleteSchool,
  usePrefetchSchool,
  useSupportedCities,
} from "../hooks/useApi";
import { useCities } from "../hooks/useCities";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import VirtualSchoolList from "../components/VirtualSchoolList";
import { SchoolCard } from "../components/schools/SchoolMobileList";
import type { SchoolContact } from "../types";
import { useAuth } from "../context/AuthContext";
import { Download } from "lucide-react";
import { PIPELINE_STAGES } from "../constants/pipelineStages";

interface NewSchoolPayload {
  name: string;
  cityId: string;
  sourceUrl: string;
  director: string;
  phone: string;
  type: string;
}

const StatsBar = lazy(() => import("../components/schools/StatsBar"));
const VirtualDesktopTable = lazy(
  () => import("../components/schools/VirtualDesktopTable"),
);

export default function Kindergartens() {
  const { selectedCity } = useSelectedCity();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const userRole = user?.role ?? null;
  const qc = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    cityId: "",
    sourceUrl: "",
    director: "",
    phone: "",
  });
  const [matchedContacts, setMatchedContacts] = useState<SchoolContact[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; url: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dotCount, setDotCount] = useState(3);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addSchoolMutation = useMutation({
    mutationFn: (newSchool: NewSchoolPayload) =>
      api.post("/schools", newSchool),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      setIsModalOpen(false);
    },
    onError: () => alert("Не вдалося створити садочок"),
  });

  const bulkImportMutation = useMutation({
    mutationFn: (cityId: string) =>
      api.post(
        "/schools/bulk-import",
        { cityId, type: "Садочок" },
        { timeout: 120000 },
      ),
    onSuccess: (res) => {
      alert(
        `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
      );
      qc.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: () => alert("Помилка імпорту."),
  });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const schoolFilters = useMemo(
    () => ({
      search: debouncedQuery || undefined,
      cityId: selectedCity.id || undefined,
      type: "Садочок" as const,
      stage: (activeFilter as any) || undefined,
      size: (sizeFilter as any) || undefined,
    }),
    [debouncedQuery, selectedCity.id, activeFilter, sizeFilter],
  );

  const {
    data: schoolsPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSchools(schoolFilters);
  const { data: stats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: "Садочок",
    stage: (activeFilter as any) || undefined,
  });
  const { data: cities = [] } = useCities();
  const { data: supportedCities = [] } = useSupportedCities();
  const deleteSchool = useDeleteSchool();
  const prefetchSchool = usePrefetchSchool();

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const filteredSchools = useMemo(
    () => schoolsPages?.pages.flatMap((p) => p.data) ?? [],
    [schoolsPages],
  );
  const totalItems = schoolsPages?.pages[0]?.meta.totalItems ?? 0;

  const handleOpenModal = useCallback(() => {
    setForm({
      name: "",
      cityId: selectedCity.id || cities[0]?.id || "",
      sourceUrl: "",
      director: "",
      phone: "",
    });
    setMatchedContacts([]);
    setIsModalOpen(true);
  }, [selectedCity.id, cities]);

  const fetchContacts = async (schoolName: string) => {
    if (!schoolName || schoolName.trim().length < 1)
      return setMatchedContacts([]);
    const currentCityName =
      selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
    if (currentCityName.toLowerCase() !== "львів")
      return setMatchedContacts([]);
    try {
      const data = await qc.fetchQuery<SchoolContact[]>({
        queryKey: ["schoolContacts", schoolName, currentCityName],
        queryFn: async () => {
          const res = await api.get<SchoolContact[]>(
            `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Садочок`,
          );
          return res.data;
        },
        staleTime: 1000 * 60 * 5,
      });

      setMatchedContacts(data);
      if (data.length > 0) {
        const director =
          data.find(
            (c: SchoolContact) =>
              c.role?.includes("Директор") || c.role?.includes("Завідувач"),
          ) || data[0];
        setForm((f) => ({
          ...f,
          director: director.contactName,
          phone: director.phone,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNameChange = (value: string) => {
    setForm({ ...form, name: value });
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (value.length < 2) {
      setShowSuggestions(false);
      setIsSearching(false);
      setMatchedContacts([]);
      return;
    }
    setIsSearching(true);
    setShowSuggestions(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const [externalData] = await Promise.all([
          qc.fetchQuery({
            queryKey: ["schoolSearchExternal", value],
            queryFn: async () => {
              const res = await api.get(
                `/schools/search?q=${encodeURIComponent(value)}&type=Садочок`,
              );
              return res.data;
            },
            staleTime: 1000 * 60 * 5,
          }),
          fetchContacts(value),
        ]);
        setSuggestions(externalData);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  const handleSelectSuggestion = (name: string, url: string) => {
    setForm({ ...form, name, sourceUrl: url });
    setShowSuggestions(false);
    fetchContacts(name);
  };

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.cityId) return;
    addSchoolMutation.mutate({ ...form, type: "Садочок" });
  };

  const handleDeleteSchool = useCallback(
    async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
      e.stopPropagation();
      if (userRole !== "SUPERADMIN") return;
      if (
        !window.confirm(
          `Видалити садочок "${schoolName}"? Це видалить також усі його події.`,
        )
      )
        return;
      await deleteSchool.mutateAsync(schoolId);
    },
    [deleteSchool, userRole],
  );

  return (
    <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-800 leading-tight">
            Садочки
            {selectedCity.id && (
              <span className="ml-2 text-sm font-normal text-blue-500">
                · {selectedCity.name}
              </span>
            )}
          </h1>
        </div>
        <div className="flex gap-2 shrink-0">
          {(userRole === "SUPERADMIN" || userRole === "MANAGER") && (
            <button
              onClick={() => {
                if (!selectedCity.id) return alert("Спочатку оберіть місто");
                if (!supportedCities.includes(selectedCity.name))
                  return alert(
                    `Місто "${selectedCity.name}" не підтримується для імпорту.`,
                  );
                if (
                  !window.confirm(
                    `Імпортувати всі садочки з isuo.org для міста ${selectedCity.name}?`,
                  )
                )
                  return;

                setDotCount(3);
                const dotInterval = setInterval(() => {
                  setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
                }, 500);

                bulkImportMutation.mutate(selectedCity.id, {
                  onSettled: () => clearInterval(dotInterval),
                });
              }}
              disabled={bulkImportMutation.isPending}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-70 transition-all"
            >
              {bulkImportMutation.isPending ? (
                <span className="font-medium">
                  Імпортую{"·".repeat(dotCount)}
                </span>
              ) : (
                <><Download className="w-4 h-4" /> Імпорт з isuo</>
              )}
            </button>
          )}
          <button
            onClick={handleOpenModal}
            className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Додати
          </button>
        </div>
      </div>

      <div className="shrink-0">
        <Suspense
          fallback={
            <div className="h-[72px] bg-white rounded-2xl animate-pulse mb-4" />
          }
        >
          <StatsBar
            statusStats={
              stats?.statusStats ?? {
                new: 0,
                planned: 0,
                inProgress: 0,
                done: 0,
              }
            }
            sizeStats={stats?.sizeStats ?? { small: 0, medium: 0, large: 0 }}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sizeFilter={sizeFilter}
            onSizeFilterChange={setSizeFilter}
            schoolType="Садочок"
          />
        </Suspense>
      </div>

      <div className="relative shrink-0 mb-4 mt-2">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук за назвою садочка..."
          className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border-none sm:border sm:border-slate-200 rounded-2xl sm:rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <p className="text-xs font-semibold text-slate-400 mb-4 shrink-0 uppercase tracking-wide px-1">
        {`${filteredSchools.length} з ${totalItems} садочків`}
        {(activeFilter || sizeFilter) && (
          <button
            onClick={() => {
              setActiveFilter(null);
              setSizeFilter(null);
            }}
            className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
          >
            скинути фільтри
          </button>
        )}
      </p>

      {isLoading ? (
        <div className="flex flex-col gap-2.5 flex-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-3.5 animate-pulse"
              style={{ opacity: 1 - i * 0.1 }}
            >
              <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
                <div className="h-3 bg-slate-100 rounded-lg w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="md:hidden flex-1 w-full overflow-hidden">
            <VirtualSchoolList
              schools={filteredSchools}
              itemHeight={110}
              onEndReached={handleLoadMore}
              animationKey={`${activeFilter}-${sizeFilter}`}
              renderItem={(school, index) => (
                <div
                  className="pb-2.5"
                  onMouseEnter={() => prefetchSchool(school.id)}
                >
                  <SchoolCard
                    school={school}
                    index={index}
                    onDelete={handleDeleteSchool}
                    stages={PIPELINE_STAGES}
                  />
                </div>
              )}
            />
          </div>

          <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0">
            <Suspense
              fallback={<div className="flex-1 animate-pulse bg-slate-50" />}
            >
              <VirtualDesktopTable
                schools={filteredSchools}
                searchQuery={searchQuery}
                onDelete={handleDeleteSchool}
                stages={PIPELINE_STAGES}
                onEndReached={handleLoadMore}
              />
            </Suspense>
          </div>
        </>
      )}

      <button
        onClick={handleOpenModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
      >
        +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold text-slate-800">
                Новий садочок
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 -mr-2 leading-none text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleAddSchool}
              className="p-6 flex flex-col gap-4 overflow-y-auto"
            >
              <div className="relative">
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Назва садочка
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  placeholder="Наприклад: Садочок №1"
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {showSuggestions && (
                  <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
                    {isSearching ? (
                      <li className="px-4 py-3 text-sm text-slate-400 italic">
                        Пошук...
                      </li>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((s, i) => (
                        <li
                          key={i}
                          onMouseDown={() =>
                            handleSelectSuggestion(s.name, s.url)
                          }
                          className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer font-medium border-b border-slate-50 last:border-0"
                        >
                          {s.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-slate-400 italic">
                        Нічого не знайдено
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {!selectedCity.id && (
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Місто
                  </label>
                  <select
                    value={form.cityId}
                    onChange={(e) =>
                      setForm({ ...form, cityId: e.target.value })
                    }
                    required
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">— Оберіть місто —</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Контакт{" "}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    (автозаповнення)
                  </span>
                </label>
                {matchedContacts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {matchedContacts.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            director: c.contactName,
                            phone: c.phone,
                          }))
                        }
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                      >
                        {c.role ? `${c.role}: ` : ""}
                        {c.contactName}
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={form.director}
                  onChange={(e) =>
                    setForm({ ...form, director: e.target.value })
                  }
                  placeholder="Микола Петренко"
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Телефон
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0671234567"
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-5 py-3.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={addSchoolMutation.isPending}
                  className="flex-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Login.tsx

```
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { api } from "../config/api";

const CIRCLE_VARIANTS = {
  hidden: { scale: 0, opacity: 1 },
  visible: {
    scale: 1,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
};

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginProps {
  onLogin?: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const proceedAfterLogin = () => {
    if (onLogin && loggedInUser) {
      onLogin(loggedInUser);
    } else {
      navigate("/cities");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });

      setLoggedInUser(response.data.user);
      setIsTransitioning(true);
    } catch {
      setError("Невірний email або пароль");
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            variants={CIRCLE_VARIANTS}
            initial="hidden"
            animate="visible"
            onAnimationComplete={proceedAfterLogin}
            style={{
              width: "300vmax",
              height: "300vmax",
              borderRadius: "9999px",
              willChange: "transform",
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-blue-600"
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={
          isTransitioning
            ? { opacity: 0, scale: 0.97 }
            : shake
              ? { x: [-10, 10, -10, 10, 0], opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.4 }}
        className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Вхід у CRM
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileTap={{ scale: 0.97 }}
            className="mt-2 bg-blue-600 text-white font-medium p-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-[42px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLoading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.7,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                  />
                  Вхід...
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Увійти
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/NotFound.tsx

```
import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle px-4">
      <div className="max-w-md w-full bg-surface rounded-card shadow-card border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-subtle flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7 text-brand" />
        </div>
        <h1 className="text-xl font-bold text-content-primary mb-2">
          Сторінку не знайдено
        </h1>
        <p className="text-sm text-content-muted mb-6">
          Можливо, її було переміщено або видалено.
        </p>
        <Button onClick={() => navigate("/")}>
          На головну
        </Button>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/SchoolProfile.tsx

```
import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import {
  useSchool,
  useSchoolEvents,
  useUsers,
  useUpdateEventStatus,
  useUpdatePreparation,
  useAssignCrew,
  useSubmitReport,
  useAddComment,
  useUpdateHistoryComment,
  useEventFull,
  useSchoolCompletedEvents,
  useUpdateSchool,
  useCreateEvent,
} from "../hooks/useSchoolProfile";

import type { Event, User } from "../types";
import type { ReportData } from "../components/school-profile/modals/ReportModal";

import SchoolProfileHeader from "../components/school-profile/SchoolProfileHeader";
import CompletedEventModal from "../components/school-profile/CompletedEventModal";

const Pipeline = lazy(() => import("../components/school-profile/Pipeline"));
const HistoryTimeline = lazy(
  () => import("../components/school-profile/HistoryTimeline"),
);
const EventDetails = lazy(
  () => import("../components/school-profile/EventDetails"),
);
const SchoolInfoCard = lazy(
  () => import("../components/school-profile/SchoolInfoCard"),
);
const EventsTable = lazy(
  () => import("../components/school-profile/EventsTable"),
);
const EventPreparation = lazy(
  () => import("../components/school-profile/EventPreparation"),
);
const AssignedCrew = lazy(
  () => import("../components/school-profile/AssignedCrew"),
);

import EditSchoolModal from "../components/school-profile/modals/EditSchoolModal";
import EventModal from "../components/school-profile/modals/EventModal";
import CommentModal from "../components/school-profile/modals/CommentModal";
import type { EventFormValues } from "../components/school-profile/modals/EventSchema";
import type { SchoolEditFormValues } from "../components/school-profile/modals/SchoolEditSchema";
import CrewModal from "../components/school-profile/modals/CrewModal";
import ReportModal from "../components/school-profile/modals/ReportModal";

const PIPELINE_STAGES = [
  { id: 1, key: "BASE", name: "Новий заклад" },
  { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
  { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
  { id: 4, key: "PREPARATION", name: "Оголошення" },
  { id: 5, key: "IN_PROGRESS", name: "Підготовка" },
  { id: 6, key: "DONE", name: "Проведення заходу" },
  { id: 7, key: "REPORT", name: "Звіт" },
] as const;

export default function SchoolProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isLeavingPage, setIsLeavingPage] = useState(false);

  const { data: schoolRaw } = useSchool(id);
  const { data: eventsRaw = [] } = useSchoolEvents(id, false);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [exitingEventId, setExitingEventId] = useState<string | null>(null);

  const { data: eventFull, isLoading: eventFullLoading } = useEventFull(
    selectedEventId ?? eventsRaw[0]?.id,
  );

  const { data: users = [] } = useUsers();
  const { data: completedEvents = [] } = useSchoolCompletedEvents(id);
  const [selectedReportEvent, setSelectedReportEvent] = useState<Event | null>(
    null,
  );
  const updateStatus = useUpdateEventStatus();
  const updatePreparation = useUpdatePreparation();
  const assignCrewMutation = useAssignCrew();
  const submitReportMutation = useSubmitReport();
  const addCommentMutation = useAddComment();
  const updateHistoryMutation = useUpdateHistoryComment();

  const schoolData = useMemo(() => {
    if (!schoolRaw) {
      return {
        id: "",
        cityId: "",
        name: "",
        type: "Школа",
        city: "",
        address: "",
        director: "",
        phone: "",
        email: "",
        childrenCount: 0,
        notes: "",
      };
    }

    return {
      id: schoolRaw.id,
      cityId: schoolRaw.cityId,
      name: schoolRaw.name || "",
      type: schoolRaw.type || "Школа",
      city: schoolRaw.city?.name || "",
      address: schoolRaw.address || "",
      director: schoolRaw.director || "",
      phone: schoolRaw.phone || "",
      email: schoolRaw.email || "",
      childrenCount: schoolRaw.childrenCount || 0,
      notes: schoolRaw.notes || "",
    };
  }, [schoolRaw]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [commentModal, setCommentModal] = useState({
    isOpen: false,
    mode: "pipeline",
    stepId: null as number | null,
    historyId: null as string | null,
    text: "",
  });

  const currentEventBase = useMemo(
    () => eventsRaw.find((ev) => ev.id === selectedEventId) ?? eventsRaw[0],
    [eventsRaw, selectedEventId],
  );

  const currentEvent = useMemo(() => {
    if (!currentEventBase) return null;
    if (eventFull?.id === currentEventBase.id) {
      return { ...currentEventBase, ...eventFull };
    }
    return currentEventBase;
  }, [currentEventBase, eventFull]);
  const currentStageIndex = useMemo(() => {
    if (!currentEvent?.status) return 0;
    const idx = PIPELINE_STAGES.findIndex(
      (s) => s.key === currentEvent?.status,
    );
    return idx !== -1 ? idx : 0;
  }, [currentEvent?.status]);
  const creatorName = useMemo(
    () =>
      currentEvent?.history?.length > 0
        ? currentEvent.history[currentEvent.history.length - 1].userName
        : "Немає даних",
    [currentEvent?.history],
  );

  const handlePipelineClick = useCallback(
    (stepId: number) => {
      if (!currentEvent) return;
      const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
      if (nextStage?.id !== stepId) return;
      if (nextStage.key === "REPORT") return setIsReportModalOpen(true);
      setCommentModal({
        isOpen: true,
        mode: "pipeline",
        stepId: nextStage.id,
        historyId: null,
        text: "",
      });
    },
    [currentEvent, currentStageIndex],
  );

  const handleHistoryClick = useCallback(
    (historyItem: { id: string; comment?: string }) => {
      setCommentModal({
        isOpen: true,
        mode: "history",
        stepId: null,
        historyId: historyItem.id,
        text: historyItem.comment || "",
      });
    },
    [],
  );

  const handleAddCommentClick = useCallback(() => {
    setCommentModal({
      isOpen: true,
      mode: "add_comment",
      stepId: null,
      historyId: null,
      text: "",
    });
  }, []);

  const handleSaveComment = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (commentModal.mode === "pipeline") {
        const activeStage = PIPELINE_STAGES[currentStageIndex];
        const nextStage = PIPELINE_STAGES[currentStageIndex + 1];
        if (!nextStage || !currentEvent) return;

        await updateStatus.mutateAsync({
          eventId: currentEvent.id,
          status: nextStage.key,
          actionName: `Етап пройдено: ${activeStage.name}`,
          comment: commentModal.text,
        });
        if (nextStage.key === "RE_SALE") {
          setExitingEventId(currentEvent.id);
          setTimeout(() => {
            setSelectedEventId(null);
            setExitingEventId(null);
          }, 500);
        }
      } else if (commentModal.mode === "add_comment") {
        await addCommentMutation.mutateAsync({
          eventId: currentEvent.id,
          comment: commentModal.text,
        });
      } else if (commentModal.mode === "history" && commentModal.historyId) {
        await updateHistoryMutation.mutateAsync({
          historyId: commentModal.historyId,
          comment: commentModal.text,
          eventId: currentEvent.id,
        });
      }
      setCommentModal({
        isOpen: false,
        mode: "pipeline",
        stepId: null,
        historyId: null,
        text: "",
      });
    },
    [
      commentModal,
      currentEvent,
      currentStageIndex,
      updateStatus,
      addCommentMutation,
      updateHistoryMutation,
    ],
  );

  const updateSchoolMutation = useUpdateSchool();
  const createEventMutation = useCreateEvent();

  const handleSaveEvent = useCallback(
    async (data: EventFormValues) => {
      if (!schoolData.id) return;

      const payload = {
        ...data,
        schoolId: schoolData.id,
        cityId: schoolData.cityId,
        childrenPlanned: Number(data.childrenPlanned) || 0,
        price: Number(data.price) || 0,
      };

      const newEvent = await createEventMutation.mutateAsync(payload);

      setIsEventModalOpen(false);
      setSelectedEventId(newEvent.id);
    },
    [schoolData, createEventMutation],
  );

  const handleSaveSchoolInfo = useCallback(
    async (data: SchoolEditFormValues) => {
      if (!id) return;

      await updateSchoolMutation.mutateAsync({
        ...data,
        childrenCount: Number(data.childrenCount) || 0,
        id,
      });
      setIsEditModalOpen(false);
    },
    [id, updateSchoolMutation],
  );

  const editDefaultValues = useMemo<SchoolEditFormValues>(
    () => ({
      type: (schoolData.type as "Школа" | "Садочок") || "Школа",
      address: schoolData.address,
      director: schoolData.director,
      phone: schoolData.phone,
      email: schoolData.email,
      childrenCount: schoolData.childrenCount
        ? String(schoolData.childrenCount)
        : "",
    }),
    [schoolData],
  );

  const handleUpdatePreparation = useCallback(
    async (field: string, status: "PLANNED" | "IN_PROGRESS" | "DONE") => {
      if (!currentEvent) return;
      await updatePreparation.mutateAsync({
        eventId: currentEvent.id,
        field,
        status,
      });
    },
    [currentEvent, updatePreparation],
  );

  const handleSubmitReport = useCallback(
    async (reportData: ReportData) => {
      if (!currentEvent) return;
      setIsReportModalOpen(false);
      setExitingEventId(currentEvent.id);
      await submitReportMutation.mutateAsync({
        eventId: currentEvent.id,
        reportData,
      });
      setIsLeavingPage(true);
      setTimeout(() => {
        navigate("/schools");
      }, 300);
    },
    [currentEvent, submitReportMutation, navigate],
  );

  const handleAssignCrew = useCallback(
    async (crewId: string) => {
      if (!currentEvent) return;

      setIsCrewModalOpen(false);

      await Promise.all([
        assignCrewMutation.mutateAsync({
          eventId: currentEvent.id,
          crewId,
        }),
        updatePreparation.mutateAsync({
          eventId: currentEvent.id,
          field: "assignCrew",
          status: "DONE",
        }),
      ]);
    },
    [currentEvent, assignCrewMutation, updatePreparation],
  );

  const events = eventsRaw;

  const openAddEventModal = useCallback(() => {
    setIsEventModalOpen(true);
  }, []);

  const eventDefaultValues = useMemo<Partial<EventFormValues>>(
    () => ({
      project: "Голограма для школи",
      time: "11:00",
      address: schoolData.address,
      contactPerson: schoolData.director,
      contactPhone: schoolData.phone,
      childrenPlanned: String(schoolData.childrenCount),
    }),
    [schoolData],
  );
  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: 0.1 + i * 0.07, ease: "easeOut" },
  });

  return (
    <motion.div
      animate={{ opacity: isLeavingPage ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans w-full overflow-x-hidden pb-24 md:pb-8"
    >
      <SchoolProfileHeader
        schoolData={schoolData}
        onEdit={() => setIsEditModalOpen(true)}
        onAddEvent={openAddEventModal}
      />

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Ліва колонка */}
        <div className="w-full xl:w-80 flex flex-col gap-6">
          <motion.div {...stagger(0)}>
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
              }
            >
              <SchoolInfoCard schoolData={schoolData} />
            </Suspense>
          </motion.div>

          <AnimatePresence>
            {currentEvent &&
              currentStageIndex >= 1 &&
              exitingEventId !== currentEvent.id && (
              <motion.div
                key="responsible"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
              >
                <h3 className="font-bold text-slate-800 mb-4">
                  Відповідальна особа
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-slate-500">Остання дія:</span>
                    <span className="font-medium text-blue-600">
                      {creatorName}
                    </span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div {...stagger(1)}>
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
              }
            >
              <HistoryTimeline
                currentEvent={
                  eventFullLoading ? currentEventBase : currentEvent
                }
                onHistoryClick={handleHistoryClick}
                onAddCommentClick={handleAddCommentClick}
              />
            </Suspense>
          </motion.div>
        </div>

        {/* Права колонка */}
        <motion.div
          className={`flex-1 flex flex-col gap-6 transition-all duration-500 ease-in-out transform origin-top ${
            exitingEventId === currentEvent?.id
              ? "opacity-0 scale-95 -translate-y-4 pointer-events-none"
              : ""
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {currentEvent && (
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl h-24 animate-pulse border border-slate-100" />
              }
            >
              <Pipeline
                currentStageIndex={currentStageIndex}
                currentEvent={currentEvent}
                onPipelineClick={handlePipelineClick}
                stages={PIPELINE_STAGES}
              />
            </Suspense>
          )}

          <AnimatePresence>
            {currentEvent &&
              currentStageIndex >= 4 &&
              exitingEventId !== currentEvent.id && (
              <motion.div
                key="preparation"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 xl:grid-cols-2 gap-6"
              >
                {eventFullLoading ? (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse h-48" />
                ) : (
                  <Suspense
                    fallback={
                      <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
                    }
                  >
                    <EventPreparation
                      data={currentEvent.preparation || {}}
                      onUpdate={handleUpdatePreparation}
                      onOpenCrewModal={() => setIsCrewModalOpen(true)}
                    />
                  </Suspense>
                )}
                <Suspense
                  fallback={
                    <div className="bg-white rounded-2xl h-48 animate-pulse border border-slate-100" />
                  }
                >
                  <AssignedCrew currentEvent={currentEvent} employees={users} />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div {...stagger(2)}>
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
              }
            >
              <EventDetails
                currentEvent={currentEvent}
                schoolName={schoolData.name}
                cityId={schoolData.cityId}
                onEventUpdated={() =>
                  qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
                }
              />
            </Suspense>
          </motion.div>

          <motion.div {...stagger(3)}>
            <Suspense
              fallback={
                <div className="bg-white rounded-2xl h-32 animate-pulse border border-slate-100" />
              }
            >
              <EventsTable
                events={events}
                selectedEventId={selectedEventId}
                onEventSelect={setSelectedEventId}
                onDeleteSuccess={() =>
                  qc.invalidateQueries({ queryKey: ["schoolEvents", id] })
                }
                schoolId={schoolData.id}
              />
            </Suspense>
            {completedEvents.length > 0 && (
              <motion.div {...stagger(4)}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800">
                      Завершені події ({completedEvents.length})
                    </h3>
                  </div>
                  <div className="md:hidden divide-y divide-slate-50">
                    {completedEvents.map((ev: Event) => (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedReportEvent(ev)}
                        className="flex items-center justify-between gap-3 p-4 active:bg-slate-50 cursor-pointer"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-blue-600 truncate">
                            {ev.project}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {new Date(ev.date).toLocaleDateString("uk-UA")}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            👶{" "}
                            {ev.report?.childrenCount ||
                              ev.childrenPlanned ||
                              "—"}{" "}
                            дітей
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-semibold text-slate-800 text-sm">
                            {new Intl.NumberFormat("uk-UA").format(
                              ev.report?.totalSum || ev.price || 0,
                            )}{" "}
                            грн
                          </p>
                          <p className="text-xs font-medium text-emerald-600 mt-0.5">
                            +
                            {new Intl.NumberFormat("uk-UA").format(
                              ev.report?.remainderSum || 0,
                            )}{" "}
                            грн
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                          <th className="p-4">Проєкт</th>
                          <th className="p-4">Дата</th>
                          <th className="p-4">Дітей</th>
                          <th className="p-4">Виручка</th>
                          <th className="p-4">Прибуток</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedEvents.map((ev: any) => (
                          <tr
                            key={ev.id}
                            onClick={() => setSelectedReportEvent(ev)}
                            className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <td className="p-4 text-slate-700 font-medium">
                              {ev.project}
                            </td>
                            <td className="p-4 text-slate-600">
                              {new Date(ev.date).toLocaleDateString("uk-UA")}
                            </td>
                            <td className="p-4 font-medium">
                              {ev.report?.childrenCount ||
                                ev.childrenPlanned ||
                                "—"}
                            </td>
                            <td className="p-4 font-medium text-slate-800">
                              {new Intl.NumberFormat("uk-UA").format(
                                ev.report?.totalSum || ev.price || 0,
                              )}{" "}
                              грн
                            </td>
                            <td className="p-4 font-medium text-emerald-600">
                              {new Intl.NumberFormat("uk-UA").format(
                                ev.report?.remainderSum || 0,
                              )}{" "}
                              грн
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Мобільна FAB */}
      <button
        onClick={openAddEventModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 active:scale-95 transition-transform"
      >
        +
      </button>

      {/* Модальні вікна */}
      <EditSchoolModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultValues={editDefaultValues}
        onSave={handleSaveSchoolInfo}
      />
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        defaultValues={eventDefaultValues}
        onSave={handleSaveEvent}
      />
      <CommentModal
        isOpen={commentModal.isOpen}
        onClose={() => setCommentModal({ ...commentModal, isOpen: false })}
        mode={commentModal.mode}
        text={commentModal.text}
        setText={(t) => setCommentModal({ ...commentModal, text: t })}
        onSave={handleSaveComment}
      />
      <CrewModal
        isOpen={isCrewModalOpen}
        onClose={() => setIsCrewModalOpen(false)}
        city={schoolData.city}
        eventDate={currentEvent?.date}
        employees={users}
        onSave={handleAssignCrew}
      />
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSave={handleSubmitReport}
        schoolName={schoolData.name}
        eventType={currentEvent?.project}
        eventDate={currentEvent?.date}
        eventIndex={
          events
            .filter((e) => e.schoolId === schoolData.id)
            .findIndex((e) => e.id === currentEvent?.id) + 1
        }
        crew={
          currentEvent?.crew
            ? {
                host: currentEvent.crew.hostId
                  ? (users.find(
                      (u: User) => u.id === currentEvent.crew.hostId,
                    ) ?? null)
                  : (currentEvent.crew.host ?? null),
                driver: currentEvent.crew.driverId
                  ? (users.find(
                      (u: User) => u.id === currentEvent.crew.driverId,
                    ) ?? null)
                  : (currentEvent.crew.driver ?? null),
              }
            : undefined
        }
      />
      <CompletedEventModal
        isOpen={!!selectedReportEvent}
        onClose={() => setSelectedReportEvent(null)}
        event={selectedReportEvent}
      />
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/pages/Schools.tsx

```
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import {
  useSchools,
  useSchoolStats,
  useDeleteSchool,
  usePrefetchSchool,
  useSupportedCities,
} from "../hooks/useApi";
import { useCities } from "../hooks/useCities";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import VirtualSchoolList from "../components/VirtualSchoolList";
import { SchoolCard } from "../components/schools/SchoolMobileList";
import type { SchoolContact } from "../types";
import { useAuth } from "../context/AuthContext";
import { Download } from "lucide-react";
import { PIPELINE_STAGES } from "../constants/pipelineStages";
interface NewSchoolPayload {
  name: string;
  cityId: string;
  sourceUrl: string;
  director: string;
  phone: string;
  type: string;
}

const StatsBar = lazy(() => import("../components/schools/StatsBar"));
const VirtualDesktopTable = lazy(
  () => import("../components/schools/VirtualDesktopTable"),
);
interface City {
  id: string;
  name: string;
}

export default function Schools() {
  const { selectedCity } = useSelectedCity();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const userRole = user?.role ?? null;
  const qc = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    cityId: "",
    sourceUrl: "",
    director: "",
    phone: "",
  });
  const [matchedContacts, setMatchedContacts] = useState<SchoolContact[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { name: string; url: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [dotCount, setDotCount] = useState(3);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addSchoolMutation = useMutation({
    mutationFn: (newSchool: NewSchoolPayload) =>
      api.post("/schools", newSchool),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      setIsModalOpen(false);
    },
    onError: () => alert("Не вдалося створити заклад"),
  });

  const bulkImportMutation = useMutation({
    mutationFn: (cityId: string) =>
      api.post(
        "/schools/bulk-import",
        { cityId, type: "Школа" },
        { timeout: 120000 },
      ),
    onSuccess: (res) => {
      alert(
        `✅ Імпорт завершено:\nДодано: ${res.data.created}\nПропущено: ${res.data.skipped}`,
      );
      qc.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: () => alert("Помилка імпорту."),
  });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const schoolFilters = useMemo(
    () => ({
      search: debouncedQuery || undefined,
      cityId: selectedCity.id || undefined,
      type: "Школа" as const,
      stage: (activeFilter as any) || undefined,
      size: (sizeFilter as any) || undefined,
    }),
    [debouncedQuery, selectedCity.id, activeFilter, sizeFilter],
  );

  const {
    data: schoolsPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSchools(schoolFilters);
  const { data: stats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: "Школа",
    stage: (activeFilter as any) || undefined,
  });
  const { data: cities = [] } = useCities();
  const { data: supportedCities = [] } = useSupportedCities();
  const deleteSchool = useDeleteSchool();
  const prefetchSchool = usePrefetchSchool();

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const filteredSchools = useMemo(
    () => schoolsPages?.pages.flatMap((p) => p.data) ?? [],
    [schoolsPages],
  );
  const totalItems = schoolsPages?.pages[0]?.meta.totalItems ?? 0;

  const handleOpenModal = useCallback(() => {
    setForm({
      name: "",
      cityId: selectedCity.id || cities[0]?.id || "",
      sourceUrl: "",
      director: "",
      phone: "",
    });
    setMatchedContacts([]);
    setIsModalOpen(true);
  }, [selectedCity.id, cities]);

  const fetchContacts = async (schoolName: string) => {
    if (!schoolName || schoolName.trim().length < 1)
      return setMatchedContacts([]);
    const currentCityName =
      selectedCity.name || cities.find((c) => c.id === form.cityId)?.name || "";
    if (currentCityName.toLowerCase() !== "львів")
      return setMatchedContacts([]);
    try {
      const data = await qc.fetchQuery<SchoolContact[]>({
        queryKey: ["schoolContacts", schoolName, currentCityName],
        queryFn: async () => {
          const res = await api.get<SchoolContact[]>(
            `/schools/contacts/search?q=${encodeURIComponent(schoolName)}&city=${encodeURIComponent(currentCityName)}&type=Школа`,
          );
          return res.data;
        },
        staleTime: 1000 * 60 * 5,
      });

      setMatchedContacts(data);
      if (data.length > 0) {
        const director =
          data.find(
            (c: SchoolContact) =>
              c.role?.includes("Директор") || c.role?.includes("Завідувач"),
          ) || data[0];
        setForm((f) => ({
          ...f,
          director: director.contactName,
          phone: director.phone,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleNameChange = (value: string) => {
    setForm({ ...form, name: value });
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (value.length < 2) {
      setShowSuggestions(false);
      setIsSearching(false);
      setMatchedContacts([]);
      return;
    }
    setIsSearching(true);
    setShowSuggestions(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const [externalData] = await Promise.all([
          qc.fetchQuery({
            queryKey: ["schoolSearchExternal", value],
            queryFn: async () => {
              const res = await api.get(
                `/schools/search?q=${encodeURIComponent(value)}&type=Школа`,
              );
              return res.data;
            },
            staleTime: 1000 * 60 * 5,
          }),
          fetchContacts(value),
        ]);
        setSuggestions(externalData);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  const handleSelectSuggestion = (name: string, url: string) => {
    setForm({ ...form, name, sourceUrl: url });
    setShowSuggestions(false);
    fetchContacts(name);
  };

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.cityId) return;
    addSchoolMutation.mutate({ ...form, type: "Школа" });
  };

  const handleDeleteSchool = useCallback(
    async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
      e.stopPropagation();
      if (userRole !== "SUPERADMIN") return;
      if (
        !window.confirm(
          `Видалити школу "${schoolName}"? Це видалить також усі її події.`,
        )
      )
        return;
      await deleteSchool.mutateAsync(schoolId);
    },
    [deleteSchool, userRole],
  );

  return (
    <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-slate-50 min-h-screen">
      {/* Шапка */}
      <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-800 leading-tight">
            Школи
            {selectedCity.id && (
              <span className="ml-2 text-sm font-normal text-blue-500">
                · {selectedCity.name}
              </span>
            )}
          </h1>
        </div>
        <div className="flex gap-2 shrink-0">
          {(userRole === "SUPERADMIN" || userRole === "MANAGER") && (
            <button
              onClick={() => {
                if (!selectedCity.id) return alert("Спочатку оберіть місто");
                if (!supportedCities.includes(selectedCity.name))
                  return alert(
                    `Місто "${selectedCity.name}" не підтримується для імпорту.`,
                  );
                if (
                  !window.confirm(
                    `Імпортувати всі школи з isuo.org для міста ${selectedCity.name}?`,
                  )
                )
                  return;

                setDotCount(3);
                const dotInterval = setInterval(() => {
                  setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
                }, 500);

                bulkImportMutation.mutate(selectedCity.id, {
                  onSettled: () => clearInterval(dotInterval),
                });
              }}
              disabled={bulkImportMutation.isPending}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-70 transition-all"
            >
              {bulkImportMutation.isPending ? (
                <span className="font-medium">
                  Імпортую{"·".repeat(dotCount)}
                </span>
              ) : (
                <><Download className="w-4 h-4" /> Імпорт з isuo</>
              )}
            </button>
          )}
          <button
            onClick={handleOpenModal}
            className="hidden md:flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Додати
          </button>
        </div>
      </div>

      {/* StatsBar */}
      <div className="shrink-0">
        <Suspense
          fallback={
            <div className="h-[72px] bg-white rounded-2xl animate-pulse mb-4" />
          }
        >
          <StatsBar
            statusStats={
              stats?.statusStats ?? {
                new: 0,
                planned: 0,
                inProgress: 0,
                done: 0,
              }
            }
            sizeStats={stats?.sizeStats ?? { small: 0, medium: 0, large: 0 }}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sizeFilter={sizeFilter}
            onSizeFilterChange={setSizeFilter}
            schoolType="Школа"
          />
        </Suspense>
      </div>

      {/* Пошук */}
      <div className="relative shrink-0 mb-4 mt-2">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук за назвою школи..."
          className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border-none sm:border sm:border-slate-200 rounded-2xl sm:rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Лічильник */}
      <p className="text-xs font-semibold text-slate-400 mb-4 shrink-0 uppercase tracking-wide px-1">
        {`${filteredSchools.length} з ${totalItems} шкіл`}
        {(activeFilter || sizeFilter) && (
          <button
            onClick={() => {
              setActiveFilter(null);
              setSizeFilter(null);
            }}
            className="ml-3 text-blue-500 hover:text-blue-700 lowercase"
          >
            скинути фільтри
          </button>
        )}
      </p>

      {/* Компоненти списків */}
      {isLoading ? (
        <div className="flex flex-col gap-2.5 flex-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-3.5 animate-pulse"
              style={{ opacity: 1 - i * 0.1 }}
            >
              <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
                <div className="h-3 bg-slate-100 rounded-lg w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Мобільний: віртуалізований список карток */}
          <div className="md:hidden flex-1 w-full overflow-hidden">
            <VirtualSchoolList
              schools={filteredSchools}
              itemHeight={110}
              onEndReached={handleLoadMore}
              animationKey={`${activeFilter}-${sizeFilter}`}
              renderItem={(school, index) => (
                <div
                  className="pb-2.5"
                  onMouseEnter={() => prefetchSchool(school.id)}
                >
                  <SchoolCard
                    school={school}
                    index={index}
                    onDelete={handleDeleteSchool}
                    stages={PIPELINE_STAGES}
                  />
                </div>
              )}
            />
          </div>

          {/* Десктоп: таблиця з віртуалізованим tbody */}
          <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0 min-w-0">
            <Suspense
              fallback={<div className="flex-1 animate-pulse bg-slate-50" />}
            >
              <VirtualDesktopTable
                schools={filteredSchools}
                searchQuery={searchQuery}
                onDelete={handleDeleteSchool}
                stages={PIPELINE_STAGES}
                onEndReached={handleLoadMore}
              />
            </Suspense>
          </div>
        </>
      )}

      {/* Мобільна плаваюча кнопка FAB */}
      <button
        onClick={handleOpenModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-blue-700 active:scale-95 transition-transform"
      >
        +
      </button>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold text-slate-800">Нова школа</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-2 -mr-2 leading-none text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleAddSchool}
              className="p-6 flex flex-col gap-4 overflow-y-auto"
            >
              <div className="relative">
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Назва школи
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  placeholder="Наприклад: Школа №1"
                  required
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {showSuggestions && (
                  <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
                    {isSearching ? (
                      <li className="px-4 py-3 text-sm text-slate-400 italic">
                        Пошук...
                      </li>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((s, i) => (
                        <li
                          key={i}
                          onMouseDown={() =>
                            handleSelectSuggestion(s.name, s.url)
                          }
                          className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer font-medium border-b border-slate-50 last:border-0"
                        >
                          {s.name}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-slate-400 italic">
                        Нічого не знайдено
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {!selectedCity.id && (
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Місто
                  </label>
                  <select
                    value={form.cityId}
                    onChange={(e) =>
                      setForm({ ...form, cityId: e.target.value })
                    }
                    required
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">— Оберіть місто —</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Контакт{" "}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    (автозаповнення)
                  </span>
                </label>
                {matchedContacts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {matchedContacts.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            director: c.contactName,
                            phone: c.phone,
                          }))
                        }
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                      >
                        {c.role ? `${c.role}: ` : ""}
                        {c.contactName}
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={form.director}
                  onChange={(e) =>
                    setForm({ ...form, director: e.target.value })
                  }
                  placeholder="Микола Петренко"
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                  Телефон
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0671234567"
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-5 py-3.5 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={addSchoolMutation.isPending}
                  className="flex-1 px-5 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/tests/component/calendar/CalendarComponents.test.tsx

```
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CalendarSkeleton from "../../../features/calendar/components/CalendarSkeleton";
import CalendarHeader from "../../../features/calendar/components/CalendarHeader";
import EventTooltip from "../../../features/calendar/components/EventTooltip";
import type { Project, City } from "../../../types";

describe("CalendarSkeleton", () => {
  it("рендерить skeleton без помилок", () => {
    const { container } = render(<CalendarSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("містить 35 клітинок-скелетів", () => {
    const { container } = render(<CalendarSkeleton />);
    const cells = container.querySelectorAll(".min-h-\\[80px\\]");
    expect(cells.length).toBeGreaterThanOrEqual(30);
  });
});

describe("CalendarHeader", () => {
  const projects: Project[] = [
    { id: "p1", name: "Проєкт A", color: "blue" },
    { id: "p2", name: "Проєкт B", color: "emerald" },
  ];
  const cities: City[] = [
    { id: "c1", name: "Київ" },
    { id: "c2", name: "Львів" },
  ];
  const defaultProps = {
    projects,
    filterCityId: "ALL",
    setFilterCityId: vi.fn(),
    cities,
    userRole: "MANAGER",
  };

  it("рендерить заголовок Календар подій", () => {
    render(<CalendarHeader {...defaultProps} />);
    expect(screen.getByText("Календар подій")).toBeInTheDocument();
  });

  it("рендерить бейджі проєктів", () => {
    render(<CalendarHeader {...defaultProps} />);
    expect(screen.getByText("Проєкт A")).toBeInTheDocument();
    expect(screen.getByText("Проєкт B")).toBeInTheDocument();
  });

  it("не показує city-select для MANAGER", () => {
    render(<CalendarHeader {...defaultProps} userRole="MANAGER" />);
    expect(screen.queryByText("Місто:")).not.toBeInTheDocument();
  });

  it("показує city-select для SUPERADMIN", () => {
    render(<CalendarHeader {...defaultProps} userRole="SUPERADMIN" />);
    expect(screen.getByText("Місто:")).toBeInTheDocument();
    expect(screen.getByText("🌍 Всі міста")).toBeInTheDocument();
  });
});

describe("EventTooltip", () => {
  it("рендерить назву школи та проєкт", () => {
    const event = {
      id: "e1",
      project: "Проєкт A",
      time: "10:00",
      school: { id: "s1", name: "Школа №1", type: "school" },
      crew: { id: "c1", name: "Екіпаж 1", cityId: "city-1" },
    } as any;

    render(<EventTooltip event={event} />);
    expect(screen.getByText("Школа №1")).toBeInTheDocument();
    expect(screen.getByText(/Проєкт A/)).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
  });

  it("рендерить fallback при відсутніх даних", () => {
    const event = { id: "e2", project: "Проєкт B", time: "" } as any;

    render(<EventTooltip event={event} />);
    expect(screen.getByText("Невідомий заклад")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});

```

# FILE: apps/frontend/src/tests/component/ConfirmDialog.test.tsx

```
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";

describe("ConfirmDialog", () => {
  it("не рендериться, якщо isOpen=false", () => {
    render(
      <ConfirmDialog
        isOpen={false}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.queryByText("Видалити")).not.toBeInTheDocument();
    expect(screen.queryByText("Справді?")).not.toBeInTheDocument();
  });

  it("рендериться, коли isOpen=true", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("Видалити")).toBeInTheDocument();
    expect(screen.getByText("Справді?")).toBeInTheDocument();
  });

  it("кнопка Підтвердити викликає onConfirm", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("Підтвердити"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("кнопка Скасувати викликає onCancel", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByText("Скасувати"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("клік на backdrop викликає onCancel", () => {
    const onCancel = vi.fn();
    const { container } = render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );
    const backdrop = container.querySelector(".fixed.inset-0")!;
    fireEvent.click(backdrop);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("клік всередині модалки не викликає onCancel", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByText("Видалити"));
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("показує іконку Trash2 для variant=danger", () => {
    const { container } = render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        variant="danger"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(container.innerHTML).toContain("lucide-trash2");
  });

  it("показує іконку AlertTriangle для variant=warning", () => {
    const { container } = render(
      <ConfirmDialog
        isOpen={true}
        title="Увага"
        message="Перевірте дані"
        variant="warning"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(container.innerHTML).toContain("lucide-triangle-alert");
  });

  it("використовує confirmLabel за замовчуванням", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("Підтвердити")).toBeInTheDocument();
  });

  it("використовує кастомний confirmLabel", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        confirmLabel="Так, видалити"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("Так, видалити")).toBeInTheDocument();
  });
});

```

# FILE: apps/frontend/src/tests/component/Dashboard.test.tsx

```
import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../../pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { vi } from "vitest";

vi.mock("../../components/IssueCarousel", () => ({ default: () => <div data-testid="issue-carousel" /> }));
vi.mock("../../components/dashboard/FunnelBar", () => ({ default: () => <div data-testid="funnel-bar" /> }));
vi.mock("../../components/dashboard/TodayEvents", () => ({ default: () => <div data-testid="today-events" /> }));
vi.mock("../../components/dashboard/UpcomingEvents", () => ({ default: () => <div data-testid="upcoming-events" /> }));
vi.mock("../../components/dashboard/StaleSchools", () => ({ default: () => <div data-testid="stale-schools" /> }));
vi.mock("../../components/dashboard/MonthlyKpi", () => ({ default: () => <div data-testid="monthly-kpi" /> }));
vi.mock("../../components/dashboard/ActivityFeed", () => ({ default: () => <div data-testid="activity-feed" /> }));
vi.mock("../../components/dashboard/CitiesTable", () => ({ default: () => <div data-testid="cities-table" /> }));

vi.mock("../../context/CityContext", () => ({
  useSelectedCity: () => ({ selectedCity: { id: "city-1", name: "Львів" } })
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: { role: "SUPERADMIN" } })
}));

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("Dashboard", () => {
  it("fetches and renders dashboard components", async () => {
    server.use(
      http.get("http://localhost:3000/api/dashboard/summary", () =>
        HttpResponse.json({
          todayEvents: [],
          upcomingEvents: [],
          funnel: {},
          totalSchools: 10,
          monthlyKpi: { revenue: 0, profit: 0, children: 0, count: 0 },
          staleSchools: [],
          activityFeed: [],
          citiesStats: []
        })
      )
    );

    render(<Dashboard />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByTestId("issue-carousel")).toBeInTheDocument();
      expect(screen.getByTestId("funnel-bar")).toBeInTheDocument();
      expect(screen.getByTestId("today-events")).toBeInTheDocument();
      expect(screen.getByTestId("upcoming-events")).toBeInTheDocument();
      expect(screen.getByTestId("stale-schools")).toBeInTheDocument();
      expect(screen.getByTestId("monthly-kpi")).toBeInTheDocument();
      expect(screen.getByTestId("activity-feed")).toBeInTheDocument();
    });
  });
});

```

# FILE: apps/frontend/src/tests/component/DayOffModal.test.tsx

```
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DayOffModal from "../../components/calendar/DayOffModal";
import type { DayOff } from "../../hooks/useDaysOff";

function makeDate() {
  return new Date(2026, 6, 10);
}

const staff = [
  { id: "u-host", name: "Ведучий 1", role: "HOST" },
  { id: "u-driver", name: "Водій 1", role: "DRIVER" },
  { id: "u-other", name: "Інший 1", role: "OTHER" },
];

const dayOff: DayOff = {
  id: "d-host-1",
  userId: "u-host",
  date: "2026-07-10",
  user: { id: "u-host", name: "Ведучий 1", role: "HOST", cityId: "city-1" },
};

describe("DayOffModal", () => {
  it("не рендериться, якщо isOpen=false", () => {
    render(
      <DayOffModal
        isOpen={false}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.queryByText(/Оберіть співробітника/)).not.toBeInTheDocument();
  });

  it("не рендериться, якщо date=null", () => {
    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={null}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.queryByText(/Оберіть співробітника/)).not.toBeInTheDocument();
  });

  it("рендериться в document.body через portal і показує форматовану дату", () => {
    const date = makeDate();
    const expectedDate = date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={date}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={vi.fn()}
      />,
    );

    expect(document.body).toContainElement(
      screen.getByText(`Вихідний на ${expectedDate}`),
    );
  });

  it("кнопка закриття викликає onClose", () => {
    const onClose = vi.fn();

    render(
      <DayOffModal
        isOpen={true}
        onClose={onClose}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Закрити" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("для порожнього staff показує повідомлення про відсутність співробітників", () => {
    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={[]}
        dayOffs={[]}
        onToggle={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Немає співробітників у цьому місті"),
    ).toBeInTheDocument();
  });

  it("рендерить іконки ролей HOST/DRIVER і fallback для невідомої ролі", () => {
    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByText("🎙️")).toBeInTheDocument();
    expect(screen.getByText("🚗")).toBeInTheDocument();
    expect(screen.getByText("👤")).toBeInTheDocument();
  });

  it("для existing dayOff показує статус 'Вихідний ✕', інакше 'Призначити'", () => {
    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByText("Вихідний ✕")).toBeInTheDocument();
    expect(screen.getAllByText("Призначити").length).toBeGreaterThan(0);
  });

  it("клік по staff без existing викликає onToggle(userId, undefined)", () => {
    const onToggle = vi.fn();

    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={onToggle}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Водій 1/ }));
    expect(onToggle).toHaveBeenCalledWith("u-driver", undefined);
  });

  it("клік по staff з existing викликає onToggle(userId, existingId)", () => {
    const onToggle = vi.fn();

    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={onToggle}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Ведучий 1/ }));
    expect(onToggle).toHaveBeenCalledWith("u-host", "d-host-1");
  });

  it("якщо у dayOffs дубль по userId — бере перший знайдений", () => {
    const onToggle = vi.fn();
    const duplicate: DayOff[] = [
      dayOff,
      { ...dayOff, id: "d-host-2" },
    ];

    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={duplicate}
        onToggle={onToggle}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Ведучий 1/ }));
    expect(onToggle).toHaveBeenCalledWith("u-host", "d-host-1");
  });

  it("шукає existing dayOff лише за userId (дата ігнорується — upstream вже відфільтрував)", () => {
    const dayOffOtherDate: DayOff = {
      ...dayOff,
      id: "d-date-mismatch",
      date: "1999-01-01",
    };

    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOffOtherDate]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByText("Вихідний ✕")).toBeInTheDocument();
  });
});

```

# FILE: apps/frontend/src/tests/component/EventReport.test.tsx

```
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const mockUseEventFull = vi.fn();
vi.mock("../../hooks/useSchoolProfile", () => ({
  useEventFull: (id: string | undefined) => mockUseEventFull(id),
}));

import EventReport from "../../pages/EventReport";

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/events/ev-1/report"]}>
      <Routes>
        <Route path="/events/:eventId/report" element={<EventReport />} />
      </Routes>
    </MemoryRouter>,
  );
}

const baseEvent = {
  id: "ev-1",
  cityId: "city-1",
  city: { name: "Львів" },
  school: { name: "Школа №1" },
  address: "вул. Тестова 1",
  date: "2026-07-01T10:00:00Z",
  time: "10:00",
  project: "Голограма",
  price: 12345,
  childrenPlanned: 100,
  paymentMethod: "Готівка",
  crew: {
    name: "Екіпаж 1",
    host: { name: "Ведучий" },
    driver: { name: "Водій" },
  },
  report: {
    childrenCount: 95,
    totalSum: 9800,
    directorSatisfied: true,
    teachersSatisfied: false,
    hadIssues: false,
    comment: "Все пройшло добре",
  },
};

describe("EventReport", () => {
  it("показує стан завантаження", () => {
    mockUseEventFull.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("Завантаження...")).toBeInTheDocument();
  });

  it("показує 'Подію не знайдено' якщо event відсутній", () => {
    mockUseEventFull.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("Подію не знайдено")).toBeInTheDocument();
  });

  it("показує 'Подію не знайдено' при помилці запиту", () => {
    mockUseEventFull.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    renderPage();
    expect(screen.getByText("Подію не знайдено")).toBeInTheDocument();
  });

  it("форматує вартість події (price) з розділювачем тисяч", () => {
    mockUseEventFull.mockReturnValue({
      data: baseEvent,
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("12 345 грн")).toBeInTheDocument();
  });

  it("форматує отриману суму (report.totalSum) окремо від price", () => {
    mockUseEventFull.mockReturnValue({
      data: baseEvent,
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("9 800 грн")).toBeInTheDocument();
  });

  it("форматує 0 грн, якщо totalSum дорівнює 0", () => {
    mockUseEventFull.mockReturnValue({
      data: { ...baseEvent, report: { ...baseEvent.report, totalSum: 0 } },
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("0 грн")).toBeInTheDocument();
  });

  it("показує '—' якщо звіту ще немає (report undefined)", () => {
    mockUseEventFull.mockReturnValue({
      data: { ...baseEvent, report: undefined },
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
  });

  it("показує 'Так'/'Ні' відповідно до directorSatisfied/teachersSatisfied", () => {
    mockUseEventFull.mockReturnValue({
      data: baseEvent,
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getAllByText("Так").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ні").length).toBeGreaterThan(0);
  });

  it("показує коментар у лапках, якщо він є", () => {
    mockUseEventFull.mockReturnValue({
      data: baseEvent,
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText('"Все пройшло добре"')).toBeInTheDocument();
  });

  it("не показує блок 'Коментар:', якщо коментаря немає", () => {
    mockUseEventFull.mockReturnValue({
      data: {
        ...baseEvent,
        report: { ...baseEvent.report, comment: undefined },
      },
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.queryByText(/Коментар:/)).not.toBeInTheDocument();
  });

  it("childrenPlanned=0 показує '0' (виправлено: використовуємо ?? замість ||)", () => {
    mockUseEventFull.mockReturnValue({
      data: { ...baseEvent, childrenPlanned: 0 },
      isLoading: false,
      isError: false,
    });
    renderPage();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});

```

# FILE: apps/frontend/src/tests/component/EventsTable.test.tsx

```
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../hooks/useSchoolProfile", () => ({
  useDeleteEvent: () => ({ mutateAsync: vi.fn().mockResolvedValue(undefined) }),
}));

import EventsTable from "../../components/school-profile/EventsTable";

const mockEvents = [
  {
    id: "ev-1",
    project: "Голограма",
    date: "2026-07-01T10:00:00Z",
    price: 5000,
    status: "BASE",
  },
  {
    id: "ev-2",
    project: "Малювайко",
    date: "2026-08-01T10:00:00Z",
    price: 3000,
    status: "FIRST_CONTACT",
  },
];

describe("EventsTable", () => {
  const onEventSelect = vi.fn();
  const onDeleteSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
  });

  it("відображає всі події", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
          schoolId="school-1"
        />
      </MemoryRouter>,
    );

    expect(screen.getAllByText("Голограма")).toHaveLength(2);
    expect(screen.getAllByText("Малювайко")).toHaveLength(2);
  });

  it("показує кількість подій у заголовку", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
          schoolId="school-1"
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Всі події (2)")).toBeInTheDocument();
  });

  it("не рендериться якщо events порожній", () => {
    const { container } = render(
      <MemoryRouter>
        <EventsTable
          events={[]}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
          schoolId="school-1"
        />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeNull();
  });

  it("викликає onEventSelect при кліку на подію", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
          schoolId="school-1"
        />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getAllByText("Голограма")[0]);
    expect(onEventSelect).toHaveBeenCalledWith("ev-1");
  });

  it("показує підтвердження перед видаленням", () => {
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
          schoolId="school-1"
        />
      </MemoryRouter>,
    );
    const deleteButtons = screen.getAllByText("🗑");
    fireEvent.click(deleteButtons[0]);
    expect(window.confirm).toHaveBeenCalledWith("Видалити цю подію?");
  });

  it("не видаляє якщо confirm повернув false", async () => {
    window.confirm = vi.fn(() => false);
    render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId={null}
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
          schoolId="school-1"
        />
      </MemoryRouter>,
    );
    const deleteButtons = screen.getAllByText("🗑");
    fireEvent.click(deleteButtons[0]);
    expect(onDeleteSuccess).not.toHaveBeenCalled();
  });

  it("виділяє вибрану подію", () => {
    const { container } = render(
      <MemoryRouter>
        <EventsTable
          events={mockEvents}
          selectedEventId="ev-1"
          onEventSelect={onEventSelect}
          onDeleteSuccess={onDeleteSuccess}
          schoolId="school-1"
        />
      </MemoryRouter>,
    );
    const selected = container.querySelector(".bg-blue-50\\/50");
    expect(selected).toBeInTheDocument();
  });
});

```

# FILE: apps/frontend/src/tests/component/IssueCarousel.test.tsx

```
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IssueCarousel from "../../components/IssueCarousel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { vi } from "vitest";

vi.mock("../../context/CityContext", () => ({
  useSelectedCity: () => ({ selectedCity: { id: "city-1", name: "Львів" } })
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("IssueCarousel", () => {
  it("fetches and renders issues", async () => {
    server.use(
      http.get("http://localhost:3000/api/issues", () =>
        HttpResponse.json([
          {
            id: "issue-1",
            schoolName: "Test School",
            eventName: "Test Event",
            message: "Need help",
            status: "Планується",
            createdAt: new Date().toISOString(),
          },
        ])
      )
    );

    render(<IssueCarousel />, { wrapper: createWrapper() });
    
    await waitFor(() => {
      expect(screen.getByText("Test School")).toBeInTheDocument();
    });
    expect(screen.getByText('"Need help"')).toBeInTheDocument();
  });

  it("toggles status to next phase", async () => {
    server.use(
      http.get("http://localhost:3000/api/issues", () =>
        HttpResponse.json([
          {
            id: "issue-1",
            schoolName: "Test School",
            status: "Планується",
            createdAt: new Date().toISOString(),
          },
        ])
      )
    );

    let patchedStatus: string | null = null;
    server.use(
      http.patch("http://localhost:3000/api/issues/:id/status", async ({ request }) => {
        const body = await request.json() as any;
        patchedStatus = body.status;
        return HttpResponse.json({ success: true });
      })
    );

    render(<IssueCarousel />, { wrapper: createWrapper() });
    
    await waitFor(() => {
      expect(screen.getByText("Test School")).toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: /Планується/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(patchedStatus).toBe("Виконується");
    });
  });
});

```

# FILE: apps/frontend/src/tests/component/LoadingBar.test.tsx

```
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingBar } from "../../components/ui/LoadingBar";

describe("LoadingBar", () => {
  it("рендериться, коли isLoading=true", () => {
    const { container } = render(<LoadingBar isLoading={true} />);
    expect(container.querySelector(".fixed.top-0")).toBeInTheDocument();
  });

  it("не рендериться, коли isLoading=false", () => {
    const { container } = render(<LoadingBar isLoading={false} />);
    expect(container.querySelector(".fixed.top-0")).not.toBeInTheDocument();
  });

  it("має правильні CSS-класи для позиціонування", () => {
    const { container } = render(<LoadingBar isLoading={true} />);
    const bar = container.querySelector(".fixed.top-0")!;
    expect(bar).toHaveClass("left-0", "right-0", "z-[60]", "h-0.5");
  });
});

```

# FILE: apps/frontend/src/tests/component/Login.test.tsx

```
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { vi } from "vitest";

const renderLogin = (onLogin = vi.fn()) => {
  return render(
    <BrowserRouter>
      <Login onLogin={onLogin} />
    </BrowserRouter>
  );
};

describe("Login", () => {
  it("renders login form", () => {
    renderLogin();
    expect(screen.getByText("Вхід у CRM")).toBeInTheDocument();
  });

  it("shows error on failed login", async () => {
    server.use(
      http.post("http://localhost:3000/api/auth/login", () => {
        return new HttpResponse(null, { status: 401 });
      })
    );

    renderLogin();
    await userEvent.type(screen.getByLabelText(/email/i), "test@test.com");
    await userEvent.type(screen.getByLabelText(/пароль/i), "wrong");
    
    await userEvent.click(screen.getByRole("button", { name: /увійти/i }));
    
    await waitFor(() => {
      expect(screen.getByText("Невірний email або пароль")).toBeInTheDocument();
    });
  });

  it("calls onLogin on successful login", async () => {
    const mockUser = { id: "1", name: "Admin", email: "admin@crm.com", role: "SUPERADMIN" };
    server.use(
      http.post("http://localhost:3000/api/auth/login", () => {
        return HttpResponse.json({ user: mockUser, token: "fake-token" });
      })
    );

    const onLogin = vi.fn();
    renderLogin(onLogin);
    await userEvent.type(screen.getByLabelText(/email/i), mockUser.email);
    await userEvent.type(screen.getByLabelText(/пароль/i), "123!PASSWORD!321");
    
    await userEvent.click(screen.getByRole("button", { name: /увійти/i }));

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith(mockUser);
    }, { timeout: 3000 });
  });
});

```

# FILE: apps/frontend/src/tests/component/MobileTopNav.test.tsx

```
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MobileTopNav from "../../components/MobileTopNav";
import { AuthProvider } from "../../context/AuthContext";
import { CityProvider } from "../../context/CityContext";
import type { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={["/schools"]}>
      <AuthProvider>
        <CityProvider>{children}</CityProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("MobileTopNav", () => {
  it("рендерить назву СВІТЛО ЗНАНЬ", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    expect(screen.getByText("СВІТЛО ЗНАНЬ")).toBeTruthy();
  });

  it("рендерить назву міста", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    const cityTexts = screen.getAllByText(/.+/);
    expect(cityTexts.length).toBeGreaterThanOrEqual(2);
  });

  it("не містить клікабельних посилань", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    const links = screen.queryAllByRole("link");
    expect(links.length).toBe(0);
  });
});

```

# FILE: apps/frontend/src/tests/component/Pipeline.test.tsx

```
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pipeline from "../../components/school-profile/Pipeline";

const STAGES = [
  { id: 1, key: "BASE", name: "Новий заклад" },
  { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
  { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
];

describe("Pipeline", () => {
  it("відображає всі етапи", () => {
    render(
      <Pipeline
        currentStageIndex={0}
        currentEvent={{ id: "e1", status: "BASE" }}
        onPipelineClick={vi.fn()}
        stages={STAGES}
      />,
    );
    expect(screen.getByText("Новий заклад")).toBeInTheDocument();
    expect(screen.getByText("Знайомство")).toBeInTheDocument();
  });

  it("викликає onPipelineClick для наступного етапу", () => {
    const onClick = vi.fn();
    render(
      <Pipeline
        currentStageIndex={0}
        currentEvent={{ id: "e1", status: "BASE" }}
        onPipelineClick={onClick}
        stages={STAGES}
      />,
    );
    fireEvent.click(screen.getByText("2"));
    expect(onClick).toHaveBeenCalledWith(2);
  });

  it("не викликає onClick для недоступного етапу", () => {
    const onClick = vi.fn();
    render(
      <Pipeline
        currentStageIndex={0}
        currentEvent={{ id: "e1", status: "BASE" }}
        onPipelineClick={onClick}
        stages={STAGES}
      />,
    );
    fireEvent.click(screen.getByText("3"));
    expect(onClick).not.toHaveBeenCalled();
  });
});

```

# FILE: apps/frontend/src/tests/component/ProtectedRoute.test.tsx

```
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import { vi } from "vitest";
import * as AuthContext from "../../context/AuthContext";

describe("ProtectedRoute", () => {
  it("redirects to login if user is not authenticated", () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: null } as any);
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/protected" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>Protected Content</ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects to /schools if user lacks required role", () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: { role: "MANAGER" } } as any);
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/schools" element={<div>Schools Page</div>} />
          <Route path="/protected" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>Protected Content</ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Schools Page")).toBeInTheDocument();
  });

  it("renders children if user is authenticated and has required role", () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: { role: "SUPERADMIN" } } as any);
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>Protected Content</ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});

```

# FILE: apps/frontend/src/tests/component/SchoolCard.test.tsx

```
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SchoolCard } from "../../components/schools/SchoolMobileList";

const STAGES = [
  { key: "BASE", name: "Новий заклад" },
  { key: "FIRST_CONTACT", name: "Знайомство" },
];

const mockSchool = {
  id: "school-1",
  name: "Школа №1",
  director: "Іван Петренко",
  phone: "0671234567",
  events: [{ status: "BASE" }],
};

describe("SchoolCard", () => {
  it("відображає назву школи", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={mockSchool}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Школа №1")).toBeInTheDocument();
  });

  it("відображає директора", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={mockSchool}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Іван Петренко/)).toBeInTheDocument();
  });

  it("відображає поточний етап", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={mockSchool}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Новий заклад")).toBeInTheDocument();
  });

  it("викликає onDelete при натисканні", () => {
    const onDelete = vi.fn();
    render(
      <MemoryRouter>
        <SchoolCard
          school={mockSchool}
          onDelete={onDelete}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText("🗑"));
    expect(onDelete).toHaveBeenCalledWith(
      expect.any(Object),
      "school-1",
      "Школа №1",
    );
  });

  it("не показує етап якщо подій немає", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={{ ...mockSchool, events: [] }}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Новий заклад")).not.toBeInTheDocument();
  });

  it("показує телефон як посилання tel:, а видимий текст — ім'я директора (якщо воно вказане)", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={mockSchool}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    const link = screen.getByText(/Іван Петренко/).closest("a");
    expect(link).toHaveAttribute("href", "tel:0671234567");
  });

  it("показує сам номер телефону як текст, якщо директор не вказаний", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={{ ...mockSchool, director: "" }}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/0671234567/)).toBeInTheDocument();
  });
});

```

# FILE: apps/frontend/src/tests/component/Schools.test.tsx

```
import { render, screen, waitFor } from "@testing-library/react";
import Schools from "../../pages/Schools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { vi } from "vitest";

// Mock nested lazy components
vi.mock("../../components/schools/StatsBar", () => ({ default: () => <div data-testid="stats-bar" /> }));
vi.mock("../../components/schools/VirtualDesktopTable", () => ({ default: () => <div data-testid="virtual-desktop-table" /> }));
vi.mock("../../components/VirtualSchoolList", () => ({ default: () => <div data-testid="virtual-school-list" /> }));

vi.mock("../../context/CityContext", () => ({
  useSelectedCity: () => ({ selectedCity: { id: "city-1", name: "Львів" } })
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: { role: "SUPERADMIN" } })
}));

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe("Schools Page", () => {
  it("renders schools page and child components", async () => {
    server.use(
      http.get("http://localhost:3000/api/schools", () =>
        HttpResponse.json({
          data: [],
          meta: { totalItems: 0, currentPage: 1, totalPages: 1 }
        })
      ),
      http.get("http://localhost:3000/api/schools/stats", () =>
        HttpResponse.json({
          statusStats: { new: 0, planned: 0, inProgress: 0, done: 0 },
          sizeStats: { small: 0, medium: 0, large: 0 }
        })
      ),
      http.get("http://localhost:3000/api/cities", () =>
        HttpResponse.json([{ id: "city-1", name: "Львів" }])
      ),
      http.get("http://localhost:3000/api/cities/supported", () =>
        HttpResponse.json(["Львів"])
      )
    );

    render(<Schools />, { wrapper: createWrapper() });

    expect(screen.getByText(/Школи/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByTestId("stats-bar")).toBeInTheDocument();
      // On desktop (default JSDOM width might hide mobile list, but let's check desktop table)
      expect(screen.getByTestId("virtual-desktop-table")).toBeInTheDocument();
    });
  });
});

```

# FILE: apps/frontend/src/tests/component/VirtualSchoolList.test.tsx

```
import { render, screen } from "@testing-library/react";
import VirtualSchoolList from "../../components/VirtualSchoolList";
import type { School } from "../../types";
import { vi } from "vitest";

vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: () => ({
    getVirtualItems: () => [
      { index: 0, start: 0, size: 50, key: "0" },
      { index: 1, start: 50, size: 50, key: "1" },
    ],
    getTotalSize: () => 100,
  }),
}));

describe("VirtualSchoolList", () => {
  it("renders a list of items using renderItem", () => {
    const schools: School[] = [
      { id: "1", name: "School 1", cityId: "c1", type: "Школа" } as School,
      { id: "2", name: "School 2", cityId: "c1", type: "Школа" } as School,
    ];

    render(
      <VirtualSchoolList
        schools={schools}
        renderItem={(school) => <div data-testid="school-item">{school.name}</div>}
      />
    );

    const items = screen.getAllByTestId("school-item");
    expect(items.length).toBe(2);
    expect(screen.getByText("School 1")).toBeInTheDocument();
    expect(screen.getByText("School 2")).toBeInTheDocument();
  });
});

```

# FILE: apps/frontend/src/tests/mocks/handlers.ts

```
import { http, HttpResponse } from "msw";

const BASE = "http://localhost:3000/api";

export const handlers = [
  http.get(`${BASE}/cities`, () =>
    HttpResponse.json([
      { id: "city-1", name: "Львів", plannedEvents: 3, completedEvents: 10, schoolsCount: 50 },
      { id: "city-2", name: "Київ", plannedEvents: 1, completedEvents: 5, schoolsCount: 30 },
    ])
  ),

  http.get(`${BASE}/schools`, () =>
    HttpResponse.json([
      { id: "school-1", name: "Школа №1", type: "Школа", cityId: "city-1", childrenCount: 300, events: [] },
      { id: "school-2", name: "Школа №5", type: "Школа", cityId: "city-1", childrenCount: 100, events: [] },
    ])
  ),

  http.get(`${BASE}/schools/:id`, ({ params }) =>
    HttpResponse.json({
      id: params.id,
      name: "Школа №1",
      type: "Школа",
      cityId: "city-1",
      city: { id: "city-1", name: "Львів" },
      director: "Іван Петренко",
      phone: "0671234567",
      address: "вул. Тестова 1",
      childrenCount: 300,
    })
  ),

  http.get(`${BASE}/events/school/:schoolId`, () =>
    HttpResponse.json([
      {
        id: "event-1",
        project: "Голограма для школи",
        date: "2026-07-01T10:00:00Z",
        time: "10:00",
        status: "BASE",
        price: 5000,
        childrenPlanned: 100,
        address: "вул. Тестова 1",
        contactPerson: "Іван",
        contactPhone: "0671234567",
      },
    ])
  ),

  http.get(`${BASE}/users`, () =>
    HttpResponse.json([
      { id: "user-1", name: "Адміністратор", email: "admin@crm.com", role: "SUPERADMIN" },
    ])
  ),

  http.get(`${BASE}/dashboard/summary`, () =>
    HttpResponse.json({
      todayEvents: [],
      upcomingEvents: [],
      funnel: { BASE: 10, FIRST_CONTACT: 5 },
      totalSchools: 50,
      monthlyKpi: { revenue: 50000, profit: 20000, children: 500, count: 10 },
      staleSchools: [],
      activityFeed: [],
      citiesStats: [],
    })
  ),

  http.post(`${BASE}/auth/login`, () =>
    HttpResponse.json({ access_token: "test-token" })
  ),
];
```

# FILE: apps/frontend/src/tests/mocks/server.ts

```
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

# FILE: apps/frontend/src/tests/setup.ts

```
import "@testing-library/jest-dom";
import { afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./mocks/server";
import { api } from "../config/api";
import { vi } from "vitest";

api.defaults.baseURL = "http://localhost:3000/api";

const localStorageMock = {
  getItem: vi.fn(() => "mock-token"),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(global, "localStorage", { value: localStorageMock });

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());
```

# FILE: apps/frontend/src/tests/unit/api.test.ts

```
import { api } from "../../config/api";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("api client (axios config)", () => {
  beforeEach(() => {
    document.cookie = "csrf_token=test-csrf-token; path=/";
  });

  afterEach(() => {
    document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });

  it("appends X-CSRF-Token header to non-GET requests if cookie exists", async () => {
    let receivedHeader: string | null = null;
    server.use(
      http.post("http://localhost:3000/api/test-csrf", ({ request }) => {
        receivedHeader = request.headers.get("X-CSRF-Token");
        return HttpResponse.json({ success: true });
      })
    );

    await api.post("/test-csrf");
    expect(receivedHeader).toBe("test-csrf-token");
  });

  it("does not append X-CSRF-Token header to GET requests", async () => {
    let receivedHeader: string | null = null;
    server.use(
      http.get("http://localhost:3000/api/test-csrf", ({ request }) => {
        receivedHeader = request.headers.get("X-CSRF-Token");
        return HttpResponse.json({ success: true });
      })
    );

    await api.get("/test-csrf");
    expect(receivedHeader).toBeNull();
  });
});

```

# FILE: apps/frontend/src/tests/unit/apiRefresh.test.ts

```
import { describe, it, expect, vi, afterEach } from "vitest";
import axios from "axios";

function buildAxiosResponse(status: number, data: unknown, url: string) {
  return {
    status,
    data,
    statusText: status === 200 ? "OK" : "Unauthorized",
    headers: {},
    config: { url } as any,
  };
}

function rejectingAdapter(responseStatus: number, responseData: unknown) {
  return (config: any) => {
    const err: any = new Error("Request failed");
    err.response = buildAxiosResponse(responseStatus, responseData, config.url);
    err.config = config;
    return Promise.reject(err);
  };
}

function okAdapter(responseData: unknown) {
  return (config: any) =>
    Promise.resolve(buildAxiosResponse(200, responseData, config.url));
}

describe("API auto-refresh interceptor", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("ретранслює запит після успішного refresh", async () => {
    let callCount = 0;

    const instance = axios.create({ baseURL: "/api", withCredentials: true });

    let refreshPromise: Promise<void> | null = null;

    instance.interceptors.response.use(
      (res) => res,
      async (error: any) => {
        const original = error.config;
        const isAuth =
          original?.url?.includes("/auth/login") ||
          original?.url?.includes("/auth/refresh");

        if (
          error.response?.status === 401 &&
          original &&
          !original._retry &&
          !isAuth
        ) {
          original._retry = true;
          try {
            if (!refreshPromise) {
              refreshPromise = instance
                .post("/auth/refresh")
                .then(() => undefined)
                .finally(() => {
                  refreshPromise = null;
                });
            }
            await refreshPromise;
            return instance(original);
          } catch {
            window.dispatchEvent(new Event("auth:expired"));
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    instance.defaults.adapter = (config: any) => {
      callCount++;
      if (config.url === "/schools" && !config._retry) {
        return rejectingAdapter(401, null)(config);
      }
      if (config.url === "/auth/refresh") {
        return okAdapter({ ok: true })(config);
      }
      if (config.url === "/schools" && config._retry) {
        return okAdapter([{ id: 1 }])(config);
      }
      return okAdapter(null)(config);
    };

    const result = await instance.get("/schools");
    expect(result.status).toBe(200);
    expect(result.data).toEqual([{ id: 1 }]);
    expect(callCount).toBe(3);
  });

  it("диспатчить auth:expired якщо refresh теж 401", async () => {
    const dispatchSpy = vi.fn();
    window.addEventListener("auth:expired", dispatchSpy);

    const instance = axios.create({ baseURL: "/api", withCredentials: true });

    let refreshPromise: Promise<void> | null = null;

    instance.interceptors.response.use(
      (res) => res,
      async (error: any) => {
        const original = error.config;
        const isAuth =
          original?.url?.includes("/auth/login") ||
          original?.url?.includes("/auth/refresh");

        if (
          error.response?.status === 401 &&
          original &&
          !original._retry &&
          !isAuth
        ) {
          original._retry = true;
          try {
            if (!refreshPromise) {
              refreshPromise = instance
                .post("/auth/refresh")
                .then(() => undefined)
                .finally(() => {
                  refreshPromise = null;
                });
            }
            await refreshPromise;
            return instance(original);
          } catch {
            window.dispatchEvent(new Event("auth:expired"));
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    instance.defaults.adapter = (config: any) => {
      if (config.url === "/auth/refresh") {
        return rejectingAdapter(401, null)(config);
      }
      return rejectingAdapter(401, null)(config);
    };

    await expect(instance.get("/schools")).rejects.toThrow();
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it("паралельні 401-запити — лише один refresh (single-flight)", async () => {
    let refreshCalls = 0;

    const instance = axios.create({ baseURL: "/api", withCredentials: true });

    let refreshPromise: Promise<void> | null = null;

    instance.interceptors.response.use(
      (res) => res,
      async (error: any) => {
        const original = error.config;
        const isAuth =
          original?.url?.includes("/auth/login") ||
          original?.url?.includes("/auth/refresh");

        if (
          error.response?.status === 401 &&
          original &&
          !original._retry &&
          !isAuth
        ) {
          original._retry = true;
          try {
            if (!refreshPromise) {
              refreshPromise = instance
                .post("/auth/refresh")
                .then(() => undefined)
                .finally(() => {
                  refreshPromise = null;
                });
            }
            await refreshPromise;
            return instance(original);
          } catch {
            window.dispatchEvent(new Event("auth:expired"));
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    instance.defaults.adapter = (config: any) => {
      if (config.url === "/auth/refresh") {
        refreshCalls++;
        return okAdapter({ ok: true })(config);
      }
      if (config.url?.startsWith("/data/") && config._retry) {
        return okAdapter({ id: config.url.split("/").pop() })(config);
      }
      return rejectingAdapter(401, null)(config);
    };

    const results = await Promise.all([
      instance.get("/data/1"),
      instance.get("/data/2"),
      instance.get("/data/3"),
    ]);

    expect(results).toHaveLength(3);
    results.forEach((r) => expect(r.status).toBe(200));
    expect(refreshCalls).toBe(1);
  });

  it("не рефрешить на auth-ендпоінтах", async () => {
    const instance = axios.create({ baseURL: "/api", withCredentials: true });

    instance.interceptors.response.use(
      (res) => res,
      async (error: any) => {
        const original = error.config;
        const isAuth =
          original?.url?.includes("/auth/login") ||
          original?.url?.includes("/auth/refresh");

        if (
          error.response?.status === 401 &&
          original &&
          !original._retry &&
          !isAuth
        ) {
          original._retry = true;
          try {
            const rp = instance.post("/auth/refresh").then(() => undefined);
            await rp;
            return instance(original);
          } catch {
            window.dispatchEvent(new Event("auth:expired"));
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    instance.defaults.adapter = (config: any) => {
      return rejectingAdapter(401, null)(config);
    };

    await expect(instance.post("/auth/login", {})).rejects.toThrow();
  });

  it("/auth/me не тригерить refresh — захист від безкінечного редиректу", async () => {
    let refreshCalled = false;
    const dispatchSpy = vi.fn();
    window.addEventListener("auth:expired", dispatchSpy);

    const instance = axios.create({ baseURL: "/api", withCredentials: true });

    instance.interceptors.response.use(
      (res) => res,
      async (error: any) => {
        const original = error.config;
        const isAuth =
          original?.url?.includes("/auth/login") ||
          original?.url?.includes("/auth/refresh") ||
          original?.url?.includes("/auth/me");

        if (
          error.response?.status === 401 &&
          original &&
          !original._retry &&
          !isAuth
        ) {
          original._retry = true;
          try {
            const rp = instance.post("/auth/refresh").then(() => undefined);
            await rp;
            return instance(original);
          } catch {
            window.dispatchEvent(new Event("auth:expired"));
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    );

    instance.defaults.adapter = (config: any) => {
      if (config.url === "/auth/refresh") {
        refreshCalled = true;
        return rejectingAdapter(401, null)(config);
      }
      return rejectingAdapter(401, null)(config);
    };

    await expect(instance.get("/auth/me")).rejects.toThrow();
    expect(refreshCalled).toBe(false);
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});

```

# FILE: apps/frontend/src/tests/unit/calendar/color.test.ts

```
import { describe, it, expect } from "vitest";
import { shadeHex, getDayColor } from "../../../features/calendar/utils/color";
import { PROJECT_HEX } from "../../../features/calendar/constants";

describe("shadeHex", () => {
  it("освітлює колір (позитивний percent)", () => {
    const result = shadeHex("#3b82f6", 50);
    expect(result).toMatch(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
    expect(result).toBe("rgb(109, 180, 255)");
  });

  it("затіняє колір (негативний percent)", () => {
    const result = shadeHex("#3b82f6", -50);
    expect(result).toBe("rgb(9, 80, 196)");
  });

  it("повертає rgb рядок", () => {
    const result = shadeHex("#10b981", 0);
    expect(result).toBe("rgb(16, 185, 129)");
  });
});

describe("getDayColor", () => {
  it("повертає undefined для порожнього масиву подій", () => {
    const hexMap = new Map<string, string>([["Проєкт A", "#3b82f6"]]);
    const result = getDayColor([], hexMap);
    expect(result).toBeUndefined();
  });

  it("повертає градієнт для однієї події", () => {
    const hexMap = new Map<string, string>([["Проєкт A", "#3b82f6"]]);
    const events = [{ project: "Проєкт A" }];
    const result = getDayColor(events, hexMap);
    expect(result).toContain("linear-gradient(to bottom");
    expect(result).toContain("rgb");
  });

  it("повертає градієнт для кількох подій одного проєкту", () => {
    const hexMap = new Map<string, string>([["Проєкт A", "#10b981"]]);
    const events = [{ project: "Проєкт A" }, { project: "Проєкт A" }];
    const result = getDayColor(events, hexMap);
    expect(result).toContain("linear-gradient(to bottom");
  });

  it("повертає багатоколірний градієнт для різних проєктів", () => {
    const hexMap = new Map<string, string>([
      ["Проєкт A", "#3b82f6"],
      ["Проєкт B", "#ef4444"],
    ]);
    const events = [{ project: "Проєкт A" }, { project: "Проєкт B" }];
    const result = getDayColor(events, hexMap);
    expect(result).toContain("linear-gradient(to bottom");
    expect(result).toContain("rgb");
  });

  it("використовує PROJECT_HEX.blue як fallback при відсутньому проєкті", () => {
    const hexMap = new Map<string, string>();
    const events = [{ project: "Невідомий" }];
    const result = getDayColor(events, hexMap);
    expect(result).toContain(shadeHex(PROJECT_HEX.blue, 35).split(",")[0]);
  });
});

```

# FILE: apps/frontend/src/tests/unit/calendar/date.test.ts

```
import { describe, it, expect } from "vitest";
import {
  toISODate,
  getDaysInMonth,
  getFirstDayOfMonth,
  isPastDay,
  buildMonthDays,
} from "../../../features/calendar/utils/date";

describe("toISODate", () => {
  it("форматує дату в ISO без часу", () => {
    expect(toISODate(new Date(2026, 6, 10))).toBe("2026-07-10");
  });
});

describe("getDaysInMonth", () => {
  it("повертає 31 для січня", () => {
    expect(getDaysInMonth(2026, 0)).toBe(31);
  });

  it("повертає 28 для лютого невисокосного року", () => {
    expect(getDaysInMonth(2026, 1)).toBe(28);
  });

  it("повертає 29 для лютого високосного року", () => {
    expect(getDaysInMonth(2024, 1)).toBe(29);
  });

  it("повертає 30 для квітня", () => {
    expect(getDaysInMonth(2026, 3)).toBe(30);
  });
});

describe("getFirstDayOfMonth", () => {
  it("понеділок (0) для 2026-06-01 (перший день місяця)", () => {
    expect(getFirstDayOfMonth(2026, 5)).toBe(0);
  });

  it("правильний день для 2026-07-01 (середа = 2)", () => {
    expect(getFirstDayOfMonth(2026, 6)).toBe(2);
  });
});

describe("isPastDay", () => {
  it("минулий день повертає true", () => {
    expect(isPastDay(new Date(2020, 0, 1))).toBe(true);
  });

  it("сьогодні повертає false", () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    expect(isPastDay(today)).toBe(false);
  });
});

describe("buildMonthDays", () => {
  it("повертає масив з 33 елементів для липня 2026 (31 день, початок з середи)", () => {
    const days = buildMonthDays(2026, 6);
    expect(days.length).toBe(33);
    expect(days[0]).toBeNull();
    expect(days[1]).toBeNull();
    expect(days[2]?.getDate()).toBe(1);
  });

  it("перші null елементи відповідають зміщенню", () => {
    const days = buildMonthDays(2026, 6);
    const firstDay = getFirstDayOfMonth(2026, 6);
    const nulls = days.filter((d) => d === null).length;
    expect(nulls).toBe(firstDay);
  });
});

```

# FILE: apps/frontend/src/tests/unit/exportCsv.test.ts

```
import { describe, it, expect, vi, beforeEach } from "vitest";
import { exportCsv } from "../../utils/exportCsv";

let capturedBlob: Blob | undefined;
const revokeObjectURL = vi.fn();

beforeEach(() => {
  vi.restoreAllMocks();
  capturedBlob = undefined;
  revokeObjectURL.mockClear();
  vi.stubGlobal("URL", {
    createObjectURL: vi.fn((blob: Blob) => {
      capturedBlob = blob;
      return "blob:mock";
    }),
    revokeObjectURL,
  });
});

describe("exportCsv", () => {
  it("нічого не робить для порожнього масиву", () => {
    exportCsv([]);
    expect(capturedBlob).toBeUndefined();
  });

  it("створює Blob з заголовками", async () => {
    exportCsv([{ name: "Test" }]);
    expect(capturedBlob).toBeDefined();
    expect(capturedBlob!.type).toBe("text/csv;charset=utf-8;bom=true");
    const text = await capturedBlob!.text();
    expect(text).toContain("name");
    expect(text).toMatch(/Test/);
  });

  it("генерує правильний CSV для простих даних", async () => {
    exportCsv([{ name: "Test", city: "Lviv" }]);
    const text = await capturedBlob!.text();
    expect(text).toContain("name,city");
    expect(text).toContain("Test,Lviv");
  });

  it("екранує коми, лапки та перенесення рядків", async () => {
    exportCsv([
      { name: "Smith, John", note: 'he said "hi"', desc: "line1\nline2" },
    ]);
    const text = await capturedBlob!.text();
    expect(text).toContain('"Smith, John"');
    expect(text).toContain('"he said ""hi"""');
    expect(text).toContain('"line1\nline2"');
  });

  it("додає елемент <a> в document.body і клікає", () => {
    const clickSpy = vi.fn();
    const origCreate = Element.prototype.cloneNode.name
      ? document.createElement
      : document.createElement;
    const realCreate = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag) => {
      const el = realCreate(tag);
      el.click = clickSpy;
      return el;
    });
    const appendSpy = vi.spyOn(document.body, "appendChild");
    const removeSpy = vi.spyOn(document.body, "removeChild");

    exportCsv([{ col: "val" }]);

    expect(capturedBlob).toBeDefined();
    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(appendSpy.mock.calls[0][0]).toBe(removeSpy.mock.calls[0][0]);
  });

  it("встановлює filename на <a>.download", () => {
    let anchor: HTMLAnchorElement | undefined;
    const realCreate = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag) => {
      const el = realCreate(tag) as HTMLAnchorElement;
      anchor = el;
      return el;
    });

    exportCsv([{ col: "val" }], "my-report.csv");
    expect(anchor?.download).toBe("my-report.csv");
  });

  it("використовує дефолтний filename export.csv", () => {
    let anchor: HTMLAnchorElement | undefined;
    const realCreate = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag) => {
      const el = realCreate(tag) as HTMLAnchorElement;
      anchor = el;
      return el;
    });

    exportCsv([{ col: "val" }]);
    expect(anchor?.download).toBe("export.csv");
  });

  it("викликає URL.revokeObjectURL після кліка", () => {
    const realCreate = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag) => {
      return realCreate(tag);
    });

    exportCsv([{ col: "val" }]);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock");
  });

  it("порожні значення замінює на порожній рядок", async () => {
    exportCsv([
      { name: "Test", city: undefined as any, note: undefined as any },
    ]);
    const text = await capturedBlob!.text();
    expect(text).toContain("Test,,");
  });
});

```

# FILE: apps/frontend/src/tests/unit/formatCurrency.test.ts

```
import { describe, it, expect } from "vitest";
import { formatCurrency } from "../../utils/formatCurrency";

describe("formatCurrency", () => {
  it("форматує ціле число з розділювачем тисяч (uk-UA)", () => {
    expect(formatCurrency(10000)).toBe("10\u00A0000");
  });

  it("округлює дробові суми вгору/вниз коректно", () => {
    expect(formatCurrency(9999.6)).toBe("10\u00A0000");
    expect(formatCurrency(9999.4)).toBe("9\u00A0999");
  });

  it("повертає 0 для undefined", () => {
    expect(formatCurrency(undefined)).toBe("0");
  });

  it("повертає 0 для null", () => {
    expect(formatCurrency(null)).toBe("0");
  });

  it("повертає 0 для NaN", () => {
    expect(formatCurrency(NaN)).toBe("0");
  });

  it("коректно форматує 0", () => {
    expect(formatCurrency(0)).toBe("0");
  });

  it("не ламається на дуже великих сумах", () => {
    expect(formatCurrency(12345678)).toBe("12\u00A0345\u00A0678");
  });

  it("від'ємні суми форматуються з мінусом", () => {
    expect(formatCurrency(-500)).toBe("-500");
  });
});

```

# FILE: apps/frontend/src/tests/unit/hooks/useCities.test.tsx

```
import { renderHook, waitFor } from "@testing-library/react";
import { useCities } from "../../../hooks/useCities";
import { useAddCity } from "../../../hooks/useApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCities", () => {
  it("fetches cities successfully", async () => {
    const { result } = renderHook(() => useCities(), { wrapper: createWrapper() });
    
    await waitFor(() => {
      if (result.current.isError) throw result.current.error;
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.length).toBeGreaterThan(0);
    expect(result.current.data?.[0].name).toBe("Львів");
  });
});

describe("useAddCity", () => {
  it("mutates and updates query cache with new city", async () => {
    let addedCity: any;
    server.use(
      http.post("http://localhost:3000/api/cities", async ({ request }) => {
        const body = await request.json();
        addedCity = { id: "new-city-1", name: (body as any).name };
        return HttpResponse.json(addedCity);
      })
    );

    const { result } = renderHook(() => useAddCity(), { wrapper: createWrapper() });
    
    result.current.mutate("Тернопіль");
    
    await waitFor(() => {
      if (result.current.isError) throw result.current.error;
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual({ id: "new-city-1", name: "Тернопіль" });
  });
});

```

# FILE: apps/frontend/src/tests/unit/hooks/useSchoolProfile.test.tsx

```
import { renderHook, waitFor } from "@testing-library/react";
import { useSchool, useSchoolEvents, useCreateEvent, useUpdateEventStatus } from "../../../hooks/useSchoolProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useSchoolProfile hooks", () => {
  describe("useSchool", () => {
    it("fetches school details successfully", async () => {
      const { result } = renderHook(() => useSchool("school-1"), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.name).toBe("Школа №1");
      expect(result.current.data?.childrenCount).toBe(300);
    });

    it("does not fetch if id is undefined", () => {
      const { result } = renderHook(() => useSchool(undefined), { wrapper: createWrapper() });
      expect(result.current.isFetching).toBe(false);
    });
  });

  describe("useSchoolEvents", () => {
    it("fetches school events successfully", async () => {
      const { result } = renderHook(() => useSchoolEvents("school-1"), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data?.length).toBeGreaterThan(0);
      expect(result.current.data?.[0].project).toBe("Голограма для школи");
    });
  });

  describe("useCreateEvent", () => {
    it("mutates and invalidates schoolEvents query", async () => {
      let createdEvent: any;
      server.use(
        http.post("http://localhost:3000/api/events", async ({ request }) => {
          const body = await request.json();
          createdEvent = { id: "new-event", ...(body as any) };
          return HttpResponse.json(createdEvent);
        })
      );

      const { result } = renderHook(() => useCreateEvent(), { wrapper: createWrapper() });
      
      result.current.mutate({
        schoolId: "school-1",
        project: "New Project",
        date: "2026-08-01",
      } as any);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual(createdEvent);
    });
  });

  describe("useUpdateEventStatus", () => {
    it("updates status and applies optimistic updates", async () => {
      let patchedStatus: string | undefined;
      server.use(
        http.patch("http://localhost:3000/api/events/:eventId/status", async ({ request }) => {
          const body = await request.json() as any;
          patchedStatus = body.status;
          return HttpResponse.json({ id: "event-1", status: body.status });
        })
      );

      const { result } = renderHook(() => useUpdateEventStatus(), { wrapper: createWrapper() });
      
      result.current.mutate({
        eventId: "event-1",
        status: "DONE",
        actionName: "Завершено",
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(patchedStatus).toBe("DONE");
    });
  });
});

```

# FILE: apps/frontend/src/tests/unit/navTabs.test.ts

```
import { describe, it, expect } from "vitest";
import { NAV_TABS, ADMIN_TABS } from "../../constants/navTabs";

describe("NAV_TABS", () => {
  it("має правильну кількість вкладок", () => {
    expect(NAV_TABS.length).toBe(6);
  });

  it("всі вкладки мають to, icon, label", () => {
    for (const tab of NAV_TABS) {
      expect(tab.to).toBeTruthy();
      expect(tab.icon).toBeTruthy();
      expect(tab.label).toBeTruthy();
    }
  });

  it("/employees доступний лише для SUPERADMIN", () => {
    const emp = NAV_TABS.find((t) => t.to === "/employees");
    expect(emp?.roles).toEqual(["SUPERADMIN"]);
  });

  it("/dashboard доступний для SUPERADMIN та MANAGER", () => {
    const dash = NAV_TABS.find((t) => t.to === "/dashboard");
    expect(dash?.roles).toEqual(["SUPERADMIN", "MANAGER"]);
  });

  it("вкладки без roles доступні всім", () => {
    const publicTabs = NAV_TABS.filter((t) => !t.roles);
    expect(publicTabs.length).toBeGreaterThanOrEqual(3);
    for (const t of publicTabs) {
      expect(t.roles).toBeUndefined();
    }
  });

  it("/schools, /kindergartens, /finance, /calendar не мають обмежень", () => {
    for (const path of ["/schools", "/kindergartens", "/finance", "/calendar"]) {
      const tab = NAV_TABS.find((t) => t.to === path);
      expect(tab?.roles).toBeUndefined();
    }
  });
});

describe("ADMIN_TABS", () => {
  it("має лише /cities для SUPERADMIN", () => {
    expect(ADMIN_TABS.length).toBe(1);
    expect(ADMIN_TABS[0].to).toBe("/cities");
    expect(ADMIN_TABS[0].roles).toEqual(["SUPERADMIN"]);
  });
});

```

# FILE: apps/frontend/src/tests/unit/reactImports.test.ts

```
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const HOOKS = [
  "useState", "useEffect", "useCallback", "useMemo", "useRef",
  "useContext", "useReducer", "useLayoutEffect", "useImperativeHandle",
  "useDebugValue", "useTransition", "useDeferredValue", "useId",
  "useSyncExternalStore", "useInsertionEffect",
];

const pagesDir = path.resolve(__dirname, "../../pages");

function getAllImportedFromReact(content: string): Set<string> {
  const imported = new Set<string>();

  // Normalize multi-line imports: join lines from `import` to `;`
  const normalized = content.replace(/import\s+[\s\S]*?;/g, (match) =>
    match.replace(/\n\s*/g, " "),
  );

  for (const line of normalized.split("\n")) {
    if (!/from\s+["']react["']/.test(line)) continue;

    // default import: import React from "react" or import React, { ... }
    const defaultMatch = line.match(/^import\s+(\w+)/);
    if (defaultMatch) imported.add(defaultMatch[1]);

    // named imports: { useState, useEffect }
    const namedMatch = line.match(/\{([^}]+)\}/);
    if (namedMatch) {
      const raw = namedMatch[1].replace(/\s+/g, " ");
      for (const name of raw.split(",")) {
        const trimmed = name.trim();
        if (trimmed) imported.add(trimmed);
      }
    }
  }

  return imported;
}

function getUsedHooks(content: string): string[] {
  const used: string[] = [];
  for (const hook of HOOKS) {
    const regex = new RegExp(`\\b${hook}\\b`, "g");
    if (regex.test(content)) {
      used.push(hook);
    }
  }
  return used;
}

describe("React hooks imports in page files", () => {
  const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".tsx"));

  for (const file of files) {
    it(`${file} має всі необхідні імпорти React-хуків`, () => {
      const content = fs.readFileSync(path.join(pagesDir, file), "utf-8");
      const imported = getAllImportedFromReact(content);
      const usedHooks = getUsedHooks(content);
      const missingHooks = usedHooks.filter((hook) => !imported.has(hook));

      expect(
        missingHooks,
        `${file}: використовує ${missingHooks.join(", ")}, але не імпортує з "react"`,
      ).toEqual([]);
    });
  }
});

```

# FILE: apps/frontend/src/tests/unit/roles.test.ts

```
import { describe, it, expect } from "vitest";
import { hasRole } from "../../utils/roles";

describe("hasRole", () => {
  it("повертає true, якщо allowedRoles не задано", () => {
    expect(hasRole("SUPERADMIN")).toBe(true);
    expect(hasRole("HOST")).toBe(true);
    expect(hasRole(undefined)).toBe(true);
  });

  it("повертає true, якщо роль користувача в списку", () => {
    expect(hasRole("SUPERADMIN", ["SUPERADMIN"])).toBe(true);
    expect(hasRole("MANAGER", ["SUPERADMIN", "MANAGER"])).toBe(true);
  });

  it("повертає false, якщо роль користувача не в списку", () => {
    expect(hasRole("HOST", ["SUPERADMIN"])).toBe(false);
    expect(hasRole("DRIVER", ["SUPERADMIN", "MANAGER"])).toBe(false);
  });

  it("повертає false, якщо userRole undefined, а allowedRoles задано", () => {
    expect(hasRole(undefined, ["SUPERADMIN"])).toBe(false);
  });
});

```

# FILE: apps/frontend/src/tests/unit/schoolUtils.test.ts

```
import { describe, it, expect } from "vitest";
import {
  classifySchool,
  classifySize,
} from "../../components/schools/schoolUtils";

describe("classifySchool", () => {
  it("повертає 'new' якщо немає подій", () => {
    expect(classifySchool({ events: [] })).toBe("new");
    expect(classifySchool({})).toBe("new");
  });

  it("повертає 'planned' якщо остання подія FIRST_CONTACT або DATE_CONFIRMED", () => {
    expect(classifySchool({ events: [{ status: "FIRST_CONTACT" }] })).toBe(
      "planned",
    );
    expect(classifySchool({ events: [{ status: "DATE_CONFIRMED" }] })).toBe(
      "planned",
    );
  });

  it("повертає 'inProgress' якщо подія в процесі", () => {
    expect(classifySchool({ events: [{ status: "IN_PROGRESS" }] })).toBe(
      "inProgress",
    );
    expect(classifySchool({ events: [{ status: "PREPARATION" }] })).toBe(
      "inProgress",
    );
  });

  it("повертає 'done' якщо подія завершена", () => {
    expect(classifySchool({ events: [{ status: "RE_SALE" }] })).toBe("done");
  });
});

describe("classifySize для школи", () => {
  it("малі < 500", () => {
    expect(classifySize({ childrenCount: 300 }, "Школа")).toBe("small");
  });

  it("середні 500-900", () => {
    expect(classifySize({ childrenCount: 700 }, "Школа")).toBe("medium");
  });

  it("великі 900+", () => {
    expect(classifySize({ childrenCount: 1000 }, "Школа")).toBe("large");
  });
});

describe("classifySize для садочку", () => {
  it("малі < 50", () => {
    expect(classifySize({ childrenCount: 30 }, "Садочок")).toBe("small");
  });

  it("середні 50-100", () => {
    expect(classifySize({ childrenCount: 75 }, "Садочок")).toBe("medium");
  });

  it("великі 100+", () => {
    expect(classifySize({ childrenCount: 120 }, "Садочок")).toBe("large");
  });
});

```

# FILE: apps/frontend/src/tests/unit/useDaysOff.test.tsx

```
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
  useDaysOff,
  useCreateDayOff,
  useDeleteDayOff,
} from "../../hooks/useDaysOff";

const { apiMock } = vi.hoisted(() => ({
  apiMock: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("../../config/api", () => ({
  api: apiMock,
}));

function createTestClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function createWrapper(client: QueryClient) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

describe("useDaysOff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("формує queryKey з from/to/cityId і staleTime=30000", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    const client = createTestClient();

    const { result } = renderHook(
      () => useDaysOff("2026-07-01", "2026-07-31", "city-1"),
      { wrapper: createWrapper(client) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiMock.get).toHaveBeenCalledWith(
      "/days-off?from=2026-07-01&to=2026-07-31&cityId=city-1",
    );

    const query = client
      .getQueryCache()
      .find({ queryKey: ["daysOff", "2026-07-01", "2026-07-31", "city-1"] });
    expect(query?.options.staleTime).toBe(30 * 1000);
  });

  it("без фільтрів викликає /days-off?", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    const client = createTestClient();

    const { result } = renderHook(() => useDaysOff(), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiMock.get).toHaveBeenCalledWith("/days-off?");
  });

  it("лише from додає from-параметр", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    const client = createTestClient();

    const { result } = renderHook(() => useDaysOff("2026-07-01"), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiMock.get).toHaveBeenCalledWith("/days-off?from=2026-07-01");
  });

  it("лише to додає to-параметр", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    const client = createTestClient();

    const { result } = renderHook(
      () => useDaysOff(undefined, "2026-07-31"),
      { wrapper: createWrapper(client) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiMock.get).toHaveBeenCalledWith("/days-off?to=2026-07-31");
  });

  it("лише cityId додає cityId-параметр", async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    const client = createTestClient();

    const { result } = renderHook(() => useDaysOff(undefined, undefined, "city-1"), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(apiMock.get).toHaveBeenCalledWith("/days-off?cityId=city-1");
  });

  it("пробрасыває помилку API у query state", async () => {
    apiMock.get.mockRejectedValueOnce(new Error("days-off failed"));
    const client = createTestClient();

    const { result } = renderHook(() => useDaysOff(), {
      wrapper: createWrapper(client),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(Error);
  });
});

describe("useCreateDayOff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("POST /days-off з payload {date} і invalidateQueries на success", async () => {
    apiMock.post.mockResolvedValueOnce({ data: { id: "d1" } });
    const client = createTestClient();
    const invalidateSpy = vi.spyOn(client, "invalidateQueries");
    const setQueryDataSpy = vi.spyOn(client, "setQueryData");

    const { result } = renderHook(() => useCreateDayOff(), {
      wrapper: createWrapper(client),
    });

    await act(async () => {
      await result.current.mutateAsync({ date: "2026-07-10" });
    });

    expect(apiMock.post).toHaveBeenCalledWith("/days-off", { date: "2026-07-10" });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["daysOff"] });
    expect(setQueryDataSpy).not.toHaveBeenCalled();
  });

  it("POST /days-off з payload {date,userId}", async () => {
    apiMock.post.mockResolvedValueOnce({ data: { id: "d2" } });
    const client = createTestClient();

    const { result } = renderHook(() => useCreateDayOff(), {
      wrapper: createWrapper(client),
    });

    await act(async () => {
      await result.current.mutateAsync({ date: "2026-07-10", userId: "user-1" });
    });

    expect(apiMock.post).toHaveBeenCalledWith("/days-off", {
      date: "2026-07-10",
      userId: "user-1",
    });
  });

  it("на error не викликає invalidateQueries", async () => {
    apiMock.post.mockRejectedValueOnce(new Error("create failed"));
    const client = createTestClient();
    const invalidateSpy = vi.spyOn(client, "invalidateQueries");

    const { result } = renderHook(() => useCreateDayOff(), {
      wrapper: createWrapper(client),
    });

    await expect(
      act(async () => {
        await result.current.mutateAsync({ date: "2026-07-10" });
      }),
    ).rejects.toThrow("create failed");

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});

describe("useDeleteDayOff", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("DELETE /days-off/:id і invalidateQueries на success", async () => {
    apiMock.delete.mockResolvedValueOnce({ data: { success: true } });
    const client = createTestClient();
    const invalidateSpy = vi.spyOn(client, "invalidateQueries");
    const setQueryDataSpy = vi.spyOn(client, "setQueryData");

    const { result } = renderHook(() => useDeleteDayOff(), {
      wrapper: createWrapper(client),
    });

    await act(async () => {
      await result.current.mutateAsync("dayoff-1");
    });

    expect(apiMock.delete).toHaveBeenCalledWith("/days-off/dayoff-1");
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["daysOff"] });
    expect(setQueryDataSpy).not.toHaveBeenCalled();
  });

  it("на error не викликає invalidateQueries", async () => {
    apiMock.delete.mockRejectedValueOnce(new Error("delete failed"));
    const client = createTestClient();
    const invalidateSpy = vi.spyOn(client, "invalidateQueries");

    const { result } = renderHook(() => useDeleteDayOff(), {
      wrapper: createWrapper(client),
    });

    await expect(
      act(async () => {
        await result.current.mutateAsync("dayoff-1");
      }),
    ).rejects.toThrow("delete failed");

    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});

```

# FILE: apps/frontend/src/tests/unit/useDebounce.test.ts

```
import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../../hooks/useDebounce";

describe("useDebounce", () => {
  it("повертає початкове значення одразу", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));
    expect(result.current).toBe("hello");
  });

  it("оновлює debouncedValue після затримки", async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "a" } },
    );

    expect(result.current).toBe("a");

    rerender({ value: "b" });
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe("b");

    vi.useRealTimers();
  });

  it("скидає таймер при повторному виклику до завершення затримки", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "b" });
    act(() => vi.advanceTimersByTime(300));
    rerender({ value: "c" });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe("c");

    vi.useRealTimers();
  });

  it("працює з числовими значеннями", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 0 } },
    );

    rerender({ value: 42 });
    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe(42);

    vi.useRealTimers();
  });

  it("працює з delay=0", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 0),
      { initialProps: { value: "x" } },
    );

    rerender({ value: "y" });
    act(() => vi.advanceTimersByTime(0));
    expect(result.current).toBe("y");

    vi.useRealTimers();
  });
});

```

# FILE: apps/frontend/src/types/index.ts

```
export interface City {
  id: string;
  name: string;
  manager?: { id: string; name: string; phone: string } | null;
  plannedEvents?: number;
  completedEvents?: number;
  schoolsCount?: number;
}

export interface School {
  id: string;
  name: string;
  type: string;
  cityId: string;
  address?: string;
  director?: string;
  phone?: string;
  email?: string;
  childrenCount?: number;
  notes?: string;
  isHotClient?: boolean;
  city?: { id: string; name: string };
  events?: Event[];
}

export interface SchoolProfileData {
  id: string;
  cityId: string;
  name: string;
  type: string;
  city: string;
  address: string;
  director: string;
  phone: string;
  email: string;
  childrenCount: number;
  notes: string;
}

export interface SchoolContact {
  contactName: string;
  phone: string;
  role?: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface EventFormData {
  project: string;
  date: string;
  time: string;
  childrenPlanned: string;
  price: string;
  address: string;
  contactPerson: string;
  contactPhone: string;
}

export interface CreateEventPayload {
  project: string;
  date: string;
  time: string;
  childrenPlanned: number;
  price: number;
  address: string;
  contactPerson: string;
  contactPhone: string;
  schoolId: string;
  cityId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  cityId?: string;
  city?: { id: string; name: string };
}

export interface EventHistory {
  id: string;
  action: string;
  comment?: string;
  userName: string;
  role: string;
  createdAt: string;
}

export interface ExpenseItem {
  category?: string;
  name?: string;
  amount: number;
}

export interface SalaryItem {
  userId: string;
  name: string;
  amount: number;
  role?: string;
}

export interface EventReport {
  childrenCount: number;
  totalSum: number;
  schoolSum: number;
  remainderSum: number;
  directorSatisfied?: boolean;
  teachersSatisfied?: boolean;
  hadIssues?: boolean;
  comment?: string;
  rating?: number;
  expenses: ExpenseItem[];
  salaries: SalaryItem[];
}

export interface Event {
  id: string;
  schoolId: string;
  cityId: string;
  project: string;
  date: string;
  time?: string;
  status: string;
  childrenPlanned?: number;
  price?: number;
  paymentMethod?: string;
  address?: string;
  contactPerson?: string;
  contactPhone?: string;
  crew?: Crew;
  report?: EventReport;
  history?: EventHistory[];
  preparation?: EventPreparation;
  school?: { id: string; name: string; type: string };
  city?: { id: string; name: string };
}

export interface Crew {
  id: string;
  name: string;
  cityId: string;
  hostId?: string;
  driverId?: string;
  host?: { id: string; name: string };
  driver?: { id: string; name: string };
  car?: string;
  phone?: string;
}

import type { PreparationStatus } from '../utils/preparationStatus';

export interface EventPreparation {
  assignCrew: PreparationStatus;
  bookEquipment: PreparationStatus;
  prepareDocs: PreparationStatus;
  prepareMaterials: PreparationStatus;
  remindSchool: PreparationStatus;
}

export interface CityProfile extends City {
  events: Event[];
  crews: Crew[];
  schools?: School[];
}

export interface PipelineStage {
  key: string;
  name: string;
}

export interface DayOff {
  id: string;
  userId: string;
  date: string;
  user: { id: string; name: string; role: string; cityId: string | null };
}

export interface IssueReport {
  id: string;
  eventId: string;
  schoolName: string;
  eventName: string;
  message: string;
  cityId: string;
  status: string;
  createdAt: string;
}

export interface FinanceKpi {
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
  totalEvents: number;
}

export interface MonthlyFinance {
  month: string;
  revenue: number;
  profit: number;
}

export interface FinanceByProject {
  name: string;
  value: number;
}

export interface FinanceByCategory {
  name: string;
  value: number;
}

export interface FinanceTopSchool {
  name: string;
  count: number;
  revenue: number;
}

export interface FinanceEventItem {
  id: string;
  date: string;
  school: string;
  profit: number;
  revenue: number;
}

export interface FinanceFilterOptions {
  projects: string[];
  cities: { id: string; name: string }[];
}

export interface FinanceDashboardData {
  kpi: FinanceKpi;
  monthly: MonthlyFinance[];
  expectedRevenue: number;
  filters: FinanceFilterOptions;
  byProject?: FinanceByProject[];
  byExpenseCategory?: FinanceByCategory[];
  topSchools?: FinanceTopSchool[];
  topEvents?: FinanceEventItem[];
  worstEvents?: FinanceEventItem[];
}

export type UserRole = "SUPERADMIN" | "OWNER" | "MANAGER" | "HOST" | "DRIVER";

```

# FILE: apps/frontend/src/utils/exportCsv.ts

```
type Row = Record<string, string>;

export function exportCsv(data: Row[], filename = "export.csv") {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => {
        const val = row[h] ?? "";
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      }).join(","),
    ),
  ];

  const bom = "\uFEFF";
  const blob = new Blob([bom + csvRows.join("\n")], { type: "text/csv;charset=utf-8;bom=true" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

```

# FILE: apps/frontend/src/utils/formatCurrency.ts

```
/**
 * Форматує суму у форматі uk-UA (для відображення в грн).
 * Захищає від NaN/undefined/null — завжди повертає валідний рядок.
 */
export function formatCurrency(amount: number | null | undefined): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(amount || 0));
}
```

# FILE: apps/frontend/src/utils/preparationStatus.ts

```
export type PreparationStatus = "PLANNED" | "IN_PROGRESS" | "DONE";

export const PREPARATION_STATUS_ORDER: PreparationStatus[] = [
  "PLANNED",
  "IN_PROGRESS",
  "DONE",
];

export const PREPARATION_STATUS_LABELS: Record<PreparationStatus, string> = {
  PLANNED: "Заплановано",
  IN_PROGRESS: "В процесі",
  DONE: "Виконано",
};

export function getNextPreparationStatus(
  current: PreparationStatus,
): PreparationStatus {
  const idx = PREPARATION_STATUS_ORDER.indexOf(current || "PLANNED");
  return PREPARATION_STATUS_ORDER[(idx + 1) % PREPARATION_STATUS_ORDER.length];
}

```

# FILE: apps/frontend/src/utils/roles.ts

```
export function hasRole(userRole: string | undefined, allowedRoles?: string[]): boolean {
  return !allowedRoles || (!!userRole && allowedRoles.includes(userRole));
}

```

# FILE: apps/frontend/tailwind.config.js

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f8fafc",
          muted: "#f1f5f9",
        },
        border: {
          DEFAULT: "#f1f5f9",
          strong: "#e2e8f0",
        },
        content: {
          primary: "#1e293b",
          secondary: "#475569",
          muted: "#94a3b8",
        },
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          DEFAULT: "#2563eb",
          600: "#1d4ed8",
          hover: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554",
        },
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          DEFAULT: "#10b981",
          600: "#059669",
          700: "#047857",
          subtle: "#ecfdf5",
        },
        danger: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          DEFAULT: "#e11d48",
          600: "#be123c",
          700: "#9f1239",
          subtle: "#fff1f2",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          DEFAULT: "#f59e0b",
          600: "#d97706",
          subtle: "#fffbeb",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        role: {
          admin: { bg: "#eef2ff", text: "#4338ca" },
          manager: { bg: "#eff6ff", text: "#2563eb" },
          host: { bg: "#f5f3ff", text: "#7c3aed" },
          driver: { bg: "#ecfdf5", text: "#059669" },
        },
      },
      borderRadius: {
        card: "1rem",
        "card-lg": "1.5rem",
        modal: "1.5rem",
        control: "0.75rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
        "card-hover": "0 8px 24px -4px rgb(0 0 0 / 0.10)",
        modal: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        dropdown: "0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
        popover: "0 12px 28px -4px rgb(0 0 0 / 0.12), 0 4px 8px -4px rgb(0 0 0 / 0.06)",
        lift: "0 4px 12px rgb(0 0 0 / 0.08)",
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "14px" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
      },
      transitionDuration: {
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
      },
      animation: {
        shimmer: "shimmer 1.4s linear infinite",
        "fade-in": "fadeIn 0.2s ease-out forwards",
        "modal-scale": "modalScale 0.3s ease-out forwards",
        "pop-in": "popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        modalScale: {
          from: { opacity: "0", transform: "scale(0.95) translateY(15px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        popIn: {
          "0%": { transform: "scale(0.7)", opacity: "0" },
          "60%": { transform: "scale(1.15)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

```

# FILE: apps/frontend/tsconfig.app.json

```


{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}



```

# FILE: apps/frontend/tsconfig.json

```


{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}



```

# FILE: apps/frontend/tsconfig.node.json

```


{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}



```

# FILE: apps/frontend/vercel.json

```


{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.svitlo-znan.app/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}


```

# FILE: apps/frontend/vite.config.ts

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("recharts")) return "recharts";
          if (id.includes("@tanstack/react-virtual")) return "tanstack";
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "html"],
      exclude: ["src/tests/**", "src/main.tsx"],
      thresholds: {
        statements: 70,
        branches: 50,
        functions: 60,
        lines: 70,
      },
    },
  },
});

```

# FILE: scripts/backup.sh

```
#!/usr/bin/env bash
set -euo pipefail
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="${BACKUP_DIR:-./backups}"
mkdir -p "$BACKUP_DIR"
pg_dump -F c -f "$BACKUP_DIR/backup_${TIMESTAMP}.dump" "$DIRECT_URL"
find "$BACKUP_DIR" -name "backup_*.dump" -mtime +14 -delete
echo "Backup saved: $BACKUP_DIR/backup_${TIMESTAMP}.dump"
```

# FILE: scripts/restore.sh

```
#!/usr/bin/env bash
set -euo pipefail
FILE="${1:?Usage: restore.sh <path-to-dump>}"
pg_restore --clean --if-exists --no-owner --no-privileges -d "$DIRECT_URL" "$FILE"
echo "Restore completed from $FILE"
```

