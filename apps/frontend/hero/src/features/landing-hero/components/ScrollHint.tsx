import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { Z } from '../lib/zIndex'

interface Props {
  progress: MotionValue<number>
  finaleStrength: MotionValue<number>
}

export function ScrollHint({ progress, finaleStrength }: Props) {
  const [opacity, setOpacity] = useState(1)

  useMotionValueEvent(progress, 'change', (p) => {
    if (p > 0.015 || finaleStrength.get() > 0.3) {
      setOpacity(0)
    } else {
      setOpacity(1)
    }
  })

  useMotionValueEvent(finaleStrength, 'change', (s) => {
    if (s > 0.3) setOpacity(0)
  })

  return (
    <div
      className="pointer-events-none fixed bottom-7 left-1/2 -translate-x-1/2 text-center"
      style={{ zIndex: Z.scrollHint, opacity }}
    >
      <div className="mx-auto mb-2 h-8 w-px bg-gradient-to-b from-gold to-transparent">
        <div className="h-full w-full origin-top" style={{ animation: 'cueMove 2.4s cubic-bezier(.22,1,.36,1) infinite' }} />
      </div>
      <span className="text-[11px] uppercase tracking-[0.16em] text-mist-soft">
        Скрольте, щоб летіти далі
      </span>
    </div>
  )
}
