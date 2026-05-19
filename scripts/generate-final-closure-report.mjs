import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import contract from '../data/final-closure-report-contract.json' assert { type: 'json' }
import decisionTemplate from '../data/phase-one-final-decision-template.json' assert { type: 'json' }

function readJson(path) {
  const full = join(process.cwd(), path)
  return existsSync(full) ? JSON.parse(readFileSync(full, 'utf-8')) : null
}

const inputs = Object.fromEntries(contract.inputReports.map((path) => [path, readJson(path)]))
const missingInputs = Object.entries(inputs).filter(([, value]) => value === null).map(([path]) => path)

const local = inputs['reports/first-stage-acceptance-report.json']
const preview = inputs['reports/preview-smoke-report.json']
const previewRecord = inputs['data/preview-deployment-record.json']
const defects = inputs['data/visual-interaction-defect-register.json']

const commandPassed = Boolean(local?.commands?.every((item) => item.status === 'passed'))
const manualQaPassed = local?.manualQa?.status === 'passed'
const performancePassed = local?.performance?.status === 'passed'
const previewPassed = preview?.finalDecision === 'passed'
const previewUrlRecorded = Boolean(previewRecord?.previewUrl)
const blockingDefects = Array.isArray(defects?.defects)
  ? defects.defects.filter((item) => item.status === 'open' && ['critical', 'high'].includes(item.severity))
  : []

const complete = missingInputs.length === 0 && commandPassed && manualQaPassed && performancePassed && previewPassed && previewUrlRecorded && blockingDefects.length === 0

const report = {
  generatedAt: new Date().toISOString(),
  inputStatus: Object.fromEntries(Object.entries(inputs).map(([path, value]) => [path, value ? 'available' : 'missing'])),
  checks: { commandPassed, manualQaPassed, performancePassed, previewPassed, previewUrlRecorded, blockingDefects: blockingDefects.length },
  decision: complete ? 'complete' : decisionTemplate.currentDecision,
  reason: complete ? 'all closure evidence is present and passed' : decisionTemplate.decisionReason,
  missingInputs,
  blockingDefects,
}

const out = join(process.cwd(), contract.output)
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, JSON.stringify(report, null, 2) + '\n', 'utf-8')
console.log(`Final closure report written to ${out}`)
console.log(`decision=${report.decision}`)
if (report.decision !== 'complete') process.exit(1)
