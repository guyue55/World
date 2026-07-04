import { r1DeploymentRunbook, r1QualityGates, r1ReleaseCandidateManifest, r1Roadmap } from './data'

export function assertR1ProductionBoundary() {
  const errors: string[] = []

  if (r1Roadmap.productionLive !== false) errors.push('R1 must not mark productionLive=true before external deployment.')
  if (r1Roadmap.releaseReady !== false) errors.push('R1 must not mark releaseReady=true before owner signoff.')
  if (r1Roadmap.cleanProductionReady !== false) errors.push('R1 must keep cleanProductionReady=false until production evidence is complete.')
  if (r1ReleaseCandidateManifest.productionLive !== false) errors.push('R1 RC manifest must keep productionLive=false.')
  if (!r1DeploymentRunbook.manualSignoffRequired) errors.push('R1 deployment runbook must require manual signoff.')
  if (r1QualityGates.externalEvidence.some((item) => item.status !== 'pending-external-environment' && item.status !== 'pending-owner-signoff')) {
    errors.push('R1 external evidence must remain pending until real deployment happens.')
  }

  return errors
}
