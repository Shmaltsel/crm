import { useEffect, useRef } from 'react'
import { MotionValue } from 'framer-motion'
import { tweenScrollTo } from '../lib/animation'

const TOTAL_BEATS = 13
const STOP_DELAY = 250

function getBeatCenters(): number[] {
  const centers: number[] = [0]
  for (let i = 0; i < TOTAL_BEATS; i++) {
    centers.push((i + 0.5) / TOTAL_BEATS)
  }
  centers.push(1)
  return centers
}

function nearestBeat(progress: number): number {
  const centers = getBeatCenters()
  let best = centers[0]
  let bestDist = Math.abs(progress - best)
  for (let i = 1; i < centers.length; i++) {
    const d = Math.abs(progress - centers[i])
    if (d < bestDist) {
      best = centers[i]
      bestDist = d
    }
  }
  return best
}

export function useScrollSnap(
  scrollYProgress: MotionValue<number>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean = true,
) {
  const timerRef = useRef(0)
  const snappingRef = useRef(false)
  const userInputRef = useRef(false)
  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const markUserInput = () => { userInputRef.current = true }
    window.addEventListener('wheel', markUserInput, { passive: true })
    window.addEventListener('touchmove', markUserInput, { passive: true })

    const onScroll = () => {
      const now = performance.now()
      lastScrollRef.current = window.scrollY
      lastTimeRef.current = now
    }

    const evaluate = () => {
      if (snappingRef.current) return
      const track = containerRef.current
      if (!track) return
      const total = Math.max(1, track.scrollHeight - window.innerHeight)
      const progress = window.scrollY / total

      const now = performance.now()
      const dt = now - lastTimeRef.current
      const dy = window.scrollY - lastScrollRef.current
      const velocity = dt > 0 ? dy / dt : 0
      const scrollingDown = velocity > 0.15

      if (progress > 0.9 && scrollingDown) return

      if (progress < 0.005 || progress > 0.995) return

      const target = nearestBeat(progress)
      const targetPx = target * total
      const DEADZONE = window.innerHeight * 0.15

      if (Math.abs(window.scrollY - targetPx) < DEADZONE) return

      snappingRef.current = true
      userInputRef.current = false
      tweenScrollTo(targetPx, { onCancelCheck: () => userInputRef.current }).then(() => {
        snappingRef.current = false
      })
    }

    const scheduleEvaluate = () => {
      clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(evaluate, STOP_DELAY)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    let scrollEndSupported = false
    const onScrollEnd = () => { scrollEndSupported = true; evaluate() }
    window.addEventListener('scrollend', onScrollEnd)

    const fallbackTimer = window.setTimeout(() => {
      if (!scrollEndSupported) {
        window.addEventListener('scroll', scheduleEvaluate, { passive: true })
      }
    }, 0)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('scroll', scheduleEvaluate)
      window.removeEventListener('wheel', markUserInput)
      window.removeEventListener('touchmove', markUserInput)
      clearTimeout(timerRef.current)
      clearTimeout(fallbackTimer)
    }
  }, [containerRef, enabled])
}
