import { createContext, useCallback, useContext, useState } from 'react'
import type { AmbientCommands } from '../components/overlays/GlobalAmbientCanvas'

const AmbientCtx = createContext<AmbientCommands | null>(null)

export function useAmbient() {
  return useContext(AmbientCtx)
}

export function useAmbientCommands() {
  const [commands, setCommandsState] = useState<AmbientCommands | null>(null)
  const setCommands = useCallback((cmds: AmbientCommands) => setCommandsState(cmds), [])
  return { commands, setCommands }
}

export { AmbientCtx }
