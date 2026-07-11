import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { emptyStateVariants, TRANSITION } from "../../lib/motion";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      variants={emptyStateVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      {Icon && (
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4"
        >
          <Icon className="w-6 h-6 text-neutral-400" />
        </motion.div>
      )}
      <h3 className="text-base font-semibold text-content-primary mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-content-muted max-w-xs mb-4">{description}</p>
      )}
      {action && (
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={TRANSITION.hover}>
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
