import { useEffect, useRef, useState } from 'react'

export function useFirstScroll(): boolean {
  const [hasInteracted, setHasInteracted] = useState(false)
  const touchedRef = useRef(false)

  useEffect(() => {
    if (touchedRef.current) return

    const onInteract = () => {
      if (touchedRef.current) return
      touchedRef.current = true
      setHasInteracted(true)
      window.removeEventListener('wheel', onInteract)
      window.removeEventListener('touchmove', onInteract)
      window.removeEventListener('keydown', onKey)
    }

    const onKey = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', ' ']
      if (scrollKeys.includes(e.key)) onInteract()
    }

    window.addEventListener('wheel', onInteract, { passive: true })
    window.addEventListener('touchmove', onInteract, { passive: true })
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('wheel', onInteract)
      window.removeEventListener('touchmove', onInteract)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return hasInteracted
}
