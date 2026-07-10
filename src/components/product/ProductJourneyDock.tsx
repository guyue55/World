'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useWorldRuntime } from '@/components/world/WorldRuntimeProvider'

type WorldMode = 'world' | 'archive' | 'quiet'

const modeLabels: Record<WorldMode, string> = {
  world: '世界',
  archive: '现实',
  quiet: '静读',
}

function JourneyCard({ compact = false }: { compact?: boolean }) {
  const runtime = useWorldRuntime()
  const recentItems = useMemo(
    () => runtime.journeyHistory.filter((entry) => entry.path !== runtime.currentJourney?.path).slice(0, compact ? 2 : 3),
    [compact, runtime.currentJourney?.path, runtime.journeyHistory]
  )
  const hasJourneyMemory = runtime.journeyHistory.length > 0 || Boolean(runtime.lastJourney)

  return (
    <div data-testid="journey-memory-entry" className="rounded-[1.35rem] border border-white/70 bg-paper/88 p-4 text-sm shadow-soft backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.28em] text-moss">旅程</p>
          <p className="mt-2 break-words leading-6 text-ink/68">
            {runtime.lastJourney ? `上次停在「${runtime.lastJourney.label}」` : '当前位置已被轻轻记录。'}
          </p>
          {runtime.currentJourney && (
            <p className="mt-1 truncate text-xs text-ink/46">当前：{runtime.currentJourney.sceneTitle}</p>
          )}
        </div>
        {hasJourneyMemory && (
          <div className="flex shrink-0 flex-col gap-2">
            {runtime.lastJourney && (
              <Link href={runtime.lastJourney.path} className="rounded-full bg-ink px-3 py-2 text-center text-xs font-semibold text-paper transition hover:bg-night">
                继续
              </Link>
            )}
            <button
              type="button"
              onClick={runtime.clearJourneyMemory}
              className="rounded-full border border-ink/10 bg-white/70 px-3 py-2 text-xs font-semibold text-ink/58 transition hover:bg-white hover:text-ink"
            >
              清除
            </button>
          </div>
        )}
      </div>

      {recentItems.length > 0 && (
        <div className="mt-3 border-t border-ink/8 pt-3">
          <p className="text-xs font-semibold tracking-[0.28em] text-moss/60">最近</p>
          <ul className="mt-2 space-y-1">
            {recentItems.map((entry) => (
              <li key={entry.path}>
                <Link
                  href={entry.path}
                  className="block truncate rounded px-2 py-1 text-xs text-ink/56 transition hover:bg-white/60 hover:text-ink"
                >
                  {entry.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function ProductJourneyDock() {
  const [mode, setMode] = useState<WorldMode>('world')

  useEffect(() => {
    document.documentElement.dataset.worldMode = mode
  }, [mode])

  return (
    <>
      <section className="world-container mt-10 2xl:hidden" aria-label="移动旅程入口">
        <JourneyCard compact />
      </section>

      <aside
        aria-label="世界旅程与模式"
        className="fixed bottom-6 right-6 z-30 hidden max-w-[300px] 2xl:block"
      >
        <JourneyCard />
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-[1.35rem] border border-white/70 bg-paper/88 p-3 shadow-soft backdrop-blur-xl" role="group" aria-label="切换世界模式">
          {(['world', 'archive', 'quiet'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                mode === item
                  ? 'bg-ink text-paper'
                  : 'bg-white/60 text-ink/62 hover:bg-white hover:text-ink'
              }`}
              aria-pressed={mode === item}
            >
              {modeLabels[item]}
            </button>
          ))}
        </div>
      </aside>
    </>
  )
}
