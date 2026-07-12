import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import type { Node, WorldEvent } from '@/lib/types'
import { applyAuthorTransaction, sha256File } from './author-transaction'
import type { AuthorUpdateDraft } from './author-update-schema'
import { previewAuthorUpdate } from './author-update-preview'

function readJson<T>(file: string): T { return JSON.parse(fs.readFileSync(file, 'utf8')) as T }
function json(data: unknown) { return `${JSON.stringify(data, null, 2)}\n` }

export function applyAuthorUpdate(root: string, draft: AuthorUpdateDraft) {
  const preview = previewAuthorUpdate(root, draft)
  if (!preview.valid) throw new Error(`更新草稿未通过预览：${preview.issues.map((issue) => issue.message).join('；')}`)
  const nodesPath = 'data/domains/experience/nodes.json'
  const eventsPath = 'data/core/world-events.json'
  const nodes = readJson<Node[]>(path.join(root, nodesPath))
  const events = readJson<WorldEvent[]>(path.join(root, eventsPath))
  const content = fs.readFileSync(path.join(root, draft.contentPath), 'utf8').trimEnd()
  const updatedNodes = nodes.map((node) => node.id === draft.nodeId ? { ...node, updatedAt: draft.eventDraft.date } : node)
  const updatedEvent: WorldEvent = {
    id: draft.eventDraft.id,
    type: 'node-updated',
    title: draft.eventDraft.title,
    date: draft.eventDraft.date,
    description: draft.eventDraft.description,
    nodeIds: [draft.nodeId],
    areaIds: preview.node ? [preview.node.areaId] : [],
    visibility: 'public',
    actor: 'creator',
  }
  const writes = new Map<string, string>([
    [nodesPath, json(updatedNodes)],
    [eventsPath, json([...events, updatedEvent])],
    [draft.contentPath, `${content}\n\n${draft.appendMarkdown.trim()}\n`],
  ])
  const transaction = applyAuthorTransaction({
    root,
    draftId: draft.updateId,
    writes,
    managedPaths: [...preview.files],
    afterWrite: () => {
      const build = spawnSync(path.join(root, 'node_modules/.bin/tsx'), ['scripts/build-public-json.ts'], { cwd: root, encoding: 'utf8' })
      if (build.status !== 0) throw new Error(`公开索引构建失败：${build.stderr || build.stdout}`)
      const publicIndex = readJson<{ nodes: Array<{ id: string; updatedAt?: string }>; events: Array<{ id: string }> }>(path.join(root, 'public/world-index.json'))
      if (publicIndex.nodes.find((node) => node.id === draft.nodeId)?.updatedAt !== draft.eventDraft.date) throw new Error('公开索引未吸收节点修订时间。')
      if (!publicIndex.events.some((event) => event.id === draft.eventDraft.id)) throw new Error('公开索引未吸收节点更新时间事件。')
    },
  })
  return { ...transaction, preview, contentRevisionSha256: sha256File(path.join(root, draft.contentPath)) }
}
