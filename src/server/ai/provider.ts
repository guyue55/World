import { buildAIContextSlice, type AIContextCandidate } from './context-policy'
import { createDisabledProviderReviewItem } from './review-queue'

export type LocalAIProviderStatus = {
  status: 'disabled-dry-run'
  serverOnly: true
  realTimeAIProviderEnabled: false
  readsProviderKeys: false
  performsNetworkRequest: false
  writesWorldSource: false
}

export const localAIProviderStatus: LocalAIProviderStatus = {
  status: 'disabled-dry-run',
  serverOnly: true,
  realTimeAIProviderEnabled: false,
  readsProviderKeys: false,
  performsNetworkRequest: false,
  writesWorldSource: false,
}

export function getLocalAIProviderStatus(): LocalAIProviderStatus {
  return localAIProviderStatus
}

export function prepareDisabledAIProviderDraft(candidates: AIContextCandidate[]) {
  const context = buildAIContextSlice(candidates)
  const reviewItem = createDisabledProviderReviewItem()

  return {
    provider: localAIProviderStatus,
    context,
    reviewItem,
    note: '真实 AI Provider 尚未启用；本地阶段只验证后端边界、上下文裁剪和人工审核队列。',
  }
}
