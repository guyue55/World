import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const rel = (file) => path.join(root, file)
const readJson = (file) => JSON.parse(fs.readFileSync(rel(file), 'utf-8'))
const exists = (file) => fs.existsSync(rel(file))

const evidence = readJson('data/world-kernel/world-kernel-production-evidence-v1.json')
const consolidation = readJson('data/world-kernel/world-kernel-consolidation-v2.json')
const artifacts = evidence.localEvidence.requiredArtifacts.map((file) => ({ file, exists: exists(file) }))
const report = {
  generatedAt: new Date().toISOString(),
  timezone: 'America/Chicago',
  source: 'scripts/write-world-kernel-local-evidence.mjs',
  status: 'local-evidence-captured-external-evidence-pending',
  baseline: evidence.baseline,
  progress: consolidation.progress,
  localEvidence: {
    commandGates: evidence.localEvidence.commandGates,
    requiredArtifacts: artifacts,
    missingArtifacts: artifacts.filter((item) => !item.exists).map((item) => item.file),
  },
  externalEvidence: evidence.externalEvidence,
  releaseDecision: evidence.releaseDecision,
}

const out = rel('docs/90-archive/reports/world-kernel-local-evidence.json')
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`, 'utf-8')
console.log(`World Kernel local evidence written: ${path.relative(root, out)}`)
