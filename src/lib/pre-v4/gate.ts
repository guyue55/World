import commandEnvironment from '../../data/pre-v4/batch-02-command-environment-closure.json'
import evidenceMatrix from '../../data/pre-v4/batch-01-evidence-matrix.json'
import entryDashboard from '../../data/pre-v4/batch-03-entry-dashboard.json'

export function getPreV4GateStatus() {
  return {
    evidenceMatrix,
    commandEnvironment,
    entryDashboard,
    summary: {
      gateGroups: entryDashboard.gateGroups.length,
      knownBlockers: commandEnvironment.knownBlockers.length,
      requiredEvidence: evidenceMatrix.requiredEvidence.length,
      v4PlanningAllowed: entryDashboard.v4PlanningAllowed,
      v4DevelopmentAllowed: entryDashboard.v4DevelopmentAllowed,
      releaseReady: entryDashboard.releaseReady,
      productionLive: entryDashboard.productionLive,
    },
  }
}
