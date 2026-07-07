import { useRef, useCallback, useState } from "react";

export function useLongPress(onTrigger: (day: Date) => void, delay = 550) {
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);
  const [pressingDay, setPressingDay] = useState<Date | null>(null);
  const [triggeredDay, setTriggeredDay] = useState<Date | null>(null);

  const startLongPress = useCallback(
    (day: Date) => {
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

  const cancelLongPress = useCallback(() => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    longPressFired.current = false;
    setPressingDay(null);
  }, []);

  const wasLongPress = useCallback(() => {
    if (longPressFired.current) {
      longPressFired.current = false;
      return true;
    }
    return false;
  }, []);

  return { startLongPress, cancelLongPress, wasLongPress, pressingDay, triggeredDay };
}
