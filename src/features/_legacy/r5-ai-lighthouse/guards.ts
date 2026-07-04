import { r5Capabilities, r5ForbiddenActions, r5PublicContextItems, r5ReviewQueue } from './data'

export function assertR5AiLighthouseBoundary() {
  const errors: string[] = []

  for (const item of r5PublicContextItems) {
    if (item.visibility !== 'public') errors.push(`public AI context item must be public: ${item.id}`)
    if (!item.allowedForPublicAI) errors.push(`public AI context item must be explicitly allowed: ${item.id}`)
  }

  for (const capability of r5Capabilities) {
    if (capability.canMutateWorld) errors.push(`AI lighthouse capability cannot mutate world: ${capability.id}`)
    if (capability.canRead.includes('vault') || capability.canRead.includes('private-raw')) errors.push(`AI lighthouse capability cannot read private/vault raw content: ${capability.id}`)
  }

  for (const forbidden of ['read-vault-content', 'read-private-raw-content', 'auto-publish', 'auto-delete', 'overwrite-original', 'change-visibility']) {
    if (!r5ForbiddenActions.includes(forbidden)) errors.push(`missing forbidden action: ${forbidden}`)
  }

  for (const item of r5ReviewQueue) {
    if (!item.mustReview) errors.push(`review queue item must require review: ${item.id}`)
    if (item.risk === 'high' && item.status === 'approved') errors.push(`high risk item cannot be pre-approved: ${item.id}`)
  }

  return errors
}
