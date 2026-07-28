import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HOLOGRAM_PHOTOS = [
  { src: '/materials/holohrana_photo_2.jpg', hoverSrc: '/materials/дітибіляголограмитемно.png', alt: 'Діти біля холограмної установки' },
  { src: '/materials/holohrama_photo.jpg', alt: 'Холограмна проекція для дітей' },
  { src: '/materials/photo_4_2026-07-28_20-55-10.jpg', alt: 'Холограма вогняного кільця' },
]

function useImagePreload(src: string | undefined): boolean {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (!src) return
    const img = new Image()
    img.src = src
    img.onload = () => setLoaded(true)
  }, [src])
  return loaded
}

export function HologramGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const hoverLoaded = useImagePreload(HOLOGRAM_PHOTOS[0].hoverSrc)

  return (
    <>
      <div className="flex flex-col items-start gap-5 pl-2">
        <div className="flex items-start gap-4">
          <PhotoCard
            photo={HOLOGRAM_PHOTOS[0]}
            isHovered={hoveredIdx === 0}
            hoverReady={hoverLoaded}
            onHover={() => setHoveredIdx(0)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() => setActiveIdx(0)}
            className="h-[180px] w-[220px] -rotate-1.5"
          />
          <PhotoCard
            photo={HOLOGRAM_PHOTOS[1]}
            isHovered={hoveredIdx === 1}
            hoverReady={false}
            onHover={() => setHoveredIdx(1)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() => setActiveIdx(1)}
            className="mt-10 h-[140px] w-[180px] rotate-2"
          />
        </div>
        <div className="ml-8">
          <PhotoCard
            photo={HOLOGRAM_PHOTOS[2]}
            isHovered={hoveredIdx === 2}
            hoverReady={false}
            onHover={() => setHoveredIdx(2)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() => setActiveIdx(2)}
            className="h-[130px] w-[170px] -rotate-1"
          />
        </div>
      </div>

      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-night/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveIdx(null)}
          >
            <motion.div
              className="relative max-h-[80vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={HOLOGRAM_PHOTOS[activeIdx].src}
                alt={HOLOGRAM_PHOTOS[activeIdx].alt}
                className="block max-h-[80vh] max-w-[90vw] object-contain"
              />
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-night/60 text-paper transition-colors hover:bg-night/80"
                aria-label="Закрити"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function PhotoCard({
  photo,
  isHovered,
  hoverReady,
  onHover,
  onLeave,
  onClick,
  className,
}: {
  photo: (typeof HOLOGRAM_PHOTOS)[number]
  isHovered: boolean
  hoverReady: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  className?: string
}) {
  const hasHover = !!photo.hoverSrc && hoverReady

  return (
    <button
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden rounded-xl border border-white/10 shadow-lg ${className ?? ''}`}
      style={{
        zIndex: isHovered ? 10 : 1,
        transform: isHovered ? 'scale(1.12)' : 'scale(1)',
        transition: 'transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.35s ease',
        boxShadow: isHovered
          ? '0 20px 50px rgba(242,184,75,0.2), 0 0 0 1px rgba(242,184,75,0.3)'
          : '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Base image */}
      <img
        src={photo.src}
        alt={photo.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: hasHover && isHovered ? 0 : 1,
          transition: 'opacity 0.55s ease, transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)',
          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
        }}
        loading="lazy"
      />
      {/* Hover overlay image — always in DOM, just opacity toggled */}
      {hasHover && (
        <img
          src={photo.hoverSrc!}
          alt={photo.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.55s ease',
          }}
        />
      )}
    </button>
  )
}
