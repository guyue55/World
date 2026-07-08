'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'

const orbitSeeds = Array.from({ length: 18 }, (_, index) => ({
  id: `orbit-${index}`,
  radius: 18 + (index % 6) * 11,
  left: 8 + ((index * 17) % 84),
  top: 8 + ((index * 23) % 78),
  delay: (index % 8) * 0.28,
  size: 3 + (index % 5),
}))

const islandSeeds = [
  { id: 'origin-desk', label: '创世原点', left: 14, top: 32, scale: 1.05 },
  { id: 'tech-star', label: '技术星域', left: 72, top: 24, scale: 0.86 },
  { id: 'memory-lake', label: '记忆湖', left: 24, top: 72, scale: 0.92 },
  { id: 'lighthouse', label: 'AI 灯塔', left: 82, top: 70, scale: 0.78 },
]

export function UniverseStage() {
  const { dayPeriod, reducedMotion, season } = useWorldRuntime()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 34, damping: 18 })
  const springY = useSpring(pointerY, { stiffness: 34, damping: 18 })
  const driftX = useTransform(springX, [-0.5, 0.5], [-18, 18])
  const driftY = useTransform(springY, [-0.5, 0.5], [-14, 14])
  const isNight = dayPeriod === 'night'

  useEffect(() => {
    if (reducedMotion) return
    function handlePointer(event: PointerEvent) {
      pointerX.set(event.clientX / window.innerWidth - 0.5)
      pointerY.set(event.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', handlePointer, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointer)
  }, [pointerX, pointerY, reducedMotion])

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <div className={`absolute inset-0 ${isNight ? 'bg-night/18' : 'bg-paper/20'}`} />
      <motion.div
        className="absolute -left-24 top-16 h-[34rem] w-[34rem] rounded-full bg-lake/18 blur-3xl"
        style={{ x: reducedMotion ? 0 : driftX, y: reducedMotion ? 0 : driftY }}
      />
      <motion.div
        className="absolute -right-24 bottom-10 h-[30rem] w-[30rem] rounded-full bg-gold/16 blur-3xl"
        style={{ x: reducedMotion ? 0 : driftY, y: reducedMotion ? 0 : driftX }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(255,255,255,0.50),transparent_26rem),radial-gradient(circle_at_20%_80%,rgba(125,154,162,0.16),transparent_24rem)]" />
      {orbitSeeds.map((seed) => (
        <motion.span
          key={seed.id}
          className="absolute rounded-full border border-white/45 bg-white/40 shadow-[0_0_24px_rgba(255,255,255,0.48)]"
          style={{ left: `${seed.left}%`, top: `${seed.top}%`, width: seed.size, height: seed.size }}
          animate={reducedMotion ? undefined : { opacity: [0.2, 0.78, 0.2], x: [0, seed.radius / 2, 0, -seed.radius / 2, 0], y: [0, -seed.radius / 3, 0, seed.radius / 3, 0] }}
          transition={{ duration: 10 + (seed.size % 4), delay: seed.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {islandSeeds.map((island, index) => (
        <motion.div
          key={island.id}
          className="absolute hidden rounded-[999px] border border-white/35 bg-white/20 px-4 py-2 text-xs font-semibold text-ink/55 shadow-soft backdrop-blur md:block"
          style={{ left: `${island.left}%`, top: `${island.top}%`, scale: island.scale }}
          animate={reducedMotion ? undefined : { y: [0, -8 - index * 2, 0], opacity: [0.34, 0.62, 0.34] }}
          transition={{ duration: 8 + index, repeat: Infinity, ease: 'easeInOut' }}
        >
          {island.label}
        </motion.div>
      ))}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-paper via-paper/60 to-transparent" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(23,33,29,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(23,33,29,0.4)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 rotate-[-90deg] text-[10px] font-semibold tracking-[0.45em] text-ink/24 lg:block">{season.toUpperCase()} · LIVING COSMOS</div>
    </div>
  )
}
