import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { MEDIA_URLS } from '../../data/media'
import { PortalVideoCarousel, type CarouselVideo } from '../PortalVideoCarousel'

interface Props {
  progress: MotionValue<number>
}

const POPIFY_VIDEOS: CarouselVideo[] = [
  { id: 'popify-1', src: MEDIA_URLS.popify1, label: 'Popify 1' },
  { id: 'popify-2', src: MEDIA_URLS.popify2, label: 'Popify 2' },
  { id: 'popify-3', src: MEDIA_URLS.popify3, label: 'Popify 3' },
  { id: 'popify-4', src: MEDIA_URLS.popify4, label: 'Popify 4' },
]

export function PopifyBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 12)
  const y = useTransform(strength, [0, 1], [22, 0])

  return (
    <motion.div
      role="region"
      aria-label="Відео на згадку"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[900px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Проєкт 03 · Popify
        </p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
          Відео на згадку
        </h2>
        <div className="mt-8">
          <PortalVideoCarousel videos={POPIFY_VIDEOS} />
        </div>
      </div>
    </motion.div>
  )
}
