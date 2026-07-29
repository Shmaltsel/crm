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
