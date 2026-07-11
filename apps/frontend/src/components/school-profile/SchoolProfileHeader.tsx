import { memo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import PhoneLink from "../PhoneLink";
import { scaleVariants, DUR, EASE } from "../../lib/motion";
import type { SchoolProfileData } from "../../types";

interface Props {
  schoolData: SchoolProfileData;
  onEdit: () => void;
  onAddEvent: () => void;
  onActionMenu: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" },
});

export default memo(function SchoolProfileHeader({ schoolData, onEdit, onAddEvent, onActionMenu }: Props) {
  const { scrollY } = useScroll();
  const headerHeight = 180;
  const collapseStart = 0;
  const collapseEnd = 80;

  const padding = useTransform(scrollY, [collapseStart, collapseEnd], ["1.25rem", "0.625rem"]);
  const emojiOpacity = useTransform(scrollY, [collapseStart, collapseEnd], [1, 0]);
  const emojiScale = useTransform(scrollY, [collapseStart, collapseEnd], [1, 0.5]);
  const titleFontSize = useTransform(scrollY, [collapseStart, collapseEnd], ["1.5rem", "1rem"]);
  const titleFontWeight = useTransform(scrollY, [collapseStart, collapseEnd], [700, 600]);

  return (
    <motion.div
      className="sticky top-0 z-40 bg-gradient-subtle/80 backdrop-blur-md"
      style={{ willChange: "transform" }}
    >
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

          <motion.div
            style={{
              paddingTop: padding,
              paddingBottom: padding,
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
            }}
            className="md:p-7"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <motion.div
                style={{
                  opacity: emojiOpacity,
                  scale: emojiScale,
                }}
                variants={scaleVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: DUR.slow, delay: 0.1, ease: EASE.decelerate }}
                className="hidden md:flex w-14 h-14 md:w-16 md:h-16 rounded-card bg-brand-50 items-center justify-center text-3xl shrink-0"
              >
                🏫
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.h1
                  {...fadeUp(0.12)}
                  style={{
                    fontSize: titleFontSize,
                    fontWeight: titleFontWeight,
                  }}
                  className="text-content-primary leading-tight break-words whitespace-normal text-lg md:text-2xl"
                >
                  {schoolData.type} «{schoolData.name}»
                </motion.h1>
                <motion.div {...fadeUp(0.18)} className="flex flex-wrap items-center gap-3 mt-2">
                  {schoolData.city && (
                    <span className="hidden md:flex text-sm text-content-muted items-center gap-1">
                      📍 {schoolData.city}
                    </span>
                  )}
                </motion.div>

                {/* Контакт директора + кнопка ⋮ в одному рядку на мобільній */}
                <motion.div {...fadeUp(0.2)} className="flex items-center justify-between gap-3 mt-1.5 md:mt-2">
                  <div className="flex-1 min-w-0">
                    {schoolData.director && (
                      <p className="text-sm font-medium text-content-primary truncate">
                        {schoolData.director}
                      </p>
                    )}
                    {schoolData.phone && (
                      <p className="text-xs text-content-muted truncate mt-0.5">
                        <PhoneLink phone={schoolData.phone} />
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onActionMenu}
                    className="md:hidden w-11 h-11 shrink-0 bg-surface border border-border-strong text-content-secondary rounded-control flex items-center justify-center shadow-sm active:bg-surface-muted active:scale-95 transition-all"
                  >
                    ⋮
                  </button>
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});