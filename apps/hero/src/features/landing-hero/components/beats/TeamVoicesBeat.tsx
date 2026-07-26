import { MotionValue, motion, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useBeatStrength } from '../../hooks/useBeatStrength'
import { CAMPFIRE_QUOTES } from '../../data/quotes'
import { TEAM_MEMBERS } from '../../data/team'

interface Props {
  progress: MotionValue<number>
}

export function TeamVoicesBeat({ progress }: Props) {
  const strength = useBeatStrength(progress, 10)
  const y = useTransform(strength, [0, 1], [22, 0])
  const [activeIdx, setActiveIdx] = useState(0)
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  // Crossfade quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CAMPFIRE_QUOTES.length)
    }, 4200)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      role="region"
      aria-label="Голоси та команда"
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity: strength, y }}
    >
      <div className="max-w-[680px]">
        <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.18em] text-gold opacity-90">
          Голоси та команда
        </p>
        <h2 className="text-[clamp(26px,3.9vw,42px)] leading-[1.15] text-paper">
          Люди, яких не скопіювати
        </h2>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-12">
          {/* Campfire flame */}
          <div className="h-[42px] w-7">
            <svg viewBox="0 0 30 44">
              <path d="M15,4 C24,18 24,28 15,40 C6,28 6,18 15,4 Z" fill="#F2B84B" />
            </svg>
          </div>

          {/* Quote crossfade */}
          <div className="relative w-[min(500px,90vw)]" style={{ minHeight: 110 }}>
            {CAMPFIRE_QUOTES.map((quote, idx) => (
              <div
                key={idx}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: idx === activeIdx ? 1 : 0 }}
              >
                <p className="font-display text-[18.5px] leading-[1.42]">{quote.text}</p>
                <p className="mt-3 text-[12.5px] font-bold text-mist-soft">{quote.attribution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team ring */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {TEAM_MEMBERS.map((member, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMember(idx)}
              className={`h-[62px] w-[62px] rounded-full border-2 bg-white/4 p-0 transition-all hover:-translate-y-[3px] ${
                selectedMember === idx
                  ? 'border-gold'
                  : 'border-gold/38'
              }`}
              aria-label={`${member.name}, ${member.role}`}
            >
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <rect width="200" height="200" fill={member.bg} />
                <circle cx="100" cy="80" r="34" stroke={member.accent} strokeWidth="3" fill="none" />
                <path d="M50,170 C50,130 150,130 150,170" stroke={member.accent} strokeWidth="3" fill="none" />
              </svg>
            </button>
          ))}
        </div>

        <p className="mt-4 min-h-[22px] text-[14px] text-mist italic">
          {selectedMember !== null
            ? TEAM_MEMBERS[selectedMember].phrase
            : 'Натисніть на людину, щоб почути її історію.'}
        </p>
      </div>
    </motion.div>
  )
}
