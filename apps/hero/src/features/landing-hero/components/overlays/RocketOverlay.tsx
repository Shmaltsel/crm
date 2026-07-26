import { MotionValue, useTransform, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { useRocketPath } from '../../hooks/useRocketPath'
import { clamp } from '../../lib/animation'

interface Props {
  progress: MotionValue<number>
  finaleStrength: MotionValue<number>
}

export function RocketOverlay({ progress, finaleStrength }: Props) {
  const { rx, ry, rr } = useRocketPath(progress)
  const [pos, setPos] = useState({ x: 0, y: 0, r: -6 })
  const [opacity, setOpacity] = useState(1)

  const finaleS = useTransform(finaleStrength, (s) => clamp(1 - s * 1.4, 0, 1))

  useMotionValueEvent(rx, 'change', (v) => setPos((p) => ({ ...p, x: v * window.innerWidth })))
  useMotionValueEvent(ry, 'change', (v) => setPos((p) => ({ ...p, y: v * window.innerHeight })))
  useMotionValueEvent(rr, 'change', (v) => setPos((p) => ({ ...p, r: v })))
  useMotionValueEvent(finaleS, 'change', setOpacity)

  return (
    <div
      className="pointer-events-none absolute z-[6]"
      aria-hidden="true"
      style={{
        width: 58,
        height: 58,
        transform: `translate(${pos.x - 29}px, ${pos.y - 29}px) rotate(${pos.r}deg)`,
        opacity,
      }}
    >
      <svg viewBox="-40 -70 80 140" className="h-full w-full overflow-visible">
        <path
          d="M0,-60 C24,-40 24,10 0,40 C-24,10 -24,-40 0,-60 Z"
          fill="none"
          stroke="#FBF5EA"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="-14" r="9" fill="none" stroke="#F2B84B" strokeWidth="2.3" />
        <path d="M-13,20 L-32,42" stroke="#FBF5EA" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M13,20 L32,42" stroke="#FBF5EA" strokeWidth="2.5" strokeLinecap="round" />
        <RocketFlame />
      </svg>
    </div>
  )
}

function RocketFlame() {
  return (
    <path
      d="M0,42 C-6,60 6,60 0,78"
      stroke="#FF7A59"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      opacity="0.8"
    >
      <animate
        attributeName="opacity"
        values="0.5;0.8;0.5"
        dur="0.28s"
        repeatCount="indefinite"
      />
    </path>
  )
}
