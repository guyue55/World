import fs from 'node:fs'
import path from 'node:path'
import realValidationDefectProtocol from '../data/release/real-validation-defect-protocol.json'

type DefectPayload = {
  id: string
  route: string
  viewport: string
  severity: 'P0' | 'P1' | 'P2' | 'P3'
  title: string
  description: string
  owner?: string
}

const [payloadRaw] = process.argv.slice(2)

if (!payloadRaw) {
  throw new Error('Usage: tsx scripts/write-browser-qa-defect.ts \'{"id":"qa-001","route":"/","viewport":"375x812","severity":"P1","title":"...","description":"..."}\'')
}

const payload = JSON.parse(payloadRaw) as DefectPayload
const allowedSeverity = new Set(realValidationDefectProtocol.defectLevels.map((level) => level.id))

if (!allowedSeverity.has(payload.severity)) {
  throw new Error(`Invalid severity: ${payload.severity}`)
}

const required = ['id', 'route', 'viewport', 'severity', 'title', 'description'] as const
required.forEach((key) => {
  if (!payload[key]) throw new Error(`Missing required payload field: ${key}`)
})

const registerPath = path.join(process.cwd(), 'data/release/real-validation-defect-register.json')
const register = JSON.parse(fs.readFileSync(registerPath, 'utf-8'))

if (register.defects.some((defect: { id: string }) => defect.id === payload.id)) {
  throw new Error(`Defect already exists: ${payload.id}`)
}

register.defects.push({
  id: payload.id,
  source: 'browser-qa',
  route: payload.route,
  viewport: payload.viewport,
  severity: payload.severity,
  title: payload.title,
  description: payload.description,
  status: 'open',
  owner: payload.owner ?? 'unassigned',
  createdAt: new Date().toISOString(),
  closeEvidence: null,
})

register.status = 'has-open-defects'
fs.writeFileSync(registerPath, `${JSON.stringify(register, null, 2)}\n`)
console.log(`Browser QA defect written: ${payload.id}`)
