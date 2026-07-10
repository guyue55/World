import type { Node, Relation, Visibility } from './types'
import { getAllNodes } from './nodes'
import { getAllRelations } from './relations'
import { getAllPaths } from './paths'
import { mustExcludeFromPublicBuild } from './visibility'

export type GovernanceSeverity = 'info' | 'warning' | 'error'

export type GovernanceIssue = {
  id: string
  severity: GovernanceSeverity
  title: string
  description: string
  target?: string
}

function issue(
  id: string,
  severity: GovernanceSeverity,
  title: string,
  description: string,
  target?: string,
): GovernanceIssue {
  return { id, severity, title, description, target }
}

export function evaluateNodeGovernance(node: Node): GovernanceIssue[] {
  const issues: GovernanceIssue[] = []

  if (node.visibility === 'public' && !node.summary) {
    issues.push(issue(
      `public-summary-${node.id}`,
      'error',
      '公开节点缺少摘要',
      'public 节点必须有 summary，否则首页、搜索和分享都缺少清晰说明。',
      node.id,
    ))
  }

  if (node.ai?.generated && !node.ai.reviewed && node.visibility === 'public') {
    issues.push(issue(
      `ai-review-${node.id}`,
      'error',
      'AI 生成内容未审核却已公开',
      'AI 可以作为草案来源，但未审核内容不得进入公开层。',
      node.id,
    ))
  }

  if (mustExcludeFromPublicBuild(node.visibility) && (
    node.featured?.home ||
    node.featured?.representative ||
    node.featured?.recommended ||
    node.featured?.pathCore
  )) {
    issues.push(issue(
      `private-featured-${node.id}`,
      'error',
      '私密节点被标记为公开精选',
      'private / vault / sealed / silent 等节点不得进入公开推荐位。',
      node.id,
    ))
  }

  if (node.lifeStage === 'seed' && node.featured?.home) {
    issues.push(issue(
      `seed-home-${node.id}`,
      'warning',
      '种子节点进入首页',
      'seed 可以存在，但首页精选更适合 sprout 以上的节点。',
      node.id,
    ))
  }

  return issues
}

export function evaluateRelationGovernance(relations: Relation[]): GovernanceIssue[] {
  const issues: GovernanceIssue[] = []

  relations.forEach((relation) => {
    if (relation.source === 'ai' && !relation.reviewed) {
      issues.push(issue(
        `relation-ai-review-${relation.from}-${relation.to}`,
        'warning',
        'AI 建议星线未审核',
        'AI 生成关系可作为候选，但应审核后再作为正式星线展示。',
        relation.id,
      ))
    }
  })

  return issues
}

export function evaluateWorldGovernance(): GovernanceIssue[] {
  const nodes = getAllNodes()
  const relations = getAllRelations()
  const paths = getAllPaths()

  const issues = [
    ...nodes.flatMap(evaluateNodeGovernance),
    ...evaluateRelationGovernance(relations),
  ]

  if (paths.length < 3) {
    issues.push(issue(
      'path-count',
      'warning',
      '精选路径不足',
      'V1 至少建议有 3 条精选路径，保证第一次来、技术探索、世界创造三种入口。',
    ))
  }

  return issues
}

export function governanceScore(issues = evaluateWorldGovernance()): number {
  const penalty = issues.reduce((sum, item) => {
    if (item.severity === 'error') return sum + 20
    if (item.severity === 'warning') return sum + 8
    return sum + 1
  }, 0)

  return Math.max(0, 100 - penalty)
}

export function visibilityLabel(visibility: Visibility): string {
  const labels: Record<Visibility, string> = {
    public: '公开',
    unlisted: '不列入索引',
    semiPublic: '半公开摘要',
    private: '私密',
    family: '家庭',
    partner: '伴侣',
    vault: '保险箱',
    sealed: '封存',
    silent: '沉默',
  }

  return labels[visibility]
}
