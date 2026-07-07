import fs from 'node:fs'

const requiredArtifacts = [
  '.next/BUILD_ID',
  '.next/build-manifest.json',
  '.next/server/app-paths-manifest.json',
  '.next/routes-manifest.json',
  '.next/required-server-files.json',
]

const missing = requiredArtifacts.filter((file) => !fs.existsSync(file))
if (missing.length > 0) {
  console.error(`Missing build artifacts: ${missing.join(', ')}`)
  console.error('Run NEXT_TELEMETRY_DISABLED=1 next build --turbopack --experimental-build-mode compile before artifact verification in local environments that allow long-running Next trace collection.')
  process.exit(1)
}

console.log('R8 production artifact verification passed')
