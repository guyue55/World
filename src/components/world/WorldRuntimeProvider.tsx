'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { MotionConfig } from 'framer-motion'
import { RuntimeAtmosphere } from './RuntimeAtmosphere'
import { RuntimeSoundscapeControl } from './RuntimeSoundscapeControl'
import {
  buildJourneyMemoryEntry,
  getClearedJourneyMemoryState,
  getReturningJourney,
  mergeJourneyHistory,
  type JourneyMemoryEntry,
} from '@/lib/journey-memory'
import { clampSoundscapeVolume, getSensoryAudioRegistry } from '@/lib/sensory-audio'
import { getDayPeriod, getSeason, type DayPeriod, type Season } from '@/lib/runtime/time-context'
import {
  clearStoredJourneyMemory,
  readJourneyHistory,
  readJourneyMemory,
  readVisitedCount,
  writeJourneyHistory,
  writeJourneyMemory,
  writeVisitedCount,
} from '@/lib/runtime/journey-storage'
import {
  readSoundMode,
  readSoundVolume,
  writeSoundMode,
  writeSoundVolume,
} from '@/lib/runtime/sensory-preference'
import {
  buildWorldRuntimeState,
  type WorldMotionMode,
  type WorldRuntimeState,
  type WorldSceneState,
  type WorldSensoryMode,
  type WorldTransitionState,
} from '@/lib/world-runtime-state'

export type { DayPeriod, Season } from '@/lib/runtime/time-context'
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
  hydrated: boolean
  clearJourneyMemory: () => void
  setReducedMotion: (value: boolean) => void
  setMotionPreference: (value: MotionPreference) => void
  setSoundMode: (value: WorldSoundMode) => void
  setSoundVolume: (value: number) => void
}

const WorldRuntimeContext = createContext<WorldRuntime | null>(null)

const sensoryAudioRegistry = getSensoryAudioRegistry()
const soundModeKey = sensoryAudioRegistry.runtime.storageKey
const soundVolumeKey = sensoryAudioRegistry.runtime.volumeStorageKey

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
    setSoundModeState(readSoundMode(soundModeKey))
    setSoundVolumeState(readSoundVolume(soundVolumeKey, sensoryAudioRegistry.runtime.defaultVolume))

    const nextVisitedCount = readVisitedCount() + 1
    setVisitedCount(nextVisitedCount)
    writeVisitedCount(nextVisitedCount)

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
    writeSoundMode(soundModeKey, value)
  }

  function setSoundVolume(value: number) {
    const nextValue = clampSoundscapeVolume(value)
    setSoundVolumeState(nextValue)
    writeSoundVolume(soundVolumeKey, nextValue)
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
    hydrated,
    clearJourneyMemory,
    setReducedMotion,
    setMotionPreference,
    setSoundMode,
    setSoundVolume,
  }), [aiStatus, compactMotion, currentJourney, dayPeriod, hydrated, journeyHistory, lastJourney, motionPreference, reducedMotion, sceneRuntime, season, soundMode, soundVolume, visitedCount])

  return (
    <WorldRuntimeContext.Provider value={value}>
      <MotionConfig reducedMotion={sceneRuntime.motionMode !== 'full' ? 'always' : 'user'}>
        <RuntimeAtmosphere />
        {children}
        <RuntimeSoundscapeControl />
      </MotionConfig>
    </WorldRuntimeContext.Provider>
  )
}

export function useWorldRuntime() {
  const runtime = useContext(WorldRuntimeContext)
  if (!runtime) throw new Error('useWorldRuntime must be used inside WorldRuntimeProvider')
  return runtime
}
