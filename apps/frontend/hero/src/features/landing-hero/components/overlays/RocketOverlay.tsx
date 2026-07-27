import { useEffect, useRef, useState } from 'react'
import { clamp, lerp } from '../../lib/animation'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { Timeline } from '../../types/timeline'
import type { MotionValue } from 'framer-motion'
import { ROCKET_WAYPOINTS } from '../../data/rocket'

interface Props {
  tl: Timeline
  progress: MotionValue<number>
}

function interpolateRocket(progress: number, vw: number, vh: number) {
  const wp = ROCKET_WAYPOINTS
  const idx = progress * (wp.length - 1)
  const i0 = Math.min(Math.floor(idx), wp.length - 2)
  const f = idx - i0
  const a = wp[i0]
  const b = wp[i0 + 1]
  const x = lerp(a.x, b.x, f) * vw
  const y = lerp(a.y, b.y, f) * vh
  const dxPx = (b.x - a.x) * vw
  const dyPx = (b.y - a.y) * vh
  const heading = Math.atan2(dyPx, dxPx) * (180 / Math.PI) + 90
  return { x, y, heading }
}

function flamePath(base: string, scale: number): string {
  const m = base.match(/M([\d.-]+),([\d.-]+)\s*C([\d.-]+),([\d.-]+)\s+([\d.-]+),([\d.-]+)\s+([\d.-]+),([\d.-]+)/)
  if (!m) return base
  return `M${m[1]},${m[2]} C${parseFloat(m[3]) * scale},${parseFloat(m[4]) * scale} ${parseFloat(m[5]) * scale},${parseFloat(m[6]) * scale} ${parseFloat(m[7]) * scale},${parseFloat(m[8]) * scale}`
}

function flameTipPath(base: string, scale: number): string {
  const m = base.match(/M([\d.-]+),([\d.-]+)\s*L([\d.-]+),([\d.-]+)\s*L([\d.-]+),([\d.-]+)/)
  if (!m) return base
  return `M${m[1]},${m[2]} L${m[3]},${parseFloat(m[4]) * scale} L${m[5]},${parseFloat(m[6]) * scale}`
}

const FLAME_OUTER = 'M-8,55 C-4,72 4,72 8,55'
const FLAME_INNER = 'M-5,55 C-2,68 2,68 5,55'
const FLAME_TIP = 'M-2,55 L0,68 L2,55'

export function RocketOverlay({ tl, progress }: Props) {
  const reduced = useReducedMotion()
  const [, setTick] = useState(0)
  const flameRef = useRef(1)

  useEffect(() => {
    const unsub = tl.subscribe(() => setTick((t) => t + 1))
    return unsub
  }, [tl])

  const t = tl
  const p = progress.get()
  const rocket = interpolateRocket(p, t.vw, t.vh)
  const camX = rocket.x + t.parallax[5].x + t.camera.x + t.camera.shakeX
  const camY = rocket.y + t.parallax[5].y + t.camera.y + t.camera.shakeY
  const opacity = clamp(1 - t.beatStrengths[12] * 1.4, 0, 1)

  if (!reduced) {
    flameRef.current = 1 + Math.sin(t.elapsed / 90) * 0.12
  }
  const flameScale = flameRef.current
  const speedFactor = clamp(Math.abs(t.velocity) / 2000, 0, 1)
  const engineGlow = 0.5 + speedFactor * 0.5

  const now = t.elapsed

  return (
    <>
      <svg
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{ width: '100vw', height: '100vh', zIndex: 6 }}
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
          transform: `translate(${camX - 50}px, ${camY - 50}px) rotate(${rocket.heading}deg) scale(${t.camera.zoom})`,
          opacity,
          willChange: 'transform',
          zIndex: 6,
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
            <ellipse cx="0" cy="68" rx={14 + speedFactor * 4} ry={3 + speedFactor * 1.5} fill="rgba(11,14,31,0.25)" opacity={clamp(t.camera.depth * 2, 0, 0.35)} />
            <circle cx="0" cy="60" r={20 + speedFactor * 15} fill="url(#engineGlow)" />

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

            <path d={flamePath(FLAME_OUTER, flameScale * (1 + speedFactor * 0.3))} fill="url(#flameOuter)" opacity={engineGlow} />
            <path d={flamePath(FLAME_INNER, flameScale)} fill="url(#flameInner)" opacity={0.9 * engineGlow} />
            <path d={flameTipPath(FLAME_TIP, flameScale * (1 + speedFactor * 0.2))} fill="#FBF5EA" opacity={0.7 * engineGlow} />
          </g>
        </svg>
      </div>
    </>
  )
}
