import { useCallback, useState } from 'react'
import { useScrollStory } from './hooks/useScrollStory'
import { useBeatStrengths } from './hooks/useBeatStrengths'
import { clamp } from './lib/animation'

import { Nav } from './components/Nav'
import { ProgressRail } from './components/ProgressRail'
import { SoundToggle } from './components/SoundToggle'
import { CursorGlow } from './components/CursorGlow'
import { ScrollHint } from './components/ScrollHint'
import { ContactPanel } from './components/ContactPanel'
import { Footer } from './components/Footer'

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

export function LandingHero() {
  const { containerRef, scrollYProgress } = useScrollStory()
  const [contactOpen, setContactOpen] = useState(false)

  const beatStrengths = useBeatStrengths(scrollYProgress)

  const drawingStrength = beatStrengths[5] // World beat 02
  const finaleStrength = beatStrengths[12]

  const scrollToFraction = useCallback((frac: number) => {
    const track = containerRef.current
    if (!track) return
    const total = Math.max(1, track.scrollHeight - window.innerHeight)
    const target = clamp(frac, 0, 1) * total
    window.scrollTo({ top: target, behavior: 'smooth' })
  }, [containerRef])

  const handleConfetti = useCallback((x: number, y: number) => {
    const colors = ['#F2B84B', '#FF7A59', '#8FE3E0', '#FBF5EA']
    for (let i = 0; i < 30; i++) {
      const bit = document.createElement('div')
      bit.style.cssText = `position:fixed;width:7px;height:10px;z-index:410;pointer-events:none;border-radius:1px;left:${x}px;top:${y}px;background:${colors[Math.floor(Math.random() * colors.length)]}`
      const ang = Math.random() * Math.PI * 2
      const dist = 90 + Math.random() * 170
      const dx = Math.cos(ang) * dist
      const dy = Math.sin(ang) * dist * 0.65 - 50
      bit.animate(
        [
          { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
          { transform: `translate(${dx}px,${dy + 230}px) rotate(${Math.random() * 420}deg)`, opacity: 0 },
        ],
        { duration: 1150 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' },
      )
      document.body.appendChild(bit)
      setTimeout(() => bit.remove(), 1800)
    }
  }, [])

  return (
    <>
      <a
        href="#main"
        className="fixed -left-[999px] top-0 z-[9999] bg-gold px-5 py-3 font-bold text-night focus:left-4 focus:top-4"
      >
        Перейти до змісту
      </a>
      <a
        href="#contact"
        className="fixed -left-[999px] top-0 z-[9999] bg-coral px-5 py-3 font-bold text-night focus:left-4 focus:top-16"
      >
        Пропустити до форми
      </a>

      <ProgressRail progress={scrollYProgress} />
      <Nav
        onOpenContact={() => setContactOpen(true)}
        onNavigate={scrollToFraction}
      />
      <CursorGlow />

      {/* Universe (fixed background) */}
      <div className="fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <NebulaOverlay progress={scrollYProgress} />
        <StarField />
        <PortalOverlay progress={scrollYProgress} beatStrengths={beatStrengths} />
        <GrassGround drawingStrength={drawingStrength} />
        <RocketOverlay progress={scrollYProgress} finaleStrength={finaleStrength} />
      </div>

      {/* Story beats */}
      <main id="main" ref={containerRef} className="relative z-[10]">
        <div className="h-[1100vh] max-md:h-[700vh]">
          {/* All beats are fixed position, overlaying the scroll track */}
          <div className="fixed inset-0 z-[10] pointer-events-none">
            <div className="pointer-events-auto">
              <HeroBeat progress={scrollYProgress} onOpenContact={() => setContactOpen(true)} />
            </div>
            <div className="pointer-events-auto">
              <ManifestBeat progress={scrollYProgress} />
            </div>
            <div className="pointer-events-auto">
              <PillarsBeat progress={scrollYProgress} />
            </div>
            {[3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="pointer-events-auto">
                <WorldBeat progress={scrollYProgress} beatIndex={i} />
              </div>
            ))}
            <div className="pointer-events-auto">
              <TimelineBeat progress={scrollYProgress} />
            </div>
            <div className="pointer-events-auto">
              <GalleryBeat progress={scrollYProgress} />
            </div>
            <div className="pointer-events-auto">
              <TeamVoicesBeat progress={scrollYProgress} />
            </div>
            <div className="pointer-events-auto">
              <StatsBeat progress={scrollYProgress} />
            </div>
            <div className="pointer-events-auto">
              <FinaleBeat
                progress={scrollYProgress}
                onOpenContact={() => setContactOpen(true)}
                onConfetti={handleConfetti}
              />
            </div>
          </div>
        </div>
      </main>

      <ScrollHint progress={scrollYProgress} finaleStrength={finaleStrength} />
      <SoundToggle />
      <ContactPanel isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <Footer onOpenContact={() => setContactOpen(true)} />
    </>
  )
}
