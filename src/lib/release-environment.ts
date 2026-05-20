import releaseEnvironmentContract from '../../data/release/release-environment-contract.json'
import releaseConfig from '../../data/release/release-config.json'
import releaseBlockerRegister from '../../data/release/release-blocker-register.json'

export function getReleaseEnvironmentContract() {
  return releaseEnvironmentContract
}

export function getReleaseConfig() {
  return releaseConfig
}

export function getReleaseEnvironmentSummary() {
  return {
    stageProgress: releaseEnvironmentContract.stageProgress,
    platformTargets: releaseEnvironmentContract.platformTargets.length,
    environmentVariables: releaseEnvironmentContract.environmentVariables.length,
    publicBoundaryRules: releaseEnvironmentContract.publicBoundaryRules.length,
    rollbackRules: releaseEnvironmentContract.rollbackRules.length,
    promotionStatus: releaseConfig.releasePromotion.status,
    openBlockers: releaseBlockerRegister.blockers.filter((blocker) => blocker.status !== 'closed').length,
  }
}
