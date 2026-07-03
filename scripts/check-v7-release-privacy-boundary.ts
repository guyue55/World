import fs from 'node:fs'
import path from 'node:path'
import { failIfErrors } from './check-v7-release-common'

const scanRoots = ['data/v7-release-ops', 'src/components/v7-release', 'src/app/v7-release']
const dangerousPatterns = [
  'productionLive": true',
  'releaseReady": true',
  'canAutoPublish": true',
  'canReadVault": true',
  'privateRaw',
]
const errors: string[] = []

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else {
      const text = fs.readFileSync(full, 'utf-8')
      for (const pattern of dangerousPatterns) {
        if (text.includes(pattern)) errors.push(`${full} contains forbidden pattern ${pattern}`)
      }
    }
  }
}

for (const root of scanRoots) walk(path.join(process.cwd(), root))

failIfErrors(errors)
console.log('V7 release privacy boundary check passed.')
