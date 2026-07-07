import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { NAV_TABS } from "../constants/navTabs";
import type { NavTab } from "../constants/navTabs";

export function useFilteredTabs(): NavTab[] {
  const { user } = useAuth();
  const is = (roles?: string[]) => !roles || (!!user?.role && roles.includes(user.role));
  return useMemo(() => NAV_TABS.filter((t) => is(t.roles)), [user]);
}

export default function BottomNavigationBar() {
  const location = useLocation();
  const tabs = useFilteredTabs();

  const activeIndex = useMemo(
    () => tabs.findIndex((t) => location.pathname.startsWith(t.to)),
    [tabs, location.pathname],
  );

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border flex items-center justify-around px-2 pb-safe pt-1 h-16 overflow-visible"
      role="tablist"
      aria-label="Основна навігація"
    >
      {tabs.map((tab, i) => {
        const isActive = i === activeIndex;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            role="tab"
            aria-selected={isActive}
            className={`relative flex flex-col items-center gap-0.5 px-3 py-1 min-w-0 flex-1 transition-colors
              ${isActive ? "text-white" : "text-content-muted hover:text-content-secondary"}`}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-pill"
                className="absolute inset-0 bg-brand rounded-full shadow-lg shadow-brand/30"
                style={{ translateY: "-12px", scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className={`relative z-10 ${isActive ? "w-6 h-6" : "w-5 h-5"}`} />
            <span className={`relative z-10 text-[10px] font-medium truncate w-full text-center ${isActive ? "text-white" : ""}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
