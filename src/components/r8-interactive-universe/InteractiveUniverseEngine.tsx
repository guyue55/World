'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useWorldRuntime } from '@/components/r8-dynamic-world'
import interactiveData from '../../../data/r8-interactive-universe/interactive-scenes.json'

type InteractiveRoute = {
  match: string
  worldName: string
  realName: string
  scene: string
  mood: string
  visibility: string
  actions: string[]
  ritual: string
  next: Array<{ label: string; href: string }>
}

type Mainline = {
  id: string
  title: string
  worldName: string
  description: string
  steps: Array<{ label: string; href: string }>
}

export function interactiveRoutes(): InteractiveRoute[] {
  return interactiveData.routes as InteractiveRoute[]
}

export function interactiveMainlines(): Mainline[] {
  return interactiveData.mainlines as Mainline[]
}

export function resolveInteractiveRoute(pathname: string): InteractiveRoute {
  const exact = interactiveRoutes().find((route) => route.match === pathname)
  if (exact) return exact

  const prefix = interactiveRoutes()
    .filter((route) => route.match !== '/' && pathname.startsWith(route.match))
    .sort((a, b) => b.match.length - a.match.length)[0]

  return prefix ?? (interactiveData.fallback as InteractiveRoute)
}

function moodClass(mood: string) {
  if (mood === 'work') return 'border-ink/20 bg-ink/80 text-white'
  if (mood === 'guide') return 'border-gold/40 bg-gold/20 text-ink'
  if (mood === 'flow') return 'border-lake/30 bg-lake/15 text-lake'
  if (mood === 'route') return 'border-moss/30 bg-moss/15 text-moss'
  if (mood === 'still') return 'border-white/50 bg-white/75 text-ink'
  if (mood === 'read') return 'border-ink/15 bg-white/85 text-ink'
  return 'border-white/45 bg-white/30 text-ink'
}

export function InteractiveUniverseEngine() {
  const pathname = usePathname()
  const route = useMemo(() => resolveInteractiveRoute(pathname), [pathname])
  const { reducedMotion, dayPeriod, season } = useWorldRuntime()
  const [event, setEvent] = useState('世界动作等待触发')
  const [visitHint, setVisitHint] = useState('旅程正在记录')

  useEffect(() => {
    const key = 'guyue-r87-journey-log'
    const previous = JSON.parse(window.localStorage.getItem(key) ?? '[]') as Array<{ path: string; title: string; at: string }>
    const next = [{ path: pathname, title: route.worldName, at: new Date().toISOString() }, ...previous.filter((item) => item.path !== pathname)].slice(0, 8)
    window.localStorage.setItem(key, JSON.stringify(next))
    setVisitHint(previous.length > 0 ? `从 ${previous[0]?.title ?? '未知星域'} 回到 ${route.worldName}` : `${route.worldName} 已成为你的第一处坐标`)
  }, [pathname, route.worldName])

  return (
    <aside className="pointer-events-none fixed left-4 top-[8.25rem] z-[45] hidden w-[21rem] xl:block">
      <motion.div
        key={route.worldName}
        initial={reducedMotion ? false : { opacity: 0, x: -16, scale: 0.96 }}
        animate={reducedMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
        className={`pointer-events-auto rounded-[1.75rem] border p-4 shadow-soft backdrop-blur ${moodClass(route.mood)}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-65">R8.7 Interactive</p>
            <h2 className="mt-2 text-lg font-semibold">{route.worldName}</h2>
            <p className="mt-1 text-xs opacity-70">{route.realName} · {route.scene}</p>
          </div>
          <span className="rounded-full bg-white/55 px-3 py-1 text-[10px] font-semibold text-ink">{route.ritual}</span>
        </div>

        <p className="mt-4 rounded-2xl bg-white/45 p-3 text-xs leading-6 opacity-80">
          {visitHint} · {season} / {dayPeriod} · {event}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {route.actions.slice(0, 4).map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => setEvent(`${action} 已触发，${route.ritual}产生回声`)}
              className="rounded-full bg-white/70 px-3 py-2 text-[11px] font-semibold text-ink transition hover:-translate-y-0.5"
            >
              {action}
            </button>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {route.next.slice(0, 2).map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full bg-ink px-3 py-2 text-center text-[11px] font-semibold text-white transition hover:-translate-y-0.5">
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </aside>
  )
}
