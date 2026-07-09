// 用途：生成 Phase 24 路径与内容质量账本，供状态页和检查脚本复用。
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const OUT = 'data/domains/experience/path-journey-quality-ledger.json'

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf-8'))
}

function isPublicVisible(visibility) {
  return visibility === 'public' || visibility === 'semiPublic'
}

function round(value) {
  return Math.round(value * 100) / 100
}

const contract = readJson('data/world-kernel/worldos-phase24-path-content-quality-contract-v1.json')
const paths = readJson('data/domains/experience/paths.json')
const nodes = readJson('data/domains/experience/nodes.json')
const relations = readJson('data/core/relations.json')

const publicPaths = paths.filter((item) => item.visibility === 'public')
const publicNodes = nodes.filter((item) => isPublicVisible(item.visibility))
const nodeBySlug = new Map(publicNodes.map((node) => [node.slug, node]))
const relationNodeIds = new Set(relations.flatMap((relation) => [relation.from, relation.to]))

function resolvePathNodes(pathItem) {
  return pathItem.nodeSlugs.map((slug) => nodeBySlug.get(slug)).filter(Boolean)
}

function pathIssues(pathItem) {
  const pathNodes = resolvePathNodes(pathItem)
  const issues = []
  if (pathItem.nodeSlugs.length < 4) issues.push('节点少于 4 个')
  if (!pathItem.estimatedMinutes) issues.push('缺少预计阅读时间')
  if (!pathItem.description || pathItem.description.length < 18) issues.push('描述不足 18 字')
  if (pathNodes.length !== pathItem.nodeSlugs.length) issues.push('存在缺失或非公开节点')
  if (pathNodes.some((node) => !relationNodeIds.has(node.id))) issues.push('存在无关系星线节点')
  return issues
}

const pathSummaries = publicPaths.map((pathItem) => {
  const pathNodes = resolvePathNodes(pathItem)
  const areaIds = Array.from(new Set(pathNodes.map((node) => node.areaId)))
  const lifeStages = Array.from(new Set(pathNodes.map((node) => node.lifeStage)))
  const issues = pathIssues(pathItem)

  return {
    id: pathItem.id,
    title: pathItem.title,
    audience: pathItem.audience,
    nodeCount: pathNodes.length,
    areaCount: areaIds.length,
    lifeStageCount: lifeStages.length,
    estimatedMinutes: pathItem.estimatedMinutes ?? null,
    hasNarrativeDescription: Boolean(pathItem.description && pathItem.description.length >= 18),
    hasNextPath: (pathItem.nextPathIds ?? []).length > 0,
    hasExitFallback: true,
    status: issues.length === 0 ? 'passed' : 'needs-review',
    issues
  }
})

const metrics = {
  publicPaths: publicPaths.length,
  publicNodes: publicNodes.filter((node) => node.visibility === 'public').length,
  relations: relations.length,
  pathsWithAtLeastFourNodes: pathSummaries.filter((item) => item.nodeCount >= 4).length,
  pathsWithEstimatedMinutes: pathSummaries.filter((item) => Boolean(item.estimatedMinutes)).length,
  pathsWithNarrativeDescription: pathSummaries.filter((item) => item.hasNarrativeDescription).length,
  pathsWithExitOrNext: pathSummaries.filter((item) => item.hasNextPath || item.hasExitFallback).length,
  pathsWithMultipleAreas: pathSummaries.filter((item) => item.areaCount >= 2).length,
  averageNodesPerPath: round(pathSummaries.reduce((sum, item) => sum + item.nodeCount, 0) / Math.max(1, pathSummaries.length)),
  pathsNeedingReview: pathSummaries.filter((item) => item.status !== 'passed').length
}

function gate(id, label, actual, expected, note) {
  return {
    id,
    label,
    actual,
    expected,
    status: actual >= expected ? 'passed' : 'failed',
    note
  }
}

const minimums = contract.minimums
const gates = [
  gate('public-paths', '公开路径', metrics.publicPaths, minimums.publicPaths, '公开层有足够路径入口。'),
  gate('public-nodes', '公开节点', metrics.publicNodes, minimums.publicNodes, '路径事实源来自公开节点。'),
  gate('relations', '关系星线', metrics.relations, minimums.relations, '节点之间不是孤岛。'),
  gate('four-node-paths', '四步以上路径', metrics.pathsWithAtLeastFourNodes, minimums.pathsWithAtLeastFourNodes, '每条路径至少形成一次完整行走。'),
  gate('estimated-time', '预计阅读时间', metrics.pathsWithEstimatedMinutes, minimums.pathsWithEstimatedMinutes, '访问者可以预期成本。'),
  gate('narrative-description', '叙事描述', metrics.pathsWithNarrativeDescription, minimums.pathsWithNarrativeDescription, '路径不是标签，而是旅程说明。'),
  gate('exit-or-next', '出口保障', metrics.pathsWithExitOrNext, minimums.pathsWithExitOrNext, '读完后可回地图、进档案或继续下一条路径。'),
  gate('multi-area-paths', '跨区域路径', metrics.pathsWithMultipleAreas, minimums.pathsWithMultipleAreas, '路径能把世界区域连接起来。'),
  gate('average-nodes', '平均节点', metrics.averageNodesPerPath, minimums.averageNodesPerPath, '整体路径密度足够支撑探索。')
]

const ledger = {
  name: 'WorldOS Phase 24 路径与内容质量账本',
  generatedAt: new Date().toISOString(),
  status: gates.every((item) => item.status === 'passed') ? 'passed' : 'needs-review',
  scope: contract.scope,
  summary: '路径质量账本把公开路径、节点、关系、阅读时间、跨区域覆盖和出口保障收束为本地可复核事实源。',
  metrics,
  gates,
  pathSummaries,
  nextActions: [
    '优先精修首访、技术、生活、创作者和深潜五类代表路径。',
    '为需要复核的路径补关系解释、真实证据或更清楚的下一步。',
    '继续保持 local-only，外部 Preview / Production 不进入本阶段验收。'
  ],
  releaseStates: contract.releaseStates
}

fs.writeFileSync(path.join(ROOT, OUT), `${JSON.stringify(ledger, null, 2)}\n`)
console.log(`WorldOS path quality ledger written: ${OUT}`)
