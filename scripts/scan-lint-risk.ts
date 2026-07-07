// 用途：scan lint risk
import fs from 'node:fs'
import path from 'node:path'

const roots = ['src', 'scripts']
const risks: string[] = []

const eslintDisablePattern = ['eslint', 'disable'].join('-')
const explicitAnyPattern = new RegExp(`[:<]\\s*${'any'}\\b`)

const allowlist = new Set([
  'scripts/scan-lint-risk.ts',
])

function toProjectPath(filePath: string) {
  return filePath.split(path.sep).join('/')
}

function walk(dir: string) {
  if (!fs.existsSync(dir)) return

  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const full = path.join(dir, entry.name)
    const projectPath = toProjectPath(full)

    if (entry.isDirectory()) {
      walk(full)
      return
    }

    if (!/\.(ts|tsx)$/.test(entry.name)) return
    if (allowlist.has(projectPath)) return

    const source = fs.readFileSync(full, 'utf-8')
    source.split('\n').forEach((line, index) => {
      if (line.includes(eslintDisablePattern)) risks.push(`${projectPath}:${index + 1}: ${eslintDisablePattern}`)
      if (explicitAnyPattern.test(line)) risks.push(`${projectPath}:${index + 1}: explicit any`)
    })
  })
}

roots.forEach(walk)

if (risks.length > 0) {
  console.log(risks.join('\n'))
  throw new Error(`lint risk scan found ${risks.length} risk(s)`)
}

console.log('Lint risk scan passed.')
