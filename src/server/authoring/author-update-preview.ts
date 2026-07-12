import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import type { AuthorUpdateDraft } from './author-update-schema'
import type { Node, Path, Relation, WorldEvent } from '@/lib/types'

export type AuthorUpdateIssue = { code: string; message: string }

function readJson<T>(file: string): T { return JSON.parse(fs.readFileSync(file, 'utf8')) as T }
function sha256File(file: string) { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex') }

export function previewAuthorUpdate(root: string, draft: AuthorUpdateDraft) {
  const nodes = readJson<Node[]>(path.join(root, 'data/domains/experience/nodes.json'))
  const relations = readJson<Relation[]>(path.join(root, 'data/core/relations.json'))
  const paths = readJson<Path[]>(path.join(root, 'data/domains/experience/paths.json'))
  const events = readJson<WorldEvent[]>(path.join(root, 'data/core/world-events.json'))
  const issues: AuthorUpdateIssue[] = []
  const node = nodes.find((item) => item.id === draft.nodeId)
  if (!node) issues.push({ code: 'node-missing', message: `更新节点不存在：${draft.nodeId}` })
  if (node && node.visibility !== 'public') issues.push({ code: 'visibility-not-public', message: '只有服务端事实层中的 public 节点可进入公开更新事务。' })
  if (node && node.slug !== draft.slug) issues.push({ code: 'slug-mismatch', message: `slug 与已有事实不一致：${draft.slug}` })
  if (node && node.contentPath !== draft.contentPath) issues.push({ code: 'content-path-mismatch', message: `正文路径与已有事实不一致：${draft.contentPath}` })

  const contentFile = path.resolve(root, draft.contentPath)
  const contentRoot = path.resolve(root, 'content') + path.sep
  if (!contentFile.startsWith(contentRoot)) issues.push({ code: 'content-path-outside-root', message: '正文路径越出 content 目录。' })
  if (!fs.existsSync(contentFile)) issues.push({ code: 'content-missing', message: `正文不存在：${draft.contentPath}` })
  if (fs.existsSync(contentFile) && sha256File(contentFile) !== draft.baseContentSha256) issues.push({ code: 'base-hash-mismatch', message: '正文已变化，拒绝在未知版本上追加。' })
  if (!draft.appendMarkdown.includes(draft.expectedPhrase)) issues.push({ code: 'expected-phrase-missing', message: '追加正文未包含契约短语。' })
  if (fs.existsSync(contentFile) && fs.readFileSync(contentFile, 'utf8').includes(draft.expectedPhrase)) issues.push({ code: 'update-already-applied', message: '相同更新已存在，拒绝重复追加。' })

  const nodeIds = new Set(nodes.map((item) => item.id))
  const related = relations.filter((item) => item.from === draft.nodeId || item.to === draft.nodeId)
  if (related.length === 0) issues.push({ code: 'relations-missing', message: '更新节点没有已登记关系，不能形成跨投影上下文。' })
  if (related.some((item) => !nodeIds.has(item.from) || !nodeIds.has(item.to))) issues.push({ code: 'relation-target-missing', message: '更新节点存在失效关系目标。' })
  const publicPaths = paths.filter((item) => item.visibility === 'public' && item.nodeSlugs.includes(draft.slug))
  if (publicPaths.length === 0) issues.push({ code: 'public-path-missing', message: '更新节点没有进入公开路径。' })
  if (events.some((item) => item.id === draft.eventDraft.id)) issues.push({ code: 'event-id-exists', message: `更新时间事件已存在：${draft.eventDraft.id}` })

  return {
    valid: issues.length === 0,
    issues,
    node,
    impact: {
      atlas: node ? `${node.areaId} 区域中的地点修订将变化。` : '节点缺失。',
      timeline: `将新增 ${draft.eventDraft.id} 时间锚点。`,
      archive: '公开卷宗的修订时间与可检索内容将变化。',
      paths: publicPaths.map((item) => item.id),
      node: draft.contentPath,
      lighthouse: '公开正文索引需吸收新短语。',
      export: '公开导出需记录新正文 checksum。',
    },
    files: [
      'data/domains/experience/nodes.json',
      'data/core/world-events.json',
      draft.contentPath,
      'public/world-index.json',
      'public/world-manifest.json',
    ],
  }
}
