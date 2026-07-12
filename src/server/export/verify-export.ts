import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

const fileSchema = z.object({
  path: z.string().min(1),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  bytes: z.number().int().nonnegative(),
  kind: z.enum(['fact', 'content', 'asset', 'preservation', 'documentation']),
})

const manifestSchema = z.object({
  schemaVersion: z.literal('1.0.0'),
  worldCommit: z.string().regex(/^[a-f0-9]{40}$/),
  createdAt: z.string().datetime(),
  scope: z.literal('public'),
  toolVersion: z.string().regex(/^worldos-export\//),
  counts: z.object({ nodes: z.number().int().nonnegative(), areas: z.number().int().nonnegative(), relations: z.number().int().nonnegative(), paths: z.number().int().nonnegative(), events: z.number().int().nonnegative(), assets: z.number().int().nonnegative() }),
  rootChecksum: z.string().regex(/^[a-f0-9]{64}$/),
  preservationEventId: z.string().min(1),
  files: z.array(fileSchema),
})

const nodeSchema = z.object({ id: z.string().min(1), slug: z.string().min(1), areaId: z.string().min(1), contentPath: z.string().min(1), visibility: z.enum(['public', 'semiPublic']), cover: z.string().optional() }).passthrough()
const areaSchema = z.object({
  id: z.string().min(1),
  defaultVisibility: z.enum(['public', 'semiPublic', 'private', 'family', 'partner', 'vault', 'sealed', 'silent', 'unlisted']),
}).passthrough()
const relationSchema = z.object({ from: z.string().min(1), to: z.string().min(1) }).passthrough()
const pathSchema = z.object({ id: z.string().min(1), nodeSlugs: z.array(z.string()), visibility: z.literal('public'), nextPathIds: z.array(z.string()).optional() }).passthrough()
const eventSchema = z.object({ id: z.string().min(1), nodeIds: z.array(z.string()).optional(), areaIds: z.array(z.string()).optional(), visibility: z.enum(['public', 'semiPublic']).optional() }).passthrough()
const assetRegistrySchema = z.object({
  schemaVersion: z.literal('1.0.0'),
  assets: z.array(z.object({ publicPath: z.string().startsWith('/'), exportedPath: z.string().min(1), sourcePath: z.string().min(1), sha256: z.string().regex(/^[a-f0-9]{64}$/), bytes: z.number().int().nonnegative(), rightsRecordId: z.string().min(1) }).passthrough()),
})

export type VerifiedWorldExport = {
  root: string
  manifest: z.infer<typeof manifestSchema>
  nodes: Array<z.infer<typeof nodeSchema>>
  areas: Array<z.infer<typeof areaSchema>>
  relations: Array<z.infer<typeof relationSchema>>
  paths: Array<z.infer<typeof pathSchema>>
  events: Array<z.infer<typeof eventSchema>>
  assets: z.infer<typeof assetRegistrySchema>['assets']
  checksumEntries: number
}

function sha256(value: string | Buffer) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function listFiles(root: string): string[] {
  const files: string[] = []
  function visit(directory: string) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.isSymbolicLink()) throw new Error(`导出包不得包含符号链接：${path.relative(root, path.join(directory, entry.name))}`)
      const absolute = path.join(directory, entry.name)
      if (entry.isDirectory()) visit(absolute)
      else if (entry.isFile()) files.push(path.relative(root, absolute).split(path.sep).join('/'))
    }
  }
  visit(root)
  return files
}

function resolveManaged(root: string, relativePath: string) {
  const normalized = path.normalize(relativePath)
  const target = path.resolve(root, normalized)
  if (path.isAbsolute(relativePath) || normalized.startsWith('..') || !target.startsWith(`${root}${path.sep}`)) throw new Error(`导出路径越界：${relativePath}`)
  return target
}

function readJson(root: string, relativePath: string): unknown {
  return JSON.parse(fs.readFileSync(resolveManaged(root, relativePath), 'utf8'))
}

function assertUnique(values: string[], label: string) {
  const duplicate = values.find((value, index) => values.indexOf(value) !== index)
  if (duplicate) throw new Error(`${label} 重复：${duplicate}`)
}

export function verifyPublicWorldExport(inputRoot: string): VerifiedWorldExport {
  const root = fs.realpathSync(path.resolve(inputRoot))
  if (!fs.statSync(root).isDirectory()) throw new Error('导出输入必须是目录。')
  const manifest = manifestSchema.parse(readJson(root, 'manifest.json'))
  const actualFiles = listFiles(root)

  const checksumLines = fs.readFileSync(resolveManaged(root, 'checksums.sha256'), 'utf8').trim().split('\n').filter(Boolean)
  const checksumPaths: string[] = []
  for (const line of checksumLines) {
    const match = /^([a-f0-9]{64}) {2}(.+)$/.exec(line)
    if (!match) throw new Error(`checksum 行格式非法：${line}`)
    const [, expected, relativePath] = match
    const target = resolveManaged(root, relativePath)
    if (!fs.statSync(target).isFile()) throw new Error(`checksum 指向非文件：${relativePath}`)
    const actual = sha256(fs.readFileSync(target))
    if (actual !== expected) throw new Error(`checksum 不一致：${relativePath}`)
    checksumPaths.push(relativePath)
  }
  assertUnique(checksumPaths, 'checksum path')
  const expectedChecksumPaths = actualFiles.filter((item) => item !== 'checksums.sha256')
  if (JSON.stringify(checksumPaths.sort()) !== JSON.stringify(expectedChecksumPaths.sort())) throw new Error('checksums.sha256 未精确覆盖除自身外的全部文件。')

  assertUnique(manifest.files.map((file) => file.path), 'manifest file path')
  const payloadPaths = actualFiles.filter((item) => !['manifest.json', 'checksums.sha256'].includes(item)).sort()
  if (JSON.stringify(manifest.files.map((file) => file.path).sort()) !== JSON.stringify(payloadPaths)) throw new Error('manifest files 与导出 payload 不一致。')
  for (const file of manifest.files) {
    const bytes = fs.readFileSync(resolveManaged(root, file.path))
    if (bytes.byteLength !== file.bytes || sha256(bytes) !== file.sha256) throw new Error(`manifest 文件身份不一致：${file.path}`)
  }
  const rootChecksum = sha256([...manifest.files].sort((a, b) => a.path.localeCompare(b.path)).map((file) => `${file.sha256}  ${file.path}`).join('\n'))
  if (rootChecksum !== manifest.rootChecksum) throw new Error('manifest rootChecksum 回算失败。')

  const nodes = z.array(nodeSchema).parse(readJson(root, 'facts/nodes.json'))
  const areas = z.array(areaSchema).parse(readJson(root, 'facts/areas.json'))
  const relations = z.array(relationSchema).parse(readJson(root, 'facts/relations.json'))
  const paths = z.array(pathSchema).parse(readJson(root, 'facts/paths.json'))
  const events = z.array(eventSchema).parse(readJson(root, 'facts/events.json'))
  const registry = assetRegistrySchema.parse(readJson(root, 'assets/registry.json'))
  const rights = z.object({ rights: z.array(z.object({ id: z.string().min(1) }).passthrough()) }).parse(readJson(root, 'preservation/rights.json')).rights
  const preservationEvents = z.object({ events: z.array(z.object({ id: z.string().min(1) }).passthrough()) }).parse(readJson(root, 'preservation/events.json')).events

  const nodeIds = new Set(nodes.map((node) => node.id))
  const nodeSlugs = new Set(nodes.map((node) => node.slug))
  const areaIds = new Set(areas.map((area) => area.id))
  const pathIds = new Set(paths.map((item) => item.id))
  const rightIds = new Set(rights.map((right) => right.id))
  assertUnique(nodes.map((node) => node.id), 'node id')
  assertUnique(nodes.map((node) => node.slug), 'node slug')
  assertUnique(areas.map((area) => area.id), 'area id')
  assertUnique(paths.map((item) => item.id), 'path id')
  assertUnique(events.map((event) => event.id), 'event id')

  for (const node of nodes) {
    if (!areaIds.has(node.areaId)) throw new Error(`节点区域引用断裂：${node.id} -> ${node.areaId}`)
    if (!manifest.files.some((file) => file.path === node.contentPath && file.kind === 'content')) throw new Error(`节点正文未导出：${node.id} -> ${node.contentPath}`)
    if (node.cover && !registry.assets.some((asset) => asset.publicPath === node.cover)) throw new Error(`节点封面未登记：${node.id} -> ${node.cover}`)
  }
  for (const relation of relations) if (!nodeIds.has(relation.from) || !nodeIds.has(relation.to)) throw new Error(`关系引用断裂：${relation.from} -> ${relation.to}`)
  for (const item of paths) {
    for (const slug of item.nodeSlugs) if (!nodeSlugs.has(slug)) throw new Error(`路径节点引用断裂：${item.id} -> ${slug}`)
    for (const next of item.nextPathIds ?? []) if (!pathIds.has(next)) throw new Error(`后续路径引用断裂：${item.id} -> ${next}`)
  }
  for (const event of events) {
    for (const nodeId of event.nodeIds ?? []) if (!nodeIds.has(nodeId)) throw new Error(`事件节点引用断裂：${event.id} -> ${nodeId}`)
    for (const areaId of event.areaIds ?? []) if (!areaIds.has(areaId)) throw new Error(`事件区域引用断裂：${event.id} -> ${areaId}`)
  }
  for (const asset of registry.assets) {
    const target = resolveManaged(root, asset.exportedPath)
    const bytes = fs.readFileSync(target)
    if (bytes.byteLength !== asset.bytes || sha256(bytes) !== asset.sha256) throw new Error(`资产身份不一致：${asset.exportedPath}`)
    if (!rightIds.has(asset.rightsRecordId)) throw new Error(`资产缺少权利记录：${asset.exportedPath}`)
  }
  if (!preservationEvents.some((event) => event.id === manifest.preservationEventId)) throw new Error('manifest 保存事件不存在。')

  const counts = { nodes: nodes.length, areas: areas.length, relations: relations.length, paths: paths.length, events: events.length, assets: registry.assets.length }
  if (JSON.stringify(counts) !== JSON.stringify(manifest.counts)) throw new Error('manifest counts 与事实不一致。')
  return { root, manifest, nodes, areas, relations, paths, events, assets: registry.assets, checksumEntries: checksumLines.length }
}
