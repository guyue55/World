'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { resolveCompleteScene } from './CompleteUniverseEngine'
import { useWorldRuntime } from '@/components/r8-dynamic-world'

export function TodayWorldPanel() {
  const pathname = usePathname()
  const scene = useMemo(() => resolveCompleteScene(pathname), [pathname])
  const { season, dayPeriod, lowLight } = useWorldRuntime()
  const todays = [
    `今日场景：${scene.title}`,
    `今日节律：${season} · ${dayPeriod}`,
    lowLight ? '今日状态：世界低光运行，突出经典路径。' : '今日状态：世界保持柔和运行。',
    `今日动作：${scene.rituals.slice(0, 3).join(' / ')}`,
  ]

  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-soft backdrop-blur md:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.35em] text-moss">TODAY WORLD</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">今天的世界不是静态首页。</h2>
          <p className="mt-4 leading-8 text-ink/56">它会根据当前位置、季节、昼夜、低光状态和上次旅程，给出今日世界状态、可执行动作与下一步路径。</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {todays.map((item) => (
            <div key={item} className="rounded-[1.35rem] bg-sand/60 p-4 text-sm leading-6 text-ink/60">
              {item}
            </div>
          ))}
          {scene.next.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-[1.35rem] bg-ink px-4 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
