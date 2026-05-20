import phaseThreeOperationsExportContract from '../../data/phase-three-operations-export-contract.json'
import phaseThreePlanningFinalReport from '../../data/phase-three-planning-final-report.json'
import exportInheritanceMatrix from '../../data/export-inheritance-matrix.json'
import releaseBlockerRegister from '../../data/release-blocker-register.json'

export function getPhaseThreeOperationsExportContract() {
  return phaseThreeOperationsExportContract
}

export function getPhaseThreePlanningFinalReport() {
  return phaseThreePlanningFinalReport
}

export function getExportInheritanceMatrix() {
  return exportInheritanceMatrix
}

export function getOperationsExportSummary() {
  return {
    stageProgress: phaseThreeOperationsExportContract.stageProgress,
    operationModules: phaseThreeOperationsExportContract.operationModules.length,
    exportFormats: phaseThreeOperationsExportContract.exportFormats.length,
    privacyRules: phaseThreeOperationsExportContract.privacyRules.length,
    packages: exportInheritanceMatrix.packages.length,
    completedBatches: phaseThreePlanningFinalReport.completedBatches.length,
    openReleaseBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
  }
}
