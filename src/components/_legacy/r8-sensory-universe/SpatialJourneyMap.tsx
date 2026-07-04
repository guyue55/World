'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { resolveSensoryScene } from './SensoryUniverseEngine'
import { useWorldRuntime } from '@/components/r8-dynamic-world'

export function SpatialJourneyMap() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveSensoryScene(pathname), [pathname])
  const { reducedMotion } = useWorldRuntime()
  const rings = [scene.near, scene.middle, scene.far]

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-[43] hidden w-72 rounded-[1.75rem] border border-white/35 bg-white/25 p-4 text-ink/58 shadow-soft backdrop-blur 2xl:block">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">Spatial Map</p>
      <div className="relative mt-4 h-44 rounded-[1.4rem] border border-white/35 bg-sand/30">
        {rings.map((ring, ringIndex) => (
          <motion.div
            key={`${scene.title}-${ringIndex}`}
            className="absolute rounded-full border border-white/45"
            style={{ inset: `${18 + ringIndex * 22}px` }}
            animate={reducedMotion ? undefined : { rotate: ringIndex % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 60 + ringIndex * 22, repeat: Infinity, ease: 'linear' }}
          >
            {ring.slice(0, 3).map((item, index) => (
              <span
                key={item}
                className="absolute rounded-full bg-white/70 px-2 py-1 text-[9px] font-semibold"
                style={{ left: `${20 + index * 28}%`, top: index % 2 === 0 ? '-10px' : 'calc(100% - 8px)' }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        ))}
        <div className="absolute left-1/2 top-1/2 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink px-3 py-2 text-center text-[10px] font-semibold text-white shadow-soft">
          {scene.place}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {scene.next.map((item) => (
          <Link key={item.href} href={item.href} className="pointer-events-auto rounded-full bg-white/65 px-3 py-2 text-center text-[10px] font-semibold transition hover:-translate-y-0.5">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
