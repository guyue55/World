'use client'

import { useWorldRuntime } from '@/components/_legacy/r8-dynamic-world'

const periodText = {
  dawn: '清晨：适合种下一颗新想法',
  day: '白日：适合推进项目与公开探索',
  dusk: '黄昏：适合回望时间河',
  night: '深夜：适合静读与归档',
}

export function WorldPulseRibbon() {
  const { dayPeriod, lastJourney, lowLight, season, visitedCount } = useWorldRuntime()
  return (
    <div className="fixed left-1/2 top-3 z-40 hidden -translate-x-1/2 rounded-full border border-white/70 bg-white/76 px-4 py-2 text-xs font-semibold text-ink/60 shadow-soft backdrop-blur-xl xl:block">
      {periodText[dayPeriod]} · {season} · 第 {visitedCount} 次观测{lowLight ? ' · 低光运行' : ''}{lastJourney ? ` · 上次停在 ${lastJourney.label}` : ''}
    </div>
  )
}
