import { Link, useOutlet, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pageVariants, DUR, EASE, TRANSITION, useHoverCapable } from "../lib/motion";
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
import NotificationBell from "./NotificationBell";
import OnboardingTour from "./OnboardingTour";
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
  const hoverCapable = useHoverCapable();
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors group"
    >
      {active && (
          <motion.div
            layoutId="sidebar-active-indicator"
            layout="position"
            className="absolute inset-0 bg-brand rounded-lg"
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ zIndex: 0 }}
          />
      )}
      {!active && (
        <div className="absolute inset-0 rounded-lg bg-transparent group-hover:bg-white/5 transition-colors duration-fast" />
      )}
      <motion.div
        className="relative z-10 flex items-center gap-3 w-full"
        whileHover={hoverCapable && !active ? { x: 2 } : undefined}
        transition={TRANSITION.tap}
      >
        <Icon className={`w-4 h-4 shrink-0 transition-transform duration-fast ${active ? "text-white" : "text-slate-400 group-hover:text-white/80"}`} />
        <span className={`transition-colors duration-fast ${active ? "text-white" : "text-slate-400 group-hover:text-white/80"}`}>
          {label}
        </span>
      </motion.div>
    </Link>
  );
}

export default function Layout() {
  const hoverCapable = useHoverCapable();
  const outlet = useOutlet();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches,
  );

  const { user, logout } = useAuth();
  const { selectedCity } = useSelectedCity();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex h-dvh bg-surface-subtle font-sans overflow-hidden">
      <MobileTopNav />

      <aside className="hidden md:flex md:relative w-64 flex-col bg-nav text-white shrink-0">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, ease: EASE.outExpo }}
          className="p-6 flex flex-col items-center border-b border-slate-700/50"
        >
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
          <p className="text-xs text-blue-300 mt-1 tracking-wide flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {selectedCity.name}
          </p>
        </motion.div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {hasRole(user?.role, ["SUPERADMIN", "MANAGER"]) && (
            <NavLink to="/dashboard" icon={Home} label="Дашборд" currentPath={location.pathname} />
          )}
          {hasRole(user?.role, ["SUPERADMIN", "MANAGER", "OWNER"]) && (
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
              <motion.div
                whileHover={hoverCapable ? { scale: 1.05 } : undefined}
                transition={TRANSITION.hover}
                className="w-8 h-8 bg-brand/20 text-brand rounded-full mr-3 flex items-center justify-center text-xs font-bold shrink-0"
              >
                {user?.name?.charAt(0) ?? "?"}
              </motion.div>
              <div className="text-sm truncate min-w-0">
                <p className="font-medium text-white truncate">{user?.name ?? "Користувач"}</p>
                <p className="text-xs text-slate-400 truncate">{user?.role ?? ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <NotificationBell />
              <motion.button
                whileHover={hoverCapable ? { scale: 1.05, backgroundColor: "rgba(239,68,68,0.1)" } : undefined}
                whileTap={{ scale: 0.95 }}
                transition={TRANSITION.tap}
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-colors text-xs font-medium shrink-0 px-2.5 py-2 rounded-lg"
                title="Вийти"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </aside>

      <main
        className="flex-1 relative w-full min-w-0 md:pb-0 overflow-y-auto"
        style={{
          marginTop: isMobile ? "calc(3.5rem + env(safe-area-inset-top, 0px))" : undefined,
          paddingBottom: isMobile ? "calc(3.5rem + env(safe-area-inset-bottom, 0px))" : undefined,
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: DUR.normal, ease: EASE.decelerate }}
            style={{ willChange: "opacity" }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNavigationBar />
      <OnboardingTour />
    </div>
  );
}