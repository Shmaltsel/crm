import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { clamp } from '../../lib/animation'

interface Props {
  progress: MotionValue<number>
  beatStrengths: MotionValue<number>[]
}

interface PlanetState {
  portalS: number
  p0x: number
  p0y: number
  p1x: number
  p1y: number
  p2x: number
  p2y: number
  drift: number
}

export function PortalOverlay({ progress, beatStrengths }: Props) {
  const [s, setS] = useState<PlanetState>({
    portalS: 0, p0x: 0, p0y: 0, p1x: 0, p1y: 0, p2x: 0, p2y: 0, drift: 0,
  })

  useMotionValueEvent(progress, 'change', (p) => {
    const h = Math.max(beatStrengths[3]?.get() ?? 0, beatStrengths[4]?.get() ?? 0)
    const d = Math.max(beatStrengths[5]?.get() ?? 0, beatStrengths[6]?.get() ?? 0)
    const c = beatStrengths[7]?.get() ?? 0
    const f = beatStrengths[12]?.get() ?? 0
    const portalS = clamp(Math.max(h, d, c, f), 0, 1)

    setS({
      portalS,
      p0x: 82 + Math.sin(p * 2.2) * 4,
      p0y: 18 + Math.cos(p * 1.7) * 3,
      p1x: 14 + Math.sin(p * 1.9 + 1) * 5,
      p1y: 62 + Math.cos(p * 2.3 + 0.5) * 4,
      p2x: 72 + Math.sin(p * 1.4 + 2) * 3,
      p2y: 74 + Math.cos(p * 1.8 + 1) * 3,
      drift: p * 360,
    })
  })

  return (
    <svg
      className="pointer-events-none fixed inset-0 h-full w-full z-[1]"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="planet0" cx="38%" cy="35%">
          <stop offset="0%" stopColor="#8FE3E0" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#3A8E8A" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1A4A48" stopOpacity="0.4" />
        </radialGradient>
        <radialGradient id="planet0-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#8FE3E0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#8FE3E0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="planet1" cx="40%" cy="32%">
          <stop offset="0%" stopColor="#FFB088" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#CC5533" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5A1A0A" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="planet1-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FF7A59" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#FF7A59" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="planet2" cx="36%" cy="38%">
          <stop offset="0%" stopColor="#F2D98B" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#C49030" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#6A4A10" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="planet2-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#F2B84B" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#F2B84B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Planet 0 — teal, with ring */}
      <g opacity={s.portalS * 0.85} transform={`translate(${s.p0x},${s.p0y})`}>
        <circle r="9" fill="url(#planet0-glow)" />
        <circle r="4.8" fill="url(#planet0)" />
        <ellipse
          rx="8.2"
          ry="1.6"
          fill="none"
          stroke="#8FE3E0"
          strokeWidth="0.4"
          opacity="0.5"
          transform="rotate(-18)"
        />
        <ellipse
          rx="8.2"
          ry="1.6"
          fill="none"
          stroke="#8FE3E0"
          strokeWidth="0.2"
          opacity="0.25"
          transform="rotate(-18)"
          strokeDasharray="1.2 0.8"
        />
      </g>

      {/* Planet 1 — coral, large gas giant */}
      <g opacity={s.portalS * 0.7} transform={`translate(${s.p1x},${s.p1y})`}>
        <circle r="7" fill="url(#planet1-glow)" />
        <circle r="3.6" fill="url(#planet1)" />
        <path
          d="M-3.2,-0.4 Q0,-1.2 3.2,-0.4"
          fill="none"
          stroke="#FFB088"
          strokeWidth="0.25"
          opacity="0.3"
        />
        <path
          d="M-2.8,0.8 Q0,0.2 2.8,0.8"
          fill="none"
          stroke="#CC5533"
          strokeWidth="0.2"
          opacity="0.2"
        />
      </g>

      {/* Planet 2 — gold, with faint ring */}
      <g opacity={s.portalS * 0.65} transform={`translate(${s.p2x},${s.p2y})`}>
        <circle r="6" fill="url(#planet2-glow)" />
        <circle r="3" fill="url(#planet2)" />
        <ellipse
          rx="5.5"
          ry="1.1"
          fill="none"
          stroke="#F2B84B"
          strokeWidth="0.3"
          opacity="0.35"
          transform="rotate(12)"
        />
      </g>

      {/* Tiny distant dots */}
      <g opacity={s.portalS * 0.4}>
        <circle cx={30 + Math.sin(s.drift * 0.01) * 2} cy="42" r="0.5" fill="#F2B84B" opacity="0.5" />
        <circle cx={55 + Math.cos(s.drift * 0.008) * 1.5} cy="12" r="0.4" fill="#8FE3E0" opacity="0.4" />
        <circle cx={45 + Math.sin(s.drift * 0.012 + 1) * 1.8} cy="88" r="0.35" fill="#FF7A59" opacity="0.35" />
      </g>
    </svg>
  )
}
