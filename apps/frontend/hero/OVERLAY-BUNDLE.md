# OVERLAY-BUNDLE.md — Ракета, скрол-снап, трава

Повний код 4 файлів + їх залежності (`animation.ts`, `rocket.ts`, `useReducedMotion.ts`).

---

## src/features/landing-hero/lib/animation.ts

```ts
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}
```

---

## src/features/landing-hero/data/rocket.ts

```ts
export interface RocketWaypoint {
  /** X position as fraction of viewport width */
  x: number
  /** Y position as fraction of viewport height */
  y: number
  /** Rotation in degrees */
  r: number
}

export const ROCKET_WAYPOINTS: RocketWaypoint[] = [
  { x: 0.50, y: 0.38, r: -6 },
  { x: 0.78, y: 0.26, r: 12 },
  { x: 0.18, y: 0.52, r: -14 },
  { x: 0.72, y: 0.60, r: 18 },
  { x: 0.26, y: 0.30, r: -22 },
  { x: 0.68, y: 0.70, r: 14 },
  { x: 0.32, y: 0.46, r: -9 },
  { x: 0.74, y: 0.34, r: 16 },
  { x: 0.48, y: 0.66, r: 2 },
  { x: 0.22, y: 0.28, r: -18 },
  { x: 0.72, y: 0.48, r: 11 },
  { x: 0.50, y: 0.22, r: -5 },
  { x: 0.50, y: 0.48, r: 0 },
]
```

---

## src/features/landing-hero/hooks/useReducedMotion.ts

```ts
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
```

---

## src/features/landing-hero/hooks/useRocketPath.ts

```ts
import { MotionValue, useTransform } from 'framer-motion'
import { ROCKET_WAYPOINTS, type RocketWaypoint } from '../data/rocket'
import { lerp } from '../lib/animation'

function interpolateWaypoints(progress: number): RocketWaypoint {
  const wp = ROCKET_WAYPOINTS
  const idx = progress * (wp.length - 1)
  const i0 = Math.min(Math.floor(idx), wp.length - 2)
  const f = idx - i0
  const a = wp[i0]
  const b = wp[i0 + 1]
  return {
    x: lerp(a.x, b.x, f),
    y: lerp(a.y, b.y, f),
    r: lerp(a.r, b.r, f),
  }
}

export function useRocketPath(progress: MotionValue<number>) {
  const rx = useTransform(progress, (p) => interpolateWaypoints(p).x)
  const ry = useTransform(progress, (p) => interpolateWaypoints(p).y)
  const rr = useTransform(progress, (p) => interpolateWaypoints(p).r)
  return { rx, ry, rr }
}
```

---

## src/features/landing-hero/hooks/useScrollSnap.ts

```ts
import { useEffect, useRef } from 'react'
import { MotionValue } from 'framer-motion'
import { clamp } from '../lib/animation'

const TOTAL_BEATS = 13
const STOP_DELAY = 180

function getBeatCenters(): number[] {
  return Array.from({ length: TOTAL_BEATS }, (_, i) => (i + 0.5) / TOTAL_BEATS)
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
) {
  const timerRef = useRef(0)
  const snappingRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current) return

    const onScroll = () => {
      if (snappingRef.current) return
      clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => {
        if (snappingRef.current) return
        const track = containerRef.current
        if (!track) return
        const total = Math.max(1, track.scrollHeight - window.innerHeight)
        const progress = window.scrollY / total

        if (progress < 0.005 || progress > 0.995) return

        const target = nearestBeat(progress)
        const targetPx = target * total

        if (Math.abs(window.scrollY - targetPx) < 2) return

        snappingRef.current = true
        window.scrollTo({ top: targetPx, behavior: 'smooth' })
        setTimeout(() => { snappingRef.current = false }, 800)
      }, STOP_DELAY)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timerRef.current)
    }
  }, [containerRef])
}
```

---

## src/features/landing-hero/components/overlays/RocketOverlay.tsx

```tsx
import { MotionValue, useTransform, useMotionValueEvent } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import { useRocketPath } from '../../hooks/useRocketPath'
import { clamp } from '../../lib/animation'

interface Props {
  progress: MotionValue<number>
  finaleStrength: MotionValue<number>
}

interface Particle {
  id: number
  x: number
  y: number
  r: number
  opacity: number
  born: number
}

const TRAIL_COLORS = ['#F2B84B', '#FF7A59', '#FBF5EA']

export function RocketOverlay({ progress, finaleStrength }: Props) {
  const { rx, ry, rr } = useRocketPath(progress)
  const [pos, setPos] = useState({ x: 0, y: 0, r: -6 })
  const [opacity, setOpacity] = useState(1)
  const [particles, setParticles] = useState<Particle[]>([])
  const idRef = useRef(0)
  const lastTrailRef = useRef(0)

  const finaleS = useTransform(finaleStrength, (s) => clamp(1 - s * 1.4, 0, 1))

  useMotionValueEvent(rx, 'change', (v) => setPos((p) => ({ ...p, x: v * window.innerWidth })))
  useMotionValueEvent(ry, 'change', (v) => setPos((p) => ({ ...p, y: v * window.innerHeight })))
  useMotionValueEvent(rr, 'change', (v) => setPos((p) => ({ ...p, r: v })))
  useMotionValueEvent(finaleS, 'change', setOpacity)

  const spawnTrail = useCallback((x: number, y: number) => {
    const now = performance.now()
    if (now - lastTrailRef.current < 40) return
    lastTrailRef.current = now

    const newParticles: Particle[] = Array.from({ length: 2 }, () => {
      const angle = ((pos.r + 180) * Math.PI) / 180
      const spread = (Math.random() - 0.5) * 20
      return {
        id: idRef.current++,
        x: x + Math.cos(angle) * 18 + spread,
        y: y + Math.sin(angle) * 18 + spread,
        r: 1.5 + Math.random() * 3,
        opacity: 0.5 + Math.random() * 0.5,
        born: now,
      }
    })

    setParticles((prev) => {
      const alive = prev.filter((p) => now - p.born < 800)
      return [...alive, ...newParticles].slice(-40)
    })
  }, [pos.r])

  useMotionValueEvent(rx, 'change', () => {
    spawnTrail(pos.x, pos.y)
  })

  useMotionValueEvent(progress, 'change', () => {
    spawnTrail(pos.x, pos.y)
  })

  const now = performance.now()

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0 z-[6]"
        aria-hidden="true"
        style={{ width: '100vw', height: '100vh' }}
      >
        {particles.map((p) => {
          const age = clamp((now - p.born) / 800, 0, 1)
          const fade = 1 - age * age
          const color = TRAIL_COLORS[p.id % TRAIL_COLORS.length]
          return (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.r * (1 - age * 0.6)}
              fill={color}
              opacity={p.opacity * fade * opacity}
            />
          )
        })}
      </svg>

      <div
        className="pointer-events-none fixed z-[6]"
        aria-hidden="true"
        style={{
          width: 100,
          height: 100,
          transform: `translate(${pos.x - 50}px, ${pos.y - 50}px) rotate(${pos.r}deg)`,
          opacity,
          willChange: 'transform',
        }}
      >
        <svg viewBox="-50 -80 100 160" className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="rocketBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBF5EA" />
              <stop offset="100%" stopColor="#C9BFA8" />
            </linearGradient>
            <radialGradient id="rocketWindow" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#B8E8E5" />
              <stop offset="100%" stopColor="#5AACAA" />
            </radialGradient>
            <linearGradient id="flameInner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F2B84B" />
              <stop offset="60%" stopColor="#FF7A59" />
              <stop offset="100%" stopColor="#FF4020" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="flameOuter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF7A59" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF4020" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g>
            <path
              d="M0,-65 C20,-48 22,-15 22,10 C22,30 12,48 0,55 C-12,48 -22,30 -22,10 C-22,-15 -20,-48 0,-65 Z"
              fill="url(#rocketBody)"
              stroke="#E8DFC8"
              strokeWidth="1.2"
            />
            <path
              d="M0,-65 C10,-50 14,-20 14,5 L0,55 L-14,5 C-14,-20 -10,-50 0,-65 Z"
              fill="#FBF5EA"
              opacity="0.3"
            />
            <circle cx="0" cy="-18" r="10" fill="url(#rocketWindow)" stroke="#FBF5EA" strokeWidth="1.5" />
            <ellipse cx="0" cy="-21" rx="4" ry="3" fill="#FBF5EA" opacity="0.4" />

            <path d="M-22,18 L-38,40 L-22,32 Z" fill="#FF7A59" opacity="0.85" />
            <path d="M22,18 L38,40 L22,32 Z" fill="#FF7A59" opacity="0.85" />
            <path d="M-22,18 L-32,38" stroke="#FBF5EA" strokeWidth="1" opacity="0.5" />
            <path d="M22,18 L32,38" stroke="#FBF5EA" strokeWidth="1" opacity="0.5" />

            <path d="M-8,55 C-4,72 4,72 8,55" fill="url(#flameOuter)" opacity="0.5">
              <animate attributeName="d" values="M-8,55 C-4,72 4,72 8,55;M-6,55 C-2,78 2,78 6,55;M-8,55 C-4,72 4,72 8,55" dur="0.15s" repeatCount="indefinite" />
            </path>
            <path d="M-5,55 C-2,68 2,68 5,55" fill="url(#flameInner)" opacity="0.9">
              <animate attributeName="d" values="M-5,55 C-2,68 2,68 5,55;M-4,55 C-1,74 1,74 4,55;M-5,55 C-2,68 2,68 5,55" dur="0.12s" repeatCount="indefinite" />
            </path>
            <path d="M-2,55 L0,68 L2,55" fill="#FBF5EA" opacity="0.7">
              <animate attributeName="d" values="M-2,55 L0,68 L2,55;M-1,55 L0,74 L1,55;M-2,55 L0,68 L2,55" dur="0.1s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      </div>
    </>
  )
}
```

---

## src/features/landing-hero/components/overlays/GrassGround.tsx

```tsx
import { useEffect, useRef, useState } from 'react'
import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { clamp } from '../../lib/animation'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  drawingStrength: MotionValue<number>
}

const BLADE_COUNT = 28
const BLADE_SPACING = 1528 / BLADE_COUNT

interface Blade {
  x: number
  el: SVGLineElement | null
}

export function GrassGround({ drawingStrength }: Props) {
  const [opacity, setOpacity] = useState(0)
  const bladesRef = useRef<Blade[]>([])
  const mouseRef = useRef({ x: window.innerWidth / 2 })
  const reduced = useReducedMotion()
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)
  const svgRef = useRef<SVGGElement>(null)

  useMotionValueEvent(drawingStrength, 'change', setOpacity)

  useEffect(() => {
    if (reduced || opacity < 0.12) return

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const scaleX = 1600 / window.innerWidth
    let running = true

    const tick = (now: number) => {
      if (!running) return
      // Throttle to ~30fps
      if (now - lastFrameRef.current < 33) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      lastFrameRef.current = now

      bladesRef.current.forEach((blade) => {
        if (!blade.el) return
        const bladeScreenX = blade.x / scaleX
        const dist = Math.abs(mouseRef.current.x - bladeScreenX)
        const influence = clamp(1 - dist / 140, 0, 1)
        const bend = influence * 16 * (mouseRef.current.x > bladeScreenX ? 1 : -1)
        blade.el.setAttribute('transform', `translate(${blade.x},0) skewX(${bend.toFixed(2)})`)
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
    }
  }, [opacity, reduced])

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ opacity }}
    >
      <g ref={svgRef} transform="translate(0,760)">
        {Array.from({ length: BLADE_COUNT }, (_, i) => {
          const x = 36 + i * BLADE_SPACING
          return (
            <line
              key={i}
              ref={(el) => {
                bladesRef.current[i] = { x, el }
              }}
              x1={x}
              y1={0}
              x2={x}
              y2={-32}
              stroke="#FBF5EA"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.52"
            />
          )
        })}
      </g>
      <g transform="translate(180,760)">
        <path d="M0,90 L0,10" stroke="#FBF5EA" strokeWidth="2.1" strokeLinecap="round" />
        <path
          d="M0,40 C-30,26 -46,4 -40,-24"
          stroke="#FBF5EA"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M0,26 C26,10 40,-8 36,-34"
          stroke="#FBF5EA"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="-40" cy="-24" r="4" fill="#F2B84B" />
        <circle cx="36" cy="-34" r="4" fill="#FF7A59" />
        <circle cx="4" cy="-12" r="4" fill="#F2B84B" />
      </g>
    </svg>
  )
}
```
