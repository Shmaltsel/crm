import { useAudioAmbience } from '../hooks/useAudioAmbience'
import { Z } from '../lib/zIndex'

export function SoundToggle() {
  const { soundOn, toggle } = useAudioAmbience()

  return (
    <button
      onClick={toggle}
      aria-pressed={soundOn}
      aria-label={soundOn ? 'Вимкнути звук' : 'Увімкнути звук'}
      className={`fixed bottom-5 right-5 flex h-[50px] w-[50px] items-center justify-center rounded-full border bg-night/70 text-paper backdrop-blur-[12px] transition-all hover:scale-[1.08] ${
        soundOn
          ? 'border-gold shadow-[0_0_22px_rgba(242,184,75,0.38)]'
          : 'border-gold/35'
      }`}
      style={{ zIndex: Z.soundToggle }}
    >
      {soundOn ? '🔊' : '🔈'}
    </button>
  )
}
