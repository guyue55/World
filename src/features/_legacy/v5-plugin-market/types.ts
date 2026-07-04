export type V5PluginReviewStatus = 'draft' | 'reviewing' | 'approved' | 'deprecated' | 'blocked'

export type V5PluginPackage = {
  id: string
  name: string
  version: string
  publisher: string
  reviewStatus: V5PluginReviewStatus
  installed: boolean
  enabled: boolean
}

export const v5PluginMarketPolicy = {
  ownerApprovalRequired: true,
  highRiskDefaultDisabled: true,
  schemaValidationRequired: true,
  timeoutRequired: true,
}
