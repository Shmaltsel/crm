import { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown, Star, Users } from "lucide-react";
import {
  useSubmittedReports,
  useApproveReport,
  useRejectReport,
} from "../../../hooks/useReports";
import ReportStatusBadge from "../components/ReportStatusBadge";
import PhoneLink from "../../../components/PhoneLink";
import AddressLink from "../../../components/AddressLink";
import type { ExpenseItem, SalaryRecord } from "../../../types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function fmt(n: unknown) {
  return new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));
}

export default function ReportsReviewPage() {
  const { data: reports = [], isLoading } = useSubmittedReports();
  const approveMutation = useApproveReport();
  const rejectMutation = useRejectReport();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [actionTarget, setActionTarget] = useState<{ id: string; action: "reject" } | null>(null);

  const handleApprove = (id: string) => approveMutation.mutate(id);

  const handleReject = (id: string) => {
    if (!comment.trim()) return;
    rejectMutation.mutate({ id, comment: comment.trim() });
    setComment("");
    setActionTarget(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setActionTarget(null);
    setComment("");
  };

  return (
    <div className="p-4 md:p-8 bg-surface-subtle min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-content-primary">Перевірка звітів</h1>
        <p className="text-sm text-content-muted mt-1">
          {reports.length > 0
            ? `${reports.length} ${reports.length === 1 ? "звіт очікує" : "звітів очікують"} перевірки`
            : "Немає звітів, що очікують перевірки"}
        </p>
      </div>

      {isLoading && (
        <div className="text-center text-content-muted py-16">Завантаження...</div>
      )}

      {!isLoading && reports.length === 0 && (
        <div className="bg-surface border border-border rounded-card p-10 text-center text-content-muted">
          <span className="text-3xl block mb-2">✅</span>
          Усі звіти перевірено
        </div>
      )}

      {!isLoading && reports.length > 0 && (
        <div className="space-y-4">
          {reports.map((r) => {
            const ev = (r as Record<string, unknown>).event as Record<string, unknown> | undefined;
            const school = (ev?.school ?? {}) as Record<string, unknown>;
            const city = (ev?.city ?? {}) as Record<string, unknown>;
            const crew = (ev?.crew ?? {}) as Record<string, unknown>;
            const isExpanded = expandedId === r.id;
            const totalExpenses = (r.expenseItems ?? []).reduce(
              (s: number, e: ExpenseItem) => s + Number(e.amount) || 0,
              0,
            );

            const contactPerson =
              (ev?.contactPerson as string) || (school.director as string) || null;
            const contactPhone =
              (ev?.contactPhone as string) || (school.phone as string) || null;
            const address = ev?.address as string | undefined;

            return (
              <div
                key={r.id}
                className="bg-surface rounded-card border border-border shadow-card overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(r.id)}
                  className="w-full text-left p-4 sm:p-5 hover:bg-surface-muted transition flex items-start justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-content-primary text-base">
                        {(school.name as string) ?? "—"}
                      </span>
                      <span className="text-2xs px-2 py-0.5 rounded-pill bg-brand-50 text-brand-700 border border-brand-100 font-medium">
                        {(school.type as string) ?? ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-content-muted flex-wrap">
                      <span>{(city.name as string) ?? "—"}</span>
                      <span>·</span>
                      <span>{(ev?.project as string) ?? ""}</span>
                      <span>·</span>
                      <span>{ev?.date ? formatDate(ev.date as string) : ""}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-content-muted flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {(crew as any)?.host?.name ?? "—"} / {(crew as any)?.driver?.name ?? "—"}
                      </span>
                      {contactPerson && (
                        <span className="text-content-secondary">👤 {contactPerson}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <ReportStatusBadge status={r.status} />
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {r.rating}/10
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-content-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-border pt-4">
                    {(contactPerson || address) && (
                      <div className="bg-brand-50/60 border border-brand-100 rounded-xl p-3 mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 text-sm">
                        {contactPerson && (
                          <span className="font-medium text-content-primary shrink-0">
                            👤 {contactPerson}
                          </span>
                        )}
                        {contactPhone && <PhoneLink phone={contactPhone} />}
                        {address && <AddressLink address={address} />}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="bg-surface-muted rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-content-muted uppercase tracking-wide mb-2">
                          Результати
                        </h4>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between">
                            <span className="text-content-muted">Дітей:</span>
                            <span className="font-medium">{r.childrenCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-content-muted">Класів:</span>
                            <span className="font-medium">{r.classesCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-content-muted">Пільговиків:</span>
                            <span className="font-medium">{r.privilegedCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-content-muted">Сеансів:</span>
                            <span className="font-medium">{r.showingsCount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-surface-muted rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-content-muted uppercase tracking-wide mb-2">
                          Фінанси
                        </h4>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between">
                            <span className="text-content-muted">Виручка:</span>
                            <span className="font-bold">{fmt(r.totalSum)} грн</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-content-muted">Закладу:</span>
                            <span className="text-danger-600">−{fmt(r.schoolSum)} грн</span>
                          </div>
                          {totalExpenses > 0 && (
                            <div className="flex justify-between">
                              <span className="text-content-muted">Витрати:</span>
                              <span className="text-danger-600">−{fmt(totalExpenses)} грн</span>
                            </div>
                          )}
                          <div className="flex justify-between pt-1 border-t border-border">
                            <span className="font-semibold text-content-primary">
                              Чистий прибуток:
                            </span>
                            <span className="font-bold text-success-600">
                              {fmt(r.remainderSum)} грн
                            </span>
                          </div>
                        </div>
                        {(r.salaryRecords ?? []).length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <h5 className="text-2xs font-semibold text-content-muted uppercase tracking-wide mb-1.5">
                              Зарплати
                            </h5>
                            {r.salaryRecords.map((s: SalaryRecord, i: number) => (
                              <div key={i} className="flex justify-between text-xs">
                                <span>{s.employee?.name ?? "—"}</span>
                                <span className="text-brand font-medium">{fmt(s.amount)} грн</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {r.comment && (
                      <div className="mb-4 p-3 bg-surface-muted rounded-xl text-sm text-content-secondary italic">
                        {r.comment}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleApprove(r.id)}
                        disabled={approveMutation.isPending}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-success text-white rounded-xl font-medium hover:bg-success-700 disabled:opacity-50 transition"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Затвердити
                      </button>

                      {actionTarget?.id === r.id && actionTarget.action === "reject" ? (
                        <div className="w-full flex gap-2 items-start mt-2">
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={2}
                            placeholder="Обов'язково вкажіть причину відхилення"
                            className="flex-1 p-2 border border-border rounded-lg text-base focus:ring-2 focus:ring-danger outline-none resize-none"
                          />
                          <button
                            onClick={() => handleReject(r.id)}
                            disabled={!comment.trim() || rejectMutation.isPending}
                            className="px-4 py-2 bg-danger text-white rounded-lg font-medium hover:bg-danger-700 disabled:opacity-50 text-sm shrink-0 active:scale-[0.97] transition-transform duration-fast"
                          >
                            Відхилити
                          </button>
                          <button
                            onClick={() => { setActionTarget(null); setComment(""); }}
                            className="px-3 py-2 text-content-muted hover:text-content-secondary text-sm active:scale-90 transition-transform duration-fast"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setActionTarget({ id: r.id, action: "reject" }); setComment(""); }}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-danger-subtle text-danger-600 border border-danger-100 rounded-xl font-medium hover:bg-danger-100 transition"
                        >
                          <XCircle className="w-4 h-4" /> Відхилити
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
