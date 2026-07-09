import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { NAV_TABS } from "../constants/navTabs";
import { hasRole } from "../utils/roles";
import type { NavTab } from "../constants/navTabs";
import MoreSheet from "./MoreSheet";

export function useFilteredTabs(): NavTab[] {
  const { user } = useAuth();
  return useMemo(() => NAV_TABS.filter((t) => hasRole(user?.role, t.roles)), [user]);
}

export function useBottomTabs(): NavTab[] {
  const { user } = useAuth();
  return useMemo(
    () => NAV_TABS.filter((t) => t.bottomNav && hasRole(user?.role, t.roles)),
    [user],
  );
}

export default function BottomNavigationBar() {
  const location = useLocation();
  const tabs = useBottomTabs();
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeIndex = useMemo(
    () => tabs.findIndex((t) => location.pathname.startsWith(t.to)),
    [tabs, location.pathname],
  );

  return (
    <>
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
              aria-label={tab.label}
              className="relative flex items-center justify-center min-w-[48px] min-h-[48px] flex-1 transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-pill"
                  className="absolute inset-0 bg-brand rounded-full shadow-lg shadow-brand/30"
                  style={{ translateY: "-6px", scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                className="relative z-10 flex items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <Icon className={isActive ? "w-7 h-7" : "w-7 h-7 text-content-muted"} />
              </motion.div>
              <span className="sr-only">{tab.label}</span>
            </Link>
          );
        })}

        <button
          onClick={() => setSheetOpen(true)}
          className="relative flex items-center justify-center min-w-[48px] min-h-[48px] flex-1 transition-colors"
          aria-label="Більше розділів"
          role="tab"
        >
          <motion.div
            className="relative z-10 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
          >
            <MoreHorizontal className="w-7 h-7 text-content-muted" />
          </motion.div>
        </button>
      </nav>

      <AnimatePresence>
        {sheetOpen && <MoreSheet onClose={() => setSheetOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
