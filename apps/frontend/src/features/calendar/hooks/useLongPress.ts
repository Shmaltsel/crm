import { useRef, useCallback, useState } from "react";

const MOVE_THRESHOLD = 10;

export function useLongPress(onTrigger: (day: Date) => void, delay = 550) {
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const [pressingDay, setPressingDay] = useState<Date | null>(null);
  const [triggeredDay, setTriggeredDay] = useState<Date | null>(null);

  const startLongPress = useCallback(
    (day: Date, clientX?: number, clientY?: number) => {
      touchStartPos.current = clientX != null && clientY != null ? { x: clientX, y: clientY } : null;
      longPressFired.current = false;
      setPressingDay(day);
      pressTimer.current = setTimeout(() => {
        longPressFired.current = true;
        setPressingDay(null);
        setTriggeredDay(day);
        setTimeout(() => setTriggeredDay(null), 350);
        if ("vibrate" in navigator) navigator.vibrate(15);
        onTrigger(day);
      }, delay);
    },
    [onTrigger, delay],
  );

  const cancelLongPress = useCallback(
    (clientX?: number, clientY?: number) => {
      if (clientX != null && clientY != null && touchStartPos.current) {
        const dx = clientX - touchStartPos.current.x;
        const dy = clientY - touchStartPos.current.y;
        if (Math.hypot(dx, dy) <= MOVE_THRESHOLD) return;
      }
      if (pressTimer.current) clearTimeout(pressTimer.current);
      touchStartPos.current = null;
      longPressFired.current = false;
      setPressingDay(null);
    },
    [],
  );

  const wasLongPress = useCallback(() => {
    if (longPressFired.current) {
      longPressFired.current = false;
      return true;
    }
    return false;
  }, []);

  return { startLongPress, cancelLongPress, wasLongPress, pressingDay, triggeredDay };
}
