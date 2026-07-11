import { motion, AnimatePresence } from "framer-motion";
import { DUR, EASE } from "../../lib/motion";

interface LoadingBarProps {
  isLoading: boolean;
}

export function LoadingBar({ isLoading }: LoadingBarProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: DUR.slow, ease: EASE.outExpo }}
          className="fixed top-0 left-0 right-0 z-modal h-0.5 bg-brand origin-left"
        >
          <motion.div
            className="absolute inset-0 bg-brand-300"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
