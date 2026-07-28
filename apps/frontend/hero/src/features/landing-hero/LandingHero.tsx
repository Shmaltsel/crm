import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollStory } from './hooks/useScrollStory'
import { useMotionTimeline } from './hooks/useMotionTimeline'
import { useBeatStrengths } from './hooks/useBeatStrengths'
import { useSmoothProgress } from './hooks/useSmoothProgress'
import { useScrollSnap } from './hooks/useScrollSnap'
import { useReducedMotion } from './hooks/useReducedMotion'
import { clamp, tweenScrollTo } from './lib/animation'
import { Z } from './lib/zIndex'

import { Nav } from './components/Nav'
import { ProgressRail } from './components/ProgressRail'
import { SoundToggle } from './components/SoundToggle'
import { CursorGlow } from './components/CursorGlow'
import { ScrollHint } from './components/ScrollHint'
import { ContactPanel } from './components/ContactPanel'
import { FilmGrain } from './components/FilmGrain'

import { NebulaOverlay } from './components/overlays/NebulaOverlay'
import { RocketOverlay } from './components/overlays/RocketOverlay'
import { PortalOverlay } from './components/overlays/PortalOverlay'
import { GrassGround } from './components/overlays/GrassGround'
import { GlobalAmbientCanvas } from './components/overlays/GlobalAmbientCanvas'
import { AmbientCtx, useAmbientCommands } from './context/AmbientContext'

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
  const { containerRef, scrollYProgress } = useScrollStory()
  const smoothProgress = useSmoothProgress(scrollYProgress)
  const { tl, subscribe, startWarp } = useMotionTimeline(smoothProgress)
  const [contactOpen, setContactOpen] = useState(false)

  const beatStrengths = useBeatStrengths(smoothProgress)
  const reduced = useReducedMotion()

  useScrollSnap(smoothProgress, containerRef, !reduced)

  const { commands, setCommands } = useAmbientCommands()
  const [heroCompleted, setHeroCompleted] = useState(false)

  const finaleStrength = beatStrengths[12]

  const handleHeroComplete = useCallback(() => {
    if (heroCompleted) return
    setHeroCompleted(true)
    const track = containerRef.current
    if (!track) return
    const total = Math.max(1, track.scrollHeight - window.innerHeight)
    const target = (1 / 13) * total
    window.scrollTo(0, target)
  }, [containerRef, heroCompleted])

  const WARP_HALF = 250

  const scrollToFraction = useCallback((frac: number) => {
    const track = containerRef.current
    if (!track) return
    const total = Math.max(1, track.scrollHeight - window.innerHeight)
    const target = clamp(frac, 0, 1) * total
    const currentProgress = clamp(smoothProgress.get(), 0, 1)
    const fromBeat = Math.floor(currentProgress * 13)
    const toBeat = Math.floor(frac * 13)
    const distance = Math.abs(toBeat - fromBeat)

    if (distance <= 1) {
      tweenScrollTo(target)
      return
    }

    if (reduced) {
      window.scrollTo(0, target)
      return
    }

    startWarp(currentProgress)
    setTimeout(() => {
      window.scrollTo(0, target)
    }, WARP_HALF)
  }, [containerRef, smoothProgress, startWarp, reduced])

  const beats: [MotionValue<number>, React.ReactNode][] = [
    [beatStrengths[0], <HeroBeat key="hero" progress={smoothProgress} onOpenContact={() => setContactOpen(true)} onHeroComplete={handleHeroComplete} />],
    [beatStrengths[1], <ManifestBeat key="manifest" progress={smoothProgress} />],
    [beatStrengths[2], <PillarsBeat key="pillars" progress={smoothProgress} />],
    ...[3, 4, 5, 6, 7].map((i) => [beatStrengths[i], <WorldBeat key={`world-${i}`} progress={smoothProgress} beatIndex={i} />] as [MotionValue<number>, React.ReactNode]),
    [beatStrengths[8], <TimelineBeat key="timeline" progress={smoothProgress} />],
    [beatStrengths[9], <GalleryBeat key="gallery" progress={smoothProgress} />],
    [beatStrengths[10], <TeamVoicesBeat key="team" progress={smoothProgress} />],
    [beatStrengths[11], <StatsBeat key="stats" progress={smoothProgress} />],
    [beatStrengths[12], <FinaleBeat key="finale" progress={smoothProgress} onOpenContact={() => setContactOpen(true)} />],
  ]

  return (
    <AmbientCtx.Provider value={commands}>
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

      <ProgressRail progress={smoothProgress} />
      <Nav
        onOpenContact={() => setContactOpen(true)}
        onNavigate={scrollToFraction}
        progress={smoothProgress}
      />
      <CursorGlow tl={tl} />

      {/* Universe (fixed background) */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: Z.overlays }} aria-hidden="true">
        <NebulaOverlay tl={tl} subscribe={subscribe} progress={smoothProgress} />
        <GlobalAmbientCanvas tl={tl} subscribe={subscribe} setCommands={setCommands} />
        <PortalOverlay tl={tl} subscribe={subscribe} progress={smoothProgress} />
        <GrassGround tl={tl} subscribe={subscribe} />
        <RocketOverlay tl={tl} progress={smoothProgress} subscribe={subscribe} heroCompleted={heroCompleted} />
        <motion.div
          className="pointer-events-none fixed inset-0 bg-night"
          style={{ opacity: finaleStrength, zIndex: 4 }}
          aria-hidden="true"
        />
      </div>

      {/* Story beats */}
      <main id="main" ref={containerRef} className="relative" style={{ zIndex: Z.content }}>
        <div className="h-[1100vh] max-md:h-[700vh]">
          <div className="fixed inset-0 overflow-visible pointer-events-none" style={{ zIndex: Z.content }}>
            {beats.map(([strength, child], i) => (
              <BeatWrapper key={i} strength={strength}>
                {child}
              </BeatWrapper>
            ))}
          </div>
        </div>
      </main>

      <ScrollHint progress={smoothProgress} finaleStrength={finaleStrength} />
      <SoundToggle />
      <ContactPanel isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <FilmGrain />
    </AmbientCtx.Provider>
  )
}
