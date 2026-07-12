'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { RuntimeSoundscapeControl } from './RuntimeSoundscapeControl'
import {
  buildJourneyMemoryEntry,
  getClearedJourneyMemoryState,
  getReturningJourney,
  mergeJourneyHistory,
  type JourneyMemoryEntry,
} from '@/lib/journey-memory'
import { clampSoundscapeVolume, getSensoryAudioRegistry } from '@/lib/sensory-audio'
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
import { createSceneContext } from '@/lib/scenes/scene-destination'
import { getExperienceForPathname } from '@/world/experience/manifest'
import { WorldClockController, WORLD_TIME_ZONE, buildWorldTimeSnapshot, type WorldDayPeriod, type WorldSeason, type WorldTimeSnapshot } from '@/world/runtime/clock'
import { buildWorldSignalSnapshot } from '@/world/runtime/signals'
import { createWorldRuntimeStore, type WorldRuntimeSnapshot, type WorldRuntimeStore } from '@/world/runtime/store'

export type DayPeriod = WorldDayPeriod
export type Season = WorldSeason
export type AiRuntimeStatus = 'enabled' | 'low-light' | 'disabled'
export type MotionPreference = 'system' | 'reduced' | 'off'
export type WorldSoundMode = 'muted' | 'enabled'

type WorldRuntime = {
  worldTime: WorldTimeSnapshot
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
const WorldRuntimeStoreContext = createContext<WorldRuntimeStore | null>(null)

const sensoryAudioRegistry = getSensoryAudioRegistry()
const soundModeKey = sensoryAudioRegistry.runtime.storageKey
const soundVolumeKey = sensoryAudioRegistry.runtime.volumeStorageKey
const initialWorldTime = buildWorldTimeSnapshot(0, WORLD_TIME_ZONE)

function createInitialRuntimeStore() {
  return createWorldRuntimeStore({
    signals: buildWorldSignalSnapshot({ time: initialWorldTime }),
    scene: createSceneContext('gateway', '/'),
    migration: { kind: 'idle' },
    sound: { mode: 'muted', volume: sensoryAudioRegistry.runtime.defaultVolume, sessionArmed: false },
  })
}

function useStoreSelector<T>(store: WorldRuntimeStore, selector: (snapshot: WorldRuntimeSnapshot) => T) {
  const subscribe = useCallback((listener: () => void) => store.subscribeSelector(selector, listener), [selector, store])
  const getSnapshot = useCallback(() => selector(store.getSnapshot()), [selector, store])
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

const selectWorldTime = (snapshot: WorldRuntimeSnapshot) => snapshot.signals.time

export function WorldRuntimeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [runtimeStore] = useState(createInitialRuntimeStore)
  const worldTime = useStoreSelector(runtimeStore, selectWorldTime)
  const dayPeriod = worldTime.dayPeriod
  const season = worldTime.season
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
    setLastJourney(readJourneyMemory())
    setJourneyHistory(readJourneyHistory())
    const storedSoundMode = readSoundMode(soundModeKey)
    const storedSoundVolume = readSoundVolume(soundVolumeKey, sensoryAudioRegistry.runtime.defaultVolume)
    setSoundModeState(storedSoundMode)
    setSoundVolumeState(storedSoundVolume)
    runtimeStore.dispatch({ type: 'sound/changed', preference: { mode: storedSoundMode, volume: storedSoundVolume, sessionArmed: storedSoundMode === 'enabled' } })

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
  }, [runtimeStore])

  useEffect(() => {
    const controller = new WorldClockController({
      timeZone: WORLD_TIME_ZONE,
      visibility: document,
      now: Date.now,
      setTimer: (callback, delayMs) => window.setTimeout(callback, delayMs),
      clearTimer: (id) => window.clearTimeout(id),
      onSnapshot: (snapshot) => runtimeStore.dispatch({ type: 'clock/ticked', snapshot }),
      onVisibility: (value) => runtimeStore.dispatch({ type: 'visibility/changed', value }),
    })
    controller.start()
    return () => controller.dispose()
  }, [runtimeStore])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.worldDayPeriod = dayPeriod
    root.dataset.worldSeason = season
    root.dataset.worldDateKey = worldTime.worldDateKey
    root.dataset.worldTimeEpoch = String(worldTime.nowEpochMs)
    root.dataset.worldDayProgress = worldTime.dayProgress.toFixed(6)
    root.dataset.worldSeasonProgress = worldTime.seasonProgress.toFixed(6)
    return () => {
      delete root.dataset.worldDayPeriod
      delete root.dataset.worldSeason
      delete root.dataset.worldDateKey
      delete root.dataset.worldTimeEpoch
      delete root.dataset.worldDayProgress
      delete root.dataset.worldSeasonProgress
    }
  }, [dayPeriod, season, worldTime])

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
    const experience = getExperienceForPathname(pathname)
    runtimeStore.dispatch({ type: 'scene/entered', context: createSceneContext(experience.id, pathname) })
  }, [pathname, runtimeStore])

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
    runtimeStore.dispatch({ type: 'sound/changed', preference: { mode: value, volume: soundVolume, sessionArmed: value === 'enabled' } })
  }

  function setSoundVolume(value: number) {
    const nextValue = clampSoundscapeVolume(value)
    setSoundVolumeState(nextValue)
    writeSoundVolume(soundVolumeKey, nextValue)
    runtimeStore.dispatch({ type: 'sound/changed', preference: { mode: soundMode, volume: nextValue, sessionArmed: soundMode === 'enabled' } })
  }

  function clearJourneyMemory() {
    clearStoredJourneyMemory()
    const clearedState = getClearedJourneyMemoryState(new Date().toISOString())
    setLastJourney(clearedState.lastJourney)
    setJourneyHistory(clearedState.journeyHistory)
  }

  const value = useMemo<WorldRuntime>(() => ({
    worldTime,
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
  }), [aiStatus, compactMotion, currentJourney, dayPeriod, hydrated, journeyHistory, lastJourney, motionPreference, reducedMotion, sceneRuntime, season, soundMode, soundVolume, visitedCount, worldTime])

  return (
    <WorldRuntimeStoreContext.Provider value={runtimeStore}>
      <WorldRuntimeContext.Provider value={value}>
        {children}
        <RuntimeSoundscapeControl />
      </WorldRuntimeContext.Provider>
    </WorldRuntimeStoreContext.Provider>
  )
}

export function useWorldRuntimeSelector<T>(selector: (snapshot: WorldRuntimeSnapshot) => T) {
  const store = useContext(WorldRuntimeStoreContext)
  if (!store) throw new Error('useWorldRuntimeSelector must be used inside WorldRuntimeProvider')
  return useStoreSelector(store, selector)
}

export function useWorldRuntime() {
  const runtime = useContext(WorldRuntimeContext)
  if (!runtime) throw new Error('useWorldRuntime must be used inside WorldRuntimeProvider')
  return runtime
}
