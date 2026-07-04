export type V10ReadinessState = 'ready' | 'designed' | 'planned' | 'manual-required' | 'blocked'

export type V10Stage = {
  id: string
  stage: number
  title: string
  batches: number[]
  focus: string[]
}

export type V10IntelligenceCard = {
  id: string
  title: string
  state: V10ReadinessState
  description: string
}

export type V10Summary = {
  stages: number
  batches: number
  extensions: number
  aiRoles: number
  lifeStages: number
  productionLive: boolean
  cleanProductionReady: boolean
}
