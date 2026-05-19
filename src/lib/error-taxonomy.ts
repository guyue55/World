import errorTaxonomy from '../../data/error-taxonomy.json'

export type ErrorLevel = {
  id: 'info' | 'warning' | 'error' | 'critical'
  blocksBuild: boolean
  requiresSnapshotReview?: boolean
  description: string
}

export type ErrorCategory = {
  id: string
  defaultLevel: ErrorLevel['id']
}

export function getErrorTaxonomy() {
  return errorTaxonomy
}

export function getErrorLevels(): ErrorLevel[] {
  return errorTaxonomy.levels as ErrorLevel[]
}

export function getErrorCategories(): ErrorCategory[] {
  return errorTaxonomy.categories as ErrorCategory[]
}

export function getDefaultErrorLevel(categoryId: string): ErrorLevel['id'] {
  return getErrorCategories().find((category) => category.id === categoryId)?.defaultLevel ?? 'warning'
}

export function blocksBuild(level: ErrorLevel['id']): boolean {
  return Boolean(getErrorLevels().find((item) => item.id === level)?.blocksBuild)
}
