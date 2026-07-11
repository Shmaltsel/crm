import { motion } from "framer-motion";
import { checkmarkVariants } from "../../lib/motion";
import { useReducedMotion } from "../../lib/motion";
import { Check } from "lucide-react";

interface SuccessCheckProps {
  size?: number;
  className?: string;
}

export function SuccessCheck({ size = 48, className = "" }: SuccessCheckProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : "hidden"}
      animate="visible"
      variants={checkmarkVariants}
      className={`inline-flex items-center justify-center rounded-full bg-success/10 ${className}`}
      style={{ width: size, height: size }}
    >
      <Check className="text-success" style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={3} />
    </motion.div>
  );
}
