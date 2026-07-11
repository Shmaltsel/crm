import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  activeTab: string;
  onChange: (tab: string) => void;
}

const TABS = [
  { key: "events", label: "Події" },
  { key: "notes", label: "Нотатки" },
  { key: "details", label: "Деталі" },
] as const;

export default function FloatingMobileNav({ activeTab, onChange }: Props) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="md:hidden fixed z-50 bottom-[calc(112px+env(safe-area-inset-bottom,0px))] right-5 w-11 h-11 bg-surface border border-border-strong text-content-secondary rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      <nav className="md:hidden fixed z-50 left-1/2 -translate-x-1/2 bottom-[calc(60px+env(safe-area-inset-bottom,0px)+8px)] bg-surface/90 backdrop-blur-md border border-border-strong rounded-full shadow-lg flex items-center gap-1 px-2 py-1.5">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors ${
              activeTab === tab.key
                ? "bg-brand text-white"
                : "text-content-muted active:bg-surface-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </>
  );
}
