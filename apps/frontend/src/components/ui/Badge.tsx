import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SPRING } from "../../lib/motion";

type BadgeVariant = "default" | "success" | "danger" | "warning" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-700 border-neutral-200",
  success: "bg-success-50 text-success-700 border-success-200",
  danger: "bg-danger-50 text-danger-600 border-danger-200",
  warning: "bg-warning-50 text-warning-600 border-warning-100",
  info: "bg-brand-50 text-brand-700 border-brand-200",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-2xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({ children, variant = "default", size = "md", className = "" }: BadgeProps) {
  return (
    <motion.span
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={SPRING.snappy}
      className={`inline-flex items-center font-semibold rounded-pill border
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </motion.span>
  );
}
