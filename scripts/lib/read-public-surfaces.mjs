// 用途：门面拆分后统一读取 public-world-surfaces 主文件与 public-surfaces/ 子模块，供各类 check 脚本消费
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const facadeRoots = new Map([
  ['src/lib/public-world-surfaces.ts', 'src/lib/public-surfaces'],
])

/**
 * 读取门面源码并拼接所有子模块，返回聚合字符串
 * @param {string} rootPath 门面主文件路径（默认 src/lib/public-world-surfaces.ts）
 * @param {string} [cwd] 项目根目录，默认使用 process.cwd()
 */
export function readPublicSurfacesText(rootPath = 'src/lib/public-world-surfaces.ts', cwd = process.cwd()) {
  const absRoot = resolve(cwd, rootPath)
  const parts = existsSync(absRoot) ? [readFileSync(absRoot, 'utf8')] : []
  const partitionsDir = facadeRoots.get(rootPath)
  if (partitionsDir) {
    const absDir = resolve(cwd, partitionsDir)
    if (existsSync(absDir)) {
      for (const entry of readdirSync(absDir)) {
        if (entry.endsWith('.ts')) {
          parts.push(readFileSync(resolve(absDir, entry), 'utf8'))
        }
      }
    }
  }
  return parts.join('\n')
}
