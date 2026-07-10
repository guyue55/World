// 用途：验证 M21 内容生命循环，生成单节点多场景吸收报告
import fs from 'node:fs'
import path from 'node:path'
import { getPublicWorldObjectIndex } from '../src/lib/public-world-objects'
import { buildContentLifeLoopFacts, type ContentLifeLoopFact } from '../src/lib/content-life'

const root = process.cwd()
const rel = (file: string) => path.join(root, file)
const reportPath = rel('docs/90-archive/reports/worldos-m21-content-life-loop-report.json')
const failures: string[] = []

const publicWorld = getPublicWorldObjectIndex()
const loopFacts = buildContentLifeLoopFacts({
  nodes: publicWorld.nodes,
  paths: publicWorld.paths,
  relations: publicWorld.relations,
  events: publicWorld.events,
})
const nodeById = new Map(publicWorld.nodes.map((node) => [node.id, node]))
const completeFacts = loopFacts.filter((fact) => fact.absorptionScore === 5)
const featuredCompleteFacts = completeFacts.filter((fact) => {
  const node = nodeById.get(fact.id)
  return Boolean(node?.featured?.home || node?.featured?.representative || node?.featured?.recommended || node?.featured?.pathCore || node?.featured?.timelineKey)
})
const coreFacts = completeFacts
  .sort((a, b) => {
    const aWeight = a.relationReasons.length + a.pathIds.length * 2 + a.timelineEventIds.length * 2
    const bWeight = b.relationReasons.length + b.pathIds.length * 2 + b.timelineEventIds.length * 2
    return bWeight - aWeight || a.slug.localeCompare(b.slug)
  })
  .slice(0, 30)

function fail(message: string) {
  failures.push(message)
}

function read(file: string) {
  return fs.readFileSync(rel(file), 'utf8')
}

function assert(condition: unknown, message: string) {
  if (!condition) fail(message)
}

function summarizeFact(fact: ContentLifeLoopFact) {
  return {
    id: fact.id,
    slug: fact.slug,
    title: fact.title,
    areaId: fact.areaId,
    lifeStage: fact.lifeStage,
    status: fact.status,
    absorptionScore: fact.absorptionScore,
    absorptionScenes: fact.absorptionScenes,
    relationReasonCount: fact.relationReasons.length,
    pathIds: fact.pathIds,
    timelineEventIds: fact.timelineEventIds,
    authorImpactScope: fact.authorImpactScope,
  }
}

assert(loopFacts.length >= 50, `内容生命事实过少：${loopFacts.length}`)
assert(completeFacts.length >= 30, `5/5 多场景吸收节点不足：${completeFacts.length}/30`)
assert(coreFacts.length >= 30, `核心节点 5/5 多场景吸收不足：${coreFacts.length}/30`)

for (const fact of coreFacts) {
  for (const scene of ['atlas', 'timeline', 'archive', 'paths', 'lighthouse'] as const) {
    assert(fact.absorptionScenes.includes(scene), `${fact.slug} 未被 ${scene} 吸收`)
  }
  assert(fact.relationReasons.length > 0, `${fact.slug} 缺少关系 reason`)
  assert(fact.pathIds.length > 0, `${fact.slug} 缺少路径位置`)
  assert(fact.timelineEventIds.length > 0, `${fact.slug} 缺少时间痕迹`)
  assert(fact.aiReadableSummary.length >= 24, `${fact.slug} 灯塔可读摘要过短`)
}

const contentLifeSource = read('src/lib/content-life.ts')
for (const token of ['ContentLifeLoopFact', 'absorptionScenes', 'authorImpactScope', 'buildContentLifeLoopFacts']) {
  assert(contentLifeSource.includes(token), `内容生命循环模型缺少 ${token}`)
}

const nodePageSource = read('src/app/node/[slug]/page.tsx')
for (const token of ['buildContentLifeLoopFact', 'NodeLifeLoopPanel', 'contentLifeLoopFact']) {
  assert(nodePageSource.includes(token), `节点页缺少 M21 循环证据：${token}`)
}

const nodeLoopPanelSource = read('src/components/node/NodeLifeLoopPanel.tsx')
for (const token of ['data-testid="node-life-loop-panel"', 'data-content-life-loop-scene', 'data-content-life-loop-active', '/ask']) {
  assert(nodeLoopPanelSource.includes(token), `NodeLifeLoopPanel 缺少场景吸收证据：${token}`)
}
assert(!nodeLoopPanelSource.includes('private') && !nodeLoopPanelSource.includes('vault'), 'M21 公开面板不得展示私密或 vault 语义')

const lighthouseRuntimeSource = read('src/server/ai/lighthouse-runtime.ts')
for (const token of ['relationReasons', 'aiReadableSummary', 'pathIds', 'timelineEventIds']) {
  assert(lighthouseRuntimeSource.includes(token), `灯塔公开事实源缺少内容生命循环字段：${token}`)
}

const report = {
  generatedAt: new Date().toISOString(),
  status: failures.length ? 'failed' : 'passed',
  purpose: 'M21 内容生命循环：证明单节点能被 Atlas / Timeline / Archive / Paths / Lighthouse 同时吸收。',
  totals: {
    publicNodes: publicWorld.nodes.length,
    publicPaths: publicWorld.paths.length,
    publicRelations: publicWorld.relations.length,
    publicEvents: publicWorld.events.length,
    loopFacts: loopFacts.length,
    completeAbsorptionFacts: completeFacts.length,
    featuredCompleteFacts: featuredCompleteFacts.length,
    coreCompleteFacts: coreFacts.length,
  },
  representativeNode: coreFacts[0] ? summarizeFact(coreFacts[0]) : null,
  coreFacts: coreFacts.map(summarizeFact),
  authorMaintenanceSignal: {
    description: '作者新增或修改公开节点后，可通过本报告看到该节点进入了哪些场景、缺少哪类吸收，以及对 Atlas / Timeline / Archive / Paths / Lighthouse 的影响范围。',
    reportPath: path.relative(root, reportPath),
  },
  failures,
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true })
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

if (failures.length) {
  console.error('WorldOS M21 content life loop check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`WorldOS M21 content life loop check passed: ${coreFacts.length} core nodes, ${completeFacts.length} complete absorption facts`)
