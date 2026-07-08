import type { ReportStatus } from "../../../types";

const LABELS: Record<ReportStatus, string> = {
  DRAFT: "Чернетка",
  SUBMITTED: "На перевірці",
  NEEDS_REVISION: "На доопрацюванні",
  APPROVED: "Затверджено",
  REJECTED: "Відхилено",
  CLOSED: "Закрито",
};

const COLORS: Record<ReportStatus, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SUBMITTED: "bg-amber-50 text-amber-700",
  NEEDS_REVISION: "bg-rose-50 text-rose-600",
  APPROVED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-600",
  CLOSED: "bg-slate-200 text-slate-500",
};

export default function ReportStatusBadge({
  status,
  className = "",
}: {
  status: ReportStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${COLORS[status] ?? "bg-slate-100 text-slate-600"} ${className}`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
