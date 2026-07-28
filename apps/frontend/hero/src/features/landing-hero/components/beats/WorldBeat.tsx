import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { BEAT_CONTENT, WORLD_BEATS } from '../../data/worlds'
import { MEDIA_URLS } from '../../data/media'
import { MediaPlaceholder } from '../MediaPlaceholder'
import { HologramGallery } from '../HologramGallery'

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

const WORLD_MEDIA: Record<number, string | undefined> = {
  4: MEDIA_URLS.malyuvaika,
  5: MEDIA_URLS.hologramEvent,
  6: MEDIA_URLS.popify,
}

function getWorldKey(beatIndex: number): string {
  for (const wb of WORLD_BEATS) {
    if (wb.beatIndices.includes(beatIndex)) return wb.portalKey
  }
  return 'default'
}

function getMediaAnimClass(worldKey: string): string {
  switch (worldKey) {
    case 'malyuvaika': return 'world-organic-entry'
    case 'hologram': return 'world-scan-entry'
    case 'popify': return 'world-bounce-entry'
    default: return ''
  }
}

export function WorldBeat({ progress, beatIndex }: Props) {
  const strength = useBeatStrength(progress, beatIndex)
  const y = useTransform(strength, [0, 1], [22, 0])
  const content = BEAT_CONTENT[beatIndex]
  if (!content) return null

  const worldKey = getWorldKey(beatIndex)
  const mediaAnimClass = getMediaAnimClass(worldKey)

  const isHologram = beatIndex === 5

  return (
    <motion.div
      role="region"
      aria-label={content.heading}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      {isHologram ? (
        <div className="flex max-w-[900px] flex-col items-center gap-8 md:flex-row md:text-left">
          <div className={`${mediaAnimClass} w-full shrink-0 md:w-[440px]`}>
            <HologramGallery />
          </div>
          <div className="max-w-[480px]">
            <p
              className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
              style={{ animationDelay: '0.1s' }}
            >
              {content.eyebrow}
            </p>
            <h2
              className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
              style={{ animationDelay: '0.2s' }}
            >
              {content.heading}
            </h2>
            {content.sub && (
              <p
                className="mx-auto mt-4 max-w-[480px] text-[15.5px] leading-[1.55] text-mist-soft md:mx-0 stagger-word"
                style={{ animationDelay: '0.35s' }}
              >
                {content.sub}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex max-w-[820px] flex-col items-center gap-8 md:flex-row md:text-left">
          <div className={`${mediaAnimClass} h-[min(200px,28vw)] w-full shrink-0 md:h-[200px] md:w-[280px]`}>
            <MediaPlaceholder
              label={WORLD_ICONS[beatIndex] ?? 'Ілюстрація'}
              src={WORLD_MEDIA[beatIndex]}
              className="h-full w-full"
            />
          </div>
          <div className="max-w-[480px]">
            <p
              className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word"
              style={{ animationDelay: '0.1s' }}
            >
              {content.eyebrow}
            </p>
            <h2
              className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word"
              style={{ animationDelay: '0.2s' }}
            >
              {content.heading}
            </h2>
            {content.sub && (
              <p
                className="mx-auto mt-4 max-w-[480px] text-[15.5px] leading-[1.55] text-mist-soft md:mx-0 stagger-word"
                style={{ animationDelay: '0.35s' }}
              >
                {content.sub}
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}
