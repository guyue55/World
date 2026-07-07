// 用途：应用阶段完成
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import guard from '../data/versions/archive/stage-completion-transition-guard.json' assert { type: 'json' }
import certificateTemplate from '../data/versions/archive/stage-completion-certificate-template.json' assert { type: 'json' }

function readJson(path) {
  const full = join(process.cwd(), path)
  if (!existsSync(full)) return null
  return JSON.parse(readFileSync(full, 'utf-8'))
}

function writeJson(path, value) {
  const full = join(process.cwd(), path)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, JSON.stringify(value, null, 2) + '\n', 'utf-8')
}

const report = readJson(guard.requiredReport)
if (!report) {
  console.error(`Missing required final closure report: ${guard.requiredReport}`)
  process.exit(1)
}

if (report.decision !== guard.requiredDecision) {
  console.error(`Cannot complete stage: final closure decision is ${report.decision}`)
  process.exit(1)
}

const checks = report.checks || {}
const blocked =
  checks.blockingDefects !== 0 ||
  checks.previewUrlRecorded !== true ||
  checks.manualQaPassed !== true ||
  checks.performancePassed !== true

if (blocked) {
  console.error('Cannot complete stage: final closure checks are not fully satisfied.')
  process.exit(1)
}

const gate = readJson('data/release/stage-completion-gate.json')
if (!gate) {
  console.error('Missing data/release/stage-completion-gate.json')
  process.exit(1)
}

gate.currentStatus = 'complete'
gate.completedAt = new Date().toISOString()
gate.completionSource = guard.requiredReport
writeJson('data/release/stage-completion-gate.json', gate)

const decision = readJson('data/release/phase-one-final-decision-template.json') || {}
decision.currentDecision = 'complete'
decision.decisionReason = 'all final closure evidence passed'
decision.completedAt = gate.completedAt
writeJson('data/release/phase-one-final-decision-template.json', decision)

const certificate = {
  generatedAt: gate.completedAt,
  stage: certificateTemplate.defaultStage,
  decision: 'complete',
  sourceReport: guard.requiredReport,
  evidenceSummary: report.checks,
  completedDomains: decision.summary || {},
  deferredItems: report.deferredItems || [],
  nextStageEntry: certificateTemplate.nextStageEntry,
  signature: certificateTemplate.signature,
}

writeJson('reports/first-stage-completion-certificate.json', certificate)
console.log('Stage completion applied.')
console.log('Certificate: reports/first-stage-completion-certificate.json')
