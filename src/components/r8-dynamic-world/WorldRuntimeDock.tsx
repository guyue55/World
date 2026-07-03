'use client'

import Link from 'next/link'
import { Moon, Sparkles, SunMedium } from 'lucide-react'
import { useWorldRuntime } from './WorldRuntimeProvider'

const dayPeriodLabels = {
  dawn: '清晨',
  day: '白日',
  dusk: '黄昏',
  night: '深夜',
}

const seasonLabels = {
  spring: '春｜萌发',
  summer: '夏｜生长',
  autumn: '秋｜沉淀',
  winter: '冬｜静读',
}

export function WorldRuntimeDock() {
  const { dayPeriod, lastJourney, lowLight, reducedMotion, season, setReducedMotion } = useWorldRuntime()
  const Icon = dayPeriod === 'night' ? Moon : SunMedium

  return (
    <aside className="fixed bottom-24 right-4 z-40 hidden w-[21rem] rounded-[1.5rem] border border-white/70 bg-white/75 p-4 text-sm text-ink/70 shadow-soft backdrop-blur-xl lg:block">
      <div className="flex items-start gap-3">
        <span className="rounded-2xl bg-ink p-2 text-white"><Icon className="h-4 w-4" /></span>
        <div>
          <p className="font-semibold text-ink">今日世界 · {dayPeriodLabels[dayPeriod]}</p>
          <p className="mt-1 text-xs leading-5 text-ink/55">{seasonLabels[season]} · {lowLight ? '低光运行' : '稳定呼吸'}</p>
        </div>
      </div>
      {lastJourney ? (
        <Link href={lastJourney.path} className="mt-4 block rounded-2xl bg-ink/5 p-3 transition hover:bg-ink/10">
          <span className="flex items-center gap-2 font-medium text-ink"><Sparkles className="h-4 w-4" />继续上次旅程</span>
          <span className="mt-1 block text-xs text-ink/55">你上次停在：{lastJourney.label}</span>
        </Link>
      ) : (
        <p className="mt-4 rounded-2xl bg-ink/5 p-3 text-xs leading-5 text-ink/55">世界还没有记录你的旅程。先打开地图，或沿时间河前行。</p>
      )}
      <button
        type="button"
        className="mt-3 w-full rounded-2xl border border-ink/10 px-3 py-2 text-xs font-semibold text-ink/65 transition hover:bg-white"
        onClick={() => setReducedMotion(!reducedMotion)}
      >
        {reducedMotion ? '恢复轻动效' : '降低动效'}
      </button>
    </aside>
  )
}
