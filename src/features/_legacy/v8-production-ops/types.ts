export type V8ReadinessState = 'ready' | 'blocked' | 'pending-real-environment' | 'manual-required'

export type V8ProductionCard = {
  id: string
  title: string
  state: V8ReadinessState
  description: string
}

export type V8Stage = {
  id: string
  stage: number
  title: string
  batches: number[]
  focus: string[]
}

export type V8Extension = {
  id: string
  name: string
  kind: string
  status: string
  description: string
}

export type V8ProductionSummary = {
  stages: number
  batches: number
  extensions: number
  productionLive: boolean
  releaseReady: boolean
}
