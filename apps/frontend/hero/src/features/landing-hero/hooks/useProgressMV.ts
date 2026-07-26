import { useEffect } from 'react'
import { MotionValue, useMotionValue } from 'framer-motion'
import type { Timeline } from '../types/timeline'

export function useProgressMV(
  tl: Timeline,
  subscribe: (cb: () => void) => () => void,
): MotionValue<number> {
  const mv = useMotionValue(0)

  useEffect(() => {
    mv.set(tl.progress)
    return subscribe(() => { mv.set(tl.progress) })
  }, [tl, subscribe, mv])

  return mv
}
