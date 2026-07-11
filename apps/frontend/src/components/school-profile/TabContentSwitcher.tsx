import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideXVariants, DUR, EASE, useLightMotion } from "../../lib/motion";

type TabKey = "events" | "notes" | "details";

interface TabContentSwitcherProps {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
  children: {
    events: React.ReactNode;
    notes: React.ReactNode;
    details: React.ReactNode;
  };
}

const TABS_ORDER: TabKey[] = ["events", "notes", "details"];

export default function TabContentSwitcher({
  activeTab,
  onChange,
  children,
}: TabContentSwitcherProps) {
  const lightMotion = useLightMotion();
  const [direction, setDirection] = useState(0);

  const handleDragEnd = useCallback(
    (_, info: { offset: { x: number } }) => {
      if (Math.abs(info.offset.x) > 60) {
        const currentIndex = TABS_ORDER.indexOf(activeTab);
        const newIndex = currentIndex + (info.offset.x > 0 ? -1 : 1);
        if (newIndex >= 0 && newIndex < TABS_ORDER.length) {
          const nextTab = TABS_ORDER[newIndex];
          setDirection(info.offset.x > 0 ? -1 : 1);
          onChange(nextTab);
        }
      }
    },
    [activeTab, onChange],
  );

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="xl:hidden"
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeTab}
          variants={slideXVariants}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          {children[activeTab]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}