import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const requiredArtifacts = [
  '.next/BUILD_ID',
  '.next/build-manifest.json',
  '.next/server/app-paths-manifest.json',
  '.next/routes-manifest.json',
  '.next/required-server-files.json',
]

const missingArtifacts = requiredArtifacts.filter((artifact) => !fs.existsSync(path.join(root, artifact)))

if (missingArtifacts.length > 0) {
  console.error('Artifact verification failed! Missing artifacts:')
  for (const missing of missingArtifacts) {
    console.error(`- ${missing}`)
  }
  process.exit(1)
}

console.log('Artifact verification passed. All required Next.js build artifacts are present.')
