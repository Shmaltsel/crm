import type { ReactNode, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cardHoverVariants, TRANSITION } from "../../lib/motion";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-3",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({ children, padding = "md", className = "", ...props }: Props) {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      transition={TRANSITION.position}
      className={`bg-surface rounded-card shadow-card border border-border active:scale-[0.98] transition-transform duration-fast
        ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
