'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'

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
  lowLight: boolean
  reducedMotion: boolean
  lastJourney: LastJourney | null
  visitedCount: number
  setReducedMotion: (value: boolean) => void
  markJourney: (path: string, label: string) => void
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

export function WorldRuntimeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [dayPeriod, setDayPeriod] = useState<DayPeriod>('day')
  const [season, setSeason] = useState<Season>('spring')
  const [reducedMotion, setReducedMotionState] = useState(false)
  const [lastJourney, setLastJourney] = useState<LastJourney | null>(null)
  const [visitedCount, setVisitedCount] = useState(0)

  useEffect(() => {
    const now = new Date()
    setDayPeriod(getDayPeriod(now.getHours()))
    setSeason(getSeason(now.getMonth()))
    setLastJourney(readLastJourney())
    const currentVisitedCount = readVisitedCount() + 1
    setVisitedCount(currentVisitedCount)
    try {
      window.localStorage.setItem(visitedKey, String(currentVisitedCount))
    } catch {
      // localStorage can be unavailable in strict privacy modes.
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotionState(mediaQuery.matches)
    const onChange = () => setReducedMotionState(mediaQuery.matches)
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!pathname || pathname === '/') return
    const label = pathname.split('/').filter(Boolean).join(' / ') || '世界入口'
    const nextJourney = { path: pathname, label, visitedAt: new Date().toISOString() }
    setLastJourney(nextJourney)
    try {
      window.localStorage.setItem(lastJourneyKey, JSON.stringify(nextJourney))
    } catch {
      // localStorage can be unavailable in strict privacy modes.
    }
  }, [pathname])

  const value = useMemo<WorldRuntime>(() => {
    const lowLight = dayPeriod === 'night' || visitedCount === 0
    return {
      dayPeriod,
      season,
      lowLight,
      reducedMotion,
      lastJourney,
      visitedCount,
      setReducedMotion: setReducedMotionState,
      markJourney: (path: string, label: string) => {
        const nextJourney = { path, label, visitedAt: new Date().toISOString() }
        setLastJourney(nextJourney)
        try {
          window.localStorage.setItem(lastJourneyKey, JSON.stringify(nextJourney))
        } catch {
          // localStorage can be unavailable in strict privacy modes.
        }
      },
    }
  }, [dayPeriod, lastJourney, reducedMotion, season, visitedCount])

  return <WorldRuntimeContext.Provider value={value}>{children}</WorldRuntimeContext.Provider>
}

export function useWorldRuntime() {
  const runtime = useContext(WorldRuntimeContext)
  if (!runtime) {
    throw new Error('useWorldRuntime must be used inside WorldRuntimeProvider')
  }
  return runtime
}
