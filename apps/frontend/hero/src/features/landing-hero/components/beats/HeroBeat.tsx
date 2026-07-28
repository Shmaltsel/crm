import { useEffect, useState } from 'react'
import { motion, useAnimate, useMotionValueEvent } from 'framer-motion'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { MotionValue } from 'framer-motion'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
}

export function HeroBeat({ progress, onOpenContact }: Props) {
  const strength = useBeatStrength(progress, 0)
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [titleRef, animate] = useAnimate()

  useMotionValueEvent(strength, 'change', (s) => setVisible(s > 0.005))

  useEffect(() => {
    let isMounted = true

    const run = async () => {
      if (reduced) {
        animate('[data-hero-title]', { clipPath: 'inset(0% 0% 0% 0%)' }, { duration: 0 })
        return
      }

      await new Promise<void>((r) => setTimeout(r, 400))
      if (!isMounted) return

      await animate('[data-hero-title]', { clipPath: 'inset(0% 0% 0% 0%)' }, { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] })
    }

    run()

    return () => { isMounted = false }
  }, [animate, reduced])

  return (
    <motion.div
      ref={titleRef}
      role="region"
      aria-label="Головна секція"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, visibility: visible ? 'visible' : 'hidden' }}
    >
      <div className="max-w-[680px]">
        <h1
          data-hero-title
          className="text-[clamp(42px,7.2vw,86px)] leading-[1.02] text-paper"
          style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
        >
          Уява<br />
          <em className="font-serif italic text-gold glow-word">оживає</em>
        </h1>
        <p className="stagger-word mx-auto mt-[22px] max-w-[460px] text-[17px] leading-[1.55] text-mist" style={{ animationDelay: '0.3s' }}>
          Ми створюємо сучасні освітні події, які діти пам&apos;ятають роками.
        </p>
        <div className="stagger-word mt-9 flex flex-wrap justify-center gap-3.5" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={() => onOpenContact()}
            className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)] active:scale-[0.97]"
          >
            Запросити подію
          </button>
        </div>
      </div>
    </motion.div>
  )
}
