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
import { useEffect, useRef, useState } from 'react'
import { clamp } from '../../lib/animation'
import { Z } from '../../lib/zIndex'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Timeline } from '../../types/timeline'
import type { MotionValue } from 'framer-motion'
import { ROCKET_WAYPOINTS } from '../../data/rocket'

interface Props {
  tl: Timeline
  progress: MotionValue<number>
  subscribe: (cb: () => void) => () => void
}

function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t
  const t3 = t2 * t
  return 0.5 * (
    (2 * p1) +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  )
}

function catmullRomDerivative(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t
  return 0.5 * (
    (-p0 + p2) +
    2 * (2 * p0 - 5 * p1 + 4 * p2 - p3) * t +
    3 * (-p0 + 3 * p1 - 3 * p2 + p3) * t2
  )
}

function lerpAngle(start: number, end: number, amount: number) {
  const delta = ((((end - start) % 360) + 540) % 360) - 180
  return start + delta * amount
}

const NOZZLE_Y = 55

function scaleFlame(scaleX: number, scaleY: number, coords: number[], cmd: 'C' | 'L' = 'C'): string {
  let d = ''
  for (let i = 0; i < coords.length; i += 2) {
    const x = coords[i] * scaleX
    const y = NOZZLE_Y + (coords[i + 1] - NOZZLE_Y) * scaleY
    d += (i === 0 ? 'M' : i === 2 ? ` ${cmd}` : ' ') + `${x},${y}`
  }
  return d
}

function interpolateRocket(progress: number, vw: number, vh: number) {
  const wp = ROCKET_WAYPOINTS
  if (wp.length < 2) return { x: 0, y: 0, heading: 0 }

  const maxIdx = wp.length - 1
  const p = Math.max(0, Math.min(1, progress))

  const floatIdx = p * maxIdx
  const i1 = Math.floor(floatIdx)
  const t = floatIdx - i1

  const i0 = Math.max(0, i1 - 1)
  const i2 = Math.min(maxIdx, i1 + 1)
  const i3 = Math.min(maxIdx, i1 + 2)

  const x = catmullRom(wp[i0].x, wp[i1].x, wp[i2].x, wp[i3].x, t) * vw
  const y = catmullRom(wp[i0].y, wp[i1].y, wp[i2].y, wp[i3].y, t) * vh

  const dx = catmullRomDerivative(wp[i0].x, wp[i1].x, wp[i2].x, wp[i3].x, t) * vw
  const dy = catmullRomDerivative(wp[i0].y, wp[i1].y, wp[i2].y, wp[i3].y, t) * vh

  const heading = Math.atan2(dy || 0.001, dx || 0.001) * (180 / Math.PI) + 90

  return { x, y, heading }
}

export function RocketOverlay({ tl, progress, subscribe }: Props) {
  const reduced = useReducedMotion()
  const [, setTick] = useState(0)
  const flameRef = useRef(1)
  const currentHeading = useRef<number | null>(null)

  useEffect(() => {
    const unsub = subscribe(() => setTick((t) => t + 1))
    return unsub
  }, [subscribe])

  const t = tl
  const p = progress.get()
  const rocket = interpolateRocket(p, t.vw, t.vh)

  const now = t.elapsed
  const opacity = 1

  if (!reduced) {
    flameRef.current = 1 + Math.sin(now / 90) * 0.12
  }

  const speedFactor = clamp(Math.abs(t.velocity) / 2000, 0, 1)

  const enginePower = clamp(p / 0.015, 0, 1) * clamp((1 - p) / 0.015, 0, 1)

  const engineGlow = (0.5 + speedFactor * 0.5) * enginePower
  const flameScale = flameRef.current * enginePower

  const idleHover = (1 - enginePower) * Math.sin(now / 300) * 8

  const rawHeading = rocket.heading
  if (currentHeading.current === null) {
    currentHeading.current = rawHeading
  } else {
    currentHeading.current = lerpAngle(currentHeading.current, rawHeading, 0.12)
  }

  const camX = rocket.x + t.parallax[5].x + t.camera.x + t.camera.shakeX
  const camY = rocket.y + t.parallax[5].y + t.camera.y + t.camera.shakeY + idleHover

  const ws = t.isWarping ? t.warpStrength : 0

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{ width: '100vw', height: '100vh', zIndex: Z.rocket }}
      >
        {t.trailParticles.map((p) => {
          const age = clamp((now - p.born) / 800, 0, 1)
          const fade = 1 - age * age
          return (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.r * (1 - age * 0.6)}
              fill={p.color}
              opacity={p.opacity * fade * opacity}
            />
          )
        })}
      </svg>

      <div
        className="pointer-events-none fixed"
        aria-hidden="true"
        style={{
          width: 100,
          height: 100,
          transform: `translate(${camX - 50}px, ${camY - 50}px) rotate(${currentHeading.current}deg) scale(${t.camera.zoom})`,
          opacity,
          willChange: 'transform',
          zIndex: Z.rocket,
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
              <stop offset="0%" stopColor="#FF7A59" stopOpacity={0.6 * engineGlow} />
              <stop offset="100%" stopColor="#FF4020" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="engineGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#F2B84B" stopOpacity={engineGlow * 0.3} />
              <stop offset="100%" stopColor="#F2B84B" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g>
            <ellipse cx="0" cy="72" rx={16 + speedFactor * 5} ry={4 + speedFactor * 2} fill="rgba(11,14,31,0.25)" opacity={clamp(t.camera.depth * 2, 0, 0.35)} />
            <circle cx="0" cy="62" r={24 + speedFactor * 18} fill="url(#engineGlow)" />

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

            <path
              d={scaleFlame(1 + speedFactor * 0.15, flameScale * (1 + speedFactor * 0.3), [-10, 55, -5, 85, 5, 85, 10, 55])}
              fill="url(#flameOuter)"
              opacity={engineGlow}
            />
            <path
              d={scaleFlame(1, flameScale, [-7, 55, -3, 78, 3, 78, 7, 55])}
              fill="url(#flameInner)"
              opacity={0.9 * engineGlow}
            />
            <path
              d={scaleFlame(1, flameScale * (1 + speedFactor * 0.2), [-3, 55, 0, 82, 3, 55], 'L')}
              fill="#FBF5EA"
              opacity={0.7 * engineGlow}
            />
          </g>
        </svg>
      </div>

      {t.isWarping && (
        <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden" style={{ zIndex: Z.rocket + 10 }}>
          <div
            className="absolute h-[100vh] w-[140px] bg-gradient-to-r from-transparent via-gold to-transparent mix-blend-screen"
            style={{ transform: `scaleY(${ws * 15})`, opacity: ws }}
          />
          <div className="absolute left-[30%] h-[150vh] w-[2px] bg-teal shadow-[0_0_15px_3px_#8FE3E0]" style={{ transform: `scaleY(${ws * 8})`, opacity: ws * 0.8 }} />
          <div className="absolute right-[25%] h-[200vh] w-[4px] bg-coral shadow-[0_0_20px_5px_#FF7A59]" style={{ transform: `scaleY(${ws * 12})`, opacity: ws * 0.9 }} />
          <div className="absolute left-[40%] h-[120vh] w-[1px] bg-white" style={{ transform: `scaleY(${ws * 20})`, opacity: ws * 0.5 }} />
        </div>
      )}
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
