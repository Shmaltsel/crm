import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cardHoverVariants, DUR, useHoverCapable } from "../../lib/motion";
import { useUpdateSchool } from "../../hooks/useSchoolProfile";
import type { SchoolProfileData } from "../../types";

export default memo(function NotesCard({
  schoolData,
}: {
  schoolData: SchoolProfileData;
}) {
  const hoverCapable = useHoverCapable();
  const updateSchool = useUpdateSchool();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(schoolData.notes);

  const save = useCallback(() => {
    const trimmed = draft.trim();
    if (trimmed !== schoolData.notes) {
      updateSchool.mutate({ id: schoolData.id, notes: trimmed });
    }
    setIsEditing(false);
  }, [draft, schoolData.id, schoolData.notes, updateSchool]);

  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover={hoverCapable ? "hover" : undefined}
      className="bg-surface p-6 rounded-card card-shadow hover:card-shadow-hover border border-border"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-content-primary flex items-center gap-2">
          <span className="text-content-muted">📝</span> Нотатки
        </h3>
        {!isEditing && (
          <button
            onClick={() => {
              setDraft(schoolData.notes);
              setIsEditing(true);
            }}
            className="text-xs text-brand hover:text-brand/80 transition-colors"
          >
            Редагувати
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            placeholder="Введіть нотатки про заклад…"
            className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm text-content-primary placeholder:text-content-muted resize-y focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-xs rounded-lg border border-border text-content-muted hover:bg-surface-hover transition-colors"
            >
              Скасувати
            </button>
            <button
              onClick={save}
              disabled={updateSchool.isPending}
              className="px-3 py-1.5 text-xs rounded-lg bg-brand text-white hover:bg-brand/90 transition-colors disabled:opacity-50"
            >
              {updateSchool.isPending ? "Збереження…" : "Зберегти"}
            </button>
          </div>
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DUR.normal }}
          className="text-sm text-content-secondary whitespace-pre-wrap min-h-[1.25rem]"
        >
          {schoolData.notes || <span className="text-content-muted italic">Немає нотаток</span>}
        </motion.p>
      )}
    </motion.div>
  );
});
