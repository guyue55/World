import phaseEightMonitoringErrorTrackingPlan from '../data/versions/archive/phase-eight-monitoring-error-tracking-plan.json'
import phaseEightProductionSmokePlan from '../data/release/phase-eight-production-smoke-plan.json'
import phaseEightRollbackDrillPlan from '../data/versions/archive/phase-eight-rollback-drill-plan.json'

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
