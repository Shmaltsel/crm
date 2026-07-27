import { useSpring } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'
import type { MotionValue } from 'framer-motion'

export function useSmoothProgress(source: MotionValue<number>) {
  const reduced = useReducedMotion()
  const smooth = useSpring(source, {
    stiffness: 210,
    damping: 32,
    mass: 1.1,
    restDelta: 0.0001,
  })

  return reduced ? source : smooth
}
