import releaseGateContract from '../../data/release/release-gate-contract.json'
import releaseGateRecord from '../../data/release/release-gate-record.json'
import releaseBlockerRegister from '../../data/release/release-blocker-register.json'

export function getReleaseGateContract() {
  return releaseGateContract
}

export function getReleaseGateRecord() {
  return releaseGateRecord
}

export function getReleaseGateSummary() {
  return {
    stageProgress: releaseGateContract.stageProgress,
    requiredCommands: releaseGateContract.requiredCommands.length,
    blockingSources: releaseGateContract.blockingSources.length,
    openBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
    localStatus: releaseGateRecord.latestLocalGate.status,
    ciStatus: releaseGateRecord.latestCiGate.status,
  }
}
