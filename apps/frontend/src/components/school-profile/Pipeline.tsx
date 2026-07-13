import { memo, useState } from "react";
import type { Event } from "../../types";
import SchoolActionSheet from "./modals/SchoolActionSheet";

interface PipelineProps {
  currentStageIndex: number;
  currentEvent: Event | null;
  onPipelineClick: (stepId: number) => void;
  stages: Array<{ id: number; key: string; name: string }>;
}

export default memo(function Pipeline({ currentStageIndex, currentEvent, onPipelineClick, stages }: PipelineProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const progress = currentStageIndex / (stages.length - 1);

  return (
    <>
      <div className="bg-surface p-4 md:p-6 rounded-card card-shadow hover:card-shadow-hover border border-border w-full md:hidden hover:-translate-y-0.5 transition-all duration-200">
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
            <div
              className="h-full bg-brand rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress * 100}%` }}
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
      </div>

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

      <div className="bg-surface p-4 md:p-6 rounded-card card-shadow hover:card-shadow-hover border border-border w-full hidden md:block hover:-translate-y-0.5 transition-all duration-200">
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
                  <button
                    onClick={() => isClickable && onPipelineClick(step.id)}
                    className={`w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full text-xs font-bold border-2 mb-2 transition-all duration-150
                      ${isCompleted
                        ? 'border-brand text-brand bg-surface'
                        : isActive
                        ? 'border-brand bg-brand text-white shadow-md'
                        : isNext
                        ? 'border-brand-300 bg-surface text-brand-300 cursor-pointer hover:scale-110 active:scale-95'
                        : 'border-border-strong text-content-muted bg-surface cursor-not-allowed opacity-50'
                      }`}
                  >
                    {isCompleted ? '✓' : step.id}
                  </button>
                  <span className={`text-2xs md:text-xs leading-tight font-medium text-center break-words max-w-[70px]
                    ${isActive ? 'text-brand font-bold' : isNext ? 'text-brand-300' : 'text-content-muted'}`}>
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
});
