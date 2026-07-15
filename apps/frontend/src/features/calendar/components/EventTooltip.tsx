import type { Event as CalendarEvent } from "../../../types";

interface EventTooltipProps {
  event: CalendarEvent;
}

export default function EventTooltip({ event: ev }: EventTooltipProps) {
  return (
    <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-neutral-800 text-white p-3 rounded-xl shadow-2xl opacity-0 invisible group-hover/event:opacity-100 group-hover/event:visible transition-all duration-200 pointer-events-none z-50">
      <p className="font-bold text-sm mb-1 leading-tight">
        {ev.school?.name || "Невідомий заклад"}
      </p>
      {ev.address && (
        <p className="text-[11px] text-neutral-400 mb-1.5 leading-tight">{ev.address}</p>
      )}
      <div className="space-y-1 text-xs text-neutral-300">
        <p>
          <span className="text-neutral-500">Проєкт:</span>{" "}
          {ev.project}
        </p>
        <p>
          <span className="text-neutral-500">Екіпаж:</span>{" "}
          {ev.crew?.name || "Не призначено"}
        </p>
        <p>
          <span className="text-neutral-500">Час:</span>{" "}
          <span className="font-bold text-white">
            {ev.time || "—"}
          </span>
        </p>
        {ev.childrenPlanned != null && ev.childrenPlanned > 0 && (
          <p>
            <span className="text-neutral-500">Дітей:</span>{" "}
            {ev.childrenPlanned}
          </p>
        )}
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-neutral-800"></div>
    </div>
  );
}
