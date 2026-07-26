import { useState } from "react";
import { Car, CheckCircle2, XCircle } from "lucide-react";
import {
  useMileageReportsAll,
  useApproveMileageReport,
  useRejectMileageReport,
} from "../../../hooks/useMileageReports";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Skeleton } from "../../../components/ui/Skeleton";
import { useToast } from "../../../components/ui/Toast";

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

export default function MileageReportsPanel() {
  const { data: reports = [], isLoading } = useMileageReportsAll();
  const approveMutation = useApproveMileageReport();
  const rejectMutation = useRejectMileageReport();
  const toast = useToast();
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const pending = reports.filter((r) => r.status === "PENDING");

  const handleApprove = (id: string) => {
    approveMutation.mutate(
      { id },
      {
        onError: (error: unknown) => {
          const msg =
            (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ?? "Помилка затвердження";
          toast(msg, "error");
        },
      },
    );
  };

  const handleReject = (id: string) => {
    if (!note.trim()) return;
    rejectMutation.mutate(
      { id, managerNote: note.trim() },
      {
        onError: (error: unknown) => {
          const msg =
            (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ?? "Помилка відхилення";
          toast(msg, "error");
        },
      },
    );
    setRejectingId(null);
    setNote("");
  };

  if (isLoading) {
    return (
      <div className="bg-surface rounded-card border border-border p-4 space-y-3">
        <Skeleton className="h-5 w-1/3 mb-2" />
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-card border border-border p-4">
      <div className="flex items-center gap-2 mb-3">
        <Car className="w-4 h-4 text-brand-600" />
        <h3 className="text-sm font-semibold text-content-primary">
          Заяви на кілометраж
        </h3>
        {pending.length > 0 && (
          <span className="ml-auto text-2xs px-2 py-0.5 rounded-pill bg-warning-50 text-warning-600 border border-warning-100 font-bold">
            {pending.length}
          </span>
        )}
      </div>

      {pending.length === 0 && (
        <EmptyState
          icon={Car}
          title="Немає заяв на кілометраж"
          description="Заявки від водіїв з'являться тут після подачі"
        />
      )}

      {pending.length > 0 && (
        <div className="space-y-2">
          {pending.map((r) => (
            <div
              key={r.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 bg-surface-muted rounded-xl"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-content-primary truncate">
                  {r.user?.name ?? "—"}
                </div>
                <div className="text-xs text-content-muted">
                  {formatDate(r.date)} · {fmt(r.km)} км
                </div>
                <div className="text-xs text-brand font-semibold">
                  {fmt(r.totalAmount)} грн
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleApprove(r.id)}
                  disabled={approveMutation.isPending}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-success text-white text-xs font-medium rounded-lg hover:bg-success-700 disabled:opacity-50 transition active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Затвердити
                </button>

                {rejectingId === r.id ? (
                  <div className="w-full sm:w-auto flex gap-1.5 items-center">
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={2}
                      placeholder="Причина відхилення"
                      className="flex-1 sm:w-48 px-2 py-1 border border-border rounded-lg text-xs focus:ring-2 focus:ring-danger outline-none resize-none"
                    />
                    <button
                      onClick={() => handleReject(r.id)}
                      disabled={!note.trim() || rejectMutation.isPending}
                      className="px-2.5 py-1.5 bg-danger text-white text-xs font-medium rounded-lg hover:bg-danger-700 disabled:opacity-50 transition active:scale-95 shrink-0"
                    >
                      Відхилити
                    </button>
                    <button
                      onClick={() => { setRejectingId(null); setNote(""); }}
                      className="px-2 py-1.5 text-content-muted hover:text-content-secondary text-xs transition shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setRejectingId(r.id); setNote(""); }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-danger-subtle text-danger-600 border border-danger-100 text-xs font-medium rounded-lg hover:bg-danger-100 transition active:scale-95"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Відхилити
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
