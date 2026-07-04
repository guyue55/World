import { evaluateFoundationAudit, getFoundationCertification } from '../src/lib/foundation-audit'

function main() {
  const report = evaluateFoundationAudit()
  const cert = getFoundationCertification()

  console.log(`${cert.name}`)
  console.log(`status=${report.certificationStatus}`)
  console.log(`pass=${report.pass}`)
  console.log(`passRate=${report.passRate}`)

  report.items.forEach((item) => {
    console.log(`${item.passed ? 'PASS' : 'FAIL'} ${item.id}｜${item.detail}`)
  })

  console.log(cert.exitStatement)
}

main()
