import fs from 'node:fs'
import path from 'node:path'
import deploymentHardeningPlan from '../data/release/deployment-hardening-plan.json'
import releaseEvidencePackagePlan from '../data/release/release-evidence-package-plan.json'
import releaseReadinessTransitionGate from '../data/release/release-readiness-transition-gate.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (deploymentHardeningPlan.deploymentHardeningReady !== false) errors.push('deploymentHardeningReady must remain false')
  if (deploymentHardeningPlan.items.length < 7) errors.push('deployment items too few')
  if (deploymentHardeningPlan.items.some((item) => item.required !== true || item.status === 'passed')) errors.push('deployment items must be required and not passed')
  if (releaseEvidencePackagePlan.evidencePackageReady !== false) errors.push('evidencePackageReady must remain false')
  if (releaseEvidencePackagePlan.sections.length < 7) errors.push('evidence sections too few')
  if (releaseEvidencePackagePlan.sections.some((section) => section.required !== true)) errors.push('evidence sections must be required')
  if (releaseReadinessTransitionGate.releaseReady !== false) errors.push('releaseReady must remain false')
  if (releaseReadinessTransitionGate.transitionAllowed !== false) errors.push('transitionAllowed must remain false')
  if (releaseReadinessTransitionGate.conditions.length < 7) errors.push('transition conditions too few')
  if (releaseReadinessTransitionGate.conditions.some((condition) => condition.met !== false)) errors.push('transition conditions must remain unmet')

  ;[
    'src/lib/phase-thirteen-release.ts',
    'src/components/hardening/DeploymentHardeningPanel.tsx',
    'src/components/hardening/EvidencePackagePanel.tsx',
    'src/components/hardening/ReleaseReadinessGatePanel.tsx',
    'src/components/hardening/SecurityBaselinePanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing release hardening file: ${file}`)
  })

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-thirteen-release-hardening']) errors.push('package missing check:phase-thirteen-release-hardening')
  if (!pkg.scripts['phase-thirteen-release-hardening:print']) errors.push('package missing phase-thirteen-release-hardening:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase thirteen release hardening check passed.')
}

main()
