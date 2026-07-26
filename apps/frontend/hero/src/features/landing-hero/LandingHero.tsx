import { useCallback, useRef, useState } from 'react'
import { useScrollStory } from './hooks/useScrollStory'
import { useMotionTimeline } from './hooks/useMotionTimeline'
import { useBeatStrengths } from './hooks/useBeatStrengths'
import { useProgressMV } from './hooks/useProgressMV'
import { useScrollSnap } from './hooks/useScrollSnap'
import { clamp, tweenScrollTo } from './lib/animation'
import { Z } from './lib/zIndex'

import { Nav } from './components/Nav'
import { ProgressRail } from './components/ProgressRail'
import { SoundToggle } from './components/SoundToggle'
import { CursorGlow } from './components/CursorGlow'
import { ScrollHint } from './components/ScrollHint'
import { ContactPanel } from './components/ContactPanel'
import { Footer } from './components/Footer'
import { FilmGrain } from './components/FilmGrain'

import { NebulaOverlay } from './components/overlays/NebulaOverlay'
import { StarField } from './components/overlays/StarField'
import { RocketOverlay } from './components/overlays/RocketOverlay'
import { PortalOverlay } from './components/overlays/PortalOverlay'
import { GrassGround } from './components/overlays/GrassGround'

import { HeroBeat } from './components/beats/HeroBeat'
import { ManifestBeat } from './components/beats/ManifestBeat'
import { PillarsBeat } from './components/beats/PillarsBeat'
import { WorldBeat } from './components/beats/WorldBeat'
import { TimelineBeat } from './components/beats/TimelineBeat'
import { GalleryBeat } from './components/beats/GalleryBeat'
import { TeamVoicesBeat } from './components/beats/TeamVoicesBeat'
import { StatsBeat } from './components/beats/StatsBeat'
import { FinaleBeat } from './components/beats/FinaleBeat'
import { BeatWrapper } from './components/BeatWrapper'
import type { MotionValue } from 'framer-motion'

export function LandingHero() {
  const { containerRef } = useScrollStory()
  const { tl, subscribe } = useMotionTimeline(containerRef)
  const [contactOpen, setContactOpen] = useState(false)

  const scrollYProgress = useProgressMV(tl, subscribe)
  const beatStrengths = useBeatStrengths(scrollYProgress)

  useScrollSnap(scrollYProgress, containerRef)

  const drawingStrength = beatStrengths[5]
  const finaleStrength = beatStrengths[12]

  const scrollToFraction = useCallback((frac: number) => {
    const track = containerRef.current
    if (!track) return
    const total = Math.max(1, track.scrollHeight - window.innerHeight)
    const target = clamp(frac, 0, 1) * total
    tweenScrollTo(target)
  }, [containerRef])

  const confettiLockRef = useRef(false)
  const handleConfetti = useCallback((x: number, y: number) => {
    if (confettiLockRef.current) return
    confettiLockRef.current = true
    setTimeout(() => { confettiLockRef.current = false }, 600)
    const colors = ['#F2B84B', '#FF7A59', '#8FE3E0', '#FBF5EA', '#FF6EC7']
    const GRAVITY = 0.35
    const BOUNCE = 0.45
    const FRICTION = 0.98
    const FLOOR_Y = window.innerHeight - 20

    for (let i = 0; i < 35; i++) {
      const bit = document.createElement('div')
      const isCircle = Math.random() > 0.6
      const w = isCircle ? 6 : 5 + Math.random() * 5
      const h = isCircle ? 6 : 8 + Math.random() * 6
      bit.style.cssText = `position:fixed;width:${w}px;height:${h}px;z-index:${Z.confetti};pointer-events:none;border-radius:${isCircle ? '50%' : '1px'};left:0;top:0;background:${colors[Math.floor(Math.random() * colors.length)]}`
      document.body.appendChild(bit)

      const ang = Math.random() * Math.PI * 2
      const speed = 6 + Math.random() * 10
      let vx = Math.cos(ang) * speed
      let vy = Math.sin(ang) * speed * 0.7 - 8
      let px = x
      let py = y
      let rx = 0
      let ry = 0
      const vrx = (Math.random() - 0.5) * 18
      const vry = (Math.random() - 0.5) * 14
      let life = 0
      const maxLife = 90 + Math.floor(Math.random() * 40)

      const tick = () => {
        life++
        vy += GRAVITY
        vx *= FRICTION
        px += vx
        py += vy
        rx += vrx
        ry += vry

        if (py > FLOOR_Y) {
          py = FLOOR_Y
          vy = -vy * BOUNCE
          vx *= 0.85
        }

        const fade = life > maxLife - 15 ? (maxLife - life) / 15 : 1
        bit.style.transform = `translate(${px}px,${py}px) rotateX(${rx}deg) rotateY(${ry}deg)`
        bit.style.opacity = String(Math.max(0, fade))

        if (life < maxLife) {
          requestAnimationFrame(tick)
        } else {
          bit.remove()
        }
      }
      requestAnimationFrame(tick)
    }
  }, [])

  const beats: [MotionValue<number>, React.ReactNode][] = [
    [beatStrengths[0], <HeroBeat key="hero" progress={scrollYProgress} onOpenContact={() => setContactOpen(true)} />],
    [beatStrengths[1], <ManifestBeat key="manifest" progress={scrollYProgress} />],
    [beatStrengths[2], <PillarsBeat key="pillars" progress={scrollYProgress} />],
    ...[3, 4, 5, 6, 7].map((i) => [beatStrengths[i], <WorldBeat key={`world-${i}`} progress={scrollYProgress} beatIndex={i} />] as [MotionValue<number>, React.ReactNode]),
    [beatStrengths[8], <TimelineBeat key="timeline" progress={scrollYProgress} />],
    [beatStrengths[9], <GalleryBeat key="gallery" progress={scrollYProgress} />],
    [beatStrengths[10], <TeamVoicesBeat key="team" progress={scrollYProgress} />],
    [beatStrengths[11], <StatsBeat key="stats" progress={scrollYProgress} />],
    [beatStrengths[12], <FinaleBeat key="finale" progress={scrollYProgress} onOpenContact={() => setContactOpen(true)} onConfetti={handleConfetti} />],
  ]

  return (
    <>
      <a
        href="#main"
        className={`fixed -left-[999px] top-0 bg-gold px-5 py-3 font-bold text-night focus:left-4 focus:top-4`}
        style={{ zIndex: Z.skipLinks }}
      >
        Перейти до змісту
      </a>
      <a
        href="#contact"
        className={`fixed -left-[999px] top-0 bg-coral px-5 py-3 font-bold text-night focus:left-4 focus:top-16`}
        style={{ zIndex: Z.skipLinks }}
      >
        Пропустити до форми
      </a>

      <ProgressRail progress={scrollYProgress} />
      <Nav
        onOpenContact={() => setContactOpen(true)}
        onNavigate={scrollToFraction}
      />
      <CursorGlow tl={tl} />

      {/* Universe (fixed background) */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: Z.overlays }} aria-hidden="true">
        <NebulaOverlay tl={tl} subscribe={subscribe} />
        <StarField />
        <PortalOverlay tl={tl} subscribe={subscribe} />
        <GrassGround tl={tl} subscribe={subscribe} />
        <RocketOverlay tl={tl} />
      </div>

      {/* Story beats */}
      <main id="main" ref={containerRef} className="relative" style={{ zIndex: Z.content }}>
        <div className="h-[1100vh] max-md:h-[700vh]">
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: Z.content }}>
            {beats.map(([strength, child], i) => (
              <BeatWrapper key={i} strength={strength}>
                {child}
              </BeatWrapper>
            ))}
          </div>
        </div>
      </main>

      <ScrollHint progress={scrollYProgress} finaleStrength={finaleStrength} />
      <SoundToggle />
      <ContactPanel isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <Footer onOpenContact={() => setContactOpen(true)} />
      <FilmGrain />
    </>
  )
}
