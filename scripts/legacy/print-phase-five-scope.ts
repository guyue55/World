import phaseFiveScopeContract from '../data/core/phase-five-scope-contract.json'
import privateArchiveBoundaryPolicy from '../data/domains/archive/private-archive-boundary-policy.json'

function main() {
  console.log(`${phaseFiveScopeContract.name}`)
  console.log(`stageProgress=${phaseFiveScopeContract.stageProgress}`)
  console.log(`focus=${phaseFiveScopeContract.focus.length}`)
  console.log(`visibilityTiers=${phaseFiveScopeContract.visibilityTiers.length}`)
  console.log(`privateLayers=${privateArchiveBoundaryPolicy.layers.length}`)
}

main()
