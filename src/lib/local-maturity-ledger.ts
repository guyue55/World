import localMaturityLedger from '../../data/domains/operations/local-maturity-ledger.json'

export type LocalMaturityLedger = typeof localMaturityLedger

export function getLocalMaturityLedger(): LocalMaturityLedger {
  return localMaturityLedger
}
