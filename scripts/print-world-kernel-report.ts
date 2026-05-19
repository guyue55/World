import { evaluateWorldKernel } from '../src/lib/world-kernel'

function main() {
  const report = evaluateWorldKernel()

  console.log(`World Kernel v${report.version}`)
  console.log(`score=${report.score}`)
  console.log(`blockingErrors=${report.blockingErrors}`)
  console.log(`warnings=${report.warnings}`)

  report.issues.forEach((issue) => {
    console.log(`[${issue.severity}] ${issue.id}: ${issue.message}`)
  })
}

main()
