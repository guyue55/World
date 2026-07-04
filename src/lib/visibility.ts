import type { Visibility } from './types'

export function isPublicVisible(visibility: Visibility): boolean {
  return visibility === 'public' || visibility === 'semiPublic'
}

export function isSearchableVisibility(visibility: Visibility): boolean {
  return visibility === 'public' || visibility === 'semiPublic'
}

export function mustExcludeFromPublicBuild(visibility: Visibility): boolean {
  return ['private', 'family', 'partner', 'vault', 'sealed', 'silent'].includes(visibility)
}
