import phaseThreeOperationsExportContract from '../../data/core/phase-three-operations-export-contract.json'
import phaseThreePlanningFinalReport from '../../data/release/phase-three-planning-final-report.json'
import exportInheritanceMatrix from '../../data/domains/archive/export-inheritance-matrix.json'
import inheritanceExportPlan from '../../data/domains/archive/inheritance-export-plan.json'
import releaseBlockerRegister from '../../data/release/release-blocker-register.json'

export function getPhaseThreeOperationsExportContract() {
  return phaseThreeOperationsExportContract
}

export function getPhaseThreePlanningFinalReport() {
  return phaseThreePlanningFinalReport
}

export function getExportInheritanceMatrix() {
  return exportInheritanceMatrix
}

export function getInheritanceExportPlan() {
  return inheritanceExportPlan
}

export function getOperationsExportSummary() {
  const inheritancePackages = inheritanceExportPlan.packages

  return {
    stageProgress: phaseThreeOperationsExportContract.stageProgress,
    operationModules: phaseThreeOperationsExportContract.operationModules.length,
    exportFormats: phaseThreeOperationsExportContract.exportFormats.length,
    privacyRules: phaseThreeOperationsExportContract.privacyRules.length,
    packages: exportInheritanceMatrix.packages.length,
    inheritancePackages: inheritancePackages.length,
    annualWorldBooks: inheritancePackages.filter((item) => item.id === 'annual-world-book').length,
    confirmationRequiredExports: inheritancePackages.filter((item) => item.confirmationRequired).length,
    privateContainingExports: inheritancePackages.filter((item) => item.containsPrivate).length,
    completedBatches: phaseThreePlanningFinalReport.completedBatches.length,
    openReleaseBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
  }
}
