import fs from 'node:fs'
import path from 'node:path'
import contract from '../data/final-closure-report-contract.json'
import decision from '../data/phase-one-final-decision-template.json'

function main() {
  const errors: string[] = []
  if (!fs.existsSync(path.join(process.cwd(), 'scripts/generate-final-closure-report.mjs'))) errors.push('missing final closure generator')
  ;['reports/first-stage-acceptance-report.json', 'reports/preview-smoke-report.json', 'data/stage-completion-gate.json'].forEach((input) => {
    if (!contract.inputReports.includes(input)) errors.push(`missing closure input: ${input}`)
  })
  if (decision.currentDecision !== 'not-yet-complete') errors.push('decision template overclaims completion')
  ;['complete', 'not-yet-complete', 'complete-with-deferred-items'].forEach((value) => {
    if (!contract.decisionValues.includes(value)) errors.push(`missing decision value: ${value}`)
  })
  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Final closure contract check passed.')
}
main()
