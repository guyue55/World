import releaseGateContract from '../data/release/release-gate-contract.json'
import releaseGateRecord from '../data/release/release-gate-record.json'
import releaseBlockerRegister from '../data/release/release-blocker-register.json'

function main() {
  console.log(`${releaseGateContract.name}`)
  console.log(`stageProgress=${releaseGateContract.stageProgress}`)
  console.log(`localGate=${releaseGateContract.localGateCommand}`)
  console.log(`ciWorkflow=${releaseGateContract.ciWorkflow}`)
  console.log(`requiredCommands=${releaseGateContract.requiredCommands.length}`)
  console.log(`releaseGateStatus=${releaseGateRecord.status}`)
  console.log(`openBlockers=${releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length}`)
}

main()
