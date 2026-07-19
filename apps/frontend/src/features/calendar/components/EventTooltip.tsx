import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import type { Event as CalendarEvent } from "../../../types";

interface EventTooltipProps {
  event: CalendarEvent;
  children: React.ReactNode;
}

export default function EventTooltip({ event: ev, children }: EventTooltipProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const show = useCallback(() => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: r.left, y: r.top });
  }, []);

  const hide = useCallback(() => setPos(null), []);

  return (
    <div
      ref={ref}
      className="relative group/event z-0 hover:z-50"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      {pos &&
        createPortal(
          <div
            className="fixed w-72 max-w-[min(288px,calc(100vw-2rem))] bg-neutral-800 text-white p-3 rounded-xl shadow-2xl pointer-events-none z-[9999]"
            style={{
              left: Math.max(8, Math.min(pos.x, window.innerWidth - 288 - 8)),
              top: pos.y > 200 ? pos.y - 120 : pos.y + 24,
            }}
          >
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
          </div>,
          document.body
        )}
    </div>
  );
}
