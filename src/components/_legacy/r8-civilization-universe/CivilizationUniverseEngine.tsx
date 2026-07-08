'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'
import { getCivilizationLayers, resolveRouteAnchor } from './types'

function safeRead(key: string, fallback: string[]) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as string[]) : fallback
  } catch {
    return fallback
  }
}

function safeWrite(key: string, value: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Hardened browsers can disable storage; the universe must still run.
  }
}

export function CivilizationUniverseEngine() {
  const pathname = usePathname()
  const anchor = useMemo(() => resolveRouteAnchor(pathname), [pathname])
  const layers = getCivilizationLayers()
  const { reducedMotion, season, dayPeriod } = useWorldRuntime()
  const [activeLayer, setActiveLayer] = useState(layers[0]?.id ?? 'nature')
  const [echo, setEcho] = useState('正在建立文明坐标')

  const layer = layers.find((item) => item.id === activeLayer) ?? layers[0]

  useEffect(() => {
    const key = 'guyue-r89-civilization-trail'
    const previous = safeRead(key, [])
    const next = [anchor.where, ...previous.filter((item) => item !== anchor.where)].slice(0, 8)
    safeWrite(key, next)
    setEcho(previous[0] ? `上次停在 ${previous[0]}，现在抵达 ${anchor.where}` : `${anchor.where} 成为本次文明旅程的起点`)
  }, [anchor.where])

  return (
    <aside className="pointer-events-none fixed right-4 top-[23.5rem] z-[44] hidden w-[22rem] 2xl:block">
      <motion.div
        key={anchor.where}
        initial={reducedMotion ? false : { opacity: 0, x: 14, y: 8 }}
        animate={reducedMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
        className="pointer-events-auto rounded-[1.8rem] border border-white/55 bg-white/74 p-4 text-ink shadow-soft backdrop-blur"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-moss">Civilization</p>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">{anchor.where}</h2>
            <p className="mt-1 text-xs leading-5 text-ink/55">{anchor.what}</p>
          </div>
          <span className="rounded-full bg-moss px-3 py-1 text-[10px] font-semibold text-white">{anchor.visibility}</span>
        </div>

        <p className="mt-4 rounded-2xl bg-sand/68 p-3 text-xs leading-5 text-ink/58">{echo}</p>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {layers.slice(0, 6).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveLayer(item.id)}
              className={`rounded-2xl px-3 py-2 text-left text-[11px] font-semibold transition ${activeLayer === item.id ? 'bg-ink text-white' : 'bg-white/70 text-ink/52 hover:bg-white'}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border border-white/70 bg-white/55 p-3">
          <p className="text-[11px] font-semibold text-ink/45">{season} / {dayPeriod}</p>
          <p className="mt-1 text-xs font-semibold text-ink">{layer.name}｜{layer.realName}</p>
          <p className="mt-1 text-xs leading-5 text-ink/58">{layer.purpose}</p>
          <p className="mt-2 text-[11px] font-semibold text-gold">默认动作：{layer.defaultAction}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {layer.objects.map((object) => (
            <span key={object} className="rounded-full bg-ink/5 px-3 py-1 text-[10px] font-semibold text-ink/45">
              {object}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-2">
          {anchor.next.slice(0, 3).map((href) => (
            <Link key={href} href={href} className="rounded-full bg-ink px-4 py-2 text-center text-[11px] font-semibold text-white transition hover:-translate-y-0.5">
              前往 {href}
            </Link>
          ))}
        </div>
      </motion.div>
    </aside>
  )
}
