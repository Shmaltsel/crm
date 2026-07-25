export interface ChartLine {
  key: string;
  label: string;
  color: string;
}

export interface DailyRevenuePoint {
  date: string;
  revenue: number;
  profit: number;
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  profit: number;
  expenses: number;
}

export type YAxisMode = 'adaptive' | 'stable';

export interface EChartsRevenueChartProps {
  data: DailyRevenuePoint[];
  lines?: ChartLine[];
  chartId?: string;
  yAxisMode?: YAxisMode;
  className?: string;
}
