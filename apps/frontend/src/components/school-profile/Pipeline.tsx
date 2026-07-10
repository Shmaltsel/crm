import { memo } from "react";
import { motion } from "framer-motion";
import type { Event } from "../../types";
interface PipelineProps {
  currentStageIndex: number;
  currentEvent: Event | null;
  onPipelineClick: (stepId: number) => void;
  stages: Array<{ id: number; key: string; name: string }>;
}

export default memo(function Pipeline({ currentStageIndex, currentEvent, onPipelineClick, stages }: PipelineProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-surface p-4 md:p-6 rounded-card shadow-card border border-border w-full"
    >
      <h3 className="font-bold text-content-primary mb-4 md:hidden">Етап події</h3>
      <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
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
                  whileHover={isClickable ? { scale: 1.15 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                  transition={{ duration: 0.15 }}
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
  );
});
