// 用途：在隔离工作区验证已有公开节点更新的预览、原子写入、公开投影重建与回滚。
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { parseAuthorUpdateDraft } from '../src/server/authoring/author-update-schema'
import { previewAuthorUpdate } from '../src/server/authoring/author-update-preview'
import { applyAuthorUpdate } from '../src/server/authoring/author-update-transaction'
import { rollbackAuthorDraft } from '../src/server/authoring/author-rollback'
import { sha256File } from '../src/server/authoring/author-transaction'

const root = process.cwd()
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'worldos-author-update-'))
const fixturePath = 'data/fixtures/authoring/representative-node-update.json'
const tracked = [
  'data/domains/experience/nodes.json',
  'data/core/relations.json',
  'data/domains/experience/paths.json',
  'data/core/world-events.json',
  'public/world-index.json',
  'public/world-manifest.json',
  'content/articles/kavita-reader-txt-epub-pipeline.md',
]
const realBefore = Object.fromEntries(tracked.map((file) => [file, sha256File(path.join(root, file))]))

function copy(relative: string) {
  fs.cpSync(path.join(root, relative), path.join(temp, relative), { recursive: true })
}

function writeJson(relative: string, value: unknown) {
  fs.writeFileSync(path.join(temp, relative), `${JSON.stringify(value, null, 2)}\n`)
}

function readJson<T>(relative: string): T {
  return JSON.parse(fs.readFileSync(path.join(temp, relative), 'utf8')) as T
}

for (const relative of ['data', 'content', 'src', 'scripts/build-public-json.ts', 'package.json', 'tsconfig.json', 'next-env.d.ts']) copy(relative)
fs.mkdirSync(path.join(temp, 'public'), { recursive: true })
copy('public/world-index.json')
copy('public/world-manifest.json')
fs.symlinkSync(path.join(root, 'node_modules'), path.join(temp, 'node_modules'), 'dir')

try {
  const raw = JSON.parse(fs.readFileSync(path.join(root, fixturePath), 'utf8'))
  const draft = parseAuthorUpdateDraft(raw)
  const tempBefore = Object.fromEntries(tracked.map((file) => [file, sha256File(path.join(temp, file))]))
  const preview = previewAuthorUpdate(temp, draft)
  assert.equal(preview.valid, true)
  for (const [file, checksum] of Object.entries(tempBefore)) assert.equal(sha256File(path.join(temp, file)), checksum, `preview 写入了 ${file}`)

  const nodesFile = 'data/domains/experience/nodes.json'
  const relationsFile = 'data/core/relations.json'
  const pathsFile = 'data/domains/experience/paths.json'
  const originalNodes = readJson<Array<Record<string, unknown>>>(nodesFile)
  const originalRelations = readJson<Array<Record<string, unknown>>>(relationsFile)
  const originalPaths = readJson<Array<Record<string, unknown>>>(pathsFile)

  writeJson(nodesFile, originalNodes.map((node) => node.id === draft.nodeId ? { ...node, visibility: 'private' } : node))
  assert.equal(previewAuthorUpdate(temp, draft).issues.some((issue) => issue.code === 'visibility-not-public'), true)
  writeJson(nodesFile, originalNodes)

  assert.equal(previewAuthorUpdate(temp, { ...draft, slug: 'wrong-existing-slug' }).issues.some((issue) => issue.code === 'slug-mismatch'), true)

  writeJson(relationsFile, originalRelations.filter((relation) => relation.from !== draft.nodeId && relation.to !== draft.nodeId))
  assert.equal(previewAuthorUpdate(temp, draft).issues.some((issue) => issue.code === 'relations-missing'), true)
  writeJson(relationsFile, originalRelations)

  writeJson(pathsFile, originalPaths.map((item) => ({ ...item, nodeSlugs: Array.isArray(item.nodeSlugs) ? item.nodeSlugs.filter((slug) => slug !== draft.slug) : item.nodeSlugs })))
  assert.equal(previewAuthorUpdate(temp, draft).issues.some((issue) => issue.code === 'public-path-missing'), true)
  writeJson(pathsFile, originalPaths)

  assert.throws(() => parseAuthorUpdateDraft({ ...raw, eventDraft: { ...raw.eventDraft, date: '2026-13-40' } }))
  assert.throws(() => parseAuthorUpdateDraft({ ...raw, asset: { source: 'project-internal', license: '', bytes: 0 } }))

  const applied = applyAuthorUpdate(temp, draft)
  const updatedNodes = readJson<Array<{ id: string; updatedAt?: string }>>(nodesFile)
  const updatedEvents = readJson<Array<{ id: string; type: string; nodeIds?: string[] }>>('data/core/world-events.json')
  const updatedIndex = readJson<{ nodes: Array<{ id: string; updatedAt?: string }>; events: Array<{ id: string }> }>('public/world-index.json')
  const updatedContent = fs.readFileSync(path.join(temp, draft.contentPath), 'utf8')
  assert.ok(updatedContent.includes(draft.expectedPhrase))
  assert.notEqual(sha256File(path.join(temp, draft.contentPath)), draft.baseContentSha256)
  assert.equal(updatedNodes.find((node) => node.id === draft.nodeId)?.updatedAt, draft.eventDraft.date)
  assert.ok(updatedEvents.some((event) => event.id === draft.eventDraft.id && event.type === 'node-updated' && event.nodeIds?.includes(draft.nodeId)))
  assert.equal(updatedIndex.nodes.find((node) => node.id === draft.nodeId)?.updatedAt, draft.eventDraft.date)
  assert.ok(updatedIndex.events.some((event) => event.id === draft.eventDraft.id))

  const manifest = readJson<{ status: string; entries: Array<{ relativePath: string; beforeSha256: string | null; afterSha256: string }> }>(path.relative(temp, applied.manifestPath))
  assert.equal(manifest.status, 'applied')
  assert.ok(manifest.entries.every((entry) => /^[a-f0-9]{64}$/.test(entry.afterSha256) && /^[a-f0-9]{64}$/.test(entry.beforeSha256 ?? '')))
  const restored = rollbackAuthorDraft(temp, applied.backupId)
  assert.equal(restored.restoredFiles.length, applied.changedFiles.length)
  for (const [file, checksum] of Object.entries(tempBefore)) assert.equal(sha256File(path.join(temp, file)), checksum, `rollback 不一致：${file}`)
  for (const [file, checksum] of Object.entries(realBefore)) assert.equal(sha256File(path.join(root, file)), checksum, `真实工作区被修改：${file}`)

  const evidence = {
    previewValid: true,
    negativeCases: ['visibility', 'slug', 'relations', 'path', 'date', 'asset'],
    changedFiles: applied.changedFiles,
    contentChanged: true,
    publicIndexRebuilt: true,
    backupChecksumsVerified: true,
    rollbackRestored: true,
    realWorkspaceUntouched: true,
  }
  console.log(`AUTHOR_UPDATE_EVIDENCE_JSON=${JSON.stringify(evidence)}`)
  console.log(`AUTHOR_UPDATE_TRANSACTION_PASS negativeCases=${evidence.negativeCases.length} rollback=true realWorkspaceUntouched=true`)
} finally {
  fs.rmSync(temp, { recursive: true, force: true })
}
