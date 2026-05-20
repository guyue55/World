export type V4PluginKind =
  | 'content-plugin'
  | 'ai-plugin'
  | 'export-plugin'
  | 'visualization-plugin'
  | 'import-plugin'
  | 'automation-plugin'
  | 'governance-plugin'

export type V4PluginRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export type V4PluginManifest = {
  name: string
  version: string
  kind: V4PluginKind
  permissions: string[]
  riskLevel: V4PluginRiskLevel
  enabled: boolean
  auditRequired: boolean
}

export const v4DefaultPluginPolicy = {
  enabledByDefault: false,
  requiresOwnerApproval: true,
  rawVaultAccessAllowed: false,
  externalPublishAllowedWithoutReview: false,
}
