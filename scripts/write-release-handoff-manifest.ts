import fs from 'node:fs'
import path from 'node:path'
import releaseHandoffPackageContract from '../data/release-handoff-package-contract.json'

function exists(file: string) {
  return fs.existsSync(path.join(process.cwd(), file))
}

function main() {
  const documents = releaseHandoffPackageContract.requiredDocuments.map((file) => ({ file, exists: exists(file) }))
  const reports = releaseHandoffPackageContract.requiredReports.map((file) => ({ file, exists: exists(file) }))
  const missingDocuments = documents.filter((item) => !item.exists).map((item) => item.file)
  const missingReports = reports.filter((item) => !item.exists).map((item) => item.file)
  const manifest = {
    generatedAt: new Date().toISOString(),
    status: missingDocuments.length === 0 && missingReports.length === 0 ? 'handoff-ready' : 'handoff-incomplete',
    missingDocuments,
    missingReports,
    documents,
    reports,
    commands: releaseHandoffPackageContract.requiredCommands,
    risks: releaseHandoffPackageContract.handoffRisks,
  }

  const outDir = path.join(process.cwd(), 'reports')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'release-handoff-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(JSON.stringify(manifest, null, 2))
  process.exit(manifest.status === 'handoff-ready' ? 0 : 1)
}

main()
