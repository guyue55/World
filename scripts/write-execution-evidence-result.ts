import fs from 'node:fs'
import path from 'node:path'

type ResultPayload = {
  id: string
  status: 'passed' | 'failed' | 'blocked'
  exitCode: number | null
  failureClass: string | null
  outputExcerpt: string | null
}

const [payloadRaw] = process.argv.slice(2)

if (!payloadRaw) {
  throw new Error('Usage: tsx scripts/write-execution-evidence-result.ts \'{"id":"lint","status":"failed","exitCode":1,"failureClass":"lint","outputExcerpt":"..."}\'')
}

const payload = JSON.parse(payloadRaw) as ResultPayload
const recordPath = path.join(process.cwd(), 'data/real-execution-rerun-record.json')
const record = JSON.parse(fs.readFileSync(recordPath, 'utf-8'))
const run = record.runs.find((item: { id: string }) => item.id === payload.id)

if (!run) {
  throw new Error(`Unknown rerun id: ${payload.id}`)
}

run.status = payload.status
run.exitCode = payload.exitCode
run.failureClass = payload.failureClass
run.outputExcerpt = payload.outputExcerpt
run.updatedAt = new Date().toISOString()
record.status = 'updated'

fs.writeFileSync(recordPath, `${JSON.stringify(record, null, 2)}\n`)
console.log(`Updated execution evidence result: ${payload.id}`)
