import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  schools: any[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: any[];
}

// 1. Експортуємо SchoolCard, щоб уникнути помилок при імпорті в інших файлах
export const SchoolCard = React.memo(({ school, onDelete, stages }: any) => {
  const navigate = useNavigate();
  const latestEvent = school.events?.[0];
  const stage = latestEvent
    ? stages.find((s: any) => s.key === latestEvent.status)
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/schools/${school.id}`)}
      className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-200 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
          {school.name}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e, school.id, school.name);
          }}
          className="text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all p-2 rounded-lg"
        >
          🗑
        </button>
      </div>
      <div className="flex items-center justify-between gap-2 mt-2">
        {school.phone ? (
          <a
            href={`tel:${school.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-blue-600 font-medium truncate"
          >
            📞 {school.director || school.phone}
          </a>
        ) : (
          <span className="text-xs text-slate-500 truncate">
            👤 {school.director || "Контакт не вказано"}
          </span>
        )}
        {stage && (
          <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
            {stage.name}
          </span>
        )}
      </div>
    </motion.div>
  );
});

SchoolCard.displayName = "SchoolCard";

// 2. Головний компонент залишається default export
export default function SchoolMobileList({
  schools,
  searchQuery,
  onDelete,
  stages,
}: Props) {
  return (
    <motion.div
      className="md:hidden flex-1 overflow-y-auto flex flex-col gap-3 pb-24 px-1 custom-scrollbar"
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {schools.map((school, index) => (
          <motion.div
            key={school.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.02, duration: 0.2 }}
          >
            <SchoolCard school={school} onDelete={onDelete} stages={stages} />
          </motion.div>
        ))}
      </AnimatePresence>

      {schools.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10 text-slate-400"
        >
          <p>
            {searchQuery
              ? `Нічого не знайдено за «${searchQuery}»`
              : "Шкіл ще немає"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
