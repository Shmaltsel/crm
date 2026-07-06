export const toISODate = (d: Date) => d.toLocaleDateString("en-CA");

export const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

export const getFirstDayOfMonth = (year: number, month: number) => {
  let day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

export const isPastDay = (date: Date) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return date < startOfToday;
};

export const buildMonthDays = (
  year: number,
  month: number,
): (Date | null)[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
  return days;
};
