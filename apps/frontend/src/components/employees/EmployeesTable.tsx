import { useRef, useMemo, useState, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronUp, ChevronDown, ChevronsUpDown, Eye } from "lucide-react";
import { Badge } from "../ui/Badge";
import type { User } from "../../types";

type SortField = "name" | "role" | "city" | "email";
type SortDir = "asc" | "desc";

interface EmployeesTableProps {
  users: User[];
  onSelect?: (user: User) => void;
}

const ROLE_LABELS: Record<string, string> = {
  MANAGER: "Менеджер",
  DRIVER: "Водій",
  HOST: "Ведучий",
  SUPERADMIN: "Суперадмін",
};

const ROLE_STATUS: Record<string, "info" | "success" | "warning" | "default"> = {
  MANAGER: "info",
  DRIVER: "success",
  HOST: "warning",
  SUPERADMIN: "default",
};

export default function EmployeesTable({ users, onSelect }: EmployeesTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const parentRef = useRef<HTMLDivElement>(null);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "role": cmp = (ROLE_LABELS[a.role] ?? a.role).localeCompare(ROLE_LABELS[b.role] ?? b.role); break;
        case "city": cmp = (a.city?.name ?? "").localeCompare(b.city?.name ?? ""); break;
        case "email": cmp = a.email.localeCompare(b.email); break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [users, sortField, sortDir]);

  const rowVirtualizer = useVirtualizer({
    count: sortedUsers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  const allSelected = sortedUsers.length > 0 && selectedIds.size === sortedUsers.length;

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedUsers.map((u) => u.id)));
    }
  }, [allSelected, sortedUsers]);

  const toggleOne = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronsUpDown className="w-3.5 h-3.5 text-neutral-300" />;
    return sortDir === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />;
  };

  const colWidths = "grid-cols-[40px_minmax(180px,2fr)_100px_minmax(140px,1.5fr)_minmax(120px,1fr)_48px]";

  return (
    <div>
      {selectedIds.size > 0 && (
        <div className="mb-3 flex items-center gap-2 px-4 py-2.5 bg-brand-50 border border-brand-200 rounded-control">
          <span className="text-sm font-medium text-brand-700">
            Обрано {selectedIds.size}
          </span>
          <div className="ml-auto flex gap-2">
            <button className="text-xs font-semibold px-3 py-1.5 rounded-control bg-white border border-brand-200 text-brand-700 hover:bg-brand-100 transition-colors">
              Архівувати
            </button>
            <button className="text-xs font-semibold px-3 py-1.5 rounded-control bg-white border border-brand-200 text-brand-700 hover:bg-brand-100 transition-colors">
              Змінити роль
            </button>
            <button className="text-xs font-semibold px-3 py-1.5 rounded-control bg-white border border-brand-200 text-brand-700 hover:bg-brand-100 transition-colors">
              Призначити проєкт
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
        <div className={`${colWidths} items-center px-4 py-3 bg-neutral-50 border-b border-border text-xs font-semibold text-content-muted uppercase tracking-wider`}>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="w-4 h-4 rounded border-neutral-300 text-brand focus:ring-brand"
            />
          </div>
          <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-content-primary transition-colors">
            Ім'я <SortIcon field="name" />
          </button>
          <button onClick={() => toggleSort("role")} className="flex items-center gap-1 hover:text-content-primary transition-colors">
            Роль <SortIcon field="role" />
          </button>
          <button onClick={() => toggleSort("city")} className="flex items-center gap-1 hover:text-content-primary transition-colors">
            Місто <SortIcon field="city" />
          </button>
          <button onClick={() => toggleSort("email")} className="flex items-center gap-1 hover:text-content-primary transition-colors">
            Контакт <SortIcon field="email" />
          </button>
          <div />
        </div>

        <div ref={parentRef} className="overflow-auto" style={{ maxHeight: "calc(100vh - 320px)" }}>
          <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: "relative" }}>
            {virtualItems.map((virtualRow) => {
              const user = sortedUsers[virtualRow.index];
              const isSelected = selectedIds.has(user.id);
              return (
                <div
                  key={user.id}
                  className={`${colWidths} items-center px-4 py-0 border-b border-border text-sm cursor-pointer transition-colors
                    ${virtualRow.index % 2 === 1 ? "bg-neutral-50/50" : "bg-white"}
                    ${isSelected ? "bg-brand-50/40" : "hover:bg-neutral-50"}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onClick={() => onSelect?.(user)}
                >
                  <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(user.id)}
                      className="w-4 h-4 rounded border-neutral-300 text-brand focus:ring-brand"
                    />
                  </div>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br
                      ${user.role === "MANAGER" ? "from-brand to-brand-700" : ""}
                      ${user.role === "DRIVER" ? "from-success to-success-700" : ""}
                      ${user.role === "HOST" ? "from-purple-500 to-purple-700" : ""}
                      ${!["MANAGER", "DRIVER", "HOST"].includes(user.role) ? "from-neutral-500 to-neutral-600" : ""}`}
                    >
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-content-primary truncate">{user.name}</span>
                  </div>
                  <div>
                    <Badge variant={ROLE_STATUS[user.role] ?? "default"} size="sm">
                      {ROLE_LABELS[user.role] ?? user.role}
                    </Badge>
                  </div>
                  <div className="text-content-secondary truncate text-xs">
                    {user.city?.name || "—"}
                  </div>
                  <div className="text-content-secondary truncate text-xs">
                    {user.email}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => { e.stopPropagation(); onSelect?.(user); }}
                      className="p-1.5 rounded-control text-content-muted hover:text-brand hover:bg-brand-50 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label={`Переглянути ${user.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
