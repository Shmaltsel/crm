interface PipelineProps {
  currentStageIndex: number;
  currentEvent: any;
  onPipelineClick: (stepId: number) => void;
  stages: Array<{ id: number; key: string; name: string }>;
}

export default function Pipeline({ currentStageIndex, currentEvent, onPipelineClick, stages }: PipelineProps) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 w-full">
      <h3 className="font-bold text-slate-800 mb-4 md:hidden">Етап події</h3>
      <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex items-start min-w-[600px] justify-between relative">
          <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 -z-10"></div>
          {stages.map((step, index) => {
            const isCompleted = index < currentStageIndex;
            const isActive = index === currentStageIndex;
            const isNext = index === currentStageIndex + 1;
            const isClickable = !!currentEvent && isNext;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1 z-10 px-1">
                <button
                  onClick={() => isClickable && onPipelineClick(step.id)}
                  className={`w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full text-xs font-bold border-2 mb-2 transition-all
                    ${isCompleted
                      ? 'border-blue-600 text-blue-600 bg-white'
                      : isActive
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                      : isNext
                      ? 'border-blue-400 bg-white text-blue-400 cursor-pointer hover:scale-110 hover:border-blue-600 hover:text-blue-600'
                      : 'border-slate-200 text-slate-400 bg-white cursor-not-allowed opacity-50'
                    }`}
                >
                  {isCompleted ? '✓' : step.id}
                </button>
                <span className={`text-[10px] md:text-[11px] leading-tight font-medium text-center break-words max-w-[70px]
                  ${isActive ? 'text-blue-600 font-bold' : isNext ? 'text-blue-400' : 'text-slate-400'}`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
