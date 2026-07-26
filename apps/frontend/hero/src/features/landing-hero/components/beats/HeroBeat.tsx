import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { MediaPlaceholder } from '../MediaPlaceholder'
import { MEDIA_URLS } from '../../data/media'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
}

const HERO_WORDS = ['Уява']

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
      <div className="max-w-[680px] iris-reveal">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          Освітні події для дітей
        </p>

        <h1 className="text-[clamp(42px,7.2vw,86px)] leading-[1.02] text-paper">
          {HERO_WORDS.map((word, i) => (
            <span
              key={i}
              className="stagger-word"
              style={{ animationDelay: `${0.3 + i * 0.08}s` }}
            >
              {word}
            </span>
          ))}
          <br />
          <em
            className="font-serif italic text-gold stagger-word glow-word jelly-hover"
            style={{ animationDelay: '0.45s' }}
          >
            оживає
          </em>
        </h1>

        <p
          className="mx-auto mt-[22px] max-w-[460px] text-[17px] leading-[1.55] text-mist stagger-word"
          style={{ animationDelay: '0.6s' }}
        >
          Ми створюємо сучасні освітні події, які діти пам'ятають роками.
        </p>

        <div
          className="stagger-word"
          style={{ animationDelay: '0.75s' }}
        >
          <MediaPlaceholder
            label="Відео-превʼю події"
            src={MEDIA_URLS.heroPreview}
            className="mx-auto mt-8 h-[min(220px,30vw)] w-[min(420px,80vw)]"
          />
        </div>

        <div
          className="mt-9 flex flex-wrap justify-center gap-3.5 stagger-word"
          style={{ animationDelay: '0.9s' }}
        >
          <button className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)] active:scale-[0.97]">
            Летимо далі
          </button>
          <button
            onClick={onOpenContact}
            className="rounded-full border border-white/32 bg-transparent px-7 py-3.5 text-[14.5px] font-bold text-paper transition-all hover:-translate-y-[3px] hover:border-gold hover:text-gold active:scale-[0.97]"
          >
            Запросити подію
          </button>
        </div>
      </div>
    </motion.div>
  )
}
