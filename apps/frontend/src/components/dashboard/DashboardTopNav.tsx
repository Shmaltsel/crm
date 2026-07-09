import { motion } from "framer-motion";
import type { DashboardTab } from "../../constants/navTabs";

interface Props {
  tabs: DashboardTab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function DashboardTopNav({ tabs, activeTab, onChange }: Props) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <nav
        className="flex overflow-x-auto no-scrollbar gap-1 px-4 md:px-8"
        role="tablist"
        aria-label="Вкладки дашборду"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              className={`relative flex items-center gap-2 px-3 py-3.5 text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                isActive
                  ? "text-brand"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="dashboard-active-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
