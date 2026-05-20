import releaseBlockerClosureAssistContract from '../../data/release/release-blocker-closure-assist-contract.json'
import releaseBlockerClosureRequests from '../../data/release/release-blocker-closure-requests.json'
import releaseBlockerRegister from '../../data/release/release-blocker-register.json'

export function getReleaseBlockerClosureAssistContract() {
  return releaseBlockerClosureAssistContract
}

export function getReleaseBlockerClosureSummary() {
  return {
    stageProgress: releaseBlockerClosureAssistContract.stageProgress,
    allowedStatuses: releaseBlockerClosureAssistContract.allowedStatuses.length,
    requests: releaseBlockerClosureRequests.requests.length,
    openBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
    p0OpenBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.severity === 'P0' && blocker.status !== 'closed').length,
    recordStatus: releaseBlockerClosureRequests.status,
  }
}

export function getOpenReleaseBlockersForClosure() {
  return releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed')
}
