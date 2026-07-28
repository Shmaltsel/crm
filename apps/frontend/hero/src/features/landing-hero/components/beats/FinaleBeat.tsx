import { useEffect, useRef, useState } from 'react'
import { motion, useAnimate, useMotionValueEvent, useTransform } from 'framer-motion'
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
  const [dustSpawned, setDustSpawned] = useState(false)
  const [visible, setVisible] = useState(false)
  const isSunriseActive = useRef(false)
  const landingAnimDone = useRef(false)

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

    const controls: ReturnType<typeof animate>[] = []
    let isMounted = true

    let prevVal = 0
    const unsub = strength.on('change', async (v) => {
      if (v > 0.9 && prevVal <= 0.9) {
        landingAnimDone.current = true

        if (reduced) {
          await Promise.all([
            animate('[data-cta-button]', { opacity: 1, scale: 1, width: 160, height: 48 }, { duration: 0 }),
            animate('[data-cta-label]', { opacity: 1 }, { duration: 0 }),
          ])
          return
        }

        const c1 = await animate('[data-finale-spark]', { y: [-80, 0], opacity: [0, 1, 1] }, { duration: 0.5, ease: 'easeIn' })
        controls.push(c1)
        if (!isMounted) return

        const c2 = await Promise.all([
          animate('[data-finale-spark]', { opacity: 0, scale: 0 }, { duration: 0.15 }),
          animate('[data-cta-button]', { opacity: 1, scale: 1, width: 160, height: 48 }, { type: 'spring', stiffness: 200, damping: 20 }),
        ])
        controls.push(...c2)
        if (!isMounted) return

        const c3 = await animate('[data-cta-label]', { opacity: 1 }, { duration: 0.3 })
        controls.push(c3)
      }
      prevVal = v
    })

    return () => {
      isMounted = false
      unsub()
      controls.forEach((c) => c.stop?.())
    }
  }, [strength, animate, reduced])

  const handleCtaClick = () => {
    if (isSunriseActive.current) return
    isSunriseActive.current = true
    if (ambient) ambient.triggerSunrise()
    setTimeout(() => onOpenContact(), 1500)
  }

  return (
    <motion.div
      ref={scope}
      role="region"
      aria-label="Завершення"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, visibility: visible ? 'visible' : 'hidden' }}
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

      {/* CTA materialization — single element, no DOM swap */}
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
            data-finale-spark
            className="absolute h-3 w-3 rounded-full bg-gold shadow-[0_0_20px_4px_rgba(242,184,75,0.8)]"
            style={{ opacity: 0, zIndex: 10 }}
          />
          <button
            data-cta-button
            onClick={handleCtaClick}
            className="relative flex items-center justify-center rounded-full border border-gold bg-gold font-bold text-night transition-shadow hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)]"
            style={{ opacity: 0, scale: 0, width: 8, height: 8, borderRadius: 9999, overflow: 'hidden', zIndex: 5 }}
          >
            <span data-cta-label className="text-[14.5px] px-7 py-3.5 whitespace-nowrap" style={{ opacity: 0 }}>
              Запросити подію
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
