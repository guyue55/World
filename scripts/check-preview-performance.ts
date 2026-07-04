import fs from 'node:fs'
import path from 'node:path'
import previewSmokeExecutionContract from '../data/release/preview-smoke-execution-contract.json'
import previewSmokeConfig from '../data/release/preview-smoke-config.json'
import performanceExecutionContract from '../data/engineering/performance-execution-contract.json'
import performanceMeasurementRecords from '../data/engineering/performance-measurement-records.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (previewSmokeExecutionContract.routes.length < 10) {
    errors.push('preview smoke contract routes too few')
  }

  if (previewSmokeConfig.routes.length < 10) {
    errors.push('preview smoke config routes too few')
  }

  if (!previewSmokeConfig.previewUrlEnv) {
    errors.push('preview smoke config missing previewUrlEnv')
  }

  if (!previewSmokeConfig.routeReplacements['/node/[slug]'] || !previewSmokeConfig.routeReplacements['/paths/[id]']) {
    errors.push('preview smoke config missing dynamic route replacements')
  }

  if (performanceExecutionContract.requiredMetrics.length < 4) {
    errors.push('performance contract required metrics too few')
  }

  if (performanceMeasurementRecords.routes.length < performanceExecutionContract.minimumRoutes) {
    errors.push('performance routes below minimum')
  }

  performanceMeasurementRecords.routes.forEach((route) => {
    ;['lcp', 'inp', 'cls', 'score'].forEach((metric) => {
      if (!(metric in route.metrics)) errors.push(`performance route missing metric ${metric}: ${route.route}`)
    })
  })

  const statusGroups = read('src/components/status-skeleton/StatusFoundationGroups.tsx')
  if (!statusGroups.includes('PreviewPerformancePanel')) {
    errors.push('status groups must include PreviewPerformancePanel')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['preview:smoke']) errors.push('package missing preview:smoke')
  if (!pkg.scripts['performance:plan']) errors.push('package missing performance:plan')
  if (!pkg.scripts['check:preview-performance']) errors.push('package missing check:preview-performance')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Preview and performance check passed.')
}

main()
