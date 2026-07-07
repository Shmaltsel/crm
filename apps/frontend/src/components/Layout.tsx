import { Link, useOutlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useMemo, useCallback } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  MapPin,
  School,
  Baby,
  Wallet,
  Calendar,
  Users,
  GraduationCap,
  LogOut,
} from "lucide-react";
import BottomNavigationBar from "./BottomNavigationBar";
import MobileTopNav from "./MobileTopNav";
import { NAV_TABS } from "../constants/navTabs";
import type { NavTab } from "../constants/navTabs";

function NavLink({
  to,
  icon: Icon,
  label,
  onClick,
  currentPath,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
  currentPath: string;
}) {
  const active = currentPath.startsWith(to);
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative flex items-center px-4 py-3 rounded-lg transition-colors group
        ${active ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
      )}
      <Icon className="w-4 h-4 mr-3 shrink-0" />
      {label}
    </Link>
  );
}

function getDirection(from: string, to: string): number {
  const fromPath = from.split("/")[1] || "";
  const toPath = to.split("/")[1] || "";
  const tabPaths = NAV_TABS.map((t) => t.to.replace("/", ""));
  const fromIdx = tabPaths.indexOf(fromPath);
  const toIdx = tabPaths.indexOf(toPath);
  if (fromIdx === -1 || toIdx === -1) {
    const fromSegs = from.split("/").filter(Boolean);
    const toSegs = to.split("/").filter(Boolean);
    if (toSegs.length > fromSegs.length) return 1;
    if (toSegs.length < fromSegs.length) return -1;
    const fromLast = fromSegs.pop() ?? "";
    const toLast = toSegs.pop() ?? "";
    return toLast.localeCompare(fromLast) > 0 ? 1 : -1;
  }
  return toIdx > fromIdx ? 1 : -1;
}

const pageVariants = (dir: number) => ({
  initial: { opacity: 0, x: dir * 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: dir * -40 },
});

const pageTransitionDesktop = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

const pageTransitionMobile = {
  type: "tween",
  duration: 0.22,
  ease: "easeOut",
} as const;

function isMobileWidth() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
}

export default function Layout() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();
  const prevPathRef = useRef(location.pathname);
  const isMobile = useRef(isMobileWidth());
  const swipeXRef = useRef(0);
  const swipeStartRef = useRef(0);
  const swipingRef = useRef(false);

  const { user, logout } = useAuth();
  const { selectedCity } = useSelectedCity();

  const isFn = (roles?: string[]) => !roles || (!!user?.role && roles.includes(user.role));
  const tabPaths = useMemo(
    () => NAV_TABS.filter((t) => isFn(t.roles)),
    [user],
  );

  const dir = useMemo(() => {
    const d = getDirection(prevPathRef.current, location.pathname);
    prevPathRef.current = location.pathname;
    return d;
  }, [location.pathname]);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  const pageTransition = isMobile.current ? pageTransitionMobile : pageTransitionDesktop;

  const shouldIgnoreSwipe = (target: EventTarget | null): boolean => {
    if (!target || !(target instanceof HTMLElement)) return true;
    if (target.closest("[data-no-swipe]")) return true;
    if (target.closest('[style*="overflow-x: auto"]')) return true;
    if (target.closest('[style*="overflow-x: scroll"]')) return true;
    const el = target.closest(".overflow-x-auto, .overflow-x-scroll");
    if (el) {
      const e = el as HTMLElement;
      if (e.scrollWidth > e.clientWidth) return true;
    }
    return false;
  };

  const touchStartYRef = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (shouldIgnoreSwipe(e.target)) return;
    swipeStartRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    swipeXRef.current = 0;
    swipingRef.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (swipeStartRef.current === 0) return;
    const dx = e.touches[0].clientX - swipeStartRef.current;
    const dy = Math.abs(e.touches[0].clientY - touchStartYRef.current);
    if (Math.abs(dx) < 5) return;
    if (Math.abs(dx) < dy * 1.5) {
      swipeStartRef.current = 0;
      return;
    }
    swipingRef.current = true;
    swipeXRef.current = dx;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!swipingRef.current) return;
    const dx = swipeXRef.current;
    swipingRef.current = false;
    swipeStartRef.current = 0;
    swipeXRef.current = 0;

    if (Math.abs(dx) < 60) return;

    const currentIdx = tabPaths.findIndex((t) =>
      location.pathname.startsWith(t.to),
    );
    if (currentIdx === -1) return;

    if (dx < 0 && currentIdx < tabPaths.length - 1) {
      navigate(tabPaths[currentIdx + 1].to);
    } else if (dx > 0 && currentIdx > 0) {
      navigate(tabPaths[currentIdx - 1].to);
    }
  }, [navigate, tabPaths, location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen bg-surface-subtle font-sans">
        <MobileTopNav />

        <aside
          className="hidden md:flex md:relative w-64 flex-col bg-[#0B1527] text-white shrink-0"
        >
          <div className="p-6 flex flex-col items-center border-b border-slate-700/50">
            <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
            <p className="text-xs text-blue-300 mt-1 tracking-wide flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {selectedCity.name}
            </p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {isFn(["SUPERADMIN", "MANAGER"]) && (
              <NavLink to="/dashboard" icon={Home} label="Дашборд" currentPath={location.pathname} />
            )}
            {isFn(["SUPERADMIN"]) && (
              <NavLink to="/cities" icon={MapPin} label="Міста" currentPath={location.pathname} />
            )}
            <NavLink to="/schools" icon={School} label="Школи" currentPath={location.pathname} />
            <NavLink to="/kindergartens" icon={Baby} label="Садочки" currentPath={location.pathname} />
            <NavLink to="/finance" icon={Wallet} label="Фінанси" currentPath={location.pathname} />
            <NavLink to="/calendar" icon={Calendar} label="Календар" currentPath={location.pathname} />
            {isFn(["SUPERADMIN"]) && (
              <NavLink to="/employees" icon={Users} label="Працівники" currentPath={location.pathname} />
            )}
          </nav>

          <div className="p-4 border-t border-slate-700/50 pb-8 md:pb-4">
            <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
              <div className="flex items-center min-w-0">
                <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold shrink-0">
                  {user?.name?.charAt(0) ?? "?"}
                </div>
                <div className="text-sm truncate min-w-0">
                  <p className="font-medium text-white truncate">{user?.name ?? "Користувач"}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.role ?? ""}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-colors text-xs font-medium ml-2 shrink-0 px-2.5 py-2 rounded-lg"
                title="Вийти"
              >
                <LogOut className="w-4 h-4" />
                Вийти
              </button>
            </div>
          </div>
        </aside>

        <main
          className="flex-1 overflow-y-auto overflow-x-hidden mt-16 md:mt-0 relative w-full min-w-0 pb-16 md:pb-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode={isMobile.current ? undefined : "wait"} custom={dir}>
            <motion.div
              key={location.pathname}
              custom={dir}
              variants={pageVariants(dir)}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{ willChange: "transform, opacity" }}
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNavigationBar />
      </div>
    </MotionConfig>
  );
}
