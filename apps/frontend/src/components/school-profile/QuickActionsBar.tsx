import { useMemo } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "../../lib/motion";
import type { Event } from "../../types";

interface QuickActionsBarProps {
  completedEvents: Event[];
}

export default function QuickActionsBar({ completedEvents }: QuickActionsBarProps) {
  const stats = useMemo(() => {
    const totalRevenue = completedEvents.reduce((sum, ev) => {
      return sum + Number(ev.report?.totalSum || ev.price || 0);
    }, 0);
    const totalProfit = completedEvents.reduce((sum, ev) => {
      return sum + Number(ev.report?.remainderSum || 0);
    }, 0);
    return {
      eventsCount: completedEvents.length,
      revenue: totalRevenue,
      profit: totalProfit,
    };
  }, [completedEvents]);

  const displayEvents = useCountUp(stats.eventsCount, { duration: 0.8, decimals: 0 });
  const displayRevenue = useCountUp(stats.revenue, { duration: 0.8, decimals: 0 });
  const displayProfit = useCountUp(stats.profit, { duration: 0.8, decimals: 0 });

  const formatNumber = (num: number) => new Intl.NumberFormat("uk-UA").format(Math.round(num));

  return (
    <div className="xl:hidden">
      <div className="grid grid-cols-3 gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="bg-surface rounded-card border border-border p-4 text-center"
          aria-label={`Кількість подій: ${stats.eventsCount}`}
        >
          <p className="text-2xl font-bold text-content-primary">
            {formatNumber(displayEvents)}
          </p>
          <p className="text-xs text-content-muted mt-0.5">Подій</p>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          className="bg-surface rounded-card border border-border p-4 text-center"
          aria-label={`Виручка: ${formatNumber(stats.revenue)} грн`}
        >
          <p className="text-2xl font-bold text-content-primary">
            {formatNumber(displayRevenue)}
          </p>
          <p className="text-xs text-content-muted mt-0.5">Виручка</p>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          className="bg-surface rounded-card border border-border p-4 text-center"
          aria-label={`Прибуток: ${formatNumber(stats.profit)} грн`}
        >
          <p className="text-2xl font-bold text-success-600">
            {formatNumber(displayProfit)}
          </p>
          <p className="text-xs text-content-muted mt-0.5">Прибуток</p>
        </motion.button>
      </div>
    </div>
  );
}