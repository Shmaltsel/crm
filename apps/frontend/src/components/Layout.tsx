import { Link, useOutlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { AnimatePresence, motion, MotionConfig, useMotionValue, useTransform, animate } from "framer-motion";
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
import { hasRole } from "../utils/roles";

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

const pageTransitionDesktop = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

const desktopVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Layout() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();
  const swipeStartRef = useRef(0);
  const touchStartYRef = useRef(0);
  const dragX = useMotionValue(0);
  const [winWidth, setWinWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 360,
  );
  const [swipeActive, setSwipeActive] = useState(false);
  const [swipeDir, setSwipeDir] = useState<1 | -1>(1);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );

  const { user, logout } = useAuth();
  const { selectedCity } = useSelectedCity();

  const tabPaths = useMemo(
    () => NAV_TABS.filter((t) => hasRole(user?.role, t.roles)),
    [user],
  );

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const inputRange = useMemo(() => [-winWidth, 0, winWidth], [winWidth]);
  const previewScale = useTransform(dragX, inputRange, [1, 0.92, 1]);
  const previewOpacity = useTransform(dragX, inputRange, [1, 0.5, 1]);
  const previewXCallback = useCallback(
    (v: number) => {
      if (v < 0) return v + winWidth;
      return v - winWidth;
    },
    [winWidth],
  );
  const previewX = useTransform(dragX, previewXCallback);

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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (shouldIgnoreSwipe(e.target)) return;
    swipeStartRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
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
    dragX.set(dx);
    if (Math.abs(dx) > 10 && !swipeActive) {
      setSwipeDir(dx < 0 ? 1 : -1);
      setSwipeActive(true);
    }
  }, [swipeActive, dragX]);

  const handleTouchEnd = useCallback(() => {
    if (!swipeActive) return;
    const dx = dragX.get();
    const absDx = Math.abs(dx);
    swipeStartRef.current = 0;
    setSwipeActive(false);

    if (absDx < 60) {
      animate(dragX, 0, { type: "spring", stiffness: 350, damping: 35 });
      return;
    }

    const currentIdx = tabPaths.findIndex((t) =>
      location.pathname.startsWith(t.to),
    );
    if (currentIdx === -1) return;

    const goingNext = dx < 0;
    const targetIdx = currentIdx + (goingNext ? 1 : -1);
    if (targetIdx < 0 || targetIdx >= tabPaths.length) {
      animate(dragX, 0, { type: "spring", stiffness: 350, damping: 35 });
      return;
    }

    const commitX = goingNext ? -winWidth : winWidth;
    animate(dragX, commitX, {
      type: "spring",
      stiffness: 350,
      damping: 35,
    }).then(() => {
      dragX.jump(0);
      navigate(tabPaths[targetIdx].to);
    });
  }, [navigate, tabPaths, location.pathname, swipeActive, winWidth, dragX]);

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
            {hasRole(user?.role, ["SUPERADMIN", "MANAGER"]) && (
              <NavLink to="/dashboard" icon={Home} label="Дашборд" currentPath={location.pathname} />
            )}
            {hasRole(user?.role, ["SUPERADMIN"]) && (
              <NavLink to="/cities" icon={MapPin} label="Міста" currentPath={location.pathname} />
            )}
            <NavLink to="/schools" icon={School} label="Школи" currentPath={location.pathname} />
            <NavLink to="/kindergartens" icon={Baby} label="Садочки" currentPath={location.pathname} />
            <NavLink to="/finance" icon={Wallet} label="Фінанси" currentPath={location.pathname} />
            <NavLink to="/calendar" icon={Calendar} label="Календар" currentPath={location.pathname} />
            {hasRole(user?.role, ["SUPERADMIN"]) && (
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
          {isMobile ? (
            <div className="relative min-h-full">
              {swipeActive && (() => {
                const currentIdx = tabPaths.findIndex((t) =>
                  location.pathname.startsWith(t.to),
                );
                const targetIdx = currentIdx + swipeDir;
                if (targetIdx < 0 || targetIdx >= tabPaths.length) return null;
                const TabIcon = tabPaths[targetIdx].icon;
                return (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-surface-subtle"
                    style={{ x: previewX, scale: previewScale, opacity: previewOpacity }}
                  >
                    <div className="flex flex-col items-center gap-3 pointer-events-none">
                      <TabIcon className="w-12 h-12 text-content-muted" />
                      <span className="text-sm font-medium text-content-muted">
                        {tabPaths[targetIdx].label}
                      </span>
                    </div>
                  </motion.div>
                );
              })()}
              <motion.div
                className="relative z-10 bg-surface-subtle"
                style={{ x: dragX }}
              >
                {outlet}
              </motion.div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={desktopVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransitionDesktop}
                style={{ willChange: "transform, opacity" }}
              >
                {outlet}
              </motion.div>
            </AnimatePresence>
          )}
        </main>

        <BottomNavigationBar />
      </div>
    </MotionConfig>
  );
}
