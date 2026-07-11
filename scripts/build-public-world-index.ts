// 用途：构建公开世界索引
import fs from 'node:fs'
import path from 'node:path'
import { createPublicWorldIndex, preservePublicIndexGeneratedAt, type PublicWorldIndex } from '../src/lib/public-index'

function main() {
  const outDir = path.join(process.cwd(), 'public')
  const outFile = path.join(outDir, 'world-index.json')

  fs.mkdirSync(outDir, { recursive: true })
  const existing = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) as PublicWorldIndex : null
  const next = preservePublicIndexGeneratedAt(createPublicWorldIndex(), existing)
  const serialized = JSON.stringify(next, null, 2) + '\n'
  if (!fs.existsSync(outFile) || fs.readFileSync(outFile, 'utf8') !== serialized) fs.writeFileSync(outFile, serialized, 'utf-8')

  console.log(`Public world index written to ${outFile}`)
}

main()
