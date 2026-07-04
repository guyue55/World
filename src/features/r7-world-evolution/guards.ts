import { r7EvolutionBoundary, r7MaintenanceQueue, r7Roadmap, r7WorldLog } from './data'

export function assertR7EvolutionBoundary(): string[] {
  const errors: string[] = []

  if (r7Roadmap.productionLive !== false) errors.push('R7 productionLive must remain false in local package')
  if (r7Roadmap.releaseReady !== false) errors.push('R7 releaseReady must remain false in local package')
  if (r7Roadmap.cleanProductionReady !== false) errors.push('R7 cleanProductionReady must remain false in local package')

  const serialized = JSON.stringify({ r7EvolutionBoundary, r7MaintenanceQueue, r7WorldLog })
  for (const term of r7EvolutionBoundary.forbiddenTerms) {
    if (serialized.includes(`"${term}":true`) || serialized.includes(`"${term}": true`)) {
      errors.push(`forbidden enabled term in R7 boundary: ${term}`)
    }
  }

  const privateLeak = r7WorldLog.find((event) => event.visibility === 'public' && /vault|孩子完整|住宅细节|亲密关系全文/.test(`${event.title}${event.summary}`))
  if (privateLeak) errors.push(`public world log leaks sensitive wording: ${privateLeak.id}`)

  return errors
}
