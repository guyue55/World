import fs from 'node:fs'
import path from 'node:path'
import { createSnapshotPlan } from '../src/lib/snapshots'

const reason = process.argv.slice(2).join(' ') || 'manual'

function main() {
  const plan = createSnapshotPlan(reason)
  const outDir = path.join(process.cwd(), 'snapshots')
  const outFile = path.join(outDir, `${plan.name}.plan.json`)

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(plan, null, 2) + '\n', 'utf-8')

  console.log(`Snapshot plan written to ${outFile}`)
}

main()
