import { Link, useOutlet } from "react-router-dom";
import { useState } from "react";
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
  Menu,
  X,
  LogOut,
} from "lucide-react";

function NavLink({
  to,
  icon: Icon,
  label,
  onClick,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}) {
  const location = useLocation();
  const active = location.pathname.startsWith(to);
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

export default function Layout() {
  const outlet = useOutlet();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const is = (roles: string[]) => !!user?.role && roles.includes(user.role);
  const { selectedCity } = useSelectedCity();

  const handleLogout = async () => {
    await logout();
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-surface-subtle font-sans">
      {/* Мобільний хедер */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1527] text-white flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          <span className="font-semibold tracking-wider text-sm">
            СВІТЛО ЗНАНЬ
          </span>
          <span className="text-xs text-blue-300 ml-1">
            · {selectedCity.name}
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
          aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Оверлей для мобільного меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Сайдбар */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1527] text-white flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 flex flex-col items-center border-b border-slate-700/50 hidden md:flex">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
          <p className="text-xs text-blue-300 mt-1 tracking-wide flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {selectedCity.name}
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-16 md:mt-0">
          {is(["SUPERADMIN", "MANAGER"]) && (
            <NavLink to="/dashboard" icon={Home} label="Дашборд" onClick={closeMenu} />
          )}
          {is(["SUPERADMIN"]) && (
            <NavLink to="/cities" icon={MapPin} label="Міста" onClick={closeMenu} />
          )}
          <NavLink to="/schools" icon={School} label="Школи" onClick={closeMenu} />
          <NavLink to="/kindergartens" icon={Baby} label="Садочки" onClick={closeMenu} />
          <NavLink to="/finance" icon={Wallet} label="Фінанси" onClick={closeMenu} />
          <NavLink to="/calendar" icon={Calendar} label="Календар" onClick={closeMenu} />
          {is(["SUPERADMIN"]) && (
            <NavLink to="/employees" icon={Users} label="Працівники" onClick={closeMenu} />
          )}
        </nav>

        <div className="p-4 border-t border-slate-700/50 pb-8 md:pb-4">
          <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold shrink-0">
                {user?.name?.charAt(0) ?? "?"}
              </div>
              <div className="text-sm truncate min-w-0">
                <p className="font-medium text-white truncate">
                  {user?.name ?? "Користувач"}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {user?.role ?? ""}
                </p>
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

      {/* Головна область */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden mt-16 md:mt-0 relative w-full min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onAnimationComplete={() =>
              window.dispatchEvent(new Event("resize"))
            }
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
