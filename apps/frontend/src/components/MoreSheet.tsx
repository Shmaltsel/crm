import { useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useDragControls } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { NAV_TABS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";
import {
  fadeVariants,
  SPRING,
  staggerContainer,
  staggerItem,
  DUR,
  EASE,
  TRANSITION,
} from "../lib/motion";

interface Props {
  onClose: () => void;
}

const SECTIONS = [
  { label: "Основне", routes: ["/dashboard", "/calendar", "/reports/review"] },
  { label: "Управління", routes: ["/schools", "/kindergartens", "/cities", "/employees", "/inventory"] },
  { label: "Бізнес", routes: ["/finance", "/analytics", "/city-leaderboard"] },
];

export default function MoreSheet({ onClose }: Props) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const dragControls = useDragControls();

  const handleLogout = useCallback(async () => {
    await logout();
    onClose();
  }, [logout, onClose]);

  const allowedTabs = useMemo(
    () => NAV_TABS.filter((t) => hasRole(user?.role, t.roles)),
    [user],
  );

  const allowedRoutes = new Set(allowedTabs.map((t) => t.to));

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col justify-end"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <motion.div
        className="relative bg-white rounded-t-2xl shadow-xl pb-safe pb-4"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={SPRING.snappy}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => { if (info.offset.y > 100) onClose(); }}
        dragListener={false}
        dragControls={dragControls}
      >
        <div
          className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <motion.div
            className="w-9 h-1 rounded-full bg-slate-300"
            initial={{ scaleX: 0.6, opacity: 0.4 }}
            animate={{ scaleX: [0.6, 1, 0.85, 1], opacity: [0.4, 1, 0.7, 1] }}
            transition={{ duration: 0.6, ease: EASE.outExpo }}
          />
        </div>

        <div className="overflow-y-auto max-h-[70vh]">
          <div className="flex items-center justify-between px-5 pt-2 pb-2">
            <h2 className="text-sm font-bold text-content-primary uppercase tracking-wider">
              Розділи
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-content-muted hover:text-content-primary rounded-control transition-colors active:scale-90"
              aria-label="Закрити"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <motion.div
            className="px-3 pb-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {SECTIONS.map((section, sIdx) => {
              const items = section.routes
                .filter((r) => allowedRoutes.has(r))
                .map((r) => allowedTabs.find((t) => t.to === r)!)
                .filter(Boolean);

              if (items.length === 0) return null;

              return (
                <div key={section.label} className={sIdx > 0 ? "mt-3" : ""}>
                  <motion.div className="px-3 py-1.5" variants={staggerItem}>
                    <span className="text-2xs font-bold text-content-muted uppercase tracking-wider">
                      {section.label}
                    </span>
                  </motion.div>
                  <div className="space-y-0.5">
                    {items.map((tab) => {
                      const isActive = location.pathname.startsWith(tab.to);
                      const Icon = tab.icon;
                      return (
                        <motion.div key={tab.to} variants={staggerItem}>
                          <Link
                            to={tab.to}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-control text-sm font-medium transition-colors active:scale-[0.97] ${
                              isActive
                                ? "bg-brand/10 text-brand"
                                : "text-content-secondary hover:bg-surface-muted"
                            }`}
                            whileHover={{ scale: 1.015, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            transition={TRANSITION.hover}
                          >
                            <Icon className="w-5 h-5 shrink-0" />
                            {tab.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <motion.div className="mt-3" variants={staggerItem}>
              <motion.div
                className="px-3 py-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: DUR.normal, ease: EASE.decelerate }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="h-px flex-1 bg-slate-200"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: DUR.slow, ease: EASE.outExpo }}
                  />
                  <span className="text-2xs font-bold text-content-muted uppercase tracking-wider">
                    Акаунт
                  </span>
                  <motion.div
                    className="h-px flex-1 bg-slate-200"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: DUR.slow, ease: EASE.outExpo }}
                  />
                </div>
              </motion.div>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {user?.name?.charAt(0) ?? "?"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-content-primary truncate">{user?.name ?? "Користувач"}</p>
                  <p className="text-xs text-content-muted truncate">{user?.role ?? ""}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-control text-sm font-medium text-content-secondary hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors active:scale-[0.97]"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={TRANSITION.hover}
              >
                <LogOut className="w-5 h-5 shrink-0" />
                Вийти
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
