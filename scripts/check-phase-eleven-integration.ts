import fs from 'node:fs'
import path from 'node:path'
import runtimeAdapterContract from '../data/core/runtime-adapter-contract.json'
import runtimeIntegrationGates from '../data/release/runtime-integration-gates.json'
import runtimeReadinessBoard from '../data/release/runtime-readiness-board.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (runtimeIntegrationGates.integrationReady !== false) errors.push('integrationReady must remain false')
  if (runtimeIntegrationGates.gates.length < 6) errors.push('integration gates too few')
  if (runtimeIntegrationGates.gates.some((gate) => gate.ready !== false)) errors.push('all gates must default to false')
  if (runtimeIntegrationGates.gates.some((gate) => gate.requiresHumanReview !== true)) errors.push('all gates must require human review')

  if (runtimeAdapterContract.adapterReady !== false) errors.push('adapterReady must remain false')
  if (runtimeAdapterContract.adapters.length < 6) errors.push('adapters too few')
  if (runtimeAdapterContract.adapters.some((adapter) => adapter.requiresEvidence !== true)) errors.push('all adapters must require evidence')

  if (runtimeReadinessBoard.runtimeReady !== false) errors.push('runtimeReady must remain false')
  if (runtimeReadinessBoard.readiness.length < 7) errors.push('readiness items too few')
  if (runtimeReadinessBoard.readiness.some((item) => item.value !== false)) errors.push('all readiness values must remain false')

  ;[
    'src/lib/phase-eleven-integration.ts',
    'src/components/operator/RuntimeIntegrationPanel.tsx',
    'src/components/operator/RuntimeAdapterPanel.tsx',
    'src/components/operator/RuntimeReadinessPanel.tsx',
  ].forEach((file) => {
    if (!exists(file)) errors.push(`missing integration file: ${file}`)
  })

  const page = read('src/app/operator/page.tsx')
  if (!page.includes('RuntimeIntegrationPanel') || !page.includes('RuntimeAdapterPanel') || !page.includes('RuntimeReadinessPanel')) {
    errors.push('operator page missing integration panels')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['check:phase-eleven-integration']) errors.push('package missing check:phase-eleven-integration')
  if (!pkg.scripts['phase-eleven-integration:print']) errors.push('package missing phase-eleven-integration:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Phase eleven integration check passed.')
}

main()
