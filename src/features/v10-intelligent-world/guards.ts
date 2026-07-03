import { v10AiAgentRoles, v10GovernanceSovereignty, v10QualityResilience } from './data'

export function assertV10IntelligentWorldBoundary() {
  const errors: string[] = []
  if (v10AiAgentRoles.policy.canAutoPublish !== false) errors.push('V10 AI must not auto publish')
  if (v10AiAgentRoles.policy.canAutoDelete !== false) errors.push('V10 AI must not auto delete')
  if (v10AiAgentRoles.policy.canReadVault !== false) errors.push('V10 AI must not read vault')
  if (!v10GovernanceSovereignty.auditPolicy.appendOnly) errors.push('V10 audit must be append-only')
  if (!v10GovernanceSovereignty.auditPolicy.humanSignoffRequired) errors.push('V10 human signoff is required')
  if (v10QualityResilience.productionLive !== false) errors.push('V10 productionLive must remain false')
  if (v10QualityResilience.cleanProductionReady !== false) errors.push('V10 cleanProductionReady must remain false')
  return errors
}
