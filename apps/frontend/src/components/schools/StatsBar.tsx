import React from 'react';

interface School {
  id: string;
  events?: any[];
}

interface StatsBarProps {
  schools: School[];
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

// Нові: немає жодної події
// Заплановані: є подія, але статус <= DATE_CONFIRMED
// В роботі: статус від PREPARATION до REPORT
// Проведені: статус RE_SALE

const PLANNED_STAGES = ['BASE', 'FIRST_CONTACT', 'INTERESTED', 'PRE_APPROVAL', 'DATE_CONFIRMED'];
const IN_PROGRESS_STAGES = ['PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT'];

export function classifySchool(school: School): 'new' | 'planned' | 'inProgress' | 'done' {
  const events = (school.events || []).filter((e: any) => e.status !== 'RE_SALE');
  if (events.length === 0) {
    const hasResale = (school.events || []).some((e: any) => e.status === 'RE_SALE');
    if (hasResale) return 'done';
    return 'new';
  }
  const latest = events[events.length - 1];
  if (PLANNED_STAGES.includes(latest.status)) return 'planned';
  if (IN_PROGRESS_STAGES.includes(latest.status)) return 'inProgress';
  if (latest.status === 'RE_SALE') return 'done';
  return 'new';
}

export default function StatsBar({ schools, activeFilter, onFilterChange }: StatsBarProps) {
  const stats = schools.reduce(
    (acc, s) => { acc[classifySchool(s)]++; return acc; },
    { new: 0, planned: 0, inProgress: 0, done: 0 }
  );

  const items = [
    {
      key: 'new',
      label: 'Нові',
      value: stats.new,
      color: 'text-slate-600',
      activeBg: 'bg-slate-800 text-white',
      inactiveBg: 'bg-slate-50 text-slate-600',
      dot: 'bg-slate-400',
    },
    {
      key: 'planned',
      label: 'Заплановані',
      value: stats.planned,
      color: 'text-amber-600',
      activeBg: 'bg-amber-500 text-white',
      inactiveBg: 'bg-amber-50 text-amber-600',
      dot: 'bg-amber-400',
    },
    {
      key: 'inProgress',
      label: 'В роботі',
      value: stats.inProgress,
      color: 'text-blue-600',
      activeBg: 'bg-blue-600 text-white',
      inactiveBg: 'bg-blue-50 text-blue-600',
      dot: 'bg-blue-500',
    },
    {
      key: 'done',
      label: 'Проведені',
      value: stats.done,
      color: 'text-emerald-600',
      activeBg: 'bg-emerald-600 text-white',
      inactiveBg: 'bg-emerald-50 text-emerald-600',
      dot: 'bg-emerald-500',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 bg-white py-3 px-4 sm:px-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
      {items.map((item, i) => {
        const isActive = activeFilter === item.key;
        return (
          <React.Fragment key={item.key}>
            <button
              onClick={() => onFilterChange(isActive ? null : item.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive ? item.activeBg : `${item.inactiveBg} hover:opacity-80`
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white/70' : item.dot}`} />
              <span>{item.label}</span>
              <span className={`font-bold ${isActive ? 'text-white' : ''}`}>
                {item.value}
              </span>
            </button>
            {i < items.length - 1 && (
              <div className="w-px h-4 bg-slate-200 hidden sm:block" />
            )}
          </React.Fragment>
        );
      })}
      {activeFilter && (
        <button
          onClick={() => onFilterChange(null)}
          className="text-xs text-slate-400 hover:text-slate-600 ml-1 transition-colors"
        >
          ✕ скинути
        </button>
      )}
    </div>
  );
}
