import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HOLOGRAM_PHOTOS = [
  { src: '/materials/holohrana_photo_2.jpg', alt: 'Діти біля холограмної піраміди' },
  { src: '/materials/holohrama_photo.jpg', alt: 'Холограмна проекція для дітей' },
  { src: '/materials/photo_4_2026-07-28_20-55-10.jpg', alt: 'Холограма вогняного кільця' },
]

export function HologramGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <>
      <div className="flex gap-3">
        {HOLOGRAM_PHOTOS.map((photo, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className="group relative h-[min(140px,20vw)] flex-1 cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_8px_30px_rgba(242,184,75,0.15)]"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-2 left-2 right-2 text-[10px] font-bold uppercase tracking-wider text-paper/0 transition-colors duration-300 group-hover:text-paper/90">
              {photo.alt}
            </span>
          </button>
        ))}
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
