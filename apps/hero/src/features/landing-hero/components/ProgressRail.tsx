import { MotionValue, motion, useTransform } from 'framer-motion'

interface Props {
  progress: MotionValue<number>
}

export function ProgressRail({ progress }: Props) {
  const width = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div className="fixed top-0 left-0 right-0 z-[310] h-[3px] bg-white/6">
      <motion.div
        className="h-full bg-gradient-to-r from-coral to-gold shadow-[0_0_12px_rgba(242,184,75,0.38)]"
        style={{ width }}
      />
    </div>
  )
}
