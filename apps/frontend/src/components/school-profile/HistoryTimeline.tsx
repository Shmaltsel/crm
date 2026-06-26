import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface HistoryTimelineProps {
  currentEvent: any;
  onHistoryClick: (item: any) => void;
  onAddCommentClick: () => void;
}

export default memo(function HistoryTimeline({ currentEvent, onHistoryClick, onAddCommentClick }: HistoryTimelineProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col"
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-800">Історія взаємодії</h3>
        <button 
          onClick={onAddCommentClick}
          className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
        >
          <span>+</span> Коментар
        </button>
      </div>
      
      {!currentEvent || !currentEvent.history || currentEvent.history.length === 0 ? (
        <p className="text-sm text-slate-400">Історія порожня.</p>
      ) : (
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
          <AnimatePresence initial={false}>
          {currentEvent.history.map((item: any, i: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.22, delay: i * 0.04 }}
              onClick={() => onHistoryClick(item)}
              className="relative pl-8 pr-3 py-2 text-sm hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group border border-transparent hover:border-slate-100"
            >
              <div className={`absolute left-1.5 w-3 h-3 rounded-full top-3.5 ${i === 0 ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-slate-300'}`}></div>
              <p className="font-semibold text-slate-800">{item.action}</p>
              {item.comment && (
                <p className="text-slate-600 mt-1.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-sm italic">
                  "{item.comment}"
                </p>
              )}
              <p className="text-[11px] text-slate-400 mt-2 flex justify-between items-center font-medium">
                <span>
                  👤 {item.userName} <span className="mx-1">•</span> 
                  {new Date(item.createdAt).toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">✏️ Редагувати</span>
              </p>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
});
