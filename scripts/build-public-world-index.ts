import fs from 'node:fs'
import path from 'node:path'
import { createPublicWorldIndex } from '../src/lib/public-index'

function main() {
  const outDir = path.join(process.cwd(), 'public')
  const outFile = path.join(outDir, 'world-index.json')

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(createPublicWorldIndex(), null, 2) + '\n', 'utf-8')

  console.log(`Public world index written to ${outFile}`)
}

main()
