import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PhoneLink from "../PhoneLink";
import type { SchoolProfileData } from "../../types";

interface Props {
  schoolData: SchoolProfileData;
  onEdit: () => void;
  onAddEvent: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" },
});

export default memo(function SchoolProfileHeader({ schoolData, onEdit, onAddEvent }: Props) {
  return (
    <div className="mb-6">
      {/* Хлібні крихти */}
      <motion.div {...fadeUp(0)} className="text-xs md:text-sm text-slate-500 mb-5 truncate">
        <Link to="/schools" className="hover:text-blue-600 transition-colors">
          Школи / Садочки
        </Link>
        <span className="mx-2">›</span>
        <span className="text-slate-800 font-medium">
          {schoolData.type} "{schoolData.name}"
        </span>
      </motion.div>

      {/* Hero Card */}
      <motion.div
        {...fadeUp(0.05)}
        className="relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-2"
      >
        {/* Градієнтна смужка зверху */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        <div className="p-5 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center gap-5">

            {/* Іконка */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl shrink-0"
            >
              🏫
            </motion.div>

            {/* Назва + місто */}
            <div className="flex-1 min-w-0">
              <motion.h1
                {...fadeUp(0.12)}
                className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight"
              >
                {schoolData.type} «{schoolData.name}»
              </motion.h1>
              <motion.div {...fadeUp(0.18)} className="flex flex-wrap items-center gap-3 mt-2">
                {schoolData.city && (
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    📍 {schoolData.city}
                  </span>
                )}
                {schoolData.director && (
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    👤 {schoolData.director}
                  </span>
                )}
                {schoolData.phone && (
                  <span className="text-sm text-slate-500">
                    <PhoneLink phone={schoolData.phone} />
                  </span>
                )}
              </motion.div>
            </div>

            {/* Quick Actions — десктоп */}
            <motion.div {...fadeUp(0.2)} className="hidden md:flex gap-2 shrink-0">
              <button
                onClick={onAddEvent}
                className="flex flex-col items-center gap-1 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm text-xs font-semibold"
              >
                <span className="text-lg leading-none">＋</span>
                Подія
              </button>
              <button
                onClick={onEdit}
                className="flex flex-col items-center gap-1 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all text-xs font-semibold"
              >
                <span className="text-lg leading-none">✏️</span>
                Редагувати
              </button>
            </motion.div>

            {/* Quick Actions — мобіл */}
            <motion.div {...fadeUp(0.2)} className="md:hidden flex gap-2">
              <button
                onClick={onEdit}
                className="w-10 h-10 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center shadow-sm active:bg-slate-50 active:scale-95 transition-all"
              >
                ✏️
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});