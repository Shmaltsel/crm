# Bundle: SwimmingFish Implementation (Hero Project)

Джерело: `C:\CRM\apps\frontend\hero\`

---

## How It Works

Риба використовує оригінальний CSS-підхід з `background-position` slicing.

Одне зображення-спрайт (`fish-sprite.png`, 300×200px RGBA) розрізається на5 сегментів
через `background-position` на 5 sibling `<div>` (кожен 60×200px, `overflow: hidden`).

3D-хребет працює через HTML `<div>` (не SVG `<g>`), що гарантує коректний
`transform-style: preserve-3d` у всіх браузерах (Chrome, Safari, Firefox).

Кожен `<div>-сегмент` має:
- `background-image: url(/materials/fish-sprite.png)`
- `background-position: -i*60px 0px` — показує свою "смугу"
- `transformStyle: preserve-3d`
- `transformOrigin: 0px 100px` — шарнір зліва по центру висоти (left center)
- `animation: sf_rotN 2s linear infinite` — `rotateY` + `translateZ`

Амплітуди: ±3°, ±10°, ±16°, ±42°, ±45° (з оригінального CSS).
TranslateZ: [0, 0, ±10, +30/-23, ±20] (з оригінального CSS).

Вся конструкція обгорнута в контейнер з `perspective: 800px`.

Всі 5 сегментів анімуються з ОДНАКОВОЮ фазою (cycle 2s, linear) —
хвилястість створюється ЛИШЕ наростанням амплітуди від голови до хвоста.

---

## Файли

### 1. SwimmingFish.tsx

```tsx
import { useState } from 'react'

const SEGMENT_W = 60
const SEGMENT_H = 200
const SEGMENT_COUNT = 5
const CYCLE = 2
const FISH_SRC = '/materials/fish-sprite.png'

const SEG_PEAK = [3, 10, 16, 42, 45] as const
const SEG_Z = [0, 0, 10, 30, 20] as const
const SEG_Z_NEG = [0, 0, -10, -23, -20] as const

function buildKeyframes(): string {
  let css = ''
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const peak = SEG_PEAK[i]
    const zPos = SEG_Z[i]
    const zNeg = SEG_Z_NEG[i]
    css += `@keyframes sf_rot${i}{`
    css += `0%{transform:translate3d(0,0,0) rotateY(0deg)}`
    css += `25%{transform:translate3d(0,0,${zPos}px) rotateY(${-peak}deg)}`
    css += `50%{transform:translate3d(0,0,0) rotateY(0deg)}`
    css += `75%{transform:translate3d(0,0,${zNeg}px) rotateY(${peak}deg)}`
    css += `100%{transform:translate3d(0,0,0) rotateY(0deg)}`
    css += `}`
  }
  css += '@keyframes sf_wobble{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}'
  return css
}

const KEYFRAMES_CSS = buildKeyframes()

export function SwimmingFish({ className = '' }: { className?: string }) {
  const [swimming, setSwimming] = useState(false)

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      onMouseEnter={() => setSwimming(true)}
      onMouseLeave={() => setSwimming(false)}
    >
      <style>{KEYFRAMES_CSS}</style>
      <div style={{ perspective: '800px' }}>
        <div
          style={{
            animation: `sf_wobble 1.2s ease-in-out infinite`,
            transformStyle: 'preserve-3d',
            position: 'relative',
            width: `${SEGMENT_W * SEGMENT_COUNT}px`,
            height: `${SEGMENT_H}px`,
          }}
        >
          {Array.from({ length: SEGMENT_COUNT }, (_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 0,
                left: `${i * SEGMENT_W}px`,
                width: `${SEGMENT_W}px`,
                height: `${SEGMENT_H}px`,
                overflow: 'hidden',
                backgroundImage: `url(${FISH_SRC})`,
                backgroundSize: `${SEGMENT_W * SEGMENT_COUNT}px ${SEGMENT_H}px`,
                backgroundPosition: `${-i * SEGMENT_W}px 0px`,
                backgroundRepeat: 'no-repeat',
                transformStyle: 'preserve-3d',
                transformOrigin: '0px 100px',
                animation: `sf_rot${i} ${CYCLE}s linear infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

### 2. fish-sprite.png

Оригінальне кольорове зображення риби з проєкту "Малювака".

- Шлях: `public/materials/fish-sprite.png`
- Розмір: 300×200px, RGBA (прозорий фон)
- Джерело: `C:\Users\shmal\OneDrive\Desktop\малювайка 2\images\IMG_20260715_0001.png`

---

### 3. WorldBeat.tsx (споживач — beat 4)

```tsx
import { SwimmingFish } from '../SwimmingFish'

// В WorldBeat.tsx, beatIndex === 4:
<div className="flex max-w-[820px] flex-col items-center gap-8 md:flex-row md:text-left">
  <div className={`${mediaAnimClass} flex h-[min(200px,28vw)] w-full shrink-0 items-center justify-center md:h-[200px] md:w-[280px]`}>
    <SwimmingFish />
  </div>
  <div className="max-w-[480px]">
    <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90 stagger-word">
      {content.eyebrow}
    </p>
    <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper stagger-word">
      {content.heading}
    </h2>
    {content.sub && <p className="mx-auto mt-4 max-w-[480px] text-[15.5px] leading-[1.55] text-mist-soft md:mx-0 stagger-word">{content.sub}</p>}
  </div>
</div>
```

---

### 4. worlds.ts (контент біту 4)

```ts
4: {
  eyebrow: 'Чарівне море',
  heading: 'Намалюй рибку — і вона оживе',
  sub: "Кожна дитина малює свою рибку з любов'ю — а потім бачить, як та оживає й пливе в чарівному морі.",
}
```

---

### 5. index.css (релевантні анімації)

```css
@keyframes worldOrganicEntry {
  0% { opacity: 0; transform: scale(0.92, 1.06); }
  60% { opacity: 1; transform: scale(1.01, 0.99); }
  100% { opacity: 1; transform: scale(1, 1); }
}

.world-organic-entry {
  animation: worldOrganicEntry 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
