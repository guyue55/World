import ambientEnvironmentRegistry from '../../data/domains/experience/ambient-environment-registry.json'

export type AmbientEnvironmentRegistry = typeof ambientEnvironmentRegistry
export type AmbientDayPeriodId = AmbientEnvironmentRegistry['dayPeriods'][number]['id']
export type AmbientSeasonId = AmbientEnvironmentRegistry['seasons'][number]['id']
export type AmbientAiStatusId = AmbientEnvironmentRegistry['aiStatuses'][number]['id']
export type AmbientDayPeriod = AmbientEnvironmentRegistry['dayPeriods'][number]
export type AmbientSeason = AmbientEnvironmentRegistry['seasons'][number]
export type AmbientAiStatus = AmbientEnvironmentRegistry['aiStatuses'][number]
export type AmbientSceneEnvironment = AmbientEnvironmentRegistry['sceneEnvironments'][number] | AmbientEnvironmentRegistry['fallback']

export type AmbientEnvironmentRuntime = {
  dayPeriod: AmbientDayPeriodId
  season: AmbientSeasonId
  sceneId: string
  aiStatus: AmbientAiStatusId
}

export type AmbientEnvironmentState = AmbientEnvironmentRuntime & {
  day: AmbientDayPeriod
  seasonal: AmbientSeason
  ai: AmbientAiStatus
  scene: AmbientSceneEnvironment
  objectLabels: string[]
}

export type AmbientEnvironmentSummary = {
  name: string
  version: string
  localOnly: boolean
  publicSceneOnly: boolean
  dayPeriodCount: number
  seasonCount: number
  aiStatusCount: number
  sceneEnvironmentCount: number
  reducedMotionBehavior: string
  nextActions: string[]
}

export function getAmbientEnvironmentRegistry(): AmbientEnvironmentRegistry {
  return ambientEnvironmentRegistry
}

export function getAmbientEnvironmentState(runtime: AmbientEnvironmentRuntime): AmbientEnvironmentState {
  const day = ambientEnvironmentRegistry.dayPeriods.find((item) => item.id === runtime.dayPeriod) ?? ambientEnvironmentRegistry.dayPeriods[1]
  const seasonal = ambientEnvironmentRegistry.seasons.find((item) => item.id === runtime.season) ?? ambientEnvironmentRegistry.seasons[0]
  const ai = ambientEnvironmentRegistry.aiStatuses.find((item) => item.id === runtime.aiStatus) ?? ambientEnvironmentRegistry.aiStatuses[0]
  const scene = ambientEnvironmentRegistry.sceneEnvironments.find((item) => item.sceneId === runtime.sceneId) ?? ambientEnvironmentRegistry.fallback

  return {
    ...runtime,
    day,
    seasonal,
    ai,
    scene,
    objectLabels: scene.objects.slice(0, 3),
  }
}

export function getAmbientEnvironmentSummary(): AmbientEnvironmentSummary {
  return {
    name: ambientEnvironmentRegistry.name,
    version: ambientEnvironmentRegistry.version,
    localOnly: ambientEnvironmentRegistry.scope.localOnly,
    publicSceneOnly: ambientEnvironmentRegistry.scope.publicSceneOnly,
    dayPeriodCount: ambientEnvironmentRegistry.dayPeriods.length,
    seasonCount: ambientEnvironmentRegistry.seasons.length,
    aiStatusCount: ambientEnvironmentRegistry.aiStatuses.length,
    sceneEnvironmentCount: ambientEnvironmentRegistry.sceneEnvironments.length,
    reducedMotionBehavior: ambientEnvironmentRegistry.display.reducedMotionBehavior,
    nextActions: ambientEnvironmentRegistry.nextActions,
  }
}
