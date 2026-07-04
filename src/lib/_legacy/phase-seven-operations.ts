import phaseSevenBackupRollbackPlan from '../../data/operations/phase-seven-backup-rollback-plan.json'
import phaseSevenLongTermOperationsPlan from '../../data/operations/phase-seven-long-term-operations-plan.json'
import phaseSevenVersionGovernance from '../../data/domains/governance/phase-seven-version-governance.json'

export function getPhaseSevenLongTermOperationsPlan() {
  return phaseSevenLongTermOperationsPlan
}

export function getPhaseSevenBackupRollbackPlan() {
  return phaseSevenBackupRollbackPlan
}

export function getPhaseSevenVersionGovernance() {
  return phaseSevenVersionGovernance
}

export function getPhaseSevenOperationsSummary() {
  return {
    stageProgress: phaseSevenLongTermOperationsPlan.stageProgress,
    cadenceItems: phaseSevenLongTermOperationsPlan.cadence.length,
    backupTargets: phaseSevenBackupRollbackPlan.backupTargets.length,
    rollbackSteps: phaseSevenBackupRollbackPlan.rollbackSteps.length,
    versionRules: phaseSevenVersionGovernance.versionRules.length,
    requiredRecords: phaseSevenVersionGovernance.requiredRecords.length,
  }
}
