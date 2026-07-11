import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { TRANSITION } from "../../lib/motion";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed",
  secondary: "bg-surface-muted text-content-secondary hover:bg-border-strong disabled:opacity-50 disabled:cursor-not-allowed",
  danger: "bg-danger text-white hover:bg-danger/90 disabled:opacity-50 disabled:cursor-not-allowed",
  ghost: "bg-transparent text-content-secondary hover:bg-surface-muted disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

interface Props extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", isLoading, className = "", children, disabled, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={TRANSITION.tap}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={`rounded-control font-medium transition-all duration-fast
        hover:shadow-lift active:shadow-none
        focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full"
          />
          <span className="opacity-70">Завантаження…</span>
        </span>
      ) : children}
    </motion.button>
  )
);
