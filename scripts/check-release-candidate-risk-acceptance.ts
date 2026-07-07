// 用途：检查release candidate risk acceptance
import fs from 'node:fs'
import path from 'node:path'
import releaseCandidateRiskAcceptanceContract from '../data/domains/governance/release-candidate-risk-acceptance-contract.json'
import releaseCandidateRiskAcceptanceRecord from '../data/domains/governance/release-candidate-risk-acceptance-record.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (releaseCandidateRiskAcceptanceContract.riskTypes.length < 5) {
    errors.push('risk types too few')
  }

  ;['P0/P1 defect', 'privacy boundary leak', 'missing required evidence'].forEach((risk) => {
    if (!releaseCandidateRiskAcceptanceContract.nonAcceptableRisks.includes(risk)) {
      errors.push(`missing non acceptable risk: ${risk}`)
    }
  })

  if (releaseCandidateRiskAcceptanceRecord.status !== 'no-accepted-risks') {
    errors.push('risk record must start no-accepted-risks')
  }

  if (releaseCandidateRiskAcceptanceRecord.items.length !== 0) {
    errors.push('risk acceptance record must start empty')
  }

  if (releaseCandidateRiskAcceptanceRecord.releaseDecision !== 'not-ready-for-release') {
    errors.push('risk acceptance record must keep not-ready-for-release')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:release-candidate-risk']) errors.push('package missing check:release-candidate-risk')
  if (!pkg.scripts['release-candidate-risk:print']) errors.push('package missing release-candidate-risk:print')
  if (!pkg.scripts['release-candidate-risk:write']) errors.push('package missing release-candidate-risk:write')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Release candidate risk acceptance check passed.')
}

main()
