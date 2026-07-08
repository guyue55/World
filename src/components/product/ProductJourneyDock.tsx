'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type WorldMode = 'world' | 'archive' | 'quiet'

type JourneyState = {
  lastPath: string
  lastTitle: string
  visits: number
  updatedAt: string
  mode: WorldMode
}

const STORAGE_KEY = 'guyue-worldos-journey-v1'
const HISTORY_KEY = 'guyue-worldos-history-v1'
const MAX_HISTORY = 5

type HistoryEntry = {
  path: string
  label: string
  visitedAt: string
}

const routeLabels: Array<{ prefix: string, label: string }> = [
  { prefix: '/atlas', label: '世界地图' },
  { prefix: '/timeline', label: '时间流' },
  { prefix: '/archive', label: '档案馆' },
  { prefix: '/ask', label: 'AI 灯塔' },
  { prefix: '/manifesto', label: '世界宪章' },
  { prefix: '/paths', label: '精选路径' },
  { prefix: '/node/', label: '节点阅读' },
]

const modeLabels: Record<WorldMode, string> = {
  world: '世界',
  archive: '现实',
  quiet: '静读',
}

function getRouteLabel(pathname: string) {
  if (pathname === '/') return '世界入口'
  return routeLabels.find((item) => pathname.startsWith(item.prefix))?.label ?? '世界漫游'
}

function readJourney(): JourneyState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as JourneyState
    if (!parsed.lastPath || !parsed.mode) return null
    return parsed
  } catch {
    return null
  }
}

function writeJourney(state: JourneyState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // 本地旅程只是体验增强，写入失败不影响世界浏览。
  }
}

function readHistory(): HistoryEntry[] {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as HistoryEntry[]
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HISTORY) : []
  } catch {
    return []
  }
}

function writeHistory(entries: HistoryEntry[]) {
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_HISTORY)))
  } catch {
    // 历史记录只是体验增强，写入失败不影响世界浏览。
  }
}

function pushHistory(pathname: string, label: string) {
  const existing = readHistory()
  const filtered = existing.filter((e) => e.path !== pathname)
  filtered.unshift({ path: pathname, label, visitedAt: new Date().toISOString() })
  writeHistory(filtered)
  return filtered
}

export function ProductJourneyDock() {
  const pathname = usePathname()
  const [journey, setJourney] = useState<JourneyState | null>(null)
  const [mode, setMode] = useState<WorldMode>('world')
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    const existing = readJourney()
    const nextMode = existing?.mode ?? 'world'
    const label = getRouteLabel(pathname)
    setHistory(pushHistory(pathname, label))
    const nextState: JourneyState = {
      lastPath: pathname,
      lastTitle: label,
      visits: (existing?.visits ?? 0) + 1,
      updatedAt: new Date().toISOString(),
      mode: nextMode,
    }

    writeJourney(nextState)
    setJourney(existing)
    setMode(nextMode)
  }, [pathname])

  useEffect(() => {
    document.documentElement.dataset.worldMode = mode
    const existing = readJourney()
    if (existing) writeJourney({ ...existing, mode })
  }, [mode])

  const previous = useMemo(() => {
    if (!journey || journey.lastPath === pathname) return null
    return journey
  }, [journey, pathname])

  return (
    <aside
      aria-label="世界旅程与模式"
      className="fixed bottom-6 right-6 z-30 hidden max-w-[300px] rounded-[1.5rem] border border-white/70 bg-paper/88 p-4 text-sm shadow-soft backdrop-blur-xl 2xl:block"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-moss">旅程</p>
          <p className="mt-2 leading-6 text-ink/68">
            {previous ? `上次停在「${previous.lastTitle}」` : '当前位置已被轻轻记录。'}
          </p>
        </div>
        {previous && (
          <Link href={previous.lastPath} className="shrink-0 rounded-full bg-ink px-3 py-2 text-xs font-semibold text-paper transition hover:bg-night">
            继续
          </Link>
        )}
     </div>

      {history.length > 1 && (
        <div className="mt-3 border-t border-ink/8 pt-3">
          <p className="text-xs font-semibold tracking-[0.28em] text-moss/60">最近</p>
          <ul className="mt-2 space-y-1">
            {history.slice(1, 4).map((entry) => (
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

      <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="切换世界模式">
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
  )
}
