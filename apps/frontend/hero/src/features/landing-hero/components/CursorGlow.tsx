import { useState, useEffect, useRef, useCallback } from 'react'
import { Z } from '../lib/zIndex'
import type { Timeline } from '../types/timeline'

interface Props {
  tl?: Timeline
}

const INTERACTIVE_SELECTOR = 'button, a, [role="button"], input, textarea, select, [tabindex]'

export function CursorGlow({ tl }: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const posRef = useRef({ x: 0, y: 0 })
  const lerpRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)

  const updateGlowColor = useCallback(() => {
    if (!tl) return
    const r = Math.round(tl.lighting.accentR * 255)
    const g = Math.round(tl.lighting.accentG * 255)
    const b = Math.round(tl.lighting.accentB * 255)
    return `rgba(${r},${g},${b},0.14)`
  }, [tl])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      setVisible(true)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      setHovering(el ? !!el.closest(INTERACTIVE_SELECTOR) : false)
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => {
      lerpRef.current.x = lerp(lerpRef.current.x, posRef.current.x, 0.12)
      lerpRef.current.y = lerp(lerpRef.current.y, posRef.current.y, 0.12)
      setPos({ x: lerpRef.current.x, y: lerpRef.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const glowColor = updateGlowColor() ?? 'rgba(242,184,75,0.12)'
  const size = hovering ? 120 : 180
  const opacityVal = hovering ? 0.18 : 0.12

  return (
    <div
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
      aria-hidden="true"
      style={{
        zIndex: Z.cursorGlow,
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        opacity: visible ? opacityVal : 0,
        transition: 'opacity 0.4s, width 0.3s var(--ease-hero), height 0.3s var(--ease-hero)',
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
      }}
    />
  )
}
