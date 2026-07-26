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
