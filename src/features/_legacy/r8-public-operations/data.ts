import accessibilityPerformanceBudgetData from '../../../data/r8-public-operations/accessibility-performance-budget.json'
import backupRollbackOpsData from '../../../data/r8-public-operations/backup-rollback-ops.json'
import contentCalendarData from '../../../data/r8-public-operations/content-calendar.json'
import evidenceLedgerData from '../../../data/r8-public-operations/evidence-ledger.json'
import feedbackLoopData from '../../../data/r8-public-operations/feedback-loop.json'
import operationsCadenceData from '../../../data/r8-public-operations/operations-cadence.json'
import privacyReleaseGuardData from '../../../data/r8-public-operations/privacy-release-guard.json'
import publicSmokeTestsData from '../../../data/r8-public-operations/public-smoke-tests.json'
import releaseChannelsData from '../../../data/r8-public-operations/release-channels.json'
import riskRegisterData from '../../../data/r8-public-operations/risk-register.json'
import roadmapData from '../../../data/r8-public-operations/roadmap.json'
import seoPublicationPlanData from '../../../data/r8-public-operations/seo-publication-plan.json'
import worldReleaseLogData from '../../../data/r8-public-operations/world-release-log.json'
import type { R8CalendarItem, R8Channel, R8Risk, R8Summary } from './types'

export const r8Roadmap = roadmapData
export const r8Stages = roadmapData.stages
export const r8Batches = roadmapData.batches
export const r8ReleaseChannels = releaseChannelsData.channels as R8Channel[]
export const r8ContentCalendar = contentCalendarData
export const r8CalendarItems = contentCalendarData.items as R8CalendarItem[]
export const r8WorldReleaseLog = worldReleaseLogData.events
export const r8SeoPublicationPlan = seoPublicationPlanData
export const r8PrivacyReleaseGuard = privacyReleaseGuardData
export const r8AccessibilityPerformanceBudget = accessibilityPerformanceBudgetData
export const r8PublicSmokeTests = publicSmokeTestsData.tests
export const r8FeedbackLoop = feedbackLoopData
export const r8OperationsCadence = operationsCadenceData.rituals
export const r8BackupRollbackOps = backupRollbackOpsData
export const r8EvidenceLedger = evidenceLedgerData.entries
export const r8Risks = riskRegisterData.risks as R8Risk[]

export function getR8Summary(): R8Summary {
  return {
    stages: r8Stages.length,
    batches: r8Batches.length,
    channels: r8ReleaseChannels.length,
    calendarItems: r8CalendarItems.length,
    smokeTests: r8PublicSmokeTests.length,
    risks: r8Risks.length,
    productionLive: Boolean(r8Roadmap.productionLive),
    releaseReady: Boolean(r8Roadmap.releaseReady),
    cleanProductionReady: Boolean(r8Roadmap.cleanProductionReady),
  }
}

export function getR8PublicChannels(): R8Channel[] {
  return r8ReleaseChannels.filter((channel) => channel.visibility === 'public')
}

export function getR8CriticalRisks(): R8Risk[] {
  return r8Risks.filter((risk) => risk.level === 'critical' || risk.level === 'high')
}
