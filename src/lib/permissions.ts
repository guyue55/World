import permissions from '../../data/domains/governance/permissions.json'
import aiBoundaryPolicy from '../../data/domains/ai/ai-boundary-policy.json'
import type { Visibility } from './types'

export type PermissionRecord = {
  visibility: Visibility
  searchable: boolean
  recommendable: boolean
  aiIndexable: boolean
  buildTarget: 'public' | 'private' | 'vault' | 'none'
}

export type AIAccess = {
  search: boolean
  summarize: boolean
  index: boolean
  recommend: boolean
}

export function getPermissionMatrix(): PermissionRecord[] {
  return permissions as PermissionRecord[]
}

export function getPermission(visibility: Visibility): PermissionRecord {
  const record = getPermissionMatrix().find((item) => item.visibility === visibility)
  if (!record) throw new Error(`Missing permission for visibility: ${visibility}`)
  return record
}

export function canEnterPublicBuild(visibility: Visibility): boolean {
  return getPermission(visibility).buildTarget === 'public'
}

export function canSearch(visibility: Visibility): boolean {
  return getPermission(visibility).searchable
}

export function canRecommend(visibility: Visibility): boolean {
  return getPermission(visibility).recommendable
}

export function canAIIndex(visibility: Visibility): boolean {
  return getPermission(visibility).aiIndexable
}

export function getAIAccess(visibility: Visibility): AIAccess {
  return aiBoundaryPolicy.visibilityAccess[visibility] as AIAccess
}

export function assertPermissionConsistency(): void {
  getPermissionMatrix().forEach((permission) => {
    const aiAccess = getAIAccess(permission.visibility)

    if (!permission.searchable && aiAccess.search) {
      throw new Error(`AI search cannot be broader than world search: ${permission.visibility}`)
    }

    if (!permission.aiIndexable && aiAccess.index) {
      throw new Error(`AI index cannot exceed permission matrix: ${permission.visibility}`)
    }

    if (permission.buildTarget !== 'public' && permission.recommendable) {
      throw new Error(`Non-public build target cannot be recommendable: ${permission.visibility}`)
    }
  })
}
