import fs from 'node:fs'
import path from 'node:path'

type Payload = {
  id: string
  type: 'browser-qa' | 'preview-smoke' | 'performance'
  summary: string
  status: 'passed' | 'failed' | 'blocked'
  evidence: string
}

const [payloadRaw] = process.argv.slice(2)

if (!payloadRaw) {
  throw new Error('Usage: npm run evidence:note -- \'{"id":"qa-note-001","type":"browser-qa","summary":"...","status":"failed","evidence":"..."}\'')
}

const payload = JSON.parse(payloadRaw) as Payload
const required = ['id', 'type', 'summary', 'status', 'evidence'] as const
required.forEach((key) => {
  if (!payload[key]) throw new Error(`Missing required field: ${key}`)
})

const outDir = path.join(process.cwd(), 'reports')
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'non-command-evidence-notes.json')
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf-8')) : { notes: [] }
existing.notes.push({ ...payload, createdAt: new Date().toISOString() })
fs.writeFileSync(outPath, `${JSON.stringify(existing, null, 2)}\n`)
console.log(`Evidence note written: ${payload.id}`)
