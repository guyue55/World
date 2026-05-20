import phaseSevenReleaseDashboard from '../../data/phase-seven-release-dashboard.json'
import phaseSevenReleaseEvidenceLedger from '../../data/phase-seven-release-evidence-ledger.json'
import phaseSevenReleaseScopeContract from '../../data/phase-seven-release-scope-contract.json'
import phaseSevenSeoAnalyticsPlan from '../../data/phase-seven-seo-analytics-plan.json'

export function getPhaseSevenReleaseScopeContract() {
  return phaseSevenReleaseScopeContract
}

export function getPhaseSevenReleaseEvidenceLedger() {
  return phaseSevenReleaseEvidenceLedger
}

export function getPhaseSevenSeoAnalyticsPlan() {
  return phaseSevenSeoAnalyticsPlan
}

export function getPhaseSevenReleaseDashboard() {
  return phaseSevenReleaseDashboard
}

export function getPhaseSevenReleaseSummary() {
  const items = phaseSevenReleaseEvidenceLedger.items
  const pending = items.filter((item) => String(item.status).startsWith('pending')).length

  return {
    stageProgress: phaseSevenReleaseDashboard.stageProgress,
    releaseReady: phaseSevenReleaseDashboard.releaseReady,
    evidenceItems: items.length,
    pendingEvidence: pending,
    seoChecks: phaseSevenSeoAnalyticsPlan.seoChecks.length,
    analyticsItems: phaseSevenSeoAnalyticsPlan.analyticsPlan.length,
    dashboardCards: phaseSevenReleaseDashboard.cards.length,
  }
}
