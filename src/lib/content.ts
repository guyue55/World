import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const projectRoot = process.cwd()
const contentRoot = path.resolve(projectRoot, 'content') + path.sep
const revisionCache = new Map<string, { mtimeMs: number; value: ContentRevision }>()

export type ContentRevision = {
  sha256: string
  searchText: string
  headings: string[]
}

export function readContentFile(contentPath?: string): string | null {
  if (!contentPath) return null

  const safePath = contentPath.replace(/^\/+/, '')
  const fullPath = path.resolve(projectRoot, safePath)

  if (!fullPath.startsWith(contentRoot)) return null
  if (!fs.existsSync(fullPath)) return null

  return fs.readFileSync(fullPath, 'utf-8')
}

export function getContentRevision(contentPath?: string): ContentRevision | null {
  if (!contentPath) return null
  const fullPath = path.resolve(projectRoot, contentPath.replace(/^\/+/, ''))
  if (!fullPath.startsWith(contentRoot) || !fs.existsSync(fullPath)) return null
  const stat = fs.statSync(fullPath)
  const cached = revisionCache.get(fullPath)
  if (cached?.mtimeMs === stat.mtimeMs) return cached.value
  const content = fs.readFileSync(fullPath, 'utf8')
  const headingSource = content.replace(/```[\s\S]*?```/g, '')
  const headings = [...headingSource.matchAll(/^#{1,3}\s+(.+)$/gm)].map((match) => match[1].trim()).filter(Boolean).slice(0, 6)
  const value = {
    sha256: crypto.createHash('sha256').update(content).digest('hex'),
    searchText: content.slice(0, 12_000),
    headings,
  }
  revisionCache.set(fullPath, { mtimeMs: stat.mtimeMs, value })
  return value
}

export function extractMarkdownTitle(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() ?? null
}
