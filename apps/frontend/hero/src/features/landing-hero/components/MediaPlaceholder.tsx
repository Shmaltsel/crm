import { useRef, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

interface Props {
  label: string
  icon?: ReactNode
  className?: string
  src?: string
}

function PlaceholderIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 opacity-30">
      <rect x="4" y="8" width="40" height="32" rx="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="20" r="4" stroke="#F2B84B" strokeWidth="1.5" fill="none" />
      <path d="M4,34 L16,24 L26,30 L34,22 L44,30" stroke="#F2B84B" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
  )
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
        {icon ?? <PlaceholderIcon />}
        <span className="text-[11px] uppercase tracking-[0.12em] text-mist-soft/50">{label}</span>
      </div>
    </div>
  )
}

function VideoMedia({ src, className }: { src: string; className: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { rootMargin: '400px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onCanPlay = useCallback(() => setReady(true), [])
  const onError = useCallback(() => {
    setFailed(true)
    console.error('[VideoMedia] failed to load:', src)
  }, [src])

  useEffect(() => {
    const v = videoRef.current
    if (v && v.readyState >= 2) {
      setReady(true)
    }
  }, [inView])

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-2xl bg-night ${className}`}>
      {inView && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onLoadedData={onCanPlay}
          onError={onError}
          className={`h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {(!ready && !failed) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <PlaceholderIcon />
        </div>
      )}
    </div>
  )
}
