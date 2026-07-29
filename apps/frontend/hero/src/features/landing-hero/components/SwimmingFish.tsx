import { useState } from 'react'

const SEGMENT_W = 60
const SEGMENT_H = 200
const SEGMENT_COUNT = 5
const CYCLE = 2
const FISH_SRC = '/materials/fish-sprite.png'
const FISH_TOTAL_W = SEGMENT_W * SEGMENT_COUNT

const SEG_PEAK = [3, 10, 16, 42, 45] as const
const SEG_Z = [0, 0, 10, 30, 20] as const
const SEG_Z_NEG = [0, 0, -10, -23, -20] as const
const SEG_X = [59, 59, 58, 55, 52] as const
const SEG_X_NEG = [59, 59, 58, 54, 52] as const

function buildKeyframes(): string {
  let css = ''
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const peak = SEG_PEAK[i]
    const zPos = SEG_Z[i]
    const zNeg = SEG_Z_NEG[i]
    const xPos = SEG_X[i]
    const xNeg = SEG_X_NEG[i]
    css += `@keyframes sf_rot${i}{`
    css += `0%{transform:translate3d(59px,0,0) rotateY(0deg)}`
    css += `25%{transform:translate3d(${xPos}px,0,${zPos}px) rotateY(${-peak}deg)}`
    css += `50%{transform:translate3d(59px,0,0) rotateY(0deg)}`
    css += `75%{transform:translate3d(${xNeg}px,0,${zNeg}px) rotateY(${peak}deg)}`
    css += `100%{transform:translate3d(59px,0,0) rotateY(0deg)}`
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

function FishSegment({ depth, animated }: { depth: number; animated: boolean }): JSX.Element {
  if (depth >= SEGMENT_COUNT) {
    return (
      <div
        style={{
          width: `${SEGMENT_W}px`,
          height: `${SEGMENT_H}px`,
          backgroundImage: `url(${FISH_SRC})`,
          backgroundSize: `${FISH_TOTAL_W}px ${SEGMENT_H}px`,
          backgroundPosition: `${-depth * SEGMENT_W}px 0px`,
          backgroundRepeat: 'no-repeat',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
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
        backgroundSize: `${FISH_TOTAL_W}px ${SEGMENT_H}px`,
        backgroundPosition: `${-depth * SEGMENT_W}px 0px`,
        backgroundRepeat: 'no-repeat',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        transformOrigin: '0px 100px',
        transform: 'translate3d(59px, 0, 0px) rotateY(0deg)',
        animation: animated ? `sf_rot${depth} ${CYCLE}s linear infinite` : undefined,
      }}
    >
      <FishSegment depth={depth + 1} animated={animated} />
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
      <div
        style={{
          perspective: '800px',
          width: `${FISH_TOTAL_W}px`,
          height: `${SEGMENT_H}px`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            marginLeft: '-148px',
            animation: swimming ? 'sf_figure8 4s ease-in-out infinite' : 'none',
            transformStyle: 'preserve-3d',
          }}
        >
          <FishSegment depth={0} animated={swimming} />
        </div>
      </div>
    </div>
  )
}
