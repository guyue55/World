import policy from '../../data/ai-boundary-policy.json'
import type { Node, Relation, Visibility } from './types'
import { getAllNodes } from './nodes'
import { getAllRelations } from './relations'
import { canAIIndex, getAIAccess } from './permissions'

export type AIBoundaryIssue = {
  id: string
  severity: 'warning' | 'error'
  message: string
  target?: string
}

function issue(id: string, severity: 'warning' | 'error', message: string, target?: string): AIBoundaryIssue {
  return { id, severity, message, target }
}

export function canAIUseVisibility(visibility: Visibility, action: 'search' | 'summarize' | 'index' | 'recommend'): boolean {
  return Boolean(getAIAccess(visibility)[action])
}

export function evaluateNodeAIBoundary(node: Node): AIBoundaryIssue[] {
  const issues: AIBoundaryIssue[] = []

  if (node.ai?.generated && !node.ai.reviewed && node.visibility === 'public') {
    issues.push(issue(
      `ai-public-unreviewed-${node.id}`,
      'error',
      `AI 生成节点 ${node.id} 未审核却进入公开层。`,
      node.id,
    ))
  }

  if (!canAIIndex(node.visibility) && node.ai?.summary) {
    issues.push(issue(
      `ai-summary-private-${node.id}`,
      'warning',
      `节点 ${node.id} 当前权限不允许 AI 索引，但存在 ai.summary，应确认不是私密内容摘要。`,
      node.id,
    ))
  }

  if (node.layer === 'imagination' && node.visibility === 'public' && !node.tags.includes('imagination')) {
    issues.push(issue(
      `imagination-tag-${node.id}`,
      'warning',
      `想象层公开节点 ${node.id} 建议显式标记 imagination。`,
      node.id,
    ))
  }

  return issues
}

export function evaluateRelationAIBoundary(relation: Relation): AIBoundaryIssue[] {
  if (relation.source === 'ai' && !relation.reviewed) {
    return [
      issue(
        `ai-relation-unreviewed-${relation.id ?? `${relation.from}-${relation.to}`}`,
        'warning',
        'AI 建议星线尚未审核，只能作为候选关系。',
        relation.id,
      ),
    ]
  }

  return []
}

export function evaluateAIBoundary(): AIBoundaryIssue[] {
  return [
    ...getAllNodes().flatMap(evaluateNodeAIBoundary),
    ...getAllRelations().flatMap(evaluateRelationAIBoundary),
  ]
}

export function getAIBoundaryPolicy() {
  return policy
}
