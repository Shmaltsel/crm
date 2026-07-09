import { Link, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

export default function MobileTopNav() {
  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();
  const location = useLocation();

  const pageTitle =
    location.pathname.startsWith("/schools") ? "Школи"
    : location.pathname.startsWith("/kindergartens") ? "Садочки"
    : "СВІТЛО ЗНАНЬ";

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-[#0B1527] text-white flex items-center justify-between px-4 z-40" style={{ paddingTop: "env(safe-area-inset-top, 0px)", height: "calc(4rem + env(safe-area-inset-top, 0px))" }}>
      <div className="flex items-center gap-2 min-w-0">
        <GraduationCap className="w-5 h-5 text-blue-300 shrink-0" />
        <span className="font-bold tracking-wider text-sm leading-tight truncate">
          {pageTitle}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <NotificationBell />
        {user?.role === "SUPERADMIN" || user?.role === "MANAGER" || user?.role === "OWNER" ? (
          <Link to="/cities" className="text-xs text-blue-300/80 whitespace-nowrap hover:text-blue-200 transition-colors">
            {selectedCity.name}
          </Link>
        ) : (
          <span className="text-xs text-blue-300/80 whitespace-nowrap">
            {selectedCity.name}
          </span>
        )}
      </div>
    </div>
  );
}
