import { Link, useOutlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { AnimatePresence, motion, MotionConfig, useMotionValue, useTransform, animate, type PanInfo } from "framer-motion";
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

function MobileDragView({
  x,
  winWidth,
  dragBlockedRef,
  shouldIgnoreSwipe,
  handleDragEnd,
  outlet,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  winWidth: number;
  dragBlockedRef: React.MutableRefObject<boolean>;
  shouldIgnoreSwipe: (target: EventTarget | null) => boolean;
  handleDragEnd: (event: PointerEvent, info: PanInfo) => void;
  outlet: React.ReactNode;
}) {
  const ghostX = useTransform(x, [-winWidth, 0, winWidth], [0, -winWidth * 0.15, 0]);
  const ghostScale = useTransform(x, [-winWidth, 0, winWidth], [1, 0.94, 1]);
  const ghostFilter = useTransform(x, [-winWidth, 0, winWidth], ["brightness(1)", "brightness(0.85)", "brightness(1)"]);

  return (
    <div className="relative min-h-full" style={{ overflowX: "visible" } as React.CSSProperties}>
      <motion.div
        className="absolute inset-0 bg-surface-subtle"
        style={{ x: ghostX, scale: ghostScale, filter: ghostFilter }}
      />
      <motion.div
        className="absolute inset-0"
        drag="x"
        dragConstraints={{ left: -winWidth, right: winWidth }}
        dragElastic={0.5}
        dragMomentum={false}
        onDragStart={(e) => {
          dragBlockedRef.current = shouldIgnoreSwipe(e.target as HTMLElement);
        }}
        onDragEnd={handleDragEnd}
        style={{ x }}
      >
        {outlet}
      </motion.div>
    </div>
  );
}

export default function Layout() {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();
  const dragBlockedRef = useRef(false);
  const x = useMotionValue(0);
  const [winWidth, setWinWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 360,
  );
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

  const shouldIgnoreSwipe = useCallback((target: EventTarget | null): boolean => {
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
  }, []);

  useEffect(() => {
    x.jump(0);
  }, [location.pathname, x]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (dragBlockedRef.current) {
        dragBlockedRef.current = false;
        animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
        return;
      }
      const dx = info.offset.x;
      const velocity = info.velocity.x;
      if (Math.abs(dx) < 28 && Math.abs(velocity) < 500) {
        animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
        return;
      }
      const dir: 1 | -1 = dx < 0 ? 1 : -1;
      const currentIdx = tabPaths.findIndex((t) =>
        location.pathname.startsWith(t.to),
      );
      if (currentIdx === -1) return;
      const targetIdx = currentIdx + dir;
      if (targetIdx < 0 || targetIdx >= tabPaths.length) {
        animate(x, 0, { type: "spring", stiffness: 400, damping: 35 });
        return;
      }
      const commitX = dir * -winWidth;
      animate(x, commitX, {
        type: "spring",
        velocity: -velocity,
        stiffness: 300,
        damping: 30,
      }).then(() => {
        x.jump(0);
        navigate(tabPaths[targetIdx].to);
      });
    },
    [navigate, tabPaths, location.pathname, winWidth, x],
  );

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
          className="flex-1 overflow-y-auto mt-16 md:mt-0 relative w-full min-w-0 pb-16 md:pb-0"
          style={{ marginTop: isMobile ? "calc(4rem + env(safe-area-inset-top, 0px))" : undefined }}
        >
          {isMobile ? (
            <MobileDragView
              x={x}
              winWidth={winWidth}
              dragBlockedRef={dragBlockedRef}
              shouldIgnoreSwipe={shouldIgnoreSwipe}
              handleDragEnd={handleDragEnd}
              outlet={outlet}
            />
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
