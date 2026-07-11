import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";
import { backdropVariants, modalContentVariants, SPRING, TRANSITION } from "../../lib/motion";

type Variant = "danger" | "warning";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: Variant;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantStyles: Record<Variant, { icon: string; button: string }> = {
  danger: {
    icon: "bg-danger-50 text-danger",
    button: "bg-danger hover:bg-danger-600 text-white",
  },
  warning: {
    icon: "bg-warning-50 text-warning-600",
    button: "bg-warning hover:bg-warning-600 text-white",
  },
};

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Підтвердити",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => confirmRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") { e.preventDefault(); onConfirm(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onCancel, onConfirm]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-backdrop backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onCancel}
          whileTap={{ backgroundColor: "rgba(15, 23, 42, 0.55)" }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-modal shadow-modal w-full max-w-sm p-6"
          >
            <div className="flex items-start gap-4">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${variantStyles[variant].icon}`}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ ...SPRING.bouncy, delay: 0.15 }}
              >
                {variant === "danger" ? <Trash2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 id="confirm-dialog-title" className="text-lg font-bold text-content-primary">{title}</h3>
                <p className="text-sm text-content-secondary mt-1">{message}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <motion.button
                onClick={onCancel}
                className="flex-1 py-2.5 rounded-control text-sm font-semibold bg-surface-muted text-content-secondary hover:bg-border-strong transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={TRANSITION.hover}
              >
                Скасувати
              </motion.button>
              <motion.button
                ref={confirmRef}
                onClick={onConfirm}
                className={`flex-1 py-2.5 rounded-control text-sm font-semibold transition-colors ${variantStyles[variant].button}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={TRANSITION.hover}
              >
                {confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
