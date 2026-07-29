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
    css += `0%{transform:rotateY(0deg)}`
    css += `25%{transform:translateZ(${zPos}px) rotateY(${-peak}deg)}`
    css += `50%{transform:rotateY(0deg)}`
    css += `75%{transform:translateZ(${zNeg}px) rotateY(${peak}deg)}`
    css += `100%{transform:rotateY(0deg)}`
    css += `}`
  }
  css += `@keyframes sf_figure8{`
  css += `0%{transform:translate(0,0) scaleX(1)}`
  css += `12.5%{transform:translate(30px,-18px) scaleX(1)}`
  css += `25%{transform:translate(50px,0) scaleX(1)}`
  css += `37.5%{transform:translate(30px,18px) scaleX(1)}`
  css += `50%{transform:translate(0,0) scaleX(-1)}`
  css += `62.5%{transform:translate(-30px,-18px) scaleX(-1)}`
  css += `75%{transform:translate(-50px,0) scaleX(-1)}`
  css += `87.5%{transform:translate(-30px,18px) scaleX(-1)}`
  css += `100%{transform:translate(0,0) scaleX(1)}`
  css += `}`
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
            animation: swimming
              ? 'sf_figure8 4s ease-in-out infinite'
              : 'none',
            transformStyle: 'preserve-3d',
          }}
        >
          <FishSegment depth={0} />
        </div>
      </div>
    </div>
  )
}
