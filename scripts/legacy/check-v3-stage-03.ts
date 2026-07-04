import accessibility from '../data/v3/stage-03/10-v3-immersive-accessibility.json'
import exhibition from '../data/v3/stage-03/11-v3-exhibition-worldbook.json'
import finalReport from '../data/v3/stage-03/12-v3-stage-three-final.json'
import universeMap from '../data/v3/stage-03/09-v3-universe-map-ia.json'

const errors: string[] = []

if (!universeMap.views.includes('galaxy-overview')) errors.push('galaxy overview missing')
if (!accessibility.interactionRules.includes('semantic fallback')) errors.push('semantic fallback missing')
if (!accessibility.interactionRules.includes('no WebXR dependency')) errors.push('WebXR dependency boundary missing')
if (!exhibition.worldBookOutputs.includes('markdown')) errors.push('markdown world book output missing')
if (finalReport.decision !== 'v3-visual-universe-navigation-complete-stage-four-allowed') {
  errors.push('stage three final decision mismatch')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 stage 03 check passed.')
