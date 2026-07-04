import { getGateReport } from '../src/lib/development-gates'
import { evaluateFoundationQuality } from '../src/lib/foundation-quality'
import { getFoundationFreezeReport } from '../src/lib/foundation-freeze'

function main() {
  const gate = getGateReport()
  const quality = evaluateFoundationQuality()
  const freeze = getFoundationFreezeReport()

  if (!gate.kernelPass) {
    throw new Error(`Foundation gate failed: kernel has ${gate.blockingErrors} blocking errors`)
  }

  if (!quality.pass) {
    throw new Error(`Foundation quality gate failed: score=${quality.totalScore}`)
  }

  if (freeze.frozenCount < 8) {
    throw new Error('Foundation freeze line is too weak')
  }

  console.log(`Foundation gate passed. score=${quality.totalScore}, frozen=${freeze.frozenCount}`)
}

main()
