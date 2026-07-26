import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { clamp } from '../../lib/animation'

interface Props {
  progress: MotionValue<number>
  beatStrengths: MotionValue<number>[]
}

export function PortalOverlay({ progress, beatStrengths }: Props) {
  const [portalS, setPortalS] = useState(0)
  const [hue, setHue] = useState(45)

  useMotionValueEvent(progress, 'change', () => {
    const h = Math.max(beatStrengths[3]?.get() ?? 0, beatStrengths[4]?.get() ?? 0)
    const d = Math.max(beatStrengths[5]?.get() ?? 0, beatStrengths[6]?.get() ?? 0)
    const c = beatStrengths[7]?.get() ?? 0
    const f = beatStrengths[12]?.get() ?? 0
    const s = clamp(Math.max(h, d, c, f), 0, 1)
    setPortalS(s)

    const colors = [
      { h: 45, stop: 0 },
      { h: 175, stop: 0.25 },
      { h: 14, stop: 0.5 },
      { h: 340, stop: 0.7 },
      { h: 45, stop: 1.0 },
    ]
    const p = beatStrengths[12]?.get() ?? 0
    for (let i = 0; i < colors.length - 1; i++) {
      if (p >= colors[i].stop && p <= colors[i + 1].stop) {
        const t = (p - colors[i].stop) / (colors[i + 1].stop - colors[i].stop)
        setHue(colors[i].h + (colors[i + 1].h - colors[i].h) * t)
        break
      }
    }
  })

  const glowScale = 0.85 + portalS * 0.3
  const glowOpacity = portalS * 0.6

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
      style={{
        opacity: glowOpacity,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 500 * glowScale,
          height: 500 * glowScale,
          background: `radial-gradient(circle, hsla(${hue}, 60%, 55%, 0.12) 0%, transparent 70%)`,
          filter: 'blur(40px)',
          transform: `translate(-50%, -50%) scale(${glowScale})`,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 300 * glowScale,
          height: 300 * glowScale,
          background: `radial-gradient(circle, hsla(${(hue + 30) % 360}, 70%, 60%, 0.08) 0%, transparent 60%)`,
          filter: 'blur(24px)',
          transform: `translate(-50%, -50%) scale(${glowScale})`,
        }}
      />
    </div>
  )
}
