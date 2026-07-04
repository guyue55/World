import fs from 'node:fs'
import path from 'node:path'
import { assertV6PrivateAiBoundary } from '../src/features/private-ai-v6'

const errors: string[] = []
const forbiddenTokens = ['身份证号码', '银行卡号', '家庭住址原文', '孩子学校原文', 'vault original raw']
const roots = ['src/app/private-ai', 'src/components/private-ai-v6', 'src/features/private-ai-v6', 'data/v6-private-ai', 'data/v6-private-archive']

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return [full]
  })
}

for (const file of roots.flatMap(walk)) {
  const text = fs.readFileSync(file, 'utf8')
  for (const token of forbiddenTokens) {
    if (text.includes(token)) errors.push(`forbidden raw privacy token in ${file}: ${token}`)
  }
}

const violations = assertV6PrivateAiBoundary()
if (violations.length > 0) errors.push(...violations.map((violation) => `${violation.id}: ${violation.message}`))

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V6 private AI privacy leak checks passed.')
