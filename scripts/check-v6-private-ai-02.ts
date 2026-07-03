import fs from 'node:fs'
import { assertV6PrivateAiBoundary, getV6AiRedactedContext } from '../src/features/private-ai-v6'

const errors: string[] = []
for (const path of [
  'data/v6-private-ai/stage-02-ai-world-companion.json',
  'data/v6-private-archive/ai-redacted-context.json',
  'src/app/private-ai/page.tsx',
]) {
  if (!fs.existsSync(path)) errors.push(`missing ${path}`)
}
const context = getV6AiRedactedContext() as { forbiddenActions?: string[] }
if (!context.forbiddenActions?.includes('publish private archive')) errors.push('publish private archive must be forbidden')
const critical = assertV6PrivateAiBoundary().filter((violation) => violation.severity === 'critical')
if (critical.length > 0) errors.push(`critical boundary violations: ${critical.map((item) => item.id).join(', ')}`)
if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V6 private AI stage 02 checks passed.')
