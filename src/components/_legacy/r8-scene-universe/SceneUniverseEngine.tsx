'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'
import sceneData from '../../../data/r8-scene-universe/scene-universe.json'

type SceneLink = {
  label: string
  href: string
}

export type SceneRoute = {
  match: string
  worldName: string
  realName: string
  place: string
  story: string
  sceneObjects: string[]
  lifeStage: string
  scale: string
  defaultMode: 'world' | 'reality' | 'reader'
  primaryAction: string
  secondaryActions: string[]
  quest: string
  next: SceneLink[]
}

export function sceneRoutes(): SceneRoute[] {
  return sceneData.routes as SceneRoute[]
}

export function resolveSceneRoute(pathname: string): SceneRoute {
  const exact = sceneRoutes().find((route) => route.match === pathname)
  if (exact) return exact

  const prefix = sceneRoutes()
    .filter((route) => route.match !== '/' && pathname.startsWith(route.match))
    .sort((a, b) => b.match.length - a.match.length)[0]

  return prefix ?? (sceneData.fallback as SceneRoute)
}

function safeReadJson<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function safeWriteJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage can be disabled in private or hardened browsers.
  }
}

function scaleLabel(scale: string) {
  if (scale === 'near') return '近景'
  if (scale === 'middle') return '中景'
  if (scale === 'far') return '远景'
  if (scale === 'near-to-far') return '近景 → 远景'
  return '混合景深'
}

export function SceneUniverseEngine() {
  const pathname = usePathname()
  const route = useMemo(() => resolveSceneRoute(pathname), [pathname])
  const { reducedMotion, season, dayPeriod } = useWorldRuntime()
  const [echo, setEcho] = useState('正在建立场景坐标')
  const [activeAction, setActiveAction] = useState(route.primaryAction)

  useEffect(() => {
    const key = 'guyue-r88-scene-journey'
    const previous = safeReadJson<Array<{ path: string; title: string; place: string; at: string }>>(key, [])
    const current = { path: pathname, title: route.worldName, place: route.place, at: new Date().toISOString() }
    const next = [current, ...previous.filter((item) => item.path !== pathname)].slice(0, 10)
    safeWriteJson(key, next)
    setEcho(previous[0] ? `上次停在 ${previous[0].title}，这次抵达 ${route.worldName}` : `${route.worldName} 成为本次旅程的第一处场景`)
    setActiveAction(route.primaryAction)
  }, [pathname, route.place, route.primaryAction, route.worldName])

  return (
    <aside className="pointer-events-none fixed left-4 top-[23.5rem] z-[43] hidden w-[21rem] 2xl:block">
      <motion.div
        key={`${route.match}-${route.worldName}`}
        initial={reducedMotion ? false : { opacity: 0, x: -12, y: 8 }}
        animate={reducedMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
        className="pointer-events-auto overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/70 p-4 text-ink shadow-soft backdrop-blur"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">Scene</p>
            <h2 className="mt-2 text-base font-semibold">{route.worldName}</h2>
            <p className="mt-1 text-xs leading-5 text-ink/52">{route.realName}</p>
          </div>
          <span className="rounded-full bg-ink px-3 py-1 text-[10px] font-semibold text-white">{scaleLabel(route.scale)}</span>
        </div>

        <p className="mt-4 rounded-2xl bg-sand/65 p-3 text-xs leading-5 text-ink/58">{echo}</p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {[route.primaryAction, ...route.secondaryActions.slice(0, 3)].map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => setActiveAction(action)}
              className={`rounded-2xl px-3 py-2 text-left text-[11px] font-semibold transition ${activeAction === action ? 'bg-gold/20 text-gold' : 'bg-white/65 text-ink/55 hover:bg-white'}`}
            >
              {action}
            </button>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border border-white/70 bg-white/55 p-3">
          <p className="text-[11px] font-semibold text-ink/55">{season} / {dayPeriod} · {route.lifeStage}</p>
          <p className="mt-1 text-xs leading-5 text-ink/58">当前动作：{activeAction}。{route.story}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {route.sceneObjects.slice(0, 5).map((item) => (
            <span key={item} className="rounded-full bg-ink/5 px-3 py-1 text-[10px] font-semibold text-ink/45">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-2">
          {route.next.slice(0, 3).map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full bg-ink px-4 py-2 text-center text-[11px] font-semibold text-white transition hover:-translate-y-0.5">
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </aside>
  )
}
