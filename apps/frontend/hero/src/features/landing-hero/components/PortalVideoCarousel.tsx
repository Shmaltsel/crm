import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export interface CarouselVideo {
  id: string
  src: string
  poster?: string
  label: string
  caption?: string
}

interface Props {
  videos: CarouselVideo[]
  initialIndex?: number
  enableLightbox?: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

export function PortalVideoCarousel({
  videos,
  initialIndex = 0,
  enableLightbox = true,
}: Props) {
  const [index, setIndex] = useState(initialIndex)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const liveRegionRef = useRef<HTMLDivElement>(null)

  const count = videos.length
  const clampIndex = useCallback((i: number) => ((i % count) + count) % count, [count])

  const goTo = useCallback(
    (i: number) => {
      setIndex(clampIndex(i))
    },
    [clampIndex],
  )
  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `${videos[index].label}, відео ${index + 1} з ${count}`
    }
  }, [index, videos, count])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!trackRef.current?.contains(document.activeElement) && document.activeElement !== trackRef.current) return
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
      if (e.key === 'Escape' && lightboxOpen) setLightboxOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, lightboxOpen])

  const positions = useMemo(() => {
    const half = Math.min(2, Math.floor((count - 1) / 2))
    const arr: { video: CarouselVideo; offset: number; realIndex: number }[] = []
    for (let o = -half; o <= half; o++) {
      const i = clampIndex(index + o)
      arr.push({ video: videos[i], offset: o, realIndex: i })
    }
    return arr
  }, [index, videos, count, clampIndex])

  return (
    <div className="relative w-full select-none" style={{ ['--pvc-ease' as string]: 'cubic-bezier(.22,1,.36,1)' }}>
      <div aria-live="polite" className="sr-only" ref={liveRegionRef} />

      <div
        ref={trackRef}
        role="group"
        aria-roledescription="карусель"
        aria-label="Відео"
        tabIndex={0}
        className="relative flex h-[420px] items-center justify-center outline-none focus-visible:[&_.pvc-center]:ring-2 focus-visible:[&_.pvc-center]:ring-[var(--color-coral,#FF7A59)]"
        style={{ perspective: 1400 }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-[260px] w-[260px] rounded-full blur-3xl transition-colors duration-700"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--color-gold,#F2B84B) 35%, transparent) 0%, transparent 70%)',
            }}
          />
        </div>

        {positions.map(({ video, offset, realIndex }) => (
          <CarouselCard
            key={video.id}
            video={video}
            offset={offset}
            isCenter={offset === 0}
            reduced={!!reduced}
            onSelect={() => (offset === 0 ? (enableLightbox && setLightboxOpen(true)) : goTo(realIndex))}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Попереднє відео"
        className="group absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[var(--color-gold,#F2B84B)]/25 bg-[var(--color-night,#0B0E1F)]/60 p-2.5 backdrop-blur-md transition-all hover:border-[var(--color-gold,#F2B84B)] hover:bg-[var(--color-night,#0B0E1F)]/85"
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Наступне відео"
        className="group absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-[var(--color-gold,#F2B84B)]/25 bg-[var(--color-night,#0B0E1F)]/60 p-2.5 backdrop-blur-md transition-all hover:border-[var(--color-gold,#F2B84B)] hover:bg-[var(--color-night,#0B0E1F)]/85"
      >
        <ChevronIcon direction="right" />
      </button>

      <div className="mt-6 flex items-center justify-center gap-2.5" role="tablist" aria-label="Обрати відео">
        {videos.map((v, i) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={i === index}
            aria-label={v.label}
            onClick={() => goTo(i)}
            className="h-2 w-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === index ? 'var(--color-gold, #F2B84B)' : 'color-mix(in srgb, var(--color-gold,#F2B84B) 20%, transparent)',
              boxShadow: i === index ? '0 0 8px 1px color-mix(in srgb, var(--color-gold,#F2B84B) 60%, transparent)' : 'none',
              transform: i === index ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            video={videos[index]}
            onClose={() => setLightboxOpen(false)}
            reduced={!!reduced}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function CarouselCard({
  video,
  offset,
  isCenter,
  reduced,
  onSelect,
}: {
  video: CarouselVideo
  offset: number
  isCenter: boolean
  reduced: boolean
  onSelect: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (isCenter) {
      el.currentTime = 0
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [isCenter])

  const absOffset = Math.abs(offset)
  const x = offset * 168
  const scale = isCenter ? 1 : absOffset === 1 ? 0.72 : 0.52
  const rotateY = reduced ? 0 : offset * -28
  const z = isCenter ? 0 : -120 * absOffset
  const opacity = absOffset > 2 ? 0 : isCenter ? 1 : absOffset === 1 ? 0.6 : 0.28
  const blur = isCenter ? 0 : absOffset === 1 ? 1 : 2.5

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={isCenter ? `Відкрити ${video.label}` : `Показати ${video.label}`}
      className={`pvc-card absolute ${isCenter ? 'pvc-center z-10' : 'z-0'} h-[400px] w-[224px] cursor-pointer overflow-hidden rounded-[22px] outline-none`}
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ x, scale, rotateY, z, opacity, filter: `blur(${blur}px)` }}
      transition={{ duration: reduced ? 0.15 : 0.55, ease: EASE }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[22px] border transition-shadow duration-500"
        style={{
          borderColor: isCenter
            ? 'var(--color-gold, #F2B84B)'
            : 'color-mix(in srgb, var(--color-gold,#F2B84B) 25%, transparent)',
          boxShadow: isCenter
            ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px color-mix(in srgb, var(--color-gold,#F2B84B) 40%, transparent), 0 0 36px color-mix(in srgb, var(--color-gold,#F2B84B) 25%, transparent)'
            : '0 10px 30px rgba(0,0,0,0.35)',
        }}
      >
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
          style={{ background: 'linear-gradient(to top, rgba(11,14,31,0.92), transparent)' }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-left">
          <p
            className="font-semibold text-[13.5px] leading-tight"
            style={{ color: 'var(--color-paper, #FBF5EA)', fontFamily: 'var(--font-display, serif)' }}
          >
            {video.label}
          </p>
          {video.caption && isCenter && (
            <p className="mt-1 text-[11px]" style={{ color: 'var(--color-mist-soft, rgba(251,245,234,0.52))' }}>
              {video.caption}
            </p>
          )}
        </div>

        {isCenter && (
          <span
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-md"
            style={{ background: 'rgba(11,14,31,0.55)', border: '1px solid color-mix(in srgb, var(--color-gold,#F2B84B) 40%, transparent)' }}
            aria-hidden="true"
          >
            <PlayGlyph />
          </span>
        )}
      </div>
    </motion.button>
  )
}

function Lightbox({
  video,
  onClose,
  reduced,
}: {
  video: CarouselVideo
  onClose: () => void
  reduced: boolean
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow }
  }, [])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={video.label}
      className="fixed inset-0 z-[999] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.1 : 0.3 }}
    >
      <button
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0"
        style={{ background: 'rgba(11,14,31,0.88)', backdropFilter: 'blur(6px)' }}
      />
      <motion.div
        className="relative w-full max-w-[420px]"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: reduced ? 0.1 : 0.35, ease: EASE }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Закрити"
          className="absolute -top-11 right-0 text-2xl"
          style={{ color: 'var(--color-paper, #FBF5EA)' }}
        >
          &times;
        </button>
        <video
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          className="w-full rounded-2xl"
          style={{ boxShadow: '0 30px 90px rgba(0,0,0,0.6)' }}
        />
      </motion.div>
    </motion.div>
  )
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="var(--color-paper, #FBF5EA)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="var(--color-gold, #F2B84B)">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
