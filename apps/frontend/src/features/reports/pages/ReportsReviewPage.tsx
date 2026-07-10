import { useState } from "react";
import { useSubmittedReports, useApproveReport, useRequestRevision, useRejectReport } from "../../../hooks/useReports";
import ReportStatusBadge from "../components/ReportStatusBadge";
import type { ExpenseItem, SalaryRecord } from "../../../types";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("uk-UA", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

function fmt(n: number) {
  return new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
}

export default function ReportsReviewPage() {
  const { data: reports = [], isLoading } = useSubmittedReports();
  const approveMutation = useApproveReport();
  const revisionMutation = useRequestRevision();
  const rejectMutation = useRejectReport();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [actionTarget, setActionTarget] = useState<{ id: string; action: "revision" | "reject" } | null>(null);

  const handleApprove = (id: string) => {
    approveMutation.mutate(id);
  };

  const handleRequestRevision = (id: string) => {
    if (!comment.trim()) return;
    revisionMutation.mutate({ id, comment: comment.trim() });
    setComment("");
    setActionTarget(null);
  };

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
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Перевірка звітів</h1>
        <p className="text-sm text-slate-500 mt-1">
          {reports.length > 0
            ? `${reports.length} звітів очікують перевірки`
            : "Немає звітів, що очікують перевірки"}
        </p>
      </div>

      {isLoading && (
        <div className="text-center text-slate-400 py-16">Завантаження...</div>
      )}

      {!isLoading && reports.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-slate-400">
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
            const totalExpenses = (r.expenseItems ?? []).reduce((s: number, e: ExpenseItem) => s + e.amount, 0);

            return (
              <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <button onClick={() => toggleExpand(r.id)} className="w-full text-left p-4 sm:p-5 hover:bg-slate-50 transition flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-800">{school.name ?? "—"}</span>
                      <span className="text-xs text-slate-400">· {city.name ?? "—"}</span>
                      <span className="text-xs text-slate-400">· {school.type ?? ""}</span>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      {ev.project ?? ""} · {ev.date ? formatDate(ev.date) : ""}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span>Хост: {crew?.host?.name ?? "—"}</span>
                      <span>Водій: {crew?.driver?.name ?? "—"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ReportStatusBadge status={r.status} />
                    <span className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}>▾</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-slate-100 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Результати</h4>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between"><span className="text-slate-500">Дітей:</span><span className="font-medium">{r.childrenCount}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Класів:</span><span className="font-medium">{r.classesCount}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Пільговиків:</span><span className="font-medium">{r.privilegedCount}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Сеансів:</span><span className="font-medium">{r.showingsCount}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Рейтинг:</span><span className="font-bold text-amber-600">{r.rating}/10</span></div>
                        </div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Фінанси</h4>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between"><span className="text-slate-500">Виручка:</span><span className="font-bold">{fmt(r.totalSum)} грн</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">Закладу:</span><span className="text-rose-600">−{fmt(r.schoolSum)} грн</span></div>
                          {totalExpenses > 0 && (
                            <div className="flex justify-between"><span className="text-slate-500">Витрати:</span><span className="text-rose-600">−{fmt(totalExpenses)} грн</span></div>
                          )}
                          <div className="flex justify-between pt-1 border-t border-slate-200"><span className="font-semibold text-slate-700">Чистий прибуток:</span><span className="font-bold text-emerald-600">{fmt(r.remainderSum)} грн</span></div>
                        </div>
                        {(r.salaryRecords ?? []).length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Зарплати</h5>
                            {r.salaryRecords.map((s: SalaryRecord, i: number) => (
                              <div key={i} className="flex justify-between text-xs"><span>{s.employee?.name ?? "—"}</span><span className="text-blue-600">{fmt(s.amount)} грн</span></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {r.comment && (
                      <div className="mb-4 p-3 bg-slate-50 rounded-xl text-sm text-slate-600 italic">
                        {r.comment}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => handleApprove(r.id)} disabled={approveMutation.isPending}
                        className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 transition">
                        Затвердити
                      </button>

                      {actionTarget?.id === r.id && actionTarget.action === "revision" ? (
                        <div className="w-full flex gap-2 items-start mt-2">
                          <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                            rows={2} placeholder="Обов'язково вкажіть, що потрібно виправити"
                            className="flex-1 p-2 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
                          <button onClick={() => handleRequestRevision(r.id)} disabled={!comment.trim() || revisionMutation.isPending}
                            className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 text-sm shrink-0">
                            Відправити
                          </button>
                          <button onClick={() => { setActionTarget(null); setComment(""); }}
                            className="px-3 py-2 text-slate-500 hover:text-slate-700 text-sm">✕</button>
                        </div>
                      ) : (
                        <button onClick={() => { setActionTarget({ id: r.id, action: "revision" }); setComment(""); }}
                          className="px-5 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl font-medium hover:bg-amber-100 transition">
                          На доопрацювання
                        </button>
                      )}

                      {actionTarget?.id === r.id && actionTarget.action === "reject" ? (
                        <div className="w-full flex gap-2 items-start mt-2">
                          <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                            rows={2} placeholder="Обов'язково вкажіть причину відхилення"
                            className="flex-1 p-2 border border-slate-200 rounded-lg text-base focus:ring-2 focus:ring-red-500 outline-none resize-none" />
                          <button onClick={() => handleReject(r.id)} disabled={!comment.trim() || rejectMutation.isPending}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 text-sm shrink-0">
                            Відхилити
                          </button>
                          <button onClick={() => { setActionTarget(null); setComment(""); }}
                            className="px-3 py-2 text-slate-500 hover:text-slate-700 text-sm">✕</button>
                        </div>
                      ) : (
                        <button onClick={() => { setActionTarget({ id: r.id, action: "reject" }); setComment(""); }}
                          className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl font-medium hover:bg-red-100 transition">
                          Відхилити
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
