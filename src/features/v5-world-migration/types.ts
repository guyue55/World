export type V5WorldMigrationPlan = {
  id: string
  fromVersion: 'v4'
  toVersion: 'v5'
  requiresImportReview: true
  checksumRequired: true
  compatibilityMatrixRequired: true
}

export type V6EntryCandidate = {
  id: string
  name: string
  formalDevelopmentAllowed: boolean
  requiredEvidence: string[]
}
