import { useMemo } from "react";
import { useAllSalary, useMarkPaid } from "../../../hooks/useSalary";
import { useSelectedCity } from "../../../context/CityContext";
import SalaryStatusBadge from "../components/SalaryStatusBadge";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Users } from "lucide-react";
import type { SalaryRecord } from "../../../types";

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

interface EmployeeGroup {
  employeeId: string;
  name: string;
  total: number;
  records: SalaryRecord[];
}

export default function TeamSalaries() {
  const { selectedCity } = useSelectedCity();
  const { data: records = [], isLoading } = useAllSalary(selectedCity.id);
  const markPaidMutation = useMarkPaid();

  const groups = useMemo<EmployeeGroup[]>(() => {
    const map = new Map<string, EmployeeGroup>();
    for (const r of records) {
      const eid = r.employeeId;
      if (!map.has(eid)) {
        map.set(eid, {
          employeeId: eid,
          name: r.employee?.name ?? "—",
          total: 0,
          records: [],
        });
      }
      const g = map.get(eid)!;
      g.total += Number(r.amount) || 0;
      g.records.push(r);
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [records]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-surface rounded-card border border-border" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="p-4">
        <EmptyState
          icon={Users}
          title="Немає нарахувань"
          description="Нарахування для цього міста ще відсутні"
        />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {groups.map((g) => (
        <div key={g.employeeId} className="bg-surface rounded-card border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-bold text-content-primary">{g.name}</span>
            <span className="text-sm font-bold text-brand">Σ {fmt(g.total)} грн</span>
          </div>
          <div className="space-y-3">
            {g.records.map((r) => (
              <div key={r.id} className="bg-surface-subtle rounded-xl border border-border p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-content-secondary">
                    {r.event?.project ?? "—"} · {r.event?.date ? new Date(r.event.date).toLocaleDateString("uk-UA") : "—"}
                  </span>
                  <SalaryStatusBadge status={r.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-brand">{fmt(r.amount)} грн</span>
                  {r.comment && <span className="text-xs text-content-muted truncate max-w-[50%]">{r.comment}</span>}
                </div>
                {r.status === "PENDING" && (
                  <button
                    onClick={() => markPaidMutation.mutate(r.id)}
                    disabled={markPaidMutation.isPending}
                    className="w-full mt-2 px-4 py-2 bg-success text-white rounded-control text-sm font-medium hover:bg-success-600 disabled:opacity-50 transition"
                  >
                    Позначити виплаченим
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
