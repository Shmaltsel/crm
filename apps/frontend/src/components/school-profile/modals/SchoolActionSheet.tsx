import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";
import { backdropVariants, modalContentVariants, SPRING } from "../../../lib/motion";

interface SchoolActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onAddEvent: () => void;
  stages?: Array<{ id: number; key: string; name: string }>;
  currentStageIndex?: number;
  onStageSelect?: (stageId: number) => void;
}

export default function SchoolActionSheet({
  isOpen,
  onClose,
  onEdit,
  onAddEvent,
  stages,
  currentStageIndex,
  onStageSelect,
}: SchoolActionSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDragEnd = (_: any, info: { offset: { y: number } }) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const showStages = stages && stages.length > 0 && onStageSelect;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            ref={sheetRef}
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-3xl pb-nav shadow-2xl"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
            role="dialog"
            aria-modal="true"
            aria-label={showStages ? "Етапи пайплайну" : "Дії зі школою"}
          >
            <div className="w-10 h-1.5 bg-border-strong rounded-full mx-auto mt-3 mb-4" />
            <div className="px-6 pb-4 space-y-2">
              {showStages ? (
                <>
                  <h3 className="font-bold text-content-primary pb-2 border-b border-border">Етапи пайплайну</h3>
                  <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                    {stages!.map((stage, index) => (
                      <button
                        key={stage.id}
                        onClick={() => onStageSelect!(stage.id)}
                        disabled={index > currentStageIndex! + 1}
                        className={`w-full flex items-center gap-3 px-4 py-4 text-left text-content-primary bg-surface border border-border rounded-card hover:bg-surface-muted active:bg-surface-muted/50 transition-colors min-h-[52px] ${
                          index === currentStageIndex ? "bg-brand-subtle border-brand" : ""
                        } ${index > currentStageIndex! + 1 ? "opacity-40 cursor-not-allowed" : ""}`}
                      >
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 ${
                          index < currentStageIndex! ? "border-brand text-brand bg-surface" :
                          index === currentStageIndex! ? "border-brand bg-brand text-white" :
                          "border-border-strong text-content-muted bg-surface"
                        }`}>
                          {index < currentStageIndex! ? "✓" : stage.id}
                        </span>
                        <span className={`font-medium ${index === currentStageIndex! ? "text-brand" : ""}`}>
                          {stage.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { onEdit(); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-4 text-left text-content-primary bg-surface border border-border rounded-card hover:bg-surface-muted active:bg-surface-muted/50 transition-colors min-h-[52px]"
                  >
                    <span className="text-lg">✏️</span>
                    <span className="font-medium text-base">Редагувати</span>
                  </button>
                  <button
                    onClick={() => { onAddEvent(); onClose(); }}
                    className="w-full flex items-center gap-3 px-4 py-4 text-left text-content-primary bg-surface border border-border rounded-card hover:bg-surface-muted active:bg-surface-muted/50 transition-colors min-h-[52px]"
                  >
                    <span className="text-lg">＋</span>
                    <span className="font-medium text-base">Додати подію</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}