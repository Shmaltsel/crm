import type { DailyRevenuePoint, ChartDataPoint } from './types';

const UA_MONTHS = ['Січ','Лют','Бер','Кві','Трав','Чер','Лип','Сер','Вер','Жов','Лис','Гру'];
const UA_MONTHS_FULL = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
const UA_WEEKDAYS = ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'];

export function toChartData(points: DailyRevenuePoint[]): ChartDataPoint[] {
  return points.map(p => ({
    date: p.date,
    revenue: p.revenue,
    profit: p.profit,
    expenses: Math.max(0, p.revenue - p.profit),
  }));
}

export function formatDateAxis(dateStr: string, visibleCount: number): string {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  if (visibleCount > 365 * 4) return String(year);
  if (visibleCount > 365) return UA_MONTHS[month] + ' ' + String(year).slice(2);
  if (visibleCount > 60) return UA_MONTHS[month];
  if (visibleCount > 14) return day + ' ' + UA_MONTHS[month];
  return day + ' ' + UA_MONTHS[month] + ' (' + UA_WEEKDAYS[d.getDay()] + ')';
}

export function formatTooltipDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.getDate() + ' ' + UA_MONTHS_FULL[d.getMonth()] + ' ' + d.getFullYear();
}

export function fmtMoney(n: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency', currency: 'UAH',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(n);
}

export function getViewportDateRange(
  data: ChartDataPoint[],
  startPercent: number,
  endPercent: number,
): { startIdx: number; endIdx: number; visibleCount: number } {
  const len = data.length;
  if (len === 0) return { startIdx: 0, endIdx: 0, visibleCount: 0 };
  const startIdx = Math.floor((startPercent / 100) * (len - 1));
  const endIdx = Math.ceil((endPercent / 100) * (len - 1));
  return { startIdx, endIdx, visibleCount: endIdx - startIdx + 1 };
}

export const RANGE_PRESETS = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '3M', days: 91 },
  { label: '6M', days: 182 },
  { label: 'YTD', days: -1 },
  { label: '1Y', days: 365 },
  { label: 'ALL', days: 0 },
] as const;

export function calcPresetRange(
  data: ChartDataPoint[],
  days: number,
): { startValue: string; endValue: string } | null {
  if (data.length === 0) return null;
  const last = data[data.length - 1].date;
  const endDate = new Date(last);
  if (days === 0) {
    return { startValue: data[0].date, endValue: last };
  }
  if (days === -1) {
    const jan1 = new Date(endDate.getFullYear(), 0, 1);
    const s = data.find(d => new Date(d.date) >= jan1);
    return { startValue: s ? s.date : data[0].date, endValue: last };
  }
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - days);
  const s = data.find(d => new Date(d.date) >= startDate);
  return { startValue: s ? s.date : data[0].date, endValue: last };
}

export function getLineColor(visibleCount: number): number {
  if (visibleCount > 365) return 2;
  return 3;
}
