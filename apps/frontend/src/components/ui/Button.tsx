import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

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
      transition={{ duration: 0.15, ease: "easeOut" }}
      disabled={disabled || isLoading}
      className={`rounded-control font-medium transition-all duration-200
        hover:shadow-lift active:shadow-none
        focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? "…" : children}
    </motion.button>
  )
);
