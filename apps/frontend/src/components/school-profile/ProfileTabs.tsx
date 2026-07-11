import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPRING, DUR, EASE, useLightMotion } from "../../lib/motion";

interface ProfileTabsProps {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}

export default function ProfileTabs({
  tabs,
  active,
  onChange,
}: ProfileTabsProps) {
  const lightMotion = useLightMotion();

  const tabVariants = useMemo(
    () => ({
      inactive: { x: 0 },
      active: {
        x: 0,
        transition: lightMotion
          ? { duration: DUR.fast, ease: EASE.standard }
          : { ...SPRING.snappy },
      },
    }),
    [lightMotion],
  );

  return (
    <div
      className="flex items-center gap-2 p-1 bg-surface-muted rounded-pill xl:hidden"
      role="tablist"
    >
      <AnimatePresence mode="popLayout">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.key}
            layoutId={active === tab.key ? "profile-tab-pill" : undefined}
            variants={tabVariants}
            initial="inactive"
            animate={active === tab.key ? "active" : "inactive"}
            onClick={() => onChange(tab.key)}
            role="tab"
            aria-selected={active === tab.key}
            aria-label={tab.label}
            className={`relative z-10 min-h-[44px] px-4 py-2 text-sm font-medium rounded-pill transition-colors ${
              active === tab.key
                ? "bg-brand text-white shadow-sm z-20"
                : "bg-transparent text-content-secondary hover:text-content-primary"
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
