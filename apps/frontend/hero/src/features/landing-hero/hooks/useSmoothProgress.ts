import { useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export function useSmoothProgress() {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()
  const smooth = useSpring(scrollYProgress, {
    stiffness: 210,
    damping: 32,
    mass: 1.1,
    restDelta: 0.0001,
  })

  return reduced ? scrollYProgress : smooth
}
