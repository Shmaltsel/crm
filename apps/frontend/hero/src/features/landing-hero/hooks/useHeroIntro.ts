import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export type HeroPhase = 'idle' | 'intro' | 'ready'

interface HeroIntroState {
  phase: HeroPhase
  introProgress: number
}

export function useHeroIntro(): HeroIntroState {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<HeroPhase>('idle')
  const [introProgress, setIntroProgress] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    if (reduced) {
      setPhase('ready')
      setIntroProgress(1)
      return
    }

    const startTime = performance.now()
    const INTRO_DURATION = 3000

    setPhase('intro')

    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / INTRO_DURATION, 1)
      setIntroProgress(t)

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setPhase('ready')
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [reduced])

  return { phase, introProgress }
}
