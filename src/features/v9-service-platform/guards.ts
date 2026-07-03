import { v9ApiContracts, v9IdentityRbac, v9QualitySecurity, v9Roadmap, v9ServiceEvidenceLedger } from './data'

export function assertV9ServiceBoundary() {
  const errors: string[] = []

  if (v9Roadmap.productionLive !== false) errors.push('V9 must not claim productionLive')
  if (v9Roadmap.serviceLive !== false) errors.push('V9 must not claim serviceLive')
  if (v9Roadmap.releaseReady !== false) errors.push('V9 must not claim releaseReady')
  if (v9ServiceEvidenceLedger.serviceLive !== false) errors.push('V9 evidence ledger must keep serviceLive false')

  const serviceAgent = v9IdentityRbac.roles.find((role) => role.id === 'service-agent')
  if (!serviceAgent) errors.push('service-agent role missing')
  if (serviceAgent?.cannot?.includes('read-vault') !== true) errors.push('service-agent must be denied vault read')

  const unsafeContract = v9ApiContracts.contracts.find((contract) => contract.writePolicy === 'auto-publish')
  if (unsafeContract) errors.push(`unsafe auto publish contract: ${unsafeContract.id}`)

  const privacyBudget = v9QualitySecurity.budgets.find((budget) => budget.id === 'privacy-leak')
  if (!privacyBudget) errors.push('privacy leak budget missing')

  return errors
}
