import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
  onConfetti: (x: number, y: number) => void
}

export function FinaleBeat({ progress, onOpenContact, onConfetti }: Props) {
  const strength = useBeatStrength(progress, 12)
  const y = useTransform(strength, [0, 1], [22, 0])

  const handleClick = (e: React.MouseEvent) => {
    onOpenContact()
    onConfetti(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight * 0.7)
  }

  return (
    <motion.div
      role="region"
      aria-label="Запрошення"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Запрошення
        </p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
          Наступна історія<br />
          може початися{' '}
          <em className="font-serif italic text-gold">у вашій школі</em>
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <button
            onClick={handleClick}
            className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)]"
          >
            Запросити подію
          </button>
        </div>
      </div>
    </motion.div>
  )
}
