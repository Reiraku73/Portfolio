'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Fades and slides its children up the first time they scroll into view.
// Elements above the fold animate on load, so the hero uses it too.
export function FadeUp({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Accent line that grows from the left on load.
export function GrowLine({ delay = 0, className }: { delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className={className}
      style={{ transformOrigin: 'left' }}
    />
  )
}
