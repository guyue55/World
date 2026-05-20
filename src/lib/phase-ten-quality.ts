import automatedQualityPatrolPlan from '../../data/engineering/automated-quality-patrol-plan.json'
import intelligentOperationsFeedbackLoop from '../../data/domains/content/intelligent-operations-feedback-loop.json'
import longTermDataInsightPlan from '../../data/core/long-term-data-insight-plan.json'

export function getAutomatedQualityPatrolPlan() {
  return automatedQualityPatrolPlan
}

export function getLongTermDataInsightPlan() {
  return longTermDataInsightPlan
}

export function getIntelligentOperationsFeedbackLoop() {
  return intelligentOperationsFeedbackLoop
}

export function getPhaseTenQualitySummary() {
  return {
    stageProgress: automatedQualityPatrolPlan.stageProgress,
    patrolReady: automatedQualityPatrolPlan.patrolReady,
    patrolChecks: automatedQualityPatrolPlan.checks.length,
    insightReady: longTermDataInsightPlan.insightReady,
    insightSignals: longTermDataInsightPlan.signals.length,
    loopReady: intelligentOperationsFeedbackLoop.loopReady,
    loopSteps: intelligentOperationsFeedbackLoop.steps.length,
  }
}
