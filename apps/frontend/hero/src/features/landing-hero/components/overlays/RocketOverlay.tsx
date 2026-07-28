import { useEffect, useRef, useState } from 'react'
import { clamp } from '../../lib/animation'
import { Z } from '../../lib/zIndex'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { interpolateRocket, lerpAngle } from '../../lib/rocketMath'
import type { Timeline } from '../../types/timeline'
import type { MotionValue } from 'framer-motion'

interface Props {
  tl: Timeline
  progress: MotionValue<number>
  subscribe: (cb: () => void) => () => void
  heroCompleted?: boolean
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

export function RocketOverlay({ tl, progress, subscribe, heroCompleted = true }: Props) {
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
  const opacity = heroCompleted ? 1 : 0

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
    currentHeading.current = lerpAngle(currentHeading.current, rawHeading, 0.20)
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
        <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: Z.rocket + 10 }}>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 24 }, (_, i) => {
              const angle = (i / 24) * Math.PI * 2 + (i % 3) * 0.09
              const baseLen = 25 + (i % 5) * 12
              const delay = (i % 6) * 0.06
              const lineWs = clamp((ws - delay) / (1 - delay), 0, 1)
              const expand = lineWs * lineWs * (3 - 2 * lineWs)
              const x1 = 50 + Math.cos(angle) * 3
              const y1 = 50 + Math.sin(angle) * 3
              const x2 = 50 + Math.cos(angle) * baseLen * expand
              const y2 = 50 + Math.sin(angle) * baseLen * expand
              const opacity = expand * (1 - expand * 0.6) * 0.8
              const colors = ['#FBF5EA', '#F2B84B', '#8FE3E0', '#FBF5EA', '#FF7A59']
              const sw = 0.12 + (i % 3) * 0.06
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={colors[i % 5]}
                  strokeWidth={sw}
                  strokeLinecap="round"
                  opacity={opacity}
                />
              )
            })}
          </svg>
        </div>
      )}
    </>
  )
}
