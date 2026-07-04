import foundationFreeze from '../../data/release/foundation-freeze.json'

export type FoundationFreezeReport = {
  frozen: string[]
  flexible: string[]
  frozenCount: number
  flexibleCount: number
}

export function getFoundationFreeze() {
  return foundationFreeze
}

export function getFoundationFreezeReport(): FoundationFreezeReport {
  return {
    frozen: foundationFreeze.frozen,
    flexible: foundationFreeze.flexible,
    frozenCount: foundationFreeze.frozen.length,
    flexibleCount: foundationFreeze.flexible.length,
  }
}

export function isFrozenFoundationItem(item: string): boolean {
  return foundationFreeze.frozen.includes(item)
}
