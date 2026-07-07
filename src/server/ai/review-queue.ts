export type AIReviewQueueItem = {
  id: string
  title: string
  sourceTier: 'public' | 'semiPublic'
  execution: 'not-executed'
  requiredHumanAction: true
  writesWorldSource: false
  createdAt: string
}

export function createAIReviewQueueItem(input: {
  id: string
  title: string
  sourceTier: 'public' | 'semiPublic'
  createdAt?: string
}): AIReviewQueueItem {
  return {
    id: input.id,
    title: input.title,
    sourceTier: input.sourceTier,
    execution: 'not-executed',
    requiredHumanAction: true,
    writesWorldSource: false,
    createdAt: input.createdAt ?? 'local-dry-run',
  }
}

export function createDisabledProviderReviewItem(title = 'AI Provider 本地禁用态建议'): AIReviewQueueItem {
  return createAIReviewQueueItem({
    id: 'local-disabled-provider-review',
    title,
    sourceTier: 'public',
  })
}
