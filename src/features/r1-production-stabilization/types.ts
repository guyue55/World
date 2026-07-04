export type R1Stage = {
  stage: number
  title: string
  description: string
  status: string
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
  batches: number[]
}

export type R1Summary = {
  stages: number
  batches: number
  extensions: number
  smokeRoutes: number
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
}

export type R1Card = {
  id: string
  title: string
  state: string
  description: string
}
