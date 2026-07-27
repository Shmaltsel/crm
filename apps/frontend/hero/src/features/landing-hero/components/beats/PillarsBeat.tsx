import { MotionValue, motion, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { PILLARS } from '../../data/pillars'

const PILLAR_ICONS = [
  <svg key="clock" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8">
    <circle cx="22" cy="22" r="16" stroke="#F2B84B" strokeWidth="1.6" pathLength={1} className="pillar-stroke" />
    <path d="M22 13v9l6 4" stroke="#FF7A59" strokeWidth="1.8" strokeLinecap="round" pathLength={1} className="pillar-stroke" />
  </svg>,
  <svg key="person" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8">
    <path d="M8 34c0-8 6-13 14-13s14 5 14 13" stroke="#F2B84B" strokeWidth="1.6" strokeLinecap="round" pathLength={1} className="pillar-stroke" />
    <circle cx="22" cy="14" r="7" stroke="#FF7A59" strokeWidth="1.8" pathLength={1} className="pillar-stroke" />
  </svg>,
  <svg key="star" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8">
    <path d="M22 8l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" stroke="#F2B84B" strokeWidth="1.6" strokeLinejoin="round" pathLength={1} className="pillar-stroke" />
  </svg>,
  <svg key="cross" viewBox="0 0 44 44" fill="none" className="mx-auto mb-2.5 h-8 w-8">
    <path d="M10 22h24M22 10v24" stroke="#F2B84B" strokeWidth="1.6" strokeLinecap="round" pathLength={1} className="pillar-stroke" />
    <circle cx="22" cy="22" r="15" stroke="#FF7A59" strokeWidth="1.6" pathLength={1} className="pillar-stroke" />
  </svg>,
]

interface Props {
  progress: MotionValue<number>
}

export function PillarsBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 2)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div
      role="region"
      aria-label="Чому нам довіряють"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          Чому нам довіряють
        </p>
        <h2
          className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
          style={{ animationDelay: '0.2s' }}
        >
          Довіра будується на деталях
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-[26px]">
          {PILLARS.map((pillar, idx) => (
            <PillarItem
              key={idx}
              pillar={pillar}
              icon={PILLAR_ICONS[idx]}
              index={idx}
              strength={strength}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function PillarItem({
  pillar,
  icon,
  index,
  strength,
}: {
  pillar: (typeof PILLARS)[number]
  icon: React.ReactNode
  index: number
  strength: MotionValue<number>
}) {
  const litThreshold = 0.05 + index * 0.12
  const opacity = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0, 0, 1])
  const translateY = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [12, 12, 0])
  const scale = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0.96, 0.96, 1])
  const elRef = useRef<HTMLDivElement>(null)
  const drawnRef = useRef(false)

  useMotionValueEvent(strength, 'change', (s) => {
    if (s > litThreshold && !drawnRef.current && elRef.current) {
      drawnRef.current = true
      elRef.current.querySelectorAll('.pillar-stroke').forEach((el) => {
        (el as HTMLElement).style.strokeDashoffset = '0'
      })
    }
  })

  return (
    <motion.div
      ref={elRef}
      className="max-w-[180px] text-center"
      style={{ opacity, y: translateY, scale }}
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {icon}
      <h3 className="mb-1.5 text-[15px] font-bold">{pillar.title}</h3>
      <p className="text-[13px] leading-[1.4] text-mist-soft">{pillar.description}</p>
    </motion.div>
  )
}
