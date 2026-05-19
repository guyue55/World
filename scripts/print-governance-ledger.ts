import governanceLedger from '../data/governance-ledger.json'
import riskRegister from '../data/risk-register.json'
import decisionTraceability from '../data/decision-traceability.json'
import capabilityMaturityModel from '../data/capability-maturity-model.json'

function main() {
  console.log(`${governanceLedger.name}`)
  console.log(`ledgers=${governanceLedger.ledgers.length}`)
  console.log(`risks=${riskRegister.risks.length}`)
  console.log(`decisions=${decisionTraceability.decisions.length}`)
  console.log(`capabilities=${capabilityMaturityModel.capabilities.length}`)
}

main()
