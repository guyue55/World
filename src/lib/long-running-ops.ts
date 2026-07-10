import longRunningOpsContract from '../../data/domains/operations/long-running-observability-rollback-v1.json'

export type LongRunningOpsContract = typeof longRunningOpsContract

export type LongRunningOpsSummary = {
  name: string
  version: string
  localOnly: boolean
  lanIpAccepted: boolean
  targetCount: number
  failureCategoryCount: number
  safeRollbackCommandCount: number
  forbiddenCommandCount: number
  backupCommandCount: number
  reportPath: string
  runbook: string
  targets: Array<{
    id: string
    command: string
    evidence: string
  }>
  failureTaxonomy: Array<{
    id: string
    firstAction: string
  }>
}

export function getLongRunningOpsContract(): LongRunningOpsContract {
  return longRunningOpsContract
}

export function getLongRunningOpsSummary(): LongRunningOpsSummary {
  return {
    name: longRunningOpsContract.name,
    version: longRunningOpsContract.version,
    localOnly: longRunningOpsContract.scope.localOnly,
    lanIpAccepted: longRunningOpsContract.scope.lanIpAccepted,
    targetCount: longRunningOpsContract.observabilityTargets.length,
    failureCategoryCount: longRunningOpsContract.failureTaxonomy.length,
    safeRollbackCommandCount: longRunningOpsContract.rollbackDrill.safeCommands.length,
    forbiddenCommandCount: longRunningOpsContract.rollbackDrill.forbiddenWithoutExplicitUserApproval.length,
    backupCommandCount: longRunningOpsContract.rollbackDrill.backupCommands.length,
    reportPath: longRunningOpsContract.acceptance.report,
    runbook: longRunningOpsContract.rollbackDrill.runbook,
    targets: longRunningOpsContract.observabilityTargets.map((target) => ({
      id: target.id,
      command: target.command,
      evidence: target.evidence,
    })),
    failureTaxonomy: longRunningOpsContract.failureTaxonomy.map((failure) => ({
      id: failure.id,
      firstAction: failure.firstAction,
    })),
  }
}
