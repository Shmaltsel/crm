import { MotionValue, motion, useTransform, useMotionValue, animate, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { STATS } from '../../data/stats'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  progress: MotionValue<number>
}

export function StatsBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 10)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div
      role="region"
      aria-label="Цифри світла"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          Цифри світла
        </p>
        <h2
          className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
          style={{ animationDelay: '0.2s' }}
        >
          Небо, яке ми запалили разом
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-10">
          {STATS.map((stat, idx) => (
            <StatItem key={idx} stat={stat} strength={strength} index={idx} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function StatItem({
  stat,
  strength,
  index,
}: {
  stat: (typeof STATS)[number]
  strength: MotionValue<number>
  index: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const [litStars, setLitStars] = useState(0)
  const [showBounce, setShowBounce] = useState(false)
  const triggeredRef = useRef(false)
  const reduced = useReducedMotion()
  const mv = useMotionValue(0)

  useMotionValueEvent(strength, 'change', (s) => {
    if (s > 0.5 && !triggeredRef.current) {
      triggeredRef.current = true
      if (reduced) {
        setDisplayValue(stat.target)
        setLitStars(stat.starsCount)
        setShowBounce(true)
        return
      }
      animate(mv, stat.target, {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => {
          setDisplayValue(Math.round(v))
          setLitStars(Math.round((stat.starsCount * v) / stat.target))
        },
        onComplete: () => {
          setShowBounce(true)
        },
      })
    }
  })

  return (
    <div
      className="w-[140px] stagger-word"
      style={{ animationDelay: `${0.3 + index * 0.12}s` }}
    >
      <div className="mb-2.5 grid h-8 grid-cols-6 gap-[5px]">
        {Array.from({ length: stat.starsCount }, (_, i) => (
          <i
            key={i}
            className={`mx-auto h-1.5 w-1.5 justify-self-center rounded-full transition-all duration-300 ${
              i < litStars
                ? 'bg-gold shadow-[0_0_7px_rgba(242,184,75,0.38)] stat-star-lit'
                : 'bg-gold/14'
            }`}
          />
        ))}
      </div>
      <div
        className={`font-display text-[32px] text-paper transition-transform duration-300 ${
          showBounce ? 'stat-bounce' : ''
        }`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {displayValue.toLocaleString('uk-UA')}{stat.suffix}
      </div>
      <div className="mt-[3px] text-[12.5px] text-mist-soft">{stat.label}</div>
    </div>
  )
}
