# FILE: apps/frontend/src/hooks/useInventory.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { InventoryItem, CreateInventoryPayload, UpdateInventoryPayload } from "../types";

export function useInventory(filters?: { category?: string; cityId?: string; lowStock?: string; search?: string }) {
  const params = new URLSearchParams();
  if (filters?.category) params.set("category", filters.category);
  if (filters?.cityId) params.set("cityId", filters.cityId);
  if (filters?.lowStock) params.set("lowStock", filters.lowStock);
  if (filters?.search) params.set("search", filters.search);
  const qs = params.toString();

  return useQuery({
    queryKey: ["inventory", filters],
    queryFn: () => api.get<InventoryItem[]>(`/inventory${qs ? `?${qs}` : ""}`).then(r => r.data),
    staleTime: 30 * 1000,
  });
}

export function useLowStockItems() {
  return useQuery({
    queryKey: ["inventory", "low-stock"],
    queryFn: () => api.get<InventoryItem[]>("/inventory/low-stock").then(r => r.data),
    staleTime: 30 * 1000,
  });
}

export function useCreateInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInventoryPayload) =>
      api.post<InventoryItem>("/inventory", data).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useUpdateInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UpdateInventoryPayload) =>
      api.patch<InventoryItem>(`/inventory/${id}`, data).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useDeleteInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/inventory/${id}`).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useInventoryByProject(project: string | undefined) {
  return useQuery({
    queryKey: ["inventory", "by-project", project],
    queryFn: () =>
      api
        .get<InventoryItem[]>(`/inventory/by-project?project=${encodeURIComponent(project ?? "")}`)
        .then((r) => r.data),
    enabled: !!project,
    staleTime: 30 * 1000,
  });
}

export function useAddStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      api.post(`/inventory/${id}/add-stock`, { quantity }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

```

# FILE: apps/frontend/src/hooks/useNotifications.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface NotificationItem {
  id: string;
  userId: string;
  type: string;
  payload: Record<string, unknown>;
  readAt: string | null;
  createdAt: string;
}

export function useNotifications(page = 1) {
  return useQuery({
    queryKey: ["notifications", page],
    queryFn: () => api.get<{ items: NotificationItem[]; total: number; page: number; pageCount: number }>("/notifications", { params: { page } }).then(r => r.data),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => api.get<{ count: number }>("/notifications/unread-count").then(r => r.data),
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/notifications/${id}/read`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notifications"] }); },
  });
}

export function useMarkAllRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.patch("/notifications/read-all"),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["notifications"] }); },
  });
}

```

# FILE: apps/frontend/src/hooks/useReports.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { EventReport } from "../types";

export function useReport(eventId: string | undefined) {
  return useQuery({
    queryKey: ["report", eventId],
    queryFn: () =>
      api
        .get<EventReport>(`/reports/event/${eventId}`)
        .then((r) => r.data),
    enabled: !!eventId,
    staleTime: 30 * 1000,
  });
}

export function useSubmittedReports() {
  return useQuery({
    queryKey: ["reports", "submitted"],
    queryFn: () =>
      api
        .get<{ items: EventReport[]; total: number; page: number; pageCount: number }>(
          "/reports/submitted",
        )
        .then((r) => r.data.items),
    staleTime: 30 * 1000,
  });
}

export function useCreateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: {
      eventId: string;
      announcementDone?: boolean;
      materialShown?: boolean;
      childrenCount?: number;
      classesCount?: number;
      privilegedCount?: number;
      showingsCount?: number;
      totalSum?: number;
      schoolSum?: number;
      remainderSum?: number;
      rating?: number;
      directorSatisfied?: boolean;
      teachersSatisfied?: boolean;
      hadIssues?: boolean;
      comment?: string;
    }) => api.post<EventReport>("/reports", dto).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
    },
  });
}

export function useUpdateReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...dto
    }: {
      id: string;
      announcementDone?: boolean;
      materialShown?: boolean;
      childrenCount?: number;
      classesCount?: number;
      privilegedCount?: number;
      showingsCount?: number;
      totalSum?: number;
      schoolSum?: number;
      remainderSum?: number;
      rating?: number;
      directorSatisfied?: boolean;
      teachersSatisfied?: boolean;
      hadIssues?: boolean;
      comment?: string;
    }) => api.patch<EventReport>(`/reports/${id}`, dto).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
    },
  });
}

export function useSubmitReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.post<EventReport>(`/reports/${id}/submit`).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}

export function useApproveReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.post<EventReport>(`/reports/${id}/approve`).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}

export function useRequestRevision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      api
        .post<EventReport>(`/reports/${id}/request-revision`, { comment })
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}

export function useRejectReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: string; comment: string }) =>
      api
        .post<EventReport>(`/reports/${id}/reject`, { comment })
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["report", data.eventId], data);
      qc.invalidateQueries({ queryKey: ["eventFull", data.eventId] });
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useSalary.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { SalaryRecord } from "../types";

export function useMySalary(cityId?: string) {
  return useQuery({
    queryKey: ["salary", "mine", cityId],
    queryFn: () =>
      api
        .get<SalaryRecord[]>("/salary/mine", { params: { cityId } })
        .then((r) => r.data),
    staleTime: 30 * 1000,
  });
}

export function useAllSalary(cityId?: string) {
  return useQuery({
    queryKey: ["salary", "all", cityId],
    queryFn: () =>
      api
        .get<SalaryRecord[]>("/salary", { params: { cityId } })
        .then((r) => r.data),
    staleTime: 30 * 1000,
  });
}

export function useCreateSalary() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: {
      reportId: string;
      items: { employeeId: string; amount: number; comment?: string }[];
    }) => api.post("/salary", dto).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["salary"] });
    },
  });
}

export function useMarkPaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.patch(`/salary/${id}/mark-paid`).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["salary"] });
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useSchoolComments.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { CommentType } from "../types";

export interface SchoolCommentItem {
  id: string;
  schoolId: string;
  authorId: string;
  type: CommentType;
  text: string;
  createdAt: string;
  author: { id: string; name: string; role: string };
}

export function useSchoolComments(schoolId: string, type?: CommentType, page = 1) {
  return useQuery({
    queryKey: ["school-comments", schoolId, type, page],
    queryFn: () =>
      api
        .get<{ items: SchoolCommentItem[]; total: number; page: number; pageCount: number }>(
          `/schools/${schoolId}/comments`,
          { params: { type, page, take: 20 } },
        )
        .then((r) => r.data),
    enabled: !!schoolId,
    staleTime: 60 * 1000,
  });
}

export function useCreateSchoolComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      schoolId,
      type,
      text,
    }: {
      schoolId: string;
      type: CommentType;
      text: string;
    }) =>
      api
        .post(`/schools/${schoolId}/comments`, { type, text })
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["school-comments", vars.schoolId] });
    },
  });
}

export function useDeleteSchoolComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      schoolId,
      commentId,
    }: {
      schoolId: string;
      commentId: string;
    }) => api.delete(`/schools/${schoolId}/comments/${commentId}`).then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["school-comments", vars.schoolId] });
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
      qc.invalidateQueries({ queryKey: ["reports", "submitted"] });
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
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

# FILE: apps/frontend/src/lib/motion.ts

```
import { useEffect, useMemo, useRef, useState } from "react";
import type { Variants } from "framer-motion";

/* ─── Reduced Motion ─── */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const localStorageKey = "opencode:reduced-motion";

function getStoredReducedMotion(): boolean | null {
  try {
    const v = localStorage.getItem(localStorageKey);
    if (v === "true") return true;
    if (v === "false") return false;
  } catch {
    /* SSR / private mode */
  }
  return null;
}

/** React hook: returns true if user prefers reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    const stored = getStoredReducedMotion();
    return stored !== null ? stored : prefersReducedMotion();
  });

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const handler = (e: MediaQueryListEvent) => {
      if (getStoredReducedMotion() === null) setReduced(e.matches);
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return reduced;
}

/** React hook: staggered entrance for list items. */
export function useStaggeredEntrance(
  opts?: { delayChildren?: number; stagger?: number },
) {
  const reduced = useReducedMotion();
  const { delayChildren = 0.04, stagger = 0.045 } = opts ?? {};

  return useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: reduced ? 0 : delayChildren,
          staggerChildren: reduced ? 0 : stagger,
          when: "beforeChildren" as const,
        },
      },
    }),
    [delayChildren, stagger, reduced],
  );
}

/** React hook: animates a number from 0 → target. Returns current display value. */
export function useCountUp(
  target: number,
  opts?: { duration?: number; decimals?: number; enabled?: boolean },
): number {
  const { duration = 0.8, decimals = 0, enabled = true } = opts ?? {};
  const reduced = useReducedMotion();
  const skip = reduced || !enabled;
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const fromRef = useRef(0);
  const prevTargetRef = useRef(target);

  useEffect(() => {
    if (skip) return;
    fromRef.current = prevTargetRef.current;
    prevTargetRef.current = target;
    startRef.current = 0;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = fromRef.current + (target - fromRef.current) * eased;
      setDisplay(Number(current.toFixed(decimals)));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, decimals, skip]);

  return skip ? target : display;
}

/* ─── Durations ─── */

export const DUR = {
  instant: 0,
  micro: 0.075,
  fast: 0.15,
  normal: 0.2,
  moderate: 0.25,
  slow: 0.35,
  verySlow: 0.5,
  page: 0.35,
} as const;

/* ─── Easings ─── */

export const EASE = {
  standard: [0.4, 0, 0.2, 1] as const,
  decelerate: [0, 0, 0.2, 1] as const,
  accelerate: [0.4, 0, 1, 1] as const,
  spring: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.19, 1, 0.22, 1] as const,
  inOutExpo: [0.87, 0, 0.13, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
} as const;

/* ─── Springs ─── */

export const SPRING = {
  snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 300, damping: 25 },
  bouncy: { type: "spring" as const, stiffness: 350, damping: 20 },
  stiff: { type: "spring" as const, stiffness: 500, damping: 35 },
} as const;

/* ─── Transition Presets ─── */

export const TRANSITION = {
  hover: { type: "spring" as const, stiffness: 350, damping: 25 },
  tap: { duration: DUR.fast, ease: EASE.standard },
  focus: { duration: DUR.fast, ease: EASE.decelerate },
  color: { duration: DUR.normal, ease: EASE.standard },
  shadow: { duration: DUR.normal, ease: EASE.standard },
  position: { type: "spring" as const, stiffness: 350, damping: 30 },
  fade: { duration: DUR.normal, ease: EASE.decelerate },
  slideUp: { duration: DUR.moderate, ease: EASE.outExpo },
  slideDown: { duration: DUR.moderate, ease: EASE.outExpo },
  scale: { duration: DUR.normal, ease: EASE.outExpo },
  layout: { type: "spring" as const, stiffness: 400, damping: 30 },
} as const;

/* ─── Variant Presets ─── */

/** Backdrop fade in/out (modal overlay). */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.fast, ease: EASE.decelerate } },
  exit: { opacity: 0, transition: { duration: DUR.fast, ease: EASE.accelerate } },
};

/** Modal / sheet / bottom-sheet content. */
export const modalContentVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { ...SPRING.gentle } },
  exit: { opacity: 0, y: 12, scale: 0.97, transition: { duration: DUR.fast, ease: EASE.accelerate } },
};

/** Pop-in (badges, status pills, FAB). */
export const popInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { ...SPRING.bouncy } },
  exit: { opacity: 0, scale: 0.6, transition: { duration: DUR.fast, ease: EASE.accelerate } },
};

/** Card elevation hover (translate-y + shadow). */
export const cardHoverVariants: Variants = {
  rest: { y: 0, boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)" },
  hover: {
    y: -4,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)",
    transition: { duration: DUR.normal, ease: EASE.standard },
  },
};

/** Page / route transitions (used with AnimatePresence mode="wait"). */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.page, ease: EASE.outExpo, delay: 0.03 } },
  exit: { opacity: 0, y: -4, transition: { duration: DUR.fast, ease: EASE.accelerate } },
};

/** Simple fade transition. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.normal, ease: EASE.decelerate } },
  exit: { opacity: 0, transition: { duration: DUR.fast, ease: EASE.accelerate } },
};

/** Slide up entrance (content blocks, cards). */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.moderate, ease: EASE.outExpo } },
  exit: { opacity: 0, y: -10, transition: { duration: DUR.fast, ease: EASE.accelerate } },
};

/** Scale entrance (modals, popovers). */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { ...SPRING.gentle } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: DUR.fast, ease: EASE.accelerate } },
};

/** Stagger container — use with staggerItem children. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04, when: "beforeChildren" },
  },
};

/** Stagger item — each child inside staggerContainer. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.normal, ease: EASE.outExpo } },
};

/** Horizontal slide for carousel / tabs. */
export const slideXVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { ...SPRING.snappy } },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: DUR.fast, ease: EASE.accelerate } }),
};

/** Skeleton shimmer placeholder. */
export const skeletonPulse = {
  animate: { opacity: [0.4, 0.7, 0.4], transition: { duration: 1.4, repeat: Infinity, ease: "linear" as const } },
};

/** Checkmark success pop. */
export const checkmarkVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

/** Error shake. */
export const shakeVariants: Variants = {
  shake: { x: [0, -8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.4 } },
};

/** Tooltip / popover. */
export const tooltipVariants: Variants = {
  hidden: { opacity: 0, y: 4, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: DUR.fast, ease: EASE.outExpo } },
  exit: { opacity: 0, y: 2, scale: 0.98, transition: { duration: DUR.micro, ease: EASE.accelerate } },
};

/** Empty state illustration entrance. */
export const emptyStateVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.outExpo } },
};

/** Notification bell ring. */
export const bellRingVariants: Variants = {
  ring: {
    rotate: [0, 14, -12, 8, -6, 3, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

/** FAB entrance. */
export const fabVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { ...SPRING.bouncy } },
  exit: { opacity: 0, scale: 0.5, y: 10, transition: { duration: DUR.fast, ease: EASE.accelerate } },
};

/* ─── CSS-compatible class helpers ─── */

export const noTransition = "transition-none";
export const motionSafe = (cls: string) => `motion-safe:${cls}`;
export const motionReduce = (cls: string) => `motion-reduce:${cls}`;

```

# FILE: apps/frontend/src/pages/Analytics.tsx

```
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCities } from "../hooks/useCities";
import {
  useRevenueByMonth,
  useEventsByCity,
  useSalaryFund,
  useRoi,
} from "../hooks/useAnalytics";
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  staggerContainer,
  staggerItem,
  useCountUp,
  TRANSITION,
} from "../lib/motion";

const UA_MONTHS = [
  "Січ", "Лют", "Бер", "Кві", "Трав", "Чер",
  "Лип", "Сер", "Вер", "Жов", "Лис", "Гру",
];

function fmtMoney(n: unknown): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);
}

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => currentYear - i);

function SkeletonCard() {
  return (
    <div className="mobile-card animate-pulse">
      <div className="h-3 bg-neutral-100 rounded-full w-1/3 mb-2.5" />
      <div className="h-7 bg-neutral-100 rounded w-2/3 mb-1.5" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="mobile-card animate-pulse">
      <div className="h-4 bg-neutral-100 rounded w-1/4 mb-5" />
      <div className="h-[280px] bg-surface-muted rounded-xl" />
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="h-[280px] flex flex-col items-center justify-center text-content-muted">
      <span className="text-2xl mb-2">📊</span>
      <span className="text-sm text-content-muted">{text}</span>
    </div>
  );
}

export default function Analytics() {
  const { user } = useAuth();
  const isSuper = user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const [year, setYear] = useState(currentYear);
  const [cityId, setCityId] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  const { data: cities } = useCities();
  const { data: revenueData, isLoading: revenueLoading } = useRevenueByMonth({
    cityId: cityId || undefined,
    projectId: projectId || undefined,
    year,
  });
  const { data: eventsByCity, isLoading: eventsLoading } = useEventsByCity({ year });
  const { data: salaryFund } = useSalaryFund({ year, cityId: cityId || undefined });
  const { data: roi } = useRoi({ cityId: cityId || undefined, year });

  const totalRevenue = revenueData?.reduce((s, m) => s + m.revenue, 0) ?? 0;
  const totalProfit = revenueData?.reduce((s, m) => s + m.profit, 0) ?? 0;

  const chartData = (revenueData ?? []).map((m) => ({
    ...m,
    label: UA_MONTHS[Number(m.month) - 1] || m.month,
  }));

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-content-primary">Аналітика</h1>
        <p className="text-2xs text-content-muted mt-1">
          {new Date().toLocaleDateString("uk-UA", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="px-3 py-2.5 bg-surface border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand min-h-[44px]"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        {isSuper && (
          <select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="px-3 py-2.5 bg-surface border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand min-h-[44px]"
          >
            <option value="">Всі міста</option>
            {cities?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Проєкт (фільтр)"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="px-3 py-2.5 bg-surface border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand w-48 min-h-[44px]"
        />
      </div>

      {revenueLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <KPICard label="Загальний дохід" value={fmtMoney(totalRevenue)} color="text-brand" numericValue={totalRevenue} />
          <KPICard label="Прибуток" value={fmtMoney(totalProfit)} color="text-success" numericValue={totalProfit} />
          <KPICard label="ROI" value={roi ? `${roi.roi}%` : "—"} color="text-purple-600" numericValue={roi?.roi ? Number(roi.roi) : undefined} />
          <KPICard label="Витрати на ЗП" value={fmtMoney(salaryFund?.total ?? 0)} color="text-danger" numericValue={salaryFund?.total ?? 0} />
        </motion.div>
      )}

      {revenueLoading ? (
        <ChartSkeleton />
      ) : (
        <div className="mobile-card mb-5">
          <h3 className="font-bold text-content-primary mb-3 text-sm">Дохід по місяцях</h3>
          {chartData.length === 0 ? (
            <EmptyState text="Немає даних за цей період" />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={50} tickFormatter={(v: number) => v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`} />
                <Tooltip
                  formatter={(v: number) => [fmtMoney(v), ""]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ r: 3, fill: "#2563eb" }} name="Дохід" isAnimationActive={true} animationDuration={1000} animationEasing="ease-out" />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: "#10b981" }} name="Прибуток" isAnimationActive={true} animationDuration={1000} animationEasing="ease-out" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {isSuper && (
        eventsLoading ? (
          <ChartSkeleton />
        ) : (
          <div className="mobile-card">
            <h3 className="font-bold text-content-primary mb-3 text-sm">Події по містах</h3>
            {!eventsByCity || eventsByCity.length === 0 ? (
              <EmptyState text="Немає подій за цей рік" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={eventsByCity} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="cityName" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} width={30} allowDecimals={false} />
                  <Tooltip
                    formatter={(v: number) => [v, "Подій"]}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                  />
                  <Bar dataKey="events" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={48} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        )
      )}
      {isSuper && (
        <div className="mt-5">
          <h3 className="font-bold text-content-primary mb-3 text-sm">KPI — Топ 10</h3>
          <KpiTables />
        </div>
      )}
    </div>
  );
}

interface KpiManager {
  userId: string;
  name: string;
  approvedReports: number;
}

interface KpiHost {
  userId: string;
  name: string;
  avgRating: number;
  reportsCount: number;
}

interface KpiProject {
  project: string;
  eventsCount: number;
  childrenTotal: number;
  profit: number;
}

function KpiTables() {
  const { data: managers } = useQuery<KpiManager[]>({
    queryKey: ["analytics", "kpi", "managers"],
    queryFn: () => api.get("/analytics/kpi/managers").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
  const { data: hosts } = useQuery<KpiHost[]>({
    queryKey: ["analytics", "kpi", "hosts"],
    queryFn: () => api.get("/analytics/kpi/hosts").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
  const { data: projects } = useQuery<KpiProject[]>({
    queryKey: ["analytics", "kpi", "projects"],
    queryFn: () => api.get("/analytics/kpi/projects").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-3"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <KpiTable
        title="Менеджери"
        headers={["#", "Ім'я", "Затверджено"]}
        rows={
          managers?.map((m, i) => [
            String(i + 1),
            m.name,
            String(m.approvedReports),
          ]) ?? []
        }
      />
      <KpiTable
        title="Ведучі"
        headers={["#", "Ім'я", "Рейтинг", "Звітів"]}
        rows={
          hosts?.map((h, i) => [
            String(i + 1),
            h.name,
            String(h.avgRating),
            String(h.reportsCount),
          ]) ?? []
        }
      />
      <KpiTable
        title="Проєкти"
        headers={["#", "Назва", "Подій", "Прибуток"]}
        rows={
          projects?.map((p, i) => [
            String(i + 1),
            p.project,
            String(p.eventsCount),
            fmtMoney(p.profit),
          ]) ?? []
        }
      />
    </motion.div>
  );
}

function KpiTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <motion.div className="mobile-card" variants={staggerItem}>
      <h4 className="font-semibold text-content-secondary mb-2 text-sm">{title}</h4>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-content-muted border-b border-border">
            {headers.map((h) => (
              <th key={h} className="text-left pb-1.5 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center py-5 text-content-muted">
                Немає даних
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className={`py-1.5 ${j === 0 ? "text-content-muted w-6" : "text-content-primary"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </motion.div>
  );
}

function KPICard({ label, value, color, numericValue }: { label: string; value: string; color: string; numericValue?: number }) {
  const display = useCountUp(numericValue ?? 0, { duration: 0.9, enabled: numericValue !== undefined });
  const formatted = numericValue !== undefined
    ? fmtMoney(display)
    : value;
  return (
    <motion.div className="mobile-card" variants={staggerItem} whileTap={{ scale: 0.97 }} transition={TRANSITION.tap}>
      <p className={`text-2xs font-medium ${color} mb-1.5`}>{label}</p>
      <p className={`text-2xl font-bold leading-none ${color}`}>{formatted}</p>
    </motion.div>
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
import { Modal } from "../components/ui/Modal";

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
    <div className="md:hidden flex flex-col gap-3 mt-4">
      <div className="h-24 bg-neutral-100 rounded-card w-full" />
      <div className="h-14 bg-neutral-100 rounded-card w-full" />
      <div className="h-14 bg-neutral-100 rounded-card w-full" />
    </div>
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-surface rounded-card shadow-card border border-border h-72 overflow-hidden">
          <div className="h-44 bg-neutral-100 w-full" />
          <div className="p-5 flex flex-col gap-3">
            <div className="h-6 bg-neutral-100 rounded w-1/2" />
            <div className="h-4 bg-neutral-100 rounded w-3/4 mt-2" />
            <div className="h-10 bg-neutral-100 rounded w-full mt-auto" />
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
    (city: { id: string; name: string }) => {
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
    } catch {
      setNewCityName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen" style={{ contentVisibility: "auto" }}>
      <div className="hidden md:flex justify-between items-center mb-8">
        <h1 className="header-enter text-3xl font-bold text-content-primary">Міста</h1>
        {userRole === "SUPERADMIN" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="header-btn-enter bg-brand hover:bg-brand-hover active:scale-95 text-white px-5 py-2.5 rounded-control font-medium shadow-sm flex items-center transition-all duration-fast"
          >
            <span className="mr-2">+</span> Додати місто
          </button>
        )}
      </div>

      {isFetching ? (
        <CitiesSkeleton />
      ) : (
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

      {userRole === "SUPERADMIN" && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fab"
          aria-label="Додати місто"
        >
          +
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Нове місто">
        <form onSubmit={handleAddCity} className="flex flex-col gap-4">
          <input
            type="text"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            placeholder="Наприклад: Львів"
            className="w-full p-3 border border-border-strong rounded-control focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-shadow text-base"
            autoFocus
            required
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 bg-surface-muted text-content-secondary py-2.5 rounded-control font-medium hover:bg-border-strong transition-colors text-sm"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={addCity.isPending}
              className="flex-1 bg-brand text-white py-2.5 rounded-control font-medium hover:bg-brand-hover disabled:opacity-50 transition-colors text-sm"
            >
              {addCity.isPending ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/CityLeaderboard.tsx

```
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { DUR, EASE, pageVariants } from "../lib/motion";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
import { hasRole } from "../utils/roles";
import { EmptyState } from "../components/ui/EmptyState";
import { BarChart3, Trophy } from "lucide-react";

interface CityLeaderboardEntry {
  cityId: string;
  cityName: string;
  events: number;
  revenue: number;
  profit: number;
  children: number;
  schools: number;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  revenue: number;
  events: number;
}

const METRICS: { key: string; label: string }[] = [
  { key: "events", label: "Події" },
  { key: "revenue", label: "Дохід" },
  { key: "profit", label: "Прибуток" },
  { key: "children", label: "Діти" },
  { key: "schools", label: "Школи" },
];

const PERIOD_LABELS: Record<string, string> = {
  year: "Цей рік",
  quarter: "Цей квартал",
  month: "Цей місяць",
  all: "За весь час",
};

function fmt(n: unknown): string {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));
}

function fmtMoney(n: unknown): string {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);
}

const BAR_COLORS = [
  "bg-blue-600",
  "bg-blue-500",
  "bg-blue-400",
  "bg-blue-300",
  "bg-blue-200",
];

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => currentYear - i);

function SkeletonBar() {
  return (
    <div className="flex items-center gap-3 mb-3 animate-pulse">
      <div className="w-24 h-4 bg-surface-muted rounded-full shrink-0" />
      <div className="h-8 bg-surface-muted rounded-full flex-1" />
      <div className="w-16 h-4 bg-surface-muted rounded-full shrink-0" />
    </div>
  );
}

export default function CityLeaderboard() {
  const [metric, setMetric] = useState("events");
  const [year, setYear] = useState(currentYear);
  const [staffPeriod, setStaffPeriod] = useState("year");
  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();
  const showStaff = hasRole(user?.role, ["SUPERADMIN", "OWNER", "MANAGER"]);

  const { data: staffResult, isLoading: staffLoading } = useQuery({
    queryKey: ["staff-revenue", staffPeriod, selectedCity.id],
    queryFn: () => {
      const params = new URLSearchParams();
      if (staffPeriod) params.set("period", staffPeriod);
      if (selectedCity?.id) params.set("cityId", selectedCity.id);
      return api.get(`/finance/staff-revenue?${params}`).then((r) => r.data);
    },
    enabled: showStaff,
    staleTime: 5 * 60 * 1000,
  });

  const staffByRole = useMemo(() => {
    if (!staffResult?.staff) return { hosts: [] as StaffMember[], drivers: [] as StaffMember[] };
    return {
      hosts: staffResult.staff.filter((s: StaffMember) => s.role === "HOST"),
      drivers: staffResult.staff.filter((s: StaffMember) => s.role === "DRIVER"),
    };
  }, [staffResult]);

  const staffMaxRevenue = staffResult?.staff?.[0]?.revenue ?? 1;

  const { data, isLoading } = useQuery({
    queryKey: ["analytics", "city-leaderboard", metric, year],
    queryFn: () =>
      api
        .get<CityLeaderboardEntry[]>("/analytics/city-leaderboard", {
          params: { metric, year },
        })
        .then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const maxValue = data
    ? Math.max(...data.map((d) => d[metric as keyof CityLeaderboardEntry] as number), 1)
    : 1;

  const formatValue = metric === "revenue" || metric === "profit" ? fmtMoney : fmt;

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      {showStaff && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-content-primary">Рейтинг працівників</h2>
            <select
              value={staffPeriod}
              onChange={(e) => setStaffPeriod(e.target.value)}
              className="px-3 py-2 bg-surface border border-border-strong rounded-lg text-sm focus:outline-none focus:border-blue-400"
            >
              <option value="year">Цей рік</option>
              <option value="quarter">Цей квартал</option>
              <option value="month">Цей місяць</option>
              <option value="all">За весь час</option>
            </select>
          </div>
          {staffLoading ? (
            <div className="bg-surface rounded-card border border-border shadow-card p-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 mb-3 animate-pulse">
                  <div className="w-8 h-8 bg-surface-muted rounded-full shrink-0" />
                  <div className="h-4 bg-surface-muted rounded-full flex-1" />
                  <div className="w-16 h-4 bg-surface-muted rounded-full shrink-0" />
                </div>
              ))}
            </div>
          ) : !staffResult?.staff?.length ? (
            <div className="bg-surface rounded-card border border-border shadow-card p-6">
              <EmptyState icon={BarChart3} title="Немає даних за обраний період" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {([
                { label: "🎙️ Ведучі", members: staffByRole.hosts },
                { label: "🚗 Водії", members: staffByRole.drivers },
              ] as const).map(({ label, members }) => {
                if (members.length === 0) return null;
                return (
                  <div key={label} className="bg-surface rounded-card border border-border shadow-card p-5">
                    <h3 className="font-bold text-content-primary mb-3">{label}</h3>
                    <div className="flex flex-col gap-3">
                      {members.map((member, i) => {
                        const pct = staffMaxRevenue > 0 ? Math.round((member.revenue / staffMaxRevenue) * 100) : 0;
                        const isTop = i === 0;
                        return (
                          <div key={member.id}>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isTop ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
                                  {i + 1}
                                </span>
                                <span className="text-sm font-semibold text-content-primary">{member.name}</span>
                                {isTop && <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">🏆 Топ</span>}
                              </div>
                              <span className="text-xs font-bold text-content-secondary">{fmt(member.revenue)} грн</span>
                            </div>
                            <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${isTop ? "bg-amber-400" : "bg-blue-400"}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: DUR.verySlow, ease: EASE.decelerate }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-content-primary">Рейтинг міст</h1>
        <p className="text-xs text-content-muted mt-1">Порівняння міст за обраною метрикою</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {METRICS.map((m) => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              metric === m.key
                ? "bg-brand text-white shadow-sm"
                : "bg-surface text-content-secondary border border-border-strong hover:border-blue-300"
            }`}
          >
            {m.label}
          </button>
        ))}

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="ml-auto px-3 py-2.5 bg-surface border border-border-strong rounded-lg text-sm focus:outline-none focus:border-blue-400"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="bg-surface rounded-card border border-border shadow-card p-6">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonBar key={i} />)}
        </div>
      ) : !data || data.length === 0 ? (
        <div className="bg-surface rounded-card border border-border shadow-card p-6">
          <EmptyState icon={Trophy} title={`Немає даних за ${year} рік`} />
        </div>
      ) : (
        <div className="bg-surface rounded-card border border-border shadow-card p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={metric}
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {data.map((entry, i) => {
                const value = entry[metric as keyof CityLeaderboardEntry] as number;
                const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;
                const colorIndex = Math.min(i, BAR_COLORS.length - 1);

                return (
                  <div key={entry.cityId} className="flex items-center gap-3 mb-3">
                    <span className="w-24 text-xs text-content-muted truncate shrink-0 text-right">
                      {entry.cityName}
                    </span>
                    <div className="flex-1 h-8 bg-surface-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${BAR_COLORS[colorIndex]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: DUR.verySlow, ease: EASE.decelerate }}
                      />
                    </div>
                    <span className="w-20 text-xs font-semibold text-content-secondary text-right shrink-0">
                      {formatValue(value)}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/CityProfile.tsx

```
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
const CityAnalytics = lazy(
  () => import("../components/city-profile/CityAnalytics"),
);
import PhoneLink from "../components/PhoneLink";
import type { Event, Crew, CityProfile as CityProfileType } from "../types";
import OptimizedImage from "../components/ui/OptimizedImage";
import { useCity, useCreateCrew, useDeleteCrew } from "../hooks/useCities";
import { useUsers } from "../hooks/useEmployees";
import { backdropVariants, modalContentVariants } from "../lib/motion";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { useToast } from "../components/ui/Toast";
import { Skeleton } from "../components/ui/Skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { CalendarX, Car } from "lucide-react";

type Tab = "events" | "crews" | "analytics";

export default function CityProfile() {
  const { id } = useParams();
  const { data: city, isLoading } = useCity(id);
  const { data: users = [] } = useUsers();
  const createCrew = useCreateCrew(id);
  const deleteCrew = useDeleteCrew(id);
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<Tab>("crews");
  const [selectedReportEvent, setSelectedReportEvent] = useState<any>(null);
  const [isCreateCrewModalOpen, setIsCreateCrewModalOpen] = useState(false);
  const [completedSearchQuery, setCompletedSearchQuery] = useState("");
  const [crewForm, setCrewForm] = useState({
    name: "",
    hostId: "",
    driverId: "",
  });
  const [crewDeleteTarget, setCrewDeleteTarget] = useState<string | null>(null);

  const handleCreateCrew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crewForm.hostId || !crewForm.driverId) {
      toast("Оберіть ведучого та водія!", "error");
      return;
    }
    setIsCreateCrewModalOpen(false);
    createCrew.mutate(crewForm);
  };

  const handleDeleteCrew = (crewId: string) => {
    setCrewDeleteTarget(crewId);
  };

  const confirmDeleteCrew = () => {
    if (!crewDeleteTarget) return;
    deleteCrew.mutate(crewDeleteTarget);
    setCrewDeleteTarget(null);
  };

  useEffect(() => {
    if (!isCreateCrewModalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsCreateCrewModalOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isCreateCrewModalOpen]);

  if (isLoading)
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>
    );
  if (!city) return <div className="p-8 text-content-muted">Місто не знайдено</div>;

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
    (sum, ev) => sum + Number(ev.report?.totalSum || ev.price || 0),
    0,
  );
  const totalProfit = completedEvents.reduce(
    (sum, ev) => sum + Number(ev.report?.remainderSum || 0),
    0,
  );
  const fmt = (n: unknown) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: "events", label: "Події", icon: "📅" },
    { key: "crews", label: "Екіпажі", icon: "🚐" },
    { key: "analytics", label: "Аналітика", icon: "📊" },
  ];

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      <div className="text-sm text-content-muted mb-6">
        <Link to="/cities" className="hover:text-brand transition-colors">
          Міста
        </Link>
        <span className="mx-2">›</span>
        <span className="text-content-primary font-medium">{city.name}</span>
      </div>

      <div className="bg-surface rounded-card shadow-card border border-border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4 min-w-[220px]">
            <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold text-lg shrink-0">
              {manager?.name?.charAt(0) ?? "?"}
            </div>
            <div>
              <p className="text-xs text-content-muted font-medium uppercase tracking-wide mb-0.5">
                Менеджер
              </p>
              <p className="font-bold text-content-primary">{manager?.name ?? "—"}</p>
              <p className="text-sm text-content-muted">
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

      <div className="grid grid-cols-3 sm:flex sm:w-fit gap-1 bg-white rounded-xl p-1 border border-border shadow-sm mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-control text-xs sm:text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-brand text-white shadow-sm"
                : "text-content-muted hover:text-content-secondary hover:bg-surface-muted"
            }`}
          >
            <span>{tab.icon}</span>{" "}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "events" && (
        <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
          <div className="p-6 border-b border-border bg-surface-muted">
            <h3 className="font-bold text-content-primary mb-4">
              Завершені події ({completedEvents.length})
            </h3>
            <input
              type="text"
              value={completedSearchQuery}
              onChange={(e) => setCompletedSearchQuery(e.target.value)}
              placeholder="Пошук за назвою закладу..."
              className="w-full sm:max-w-xs p-2.5 border border-border-strong rounded-control text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {filteredCompletedEvents.length === 0 ? (
            <EmptyState icon={CalendarX} title={completedSearchQuery ? "Нічого не знайдено" : "Завершених подій ще немає"} />
          ) : (
            <>
              <div className="md:hidden divide-y divide-border">
                {filteredCompletedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedReportEvent(ev)}
                    className="flex items-center justify-between gap-3 p-4 active:bg-surface-muted cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-brand truncate">
                        {ev.school?.name}
                      </p>
                      <p className="text-xs text-content-muted mt-0.5">
                        {ev.project} ·{" "}
                        {new Date(ev.date).toLocaleDateString("uk-UA")}
                      </p>
                      <p className="text-xs text-content-muted mt-1">
                        👶{" "}
                        {ev.report?.childrenCount || ev.childrenPlanned || "—"}{" "}
                        дітей
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-content-primary text-sm">
                        {fmt(ev.report?.totalSum || ev.price || 0)} грн
                      </p>
                      <p className="text-xs font-medium text-success-600 mt-0.5">
                        +{fmt(ev.report?.remainderSum || 0)} грн
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white border-b border-border text-content-muted text-xs font-semibold uppercase tracking-wider">
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
                        className="border-b border-slate-50 hover:bg-surface-muted transition-colors cursor-pointer"
                      >
                        <td className="p-4">
                          <span className="font-medium text-brand">
                            {ev.school?.name}
                          </span>
                          <p className="text-xs text-content-muted">
                            {ev.school?.type}
                          </p>
                        </td>
                        <td className="p-4 text-content-secondary">{ev.project}</td>
                        <td className="p-4 text-content-secondary">
                          {new Date(ev.date).toLocaleDateString("uk-UA")}
                        </td>
                        <td className="p-4 font-medium">
                          {ev.report?.childrenCount ||
                            ev.childrenPlanned ||
                            "—"}
                        </td>
                        <td className="p-4 font-medium text-content-primary">
                          {fmt(ev.report?.totalSum || ev.price || 0)} грн
                        </td>
                        <td className="p-4 font-medium text-success-600">
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
        <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center bg-white">
            <h3 className="text-xl font-bold text-content-primary">
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
              className="bg-brand hover:bg-brand-hover text-white px-5 py-2.5 rounded-control text-sm font-medium transition-colors shadow-sm"
            >
              + Додати екіпаж
            </button>
          </div>

          {crews.length === 0 ? (
            <EmptyState icon={Car} title="Екіпажів ще немає" description="Створіть екіпаж кнопкою вище" />
          ) : (
            <>
              {/* Мобільний вигляд */}
              <div className="md:hidden divide-y divide-border">
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
                          <div className="w-16 h-10 rounded overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-border-strong">
                            <OptimizedImage
                              src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
                              alt="van"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="font-bold text-content-primary">
                            {crew.name}
                          </p>
                        </div>
                        <span className="bg-success-subtle text-success-600 px-2.5 py-1 rounded text-xs font-medium">
                          Активний
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3 text-xs mt-4">
                        <div>
                          <p className="font-medium text-content-primary">
                            {hostObj?.name || crew.host?.name || "—"}
                          </p>
                          <p className="text-content-muted mt-0.5">
                            {hostObj?.phone || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-content-primary">
                            {driverObj?.name || crew.driver?.name || "—"}
                          </p>
                          <p className="text-content-muted mt-0.5">
                            {driverObj?.phone || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-content-primary">
                            {carName}
                          </p>
                          {carPlate && (
                            <p className="text-content-muted mt-0.5">{carPlate}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-content-muted">
                            Подій:{" "}
                            <span className="font-bold text-content-primary">
                              {eventsCount}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCrew(crew.id)}
                        className="w-full mt-4 py-2 border border-border-strong text-content-secondary hover:bg-danger-subtle hover:text-danger hover:border-danger-200 rounded-control text-sm font-medium transition-colors"
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
                    <tr className="bg-white border-b border-border text-content-primary font-bold">
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
                          className="border-b border-slate-50 hover:bg-surface-muted transition-colors"
                        >
                          <td className="p-5">
                            <div className="flex items-center gap-3">
                              <div className="w-[60px] h-[40px] rounded border border-border-strong overflow-hidden bg-slate-100 shrink-0 shadow-sm">
                                <OptimizedImage
                                  src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
                                  alt="van"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-bold text-content-primary">
                                {crew.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-content-primary">
                              {hostObj?.name || crew.host?.name || "—"}
                            </div>
                            <div className="text-xs text-content-muted mt-1 tracking-wide">
                              {hostObj?.phone || "—"}
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-content-primary">
                              {driverObj?.name || crew.driver?.name || "—"}
                            </div>
                            <div className="text-xs text-content-muted mt-1 tracking-wide">
                              {driverObj?.phone || "—"}
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-content-secondary">
                              {carName}
                            </div>
                            {carPlate ? (
                              <div className="text-xs text-content-muted mt-1 tracking-wider">
                                {carPlate}
                              </div>
                            ) : (
                              <div className="text-xs text-content-muted mt-1">
                                —
                              </div>
                            )}
                          </td>
                          <td className="p-5">
                            <span className="bg-success-subtle text-success-600 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide">
                              Активний
                            </span>
                          </td>
                          <td className="p-5 text-center font-bold text-content-primary text-base">
                            {eventsCount}
                          </td>
                          <td className="p-5 text-center">
                            <button
                              onClick={() => handleDeleteCrew(crew.id)}
                              className="text-content-muted hover:text-red-500 p-2 transition-colors rounded-control hover:bg-red-50"
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
            <div className="bg-white rounded-card h-64 animate-pulse border border-border" />
          }
        >
          <CityAnalytics events={completedEvents} />
        </Suspense>
      )}

      <AnimatePresence>
        {isCreateCrewModalOpen && (
          <motion.div variants={backdropVariants} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div variants={modalContentVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-card shadow-xl w-full max-w-md overflow-hidden flex flex-col">
              <div className="p-5 sm:p-6 border-b border-border flex justify-between bg-surface-muted">
                <h3 className="text-xl font-bold text-content-primary">Новий екіпаж</h3>
                <button
                  onClick={() => setIsCreateCrewModalOpen(false)}
                  className="text-content-muted hover:text-content-secondary text-lg leading-none active:scale-90 transition-transform duration-fast"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleCreateCrew} className="p-5 sm:p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-content-secondary mb-1">
                    Назва екіпажу
                  </label>
                  <input
                    type="text"
                    value={crewForm.name}
                    onChange={(e) =>
                      setCrewForm({ ...crewForm, name: e.target.value })
                    }
                    className="w-full p-2.5 border border-border-strong rounded-control focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-content-secondary mb-1">
                    Ведучий
                  </label>
                  <select
                    value={crewForm.hostId}
                    onChange={(e) =>
                      setCrewForm({ ...crewForm, hostId: e.target.value })
                    }
                    required
                    className="w-full p-2.5 border border-border-strong rounded-control bg-white outline-none"
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
                  <p className="text-xs text-success-600 mt-1">
                    ✓ Доступно: {availableHosts.length} вільних
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-content-secondary mb-1">
                    Водій
                  </label>
                  <select
                    value={crewForm.driverId}
                    onChange={(e) =>
                      setCrewForm({ ...crewForm, driverId: e.target.value })
                    }
                    required
                    className="w-full p-2.5 border border-border-strong rounded-control bg-white outline-none"
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
                  <p className="text-xs text-success-600 mt-1">
                    ✓ Доступно: {availableDrivers.length} вільних
                  </p>
                </div>
                <div className="flex gap-3 pt-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsCreateCrewModalOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-slate-100 text-content-secondary rounded-control font-medium hover:bg-slate-200 transition-colors"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-brand text-white rounded-control font-medium hover:bg-brand-hover transition-colors"
                  >
                    Створити
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CompletedEventModal
        isOpen={!!selectedReportEvent}
        onClose={() => setSelectedReportEvent(null)}
        event={selectedReportEvent}
      />

      <ConfirmDialog
        isOpen={!!crewDeleteTarget}
        title="Видалити екіпаж?"
        message="Екіпаж буде видалено назавжди."
        confirmLabel="Видалити"
        variant="danger"
        onConfirm={confirmDeleteCrew}
        onCancel={() => setCrewDeleteTarget(null)}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-content-muted font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-content-primary">{value}</p>
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
  const fmt = (n: unknown) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));
  const report = event?.report;

  return (
    <AnimatePresence>
      {isOpen && event && (
        <motion.div variants={backdropVariants} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
          <motion.div variants={modalContentVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-t-3xl sm:rounded-card shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
            <div className="p-5 sm:p-6 border-b border-border flex justify-between bg-surface-muted shrink-0">
              <div>
                <h3 className="text-xl font-bold text-content-primary">
                  Звіт: {event.project}
                </h3>
                <p className="text-sm text-content-muted mt-1">
                  {event.school?.name} ·{" "}
                  {new Date(event.date).toLocaleDateString("uk-UA")}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-content-muted hover:text-content-secondary p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg"
              >
                ✕
              </button>
            </div>
            <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-surface-muted">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-5 rounded-card border border-border shadow-sm">
                  <h4 className="font-bold text-content-primary mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-50 text-brand flex items-center justify-center">
                      📊
                    </span>
                    Результати
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-content-muted">Дітей (факт):</span>
                      <span className="font-bold">
                        {report?.childrenCount || 0}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-content-muted">Класів:</span>
                      <span className="font-medium">
                        {report?.classesCount || 0}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-content-muted">Пільговиків:</span>
                      <span className="font-medium">
                        {report?.privilegedCount || 0}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-content-muted">Сеансів:</span>
                      <span className="font-medium">
                        {report?.showingsCount || 0}
                      </span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-content-muted">Оцінка:</span>
                      <span className="font-bold text-amber-500">
                        ⭐ {report?.rating || 0}/10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-card border border-border shadow-sm">
                  <h4 className="font-bold text-content-primary mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-success-subtle text-success-600 flex items-center justify-center">
                      💰
                    </span>
                    Фінанси
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-content-muted">Загальна виручка:</span>
                      <span className="font-bold">{fmt(report?.totalSum)} грн</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-content-muted">На заклад (20%):</span>
                      <span className="font-medium text-danger-600">
                        − {fmt(report?.schoolSum)} грн
                      </span>
                    </div>
                    {Array.isArray(report?.expenseItems) &&
                      report.expenseItems.length > 0 && (
                        <div className="py-2 border-b border-slate-50">
                          <span className="text-content-muted block mb-2">
                            Додаткові витрати:
                          </span>
                          {report.expenseItems.map((exp: any, i: number) => (
                            <div
                              key={i}
                              className="flex justify-between text-xs mb-1 pl-2"
                            >
                              <span className="text-content-muted">
                                — {exp.name || exp.category}
                              </span>
                              <span className="text-danger-600 font-medium">
                                − {fmt(exp.amount)} грн
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    <div className="flex justify-between pt-1">
                      <span className="font-bold text-content-primary">
                        Чистий прибуток:
                      </span>
                      <span className="font-bold text-success-600 text-base">
                        {fmt(report?.remainderSum)} грн
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-card border border-border shadow-sm">
                <h4 className="font-bold text-content-primary mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                    ⏳
                  </span>
                  Історія пайплайну
                </h4>
                {!event.history || event.history.length === 0 ? (
                  <p className="text-sm text-content-muted text-center py-4">
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
                          <p className="font-semibold text-content-primary">
                            {item.action}
                          </p>
                          <p className="text-[11px] text-content-muted mt-0.5">
                            {new Date(item.createdAt).toLocaleString("uk-UA", {
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            · 👤 {item.userName}
                          </p>
                          {item.comment && (
                            <div className="mt-2 p-3 bg-surface-muted rounded-xl text-content-secondary italic border border-border">
                              {item.comment}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/pages/Dashboard.tsx

```
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useAuth } from "../context/AuthContext";
import { DASHBOARD_TABS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";
import DashboardTopNav from "../components/dashboard/DashboardTopNav";
import TabErrorBoundary from "../components/dashboard/TabErrorBoundary";
import { pageVariants, skeletonPulse } from "../lib/motion";

const OverviewTab = lazy(() => import("./OverviewTab"));
const ReportsTab = lazy(() => import("../features/reports/pages/ReportsReviewPage"));
const LeaderboardTab = lazy(() => import("./CityLeaderboard"));
const IssuesTab = lazy(() => import("./IssuesTab"));
const AnalyticsTab = lazy(() => import("./Analytics"));

const TAB_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  overview: OverviewTab,
  reports: ReportsTab,
  leaderboard: LeaderboardTab,
  issues: IssuesTab,
  analytics: AnalyticsTab,
};

export default function Dashboard() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const swiperRef = useRef<any>(null);
  const prevTabRef = useRef<string>("");

  const allowedTabs = useMemo(
    () => DASHBOARD_TABS.filter((t) => hasRole(user?.role, t.roles)),
    [user],
  );
  const allowedIds = useMemo(() => allowedTabs.map((t) => t.id), [allowedTabs]);

  const resolveInitial = useCallback(() => {
    const fromUrl = searchParams.get("tab");
    if (fromUrl && allowedIds.includes(fromUrl)) return fromUrl;
    const fromStorage = sessionStorage.getItem("dashboard:lastTab");
    if (fromStorage && allowedIds.includes(fromStorage)) return fromStorage;
    return allowedIds[0] ?? "overview";
  }, [searchParams, allowedIds]);

  const [activeTab, setActiveTab] = useState(() => resolveInitial());

  useEffect(() => {
    if (prevTabRef.current && prevTabRef.current !== activeTab) {
      window.dispatchEvent(
        new CustomEvent("tab_switch", {
          detail: { from: prevTabRef.current, to: activeTab },
        }),
      );
    }
    prevTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (!allowedIds.includes(activeTab)) {
      const fallback = allowedIds[0] ?? "overview";
      setActiveTab(fallback);
      setSearchParams({ tab: fallback }, { replace: true });
    }
  }, [allowedIds, activeTab, setSearchParams]);

  const handleTabChange = useCallback(
    (id: string) => {
      const idx = allowedIds.indexOf(id);
      if (idx !== -1 && swiperRef.current) {
        swiperRef.current.slideTo(idx);
      }
      setActiveTab(id);
      setSearchParams({ tab: id }, { replace: true });
      sessionStorage.setItem("dashboard:lastTab", id);
    },
    [allowedIds, setSearchParams],
  );

  const handleSlideChange = useCallback(
    (swiper: any) => {
      const id = allowedIds[swiper.activeIndex];
      if (id && id !== activeTab) {
        setActiveTab(id);
        setSearchParams({ tab: id }, { replace: true });
        sessionStorage.setItem("dashboard:lastTab", id);
      }
    },
    [allowedIds, activeTab, setSearchParams],
  );

  return (
    <motion.div
      className="bg-gradient-subtle min-h-screen flex flex-col"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <DashboardTopNav
        tabs={allowedTabs}
        activeTab={activeTab}
        onChange={handleTabChange}
      />

      <div className="flex-1">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          initialSlide={allowedIds.indexOf(activeTab)}
          onSlideChange={handleSlideChange}
          speed={280}
          allowTouchMove={true}
          className="dashboard-swiper"
        >
          {allowedTabs.map((tab) => {
            const Component = TAB_COMPONENTS[tab.id];
            return (
            <SwiperSlide key={tab.id}>
              <div className="md:p-4 lg:p-8">
                <TabErrorBoundary label={tab.label}>
                  <Suspense
                    fallback={
                      <motion.div
                        className="flex items-center gap-2 text-sm text-content-muted p-4"
                        {...skeletonPulse}
                      >
                        <div className="w-4 h-4 rounded-full bg-slate-200" />
                        Завантаження...
                      </motion.div>
                    }
                  >
                    <Component />
                  </Suspense>
                </TabErrorBoundary>
              </div>
            </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </motion.div>
  );
}

```

# FILE: apps/frontend/src/pages/Employees.tsx

```
import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { DUR, skeletonPulse, pageVariants, popInVariants, scaleVariants, cardHoverVariants, TRANSITION } from "../lib/motion";
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
      animate={skeletonPulse.animate}
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
  const [confirmDeleteProject, setConfirmDeleteProject] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (confirmDelete) setConfirmDelete(null);
        else if (confirmDeleteProject) setConfirmDeleteProject(null);
        else if (isModalOpen) setIsModalOpen(false);
        else if (isProjectModalOpen) { setIsProjectModalOpen(false); setEditingProject(null); }
        else if (filterPanelOpen) setFilterPanelOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmDelete, confirmDeleteProject, isModalOpen, isProjectModalOpen, filterPanelOpen]);

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

  const handleDeleteProject = useCallback(async () => {
    if (!confirmDeleteProject) return;
    setIsMutating(true);
    try {
      await deleteProject.mutateAsync(confirmDeleteProject.id);
      toast("Проєкт видалено", "success");
    } catch {
      toast("Помилка видалення", "error");
    } finally {
      setConfirmDeleteProject(null);
      setIsMutating(false);
    }
  }, [confirmDeleteProject, deleteProject, toast]);

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
          variants={pageVariants}
          initial="hidden"
          animate="visible"
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
                        variants={popInVariants}
                        initial="hidden"
                        animate="visible"
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[role]}`}
                      >
                        {items.length}
                      </motion.span>
                    </div>
                    {items.length === 0 ? (
                      <motion.div
                        variants={scaleVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center"
                      >
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 text-lg">👤</div>
                        <p className="text-slate-400 text-sm mb-3">Немає {label.toLowerCase()}ів</p>
                        {isSuperAdmin && (
                           <button onClick={() => handleOpenModal()} className="text-xs font-semibold text-blue-600 hover:text-blue-700 active:scale-[0.97] transition-transform duration-fast">
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
                        transition={{ duration: DUR.moderate, delay: pi * 0.05 }}
                        variants={cardHoverVariants}
                        whileHover="hover"
                        className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group cursor-default hover:border-slate-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            transition={TRANSITION.tap}
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
                            <button onClick={() => handleOpenProjectModal(p)} className="text-slate-300 hover:text-blue-500 p-2 -mr-1 active:scale-90 transition-transform duration-fast" title="Редагувати">✏️</button>
                            <button onClick={() => setConfirmDeleteProject({ id: p.id, name: p.name })} className="text-slate-300 hover:text-red-500 p-2 -mr-2 active:scale-90 transition-transform duration-fast" title="Видалити">🗑</button>
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
        <ConfirmDialog
          isOpen={!!confirmDeleteProject}
          title="Видалити вид події"
          message={`Видалити вид події "${confirmDeleteProject?.name}"? Існуючі події з цією назвою збережуться.`}
          confirmLabel="Видалити"
          variant="danger"
          onConfirm={handleDeleteProject}
          onCancel={() => setConfirmDeleteProject(null)}
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
import { Skeleton } from "../components/ui/Skeleton";
import { formatCurrency } from "../utils/formatCurrency";

export default function EventReport() {
  const { eventId } = useParams();
  const { data: event, isLoading, isError } = useEventFull(eventId);

  if (isLoading)
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    );
  if (isError || !event)
    return <div className="p-8 text-content-muted">Подію не знайдено</div>;

  const report = event.report;
  const crew = event.crew;
  const fmt = formatCurrency;

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      {/* Breadcrumb */}
      <div className="text-xs sm:text-sm text-content-muted mb-4 flex items-center gap-1 flex-wrap">
        <Link to="/cities" className="hover:text-brand">
          Міста
        </Link>
        <span>›</span>
        <Link to={`/cities/${event.cityId}`} className="hover:text-brand">
          {event.city?.name}
        </Link>
        <span>›</span>
        <span>Події</span>
        <span>›</span>
        <span className="text-content-primary font-medium">Звіт по події</span>
      </div>

      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2.5 bg-surface border border-border-strong rounded-lg text-sm text-content-secondary hover:bg-surface-subtle flex items-center gap-2 active:scale-[0.97] transition-transform duration-fast"
      >
        ← Назад
      </button>

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold text-content-primary">
          Звіт по події
        </h1>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          Проведено
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Інформація */}
        <div className="bg-surface rounded-card border border-border shadow-card p-4 sm:p-6">
          <h3 className="font-bold text-content-primary mb-4">Інформація</h3>
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
        <div className="bg-surface rounded-card border border-border shadow-card p-4 sm:p-6">
          <h3 className="font-bold text-content-primary mb-4">Результат</h3>
          <div className="space-y-2 text-sm">
            <Row label="Заплановано дітей" value={event.childrenPlanned} />
            <Row label="Фактично дітей" value={report?.childrenCount} />
            <Row label="Вартість" value={`${fmt(event.price)} грн`} />
            <Row label="Отримано" value={`${fmt(report?.totalSum)} грн`} />
            <Row label="Спосіб оплати" value={event.paymentMethod} />
          </div>
        </div>

        {/* Оцінка */}
        <div className="bg-surface rounded-card border border-border shadow-card p-4 sm:p-6">
          <h3 className="font-bold text-content-primary mb-4">Оцінка</h3>
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
                <p className="text-content-muted mb-1">Коментар:</p>
                <p className="text-content-secondary italic">"{report.comment}"</p>
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
      <span className="text-content-muted">{label}:</span>
      <span className="font-medium text-content-primary">{value ?? "—"}</span>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Events.tsx

```
import { useState } from "react";
import { useEvents } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { School, MapPin, User, Truck, Calendar } from "lucide-react";
import AddressLink from "../components/AddressLink";
import PhoneLink from "../components/PhoneLink";
import { useSelectedCity } from "../context/CityContext";
import { EmptyState } from "../components/ui/EmptyState";
import { Skeleton } from "../components/ui/Skeleton";

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
  report?: { status: string } | null;
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

const REPORT_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Чернетка",
  SUBMITTED: "На перевірці",
  NEEDS_REVISION: "На доопрацюванні",
  APPROVED: "Затверджено",
  REJECTED: "Відхилено",
  CLOSED: "Закрито",
};

const REPORT_STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-500",
  SUBMITTED: "bg-amber-50 text-amber-600",
  NEEDS_REVISION: "bg-rose-50 text-rose-600",
  APPROVED: "bg-emerald-50 text-emerald-600",
  REJECTED: "bg-red-50 text-red-500",
  CLOSED: "bg-slate-200 text-slate-400",
};

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
    <div className="p-4 md:p-8 bg-gradient-subtle min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-content-primary">
            {title}
            {selectedCity.id && !isFieldStaff && (
              <span className="ml-2 text-base font-normal text-brand">
                · {selectedCity.name}
              </span>
            )}
          </h1>{" "}
          <p className="text-sm text-content-muted mt-1">{subtitle}</p>
        </div>
        {!isFieldStaff && (
          <button
            onClick={() => navigate("/schools")}
            className="bg-brand text-white px-4 py-2.5 sm:py-2.5 rounded-lg text-sm font-medium hover:bg-brand-hover hover:shadow-lift hover:-translate-y-0.5 active:scale-95 transition-all duration-200 w-full sm:w-auto"
          >
            + Додати подію
          </button>
        )}
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="mobile-card animate-pulse">
              <Skeleton className="h-4 w-2/3 mb-3" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-3 w-1/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="bg-red-50 text-red-600 border border-red-100 rounded-card p-4 text-sm">
          {error}
        </div>
      )}

      {!isLoading && !error && filteredEvents.length === 0 && (
        <EmptyState
          icon={Calendar}
          title={isFieldStaff ? "Поки що немає подій" : "Подій ще немає"}
          description="Події з'являться тут після створення"
        />
      )}

      {!isLoading && !error && filteredEvents.length > 0 && (
        <>
          {/* Картки — мобільний вигляд */}
          <div className="md:hidden flex flex-col gap-3">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => goToEvent(ev)}
                className="bg-surface rounded-card shadow-card border border-border p-4 cursor-pointer active:bg-surface-subtle"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-content-primary">{ev.project}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        STATUS_COLORS[ev.status] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {STATUS_LABELS[ev.status] ?? ev.status}
                    </span>
                    {ev.report?.status && (
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-2xs font-medium ${
                          REPORT_STATUS_COLORS[ev.report.status] ?? "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {REPORT_STATUS_LABELS[ev.report.status] ?? ev.report.status}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-content-muted mt-1">
                  {formatDate(ev.date)}
                  {ev.time ? `, ${ev.time}` : ""} · {ev.city?.name ?? "—"}
                </p>
                <p className="text-xs text-content-muted mt-0.5 flex items-center gap-1">
                  <School className="w-3 h-3 shrink-0" /> {ev.school?.name ?? "—"}
                </p>
                {ev.address && (
                  <p className="text-xs text-content-muted mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" /> <AddressLink address={ev.address} />
                  </p>
                )}
                {(ev.crew?.host || ev.crew?.driver) && (
                  <p className="text-xs text-content-muted mt-1 flex items-center gap-1">
                    <User className="w-3 h-3 shrink-0" /> {ev.crew?.host?.name ?? "—"} <Truck className="w-3 h-3 shrink-0" />{" "}
                    {ev.crew?.driver?.name ?? "—"}
                  </p>
                )}
                {isFieldStaff && (ev.contactPerson || ev.contactPhone) && (
                  <p className="text-xs text-content-muted mt-0.5">
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
          <div className="hidden md:block bg-surface rounded-card shadow-card border border-border overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-muted border-b border-border">
                  <th className="p-4 font-medium text-content-secondary">Подія</th>
                  <th className="p-4 font-medium text-content-secondary">Дата</th>
                  <th className="p-4 font-medium text-content-secondary">Локація</th>
                  <th className="p-4 font-medium text-content-secondary">Екіпаж</th>
                  <th className="p-4 font-medium text-content-secondary">Статус</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((ev) => (
                  <tr
                    key={ev.id}
                    onClick={() => goToEvent(ev)}
                    className="border-b border-border hover:bg-surface-muted/50 transition cursor-pointer"
                  >
                    <td className="p-4 text-content-primary font-medium">
                      {ev.project}
                      <div className="text-xs text-content-muted font-normal mt-0.5">
                        {ev.school?.name ?? "—"}
                      </div>
                    </td>
                    <td className="p-4 text-content-secondary">
                      {formatDate(ev.date)}
                      {ev.time && (
                        <div className="text-xs text-content-muted">{ev.time}</div>
                      )}
                    </td>
                    <td className="p-4 text-content-secondary">
                      {ev.city?.name ?? "—"}
                      {ev.address && (
                        <div className="text-xs text-content-muted">
                          <AddressLink address={ev.address} />
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-content-secondary text-sm">
                      <div className="flex items-center gap-1"><User className="w-3 h-3 shrink-0" /> {ev.crew?.host?.name ?? "—"}</div>
                      <div className="flex items-center gap-1"><Truck className="w-3 h-3 shrink-0" /> {ev.crew?.driver?.name ?? "—"}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            STATUS_COLORS[ev.status] ??
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {STATUS_LABELS[ev.status] ?? ev.status}
                        </span>
                        {ev.report?.status && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              REPORT_STATUS_COLORS[ev.report.status] ?? "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {REPORT_STATUS_LABELS[ev.report.status] ?? ev.report.status}
                          </span>
                        )}
                      </div>
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
import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import MySalary from "../features/salary/pages/MySalary";
import TeamSalaries from "../features/salary/pages/TeamSalaries";
import Company from "../features/salary/pages/Company";

const Expenses = lazy(() => import("../features/salary/pages/Expenses"));

type Tab = "my-salary" | "team" | "company" | "expenses";

function PeekSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded-xl w-48" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
      <div className="h-64 bg-white rounded-2xl border border-slate-100" />
    </div>
  );
}

export default function Finance({ isPeek }: { isPeek?: boolean }) {
  const { user } = useAuth();
  const isManagerOrAdmin = user?.role === "MANAGER" || user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const tabs: { key: Tab; label: string; managerOnly?: boolean }[] = [
    { key: "my-salary", label: "Мої нарахування" },
    { key: "team", label: "Нарахування команди", managerOnly: true },
    { key: "company", label: "Фінанси компанії", managerOnly: true },
    { key: "expenses", label: "Витрати", managerOnly: true },
  ];

  const availableTabs = tabs.filter((t) => !t.managerOnly || isManagerOrAdmin);
  const [activeTab, setActiveTab] = useState<Tab>(availableTabs[0]?.key ?? "my-salary");

  if (isPeek) {
    return <PeekSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-none">
            {availableTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`shrink-0 px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === t.key
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
                {activeTab === t.key && (
                  <motion.div
                    layoutId="finance-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      {activeTab === "my-salary" && <MySalary />}
      {activeTab === "team" && isManagerOrAdmin && <TeamSalaries />}
      {activeTab === "company" && isManagerOrAdmin && <Company />}
      {activeTab === "expenses" && isManagerOrAdmin && (
        <Suspense fallback={<div className="p-8 text-center text-sm text-slate-400">Завантаження...</div>}>
          <Expenses />
        </Suspense>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Inventory.tsx

```
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit3, Trash2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  useInventory,
  useCreateInventoryItem,
  useUpdateInventoryItem,
  useDeleteInventoryItem,
  useAddStock,
} from "../hooks/useInventory";
import { InventoryItemModal } from "../components/inventory/InventoryItemModal";
import type { InventoryItem } from "../types";
import { Skeleton } from "../components/ui/Skeleton";
import {
  staggerContainer,
  staggerItem,
  backdropVariants,
  modalContentVariants,
  fabVariants,
  TRANSITION,
} from "../lib/motion";

function StockBadge({ current, min }: { current: number; min: number }) {
  let color = "bg-green-100 text-green-700";
  if (current < min) color = "bg-red-100 text-red-700";
  else if (current === min) color = "bg-yellow-100 text-yellow-700";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      {current}
    </span>
  );
}

const CATEGORIES = ["Техніка", "Матеріали", "Реквізит", "Канцелярія", "Інше"];

export default function InventoryPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  const { data: items, isLoading } = useInventory({
    search: search || undefined,
    category: categoryFilter || undefined,
    lowStock: lowStockOnly ? "true" : undefined,
  });

  const createItem = useCreateInventoryItem();
  const updateItem = useUpdateInventoryItem();
  const deleteItem = useDeleteInventoryItem();
  const addStock = useAddStock();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [stockModal, setStockModal] = useState<{ id: string; name: string } | null>(null);
  const [stockQty, setStockQty] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const canEdit = user?.role === "SUPERADMIN" || user?.role === "OWNER";
  const canCreate = canEdit || user?.role === "MANAGER";
  const canAddStock = canCreate;

  const uniqueCategories = useMemo(() => {
    if (!items) return CATEGORIES;
    const cats = new Set(items.map((i) => i.category));
    return [...new Set([...CATEGORIES, ...cats])];
  }, [items]);

  const handleOpenCreate = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: InventoryItem) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleSave = async (data: { name: string; category: string; project?: string; minStock: number; currentStock: number; notes?: string }) => {
    if (editItem) {
      await updateItem.mutateAsync({ id: editItem.id, ...data });
    } else {
      await createItem.mutateAsync(data);
    }
    setModalOpen(false);
    setEditItem(null);
  };

  const handleDelete = async (id: string) => {
    await deleteItem.mutateAsync(id);
    setDeleteConfirm(null);
  };

  const handleAddStock = async () => {
    if (!stockModal || stockQty <= 0) return;
    await addStock.mutateAsync({ id: stockModal.id, quantity: stockQty });
    setStockModal(null);
    setStockQty(0);
  };

  const cardView = (item: InventoryItem) => (
    <motion.div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 sm:hidden" variants={staggerItem} whileTap={{ scale: 0.98 }} transition={TRANSITION.tap}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-semibold text-slate-800 truncate">{item.name}</div>
          {item.sku && <div className="text-xs text-slate-400 mt-0.5">{item.sku}</div>}
        </div>
        <StockBadge current={item.currentStock} min={item.minStock} />
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="bg-slate-100 px-2 py-0.5 rounded">{item.category}</span>
        {item.project && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{item.project}</span>}
        {item.city && <span>{item.city.name}</span>}
      </div>
      <div className="flex items-center gap-2 pt-1">
        {canAddStock && (
          <button onClick={() => setStockModal({ id: item.id, name: item.name })} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium active:scale-[0.97] transition-transform duration-fast">
            Поповнити
          </button>
        )}
        {canEdit && (
          <>
            <button onClick={() => handleOpenEdit(item)} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium active:scale-[0.97] transition-transform duration-fast">
              <Edit3 className="w-3.5 h-3.5 inline mr-1" />
              Змінити
            </button>
            <button onClick={() => setDeleteConfirm(item.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium active:scale-90 transition-transform duration-fast">
              <Trash2 className="w-3.5 h-3.5 inline mr-1" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Склад</h1>
        {canCreate && (
          <button
            onClick={handleOpenCreate}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors active:scale-[0.97] transition-transform duration-fast"
          >
            <Plus className="w-4 h-4" />
            Додати товар
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук товару..."
            enterKeyHint="search"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2.5 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="">Всі категорії</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={lowStockOnly}
            onChange={(e) => setLowStockOnly(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Мало на складі
        </label>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mobile-card animate-pulse">
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </div>
      ) : !items || items.length === 0 ? (
        <div className="text-slate-400 py-16 text-center">
          <p className="text-lg mb-2">Склад порожній</p>
          {canCreate && (
            <button onClick={handleOpenCreate} className="text-blue-600 font-medium text-sm hover:underline active:scale-[0.97] transition-transform duration-fast">
              + Додати перший товар
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <motion.div
            className="flex flex-col gap-3 sm:hidden"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >{items.map(cardView)}</motion.div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto bg-white rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Назва</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Категорія</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Проєкт</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">На складі</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">Мін.</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Місто</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600">Дії</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                    <td className="px-4 py-3 text-slate-500">{item.category}</td>
                    <td className="px-4 py-3 text-slate-500">{item.project || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      <StockBadge current={item.currentStock} min={item.minStock} />
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600">{item.minStock}</td>
                    <td className="px-4 py-3 text-slate-500">{item.city?.name || "—"}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {canAddStock && (
                        <button
                          onClick={() => setStockModal({ id: item.id, name: item.name })}
                          className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium active:scale-[0.97] transition-transform duration-fast"
                        >
                          Поповнити
                        </button>
                      )}
                      {canEdit && (
                        <>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium active:scale-[0.97] transition-transform duration-fast"
                          >
                            <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                            Змінити
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item.id)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium active:scale-90 transition-transform duration-fast"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* FAB for mobile */}
      {canCreate && (
        <motion.button
          onClick={handleOpenCreate}
          className="sm:hidden fixed right-4 z-40 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          style={{ bottom: "calc(5rem + env(safe-area-inset-bottom, 0px))" }}
          variants={fabVariants}
          initial="hidden"
          animate="visible"
          whileTap={{ scale: 0.9 }}
          aria-label="Додати товар"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      )}

      {/* Create/Edit Modal */}
      <InventoryItemModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null); }}
        onSave={handleSave}
        item={editItem}
      />

      {/* Stock modal */}
      <AnimatePresence>
      {stockModal && (
        <motion.div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => { if (e.target === e.currentTarget) setStockModal(null); }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4"
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-lg font-bold text-slate-800 mb-1">Поповнення складу</h2>
            <p className="text-sm text-slate-500 mb-4">{stockModal.name}</p>
            <input
              type="number"
              min={1}
              value={stockQty || ""}
              onChange={(e) => setStockQty(+e.target.value)}
              placeholder="Кількість"
              className="w-full p-3 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              inputMode="numeric"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setStockModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm active:scale-[0.97] transition-transform duration-fast"
              >
                Скасувати
              </button>
              <button
                onClick={handleAddStock}
                disabled={stockQty <= 0 || addStock.isPending}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm disabled:opacity-50 active:scale-[0.97] transition-transform duration-fast"
              >
                {addStock.isPending ? "..." : "Додати"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
      {deleteConfirm && (
        <motion.div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteConfirm(null); }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4"
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-lg font-bold text-slate-800 mb-2">Видалити товар?</h2>
            <p className="text-sm text-slate-500 mb-5">Цю дію не можна скасувати.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm active:scale-[0.97] transition-transform duration-fast"
              >
                Скасувати
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteItem.isPending}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-medium text-sm disabled:opacity-50 active:scale-[0.97] transition-transform duration-fast"
              >
                {deleteItem.isPending ? "..." : "Видалити"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/IssuesTab.tsx

```
import IssueCarousel from "../components/IssueCarousel";

export default function IssuesTab() {
  return (
    <div className="p-4 md:p-8">
      <IssueCarousel />
    </div>
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
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, modalContentVariants } from "../lib/motion";
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
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { useToast } from "../components/ui/Toast";

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
  const toast = useToast();
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
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [importConfirmOpen, setImportConfirmOpen] = useState(false);
  const [pendingImportCityId, setPendingImportCityId] = useState<string | null>(null);
  const [pendingImportCityName, setPendingImportCityName] = useState("");

  const addSchoolMutation = useMutation({
    mutationFn: (newSchool: NewSchoolPayload) =>
      api.post("/schools", newSchool),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      setIsModalOpen(false);
    },
    onError: () => toast("Не вдалося створити садочок", "error"),
  });

  const bulkImportMutation = useMutation({
    mutationFn: (cityId: string) =>
      api.post(
        "/schools/bulk-import",
        { cityId, type: "Садочок" },
        { timeout: 120000 },
      ),
    onSuccess: (res) => {
      toast(
        `Імпорт завершено: додано ${res.data.created}, пропущено ${res.data.skipped}`,
        "success",
      );
      qc.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: () => toast("Помилка імпорту", "error"),
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
    (e: React.MouseEvent, schoolId: string, schoolName: string) => {
      e.stopPropagation();
      if (userRole !== "SUPERADMIN") return;
      setDeleteTarget({ id: schoolId, name: schoolName });
    },
    [userRole],
  );

  const confirmDeleteSchool = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteSchool.mutateAsync(deleteTarget.id);
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, deleteSchool]);

  const handleImportClick = useCallback(() => {
    if (!selectedCity.id) return toast("Спочатку оберіть місто", "error");
    if (!supportedCities.includes(selectedCity.name))
      return toast("Місто не підтримується для імпорту", "error");
    setPendingImportCityId(selectedCity.id);
    setPendingImportCityName(selectedCity.name);
    setImportConfirmOpen(true);
  }, [selectedCity, supportedCities, toast]);

  const confirmImport = useCallback(() => {
    setImportConfirmOpen(false);
    if (!pendingImportCityId) return;
    setDotCount(3);
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
    }, 500);
    bulkImportMutation.mutate(pendingImportCityId, {
      onSettled: () => clearInterval(dotInterval),
    });
    setPendingImportCityId(null);
  }, [pendingImportCityId, bulkImportMutation]);

  useEffect(() => {
    if (!isModalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsModalOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isModalOpen]);

  return (
    <div className="p-4 md:p-8 flex flex-col h-full max-w-[100vw] bg-surface-subtle min-h-screen">
      <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-content-primary leading-tight">
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
              onClick={handleImportClick}
              disabled={bulkImportMutation.isPending}
              className="flex items-center gap-1.5 px-3 py-2 bg-success text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-70 transition-all"
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
            className="hidden md:flex items-center gap-1 px-3 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-hover active:scale-[0.97] transition-transform duration-fast"
          >
            + Додати
          </button>
        </div>
      </div>

      <div className="shrink-0">
        <Suspense
          fallback={
            <div className="h-[72px] bg-surface rounded-card animate-pulse mb-4" />
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
            className="w-5 h-5 text-content-muted"
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
          className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-surface border-none sm:border sm:border-border-strong rounded-card sm:rounded-control text-base font-medium text-content-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand shadow-sm transition"
          enterKeyHint="search"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-content-muted hover:text-content-secondary transition"
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

      <p className="text-xs font-semibold text-content-muted mb-4 shrink-0 uppercase tracking-wide px-1">
        {`${filteredSchools.length} з ${totalItems} садочків`}
        {(activeFilter || sizeFilter) && (
          <button
            onClick={() => {
              setActiveFilter(null);
              setSizeFilter(null);
            }}
            className="ml-3 text-blue-500 hover:text-blue-700 lowercase active:scale-[0.97] transition-transform duration-fast"
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
              className="bg-surface rounded-card border border-border p-3.5 animate-pulse"
              style={{ opacity: 1 - i * 0.1 }}
            >
              <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-surface-muted rounded-lg w-1/3" />
                <div className="h-3 bg-surface-muted rounded-lg w-1/4" />
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

          <div className="hidden md:flex flex-col flex-1 bg-surface rounded-card shadow-card border border-border overflow-hidden min-h-0">
            <Suspense
              fallback={<div className="flex-1 animate-pulse bg-surface-subtle" />}
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
        className="md:hidden fixed right-6 w-14 h-14 bg-brand text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center text-3xl z-40 pb-1 hover:bg-brand-hover active:scale-95 transition-transform"
        style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
      >
        +
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              key="modal-content"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-surface rounded-card shadow-modal w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="p-5 border-b border-border flex justify-between items-center bg-surface-subtle shrink-0">
                <h3 className="text-xl font-bold text-content-primary">
                  Новий садочок
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-content-muted hover:text-content-secondary p-2 -mr-2 leading-none text-xl active:scale-90 transition-transform duration-fast"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleAddSchool}
                className="p-6 flex flex-col gap-4 overflow-y-auto"
              >
                <div className="relative">
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
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
                    className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                  {showSuggestions && (
                    <ul className="absolute z-10 w-full bg-surface border border-border-strong rounded-control shadow-lg mt-1 max-h-48 overflow-y-auto overflow-hidden">
                      {isSearching ? (
                        <li className="px-4 py-3 text-sm text-content-muted italic">
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
                        <li className="px-4 py-3 text-sm text-content-muted italic">
                          Нічого не знайдено
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                {!selectedCity.id && (
                  <div>
                    <label className="block text-sm font-medium text-content-secondary mb-1.5">
                      Місто
                    </label>
                    <select
                      value={form.cityId}
                      onChange={(e) =>
                        setForm({ ...form, cityId: e.target.value })
                      }
                      required
                      className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand bg-surface"
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
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
                    Контакт{" "}
                    <span className="ml-1 text-xs font-normal text-content-muted">
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
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${form.director === c.contactName ? "bg-brand text-white border-blue-600 shadow-sm" : "bg-surface text-content-secondary border-border-strong hover:bg-surface-subtle"}`}
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
                    className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand mb-4"
                  />
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
                    Телефон
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0671234567"
                    className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-5 py-3.5 bg-surface-muted rounded-control text-sm font-bold text-content-secondary hover:bg-slate-200 transition-colors"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    disabled={addSchoolMutation.isPending}
                    className="flex-1 px-5 py-3.5 bg-brand text-white rounded-control text-sm font-bold hover:bg-brand-hover disabled:opacity-50 transition-colors"
                  >
                    {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Видалити садочок?"
        message={`Садочок «${deleteTarget?.name ?? ''}» та усі його події будуть видалені назавжди.`}
        confirmLabel="Видалити"
        variant="danger"
        onConfirm={confirmDeleteSchool}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        isOpen={importConfirmOpen}
        title="Імпортувати садочки?"
        message={`Імпортувати всі садочки з isuo.org для міста ${pendingImportCityName}?`}
        confirmLabel="Імпортувати"
        variant="warning"
        onConfirm={confirmImport}
        onCancel={() => setImportConfirmOpen(false)}
      />
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/lazyTabPages.ts

```
import { lazy } from "react";

export function lazyWithRetry(factory: () => Promise<any>) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      const key = "chunk-reload-ts";
      const last = Number(sessionStorage.getItem(key) || 0);
      if (Date.now() - last > 10000) {
        sessionStorage.setItem(key, String(Date.now()));
        window.location.reload();
        return new Promise(() => {});
      }
      throw err;
    }
  });
}

export const rawImportFactories: Record<string, () => Promise<any>> = {
  "/dashboard": () => import("./Dashboard"),
  "/schools": () => import("./Schools"),
  "/kindergartens": () => import("./Kindergartens"),
  "/finance": () => import("./Finance"),
  "/calendar": () => import("./CalendarView"),
  "/employees": () => import("./Employees"),
  "/analytics": () => import("./Analytics"),
};

const Dashboard = lazyWithRetry(rawImportFactories["/dashboard"]);
const Schools = lazyWithRetry(rawImportFactories["/schools"]);
const Kindergartens = lazyWithRetry(rawImportFactories["/kindergartens"]);
const Finance = lazyWithRetry(rawImportFactories["/finance"]);
const CalendarView = lazyWithRetry(rawImportFactories["/calendar"]);
const Employees = lazyWithRetry(rawImportFactories["/employees"]);
const Analytics = lazyWithRetry(rawImportFactories["/analytics"]);

export const TAB_PAGE_COMPONENTS: Record<string, React.LazyExoticComponent<any>> = {
  "/dashboard": Dashboard,
  "/schools": Schools,
  "/kindergartens": Kindergartens,
  "/finance": Finance,
  "/calendar": CalendarView,
  "/employees": Employees,
  "/analytics": Analytics,
};

```

# FILE: apps/frontend/src/pages/Login.tsx

```
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

import { api } from "../config/api";
import { fadeVariants, staggerContainer, staggerItem, TRANSITION } from "../lib/motion";

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
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex items-center justify-center min-h-screen bg-surface-subtle p-4">
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-brand"
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
        className="p-6 sm:p-8 bg-surface rounded-card shadow-modal w-full max-w-sm sm:max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-content-primary mb-6">
          Вхід у CRM
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-danger-50 text-danger-600 rounded-control text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isTransitioning ? "exit" : "visible"}
            className="flex flex-col gap-4"
          >
            <motion.div variants={staggerItem}>
              <label htmlFor="login-email" className="block text-sm font-medium text-content-primary mb-1.5">
                Email
              </label>
              <motion.input
                id="login-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-3 border border-border-strong rounded-control focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-base transition-colors"
                whileFocus={{ scale: 1.01 }}
                transition={TRANSITION.focus}
                required
              />
            </motion.div>
            <motion.div variants={staggerItem}>
              <label htmlFor="login-password" className="block text-sm font-medium text-content-primary mb-1.5">
                Пароль
              </label>
              <div className="relative">
                <motion.input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-3 pr-10 border border-border-strong rounded-control focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none text-base transition-colors"
                  whileFocus={{ scale: 1.01 }}
                  transition={TRANSITION.focus}
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                  aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {showPassword ? (
                      <motion.span key="off" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={TRANSITION.fade}>
                        <EyeOff className="w-4 h-4" />
                      </motion.span>
                    ) : (
                      <motion.span key="on" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={TRANSITION.fade}>
                        <Eye className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
            <motion.div variants={staggerItem}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={TRANSITION.hover}
                className="mt-2 w-full bg-brand text-white font-medium px-5 py-3 rounded-control hover:bg-brand-hover transition disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      variants={fadeVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                      />
                      Вхід...
                    </motion.span>
                  ) : (
                    <motion.span key="idle" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
                      Увійти
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </motion.div>
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
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import {
  scaleVariants,
  staggerItem,
} from "../lib/motion";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle px-4">
      <motion.div
        variants={scaleVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full bg-surface rounded-card shadow-card border border-border p-8 text-center"
      >
        <motion.div
          variants={scaleVariants}
          initial="hidden"
          animate="visible"
          className="w-16 h-16 rounded-full bg-brand-subtle flex items-center justify-center mx-auto mb-4"
        >
          <SearchX className="w-7 h-7 text-brand" />
        </motion.div>
        <motion.h1
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="text-xl font-bold text-content-primary mb-2"
        >
          Сторінку не знайдено
        </motion.h1>
        <motion.p
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="text-sm text-content-muted mb-6"
        >
          Можливо, її було переміщено або видалено.
        </motion.p>
        <Button onClick={() => navigate("/")}>
          На головну
        </Button>
      </motion.div>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/OverviewTab.tsx

```
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import TodayEvents from "../components/dashboard/TodayEvents";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import { staggerContainer, staggerItem, useCountUp, TRANSITION } from "../lib/motion";

function AnimatedAmount({ value, suffix }: { value: number; suffix?: string }) {
  const display = useCountUp(value, { duration: 0.9 });
  return (
    <>
      {new Intl.NumberFormat("uk-UA").format(display)}
      {suffix ? ` ${suffix}` : ""}
    </>
  );
}

function KpiCard({
  title,
  numericValue,
  suffix,
  subtitle,
  icon,
  loading,
}: {
  title: string;
  numericValue: number;
  suffix?: string;
  subtitle?: string;
  icon: string;
  loading?: boolean;
}) {
  return (
    <motion.div className="mobile-kpi-card min-h-[80px]" variants={staggerItem} whileTap={{ scale: 0.97 }} transition={TRANSITION.tap}>
      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-3 bg-neutral-100 rounded w-1/2" />
          <div className="h-6 bg-neutral-100 rounded w-2/3" />
          <div className="h-2.5 bg-neutral-100 rounded w-1/3" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-sm">{icon}</span>
            <span className="mobile-stat-label">{title}</span>
          </div>
          <p className="text-xl font-bold text-content-primary leading-none">
            <AnimatedAmount value={numericValue} suffix={suffix} />
          </p>
          {subtitle && (
            <p className="text-2xs text-content-muted mt-1">{subtitle}</p>
          )}
        </>
      )}
    </motion.div>
  );
}

export default function OverviewTab() {
  const { user } = useAuth();
  const { data: summary, isError } = useDashboardSummary();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброго ранку";
    if (hour < 18) return "Доброго дня";
    return "Доброго вечора";
  }, []);

  const kpiCards = useMemo(() => {
    if (!summary) return null;
    return [
      {
        title: "Виручка",
        numericValue: Number(summary.monthlyKpi.revenue) || 0,
        suffix: "грн",
        icon: "💰",
      },
      {
        title: "Прибуток",
        numericValue: Number(summary.monthlyKpi.profit) || 0,
        suffix: "грн",
        icon: "📈",
      },
      {
        title: "Дітей",
        numericValue: Number(summary.monthlyKpi.children) || 0,
        subtitle: `за ${summary.monthlyKpi.count} подіями`,
        icon: "👶",
      },
      {
        title: "Активних шкіл",
        numericValue: Number(summary.totalSchools) || 0,
        icon: "🏫",
      },
    ];
  }, [summary]);

  return (
    <div className="min-h-0">
      <div className="bg-white/80 backdrop-blur-md border-b border-border px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-content-primary">
              {greeting}, {user?.name ?? "Користувач"}
            </h1>
            <p className="text-2xs text-content-muted mt-0.5">
              {new Date().toLocaleDateString("uk-UA", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-4">
        {isError ? (
          <div className="text-center py-12 text-content-muted">
            <span className="text-2xl block mb-2 opacity-50">⚠️</span>
            <p className="text-sm font-medium">Не вдалося завантажити дані дашборду</p>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {kpiCards
                ? kpiCards.map((kpi) => (
                    <KpiCard key={kpi.title} {...kpi} loading={false} />
                  ))
                : Array.from({ length: 4 }).map((_, i) => (
                    <KpiCard
                      key={i}
                      title=""
                      numericValue={0}
                      icon=""
                      loading={true}
                    />
                  ))}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <TodayEvents events={summary?.todayEvents ?? []} />
              <ActivityFeed items={summary?.activityFeed ?? []} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/ProjectProfile.tsx

```
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

```

# FILE: apps/frontend/src/pages/SchoolProfile.tsx

```
import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { DUR, pageVariants, slideUpVariants } from "../lib/motion";

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
const CommentsTimeline = lazy(
  () => import("../components/school-profile/CommentsTimeline"),
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
      transition={{ duration: DUR.slow }}
      className="p-4 md:p-8 bg-gradient-subtle min-h-screen text-content-primary font-sans w-full overflow-x-hidden pb-24 md:pb-8"
    >
      <SchoolProfileHeader
        schoolData={schoolData}
        onEdit={() => setIsEditModalOpen(true)}
        onAddEvent={openAddEventModal}
      />

      {currentEvent && (
        <div className="xl:hidden">
          <Suspense
            fallback={
              <div className="bg-surface rounded-card shadow-card h-24 animate-pulse border border-border" />
            }
          >
            <Pipeline
              currentStageIndex={currentStageIndex}
              currentEvent={currentEvent}
              onPipelineClick={handlePipelineClick}
              stages={PIPELINE_STAGES}
            />
          </Suspense>
        </div>
      )}

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Ліва колонка */}
        <div className="w-full xl:w-80 flex flex-col gap-6">
          <motion.div {...stagger(0)}>
            <Suspense
              fallback={
                <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
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
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-gradient-card rounded-card shadow-card border border-border p-6 hover:shadow-card-hover transition-all duration-200"
              >
                <h3 className="font-bold text-content-primary mb-4 tracking-tight">
                  Відповідальна особа
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-content-muted">Остання дія:</span>
                    <span className="font-medium text-brand">
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
                <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
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

          <motion.div {...stagger(2)}>
            <Suspense
              fallback={
                <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
              }
            >
              <CommentsTimeline schoolId={schoolData.id} />
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
          variants={slideUpVariants}
          initial="hidden"
          animate="visible"
        >
          {currentEvent && (
            <div className="hidden xl:block">
              <Suspense
                fallback={
                  <div className="bg-surface rounded-card shadow-card h-24 animate-pulse border border-border" />
                }
              >
                <Pipeline
                  currentStageIndex={currentStageIndex}
                  currentEvent={currentEvent}
                  onPipelineClick={handlePipelineClick}
                  stages={PIPELINE_STAGES}
                />
              </Suspense>
            </div>
          )}

          <AnimatePresence>
            {currentEvent &&
              currentStageIndex >= 4 &&
              exitingEventId !== currentEvent.id && (
              <motion.div
                key="preparation"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 xl:grid-cols-2 gap-6"
              >
                {eventFullLoading ? (
                  <div className="bg-surface p-6 rounded-card shadow-card border border-border animate-pulse h-48" />
                ) : (
                  <Suspense
                    fallback={
                      <div className="bg-surface rounded-card shadow-card h-48 animate-pulse border border-border" />
                    }
                  >
                    <EventPreparation
                      data={currentEvent.preparation || {}}
                      onUpdate={handleUpdatePreparation}
                      onOpenCrewModal={() => setIsCrewModalOpen(true)}
                      project={currentEvent.project}
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
                    <div className="bg-surface rounded-card shadow-card h-32 animate-pulse border border-border" />
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
                <div className="bg-surface rounded-card shadow-card h-32 animate-pulse border border-border" />
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
                <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
                  <div className="p-6 border-b border-border bg-surface-muted">
                    <h3 className="font-bold text-content-primary">
                      Завершені події ({completedEvents.length})
                    </h3>
                  </div>
                  <div className="md:hidden divide-y divide-border">
                    {completedEvents.map((ev: Event) => (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedReportEvent(ev)}
                        className="flex items-center justify-between gap-3 p-4 active:bg-surface-muted cursor-pointer"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-brand truncate">
                            {ev.project}
                          </p>
                          <p className="text-xs text-content-muted mt-0.5">
                            {new Date(ev.date).toLocaleDateString("uk-UA")}
                          </p>
                          <p className="text-xs text-content-secondary mt-1">
                            👶{" "}
                            {ev.report?.childrenCount ||
                              ev.childrenPlanned ||
                              "—"}{" "}
                            дітей
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-semibold text-content-primary text-sm">
                            {new Intl.NumberFormat("uk-UA").format(
                              Math.round(Number(ev.report?.totalSum || ev.price || 0)),
                            )}{" "}
                            грн
                          </p>
                          <p className="text-xs font-medium text-success-600 mt-0.5">
                            +
                            {new Intl.NumberFormat("uk-UA").format(
                              Math.round(Number(ev.report?.remainderSum || 0)),
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
                        <tr className="bg-surface border-b border-border text-content-muted text-xs font-semibold uppercase tracking-wider">
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
                            className="border-b border-surface-muted hover:bg-surface-muted transition-colors cursor-pointer"
                          >
                            <td className="p-4 text-content-secondary font-medium">
                              {ev.project}
                            </td>
                            <td className="p-4 text-content-muted">
                              {new Date(ev.date).toLocaleDateString("uk-UA")}
                            </td>
                            <td className="p-4 font-medium">
                              {ev.report?.childrenCount ||
                                ev.childrenPlanned ||
                                "—"}
                            </td>
                            <td className="p-4 font-medium text-content-primary">
                              {new Intl.NumberFormat("uk-UA").format(
                                Math.round(Number(ev.report?.totalSum || ev.price || 0)),
                              )}{" "}
                              грн
                            </td>
                            <td className="p-4 font-medium text-success-600">
                              {new Intl.NumberFormat("uk-UA").format(
                                Math.round(Number(ev.report?.remainderSum || 0)),
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
        className="md:hidden fixed right-6 w-14 h-14 bg-brand text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 pb-1 active:scale-95 transition-transform"
        style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
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
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, modalContentVariants } from "../lib/motion";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { useToast } from "../components/ui/Toast";
import { useSearchParams, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
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
import EstablishmentsTopNav from "../components/establishments/EstablishmentsTopNav";

const INSTITUTION_TYPES = {
  school: { apiType: "Школа" as const, label: "Школи", countLabel: "шкіл" },
  kindergarten: { apiType: "Садочок" as const, label: "Садочки", countLabel: "садочків" },
} as const;

type InstitutionType = keyof typeof INSTITUTION_TYPES;

const ESTABLISHMENT_IDS: InstitutionType[] = ["school", "kindergarten"];

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
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const userRole = user?.role ?? null;
  const qc = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [pendingImport, setPendingImport] = useState<{ cityId: string; type: "Школа" | "Садочок" } | null>(null);

  const institutionType = useMemo<InstitutionType>(() => {
    const fromUrl = searchParams.get("type");
    if (fromUrl === "kindergarten") return "kindergarten";
    if (fromUrl === "school") return "school";
    if (location.pathname.includes("kindergarten")) return "kindergarten";
    return "school";
  }, [searchParams, location.pathname]);

  const swiperRef = useRef<any>(null);

  const handleTabChange = useCallback(
    (id: string) => {
      const idx = ESTABLISHMENT_IDS.findIndex((t) => t === id);
      if (idx !== -1 && swiperRef.current) {
        swiperRef.current.slideTo(idx);
      }
      setSearchParams({ type: id }, { replace: true });
    },
    [setSearchParams],
  );

  const handleSlideChange = useCallback(
    (swiper: any) => {
      const tabId = ESTABLISHMENT_IDS[swiper.activeIndex];
      if (tabId && tabId !== institutionType) {
        setSearchParams({ type: tabId }, { replace: true });
      }
    },
    [institutionType, setSearchParams],
  );

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

  useEffect(() => {
    if (!isModalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setIsModalOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isModalOpen]);

  const addSchoolMutation = useMutation({
    mutationFn: (newSchool: NewSchoolPayload) =>
      api.post("/schools", newSchool),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      setIsModalOpen(false);
    },
    onError: () => toast("Не вдалося створити заклад", "error"),
  });

  const bulkImportMutation = useMutation({
    mutationFn: ({ cityId, type }: { cityId: string; type: "Школа" | "Садочок" }) =>
      api.post(
        "/schools/bulk-import",
        { cityId, type },
        { timeout: 120000 },
      ),
    onSuccess: (res) => {
      toast("Імпорт завершено: додано " + res.data.created + ", пропущено " + res.data.skipped, "success");
      qc.invalidateQueries({ queryKey: ["schools"] });
    },
    onError: () => toast("Помилка імпорту", "error"),
  });

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const baseFilters = useMemo(
    () => ({
      search: debouncedQuery || undefined,
      cityId: selectedCity.id || undefined,
      stage: (activeFilter as any) || undefined,
      size: (sizeFilter as any) || undefined,
    }),
    [debouncedQuery, selectedCity.id, activeFilter, sizeFilter],
  );

  const schoolFilters = useMemo(
    () => ({ ...baseFilters, type: "Школа" as const }),
    [baseFilters],
  );

  const kindergartenFilters = useMemo(
    () => ({ ...baseFilters, type: "Садочок" as const }),
    [baseFilters],
  );

  const {
    data: schoolPages,
    isLoading: isSchoolsLoading,
    fetchNextPage: fetchNextSchools,
    hasNextPage: hasNextSchools,
    isFetchingNextPage: isFetchingNextSchools,
  } = useSchools(schoolFilters);

  const {
    data: kindergartenPages,
    isLoading: isKindergartenLoading,
    fetchNextPage: fetchNextKindergartens,
    hasNextPage: hasNextKindergartens,
    isFetchingNextPage: isFetchingNextKindergartens,
  } = useSchools(kindergartenFilters);

  const { data: schoolStats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: "Школа" as const,
    stage: (activeFilter as any) || undefined,
  });

  const { data: kindergartenStats } = useSchoolStats({
    cityId: selectedCity.id || undefined,
    type: "Садочок" as const,
    stage: (activeFilter as any) || undefined,
  });

  const { data: cities = [] } = useCities();
  const { data: supportedCities = [] } = useSupportedCities();
  const deleteSchool = useDeleteSchool();
  const prefetchSchool = usePrefetchSchool();

  const schoolData = useMemo(() => ({
    filtered: schoolPages?.pages.flatMap((p) => p.data) ?? [],
    totalItems: schoolPages?.pages[0]?.meta.totalItems ?? 0,
  }), [schoolPages]);

  const kindergartenData = useMemo(() => ({
    filtered: kindergartenPages?.pages.flatMap((p) => p.data) ?? [],
    totalItems: kindergartenPages?.pages[0]?.meta.totalItems ?? 0,
  }), [kindergartenPages]);

  const handleLoadMoreSchools = useCallback(() => {
    if (hasNextSchools && !isFetchingNextSchools) fetchNextSchools();
  }, [hasNextSchools, isFetchingNextSchools, fetchNextSchools]);

  const handleLoadMoreKindergartens = useCallback(() => {
    if (hasNextKindergartens && !isFetchingNextKindergartens) fetchNextKindergartens();
  }, [hasNextKindergartens, isFetchingNextKindergartens, fetchNextKindergartens]);

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
    (e: React.MouseEvent, schoolId: string, schoolName: string) => {
      e.stopPropagation();
      if (userRole !== "SUPERADMIN") return;
      setDeleteTarget({ id: schoolId, name: schoolName });
    },
    [userRole],
  );

  const confirmDeleteSchool = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      await deleteSchool.mutateAsync(deleteTarget.id);
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, deleteSchool]);

  const confirmImport = () => {
    if (!pendingImport) return;
    setDotCount(3);
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev === 1 ? 3 : prev - 1));
    }, 500);
    bulkImportMutation.mutate(pendingImport, {
      onSettled: () => clearInterval(dotInterval),
    });
    setPendingImport(null);
  };

  return (
    <div className="bg-gradient-subtle min-h-screen flex flex-col">
      <EstablishmentsTopNav
        activeTab={institutionType}
        onChange={handleTabChange}
      />

      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        initialSlide={ESTABLISHMENT_IDS.findIndex((t) => t === institutionType)}
        onSlideChange={handleSlideChange}
        speed={280}
        allowTouchMove={true}
        className="establishments-swiper"
      >
        {ESTABLISHMENT_IDS.map((id) => {
          const info = INSTITUTION_TYPES[id];
          const isSchool = id === "school";
          const data = isSchool ? schoolData : kindergartenData;
          const stats = isSchool ? schoolStats : kindergartenStats;
          const isLoading = isSchool ? isSchoolsLoading : isKindergartenLoading;
          const handleLoadMore = isSchool ? handleLoadMoreSchools : handleLoadMoreKindergartens;

          return (
            <SwiperSlide key={id}>
              <div className="p-4 md:p-8 max-w-[100vw] min-h-[calc(100dvh-5rem)] md:min-h-0 flex flex-col">
                {/* Шапка */}
                <div className="flex items-center justify-between gap-2 mb-3 shrink-0">
                  <div className="min-w-0">
                    <h1 className="text-2xl font-bold tracking-tight text-content-primary leading-tight">
                      {info.label}
                      {selectedCity.id && (
                        <span className="ml-1 text-sm font-normal text-brand">
                          · {selectedCity.name}
                        </span>
                      )}
                    </h1>
                    <p className="text-sm text-content-muted mt-0.5">
                      {data.filtered.length} {info.countLabel} у місті
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {(userRole === "SUPERADMIN" || userRole === "MANAGER") && (
                      <button
                        onClick={() => {
                          if (!selectedCity.id) return toast("Спочатку оберіть місто", "error");
                          if (!supportedCities.includes(selectedCity.name))
                            return toast(
                              "Місто не підтримується для імпорту",
                              "error",
                            );
                          setPendingImport({ cityId: selectedCity.id, type: info.apiType });
                        }}
                        disabled={bulkImportMutation.isPending}
                        className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 hover:shadow-lift hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 transition-all duration-200"
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
                      className="hidden md:flex items-center gap-1 px-4 py-2.5 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-hover hover:shadow-lift hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    >
                      + Додати
                    </button>
                  </div>
                </div>

                {/* StatsBar */}
                <div className="shrink-0">
                  <Suspense
                    fallback={
                      <div className="h-[72px] bg-surface rounded-card animate-pulse mb-4" />
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
                      schoolType={info.apiType}
                    />
                  </Suspense>
                </div>

                {/* Список */}
                <div className="flex-1 w-full min-h-0 mt-3">
                  <EstablishmentList
                    isLoading={isLoading}
                    filteredSchools={data.filtered}
                    totalItems={data.totalItems}
                    activeFilter={activeFilter}
                    sizeFilter={sizeFilter}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onClearFilters={() => {
                      setActiveFilter(null);
                      setSizeFilter(null);
                    }}
                    handleLoadMore={handleLoadMore}
                    prefetchSchool={prefetchSchool}
                    handleDeleteSchool={handleDeleteSchool}
                    searchPlaceholder={`Пошук за назвою ${id === "school" ? "школи" : "садочка"}...`}
                    countLabel={info.countLabel}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Мобільна плаваюча кнопка FAB */}
      <button
        onClick={handleOpenModal}
        className="md:hidden fixed right-6 w-14 h-14 bg-brand text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 pb-1 hover:bg-brand-hover active:scale-95 transition-transform"
        style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
      >
        +
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div variants={backdropVariants} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div variants={modalContentVariants} initial="hidden" animate="visible" exit="exit" className="bg-surface rounded-modal shadow-modal w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-5 border-b border-border flex justify-between items-center bg-surface-muted shrink-0">
                <h3 className="text-xl font-bold text-content-primary">Нова школа</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-content-muted hover:text-content-secondary p-2 -mr-2 leading-none text-xl active:scale-90 transition-transform duration-fast"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleAddSchool}
                className="p-6 flex flex-col gap-4 overflow-y-auto"
              >
                <div className="relative">
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
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
                    className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                  {showSuggestions && (
                    <ul className="absolute z-10 w-full bg-surface border border-border-strong rounded-control shadow-dropdown mt-1 max-h-48 overflow-y-auto overflow-hidden">
                      {isSearching ? (
                        <li className="px-4 py-3 text-sm text-content-muted italic">
                          Пошук...
                        </li>
                      ) : suggestions.length > 0 ? (
                        suggestions.map((s, i) => (
                          <li
                            key={i}
                            onMouseDown={() =>
                              handleSelectSuggestion(s.name, s.url)
                            }
                            className="px-4 py-3 text-sm hover:bg-brand-50 cursor-pointer font-medium border-b border-surface-muted last:border-0"
                          >
                            {s.name}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-3 text-sm text-content-muted italic">
                          Нічого не знайдено
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                {!selectedCity.id && (
                  <div>
                    <label className="block text-sm font-medium text-content-secondary mb-1.5">
                      Місто
                    </label>
                    <select
                      value={form.cityId}
                      onChange={(e) =>
                        setForm({ ...form, cityId: e.target.value })
                      }
                      required
                      className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 bg-surface"
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
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
                    Контакт{" "}
                    <span className="ml-1 text-xs font-normal text-content-muted">
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
                          className={`text-xs font-medium px-3 py-1.5 rounded-control border transition-colors ${form.director === c.contactName ? "bg-brand text-white border-brand shadow-sm" : "bg-surface text-content-secondary border-border-strong hover:bg-surface-muted"}`}
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
                    className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30 mb-4"
                  />
                  <label className="block text-sm font-medium text-content-secondary mb-1.5">
                    Телефон
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0671234567"
                    className="w-full p-3 border border-border-strong rounded-control text-base focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-5 py-3.5 bg-surface-muted rounded-control text-sm font-bold text-content-secondary hover:bg-neutral-200 transition-colors"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    disabled={addSchoolMutation.isPending}
                    className="flex-1 px-5 py-3.5 bg-brand text-white rounded-control text-sm font-bold hover:bg-brand-hover disabled:opacity-50 transition-colors"
                  >
                    {addSchoolMutation.isPending ? "Збереження..." : "Створити"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Видалити школу?"
        message={`Школа «${deleteTarget?.name ?? ''}» та усі її події будуть видалені назавжди.`}
        confirmLabel="Видалити"
        variant="danger"
        onConfirm={confirmDeleteSchool}
        onCancel={() => setDeleteTarget(null)}
      />
      <ConfirmDialog
        isOpen={!!pendingImport}
        title="Імпорт закладів?"
        message={`Імпортувати всі заклади з isuo.org для міста ${selectedCity.name}?`}
        confirmLabel="Імпортувати"
        variant="default"
        onConfirm={confirmImport}
        onCancel={() => setPendingImport(null)}
      />
    </div>
  );
}

function EstablishmentList({
  isLoading,
  filteredSchools,
  totalItems,
  activeFilter,
  sizeFilter,
  searchQuery,
  onSearchChange,
  onClearFilters,
  handleLoadMore,
  prefetchSchool,
  handleDeleteSchool,
  searchPlaceholder,
  countLabel,
}: {
  isLoading: boolean;
  filteredSchools: any[];
  totalItems: number;
  activeFilter: string | null;
  sizeFilter: string | null;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onClearFilters: () => void;
  handleLoadMore: () => void;
  prefetchSchool: (id: string) => void;
  handleDeleteSchool: (e: React.MouseEvent, id: string, name: string) => void;
  searchPlaceholder: string;
  countLabel: string;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Пошук */}
      <div className="relative shrink-0 mb-4 mt-2">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-content-muted"
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
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-12 pr-10 py-3.5 sm:py-3 bg-white border border-border rounded-2xl sm:rounded-xl text-base font-medium text-content-primary placeholder-content-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand shadow-soft transition-all duration-200"
          enterKeyHint="search"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-4 flex items-center text-content-muted hover:text-content-secondary transition"
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
      <p className="text-xs font-semibold text-content-muted mb-4 shrink-0 uppercase tracking-wide px-1">
        {`${filteredSchools.length} з ${totalItems} ${countLabel}`}
        {(activeFilter || sizeFilter) && (
          <button
            onClick={onClearFilters}
            className="ml-3 text-brand hover:text-brand-hover lowercase active:scale-[0.97] transition-transform duration-fast"
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
              className="bg-surface rounded-card border border-border p-3.5 animate-pulse"
              style={{ opacity: 1 - i * 0.1 }}
            >
              <div className="h-4 bg-neutral-200 rounded-control w-3/4 mb-3" />
              <div className="flex justify-between">
                <div className="h-3 bg-surface-muted rounded-control w-1/3" />
                <div className="h-3 bg-surface-muted rounded-control w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Мобільний */}
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

          {/* Десктоп */}
          <div className="hidden md:flex flex-col flex-1 bg-surface rounded-card shadow-card border border-border overflow-hidden min-h-0 min-w-0">
            <Suspense
              fallback={<div className="flex-1 animate-pulse bg-surface-muted" />}
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

vi.mock("../../context/CityContext", () => ({
  useSelectedCity: () => ({
    selectedCity: { id: "city-1", name: "Львів" },
    setSelectedCity: vi.fn(),
  }),
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ user: { role: "SUPERADMIN", name: "Адмін" } }),
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
  it("renders overview tab for SUPERADMIN role", async () => {
    server.use(
      http.get("http://localhost:3000/api/dashboard/summary", () =>
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
      http.get("http://localhost:3000/api/cities", () =>
        HttpResponse.json([
          { id: "city-1", name: "Львів" },
          { id: "city-2", name: "Київ" },
        ])
      ),
    );

    render(<Dashboard />, { wrapper: createWrapper() });

    const overviewTab = screen.getByRole("tab", { name: /огляд/i });
    expect(overviewTab).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("50 000 грн")).toBeInTheDocument();
    }, { timeout: 10000 });
    expect(screen.getByText("Доброго ранку, Адмін")).toBeInTheDocument();
    expect(screen.getByText("20 000 грн")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MobileTopNav from "../../components/MobileTopNav";
import { AuthProvider } from "../../context/AuthContext";
import { CityProvider } from "../../context/CityContext";
import type { ReactNode } from "react";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={["/schools"]}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CityProvider>{children}</CityProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
}

describe("MobileTopNav", () => {
  it("рендерить назву розділу за маршрутом /schools", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    expect(screen.getByText("Школи")).toBeTruthy();
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

# FILE: apps/frontend/src/tests/component/ReportModal.test.tsx

```
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ReportModal from "../../components/school-profile/modals/ReportModal";

describe("ReportModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSave: mockOnSave,
    schoolName: "Школа №1",
    crew: {
      host: { id: "host-1", name: "Ведучий Олег" },
      driver: { id: "driver-1", name: "Водій Петро" },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderModal = (props = {}) =>
    render(<ReportModal {...defaultProps} {...props} />);

  const findInputByLabel = (label: string): HTMLInputElement => {
    const labelEl = screen.getByText(label);
    const row = labelEl.closest(".flex")!;
    return row.querySelector('input[type="number"]')!;
  };

  it("не рендерить вміст коли isOpen=false", () => {
    renderModal({ isOpen: false });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("рендерить форму коли isOpen=true", () => {
    renderModal();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Звіт по події")).toBeInTheDocument();
    expect(screen.getByText("Загальна виручка")).toBeInTheDocument();
    expect(screen.getByText("Зберегти звіт")).toBeInTheDocument();
  });

  it("відображає назву школи", () => {
    renderModal({ schoolName: "Тестова школа" });
    expect(screen.getByText("Тестова школа")).toBeInTheDocument();
  });

  it("оновлює фінансові розрахунки при зміні totalSum", () => {
    renderModal();
    const totalSumInput = findInputByLabel("Загальна виручка");
    fireEvent.change(totalSumInput, { target: { value: "10000" } });
    const remainderEl = screen.getByText("Залишок (80%)").closest(".flex")!;
    expect(remainderEl.textContent).toMatch(/8[\s\u00A0]000/);
  });

  it("додавання витрати зменшує залишок", () => {
    renderModal();
    const totalSumInput = findInputByLabel("Загальна виручка");
    fireEvent.change(totalSumInput, { target: { value: "10000" } });
    fireEvent.change(screen.getByPlaceholderText("Назва витрати"), {
      target: { value: "Пальне" },
    });
    fireEvent.change(screen.getByPlaceholderText("грн"), {
      target: { value: "1000" },
    });
    fireEvent.click(screen.getByText("+"));
    const remainderEl = screen.getByText("Залишок (80%)").closest(".flex")!;
    expect(remainderEl.textContent).toMatch(/7[\s\u00A0]000/);
  });

  it("видалення витрати повертає залишок", () => {
    renderModal();
    const totalSumInput = findInputByLabel("Загальна виручка");
    fireEvent.change(totalSumInput, { target: { value: "10000" } });
    fireEvent.change(screen.getByPlaceholderText("Назва витрати"), {
      target: { value: "Пальне" },
    });
    fireEvent.change(screen.getByPlaceholderText("грн"), {
      target: { value: "1000" },
    });
    fireEvent.click(screen.getByText("+"));
    const removeButtons = screen.getAllByText("✕");
    fireEvent.click(removeButtons[1]);
    const remainderEl = screen.getByText("Залишок (80%)").closest(".flex")!;
    expect(remainderEl.textContent).toMatch(/8[\s\u00A0]000/);
  });

  it("onSave повертає коректні дані з усіма полями", () => {
    renderModal();
    const totalSumInput = findInputByLabel("Загальна виручка");
    fireEvent.change(totalSumInput, { target: { value: "20000" } });

    fireEvent.change(screen.getByPlaceholderText("Назва витрати"), {
      target: { value: "Пальне" },
    });
    fireEvent.change(screen.getByPlaceholderText("грн"), {
      target: { value: "500" },
    });
    fireEvent.click(screen.getByText("+"));

    const hostSalaryInput = findInputByLabel("Ведучий Олег (Ведучий)");
    fireEvent.change(hostSalaryInput, { target: { value: "2000" } });

    fireEvent.click(screen.getByText("Зберегти звіт"));

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    const data = mockOnSave.mock.calls[0][0];
    expect(data.totalSum).toBe(20000);
    expect(data.schoolSum).toBe(4000);
    expect(data.remainderSum).toBe(15500);
    expect(data.childrenCount).toBe(0);
    expect(data.expenses).toEqual([{ name: "Пальне", amount: 500 }]);
    expect(data.salaries).toEqual([
      { userId: "host-1", name: "Ведучий Олег", amount: 2000, role: "Ведучий" },
    ]);
  });

  it("кнопка 'Скасувати' викликає onClose", () => {
    renderModal();
    fireEvent.click(screen.getByText("Скасувати"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("кнопка закриття (✕) викликає onClose", () => {
    renderModal();
    fireEvent.click(screen.getByRole("button", { name: "Закрити" }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("Escape закриває модал", () => {
    renderModal();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
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

    expect(screen.getAllByText(/Школи/i).length).toBeGreaterThanOrEqual(1);
    
    await waitFor(() => {
      expect(screen.getAllByTestId("stats-bar").length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByTestId("virtual-desktop-table").length).toBeGreaterThanOrEqual(1);
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

  http.get(`${BASE}/auth/me`, () =>
    HttpResponse.json({
      user: { id: "user-1", name: "Тестовий", email: "test@crm.com", role: "SUPERADMIN", cityId: "city-1", cityName: "Львів" },
    })
  ),

  http.post(`${BASE}/auth/logout`, () =>
    HttpResponse.json({ ok: true })
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

