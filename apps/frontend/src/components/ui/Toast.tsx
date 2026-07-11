import { createContext, useCallback, useContext, useState, useRef, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from "framer-motion";
import { DUR, EASE, SPRING } from "../../lib/motion";
import { X } from "lucide-react";

type ToastKind = "success" | "error" | "info";

interface ToastItem {
  id: number;
  msg: string;
  kind: ToastKind;
  duration: number;
}

const TOAST_DURATION = 4000;

const kindStyles: Record<ToastKind, string> = {
  success: "bg-success",
  error: "bg-danger",
  info: "bg-neutral-800",
};

const ToastContext = createContext<(msg: string, kind?: ToastKind) => void>(() => {});

export const useToast = () => useContext(ToastContext);

function ToastItemView({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: number) => void }) {
  const progress = useMotionValue(1);
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = useCallback(() => {
    progress.set(1);
    animate(progress, 0, { duration: toast.duration / 1000, ease: "linear" });
    timerRef.current = setTimeout(() => onDismiss(toast.id), toast.duration);
  }, [progress, toast.id, toast.duration, onDismiss]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    progress.stop();
  }, [progress]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [startTimer]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95, transition: { duration: DUR.fast, ease: EASE.accelerate } }}
      transition={SPRING.gentle}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      className="pointer-events-auto relative overflow-hidden px-4 py-3 rounded-control shadow-modal text-sm font-medium text-white pr-9"
    >
      <span className={`absolute inset-0 ${kindStyles[toast.kind]}`} />
      <span className="relative z-10 flex items-center gap-2">
        <span>{toast.msg}</span>
      </span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="absolute top-2.5 right-2.5 z-20 p-0.5 rounded-full text-white/70 hover:text-white transition-colors"
        aria-label="Закрити"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-white/40"
        style={{ width }}
      />
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback((msg: string, kind: ToastKind = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, kind, duration: TOAST_DURATION }]);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed right-4 z-[100] flex flex-col gap-2 pointer-events-none" style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }} role="alert" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItemView key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
