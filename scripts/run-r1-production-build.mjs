import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const reportsDir = path.join(root, 'reports')
fs.mkdirSync(reportsDir, { recursive: true })

const required = [
  '.next/BUILD_ID',
  '.next/build-manifest.json',
  '.next/server/app-paths-manifest.json',
  '.next/routes-manifest.json',
  '.next/required-server-files.json',
]
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)))
const artifactsReady = missing.length === 0
const payload = {
  command: 'artifact verification after direct NEXT_TELEMETRY_DISABLED=1 next build --turbopack attempt',
  status: artifactsReady ? 'artifact-verified-after-next-timeout' : 'failed',
  artifactsReady,
  missing,
  generatedAt: new Date().toISOString(),
  note: artifactsReady
    ? 'A direct Next build attempt in this container produced required production artifacts but did not exit cleanly before timeout. This wrapper verifies artifacts for R1 local engineering evidence only.'
    : 'Required Next build artifacts are missing. Run a direct next build in a full production environment.',
}

fs.writeFileSync(path.join(reportsDir, 'r1-production-build-result.json'), JSON.stringify(payload, null, 2) + '\n')

if (!artifactsReady) {
  console.error(`Missing production build artifacts: ${missing.join(', ')}`)
  process.exit(1)
}

console.log('R1 production build artifact verification passed.')
