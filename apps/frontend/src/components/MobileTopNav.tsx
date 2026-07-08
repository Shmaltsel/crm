import { GraduationCap } from "lucide-react";
import { useSelectedCity } from "../context/CityContext";

export default function MobileTopNav() {
  const { selectedCity } = useSelectedCity();

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1527] text-white flex items-center justify-between px-4 z-40" style={{ paddingTop: "env(safe-area-inset-top, 0px)", height: "calc(4rem + env(safe-area-inset-top, 0px))" }}>
      <div className="flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-blue-300 shrink-0" />
        <span className="font-bold tracking-wider text-sm leading-tight">
          СВІТЛО ЗНАНЬ
        </span>
      </div>
      <span className="text-xs text-blue-300/80 whitespace-nowrap">
        {selectedCity.name}
      </span>
    </div>
  );
}
