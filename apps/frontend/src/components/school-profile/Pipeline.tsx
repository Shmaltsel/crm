interface PipelineProps {
  currentStageIndex: number;
  currentEvent: any;
  onPipelineClick: (stepId: number) => void;
  stages: Array<{ id: number; key: string; name: string }>;
}

export default function Pipeline({ currentStageIndex, currentEvent, onPipelineClick, stages }: PipelineProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
      <div className="flex items-start min-w-[800px] justify-between relative">
        <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 -z-10"></div>
        {stages.map((step, index) => {
          const isCompleted = index < currentStageIndex;
          const isActive = index === currentStageIndex;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1 z-10">
              <button onClick={() => onPipelineClick(step.id)} disabled={!currentEvent || (!isActive && index !== currentStageIndex + 1)}
                className={`w-8 h-8 rounded-full text-xs font-bold border-2 mb-2 transition-all 
                  ${isCompleted ? 'border-blue-600 text-blue-600 bg-white' : 
                    isActive ? 'border-blue-600 bg-blue-600 text-white shadow-md cursor-pointer hover:scale-110' : 
                    'border-slate-200 text-slate-400 bg-white cursor-not-allowed'}`}
              >
                {isCompleted ? '✓' : step.id}
              </button>
              <span className={`text-[11px] font-medium text-center px-1 ${isActive ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>{step.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
