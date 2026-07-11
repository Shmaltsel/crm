import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cardHoverVariants, DUR, useHoverCapable, SPRING } from "../../lib/motion";
import type { Event } from "../../types";
import SchoolActionSheet from "./modals/SchoolActionSheet";

interface PipelineProps {
  currentStageIndex: number;
  currentEvent: Event | null;
  onPipelineClick: (stepId: number) => void;
  stages: Array<{ id: number; key: string; name: string }>;
}

export default memo(function Pipeline({ currentStageIndex, currentEvent, onPipelineClick, stages }: PipelineProps) {
  const hoverCapable = useHoverCapable();
  const [sheetOpen, setSheetOpen] = useState(false);

  const progress = currentStageIndex / (stages.length - 1);

  return (
    <>
      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover={hoverCapable ? "hover" : undefined}
        className="bg-surface p-4 md:p-6 rounded-card card-shadow hover:card-shadow-hover border border-border w-full md:hidden"
      >
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-content-primary">
              {currentStageIndex + 1}/{stages.length} · {stages[currentStageIndex]?.name || "—"}
            </span>
            <button
              onClick={() => setSheetOpen(true)}
              className="text-xs text-brand font-medium"
            >
              Усі етапи →
            </button>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ ...SPRING.gentle, delay: 0.1 }}
              className="h-full bg-brand rounded-full"
            />
          </div>
        </div>
        <button
          onClick={() => {
            const nextStage = stages[currentStageIndex + 1];
            if (nextStage && currentEvent) onPipelineClick(nextStage.id);
          }}
          disabled={!currentEvent || currentStageIndex >= stages.length - 1}
          className="w-full py-2.5 bg-brand text-white rounded-control font-medium text-sm hover:bg-brand-hover disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
        >
          Наступний етап →
        </button>
      </motion.div>

      <AnimatePresence>
        {sheetOpen && (
          <SchoolActionSheet
            isOpen={sheetOpen}
            onClose={() => setSheetOpen(false)}
            onEdit={() => {}}
            onAddEvent={() => {}}
            stages={stages}
            currentStageIndex={currentStageIndex}
            onStageSelect={(stageId: number) => {
              if (currentEvent) onPipelineClick(stageId);
              setSheetOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={cardHoverVariants}
        initial="rest"
        whileHover={hoverCapable ? "hover" : undefined}
        className="bg-surface p-4 md:p-6 rounded-card card-shadow hover:card-shadow-hover border border-border w-full hidden md:block"
      >
        <h3 className="font-bold text-content-primary mb-4 md:hidden">Етап події</h3>
        <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          <div className="flex items-start min-w-[600px] justify-between relative">
            <div className="absolute top-4 left-0 w-full h-[2px] bg-border -z-10"></div>
            {stages.map((step, index) => {
              const isCompleted = index < currentStageIndex;
              const isActive = index === currentStageIndex;
              const isNext = index === currentStageIndex + 1;
              const isClickable = !!currentEvent && isNext;

              return (
                <div key={step.id} className="flex flex-col items-center flex-1 z-10 px-1">
                  <motion.button
                    onClick={() => isClickable && onPipelineClick(step.id)}
                    whileHover={hoverCapable && isClickable ? { scale: 1.15 } : {}}
                    whileTap={isClickable ? { scale: 0.95 } : {}}
                    transition={{ duration: DUR.fast }}
                    className={`w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full text-xs font-bold border-2 mb-2 transition-colors
                      ${isCompleted
                        ? 'border-brand text-brand bg-surface'
                        : isActive
                        ? 'border-brand bg-brand text-white shadow-md'
                        : isNext
                        ? 'border-brand-300 bg-surface text-brand-300 cursor-pointer'
                        : 'border-border-strong text-content-muted bg-surface cursor-not-allowed opacity-50'
                      }`}
                  >
                    {isCompleted ? '✓' : step.id}
                  </motion.button>
                  <span className={`text-2xs md:text-xs leading-tight font-medium text-center break-words max-w-[70px]
                    ${isActive ? 'text-brand font-bold' : isNext ? 'text-brand-300' : 'text-content-muted'}`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
});
