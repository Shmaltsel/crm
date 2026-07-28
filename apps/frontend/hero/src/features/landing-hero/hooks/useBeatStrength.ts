import { MotionValue, useTransform } from 'framer-motion'
import { computeBeatStrength } from '../lib/beats'

export function useBeatStrength(
  progress: MotionValue<number>,
  index: number,
): MotionValue<number> {
  return useTransform(progress, (p) => computeBeatStrength(p, index))
}
