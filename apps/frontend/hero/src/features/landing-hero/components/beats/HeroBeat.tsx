import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, animate, useMotionValueEvent } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useHeroIntro } from '../../hooks/useHeroIntro'
import { HeroBubbles } from '../overlays/HeroBubbles'
import type { MotionValue } from 'framer-motion'

interface Props {
  progress: MotionValue<number>
  onOpenContact: () => void
  onHeroComplete?: () => void
}

export function HeroBeat({ progress, onOpenContact, onHeroComplete }: Props) {
  const reduced = useReducedMotion()
  const { phase: introPhase } = useHeroIntro()
  const [heroVisible, setHeroVisible] = useState(true)
  const [bubblesActive, setBubblesActive] = useState(false)
  const [underwaterGlow, setUnderwaterGlow] = useState(0)
  const [scrollTranslateY, setScrollTranslateY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const completedRef = useRef(false)

  useMotionValueEvent(progress, 'change', (v) => {
    const HERO_END = 0.08
    const scrollFraction = Math.min(v / HERO_END, 1)
    const y = -scrollFraction * 100
    setScrollTranslateY(y)
    if (scrollFraction >= 1 && !completedRef.current) {
      completedRef.current = true
      setHeroVisible(false)
      onHeroComplete?.()
    }
  })

  useEffect(() => {
    if (introPhase === 'ready') {
      setBubblesActive(true)
    }
  }, [introPhase])

  useEffect(() => {
    if (introPhase !== 'ready' || reduced) return
    let cancelled = false

    const animateAll = async () => {
      if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return

      await new Promise((r) => setTimeout(r, 400))
      if (cancelled || !titleRef.current) return
      await animate(
        titleRef.current,
        { clipPath: 'inset(0% 0% 0% 0%)' },
        { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] },
      )

      await new Promise((r) => setTimeout(r, 0))
      if (cancelled || !subtitleRef.current) return
      await Promise.all([
        animate(
          subtitleRef.current,
          { opacity: 1, y: 0 },
          { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
        ),
        (async () => {
          await new Promise((r) => setTimeout(r, 600))
          if (!cancelled && ctaRef.current) {
            animate(
              ctaRef.current,
              { opacity: 1, y: 0 },
              { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
            )
          }
        })(),
      ])
    }

    animateAll()
    return () => { cancelled = true }
  }, [introPhase, reduced])

  useEffect(() => {
    if (reduced) {
      if (titleRef.current) titleRef.current.style.clipPath = 'inset(0% 0% 0% 0%)'
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '1'
        subtitleRef.current.style.transform = 'translateY(0)'
      }
      if (ctaRef.current) {
        ctaRef.current.style.opacity = '1'
        ctaRef.current.style.transform = 'translateY(0)'
      }
    }
  }, [reduced])

  if (!heroVisible) return null

  const rocketX = 20 + Math.abs(scrollTranslateY) * 0.6
  const rocketY = 80 - Math.abs(scrollTranslateY) * 0.8

  return (
    <>
      <div
        ref={containerRef}
        role="region"
        aria-label="Головна секція"
        className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
        style={{
          transform: `translateY(${scrollTranslateY}vh)`,
          zIndex: 50,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-[filter] duration-300"
          style={{
            backgroundImage: 'url(/materials/preview.jpg)',
            filter: `brightness(${1 + underwaterGlow}) saturate(${1 + underwaterGlow * 2})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/20 to-night/60" />

        <div className="relative z-10 max-w-[680px] px-6 text-center">
          <h1
            ref={titleRef}
            className="text-[clamp(42px,7.2vw,86px)] leading-[1.02] text-paper"
            style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
          >
            Уява<br />
            <em className="font-serif italic text-gold glow-word">оживає</em>
          </h1>
          <p
            ref={subtitleRef}
            className="mx-auto mt-[22px] max-w-[460px] text-[17px] leading-[1.55] text-mist"
            style={{ opacity: 0, transform: 'translateY(12px)' }}
          >
            Ми створюємо сучасні освітні події, які діти пам&apos;ятають роками.
          </p>
          <div
            ref={ctaRef}
            className="mt-9 flex flex-wrap justify-center gap-3.5"
            style={{ opacity: 0, transform: 'translateY(12px)' }}
          >
            <button
              onClick={() => onOpenContact()}
              className="rounded-full border border-gold bg-gold px-7 py-3.5 text-[14.5px] font-bold text-night transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_rgba(242,184,75,0.38)] active:scale-[0.97]"
            >
              Запросити подію
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth' })
              }}
              className="rounded-full border border-paper/20 px-7 py-3.5 text-[14.5px] font-bold text-paper/80 transition-all hover:-translate-y-[3px] hover:border-paper/40 hover:text-paper active:scale-[0.97]"
            >
              Дізнатися більше
            </button>
          </div>
        </div>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ opacity: 0.6 }}
        >
          <defs>
            <linearGradient id="heroTrail" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F2B84B" stopOpacity="0" />
              <stop offset="40%" stopColor="#F2B84B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FBF5EA" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <line
            x1="15%"
            y1="85%"
            x2={`${rocketX}%`}
            y2={`${rocketY}%`}
            stroke="url(#heroTrail)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="15%"
            y1="85%"
            x2={`${rocketX}%`}
            y2={`${rocketY}%`}
            stroke="#F2B84B"
            strokeWidth="0.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
        <div
          className="pointer-events-none absolute"
          style={{
            left: `${rocketX}%`,
            top: `${rocketY}%`,
            transform: 'translate(-50%, -50%) rotate(-35deg)',
            transition: 'none',
          }}
        >
          <svg viewBox="-20 -30 40 60" className="h-10 w-10">
            <defs>
              <linearGradient id="heroRocketBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBF5EA" />
                <stop offset="100%" stopColor="#C9BFA8" />
              </linearGradient>
              <linearGradient id="heroFlame" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F2B84B" />
                <stop offset="60%" stopColor="#FF7A59" />
                <stop offset="100%" stopColor="#FF4020" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,-22 C7,-16 8,-5 8,3 C8,10 4,16 0,18 C-4,16 -8,10 -8,3 C-8,-5 -7,-16 0,-22 Z"
              fill="url(#heroRocketBody)"
              stroke="#E8DFC8"
              strokeWidth="0.5"
            />
            <circle cx="0" cy="-6" r="3.5" fill="#8FE3E0" stroke="#FBF5EA" strokeWidth="0.5" />
            <path d="M-8,6 L-13,14 L-8,11 Z" fill="#FF7A59" opacity="0.85" />
            <path d="M8,6 L13,14 L8,11 Z" fill="#FF7A59" opacity="0.85" />
            <path
              d="M-4,18 L0,28 L4,18"
              fill="url(#heroFlame)"
              opacity={0.9}
            />
            <path
              d="M-2,18 L0,25 L2,18"
              fill="#FBF5EA"
              opacity={0.6}
            />
          </svg>
        </div>
      </div>

      <HeroBubbles active={bubblesActive && heroVisible} />
    </>
  )
}
