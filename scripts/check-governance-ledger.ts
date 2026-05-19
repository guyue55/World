import governanceLedger from '../data/governance-ledger.json'
import riskRegister from '../data/risk-register.json'
import decisionTraceability from '../data/decision-traceability.json'
import capabilityMaturityModel from '../data/capability-maturity-model.json'

function main() {
  const errors: string[] = []

  if (governanceLedger.ledgers.length < 5) errors.push('governance ledger items too few')
  if (!riskRegister.risks.some((risk) => risk.severity === 'high')) errors.push('risk register missing high risk')
  if (decisionTraceability.decisions.length < 5) errors.push('decision traceability decisions too few')
  if (capabilityMaturityModel.capabilities.length < 6) errors.push('capability maturity capabilities too few')

  governanceLedger.ledgers.forEach((item) => {
    if (!item.owner || !item.scope || !item.evidence) {
      errors.push(`governance item incomplete: ${item.id}`)
    }
  })

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Governance ledger check passed.')
}

main()
