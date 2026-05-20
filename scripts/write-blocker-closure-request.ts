import fs from 'node:fs'
import path from 'node:path'
import releaseBlockerClosureAssistContract from '../data/release-blocker-closure-assist-contract.json'
import releaseBlockerRegister from '../data/release-blocker-register.json'

type Payload = {
  id: string
  blockerId: string
  evidenceType: 'command' | 'manual' | 'network' | 'measurement' | 'governance'
  evidencePath: string
  summary: string
  requestedBy: string
  status?: 'draft' | 'review-ready'
}

const [payloadRaw] = process.argv.slice(2)

if (!payloadRaw) {
  throw new Error('Usage: npm run blocker-closure:request -- \'{"id":"close-001","blockerId":"...","evidenceType":"command","evidencePath":"reports/...","summary":"...","requestedBy":"..."}\'')
}

const payload = JSON.parse(payloadRaw) as Payload

;['id', 'blockerId', 'evidenceType', 'evidencePath', 'summary', 'requestedBy'].forEach((key) => {
  if (!payload[key as keyof Payload]) throw new Error(`Missing required field: ${key}`)
})

if (!releaseBlockerRegister.blockers.some((blocker) => blocker.id === payload.blockerId)) {
  throw new Error(`Unknown blockerId: ${payload.blockerId}`)
}

if (!releaseBlockerClosureAssistContract.allowedStatuses.includes(payload.status ?? 'draft')) {
  throw new Error(`Unsupported status: ${payload.status}`)
}

if (!payload.evidencePath.startsWith('reports/') && !payload.evidencePath.startsWith('data/')) {
  throw new Error('evidencePath must start with reports/ or data/')
}

const outDir = path.join(process.cwd(), 'reports')
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'release-blocker-closure-requests.json')
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf-8')) : { requests: [] }
existing.requests.push({ ...payload, status: payload.status ?? 'draft', createdAt: new Date().toISOString() })
fs.writeFileSync(outPath, `${JSON.stringify(existing, null, 2)}\n`)
console.log(`Closure request written: ${payload.id}`)
