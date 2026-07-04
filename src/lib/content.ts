import fs from 'node:fs'
import path from 'node:path'

const projectRoot = process.cwd()

export function readContentFile(contentPath?: string): string | null {
  if (!contentPath) return null

  const safePath = contentPath.replace(/^\/+/, '')
  const fullPath = path.join(projectRoot, safePath)

  if (!fullPath.startsWith(projectRoot)) return null
  if (!fs.existsSync(fullPath)) return null

  return fs.readFileSync(fullPath, 'utf-8')
}

export function extractMarkdownTitle(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim() ?? null
}
