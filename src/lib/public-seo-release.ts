import publicSeoReleaseContract from '../../data/public-seo-release-contract.json'
import publicSeoReleaseRecord from '../../data/public-seo-release-record.json'
import releaseBlockerRegister from '../../data/release-blocker-register.json'

export function getPublicSeoReleaseContract() {
  return publicSeoReleaseContract
}

export function getPublicSeoReleaseRecord() {
  return publicSeoReleaseRecord
}

export function getPublicSeoReleaseSummary() {
  return {
    stageProgress: publicSeoReleaseContract.stageProgress,
    publicArtifacts: publicSeoReleaseContract.publicArtifacts.length,
    forbiddenVisibility: publicSeoReleaseContract.forbiddenVisibility.length,
    requiredSeoChecks: publicSeoReleaseContract.requiredSeoChecks.length,
    pendingChecks: publicSeoReleaseRecord.checks.filter((check) => check.status !== 'passed').length,
    openBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
  }
}
