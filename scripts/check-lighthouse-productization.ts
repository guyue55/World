import fs from 'node:fs'
import path from 'node:path'
import nodes from '../data/domains/experience/nodes.json'
import paths from '../data/domains/experience/paths.json'
import aiBoundaryPolicy from '../data/domains/ai/ai-boundary-policy.json'
import lighthousePrompts from '../data/domains/ai/lighthouse-prompts.json'
import lighthouseQualityGate from '../data/domains/ai/lighthouse-quality-gate.json'
import lighthouseProductizationContract from '../data/domains/ai/lighthouse-productization-contract.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const publicNodes = nodes.filter((node) => node.visibility === 'public')
  const publicPaths = paths.filter((item) => item.visibility === 'public')
  const recommendedNodes = publicNodes.filter((node) => node.tags.some((tag) => ['ai', 'world', 'lighthouse', 'agent', 'no-ai', 'atlas', 'space', 'engineering'].includes(tag)))
  const checks = {
    promptSuggestions: lighthousePrompts.prompts.length,
    recommendedNodes: Math.min(recommendedNodes.length, 6),
    recommendedPaths: Math.min(publicPaths.length, 3),
    allowedRules: aiBoundaryPolicy.allowed.length,
    forbiddenRules: aiBoundaryPolicy.forbidden.length,
    requiredComponents: lighthouseQualityGate.requiredComponents.length,
  }

  Object.entries(checks).forEach(([key, value]) => {
    const expected = lighthouseQualityGate.minimums[key as keyof typeof lighthouseQualityGate.minimums]
    if (value < expected) errors.push(`${key} below minimum: ${value} < ${expected}`)
  })

  lighthouseQualityGate.requiredComponents.forEach((component) => {
    const files = [
      `src/components/lighthouse/${component}.tsx`,
      `src/components/ask/${component}.tsx`,
    ]

    if (!files.some((file) => fs.existsSync(path.join(process.cwd(), file)))) {
      errors.push(`missing lighthouse component: ${component}`)
    }
  })

  lighthousePrompts.prompts.forEach((prompt) => {
    if (!prompt.href.startsWith('/')) errors.push(`prompt href must be local: ${prompt.id}`)
    if (!['path', 'archive', 'atlas'].includes(prompt.intent)) errors.push(`unsafe prompt intent: ${prompt.id}`)
  })

  const page = read('src/app/ask/page.tsx')
  ;['LighthouseHero', 'LighthousePromptGuide', 'LighthouseRecommendationGrid', 'LighthouseBoundarySummary', 'LighthouseFallbackActions'].forEach((token) => {
    if (!page.includes(token)) errors.push(`ask page missing ${token}`)
  })
  if (page.includes('chat') || page.includes('fetch(')) errors.push('ask page must not pretend to call real-time AI in low-light mode')
  if (lighthouseProductizationContract.pageParts.length < 6) errors.push('lighthouse contract pageParts too small')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Lighthouse productization check passed.')
}

main()
