export type V9ReadinessState = 'ready' | 'designed' | 'planned' | 'blocked' | 'manual-required'

export type V9Stage = {
  id: string
  stage: number
  title: string
  batches: number[]
  focus: string[]
}

export type V9PlatformCard = {
  id: string
  title: string
  state: V9ReadinessState
  description: string
}

export type V9ServiceSummary = {
  stages: number
  batches: number
  extensions: number
  roles: number
  contracts: number
  serviceLive: boolean
  releaseReady: boolean
}
