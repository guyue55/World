import fs from 'node:fs'
import path from 'node:path'
import statusSkeletonContract from '../data/core/status-skeleton-productization-contract.json'
import statusSkeletonQualityGate from '../data/release/status-skeleton-quality-gate.json'
import stageCompletionGate from '../data/release/stage-completion-gate.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []
  const checks = {
    statusGroups: statusSkeletonContract.groups.length,
    summaryCards: 4,
    skeletonLayers: 7,
    requiredComponents: statusSkeletonQualityGate.requiredComponents.length,
    stageStatusNotComplete: stageCompletionGate.currentStatus === 'complete' ? 0 : 1,
  }

  Object.entries(checks).forEach(([key, value]) => {
    const expected = statusSkeletonQualityGate.minimums[key as keyof typeof statusSkeletonQualityGate.minimums]
    if (value < expected) errors.push(`${key} below minimum: ${value} < ${expected}`)
  })

  statusSkeletonQualityGate.requiredComponents.forEach((component) => {
    const file = `src/components/status-skeleton/${component}.tsx`
    if (!fs.existsSync(path.join(process.cwd(), file))) {
      errors.push(`missing status/skeleton component: ${component}`)
    }
  })

  const statusPage = read('src/app/status/page.tsx')
  if (statusPage.length === 0) errors.push('status page is empty')

  const skeletonPage = read('src/app/_legacy/skeleton/page.tsx')
  if (skeletonPage.length === 0) errors.push('skeleton page is empty')

  if (stageCompletionGate.currentStatus === 'complete') {
    errors.push('stage completion gate must not be marked complete during phase two experience work')
  }

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Status skeleton check passed.')
}

main()
