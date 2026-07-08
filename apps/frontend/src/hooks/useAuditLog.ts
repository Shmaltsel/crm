import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";

export interface AuditLogEntry {
  id: string;
  userId: string | null;
  userName: string | null;
  action: string;
  entity: string | null;
  entityId: string | null;
  ip: string | null;
  createdAt: string;
}

export function useAuditLog(filters: { userId?: string; entity?: string; dateFrom?: string; dateTo?: string; page?: number }) {
  return useQuery({
    queryKey: ["audit-log", filters],
    queryFn: () => api.get<{ items: AuditLogEntry[]; meta: { totalItems: number; page: number; pageCount: number; hasNextPage: boolean } }>("/audit-log", { params: filters }).then(r => r.data),
    staleTime: 10 * 1000,
  });
}

export function useAuditLogEntities() {
  return useQuery({
    queryKey: ["audit-log", "entities"],
    queryFn: () => api.get<string[]>("/audit-log/entities").then(r => r.data),
    staleTime: 60 * 1000,
  });
}
