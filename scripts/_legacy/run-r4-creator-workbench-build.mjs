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
  console.error('Run NEXT_TELEMETRY_DISABLED=1 next build --turbopack once before using the R4 artifact verification build gate.')
  process.exit(1)
}

console.log('R4 creator workbench build artifact verification passed.')
