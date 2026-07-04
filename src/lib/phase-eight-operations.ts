import phaseEightMonitoringErrorTrackingPlan from '../../data/versions/archive/phase-eight-monitoring-error-tracking-plan.json'
import phaseEightProductionSmokePlan from '../../data/release/phase-eight-production-smoke-plan.json'
import phaseEightRollbackDrillPlan from '../../data/versions/archive/phase-eight-rollback-drill-plan.json'

export function getPhaseEightProductionSmokePlan() {
  return phaseEightProductionSmokePlan
}

export function getPhaseEightMonitoringErrorTrackingPlan() {
  return phaseEightMonitoringErrorTrackingPlan
}

export function getPhaseEightRollbackDrillPlan() {
  return phaseEightRollbackDrillPlan
}

export function getPhaseEightOperationsSummary() {
  return {
    stageProgress: phaseEightProductionSmokePlan.stageProgress,
    smokePassed: phaseEightProductionSmokePlan.productionSmokePassed,
    smokeChecks: phaseEightProductionSmokePlan.checks.length,
    monitoringChannels: phaseEightMonitoringErrorTrackingPlan.channels.length,
    enabledMonitoringChannels: phaseEightMonitoringErrorTrackingPlan.channels.filter((item) => item.enabled).length,
    rollbackDrillPassed: phaseEightRollbackDrillPlan.rollbackDrillPassed,
    rollbackSteps: phaseEightRollbackDrillPlan.steps.length,
  }
}
