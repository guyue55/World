import fs from 'node:fs'
import path from 'node:path'
import manifest from '../data/core/world-manifest.json'
import { createPublicWorldIndex } from '../src/lib/public-index'

function writeJson(file: string, data: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

writeJson('public/world-index.json', createPublicWorldIndex())
writeJson('public/world-manifest.json', manifest)
console.log('Public JSON files generated.')
