import fs from 'node:fs'
import { createV6AiDashboard, getV6PrivateAiStages } from '../src/features/private-ai-v6'

const errors: string[] = []
for (const path of [
  'data/v6-private-ai/stage-04-closure-handoff.json',
  'docs/10-development-history/v6-private-ai/final-report.md',
  'docs/10-development-history/v6-private-ai/handoff-to-v7.md',
]) {
  if (!fs.existsSync(path)) errors.push(`missing ${path}`)
}
const dashboard = createV6AiDashboard()
if (dashboard.completedStages !== 4) errors.push('V6 private AI must complete four stages')
if (dashboard.productionLive !== false) errors.push('productionLive must remain false')
if (getV6PrivateAiStages().some((stage) => stage.productionLive !== false)) errors.push('stage productionLive must remain false')
if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V6 private AI stage 04 checks passed.')
