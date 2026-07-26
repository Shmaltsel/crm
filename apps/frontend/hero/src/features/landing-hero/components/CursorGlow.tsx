import { useState, useEffect } from 'react'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-[5] h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-400"
      aria-hidden="true"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 1 : 0,
        background: 'radial-gradient(circle, rgba(242,184,75,0.12) 0%, transparent 70%)',
      }}
    />
  )
}
