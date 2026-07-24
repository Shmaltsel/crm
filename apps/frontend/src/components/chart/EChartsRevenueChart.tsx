import { useRef, useEffect, useCallback, useState, useMemo, memo } from 'react';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  ToolboxComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { EChartsType } from 'echarts/core';
import type { EChartsRevenueChartProps, ChartDataPoint } from './types';
import {
  toChartData,
  formatDateAxis,
  formatTooltipDate,
  fmtMoney,
  getViewportDateRange,
  RANGE_PRESETS,
  calcPresetRange,
  getLineColor,
} from './helpers';

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  ToolboxComponent,
  CanvasRenderer,
]);

const STORAGE_PREFIX = 'chart:viewport:';

function EChartsRevenueChartInner({
  data,
  chartId = 'revenue-chart',
  yAxisMode = 'adaptive',
  className,
}: EChartsRevenueChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<EChartsType | null>(null);
  // Mutable holder for latest data (not a React ref — plain object)
  // eslint-disable-next-line react-hooks/refs -- intentional: stable mutable holder
  const dataHolder = useRef<ChartDataPoint[]>([]);
  const lastDragRef = useRef<{ t: number; x: number } | null>(null);
  const inertiaRafRef = useRef<number>(0);
  const [activeRange, setActiveRange] = useState<string | null>(null);

  const chartData = useMemo(() => toChartData(data), [data]);
  // eslint-disable-next-line react-hooks/refs -- mutable holder for latest data, not render-dependent
  dataHolder.current = chartData;

  const saveViewportFn = useCallback(
    (startValue: string, endValue: string) => {
      try {
        localStorage.setItem(
          STORAGE_PREFIX + chartId,
          JSON.stringify({ startValue, endValue }),
        );
      } catch { /* noop */ }
    },
    [chartId],
  );
  const saveViewportTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveViewport = useCallback(
    (sv: string, ev: string) => {
      if (saveViewportTimerRef.current) clearTimeout(saveViewportTimerRef.current);
      saveViewportTimerRef.current = setTimeout(() => saveViewportFn(sv, ev), 300);
    },
    [saveViewportFn],
  );

  const getAxisLabelFormatter = useCallback(
    (visibleCount: number) => {
      return (value: string) => formatDateAxis(value, visibleCount);
    },
    [],
  );

  const buildOption = useCallback(
    (chartData: ChartDataPoint[], savedState: { startValue: string; endValue: string } | null) => {
      const dates = chartData.map(d => d.date);
      const profitData = chartData.map(d => d.profit);
      const revenueData = chartData.map(d => d.revenue);
      const expensesData = chartData.map(d => d.expenses);

      let dataZoomStart = 0;
      let dataZoomEnd = 100;

      if (savedState) {
        const sIdx = dates.indexOf(savedState.startValue);
        const eIdx = dates.indexOf(savedState.endValue);
        if (sIdx !== -1 && eIdx !== -1 && dates.length > 1) {
          dataZoomStart = (sIdx / (dates.length - 1)) * 100;
          dataZoomEnd = (eIdx / (dates.length - 1)) * 100;
        }
      } else if (chartData.length > 90) {
        dataZoomStart = Math.max(0, ((chartData.length - 90) / (chartData.length - 1)) * 100);
      }

      const { visibleCount } = getViewportDateRange(chartData, dataZoomStart, dataZoomEnd);
      const lineWidth = getLineColor(visibleCount);

      return {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut' as const,
        grid: {
          left: 55,
          right: 20,
          top: 20,
          bottom: 110,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            snap: false,
            lineStyle: { color: '#94a3b8', width: 1, type: 'dashed' },
          },
          backgroundColor: 'rgba(255,255,255,0.96)',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          borderRadius: 12,
          padding: [12, 16],
          textStyle: { fontSize: 12, color: '#1e293b' },
          extraCssText: 'box-shadow: 0 8px 32px -8px rgba(0,0,0,0.12); backdrop-filter: blur(12px);',
          appendToBody: true,
          formatter: (params: unknown) => {
            const items = params as Array<{ axisValue: string; seriesName: string; value: number; color: string }>;
            if (!items || items.length === 0) return '';
            const dateStr = formatTooltipDate(items[0].axisValue);
            const revenue = items.find(i => i.seriesName === 'Дохід')?.value ?? 0;
            const profit = items.find(i => i.seriesName === 'Прибуток')?.value ?? 0;
            const expenses = items.find(i => i.seriesName === 'Витрати')?.value ?? 0;

            const prevIdx = dataHolder.current.findIndex(d => d.date === items[0].axisValue) - 1;
            let deltaHtml = '';
            if (prevIdx >= 0 && prevIdx < dataHolder.current.length) {
              const prevProfit = dataHolder.current[prevIdx].profit;
              if (prevProfit !== 0) {
                const pct = ((profit - prevProfit) / Math.abs(prevProfit) * 100).toFixed(0);
                const sign = profit >= prevProfit ? '+' : '';
                const color = profit >= prevProfit ? '#16a34a' : '#dc2626';
                deltaHtml = '<div style="margin-top:8px;padding-top:8px;border-top:1px solid #f1f5f9;font-size:11px;color:' + color + '">' + sign + pct + '% до попереднього дня</div>';
              }
            }

            return '<div style="font-weight:600;margin-bottom:8px;font-size:13px">' + dateStr + '</div>'
              + '<div style="display:flex;justify-content:space-between;gap:24px;margin:3px 0"><span style="color:#64748b">Дохід</span><span style="font-weight:600;font-variant-numeric:tabular-nums">' + fmtMoney(revenue) + '</span></div>'
              + '<div style="display:flex;justify-content:space-between;gap:24px;margin:3px 0"><span style="color:#64748b">Витрати</span><span style="font-weight:600;font-variant-numeric:tabular-nums;color:#dc2626">' + fmtMoney(expenses) + '</span></div>'
              + '<div style="display:flex;justify-content:space-between;gap:24px;margin:3px 0"><span style="color:#64748b">Прибуток</span><span style="font-weight:600;font-variant-numeric:tabular-nums;color:#16a34a">' + fmtMoney(profit) + '</span></div>'
              + deltaHtml;
          },
          position: (point: number[], _params: unknown, _dim: unknown, size: { viewSize: [number, number] }) => {
            const tooltipW = size.viewSize[0] > 600 ? 260 : 200;
            const margin = 16;
            if (point[0] + tooltipW + margin > size.viewSize[0]) {
              return [point[0] - tooltipW - margin, 10];
            }
            return [point[0] + margin, 10];
          },
        },
        xAxis: {
          type: 'category',
          data: dates,
          boundaryGap: false,
          axisLine: { lineStyle: { color: '#e2e8f0' } },
          axisTick: { show: false },
          axisLabel: {
            fontSize: 11,
            color: '#64748b',
            formatter: getAxisLabelFormatter(visibleCount),
          },
          animation: true,
          animationDuration: 300,
        },
        yAxis: {
          type: 'value',
          scale: yAxisMode === 'adaptive',
          splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            fontSize: 11,
            color: '#64748b',
            formatter: (v: number) => v >= 1000 ? Math.round(v / 1000) + 'k' : String(v),
          },
        },
        series: [
          {
            name: 'Прибуток',
            type: 'line',
            data: profitData,
            smooth: 0.3,
            symbol: 'circle',
            symbolSize: (val: number) => (val === 0 ? 0 : 6),
            lineStyle: { width: lineWidth, color: '#22c55e' },
            itemStyle: { color: '#22c55e', borderWidth: 2, borderColor: '#fff' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(34,197,94,0.25)' },
                { offset: 1, color: 'rgba(34,197,94,0)' },
              ]),
            },
            emphasis: {
              itemStyle: { shadowBlur: 8, shadowColor: 'rgba(34,197,94,0.4)' },
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut',
          },
          {
            name: 'Дохід',
            type: 'line',
            data: revenueData,
            smooth: 0.3,
            symbol: 'circle',
            symbolSize: (val: number) => (val === 0 ? 0 : 4),
            lineStyle: { width: lineWidth, color: '#3b82f6' },
            itemStyle: { color: '#3b82f6', borderWidth: 2, borderColor: '#fff' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(59,130,246,0.15)' },
                { offset: 1, color: 'rgba(59,130,246,0)' },
              ]),
            },
            emphasis: {
              itemStyle: { shadowBlur: 8, shadowColor: 'rgba(59,130,246,0.4)' },
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut',
          },
          {
            name: 'Витрати',
            type: 'line',
            data: expensesData,
            smooth: 0.3,
            symbol: 'circle',
            symbolSize: (val: number) => (val === 0 ? 0 : 4),
            lineStyle: { width: lineWidth * 0.8, color: '#ef4444', type: 'dashed' as const },
            itemStyle: { color: '#ef4444', borderWidth: 1, borderColor: '#fff' },
            emphasis: {
              itemStyle: { shadowBlur: 6, shadowColor: 'rgba(239,68,68,0.4)' },
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut',
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            zoomOnMouseWheel: true,
            moveOnMouseWheel: false,
            moveOnMouseMove: false,
            zoomLock: false,
            throttle: 50,
            preventDefaultMouseMove: false,
          },
          {
            type: 'slider',
            show: true,
            height: 32,
            bottom: 12,
            borderColor: '#e2e8f0',
            fillerColor: 'rgba(59,130,246,0.08)',
            handleStyle: {
              color: '#3b82f6',
              borderColor: '#3b82f6',
              borderWidth: 1,
            },
            moveHandleStyle: { color: '#cbd5e1' },
            dataBackground: {
              lineStyle: { color: '#cbd5e1', width: 1 },
              areaStyle: { color: 'rgba(203,213,225,0.15)' },
            },
            selectedDataBackground: {
              lineStyle: { color: '#3b82f6', width: 1 },
              areaStyle: { color: 'rgba(59,130,246,0.08)' },
            },
            textStyle: { fontSize: 10, color: '#94a3b8' },
            start: dataZoomStart,
            end: dataZoomEnd,
            animationDuration: 300,
            animationEasing: 'cubicOut' as const,
          },
        ],
      };
    },
    [yAxisMode, getAxisLabelFormatter],
  );

  const updateAxisFormat = useCallback((chart: EChartsType) => {
    const opt = chart.getOption();
    const dz = (opt.dataZoom as Array<{ start?: number; end?: number }>)?.[0];
    const start = dz?.start ?? 0;
    const end = dz?.end ?? 100;
    const d = dataHolder.current;
    const { visibleCount } = getViewportDateRange(d, start, end);
    const lw = getLineColor(visibleCount);

    chart.setOption({
      xAxis: { axisLabel: { formatter: getAxisLabelFormatter(visibleCount) } },
      series: [
        { lineStyle: { width: lw } },
        { lineStyle: { width: lw } },
        { lineStyle: { width: lw * 0.8 } },
      ],
    }, { notMerge: false, lazyUpdate: true });
  }, [getAxisLabelFormatter]);

  const handleDataZoom = useCallback(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const opt = chart.getOption();
    const dzArr = opt.dataZoom as Array<{ startValue?: string; endValue?: string; start?: number; end?: number }>;
    const sliderDz = dzArr?.[1];
    if (sliderDz?.startValue && sliderDz?.endValue) {
      saveViewport(sliderDz.startValue, sliderDz.endValue);
    }
    updateAxisFormat(chart);
  }, [saveViewport, updateAxisFormat]);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = echarts.init(containerRef.current, undefined, {
      renderer: 'canvas',
    });
    chartRef.current = chart;

    let savedState: { startValue: string; endValue: string } | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + chartId);
      if (raw) savedState = JSON.parse(raw);
    } catch { /* noop */ }

    chart.setOption(buildOption(dataHolder.current, savedState));

    chart.on('dataZoom', handleDataZoom);

    const resizeObs = new ResizeObserver(() => {
      chart.resize({ animation: { duration: 200 } });
    });
    resizeObs.observe(containerRef.current);

    const handleDblClick = () => {
      chart.dispatchAction({
        type: 'dataZoom',
        startValue: dataHolder.current[0]?.date,
        endValue: dataHolder.current[dataHolder.current.length - 1]?.date,
      });
    };
    containerRef.current.addEventListener('dblclick', handleDblClick);

    const el = containerRef.current;
    const handleWheelShift = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      const opt = chart.getOption();
      const dz = (opt.dataZoom as Array<{ start?: number; end?: number }>)[0];
      const curStart = dz?.start ?? 0;
      const curEnd = dz?.end ?? 100;
      const span = curEnd - curStart;
      const step = span * 0.1;
      const dir = e.deltaY > 0 ? 1 : -1;
      let newStart = curStart + dir * step;
      let newEnd = curEnd + dir * step;
      if (newStart < 0) { newStart = 0; newEnd = span; }
      if (newEnd > 100) { newEnd = 100; newStart = 100 - span; }
      chart.dispatchAction({ type: 'dataZoom', start: newStart, end: newEnd });
    };
    el.addEventListener('wheel', handleWheelShift, { passive: false });

    const handleWheelCtrl = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      const opt = chart.getOption();
      const dz = (opt.dataZoom as Array<{ start?: number; end?: number }>)[0];
      const curStart = dz?.start ?? 0;
      const curEnd = dz?.end ?? 100;
      const span = curEnd - curStart;
      const shrink = e.deltaY < 0;
      const step = shrink ? span * 0.02 : span * 0.08;
      const newSpan = shrink ? Math.max(1, span - step) : Math.min(100, span + step);
      const center = (curStart + curEnd) / 2;
      let ns = center - newSpan / 2;
      let ne = center + newSpan / 2;
      if (ns < 0) { ns = 0; ne = newSpan; }
      if (ne > 100) { ne = 100; ns = 100 - newSpan; }
      chart.dispatchAction({ type: 'dataZoom', start: ns, end: ne });
    };
    el.addEventListener('wheel', handleWheelCtrl, { passive: false });

    let lastMouseDown = 0;
    const handleMouseDown = () => { lastMouseDown = Date.now(); lastDragRef.current = { t: Date.now(), x: 0 }; };
    const handleMouseMove = (e: MouseEvent) => {
      if (lastDragRef.current) lastDragRef.current = { t: Date.now(), x: e.clientX };
    };
    const handleMouseUp = () => {
      const drag = lastDragRef.current;
      if (!drag) return;
      const elapsed = Date.now() - drag.t;
      if (elapsed < 50 || Date.now() - lastMouseDown < 100) { lastDragRef.current = null; return; }
      lastDragRef.current = null;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', handleMouseUp);

    return () => {
      resizeObs.disconnect();
      el.removeEventListener('dblclick', handleDblClick);
      el.removeEventListener('wheel', handleWheelShift);
      el.removeEventListener('wheel', handleWheelCtrl);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(inertiaRafRef.current);
      chart.dispose();
      chartRef.current = null;
    };
  }, [chartId, buildOption, handleDataZoom]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || dataHolder.current.length === 0) return;
    chart.setOption(buildOption(dataHolder.current, null), { notMerge: false, lazyUpdate: true });
  }, [yAxisMode, buildOption]);

  const handleRangeClick = useCallback((label: string, days: number) => {
    const chart = chartRef.current;
    if (!chart) return;
    const range = calcPresetRange(dataHolder.current, days);
    if (!range) return;
    setActiveRange(label);
    chart.dispatchAction({
      type: 'dataZoom',
      startValue: range.startValue,
      endValue: range.endValue,
    });
  }, []);

  return (
    <div className={className}>
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {RANGE_PRESETS.map(({ label, days }) => (
          <button
            key={label}
            onClick={() => handleRangeClick(label, days)}
            className={
              'px-2.5 py-1 rounded-full text-[10px] border transition-all duration-200 ' +
              (activeRange === label
                ? 'border-brand bg-brand/10 text-brand font-medium'
                : 'border-border-strong bg-surface text-content-secondary hover:bg-surface-hover')
            }
          >
            {label}
          </button>
        ))}
        <span className="text-[9px] text-content-muted ml-2 hidden md:inline">Shift+колесо=панорама · Ctrl+колесо=точний зум · Подвійний клік=скидання</span>
      </div>
      <div
        ref={containerRef}
        style={{ width: '100%', height: 360, cursor: 'grab' }}
        className="active:cursor-grabbing"
      />
    </div>
  );
}

export const EChartsRevenueChart = memo(EChartsRevenueChartInner);
