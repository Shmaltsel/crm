import React from 'react';

interface School {
  events?: any[];
}

interface StatsBarProps {
  schools: School[];
}

export default function StatsBar({ schools }: StatsBarProps) {
  // Логіка підрахунку:
  // Нові: 0 подій.
  // Заплановані: пайплайн <= 5 (це перші 5 етапів у твоєму процесі).
  // В роботі: пайплайн > 5.
  // Проведені: статус RE_SALE (або фінальний статус, який у тебе позначений як завершений).
  
  const stats = schools.reduce((acc, s) => {
    const events = s.events || [];
    if (events.length === 0) {
      acc.new++;
    } else {
      const lastEvent = events[events.length - 1];
      // stageIdx визначає етап: 0-4 - планування, 5+ - робота
      const stageIdx = [
        "BASE", "FIRST_CONTACT", "INTERESTED", "PRE_APPROVAL", "DATE_CONFIRMED", 
        "PREPARATION", "IN_PROGRESS", "DONE", "REPORT", "RE_SALE"
      ].indexOf(lastEvent.status);

      if (lastEvent.status === "RE_SALE") acc.done++;
      else if (stageIdx > 4) acc.inProgress++;
      else acc.planned++;
    }
    return acc;
  }, { new: 0, inProgress: 0, planned: 0, done: 0 });

  const items = [
    { label: "Нові", value: stats.new, color: "text-slate-500" },
    { label: "В роботі", value: stats.inProgress, color: "text-blue-600" },
    { label: "Заплановані", value: stats.planned, color: "text-amber-600" },
    { label: "Проведені", value: stats.done, color: "text-emerald-600" },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 bg-white py-3 px-4 sm:px-6 rounded-2xl shadow-sm border border-slate-100 mb-6 text-xs sm:text-sm font-medium">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-slate-500 whitespace-nowrap">{item.label}</span>
            <span className={`font-bold ${item.color} bg-slate-50 px-2 sm:px-2.5 py-0.5 rounded-lg`}>
              ({item.value})
            </span>
          </div>
          {i < items.length - 1 && <div className="w-px h-4 bg-slate-200 hidden sm:block" />}
        </React.Fragment>
      ))}
    </div>
  );
}