import fs from 'node:fs'
import path from 'node:path'
import aiPathExhibitionRecommendations from '../data/ai-path-exhibition-recommendations.json'
import aiWorldCompanionPlan from '../data/ai-world-companion-plan.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  if (aiWorldCompanionPlan.capabilities.length < 4) errors.push('companion capabilities too few')
  if (aiWorldCompanionPlan.maintenanceChecks.length < 6) errors.push('maintenance checks too few')
  for (const capability of aiWorldCompanionPlan.capabilities) {
    if (capability.humanRequired !== true) errors.push(`capability missing human requirement: ${capability.id}`)
  }
  if (aiPathExhibitionRecommendations.recommendations.length < 4) errors.push('recommendations too few')
  for (const item of aiPathExhibitionRecommendations.recommendations) {
    if (!['public', 'semiPublic'].includes(item.sourceTier)) errors.push(`unsafe source tier: ${item.id}`)
    if (item.execution !== 'not-executed') errors.push(`recommendation executed: ${item.id}`)
    if (item.requiresReview !== true) errors.push(`recommendation missing review: ${item.id}`)
  }

  ;[
    'src/lib/ai-world-companion.ts',
    'src/components/ai-workbench/AiWorldCompanionPanel.tsx',
    'src/components/ai-workbench/AiRecommendationPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing companion file: ${file}`)
  })

  const page = read('src/app/ai-workbench-v2/page.tsx')
  if (!page.includes('AiWorldCompanionPanel') || !page.includes('AiRecommendationPanel')) {
    errors.push('AI workbench page missing companion panels')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:ai-world-companion']) errors.push('package missing check:ai-world-companion')
  if (!pkg.scripts['ai-world-companion:print']) errors.push('package missing ai-world-companion:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('AI world companion check passed.')
}

main()
