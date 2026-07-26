import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { clamp } from '../../lib/animation'

interface Props {
  progress: MotionValue<number>
  beatStrengths: MotionValue<number>[]
}

export function PortalOverlay({ progress, beatStrengths }: Props) {
  const [holoS, setHoloS] = useState(0)
  const [drawS, setDrawS] = useState(0)
  const [celeS, setCeleS] = useState(0)
  const [finS, setFinS] = useState(0)
  const [portalS, setPortalS] = useState(0)

  useMotionValueEvent(progress, 'change', () => {
    const h = Math.max(beatStrengths[3]?.get() ?? 0, beatStrengths[4]?.get() ?? 0)
    const d = Math.max(beatStrengths[5]?.get() ?? 0, beatStrengths[6]?.get() ?? 0)
    const c = beatStrengths[7]?.get() ?? 0
    const f = beatStrengths[12]?.get() ?? 0
    const gal = beatStrengths[9]?.get() ?? 0
    const man = beatStrengths[1]?.get() ?? 0

    setHoloS(h)
    setDrawS(d)
    setCeleS(c)
    setFinS(f)
    setPortalS(clamp(Math.max(h, d, c, f, gal * 0.35, man * 0.2), 0, 1))
  })

  const portalScale = 0.92 + portalS * 0.1

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g
        transform={`translate(960,420) scale(${portalScale.toFixed(3)})`}
        style={{ opacity: portalS }}
      >
        <circle r="148" fill="none" stroke="#F2B84B" strokeWidth="1.5" opacity="0.5" />
        <circle r="166" fill="none" stroke="#F2B84B" strokeWidth="1" opacity="0.22" />

        <g opacity={holoS}>
          <path d="M-46,70 L-16,-40 L14,70 Z" stroke="#8FE3E0" strokeWidth="2" fill="none" />
          <path d="M4,70 L34,-10 L64,70 Z" stroke="#8FE3E0" strokeWidth="2" fill="none" />
          <circle cx="10" cy="-90" r="26" fill="none" stroke="#8FE3E0" strokeWidth="1.5" />
        </g>

        <g opacity={drawS}>
          <path d="M-60,60 C-60,0 60,0 60,60" stroke="#FF7A59" strokeWidth="2.1" fill="none" />
          <path d="M-40,60 L-40,0 M40,60 L40,0" stroke="#FF7A59" strokeWidth="2" />
          <path d="M-70,-40 Q0,-90 70,-40" stroke="#F2B84B" strokeWidth="2" fill="none" />
        </g>

        <g opacity={celeS}>
          <path d="M0,-90 L0,60" stroke="#F2B84B" strokeWidth="2" />
          <circle cx="0" cy="-90" r="10" fill="#F2B84B" opacity="0.85" />
          <circle cx="-40" cy="20" r="5" fill="#FF7A59" />
          <circle cx="42" cy="-10" r="5" fill="#8FE3E0" />
          <circle cx="-18" cy="60" r="5" fill="#F2B84B" />
          <circle cx="30" cy="40" r="5" fill="#FF7A59" />
        </g>

        <g opacity={finS}>
          <circle r="68" fill="none" stroke="#F2B84B" strokeWidth="1.7" />
          <ellipse rx="116" ry="28" fill="none" stroke="#F2B84B" strokeWidth="1" opacity="0.45" />
        </g>
      </g>
    </svg>
  )
}
