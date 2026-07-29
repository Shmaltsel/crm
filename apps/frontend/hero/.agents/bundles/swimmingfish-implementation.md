# Bundle: SwimmingFish Implementation (Hero Project)

Джерело: `C:\CRM\apps\frontend\hero\`

---

## How It Works

Поточна реалізація використовує inline SVG рибу (5 сегментів: head, body×2, rear, tail) з вкладеними `<g>` елементами.

Кожен сегмент має `clipPath` (inset) для показу тільки своєї частини (60px wide з 300px viewBox).

3D-анімація: `perspective: 800px` на зовнішньому контейнері, `transform-style: preserve-3d` на кожному сегменті, `rotateY` з амплітудами ±3°, ±10°, ±16°, ±42°, ±45°.

Рух: `translateX` (плавання) + `translateY` (хвиля), активується при наведенні миши.

---

## Файли

### 1. SwimmingFish.tsx (поточна реалізація)

```tsx
import { useState } from 'react'

const SEGMENT_W = 60
const SEGMENT_COUNT = 5
const CYCLE = 2

const SEG_PEAK = [3, 10, 16, 42, 45] as const

function buildKeyframes(): string {
  let css = ''
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const peak = SEG_PEAK[i]
    css += `@keyframes sf_rot${i}{0%{transform:rotateY(0deg)}25%{transform:rotateY(${-peak}deg)}50%{transform:rotateY(0deg)}75%{transform:rotateY(${peak}deg)}100%{transform:rotateY(0deg)}}`
  }
  css += '@keyframes sf_swim{0%{transform:translateX(-120%)}100%{transform:translateX(120%)}}'
  css += '@keyframes sf_wobble{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}'
  return css
}

const KEYFRAMES_CSS = buildKeyframes()

function FishSVG() {
  return (
    <>
      <defs>
        <linearGradient id="sfH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD97A" />
          <stop offset="100%" stopColor="#D4922A" />
        </linearGradient>
        <linearGradient id="sfB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFBF42" />
          <stop offset="100%" stopColor="#CC7A00" />
        </linearGradient>
        <linearGradient id="sfT" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#E5A030" />
          <stop offset="100%" stopColor="#C47A10" />
        </linearGradient>
      </defs>
      {/* Head */}
      <ellipse cx="40" cy="50" rx="38" ry="32" fill="url(#sfH)" />
      <ellipse cx="38" cy="50" rx="36" ry="30" fill="url(#sfH)" opacity={0.7} />
      <ellipse cx="24" cy="42" rx="5" ry="6" fill="#0B0E1F" />
      <ellipse cx="26" cy="40" rx="1.8" ry="2.2" fill="#FBF5EA" />
      <path d="M12,58 Q20,64 28,58" fill="none" stroke="#0B0E1F" strokeWidth={1.2} />
      <path d="M50,28 Q58,18 68,24" fill="url(#sfH)" stroke="#D4922A" strokeWidth={0.8} opacity={0.8} />
      {/* Body1 */}
      <ellipse cx="100" cy="50" rx="44" ry="34" fill="url(#sfB)" />
      <path d="M62,30 Q80,22 100,26 Q120,22 138,30" fill="none" stroke="#CC7A00" strokeWidth={0.6} opacity={0.5} />
      <path d="M64,40 Q82,34 100,36 Q118,34 136,40" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.4} />
      <path d="M66,50 Q84,44 100,46 Q116,44 134,50" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.3} />
      {/* Body2 */}
      <ellipse cx="160" cy="50" rx="40" ry="32" fill="url(#sfB)" />
      <path d="M122,30 Q140,24 160,28 Q180,24 198,30" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.4} />
      <path d="M124,42 Q142,36 160,38 Q178,36 196,42" fill="none" stroke="#CC7A00" strokeWidth={0.4} opacity={0.3} />
      {/* Rear */}
      <ellipse cx="220" cy="50" rx="38" ry="30" fill="url(#sfB)" />
      <path d="M184,34 Q202,28 220,32 Q238,28 256,34" fill="none" stroke="#CC7A00" strokeWidth={0.4} opacity={0.3} />
      {/* Tail */}
      <path d="M250,50 L300,20 Q305,50 300,80 Z" fill="url(#sfT)" />
      <path d="M255,50 L295,28 Q298,50 295,72 Z" fill="url(#sfT)" opacity={0.6} />
      <path d="M260,50 L290,36 Q292,50 290,64 Z" fill="url(#sfT)" opacity={0.3} />
    </>
  )
}

export function SwimmingFish({ className = '' }: { className?: string }) {
  const [swimming, setSwimming] = useState(false)

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      onMouseEnter={() => setSwimming(true)}
      onMouseLeave={() => setSwimming(false)}
    >
      <style>{KEYFRAMES_CSS}</style>
      <div style={{ perspective: '800px', perspectiveOrigin: '50% 50%' }}>
        <div
          style={{
            animation: swimming
              ? 'sf_swim 4s ease-in-out infinite alternate, sf_wobble 1.2s ease-in-out infinite'
              : 'sf_wobble 1.2s ease-in-out infinite',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg
            viewBox="0 0 300 100"
            className="h-auto w-[180px] md:w-[220px]"
            style={{ overflow: 'visible' }}
          >
            {/* Segment 1 (head): clip 0-60, rotate ±3° */}
            <g
              style={{
                clipPath: 'inset(0 240px 0 0)',
                transformOrigin: `${SEGMENT_W}px 50px`,
                animation: `sf_rot0 ${CYCLE}s linear infinite`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Segment 2: clip 60-120, rotate ±10° */}
              <g
                style={{
                  clipPath: 'inset(0 180px 0 0)',
                  transformOrigin: `${SEGMENT_W * 2}px 50px`,
                  animation: `sf_rot1 ${CYCLE}s linear infinite`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Segment 3: clip 120-180, rotate ±16° */}
                <g
                  style={{
                    clipPath: 'inset(0 120px 0 0)',
                    transformOrigin: `${SEGMENT_W * 3}px 50px`,
                    animation: `sf_rot2 ${CYCLE}s linear infinite`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Segment 4: clip 180-240, rotate ±42° */}
                  <g
                    style={{
                      clipPath: 'inset(0 60px 0 0)',
                      transformOrigin: `${SEGMENT_W * 4}px 50px`,
                      animation: `sf_rot3 ${CYCLE}s linear infinite`,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Segment 5 (tail): clip 240-300, rotate ±45° */}
                    <g
                      style={{
                        clipPath: 'inset(0 0px 0 0)',
                        transformOrigin: `${SEGMENT_W * 5}px 50px`,
                        animation: `sf_rot4 ${CYCLE}s linear infinite`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <FishSVG />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
```

---

### 2. WorldBeat.tsx (споживач — beat 4)

```tsx
import { MotionValue, motion, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { BEAT_CONTENT, WORLD_BEATS } from '../../data/worlds'
import { MEDIA_URLS } from '../../data/media'
import { MediaPlaceholder } from '../MediaPlaceholder'
import { HologramGallery } from '../HologramGallery'
import { SwimmingFish } from '../SwimmingFish'
import { PortalVideoCarousel, type CarouselVideo } from '../PortalVideoCarousel'

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

const POPIFY_VIDEOS: CarouselVideo[] = [
  { id: 'popify-1', src: MEDIA_URLS.popify1, label: 'Popify 1' },
  { id: 'popify-2', src: MEDIA_URLS.popify2, label: 'Popify 2' },
  { id: 'popify-3', src: MEDIA_URLS.popify3, label: 'Popify 3' },
  { id: 'popify-4', src: MEDIA_URLS.popify4, label: 'Popify 4' },
]

export function WorldBeat({ progress, beatIndex }: Props) {
  const strength = useBeatStrength(progress, beatIndex)
  const y = useTransform(strength, [0, 1], [22, 0])
  const content = BEAT_CONTENT[beatIndex]
  if (!content) return null

  const worldKey = getWorldKey(beatIndex)
  const mediaAnimClass = getMediaAnimClass(worldKey)

  const isHologram = beatIndex === 5
  const isPopify = beatIndex === 6
  const isFish = beatIndex === 4

  return (
    <motion.div
      role="region"
      aria-label={content.heading}
      className="absolute inset-0 flex flex-col items-center justify-center overflow-visible px-6 text-center"
      style={{ opacity: strength, y }}
    >
      {/* ... hologram/popify branches ... */}
      
      {isFish ? (
        <div className="flex max-w-[820px] flex-col items-center gap-8 md:flex-row md:text-left">
          <div className={`${mediaAnimClass} flex h-[min(200px,28vw)] w-full shrink-0 items-center justify-center md:h-[200px] md:w-[280px]`}>
            <SwimmingFish />
          </div>
          <div className="max-w-[480px]">
            <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word" style={{ animationDelay: '0.1s' }}>
              {content.eyebrow}
            </p>
            <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word" style={{ animationDelay: '0.2s' }}>
              {content.heading}
            </h2>
            {content.sub && (
              <p className="mx-auto mt-4 max-w-[480px] text-[15.5px] leading-[1.55] text-mist-soft md:mx-0 stagger-word" style={{ animationDelay: '0.35s' }}>
                {content.sub}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* default branch */
        null
      )}
    </motion.div>
  )
}
```

---

### 3. worlds.ts (контент біту 4)

```ts
export const WORLD_BEATS = [
  { beatIndices: [3, 4], portalKey: 'malyuvaika' },
  { beatIndices: [5], portalKey: 'hologram' },
  { beatIndices: [6, 7], portalKey: 'popify' },
]

export const BEAT_CONTENT: Record<number, { eyebrow: string; heading: string; sub?: string }> = {
  // ...
  4: {
    eyebrow: 'Чарівне море',
    heading: 'Намалюй рибку — і вона оживе',
    sub: "Кожна дитина малює свою рибку з любов'ю — а потім бачить, як та оживає й пливе в чарівному морі.",
  },
  // ...
}
```

---

### 4. index.css (релевантні анімації)

```css
/* Анімація входу для біту 4 (fish) — world-organic-entry */
@keyframes worldOrganicEntry {
  0% { opacity: 0; transform: scale(0.92, 1.06); }
  60% { opacity: 1; transform: scale(1.01, 0.99); }
  100% { opacity: 1; transform: scale(1, 1); }
}

.world-organic-entry {
  animation: worldOrganicEntry 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
