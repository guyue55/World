import fs from 'node:fs'
import path from 'node:path'
import auditComplianceLedger from '../data/audit-compliance-ledger.json'
import longTermSustainabilityGovernancePlan from '../data/long-term-sustainability-governance-plan.json'
import permissionRoleGovernanceModel from '../data/permission-role-governance-model.json'
import phaseThirteenEntryGate from '../data/phase-thirteen-entry-gate.json'
import phaseTwelvePlatformFinalReport from '../data/phase-twelve-platform-final-report.json'
import platformGovernanceDashboardPlan from '../data/platform-governance-dashboard-plan.json'
import secretGovernancePolicy from '../data/secret-governance-policy.json'
import serviceBoundaryDesign from '../data/service-boundary-design.json'
import storageGovernanceMatrix from '../data/storage-governance-matrix.json'
import teamCollaborationGovernanceWorkflow from '../data/team-collaboration-governance-workflow.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseTwelvePlatformFinalReport.completedBatches.length !== 4) {
    errors.push('phase twelve final report must record 4 batches')
  }

  if (phaseTwelvePlatformFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('releaseDecision must remain not-ready-for-release')
  }

  if (phaseTwelvePlatformFinalReport.productionDecision !== 'production-not-live') {
    errors.push('productionDecision must remain production-not-live')
  }

  if (phaseTwelvePlatformFinalReport.platformDecision !== 'platform-governance-structure-ready-real-services-not-started') {
    errors.push('platformDecision mismatch')
  }

  const flags = [
    permissionRoleGovernanceModel.rbacReady,
    serviceBoundaryDesign.serviceBoundaryReady,
    auditComplianceLedger.auditReady,
    secretGovernancePolicy.secretGovernanceReady,
    storageGovernanceMatrix.storageReady,
    teamCollaborationGovernanceWorkflow.teamReady,
    platformGovernanceDashboardPlan.governanceDashboardReady,
    longTermSustainabilityGovernancePlan.sustainabilityReady,
  ]

  if (flags.some((flag) => flag !== false)) {
    errors.push('all platform governance readiness flags must remain false')
  }

  if (phaseTwelvePlatformFinalReport.phaseThirteenEntryDecision !== 'phase-thirteen-planning-allowed-real-implementation-hardening-and-evidence-not-started') {
    errors.push('phase thirteen entry decision mismatch')
  }

  if (!phaseThirteenEntryGate.mustNotDo.includes('store secrets in repository')) {
    errors.push('phase thirteen gate must forbid storing secrets in repository')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-twelve-final']) errors.push('package missing check:phase-twelve-final')
  if (!pkg.scripts['phase-twelve-final:print']) errors.push('package missing phase-twelve-final:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase twelve final check passed.')
}

main()
