import permissionRoleGovernanceModel from '../data/domains/governance/permission-role-governance-model.json'
import phaseTwelvePlatformGovernanceScopeContract from '../data/domains/governance/phase-twelve-platform-governance-scope-contract.json'
import serviceBoundaryDesign from '../data/core/service-boundary-design.json'

function main() {
  console.log(`${phaseTwelvePlatformGovernanceScopeContract.name}`)
  console.log(`stageProgress=${phaseTwelvePlatformGovernanceScopeContract.stageProgress}`)
  console.log(`focus=${phaseTwelvePlatformGovernanceScopeContract.focus.length}`)
  console.log(`rbacReady=${permissionRoleGovernanceModel.rbacReady}`)
  console.log(`roles=${permissionRoleGovernanceModel.roles.length}`)
  console.log(`permissions=${permissionRoleGovernanceModel.permissions.length}`)
  console.log(`serviceBoundaryReady=${serviceBoundaryDesign.serviceBoundaryReady}`)
  console.log(`services=${serviceBoundaryDesign.services.length}`)
}

main()
