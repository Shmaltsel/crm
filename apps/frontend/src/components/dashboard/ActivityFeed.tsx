import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ROLE_INITIALS: Record<string, string> = {
  MANAGER:    'М',
  SUPERADMIN: 'А',
  DRIVER:     'В',
  HOST:       'В',
};

const ROLE_COLORS: Record<string, string> = {
  MANAGER:    'bg-brand-50 text-brand-700',
  SUPERADMIN: 'bg-purple-50 text-purple-700',
  DRIVER:     'bg-success-50 text-success-700',
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
    <div className="mobile-card flex flex-col">

      <div className="flex justify-between items-center mb-2.5">
        <p className="text-sm font-semibold text-content-primary">Активність команди</p>
        <span className="text-2xs text-content-muted">{formatDate(items[0]?.createdAt ?? new Date().toISOString())}</span>
      </div>

      {items.length === 0 ? (
        <div className="py-5 text-center text-content-muted text-sm">
          Сьогодні активності ще немає
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-0.5">
            {visible.map((group) => {
              const avatarColor = ROLE_COLORS[group.role] ?? 'bg-neutral-100 text-neutral-600';
              const shownActions = group.actions.slice(-3);
              const hiddenCount  = group.actions.length - shownActions.length;
              const lastTime     = formatTime(group.actions[group.actions.length - 1].createdAt);

              return (
                <div key={group.key} className="flex items-start gap-2.5 py-2 px-2 -mx-1 rounded-control hover:bg-surface-muted/60 transition-colors">

                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-2xs font-semibold shrink-0 mt-0.5 ${avatarColor}`}>
                    {getInitials(group.userName)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-content-primary leading-tight">
                      {group.userName}
                      {group.schoolName && (
                        <>
                          {' · '}
                          <button
                            onClick={() => group.schoolId && navigate(`/schools/${group.schoolId}`)}
                            className="text-brand hover:underline font-medium"
                          >
                            {group.schoolName}
                          </button>
                        </>
                      )}
                    </p>

                    <div className="mt-0.5 flex flex-col gap-0.5">
                      {hiddenCount > 0 && (
                        <p className="text-2xs text-content-muted italic">+{hiddenCount} раніше</p>
                      )}
                      {shownActions.map((a) => (
                        <p key={a.id} className="text-2xs text-content-secondary leading-snug">
                          — {a.action.replace(/\.$/, '')}
                          {a.comment && (
                            <span className="text-content-muted italic"> «{a.comment}»</span>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>

                  <span className="text-2xs text-content-muted shrink-0 pt-0.5">{lastTime}</span>

                </div>
              );
            })}
          </div>

          {hasMore && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="mt-2.5 pt-2.5 border-t border-border text-2xs text-brand hover:underline text-center w-full"
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
