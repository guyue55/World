import finalMap from '../data/v3-concept/06-acceptance-risk-v4-entry-map.json'
import finalReport from '../data/v3-concept/v3-concept-completion-final-report.json'

const errors: string[] = []

if (finalMap.acceptanceCriteria.length < 11) errors.push('acceptance criteria too few')
if (finalMap.riskRegister.length < 6) errors.push('risk register too small')
if (finalMap.v3ToV4EntryMap.length < 5) errors.push('V3 to V4 entry map too small')
if (!finalMap.acceptanceCriteria.includes('私密内容不泄漏')) errors.push('privacy acceptance missing')
if (!finalMap.acceptanceCriteria.includes('核心命令通过')) errors.push('core command acceptance missing')
if (!finalMap.riskRegister.some((risk) => risk.id === 'v3-risk-ai-overreach')) {
  errors.push('AI overreach risk missing')
}
if (finalMap.finalDecision !== 'v3-concept-completion-finished-v3-real-implementation-next-v4-planning-only') {
  errors.push('final decision mismatch')
}
if (finalMap.v4FormalDevelopmentAllowed !== false) errors.push('V4 formal development must remain false')
if (finalReport.completedBatches !== 6) errors.push('final report completed batches must be 6')
if (finalReport.status !== 'complete') errors.push('final report status must be complete')

if (errors.length > 0) throw new Error(errors.join('\n'))
console.log('V3 concept batch 06 check passed.')
