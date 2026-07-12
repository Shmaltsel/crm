import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useHoverCapable } from "../lib/motion";
import { GraduationCap } from "lucide-react";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Дашборд",
  "/schools": "Школи",
  "/kindergartens": "Садочки",
  "/finance": "Фінанси",
  "/calendar": "Календар",
  "/cities": "Міста",
  "/employees": "Працівники",
  "/analytics": "Аналітика",
  "/inventory": "Склад",
  "/reports/review": "Звіти",
  "/city-leaderboard": "Рейтинг",
};

export default function MobileTopNav() {
  const hoverCapable = useHoverCapable();
  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();
  const location = useLocation();

  const pageTitle =
    PAGE_TITLES[location.pathname] ??
    Object.entries(PAGE_TITLES).find(([path]) => location.pathname.startsWith(path))?.[1] ??
    "Світло Знань";

  return (
    <div
      className="md:hidden fixed top-0 left-0 right-0 bg-nav text-white flex items-center justify-between px-4 z-50"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)", height: "calc(3.5rem + env(safe-area-inset-top, 0px))" }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <motion.div
          whileHover={hoverCapable ? { rotate: -10 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <GraduationCap className="w-5 h-5 text-blue-300 shrink-0" />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.span
            key={location.pathname}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-bold tracking-wider text-sm leading-tight truncate"
          >
            {pageTitle}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2">
        <NotificationBell />
        {(user?.role === "SUPERADMIN" || user?.role === "MANAGER" || user?.role === "OWNER") && (
          <Link to="/cities" className="text-xs text-blue-300/80 whitespace-nowrap hover:text-blue-200 transition-colors transition-transform active:scale-95">
            {selectedCity.name}
          </Link>
        )}
      </div>
    </div>
  );
}
