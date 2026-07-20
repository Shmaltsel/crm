import { memo, useMemo } from "react";
import type { EventHistory, SchoolComment } from "../../types";
import { useAuth } from "../../context/AuthContext";

interface HistoryTimelineProps {
  currentEvent: { history?: EventHistory[] } | null;
  schoolComments: SchoolComment[];
  onHistoryClick: (item: EventHistory) => void;
  onAddCommentClick: () => void;
}

interface MergedItem {
  id: string;
  action: string;
  comment?: string;
  userName: string;
  role: string;
  createdAt: string;
  isPending: boolean;
}

export default memo(function HistoryTimeline({
  currentEvent,
  schoolComments,
  onHistoryClick,
  onAddCommentClick,
}: HistoryTimelineProps) {
  const { user } = useAuth();
  const isFieldStaff = user?.role === "HOST" || user?.role === "DRIVER";

  const items = useMemo(() => {
    const historyItems: MergedItem[] = (currentEvent?.history ?? []).map(
      (h) => ({ ...h, isPending: false }),
    );
    const pendingItems: MergedItem[] = isFieldStaff ? [] : schoolComments
      .filter((sc) => sc.type !== "NOTE")
      .map((sc) => ({
      id: sc.id,
      action: "Коментар до події",
      comment: sc.text,
      userName: sc.author.name,
      role: sc.author.role,
      createdAt: sc.createdAt,
      isPending: true,
    }));

    return [...historyItems, ...pendingItems].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [currentEvent, schoolComments, isFieldStaff]);

  return (
    <div className="bg-surface p-6 rounded-card card-shadow hover:card-shadow-hover border border-border flex flex-col hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-content-primary">Історія взаємодії</h3>
        {!isFieldStaff && (
          <button
            onClick={onAddCommentClick}
            className="text-xs font-bold text-brand bg-brand-50 hover:bg-brand-100 px-3 py-2.5 rounded-control transition-colors flex items-center gap-1 shadow-sm"
          >
            <span>+</span> Коментар
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-content-muted">Історія порожня.</p>
      ) : (
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-border">
          {items.map((item, i) => (
            <div
              key={item.id}
              onClick={() => !item.isPending && onHistoryClick(item)}
              className={`relative pl-8 pr-3 py-2 text-sm hover:bg-surface-muted rounded-card border border-transparent hover:border-border fade-in-left transition-colors group ${item.isPending ? "border-dashed border-amber-300 bg-amber-50/30" : "cursor-pointer"}`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div
                className={`absolute left-1.5 w-3 h-3 rounded-full top-3.5 ${
                  item.isPending
                    ? "bg-amber-400 ring-4 ring-amber-50"
                    : i === 0
                      ? "bg-brand ring-4 ring-brand-50"
                      : "bg-neutral-300"
                }`}
              ></div>
              <p className="font-semibold text-content-primary">
                {item.action}
                {item.isPending && (
                  <span className="ml-2 text-xs text-amber-600 font-medium">
                    Очікує події
                  </span>
                )}
              </p>
              {item.comment && (
                <p className="text-content-secondary mt-1.5 bg-surface p-3 rounded-card border border-border shadow-sm text-sm italic">
                  &quot;{item.comment}&quot;
                </p>
              )}
              <p className="text-xs text-content-muted mt-2 flex justify-between items-center font-medium">
                <span>
                  👤 {item.userName} <span className="mx-1">•</span>
                  {new Date(item.createdAt).toLocaleString("uk-UA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {!item.isPending && (
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand">
                    ✏️ Редагувати
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
