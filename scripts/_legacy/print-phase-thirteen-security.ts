import securityBaselineImplementationPlan from '../data/domains/governance/security-baseline-implementation-plan.json'

function main() {
  console.log(`${securityBaselineImplementationPlan.name}`)
  console.log(`securityBaselineReady=${securityBaselineImplementationPlan.securityBaselineReady}`)
  console.log(`baseline=${securityBaselineImplementationPlan.baseline.length}`)
  for (const item of securityBaselineImplementationPlan.baseline) {
    console.log(`${item.id}: ${item.implementation}, required=${item.required}`)
  }
}

main()
