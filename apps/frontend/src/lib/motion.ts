import { useEffect, useMemo, useRef, useState } from "react";
import type { Variants } from "framer-motion";

/* ─── Reduced Motion ─── */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const localStorageKey = "opencode:reduced-motion";

function getStoredReducedMotion(): boolean | null {
  try {
    const v = localStorage.getItem(localStorageKey);
    if (v === "true") return true;
    if (v === "false") return false;
  } catch {
    /* SSR / private mode */
  }
  return null;
}

/** React hook: returns true when the device is hover-capable (fine pointer). */
export function useHoverCapable(): boolean {
  const [capable, setCapable] = useState<boolean>(() =>
    typeof window !== "undefined" &&
    (window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false),
  );

  useEffect(() => {
    const mq = window.matchMedia?.("(hover: hover) and (pointer: fine)");
    if (!mq) return;
    const handler = () => setCapable(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return capable;
}

/** React hook: returns true if user prefers reduced motion (OS setting + localStorage). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    const stored = getStoredReducedMotion();
    return stored !== null ? stored : prefersReducedMotion();
  });

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const handler = (e: MediaQueryListEvent) => {
      if (getStoredReducedMotion() === null) setReduced(e.matches);
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return reduced;
}

export const useReducedMotion = usePrefersReducedMotion;

/** React hook: true when viewport is mobile (<768px). Layout-only, NOT for animation suppression. */
export function useCompactViewport(): boolean {
  const [compact, setCompact] = useState<boolean>(() =>
    typeof window !== "undefined" && window.matchMedia?.("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia?.("(max-width: 767px)");
    if (!mq) return;
    const handler = () => setCompact(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return compact;
}

/** @deprecated Use usePrefersReducedMotion() for animation suppression. */
export const useLightMotion = usePrefersReducedMotion;

/** React hook: staggered entrance for list items. */
export function useStaggeredEntrance(
  opts?: { delayChildren?: number; stagger?: number },
) {
  const reduced = useLightMotion();
  const { delayChildren = 0.04, stagger = 0.045 } = opts ?? {};

  return useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: reduced ? 0 : delayChildren,
          staggerChildren: reduced ? 0 : stagger,
          when: "beforeChildren" as const,
        },
      },
    }),
    [delayChildren, stagger, reduced],
  );
}

/** React hook: animates a number from 0 → target. Returns current display value. */
export function useCountUp(
  target: number,
  opts?: { duration?: number; decimals?: number; enabled?: boolean },
): number {
  const { duration = 0.8, decimals = 0, enabled = true } = opts ?? {};
  const reduced = useReducedMotion();
  const skip = reduced || !enabled;
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const fromRef = useRef(0);
  const prevTargetRef = useRef(target);

  useEffect(() => {
    if (skip) return;
    fromRef.current = prevTargetRef.current;
    prevTargetRef.current = target;
    startRef.current = 0;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = fromRef.current + (target - fromRef.current) * eased;
      setDisplay(Number(current.toFixed(decimals)));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, decimals, skip]);

  return skip ? target : display;
}

/* ─── Durations ─── */

export const DUR = {
  instant: 0,
  micro: 0.075,
  fast: 0.2,
  normal: 0.25,
  moderate: 0.3,
  slow: 0.4,
  verySlow: 0.5,
  page: 0.4,
} as const;

/* ─── Easings ─── */

export const EASE = {
  standard: [0.4, 0, 0.2, 1] as const,
  decelerate: [0, 0, 0.2, 1] as const,
  accelerate: [0.4, 0, 1, 1] as const,
  spring: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.19, 1, 0.22, 1] as const,
  inOutExpo: [0.87, 0, 0.13, 1] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
} as const;

/* ─── Springs ─── */

export const SPRING = {
  snappy: { type: "spring" as const, stiffness: 320, damping: 28 },
  gentle: { type: "spring" as const, stiffness: 260, damping: 24 },
  bouncy: { type: "spring" as const, stiffness: 300, damping: 20 },
  stiff: { type: "spring" as const, stiffness: 400, damping: 32 },
} as const;

/* ─── Transition Presets ─── */

export const TRANSITION = {
  hover: { type: "spring" as const, stiffness: 350, damping: 25 },
  tap: { duration: DUR.fast, ease: EASE.standard },
  focus: { duration: DUR.fast, ease: EASE.decelerate },
  color: { duration: DUR.normal, ease: EASE.standard },
  shadow: { duration: DUR.normal, ease: EASE.standard },
  position: { type: "spring" as const, stiffness: 350, damping: 30 },
  fade: { duration: DUR.normal, ease: EASE.decelerate },
  slideUp: { duration: DUR.moderate, ease: EASE.outExpo },
  slideDown: { duration: DUR.moderate, ease: EASE.outExpo },
  scale: { duration: DUR.normal, ease: EASE.outExpo },
  layout: { duration: DUR.fast, ease: EASE.standard },
} as const;

/* ─── Variant Presets ─── */

/** Backdrop fade in/out (modal overlay). */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.fast, ease: EASE.decelerate } },
  exit: { opacity: 0, transition: { duration: DUR.normal, ease: EASE.standard } },
};

/** Modal / sheet / bottom-sheet content. */
export const modalContentVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { ...SPRING.gentle } },
  exit: { opacity: 0, y: 12, scale: 0.97, transition: { type: "spring" as const, stiffness: 380, damping: 32 } },
};

/** Pop-in (badges, status pills, FAB). */
export const popInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { ...SPRING.bouncy } },
  exit: { opacity: 0, scale: 0.6, transition: { duration: DUR.normal, ease: EASE.standard } },
};

/** Card elevation hover (translate-y only — shadow handled via CSS class). */
export const cardHoverVariants: Variants = {
  rest: { y: 0, opacity: 1 },
  hover: {
    y: -4,
    opacity: 1,
    transition: { duration: DUR.normal, ease: EASE.standard },
  },
};

/** Page / route transitions (opacity only — used with AnimatePresence mode="wait"). */
export const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.page, ease: EASE.outExpo, delay: 0.03 } },
  exit: { opacity: 0, transition: { duration: DUR.normal, ease: EASE.standard } },
};

/** Simple fade transition. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.normal, ease: EASE.decelerate } },
  exit: { opacity: 0, transition: { duration: DUR.normal, ease: EASE.standard } },
};

/** Slide up entrance (content blocks, cards). */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.moderate, ease: EASE.outExpo } },
  exit: { opacity: 0, y: -6, transition: { duration: DUR.normal, ease: EASE.standard } },
};

/** Scale entrance (modals, popovers). */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { ...SPRING.gentle } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: DUR.normal, ease: EASE.standard } },
};

/** Stagger container — use with staggerItem children. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04, when: "beforeChildren" },
  },
};

/** Stagger item — each child inside staggerContainer. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.normal, ease: EASE.outExpo } },
};

/** Horizontal slide for carousel / tabs. */
export const slideXVariants: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { ...SPRING.snappy } },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, transition: { duration: DUR.normal, ease: EASE.standard } }),
};

/** Skeleton shimmer placeholder. */
export const skeletonPulse = {
  animate: { opacity: [0.4, 0.7, 0.4], transition: { duration: 1.4, repeat: Infinity, ease: "linear" as const } },
};

/** Checkmark success pop. */
export const checkmarkVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

/** Error shake. */
export const shakeVariants: Variants = {
  shake: { x: [0, -8, 8, -6, 6, -3, 3, 0], transition: { duration: 0.4 } },
};

/** Tooltip / popover. */
export const tooltipVariants: Variants = {
  hidden: { opacity: 0, y: 4, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: DUR.fast, ease: EASE.outExpo } },
  exit: { opacity: 0, y: 2, scale: 0.98, transition: { duration: DUR.micro, ease: EASE.accelerate } },
};

/** Empty state illustration entrance. */
export const emptyStateVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.outExpo } },
};

/** Notification bell ring. */
export const bellRingVariants: Variants = {
  ring: {
    rotate: [0, 14, -12, 8, -6, 3, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

/** FAB entrance. */
export const fabVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { ...SPRING.bouncy } },
  exit: { opacity: 0, scale: 0.5, y: 10, transition: { duration: DUR.normal, ease: EASE.standard } },
};

/* ─── CSS-compatible class helpers ─── */

export const noTransition = "transition-none";
export const motionSafe = (cls: string) => `motion-safe:${cls}`;
export const motionReduce = (cls: string) => `motion-reduce:${cls}`;

/* ─── GPU acceleration ─── */

/** Apply to animated elements to promote to composite layer and avoid layout thrash. */
export const GPU_STYLE = { willChange: "transform" } as const;
