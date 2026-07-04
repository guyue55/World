import blueprint from '../data/v3-concept/01-product-experience-blueprint.json'

const errors: string[] = []

if (blueprint.firstScreen.length < 5) errors.push('first screen blueprint too small')
if (!blueprint.aiLighthouseExperience.includes('不自动发布、不自动删除、不自动改可见性')) {
  errors.push('AI non-overreach rule missing')
}
if (!blueprint.privateArchivePresence.includes('不暴露原文、不暴露精确家庭细节')) {
  errors.push('private archive non-disclosure rule missing')
}
if (blueprint.acceptanceSignals.length < 5) errors.push('acceptance signals too few')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 concept batch 01 check passed.')
