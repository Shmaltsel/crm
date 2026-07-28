import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HOLOGRAM_PHOTOS = [
  { src: '/materials/holohrana_photo_2.jpg', hoverSrc: '/materials/дітибіляголограмитемно.png', alt: 'Діти біля холограмної установки' },
  { src: '/materials/holohrama_photo.jpg', alt: 'Холограмна проекція для дітей' },
  { src: '/materials/photo_4_2026-07-28_20-55-10.jpg', alt: 'Холограма вогняного кільця' },
]

const LAYOUT = [
  { x: 0, y: 0, rotate: -2.5, scale: 1 },
  { x: 68, y: 52, rotate: 1.8, scale: 0.82 },
  { x: 8, y: 110, rotate: -1.2, scale: 0.75 },
]

export function HologramGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <>
      <div className="relative h-[320px] w-full md:h-[300px]">
        {HOLOGRAM_PHOTOS.map((photo, i) => {
          const pos = LAYOUT[i]
          const isHovered = hoveredIdx === i
          const showHover = isHovered && photo.hoverSrc

          return (
            <button
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setActiveIdx(i)}
              className="absolute cursor-pointer overflow-hidden rounded-xl border border-white/10 shadow-lg transition-[z-index] duration-0"
              style={{
                left: pos.x,
                top: pos.y,
                width: i === 0 ? 200 : 160,
                height: i === 0 ? 160 : 130,
                rotate: `${pos.rotate}deg`,
                scale: isHovered ? '1.15' : String(pos.scale),
                zIndex: isHovered ? 10 : 3 - i,
                transition: 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.4s ease',
                boxShadow: isHovered
                  ? '0 20px 50px rgba(242,184,75,0.2), 0 0 0 1px rgba(242,184,75,0.3)'
                  : '0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              {showHover && (
                <img
                  src={photo.hoverSrc!}
                  alt={photo.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.6s ease',
                  }}
                />
              )}
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover"
                style={{
                  opacity: showHover && isHovered ? 0 : 1,
                  transition: 'opacity 0.6s ease',
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '0.6s, 0.5s',
                  transitionTimingFunction: 'ease, cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </button>
          )
        })}
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
