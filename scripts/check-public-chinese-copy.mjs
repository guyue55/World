// 用途：检查public chinese copy
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const files = [
  'src/lib/public-world-surfaces.ts',
  'src/components/world/WorldLiveMapPanel.tsx',
  'src/app/error.tsx',
  'src/app/global-error.tsx',
  'src/app/not-found.tsx',
  'src/app/loading.tsx',
]

const blockedVisibleCopy = [
  'DYNAMIC WORLD STATUS',
  'LIVE ARCHIVE',
  'LIVE PATH',
  'GUIDED PATHS',
  'WORLD REPAIR',
  'runtime://public-world',
  '>live<',
]

const failures = []

for (const file of files) {
  const source = readFileSync(resolve(root, file), 'utf8')
  for (const token of blockedVisibleCopy) {
    if (source.includes(token)) failures.push(`${file} 包含非中文优先公开文案：${token}`)
  }
}

if (failures.length > 0) {
  console.error('Public Chinese-first copy check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Public Chinese-first copy check passed')
