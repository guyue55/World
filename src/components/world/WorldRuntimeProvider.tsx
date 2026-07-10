'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { MotionConfig } from 'framer-motion'
import { RuntimeAtmosphere } from './RuntimeAtmosphere'
import { RuntimeSignalDock } from './RuntimeSignalDock'
import { RuntimeSoundscapeControl } from './RuntimeSoundscapeControl'
import {
  buildJourneyMemoryEntry,
  getClearedJourneyMemoryState,
  getJourneyStorageKeys,
  getReturningJourney,
  isJourneyMemoryEntry,
  mergeJourneyHistory,
  type JourneyMemoryEntry,
} from '@/lib/journey-memory'
import { clampSoundscapeVolume, getSensoryAudioRegistry } from '@/lib/sensory-audio'
import {
  buildWorldRuntimeState,
  type WorldMotionMode,
  type WorldRuntimeState,
  type WorldSceneState,
  type WorldSensoryMode,
  type WorldTransitionState,
} from '@/lib/world-runtime-state'

export type DayPeriod = 'dawn' | 'day' | 'dusk' | 'night'
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'
export type AiRuntimeStatus = 'enabled' | 'low-light' | 'disabled'
export type MotionPreference = 'system' | 'reduced' | 'off'
export type WorldSoundMode = 'muted' | 'enabled'

type WorldRuntime = {
  dayPeriod: DayPeriod
  season: Season
  aiStatus: AiRuntimeStatus
  currentScene: string
  sceneState: WorldSceneState
  transitionState: WorldTransitionState
  motionMode: WorldMotionMode
  sensoryMode: WorldSensoryMode
  sceneRuntime: WorldRuntimeState
  reducedMotion: boolean
  compactMotion: boolean
  motionPreference: MotionPreference
  soundMode: WorldSoundMode
  soundVolume: number
  currentJourney: JourneyMemoryEntry | null
  lastJourney: JourneyMemoryEntry | null
  journeyHistory: JourneyMemoryEntry[]
  visitedCount: number
  clearJourneyMemory: () => void
  setReducedMotion: (value: boolean) => void
  setMotionPreference: (value: MotionPreference) => void
  setSoundMode: (value: WorldSoundMode) => void
  setSoundVolume: (value: number) => void
}

const WorldRuntimeContext = createContext<WorldRuntime | null>(null)

const visitedKey = 'guyue-world:visited-count'
const journeyStorageKeys = getJourneyStorageKeys()
const sensoryAudioRegistry = getSensoryAudioRegistry()
const soundModeKey = sensoryAudioRegistry.runtime.storageKey
const soundVolumeKey = sensoryAudioRegistry.runtime.volumeStorageKey

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

function clearStoredJourneyMemory() {
  try {
    window.localStorage.removeItem(journeyStorageKeys.primaryKey)
    window.localStorage.removeItem(journeyStorageKeys.historyKey)
    window.localStorage.setItem(journeyStorageKeys.clearedAtKey, new Date().toISOString())
  } catch {
    // 清除失败不影响公开浏览；UI 状态仍按本轮操作立即收敛。
  }
}

function readVisitedCount() {
  try {
    return Number(window.localStorage.getItem(visitedKey) ?? '0')
  } catch {
    return 0
  }
}

function readSoundMode(): WorldSoundMode {
  try {
    return window.localStorage.getItem(soundModeKey) === 'enabled' ? 'enabled' : 'muted'
  } catch {
    return 'muted'
  }
}

function writeSoundMode(value: WorldSoundMode) {
  try {
    window.localStorage.setItem(soundModeKey, value)
  } catch {
    // 声音偏好只是本地体验增强；存储失败时保持默认静音。
  }
}

function readSoundVolume() {
  try {
    const raw = window.localStorage.getItem(soundVolumeKey)
    return clampSoundscapeVolume(raw ? Number(raw) : sensoryAudioRegistry.runtime.defaultVolume)
  } catch {
    return sensoryAudioRegistry.runtime.defaultVolume
  }
}

function writeSoundVolume(value: number) {
  try {
    window.localStorage.setItem(soundVolumeKey, String(clampSoundscapeVolume(value)))
  } catch {
    // 声音偏好只是本地体验增强；存储失败时保持默认音量。
  }
}

export function WorldRuntimeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [dayPeriod, setDayPeriod] = useState<DayPeriod>('day')
  const [season, setSeason] = useState<Season>('spring')
  const [aiStatus] = useState<AiRuntimeStatus>('low-light')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [compactMotion, setCompactMotion] = useState(false)
  const [motionPreference, setMotionPreference] = useState<MotionPreference>('system')
  const [soundMode, setSoundModeState] = useState<WorldSoundMode>('muted')
  const [soundVolume, setSoundVolumeState] = useState(sensoryAudioRegistry.runtime.defaultVolume)
  const [hydrated, setHydrated] = useState(false)
  const [currentJourney, setCurrentJourney] = useState<JourneyMemoryEntry | null>(null)
  const [lastJourney, setLastJourney] = useState<JourneyMemoryEntry | null>(null)
  const [journeyHistory, setJourneyHistory] = useState<JourneyMemoryEntry[]>([])
  const [visitedCount, setVisitedCount] = useState(0)

  useEffect(() => {
    setHydrated(true)
    const now = new Date()
    setDayPeriod(getDayPeriod(now.getHours()))
    setSeason(getSeason(now.getMonth()))
    setLastJourney(readJourneyMemory())
    setJourneyHistory(readJourneyHistory())
    setSoundModeState(readSoundMode())
    setSoundVolumeState(readSoundVolume())

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
      : getReturningJourney(nextHistory, nextJourney.path)

    writeJourneyMemory(nextJourney)
    writeJourneyHistory(nextHistory)
    setCurrentJourney(nextJourney)
    setLastJourney(previousDifferentJourney)
    setJourneyHistory(nextHistory)
  }, [pathname])

  const sceneRuntime = useMemo(
    () => buildWorldRuntimeState({
      pathname: pathname ?? '/',
      previousPathname: lastJourney?.path ?? null,
      visitedCount,
      hydrated,
      reducedMotion,
      compactMotion,
      motionOff: motionPreference === 'off',
      aiStatus,
      networkMode: 'local',
    }),
    [aiStatus, compactMotion, hydrated, lastJourney?.path, motionPreference, pathname, reducedMotion, visitedCount]
  )

  function setSoundMode(value: WorldSoundMode) {
    setSoundModeState(value)
    writeSoundMode(value)
  }

  function setSoundVolume(value: number) {
    const nextValue = clampSoundscapeVolume(value)
    setSoundVolumeState(nextValue)
    writeSoundVolume(nextValue)
  }

  function clearJourneyMemory() {
    clearStoredJourneyMemory()
    const clearedState = getClearedJourneyMemoryState(new Date().toISOString())
    setLastJourney(clearedState.lastJourney)
    setJourneyHistory(clearedState.journeyHistory)
  }

  const value = useMemo<WorldRuntime>(() => ({
    dayPeriod,
    season,
    aiStatus,
    currentScene: sceneRuntime.scene.id,
    sceneState: sceneRuntime.sceneState,
    transitionState: sceneRuntime.transitionState,
    motionMode: sceneRuntime.motionMode,
    sensoryMode: sceneRuntime.sensoryMode,
    sceneRuntime,
    reducedMotion,
    compactMotion,
    motionPreference,
    soundMode,
    soundVolume,
    currentJourney,
    lastJourney,
    journeyHistory,
    visitedCount,
    clearJourneyMemory,
    setReducedMotion,
    setMotionPreference,
    setSoundMode,
    setSoundVolume,
  }), [aiStatus, compactMotion, currentJourney, dayPeriod, journeyHistory, lastJourney, motionPreference, reducedMotion, sceneRuntime, season, soundMode, soundVolume, visitedCount])

  return (
    <WorldRuntimeContext.Provider value={value}>
      <MotionConfig reducedMotion={sceneRuntime.motionMode !== 'full' ? 'always' : 'user'}>
        <RuntimeAtmosphere />
        {children}
        <RuntimeSoundscapeControl />
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
