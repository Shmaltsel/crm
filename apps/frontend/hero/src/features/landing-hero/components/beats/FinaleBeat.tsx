import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValueEvent, useTransform } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useAmbient } from '../../context/AmbientContext'
import type { MotionValue } from 'framer-motion'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
}

export function FinaleBeat({ progress, onOpenContact }: Props) {
  const strength = useBeatStrength(progress, 13)
  const reduced = useReducedMotion()
  const ambient = useAmbient()
  const [dustSpawned, setDustSpawned] = useState(false)
  const [visible, setVisible] = useState(false)
  const isSunriseActive = useRef(false)
  const landingAnimDone = useRef(false)
  const fallbackTimerRef = useRef(0)

  const sparkRef = useRef<HTMLDivElement>(null)
  const ctaButtonRef = useRef<HTMLButtonElement>(null)
  const ctaLabelRef = useRef<HTMLSpanElement>(null)

  const horizonY = useTransform(strength, [0, 0.5, 1], ['110%', '85%', '75%'])
  const rocketY = useTransform(strength, [0, 0.7, 0.9, 1], ['50%', '70%', '80%', '82%'])
  const rocketOpacity = useTransform(strength, [0, 0.1, 0.85, 1], [0, 1, 1, 0.8])

  useMotionValueEvent(strength, 'change', (s) => setVisible(s > 0.005))

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

    let cancelled = false

    const runAnimation = async () => {
      if (reduced) {
        if (ctaButtonRef.current) {
          ctaButtonRef.current.style.opacity = '1'
          ctaButtonRef.current.style.transform = 'scale(1)'
          ctaButtonRef.current.style.width = '160px'
          ctaButtonRef.current.style.height = '48px'
        }
        if (ctaLabelRef.current) {
          ctaLabelRef.current.style.opacity = '1'
        }
        return
      }

      if (sparkRef.current) {
        await animate(sparkRef.current, { y: -80, opacity: 0 }, { duration: 0 }).then(() =>
          animate(sparkRef.current!, { y: [null, 0], opacity: [0, 1, 1], scale: [0.5, 1.2, 1] }, { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }),
        )
      }
      if (cancelled) return

      if (sparkRef.current) {
        await animate(sparkRef.current, { opacity: [1, 0], scale: [1, 2.5] }, { duration: 0.35, ease: 'easeOut' })
      }
      if (cancelled) return

      if (ctaButtonRef.current) {
        ctaButtonRef.current.style.opacity = '1'
        ctaButtonRef.current.style.transform = 'scale(1)'
        await animate(ctaButtonRef.current, { width: 160, height: 48 }, { type: 'spring', stiffness: 180, damping: 18, mass: 0.8 })
      }
      if (cancelled) return

      if (ctaLabelRef.current) {
        await animate(ctaLabelRef.current, { opacity: 1 }, { duration: 0.4, ease: 'easeOut' })
      }
    }

    const unsub = strength.on('change', (v) => {
      if (v > 0.85 && !landingAnimDone.current && !cancelled) {
        landingAnimDone.current = true
        clearTimeout(fallbackTimerRef.current)
        runAnimation()
      }
    })

    fallbackTimerRef.current = window.setTimeout(() => {
      if (!landingAnimDone.current && !cancelled) {
        landingAnimDone.current = true
        unsub()
        if (ctaButtonRef.current) {
          ctaButtonRef.current.style.opacity = '1'
          ctaButtonRef.current.style.transform = 'scale(1)'
          animate(ctaButtonRef.current, { width: 160, height: 48 }, { duration: 0.4, ease: 'easeOut' })
        }
        if (ctaLabelRef.current) {
          setTimeout(() => { if (ctaLabelRef.current) ctaLabelRef.current.style.opacity = '1' }, 150)
        }
      }
    }, 1200)

    return () => {
      cancelled = true
      unsub()
      clearTimeout(fallbackTimerRef.current)
    }
  }, [strength, reduced])

  const handleCtaClick = () => {
    if (isSunriseActive.current) return
    isSunriseActive.current = true
    if (ambient) ambient.triggerSunrise()
    setTimeout(() => onOpenContact(), 1500)
  }

  return (
    <div
      role="region"
      aria-label="Завершення"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: visible ? undefined : 0, visibility: visible ? 'visible' : 'hidden' }}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ height: horizonY, background: 'linear-gradient(to top, #0B0E1F 60%, transparent)' }}
      />

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

      <div className="relative z-10 mt-32 max-w-[680px]">
        <h2 className="mb-10 text-[clamp(26px,3.9vw,42px)] leading-[1.3] text-paper" style={{ perspective: 600 }}>
          <span style={{ display: 'inline-block', transform: 'rotateX(2deg)' }}>
            Наступна історія<br />
            може початися<br />
            <em className="font-serif italic text-gold glow-word">саме у вашому закладі.</em>
          </span>
        </h2>

        <div className="relative flex justify-center">
          <div
            ref={sparkRef}
            className="absolute h-3 w-3 rounded-full bg-gold"
            style={{
              opacity: 0,
              zIndex: 10,
              boxShadow: '0 0 24px 8px rgba(242,184,75,0.8), 0 0 48px 16px rgba(242,184,75,0.4)',
            }}
          />
          <button
            ref={ctaButtonRef}
            onClick={handleCtaClick}
            className="relative flex items-center justify-center rounded-full border border-gold bg-gold font-bold text-night transition-shadow hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)]"
            style={{ opacity: 0, transform: 'scale(0)', width: 8, height: 8, borderRadius: 9999, overflow: 'hidden', zIndex: 5 }}
          >
            <span ref={ctaLabelRef} className="text-[14.5px] px-7 py-3.5 whitespace-nowrap" style={{ opacity: 0 }}>
              Запросити подію
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
