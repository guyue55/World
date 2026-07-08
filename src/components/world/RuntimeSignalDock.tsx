'use client'

// 世界运行时状态坞：抽离自 WorldRuntimeProvider 的桌面 HUD 组件。
import Link from 'next/link'
import { Activity, Map, Waves } from 'lucide-react'
import { useWorldRuntime, type DayPeriod, type Season } from './WorldRuntimeProvider'

const dayPeriodLabels: Record<DayPeriod, string> = {
  dawn: '清晨',
  day: '白日',
  dusk: '黄昏',
  night: '深夜',
}

const seasonLabels: Record<Season, string> = {
  spring: '春｜萌发',
  summer: '夏｜生长',
  autumn: '秋｜沉淀',
  winter: '冬｜静读',
}

export function RuntimeSignalDock() {
  const runtime = useWorldRuntime()

  return (
    <aside className="fixed bottom-6 left-6 z-30 hidden w-[18rem] rounded-[1.25rem] border border-white/70 bg-white/72 p-4 text-sm text-ink/68 shadow-soft backdrop-blur-xl 2xl:block">
      <div className="flex items-start gap-3">
        <span className="rounded-[0.85rem] bg-ink p-2 text-paper"><Activity className="h-4 w-4" /></span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">世界运行中 · {dayPeriodLabels[runtime.dayPeriod]}</p>
          <p className="mt-1 truncate text-xs text-ink/52">{seasonLabels[runtime.season]} · 第 {runtime.visitedCount} 次进入</p>
        </div>
      </div>
      {runtime.lastJourney ? (
        <Link href={runtime.lastJourney.path} className="mt-4 flex min-w-0 items-center gap-3 rounded-[1rem] bg-ink/5 p-3 transition hover:bg-ink/10">
          <Map className="h-4 w-4 shrink-0 text-moss" />
          <span className="min-w-0">
            <span className="block truncate font-medium text-ink">继续上次旅程</span>
            <span className="mt-1 block truncate text-xs text-ink/50">{runtime.lastJourney.label}</span>
          </span>
        </Link>
      ) : (
        <p className="mt-4 rounded-[1rem] bg-ink/5 p-3 text-xs leading-5 text-ink/55">地图、时间流和档案馆已经接入运行时，先沿一条路径走一圈。</p>
      )}
      <button
        type="button"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-[1rem] border border-ink/10 px-3 py-2 text-xs font-semibold text-ink/65 transition hover:bg-white active:scale-[0.99]"
        onClick={() => runtime.setReducedMotion(!runtime.reducedMotion)}
      >
        <Waves className="h-3.5 w-3.5" />
        {runtime.reducedMotion ? '恢复轻动效' : '降低动效'}
      </button>
    </aside>
  )
}
