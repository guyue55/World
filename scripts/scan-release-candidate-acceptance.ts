import fs from 'node:fs'
import path from 'node:path'
import releaseCandidateAcceptanceEvidenceManifest from '../data/release-candidate-acceptance-evidence-manifest.json'
import releaseCandidateAcceptanceScannerContract from '../data/release-candidate-acceptance-scanner-contract.json'

function readJson(file: string) {
  const full = path.join(process.cwd(), file)
  if (!fs.existsSync(full)) return { status: 'missing' as const, value: null }
  try {
    return { status: 'present' as const, value: JSON.parse(fs.readFileSync(full, 'utf-8')) }
  } catch (error) {
    return { status: 'invalid-json' as const, value: String(error) }
  }
}

function statusOfEvidence(item: { id: string; path: string; required: boolean }) {
  const read = readJson(item.path)
  if (read.status !== 'present') {
    return { ...item, status: read.status }
  }

  const value = read.value
  if (item.id.includes('signoff') && value?.status !== 'passed') {
    return { ...item, status: 'pending-signoff' }
  }

  if (item.id.includes('manual-release-review') && value?.status !== 'passed') {
    return { ...item, status: 'pending-manual-review' }
  }

  if (value?.status === 'failed' || value?.status === 'blocked') {
    return { ...item, status: value.status }
  }

  return { ...item, status: 'present' }
}

function main() {
  const items = releaseCandidateAcceptanceEvidenceManifest.requiredEvidence.map(statusOfEvidence)
  const requiredGaps = items.filter((item) => item.required && item.status !== 'present' && item.status !== 'passed')
  const optionalGaps = items.filter((item) => !item.required && item.status !== 'present' && item.status !== 'passed')
  const status = requiredGaps.length > 0 ? 'blocked' : optionalGaps.length > 0 ? 'risk-accepted-required' : 'passed'

  const summary = {
    generatedAt: new Date().toISOString(),
    scanner: releaseCandidateAcceptanceScannerContract.name,
    status,
    requiredGaps: requiredGaps.map((item) => ({ id: item.id, path: item.path, status: item.status })),
    optionalGaps: optionalGaps.map((item) => ({ id: item.id, path: item.path, status: item.status })),
    items,
  }

  const outDir = path.join(process.cwd(), 'reports')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'release-candidate-acceptance-summary.json'), `${JSON.stringify(summary, null, 2)}\n`)
  console.log(JSON.stringify(summary, null, 2))
  process.exit(status === 'passed' ? 0 : 1)
}

main()
