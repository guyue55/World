import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import type { AuthorNodeDraft } from '@/lib/author-world-editor'
import type { Node, Path, Relation, WorldEvent } from '@/lib/types'
import { previewAuthorDraft } from './author-impact-preview'

export type AuthorBackupEntry = { relativePath: string; existed: boolean; beforeSha256: string | null; afterSha256: string; backupPath: string | null }
export type AuthorBackupManifest = { version: 1; backupId: string; createdAt: string; draftId: string; status: 'applied' | 'rolled-back'; entries: AuthorBackupEntry[] }

const sourceFiles = ['data/domains/experience/nodes.json', 'data/core/relations.json', 'data/domains/experience/paths.json', 'data/core/world-events.json', 'public/world-index.json']

export function sha256File(file: string) { return createHash('sha256').update(fs.readFileSync(file)).digest('hex') }
export function atomicWrite(file: string, content: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const temp = `${file}.world-author-${process.pid}-${Date.now()}.tmp`
  fs.writeFileSync(temp, content, 'utf8')
  fs.renameSync(temp, file)
}
function readJson<T>(file: string): T { return JSON.parse(fs.readFileSync(file, 'utf8')) as T }
function json(data: unknown) { return `${JSON.stringify(data, null, 2)}\n` }

function toNode(draft: AuthorNodeDraft): Node {
  return { id: draft.id, slug: draft.slug, title: draft.title, worldTitle: draft.worldTitle, type: draft.type, areaId: draft.areaId, summary: draft.summary, contentPath: draft.contentPath, tags: draft.tags, visibility: 'public', lifeStage: draft.lifeStage ?? 'sprout', source: 'manual', layer: 'interpretation', featured: draft.featured, ai: draft.ai, createdAt: new Date().toISOString().slice(0, 10) }
}

function buildWrites(root: string, draft: AuthorNodeDraft) {
  const nodesFile = path.join(root, sourceFiles[0]); const nodes = readJson<Node[]>(nodesFile)
  const relationsFile = path.join(root, sourceFiles[1]); const relations = readJson<Relation[]>(relationsFile)
  const pathsFile = path.join(root, sourceFiles[2]); const paths = readJson<Path[]>(pathsFile)
  const eventsFile = path.join(root, sourceFiles[3]); const events = readJson<WorldEvent[]>(eventsFile)
  const nextRelations: Relation[] = [...relations, ...(draft.relations ?? []).map((item, index): Relation => ({ id: `rel-${draft.id}-${index + 1}`, from: draft.id, to: item.to, type: item.type, strength: 0.8, source: 'manual', reviewed: true, note: item.note }))]
  const nextPaths = paths.map((item) => (draft.pathIds ?? []).includes(item.id) && !item.nodeSlugs.includes(draft.slug) ? { ...item, nodeSlugs: [...item.nodeSlugs, draft.slug] } : item)
  const nextEvents = draft.eventDraft ? [...events, { ...draft.eventDraft, type: 'node-created' as const, nodeIds: [draft.id], areaIds: [draft.areaId], visibility: 'public' as const, actor: 'creator' as const }] : events
  return new Map<string, string>([
    [sourceFiles[0], json([...nodes, toNode(draft)])],
    [sourceFiles[1], json(nextRelations)],
    [sourceFiles[2], json(nextPaths)],
    [sourceFiles[3], json(nextEvents)],
    [draft.contentPath, `# ${draft.title}\n\n${draft.content?.trim()}\n`],
  ])
}

function restoreEntries(root: string, entries: AuthorBackupEntry[]) {
  for (const entry of entries) {
    const target = path.join(root, entry.relativePath)
    if (!entry.existed) { fs.rmSync(target, { force: true }); continue }
    if (!entry.backupPath) throw new Error(`备份路径缺失：${entry.relativePath}`)
    atomicWrite(target, fs.readFileSync(path.join(root, entry.backupPath), 'utf8'))
  }
}

export function applyAuthorDraft(root: string, draft: AuthorNodeDraft) {
  const preview = previewAuthorDraft(root, draft)
  if (!preview.valid) throw new Error(`草稿未通过预览：${preview.issues.join('；')}`)
  const backupId = `author-${Date.now()}-${draft.id}`
  const backupRoot = path.join(root, '.world-author-backups', backupId)
  const manifestPath = path.join(backupRoot, 'manifest.json')
  const writes = buildWrites(root, draft)
  const relativePaths = [...new Set([...sourceFiles, ...writes.keys()])]
  const entries: AuthorBackupEntry[] = relativePaths.map((relativePath, index) => {
    const target = path.join(root, relativePath); const existed = fs.existsSync(target)
    const backupPath = existed ? path.join('.world-author-backups', backupId, 'files', `${String(index).padStart(2, '0')}.bak`) : null
    if (existed && backupPath) { fs.mkdirSync(path.dirname(path.join(root, backupPath)), { recursive: true }); fs.copyFileSync(target, path.join(root, backupPath)) }
    return { relativePath, existed, beforeSha256: existed ? sha256File(target) : null, afterSha256: '', backupPath }
  })

  try {
    for (const [relativePath, content] of writes) atomicWrite(path.join(root, relativePath), content)
    for (const relativePath of writes.keys()) if (relativePath.endsWith('.json')) readJson(path.join(root, relativePath))
    const build = spawnSync(path.join(root, 'node_modules/.bin/tsx'), ['scripts/build-public-json.ts'], { cwd: root, encoding: 'utf8' })
    if (build.status !== 0) throw new Error(`公开索引构建失败：${build.stderr || build.stdout}`)
    const publicIndex = readJson<{ nodes: Array<{ slug: string }> }>(path.join(root, 'public/world-index.json'))
    if (!publicIndex.nodes.some((node) => node.slug === draft.slug)) throw new Error('公开索引未吸收新节点。')
    for (const entry of entries) entry.afterSha256 = sha256File(path.join(root, entry.relativePath))
    const manifest: AuthorBackupManifest = { version: 1, backupId, createdAt: new Date().toISOString(), draftId: draft.id, status: 'applied', entries }
    atomicWrite(manifestPath, json(manifest))
    return { backupId, manifestPath, preview, changedFiles: relativePaths }
  } catch (error) {
    restoreEntries(root, entries)
    throw error
  }
}
