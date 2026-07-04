export type V5WorldTrustLevel = 'public' | 'trusted' | 'family' | 'private' | 'blocked'

export type V5FederatedWorld = {
  id: string
  name: string
  endpoint: string
  trustLevel: V5WorldTrustLevel
  ownerApprovalRequired: boolean
}

export type V5CrossWorldReference = {
  sourceWorldId: string
  targetWorldId: string
  nodeId: string
  snapshotChecksum: string
  includesPrivateRawContent: false
}

export const v5FederationPolicy = {
  rawVaultReplicationAllowed: false,
  manualMergeRequired: true,
  auditRequired: true,
}
