import type { DashboardTab } from "../../constants/navTabs";

interface Props {
  tabs: DashboardTab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function DashboardTopNav({ tabs, activeTab, onChange }: Props) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 md:backdrop-blur-md border-b border-border">
      <div className="relative">
        <nav
          className="flex overflow-x-auto no-scrollbar gap-0.5 px-4 md:px-8"
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
                className={`relative flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors transition-transform shrink-0 active:scale-90 ${
                  isActive
                    ? "text-brand"
                    : "text-content-muted hover:text-content-secondary"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-pill transition-opacity duration-150 ease-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
