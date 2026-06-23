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

const PLANNED_STAGES    = ['BASE', 'FIRST_CONTACT', 'DATE_CONFIRMED'];
const IN_PROGRESS_STAGES = ['PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT'];

export function classifySchool(school: School): 'new' | 'planned' | 'inProgress' | 'done' {
  const events = (school.events || []).filter((e: any) => e.status !== 'RE_SALE');
  if (events.length === 0) {
    return (school.events || []).some((e: any) => e.status === 'RE_SALE') ? 'done' : 'new';
  }
  const latest = events[events.length - 1];
  if (PLANNED_STAGES.includes(latest.status))    return 'planned';
  if (IN_PROGRESS_STAGES.includes(latest.status)) return 'inProgress';
  if (latest.status === 'RE_SALE')                return 'done';
  return 'new';
}

const ITEMS = [
  { key: 'new',        label: 'Нові',        dot: 'bg-slate-400',   active: 'bg-slate-800 text-white',    inactive: 'text-slate-600' },
  { key: 'planned',    label: 'Заплановані', dot: 'bg-amber-400',   active: 'bg-amber-500 text-white',    inactive: 'text-amber-600' },
  { key: 'inProgress', label: 'В роботі',    dot: 'bg-blue-500',    active: 'bg-blue-600 text-white',     inactive: 'text-blue-600'  },
  { key: 'done',       label: 'Проведені',   dot: 'bg-emerald-500', active: 'bg-emerald-600 text-white',  inactive: 'text-emerald-600'},
];

export default function StatsBar({ schools, activeFilter, onFilterChange }: StatsBarProps) {
  const stats = schools.reduce(
    (acc, s) => { acc[classifySchool(s)]++; return acc; },
    { new: 0, planned: 0, inProgress: 0, done: 0 } as Record<string, number>
  );

  return (
    <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-100 mb-4 overflow-hidden">
      {ITEMS.map((item, i) => {
        const isActive = activeFilter === item.key;
        return (
          <React.Fragment key={item.key}>
            {i > 0 && <div className="w-px h-8 bg-slate-100 shrink-0" />}
            <button
              onClick={() => onFilterChange(isActive ? null : item.key)}
              className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
                isActive ? item.active : `bg-white ${item.inactive} hover:bg-slate-50`
              }`}
            >
              <span className="text-base font-bold tabular-nums leading-none">
                {stats[item.key] ?? 0}
              </span>
              <span className="text-[10px] mt-1 leading-none opacity-80 truncate w-full text-center">
                {item.label}
              </span>
            </button>
          </React.Fragment>
        );
      })}
      {activeFilter && (
        <button
          onClick={() => onFilterChange(null)}
          className="px-3 text-slate-400 hover:text-slate-600 text-lg shrink-0 border-l border-slate-100 self-stretch flex items-center"
        >
          ✕
        </button>
      )}
    </div>
  );
}