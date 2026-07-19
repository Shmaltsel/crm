import type { Event as CalendarEvent } from "../../../types";

interface EventTooltipProps {
  event: CalendarEvent;
  children: React.ReactNode;
}

export default function EventTooltip({ event: ev, children }: EventTooltipProps) {
  return (
    <div className="relative group/event z-0 hover:z-50">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-neutral-800 text-white p-3 rounded-xl shadow-2xl pointer-events-none opacity-0 group-hover/event:opacity-100 transition-opacity duration-150 z-[9999]">
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
      </div>
    </div>
  );
}
