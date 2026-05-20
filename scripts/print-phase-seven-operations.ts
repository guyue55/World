import phaseSevenBackupRollbackPlan from '../data/operations/phase-seven-backup-rollback-plan.json'
import phaseSevenLongTermOperationsPlan from '../data/operations/phase-seven-long-term-operations-plan.json'
import phaseSevenVersionGovernance from '../data/domains/governance/phase-seven-version-governance.json'

function main() {
  console.log(`${phaseSevenLongTermOperationsPlan.name}`)
  console.log(`stageProgress=${phaseSevenLongTermOperationsPlan.stageProgress}`)
  console.log(`cadence=${phaseSevenLongTermOperationsPlan.cadence.length}`)
  console.log(`backupTargets=${phaseSevenBackupRollbackPlan.backupTargets.length}`)
  console.log(`rollbackSteps=${phaseSevenBackupRollbackPlan.rollbackSteps.length}`)
  console.log(`versionRules=${phaseSevenVersionGovernance.versionRules.length}`)
}

main()
