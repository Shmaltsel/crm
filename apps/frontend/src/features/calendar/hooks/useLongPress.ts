import { useRef, useCallback } from "react";

export function useLongPress(onTrigger: (day: Date) => void, delay = 550) {
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);

  const startLongPress = useCallback(
    (day: Date) => {
      longPressFired.current = false;
      pressTimer.current = setTimeout(() => {
        longPressFired.current = true;
        if ("vibrate" in navigator) navigator.vibrate(15);
        onTrigger(day);
      }, delay);
    },
    [onTrigger, delay],
  );

  const cancelLongPress = useCallback(() => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  }, []);

  const wasLongPress = useCallback(() => {
    if (longPressFired.current) {
      longPressFired.current = false;
      return true;
    }
    return false;
  }, []);

  return { startLongPress, cancelLongPress, wasLongPress };
}
