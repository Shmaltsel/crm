import { useEffect, useRef, useState } from 'react'
import { motion, useAnimate, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useAmbient } from '../../context/AmbientContext'
import type { MotionValue } from 'framer-motion'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
}

export function FinaleBeat({ progress, onOpenContact }: Props) {
  const strength = useBeatStrength(progress, 12)
  const reduced = useReducedMotion()
  const ambient = useAmbient()
  const [scope, animate] = useAnimate()
  const [ctaVisible, setCtaVisible] = useState(false)
  const [dustSpawned, setDustSpawned] = useState(false)
  const isSunriseActive = useRef(false)
  const landingAnimDone = useRef(false)

  const horizonY = useTransform(strength, [0, 0.5, 1], [110, 85, 75])
  const rocketY = useTransform(strength, [0, 0.7, 0.9, 1], [50, 70, 80, 82])
  const rocketOpacity = useTransform(strength, [0, 0.1, 0.85, 1], [0, 1, 1, 0.8])

  useEffect(() => {
    if (dustSpawned || !ambient) return
    let prevVal = 0
    const unsub = strength.on('change', (v) => {
      if (v > 0.85 && prevVal <= 0.85) {
        setDustSpawned(true)
        ambient.spawnDust(window.innerWidth / 2, window.innerHeight * 0.82, 40)
      }
      prevVal = v
    })
    return unsub
  }, [strength, ambient, dustSpawned])

  useEffect(() => {
    if (reduced || landingAnimDone.current) return
    let prevVal = 0
    const unsub = strength.on('change', (v) => {
      if (v > 0.9 && prevVal <= 0.9) {
        landingAnimDone.current = true
        animate('[data-cta-dot]', { scale: 1, opacity: 1 }, { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] })
          .then(() => animate('[data-cta-dot]', { width: 160, height: 48, borderRadius: 9999 }, { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }))
          .then(() => {
            setCtaVisible(true)
          })
      }
      prevVal = v
    })
    return unsub
  }, [strength, animate, reduced])

  const handleCtaClick = () => {
    if (isSunriseActive.current) return
    isSunriseActive.current = true
    if (ambient) ambient.triggerSunrise()
    setTimeout(() => onOpenContact(), 1500)
  }

  return (
    <div
      ref={scope}
      role="region"
      aria-label="Завершення"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength }}
    >
      {/* Dark horizon line */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ height: horizonY, background: 'linear-gradient(to top, #0B0E1F 60%, transparent)' }}
      />

      {/* Rocket landing silhouette */}
      <motion.div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ top: rocketY, opacity: rocketOpacity }}
      >
        <svg viewBox="-30 -40 60 80" className="h-16 w-auto">
          <path
            d="M0,-30 C10,-20 12,-5 12,5 C12,15 6,24 0,28 C-6,24 -12,15 -12,5 C-12,-5 -10,-20 0,-30 Z"
            fill="#C9BFA8"
            stroke="#E8DFC8"
            strokeWidth="0.8"
          />
          <circle cx="0" cy="-10" r="5" fill="#5AACAA" opacity="0.6" />
        </svg>
      </motion.div>

      {/* CTA materialization */}
      <div className="relative z-10 mt-32 max-w-[680px]">
        <h2 className="mb-10 text-[clamp(26px,3.9vw,42px)] leading-[1.3] text-paper" style={{ perspective: 600 }}>
          <span style={{ display: 'inline-block', transform: 'rotateX(2deg)' }}>
            Наступна історія<br />
            може початися<br />
            <em className="font-serif italic text-gold glow-word">саме у вашому закладі.</em>
          </span>
        </h2>

        {/* CTA starts as a light dot, morphs into button */}
        <div className="flex justify-center">
          {!ctaVisible ? (
            <div
              data-cta-dot
              className="h-2 w-2 rounded-full bg-gold shadow-[0_0_20px_6px_rgba(242,184,75,0.6)]"
              style={{ opacity: 0, transform: 'scale(0)' }}
            />
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', mass: 2.5, stiffness: 100, damping: 15 }}
              onClick={handleCtaClick}
              className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)]"
            >
              Запросити подію
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
