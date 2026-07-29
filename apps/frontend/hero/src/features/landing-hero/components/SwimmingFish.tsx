import { useState } from 'react'

const SEGMENT_W = 60
const SEGMENT_COUNT = 5
const CYCLE = 2
const SVG_TOTAL_W = 300

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

function FishSVG() {
  return (
    <svg
      viewBox={`0 0 ${SVG_TOTAL_W} 100`}
      style={{ display: 'block', width: `${SVG_TOTAL_W}px`, height: '100px' }}
    >
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
      <ellipse cx="40" cy="50" rx="38" ry="32" fill="url(#sfH)" />
      <ellipse cx="38" cy="50" rx="36" ry="30" fill="url(#sfH)" opacity={0.7} />
      <ellipse cx="24" cy="42" rx="5" ry="6" fill="#0B0E1F" />
      <ellipse cx="26" cy="40" rx="1.8" ry="2.2" fill="#FBF5EA" />
      <path d="M12,58 Q20,64 28,58" fill="none" stroke="#0B0E1F" strokeWidth={1.2} />
      <path d="M50,28 Q58,18 68,24" fill="url(#sfH)" stroke="#D4922A" strokeWidth={0.8} opacity={0.8} />
      <ellipse cx="100" cy="50" rx="44" ry="34" fill="url(#sfB)" />
      <path d="M62,30 Q80,22 100,26 Q120,22 138,30" fill="none" stroke="#CC7A00" strokeWidth={0.6} opacity={0.5} />
      <path d="M64,40 Q82,34 100,36 Q118,34 136,40" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.4} />
      <path d="M66,50 Q84,44 100,46 Q116,44 134,50" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.3} />
      <ellipse cx="160" cy="50" rx="40" ry="32" fill="url(#sfB)" />
      <path d="M122,30 Q140,24 160,28 Q180,24 198,30" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.4} />
      <path d="M124,42 Q142,36 160,38 Q178,36 196,42" fill="none" stroke="#CC7A00" strokeWidth={0.4} opacity={0.3} />
      <ellipse cx="220" cy="50" rx="38" ry="30" fill="url(#sfB)" />
      <path d="M184,34 Q202,28 220,32 Q238,28 256,34" fill="none" stroke="#CC7A00" strokeWidth={0.4} opacity={0.3} />
      <path d="M250,50 L300,20 Q305,50 300,80 Z" fill="url(#sfT)" />
      <path d="M255,50 L295,28 Q298,50 295,72 Z" fill="url(#sfT)" opacity={0.6} />
      <path d="M260,50 L290,36 Q292,50 290,64 Z" fill="url(#sfT)" opacity={0.3} />
    </svg>
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
            position: 'relative',
            width: `${SEGMENT_W * SEGMENT_COUNT}px`,
            height: '100px',
          }}
        >
          {Array.from({ length: SEGMENT_COUNT }, (_, i) => {
            const pfx = `sf${i}`
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `${i * SEGMENT_W}px`,
                  width: `${SEGMENT_W}px`,
                  height: '100px',
                  overflow: 'hidden',
                  transformStyle: 'preserve-3d',
                  transformOrigin: '0px 50px',
                  animation: `sf_rot${i} ${CYCLE}s linear infinite`,
                }}
              >
                <svg
                  viewBox={`0 0 ${SVG_TOTAL_W} 100`}
                  style={{
                    display: 'block',
                    width: `${SVG_TOTAL_W}px`,
                    height: '100px',
                    marginLeft: `${-i * SEGMENT_W}px`,
                  }}
                >
                  <defs>
                    <linearGradient id={`${pfx}H`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFD97A" />
                      <stop offset="100%" stopColor="#D4922A" />
                    </linearGradient>
                    <linearGradient id={`${pfx}B`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFBF42" />
                      <stop offset="100%" stopColor="#CC7A00" />
                    </linearGradient>
                    <linearGradient id={`${pfx}T`} x1="0" y1="0" x2="1" y2="0.5">
                      <stop offset="0%" stopColor="#E5A030" />
                      <stop offset="100%" stopColor="#C47A10" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="40" cy="50" rx="38" ry="32" fill={`url(#${pfx}H)`} />
                  <ellipse cx="38" cy="50" rx="36" ry="30" fill={`url(#${pfx}H)`} opacity={0.7} />
                  <ellipse cx="24" cy="42" rx="5" ry="6" fill="#0B0E1F" />
                  <ellipse cx="26" cy="40" rx="1.8" ry="2.2" fill="#FBF5EA" />
                  <path d="M12,58 Q20,64 28,58" fill="none" stroke="#0B0E1F" strokeWidth={1.2} />
                  <path d="M50,28 Q58,18 68,24" fill={`url(#${pfx}H)`} stroke="#D4922A" strokeWidth={0.8} opacity={0.8} />
                  <ellipse cx="100" cy="50" rx="44" ry="34" fill={`url(#${pfx}B)`} />
                  <path d="M62,30 Q80,22 100,26 Q120,22 138,30" fill="none" stroke="#CC7A00" strokeWidth={0.6} opacity={0.5} />
                  <path d="M64,40 Q82,34 100,36 Q118,34 136,40" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.4} />
                  <path d="M66,50 Q84,44 100,46 Q116,44 134,50" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.3} />
                  <ellipse cx="160" cy="50" rx="40" ry="32" fill={`url(#${pfx}B)`} />
                  <path d="M122,30 Q140,24 160,28 Q180,24 198,30" fill="none" stroke="#CC7A00" strokeWidth={0.5} opacity={0.4} />
                  <path d="M124,42 Q142,36 160,38 Q178,36 196,42" fill="none" stroke="#CC7A00" strokeWidth={0.4} opacity={0.3} />
                  <ellipse cx="220" cy="50" rx="38" ry="30" fill={`url(#${pfx}B)`} />
                  <path d="M184,34 Q202,28 220,32 Q238,28 256,34" fill="none" stroke="#CC7A00" strokeWidth={0.4} opacity={0.3} />
                  <path d="M250,50 L300,20 Q305,50 300,80 Z" fill={`url(#${pfx}T)`} />
                  <path d="M255,50 L295,28 Q298,50 295,72 Z" fill={`url(#${pfx}T)`} opacity={0.6} />
                  <path d="M260,50 L290,36 Q292,50 290,64 Z" fill={`url(#${pfx}T)`} opacity={0.3} />
                </svg>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
