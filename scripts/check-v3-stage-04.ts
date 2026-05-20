import archive from '../data/v3/stage-04/13-v3-life-archive-model.json'
import finalReport from '../data/v3/stage-04/16-v3-stage-four-final.json'
import governance from '../data/v3/stage-04/15-v3-ethics-risk-governance.json'
import legacy from '../data/v3/stage-04/14-v3-legacy-protocol.json'

const errors: string[] = []

if (!archive.retentionModes.includes('sealed')) errors.push('sealed retention missing')
if (!legacy.safetyRules.includes('no automatic public release')) errors.push('automatic release safety missing')
if (!legacy.safetyRules.includes('redaction before handover')) errors.push('handover redaction missing')
if (!governance.riskClasses.includes('ai-overreach')) errors.push('AI overreach risk missing')
if (!governance.controls.includes('audit trail')) errors.push('audit trail control missing')
if (finalReport.decision !== 'v3-life-archive-legacy-governance-complete-stage-five-allowed') {
  errors.push('stage four final decision mismatch')
}

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 stage 04 check passed.')
