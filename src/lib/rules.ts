import rules from '../../data/rules.json'
import registry from '../../data/world-protocol-registry.json'
import type { Node, Path, Relation, WorldEvent } from './types'
import { getAllNodes } from './nodes'
import { getAllRelations } from './relations'
import { getAllPaths } from './paths'
import { getAllWorldEvents } from './world-events'

export type RuleSeverity = 'info' | 'warning' | 'error'

export type RuleResult = {
  ruleId: string
  severity: RuleSeverity
  passed: boolean
  message: string
  target?: string
}

export type WorldRule = {
  id: string
  title: string
  description: string
}

export function getAllRules(): WorldRule[] {
  return rules as WorldRule[]
}

function result(
  ruleId: string,
  severity: RuleSeverity,
  passed: boolean,
  message: string,
  target?: string,
): RuleResult {
  return { ruleId, severity, passed, message, target }
}

export function runNodeRules(nodes: Node[] = getAllNodes()): RuleResult[] {
  const results: RuleResult[] = []

  nodes.forEach((node) => {
    results.push(result(
      'rule-public-summary',
      'error',
      !(node.visibility === 'public' && !node.summary),
      node.visibility === 'public' && !node.summary
        ? `公开节点 ${node.id} 缺少 summary。`
        : `节点 ${node.id} 摘要规则通过。`,
      node.id,
    ))

    results.push(result(
      'rule-ai-review',
      'error',
      !(node.ai?.generated && !node.ai.reviewed && node.visibility === 'public'),
      node.ai?.generated && !node.ai.reviewed && node.visibility === 'public'
        ? `AI 生成节点 ${node.id} 未审核却进入公开层。`
        : `节点 ${node.id} AI 审核规则通过。`,
      node.id,
    ))

    const blockedVisibility = registry.publicBuild.blockedVisibility as string[]
    const isPrivate = blockedVisibility.includes(node.visibility)
    const isFeatured = Boolean(
      node.featured?.home ||
      node.featured?.recommended ||
      node.featured?.representative ||
      node.featured?.pathCore,
    )

    results.push(result(
      'rule-private-build',
      'error',
      !(isPrivate && isFeatured),
      isPrivate && isFeatured
        ? `私密节点 ${node.id} 被标记为公开精选。`
        : `节点 ${node.id} 公开构建边界通过。`,
      node.id,
    ))
  })

  return results
}

export function runRelationRules(
  relations: Relation[] = getAllRelations(),
  nodes: Node[] = getAllNodes(),
): RuleResult[] {
  const nodeIds = new Set(nodes.map((node) => node.id))

  return relations.flatMap((relation) => [
    result(
      'rule-relation-from-exists',
      'error',
      nodeIds.has(relation.from),
      nodeIds.has(relation.from)
        ? `关系 ${relation.id ?? relation.from} 的 from 存在。`
        : `关系引用了不存在的 from 节点：${relation.from}`,
      relation.id,
    ),
    result(
      'rule-relation-to-exists',
      'error',
      nodeIds.has(relation.to),
      nodeIds.has(relation.to)
        ? `关系 ${relation.id ?? relation.to} 的 to 存在。`
        : `关系引用了不存在的 to 节点：${relation.to}`,
      relation.id,
    ),
    result(
      'rule-ai-relation-reviewed',
      'warning',
      !(relation.source === 'ai' && !relation.reviewed),
      relation.source === 'ai' && !relation.reviewed
        ? `AI 建议关系 ${relation.id ?? `${relation.from}-${relation.to}`} 尚未审核。`
        : `关系 ${relation.id ?? `${relation.from}-${relation.to}`} 审核状态通过。`,
      relation.id,
    ),
  ])
}

export function runPathRules(
  paths: Path[] = getAllPaths(),
  nodes: Node[] = getAllNodes(),
): RuleResult[] {
  const slugs = new Set(nodes.map((node) => node.slug))

  return paths.flatMap((path) => path.nodeSlugs.map((slug) => result(
    'rule-path-node-exists',
    'error',
    slugs.has(slug),
    slugs.has(slug)
      ? `路径 ${path.id} 引用的节点 ${slug} 存在。`
      : `路径 ${path.id} 引用了不存在的节点 slug：${slug}`,
    path.id,
  )))
}

export function runWorldEventRules(
  events: WorldEvent[] = getAllWorldEvents(),
  nodes: Node[] = getAllNodes(),
): RuleResult[] {
  const nodeIds = new Set(nodes.map((node) => node.id))

  return events.flatMap((event) => (event.nodeIds ?? []).map((nodeId) => result(
    'rule-event-node-exists',
    'error',
    nodeIds.has(nodeId),
    nodeIds.has(nodeId)
      ? `世界事件 ${event.id} 引用的节点 ${nodeId} 存在。`
      : `世界事件 ${event.id} 引用了不存在的节点 ${nodeId}`,
    event.id,
  )))
}

export function runWorldRules(): RuleResult[] {
  const nodes = getAllNodes()
  const relations = getAllRelations()
  const paths = getAllPaths()
  const events = getAllWorldEvents()

  return [
    ...runNodeRules(nodes),
    ...runRelationRules(relations, nodes),
    ...runPathRules(paths, nodes),
    ...runWorldEventRules(events, nodes),
  ]
}

export function getBlockingRuleFailures(results: RuleResult[] = runWorldRules()): RuleResult[] {
  return results.filter((item) => !item.passed && item.severity === 'error')
}
