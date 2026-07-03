'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useWorldRuntime } from '@/components/r8-dynamic-world'
import { resolveCompleteScene } from './CompleteUniverseEngine'

const positions = [
  'left-[12vw] top-[22vh]',
  'right-[14vw] top-[18vh]',
  'left-[18vw] bottom-[18vh]',
  'right-[18vw] bottom-[22vh]',
  'left-[48vw] top-[14vh]',
  'right-[42vw] bottom-[14vh]',
]

export function UniverseObjectConstellation() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveCompleteScene(pathname), [pathname])
  const { reducedMotion } = useWorldRuntime()

  return (
    <div className="pointer-events-none fixed inset-0 z-[19] hidden overflow-hidden 2xl:block" aria-hidden="true">
      {scene.objects.slice(0, 6).map((object, index) => (
        <motion.div
          key={`${scene.match}-${object}`}
          className={`absolute ${positions[index]} rounded-full border border-white/35 bg-white/20 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-ink/40 shadow-soft backdrop-blur`}
          animate={reducedMotion ? undefined : { y: [0, -8 - index, 0], x: [0, index % 2 === 0 ? 4 : -4, 0], opacity: [0.26, 0.62, 0.26] }}
          transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut' }}
        >
          万物 · {object}
        </motion.div>
      ))}
    </div>
  )
}
