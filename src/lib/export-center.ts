import exportCenterImplementationContract from '../../data/export-center-implementation-contract.json'
import exportInheritanceMatrix from '../../data/export-inheritance-matrix.json'
import releaseBlockerRegister from '../../data/release-blocker-register.json'

export function getExportCenterImplementationContract() {
  return exportCenterImplementationContract
}

export function getExportPackages() {
  return exportInheritanceMatrix.packages
}

export function getExportCenterSummary() {
  return {
    stageProgress: exportCenterImplementationContract.stageProgress,
    route: exportCenterImplementationContract.route,
    packages: exportInheritanceMatrix.packages.length,
    confirmationRequired: exportInheritanceMatrix.packages.filter((item) => item.requiresConfirmation).length,
    publicPackages: exportInheritanceMatrix.packages.filter((item) => item.visibility === 'public').length,
    privatePackages: exportInheritanceMatrix.packages.filter((item) => item.visibility === 'private').length,
    openReleaseBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
  }
}
