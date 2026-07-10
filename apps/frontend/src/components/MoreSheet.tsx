import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { NAV_TABS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";

interface Props {
  onClose: () => void;
}

const SECTIONS = [
  { label: "Основне", routes: ["/dashboard", "/calendar", "/reports/review"] },
  { label: "Управління", routes: ["/schools", "/kindergartens", "/cities", "/employees", "/inventory"] },
  { label: "Бізнес", routes: ["/finance", "/analytics", "/city-leaderboard"] },
];

export default function MoreSheet({ onClose }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  const allowedTabs = useMemo(
    () => NAV_TABS.filter((t) => hasRole(user?.role, t.roles)),
    [user],
  );

  const allowedRoutes = new Set(allowedTabs.map((t) => t.to));

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <motion.div
        className="relative bg-white rounded-t-2xl shadow-xl pb-safe pb-4 max-h-[70vh] overflow-y-auto"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => { if (info.offset.y > 100) onClose(); }}
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h2 className="text-sm font-bold text-content-primary uppercase tracking-wider">
            Розділи
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-content-muted hover:text-content-primary rounded-control transition-colors"
            aria-label="Закрити"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-3 pb-3">
          {SECTIONS.map((section, sIdx) => {
            const items = section.routes
              .filter((r) => allowedRoutes.has(r))
              .map((r) => allowedTabs.find((t) => t.to === r)!)
              .filter(Boolean);

            if (items.length === 0) return null;

            return (
              <div key={section.label} className={sIdx > 0 ? "mt-3" : ""}>
                <div className="px-3 py-1.5">
                  <span className="text-2xs font-bold text-content-muted uppercase tracking-wider">
                    {section.label}
                  </span>
                </div>
                <div className="space-y-0.5">
                  {items.map((tab) => {
                    const isActive = location.pathname.startsWith(tab.to);
                    const Icon = tab.icon;
                    return (
                      <Link
                        key={tab.to}
                        to={tab.to}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-control text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-brand/10 text-brand"
                            : "text-content-secondary hover:bg-surface-muted"
                        }`}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        {tab.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
