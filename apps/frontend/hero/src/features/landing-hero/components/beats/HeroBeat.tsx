import { useEffect, useRef, useState } from 'react'
import { motion, useAnimate } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useAmbient } from '../../context/AmbientContext'
import type { MotionValue } from 'framer-motion'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
  onIntroComplete: () => void
}

export function HeroBeat({ progress, onOpenContact, onIntroComplete }: Props) {
  const strength = useBeatStrength(progress, 0)
  const reduced = useReducedMotion()
  const ambient = useAmbient()
  const [scope, animate] = useAnimate()
  const phaseRef = useRef(0)
  const [introDone, setIntroDone] = useState(reduced)

  useEffect(() => {
    if (reduced) {
      setIntroDone(true)
      onIntroComplete()
      return
    }

    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    let cancelled = false

    const runSequence = async () => {
      await new Promise((r) => setTimeout(r, 200))
      if (cancelled) return

      if (ambient) ambient.setHeroStarBrightness(0.15)
      await animate('[data-phase="1"]', { opacity: 0.15 }, { duration: 2 })
      if (cancelled) return

      phaseRef.current = 2
      if (ambient) ambient.setHeroStarBrightness(0.6)
      await animate('[data-phase="rocket"]', { opacity: 1, x: 0 }, { duration: 2, ease: [0.25, 0.1, 0.25, 1] })
      if (cancelled) return

      phaseRef.current = 3
      if (ambient) ambient.setHeroStarBrightness(1)
      await animate('[data-phase="beam"]', { scaleX: 1, opacity: 1 }, { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] })
      if (cancelled) return

      await animate('[data-phase="title"]', { clipPath: 'inset(0 0% 0 0)', opacity: 1 }, { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] })
      if (cancelled) return

      phaseRef.current = 4
      await animate('[data-phase="subtitle"]', { opacity: 0.5 }, { duration: 1.5, ease: 'easeOut' })
      if (cancelled) return

      phaseRef.current = 5
      document.body.style.overflow = ''
      if (ambient) ambient.setHeroStarBrightness(0.2)
      setIntroDone(true)
      onIntroComplete()
    }

    runSequence()

    return () => {
      cancelled = true
      document.body.style.overflow = ''
    }
  }, [reduced, animate, ambient, onIntroComplete])

  if (reduced) {
    return (
      <motion.div
        role="region"
        aria-label="Головна секція"
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: strength }}
      >
        <div className="max-w-[680px]">
          <h1 className="text-[clamp(42px,7.2vw,86px)] leading-[1.02] text-paper">
            Уява<br />
            <em className="font-serif italic text-gold">оживає</em>
          </h1>
        </div>
      </motion.div>
    )
  }

  return (
    <div
      ref={scope}
      role="region"
      aria-label="Головна секція"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Phase 1: Silence */}
      <div data-phase="1" className="pointer-events-none absolute inset-0 bg-night" style={{ opacity: 0 }} />

      {/* Phase 2: Rocket enters from left */}
      <div
        data-phase="rocket"
        className="pointer-events-none absolute left-[-100px] top-1/3"
        style={{ opacity: 0, transform: 'translateX(-100px)' }}
      >
        <svg viewBox="0 0 60 20" className="h-5 w-auto">
          <path d="M0,10 L40,4 L50,10 L40,16 Z" fill="#F2B84B" opacity="0.9" />
          <circle cx="50" cy="10" r="3" fill="#FF7A59" />
        </svg>
      </div>

      {/* Phase 3: Beam sweeps text */}
      <div
        data-phase="beam"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px]"
        style={{
          opacity: 0,
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          background: 'linear-gradient(90deg, transparent, rgba(242,184,75,0.9), transparent)',
        }}
      />

      {/* Title with clip-path reveal */}
      <div className="max-w-[680px]">
        <h1
          data-phase="title"
          className="text-[clamp(42px,7.2vw,86px)] leading-[1.02] text-paper"
          style={{
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0,
          }}
        >
          Уява<br />
          <em className="font-serif italic text-gold glow-word">оживає</em>
        </h1>

        {/* Phase 4: Subtitle fades in */}
        <div data-phase="subtitle" style={{ opacity: 0 }}>
          <p className="mx-auto mt-[22px] max-w-[460px] text-[17px] leading-[1.55] text-mist">
            Ми створюємо сучасні освітні події, які діти пам&apos;ятають роками.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <button
              onClick={() => {
                onOpenContact()
              }}
              className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)] active:scale-[0.97]"
            >
              Запросити подію
            </button>
          </div>
        </div>
      </div>

      {/* Phase 5: Scroll hint */}
      {introDone && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 0.4, y: 8 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="h-1 w-1 rounded-full bg-gold" />
        </motion.div>
      )}
    </div>
  )
}
