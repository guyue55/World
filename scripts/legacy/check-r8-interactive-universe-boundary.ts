import { readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const targets = [
  'src/components/r8-interactive-universe',
  'src/app/api/r8/interactive-universe',
  'data/r8-interactive-universe',
]
const forbidden = [/process\.env/, /fetch\(/, /prisma/i, /supabase/i, /openai/i, /anthropic/i, /INSERT\s/i, /DELETE\s/i, /UPDATE\s/i]

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

const violations: string[] = []
for (const target of targets) {
  for (const file of walk(path.join(root, target))) {
    const body = readFileSync(file, 'utf8')
    for (const rule of forbidden) {
      if (rule.test(body)) violations.push(`${path.relative(root, file)} matches ${rule}`)
    }
  }
}

if (violations.length > 0) {
  throw new Error(`R8.7 boundary violations:\n${violations.join('\n')}`)
}

console.log('R8.7 interactive universe boundary check passed')
