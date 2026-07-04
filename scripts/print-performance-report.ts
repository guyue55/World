import {
  getInteractionSmoothnessContract,
  getLoadingStrategy,
  getPerformanceBudget,
  getRenderingStrategy,
} from '../src/lib/performance-contracts'

function main() {
  const budget = getPerformanceBudget()
  const rendering = getRenderingStrategy()
  const loading = getLoadingStrategy()
  const smoothness = getInteractionSmoothnessContract()

  console.log(`${budget.name}`)
  console.log(`budgets=${budget.budgets.length}`)
  budget.budgets.forEach((item) => console.log(`- ${item.id}: ${item.target}`))

  console.log(`renderingLayers=${rendering.layers.length}`)
  console.log(`loadingStrategies=${loading.strategies.length}`)
  console.log(`smoothnessRules=${smoothness.rules.length}`)
}

main()
