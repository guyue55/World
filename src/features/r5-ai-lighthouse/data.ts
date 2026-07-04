import auditLogData from '../../../data/r5-ai-lighthouse/audit-log.json'
import capabilitiesData from '../../../data/r5-ai-lighthouse/capabilities.json'
import guidedQuestionsData from '../../../data/r5-ai-lighthouse/guided-questions.json'
import pathRecommendationsData from '../../../data/r5-ai-lighthouse/path-recommendations.json'
import publicContextData from '../../../data/r5-ai-lighthouse/public-context.json'
import r6HandoffData from '../../../data/r5-ai-lighthouse/r6-handoff.json'
import reviewQueueData from '../../../data/r5-ai-lighthouse/review-queue.json'
import roadmapData from '../../../data/r5-ai-lighthouse/roadmap.json'
import type { R5AuditEvent, R5Capability, R5GuidedQuestion, R5PathRecommendation, R5PublicContextItem, R5ReviewItem, R5Summary } from './types'

export const r5Roadmap = roadmapData
export const r5Stages = roadmapData.stages
export const r5Batches = roadmapData.batches
export const r5PublicContextItems = publicContextData.items as R5PublicContextItem[]
export const r5Capabilities = capabilitiesData.capabilities as R5Capability[]
export const r5ForbiddenActions = capabilitiesData.forbiddenActions as string[]
export const r5GuidedQuestions = guidedQuestionsData.questions as R5GuidedQuestion[]
export const r5PathRecommendations = pathRecommendationsData.paths as R5PathRecommendation[]
export const r5ReviewQueue = reviewQueueData.items as R5ReviewItem[]
export const r5AuditEvents = auditLogData.events as R5AuditEvent[]
export const r5R6Handoff = r6HandoffData.items

export function getR5Summary(): R5Summary {
  return {
    stages: r5Stages.length,
    batches: r5Batches.length,
    publicContextItems: r5PublicContextItems.length,
    capabilities: r5Capabilities.length,
    guidedQuestions: r5GuidedQuestions.length,
    paths: r5PathRecommendations.length,
    reviewItems: r5ReviewQueue.length,
    auditEvents: r5AuditEvents.length,
    forbiddenActions: r5ForbiddenActions.length,
    productionLive: Boolean(r5Roadmap.productionLive),
    releaseReady: Boolean(r5Roadmap.releaseReady),
    cleanProductionReady: Boolean(r5Roadmap.cleanProductionReady),
  }
}

export function getR5PublicCapabilities(): R5Capability[] {
  return r5Capabilities.filter((capability) => !capability.canMutateWorld)
}

export function getR5PendingReviewItems(): R5ReviewItem[] {
  return r5ReviewQueue.filter((item) => item.mustReview && item.status !== 'approved')
}
