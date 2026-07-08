'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'
import sceneRegistry from '../../../data/r8-full-dynamic-world/route-scenes.json'
import actionRegistry from '../../../data/r8-full-dynamic-world/dynamic-actions.json'

type Scene = {
  match: string
  name: string
  realName: string
  tone: string
  primaryAction: string
  href: string
  objects: string[]
  motion: string
}

type WorldAction = {
  id: string
  label: string
  worldEffect: string
}

function resolveScene(pathname: string): Scene {
  const scenes = sceneRegistry.scenes as Scene[]
  const exact = scenes.find((scene) => scene.match === pathname)
  if (exact) return exact

  const prefix = scenes
    .filter((scene) => scene.match !== '/' && pathname.startsWith(scene.match))
    .sort((a, b) => b.match.length - a.match.length)[0]

  return prefix ?? (sceneRegistry.fallback as Scene)
}

function toneClass(tone: string) {
  if (tone === 'lighthouse') return 'from-gold/26 via-white/32 to-lake/16'
  if (tone === 'river') return 'from-lake/25 via-white/30 to-moss/10'
  if (tone === 'creator') return 'from-ink/10 via-white/34 to-gold/18'
  if (tone === 'archive') return 'from-sand/55 via-white/40 to-ink/8'
  if (tone === 'service') return 'from-lake/16 via-white/34 to-ink/10'
  if (tone === 'evolution') return 'from-moss/16 via-white/36 to-gold/14'
  if (tone === 'public') return 'from-gold/18 via-white/38 to-moss/12'
  return 'from-white/44 via-sand/35 to-lake/12'
}

export function FullUniverseOrchestrator() {
  const pathname = usePathname()
  const { markJourney, reducedMotion } = useWorldRuntime()
  const scene = useMemo(() => resolveScene(pathname), [pathname])
  const actions = actionRegistry.actions as WorldAction[]
  const [expanded, setExpanded] = useState(false)
  const [effect, setEffect] = useState(scene.motion)
  const [visitCount, setVisitCount] = useState(1)

  useEffect(() => {
    markJourney(pathname, scene.name)
    const key = 'guyue-r83-visit-count'
    const current = Number(window.localStorage.getItem(key) ?? '0') + 1
    window.localStorage.setItem(key, String(current))
    setVisitCount(current)
    setEffect(scene.motion)
  }, [markJourney, pathname, scene.motion, scene.name])

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden={false}>
      <motion.div
        className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b ${toneClass(scene.tone)} blur-2xl`}
        animate={reducedMotion ? undefined : { opacity: [0.32, 0.58, 0.32] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-auto absolute right-4 top-24 hidden w-[21rem] overflow-hidden rounded-[2rem] border border-white/60 bg-white/78 p-4 text-ink shadow-soft backdrop-blur-xl xl:block"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button type="button" onClick={() => setExpanded((value) => !value)} className="w-full text-left">
          <p className="text-[10px] font-semibold tracking-[0.34em] text-moss">LIVE SCENE</p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-ink">{scene.name}</p>
              <p className="text-xs text-ink/48">{scene.realName}</p>
            </div>
            <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-semibold text-white">{scene.tone}</span>
          </div>
        </button>

        {expanded ? (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {scene.objects.map((object) => (
                <motion.span
                  key={object}
                  className="rounded-2xl bg-sand/70 px-3 py-2 text-xs text-ink/62"
                  animate={reducedMotion ? undefined : { y: [0, -2, 0], opacity: [0.72, 1, 0.72] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {object}
                </motion.span>
              ))}
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/60 p-3 text-xs leading-6 text-ink/60">
              当前反馈：{effect} · 第 {visitCount} 次观测
            </div>
            <div className="grid grid-cols-5 gap-1">
              {actions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  title={action.worldEffect}
                  onClick={() => setEffect(action.worldEffect)}
                  className="rounded-full bg-white/74 px-2 py-2 text-[11px] font-semibold text-ink/58 transition hover:bg-ink hover:text-white"
                >
                  {action.label}
                </button>
              ))}
            </div>
            <Link href={scene.href} onClick={() => markJourney(scene.href, scene.primaryAction)} className="block rounded-full bg-ink px-4 py-3 text-center text-xs font-semibold text-white transition hover:-translate-y-0.5">
              {scene.primaryAction}
            </Link>
          </div>
        ) : null}
      </motion.div>
    </div>
  )
}
