import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { parseAuthorDraft } from '../src/server/authoring/author-draft-schema'
import { previewAuthorDraft } from '../src/server/authoring/author-impact-preview'
import { applyAuthorDraft, sha256File } from '../src/server/authoring/author-transaction'
import { rollbackAuthorDraft } from '../src/server/authoring/author-rollback'

const root = process.cwd()
const trackedFacts = ['data/domains/experience/nodes.json', 'data/core/relations.json', 'data/domains/experience/paths.json', 'data/core/world-events.json', 'public/world-index.json']
const realBefore = Object.fromEntries(trackedFacts.map((file) => [file, sha256File(path.join(root, file))]))
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'worldos-authoring-'))

function copy(relative: string) { fs.cpSync(path.join(root, relative), path.join(temp, relative), { recursive: true }) }
for (const relative of ['data', 'content', 'src', 'scripts/build-public-json.ts', 'package.json', 'tsconfig.json', 'next-env.d.ts']) copy(relative)
fs.mkdirSync(path.join(temp, 'public'), { recursive: true })
for (const relative of ['public/world-index.json', 'public/world-manifest.json']) copy(relative)
fs.symlinkSync(path.join(root, 'node_modules'), path.join(temp, 'node_modules'), 'dir')

try {
  const valid = parseAuthorDraft(JSON.parse(fs.readFileSync(path.join(root, 'data/fixtures/authoring/valid-node-draft.json'), 'utf8')))
  assert.throws(() => parseAuthorDraft(JSON.parse(fs.readFileSync(path.join(root, 'data/fixtures/authoring/invalid-private-leak-draft.json'), 'utf8'))))
  assert.equal(previewAuthorDraft(temp, valid).valid, true)
  assert.equal(previewAuthorDraft(temp, { ...valid, slug: 'world-manifesto', id: 'node-duplicate-slug' }).valid, false)
  assert.equal(previewAuthorDraft(temp, { ...valid, id: 'node-missing-relation', slug: 'missing-relation', relations: [{ ...valid.relations![0]!, to: 'node-does-not-exist' }] }).valid, false)

  const tempBefore = Object.fromEntries(trackedFacts.map((file) => [file, sha256File(path.join(temp, file))]))
  const applied = applyAuthorDraft(temp, valid)
  const nodes = JSON.parse(fs.readFileSync(path.join(temp, trackedFacts[0]), 'utf8'))
  const paths = JSON.parse(fs.readFileSync(path.join(temp, trackedFacts[2]), 'utf8'))
  const events = JSON.parse(fs.readFileSync(path.join(temp, trackedFacts[3]), 'utf8'))
  const publicIndex = JSON.parse(fs.readFileSync(path.join(temp, trackedFacts[4]), 'utf8'))
  assert.ok(nodes.some((node: { slug: string }) => node.slug === valid.slug))
  assert.ok(paths.find((item: { id: string }) => item.id === 'first-visit').nodeSlugs.includes(valid.slug))
  assert.ok(events.some((event: { id: string }) => event.id === valid.eventDraft?.id))
  assert.ok(publicIndex.nodes.some((node: { slug: string }) => node.slug === valid.slug))
  assert.ok(fs.existsSync(path.join(temp, valid.contentPath)))
  const restored = rollbackAuthorDraft(temp, applied.backupId)
  assert.equal(restored.restoredFiles.length, applied.changedFiles.length)
  for (const [file, checksum] of Object.entries(tempBefore)) assert.equal(sha256File(path.join(temp, file)), checksum, `回滚不一致：${file}`)
  assert.equal(fs.existsSync(path.join(temp, valid.contentPath)), false)

  const tamperApply = applyAuthorDraft(temp, valid)
  fs.appendFileSync(path.join(temp, trackedFacts[0]), '\n')
  assert.throws(() => rollbackAuthorDraft(temp, tamperApply.backupId), /拒绝覆盖/)

  for (const [file, checksum] of Object.entries(realBefore)) assert.equal(sha256File(path.join(root, file)), checksum, `真实工作区被测试修改：${file}`)
  console.log(`C8 authoring check passed. preview=true apply=${applied.changedFiles.length} rollback=${restored.restoredFiles.length} tamperRejected=true realWorkspaceUntouched=true`)
} finally {
  fs.rmSync(temp, { recursive: true, force: true })
}
