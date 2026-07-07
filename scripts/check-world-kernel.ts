// 用途：检查 World Kernel
import { assertWorldKernelHealthy, evaluateWorldKernel } from '../src/lib/world-kernel'

function main() {
  const report = evaluateWorldKernel()

  assertWorldKernelHealthy()

  console.log(`World kernel check passed. score=${report.score}, warnings=${report.warnings}`)
}

main()
