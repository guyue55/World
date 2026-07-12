import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import type { AuthorNodeDraft } from '@/lib/author-world-editor'
import type { Node, Path, Relation, WorldEvent } from '@/lib/types'
import { previewAuthorDraft } from './author-impact-preview'

export type AuthorBackupEntry = { relativePath: string; existed: boolean; beforeSha256: string | null; afterSha256: string; backupPath: string | null }
export type AuthorBackupManifest = { version: 1; backupId: string; createdAt: string; draftId: string; status: 'applied' | 'rolled-back'; entries: AuthorBackupEntry[] }

const sourceFiles = ['data/domains/experience/nodes.json', 'data/core/relations.json', 'data/domains/experience/paths.json', 'data/core/world-events.json', 'public/world-index.json', 'public/world-manifest.json']

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

export function applyAuthorTransaction(input: {
  root: string
  draftId: string
  writes: Map<string, string>
  managedPaths: string[]
  afterWrite?: () => void
}) {
  if (!/^[a-z0-9][a-z0-9-]{2,99}$/.test(input.draftId)) throw new Error('事务 draft id 格式无效。')
  const backupId = `author-${Date.now()}-${input.draftId}`
  const backupRoot = path.join(input.root, '.world-author-backups', backupId)
  const manifestPath = path.join(backupRoot, 'manifest.json')
  const relativePaths = [...new Set([...input.managedPaths, ...input.writes.keys()])]
  const entries: AuthorBackupEntry[] = relativePaths.map((relativePath, index) => {
    const target = path.join(input.root, relativePath)
    const existed = fs.existsSync(target)
    const backupPath = existed ? path.join('.world-author-backups', backupId, 'files', `${String(index).padStart(2, '0')}.bak`) : null
    if (existed && backupPath) {
      fs.mkdirSync(path.dirname(path.join(input.root, backupPath)), { recursive: true })
      fs.copyFileSync(target, path.join(input.root, backupPath))
    }
    return { relativePath, existed, beforeSha256: existed ? sha256File(target) : null, afterSha256: '', backupPath }
  })

  try {
    for (const [relativePath, content] of input.writes) atomicWrite(path.join(input.root, relativePath), content)
    for (const relativePath of input.writes.keys()) if (relativePath.endsWith('.json')) readJson(path.join(input.root, relativePath))
    input.afterWrite?.()
    for (const entry of entries) {
      const target = path.join(input.root, entry.relativePath)
      if (!fs.existsSync(target)) throw new Error(`事务产物缺失：${entry.relativePath}`)
      entry.afterSha256 = sha256File(target)
    }
    const manifest: AuthorBackupManifest = { version: 1, backupId, createdAt: new Date().toISOString(), draftId: input.draftId, status: 'applied', entries }
    atomicWrite(manifestPath, json(manifest))
    return { backupId, manifestPath, changedFiles: relativePaths }
  } catch (error) {
    restoreEntries(input.root, entries)
    throw error
  }
}

export function applyAuthorDraft(root: string, draft: AuthorNodeDraft) {
  const preview = previewAuthorDraft(root, draft)
  if (!preview.valid) throw new Error(`草稿未通过预览：${preview.issues.join('；')}`)
  const writes = buildWrites(root, draft)
  const transaction = applyAuthorTransaction({
    root,
    draftId: draft.id,
    writes,
    managedPaths: sourceFiles,
    afterWrite: () => {
    const build = spawnSync(path.join(root, 'node_modules/.bin/tsx'), ['scripts/build-public-json.ts'], { cwd: root, encoding: 'utf8' })
    if (build.status !== 0) throw new Error(`公开索引构建失败：${build.stderr || build.stdout}`)
    const publicIndex = readJson<{ nodes: Array<{ slug: string }> }>(path.join(root, 'public/world-index.json'))
    if (!publicIndex.nodes.some((node) => node.slug === draft.slug)) throw new Error('公开索引未吸收新节点。')
    },
  })
  return { ...transaction, preview }
}
