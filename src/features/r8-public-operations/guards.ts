import { r8PrivacyReleaseGuard, r8ReleaseChannels, r8Roadmap, r8SeoPublicationPlan } from './data'

export function assertR8PublicOperationsBoundary(): string[] {
  const errors: string[] = []

  if (r8Roadmap.productionLive !== false) errors.push('R8 productionLive must remain false until external deployment is signed off')
  if (r8Roadmap.releaseReady !== false) errors.push('R8 releaseReady must remain false until preview and production smoke tests are real')
  if (r8Roadmap.cleanProductionReady !== false) errors.push('R8 cleanProductionReady must remain false in this local package')

  const privateRoutePublished = r8SeoPublicationPlan.publicRoutes.some((route) => route.includes('private'))
  if (privateRoutePublished) errors.push('private routes must not appear in R8 public route list')

  const channelWithUnsafeVisibility = r8ReleaseChannels.find((channel) => channel.visibility !== 'public')
  if (channelWithUnsafeVisibility) errors.push(`public release channel ${channelWithUnsafeVisibility.id} must be public`)

  if (!r8PrivacyReleaseGuard.forbiddenTokens.includes('vaultRaw')) errors.push('privacy release guard must block vaultRaw')
  if (!r8PrivacyReleaseGuard.forbiddenTokens.includes('autoPublish:true')) errors.push('privacy release guard must block autoPublish:true')

  return errors
}

export function canPublishPublicly(input: { visibility: string; hasOwnerReview: boolean; hasPrivacyScan: boolean; hasAiDraft: boolean }): boolean {
  if (input.visibility !== 'public') return false
  if (!input.hasOwnerReview) return false
  if (!input.hasPrivacyScan) return false
  if (input.hasAiDraft) return false
  return true
}
