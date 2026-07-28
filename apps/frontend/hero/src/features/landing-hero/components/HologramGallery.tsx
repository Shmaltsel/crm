import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HOLOGRAM_PHOTOS = [
  { src: '/materials/holohrana_photo_2.jpg', hoverSrc: '/materials/hologram-kids-dark.png', alt: 'Діти біля холограмної установки' },
  { src: '/materials/holohrama_photo.jpg', hoverSrc: '/materials/hologram-photo-dark.png', alt: 'Холограмна проекція для дітей' },
  { src: '/materials/hologram-city.jpg', hoverSrc: '/materials/hologram-city-dark.png', alt: 'Холограма міста' },
]

function useImagePreload(src: string): boolean {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setLoaded(true)
  }, [src])
  return loaded
}

export function HologramGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const h0 = useImagePreload(HOLOGRAM_PHOTOS[0].hoverSrc)
  const h1 = useImagePreload(HOLOGRAM_PHOTOS[1].hoverSrc)
  const h2 = useImagePreload(HOLOGRAM_PHOTOS[2].hoverSrc)
  const hoversLoaded = [h0, h1, h2]

  return (
    <>
      <div className="flex flex-col items-start gap-4 -ml-6 overflow-visible">
        <div className="flex items-start gap-3">
          <PhotoCard
            photo={HOLOGRAM_PHOTOS[0]}
            isHovered={hoveredIdx === 0}
            hoverReady={hoversLoaded[0]}
            onHover={() => setHoveredIdx(0)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() => setActiveIdx(0)}
            className="h-[170px] w-[210px]"
            rotation={-12}
          />
          <PhotoCard
            photo={HOLOGRAM_PHOTOS[1]}
            isHovered={hoveredIdx === 1}
            hoverReady={hoversLoaded[1]}
            onHover={() => setHoveredIdx(1)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() => setActiveIdx(1)}
            className="mt-10 h-[140px] w-[175px]"
            rotation={8}
          />
        </div>
        <div className="ml-10">
          <PhotoCard
            photo={HOLOGRAM_PHOTOS[2]}
            isHovered={hoveredIdx === 2}
            hoverReady={hoversLoaded[2]}
            onHover={() => setHoveredIdx(2)}
            onLeave={() => setHoveredIdx(null)}
            onClick={() => setActiveIdx(2)}
            className="h-[130px] w-[180px]"
            rotation={-6}
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
  rotation = 0,
}: {
  photo: (typeof HOLOGRAM_PHOTOS)[number]
  isHovered: boolean
  hoverReady: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  className?: string
  rotation?: number
}) {
  const hasHover = !!photo.hoverSrc && hoverReady

  return (
    <button
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`relative cursor-pointer ${className ?? ''}`}
      style={{
        zIndex: isHovered ? 10 : 1,
        transform: isHovered ? 'scale(1.25) rotate(0deg)' : `rotate(${rotation}deg)`,
        transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        boxShadow: isHovered
          ? '0 0 30px 10px rgba(60,140,255,0.35), 0 0 60px 20px rgba(60,140,255,0.15), 0 0 0 1px rgba(100,180,255,0.4)'
          : '0 8px 24px rgba(0,0,0,0.4)',
        transitionProperty: 'transform, box-shadow',
        transitionDuration: '0.5s, 0.4s',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1), ease',
      }}
    >
      <div className="overflow-hidden rounded-xl border border-white/10">
        {/* Base image */}
        <img
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: hasHover && isHovered ? 0 : 1,
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'opacity 0.55s ease, transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
          loading="lazy"
        />
        {/* Hover overlay image */}
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
      </div>
    </button>
  )
}
