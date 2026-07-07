import fs from 'node:fs'
import { getV6PrivateAiStages } from '../src/features/private-ai-v6'

const errors: string[] = []
for (const path of [
  'data/v6-private-ai/stage-01-private-archive-boundary.json',
  'data/v6-private-archive/privacy-layers.json',
  'data/v6-private-archive/redacted-archive-index.json',
  'src/features/private-ai-v6/index.ts',
]) {
  if (!fs.existsSync(path)) errors.push(`missing ${path}`)
}
if (!getV6PrivateAiStages().some((stage) => stage.stage === '01-private-archive-boundary')) errors.push('stage 01 record missing')
if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V6 private AI stage 01 checks passed.')
