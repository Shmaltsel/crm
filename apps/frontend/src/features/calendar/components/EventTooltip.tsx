import type { Event as CalendarEvent } from "../../../types";

interface EventTooltipProps {
  event: CalendarEvent;
}

export default function EventTooltip({ event: ev }: EventTooltipProps) {
  return (
    <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white p-3 rounded-xl shadow-2xl opacity-0 invisible group-hover/event:opacity-100 group-hover/event:visible transition-all duration-200 pointer-events-none">
      <p className="font-bold text-sm mb-1 truncate">
        {ev.school?.name || "Невідомий заклад"}
      </p>
      <div className="space-y-1 text-xs text-slate-300">
        <p>
          <span className="text-slate-400">Проєкт:</span>{" "}
          {ev.project}
        </p>
        <p>
          <span className="text-slate-400">Екіпаж:</span>{" "}
          {ev.crew?.name || "Не призначено"}
        </p>
        <p>
          <span className="text-slate-400">Час:</span>{" "}
          <span className="font-bold text-white">
            {ev.time || "—"}
          </span>
        </p>
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-800"></div>
    </div>
  );
}
