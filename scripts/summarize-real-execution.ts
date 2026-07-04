import fs from 'node:fs'
import path from 'node:path'
import realExecutionAggregatorContract from '../data/engineering/real-execution-aggregator-contract.json'

function readJsonIfExists(file: string) {
  const full = path.join(process.cwd(), file)
  if (!fs.existsSync(full)) return { status: 'missing' as const, value: null }
  try {
    return { status: 'present' as const, value: JSON.parse(fs.readFileSync(full, 'utf-8')) }
  } catch (error) {
    return { status: 'invalid-json' as const, value: String(error) }
  }
}

function main() {
  const inputs = realExecutionAggregatorContract.inputs.map((file) => ({
    file,
    ...readJsonIfExists(file),
  }))

  const missing = inputs.filter((item) => item.status !== 'present').map((item) => item.file)
  const realEvidence = inputs.find((item) => item.file.endsWith('real-evidence-capture.json'))?.value
  const failedRequired = Array.isArray(realEvidence?.failedRequired) ? realEvidence.failedRequired : []
  const defects = inputs.find((item) => item.file.endsWith('defect-execution-queue.json'))?.value?.items ?? []
  const blockingDefects = Array.isArray(defects) ? defects.filter((item) => item.severity === 'P0' || item.severity === 'P1') : []

  const status = missing.length > 0 || failedRequired.length > 0 || blockingDefects.length > 0 ? 'blocked' : 'passed'

  const summary = {
    generatedAt: new Date().toISOString(),
    status,
    missingInputs: missing,
    failedRequired,
    blockingDefects: blockingDefects.map((item) => item.id),
    inputs: inputs.map((item) => ({ file: item.file, status: item.status })),
  }

  const outDir = path.join(process.cwd(), 'reports')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'real-execution-summary.json'), `${JSON.stringify(summary, null, 2)}\n`)
  console.log(JSON.stringify(summary, null, 2))
  process.exit(status === 'passed' ? 0 : 1)
}

main()
