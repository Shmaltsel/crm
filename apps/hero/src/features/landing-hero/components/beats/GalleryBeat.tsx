import { MotionValue, motion, useTransform, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { GALLERY_NODES } from '../../data/gallery'

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
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Галерея емоцій
        </p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
          Моменти, складені в сузір'я
        </h2>
        <div className="relative mx-auto mt-6 w-[min(740px,92vw)]" style={{ height: 320 }}>
          <svg
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 700 340"
          >
            <GalPath offset={pathOffset} />
          </svg>
          {GALLERY_NODES.map((node, idx) => (
            <GalNode key={idx} node={node} index={idx} strength={strength} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function GalPath({ offset }: { offset: number }) {
  return (
    <path
      d="M60,260 C160,120 260,300 350,150 C440,20 560,220 640,90"
      fill="none"
      stroke="#F2B84B"
      strokeWidth="1.5"
      opacity="0.45"
      strokeDasharray="1200"
      strokeDashoffset={1200 * offset}
    />
  )
}

function GalNode({
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
  const scaleVal = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.55, 0.55, 1])
  const shadow = useTransform(strength, [0, litThreshold, litThreshold + 0.01], ['none', 'none', '0 0 14px rgba(242,184,75,0.38)'])

  return (
    <motion.button
      className="absolute z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-none bg-gold p-0"
      style={{
        left: node.left,
        top: node.top,
        opacity,
        scale: scaleVal,
        boxShadow: shadow,
      }}
      aria-label={node.label}
    >
      <span className="pointer-events-none absolute left-1/2 top-[-34px] -translate-x-1/2 whitespace-nowrap text-xs text-mist opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100">
        {node.label}
      </span>
    </motion.button>
  )
}
