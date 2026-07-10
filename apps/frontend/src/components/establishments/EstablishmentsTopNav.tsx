import { motion } from "framer-motion";
import { School, Baby } from "lucide-react";

interface Props {
  activeTab: string;
  onChange: (id: string) => void;
}

const ESTABLISHMENT_TABS = [
  { id: "school", icon: School, label: "Школи" },
  { id: "kindergarten", icon: Baby, label: "Садочки" },
];

export default function EstablishmentsTopNav({ activeTab, onChange }: Props) {
  return (
    <div className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-border">
      <nav
        className="flex px-4 md:px-8"
        role="tablist"
        aria-label="Вкладки закладів"
      >
        {ESTABLISHMENT_TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              className={`relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors ${
                isActive
                  ? "text-brand"
                  : "text-content-muted hover:text-content-secondary"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="establishment-active-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
