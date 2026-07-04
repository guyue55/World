import backupRollback from '../../../data/v7-release-ops/backup-rollback.json'
import evidenceMatrix from '../../../data/v7-release-ops/evidence-matrix.json'
import extensionRegistry from '../../../data/v7-release-ops/extension-registry.json'
import operationsCadence from '../../../data/v7-release-ops/operations-cadence.json'
import qualityBudget from '../../../data/v7-release-ops/quality-budget.json'
import releaseCockpit from '../../../data/v7-release-ops/release-cockpit.json'
import roadmap from '../../../data/v7-release-ops/roadmap.json'
import v8Handoff from '../../../data/v7-release-ops/v8-handoff.json'

export const v7ReleaseRoadmap = roadmap
export const v7ReleaseCockpit = releaseCockpit
export const v7EvidenceMatrix = evidenceMatrix
export const v7ExtensionRegistry = extensionRegistry
export const v7OperationsCadence = operationsCadence
export const v7BackupRollback = backupRollback
export const v7QualityBudget = qualityBudget
export const v7V8Handoff = v8Handoff

export function getV7ReleaseSummary() {
  const requiredEvidence = v7EvidenceMatrix.items.filter((item) => item.requiredForReleaseReady)
  const locallyPassed = v7EvidenceMatrix.items.filter((item) => String(item.status).startsWith('passed-local'))

  return {
    stages: v7ReleaseRoadmap.stages.length,
    batches: v7ReleaseRoadmap.batches.length,
    extensions: v7ExtensionRegistry.items.length,
    releaseReady: v7ReleaseRoadmap.releaseReady,
    productionLive: v7ReleaseRoadmap.productionLive,
    requiredEvidence: requiredEvidence.length,
    locallyPassed: locallyPassed.length,
    cockpitCards: v7ReleaseCockpit.cards.length,
    operationCadences: v7OperationsCadence.cadence.length,
    v8CarryForward: v7V8Handoff.carryForward.length,
  }
}

export function getV7BlockedReleaseReasons() {
  return v7EvidenceMatrix.items
    .filter((item) => item.requiredForReleaseReady && !String(item.status).startsWith('passed'))
    .map((item) => item.title)
}
