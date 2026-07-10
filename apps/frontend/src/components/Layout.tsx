import { Link, useOutlet, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Layout() {
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
    <div className="flex h-dvh bg-surface-subtle font-sans">
      <MobileTopNav />

      <aside className="hidden md:flex md:relative w-64 flex-col bg-[#0B1527] text-white shrink-0">
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
              <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold shrink-0">
                {user?.name?.charAt(0) ?? "?"}
              </div>
              <div className="text-sm truncate min-w-0">
                <p className="font-medium text-white truncate">{user?.name ?? "Користувач"}</p>
                <p className="text-xs text-slate-400 truncate">{user?.role ?? ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <NotificationBell />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-colors text-xs font-medium shrink-0 px-2.5 py-2 rounded-lg"
                title="Вийти"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main
        className={`flex-1 relative w-full min-w-0 md:pb-0 ${isMobile ? "" : "overflow-y-auto"}`}
        style={{
          marginTop: isMobile ? "calc(3.5rem + env(safe-area-inset-top, 0px))" : undefined,
          paddingBottom: isMobile ? "calc(3.5rem + env(safe-area-inset-bottom, 0px))" : undefined,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            style={{ willChange: "opacity" }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNavigationBar />
    </div>
  );
}