import { useAllSalary, useMarkPaid } from "../../../hooks/useSalary";
import { useSelectedCity } from "../../../context/CityContext";
import SalaryStatusBadge from "../components/SalaryStatusBadge";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Users } from "lucide-react";

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

export default function TeamSalaries() {
  const { selectedCity } = useSelectedCity();
  const { data: records = [], isLoading } = useAllSalary(selectedCity.id);
  const markPaidMutation = useMarkPaid();

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
    <div className="p-4 space-y-3">
      {records.map((r) => (
        <div key={r.id} className="bg-surface rounded-card border border-border p-4 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-content-primary">{r.employee?.name ?? "—"}</span>
            <SalaryStatusBadge status={r.status} />
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-content-secondary">{r.event?.project ?? "—"} · {r.event?.date ? new Date(r.event.date).toLocaleDateString("uk-UA") : "—"}</span>
            <span className="font-bold text-brand">{fmt(r.amount)} грн</span>
          </div>
          {r.comment && <p className="text-xs text-content-muted mb-2">{r.comment}</p>}
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
  );
}
