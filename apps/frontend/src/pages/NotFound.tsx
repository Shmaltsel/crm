import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import {
  scaleVariants,
  staggerItem,
} from "../lib/motion";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle px-4">
      <motion.div
        variants={scaleVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full bg-surface rounded-card shadow-card border border-border p-8 text-center"
      >
        <motion.div
          variants={scaleVariants}
          initial="hidden"
          animate="visible"
          className="w-16 h-16 rounded-full bg-brand-subtle flex items-center justify-center mx-auto mb-4"
        >
          <SearchX className="w-7 h-7 text-brand" />
        </motion.div>
        <motion.h1
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="text-xl font-bold text-content-primary mb-2"
        >
          Сторінку не знайдено
        </motion.h1>
        <motion.p
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="text-sm text-content-muted mb-6"
        >
          Можливо, її було переміщено або видалено.
        </motion.p>
        <Button onClick={() => navigate("/")}>
          На головну
        </Button>
      </motion.div>
    </div>
  );
}
