export type V4PublishingChannel =
  | 'static-site'
  | 'rss'
  | 'markdown-bundle'
  | 'json-api'
  | 'worldbook'
  | 'exhibition-page'
  | 'pdf'
  | 'epub'
  | 'social-summary'

export type V4PublishingGate = {
  channel: V4PublishingChannel
  requiresReview: boolean
  rollbackRequired: boolean
  checksumRequired: boolean
}

export const v4PublishingGates: V4PublishingGate[] = [
  { channel: 'static-site', requiresReview: true, rollbackRequired: true, checksumRequired: true },
  { channel: 'rss', requiresReview: true, rollbackRequired: true, checksumRequired: true },
  { channel: 'pdf', requiresReview: true, rollbackRequired: true, checksumRequired: true },
  { channel: 'social-summary', requiresReview: true, rollbackRequired: false, checksumRequired: false },
]
