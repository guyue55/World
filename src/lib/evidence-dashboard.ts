import dependencyBootstrapRecord from '../../data/dependency-bootstrap-record.json'
import evidenceDashboardContract from '../../data/evidence-dashboard-contract.json'
import nonCommandEvidenceFeedbackRecord from '../../data/non-command-evidence-feedback-record.json'
import realEvidenceCaptureRecord from '../../data/real-evidence-capture-record.json'
import releaseBlockerRegister from '../../data/release-blocker-register.json'
import releaseReadyEvidenceMatrix from '../../data/release-ready-evidence-matrix.json'

export function getEvidenceDashboardContract() {
  return evidenceDashboardContract
}

export function getEvidenceDashboardSummary() {
  return {
    stageProgress: evidenceDashboardContract.stageProgress,
    route: evidenceDashboardContract.route,
    sections: evidenceDashboardContract.sections.length,
    evidenceItems: releaseReadyEvidenceMatrix.items.length,
    dependencyStatus: dependencyBootstrapRecord.status,
    captureStatus: realEvidenceCaptureRecord.status,
    feedbackStatus: nonCommandEvidenceFeedbackRecord.status,
    openBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
    matrixStatus: releaseReadyEvidenceMatrix.status,
  }
}

export function getEvidenceDashboardMatrix() {
  return releaseReadyEvidenceMatrix.items
}

export function getEvidenceDashboardCommands() {
  return [
    'npm install',
    'npm run dependency-bootstrap:probe',
    'npm run evidence:capture',
    'npm run non-command-evidence:print',
    'npm run real-evidence-preparation:print',
    'npm run release:local-gate',
  ]
}
