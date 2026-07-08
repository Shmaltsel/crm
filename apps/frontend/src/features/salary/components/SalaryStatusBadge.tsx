import type { SalaryStatus } from "../../../types";

const config: Record<SalaryStatus, { bg: string; text: string; label: string }> = {
  PENDING: { bg: "bg-amber-100", text: "text-amber-700", label: "Очікує" },
  PAID: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Виплачено" },
  CANCELLED: { bg: "bg-slate-100", text: "text-slate-500", label: "Скасовано" },
};

export default function SalaryStatusBadge({ status }: { status: SalaryStatus }) {
  const c = config[status] ?? config.PENDING;
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}
