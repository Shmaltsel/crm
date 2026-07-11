import { motion, type MotionProps } from "framer-motion";
import { shakeVariants, useReducedMotion } from "../../lib/motion";

interface ErrorShakeProps {
  children: React.ReactNode;
  className?: string;
  shake?: boolean;
}

export function ErrorShake({ children, className = "", shake = false }: ErrorShakeProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      animate={shake && !reduced ? "shake" : undefined}
      variants={shakeVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
