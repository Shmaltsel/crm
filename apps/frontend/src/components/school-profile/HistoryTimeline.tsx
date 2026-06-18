interface HistoryTimelineProps {
  currentEvent: any;
  onHistoryClick: (item: any) => void;
}

export default function HistoryTimeline({ currentEvent, onHistoryClick }: HistoryTimelineProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="font-bold text-slate-800 mb-4">Історія взаємодії</h3>
      {!currentEvent || !currentEvent.history || currentEvent.history.length === 0 ? (
        <p className="text-sm text-slate-400">Історія порожня.</p>
      ) : (
        <div className="space-y-2 relative before:absolute before:inset-0 before:ml-2.5 before:w-0.5 before:bg-slate-200">
          {currentEvent.history.map((item: any, i: number) => (
            <div 
              key={item.id} 
              onClick={() => onHistoryClick(item)}
              className="relative pl-8 pr-2 py-2 text-sm hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group"
            >
              <div className={`absolute left-1.5 w-2.5 h-2.5 rounded-full top-3.5 ${i === 0 ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'}`}></div>
              <p className="font-bold text-slate-800">{new Date(item.createdAt).toLocaleDateString()} - {item.action}</p>
              
              {item.comment && (
                <p className="text-slate-600 mt-1 bg-white p-2 rounded border border-slate-100 shadow-sm text-xs italic">
                  "{item.comment}"
                </p>
              )}
              
              <p className="text-[11px] text-slate-400 mt-1 flex justify-between items-center">
                <span>👤 {item.userName}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">✏️ Редагувати</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
