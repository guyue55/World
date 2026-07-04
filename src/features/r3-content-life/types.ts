
export type R3Visibility = 'public' | 'semi-public' | 'private' | 'sealed'
export type R3LifeStage = 'seed' | 'sprout' | 'growing' | 'bloom' | 'fruit' | 'archive' | 'relic' | 'dormant' | 'silent'
export type R3NodeType = 'article' | 'project' | 'idea' | 'memory' | 'photo' | 'doc' | 'design'

export type R3WorldNode = {
  id: string
  slug: string
  title: string
  worldTitle: string
  type: R3NodeType
  area: string
  createdAt: string
  updatedAt: string
  visibility: R3Visibility
  lifeStage: R3LifeStage
  source: string
  maturity: number
  relations: string[]
  tags: string[]
  summary: string
  nextAction: string
  publicIndexAllowed: boolean
  aiReadable: string
}

export type R3ContentPath = {
  id: string
  title: string
  description: string
  nodes: string[]
  audience: string
}

export type R3AreaDensity = {
  id: string
  worldName: string
  realName: string
  entry: string
  nodeCount: number
  averageMaturity: number
  publicCount: number
  semiPublicCount: number
  density: string
  nextMaintenance: string
}

export type R3Summary = {
  stages: number
  batches: number
  nodes: number
  paths: number
  areas: number
  publicNodes: number
  semiPublicNodes: number
  averageMaturity: number
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
}
