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
  return useMemo(() => {
    const role = user?.role;
    const allTabs = NAV_TABS.filter((t) => hasRole(role, t.roles));
    if (role === "DRIVER" || role === "HOST") {
      const keys = ["/schools", "/calendar", "/finance"];
      return allTabs.filter((t) => keys.includes(t.to));
    }
    const keys = ["/dashboard", "/schools", "/calendar"];
    return allTabs.filter((t) => keys.includes(t.to));
  }, [user]);
}

export default function BottomNavigationBar() {
  const location = useLocation();
  const tabs = useBottomTabs();
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeIndex = useMemo(
    () => tabs.findIndex((t) => location.pathname.startsWith(t.to)),
    [tabs, location.pathname],
  );

  const isMoreActive = activeIndex === -1;

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border flex items-center justify-around px-1 pb-safe h-14 overflow-visible"
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
              className="relative flex items-center justify-center min-w-[44px] min-h-[44px] flex-1"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="active-pill"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute inset-x-1 inset-y-1 bg-brand/10 rounded-control"
                  />
                )}
              </AnimatePresence>
              <motion.div
                className="relative z-10 flex flex-col items-center justify-center gap-0.5"
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-brand" : "text-content-muted"}`} />
                <span className={`text-2xs font-medium ${isActive ? "text-brand" : "text-content-muted"}`}>
                  {tab.label}
                </span>
              </motion.div>
            </Link>
          );
        })}

        <button
          onClick={() => setSheetOpen(true)}
          className="relative flex items-center justify-center min-w-[44px] min-h-[44px] flex-1"
          aria-label="Більше розділів"
          role="tab"
          aria-selected={isMoreActive}
        >
          <AnimatePresence>
            {isMoreActive && (
              <motion.div
                key="active-pill"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute inset-x-1 inset-y-1 bg-brand/10 rounded-control"
              />
            )}
          </AnimatePresence>
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center gap-0.5"
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
          >
            <MoreHorizontal className={`w-5 h-5 ${isMoreActive ? "text-brand" : "text-content-muted"}`} />
            <span className={`text-2xs font-medium ${isMoreActive ? "text-brand" : "text-content-muted"}`}>
              Більше
            </span>
          </motion.div>
        </button>
      </nav>

      <AnimatePresence>
        {sheetOpen && <MoreSheet onClose={() => setSheetOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
