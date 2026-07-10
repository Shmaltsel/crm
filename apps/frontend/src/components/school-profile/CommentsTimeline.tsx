import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function CommentsTimeline({ schoolId }: { schoolId: string }) {
  const { user } = useAuth();
  const [filter, setFilter] = useState<CommentType | undefined>(undefined);
  const [newType, setNewType] = useState<CommentType>("NOTE");
  const [newText, setNewText] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSchoolComments(schoolId, filter, page);
  const createMutation = useCreateSchoolComment();
  const deleteMutation = useDeleteSchoolComment();

  const userRole = user?.role as UserRole | undefined;
  const canWrite =
    userRole === "MANAGER" || userRole === "SUPERADMIN" || userRole === "OWNER";
  const canDelete = userRole === "SUPERADMIN" || userRole === "OWNER";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    createMutation.mutate(
      { schoolId, type: newType, text: newText.trim() },
      { onSuccess: () => { setNewText(""); setPage(1); } },
    );
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("uk-UA", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-surface p-6 rounded-card shadow-card border border-border flex flex-col"
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
              className="text-sm border border-border-strong rounded-control px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand-300"
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
            className="w-full text-sm border border-border-strong rounded-control px-3 py-2 bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand-300 resize-none"
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
          <AnimatePresence initial={false}>
            {data.items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22, delay: i * 0.04 }}
                className="relative pl-8 pr-3 py-2 text-sm hover:bg-surface-muted rounded-card transition-colors group border border-transparent hover:border-border"
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {data && data.pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="text-xs font-medium px-3 py-2.5 rounded-control bg-surface-muted text-content-secondary hover:bg-neutral-200 disabled:opacity-40"
          >
            ←
          </button>
          <span className="text-xs text-content-muted self-center">
            {data.page} / {data.pageCount}
          </span>
          <button
            disabled={page >= data.pageCount}
            onClick={() => setPage((p) => p + 1)}
            className="text-xs font-medium px-3 py-2.5 rounded-control bg-surface-muted text-content-secondary hover:bg-neutral-200 disabled:opacity-40"
          >
            →
          </button>
        </div>
      )}
    </motion.div>
  );
}
