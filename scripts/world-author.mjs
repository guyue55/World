#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { parseAuthorDraft } from '../src/server/authoring/author-draft-schema.ts'
import { previewAuthorDraft } from '../src/server/authoring/author-impact-preview.ts'
import { applyAuthorDraft } from '../src/server/authoring/author-transaction.ts'
import { rollbackAuthorDraft } from '../src/server/authoring/author-rollback.ts'
import { parseAuthorUpdateDraft } from '../src/server/authoring/author-update-schema.ts'
import { previewAuthorUpdate } from '../src/server/authoring/author-update-preview.ts'
import { applyAuthorUpdate } from '../src/server/authoring/author-update-transaction.ts'

const root = path.resolve(import.meta.dirname, '..')
const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, item, index, all) => item.startsWith('--') ? [...pairs, [item.slice(2), all[index + 1] && !all[index + 1].startsWith('--') ? all[index + 1] : true]] : pairs, []))
const mode = args.mode

try {
  if (mode === 'rollback') {
    if (typeof args.backup !== 'string') throw new Error('rollback 需要 --backup <backup-id>。')
    console.log(JSON.stringify({ mode, ...rollbackAuthorDraft(root, args.backup) }, null, 2))
  } else {
    if (typeof args.draft !== 'string') throw new Error('preview/apply 需要 --draft <绝对或相对 JSON 路径>。')
    const input = JSON.parse(fs.readFileSync(path.resolve(root, args.draft), 'utf8'))
    if (input?.operation === 'update') {
      const draft = parseAuthorUpdateDraft(input)
      if (mode === 'preview') console.log(JSON.stringify({ mode, draftId: draft.updateId, ...previewAuthorUpdate(root, draft) }, null, 2))
      else if (mode === 'apply') console.log(JSON.stringify({ mode, draftId: draft.updateId, ...applyAuthorUpdate(root, draft) }, null, 2))
      else throw new Error('mode 只支持 preview、apply 或 rollback。')
    } else {
      const draft = parseAuthorDraft(input)
      if (mode === 'preview') console.log(JSON.stringify({ mode, draftId: draft.id, ...previewAuthorDraft(root, draft) }, null, 2))
      else if (mode === 'apply') console.log(JSON.stringify({ mode, draftId: draft.id, ...applyAuthorDraft(root, draft) }, null, 2))
      else throw new Error('mode 只支持 preview、apply 或 rollback。')
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
