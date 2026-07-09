'use client'

// 世界运行时状态坞：抽离自 WorldRuntimeProvider 的桌面 HUD 组件。
import Link from 'next/link'
import { Activity, BookOpen, Map, Route, Waves } from 'lucide-react'
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
  const recentNode = runtime.journeyHistory.find((entry) => entry.recentNodeSlug)
  const recentPath = runtime.journeyHistory.find((entry) => entry.recentPathId)

  return (
    <aside className="fixed bottom-6 left-6 z-30 hidden w-[18rem] rounded-[1.25rem] border border-white/70 bg-white/72 p-4 text-sm text-ink/68 shadow-soft backdrop-blur-xl 2xl:block">
      <div className="flex items-start gap-3">
        <span className="rounded-[0.85rem] bg-ink p-2 text-paper"><Activity className="h-4 w-4" /></span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">世界运行中 · {dayPeriodLabels[runtime.dayPeriod]}</p>
          <p className="mt-1 truncate text-xs text-ink/52">{seasonLabels[runtime.season]} · 第 {runtime.visitedCount} 次进入</p>
        </div>
      </div>
      {runtime.currentJourney && (
        <p className="mt-3 rounded-[1rem] bg-ink/5 p-3 text-xs leading-5 text-ink/55">
          当前场景：{runtime.currentJourney.sceneTitle}
        </p>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink/55">
        <p className="rounded-[0.85rem] bg-white/55 px-3 py-2">
          状态：<span className="font-semibold text-ink/70">{runtime.sceneState}</span>
        </p>
        <p className="rounded-[0.85rem] bg-white/55 px-3 py-2">
          动效：<span className="font-semibold text-ink/70">{runtime.motionMode}</span>
        </p>
        <p className="rounded-[0.85rem] bg-white/55 px-3 py-2">
          感官：<span className="font-semibold text-ink/70">{runtime.sensoryMode}</span>
        </p>
        <p className="rounded-[0.85rem] bg-white/55 px-3 py-2">
          边界：<span className="font-semibold text-ink/70">{runtime.sceneRuntime.permissionMode}</span>
        </p>
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
      {(recentPath || recentNode) && (
        <div className="mt-3 grid gap-2">
          {recentPath && (
            <Link href={recentPath.path} className="flex min-w-0 items-center gap-2 rounded-[0.9rem] bg-white/55 px-3 py-2 text-xs font-semibold text-ink/58 transition hover:bg-white">
              <Route className="h-3.5 w-3.5 shrink-0 text-moss" />
              <span className="truncate">最近路径：{recentPath.label}</span>
            </Link>
          )}
          {recentNode && (
            <Link href={recentNode.path} className="flex min-w-0 items-center gap-2 rounded-[0.9rem] bg-white/55 px-3 py-2 text-xs font-semibold text-ink/58 transition hover:bg-white">
              <BookOpen className="h-3.5 w-3.5 shrink-0 text-moss" />
              <span className="truncate">最近节点：{recentNode.label}</span>
            </Link>
          )}
        </div>
      )}
      <button
        type="button"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-[1rem] border border-ink/10 px-3 py-2 text-xs font-semibold text-ink/65 transition hover:bg-white active:scale-[0.99]"
        onClick={() => runtime.setReducedMotion(!runtime.reducedMotion)}
      >
        <Waves className="h-3.5 w-3.5" />
        {runtime.reducedMotion ? '恢复轻动效' : '降低动效'}
      </button>
      <div className="mt-3 flex gap-2 text-xs font-semibold text-ink/55">
        <Link href={runtime.sceneRuntime.navigation.homeHref} className="flex-1 rounded-[0.85rem] bg-white/55 px-3 py-2 text-center transition hover:bg-white">
          Home
        </Link>
        <Link href={runtime.sceneRuntime.navigation.atlasHref} className="flex-1 rounded-[0.85rem] bg-white/55 px-3 py-2 text-center transition hover:bg-white">
          Atlas
        </Link>
      </div>
    </aside>
  )
}
