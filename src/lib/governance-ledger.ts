import governanceLedger from '../../data/governance-ledger.json'
import riskRegister from '../../data/risk-register.json'
import decisionTraceability from '../../data/decision-traceability.json'
import capabilityMaturityModel from '../../data/capability-maturity-model.json'

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
