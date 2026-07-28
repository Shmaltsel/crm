import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { GALLERY_NODES } from '../../data/gallery'
import { MediaPlaceholder } from '../MediaPlaceholder'

interface Props {
  progress: MotionValue<number>
}

const ACCENTS = ['#F2B84B', '#FF7A59', '#8FE3E0', '#FF6EC7', '#F2B84B']
const ROTATIONS = [-2.5, 1.8, -1.2, 3.1, -0.7]

export function GalleryBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 9)
  const y = useTransform(strength, [0, 1], [22, 0])

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
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
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
  const scaleVal = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.88, 0.88, 1])
  const accent = ACCENTS[index % ACCENTS.length]
  const rot = ROTATIONS[index % ROTATIONS.length]

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      style={{ opacity, scale: scaleVal }}
      whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className="overflow-hidden rounded-xl border-2 bg-white/[0.03] transition-shadow hover:shadow-[0_0_20px_rgba(242,184,75,0.15)]"
        style={{
          borderColor: accent,
          transform: `rotate(${rot}deg)`,
          boxShadow: `0 0 0 1px ${accent}22`,
        }}
      >
        <MediaPlaceholder
          label={node.label}
          className="h-[100px] w-full"
        />
      </div>
      <span
        className="mt-1 text-[11px] font-medium"
        style={{ color: accent }}
      >
        {node.label}
      </span>
    </motion.div>
  )
}
