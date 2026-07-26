import { Z } from '../lib/zIndex'

export function FilmGrain() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          zIndex: Z.overlays + 1,
          opacity: 0.025,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          zIndex: Z.overlays + 1,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(11,14,31,0.45) 100%)',
        }}
      />
    </>
  )
}
