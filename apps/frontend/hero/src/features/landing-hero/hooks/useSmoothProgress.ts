import { useSpring, useMotionValueEvent } from 'framer-motion'
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

  useMotionValueEvent(source, 'change', (latest) => {
    if (Math.abs(latest - smooth.get()) > 0.1) {
      smooth.jump(latest)
    }
  })

  return reduced ? source : smooth
}
