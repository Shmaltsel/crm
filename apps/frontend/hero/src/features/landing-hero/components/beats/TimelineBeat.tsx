import { MotionValue, motion, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { TIMELINE_STEPS } from '../../data/timeline'

interface Props {
  progress: MotionValue<number>
}

export function TimelineBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 7)
  const y = useTransform(strength, [0, 1], [22, 0])
  const [linePct, setLinePct] = useState(0)

  useMotionValueEvent(strength, 'change', (s) => {
    setLinePct(Math.round(clamp01(s) * 100))
  })

  return (
    <motion.div
      role="region"
      aria-label="Як проходить подія"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          П'ять кроків
        </p>
        <h2
          className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
          style={{ animationDelay: '0.2s' }}
        >
          Як проходить подія
        </h2>
        <div className="relative mx-auto mt-[42px] w-[min(700px,90vw)] pt-2">
          <div className="absolute top-[9px] left-0 right-0 h-px bg-gold/22" />
          <div className="absolute top-[9px] left-0 right-0 h-px pulse-line" />
          <div
            className="absolute top-[9px] left-0 h-px bg-gradient-to-r from-gold to-coral"
            style={{ width: `${linePct}%`, transition: 'width 0.4s var(--ease-hero)' }}
          />
          <div className="relative flex justify-between">
            {TIMELINE_STEPS.map((step, idx) => (
              <TimelineStepItem key={idx} step={step} index={idx} strength={strength} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v))
}

function TimelineStepItem({
  step,
  index,
  strength,
}: {
  step: (typeof TIMELINE_STEPS)[number]
  index: number
  strength: MotionValue<number>
}) {
  const litThreshold = 0.05 + index * 0.14
  const dotBg = useTransform(strength, [0, litThreshold, litThreshold + 0.01], ['transparent', 'transparent', '#F2B84B'])
  const dotScale = useTransform(strength, [0, litThreshold, litThreshold + 0.01], ['scale(1)', 'scale(1)', 'scale(1.2)'])
  const labelOpacity = useTransform(strength, [0, litThreshold, litThreshold + 0.01], [0, 0, 1])
  const sparkRef = useRef<HTMLSpanElement>(null)
  const sparkedRef = useRef(false)

  useMotionValueEvent(strength, 'change', (s) => {
    if (s > litThreshold && !sparkedRef.current && sparkRef.current) {
      sparkedRef.current = true
      sparkRef.current.classList.add('dot-spark-active')
    }
  })

  return (
    <div className="flex w-[20%] flex-col items-center gap-2.5">
      <span className="relative">
        <motion.span
          ref={sparkRef}
          className="block h-3.5 w-3.5 rounded-full border-2 border-gold"
          style={{ backgroundColor: dotBg, transform: dotScale }}
        />
        <span className="dot-spark-ring absolute inset-[-5px] rounded-full" />
      </span>
      <motion.span
        className="text-[12px] text-mist-soft"
        style={{ opacity: labelOpacity }}
      >
        {step.label}
      </motion.span>
    </div>
  )
}
