'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'
import scenesData from '../../../data/r8-living-universe/living-scenes.json'

type SceneLink = { label: string; href: string }
type LivingScene = {
  match: string
  worldName: string
  realName: string
  areaKind: string
  answer: string
  near: string[]
  mid: string[]
  far: string[]
  civilization: string[]
  actions: string[]
  next: SceneLink[]
  visibility: string
}

function scenes(): LivingScene[] {
  return scenesData.scenes as LivingScene[]
}

export function resolveLivingScene(pathname: string): LivingScene {
  const exact = scenes().find((scene) => scene.match === pathname)
  if (exact) return exact

  const prefix = scenes()
    .filter((scene) => scene.match !== '/' && pathname.startsWith(scene.match))
    .sort((a, b) => b.match.length - a.match.length)[0]

  return prefix ?? (scenesData.fallback as LivingScene)
}

function orbitClass(kind: string) {
  if (kind === 'river') return 'border-lake/30 bg-lake/10'
  if (kind === 'archive') return 'border-gold/30 bg-gold/10'
  if (kind === 'lighthouse') return 'border-gold/40 bg-white/20'
  if (kind === 'creator') return 'border-ink/20 bg-ink/5'
  if (kind === 'evolution') return 'border-moss/30 bg-moss/10'
  if (kind === 'map') return 'border-lake/25 bg-white/15'
  return 'border-white/30 bg-white/10'
}

export function LivingUniverseField() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveLivingScene(pathname), [pathname])
  const { reducedMotion, dayPeriod, season } = useWorldRuntime()

  const nearObjects = scene.near.slice(0, 4)
  const midObjects = scene.mid.slice(0, 4)
  const farObjects = scene.far.slice(0, 4)

  return (
    <div className="pointer-events-none fixed inset-0 z-[18] overflow-hidden" aria-hidden="true">
      <motion.div
        className={`absolute left-[6vw] top-[18vh] h-28 w-28 rounded-full border ${orbitClass(scene.areaKind)} blur-[0.2px]`}
        animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.22, 0.45, 0.22] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[8vw] top-[28vh] h-52 w-52 rounded-full border border-white/20 bg-white/5"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[10vh] left-[10vw] h-72 w-72 rounded-full border border-moss/10 bg-moss/5 blur-xl"
        animate={reducedMotion ? undefined : { x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-x-8 top-28 hidden justify-between xl:flex">
        <div className="space-y-3">
          {nearObjects.map((item, index) => (
            <motion.div
              key={item}
              className="rounded-full border border-white/40 bg-white/25 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-ink/45 shadow-soft backdrop-blur"
              animate={reducedMotion ? undefined : { y: [0, -5 - index, 0], opacity: [0.38, 0.72, 0.38] }}
              transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
            >
              近景 · {item}
            </motion.div>
          ))}
        </div>
        <div className="mt-16 space-y-4 text-right">
          {farObjects.map((item, index) => (
            <motion.div
              key={item}
              className="rounded-full border border-lake/20 bg-white/18 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-ink/35 backdrop-blur"
              animate={reducedMotion ? undefined : { x: [0, -8 - index * 2, 0], opacity: [0.22, 0.58, 0.22] }}
              transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
            >
              远景 · {item}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-28 right-8 hidden max-w-md grid-cols-2 gap-2 2xl:grid">
        {midObjects.map((item, index) => (
          <motion.div
            key={item}
            className="rounded-2xl border border-white/35 bg-white/24 px-4 py-3 text-xs font-medium text-ink/42 backdrop-blur"
            animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 4 + index, repeat: Infinity, ease: 'easeInOut' }}
          >
            中景 · {item}
          </motion.div>
        ))}
      </div>

      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/20 px-3 py-2 text-[10px] font-semibold tracking-[0.28em] text-ink/35 backdrop-blur 2xl:block">
        {dayPeriod} · {season} · {scene.worldName}
      </div>
    </div>
  )
}
