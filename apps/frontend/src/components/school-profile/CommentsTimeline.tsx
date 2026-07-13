import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  useSchoolComments,
  useCreateSchoolComment,
  useDeleteSchoolComment,
} from "../../hooks/useSchoolComments";
import type { CommentType, UserRole } from "../../types";

const COMMENT_TYPES: { key: CommentType; label: string; icon: string }[] = [
  { key: "NOTE", label: "Нотатка", icon: "📝" },
  { key: "CALL", label: "Дзвінок", icon: "📞" },
  { key: "RESCHEDULE", label: "Перенесення", icon: "📅" },
  { key: "CONFIRMATION", label: "Підтвердження", icon: "✅" },
  { key: "PROBLEM", label: "Проблема", icon: "⚠️" },
];

const TYPE_ICONS: Record<CommentType, string> = {
  NOTE: "📝",
  CALL: "📞",
  RESCHEDULE: "📅",
  CONFIRMATION: "✅",
  PROBLEM: "⚠️",
};

interface CommentsTimelineProps {
  schoolId: string;
  variant?: "card" | "chat";
}

export default function CommentsTimeline({ schoolId, variant = "card" }: CommentsTimelineProps) {
  const { user } = useAuth();
  const [filter, setFilter] = useState<CommentType | undefined>(undefined);
  const [newType, setNewType] = useState<CommentType>("NOTE");
  const [newText, setNewText] = useState("");
  const [page, setPage] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data, isLoading } = useSchoolComments(schoolId, filter, page);
  const createMutation = useCreateSchoolComment();
  const deleteMutation = useDeleteSchoolComment();

  const userRole = user?.role as UserRole | undefined;
  const canWrite =
    userRole === "MANAGER" || userRole === "SUPERADMIN" || userRole === "OWNER";
  const canDelete = userRole === "SUPERADMIN" || userRole === "OWNER";

  const isChat = variant === "chat";

  useEffect(() => {
    if (isChat && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isChat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    createMutation.mutate(
      { schoolId, type: newType, text: newText.trim() },
      {
        onSuccess: () => {
          setNewText("");
          setPage(1);
        },
      },
    );
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("uk-UA", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  if (isChat) {
    return (
      <div className="flex flex-col h-[420px] bg-surface rounded-card border border-border overflow-hidden fade-in-up"
      >
        <div className="p-4 border-b border-border bg-surface-muted flex-shrink-0">
          <h3 className="font-bold text-content-primary flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-subtle text-brand flex items-center justify-center">
              💬
            </span>
            Нотатки
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex-col-reverse">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse h-20 bg-surface-muted rounded-card" />
              ))}
            </div>
          ) : !data || data.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4 text-content-muted fade-in-up">
              <p className="text-sm mb-2">Ще немає записів.</p>
              <p className="text-xs">Додайте перший запис нижче</p>
            </div>
          ) : (
            <>
              {data.items.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex gap-3 max-w-[85%] self-start fade-in-up"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-subtle text-brand flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {item.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="bg-surface p-3 rounded-2xl border border-border shadow-sm">
                      <p className="text-xs text-content-muted mb-1 flex items-center gap-1">
                        <span>{TYPE_ICONS[item.type]}</span>
                        <span className="font-medium">{item.author.name}</span>
                        <span>({item.author.role})</span>
                        <span>·</span>
                        <span>{formatDate(item.createdAt)}</span>
                      </p>
                      <p className="text-content-secondary">{item.text}</p>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

        {canWrite && (
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-border bg-surface shrink-0 flex-shrink-0"
            style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
          >
            <div className="flex gap-2">
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as CommentType)}
                className="text-sm border border-border-strong rounded-control px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand-300 w-32 shrink-0"
              >
                {COMMENT_TYPES.map((ct) => (
                  <option key={ct.key} value={ct.key}>
                    {ct.icon} {ct.label}
                  </option>
                ))}
              </select>
              <textarea
                ref={textareaRef}
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Текст нотатки..."
                rows={1}
                className="flex-1 text-sm border border-border-strong rounded-control px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand-300 resize-none min-h-[44px]"
              />
              <button
                type="submit"
                disabled={!newText.trim() || createMutation.isPending}
                className="text-xs font-bold text-white bg-brand hover:bg-brand-hover disabled:bg-neutral-300 px-4 py-2.5 rounded-control transition-colors shadow-sm shrink-0"
              >
                {createMutation.isPending ? "..." : "Надіслати"}
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-card card-shadow hover:card-shadow-hover border border-border flex flex-col hover:-translate-y-0.5 transition-all duration-200"
    >
      <h3 className="font-bold text-content-primary mb-5 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-warning-subtle text-warning-600 flex items-center justify-center">
          🕐
        </span>
        Хронологія роботи
      </h3>

      {canWrite && (
        <form
          onSubmit={handleSubmit}
          className="mb-5 p-4 bg-surface-muted rounded-card border border-border space-y-3"
        >
          <div className="flex gap-2">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as CommentType)}
              className="text-base border border-border-strong rounded-control px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand-300"
            >
              {COMMENT_TYPES.map((ct) => (
                <option key={ct.key} value={ct.key}>
                  {ct.icon} {ct.label}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Текст коментаря..."
            rows={2}
            className="w-full text-base border border-border-strong rounded-control px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand-300 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newText.trim() || createMutation.isPending}
              className="text-xs font-bold text-white bg-brand hover:bg-brand-hover disabled:bg-neutral-300 px-4 py-2.5 rounded-control transition-colors shadow-sm"
            >
              {createMutation.isPending ? "..." : "Додати"}
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => { setFilter(undefined); setPage(1); }}
          className={`text-xs font-medium px-3 py-1.5 rounded-pill transition-colors ${
            !filter
              ? "bg-brand text-white shadow-sm"
              : "bg-surface-muted text-content-secondary hover:bg-neutral-200"
          }`}
        >
          Всі
        </button>
        {COMMENT_TYPES.map((ct) => (
          <button
            key={ct.key}
            onClick={() => { setFilter(ct.key); setPage(1); }}
            className={`text-xs font-medium px-3 py-1.5 rounded-pill transition-colors ${
              filter === ct.key
                ? "bg-brand text-white shadow-sm"
                : "bg-surface-muted text-content-secondary hover:bg-neutral-200"
            }`}
          >
            {ct.icon} {ct.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-16 bg-surface-muted rounded-card" />
          ))}
        </div>
      ) : !data || data.items.length === 0 ? (
        <p className="text-sm text-content-muted text-center py-6">
          Ще немає коментарів.
        </p>
      ) : (
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-border">
            {data.items.map((item, i) => (
              <div
                key={item.id}
                className="relative pl-8 pr-3 py-2 text-sm hover:bg-surface-muted rounded-card transition-colors group border border-transparent hover:border-border fade-in-left"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="absolute left-1.5 w-3 h-3 rounded-full top-3.5 bg-warning ring-4 ring-warning-subtle flex items-center justify-center text-[7px]">
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-content-primary flex items-center gap-1.5">
                    <span>{TYPE_ICONS[item.type]}</span>
                    <span>{item.author.name}</span>
                    <span className="text-2xs text-content-muted font-normal">
                      ({item.author.role})
                    </span>
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-content-muted font-medium">
                      {formatDate(item.createdAt)}
                    </span>
                    {canDelete && (
                      <button
                        onClick={() =>
                          deleteMutation.mutate({
                            schoolId,
                            commentId: item.id,
                          })
                        }
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-danger-600 hover:text-danger text-xs p-2.5"
                        title="Видалити"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-content-secondary mt-1.5 bg-surface p-3 rounded-card border border-border shadow-sm">
                  {item.text}
                </p>
              </div>
            ))}
        </div>
      )}

      {data && data.pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="text-xs font-medium px-3 py-2.5 rounded-control bg-surface-muted text-content-secondary hover:bg-neutral-200 disabled:opacity-40 active:scale-90 transition-transform duration-fast"
          >
            ←
          </button>
          <span className="text-xs text-content-muted self-center">
            {data.page} / {data.pageCount}
          </span>
          <button
            disabled={page >= data.pageCount}
            onClick={() => setPage((p) => p + 1)}
            className="text-xs font-medium px-3 py-2.5 rounded-control bg-surface-muted text-content-secondary hover:bg-neutral-200 disabled:opacity-40 active:scale-90 transition-transform duration-fast"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
