'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { MotionConfig } from 'framer-motion'
import { RuntimeAtmosphere } from './RuntimeAtmosphere'
import { RuntimeSignalDock } from './RuntimeSignalDock'

export type DayPeriod = 'dawn' | 'day' | 'dusk' | 'night'
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

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
      <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
        <RuntimeAtmosphere />
        {children}
        <RuntimeSignalDock />
      </MotionConfig>
    </WorldRuntimeContext.Provider>
  )
}

export function useWorldRuntime() {
  const runtime = useContext(WorldRuntimeContext)
  if (!runtime) throw new Error('useWorldRuntime must be used inside WorldRuntimeProvider')
  return runtime
}
