import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import { EmptyState } from "../components/ui/EmptyState";
import type { IssueReport } from "../types";

const STATUSES = ["Планується", "Виконується", "Виконано"];

const STATUS_STYLES: Record<string, string> = {
  Планується: "bg-amber-50 text-amber-700 border-amber-200",
  Виконується: "bg-blue-50 text-blue-700 border-blue-200",
  Виконано: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function getNextStatus(current: string) {
  const idx = STATUSES.indexOf(current);
  return STATUSES[(idx + 1) % STATUSES.length];
}

export default function IssueCarousel() {
  const { selectedCity } = useSelectedCity();
  const qc = useQueryClient();
  const [exitingIssueId, setExitingIssueId] = useState<string | null>(null);

  const { data: issues = [] } = useQuery({
    queryKey: ["issues", selectedCity?.id],
    queryFn: async () => {
      if (!selectedCity?.id) return [];
      const res = await api.get(`/issues?cityId=${selectedCity.id}`);
      return res.data.filter((i: IssueReport) => i.status !== "Виконано");
    },
    enabled: !!selectedCity?.id,
    refetchOnWindowFocus: true,
    staleTime: 30_000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      api.patch(`/issues/${data.id}/status`, { status: data.status }),
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: ["issues", selectedCity?.id] });
      const prev = qc.getQueryData(["issues", selectedCity?.id]);
      qc.setQueryData(["issues", selectedCity?.id], (old: IssueReport[] | undefined) =>
        Array.isArray(old)
          ? old
              .map((i) =>
                i.id === vars.id ? { ...i, status: vars.status } : i,
              )
              .filter((i) => i.status !== "Виконано")
          : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["issues", selectedCity?.id], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["issues", selectedCity?.id] });
    },
  });

  const handleStatusToggle = (issue: IssueReport) => {
    const nextStatus = getNextStatus(issue.status);

    if (nextStatus === "Виконано") {
      setExitingIssueId(issue.id);
      setTimeout(() => {
        updateStatusMutation.mutate({ id: issue.id, status: nextStatus });
        setExitingIssueId(null);
      }, 500);
    } else {
      updateStatusMutation.mutate({ id: issue.id, status: nextStatus });
    }
  };

  if (issues.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle}
        title="Проблем немає"
        description="Нові проблеми з'являться тут, щойно виникнуть"
      />
    );
  }

  return (
    <div className="mb-6 animate-[slideDown_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
        🚨 <span>Активні проблеми</span>
        <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
          {issues.length}
        </span>
      </h2>

      {}
      <div
        className="flex overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar swiper-no-swiping"
        style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" as const }}
      >
        {issues.map((issue) => {
          const isExiting = exitingIssueId === issue.id;

          return (
            <div
              key={issue.id}
              className={`transition-all duration-500 ease-in-out overflow-hidden transform origin-left ${
                isExiting
                  ? "w-0 min-w-0 mr-0 opacity-0 pointer-events-none"
                  : "w-[300px] min-w-[300px] mr-4 opacity-100 shrink-0"
              }`}
            >
              {/* Внутрішній контейнер має фіксовану ширину, щоб текст не ламався */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-500 p-5 flex flex-col gap-3 w-[300px]">
                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="font-bold text-slate-800 text-sm">
                    {issue.schoolName}
                  </p>
                  <p className="text-xs text-slate-500">{issue.eventName}</p>
                </div>

                <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed">
                  "{issue.message}"
                </p>

                <button
                  onClick={() => handleStatusToggle(issue)}
                  className={`text-xs font-bold px-3 py-2 rounded-lg border transition-colors text-left ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
                >
                  ● {issue.status} → натисни щоб змінити
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
