import fs from 'node:fs'
import path from 'node:path'
import permissionRoleGovernanceModel from '../data/permission-role-governance-model.json'
import phaseTwelveEntryGate from '../data/phase-twelve-entry-gate.json'
import phaseTwelvePlatformGovernanceScopeContract from '../data/phase-twelve-platform-governance-scope-contract.json'
import serviceBoundaryDesign from '../data/service-boundary-design.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (phaseTwelveEntryGate.entryDecision !== 'phase-twelve-planning-allowed-real-platformization-and-governance-not-started') {
    errors.push('phase twelve entry decision mismatch')
  }
  if (phaseTwelvePlatformGovernanceScopeContract.focus.length < 8) errors.push('phase twelve focus too small')
  if (!phaseTwelvePlatformGovernanceScopeContract.nonGoals.includes('store secrets in repository')) {
    errors.push('must forbid storing secrets in repository')
  }
  if (permissionRoleGovernanceModel.rbacReady !== false) errors.push('rbacReady must remain false')
  if (permissionRoleGovernanceModel.roles.length < 5) errors.push('roles too few')
  const unsafePrivateRoles = permissionRoleGovernanceModel.roles.filter((role) => role.id !== 'owner' && role.canAccessPrivate)
  if (unsafePrivateRoles.length > 0) errors.push(`unsafe private access roles: ${unsafePrivateRoles.map((role) => role.id).join(', ')}`)
  if (permissionRoleGovernanceModel.permissions.filter((item) => item.risk === 'critical').some((item) => item.approvalRequired !== true)) {
    errors.push('critical permissions must require approval')
  }
  if (serviceBoundaryDesign.serviceBoundaryReady !== false) errors.push('serviceBoundaryReady must remain false')
  if (serviceBoundaryDesign.services.length < 6) errors.push('services too few')
  const privateService = serviceBoundaryDesign.services.find((item) => item.id === 'private-vault-service')
  if (!privateService || privateService.dataScope !== 'private-encrypted') errors.push('private vault service boundary mismatch')

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-twelve-platform-scope']) errors.push('package missing check:phase-twelve-platform-scope')
  if (!pkg.scripts['phase-twelve-platform-scope:print']) errors.push('package missing phase-twelve-platform-scope:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase twelve platform scope check passed.')
}

main()
