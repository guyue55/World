'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { MotionConfig } from 'framer-motion'
import { RuntimeAtmosphere } from './RuntimeAtmosphere'
import { RuntimeSignalDock } from './RuntimeSignalDock'
import {
  buildJourneyMemoryEntry,
  getJourneyStorageKeys,
  isJourneyMemoryEntry,
  mergeJourneyHistory,
  type JourneyMemoryEntry,
} from '@/lib/journey-memory'

export type DayPeriod = 'dawn' | 'day' | 'dusk' | 'night'
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

type WorldRuntime = {
  dayPeriod: DayPeriod
  season: Season
  reducedMotion: boolean
  compactMotion: boolean
  currentJourney: JourneyMemoryEntry | null
  lastJourney: JourneyMemoryEntry | null
  journeyHistory: JourneyMemoryEntry[]
  visitedCount: number
  setReducedMotion: (value: boolean) => void
}

const WorldRuntimeContext = createContext<WorldRuntime | null>(null)

const visitedKey = 'guyue-world:visited-count'
const journeyStorageKeys = getJourneyStorageKeys()

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

function readJourneyMemory(): JourneyMemoryEntry | null {
  try {
    const raw = window.localStorage.getItem(journeyStorageKeys.primaryKey)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    return isJourneyMemoryEntry(parsed) ? parsed : null
  } catch {
    return null
  }
}

function writeJourneyMemory(entry: JourneyMemoryEntry) {
  try {
    window.localStorage.setItem(journeyStorageKeys.primaryKey, JSON.stringify(entry))
  } catch {
    // Journey Memory is an experience enhancement; browsing must keep working without storage.
  }
}

function readJourneyHistory(): JourneyMemoryEntry[] {
  try {
    const raw = window.localStorage.getItem(journeyStorageKeys.historyKey)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isJourneyMemoryEntry)
  } catch {
    return []
  }
}

function writeJourneyHistory(history: JourneyMemoryEntry[]) {
  try {
    window.localStorage.setItem(journeyStorageKeys.historyKey, JSON.stringify(history))
  } catch {
    // Journey Memory is an experience enhancement; browsing must keep working without storage.
  }
}

function readVisitedCount() {
  try {
    return Number(window.localStorage.getItem(visitedKey) ?? '0')
  } catch {
    return 0
  }
}

export function WorldRuntimeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [dayPeriod, setDayPeriod] = useState<DayPeriod>('day')
  const [season, setSeason] = useState<Season>('spring')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [compactMotion, setCompactMotion] = useState(false)
  const [currentJourney, setCurrentJourney] = useState<JourneyMemoryEntry | null>(null)
  const [lastJourney, setLastJourney] = useState<JourneyMemoryEntry | null>(null)
  const [journeyHistory, setJourneyHistory] = useState<JourneyMemoryEntry[]>([])
  const [visitedCount, setVisitedCount] = useState(0)

  useEffect(() => {
    const now = new Date()
    setDayPeriod(getDayPeriod(now.getHours()))
    setSeason(getSeason(now.getMonth()))
    setLastJourney(readJourneyMemory())
    setJourneyHistory(readJourneyHistory())

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
    if (!pathname) return
    const nextJourney = buildJourneyMemoryEntry(pathname, new Date().toISOString())
    const previousJourney = readJourneyMemory()
    const nextHistory = mergeJourneyHistory(readJourneyHistory(), nextJourney)
    const previousDifferentJourney = previousJourney?.path !== nextJourney.path
      ? previousJourney
      : nextHistory.find((entry) => entry.path !== nextJourney.path) ?? null

    writeJourneyMemory(nextJourney)
    writeJourneyHistory(nextHistory)
    setCurrentJourney(nextJourney)
    setLastJourney(previousDifferentJourney)
    setJourneyHistory(nextHistory)
  }, [pathname])

  const value = useMemo<WorldRuntime>(() => ({
    dayPeriod,
    season,
    reducedMotion,
    compactMotion,
    currentJourney,
    lastJourney,
    journeyHistory,
    visitedCount,
    setReducedMotion,
  }), [compactMotion, currentJourney, dayPeriod, journeyHistory, lastJourney, reducedMotion, season, visitedCount])

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
