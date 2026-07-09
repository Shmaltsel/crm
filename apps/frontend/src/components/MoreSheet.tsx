import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { NAV_TABS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";

interface Props {
  onClose: () => void;
}

export default function MoreSheet({ onClose }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  const items = useMemo(
    () => NAV_TABS.filter((t) => hasRole(user?.role, t.roles)),
    [user],
  );

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
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Розділи
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600"
            aria-label="Закрити"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-3 pb-3 space-y-0.5">
          {items.map((tab) => {
            const isActive = location.pathname.startsWith(tab.to);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.to}
                to={tab.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand/10 text-brand"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}