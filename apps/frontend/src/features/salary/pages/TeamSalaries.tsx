import { useAllSalary, useMarkPaid } from "../../../hooks/useSalary";
import { useSelectedCity } from "../../../context/CityContext";
import SalaryStatusBadge from "../components/SalaryStatusBadge";

const fmt = (n: number) => new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));

export default function TeamSalaries() {
  const { selectedCity } = useSelectedCity();
  const { data: records = [], isLoading } = useAllSalary(selectedCity.id);
  const markPaidMutation = useMarkPaid();

  if (isLoading) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="p-4">
        <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
          Немає нарахувань для цього міста
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {records.map((r) => (
        <div key={r.id} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-800">{r.employee?.name ?? "—"}</span>
            <SalaryStatusBadge status={r.status} />
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500">{r.event?.project ?? "—"} · {r.event?.date ? new Date(r.event.date).toLocaleDateString("uk-UA") : "—"}</span>
            <span className="font-bold text-blue-600">{fmt(r.amount)} грн</span>
          </div>
          {r.comment && <p className="text-xs text-slate-400 mb-2">{r.comment}</p>}
          {r.status === "PENDING" && (
            <button
              onClick={() => markPaidMutation.mutate(r.id)}
              disabled={markPaidMutation.isPending}
              className="w-full mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              Позначити виплаченим
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
