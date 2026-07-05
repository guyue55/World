'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Activity, Map, Waves } from 'lucide-react'

type DayPeriod = 'dawn' | 'day' | 'dusk' | 'night'
type Season = 'spring' | 'summer' | 'autumn' | 'winter'

type LastJourney = {
  path: string
  label: string
  visitedAt: string
}

type WorldRuntime = {
  dayPeriod: DayPeriod
  season: Season
  reducedMotion: boolean
  compactMotion: boolean
  lastJourney: LastJourney | null
  visitedCount: number
  setReducedMotion: (value: boolean) => void
}

const WorldRuntimeContext = createContext<WorldRuntime | null>(null)

const lastJourneyKey = 'guyue-world:last-journey'
const visitedKey = 'guyue-world:visited-count'

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

const projectionLines = [
  { id: 'atlas', left: '7%', top: '18%', width: '38vw', rotate: '-10deg', delay: 0 },
  { id: 'timeline', left: '52%', top: '23%', width: '34vw', rotate: '16deg', delay: 0.8 },
  { id: 'archive', left: '12%', top: '68%', width: '30vw', rotate: '9deg', delay: 1.4 },
  { id: 'path', left: '46%', top: '73%', width: '42vw', rotate: '-13deg', delay: 0.4 },
]

const runtimeNodes = [
  { id: '入口', left: '14%', top: '23%', delay: 0 },
  { id: '地图', left: '39%', top: '17%', delay: 0.6 },
  { id: '时间', left: '69%', top: '29%', delay: 1.1 },
  { id: '档案', left: '25%', top: '72%', delay: 1.7 },
  { id: '灯塔', left: '78%', top: '68%', delay: 2.2 },
]

function getDayPeriod(hour: number): DayPeriod {
  if (hour >= 5 && hour < 9) return 'dawn'
  if (hour >= 9 && hour < 17) return 'day'
  if (hour >= 17 && hour < 21) return 'dusk'
  return 'night'
}

function getSeason(month: number): Season {
  if ([2, 3, 4].includes(month)) return 'spring'
  if ([5, 6, 7].includes(month)) return 'summer'
  if ([8, 9, 10].includes(month)) return 'autumn'
  return 'winter'
}

function readLastJourney(): LastJourney | null {
  try {
    const raw = window.localStorage.getItem(lastJourneyKey)
    if (!raw) return null
    const parsed = JSON.parse(raw) as LastJourney
    if (!parsed.path || !parsed.label || !parsed.visitedAt) return null
    return parsed
  } catch {
    return null
  }
}

function readVisitedCount() {
  try {
    return Number(window.localStorage.getItem(visitedKey) ?? '0')
  } catch {
    return 0
  }
}

function labelFromPath(pathname: string) {
  if (pathname === '/') return '世界入口'
  return pathname.split('/').filter(Boolean).join(' / ') || '世界入口'
}

function RuntimeAtmosphere() {
  const runtime = useWorldRuntime()
  const shouldMove = !runtime.reducedMotion && !runtime.compactMotion
  const activeProjectionLines = runtime.compactMotion ? projectionLines.slice(0, 2) : projectionLines
  const activeRuntimeNodes = runtime.compactMotion ? runtimeNodes.slice(0, 3) : runtimeNodes

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(247,241,230,0.72),rgba(216,226,208,0.38)_46%,rgba(125,154,162,0.20))]" />
      <motion.div
        className="absolute left-1/2 top-[8%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-ink/8"
        animate={shouldMove ? { rotate: 360, scale: [1, 1.025, 1] } : undefined}
        transition={{ rotate: { duration: 80, repeat: Infinity, ease: 'linear' }, scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' } }}
      />
      <motion.div
        className="absolute left-1/2 top-[13%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-lake/20"
        animate={shouldMove ? { rotate: -360 } : undefined}
        transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(37,48,42,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(37,48,42,0.14)_1px,transparent_1px)] [background-size:88px_88px]" />
      {activeProjectionLines.map((line) => (
        <motion.span
          key={line.id}
          className="absolute h-px origin-left bg-gradient-to-r from-transparent via-ink/20 to-transparent"
          style={{ left: line.left, top: line.top, width: line.width, rotate: line.rotate }}
          animate={shouldMove ? { opacity: [0.18, 0.72, 0.18], x: [0, 18, 0] } : undefined}
          transition={{ duration: 8, delay: line.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {activeRuntimeNodes.map((node) => (
        <motion.span
          key={node.id}
          className="absolute flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/65 bg-paper/35 text-[10px] font-semibold text-ink/46 shadow-[0_16px_40px_rgba(37,48,42,0.08)] backdrop-blur-md"
          style={{ left: node.left, top: node.top }}
          animate={shouldMove ? { opacity: [0.42, 0.88, 0.42], y: [0, -10, 0] } : undefined}
          transition={{ duration: 7, delay: node.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {node.id}
        </motion.span>
      ))}
      <motion.div
        className="absolute bottom-[8%] left-[-12%] h-28 w-[130%] border-y border-white/45 bg-white/12 backdrop-blur-[2px]"
        animate={shouldMove ? { x: ['-4%', '4%', '-4%'] } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: 'rotate(-4deg)' }}
      />
    </div>
  )
}

function RuntimeSignalDock() {
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

export function WorldRuntimeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [dayPeriod, setDayPeriod] = useState<DayPeriod>('day')
  const [season, setSeason] = useState<Season>('spring')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [compactMotion, setCompactMotion] = useState(false)
  const [lastJourney, setLastJourney] = useState<LastJourney | null>(null)
  const [visitedCount, setVisitedCount] = useState(0)

  useEffect(() => {
    const now = new Date()
    setDayPeriod(getDayPeriod(now.getHours()))
    setSeason(getSeason(now.getMonth()))
    setLastJourney(readLastJourney())

    const nextVisitedCount = readVisitedCount() + 1
    setVisitedCount(nextVisitedCount)
    try {
      window.localStorage.setItem(visitedKey, String(nextVisitedCount))
    } catch {
      // localStorage can be unavailable in strict privacy modes.
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const onChange = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', onChange)

    const compactQuery = window.matchMedia('(max-width: 767px)')
    setCompactMotion(compactQuery.matches)
    const onCompactChange = () => setCompactMotion(compactQuery.matches)
    compactQuery.addEventListener('change', onCompactChange)

    return () => {
      mediaQuery.removeEventListener('change', onChange)
      compactQuery.removeEventListener('change', onCompactChange)
    }
  }, [])

  useEffect(() => {
    if (!pathname || pathname === '/') return
    const nextJourney = { path: pathname, label: labelFromPath(pathname), visitedAt: new Date().toISOString() }
    setLastJourney(nextJourney)
    try {
      window.localStorage.setItem(lastJourneyKey, JSON.stringify(nextJourney))
    } catch {
      // localStorage can be unavailable in strict privacy modes.
    }
  }, [pathname])

  const value = useMemo<WorldRuntime>(() => ({
    dayPeriod,
    season,
    reducedMotion,
    compactMotion,
    lastJourney,
    visitedCount,
    setReducedMotion,
  }), [compactMotion, dayPeriod, lastJourney, reducedMotion, season, visitedCount])

  return (
    <WorldRuntimeContext.Provider value={value}>
      <RuntimeAtmosphere />
      {children}
      <RuntimeSignalDock />
    </WorldRuntimeContext.Provider>
  )
}

export function useWorldRuntime() {
  const runtime = useContext(WorldRuntimeContext)
  if (!runtime) throw new Error('useWorldRuntime must be used inside WorldRuntimeProvider')
  return runtime
}
