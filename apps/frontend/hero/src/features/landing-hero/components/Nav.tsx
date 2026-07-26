import { useState, useEffect } from 'react'
import { Z } from '../lib/zIndex'

interface Props {
  onOpenContact: () => void
  onNavigate: (fraction: number) => void
}

const NAV_LINKS = [
  { label: 'Про нас', fraction: 0.18 },
  { label: 'Наші світи', fraction: 0.28 },
  { label: 'Як проходить', fraction: 0.62 },
  { label: 'Галерея', fraction: 0.70 },
  { label: 'Команда', fraction: 0.78 },
]

export function Nav({ onOpenContact, onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-[400ms] ${
        scrolled
          ? 'bg-night/72 py-3 backdrop-blur-[14px] border-b border-gold/12'
          : 'py-[18px]'
      }`}
      style={{ zIndex: Z.nav }}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-7">
        <a href="#top" className="flex items-center gap-2.5 font-display text-[18px] font-semibold text-paper">
          <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_3px_rgba(242,184,75,0.38)]" aria-hidden="true" />
          Світло Знань
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onNavigate(link.fraction)
              }}
              className="text-[13.5px] font-medium text-mist transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenContact}
            className="rounded-full bg-gold px-[22px] py-2.5 text-[13.5px] font-bold text-night transition-all hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(242,184,75,0.38)]"
          >
            Запросити подію
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={mobileOpen}
        >
          <span className={`block h-0.5 w-6 bg-paper transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-paper transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-paper transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 border-t border-gold/12 bg-night/95 backdrop-blur-[14px] md:hidden">
          <div className="flex flex-col items-center gap-5 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(link.fraction)
                  setMobileOpen(false)
                }}
                className="text-[15px] font-medium text-mist transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                onOpenContact()
                setMobileOpen(false)
              }}
              className="rounded-full bg-gold px-7 py-3 text-[14px] font-bold text-night"
            >
              Запросити подію
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
