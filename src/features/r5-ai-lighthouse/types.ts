export type R5Risk = 'low' | 'medium' | 'high' | 'critical'
export type R5ReviewStatus = 'pending-review' | 'blocked-until-approved' | 'approved' | 'rejected'

export type R5PublicContextItem = {
  id: string
  title: string
  worldTitle: string
  type: string
  visibility: 'public'
  summary: string
  source: string
  allowedForPublicAI: boolean
}

export type R5Capability = {
  id: string
  name: string
  description: string
  canRead: string[]
  requiresReview: boolean
  canMutateWorld: boolean
}

export type R5GuidedQuestion = {
  id: string
  question: string
  answerMode: 'public-qa' | 'path-recommendation'
  fallback: string
}

export type R5PathRecommendation = {
  id: string
  title: string
  intent: string
  steps: string[]
  publicOnly: boolean
}

export type R5ReviewItem = {
  id: string
  kind: string
  title: string
  sourceId: string
  targetId?: string
  status: R5ReviewStatus
  risk: R5Risk
  suggestion: string
  mustReview: boolean
}

export type R5AuditEvent = {
  id: string
  actor: string
  action: string
  target: string
  result: string
  requiresReview: boolean
}

export type R5Summary = {
  stages: number
  batches: number
  publicContextItems: number
  capabilities: number
  guidedQuestions: number
  paths: number
  reviewItems: number
  auditEvents: number
  forbiddenActions: number
  productionLive: boolean
  releaseReady: boolean
  cleanProductionReady: boolean
}
