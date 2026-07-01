import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ROLE_INITIALS: Record<string, string> = {
  MANAGER:    'М',
  SUPERADMIN: 'А',
  DRIVER:     'В',
  HOST:       'В',
};

const ROLE_COLORS: Record<string, string> = {
  MANAGER:    'bg-blue-50 text-blue-700',
  SUPERADMIN: 'bg-purple-50 text-purple-700',
  DRIVER:     'bg-emerald-50 text-emerald-700',
  HOST:       'bg-violet-50 text-violet-700',
};

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'сьогодні';
  if (d.toDateString() === yesterday.toDateString()) return 'вчора';
  return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
}

interface ActivityItem {
  id:         string;
  userName:   string;
  role:       string;
  action:     string;
  comment:    string | null;
  createdAt:  string;
  schoolId:   string | null;
  schoolName: string | null;
  eventId:    string | null;
}

interface Group {
  key:       string;
  userName:  string;
  role:      string;
  schoolId:  string | null;
  schoolName: string | null;
  actions:   { id: string; action: string; comment: string | null; createdAt: string }[];
}

function groupItems(items: ActivityItem[]): Group[] {
  const groups: Group[] = [];

  for (const item of items) {
    const last = groups[groups.length - 1];
    const sameUser   = last?.userName  === item.userName;
    const sameSchool = last?.schoolId  === item.schoolId; 

    if (last && sameUser && sameSchool) {
      last.actions.push({ id: item.id, action: item.action, comment: item.comment, createdAt: item.createdAt });
    } else {
      groups.push({
        key:        item.id,
        userName:   item.userName,
        role:       item.role,
        schoolId:   item.schoolId,
        schoolName: item.schoolName,
        actions:    [{ id: item.id, action: item.action, comment: item.comment, createdAt: item.createdAt }],
      });
    }
  }

  return groups;
}

const COLLAPSED_COUNT = 2;

interface Props {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: Props) {
  const navigate  = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const groups   = groupItems(items);
  const visible  = expanded ? groups : groups.slice(0, COLLAPSED_COUNT);
  const hasMore  = groups.length > COLLAPSED_COUNT;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">

      {/* Хедер */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-slate-800">Активність команди</p>
        <span className="text-xs text-slate-400">{formatDate(items[0]?.createdAt ?? new Date().toISOString())}</span>
      </div>

      {items.length === 0 ? (
        <div className="py-6 text-center text-slate-400 text-sm">
          Сьогодні активності ще немає
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            {visible.map((group) => {
              const avatarColor = ROLE_COLORS[group.role] ?? 'bg-slate-100 text-slate-600';
              const shownActions = group.actions.slice(-3);
              const hiddenCount  = group.actions.length - shownActions.length;
              const lastTime     = formatTime(group.actions[group.actions.length - 1].createdAt);

              return (
                <div key={group.key} className="flex items-start gap-3 py-2 px-2 -mx-1 rounded-xl hover:bg-slate-50/60 transition-colors">

                  {/* Аватар */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 ${avatarColor}`}>
                    {getInitials(group.userName)}
                  </div>

                  {/* Контент */}
                  <div className="min-w-0 flex-1">

                    {/* Ім'я + школа */}
                    <p className="text-xs font-semibold text-slate-800 leading-tight">
                      {group.userName}
                      {group.schoolName && (
                        <>
                          {' · '}
                          <button
                            onClick={() => group.schoolId && navigate(`/schools/${group.schoolId}`)}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {group.schoolName}
                          </button>
                        </>
                      )}
                    </p>

                    {/* Дії */}
                    <div className="mt-1 flex flex-col gap-0.5">
                      {hiddenCount > 0 && (
                        <p className="text-xs text-slate-400 italic">+{hiddenCount} раніше</p>
                      )}
                      {shownActions.map((a) => (
                        <p key={a.id} className="text-xs text-slate-500 leading-snug">
                          — {a.action.replace(/\.$/, '')}
                          {a.comment && (
                            <span className="text-slate-400 italic"> «{a.comment}»</span>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Час останньої дії */}
                  <span className="text-xs text-slate-400 shrink-0 pt-0.5">{lastTime}</span>

                </div>
              );
            })}
          </div>

          {/* Кнопка згорнути/розгорнути */}
          {hasMore && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="mt-3 pt-3 border-t border-slate-50 text-xs text-blue-600 hover:underline text-center w-full"
            >
              {expanded
                ? '↑ Згорнути'
                : `↓ Показати ще ${groups.length - COLLAPSED_COUNT}`}
            </button>
          )}
        </>
      )}

    </div>
  );
}