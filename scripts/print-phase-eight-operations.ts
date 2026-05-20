import phaseEightMonitoringErrorTrackingPlan from '../data/phase-eight-monitoring-error-tracking-plan.json'
import phaseEightProductionSmokePlan from '../data/phase-eight-production-smoke-plan.json'
import phaseEightRollbackDrillPlan from '../data/phase-eight-rollback-drill-plan.json'

function main() {
  console.log(`${phaseEightProductionSmokePlan.name}`)
  console.log(`stageProgress=${phaseEightProductionSmokePlan.stageProgress}`)
  console.log(`productionSmokePassed=${phaseEightProductionSmokePlan.productionSmokePassed}`)
  console.log(`smokeChecks=${phaseEightProductionSmokePlan.checks.length}`)
  console.log(`monitoringChannels=${phaseEightMonitoringErrorTrackingPlan.channels.length}`)
  console.log(`rollbackDrillPassed=${phaseEightRollbackDrillPlan.rollbackDrillPassed}`)
  console.log(`rollbackSteps=${phaseEightRollbackDrillPlan.steps.length}`)
}

main()
