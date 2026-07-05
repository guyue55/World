import fs from 'node:fs'
import path from 'node:path'
import phaseThreeAiLighthouseRoadmap from '../data/domains/ai/phase-three-ai-lighthouse-roadmap.json'
import aiSuggestionProtocol from '../data/domains/ai/ai-suggestion-protocol.json'
import phaseThreeAiSafetyGate from '../data/domains/ai/phase-three-ai-safety-gate.json'
import releasePreparationFinalReport from '../data/release/release-preparation-final-report.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (phaseThreeAiLighthouseRoadmap.allowedCapabilities.length < 5) {
    errors.push('AI allowed capabilities too few')
  }

  ;['自动发布内容', '自动删除内容', '自动改变可见性'].forEach((item) => {
    if (!phaseThreeAiLighthouseRoadmap.forbiddenCapabilities.includes(item)) {
      errors.push(`AI forbidden capability missing: ${item}`)
    }
  })

  if (phaseThreeAiSafetyGate.checks.length < 6) {
    errors.push('AI safety checks too few')
  }

  if (aiSuggestionProtocol.suggestionSchema.requiresUserAction !== true) {
    errors.push('AI suggestion protocol must require user action')
  }

  if (releasePreparationFinalReport.releaseDecision !== 'not-ready-for-release') {
    errors.push('AI planning must preserve not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:ai-lighthouse-planning']) errors.push('package missing check:ai-lighthouse-planning')
  if (!pkg.scripts['ai-lighthouse:print']) errors.push('package missing ai-lighthouse:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('AI lighthouse planning check passed.')
}

main()
