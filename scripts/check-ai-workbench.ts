import fs from 'node:fs'
import path from 'node:path'
import aiWorkbenchImplementationContract from '../data/ai-workbench-implementation-contract.json'
import aiWorkbenchSuggestions from '../data/ai-workbench-suggestions.json'
import phaseThreeAiLighthouseRoadmap from '../data/phase-three-ai-lighthouse-roadmap.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const errors: string[] = []

  if (aiWorkbenchImplementationContract.route !== '/ai-workbench') {
    errors.push('AI workbench route must be /ai-workbench')
  }

  if (aiWorkbenchSuggestions.suggestions.length < 3) {
    errors.push('AI workbench suggestions too few')
  }

  if (!aiWorkbenchSuggestions.suggestions.every((item) => item.requiresUserAction === true)) {
    errors.push('every AI suggestion must require user action')
  }

  ;['自动发布内容', '自动删除内容', '自动改变可见性'].forEach((item) => {
    if (!phaseThreeAiLighthouseRoadmap.forbiddenCapabilities.includes(item)) {
      errors.push(`forbidden capability missing: ${item}`)
    }
  })

  if (!exists('src/app/ai-workbench/page.tsx')) errors.push('missing AI workbench page')
  if (!exists('src/components/ai-workbench/AiWorkbenchHero.tsx')) errors.push('missing AiWorkbenchHero')
  if (!exists('src/components/ai-workbench/AiSuggestionList.tsx')) errors.push('missing AiSuggestionList')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('AI workbench check passed.')
}

main()
