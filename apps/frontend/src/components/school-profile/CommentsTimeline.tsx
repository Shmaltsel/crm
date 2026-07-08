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
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col"
    >
      <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
          🕐
        </span>
        Хронологія роботи
      </h3>

      {/* Форма додавання */}
      {canWrite && (
        <form
          onSubmit={handleSubmit}
          className="mb-5 p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-3"
        >
          <div className="flex gap-2">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as CommentType)}
              className="text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
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
            className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newText.trim() || createMutation.isPending}
              className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              {createMutation.isPending ? "..." : "Додати"}
            </button>
          </div>
        </form>
      )}

      {/* Фільтри */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => { setFilter(undefined); setPage(1); }}
          className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
            !filter
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Всі
        </button>
        {COMMENT_TYPES.map((ct) => (
          <button
            key={ct.key}
            onClick={() => { setFilter(ct.key); setPage(1); }}
            className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
              filter === ct.key
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {ct.icon} {ct.label}
          </button>
        ))}
      </div>

      {/* Список */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-16 bg-slate-100 rounded-xl" />
          ))}
        </div>
      ) : !data || data.items.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">
          Ще немає коментарів.
        </p>
      ) : (
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
          <AnimatePresence initial={false}>
            {data.items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22, delay: i * 0.04 }}
                className="relative pl-8 pr-3 py-2 text-sm hover:bg-slate-50 rounded-xl transition-colors group border border-transparent hover:border-slate-100"
              >
                <div className="absolute left-1.5 w-3 h-3 rounded-full top-3.5 bg-amber-500 ring-4 ring-amber-50 flex items-center justify-center text-[7px]">
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <span>{TYPE_ICONS[item.type]}</span>
                    <span>{item.author.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({item.author.role})
                    </span>
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400 font-medium">
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
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-rose-400 hover:text-rose-600 text-xs"
                        title="Видалити"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 mt-1.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Пагінація */}
      {data && data.pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-40"
          >
            ←
          </button>
          <span className="text-xs text-slate-500 self-center">
            {data.page} / {data.pageCount}
          </span>
          <button
            disabled={page >= data.pageCount}
            onClick={() => setPage((p) => p + 1)}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-40"
          >
            →
          </button>
        </div>
      )}
    </motion.div>
  );
}
