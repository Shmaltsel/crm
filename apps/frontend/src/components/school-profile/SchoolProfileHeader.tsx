import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PhoneLink from "../PhoneLink";
import { scaleVariants, DUR, EASE } from "../../lib/motion";
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
      <motion.div {...fadeUp(0)} className="text-xs md:text-sm text-content-muted mb-5 truncate">
        <Link to="/schools" className="hover:text-brand transition-colors">
          Школи / Садочки
        </Link>
        <span className="mx-2">›</span>
        <span className="text-content-primary font-medium">
          {schoolData.type} "{schoolData.name}"
        </span>
      </motion.div>

      <motion.div
        {...fadeUp(0.05)}
        className="relative bg-surface rounded-card shadow-card border border-border overflow-hidden mb-2"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-brand to-brand-700" />

        <div className="p-5 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <motion.div
              variants={scaleVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: DUR.slow, delay: 0.1, ease: EASE.decelerate }}
              className="w-14 h-14 md:w-16 md:h-16 rounded-card bg-brand-50 flex items-center justify-center text-3xl shrink-0"
            >
              🏫
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.h1
                {...fadeUp(0.12)}
                className="text-2xl md:text-3xl font-bold text-content-primary leading-tight"
              >
                {schoolData.type} «{schoolData.name}»
              </motion.h1>
              <motion.div {...fadeUp(0.18)} className="flex flex-wrap items-center gap-3 mt-2">
                {schoolData.city && (
                  <span className="text-sm text-content-muted flex items-center gap-1">
                    📍 {schoolData.city}
                  </span>
                )}
                {schoolData.director && (
                  <span className="text-sm text-content-muted flex items-center gap-1">
                    👤 {schoolData.director}
                  </span>
                )}
                {schoolData.phone && (
                  <span className="text-sm text-content-muted">
                    <PhoneLink phone={schoolData.phone} />
                  </span>
                )}
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.2)} className="hidden md:flex gap-2 shrink-0">
              <button
                onClick={onAddEvent}
                className="flex flex-col items-center gap-1 px-5 py-3 bg-brand text-white rounded-control hover:bg-brand-hover active:scale-95 transition-all shadow-sm text-xs font-semibold"
              >
                <span className="text-lg leading-none">＋</span>
                Подія
              </button>
              <button
                onClick={onEdit}
                className="flex flex-col items-center gap-1 px-5 py-3 bg-surface border border-border-strong text-content-secondary rounded-control hover:bg-surface-muted hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all text-xs font-semibold"
              >
                <span className="text-lg leading-none">✏️</span>
                Редагувати
              </button>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="md:hidden flex gap-2">
              <button
                onClick={onEdit}
                className="w-11 h-11 bg-surface border border-border-strong text-content-secondary rounded-control flex items-center justify-center shadow-sm active:bg-surface-muted active:scale-95 transition-all"
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