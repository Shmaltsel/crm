import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { MediaPlaceholder } from '../MediaPlaceholder'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
}

export function HeroBeat({ progress, onOpenContact }: Props) {
  const strength = useBeatStrength(progress, 0)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div
      role="region"
      aria-label="Головна секція"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Освітні події для дітей
        </p>
        <h1 className="text-[clamp(42px,7.2vw,86px)] leading-[1.02] text-paper">
          Уява<br />
          <em className="font-serif italic text-gold">оживає</em>
        </h1>
        <p className="mx-auto mt-[22px] max-w-[460px] text-[17px] leading-[1.55] text-mist">
          Ми створюємо сучасні освітні події, які діти пам'ятають роками.
        </p>

        <MediaPlaceholder
          label="Відео-превʼю події"
          className="mx-auto mt-8 h-[min(220px,30vw)] w-[min(420px,80vw)]"
        />

        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <button className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)]">
            Летимо далі
          </button>
          <button
            onClick={onOpenContact}
            className="rounded-full border border-white/32 bg-transparent px-7 py-3.5 text-[14.5px] font-bold text-paper transition-all hover:-translate-y-[3px] hover:border-gold hover:text-gold"
          >
            Запросити подію
          </button>
        </div>
      </div>
    </motion.div>
  )
}
