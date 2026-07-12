// 用途：回算一份公开内容更新是否由同一事实源进入六个体验投影与可移植导出。
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'
import { buildArchiveViewModel } from '@/lib/scenes/build-archive-model'
import { buildAtlasViewModel } from '@/lib/scenes/build-atlas-model'
import { buildNodePlaceModel } from '@/lib/scenes/build-node-model'
import { buildPathDetailModel } from '@/lib/scenes/build-path-model'
import { buildTimelineViewModel } from '@/lib/scenes/build-timeline-model'
import { getPublicWorldObjectIndex } from '@/lib/public-world-objects'
import { runLowLightLighthouse } from '@/server/ai/lighthouse-runtime'

const projectionNames = ['atlas', 'timeline', 'archive', 'paths', 'node', 'lighthouse', 'export'] as const
const projectionExpectationSchema = z.union([
  z.object({ applicable: z.literal(true), requiredEvidence: z.array(z.string().min(1)).min(1) }),
  z.object({ applicable: z.literal(false), reasonCode: z.string().min(1), reason: z.string().min(12) }),
])
const updateContractSchema = z.object({
  schemaVersion: z.literal('1.0.0'),
  operation: z.literal('update'),
  updateId: z.string().min(1),
  nodeId: z.string().min(1),
  slug: z.string().min(1),
  contentPath: z.string().min(1),
  baseContentSha256: z.string().regex(/^[a-f0-9]{64}$/),
  expectedPhrase: z.string().min(8),
  appendMarkdown: z.string().min(80),
  eventDraft: z.object({ id: z.string().min(1), title: z.string().min(2), date: z.string().date(), description: z.string().min(12) }),
  expectedProjections: z.object(Object.fromEntries(projectionNames.map((name) => [name, projectionExpectationSchema])) as Record<typeof projectionNames[number], typeof projectionExpectationSchema>),
})

type ProjectionResult = { applicable: boolean; passed: boolean; evidence: Record<string, unknown>; reasonCode?: string; reason?: string }
const root = process.cwd()
const contractPath = path.join(root, 'data/fixtures/authoring/representative-node-update.json')
const contract = updateContractSchema.parse(JSON.parse(fs.readFileSync(contractPath, 'utf8')))
const failures: string[] = []
const results = {} as Record<typeof projectionNames[number], ProjectionResult>

function sha256File(file: string) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

function revisionOf(value: unknown): string | null {
  if (!value || typeof value !== 'object') return null
  const revision = (value as Record<string, unknown>).contentRevisionSha256
  return typeof revision === 'string' && /^[a-f0-9]{64}$/.test(revision) ? revision : null
}

function record(name: typeof projectionNames[number], passed: boolean, evidence: Record<string, unknown>) {
  const expected = contract.expectedProjections[name]
  if (!expected.applicable) {
    results[name] = { applicable: false, passed: true, evidence, reasonCode: expected.reasonCode, reason: expected.reason }
    return
  }
  results[name] = { applicable: true, passed, evidence }
  if (!passed) failures.push(`${name}: 公开内容更新未提供 ${expected.requiredEvidence.join(', ')}`)
}

const contentFile = path.join(root, contract.contentPath)
const content = fs.readFileSync(contentFile, 'utf8')
const contentRevisionSha256 = sha256File(contentFile)
const world = getPublicWorldObjectIndex()
const node = world.nodeById.get(contract.nodeId)
if (!node || node.visibility !== 'public' || node.slug !== contract.slug) failures.push('source: 代表节点不存在、非公开或 slug 漂移')

const atlasNode = buildAtlasViewModel(world).nodes.find((item) => item.id === contract.nodeId)
record('atlas', Boolean(atlasNode && revisionOf(atlasNode) === contentRevisionSha256), { nodeId: atlasNode?.id ?? null, areaId: atlasNode?.areaId ?? null, contentRevisionSha256: revisionOf(atlasNode) })

const timelineEvent = buildTimelineViewModel(world).events.find((item) => item.id === contract.eventDraft.id && item.nodeHref === `/node/${contract.slug}`)
record('timeline', Boolean(timelineEvent && revisionOf(timelineEvent) === contentRevisionSha256), { eventId: timelineEvent?.id ?? null, nodeId: timelineEvent?.nodeHref ?? null, contentRevisionSha256: revisionOf(timelineEvent) })

const archiveRecord = buildArchiveViewModel(world).records.find((item) => item.id === contract.nodeId)
record('archive', Boolean(archiveRecord && `${archiveRecord.title} ${archiveRecord.summary}`.includes(contract.expectedPhrase) && revisionOf(archiveRecord) === contentRevisionSha256), { nodeId: archiveRecord?.id ?? null, searchPhrase: contract.expectedPhrase, contentRevisionSha256: revisionOf(archiveRecord) })

const pathModel = buildPathDetailModel(world, 'tech-ai')
const pathStep = pathModel?.steps.find((item) => item.slug === contract.slug)
record('paths', Boolean(pathStep && revisionOf(pathStep) === contentRevisionSha256), { pathId: pathModel?.id ?? null, nodeId: pathStep?.slug ?? null, contentRevisionSha256: revisionOf(pathStep) })

const nodeModel = node ? buildNodePlaceModel({ index: world, node, readingMinutes: null, groups: [], pathContext: null }) : null
record('node', Boolean(nodeModel && content.includes(contract.expectedPhrase) && revisionOf(nodeModel) === contentRevisionSha256), { nodeId: nodeModel?.node.id ?? null, contentPath: nodeModel?.node.contentPath ?? null, contentRevisionSha256: revisionOf(nodeModel) })

const lighthouse = runLowLightLighthouse(contract.expectedPhrase)
const lighthouseSource = lighthouse.sources.find((source) => source.slug === contract.slug)
record('lighthouse', Boolean(lighthouseSource && revisionOf(lighthouseSource) === contentRevisionSha256), { sourceId: lighthouseSource?.slug ?? null, searchPhrase: contract.expectedPhrase, contentRevisionSha256: revisionOf(lighthouseSource) })

const exportManifestPath = path.join(root, 'exports/living-world-current/manifest.json')
let exportEntry: Record<string, unknown> | null = null
if (fs.existsSync(exportManifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(exportManifestPath, 'utf8')) as { files?: Array<Record<string, unknown>> }
  exportEntry = manifest.files?.find((entry) => entry.path === contract.contentPath) ?? null
}
record('export', Boolean(exportEntry && exportEntry.sha256 === contentRevisionSha256), { manifestPath: fs.existsSync(exportManifestPath) ? exportManifestPath : null, contentPath: exportEntry?.path ?? null, contentRevisionSha256: exportEntry?.sha256 ?? null })

if (contentRevisionSha256 === contract.baseContentSha256 || !content.includes(contract.expectedPhrase)) {
  failures.push('source: 代表内容更新尚未应用，正文 hash 与期望短语仍处于 before 状态')
}

if (failures.length) {
  console.error(`CONTENT_PROJECTION_CONTRACT_FAIL findings=${failures.length}`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  console.error(`CONTENT_PROJECTION_RESULTS=${JSON.stringify(results)}`)
  process.exit(1)
}

console.log(`CONTENT_PROJECTION_CONTRACT_PASS update=${contract.updateId} revision=${contentRevisionSha256}`)
