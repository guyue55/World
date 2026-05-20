import fs from 'node:fs'
import path from 'node:path'
import releaseCandidateRiskAcceptanceContract from '../data/release-candidate-risk-acceptance-contract.json'

type Payload = {
  id: string
  riskType: string
  scope: string
  reason: string
  owner: string
  followUp: string
  expiresAt: string
  status?: 'draft' | 'accepted' | 'rejected'
}

const [payloadRaw] = process.argv.slice(2)

if (!payloadRaw) {
  throw new Error('Usage: npm run release-candidate-risk:write -- \'{"id":"risk-001","riskType":"performance","scope":"...","reason":"...","owner":"...","followUp":"...","expiresAt":"2026-06-30"}\'')
}

const payload = JSON.parse(payloadRaw) as Payload

;['id', 'riskType', 'scope', 'reason', 'owner', 'followUp', 'expiresAt'].forEach((key) => {
  if (!payload[key as keyof Payload]) throw new Error(`Missing required field: ${key}`)
})

if (!releaseCandidateRiskAcceptanceContract.riskTypes.includes(payload.riskType)) {
  throw new Error(`Unsupported riskType: ${payload.riskType}`)
}

const outDir = path.join(process.cwd(), 'reports')
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'release-candidate-risk-acceptance.json')
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf-8')) : { items: [] }
existing.items.push({ ...payload, status: payload.status ?? 'draft', createdAt: new Date().toISOString() })
fs.writeFileSync(outPath, `${JSON.stringify(existing, null, 2)}\n`)
console.log(`Risk acceptance record written: ${payload.id}`)
