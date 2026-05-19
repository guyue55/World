import { evaluateFoundationAudit } from '../src/lib/foundation-audit'

function main() {
  const report = evaluateFoundationAudit()
  const failed = report.items.filter((item) => item.required && !item.passed)

  if (!report.pass || failed.length > 0) {
    throw new Error(failed.map((item) => `${item.id}: ${item.detail}`).join('\n'))
  }

  console.log(`Foundation audit passed. passRate=${report.passRate}`)
}

main()
