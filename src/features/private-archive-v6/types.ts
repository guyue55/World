export type V6ArchiveLayerId = 'public' | 'semiPublic' | 'private' | 'family' | 'partner' | 'vault' | 'sealed'

export type V6PublicBuildPolicy = 'included' | 'included-redacted' | 'excluded'

export interface V6PrivacyLayer {
  id: V6ArchiveLayerId
  label: string
  publicBuild: V6PublicBuildPolicy
  aiReadable: boolean
  requiresHumanReviewBeforePublish: boolean
  description: string
}

export interface V6ArchiveRecord {
  id: string
  title: string
  layer: V6ArchiveLayerId
  status: 'indexed-redacted' | 'sealed-signal-only' | 'vault-signal-only'
  tags: string[]
  period: string
  summary: string
  containsRawPrivateContent: boolean
  aiReadableSummary: string
}

export interface V6TimeCapsule {
  id: string
  title: string
  visibility: V6ArchiveLayerId
  openRule: string
  scheduledHint: string
  publicSignal: string
  aiRole: string
  rawContentStoredHere: boolean
}

export interface V6PrivateArchiveDashboard {
  totalRecords: number
  excludedFromPublicBuild: number
  aiReadableRecords: number
  reviewRequiredLayers: number
  vaultSignals: number
  sealedSignals: number
  productionLive: false
}

export interface V6ArchiveExportPlan {
  id: string
  label: string
  allowed: boolean
  requiresOwnerReview: boolean
  includesRawPrivateContent: boolean
  description: string
}
