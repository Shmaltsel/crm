import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { MEDIA_URLS } from '../../data/media'
import { MediaPlaceholder } from '../MediaPlaceholder'

interface Props {
  progress: MotionValue<number>
}

export function ManifestBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 1)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div
      role="region"
      aria-label="Наш принцип"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p
          className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
          style={{ animationDelay: '0.1s' }}
        >
          Наш принцип
        </p>
        <p className="text-[clamp(24px,3.5vw,40px)] leading-[1.35] text-paper">
          <span className="stagger-word inline-block" style={{ animationDelay: '0.25s' }}>
            Ми не проводимо заходи.
          </span>
          <br />
          <span className="stagger-word inline-block" style={{ animationDelay: '0.45s' }}>
            Ми запалюємо{' '}
            <span className="glow-word-coral">світло</span>
            {' '}в очах дітей.
          </span>
        </p>
        <div className="stagger-word" style={{ animationDelay: '0.65s' }}>
          <MediaPlaceholder
            label="Фото або відео з події"
            src={MEDIA_URLS.malyuvaika}
            className="mx-auto mt-8 h-[min(180px,24vw)] w-[min(380px,75vw)]"
          />
        </div>
      </div>
    </motion.div>
  )
}
