import { Link, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { NAV_TABS } from "../constants/navTabs";
import { useFilteredTabs } from "./BottomNavigationBar";
import { useSelectedCity } from "../context/CityContext";

export default function MobileTopNav() {
  const location = useLocation();
  const tabs = useFilteredTabs();
  const { selectedCity } = useSelectedCity();

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1527] text-white flex items-center justify-center z-40 px-2">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 justify-start">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.to);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-colors
                ${isActive ? "bg-blue-600 text-white" : "text-blue-300/70 hover:text-white hover:bg-blue-800/30"}`}
              aria-label={tab.label}
            >
              <Icon className="w-4 h-4" />
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 shrink-0 mx-2">
        <GraduationCap className="w-4 h-4 text-blue-300" />
        <div className="flex flex-col items-center leading-tight">
          <span className="font-bold tracking-wider text-[10px]">
            СВІТЛО ЗНАНЬ
          </span>
          <span className="text-[8px] text-blue-300/80 whitespace-nowrap">
            {selectedCity.name}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 justify-end">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.to);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-colors
                ${isActive ? "bg-blue-600 text-white" : "text-blue-300/70 hover:text-white hover:bg-blue-800/30"}`}
              aria-label={tab.label}
            >
              <Icon className="w-4 h-4" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
