// 用途：生成世界报告
import fs from 'node:fs'
import path from 'node:path'
import { getWorldHealth } from '../src/lib/world-health'

function main() {
  const health = getWorldHealth()
  const outDir = path.join(process.cwd(), '.world')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'health.json'), JSON.stringify(health, null, 2) + '\n', 'utf-8')
  console.log('World health report generated at .world/health.json')
}

main()
