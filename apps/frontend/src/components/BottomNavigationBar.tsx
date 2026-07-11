import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { DUR } from "../lib/motion";
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

function TabItem({ tab, isActive }: { tab: NavTab; isActive: boolean }) {
  const Icon = tab.icon;
  return (
    <Link
      to={tab.to}
      role="tab"
      aria-selected={isActive}
      aria-label={tab.label}
      className="relative flex items-center justify-center min-w-[44px] min-h-[44px] flex-1"
    >
      <span
        className={`absolute inset-x-1 inset-y-1 rounded-control bg-brand/10 transition-all ${
          isActive ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{ transitionDuration: `${DUR.fast}s`, transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
      />
      <div
        className="relative z-10 flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-transform"
        style={{ transitionDuration: `${DUR.micro}s` }}
      >
        <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-brand" : "text-content-muted"}`} style={{ transitionDuration: `${DUR.fast}s` }} />
        <span className={`text-2xs font-medium transition-colors ${isActive ? "text-brand" : "text-content-muted"}`} style={{ transitionDuration: `${DUR.fast}s` }}>
          {tab.label}
        </span>
      </div>
    </Link>
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

  const isMoreActive = activeIndex === -1;

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border flex items-center justify-around px-1 h-14 overflow-visible"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        role="tablist"
        aria-label="Основна навігація"
      >
        {tabs.map((tab, i) => (
          <TabItem key={tab.to} tab={tab} isActive={i === activeIndex} />
        ))}

        <button
          onClick={() => setSheetOpen(true)}
          className="relative flex items-center justify-center min-w-[44px] min-h-[44px] flex-1"
          aria-label="Більше розділів"
          role="tab"
          aria-selected={isMoreActive}
        >
          <span
            className={`absolute inset-x-1 inset-y-1 rounded-control bg-brand/10 transition-all ${
              isMoreActive ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            style={{ transitionDuration: `${DUR.fast}s`, transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
          />
          <div
            className="relative z-10 flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-transform"
            style={{ transitionDuration: `${DUR.micro}s` }}
          >
            <MoreHorizontal className={`w-5 h-5 transition-colors ${isMoreActive ? "text-brand" : "text-content-muted"}`} style={{ transitionDuration: `${DUR.fast}s` }} />
            <span className={`text-2xs font-medium transition-colors ${isMoreActive ? "text-brand" : "text-content-muted"}`} style={{ transitionDuration: `${DUR.fast}s` }}>
              Більше
            </span>
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {sheetOpen && <MoreSheet onClose={() => setSheetOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
