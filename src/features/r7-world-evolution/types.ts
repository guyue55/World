export type R7LifecycleStateId = 'seed' | 'sprout' | 'growing' | 'bloom' | 'fruit' | 'archive' | 'relic' | 'dormant' | 'silent' | 'revived'
export type R7Risk = 'low' | 'medium' | 'high' | 'critical'

export type R7Signal = {
  id: string
  label: string
  value: string
}

export type R7WorldState = {
  id: string
  mode: string
  mood: string
  season: string
  lightLevel: string
  lastAwakenedAt: string
  productionLive: boolean
  signals: R7Signal[]
}

export type R7LifecycleState = {
  id: R7LifecycleStateId
  worldName: string
  realDescription: string
  next: string[]
}

export type R7MaintenanceQueueItem = {
  id: string
  kind: string
  title: string
  effort: 'low' | 'medium' | 'high'
  risk: R7Risk
  nextAction: string
}

export type R7HealthMetric = {
  id: string
  label: string
  value: number
  target: string
}

export type R7WorldLogEvent = {
  id: string
  type: string
  title: string
  summary: string
  visibility: 'public' | 'public-summary' | 'owner-summary' | 'private'
}

export type R7Summary = {
  stages: number
  batches: number
  lifecycleStates: number
  maintenanceItems: number
  healthScore: number
  worldLogEvents: number
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
}
