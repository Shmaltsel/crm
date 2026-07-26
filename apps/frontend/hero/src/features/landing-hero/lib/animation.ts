export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

export function tweenScrollTo(
  target: number,
  opts?: { onCancelCheck?: () => boolean },
): Promise<void> {
  const start = window.scrollY
  const distance = target - start
  const duration = clamp(Math.abs(distance) / window.innerHeight * 260, 350, 1400)
  const startTime = performance.now()

  return new Promise<void>((resolve) => {
    function step(now: number) {
      if (opts?.onCancelCheck?.()) return resolve()
      const t = clamp((now - startTime) / duration, 0, 1)
      window.scrollTo(0, start + distance * smoothstep(t))
      if (t < 1) requestAnimationFrame(step)
      else resolve()
    }
    requestAnimationFrame(step)
  })
}
