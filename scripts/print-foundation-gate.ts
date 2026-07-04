import { getGateReport } from '../src/lib/development-gates'
import { evaluateFoundationQuality } from '../src/lib/foundation-quality'
import { getFoundationFreezeReport } from '../src/lib/foundation-freeze'

function main() {
  const gate = getGateReport()
  const quality = evaluateFoundationQuality()
  const freeze = getFoundationFreezeReport()

  console.log(`Current stage: ${gate.current?.id ?? 'unknown'}｜${gate.current?.name ?? ''}`)
  console.log(`Kernel pass: ${gate.kernelPass}`)
  console.log(`Foundation quality: ${quality.totalScore}`)
  console.log(`Frozen foundation items: ${freeze.frozenCount}`)
  quality.dimensions.forEach((item) => {
    console.log(`${item.id}: ${item.score}/${item.weight}`)
  })
}

main()
