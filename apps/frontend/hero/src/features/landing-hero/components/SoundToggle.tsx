import { useAudioAmbience } from '../hooks/useAudioAmbience'
import { Z } from '../lib/zIndex'

export function SoundToggle() {
  const { soundOn, toggle } = useAudioAmbience()

  return (
    <button
      onClick={toggle}
      aria-pressed={soundOn}
      aria-label={soundOn ? 'Вимкнути звук' : 'Увімкнути звук'}
      className={`fixed bottom-5 right-5 flex h-[50px] w-[50px] items-center justify-center rounded-full border bg-night/70 backdrop-blur-[12px] transition-all hover:scale-[1.08] ${
        soundOn
          ? 'border-gold shadow-[0_0_22px_rgba(242,184,75,0.38)]'
          : 'border-gold/35'
      }`}
      style={{ zIndex: Z.soundToggle }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#FBF5EA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {soundOn ? (
          <>
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
          </>
        ) : (
          <>
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
    </button>
  )
}
