import { MotionValue, motion, useTransform, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { GALLERY_NODES } from '../../data/gallery'
import { MediaPlaceholder } from '../MediaPlaceholder'

interface Props {
  progress: MotionValue<number>
}

export function GalleryBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 9)
  const y = useTransform(strength, [0, 1], [22, 0])
  const [pathOffset, setPathOffset] = useState(1)

  useMotionValueEvent(strength, 'change', (s) => {
    setPathOffset(1 - s)
  })

  return (
    <motion.div
      role="region"
      aria-label="Галерея емоцій"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[820px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Галерея емоцій
        </p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
          Моменти, складені в сузір&apos;я
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {GALLERY_NODES.map((node, idx) => (
            <GalCard key={idx} node={node} index={idx} strength={strength} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function GalCard({
  node,
  index,
  strength,
}: {
  node: (typeof GALLERY_NODES)[number]
  index: number
  strength: MotionValue<number>
}) {
  const litThreshold = 0.02 + index * 0.14
  const opacity = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.3, 0.3, 1])
  const scaleVal = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.9, 0.9, 1])

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      style={{ opacity, scale: scaleVal }}
    >
      <MediaPlaceholder
        label={node.label}
        className="h-[100px] w-full"
      />
    </motion.div>
  )
}
