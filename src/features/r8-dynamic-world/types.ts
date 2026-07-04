export type R8DynamicStage = {
  stage: number
  title: string
  focus: string
  batches: string[]
  status: 'complete' | 'pending'
}

export type R8DynamicSurface = {
  id: string
  name: string
  purpose: string
  reducedMotionFallback: string
}

export type R8DynamicSummary = {
  stages: number
  batches: number
  surfaces: number
  acceptanceItems: number
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
}
