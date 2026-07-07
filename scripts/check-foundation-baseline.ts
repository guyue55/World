// 用途：检查基础基线
import fs from 'node:fs'
import path from 'node:path'
import {
  getDeveloperOnboarding,
  getFoundationBaseline,
  getFoundationHandoffManifest,
  validateFoundationBaseline,
} from '../src/lib/foundation-baseline'

function main() {
  const issues = validateFoundationBaseline()
  const missing: string[] = []

  getFoundationBaseline().baselineItems.forEach((item) => {
    item.evidence.forEach((evidence) => {
      if (!fs.existsSync(path.join(process.cwd(), evidence))) missing.push(evidence)
    })
  })

  getFoundationHandoffManifest().handoffItems.forEach((item) => {
    if (item.path && !fs.existsSync(path.join(process.cwd(), item.path))) missing.push(item.path)
  })

  getDeveloperOnboarding().mustRead.forEach((docPath) => {
    if (!fs.existsSync(path.join(process.cwd(), docPath))) missing.push(docPath)
  })

  const errors = issues.filter((issue) => issue.severity === 'error')

  if (errors.length > 0 || missing.length > 0) {
    throw new Error([
      ...errors.map((issue) => `${issue.id}: ${issue.message}`),
      ...missing.map((item) => `missing evidence: ${item}`),
    ].join('\n'))
  }

  console.log(`Foundation baseline check passed. items=${getFoundationBaseline().baselineItems.length}`)
}

main()
