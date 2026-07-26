import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { BEAT_CONTENT } from '../../data/worlds'
import { MediaPlaceholder } from '../MediaPlaceholder'

interface Props {
  progress: MotionValue<number>
  beatIndex: number
}

const WORLD_ICONS: Record<number, string> = {
  3: 'Малювайка — заняття',
  4: 'Рибка оживає',
  5: 'Голограма — проекція',
  6: 'Popify — зйомка',
  7: 'Popify — прайс',
}

export function WorldBeat({ progress, beatIndex }: Props) {
  const strength = useBeatStrength(progress, beatIndex)
  const y = useTransform(strength, [0, 1], [22, 0])
  const content = BEAT_CONTENT[beatIndex]
  if (!content) return null

  return (
    <motion.div
      role="region"
      aria-label={content.heading}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="flex max-w-[820px] flex-col items-center gap-8 md:flex-row md:text-left">
        <MediaPlaceholder
          label={WORLD_ICONS[beatIndex] ?? 'Ілюстрація'}
          className="h-[min(200px,28vw)] w-full shrink-0 md:h-[200px] md:w-[280px]"
        />
        <div className="max-w-[480px]">
          <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
            {content.eyebrow}
          </p>
          <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
            {content.heading}
          </h2>
          {content.sub && (
            <p className="mx-auto mt-4 max-w-[480px] text-[15.5px] leading-[1.55] text-mist-soft md:mx-0">
              {content.sub}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
