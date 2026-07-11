import { useState, useRef } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useNotifications, useUnreadCount, useMarkRead, useMarkAllRead } from "../hooks/useNotifications";
import { tooltipVariants, bellRingVariants, staggerContainer, staggerItem, SPRING, DUR, EASE } from "../lib/motion";

const TYPE_ICONS: Record<string, string> = {
  EVENT_RESCHEDULED: "📅",
  CREW_ASSIGNED: "🎯",
  EVENT_REMINDER: "🔔",
  ISSUE_CREATED: "🚨",
  DAY_OFF_CREATED: "🌴",
  DAY_OFF_REMOVED: "❌",
  REPORT_APPROVED: "✅",
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
  const navigate = useNavigate();
  const { data: unreadData } = useUnreadCount();
  const { data: notifData } = useNotifications();
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();

  const unread = unreadData?.count ?? 0;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors active:scale-90"
        title="Сповіщення"
      >
        <motion.div
          animate={unread > 0 ? "ring" : undefined}
          variants={bellRingVariants}
        >
          <Bell className="w-5 h-5" />
        </motion.div>
        <AnimatePresence>
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={SPRING.bouncy}
              className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1"
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {unread > 99 ? "99+" : unread}
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-sheet" onClick={() => setOpen(false)} />
            <motion.div
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 top-full mt-2 w-80 bg-nav border border-slate-700/50 rounded-xl shadow-2xl z-sheet max-h-[70vh] flex flex-col"
            >
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
                  <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    {notifData.items.map((n) => (
                      <motion.button
                        key={n.id}
                        variants={staggerItem}
                        whileHover={{ backgroundColor: "rgba(30,41,59,0.5)", y: -1 }}
                        transition={{ duration: DUR.fast, ease: EASE.standard }}
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
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors active:scale-[0.98] border-b border-slate-800/30 last:border-0 ${!n.readAt ? "bg-blue-900/10" : ""}`}
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
                          <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2"
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
