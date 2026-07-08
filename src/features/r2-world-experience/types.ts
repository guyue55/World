export type R2Stage = {
  stage: number
  title: string
  description: string
  batches: string[]
  status: string
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
}

export type R2Summary = {
  stages: number
  batches: number
  extensions: number
  areas: number
  anchors: number
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
}

export type R2GatewayCard = {
  id: string
  title: string
  worldName: string
  realName: string
  description: string
  href: string
}

export type R2AreaPassport = {
  id: string
  worldName: string
  realName: string
  purpose: string
  defaultVisibility: string
  entry: string
  exit: string
}
