// 用途：写入defect execution item
import fs from 'node:fs'
import path from 'node:path'
import defectExecutionQueueContract from '../data/engineering/defect-execution-queue-contract.json'

type Payload = {
  id: string
  source: string
  severity: 'P0' | 'P1' | 'P2' | 'P3'
  route?: string
  title: string
  evidencePath: string
  status?: 'new' | 'triaged'
}

const [payloadRaw] = process.argv.slice(2)

if (!payloadRaw) {
  throw new Error('Usage: npm run defect-execution:write -- \'{"id":"def-001","source":"browser-qa","severity":"P1","title":"...","evidencePath":"reports/..."}\'')
}

const payload = JSON.parse(payloadRaw) as Payload

;['id', 'source', 'severity', 'title', 'evidencePath'].forEach((key) => {
  if (!payload[key as keyof Payload]) throw new Error(`Missing required field: ${key}`)
})

if (!defectExecutionQueueContract.sources.includes(payload.source)) {
  throw new Error(`Unsupported source: ${payload.source}`)
}

if (!defectExecutionQueueContract.severity.includes(payload.severity)) {
  throw new Error(`Unsupported severity: ${payload.severity}`)
}

if (!payload.evidencePath.startsWith('reports/') && !payload.evidencePath.startsWith('data/')) {
  throw new Error('evidencePath must start with reports/ or data/')
}

const outDir = path.join(process.cwd(), 'reports')
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'defect-execution-queue.json')
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf-8')) : { items: [] }
existing.items.push({ ...payload, status: payload.status ?? 'new', createdAt: new Date().toISOString() })
fs.writeFileSync(outPath, `${JSON.stringify(existing, null, 2)}\n`)
console.log(`Defect item written: ${payload.id}`)
