// 用途：检查真实执行聚合器
import fs from 'node:fs'
import path from 'node:path'
import realExecutionAggregatorContract from '../data/engineering/real-execution-aggregator-contract.json'
import releaseReadyEvidenceMatrix from '../data/release/release-ready-evidence-matrix.json'

function read(file: string) {
  return fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
}

function main() {
  const errors: string[] = []

  if (realExecutionAggregatorContract.inputs.length < 5) {
    errors.push('aggregator inputs too few')
  }

  if (realExecutionAggregatorContract.output !== 'reports/real-execution-summary.json') {
    errors.push('unexpected aggregator output')
  }

  if (releaseReadyEvidenceMatrix.status !== 'prepared-not-satisfied') {
    errors.push('release ready evidence matrix must remain prepared-not-satisfied')
  }

  const pkg = JSON.parse(read('package.json'))
  if (!pkg.scripts['real-execution:summarize']) errors.push('package missing real-execution:summarize')
  if (!pkg.scripts['check:real-execution-aggregator']) errors.push('package missing check:real-execution-aggregator')
  if (!pkg.scripts['real-execution-aggregator:print']) errors.push('package missing real-execution-aggregator:print')

  if (errors.length > 0) throw new Error(errors.join('\n'))
  console.log('Real execution aggregator check passed.')
}

main()
