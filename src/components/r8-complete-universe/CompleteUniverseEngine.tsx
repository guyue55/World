'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useWorldRuntime } from '@/components/r8-dynamic-world'
import completeScenes from '../../../data/r8-complete-universe/complete-scenes.json'
import completeRituals from '../../../data/r8-complete-universe/complete-rituals.json'

type CompleteScene = {
  match: string
  title: string
  realName: string
  tone: string
  seasonalMood: string
  objects: string[]
  rituals: string[]
  worldState: string
  next: Array<{ label: string; href: string }>
}

type Ritual = {
  id: string
  label: string
  effect: string
  kind: string
}

function allScenes(): CompleteScene[] {
  return completeScenes.scenes as CompleteScene[]
}

export function resolveCompleteScene(pathname: string): CompleteScene {
  const exact = allScenes().find((scene) => scene.match === pathname)
  if (exact) return exact

  const prefix = allScenes()
    .filter((scene) => scene.match !== '/' && pathname.startsWith(scene.match))
    .sort((a, b) => b.match.length - a.match.length)[0]

  return prefix ?? (completeScenes.fallback as CompleteScene)
}

function toneClass(tone: string) {
  if (tone === 'river') return 'border-lake/30 bg-lake/10 text-lake'
  if (tone === 'archive') return 'border-gold/30 bg-gold/10 text-gold'
  if (tone === 'lighthouse') return 'border-gold/40 bg-white/35 text-gold'
  if (tone === 'creator') return 'border-ink/20 bg-ink/5 text-ink'
  if (tone === 'evolution') return 'border-moss/30 bg-moss/10 text-moss'
  if (tone === 'public') return 'border-moss/25 bg-white/30 text-moss'
  if (tone === 'map') return 'border-lake/20 bg-white/30 text-lake'
  return 'border-white/40 bg-white/30 text-ink'
}

export function CompleteUniverseEngine() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveCompleteScene(pathname), [pathname])
  const { reducedMotion, season, dayPeriod, markJourney } = useWorldRuntime()
  const rituals = completeRituals.rituals as Ritual[]
  const [activeRitual, setActiveRitual] = useState<Ritual>(rituals[0])
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [returnHint, setReturnHint] = useState('第一次抵达此处')

  useEffect(() => {
    markJourney(pathname, scene.title)
    const key = 'guyue-r85-last-scene'
    const previous = window.localStorage.getItem(key)
    if (previous && previous !== scene.title) {
      setReturnHint(`上次停在 ${previous}，这次抵达 ${scene.title}`)
    } else {
      setReturnHint(`正在观测 ${scene.title}`)
    }
    window.localStorage.setItem(key, scene.title)
  }, [markJourney, pathname, scene.title])

  useEffect(() => {
    if (reducedMotion) return
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18
      const y = (event.clientY / window.innerHeight - 0.5) * 18
      setPointer({ x, y })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  const visibleRituals = rituals.filter((ritual) => scene.rituals.includes(ritual.label) || ritual.id === 'return').slice(0, 5)

  return (
    <div className="pointer-events-none fixed inset-0 z-[45]" aria-hidden={false}>
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/18 bg-white/5 blur-3xl"
        animate={reducedMotion ? undefined : { x: pointer.x, y: pointer.y, opacity: [0.16, 0.3, 0.16] }}
        transition={{ duration: 0.45, opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
      />

      <motion.aside
        className="pointer-events-auto absolute bottom-24 left-4 hidden w-[23rem] overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-4 shadow-soft backdrop-blur-xl xl:block"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.34em] text-moss">R8.5 LIVING KERNEL</p>
            <h2 className="mt-2 text-xl font-semibold text-ink">{scene.title}</h2>
            <p className="mt-1 text-xs text-ink/50">{scene.realName}</p>
          </div>
          <span className={`rounded-full border px-3 py-1 text-[10px] font-semibold ${toneClass(scene.tone)}`}>{scene.tone}</span>
        </div>

        <p className="mt-4 rounded-[1.25rem] bg-sand/60 p-3 text-xs leading-6 text-ink/52">{scene.seasonalMood}</p>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {scene.objects.slice(0, 6).map((object, index) => (
            <motion.div
              key={object}
              className="rounded-2xl bg-white/70 px-3 py-2 text-center text-[11px] font-medium text-ink/60"
              animate={reducedMotion ? undefined : { y: [0, -2 - (index % 2), 0] }}
              transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {object}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 rounded-[1.25rem] border border-white/70 bg-white/60 p-3">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-ink/45">WORLD FEEDBACK</p>
          <p className="mt-2 text-xs leading-6 text-ink/52">{activeRitual.effect}</p>
          <p className="mt-2 text-[11px] text-ink/40">{returnHint} · {season} · {dayPeriod}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {visibleRituals.map((ritual) => (
            <button
              key={ritual.id}
              type="button"
              onClick={() => setActiveRitual(ritual)}
              className="rounded-full bg-ink px-3 py-2 text-[11px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-moss"
            >
              {ritual.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {scene.next.slice(0, 3).map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full border border-white/70 bg-sand/70 px-3 py-2 text-center text-[11px] font-semibold text-ink/52 transition hover:bg-white">
              {item.label}
            </Link>
          ))}
        </div>
      </motion.aside>
    </div>
  )
}
