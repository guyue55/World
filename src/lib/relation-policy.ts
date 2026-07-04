import relationPolicy from '../../data/domains/governance/relation-policy.json'
import type { Relation } from './types'
import { getAllRelations } from './relations'

export type RelationPolicyIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
}

export function getRelationPolicy() {
  return relationPolicy
}

export function validateRelationPolicy(relations: Relation[] = getAllRelations()): RelationPolicyIssue[] {
  const issues: RelationPolicyIssue[] = []

  relations.forEach((relation) => {
    if (relation.source === 'ai' && !relation.reviewed) {
      issues.push({
        id: `ai-relation-${relation.id ?? `${relation.from}-${relation.to}`}`,
        severity: 'warning',
        message: 'AI 关系必须审核后才能作为正式星线。',
      })
    }

    if (relation.strength === 1.0 && !relation.note && relation.source !== 'manual') {
      issues.push({
        id: `core-relation-note-${relation.id ?? `${relation.from}-${relation.to}`}`,
        severity: 'warning',
        message: '核心强度关系应有 note 或人工来源。',
      })
    }
  })

  return issues
}
