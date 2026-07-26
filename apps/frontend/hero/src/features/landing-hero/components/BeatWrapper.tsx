import { useState } from 'react'
import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  strength: MotionValue<number>
  children: ReactNode
}

export function BeatWrapper({ strength, children }: Props) {
  const [active, setActive] = useState(false)
  useMotionValueEvent(strength, 'change', (s) => setActive(s > 0.15))
  return (
    <div className={active ? 'pointer-events-auto' : 'pointer-events-none'} inert={!active ? true : undefined}>
      {children}
    </div>
  )
}
