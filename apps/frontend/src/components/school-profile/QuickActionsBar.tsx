import { useMemo } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "../../lib/motion";
import PhoneLink from "../PhoneLink";
import type { SchoolProfileData } from "../../types";
import type { Event } from "../../types";

interface QuickActionsBarProps {
  schoolData: SchoolProfileData;
  completedEvents: Event[];
}

export default function QuickActionsBar({ schoolData, completedEvents }: QuickActionsBarProps) {
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
    <div className="xl:hidden space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-content-primary truncate">
            {schoolData.director || "Директор не вказаний"}
          </p>
          {schoolData.phone && (
            <p className="text-xs text-content-muted truncate mt-0.5">
              <PhoneLink phone={schoolData.phone} className="hover:text-brand transition-colors" />
            </p>
          )}
        </div>
        <button className="w-11 h-11 shrink-0 bg-surface border border-border-strong rounded-full flex items-center justify-center shadow-sm active:bg-surface-muted active:scale-95 transition-all">
          <PhoneLink phone={schoolData.phone} />
        </button>
      </div>

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