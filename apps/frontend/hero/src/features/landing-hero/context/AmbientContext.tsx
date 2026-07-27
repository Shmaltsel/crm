import { createContext, useCallback, useContext, useRef } from 'react'
import type { AmbientCommands } from '../components/overlays/GlobalAmbientCanvas'

const AmbientCtx = createContext<AmbientCommands | null>(null)

export function useAmbient() {
  const ctx = useContext(AmbientCtx)
  if (!ctx) return null
  return ctx
}

export function useAmbientCommands() {
  const ref = useRef<AmbientCommands | null>(null)
  const setCommands = useCallback((cmds: AmbientCommands) => { ref.current = cmds }, [])
  return { ref, setCommands }
}

export { AmbientCtx }
