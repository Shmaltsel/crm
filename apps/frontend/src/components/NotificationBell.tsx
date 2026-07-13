import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications, useUnreadCount, useMarkRead, useMarkAllRead } from "../hooks/useNotifications";

const TYPE_ICONS: Record<string, string> = {
  EVENT_RESCHEDULED: "📅",
  CREW_ASSIGNED: "🎯",
  EVENT_REMINDER: "🔔",
  ISSUE_CREATED: "🚨",
  DAY_OFF_CREATED: "🌴",
  DAY_OFF_REMOVED: "❌",
  REPORT_APPROVED: "✅",
  REPORT_SUBMITTED: "📨",
  SALARY_PAID: "💰",
  EVENT_CREATED: "📅",
  EVENT_CANCELLED: "🚫",
  WELCOME: "👋",
};

function getIcon(type: string) {
  return TYPE_ICONS[type] || "🔔";
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "щойно";
  if (mins < 60) return `${mins}хв тому`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}год тому`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}д тому`;
  return new Date(dateStr).toLocaleDateString("uk-UA");
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [bellKey, setBellKey] = useState(0);
  const prevUnreadRef = useRef(0);
  const navigate = useNavigate();
  const { data: unreadData } = useUnreadCount();
  const { data: notifData } = useNotifications();
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();

  const unread = unreadData?.count ?? 0;

  useEffect(() => {
    if (unread > 0 && unread !== prevUnreadRef.current) {
      setBellKey((k) => k + 1);
    }
    prevUnreadRef.current = unread;
  }, [unread]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors transition-transform active:scale-90"
        title="Сповіщення"
      >
        <div key={bellKey} className={unread > 0 ? "bell-ring-once" : ""}>
          <Bell className="w-5 h-5" />
        </div>
        <span hidden={unread === 0} className="notif-badge absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
          <span className="notif-pulse">
            {unread > 99 ? "99+" : unread}
          </span>
        </span>
      </button>

      <div hidden={!open} className="fixed inset-0 z-sheet notif-backdrop" onClick={() => setOpen(false)} />
      <div hidden={!open} className="notif-dropdown absolute right-0 top-full mt-2 w-80 bg-nav border border-slate-700/50 rounded-xl shadow-2xl z-sheet max-h-[70vh] flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50 shrink-0">
          <h3 className="text-sm font-semibold text-white">Сповіщення</h3>
          {unread > 0 && (
            <button
              onClick={() => markAllRead.mutate()}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Позначити всі прочитаними
            </button>
          )}
        </div>

        <div className="overflow-y-auto flex-1">
          {(!notifData?.items || notifData.items.length === 0) ? (
            <div className="px-4 py-8 text-center text-content-muted text-sm">
              <Bell className="w-8 h-8 mx-auto mb-2 text-content-muted/50" />
              <p className="font-medium">Немає сповіщень</p>
            </div>
          ) : (
            notifData.items.map((n, i) => (
              <button
                key={n.id}
                className="notif-item w-full text-left px-4 py-3 flex items-start gap-3 transition-colors transition-transform active:scale-[0.98] border-b border-slate-800/30 last:border-0"
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() => {
                  if (!n.readAt) markRead.mutate(n.id);
                  setOpen(false);
                  const payload = n.payload as Record<string, unknown>;
                  const entityType = payload?.entityType as string | undefined;
                  const entityId = payload?.entityId as string | undefined;
                  if (entityType && entityId) {
                    navigate(`/${entityType}/${entityId}`);
                  }
                }}
              >
                <span className="text-lg shrink-0 mt-0.5">{getIcon(n.type)}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white truncate">
                    {(n.payload as Record<string, unknown>)?.title as string || n.type}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {timeAgo(n.createdAt)}
                  </p>
                </div>
                {!n.readAt && (
                  <span className="notif-pulse w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
