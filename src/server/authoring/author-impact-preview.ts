import fs from 'node:fs'
import path from 'node:path'
import { validateAuthorNodeDraft, type AuthorNodeDraft } from '@/lib/author-world-editor'
import type { Area, Node, Path, Relation } from '@/lib/types'

export type AuthorWorkspaceFacts = { nodes: Node[]; paths: Path[]; relations: Relation[]; areas: Area[] }

function readJson<T>(file: string): T { return JSON.parse(fs.readFileSync(file, 'utf8')) as T }

export function readAuthorWorkspaceFacts(root: string): AuthorWorkspaceFacts {
  return {
    nodes: readJson(path.join(root, 'data/domains/experience/nodes.json')),
    paths: readJson(path.join(root, 'data/domains/experience/paths.json')),
    relations: readJson(path.join(root, 'data/core/relations.json')),
    areas: readJson(path.join(root, 'data/domains/experience/areas.json')),
  }
}

export function previewAuthorDraft(root: string, draft: AuthorNodeDraft) {
  const facts = readAuthorWorkspaceFacts(root)
  const issues: string[] = []
  if (facts.nodes.some((node) => node.id === draft.id)) issues.push(`节点 id 已存在：${draft.id}`)
  if (facts.nodes.some((node) => node.slug === draft.slug)) issues.push(`节点 slug 已存在：${draft.slug}`)
  if (!facts.areas.some((area) => area.id === draft.areaId)) issues.push(`区域不存在：${draft.areaId}`)
  const nodeIds = new Set(facts.nodes.map((node) => node.id))
  for (const relation of draft.relations ?? []) if (!nodeIds.has(relation.to)) issues.push(`关系目标不存在：${relation.to}`)
  const pathIds = new Set(facts.paths.filter((item) => item.visibility === 'public').map((item) => item.id))
  for (const pathId of draft.pathIds ?? []) if (!pathIds.has(pathId)) issues.push(`公开路径不存在：${pathId}`)
  const contentFile = path.resolve(root, draft.contentPath)
  const contentRoot = path.resolve(root, 'content') + path.sep
  if (!contentFile.startsWith(contentRoot)) issues.push('正文路径越出 content 目录。')
  if (fs.existsSync(contentFile)) issues.push(`正文文件已存在：${draft.contentPath}`)
  const legacyPreview = validateAuthorNodeDraft(draft)
  for (const issue of legacyPreview.issues.filter((item) => item.severity === 'error')) issues.push(issue.message)

  return {
    valid: issues.length === 0 && legacyPreview.featuredAllowed,
    issues: Array.from(new Set(issues)),
    impact: legacyPreview.impactPreview,
    files: [
      'data/domains/experience/nodes.json',
      'data/core/relations.json',
      'data/domains/experience/paths.json',
      ...(draft.eventDraft ? ['data/core/world-events.json'] : []),
      draft.contentPath,
      'public/world-index.json',
    ],
  }
}
