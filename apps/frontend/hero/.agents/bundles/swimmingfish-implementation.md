# Bundle: SwimmingFish Implementation (Hero Project)

Джерело: `C:\CRM\apps\frontend\hero\`

---

## How It Works

Риба використовує оригінальний CSS-підхід з вкладеними `<div>` (chain nesting).

5 сегментів (Riba1–Riba5) ВКЛАДЕНІ один в одного, кожен 60×200px, з `background-image`
(спрайт `fish-sprite.png`, 300×200px) та `background-position` для показу своєї "смуги".

Вкладеність забезпечує КОМПОЗИЦІЮ трансформів: обертання батьківського сегмента
переноситься на всі дочірні, а кожен наступний сегмент додає СВОЄ додаткове обертання
ПОВЕРХ успадкованого. Саме це створює ефект "хребта, що плавно згинається".

Ключові моменти:
- **БЕЗ overflow:hidden** — в оригіналі його немає; фон обрізається власними
  розмірами елемента (background-clip: border-box за замовчуванням)
- **translate3d(X, 0, Z)** позиціонує кожен дочірній сегмент відносно батьківського
- **transform-style: preserve-3d** на кожному сегменті
- **perspective: 800px** на зовнішньому контейнері
- **transformOrigin: center** (дефолт, без явного вказання)

Амплітуди: ±3°, ±10°, ±16°, ±42°, ±45° (з оригінального CSS).
TranslateX: 59px (спокій), 59/58/55/52px (піки) — з style2.css anim1-5.
TranslateZ: [0, 0, ±10, +30/-23, ±20] — з style2.css anim1-5.

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
const SEG_X = [59, 59, 59, 59, 59] as const
const SEG_X_PEAK = [59, 59, 58, 55, 52] as const
const SEG_X_PEAK_NEG = [59, 59, 58, 54, 52] as const
const SEG_Z = [0, 0, 10, 30, 20] as const
const SEG_Z_NEG = [0, 0, -10, -23, -20] as const

function buildKeyframes(): string {
  let css = ''
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const peak = SEG_PEAK[i]
    const xRest = SEG_X[i]
    const xPeak = SEG_X_PEAK[i]
    const xPeakNeg = SEG_X_PEAK_NEG[i]
    const zPos = SEG_Z[i]
    const zNeg = SEG_Z_NEG[i]
    css += `@keyframes sf_rot${i}{`
    css += `0%{transform:translate3d(${xRest}px,0,0) rotateY(0deg)}`
    css += `25%{transform:translate3d(${xPeak}px,0,${zPos}px) rotateY(${-peak}deg)}`
    css += `50%{transform:translate3d(${xRest}px,0,0) rotateY(0deg)}`
    css += `75%{transform:translate3d(${xPeakNeg}px,0,${zNeg}px) rotateY(${peak}deg)}`
    css += `100%{transform:translate3d(${xRest}px,0,0) rotateY(0deg)}`
    css += `}`
  }
  css += '@keyframes sf_wobble{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}'
  return css
}

const KEYFRAMES_CSS = buildKeyframes()

function FishSegment({ depth }: { depth: number }): JSX.Element {
  if (depth >= SEGMENT_COUNT) {
    return (
      <div
        style={{
          width: `${SEGMENT_W}px`,
          height: `${SEGMENT_H}px`,
          backgroundImage: `url(${FISH_SRC})`,
          backgroundSize: `${SEGMENT_W * SEGMENT_COUNT}px ${SEGMENT_H}px`,
          backgroundPosition: `${-depth * SEGMENT_W}px 0px`,
          backgroundRepeat: 'no-repeat',
        }}
      />
    )
  }

  return (
    <div
      style={{
        width: `${SEGMENT_W}px`,
        height: `${SEGMENT_H}px`,
        backgroundImage: `url(${FISH_SRC})`,
        backgroundSize: `${SEGMENT_W * SEGMENT_COUNT}px ${SEGMENT_H}px`,
        backgroundPosition: `${-depth * SEGMENT_W}px 0px`,
        backgroundRepeat: 'no-repeat',
        transformStyle: 'preserve-3d',
        animation: `sf_rot${depth} ${CYCLE}s linear infinite`,
      }}
    >
      <FishSegment depth={depth + 1} />
    </div>
  )
}

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
          }}
        >
          <FishSegment depth={0} />
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

<div className={`${mediaAnimClass} flex h-[min(200px,28vw)] w-full shrink-0 items-center justify-center md:h-[200px] md:w-[280px]`}>
  <SwimmingFish />
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
