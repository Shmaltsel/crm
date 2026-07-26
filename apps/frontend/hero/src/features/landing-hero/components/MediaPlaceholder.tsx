import { useRef, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface Props {
  label: string
  icon?: ReactNode
  className?: string
  src?: string
}

export function MediaPlaceholder({ label, icon, className = '', src }: Props) {
  if (src) {
    return <VideoMedia src={src} className={className} />
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-gold/25 bg-white/[0.03] ${className}`}
    >
      <div className="flex flex-col items-center gap-2.5 text-center">
        {icon ?? (
          <svg viewBox="0 0 48 48" className="h-10 w-10 opacity-30">
            <rect x="4" y="8" width="40" height="32" rx="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="20" r="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
            <path d="M4,34 L16,24 L26,30 L34,22 L44,30" stroke="#F2B84B" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          </svg>
        )}
        <span className="text-[11px] uppercase tracking-[0.12em] text-mist-soft/50">{label}</span>
      </div>
    </div>
  )
}

function VideoMedia({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const onCanPlay = () => setReady(true)
    v.addEventListener('loadeddata', onCanPlay)
    v.load()
    return () => v.removeEventListener('loadeddata', onCanPlay)
  }, [src])

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-night ${className}`}
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        className={`h-full w-full object-cover transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
        onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
        onMouseLeave={(e) => {
          const v = e.currentTarget as HTMLVideoElement
          v.pause()
          v.currentTime = 0
        }}
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="h-10 w-10 opacity-30">
            <rect x="4" y="8" width="40" height="32" rx="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="20" r="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
            <path d="M4,34 L16,24 L26,30 L34,22 L44,30" stroke="#F2B84B" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  )
}
