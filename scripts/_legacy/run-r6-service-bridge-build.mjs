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
  throw new Error(`R6 build artifact verification failed. Missing: ${missing.join(', ')}`)
}

console.log('R6 build artifact verification passed')
