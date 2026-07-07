import { existsSync } from 'node:fs'

const requiredArtifacts = [
  '.next/BUILD_ID',
  '.next/build-manifest.json',
  '.next/server/app-paths-manifest.json',
  '.next/routes-manifest.json',
  '.next/required-server-files.json',
]

const missing = requiredArtifacts.filter((file) => !existsSync(file))
if (missing.length > 0) {
  console.error(`Missing production build artifacts: ${missing.join(', ')}`)
  console.error('Run NEXT_TELEMETRY_DISABLED=1 next build --turbopack once in the current environment before using the R2 artifact verification build gate.')
  process.exit(1)
}

console.log('R2 world experience build artifact verification passed.')
