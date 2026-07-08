// 用途：TS 版共享读取门面工具，供 .ts 类型的 check 脚本消费
import fs from 'node:fs'
import path from 'node:path'

const facadeRoots = new Map<string, string>([
  ['src/lib/public-world-surfaces.ts', 'src/lib/public-surfaces'],
])

export function readPublicSurfacesText(
  rootPath = 'src/lib/public-world-surfaces.ts',
  cwd: string = process.cwd(),
): string {
  const absRoot = path.resolve(cwd, rootPath)
  const parts: string[] = fs.existsSync(absRoot) ? [fs.readFileSync(absRoot, 'utf8')] : []
  const partitionsDir = facadeRoots.get(rootPath)
  if (partitionsDir) {
    const absDir = path.resolve(cwd, partitionsDir)
    if (fs.existsSync(absDir)) {
      for (const entry of fs.readdirSync(absDir)) {
        if (entry.endsWith('.ts')) {
          parts.push(fs.readFileSync(path.resolve(absDir, entry), 'utf8'))
        }
      }
    }
  }
  return parts.join('\n')
}
