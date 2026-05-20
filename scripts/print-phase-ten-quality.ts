import automatedQualityPatrolPlan from '../data/automated-quality-patrol-plan.json'
import intelligentOperationsFeedbackLoop from '../data/intelligent-operations-feedback-loop.json'
import longTermDataInsightPlan from '../data/long-term-data-insight-plan.json'

function main() {
  console.log(`${automatedQualityPatrolPlan.name}`)
  console.log(`stageProgress=${automatedQualityPatrolPlan.stageProgress}`)
  console.log(`patrolReady=${automatedQualityPatrolPlan.patrolReady}`)
  console.log(`patrolChecks=${automatedQualityPatrolPlan.checks.length}`)
  console.log(`insightReady=${longTermDataInsightPlan.insightReady}`)
  console.log(`insightSignals=${longTermDataInsightPlan.signals.length}`)
  console.log(`loopReady=${intelligentOperationsFeedbackLoop.loopReady}`)
  console.log(`loopSteps=${intelligentOperationsFeedbackLoop.steps.length}`)
}

main()
