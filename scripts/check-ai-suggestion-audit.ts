// 用途：检查 AI 建议审计
import fs from 'node:fs'
import path from 'node:path'
import aiSuggestionAuditContract from '../data/domains/ai/ai-suggestion-audit-contract.json'
import aiSuggestionAuditQueue from '../data/domains/ai/ai-suggestion-audit-queue.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (aiSuggestionAuditContract.suggestionTypes.length < 6) errors.push('suggestion types too few')
  if (aiSuggestionAuditQueue.items.length < 3) errors.push('suggestion queue too small')
  for (const item of aiSuggestionAuditQueue.items) {
    if (!['public', 'semiPublic'].includes(item.sourceTier)) errors.push(`unsafe source tier: ${item.id}`)
    if (item.execution !== 'not-executed') errors.push(`suggestion was executed: ${item.id}`)
    if (item.requiredHumanAction !== true) errors.push(`suggestion missing human action: ${item.id}`)
  }
  ;[
    'src/app/_legacy/ai-workbench-v2/page.tsx',
    'src/lib/ai-workbench-v2.ts',
    'src/components/_legacy/ai-workbench/AiWorkbenchV2Hero.tsx',
    'src/components/_legacy/ai-workbench/AiSuggestionQueuePanel.tsx',
    'src/components/_legacy/ai-workbench/AiPermissionMatrixPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing AI workbench file: ${file}`)
  })
  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:ai-suggestion-audit']) errors.push('package missing check:ai-suggestion-audit')
  if (!pkg.scripts['ai-suggestion-audit:print']) errors.push('package missing ai-suggestion-audit:print')
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('AI suggestion audit check passed.')
}

main()
