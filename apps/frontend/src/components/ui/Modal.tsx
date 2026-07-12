import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useId, type ReactNode } from "react";
import { X } from "lucide-react";
import { backdropVariants, modalContentVariants } from "../../lib/motion";
import { useMobileModalOffsets } from "../../hooks/useMobileModalOffsets";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }: ModalProps) {
  const generatedId = useId();
  const headingId = `modal-${generatedId}`;
  const closeRef = useRef<HTMLButtonElement>(null);
  const mobileOffsets = useMobileModalOffsets();

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-backdrop md:backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          style={{
            paddingTop: mobileOffsets.paddingTop,
            paddingBottom: mobileOffsets.paddingBottom,
          }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`bg-surface rounded-t-3xl sm:rounded-modal shadow-modal w-full sm:${maxWidth} overflow-hidden max-h-[90vh] flex flex-col pb-nav`}
            style={{ willChange: "transform" }}
          >
            <div className="sm:hidden w-10 h-1.5 bg-border-strong rounded-pill mx-auto mt-3" />
            <div className="p-5 sm:p-6 border-b border-border flex justify-between items-center bg-surface-subtle shrink-0">
              <h3 id={headingId} className="text-lg font-bold text-content-primary">{title}</h3>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Закрити"
                className="p-2 -mr-2 text-content-muted hover:text-content-primary rounded-control transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
