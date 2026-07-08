import governanceLedger from '../../data/domains/governance/governance-ledger.json'
import riskRegister from '../../data/domains/governance/risk-register.json'
import decisionTraceability from '../../data/engineering/decision-traceability.json'
import capabilityMaturityModel from '../../data/core/capability-maturity-model.json'

export function getGovernanceLedger() {
  return governanceLedger
}

export function getRiskRegister() {
  return riskRegister
}

export function getDecisionTraceability() {
  return decisionTraceability
}

export function getCapabilityMaturityModel() {
  return capabilityMaturityModel
}

export function getHighRisks() {
  return riskRegister.risks.filter((risk) => risk.severity === 'high')
}
