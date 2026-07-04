'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useWorldRuntime } from '@/components/r8-dynamic-world'
import sensoryScenes from '../../../data/r8-sensory-universe/sensory-scenes.json'

type SensoryScene = {
  match: string
  title: string
  place: string
  weather: string
  gravity: string
  near: string[]
  middle: string[]
  far: string[]
  ritual: string
  soundHint: string
  next: Array<{ label: string; href: string }>
}

function scenes(): SensoryScene[] {
  return sensoryScenes.scenes as SensoryScene[]
}

export function resolveSensoryScene(pathname: string): SensoryScene {
  const exact = scenes().find((scene) => scene.match === pathname)
  if (exact) return exact

  const prefix = scenes()
    .filter((scene) => scene.match !== '/' && pathname.startsWith(scene.match))
    .sort((a, b) => b.match.length - a.match.length)[0]

  return prefix ?? (sensoryScenes.fallback as SensoryScene)
}

function gravityClass(gravity: string) {
  if (gravity === 'flow') return 'border-lake/30 bg-lake/10 text-lake'
  if (gravity === 'still') return 'border-gold/30 bg-gold/10 text-gold'
  if (gravity === 'focus') return 'border-gold/40 bg-white/45 text-gold'
  if (gravity === 'work') return 'border-ink/20 bg-ink/5 text-ink'
  if (gravity === 'wide') return 'border-lake/20 bg-white/35 text-lake'
  if (gravity === 'route') return 'border-moss/30 bg-moss/10 text-moss'
  if (gravity === 'read') return 'border-ink/20 bg-white/55 text-ink'
  return 'border-white/40 bg-white/30 text-ink'
}

export function SensoryUniverseEngine() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveSensoryScene(pathname), [pathname])
  const { reducedMotion, season, dayPeriod } = useWorldRuntime()
  const [pulse, setPulse] = useState('正在校准世界感官')

  useEffect(() => {
    const key = 'guyue-r86-sensory-visits'
    const visits = Number(window.localStorage.getItem(key) ?? '0') + 1
    window.localStorage.setItem(key, String(visits))
    setPulse(visits > 1 ? `第 ${visits} 次返回，${scene.place} 已重新亮起` : `${scene.place} 第一次向你显现`)
  }, [scene.place])

  return (
    <aside className="pointer-events-none fixed right-4 top-[8.25rem] z-[44] hidden w-[22rem] xl:block">
      <motion.div
        key={scene.title}
        initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        className={`pointer-events-auto rounded-[1.75rem] border p-4 shadow-soft backdrop-blur ${gravityClass(scene.gravity)}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-70">Sensory Universe</p>
            <h2 className="mt-2 text-lg font-semibold">{scene.title}</h2>
            <p className="mt-1 text-xs opacity-70">{scene.place} · {scene.weather}</p>
          </div>
          <span className="rounded-full bg-white/55 px-3 py-1 text-[10px] font-semibold">{scene.ritual}</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] leading-5">
          <div className="rounded-2xl bg-white/45 p-3">
            <p className="font-semibold opacity-80">近景</p>
            <p className="mt-1 opacity-60">{scene.near.slice(0, 3).join(' / ')}</p>
          </div>
          <div className="rounded-2xl bg-white/45 p-3">
            <p className="font-semibold opacity-80">中景</p>
            <p className="mt-1 opacity-60">{scene.middle.slice(0, 3).join(' / ')}</p>
          </div>
          <div className="rounded-2xl bg-white/45 p-3">
            <p className="font-semibold opacity-80">远景</p>
            <p className="mt-1 opacity-60">{scene.far.slice(0, 3).join(' / ')}</p>
          </div>
        </div>

        <p className="mt-4 rounded-2xl bg-white/45 p-3 text-xs leading-6 opacity-75">
          {pulse} · {season} / {dayPeriod} · {scene.soundHint}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {scene.next.slice(0, 2).map((item) => (
            <Link key={item.href} href={item.href} className="pointer-events-auto rounded-full bg-ink/85 px-3 py-2 text-center text-[11px] font-semibold text-white transition hover:-translate-y-0.5">
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </aside>
  )
}
