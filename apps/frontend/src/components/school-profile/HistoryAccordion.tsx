import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HistoryTimeline from "./HistoryTimeline";
import type { Event, EventHistory } from "../../types";

interface Props {
  currentEvent: Event | null;
  onHistoryClick: (item: EventHistory) => void;
  onAddCommentClick: () => void;
}

export default function HistoryAccordion({ currentEvent, onHistoryClick, onAddCommentClick }: Props) {
  const [expanded, setExpanded] = useState(false);
  const count = currentEvent?.history?.length ?? 0;

  return (
    <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left active:bg-surface-muted transition-colors"
      >
        <span className="text-sm font-semibold text-content-primary">
          Історія взаємодій{count > 0 ? ` (${count})` : ""}
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-content-muted text-lg"
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              <HistoryTimeline
                currentEvent={currentEvent}
                onHistoryClick={onHistoryClick}
                onAddCommentClick={onAddCommentClick}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
