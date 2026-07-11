import type { Variants } from "framer-motion";
import {
  DUR,
  EASE,
  SPRING,
  backdropVariants,
  modalContentVariants,
  shakeVariants,
  checkmarkVariants,
  staggerContainer,
  staggerItem,
} from "../lib/motion";

export {
  backdropVariants,
  modalContentVariants,
  shakeVariants,
  checkmarkVariants,
  staggerContainer,
  staggerItem,
};

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...SPRING.gentle },
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: { duration: DUR.normal },
  },
};

export const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DUR.slow, ease: EASE.decelerate },
  },
};

export const formVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.moderate, ease: EASE.outExpo } },
};
