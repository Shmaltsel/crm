import { useState, useMemo } from "react";
import { buildMonthDays, toISODate } from "../utils/date";

export function useCalendarMonth() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMobileDate, setSelectedMobileDate] = useState<Date>(
    new Date(),
  );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  const today = () => {
    setCurrentDate(new Date());
    setSelectedMobileDate(new Date());
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => buildMonthDays(year, month), [year, month]);

  const monthFrom = toISODate(new Date(year, month, 1));
  const monthTo = toISODate(new Date(year, month + 1, 0));

  return {
    currentDate,
    setCurrentDate,
    selectedMobileDate,
    setSelectedMobileDate,
    nextMonth,
    prevMonth,
    today,
    year,
    month,
    days,
    monthFrom,
    monthTo,
  };
}
